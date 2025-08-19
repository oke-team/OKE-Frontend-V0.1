'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Search,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  Calendar,
  User,
  MoreVertical,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useExpertMode } from '@/contexts/ExpertModeContext';
import ClientGroupView from './ClientGroupView';
import ClientDetailView from './ClientDetailView';
import { mockClientGroups, getClientDetail } from '@/lib/mock-data/clients-data';
import { mockSupplierGroups, getSupplierDetail } from '@/lib/mock-data/suppliers-data';
import { 
  CategoryTransaction, 
  ClientGroup, 
  TransactionDetail,
  TransactionFilters,
  AccountingCategory
} from '@/types/accounting';

interface CategoryDetailViewProps {
  category: AccountingCategory;
  title: string;
  onBack: () => void;
  transactions?: CategoryTransaction[];
  onActionClick?: (action: string) => void;
}

export default function CategoryDetailView({ 
  category, 
  title, 
  onBack,
  transactions = [],
  onActionClick
}: CategoryDetailViewProps) {
  const { formatAmount, expertMode } = useExpertMode();
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [groupByClient, setGroupByClient] = useState(!expertMode); // En mode novice par défaut
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  // Optimisation: Handlers avec useCallback
  const handleTransactionSelect = useCallback((transactionId: string) => {
    setSelectedTransaction(prev => prev === transactionId ? null : transactionId);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((status: string) => {
    setFilterStatus(status);
  }, []);

  const handleGroupToggle = useCallback(() => {
    setGroupByClient(prev => !prev);
  }, []);

  const handleClientSelect = useCallback((clientId: string | null) => {
    setSelectedClient(clientId);
  }, []);

  // Optimisation: Génération des transactions par défaut avec useMemo
  const defaultTransactions: CategoryTransaction[] = useMemo(() => category === 'receivables' ? [
    { 
      id: '1', 
      date: '2024-01-15', 
      reference: 'FA-2024-001',
      label: 'Prestation de conseil',
      amount: 5500,
      status: 'pending',
      daysLeft: 5,
      client: 'Entreprise ABC',
      icon: '💰',
      attachments: 1,
      description: 'Conseil stratégique - Janvier 2024'
    },
    { 
      id: '2', 
      date: '2024-01-10', 
      reference: 'FA-2024-002',
      label: 'Développement application',
      amount: 8000,
      status: 'pending',
      daysLeft: 15,
      client: 'Client XYZ',
      icon: '💰',
      attachments: 2,
      description: 'Phase 1 du projet mobile'
    },
    { 
      id: '3', 
      date: '2024-01-05', 
      reference: 'FA-2024-003',
      label: 'Formation équipe',
      amount: 5000,
      status: 'overdue',
      daysLeft: -3,
      client: 'Société 123',
      icon: '⚠️',
      attachments: 1,
      description: 'Formation React avancée'
    },
    { 
      id: '4', 
      date: '2024-01-03', 
      reference: 'FA-2023-098',
      label: 'Maintenance annuelle',
      amount: 3200,
      status: 'paid',
      client: 'Tech Corp',
      icon: '✅',
      description: 'Contrat de maintenance 2023'
    }
  ] : category === 'payables' ? [
    { 
      id: '1', 
      date: '2024-01-20', 
      reference: 'FF-2024-001',
      label: 'Fournitures bureau',
      amount: 4500,
      status: 'pending',
      daysLeft: 10,
      supplier: 'Fournisseur Alpha',
      icon: '💳'
    },
    { 
      id: '2', 
      date: '2024-01-18', 
      reference: 'LOYER-01',
      label: 'Loyer bureaux',
      amount: 3500,
      status: 'pending',
      daysLeft: 3,
      supplier: 'Immobilier Pro',
      icon: '🏢'
    },
    { 
      id: '3', 
      date: '2024-01-17', 
      reference: 'EDF-2024-01',
      label: 'Électricité',
      amount: 1200,
      status: 'pending',
      daysLeft: 7,
      supplier: 'EDF',
      icon: '⚡'
    }
  ] : [], [category]);

  // Optimisation: Sélection des transactions à afficher avec useMemo
  const displayTransactions = useMemo(() => 
    transactions.length > 0 ? transactions : defaultTransactions,
    [transactions, defaultTransactions]
  );

  // Optimisation: Filtrage des transactions avec useMemo
  const filteredTransactions = useMemo(() => displayTransactions.filter(t => {
    const matchesSearch = t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.client && t.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (t.supplier && t.supplier.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filterStatus === 'all' || t.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  }), [displayTransactions, searchQuery, filterStatus]);

  // Optimisation: Conversion des transactions en groupes avec useMemo
  const clientGroups = useMemo(() => {
    if (!groupByClient || (category !== 'receivables' && category !== 'payables')) {
      return [];
    }

    const groups = new Map<string, ClientGroup>();
    
    filteredTransactions.forEach((transaction) => {
      const entityName = transaction.client || transaction.supplier || 'Non défini';
      
      if (!groups.has(entityName)) {
        groups.set(entityName, {
          id: entityName.toLowerCase().replace(/\s+/g, '-'),
          name: entityName,
          totalDue: 0,
          transactions: []
        });
      }
      
      const group = groups.get(entityName)!;
      
      // Convertir la transaction au format TransactionDetail
      const detail: TransactionDetail = {
        id: transaction.id,
        type: category === 'receivables' ? 'invoice' : 'invoice',
        reference: transaction.reference,
        date: transaction.date,
        label: transaction.label,
        amount: transaction.amount,
        status: transaction.status === 'paid' ? 'paid' : 
                transaction.status === 'overdue' ? 'overdue' : 
                transaction.status === 'pending' ? 'pending' : 'pending'
      };
      
      group.transactions.push(detail);
      
      // Calculer le total dû (seulement les non payées)
      if (transaction.status !== 'paid') {
        group.totalDue += transaction.amount;
      }
      
      // Calculer l'ancienneté
      if (transaction.daysLeft && transaction.daysLeft < 0) {
        const daysOld = Math.abs(transaction.daysLeft);
        if (!group.daysOldest || daysOld > group.daysOldest) {
          group.daysOldest = daysOld;
        }
      }
    });
    
    return Array.from(groups.values());
  }, [filteredTransactions, groupByClient, category]);

  // Optimisation: Fonctions utilitaires avec useCallback
  const getStatusBadge = useCallback((status: string, daysLeft?: number) => {
    if (status === 'paid') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          <CheckCircle className="w-3 h-3" />
          Payé
        </span>
      );
    } else if (status === 'overdue' || (daysLeft && daysLeft < 0)) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
          <AlertCircle className="w-3 h-3" />
          En retard
        </span>
      );
    } else if (status === 'pending') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
          <Clock className="w-3 h-3" />
          En attente
        </span>
      );
    }
    return null;
  }, []);

  const getCategoryActions = useCallback(() => {
    switch (category) {
      case 'receivables':
        return ['Envoyer un rappel', 'Marquer comme payé', 'Créer un avoir'];
      case 'payables':
        return ['Payer maintenant', 'Planifier le paiement', 'Contester'];
      case 'income':
        return ['Voir les détails', 'Télécharger la facture', 'Dupliquer'];
      case 'expenses':
        return ['Voir le justificatif', 'Catégoriser', 'Ajouter une note'];
      case 'bank':
        return ['Rapprocher', 'Catégoriser', 'Exporter'];
      default:
        return [];
    }
  }, [category]);

  return (
    <div className="space-y-4">
      {/* Header avec retour */}
      <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm text-neutral-600">
              {filteredTransactions.length} {expertMode ? 'écritures' : 'transactions'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {(category === 'receivables' || category === 'payables') && !expertMode && (
            <button
              onClick={handleGroupToggle}
              className="px-3 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 flex items-center gap-2"
              title={groupByClient ? 'Vue détaillée' : 'Vue par client'}
            >
              {groupByClient ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
              <span className="text-sm hidden sm:inline">
                {groupByClient ? 'Par client' : 'Détaillée'}
              </span>
            </button>
          )}
          <button className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="paid">Payé</option>
            <option value="overdue">En retard</option>
          </select>
        </div>
      </div>

      {/* Vue détaillée d'un client ou fournisseur sélectionné */}
      {selectedClient && (() => {
        const entityDetail = category === 'payables' 
          ? getSupplierDetail(selectedClient)
          : getClientDetail(selectedClient);
        
        if (entityDetail) {
          return (
            <ClientDetailView
              client={entityDetail}
              onBack={() => handleClientSelect(null)}
              onActionClick={(action, data) => {
                console.log(`Action ${action}`, data);
                onActionClick?.(action);
              }}
            />
          );
        }
        return null;
      })()}

      {/* Liste des transactions ou groupes clients */}
      {!selectedClient && (
        <>
          {groupByClient && (category === 'receivables' || category === 'payables') ? (
            // Vue groupée par client/fournisseur avec données enrichies
            <ClientGroupView
              groups={category === 'receivables' ? 
                mockClientGroups.filter(g => g.totalDue > 0) : 
                mockSupplierGroups
              }
              category={category}
              onActionClick={(action, group) => {
                if (action === 'view_detail') {
                  handleClientSelect(group.id);
                } else {
                  console.log(`Action ${action} pour ${group.name}`);
                }
              }}
            />
          ) : (
        // Vue détaillée classique
        <div className="space-y-2">
          <AnimatePresence>
          {filteredTransactions.map((transaction, index) => (
            <motion.div
              key={`${transaction.type}-${transaction.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                selectedTransaction === transaction.id ? 'ring-2 ring-primary-500' : ''
              }`}
              onClick={() => handleTransactionSelect(transaction.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{transaction.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{transaction.label}</h3>
                        <span className="text-xs text-neutral-500">
                          {transaction.reference}
                        </span>
                        {transaction.attachments && transaction.attachments > 0 && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-xs">
                            <FileText className="w-3 h-3" />
                            {transaction.attachments}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 mt-1 text-sm text-neutral-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(transaction.date).toLocaleDateString('fr-FR')}
                        </span>
                        {(transaction.client || transaction.supplier) && (
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {transaction.client || transaction.supplier}
                          </span>
                        )}
                        {transaction.daysLeft !== undefined && transaction.status === 'pending' && (
                          <span className={`flex items-center gap-1 ${
                            transaction.daysLeft < 0 ? 'text-red-600' : 
                            transaction.daysLeft <= 7 ? 'text-orange-600' : 'text-neutral-600'
                          }`}>
                            <Clock className="w-3 h-3" />
                            {transaction.daysLeft < 0 
                              ? `${Math.abs(transaction.daysLeft)} jours de retard`
                              : `Dans ${transaction.daysLeft} jours`
                            }
                          </span>
                        )}
                      </div>

                      {transaction.description && (
                        <p className="text-sm text-neutral-500 mt-2">
                          {transaction.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-bold text-lg">
                      {formatAmount(transaction.amount)}
                    </div>
                    {getStatusBadge(transaction.status, transaction.daysLeft)}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Actions menu
                    }}
                    className="p-2 hover:bg-neutral-100 rounded-lg"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Actions rapides quand sélectionné */}
              {selectedTransaction === transaction.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mt-4 pt-4 border-t flex flex-wrap gap-2"
                >
                  {getCategoryActions().map((action, actionIndex) => (
                    <button
                      key={`${transaction.id}-action-${actionIndex}`}
                      className="px-3 py-1.5 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 text-sm font-medium transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Action: ${action} sur ${transaction.reference}`);
                      }}
                    >
                      {action}
                    </button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
            </AnimatePresence>
          </div>
        )}
        </>
      )}

      {/* Résumé en bas */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-sm text-neutral-600">Total</div>
            <div className="text-xl font-bold">
              {formatAmount(filteredTransactions.reduce((sum, t) => sum + t.amount, 0))}
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-600">En attente</div>
            <div className="text-xl font-bold text-orange-600">
              {filteredTransactions.filter(t => t.status === 'pending').length}
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-600">En retard</div>
            <div className="text-xl font-bold text-red-600">
              {filteredTransactions.filter(t => t.status === 'overdue' || (t.daysLeft && t.daysLeft < 0)).length}
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-600">Payé</div>
            <div className="text-xl font-bold text-green-600">
              {filteredTransactions.filter(t => t.status === 'paid').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}