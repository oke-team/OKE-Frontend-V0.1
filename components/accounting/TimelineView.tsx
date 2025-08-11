'use client';

import React, { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Transaction, TransactionTotals } from '@/types/accounting';
import { useExpertMode } from '@/contexts/ExpertModeContext';

interface TimelineViewProps {
  debits: Transaction[];
  credits: Transaction[];
  totals: TransactionTotals;
  selectedTransaction: string | null;
  findLinkedTransactions: (transactionId: string) => Transaction[];
  onTransactionSelect: (transactionId: string) => void;
  clientType?: 'client' | 'supplier';
}

const TimelineView = memo<TimelineViewProps>(({
  debits,
  credits,
  totals,
  selectedTransaction,
  findLinkedTransactions,
  onTransactionSelect,
  clientType
}) => {
  const { formatAmount, expertMode } = useExpertMode();
  const [isMobile, setIsMobile] = useState(false);
  const [showLedgerModal, setShowLedgerModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Transaction | null>(null);
  const [editingCell, setEditingCell] = useState<{row: number, field: string} | null>(null);
  const [editedValues, setEditedValues] = useState<Record<string, string | number>>({});

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleTransactionClick = (transaction: Transaction) => {
    // Afficher l'écriture dans un modal/drawer
    setSelectedEntry(transaction);
    setShowLedgerModal(true);
    onTransactionSelect(transaction.id);
  };

  // Fusionner et trier toutes les transactions par date
  const allTransactions = [...debits, ...credits]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-white rounded-xl p-3 sm:p-6 shadow-sm">
      {/* Titre */}
      <h3 className="text-base md:text-lg font-semibold mb-5 text-neutral-800 tracking-tight">
        {expertMode ? 'Historique des mouvements' : 'Historique des transactions'}
      </h3>
      
      {/* Timeline unifiée pour desktop et mobile */}
      <div className="relative">
        {/* Ligne verticale centrale - visible sur desktop au centre, sur mobile à gauche */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-200 md:-translate-x-1/2" />
        
        {/* Liste des transactions */}
        <div className="space-y-4 md:space-y-6">
          {allTransactions.map((transaction, index) => {
            const isDebit = transaction.type === 'invoice' || transaction.type === 'expense';
            const linkedTransactions = findLinkedTransactions(transaction.id);
            const isEven = index % 2 === 0;
            
            return (
              <motion.div 
                key={transaction.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative"
              >
                {/* Conteneur pour l'alignement desktop */}
                <div className={`md:grid md:grid-cols-2 md:gap-8 md:items-center`}>
                  {/* Carte de transaction - position alternée sur desktop */}
                  <div className={`${
                    !isMobile && isEven ? 'md:col-start-2' : 'md:col-start-1'
                  } ${
                    isMobile ? 'pl-12' : ''
                  }`}>
                    <motion.div 
                      onClick={() => handleTransactionClick(transaction)}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 bg-white rounded-xl border cursor-pointer transition-all duration-200 ${
                        selectedTransaction === transaction.id 
                          ? 'border-violet-200 shadow-lg shadow-violet-100/50 bg-gradient-to-br from-white to-violet-50/30' 
                          : 'border-neutral-100 hover:border-violet-100 hover:shadow-sm'
                      } ${
                        !isMobile && isEven ? 'md:text-right' : ''
                      }`}
                    >
                    <div className={`flex justify-between items-start ${
                      !isMobile && isEven ? 'md:flex-row-reverse' : ''
                    }`}>
                      <div className="flex-1">
                        <div className={`flex items-center gap-2 ${
                          !isMobile && isEven ? 'md:justify-end' : ''
                        }`}>
                          <span className={`inline-block px-2.5 py-1 rounded-full text-2xs font-semibold tracking-wide uppercase ${
                            isDebit ? 'bg-gradient-to-r from-red-50 to-orange-50 text-red-700' : 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700'
                          }`}>
                            {isDebit ? (
                              expertMode ? 'Débit' : (
                                transaction.type === 'invoice' ? 'Facture' : 'Dépense'
                              )
                            ) : (
                              expertMode ? 'Crédit' : (
                                transaction.type === 'payment' ? 'Paiement' : 'Avoir'
                              )
                            )}
                          </span>
                          <span className="text-xs text-neutral-500">
                            {new Date(transaction.date).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        
                        <div className="mt-2">
                          <div className="font-medium text-sm">{transaction.label}</div>
                          <div className="text-xs text-neutral-500 mt-1">
                            {transaction.reference}
                          </div>
                        </div>
                      </div>
                      
                      <div className={`ml-3 ${
                        !isMobile && isEven ? 'md:ml-0 md:mr-3 md:text-left' : 'text-right'
                      }`}>
                        <div className={`font-bold ${
                          isDebit ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {formatAmount(transaction.amount)}
                        </div>
                        <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-2xs font-medium ${
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
                      </div>
                    </div>
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
                <div className={`absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 z-10`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                    className={`w-3 h-3 rounded-full ring-4 ring-white shadow-sm ${
                      isDebit ? 'bg-gradient-to-br from-red-400 to-red-600' : 'bg-gradient-to-br from-green-400 to-green-600'
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Totaux */}
      <div className="mt-6 space-y-2.5 p-4 bg-gradient-to-br from-neutral-50 to-neutral-100/50 rounded-xl border border-neutral-200/50">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">
            {expertMode ? 'Total Débits' : 'Total Factures'}
          </span>
          <span className="font-semibold text-red-600">{formatAmount(totals.totalDebits)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">
            {expertMode ? 'Total Crédits' : 'Total Paiements'}
          </span>
          <span className="font-semibold text-green-600">{formatAmount(totals.totalCredits)}</span>
        </div>
      </div>
      
      {/* Barre de solde en bas */}
      <div className="mt-6 pt-6 border-t-2 border-neutral-300">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Solde</span>
          <div className="text-right">
            <div className={`text-2xl font-bold ${
              totals.balance > 0 ? 'text-red-600' : totals.balance < 0 ? 'text-green-600' : 'text-neutral-600'
            }`}>
              {formatAmount(Math.abs(totals.balance))}
            </div>
            <div className="text-sm text-neutral-500">
              {clientType === 'supplier'
                ? (totals.balance > 0 ? 'À payer' : totals.balance < 0 ? 'Crédit fournisseur' : 'Équilibré')
                : (totals.balance > 0 ? 'À recevoir' : totals.balance < 0 ? 'Trop perçu' : 'Équilibré')
              }
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
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-neutral-500">
                        {selectedEntry.type === 'invoice' || selectedEntry.type === 'expense' ? 'Débit' : 'Crédit'}
                      </span>
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
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-neutral-500">
                        {selectedEntry.type === 'invoice' || selectedEntry.type === 'expense' ? 'Crédit' : 'Débit'}
                      </span>
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
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-neutral-500">
                        {selectedEntry.type === 'invoice' || selectedEntry.type === 'expense' ? 'Crédit' : 'Débit'}
                      </span>
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
    </div>
  );
});

TimelineView.displayName = 'TimelineView';

export default TimelineView;