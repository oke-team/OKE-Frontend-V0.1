'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDocumentViewer } from '@/components/ui/DocumentViewerAdvanced';
import {
  ChevronRight,
  Download,
  Eye,
  Printer,
  Paperclip,
  CreditCard,
  FileText,
  Receipt,
  FileSignature,
  Banknote,
  ChevronDown,
  Filter,
  ArrowUpDown,
  MessageSquare,
  Link2,
  RefreshCw,
  Search,
  X,
  FileSpreadsheet,
  Settings,
  Info,
  Columns3,
  Check
} from 'lucide-react';
import { JournalEntry, BankTransaction, getEntriesByAccount, getEntriesByPiece, calculateProgressiveBalance, getBankTransactionById } from '@/lib/accounting-data';

interface GeneralLedgerTableProps {
  selectedAccount: string | null;
  selectedAccountLabel?: string;
  onEntryEdit?: (entry: JournalEntry) => void;
  onSelectionChange?: (selected: Set<string>) => void;
}

export default function GeneralLedgerTable({ 
  selectedAccount, 
  selectedAccountLabel = '',
  onEntryEdit,
  onSelectionChange 
}: GeneralLedgerTableProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [editingCell, setEditingCell] = useState<{id: string, field: string} | null>(null);
  const [editedEntry, setEditedEntry] = useState<JournalEntry | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [showBankModal, setShowBankModal] = useState<BankTransaction | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
  
  // États pour les fonctionnalités expert
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<{
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    journal?: string;
    lettrage?: string;
  }>({});
  const [sortConfig, setSortConfig] = useState<{field: string, direction: 'asc' | 'desc'}>({ field: 'date', direction: 'desc' });
  const [showReclassDialog, setShowReclassDialog] = useState(false);
  const [showLettrageDialog, setShowLettrageDialog] = useState(false);
  const [newAccountCode, setNewAccountCode] = useState('');
  const [newLettrage, setNewLettrage] = useState('');
  const [actionsExpanded, setActionsExpanded] = useState(false);

  // États pour la gestion des colonnes FEC
  const [showColumnConfig, setShowColumnConfig] = useState(false);
  const [fecColumns, setFecColumns] = useState<{[key: string]: boolean}>({
    // FEC columns only (initially hidden to preserve current view)
    JournalLib: false,
    EcritureNum: false,
    CompAuxNum: false,
    PieceDate: false,
    ValidDate: false,
    Idevise: false
  });

  // Configuration des colonnes FEC
  const fecColumnConfig = {
    JournalLib: { label: 'LIBELLÉ JAL', width: '150px', align: 'left' as const },
    EcritureNum: { label: 'N° ÉCRITURE', width: '120px', align: 'center' as const },
    CompAuxNum: { label: 'CPTE AUX', width: '120px', align: 'left' as const },
    PieceDate: { label: 'DATE PIÈCE', width: '110px', align: 'center' as const },
    ValidDate: { label: 'DATE VALID', width: '110px', align: 'center' as const },
    Idevise: { label: 'DEV', width: '70px', align: 'center' as const }
  };

  // Colonnes FEC actives mémorisées avec validation stricte
  const activeFecColumns = useMemo(() => {
    return Object.keys(fecColumnConfig)
      .filter(key => key && typeof key === 'string' && key.length > 0 && fecColumns[key] === true);
  }, [fecColumns]);

  // Hook pour détecter la taille d'écran
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Hook pour gérer l'indicateur de scroll horizontal
  useEffect(() => {
    const checkScrollIndicator = () => {
      if (scrollContainer) {
        const hasHorizontalScroll = scrollContainer.scrollWidth > scrollContainer.clientWidth;
        setShowScrollIndicator(hasHorizontalScroll);
      }
    };
    
    if (scrollContainer) {
      checkScrollIndicator();
      window.addEventListener('resize', checkScrollIndicator);
      return () => window.removeEventListener('resize', checkScrollIndicator);
    }
  }, [scrollContainer, entries]);

  useEffect(() => {
    if (selectedAccount) {
      const accountEntries = getEntriesByAccount(selectedAccount);
      const entriesWithBalance = calculateProgressiveBalance(accountEntries);
      setEntries(entriesWithBalance);
    } else {
      setEntries([]);
    }
  }, [selectedAccount]);

  const formatNumber = (num: number) => {
    // Format compact pour les gros montants (harmonisé avec BalanceTable)
    const absNum = Math.abs(num);
    if (absNum >= 1000000000) {
      return (num / 1000000000).toFixed(2).replace('.', ',') + ' Mds';
    } else if (absNum >= 1000000) {
      return (num / 1000000).toFixed(2).replace('.', ',') + ' M';
    }
    // Format standard avec espaces comme séparateurs de milliers
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num).replace(/\s/g, ' ');
  };

  // Calculer le total des lignes sélectionnées
  const calculateSelectedTotal = () => {
    let totalDebit = 0;
    let totalCredit = 0;
    entries.forEach(entry => {
      if (selectedRows.has(entry.id)) {
        totalDebit += entry.debit;
        totalCredit += entry.credit;
      }
    });
    return { debit: totalDebit, credit: totalCredit, solde: totalDebit - totalCredit };
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      const allIds = new Set(entries.map(e => e.id));
      setSelectedRows(allIds);
    }
    setSelectAll(!selectAll);
    onSelectionChange?.(selectAll ? new Set() : selectedRows);
  };

  const handleRowSelect = (entryId: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(entryId)) {
      newSelected.delete(entryId);
    } else {
      newSelected.add(entryId);
    }
    setSelectedRows(newSelected);
    setSelectAll(false);
    onSelectionChange?.(newSelected);
  };

  const toggleExpanded = (entryId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(entryId)) {
      newExpanded.delete(entryId);
    } else {
      newExpanded.add(entryId);
    }
    setExpandedRows(newExpanded);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };


  const getJournalBadge = (journal: string) => {
    const colors: Record<string, {bg: string, text: string}> = {
      'BQ': { bg: 'rgba(245, 158, 11, 0.9)', text: 'white' },
      'AC': { bg: 'rgba(16, 185, 129, 0.9)', text: 'white' },
      'VE': { bg: 'rgba(59, 130, 246, 0.9)', text: 'white' },
      'PA': { bg: 'rgba(139, 92, 246, 0.9)', text: 'white' },
      'OD': { bg: 'rgba(107, 114, 128, 0.9)', text: 'white' }
    };
    
    const style = colors[journal] || { bg: 'rgba(229, 229, 229, 0.9)', text: '#666' };
    
    return (
      <span style={{
        padding: '2px 6px',
        borderRadius: '3px',
        fontSize: '10px',
        fontWeight: 600,
        backgroundColor: style.bg,
        color: style.text
      }}>
        {journal}
      </span>
    );
  };

  const startEditing = (entry: JournalEntry, field: string) => {
    setEditingCell({ id: entry.id, field });
    setEditedEntry({ ...entry });
  };

  const getAttachmentIcon = (type?: string) => {
    switch(type) {
      case 'invoice': return <FileText size={12} />;
      case 'receipt': return <Receipt size={12} />;
      case 'contract': return <FileSignature size={12} />;
      case 'bank_statement': return <Banknote size={12} />;
      default: return <Paperclip size={12} />;
    }
  };

  const getBankLogo = (bankName?: string) => {
    switch(bankName) {
      case 'BNP': 
        return <span style={{ fontSize: '11px', fontWeight: 600, color: '#00966C' }}>BNP</span>;
      case 'SG': 
        return <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000' }}>SG</span>;
      case 'CA': 
        return <span style={{ fontSize: '11px', fontWeight: 600, color: '#006F35' }}>CA</span>;
      case 'LCL': 
        return <span style={{ fontSize: '11px', fontWeight: 600, color: '#007BC7' }}>LCL</span>;
      case 'CE': 
        return <span style={{ fontSize: '11px', fontWeight: 600, color: '#1E5397' }}>CE</span>;
      case 'CM': 
        return <span style={{ fontSize: '11px', fontWeight: 600, color: '#004494' }}>CM</span>;
      case 'HSBC': 
        return <span style={{ fontSize: '11px', fontWeight: 600, color: '#DB0011' }}>HSBC</span>;
      case 'BP': 
        return <span style={{ fontSize: '11px', fontWeight: 600, color: '#004E99' }}>BP</span>;
      default: 
        return <CreditCard size={12} />;
    }
  };

  // Hook pour le viewer de documents OKÉ
  const { open: openDocument, ViewerComponent } = useDocumentViewer();

  const handleAttachmentClick = (entry: JournalEntry) => {
    if (entry.attachmentUrl) {
      // Utiliser le DocumentViewer OKÉ au lieu d'ouvrir une nouvelle fenêtre
      openDocument({
        src: entry.attachmentUrl,
        title: entry.attachmentName || `Pièce jointe - ${entry.label}`,
        type: entry.attachmentType === 'invoice' ? 'pdf' : 'document'
      });
    }
  };

  const handleBankTransactionClick = (entry: JournalEntry, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (entry.bankTransactionId) {
      const transaction = getBankTransactionById(entry.bankTransactionId);
      if (transaction) {
        setShowBankModal(transaction);
      }
    }
  };

  const saveEdit = () => {
    if (editedEntry && editingCell) {
      // Mettre à jour l'entrée dans la liste principale
      const updatedEntries = entries.map(e => 
        e.id === editedEntry.id ? editedEntry : e
      );
      
      const entriesWithBalance = calculateProgressiveBalance(updatedEntries);
      setEntries(entriesWithBalance);
      onEntryEdit?.(editedEntry);
      setEditingCell(null);
      setEditedEntry(null);
    }
  };

  const cancelEditing = () => {
    setEditingCell(null);
    setEditedEntry(null);
  };

  const handleKeyNavigation = (e: React.KeyboardEvent, entry: JournalEntry, field: string) => {
    const editableFields = ['description', 'debit', 'credit'];
    const currentFieldIndex = editableFields.indexOf(field);
    
    if (e.key === 'Tab' && !e.shiftKey && currentFieldIndex < editableFields.length - 1) {
      e.preventDefault();
      saveEdit();
      startEditing(entry, editableFields[currentFieldIndex + 1]);
    } else if (e.key === 'Tab' && e.shiftKey && currentFieldIndex > 0) {
      e.preventDefault();
      saveEdit();
      startEditing(entry, editableFields[currentFieldIndex - 1]);
    } else if (e.key === 'ArrowLeft' && currentFieldIndex > 0) {
      e.preventDefault();
      saveEdit();
      startEditing(entry, editableFields[currentFieldIndex - 1]);
    } else if (e.key === 'ArrowRight' && currentFieldIndex < editableFields.length - 1) {
      e.preventDefault();
      saveEdit();
      startEditing(entry, editableFields[currentFieldIndex + 1]);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      
      // Créer une liste complète incluant les contreparties déployées
      const allVisibleEntries: JournalEntry[] = [];
      entries.forEach(ent => {
        allVisibleEntries.push(ent);
        if (expandedRows.has(ent.id)) {
          const counterparts = getEntriesByPiece(ent.piece).filter(e => e.id !== ent.id);
          allVisibleEntries.push(...counterparts);
        }
      });
      
      const currentIndex = allVisibleEntries.findIndex(ent => ent.id === entry.id);
      const targetIndex = e.key === 'ArrowUp' ? currentIndex - 1 : currentIndex + 1;
      
      if (targetIndex >= 0 && targetIndex < allVisibleEntries.length) {
        saveEdit();
        startEditing(allVisibleEntries[targetIndex], field);
      }
    }
  };

  // Filtrage des entrées
  const filteredEntries = useMemo(() => {
    let result = [...entries];
    
    // Recherche dans le libellé
    if (filters.search) {
      result = result.filter(e => 
        e.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    // Filtre par période
    if (filters.dateFrom) {
      result = result.filter(e => e.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      result = result.filter(e => e.date <= filters.dateTo);
    }
    
    // Filtre par journal
    if (filters.journal) {
      result = result.filter(e => e.journal === filters.journal);
    }
    
    // Filtre par lettrage
    if (filters.lettrage === 'lettre') {
      result = result.filter(e => e.lettrage);
    } else if (filters.lettrage === 'non-lettre') {
      result = result.filter(e => !e.lettrage);
    }
    
    // Tri
    result.sort((a, b) => {
      const aValue = a[sortConfig.field as keyof JournalEntry];
      const bValue = b[sortConfig.field as keyof JournalEntry];
      
      // Gestion spéciale pour le lettrage (peut être null/undefined)
      if (sortConfig.field === 'lettrage') {
        const aHasLettrage = aValue !== null && aValue !== undefined && aValue !== '';
        const bHasLettrage = bValue !== null && bValue !== undefined && bValue !== '';
        
        if (!aHasLettrage && !bHasLettrage) return 0;
        if (!aHasLettrage) return sortConfig.direction === 'asc' ? 1 : -1;
        if (!bHasLettrage) return sortConfig.direction === 'asc' ? -1 : 1;
      }
      
      if (aValue === null || aValue === undefined || aValue === '') return 1;
      if (bValue === null || bValue === undefined || bValue === '') return -1;
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return result;
  }, [entries, filters, sortConfig]);

  // Fonction pour gérer le tri
  const handleSort = (field: string) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (!selectedAccount) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        border: '1px solid rgba(229, 229, 229, 0.3)',
        padding: '2rem'
      }}>
        <Eye size={48} style={{ color: '#d4d4d8', marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '15px', fontWeight: 500, color: '#666', marginBottom: '0.5rem' }}>
          Sélectionnez un compte
        </h3>
        <p style={{ fontSize: '13px', color: '#a3a3a3', textAlign: 'center' }}>
          Cliquez sur un compte dans la balance pour afficher son grand livre
        </p>
      </div>
    );
  }

  // Composant Card pour mobile simplifié
  const EntryCard = ({ entry, index }: { entry: JournalEntry; index: number }) => {
    const isExpanded = expandedRows.has(entry.id);
    const counterparts = getEntriesByPiece(entry.piece).filter(e => e.id !== entry.id);
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.02 }}
        className="bg-white border-b border-neutral-100"
      >
        {/* Ligne principale simplifiée */}
        <div
          onClick={() => counterparts.length > 0 && toggleExpanded(entry.id)}
          className={`px-4 py-3 ${counterparts.length > 0 ? 'cursor-pointer active:bg-neutral-50' : ''}`}
        >
          {/* Première ligne: Date et montants */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500">
                {formatDate(entry.date)}
              </span>
              {getJournalBadge(entry.journal)}
              {entry.lettrage && (
                <span className="px-1.5 py-0.5 bg-violet-100 text-violet-700 rounded text-2xs font-medium">
                  {entry.lettrage}
                </span>
              )}
            </div>
            {/* Solde progressif mis en évidence */}
            <div className="text-right">
              <div className={`text-base font-semibold ${
                entry.balance < 0 ? 'text-red-600' : 'text-neutral-900'
              }`}>
                {formatNumber(Math.abs(entry.balance))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-2">
            {entry.attachmentUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAttachmentClick(entry);
                }}
                className="p-1 text-violet-600 hover:bg-violet-50 rounded"
              >
                {getAttachmentIcon(entry.attachmentType)}
              </button>
            )}
            {entry.bankTransactionId && (() => {
              const transaction = getBankTransactionById(entry.bankTransactionId);
              return (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBankTransactionClick(entry, e);
                  }}
                  className="p-1 hover:bg-amber-50 rounded"
                >
                  {getBankLogo(transaction?.bankName)}
                </button>
              );
            })()}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-neutral-700 line-clamp-2">
                {entry.description}
              </p>
            </div>
          </div>

          {/* Montants en ligne */}
          <div className="flex items-center gap-4 mt-2 text-xs">
            {entry.debit > 0 && (
              <span className="text-neutral-600">
                Débit: <span className="font-medium text-neutral-900">{formatNumber(entry.debit)}</span>
              </span>
            )}
            {entry.credit > 0 && (
              <span className="text-neutral-600">
                Crédit: <span className="font-medium text-neutral-900">{formatNumber(entry.credit)}</span>
              </span>
            )}
            {counterparts.length > 0 && (
              <div className="ml-auto flex items-center text-violet-600">
                <ChevronDown
                  size={14}
                  className={`transform transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </div>
            )}
          </div>
        </div>

        {/* Contreparties expandues simplifiées */}
        <AnimatePresence>
          {isExpanded && counterparts.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-neutral-50 border-t border-neutral-100"
            >
              {counterparts.map((counterpart) => (
                <div
                  key={counterpart.id}
                  className="px-4 py-2 border-b border-neutral-100 last:border-b-0"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-neutral-400">└</span>
                    <span className="font-mono text-violet-600">
                      {counterpart.accountCode}
                    </span>
                    <span className="text-neutral-600 truncate">
                      {counterpart.accountLabel}
                    </span>
                    <div className="ml-auto flex gap-3 text-xs">
                      {counterpart.debit > 0 && (
                        <span className="text-neutral-900 font-medium">
                          {formatNumber(counterpart.debit)}
                        </span>
                      )}
                      {counterpart.credit > 0 && (
                        <span className="text-neutral-900 font-medium">
                          {formatNumber(counterpart.credit)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'white',
      borderRadius: isMobile ? '0.5rem' : '0.75rem',
      border: '1px solid rgba(229, 229, 229, 0.3)',
      overflow: 'hidden'
    }}>
      {/* Header avec barre de recherche et filtres */}
      <div style={{
        borderBottom: '1px solid rgba(229, 229, 229, 0.3)',
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(250, 250, 250, 0.95))',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Ligne principale du header */}
        <div style={{
          padding: isMobile ? '1rem' : '0.75rem 1rem',
        }}>
        {isMobile ? (
          // Version mobile du header simplifiée
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Grand Livre
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium text-violet-600">
                    {selectedAccount}
                  </span>
                  <span className="text-sm text-neutral-500">
                    {selectedAccountLabel}
                  </span>
                </div>
              </div>
              <span className="text-sm text-neutral-500">
                {filteredEntries.length} écritures
              </span>
            </div>
          </div>
        ) : (
          // Version desktop du header
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#171717' }}>
                Grand Livre
              </h2>
              <ChevronRight size={14} style={{ color: '#666' }} />
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#5e72ff' }}>
                {selectedAccount}
              </span>
              <span style={{ fontSize: '14px', color: '#666' }}>
                {selectedAccountLabel}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  {filteredEntries.length} écritures
                </span>
                {/* FEC compliance indicator */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.25rem',
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '0.375rem',
                  fontSize: '10px',
                  color: '#10b981',
                  fontWeight: 500,
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}
                title="Toutes les écritures sont conformes FEC"
                >
                  <Check size={10} />
                  FEC OK
                </div>
              </div>
              <button style={{
                padding: '0.25rem 0.5rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(229, 229, 229, 0.5)',
                borderRadius: '0.375rem',
                fontSize: '11px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}>
                <Printer size={12} />
                Imprimer
              </button>
              <button style={{
                padding: '0.25rem 0.5rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(229, 229, 229, 0.5)',
                borderRadius: '0.375rem',
                fontSize: '11px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}>
                <Download size={12} />
                Export
              </button>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: showFilters ? 'rgba(94, 114, 255, 0.1)' : 'transparent',
                  border: '1px solid',
                  borderColor: showFilters ? '#5e72ff' : 'rgba(229, 229, 229, 0.5)',
                  borderRadius: '0.375rem',
                  fontSize: '11px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {
                  if (!showFilters) e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                }}
                onMouseLeave={(e) => {
                  if (!showFilters) e.currentTarget.style.backgroundColor = 'transparent';
                }}>
                <Filter size={12} style={{ color: showFilters ? '#5e72ff' : '#666' }} />
                Filtres
              </button>
              <button 
                onClick={() => setShowColumnConfig(!showColumnConfig)}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: showColumnConfig ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                  border: '1px solid',
                  borderColor: showColumnConfig ? '#10b981' : 'rgba(229, 229, 229, 0.5)',
                  borderRadius: '0.375rem',
                  fontSize: '11px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {
                  if (!showColumnConfig) e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                }}
                onMouseLeave={(e) => {
                  if (!showColumnConfig) e.currentTarget.style.backgroundColor = 'transparent';
                }}
                title="Configuration des colonnes FEC"
                >
                <Columns3 size={12} style={{ color: showColumnConfig ? '#10b981' : '#666' }} />
                FEC
              </button>
            </div>
          </div>
        )}
        </div>

        {/* Barre de recherche et filtres */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                padding: '0.75rem 1rem',
                borderTop: '1px solid rgba(229, 229, 229, 0.15)',
                backgroundColor: 'rgba(250, 250, 250, 0.5)'
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {/* Recherche */}
                <div style={{ flex: '1 1 250px', position: 'relative' }}>
                  <Search size={14} style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#a3a3a3'
                  }} />
                  <input
                    type="text"
                    placeholder="Rechercher dans le libellé..."
                    value={filters.search || ''}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem 0.5rem 2.25rem',
                      border: '1px solid rgba(229, 229, 229, 0.5)',
                      borderRadius: '0.375rem',
                      fontSize: '12px',
                      outline: 'none',
                      transition: 'border-color 0.15s',
                      backgroundColor: 'white'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#5e72ff'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(229, 229, 229, 0.5)'}
                  />
                </div>

                {/* Filtre par période */}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <label style={{ fontSize: '11px', color: '#666' }}>Période:</label>
                  <input
                    type="date"
                    value={filters.dateFrom || ''}
                    onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                    style={{
                      padding: '0.375rem 0.5rem',
                      border: '1px solid rgba(229, 229, 229, 0.5)',
                      borderRadius: '0.375rem',
                      fontSize: '11px',
                      outline: 'none'
                    }}
                  />
                  <span style={{ fontSize: '11px', color: '#a3a3a3' }}>à</span>
                  <input
                    type="date"
                    value={filters.dateTo || ''}
                    onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                    style={{
                      padding: '0.375rem 0.5rem',
                      border: '1px solid rgba(229, 229, 229, 0.5)',
                      borderRadius: '0.375rem',
                      fontSize: '11px',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Filtre par journal */}
                <select
                  value={filters.journal || ''}
                  onChange={(e) => setFilters({...filters, journal: e.target.value})}
                  style={{
                    padding: '0.375rem 0.5rem',
                    border: '1px solid rgba(229, 229, 229, 0.5)',
                    borderRadius: '0.375rem',
                    fontSize: '11px',
                    outline: 'none',
                    cursor: 'pointer',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Tous les journaux</option>
                  <option value="BQ">Banque (BQ)</option>
                  <option value="AC">Achats (AC)</option>
                  <option value="VE">Ventes (VE)</option>
                  <option value="PA">Paie (PA)</option>
                  <option value="OD">Opérations diverses (OD)</option>
                </select>

                {/* Filtre par lettrage */}
                <select
                  value={filters.lettrage || ''}
                  onChange={(e) => setFilters({...filters, lettrage: e.target.value})}
                  style={{
                    padding: '0.375rem 0.5rem',
                    border: '1px solid rgba(229, 229, 229, 0.5)',
                    borderRadius: '0.375rem',
                    fontSize: '11px',
                    outline: 'none',
                    cursor: 'pointer',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Tout</option>
                  <option value="lettre">Lettré</option>
                  <option value="non-lettre">Non lettré</option>
                </select>

                {/* Bouton pour réinitialiser les filtres */}
                {Object.keys(filters).length > 0 && (
                  <button
                    onClick={() => setFilters({})}
                    style={{
                      padding: '0.375rem 0.75rem',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(229, 229, 229, 0.5)',
                      borderRadius: '0.375rem',
                      fontSize: '11px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      transition: 'all 0.15s',
                      color: '#666'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                      e.currentTarget.style.color = '#ef4444';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(229, 229, 229, 0.5)';
                      e.currentTarget.style.color = '#666';
                    }}
                  >
                    <X size={12} />
                    Réinitialiser
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Panel de configuration des colonnes FEC */}
        <AnimatePresence>
          {showColumnConfig && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ 
                overflow: 'hidden',
                borderTop: '1px solid rgba(229, 229, 229, 0.3)'
              }}
            >
              <div style={{ padding: '1rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Info size={16} style={{ color: '#10b981' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#171717' }}>
                      Configuration des colonnes FEC
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#666' }}>
                    Affichez les champs obligatoires du Fichier des Écritures Comptables
                  </span>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '0.75rem' 
                }}>
                  {Object.entries({
                    JournalLib: 'Libellé journal',
                    EcritureNum: 'Numéro d\'écriture',
                    CompAuxNum: 'Compte auxiliaire',
                    PieceDate: 'Date pièce',
                    ValidDate: 'Date validation',
                    Idevise: 'Devise'
                  }).map(([key, label]) => (
                    <label key={key} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      cursor: 'pointer',
                      fontSize: '12px',
                      color: '#374151'
                    }}>
                      <input
                        type="checkbox"
                        checked={fecColumns[key] || false}
                        onChange={(e) => setFecColumns(prev => ({ ...prev, [key]: e.target.checked }))}
                        style={{
                          width: '16px',
                          height: '16px',
                          cursor: 'pointer',
                          accentColor: '#10b981'
                        }}
                      />
                      <span>{label}</span>
                      {fecColumns[key] ? <Check size={12} style={{ color: '#10b981' }} /> : null}
                    </label>
                  ))}
                </div>

                <div style={{ 
                  marginTop: '1rem', 
                  paddingTop: '1rem', 
                  borderTop: '1px solid rgba(229, 229, 229, 0.3)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '11px', color: '#666' }}>
                    {activeFecColumns.length} colonnes FEC actives
                  </span>
                  <button
                    onClick={() => setFecColumns(prev => ({
                      ...prev,
                      JournalLib: false,
                      EcritureNum: false,
                      CompAuxNum: false,
                      PieceDate: false,
                      ValidDate: false,
                      Idevise: false
                    }))}
                    style={{
                      padding: '0.375rem 0.75rem',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(229, 229, 229, 0.5)',
                      borderRadius: '0.375rem',
                      fontSize: '11px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      transition: 'all 0.15s',
                      color: '#666'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                      e.currentTarget.style.color = '#ef4444';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(229, 229, 229, 0.5)';
                      e.currentTarget.style.color = '#666';
                    }}
                  >
                    <X size={12} />
                    Réinitialiser vue standard
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contenu principal responsive */}
      {isMobile ? (
        // Version mobile avec cards simplifiées
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {filteredEntries.map((entry, index) => (
              <EntryCard key={entry.id} entry={entry} index={index} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        // Version desktop avec table
        <div style={{
          flex: 1,
          overflow: 'auto',
          position: 'relative'
        }}>
          {showScrollIndicator && (
            <div style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              zIndex: 20,
              backgroundColor: 'rgba(94, 114, 255, 0.1)',
              color: '#5e72ff',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '11px',
              fontWeight: 500
            }}>
              Faites défiler horizontalement →
            </div>
          )}
          <div
            ref={setScrollContainer}
            style={{
              overflowX: 'auto',
              overflowY: 'auto'
            }}
          >
        <table style={{ 
          width: '100%',
          borderCollapse: 'collapse' 
        }}>
          <thead style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'rgba(250, 250, 250, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(229, 229, 229, 0.3)',
            zIndex: 10
          }}>
            <tr>
              <th style={{
                padding: '0.5rem 0.75rem',
                width: '40px'
              }}>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                    accentColor: '#5e72ff'
                  }}
                />
              </th>
              <th style={{
                padding: '0.5rem 0.25rem',
                width: '45px'
              }}></th>
              <th style={{
                padding: '0.5rem 0.5rem',
                textAlign: 'left',
                fontSize: '11px',
                fontWeight: 600,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: '90px'
              }}>
                <button
                  onClick={() => handleSort('date')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: 'inherit',
                    font: 'inherit',
                    textAlign: 'left'
                  }}
                >
                  <span>Date</span>
                  <ArrowUpDown size={10} style={{ 
                    color: sortConfig.field === 'date' ? '#5e72ff' : '#d4d4d8',
                    transform: sortConfig.field === 'date' && sortConfig.direction === 'desc' ? 'rotate(180deg)' : 'none'
                  }} />
                </button>
              </th>
              <th style={{
                padding: '0.5rem 0.5rem',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: 600,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: '50px'
              }}>
                <button
                  onClick={() => handleSort('journal')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: 'inherit',
                    font: 'inherit',
                    textAlign: 'left'
                  }}
                >
                  <span>Jal</span>
                  <ArrowUpDown size={10} style={{ 
                    color: sortConfig.field === 'journal' ? '#5e72ff' : '#d4d4d8',
                    transform: sortConfig.field === 'journal' && sortConfig.direction === 'desc' ? 'rotate(180deg)' : 'none'
                  }} />
                </button>
              </th>
              <th style={{
                padding: '0.5rem 0.5rem',
                textAlign: 'left',
                fontSize: '11px',
                fontWeight: 600,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: '40%',
                minWidth: '200px'
              }}>
                <button
                  onClick={() => handleSort('description')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: 'inherit',
                    font: 'inherit',
                    textAlign: 'left'
                  }}
                >
                  <span>Libellé</span>
                  <ArrowUpDown size={10} style={{ 
                    color: sortConfig.field === 'description' ? '#5e72ff' : '#d4d4d8',
                    transform: sortConfig.field === 'description' && sortConfig.direction === 'desc' ? 'rotate(180deg)' : 'none'
                  }} />
                </button>
              </th>
              <th style={{
                padding: '0.5rem 0.5rem',
                textAlign: 'center',
                fontSize: '11px',
                fontWeight: 600,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: '50px'
              }}>
                <button
                  onClick={() => handleSort('lettrage')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: 'inherit',
                    font: 'inherit',
                    width: '100%'
                  }}
                >
                  <span>Let</span>
                  <ArrowUpDown size={10} style={{ 
                    color: sortConfig.field === 'lettrage' ? '#5e72ff' : '#d4d4d8',
                    transform: sortConfig.field === 'lettrage' && sortConfig.direction === 'desc' ? 'rotate(180deg)' : 'none'
                  }} />
                </button>
              </th>
              <th style={{
                padding: '0.5rem 0.75rem',
                textAlign: 'right',
                fontSize: '11px',
                fontWeight: 600,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: '90px'
              }}>
                <button
                  onClick={() => handleSort('debit')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.25rem',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: 'inherit',
                    font: 'inherit',
                    textAlign: 'right',
                    width: '100%'
                  }}
                >
                  <span>Débit</span>
                  <ArrowUpDown size={10} style={{ 
                    color: sortConfig.field === 'debit' ? '#5e72ff' : '#d4d4d8',
                    transform: sortConfig.field === 'debit' && sortConfig.direction === 'desc' ? 'rotate(180deg)' : 'none'
                  }} />
                </button>
              </th>
              <th style={{
                padding: '0.5rem 0.75rem',
                textAlign: 'right',
                fontSize: '11px',
                fontWeight: 600,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: '90px'
              }}>
                <button
                  onClick={() => handleSort('credit')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.25rem',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: 'inherit',
                    font: 'inherit',
                    textAlign: 'right',
                    width: '100%'
                  }}
                >
                  <span>Crédit</span>
                  <ArrowUpDown size={10} style={{ 
                    color: sortConfig.field === 'credit' ? '#5e72ff' : '#d4d4d8',
                    transform: sortConfig.field === 'credit' && sortConfig.direction === 'desc' ? 'rotate(180deg)' : 'none'
                  }} />
                </button>
              </th>
              <th style={{
                padding: '0.5rem 0.75rem',
                textAlign: 'right',
                fontSize: '11px',
                fontWeight: 600,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: '100px'
              }}>
                <button
                  onClick={() => handleSort('balance')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.25rem',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: 'inherit',
                    font: 'inherit',
                    textAlign: 'right',
                    width: '100%'
                  }}
                >
                  <span>Solde</span>
                  <ArrowUpDown size={10} style={{ 
                    color: sortConfig.field === 'balance' ? '#5e72ff' : '#d4d4d8',
                    transform: sortConfig.field === 'balance' && sortConfig.direction === 'desc' ? 'rotate(180deg)' : 'none'
                  }} />
                </button>
              </th>
              {/* FEC columns headers */}
              {activeFecColumns.length > 0 && activeFecColumns.map((key, index) => {
                const config = fecColumnConfig[key];
                return (
                  <th key={`fec-h-${index}`} style={{
                    padding: '0.5rem 0.75rem',
                    textAlign: config.align,
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#a3a3a3',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    minWidth: config.width,
                    backgroundColor: 'rgba(250, 250, 250, 0.5)',
                    borderLeft: '1px solid rgba(229, 229, 229, 0.3)',
                    whiteSpace: 'nowrap'
                  }}>
                    <span>{config.label}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredEntries.map((entry, index) => (
                <React.Fragment key={entry.id}>
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.01 }}
                    style={{
                      borderBottom: expandedRows.has(entry.id) ? 'none' : '1px solid rgba(229, 229, 229, 0.15)',
                      backgroundColor: selectedRows.has(entry.id) ? 'rgba(94, 114, 255, 0.03)' : 'transparent',
                      transition: 'background-color 0.15s'
                    }}
                    onMouseEnter={(e) => {
                      if (!selectedRows.has(entry.id)) {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.01)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!selectedRows.has(entry.id)) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <td style={{ padding: '0.375rem 0.75rem', width: '40px' }}>
                      <input
                        type="checkbox"
                        checked={selectedRows.has(entry.id)}
                        onChange={() => handleRowSelect(entry.id)}
                        style={{
                          width: '16px',
                          height: '16px',
                          cursor: 'pointer',
                          accentColor: '#5e72ff'
                        }}
                      />
                    </td>
                    <td style={{ padding: '0.375rem 0.25rem', width: '45px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
                        <button
                          onClick={() => toggleExpanded(entry.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '0.25rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'transform 0.2s'
                          }}
                        >
                          <ChevronRight 
                            size={12} 
                            style={{ 
                              color: '#666',
                              transform: expandedRows.has(entry.id) ? 'rotate(90deg)' : 'none',
                              transition: 'transform 0.2s'
                            }} 
                          />
                        </button>
                      </div>
                    </td>
                    <td style={{ 
                      padding: '0.375rem 0.5rem', 
                      fontSize: '12px',
                      width: '90px',
                      whiteSpace: 'nowrap'
                    }}>
                      {formatDate(entry.date)}
                    </td>
                    <td style={{ 
                      padding: '0.375rem 0.5rem', 
                      fontSize: '13px',
                      width: '50px'
                    }}>
                      {getJournalBadge(entry.journal)}
                    </td>
                    <td 
                      style={{ 
                        padding: '0.375rem 0.5rem', 
                        fontSize: '13px', 
                        cursor: 'text',
                        width: '40%',
                        minWidth: '200px'
                      }}
                      onDoubleClick={() => startEditing(entry, 'description')}
                    >
                      {editingCell?.id === entry.id && editingCell?.field === 'description' ? (
                        <input
                          type="text"
                          value={editedEntry?.description || ''}
                          onChange={(e) => setEditedEntry(prev => prev ? {...prev, description: e.target.value} : null)}
                          onBlur={saveEdit}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') cancelEditing();
                            handleKeyNavigation(e, entry, 'description');
                          }}
                          style={{
                            width: '400px',
                            padding: '0.125rem 0.25rem',
                            border: '1px solid #5e72ff',
                            borderRadius: '0.25rem',
                            fontSize: '13px',
                            outline: 'none',
                            backgroundColor: 'white'
                          }}
                          autoFocus
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          {/* Icônes en début de libellé */}
                          {entry.attachmentUrl && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAttachmentClick(entry);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                color: '#5e72ff',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'opacity 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                              title={entry.attachmentName || 'Pièce jointe'}
                            >
                              {getAttachmentIcon(entry.attachmentType)}
                            </button>
                          )}
                          {entry.bankTransactionId && (() => {
                            const transaction = getBankTransactionById(entry.bankTransactionId);
                            return (
                              <button
                                onClick={(e) => handleBankTransactionClick(entry, e)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  padding: 0,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  transition: 'opacity 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                title="Transaction bancaire"
                              >
                                {getBankLogo(transaction?.bankName)}
                              </button>
                            );
                          })()}
                          <span style={{
                            display: 'block',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }} 
                          title={entry.description}>
                            {entry.description}
                          </span>
                        </div>
                      )}
                    </td>
                    <td style={{ 
                      padding: '0.375rem 0.5rem', 
                      textAlign: 'center', 
                      fontSize: '11px',
                      width: '50px'
                    }}>
                      {entry.lettrage && (
                        <span style={{
                          padding: '1px 5px',
                          backgroundColor: 'rgba(139, 92, 246, 0.1)',
                          color: '#8b5cf6',
                          borderRadius: '3px',
                          fontWeight: 500
                        }}>
                          {entry.lettrage}
                        </span>
                      )}
                    </td>
                    <td 
                      style={{ 
                        padding: '0.375rem 0.75rem', 
                        textAlign: 'right', 
                        fontSize: '13px', 
                        cursor: 'text',
                        width: '90px',
                        whiteSpace: 'nowrap'
                      }}
                      onDoubleClick={() => startEditing(entry, 'debit')}
                    >
                      {editingCell?.id === entry.id && editingCell?.field === 'debit' ? (
                        <input
                          type="number"
                          value={editedEntry?.debit || 0}
                          onChange={(e) => setEditedEntry(prev => prev ? {...prev, debit: parseFloat(e.target.value) || 0} : null)}
                          onBlur={saveEdit}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') cancelEditing();
                            handleKeyNavigation(e, entry, 'debit');
                          }}
                          style={{
                            width: '80px',
                            padding: '0.125rem 0.25rem',
                            border: '1px solid #5e72ff',
                            borderRadius: '0.25rem',
                            fontSize: '13px',
                            textAlign: 'right',
                            outline: 'none'
                          }}
                          autoFocus
                        />
                      ) : (
                        <span style={{ color: entry.debit > 0 ? '#171717' : '#d4d4d8' }}>
                          {entry.debit > 0 ? formatNumber(entry.debit) : '-'}
                        </span>
                      )}
                    </td>
                    <td 
                      style={{ 
                        padding: '0.375rem 0.75rem', 
                        textAlign: 'right', 
                        fontSize: '13px', 
                        cursor: 'text',
                        width: '90px',
                        whiteSpace: 'nowrap'
                      }}
                      onDoubleClick={() => startEditing(entry, 'credit')}
                    >
                      {editingCell?.id === entry.id && editingCell?.field === 'credit' ? (
                        <input
                          type="number"
                          value={editedEntry?.credit || 0}
                          onChange={(e) => setEditedEntry(prev => prev ? {...prev, credit: parseFloat(e.target.value) || 0} : null)}
                          onBlur={saveEdit}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') cancelEditing();
                            handleKeyNavigation(e, entry, 'credit');
                          }}
                          style={{
                            width: '80px',
                            padding: '0.125rem 0.25rem',
                            border: '1px solid #5e72ff',
                            borderRadius: '0.25rem',
                            fontSize: '13px',
                            textAlign: 'right',
                            outline: 'none'
                          }}
                          autoFocus
                        />
                      ) : (
                        <span style={{ color: entry.credit > 0 ? '#171717' : '#d4d4d8' }}>
                          {entry.credit > 0 ? formatNumber(entry.credit) : ''}
                        </span>
                      )}
                    </td>
                    <td style={{ 
                      padding: '0.375rem 0.75rem', 
                      textAlign: 'right', 
                      fontSize: '12px',
                      width: '100px',
                      whiteSpace: 'nowrap'
                    }}>
                      <span style={{ 
                        fontWeight: 500,
                        color: entry.balance < 0 ? '#ef4444' : '#171717'
                      }}>
                        {entry.balance < 0 ? '-' : ''}{formatNumber(Math.abs(entry.balance))}
                      </span>
                    </td>
                    {/* FEC columns data */}
                    {activeFecColumns.length > 0 && activeFecColumns.map((key, index) => {
                      const config = fecColumnConfig[key];
                      return (
                        <td key={`fec-d-${entry.id}-${index}`} style={{ 
                          padding: '0.375rem 0.75rem', 
                          fontSize: '12px',
                          minWidth: config.width,
                          borderLeft: '1px solid rgba(229, 229, 229, 0.3)',
                          color: '#171717',
                          textAlign: config.align as any,
                          fontFamily: ['EcritureNum', 'PieceDate', 'ValidDate'].includes(key) ? 'monospace' : 'inherit',
                          backgroundColor: 'rgba(250, 250, 250, 0.2)',
                          whiteSpace: 'nowrap'
                        }}>
                          {key === 'JournalLib' && (
                            <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 500 }}>
                              {entry.fec?.JournalLib || '-'}
                            </span>
                          )}
                          {key === 'EcritureNum' && (
                            <span style={{ color: '#6b7280', fontSize: '12px' }}>
                              {entry.fec?.EcritureNum || '-'}
                            </span>
                          )}
                          {key === 'CompAuxNum' && (
                            <span style={{ color: '#6b7280', fontSize: '12px' }}>
                              {entry.fec?.CompAuxNum || '-'}
                            </span>
                          )}
                          {key === 'PieceDate' && (
                            <span style={{ color: '#6b7280', fontSize: '12px' }}>
                              {entry.fec?.PieceDate ? 
                                `${entry.fec.PieceDate.substring(0,4)}-${entry.fec.PieceDate.substring(4,6)}-${entry.fec.PieceDate.substring(6,8)}` 
                                : '-'}
                            </span>
                          )}
                          {key === 'ValidDate' && (
                            <span style={{ color: '#6b7280', fontSize: '12px' }}>
                              {entry.fec?.ValidDate ? 
                                `${entry.fec.ValidDate.substring(0,4)}-${entry.fec.ValidDate.substring(4,6)}-${entry.fec.ValidDate.substring(6,8)}` 
                                : '-'}
                            </span>
                          )}
                          {key === 'Idevise' && (
                            <span style={{
                              padding: '0.125rem 0.25rem',
                              backgroundColor: entry.fec?.Idevise && entry.fec.Idevise !== 'EUR' ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                              color: entry.fec?.Idevise && entry.fec.Idevise !== 'EUR' ? '#ef4444' : '#6b7280',
                              borderRadius: '0.25rem',
                              fontSize: '10px',
                              fontWeight: 600
                            }}>
                              {entry.fec?.Idevise || 'EUR'}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </motion.tr>
                  
                  {/* Lignes dépliées : contreparties de l'écriture */}
                  {expandedRows.has(entry.id) && 
                    getEntriesByPiece(entry.piece)
                      .filter(e => e.id !== entry.id) // Exclure la ligne courante
                      .map((counterpartEntry) => (
                        <motion.tr
                          key={`counterpart-${entry.id}-${counterpartEntry.id}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                              backgroundColor: 'rgba(250, 250, 250, 0.5)',
                              borderBottom: '1px solid rgba(229, 229, 229, 0.1)'
                            }}
                          >
                            <td colSpan={2}></td>
                            <td style={{ padding: '0.25rem 0.5rem', fontSize: '11px', color: '#666' }}>
                              {/* Date vide car même pièce */}
                            </td>
                            <td style={{ padding: '0.25rem 0.5rem', fontSize: '11px' }}>
                              {/* Journal vide car même pièce */}
                            </td>
                            <td 
                              style={{ padding: '0.25rem 0.5rem', fontSize: '11px', paddingLeft: '2rem', cursor: 'text' }}
                              onDoubleClick={() => startEditing(counterpartEntry, 'description')}
                            >
                              {editingCell?.id === counterpartEntry.id && editingCell?.field === 'description' ? (
                                <input
                                  type="text"
                                  value={editedEntry?.description || ''}
                                  onChange={(e) => setEditedEntry(prev => prev ? {...prev, description: e.target.value} : null)}
                                  onBlur={saveEdit}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') saveEdit();
                                    if (e.key === 'Escape') cancelEditing();
                                    handleKeyNavigation(e, counterpartEntry, 'description');
                                  }}
                                  style={{
                                    width: '100%',
                                    padding: '0.125rem 0.25rem',
                                    border: '1px solid #5e72ff',
                                    borderRadius: '0.25rem',
                                    fontSize: '11px',
                                    outline: 'none',
                                    backgroundColor: 'white'
                                  }}
                                  autoFocus
                                />
                              ) : (
                                <>
                                  <span style={{ color: '#666' }}>└</span>
                                  <span style={{ marginLeft: '0.5rem', color: '#5e72ff', fontFamily: 'monospace' }}>
                                    {counterpartEntry.accountCode}
                                  </span>
                                  <span style={{ marginLeft: '0.5rem', color: '#666' }}>
                                    {counterpartEntry.accountLabel}
                                  </span>
                                </>
                              )}
                            </td>
                            <td style={{ padding: '0.25rem 0.5rem', textAlign: 'center', fontSize: '11px' }}>
                              {counterpartEntry.lettrage && (
                                <span style={{
                                  padding: '1px 5px',
                                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                                  color: '#8b5cf6',
                                  borderRadius: '3px',
                                  fontWeight: 500
                                }}>
                                  {counterpartEntry.lettrage}
                                </span>
                              )}
                            </td>
                            <td 
                              style={{ padding: '0.25rem 0.75rem', textAlign: 'right', fontSize: '11px', cursor: 'text' }}
                              onDoubleClick={() => startEditing(counterpartEntry, 'debit')}
                            >
                              {editingCell?.id === counterpartEntry.id && editingCell?.field === 'debit' ? (
                                <input
                                  type="number"
                                  value={editedEntry?.debit || 0}
                                  onChange={(e) => setEditedEntry(prev => prev ? {...prev, debit: parseFloat(e.target.value) || 0} : null)}
                                  onBlur={saveEdit}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') saveEdit();
                                    if (e.key === 'Escape') cancelEditing();
                                    handleKeyNavigation(e, counterpartEntry, 'debit');
                                  }}
                                  style={{
                                    width: '70px',
                                    padding: '0.125rem 0.25rem',
                                    border: '1px solid #5e72ff',
                                    borderRadius: '0.25rem',
                                    fontSize: '11px',
                                    textAlign: 'right',
                                    outline: 'none'
                                  }}
                                  autoFocus
                                />
                              ) : (
                                <span style={{ color: counterpartEntry.debit > 0 ? '#171717' : '#d4d4d8' }}>
                                  {counterpartEntry.debit > 0 ? formatNumber(counterpartEntry.debit) : ''}
                                </span>
                              )}
                            </td>
                            <td 
                              style={{ padding: '0.25rem 0.75rem', textAlign: 'right', fontSize: '11px', cursor: 'text' }}
                              onDoubleClick={() => startEditing(counterpartEntry, 'credit')}
                            >
                              {editingCell?.id === counterpartEntry.id && editingCell?.field === 'credit' ? (
                                <input
                                  type="number"
                                  value={editedEntry?.credit || 0}
                                  onChange={(e) => setEditedEntry(prev => prev ? {...prev, credit: parseFloat(e.target.value) || 0} : null)}
                                  onBlur={saveEdit}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') saveEdit();
                                    if (e.key === 'Escape') cancelEditing();
                                    handleKeyNavigation(e, counterpartEntry, 'credit');
                                  }}
                                  style={{
                                    width: '70px',
                                    padding: '0.125rem 0.25rem',
                                    border: '1px solid #5e72ff',
                                    borderRadius: '0.25rem',
                                    fontSize: '11px',
                                    textAlign: 'right',
                                    outline: 'none'
                                  }}
                                  autoFocus
                                />
                              ) : (
                                <span style={{ color: counterpartEntry.credit > 0 ? '#171717' : '#d4d4d8' }}>
                                  {counterpartEntry.credit > 0 ? formatNumber(counterpartEntry.credit) : ''}
                                </span>
                              )}
                            </td>
                            <td style={{ padding: '0.25rem 0.75rem', textAlign: 'right', fontSize: '11px', color: '#a3a3a3' }}>
                              {/* Pas de solde pour les lignes de contrepartie */}
                            </td>
                            {/* FEC columns for counterpart rows */}
                            {activeFecColumns.length > 0 && activeFecColumns.map((key, index) => {
                              const config = fecColumnConfig[key];
                              return (
                                <td key={`fec-c-${entry.id}-${counterpartEntry.id}-${index}`} style={{ 
                                  padding: '0.25rem 0.75rem', 
                                  fontSize: '11px',
                                  borderLeft: '1px solid rgba(229, 229, 229, 0.2)',
                                  color: '#6b7280',
                                  textAlign: config.align as any,
                                  backgroundColor: 'rgba(250, 250, 250, 0.5)',
                                  whiteSpace: 'nowrap'
                                }}>
                                  {key === 'JournalLib' && (
                                    <span style={{ color: '#6b7280' }}>
                                      {counterpartEntry.fec?.JournalLib || '-'}
                                    </span>
                                  )}
                                  {key === 'EcritureNum' && (
                                    <span style={{ color: '#6b7280' }}>
                                      {counterpartEntry.fec?.EcritureNum || '-'}
                                    </span>
                                  )}
                                  {key === 'CompAuxNum' && (
                                    <span style={{ color: '#6b7280' }}>
                                      {counterpartEntry.fec?.CompAuxNum || '-'}
                                    </span>
                                  )}
                                  {key === 'PieceDate' && (
                                    <span style={{ color: '#9ca3af' }}>-</span>
                                  )}
                                  {key === 'ValidDate' && (
                                    <span style={{ color: '#9ca3af' }}>-</span>
                                  )}
                                  {key === 'Idevise' && (
                                    <span style={{
                                      fontSize: '10px',
                                      color: '#6b7280'
                                    }}>
                                      {counterpartEntry.fec?.Idevise || 'EUR'}
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                          </motion.tr>
                      ))
                  }
                </React.Fragment>
              ))}
            </AnimatePresence>
          </tbody>
            </table>
          </div>
        </div>
      )}


      {/* Barre d'actions pour les lignes sélectionnées */}
      <AnimatePresence>
        {selectedRows.size > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: actionsExpanded && isMobile ? 'auto' : 'auto',
              opacity: 1 
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              // Swipe up pour révéler les actions
              if (info.offset.y < -50 && isMobile) {
                setActionsExpanded(true);
              }
              // Swipe down pour cacher les actions
              if (info.offset.y > 50 && isMobile) {
                setActionsExpanded(false);
              }
            }}
            style={{
              backgroundColor: 'rgba(94, 114, 255, 0.05)',
              borderTop: '1px solid rgba(94, 114, 255, 0.2)',
              borderBottom: '1px solid rgba(94, 114, 255, 0.2)',
              padding: '0.75rem 1rem',
              cursor: isMobile ? 'grab' : 'default',
              userSelect: 'none'
            }}
          >
            {/* Indicateur de swipe sur mobile */}
            {isMobile && (
              <div style={{
                position: 'absolute',
                top: '4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '4px',
                backgroundColor: 'rgba(94, 114, 255, 0.3)',
                borderRadius: '2px'
              }} />
            )}
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              paddingTop: isMobile ? '8px' : '0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', color: '#5e72ff', fontWeight: 500 }}>
                  {selectedRows.size} ligne{selectedRows.size > 1 ? 's' : ''} sélectionnée{selectedRows.size > 1 ? 's' : ''}
                </span>
                {/* Totaux des lignes sélectionnées */}
                {!isMobile && (
                  <>
                    <span style={{ fontSize: '11px', color: '#666', marginLeft: '0.5rem' }}>
                      Débit: <strong>{formatNumber(
                        filteredEntries
                          .filter(e => selectedRows.has(e.id))
                          .reduce((sum, e) => sum + e.debit, 0)
                      )}</strong>
                    </span>
                    <span style={{ fontSize: '11px', color: '#666' }}>
                      Crédit: <strong>{formatNumber(
                        filteredEntries
                          .filter(e => selectedRows.has(e.id))
                          .reduce((sum, e) => sum + e.credit, 0)
                      )}</strong>
                    </span>
                  </>
                )}
                {isMobile && !actionsExpanded && (
                  <span style={{ fontSize: '10px', color: '#999', marginLeft: '0.5rem' }}>
                    ↑ Glisser pour actions
                  </span>
                )}
              </div>
              
              {/* Actions visibles sur desktop ou quand expanded sur mobile */}
              {(!isMobile || actionsExpanded) && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', width: isMobile ? '100%' : 'auto' }}>
              {/* Bouton Reclasser */}
              <button
                onClick={() => setShowReclassDialog(true)}
                style={{
                  padding: '0.375rem 0.75rem',
                  backgroundColor: 'white',
                  border: '1px solid rgba(94, 114, 255, 0.3)',
                  borderRadius: '0.375rem',
                  fontSize: '11px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  transition: 'all 0.15s',
                  color: '#5e72ff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(94, 114, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                <RefreshCw size={12} />
                Reclasser
              </button>
              
              {/* Bouton Lettrer/Délettrer */}
              {(() => {
                const selectedEntries = filteredEntries.filter(e => selectedRows.has(e.id));
                const hasLettragedEntry = selectedEntries.some(e => e.lettrage);
                const canLettrer = selectedRows.size >= 2;
                const canDelettrer = selectedRows.size === 1 && hasLettragedEntry;
                
                if (canLettrer || canDelettrer) {
                  return (
                    <button
                      onClick={() => {
                        if (canDelettrer) {
                          // Délettrage
                          const entry = selectedEntries[0];
                          console.log(`Délettrage de l'écriture ${entry.id} (lettrage: ${entry.lettrage})`);
                          alert(`Délettrage de l'écriture avec le code "${entry.lettrage}"`);
                          setSelectedRows(new Set());
                        } else {
                          // Lettrage
                          setShowLettrageDialog(true);
                        }
                      }}
                      style={{
                        padding: '0.375rem 0.75rem',
                        backgroundColor: 'white',
                        border: '1px solid rgba(94, 114, 255, 0.3)',
                        borderRadius: '0.375rem',
                        fontSize: '11px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        transition: 'all 0.15s',
                        color: canDelettrer ? '#ef4444' : '#5e72ff'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = canDelettrer ? 'rgba(239, 68, 68, 0.1)' : 'rgba(94, 114, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                    >
                      <Link2 size={12} />
                      {canDelettrer ? 'Délettrer' : 'Lettrer'}
                    </button>
                  );
                }
                return null;
              })()}
              
              
              {/* Bouton Commenter */}
              <button
                onClick={() => {
                  const firstSelectedId = Array.from(selectedRows)[0];
                  setEditingComment(firstSelectedId);
                }}
                style={{
                  padding: '0.375rem 0.75rem',
                  backgroundColor: 'white',
                  border: '1px solid rgba(94, 114, 255, 0.3)',
                  borderRadius: '0.375rem',
                  fontSize: '11px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  transition: 'all 0.15s',
                  color: '#5e72ff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(94, 114, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                <MessageSquare size={12} />
                Commenter
              </button>
              
              {/* Bouton Annuler la sélection */}
              <button
                onClick={() => {
                  setSelectedRows(new Set());
                  setSelectAll(false);
                }}
                style={{
                  padding: '0.375rem 0.75rem',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(229, 229, 229, 0.5)',
                  borderRadius: '0.375rem',
                  fontSize: '11px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  transition: 'all 0.15s',
                  color: '#666'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <X size={12} />
                Annuler
              </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer avec totaux responsive */}
      <div className={`border-t border-neutral-200 bg-white ${
        isMobile ? 'p-3' : 'px-4 py-2.5'
      }`}>
        {isMobile ? (
          // Version mobile du footer simplifiée
          <div className="flex items-center justify-between">
            <div className="text-sm text-neutral-600">
              Solde final
            </div>
            {filteredEntries.length > 0 && (
              <div className={`text-lg font-bold ${
                filteredEntries[filteredEntries.length - 1].balance < 0 ? 'text-red-600' : 'text-neutral-900'
              }`}>
                {formatNumber(Math.abs(filteredEntries[filteredEntries.length - 1].balance))} €
              </div>
            )}
          </div>
        ) : (
          // Version desktop du footer
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px'
          }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            </div>
            {filteredEntries.length > 0 && (
              <span style={{ fontSize: '11px', color: '#666' }}>
                Solde final: <strong style={{ 
                  color: filteredEntries[filteredEntries.length - 1].balance > 0 ? '#171717' : '#ef4444' 
                }}>
                  {formatNumber(Math.abs(filteredEntries[filteredEntries.length - 1].balance))} €
                </strong>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Modal pour les détails de transaction bancaire */}
      {showBankModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowBankModal(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              backgroundColor: 'white',
              borderRadius: isMobile ? '1rem 1rem 0 0' : '0.75rem',
              padding: isMobile ? '1rem' : '1.5rem',
              maxWidth: isMobile ? 'none' : '500px',
              width: isMobile ? '100%' : '90%',
              maxHeight: isMobile ? '80vh' : 'none',
              overflowY: isMobile ? 'auto' : 'visible',
              position: isMobile ? 'fixed' : 'relative',
              bottom: isMobile ? 0 : 'auto',
              left: isMobile ? 0 : 'auto',
              right: isMobile ? 0 : 'auto',
              transform: isMobile ? 'none' : 'initial',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1rem',
              borderBottom: '1px solid rgba(229, 229, 229, 0.3)',
              paddingBottom: '0.75rem'
            }}>
              {getBankLogo(showBankModal.bankName)}
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#171717', marginLeft: '0.5rem' }}>
                Détails de la transaction bancaire
              </h3>
            </div>
            
            <div style={{ display: 'grid', gap: isMobile ? '1rem' : '0.75rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr', gap: isMobile ? '0.25rem' : '0.5rem' }}>
                <span style={{ fontSize: isMobile ? '14px' : '12px', color: '#666', fontWeight: 500 }}>Référence:</span>
                <span style={{ fontSize: isMobile ? '14px' : '12px', color: '#171717', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {showBankModal.reference}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr', gap: isMobile ? '0.25rem' : '0.5rem' }}>
                <span style={{ fontSize: isMobile ? '14px' : '12px', color: '#666', fontWeight: 500 }}>Date:</span>
                <span style={{ fontSize: isMobile ? '14px' : '12px', color: '#171717' }}>
                  {new Date(showBankModal.date).toLocaleDateString('fr-FR')}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr', gap: isMobile ? '0.25rem' : '0.5rem' }}>
                <span style={{ fontSize: isMobile ? '14px' : '12px', color: '#666', fontWeight: 500 }}>Libellé:</span>
                <span style={{ fontSize: isMobile ? '14px' : '12px', color: '#171717', wordBreak: 'break-word' }}>
                  {showBankModal.label}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr', gap: isMobile ? '0.25rem' : '0.5rem' }}>
                <span style={{ fontSize: isMobile ? '14px' : '12px', color: '#666', fontWeight: 500 }}>Contrepartie:</span>
                <span style={{ fontSize: isMobile ? '14px' : '12px', color: '#171717', fontWeight: 500, wordBreak: 'break-word' }}>
                  {showBankModal.counterparty}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr', gap: isMobile ? '0.25rem' : '0.5rem' }}>
                <span style={{ fontSize: isMobile ? '14px' : '12px', color: '#666', fontWeight: 500 }}>Montant:</span>
                <span style={{ 
                  fontSize: isMobile ? '16px' : '14px', 
                  fontWeight: 600,
                  color: showBankModal.type === 'debit' ? '#ef4444' : '#10b981'
                }}>
                  {showBankModal.type === 'debit' ? '-' : '+'}{formatNumber(Math.abs(showBankModal.amount))} €
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr', gap: isMobile ? '0.25rem' : '0.5rem' }}>
                <span style={{ fontSize: isMobile ? '14px' : '12px', color: '#666', fontWeight: 500 }}>Solde après:</span>
                <span style={{ fontSize: isMobile ? '14px' : '12px', color: '#171717' }}>
                  {formatNumber(showBankModal.balance)} €
                </span>
              </div>
              
              {showBankModal.iban && (
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr', gap: isMobile ? '0.25rem' : '0.5rem' }}>
                  <span style={{ fontSize: isMobile ? '14px' : '12px', color: '#666', fontWeight: 500 }}>IBAN:</span>
                  <span style={{ fontSize: isMobile ? '12px' : '11px', color: '#171717', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                    {showBankModal.iban}
                  </span>
                </div>
              )}
              
              {showBankModal.bic && (
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr', gap: isMobile ? '0.25rem' : '0.5rem' }}>
                  <span style={{ fontSize: isMobile ? '14px' : '12px', color: '#666', fontWeight: 500 }}>BIC:</span>
                  <span style={{ fontSize: isMobile ? '12px' : '11px', color: '#171717', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                    {showBankModal.bic}
                  </span>
                </div>
              )}
            </div>
            
            <div style={{ 
              marginTop: isMobile ? '1.5rem' : '1.5rem', 
              display: 'flex', 
              justifyContent: isMobile ? 'center' : 'flex-end',
              borderTop: '1px solid rgba(229, 229, 229, 0.3)',
              paddingTop: '0.75rem'
            }}>
              <button
                onClick={() => setShowBankModal(null)}
                style={{
                  padding: isMobile ? '0.75rem 2rem' : '0.5rem 1rem',
                  backgroundColor: '#5e72ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: isMobile ? '14px' : '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  minHeight: isMobile ? '44px' : 'auto',
                  minWidth: isMobile ? '120px' : 'auto'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4c63e6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5e72ff'}
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de reclassement de compte */}
      {showReclassDialog && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowReclassDialog(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              maxWidth: '450px',
              width: '90%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '1rem' }}>
              Reclasser les écritures
            </h3>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '1rem' }}>
              {selectedRows.size} écriture{selectedRows.size > 1 ? 's' : ''} sélectionnée{selectedRows.size > 1 ? 's' : ''}
            </p>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '0.25rem' }}>
                Nouveau compte :
              </label>
              <input
                type="text"
                value={newAccountCode}
                onChange={(e) => setNewAccountCode(e.target.value)}
                placeholder="Ex: 512000"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid rgba(229, 229, 229, 0.5)',
                  borderRadius: '0.375rem',
                  fontSize: '13px',
                  outline: 'none'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#5e72ff'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(229, 229, 229, 0.5)'}
                autoFocus
              />
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowReclassDialog(false);
                  setNewAccountCode('');
                }}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(229, 229, 229, 0.5)',
                  borderRadius: '0.375rem',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  console.log(`Reclassement vers ${newAccountCode} pour`, Array.from(selectedRows));
                  alert(`Reclassement de ${selectedRows.size} écritures vers le compte ${newAccountCode}`);
                  setShowReclassDialog(false);
                  setNewAccountCode('');
                  setSelectedRows(new Set());
                }}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#5e72ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
                disabled={!newAccountCode}
              >
                Reclasser
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de lettrage manuel */}
      {showLettrageDialog && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowLettrageDialog(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              maxWidth: '450px',
              width: '90%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '1rem' }}>
              Lettrage manuel
            </h3>
            
            {/* Vérification du solde */}
            {(() => {
              const selectedEntries = filteredEntries.filter(e => selectedRows.has(e.id));
              const totalDebit = selectedEntries.reduce((sum, e) => sum + e.debit, 0);
              const totalCredit = selectedEntries.reduce((sum, e) => sum + e.credit, 0);
              const difference = totalDebit - totalCredit;
              
              return (
                <>
                  <div style={{ 
                    padding: '0.75rem', 
                    backgroundColor: Math.abs(difference) < 0.01 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    borderRadius: '0.375rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ fontSize: '12px', marginBottom: '0.5rem' }}>
                      <div>Débit total : <strong>{formatNumber(totalDebit)}</strong></div>
                      <div>Crédit total : <strong>{formatNumber(totalCredit)}</strong></div>
                      <div style={{ 
                        marginTop: '0.25rem', 
                        paddingTop: '0.25rem', 
                        borderTop: '1px solid rgba(0, 0, 0, 0.1)' 
                      }}>
                        Différence : <strong style={{ 
                          color: Math.abs(difference) < 0.01 ? '#10b981' : '#ef4444' 
                        }}>
                          {formatNumber(Math.abs(difference))}
                        </strong>
                      </div>
                    </div>
                    {Math.abs(difference) > 0.01 && (
                      <p style={{ fontSize: '11px', color: '#ef4444', marginTop: '0.5rem' }}>
                        ⚠️ Les écritures ne sont pas équilibrées
                      </p>
                    )}
                  </div>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '0.25rem' }}>
                      Code de lettrage :
                    </label>
                    <input
                      type="text"
                      value={newLettrage}
                      onChange={(e) => setNewLettrage(e.target.value.toUpperCase())}
                      placeholder="Ex: AA, AB, AC..."
                      maxLength={3}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid rgba(229, 229, 229, 0.5)',
                        borderRadius: '0.375rem',
                        fontSize: '13px',
                        outline: 'none',
                        textTransform: 'uppercase'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#5e72ff'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(229, 229, 229, 0.5)'}
                      autoFocus
                    />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => {
                        setShowLettrageDialog(false);
                        setNewLettrage('');
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(229, 229, 229, 0.5)',
                        borderRadius: '0.375rem',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => {
                        console.log(`Lettrage ${newLettrage} pour`, Array.from(selectedRows));
                        alert(`Lettrage "${newLettrage}" appliqué à ${selectedRows.size} écritures`);
                        setShowLettrageDialog(false);
                        setNewLettrage('');
                        setSelectedRows(new Set());
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: Math.abs(difference) < 0.01 ? '#5e72ff' : '#a3a3a3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        fontSize: '12px',
                        cursor: Math.abs(difference) < 0.01 && newLettrage ? 'pointer' : 'not-allowed'
                      }}
                      disabled={Math.abs(difference) > 0.01 || !newLettrage}
                    >
                      Lettrer
                    </button>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </div>
      )}
      
      {/* Document Viewer OKÉ */}
      <ViewerComponent 
        mode="auto"
        glassMorphism={true}
        enableAnnotations={true}
        enableDownload={true}
        enablePrint={true}
        enableShare={true}
      />
    </div>
  );
}