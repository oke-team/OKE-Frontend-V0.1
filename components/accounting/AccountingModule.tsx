'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ArrowLeft } from 'lucide-react';
import BalanceTable from './BalanceTable';
import GeneralLedgerTable from './GeneralLedgerTable';
import { accountsData, JournalEntry } from '@/lib/accounting-data';

export default function AccountingModule() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedAccountLabel, setSelectedAccountLabel] = useState<string>('');
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeView, setActiveView] = useState<'balance' | 'ledger'>('balance');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsMobile(width < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleAccountSelect = (accountCode: string, accountLabel: string) => {
    setSelectedAccount(accountCode);
    setSelectedAccountLabel(accountLabel);
    // Sur mobile, slide automatiquement vers le grand livre
    if (isMobile) {
      setTimeout(() => setActiveView('ledger'), 100);
    }
  };

  const handleEntryEdit = (entry: JournalEntry) => {
    console.log('Écriture modifiée:', entry);
  };

  const handleSelectionChange = (selected: Set<string>) => {
    setSelectedRows(selected);
    console.log('Lignes sélectionnées:', Array.from(selected));
  };

  return (
    <div style={{
      height: 'calc(100vh - 10rem)', // Plus d'espace avec la navbar
      display: 'flex',
      padding: isDesktop ? '1rem' : '0',
      gap: isDesktop ? '1rem' : '0',
      backgroundColor: '#fafafa',
      position: 'relative',
      overflow: 'hidden',
      marginBottom: '2rem', // Espace avec la navbar du bas
      width: '100%'
    }}>

      {/* Vue Desktop - Double table côte à côte */}
      {isDesktop && (
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'minmax(400px, 1fr) minmax(600px, 2fr)',
          gap: '1rem',
          minHeight: 0,
          width: '100%'
        }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ height: '100%', minHeight: 0 }}
          >
            <BalanceTable
              accounts={accountsData}
              selectedAccount={selectedAccount}
              onAccountSelect={handleAccountSelect}
              onSelectionChange={handleSelectionChange}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ height: '100%', minHeight: 0 }}
          >
            <GeneralLedgerTable
              selectedAccount={selectedAccount}
              selectedAccountLabel={selectedAccountLabel}
              onEntryEdit={handleEntryEdit}
              onSelectionChange={handleSelectionChange}
            />
          </motion.div>
        </div>
      )}

      {/* Vue Mobile - Navigation par slides */}
      {isMobile && (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}>
          <AnimatePresence mode="wait">
            {activeView === 'balance' ? (
              <motion.div
                key="balance"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  padding: '0.5rem'
                }}
              >
                <BalanceTable
                  accounts={accountsData}
                  selectedAccount={selectedAccount}
                  onAccountSelect={handleAccountSelect}
                  onSelectionChange={handleSelectionChange}
                />
              </motion.div>
            ) : (
              <motion.div
                key="ledger"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  padding: '0.5rem'
                }}
              >
                <GeneralLedgerTable
                  selectedAccount={selectedAccount}
                  selectedAccountLabel={selectedAccountLabel}
                  onEntryEdit={handleEntryEdit}
                  onSelectionChange={handleSelectionChange}
                />
                
                {/* Bouton flottant pour revenir à la balance */}
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveView('balance')}
                  style={{
                    position: 'fixed',
                    bottom: '5rem',
                    left: '1rem',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #5e72ff 0%, #8b5cf6 100%)',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(94, 114, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                >
                  <ArrowLeft size={20} style={{ color: 'white' }} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Vue Tablet - Comportement intermédiaire */}
      {!isDesktop && !isMobile && (
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: activeView === 'balance' ? '1fr' : '0.4fr 1fr',
          gap: '1rem',
          minHeight: 0,
          transition: 'grid-template-columns 0.3s ease'
        }}>
          {activeView === 'balance' || selectedAccount ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeView === 'balance' ? 1 : 0.8 }}
                style={{ 
                  height: '100%', 
                  minHeight: 0,
                  display: activeView === 'ledger' && !selectedAccount ? 'none' : 'block'
                }}
              >
                <BalanceTable
                  accounts={accountsData}
                  selectedAccount={selectedAccount}
                  onAccountSelect={handleAccountSelect}
                  onSelectionChange={handleSelectionChange}
                  compact={activeView === 'ledger'}
                />
              </motion.div>
              
              {selectedAccount && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ height: '100%', minHeight: 0 }}
                >
                  <GeneralLedgerTable
                    selectedAccount={selectedAccount}
                    selectedAccountLabel={selectedAccountLabel}
                    onEntryEdit={handleEntryEdit}
                    onSelectionChange={handleSelectionChange}
                  />
                </motion.div>
              )}
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}