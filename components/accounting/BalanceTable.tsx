'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  Download,
  Eye,
  Building2,
  Users,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Account } from '@/lib/accounting-data';

interface BalanceTableProps {
  accounts: Account[];
  selectedAccount: string | null;
  onAccountSelect: (accountCode: string, accountLabel: string) => void;
  onSelectionChange?: (selected: Set<string>) => void;
  compact?: boolean;
}

export default function BalanceTable({ 
  accounts, 
  selectedAccount, 
  onAccountSelect,
  onSelectionChange,
  compact = false
}: BalanceTableProps) {
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(new Set(['401000'])); // Fournisseurs déplié par défaut
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const toggleExpanded = (accountCode: string) => {
    const newExpanded = new Set(expandedAccounts);
    if (newExpanded.has(accountCode)) {
      newExpanded.delete(accountCode);
    } else {
      newExpanded.add(accountCode);
    }
    setExpandedAccounts(newExpanded);
  };

  const formatNumber = (num: number) => {
    // Format compact pour les gros montants
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

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      const allIds = new Set<string>();
      accounts.forEach(acc => {
        allIds.add(acc.id);
        acc.auxiliaryAccounts?.forEach(aux => allIds.add(aux.id));
      });
      setSelectedRows(allIds);
    }
    setSelectAll(!selectAll);
    onSelectionChange?.(selectAll ? new Set() : selectedRows);
  };

  const handleRowSelect = (accountId: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(accountId)) {
      newSelected.delete(accountId);
    } else {
      newSelected.add(accountId);
    }
    setSelectedRows(newSelected);
    setSelectAll(false);
    onSelectionChange?.(newSelected);
  };

  const getAccountIcon = (code: string) => {
    if (code.startsWith('401')) return <Building2 size={14} style={{ color: '#ef4444' }} />;
    if (code.startsWith('411')) return <Users size={14} style={{ color: '#10b981' }} />;
    if (code === '1') return <TrendingUp size={14} style={{ color: '#8b5cf6' }} />;
    return null;
  };

  // Filtrer pour ne pas afficher les classes (codes à 1 seul chiffre)
  const displayAccounts = accounts.filter(acc => acc.code.length > 1);

  const renderAccount = (account: Account, level: number = 0) => {
    const isExpanded = expandedAccounts.has(account.code);
    const hasAuxiliaries = account.auxiliaryAccounts && account.auxiliaryAccounts.length > 0;
    const isSelected = selectedAccount === account.code;

    return (
      <React.Fragment key={account.id}>
        <motion.tr
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => onAccountSelect(account.code, account.label)}
          style={{
            cursor: 'pointer',
            backgroundColor: isSelected ? 'rgba(255, 251, 240, 1)' : selectedRows.has(account.id) ? 'rgba(94, 114, 255, 0.03)' : 'transparent',
            borderLeft: isSelected ? '3px solid #5e72ff' : '3px solid transparent',
            transition: 'all 0.15s'
          }}
          onMouseEnter={(e) => {
            if (!isSelected && !selectedRows.has(account.id)) {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.01)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSelected) {
              e.currentTarget.style.backgroundColor = selectedRows.has(account.id) ? 'rgba(94, 114, 255, 0.03)' : 'transparent';
            }
          }}
        >
          <td style={{ 
            padding: '0.5rem 0.75rem', 
            width: '40px'
          }}>
            <input
              type="checkbox"
              checked={selectedRows.has(account.id)}
              onChange={(e) => {
                e.stopPropagation();
                handleRowSelect(account.id);
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '16px',
                height: '16px',
                cursor: 'pointer',
                accentColor: '#5e72ff'
              }}
            />
          </td>
          <td style={{ 
            padding: '0.5rem 0.375rem', 
            fontSize: compact ? '12px' : '13px',
            fontWeight: level === 0 && !account.isAuxiliary ? 500 : 400,
            maxWidth: 0,
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              {hasAuxiliaries && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpanded(account.code);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'transform 0.2s'
                  }}
                >
                  {isExpanded ? (
                    <ChevronDown size={12} style={{ color: '#666' }} />
                  ) : (
                    <ChevronRight size={12} style={{ color: '#666' }} />
                  )}
                </button>
              )}
              <span style={{ 
                fontFamily: 'monospace', 
                fontSize: compact ? '11px' : '12px',
                color: account.isAuxiliary ? '#8b5cf6' : '#5e72ff',
                minWidth: '70px',
                display: 'inline-block',
                fontStyle: account.isAuxiliary ? 'italic' : 'normal'
              }}>
                {account.code}
              </span>
              <span 
                title={account.label}
                style={{ 
                  color: account.isAuxiliary ? '#666' : '#171717',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: 1
                }}>
                {account.label}
              </span>
            </div>
          </td>
          <td style={{ 
            padding: '0.5rem 0.75rem', 
            textAlign: 'right', 
            fontSize: compact ? '12px' : '13px',
            fontWeight: account.isAuxiliary ? 400 : 500,
            fontStyle: account.isAuxiliary ? 'italic' : 'normal',
            whiteSpace: 'nowrap',
            minWidth: '120px',
            width: '120px'
          }}>
            <span style={{ 
              color: account.balance < 0 ? '#ef4444' : account.balance > 0 ? '#171717' : '#a3a3a3'
            }}>
              {account.balance < 0 ? '-' : ''}{formatNumber(Math.abs(account.balance))}
            </span>
          </td>
        </motion.tr>

        {/* Comptes auxiliaires */}
        <AnimatePresence>
          {hasAuxiliaries && isExpanded && (
            <>
              {account.auxiliaryAccounts!.map((aux) => renderAccount(aux, level + 1))}
            </>
          )}
        </AnimatePresence>
      </React.Fragment>
    );
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      border: '1px solid rgba(229, 229, 229, 0.3)',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    }}>
      {/* Header minimal */}
      <div style={{
        padding: compact ? '0.5rem 0.75rem' : '0.75rem 1rem',
        borderBottom: '1px solid rgba(229, 229, 229, 0.3)',
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(250, 250, 250, 0.95))',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: compact ? '14px' : '15px', fontWeight: 600, color: '#171717' }}>
            Balance Générale
          </h2>
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
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'rgba(250, 250, 250, 0.98)',
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
                padding: '0.5rem 0.375rem',
                textAlign: 'left',
                fontSize: '11px',
                fontWeight: 600,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span>Compte</span>
                  <span style={{ color: '#d4d4d8' }}>↕</span>
                </div>
              </th>
              <th style={{
                padding: '0.5rem 0.75rem',
                textAlign: 'right',
                fontSize: '11px',
                fontWeight: 600,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                minWidth: '120px',
                width: '120px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem' }}>
                  <span>Solde</span>
                  <span style={{ color: '#d4d4d8' }}>↕</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayAccounts.map(account => renderAccount(account))}
          </tbody>
        </table>
      </div>

      {/* Footer avec totaux */}
      <div style={{
        padding: compact ? '0.5rem 0.75rem' : '0.625rem 1rem',
        borderTop: '1px solid rgba(229, 229, 229, 0.3)',
        backgroundColor: 'rgba(250, 250, 250, 0.95)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: compact ? '11px' : '12px'
      }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <span>
            Total Débit: <strong style={{ color: '#171717' }}>
              {formatNumber(accounts.reduce((sum, acc) => sum + acc.debit, 0))} €
            </strong>
          </span>
          <span>
            Total Crédit: <strong style={{ color: '#ef4444' }}>
              {formatNumber(accounts.reduce((sum, acc) => sum + acc.credit, 0))} €
            </strong>
          </span>
        </div>
        <span style={{ fontSize: compact ? '10px' : '11px', color: '#666' }}>
          {displayAccounts.length} comptes affichés
        </span>
      </div>
    </div>
  );
}