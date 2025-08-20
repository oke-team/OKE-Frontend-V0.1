'use client';

import React, { useState, useCallback } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';
import BankTransactionTable from '@/components/bank/BankTransactionTable';
import BankBalanceWidgets from '@/components/bank/BankBalanceWidgets';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';
import { bankAccounts, calculateBalanceSummary } from '@/lib/mock-data/bank-transactions';

export default function BankPage() {
  // États pour les widgets de solde
  const [showBalances, setShowBalances] = useState(true);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(
    bankAccounts.map(acc => acc.id) // Tous sélectionnés par défaut
  );
  
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  // Mémoriser setCurrentPage pour éviter les boucles infinies
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Gestion de la sélection des comptes avec useCallback pour éviter les boucles
  const handleAccountToggle = useCallback((accountId: string) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId) 
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  }, []);

  const balanceSummary = calculateBalanceSummary(selectedAccounts);
  
  // Fonction pour recevoir les mises à jour de pagination avec useMemo pour éviter les boucles
  const handlePaginationUpdate = useCallback((newTotalPages: number, newTotalItems: number) => {
    setTotalPages(newTotalPages);
    setTotalItems(newTotalItems);
  }, []);

  return (
    <AppLayout>
      {/* Conteneur utilisant toute la hauteur */}
      <div className="fixed top-16 left-0 right-0 bottom-0 overflow-hidden">
        <motion.div 
          className="h-full flex flex-col"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Widgets de solde - position absolue en haut */}
          <motion.div 
            variants={fadeInUp}
            className="absolute top-0 left-0 right-0 z-10 px-4 lg:px-6 pt-4 pb-2"
          >
            <BankBalanceWidgets
              accounts={bankAccounts}
              summary={balanceSummary}
              showBalances={showBalances}
              onToggleVisibility={() => setShowBalances(!showBalances)}
              selectedAccounts={selectedAccounts}
              onAccountToggle={handleAccountToggle}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              onPageChange={handlePageChange}
            />
          </motion.div>

          {/* Table des transactions - positionnée entre navbar et bas de page */}
          <motion.div 
            variants={fadeInUp}
            className="absolute top-20 left-0 right-0 px-4 lg:px-6"
            style={{ bottom: '48px' }}
          >
            <div className="h-full bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] border border-gray-200 overflow-hidden ring-2 ring-black/10 drop-shadow-2xl" style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 25px 50px -12px rgba(0, 0, 0, 0.15)'}}>
              <BankTransactionTable 
                externalSelectedAccounts={selectedAccounts}
                onExternalAccountToggle={handleAccountToggle}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalPages={totalPages}
                totalItems={totalItems}
                onPaginationUpdate={handlePaginationUpdate}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
