'use client';

import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Transaction, TransactionTotals } from '@/types/accounting';
import { useExpertMode } from '@/contexts/ExpertModeContext';
import { useSelection } from '@/contexts/SelectionContext';
import { cn } from '@/lib/utils';
import { Link2, GitMerge, CheckCircle, X, Check, Paperclip } from 'lucide-react';
import { useDocumentViewer } from '@/components/ui/DocumentViewerAdvanced';

interface TimelineViewProps {
  debits: Transaction[];
  credits: Transaction[];
  totals: TransactionTotals;
  selectedTransaction: string | null;
  findLinkedTransactions: (transactionId: string) => Transaction[];
  onTransactionSelect: (transactionId: string) => void;
  clientType?: 'client' | 'supplier';
}

interface ExtendedTimelineViewProps extends TimelineViewProps {
  themeColor?: 'violet' | 'green' | 'red' | 'blue' | 'orange';
}

const TimelineView = memo<ExtendedTimelineViewProps>(({
  debits,
  credits,
  totals,
  selectedTransaction,
  findLinkedTransactions,
  onTransactionSelect,
  clientType,
  themeColor = 'violet'
}) => {
  const { formatAmount, expertMode } = useExpertMode();
  const { setSelectedCount } = useSelection();
  const { open: openDocument, ViewerComponent } = useDocumentViewer();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showLedgerModal, setShowLedgerModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Transaction | null>(null);
  const [editingCell, setEditingCell] = useState<{row: number, field: string} | null>(null);
  const [editedValues, setEditedValues] = useState<Record<string, string | number>>({});
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectionMode, setSelectionMode] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);
  const [lineTypes, setLineTypes] = useState<{main: boolean, line1: boolean, line2: boolean}>({  
    main: true, // true = débit, false = crédit
    line1: false,
    line2: false
  });
  const [loadedExercises, setLoadedExercises] = useState<number[]>([2025]); // Exercices chargés
  const [collapsedExercises, setCollapsedExercises] = useState<number[]>([]); // Exercices repliés
  const [showAllHistory, setShowAllHistory] = useState(false); // Afficher tout l'historique
  const [showAddTransaction, setShowAddTransaction] = useState(false); // Afficher le formulaire d'ajout
  const [newTransaction, setNewTransaction] = useState<{
    date: string;
    label: string;
    amount: string;
    isDebit: boolean;
    reference: string;
  }>({
    date: new Date().toISOString().split('T')[0],
    label: '',
    amount: '',
    isDebit: true,
    reference: ''
  });

  // Design unifié OKÉ - toujours les mêmes couleurs
  const getThemeColors = () => {
    // On utilise toujours le style violet OKÉ, peu importe themeColor
    return {
      line: 'from-[#4C34CE]/20 via-[#4C34CE]/30 to-[#4C34CE]/20',
      pointDebit: 'from-red-400 to-pink-500',
      pointCredit: 'from-[#4C34CE] to-indigo-500',
      badgeDebit: 'from-red-100 to-pink-100 text-red-700',
      badgeCredit: 'bg-[#4C34CE]/10 text-[#4C34CE]',
      soldePositif: 'text-[#4C34CE]',
      soldeNegatif: 'text-pink-600',
      soldeBg: 'from-[#4C34CE]/5 to-indigo-50 border-[#4C34CE]/20'
    };
  };

  const colors = getThemeColors();

  // Fonction pour déterminer le tag de la transaction selon le contexte
  const getTransactionTag = (transaction: Transaction, isDebit: boolean, expertMode: boolean) => {
    // En mode expert, toujours débit/crédit
    if (expertMode) {
      return isDebit ? 'Débit' : 'Crédit';
    }
    
    // Selon le label de la transaction, déterminer le type
    const label = transaction.label.toLowerCase();
    
    // Catégorie TVA
    if (label.includes('tva') || label.includes('taxe')) {
      return isDebit ? 'TVA déductible' : 'TVA collectée';
    }
    
    // Catégorie Salaires/Charges sociales
    if (label.includes('salaire') || label.includes('paie')) {
      return 'Salaire';
    }
    if (label.includes('urssaf') || label.includes('cotisation') || label.includes('sociale')) {
      return 'Charges sociales';
    }
    
    // Catégorie Dividendes
    if (label.includes('dividende')) {
      return 'Dividendes';
    }
    
    // Catégorie Emprunt/Prêt
    if (label.includes('emprunt') || label.includes('prêt')) {
      return isDebit ? 'Remboursement' : 'Emprunt';
    }
    
    // Catégorie Loyer
    if (label.includes('loyer') || label.includes('bail')) {
      return 'Loyer';
    }
    
    // Catégorie Assurance
    if (label.includes('assurance')) {
      return 'Assurance';
    }
    
    // Catégorie Honoraires
    if (label.includes('honoraire') || label.includes('consultant')) {
      return 'Honoraires';
    }
    
    // Catégorie Fournitures
    if (label.includes('fourniture') || label.includes('matériel')) {
      return 'Fournitures';
    }
    
    // Catégories par défaut selon le type
    if (transaction.type === 'invoice') return 'Facture';
    if (transaction.type === 'payment') return 'Paiement';
    if (transaction.type === 'credit_note') return 'Avoir';
    if (transaction.type === 'expense') return 'Dépense';
    
    return isDebit ? 'Débit' : 'Crédit';
  };

  // Détecter si on est sur mobile ou tablette
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleMouseDown = useCallback((transaction: Transaction) => {
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      // Activer le mode sélection
      if (!selectionMode) {
        setSelectionMode(true);
        setSelectedItems(new Set([transaction.id]));
        setSelectedCount(1);
        // Vibration légère si supportée
        if (typeof window !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(50);
        }
      }
    }, 500);
  }, [selectionMode]);

  const handleMouseUp = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleTransactionClick = useCallback((transaction: Transaction) => {
    // Si c'était un long press, ne pas traiter le click
    if (isLongPress.current) {
      isLongPress.current = false;
      return;
    }

    if (selectionMode) {
      // En mode sélection, toggle la sélection
      const newSelected = new Set(selectedItems);
      if (newSelected.has(transaction.id)) {
        newSelected.delete(transaction.id);
      } else {
        newSelected.add(transaction.id);
      }
      setSelectedItems(newSelected);
      setSelectedCount(newSelected.size);
      
      // Si plus rien n'est sélectionné, quitter le mode sélection
      if (newSelected.size === 0) {
        setSelectionMode(false);
      }
    } else {
      // Mode normal, afficher le détail
      setSelectedEntry(transaction);
      setShowLedgerModal(true);
      onTransactionSelect(transaction.id);
      // Initialiser les types de lignes selon le type de transaction
      const isDebit = transaction.type === 'invoice' || transaction.type === 'expense';
      setLineTypes({
        main: isDebit,
        line1: !isDebit,
        line2: !isDebit
      });
    }
  }, [selectionMode, selectedItems, onTransactionSelect]);

  const clearSelection = () => {
    setSelectedItems(new Set());
    setSelectionMode(false);
    setSelectedCount(0);
  };

  const selectAll = () => {
    const allIds = allTransactions.map(t => t.id);
    setSelectedItems(new Set(allIds));
    setSelectedCount(allIds.length);
  };

  // Fonction pour ouvrir une pièce jointe
  const handleOpenAttachment = (transaction: Transaction) => {
    // Utiliser la facture Pennylane hardcodée pour la démo
    const documentUrl = '/documents/facture-pennylane.pdf';
    const documentTitle = `${transaction.label} - ${transaction.reference || ''}`;
    
    openDocument({
      src: documentUrl,
      title: documentTitle,
      type: 'pdf'
    });
  };

  // Actions comptables
  const handleLettrage = () => {
    console.log('Lettrage des écritures:', Array.from(selectedItems));
    // TODO: Implémenter le lettrage réel
    alert(`Lettrage de ${selectedItems.size} écritures`);
    clearSelection();
  };

  const handleRapprochement = () => {
    console.log('Rapprochement bancaire:', Array.from(selectedItems));
    // TODO: Implémenter le rapprochement réel
    alert(`Rapprochement de ${selectedItems.size} écritures`);
    clearSelection();
  };

  const handleValidation = () => {
    console.log('Validation des écritures:', Array.from(selectedItems));
    // TODO: Implémenter la validation réelle
    alert(`Validation de ${selectedItems.size} écritures`);
    clearSelection();
  };

  // Générer des transactions mockées pour les exercices précédents
  const generatePreviousExerciseTransactions = (year: number) => {
    const mockDebits = [
      {
        id: `${year}-d1`,
        date: new Date(`${year}-12-15`),
        label: `Avoir client fin ${year}`,
        amount: 2500,
        type: 'credit' as const,
        reference: `AV-${year}-012`,
        status: 'paid' as const,
      },
      {
        id: `${year}-d2`,
        date: new Date(`${year}-11-20`),
        label: `Remise commerciale ${year}`,
        amount: 800,
        type: 'credit' as const,
        reference: `REM-${year}-008`,
        status: 'paid' as const,
      },
    ];
    
    const mockCredits = [
      {
        id: `${year}-c1`,
        date: new Date(`${year}-12-28`),
        label: `Facture client décembre ${year}`,
        amount: 12500,
        type: 'invoice' as const,
        reference: `FA-${year}-125`,
        status: 'paid' as const,
      },
      {
        id: `${year}-c2`,
        date: new Date(`${year}-10-15`),
        label: `Paiement reçu ${year}`,
        amount: 8000,
        type: 'payment' as const,
        reference: `PAY-${year}-089`,
        status: 'paid' as const,
      },
      {
        id: `${year}-c3`,
        date: new Date(`${year}-09-10`),
        label: `Facture client septembre ${year}`,
        amount: 6500,
        type: 'invoice' as const,
        reference: `FA-${year}-098`,
        status: 'paid' as const,
      },
    ];
    
    return { debits: mockDebits, credits: mockCredits };
  };

  // Charger toutes les transactions selon les exercices chargés
  const getAllTransactions = () => {
    let allDebits = [...debits];
    let allCredits = [...credits];
    
    // Ajouter les transactions des exercices précédents
    loadedExercises.forEach(year => {
      if (year < 2025) {
        const { debits: prevDebits, credits: prevCredits } = generatePreviousExerciseTransactions(year);
        allDebits = [...allDebits, ...prevDebits];
        allCredits = [...allCredits, ...prevCredits];
      }
    });
    
    // Si on veut tout l'historique, ajouter encore plus d'années
    if (showAllHistory) {
      for (let year = 2020; year < Math.min(...loadedExercises); year++) {
        const { debits: histDebits, credits: histCredits } = generatePreviousExerciseTransactions(year);
        allDebits = [...allDebits, ...histDebits];
        allCredits = [...allCredits, ...histCredits];
      }
    }
    
    return [...allDebits, ...allCredits].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const allTransactions = getAllTransactions();

  // Fonction pour charger l'exercice précédent
  const loadPreviousExercise = () => {
    const currentOldest = Math.min(...loadedExercises);
    setLoadedExercises([...loadedExercises, currentOldest - 1]);
  };

  // Fonction pour charger tout l'historique
  const loadAllHistory = () => {
    setShowAllHistory(true);
  };

  // Fonction pour replier/déplier un exercice
  const toggleExercise = (year: number) => {
    if (collapsedExercises.includes(year)) {
      setCollapsedExercises(collapsedExercises.filter(y => y !== year));
    } else {
      setCollapsedExercises([...collapsedExercises, year]);
    }
  };

  // Calculer le solde progressif pour chaque transaction
  const calculateProgressiveBalances = (transactions: any[]) => {
    let runningBalance = 0;
    const balances: { [key: string]: number } = {};
    
    // Parcourir en ordre chronologique inverse (du plus récent au plus ancien)
    [...transactions].reverse().forEach(transaction => {
      if (transaction.type === 'invoice' || transaction.type === 'expense') {
        runningBalance += transaction.amount;
      } else {
        runningBalance -= transaction.amount;
      }
      balances[transaction.id] = runningBalance;
    });
    
    return balances;
  };

  const transactionBalances = calculateProgressiveBalances(allTransactions);

  // Fonction pour ajouter une nouvelle transaction
  const handleAddTransaction = () => {
    const amount = parseFloat(newTransaction.amount.replace(',', '.'));
    if (!amount || !newTransaction.label) return;
    
    const transaction = {
      id: `new-${Date.now()}`,
      date: new Date(newTransaction.date),
      label: newTransaction.label,
      amount: amount,
      type: newTransaction.isDebit ? 'invoice' as const : 'payment' as const,
      reference: newTransaction.reference || `REF-${Date.now()}`,
      status: 'pending' as const,
    };
    
    // Ici on ajouterait la transaction à la liste
    console.log('Nouvelle transaction:', transaction);
    
    // Réinitialiser le formulaire
    setNewTransaction({
      date: new Date().toISOString().split('T')[0],
      label: '',
      amount: '',
      isDebit: true,
      reference: ''
    });
    setShowAddTransaction(false);
  };

  return (
    <div className="bg-white rounded-xl p-3 sm:p-6 shadow-sm relative">
      
      {/* Formulaire d'ajout de transaction */}
      <AnimatePresence>
        {showAddTransaction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-0 bottom-0 z-40 md:absolute md:top-0 md:bottom-auto md:right-0 md:left-auto md:w-96 bg-white rounded-t-2xl md:rounded-xl shadow-2xl border border-gray-200 p-4 md:m-4"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
              <span>Nouvelle transaction</span>
              <button
                onClick={() => setShowAddTransaction(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </h3>
            
            <div className="space-y-4">
              {/* Date */}
              <div>
                <label className="text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Libellé */}
              <div>
                <label className="text-sm font-medium text-gray-700">Libellé</label>
                <input
                  type="text"
                  value={newTransaction.label}
                  onChange={(e) => setNewTransaction({...newTransaction, label: e.target.value})}
                  placeholder="Description de la transaction"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Montant avec toggle Débit/Crédit */}
              <div>
                <label className="text-sm font-medium text-gray-700">Montant</label>
                <div className="flex gap-2 mt-1">
                  {/* Toggle Débit/Crédit */}
                  <button
                    onClick={() => setNewTransaction({...newTransaction, isDebit: !newTransaction.isDebit})}
                    className={cn(
                      "px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1",
                      newTransaction.isDebit
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    )}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.2 }}
                      key={newTransaction.isDebit ? 'debit' : 'credit'}
                    >
                      {newTransaction.isDebit ? '-' : '+'}
                    </motion.div>
                    <span className="text-xs">
                      {expertMode 
                        ? (newTransaction.isDebit ? 'DB' : 'CR')
                        : (newTransaction.isDebit ? 'Débit' : 'Crédit')
                      }
                    </span>
                  </button>
                  
                  {/* Input montant */}
                  <input
                    type="text"
                    value={newTransaction.amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Accepter uniquement les nombres et la virgule/point
                      if (/^\d*[,.]?\d*$/.test(value) || value === '') {
                        setNewTransaction({...newTransaction, amount: value});
                      }
                    }}
                    placeholder="0,00"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right font-mono"
                  />
                  <span className="flex items-center px-2 text-gray-500">€</span>
                </div>
              </div>
              
              {/* Référence (optionnel) */}
              <div>
                <label className="text-sm font-medium text-gray-700">Référence (optionnel)</label>
                <input
                  type="text"
                  value={newTransaction.reference}
                  onChange={(e) => setNewTransaction({...newTransaction, reference: e.target.value})}
                  placeholder="FA-2025-001"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Boutons d'action */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowAddTransaction(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddTransaction}
                  disabled={!newTransaction.label || !newTransaction.amount}
                  className={cn(
                    "flex-1 px-4 py-2 text-white rounded-lg transition-colors",
                    (!newTransaction.label || !newTransaction.amount)
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  )}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      

      {/* Timeline unifiée pour desktop et mobile */}
      <div className="relative">
        {/* Ligne verticale centrale avec couleur du thème - étendue pour couvrir toute la hauteur */}
        <div className={`absolute left-5 md:left-1/2 top-0 w-0.5 bg-gradient-to-b ${colors.line} md:-translate-x-1/2`} style={{ height: 'calc(100% + 2rem)' }} />
        
        {/* Liste des transactions */}
        <div className="space-y-3 md:space-y-6">
          {allTransactions.map((transaction, index) => {
            const isDebit = transaction.type === 'invoice' || transaction.type === 'expense';
            const linkedTransactions = findLinkedTransactions(transaction.id);
            const isEven = index % 2 === 0;
            
            // Ajouter un séparateur d'exercice si nécessaire
            const transactionYear = new Date(transaction.date).getFullYear();
            const prevTransaction = allTransactions[index - 1];
            const prevYear = prevTransaction ? new Date(prevTransaction.date).getFullYear() : null;
            const showYearSeparator = prevYear && prevYear !== transactionYear;
            const isCollapsed = collapsedExercises.includes(transactionYear);
            const progressiveBalance = transactionBalances[transaction.id] || 0;
            
            // Si l'exercice est replié, ne pas afficher la transaction
            if (isCollapsed && !showYearSeparator) {
              return null;
            }
            
            return (
              <React.Fragment key={transaction.id}>
                {showYearSeparator && (
                  <>
                    {/* Report à nouveau de l'exercice précédent */}
                    {!isCollapsed && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative mb-6"
                      >
                        <div className="relative">
                          {/* Ligne de connexion depuis la timeline */}
                          <div className={`absolute left-6 md:left-1/2 -top-4 h-4 w-0.5 bg-gradient-to-b ${colors.line} md:-translate-x-1/2`} />
                          
                          {/* Carte Report à nouveau de l'exercice */}
                          <div className="bg-gradient-to-br from-gray-50/50 to-white/50 rounded-xl border border-gray-200/50 p-3 md:p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {/* Point sur la timeline */}
                                <div className={`w-3 h-3 rounded-full ring-4 ring-white shadow-sm bg-gradient-to-br from-gray-400 to-gray-500`} />
                                <div>
                                  <div className="text-sm font-medium text-gray-600">Report à nouveau</div>
                                  <div className="text-xs text-gray-500">Solde au 31/12/{transactionYear - 1}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                {/* Solde simulé pour l'exercice précédent */}
                                {(() => {
                                  // Calculer un solde plus réaliste basé sur l'année
                                  const baseAmount = 15000;
                                  const yearFactor = (2025 - transactionYear) * 0.15;
                                  const isDebitBalance = transactionYear % 2 === 0;
                                  const simulatedBalance = isDebitBalance 
                                    ? -(baseAmount * (1 + yearFactor))
                                    : (baseAmount * (1 - yearFactor));
                                  return (
                                    <>
                                      <div className={`text-lg font-bold ${
                                        simulatedBalance >= 0 ? colors.soldePositif : colors.soldeNegatif
                                      }`}>
                                        {formatAmount(Math.abs(simulatedBalance))}
                                      </div>
                                      <span className="text-xs text-gray-500 ml-1">
                                        ({simulatedBalance >= 0 ? 'créditeur' : 'débiteur'})
                                      </span>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Séparateur d'exercice avec bouton repli/dépli */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="relative my-8"
                    >
                      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-transparent to-gray-300 md:-translate-x-1/2" />
                      <button
                        onClick={() => toggleExercise(transactionYear)}
                        className="w-full flex items-center justify-center group"
                      >
                        <div 
                          className="px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                          style={{
                            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(139, 92, 246, 0.12) 50%, rgba(167, 139, 250, 0.08) 100%)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                          }}
                        >
                          <motion.svg 
                            animate={{ rotate: isCollapsed ? -90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-4 h-4 text-violet-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </motion.svg>
                          <span className="text-sm font-semibold text-violet-700">Exercice {transactionYear}</span>
                          <span className="text-xs text-violet-500/70 font-medium">
                            {isCollapsed ? '(Replié)' : `(${allTransactions.filter(t => new Date(t.date).getFullYear() === transactionYear).length} transactions)`}
                          </span>
                        </div>
                      </button>
                    </motion.div>
                  </>
                )}
                {!isCollapsed && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="relative"
                  >
                {/* Conteneur pour l'alignement desktop */}
                <div className={`md:grid md:grid-cols-2 md:gap-8 md:items-center`}>
                  {/* Carte de transaction - position alternée sur desktop */}
                  <div className={`${
                    !isMobile && isEven ? 'md:col-start-2' : 'md:col-start-1'
                  } ${
                    isMobile ? 'pl-10' : ''
                  }`}>
                    <motion.div 
                      onClick={() => handleTransactionClick(transaction)}
                      onMouseDown={() => handleMouseDown(transaction)}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      onTouchStart={() => handleMouseDown(transaction)}
                      onTouchEnd={handleMouseUp}
                      onContextMenu={(e) => {
                        // Right click pour activer le mode sélection aussi
                        e.preventDefault();
                        if (!selectionMode) {
                          setSelectionMode(true);
                          setSelectedItems(new Set([transaction.id]));
                          setSelectedCount(1);
                        }
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "relative p-3 sm:p-4 rounded-lg sm:rounded-xl border cursor-pointer transition-all duration-200",
                        selectionMode && selectedItems.has(transaction.id)
                          ? "bg-blue-50/80 border-blue-200 scale-[0.98]"
                          : selectedTransaction === transaction.id 
                            ? isDebit 
                              ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 shadow-lg' 
                              : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg'
                            : 'bg-white hover:bg-gray-50 border-gray-200 hover:shadow-lg hover:border-gray-300',
                        !isMobile && isEven ? 'md:text-right' : ''
                      )}
                    >
                      {/* Indicateur de sélection */}
                      {selectionMode && (
                        <div className={cn(
                          "absolute -left-1 top-1/2 -translate-y-1/2 w-1 rounded-full bg-blue-500 transition-all",
                          selectedItems.has(transaction.id) ? "h-12 opacity-100" : "h-8 opacity-0"
                        )} />
                      )}
                      
                      {/* Checkbox de sélection */}
                      {selectionMode && (
                        <div className={cn(
                          "absolute right-3 top-3 w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center",
                          selectedItems.has(transaction.id) 
                            ? "bg-blue-500 border-blue-500" 
                            : "bg-white border-gray-300"
                        )}>
                          {selectedItems.has(transaction.id) && <Check className="w-3 h-3 text-white" />}
                        </div>
                      )}
                    {/* Layout mobile et tablette optimisé */}
                    {(isMobile || isTablet) ? (
                      <div className="space-y-2">
                        {/* En-tête avec badge et date */}
                        <div className="flex items-center justify-between gap-2">
                          <span className={`inline-block px-2.5 py-1 rounded-full ${isTablet ? 'text-xs' : 'text-[10px]'} font-bold uppercase tracking-wider ${
                            isDebit ? 'bg-red-100 text-red-700' : colors.badgeCredit
                          }`}>
                            {getTransactionTag(transaction, isDebit, expertMode)}
                          </span>
                          <span className={`${isTablet ? 'text-xs' : 'text-[11px]'} text-neutral-500`}>
                            {new Date(transaction.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                          </span>
                        </div>
                        
                        {/* Libellé et montant */}
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <div className={`font-medium ${isTablet ? 'text-base' : 'text-sm'} truncate`}>{transaction.label}</div>
                              {transaction.attachments && transaction.attachments > 0 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenAttachment(transaction);
                                  }}
                                  className="flex-shrink-0 p-1 rounded hover:bg-gray-100 transition-colors"
                                  title={`${transaction.attachments} pièce${transaction.attachments > 1 ? 's' : ''} jointe${transaction.attachments > 1 ? 's' : ''}`}
                                >
                                  <Paperclip className="w-3 h-3 text-gray-500" />
                                  {transaction.attachments > 1 && (
                                    <span className="ml-0.5 text-[9px] text-gray-500">{transaction.attachments}</span>
                                  )}
                                </button>
                              )}
                            </div>
                            {transaction.reference && (
                              <div className="text-[11px] text-neutral-500 truncate mt-0.5">
                                {transaction.reference}
                              </div>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className={`text-base font-bold ${
                              isDebit ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {formatAmount(transaction.amount)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Footer avec statut, lettrage et solde */}
                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-100">
                          <div className="flex items-center gap-1.5">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                              transaction.status === 'paid' ? 'text-green-700 bg-green-100/80' :
                              transaction.status === 'partial' ? 'text-blue-700 bg-blue-100/80' :
                              transaction.status === 'pending' ? 'text-amber-700 bg-amber-100/80' :
                              transaction.status === 'overdue' ? 'text-red-700 bg-red-100/80' :
                              'text-neutral-700 bg-neutral-100/80'
                            }`}>
                              {expertMode ? (
                                transaction.status === 'paid' ? 'Lettré' :
                                transaction.status === 'partial' ? 'Partiel' :
                                transaction.status === 'pending' ? 'Non lettré' :
                                transaction.status === 'overdue' ? 'Échu' : transaction.status
                              ) : (
                                transaction.status === 'paid' ? 'Payé' :
                                transaction.status === 'partial' ? 'Partiel' :
                                transaction.status === 'pending' ? 'En attente' :
                                transaction.status === 'overdue' ? 'En retard' : transaction.status
                              )}
                            </span>
                            {transaction.lettrageCode && (
                              <span className="inline-block px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 text-[9px] font-bold">
                                {transaction.lettrageCode}
                              </span>
                            )}
                            {transaction.attachments && transaction.attachments > 0 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenAttachment(transaction);
                                }}
                                className="flex-shrink-0 p-0.5 rounded hover:bg-gray-100 transition-colors"
                                title={`${transaction.attachments} pièce${transaction.attachments > 1 ? 's' : ''} jointe${transaction.attachments > 1 ? 's' : ''}`}
                              >
                                <Paperclip className="w-3 h-3 text-gray-500" />
                                {transaction.attachments > 1 && (
                                  <span className="ml-0.5 text-[8px] text-gray-500">{transaction.attachments}</span>
                                )}
                              </button>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <div className="text-[10px] text-gray-500">Solde</div>
                            <div className="flex items-baseline gap-1">
                              <span className={`text-xs font-semibold ${
                                progressiveBalance >= 0 ? 'text-[#4C34CE]' : 'text-orange-600'
                              }`}>
                                {formatAmount(Math.abs(progressiveBalance))}
                              </span>
                              <span className="text-[9px] text-gray-500">
                                ({progressiveBalance >= 0 ? 'créditeur' : 'débiteur'})
                              </span>
                            </div>
                            {transaction.lettrageCode && (
                              <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 text-[9px] font-bold">
                                {transaction.lettrageCode}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Layout desktop original */
                      <div className={`flex justify-between items-start ${
                        !isMobile && isEven ? 'md:flex-row-reverse' : ''
                      }`}>
                        <div className="flex-1">
                          <div className={`flex items-center gap-2 ${
                            !isMobile && isEven ? 'md:justify-end' : ''
                          }`}>
                            <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${
                              isDebit ? colors.badgeDebit : colors.badgeCredit
                            }`}>
                              {getTransactionTag(transaction, isDebit, expertMode)}
                            </span>
                            <span className="text-xs text-neutral-500">
                              {new Date(transaction.date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          
                          <div className="mt-2">
                            <div className="flex items-center gap-2">
                              <div className="font-medium text-sm">{transaction.label}</div>
                              {transaction.attachments && transaction.attachments > 0 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenAttachment(transaction);
                                  }}
                                  className="flex-shrink-0 p-1 rounded hover:bg-gray-100 transition-colors inline-flex items-center"
                                  title={`${transaction.attachments} pièce${transaction.attachments > 1 ? 's' : ''} jointe${transaction.attachments > 1 ? 's' : ''}`}
                                >
                                  <Paperclip className="w-4 h-4 text-gray-500" />
                                  {transaction.attachments > 1 && (
                                    <span className="ml-1 text-xs text-gray-500">{transaction.attachments}</span>
                                  )}
                                </button>
                              )}
                            </div>
                            <div className="text-xs text-neutral-500 mt-1">
                              {transaction.reference}
                            </div>
                          </div>
                        </div>
                        
                        <div className={`ml-3 ${
                          !isMobile && isEven ? 'md:ml-0 md:mr-3 md:text-left' : 'text-right'
                        }`}>
                          <div className={`text-lg font-bold ${
                            isDebit 
                              ? 'bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent' 
                              : 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'
                          }`}>
                            {formatAmount(transaction.amount)}
                          </div>
                          <div className="flex items-center gap-2 justify-end mt-1">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-2xs font-medium ${
                            transaction.status === 'paid' ? 'text-green-700 bg-green-100/80' :
                            transaction.status === 'partial' ? 'text-blue-700 bg-blue-100/80' :
                            transaction.status === 'pending' ? 'text-amber-700 bg-amber-100/80' :
                            transaction.status === 'overdue' ? 'text-red-700 bg-red-100/80' :
                            'text-neutral-700 bg-neutral-100/80'
                          }`}>
                            {expertMode ? (
                              transaction.status === 'paid' ? 'Lettré' :
                              transaction.status === 'partial' ? 'Partiel' :
                              transaction.status === 'pending' ? 'Non lettré' :
                              transaction.status === 'overdue' ? 'Échu' : transaction.status
                            ) : (
                              transaction.status === 'paid' ? 'Payé' :
                              transaction.status === 'partial' ? 'Partiel' :
                              transaction.status === 'pending' ? 'En attente' :
                              transaction.status === 'overdue' ? 'En retard' : transaction.status
                            )}
                          </span>
                          {transaction.lettrageCode && (
                            <span className="inline-block px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 text-2xs font-bold">
                              {transaction.lettrageCode}
                            </span>
                          )}
                          </div>
                          {/* Solde progressif */}
                          <div className="mt-1">
                            <div className="text-2xs text-gray-500">Solde</div>
                            <div className="flex items-baseline gap-1">
                              <span className={`text-sm font-semibold ${
                                progressiveBalance >= 0 ? 'text-[#4C34CE]' : 'text-orange-600'
                              }`}>
                                {formatAmount(Math.abs(progressiveBalance))}
                              </span>
                              <span className="text-2xs text-gray-500">
                                ({progressiveBalance >= 0 ? 'créditeur' : 'débiteur'})
                              </span>
                            </div>
                            {transaction.lettrageCode && (
                              <span className="inline-block mt-1 px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-2xs font-bold">
                                Lettrage {transaction.lettrageCode}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    </motion.div>
                  </div>
                  
                  {/* Espace vide pour l'autre côté sur desktop */}
                  {!isMobile && (
                    <div className={`hidden md:block ${
                      isEven ? 'md:col-start-1' : 'md:col-start-2'
                    }`} />
                  )}
                </div>
                
                {/* Point sur la timeline */}
                <div className={`absolute left-5 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 z-10`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.02 + 0.2 }}
                    className={`w-3 md:w-4 h-3 md:h-4 rounded-full ring-4 ring-white shadow-md bg-gradient-to-br ${
                      isDebit 
                        ? colors.pointDebit
                        : colors.pointCredit
                    }`}
                  />
                </div>
                </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
      {/* Report à nouveau - Solde initial EN BAS */}
      <motion.div 
        className="mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative">
          {/* Ligne de connexion depuis la timeline */}
          <div className={`absolute left-6 md:left-1/2 -top-4 h-4 w-0.5 bg-gradient-to-b ${colors.line} md:-translate-x-1/2`} />
          
          {/* Carte Report à nouveau */}
          <div className="bg-gradient-to-br from-gray-50/50 to-white/50 rounded-xl border border-gray-200/50 p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Point sur la timeline */}
                <div className={`w-3 h-3 rounded-full ring-4 ring-white shadow-sm bg-gradient-to-br from-gray-400 to-gray-500`} />
                <div>
                  <div className="text-sm font-medium text-gray-600">Report à nouveau</div>
                  <div className="text-xs text-gray-500">Solde au 01/01/2025</div>
                </div>
              </div>
              <div className="text-right">
                {/* Calculer le solde initial (solde final - somme des mouvements de l'exercice) */}
                {(() => {
                  const exerciseTransactions = allTransactions.filter(t => new Date(t.date).getFullYear() === 2025);
                  let exerciseMovement = 0;
                  exerciseTransactions.forEach(t => {
                    if (t.type === 'invoice' || t.type === 'expense') {
                      exerciseMovement += t.amount;
                    } else {
                      exerciseMovement -= t.amount;
                    }
                  });
                  const initialBalance = totals.balance - exerciseMovement;
                  
                  return (
                    <>
                      <div className={`text-lg font-bold ${
                        initialBalance >= 0 ? colors.soldePositif : colors.soldeNegatif
                      }`}>
                        {formatAmount(Math.abs(initialBalance))}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {initialBalance >= 0 ? 'Solde créditeur' : 'Solde débiteur'}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Report à nouveau - Exercice précédent ou Tout l'historique */}
      {!showAllHistory && (
        <div className="mt-6 mb-4 space-y-3">
          {/* Bouton pour charger l'exercice précédent */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={loadPreviousExercise}
              className="w-full group"
            >
              <div className="relative">
                {/* Ligne de continuation */}
                <div className={`absolute left-6 md:left-1/2 -top-4 h-4 w-0.5 bg-gradient-to-b ${colors.line} md:-translate-x-1/2 opacity-50`} />
                
                {/* Carte Report à nouveau - simplifiée */}
                <div className="bg-gradient-to-br from-[#4C34CE]/5 to-indigo-50 rounded-xl border border-[#4C34CE]/20 p-4 hover:shadow-lg transition-all duration-200 hover:border-[#4C34CE]/30 hover:from-[#4C34CE]/10 hover:to-indigo-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-[#4C34CE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-4-4m4 4l4-4" />
                      </svg>
                      <span className="text-sm font-semibold text-[#4C34CE]">
                        Charger l'exercice précédent
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">REPORT</span>
                      <span className={`text-lg font-bold ${
                        totals.balance * 0.85 > 0 ? 'text-[#4C34CE]' : 'text-orange-600'
                      }`}>
                        {formatAmount(Math.abs(totals.balance * 0.85))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </motion.div>

          {/* Bouton pour afficher tout l'historique */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button 
              onClick={loadAllHistory}
              className="w-full group"
            >
              <div className="bg-gradient-to-br from-[#4C34CE]/5 to-pink-50 rounded-xl border border-[#4C34CE]/20 p-3 hover:shadow-lg transition-all duration-200 hover:border-[#4C34CE]/30 hover:from-[#4C34CE]/10 hover:to-pink-100">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-[#4C34CE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-[#4C34CE]">Afficher tout l'historique depuis le début</span>
                  <svg className="w-4 h-4 text-[#4C34CE]/40 group-hover:text-[#4C34CE] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </motion.div>
        </div>
      )}

      {/* Totaux avec design moderne */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">
              {expertMode ? 'Total Débits' : 'Total Factures'}
            </span>
            <span className="text-lg font-bold text-red-600">{formatAmount(totals.totalDebits)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">
              {expertMode ? 'Total Crédits' : 'Total Paiements'}
            </span>
            <span className="text-lg font-bold text-green-600">{formatAmount(totals.totalCredits)}</span>
          </div>
        </div>
        
        {/* Solde avec fond coloré */}
        <div className={`bg-gradient-to-r ${colors.soldeBg} p-5`}>
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-gray-800">Solde</span>
            <div className="text-right">
              <div className={`text-2xl font-bold ${
                totals.balance > 0 
                  ? colors.soldePositif
                  : totals.balance < 0 
                    ? colors.soldeNegatif
                    : 'text-gray-600'
              }`}>
                {formatAmount(Math.abs(totals.balance))}
              </div>
              <div className="text-xs font-medium text-gray-600 mt-1">
                {clientType === 'supplier'
                  ? (totals.balance > 0 ? 'À payer' : totals.balance < 0 ? 'Crédit fournisseur' : 'Équilibré')
                  : (totals.balance > 0 ? 'À recevoir' : totals.balance < 0 ? 'Trop perçu' : 'Équilibré')
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour afficher l'écriture du Grand Livre */}
      {showLedgerModal && selectedEntry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[60] flex items-end md:items-center justify-center"
          onClick={() => setShowLedgerModal(false)}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-5xl max-h-[85vh] md:max-h-[80vh] overflow-auto mb-16 md:mb-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 p-4 md:p-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Écriture Comptable</h2>
                  <p className="text-xs text-gray-500 mt-1">Astuce : Utilisez la barre d'espace pour basculer entre débit et crédit</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-violet-600 font-medium">
                      Pièce #{selectedEntry.reference}
                    </span>
                    <span className="text-sm text-neutral-500">
                      {new Date(selectedEntry.date).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowLedgerModal(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Contenu de l'écriture */}
            <div className="p-4 md:p-6 space-y-6">
              {/* Écriture principale */}
              <div className="border-l-4 border-violet-500 bg-neutral-50 rounded-lg p-4">
                {/* Ligne principale (compte client/fournisseur) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 px-3 bg-white rounded hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center gap-3">
                      {editingCell?.row === 0 && editingCell?.field === 'mainAccount' ? (
                        <input
                          type="text"
                          value={editedValues.mainAccount || '411000'}
                          onChange={(e) => setEditedValues({...editedValues, mainAccount: e.target.value})}
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowRight' || e.key === 'Tab') {
                              e.preventDefault();
                              setEditingCell({row: 0, field: 'mainLabel'});
                            } else if (e.key === 'ArrowDown' || e.key === 'Enter') {
                              e.preventDefault();
                              setEditingCell({row: 0, field: 'label'});
                            } else if (e.key === 'Escape') {
                              setEditingCell(null);
                            }
                          }}
                          className="w-20 px-1 py-0.5 border border-violet-300 rounded text-sm font-mono text-violet-600 focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <span 
                          onClick={() => setEditingCell({row: 0, field: 'mainAccount'})}
                          className="text-violet-600 font-mono text-sm cursor-pointer hover:underline"
                        >
                          411000
                        </span>
                      )}
                      {editingCell?.row === 0 && editingCell?.field === 'mainLabel' ? (
                        <input
                          type="text"
                          value={editedValues.mainLabel || 'CLIENTS'}
                          onChange={(e) => setEditedValues({...editedValues, mainLabel: e.target.value})}
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowLeft') {
                              e.preventDefault();
                              setEditingCell({row: 0, field: 'mainAccount'});
                            } else if (e.key === 'ArrowRight' || e.key === 'Tab') {
                              e.preventDefault();
                              setEditingCell({row: 0, field: 'mainAmount'});
                            } else if (e.key === 'ArrowDown' || e.key === 'Enter') {
                              e.preventDefault();
                              setEditingCell({row: 0, field: 'label'});
                            } else if (e.key === 'Escape') {
                              setEditingCell(null);
                            }
                          }}
                          className="flex-1 px-1 py-0.5 border border-violet-300 rounded text-sm focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <span 
                          onClick={() => setEditingCell({row: 0, field: 'mainLabel'})}
                          className="text-sm text-neutral-700 cursor-pointer hover:underline"
                        >
                          CLIENTS
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Toggle Débit/Crédit pour la ligne principale */}
                      <button
                        onClick={() => {
                          setLineTypes(prev => ({ ...prev, main: !prev.main }));
                        }}
                        title="Appuyez sur Espace pour basculer"
                        className={cn(
                          "px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1 focus:ring-2 focus:ring-offset-1",
                          lineTypes.main
                            ? "bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-400"
                            : "bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-400"
                        )}
                      >
                        <span className="text-base font-bold">
                          {lineTypes.main ? '-' : '+'}
                        </span>
                        <span>
                          {expertMode 
                            ? (lineTypes.main ? 'DB' : 'CR')
                            : (lineTypes.main ? 'Débit' : 'Crédit')
                          }
                        </span>
                      </button>
                      {editingCell?.row === 0 && editingCell?.field === 'mainAmount' ? (
                        <input
                          type="text"
                          value={editedValues.mainAmount || formatAmount(selectedEntry.amount)}
                          onChange={(e) => setEditedValues({...editedValues, mainAmount: e.target.value})}
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowLeft') {
                              e.preventDefault();
                              setEditingCell({row: 0, field: 'mainLabel'});
                            } else if (e.key === 'ArrowDown' || e.key === 'Enter') {
                              e.preventDefault();
                              setEditingCell({row: 0, field: 'label'});
                            } else if (e.key === ' ') {
                              e.preventDefault();
                              // Basculer le toggle avec la barre d'espace
                              setLineTypes(prev => ({ ...prev, main: !prev.main }));
                            } else if (e.key === 'Escape') {
                              setEditingCell(null);
                            }
                          }}
                          className="w-24 px-1 py-0.5 border border-violet-300 rounded text-sm text-right font-medium focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <span 
                          onClick={() => setEditingCell({row: 0, field: 'mainAmount'})}
                          className={`text-sm font-medium cursor-pointer hover:underline ${
                            selectedEntry.type === 'invoice' || selectedEntry.type === 'expense' 
                              ? 'text-red-600' 
                              : 'text-green-600'
                          }`}
                        >
                          {formatAmount(selectedEntry.amount)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Libellé de l'écriture */}
                <div className="mt-4 mb-3 pt-3 border-t border-neutral-200">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-xs font-medium text-neutral-500">Libellé :</span>
                    {editingCell?.field === 'label' ? (
                      <input
                        type="text"
                        value={editedValues.label || selectedEntry.label}
                        onChange={(e) => setEditedValues({...editedValues, label: e.target.value})}
                        onBlur={() => setEditingCell(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === 'ArrowDown') {
                            e.preventDefault();
                            setEditingCell({row: 1, field: 'account1'});
                          } else if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            setEditingCell({row: 0, field: 'mainAccount'});
                          } else if (e.key === 'Escape') {
                            setEditingCell(null);
                          }
                        }}
                        className="flex-1 px-2 py-1 border border-violet-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                        autoFocus
                      />
                    ) : (
                      <span 
                        onClick={() => setEditingCell({row: 0, field: 'label'})}
                        className="flex-1 text-sm font-medium cursor-pointer hover:bg-white px-2 py-1 rounded transition-colors"
                      >
                        {selectedEntry.label}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Lignes de contrepartie */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-neutral-500 mb-2">Contreparties :</div>
                  {/* Ligne compte HT */}
                  <div className="flex items-center justify-between py-2 px-3 bg-white rounded hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-400">└</span>
                      {editingCell?.row === 1 && editingCell?.field === 'account1' ? (
                        <input
                          type="text"
                          value={editedValues.account1 || '706000'}
                          onChange={(e) => setEditedValues({...editedValues, account1: e.target.value})}
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowRight' || e.key === 'Tab') {
                              e.preventDefault();
                              setEditingCell({row: 1, field: 'amount1'});
                            } else if (e.key === 'ArrowDown' || e.key === 'Enter') {
                              e.preventDefault();
                              setEditingCell({row: 2, field: 'account2'});
                            } else if (e.key === 'ArrowUp') {
                              e.preventDefault();
                              setEditingCell({row: 0, field: 'label'});
                            } else if (e.key === 'Escape') {
                              setEditingCell(null);
                            }
                          }}
                          className="w-20 px-1 py-0.5 border border-violet-300 rounded text-sm font-mono text-violet-600 focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <span 
                          onClick={() => setEditingCell({row: 1, field: 'account1'})}
                          className="text-violet-600 font-mono text-sm cursor-pointer hover:underline"
                        >
                          706000
                        </span>
                      )}
                      <span className="text-sm text-neutral-700">
                        {selectedEntry.type === 'invoice' ? 'Prestations de services' : 
                         selectedEntry.type === 'payment' ? 'Banque' :
                         selectedEntry.type === 'expense' ? 'Achats' : 'RRR accordées'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Toggle Débit/Crédit pour contrepartie 1 */}
                      <button
                        onClick={() => {
                          setLineTypes(prev => ({ ...prev, line1: !prev.line1 }));
                        }}
                        title="Appuyez sur Espace pour basculer"
                        className={cn(
                          "px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1 focus:ring-2 focus:ring-offset-1",
                          lineTypes.line1
                            ? "bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-400"
                            : "bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-400"
                        )}
                      >
                        <span className="text-base font-bold">
                          {lineTypes.line1 ? '-' : '+'}
                        </span>
                        <span>
                          {expertMode 
                            ? (lineTypes.line1 ? 'DB' : 'CR')
                            : (lineTypes.line1 ? 'Débit' : 'Crédit')
                          }
                        </span>
                      </button>
                      {editingCell?.row === 1 && editingCell?.field === 'amount1' ? (
                        <input
                          type="text"
                          value={editedValues.amount1 || formatAmount(selectedEntry.amount * 0.833)}
                          onChange={(e) => setEditedValues({...editedValues, amount1: e.target.value})}
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowLeft') {
                              e.preventDefault();
                              setEditingCell({row: 1, field: 'account1'});
                            } else if (e.key === 'ArrowDown' || e.key === 'Enter') {
                              e.preventDefault();
                              setEditingCell({row: 2, field: 'amount2'});
                            } else if (e.key === 'ArrowUp') {
                              e.preventDefault();
                              setEditingCell({row: 0, field: 'label'});
                            } else if (e.key === ' ') {
                              e.preventDefault();
                              // Basculer le toggle avec la barre d'espace
                              setLineTypes(prev => ({ ...prev, line1: !prev.line1 }));
                            } else if (e.key === 'Escape') {
                              setEditingCell(null);
                            }
                          }}
                          className="w-24 px-1 py-0.5 border border-violet-300 rounded text-sm text-right font-medium focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <span 
                          onClick={() => setEditingCell({row: 1, field: 'amount1'})}
                          className="text-sm font-medium cursor-pointer hover:underline"
                        >
                          {formatAmount(selectedEntry.amount * 0.833)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Ligne TVA */}
                  <div className="flex items-center justify-between py-2 px-3 bg-white rounded hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-400">└</span>
                      {editingCell?.row === 2 && editingCell?.field === 'account2' ? (
                        <input
                          type="text"
                          value={editedValues.account2 || '445660'}
                          onChange={(e) => setEditedValues({...editedValues, account2: e.target.value})}
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowRight' || e.key === 'Tab') {
                              e.preventDefault();
                              setEditingCell({row: 2, field: 'amount2'});
                            } else if (e.key === 'ArrowUp') {
                              e.preventDefault();
                              setEditingCell({row: 1, field: 'account1'});
                            } else if (e.key === 'Escape') {
                              setEditingCell(null);
                            }
                          }}
                          className="w-20 px-1 py-0.5 border border-violet-300 rounded text-sm font-mono text-violet-600 focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <span 
                          onClick={() => setEditingCell({row: 2, field: 'account2'})}
                          className="text-violet-600 font-mono text-sm cursor-pointer hover:underline"
                        >
                          445660
                        </span>
                      )}
                      <span className="text-sm text-neutral-700">T.v.a. sur autres biens et services</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Toggle Débit/Crédit pour TVA */}
                      <button
                        onClick={() => {
                          setLineTypes(prev => ({ ...prev, line2: !prev.line2 }));
                        }}
                        title="Appuyez sur Espace pour basculer"
                        className={cn(
                          "px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1 focus:ring-2 focus:ring-offset-1",
                          lineTypes.line2
                            ? "bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-400"
                            : "bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-400"
                        )}
                      >
                        <span className="text-base font-bold">
                          {lineTypes.line2 ? '-' : '+'}
                        </span>
                        <span>
                          {expertMode 
                            ? (lineTypes.line2 ? 'DB' : 'CR')
                            : (lineTypes.line2 ? 'Débit' : 'Crédit')
                          }
                        </span>
                      </button>
                      {editingCell?.row === 2 && editingCell?.field === 'amount2' ? (
                        <input
                          type="text"
                          value={editedValues.amount2 || formatAmount(selectedEntry.amount * 0.167)}
                          onChange={(e) => setEditedValues({...editedValues, amount2: e.target.value})}
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowLeft') {
                              e.preventDefault();
                              setEditingCell({row: 2, field: 'account2'});
                            } else if (e.key === 'ArrowUp') {
                              e.preventDefault();
                              setEditingCell({row: 1, field: 'amount1'});
                            } else if (e.key === ' ') {
                              e.preventDefault();
                              // Basculer le toggle avec la barre d'espace
                              setLineTypes(prev => ({ ...prev, line2: !prev.line2 }));
                            } else if (e.key === 'Escape' || e.key === 'Enter') {
                              setEditingCell(null);
                            }
                          }}
                          className="w-24 px-1 py-0.5 border border-violet-300 rounded text-sm text-right font-medium focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <span 
                          onClick={() => setEditingCell({row: 2, field: 'amount2'})}
                          className="text-sm font-medium cursor-pointer hover:underline"
                        >
                          {formatAmount(selectedEntry.amount * 0.167)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 py-2.5 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors">
                  {expertMode ? 'Lettrer' : 'Rapprocher'}
                </button>
                <button className="flex-1 py-2.5 border border-neutral-300 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors">
                  Modifier
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* Bottom Action Bar */}
      <AnimatePresence>
        {selectionMode && selectedItems.size > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 right-0 z-50 backdrop-blur-2xl bg-white/90 border-t border-gray-200/50"
            style={{ bottom: isMobile ? '60px' : '80px' }}
          >
            {/* Header de sélection */}
            <div className="px-4 py-2 flex items-center justify-between border-b border-gray-100">
              <button onClick={clearSelection} className="p-1">
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <span className="font-medium text-gray-900">
                {selectedItems.size} sélectionné{selectedItems.size > 1 ? 's' : ''}
              </span>
              <button onClick={selectAll} className="text-sm text-blue-600 font-medium">
                Tout
              </button>
            </div>
            
            {/* Actions */}
            <div className="px-4 pt-3 pb-6">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={handleLettrage}
                  disabled={selectedItems.size < 2}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-xl transition-all",
                    selectedItems.size >= 2 
                      ? "bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 active:scale-95" 
                      : "bg-gray-50 border border-gray-200/50 opacity-50"
                  )}
                >
                  <Link2 className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-medium text-blue-900">Lettrer</span>
                </button>
                
                <button 
                  onClick={handleRapprochement}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/50 active:scale-95 transition-transform"
                >
                  <GitMerge className="w-5 h-5 text-green-600" />
                  <span className="text-xs font-medium text-green-900">Rapprocher</span>
                </button>
                
                <button 
                  onClick={handleValidation}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50 active:scale-95 transition-transform"
                >
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <span className="text-xs font-medium text-purple-900">Valider</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Document Viewer OKÉ */}
      <ViewerComponent mode="auto" glassMorphism={true} />
    </div>
  );
});

TimelineView.displayName = 'TimelineView';

export default TimelineView;