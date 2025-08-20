'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Eye, EyeOff, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeIn } from '@/lib/animations/variants';
import { bankLogos, Banque } from '@/lib/mock-data/bank-transactions';

export interface BankAccount {
  id: string;
  name: string;
  balance: number;
  currency: string;
  bankCode: Banque;
  bankName: string;
  accountNumber: string;
  type: 'current' | 'savings' | 'foreign';
}

export interface BalanceSummary {
  totalBalance: number;
  totalDebits: number;
  totalCredits: number;
  accountsCount: number;
}

interface BankBalanceWidgetsProps {
  accounts: BankAccount[];
  summary: BalanceSummary;
  showBalances: boolean;
  onToggleVisibility: () => void;
  selectedAccounts: string[];
  onAccountToggle: (accountId: string) => void;
  className?: string;
  // Props de pagination
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

// Widget individuel pour un compte
function AccountBalanceCard({ 
  account, 
  showBalance, 
  index,
  isSelected,
  onToggle
}: { 
  account: BankAccount; 
  showBalance: boolean; 
  index: number;
  isSelected: boolean;
  onToggle: (accountId: string) => void;
}) {
  const isPositive = account.balance >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "bg-white rounded-lg border px-3 py-2 min-w-[160px] hover:shadow-sm transition-all cursor-pointer",
        isSelected 
          ? "border-[#4C34CE] shadow-sm" 
          : "border-gray-200 hover:border-gray-300"
      )}
      onClick={() => onToggle(account.id)}
    >
      <div className="flex items-center gap-2">
        {/* Checkbox de sélection */}
        <div className={cn(
          "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors shrink-0",
          isSelected 
            ? "border-[#4C34CE] bg-[#4C34CE]" 
            : "border-gray-300"
        )}>
          {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
        </div>
        
        {/* Logo de la banque */}
        <img 
          src={bankLogos[account.bankCode]} 
          alt={account.bankName}
          className="w-8 h-8 rounded object-cover shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 truncate" title={account.name}>
            ••• {account.accountNumber.slice(-3)}
          </p>
          <div className={cn(
            "text-sm font-semibold leading-tight",
            isPositive ? 'text-gray-900' : 'text-red-600'
          )}>
            {showBalance ? (
              `${account.balance.toLocaleString('fr-FR', { 
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0 
              })} ${account.currency}`
            ) : (
              '••• •••'
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Widget de synthèse globale
function SummaryCard({ 
  summary, 
  showBalance, 
  onToggleVisibility 
}: { 
  summary: BalanceSummary; 
  showBalance: boolean; 
  onToggleVisibility: () => void;
}) {
  const isPositive = summary.totalBalance >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-[#4C34CE] rounded-lg px-3 py-2 min-w-[160px] relative overflow-hidden shadow-sm"
    >
      {/* Effet glass morphism subtil */}
      <div className="absolute inset-0 bg-[#4C34CE]/5"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#4C34CE]" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#4C34CE]/70">Solde total</p>
            <div className={cn(
              "text-sm font-semibold leading-tight",
              isPositive ? 'text-gray-900' : 'text-red-600'
            )}>
              {showBalance ? (
                `${summary.totalBalance.toLocaleString('fr-FR', { 
                  minimumFractionDigits: 0, 
                  maximumFractionDigits: 0 
                })} €`
              ) : (
                '••• •••'
              )}
            </div>
          </div>
          <button
            onClick={onToggleVisibility}
            className="p-0.5 hover:bg-[#4C34CE]/10 rounded transition-colors shrink-0"
            title={showBalance ? 'Masquer les soldes' : 'Afficher les soldes'}
          >
            {showBalance ? <Eye className="w-3 h-3 text-[#4C34CE]" /> : <EyeOff className="w-3 h-3 text-[#4C34CE]" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Widget de pagination compact
function PaginationWidget({ 
  currentPage, 
  totalPages, 
  totalItems, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  totalItems: number;
  onPageChange: (page: number) => void;
}) {
  const itemsPerPage = 50;
  const startItem = ((currentPage - 1) * itemsPerPage) + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 px-3 py-2 min-w-[160px] hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-xs text-gray-500">Transactions</p>
          <p className="text-sm font-semibold text-gray-900">
            {startItem}-{endItem} / {totalItems}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-600 px-1">
            {currentPage}/{totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function BankBalanceWidgets({
  accounts,
  summary,
  showBalances,
  onToggleVisibility,
  selectedAccounts,
  onAccountToggle,
  className,
  currentPage,
  totalPages,
  totalItems,
  onPageChange
}: BankBalanceWidgetsProps) {
  return (
    <motion.div
      className={cn(
        "flex gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
        className
      )}
      variants={fadeIn}
      initial="initial"
      animate="animate"
    >
      {/* Widget de synthèse en premier */}
      <SummaryCard 
        summary={summary} 
        showBalance={showBalances}
        onToggleVisibility={onToggleVisibility}
      />
      
      {/* Widgets des comptes individuels */}
      {accounts.map((account, index) => (
        <AccountBalanceCard
          key={account.id}
          account={account}
          showBalance={showBalances}
          index={index + 1}
          isSelected={selectedAccounts.includes(account.id)}
          onToggle={onAccountToggle}
        />
      ))}
      
      {/* Widget de pagination si les données sont disponibles */}
      {currentPage && totalPages && totalItems && onPageChange && (
        <PaginationWidget
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      )}
    </motion.div>
  );
}