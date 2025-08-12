'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDrillDown } from '@/contexts/DrillDownContext';

interface Account {
  id: string;
  label: string;
  balance: number;
  trend?: 'up' | 'down' | 'stable';
  warning?: boolean;
  lastMovement?: string;
}

interface AccountGroup {
  id: string;
  label: string;
  accounts: Account[];
  total: number;
}

interface AccountListViewProps {
  cardId: string;
  cardLabel: string;
  groups: AccountGroup[];
}

export const AccountListView: React.FC<AccountListViewProps> = ({
  cardId,
  cardLabel,
  groups,
}) => {
  const { navigateBack, navigateToTimeline } = useDrillDown();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    groups.map(g => g.id) // Tous ouverts par défaut
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const filteredGroups = groups.map(group => ({
    ...group,
    accounts: group.accounts.filter(account =>
      account.label.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(group => group.accounts.length > 0);

  const totalBalance = groups.reduce((sum, group) => sum + group.total, 0);

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 space-y-4">
      {/* Header avec navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-xl border border-white/20 p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={navigateBack}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Retour</span>
          </button>
          
          <div className="text-xs text-neutral-500">
            Tableau de bord / {cardLabel}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-neutral-900">
            {cardLabel}
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-neutral-600">
              Détail des comptes et mouvements
            </p>
            <div className="text-2xl font-bold text-primary-600">
              {formatCurrency(totalBalance)}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Barre de recherche */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-xl rounded-xl border border-white/20 p-3"
      >
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Rechercher un compte..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button className="p-2 bg-white/50 border border-neutral-200 rounded-lg hover:bg-neutral-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Liste des groupes de comptes */}
      <div className="space-y-3">
        {filteredGroups.map((group, groupIndex) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + groupIndex * 0.05 }}
            className="bg-white/80 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden"
          >
            {/* En-tête du groupe */}
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-neutral-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ChevronRight
                  className={cn(
                    "w-5 h-5 text-neutral-400 transition-transform",
                    expandedGroups.includes(group.id) && "rotate-90"
                  )}
                />
                <div className="text-left">
                  <h3 className="font-semibold text-neutral-900">{group.label}</h3>
                  <p className="text-sm text-neutral-500">
                    {group.accounts.length} compte{group.accounts.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="text-lg font-bold text-neutral-900">
                {formatCurrency(group.total)}
              </div>
            </button>

            {/* Liste des comptes */}
            {expandedGroups.includes(group.id) && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="border-t border-neutral-100"
              >
                {group.accounts.map((account, accountIndex) => (
                  <motion.button
                    key={account.id}
                    onClick={() => navigateToTimeline(account.id, account.label)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: accountIndex * 0.02 }}
                    className="w-full p-4 pl-12 flex items-center justify-between hover:bg-primary-50/50 transition-colors border-b border-neutral-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-left">
                        <div className="font-medium text-neutral-800">
                          {account.label}
                        </div>
                        {account.lastMovement && (
                          <div className="text-xs text-neutral-500">
                            Dernier mouvement : {account.lastMovement}
                          </div>
                        )}
                      </div>
                      {account.warning && (
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-semibold text-neutral-900">
                          {formatCurrency(account.balance)}
                        </div>
                        {account.trend && (
                          <div className="flex items-center gap-1 justify-end">
                            {account.trend === 'up' ? (
                              <TrendingUp className="w-3 h-3 text-green-500" />
                            ) : account.trend === 'down' ? (
                              <TrendingDown className="w-3 h-3 text-red-500" />
                            ) : null}
                            <span className={cn(
                              "text-xs",
                              account.trend === 'up' && "text-green-600",
                              account.trend === 'down' && "text-red-600",
                              account.trend === 'stable' && "text-neutral-500"
                            )}>
                              {account.trend === 'stable' ? 'Stable' : account.trend === 'up' ? 'En hausse' : 'En baisse'}
                            </span>
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Total général */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Total général</h3>
            <p className="text-sm text-neutral-600">
              {filteredGroups.reduce((sum, g) => sum + g.accounts.length, 0)} comptes au total
            </p>
          </div>
          <div className="text-2xl font-bold text-primary-600">
            {formatCurrency(totalBalance)}
          </div>
        </div>
      </motion.div>
    </div>
  );
};