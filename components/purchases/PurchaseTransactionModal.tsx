'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Paperclip, 
  Building2, 
  User, 
  Calculator, 
  ArrowRight, 
  Check, 
  Upload,
  FileText,
  Euro,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Search,
  Filter,
  Tag,
  CheckCircle
} from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { BankTransactionExtended } from '@/lib/mock-data/bank-transactions';
import { useDocumentViewer } from '@/components/ui/DocumentViewerAdvanced';
import { bankTransactions, TypePaiement, StatutRapprochement, Banque } from '@/lib/mock-data/bank-transactions';

// Types pour les opérations en attente de rapprochement
interface PendingOperation {
  id: string;
  type: 'facture_fournisseur' | 'facture_client' | 'note_frais' | 'od_paie';
  reference: string;
  tiers: string;
  montant: number;
  date: string;
  description: string;
  numeroFacture?: string;
  echeance?: string;
}

// Types pour les fournisseurs/clients
interface Tiers {
  id: string;
  nom: string;
  type: 'fournisseur' | 'client';
  siret?: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  montantsMoyens?: number[];
}

// Données mock pour les opérations en attente
const pendingOperations: PendingOperation[] = [
  {
    id: 'op1',
    type: 'facture_fournisseur',
    reference: 'FACT-2024-0156',
    tiers: 'Microsoft France',
    montant: -299.99,
    date: '2024-12-18',
    description: 'Abonnement Office 365 Business',
    numeroFacture: 'MS-240156',
    echeance: '2024-12-20'
  },
  {
    id: 'op2', 
    type: 'facture_fournisseur',
    reference: 'FACT-2024-0157',
    tiers: 'EDF Entreprises',
    montant: -1245.67,
    date: '2024-12-15',
    description: 'Facture électricité décembre',
    numeroFacture: 'EDF-DEC-2024'
  },
  {
    id: 'op3',
    type: 'facture_client', 
    reference: 'VENTE-2024-0089',
    tiers: 'SARL Dupont',
    montant: 2400.00,
    date: '2024-12-16',
    description: 'Prestation conseil stratégique',
    numeroFacture: 'INV-2024-089'
  },
  {
    id: 'op4',
    type: 'note_frais',
    reference: 'NDF-2024-12-008',
    tiers: 'Jean Martin',
    montant: -156.45,
    date: '2024-12-17',
    description: 'Frais déplacement client Lyon'
  }
];

// Données mock pour les tiers
const tiers: Tiers[] = [
  {
    id: 't1',
    nom: 'Microsoft France',
    type: 'fournisseur',
    siret: '32719654800123',
    adresse: '39 Quai du Président Roosevelt, 92130 Issy-les-Moulineaux',
    telephone: '01 85 05 01 00',
    email: 'facturation@microsoft.fr',
    montantsMoyens: [-299.99, -599.99, -149.99]
  },
  {
    id: 't2',
    nom: 'EDF Entreprises', 
    type: 'fournisseur',
    siret: '55208131700034',
    adresse: '22-30 Avenue de Wagram, 75008 Paris',
    telephone: '09 69 32 15 15',
    email: 'factures.entreprises@edf.fr',
    montantsMoyens: [-1245.67, -1156.23, -1398.45]
  },
  {
    id: 't3',
    nom: 'SARL Dupont',
    type: 'client',
    siret: '49454545400198', 
    adresse: '15 Rue de la République, 69001 Lyon',
    telephone: '04 72 34 56 78',
    email: 'compta@sarldupont.fr',
    montantsMoyens: [2400.00, 1800.00, 3200.00]
  }
];

// Options de filtres
const typePaiementOptions: { value: TypePaiement; label: string }[] = [
  { value: 'virement', label: 'Virement' },
  { value: 'carte', label: 'Carte' },
  { value: 'cheque', label: 'Chèque' },
  { value: 'especes', label: 'Espèces' },
  { value: 'prelevement', label: 'Prélèvement' },
  { value: 'remise_cheques', label: 'Remise de chèques' }
];

const statutOptions: { value: StatutRapprochement; label: string; color: string }[] = [
  { value: 'rapproche', label: 'Rapproché', color: 'green' },
  { value: 'en_attente', label: 'En attente', color: 'orange' },
  { value: 'non_rapproche', label: 'Non rapproché', color: 'red' }
];

const banqueOptions: { value: Banque; label: string; icon: string }[] = [
  { value: 'BNP', label: 'BNP Paribas', icon: '🏦' },
  { value: 'SG', label: 'Société Générale', icon: '🏛️' },
  { value: 'CA', label: 'Crédit Agricole', icon: '🌾' },
  { value: 'LCL', label: 'LCL', icon: '🦁' },
  { value: 'CE', label: 'Caisse d\'Épargne', icon: '🐿️' },
  { value: 'CM', label: 'Crédit Mutuel', icon: '💙' },
  { value: 'HSBC', label: 'HSBC', icon: '🌏' },
  { value: 'BP', label: 'Banque Populaire', icon: '🔵' },
  { value: 'CIC', label: 'CIC', icon: '🔷' },
  { value: 'LaPoste', label: 'La Banque Postale', icon: '📮' }
];

interface PurchaseTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: BankTransactionExtended | null;
  onUpdate?: (transaction: BankTransactionExtended) => void;
}

export default function PurchaseTransactionModal({
  isOpen,
  onClose,
  transaction,
  onUpdate
}: PurchaseTransactionModalProps) {
  const { open: openDocument, ViewerComponent } = useDocumentViewer();
  const [activeTab, setActiveTab] = useState<'justificatif' | 'tiers' | 'rapprochement'>('justificatif');
  const [selectedTiers, setSelectedTiers] = useState<string | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    typePaiement: [] as TypePaiement[],
    statut: [] as StatutRapprochement[],
    banque: [] as Banque[],
    montantMin: undefined as number | undefined,
    montantMax: undefined as number | undefined,
    avecJustificatif: false,
    lettrage: '',
    libelle: ''
  });

  // Filtrer les opérations par montant similaire (+/- 10% et +/- 50€)
  const similarOperations = useMemo(() => {
    if (!transaction) return [];
    const transactionAmount = Math.abs(transaction.montant);
    const tolerance = Math.max(transactionAmount * 0.1, 50); // 10% ou 50€ minimum
    
    return pendingOperations.filter(op => {
      const opAmount = Math.abs(op.montant);
      return Math.abs(transactionAmount - opAmount) <= tolerance;
    }).sort((a, b) => {
      // Trier par proximité du montant
      const diffA = Math.abs(Math.abs(transaction.montant) - Math.abs(a.montant));
      const diffB = Math.abs(Math.abs(transaction.montant) - Math.abs(b.montant));
      return diffA - diffB;
    });
  }, [transaction]);

  // Filtrer les tiers par recherche
  const filteredTiers = useMemo(() => {
    if (!searchTerm) return tiers;
    return tiers.filter(t => 
      t.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Générer des suggestions intelligentes pour la recherche
  const searchSuggestions = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return { montants: [], mots: [] };

    const allTransactions = bankTransactions;
    const searchLower = searchTerm.toLowerCase();

    // Suggestions de montants (exactes et proches)
    const montantSuggestions = allTransactions
      .filter(t => {
        const montantStr = Math.abs(t.montant).toString();
        return montantStr.includes(searchTerm) || Math.abs(Math.abs(t.montant) - parseFloat(searchTerm)) < 10;
      })
      .map(t => ({
        montant: t.montant,
        count: allTransactions.filter(tr => tr.montant === t.montant).length,
        transaction: t
      }))
      .reduce((acc, curr) => {
        const existing = acc.find(item => item.montant === curr.montant);
        if (!existing) {
          acc.push(curr);
        }
        return acc;
      }, [] as any[])
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Suggestions de mots-clés (libellés, contreparties, objets)
    const motsSuggestions = allTransactions
      .filter(t => 
        t.libelle?.toLowerCase().includes(searchLower) ||
        t.contrepartie?.toLowerCase().includes(searchLower) ||
        t.objet?.toLowerCase().includes(searchLower) ||
        t.libelleComplet?.toLowerCase().includes(searchLower)
      )
      .flatMap(t => [
        ...(t.libelle?.split(' ') || []),
        ...(t.contrepartie?.split(' ') || []),
        ...(t.objet?.split(' ') || []),
        ...(t.libelleComplet?.split(' ') || [])
      ])
      .filter(mot => mot.toLowerCase().includes(searchLower) && mot.length > 2)
      .reduce((acc, mot) => {
        const motLower = mot.toLowerCase();
        const existing = acc.find(item => item.mot.toLowerCase() === motLower);
        if (existing) {
          existing.count++;
        } else {
          acc.push({ mot, count: 1 });
        }
        return acc;
      }, [] as { mot: string; count: number }[])
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return {
      montants: montantSuggestions,
      mots: motsSuggestions
    };
  }, [searchTerm]);

  if (!transaction) return null;

  const handleAttachDocument = () => {
    // Simulation d'upload de document
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.png,.jpeg';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Document attaché:', file.name);
        // Ici on simulerait l'upload et la mise à jour
        alert(`✅ Document "${file.name}" attaché avec succès à la transaction`);
      }
    };
    input.click();
  };

  const handleAssignTiers = () => {
    if (selectedTiers) {
      const tiersData = tiers.find(t => t.id === selectedTiers);
      console.log('Tiers assigné:', tiersData?.nom);
      alert(`✅ Transaction associée à ${tiersData?.nom}`);
    }
  };

  const handleReconcile = () => {
    if (selectedOperation) {
      const operation = pendingOperations.find(op => op.id === selectedOperation);
      console.log('Rapprochement:', transaction.id, 'avec', operation?.reference);
      alert(`✅ Rapprochement effectué:\n${transaction.libelle} ↔ ${operation?.reference}`);
    }
  };

  const getOperationIcon = (type: PendingOperation['type']) => {
    switch (type) {
      case 'facture_fournisseur':
        return <Building2 className="w-4 h-4 text-red-600" />;
      case 'facture_client':
        return <User className="w-4 h-4 text-green-600" />;
      case 'note_frais':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'od_paie':
        return <Calculator className="w-4 h-4 text-purple-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getOperationLabel = (type: PendingOperation['type']) => {
    switch (type) {
      case 'facture_fournisseur': return 'Facture fournisseur';
      case 'facture_client': return 'Facture client';
      case 'note_frais': return 'Note de frais';
      case 'od_paie': return 'OD de paie';
      default: return type;
    }
  };

  const tabs = [
    { id: 'justificatif', label: 'Justificatif', icon: Paperclip },
    { id: 'tiers', label: 'Tiers', icon: Building2 },
    { id: 'rapprochement', label: 'Rapprochement', icon: Calculator }
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#4C34CE]/5 to-[#FAA016]/5">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">
                    Rapprochement de transaction
                  </h2>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Banque:</span>
                      <span className="ml-2 font-medium">{transaction.banque}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <span className="ml-2 font-medium">{formatDate(transaction.date)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Montant:</span>
                      <span className={cn(
                        "ml-2 font-bold",
                        transaction.montant >= 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {formatCurrency(transaction.montant)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Libellé:</span>
                      <span className="ml-2 font-medium">{transaction.libelle}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 bg-gray-50">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-4 px-6 transition-all relative",
                        activeTab === tab.id
                          ? "text-[#4C34CE] bg-white border-b-2 border-[#4C34CE]"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{tab.label}</span>
                      {tab.id === 'rapprochement' && similarOperations.length > 0 && (
                        <span className="ml-1 px-2 py-0.5 text-xs bg-[#FAA016] text-white rounded-full">
                          {similarOperations.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'justificatif' && (
                  <div className="space-y-6">
                    <div className="text-center py-8">
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Paperclip size={24} className="text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Ajouter un justificatif
                      </h3>
                      <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Rattachez une facture, un reçu ou tout autre document justificatif à cette transaction
                      </p>
                      <button
                        onClick={handleAttachDocument}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#4C34CE] text-white rounded-lg hover:bg-[#4C34CE]/90 transition-colors"
                      >
                        <Upload size={18} />
                        Choisir un fichier
                      </button>
                      <p className="text-xs text-gray-400 mt-2">
                        Formats acceptés: PDF, JPG, PNG (max. 10Mo)
                      </p>
                    </div>

                    {transaction.justificatif && (
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Justificatif actuel</h4>
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-blue-600" />
                          <div className="flex-1">
                            <p className="font-medium">{transaction.justificatif.nom}</p>
                            <p className="text-sm text-gray-500">
                              {transaction.justificatif.type.toUpperCase()} • {transaction.justificatif.taille}
                            </p>
                          </div>
                          <button
                            onClick={() => openDocument({
                              src: '/documents/facture-pennylane.pdf',
                              title: transaction.justificatif!.nom,
                              type: 'pdf'
                            })}
                            className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                          >
                            Voir
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'tiers' && (
                  <div className="space-y-6">
                    {/* Recherche */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Rechercher un fournisseur ou client..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE]/20 focus:border-[#4C34CE]"
                      />
                    </div>

                    {/* Liste des tiers */}
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {filteredTiers.map((tier) => (
                        <div
                          key={tier.id}
                          className={cn(
                            "border rounded-lg p-4 cursor-pointer transition-all",
                            selectedTiers === tier.id
                              ? "border-[#4C34CE] bg-[#4C34CE]/5"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          )}
                          onClick={() => setSelectedTiers(tier.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center",
                              tier.type === 'fournisseur' ? "bg-red-100" : "bg-green-100"
                            )}>
                              {tier.type === 'fournisseur' ? (
                                <Building2 className="w-5 h-5 text-red-600" />
                              ) : (
                                <User className="w-5 h-5 text-green-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-gray-900">{tier.nom}</h4>
                                <span className={cn(
                                  "px-2 py-0.5 text-xs rounded-full",
                                  tier.type === 'fournisseur' 
                                    ? "bg-red-100 text-red-700" 
                                    : "bg-green-100 text-green-700"
                                )}>
                                  {tier.type}
                                </span>
                              </div>
                              {tier.adresse && (
                                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {tier.adresse}
                                </p>
                              )}
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                {tier.telephone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {tier.telephone}
                                  </span>
                                )}
                                {tier.email && (
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    {tier.email}
                                  </span>
                                )}
                              </div>
                              {tier.montantsMoyens && tier.montantsMoyens.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs text-gray-500 mb-1">Montants habituels:</p>
                                  <div className="flex gap-1 flex-wrap">
                                    {tier.montantsMoyens.slice(0, 3).map((montant, index) => (
                                      <span
                                        key={index}
                                        className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                                      >
                                        {formatCurrency(montant)}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedTiers && (
                      <div className="border-t pt-4">
                        <button
                          onClick={handleAssignTiers}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#4C34CE] text-white rounded-lg hover:bg-[#4C34CE]/90 transition-colors"
                        >
                          <Check size={18} />
                          Associer à ce tiers
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'rapprochement' && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-medium text-blue-900 mb-2">
                        💡 Opérations similaires détectées
                      </h3>
                      <p className="text-sm text-blue-700">
                        {similarOperations.length} opération(s) en attente avec des montants proches trouvée(s)
                      </p>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {similarOperations.map((operation) => {
                        const difference = Math.abs(Math.abs(transaction.montant) - Math.abs(operation.montant));
                        const diffPercentage = (difference / Math.abs(transaction.montant)) * 100;
                        
                        return (
                          <div
                            key={operation.id}
                            className={cn(
                              "border rounded-lg p-4 cursor-pointer transition-all",
                              selectedOperation === operation.id
                                ? "border-[#4C34CE] bg-[#4C34CE]/5"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            )}
                            onClick={() => setSelectedOperation(operation.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0">
                                {getOperationIcon(operation.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-gray-900">{operation.reference}</h4>
                                  <span className={cn(
                                    "font-bold",
                                    operation.montant >= 0 ? "text-green-600" : "text-red-600"
                                  )}>
                                    {formatCurrency(operation.montant)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{operation.tiers}</p>
                                <p className="text-sm text-gray-500 mt-1">{operation.description}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(operation.date)}
                                  </span>
                                  <span className="px-2 py-0.5 bg-gray-100 rounded">
                                    {getOperationLabel(operation.type)}
                                  </span>
                                  {operation.numeroFacture && (
                                    <span>N° {operation.numeroFacture}</span>
                                  )}
                                </div>
                                {difference > 0 && (
                                  <div className="mt-2 flex items-center gap-2">
                                    <Euro className="w-3 h-3 text-amber-500" />
                                    <span className="text-xs text-amber-600">
                                      Écart: {formatCurrency(difference)} ({diffPercentage.toFixed(1)}%)
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {similarOperations.length === 0 && (
                      <div className="text-center py-8">
                        <Calculator className="mx-auto w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-gray-500">
                          Aucune opération en attente avec un montant similaire
                        </p>
                      </div>
                    )}

                    {selectedOperation && (
                      <div className="border-t pt-4">
                        <button
                          onClick={handleReconcile}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <ArrowRight size={18} />
                          Effectuer le rapprochement
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </motion.div>

          {/* Document Viewer Component */}
          <ViewerComponent mode="auto" glassMorphism={true} />
        </>
      )}
    </AnimatePresence>
  );
}