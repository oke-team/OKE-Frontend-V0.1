'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Wallet,
  CreditCard,
  Coins
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

  // Couleurs élégantes pour les groupes
  const getGroupColor = (index: number) => {
    const colors = [
      'from-violet-50 to-purple-50 border-purple-200',
      'from-blue-50 to-cyan-50 border-blue-200',
      'from-emerald-50 to-green-50 border-green-200',
      'from-orange-50 to-amber-50 border-orange-200',
    ];
    return colors[index % colors.length];
  };

  // Icône selon le type de compte
  const getAccountIcon = (accountId: string) => {
    if (accountId.includes('512') || accountId.includes('bank')) return CreditCard;
    if (accountId.includes('530') || accountId.includes('cash')) return Wallet;
    return Coins;
  };

  const filteredGroups = groups;

  const totalBalance = groups.reduce((sum, group) => sum + group.total, 0);

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 space-y-4">
      {/* Header simplifié */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={navigateBack}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{cardLabel}</h1>
            <p className="text-xs text-gray-500">Tableau de bord / {cardLabel}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            {formatCurrency(totalBalance)}
          </div>
          <p className="text-xs text-gray-500">
            {filteredGroups.reduce((sum, g) => sum + g.accounts.length, 0)} comptes
          </p>
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
            className={cn(
              "bg-gradient-to-br rounded-xl border overflow-hidden transition-all hover:shadow-lg",
              getGroupColor(groupIndex)
            )}
          >
            {/* En-tête du groupe */}
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-white/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: expandedGroups.includes(group.id) ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </motion.div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{group.label}</h3>
                  <p className="text-sm text-gray-600">
                    {group.accounts.length} compte{group.accounts.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {formatCurrency(group.total)}
                </div>
                {group.total > 0 && (
                  <div className="text-xs text-green-600 text-right">Actif</div>
                )}
                {group.total < 0 && (
                  <div className="text-xs text-orange-600 text-right">Passif</div>
                )}
              </div>
            </button>

            {/* Liste des comptes */}
            {expandedGroups.includes(group.id) && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="border-t border-white/30 bg-white/40"
              >
                {group.accounts.map((account, accountIndex) => (
                  <motion.button
                    key={account.id}
                    onClick={() => navigateToTimeline(account.id, account.label)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: accountIndex * 0.02 }}
                    className="w-full p-4 pl-12 flex items-center justify-between hover:bg-white/50 transition-colors border-b border-white/20 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      {(() => {
                        const Icon = getAccountIcon(account.id);
                        return (
                          <div className="p-1.5 rounded-lg bg-white/60">
                            <Icon className="w-4 h-4 text-gray-600" />
                          </div>
                        );
                      })()}
                      <div className="text-left">
                        <div className="font-medium text-gray-800">
                          {account.label}
                        </div>
                        {account.lastMovement && (
                          <div className="text-xs text-gray-600">
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
                        <div className={cn(
                          "font-semibold",
                          account.balance >= 0 ? "text-gray-900" : "text-red-600"
                        )}>
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
                              account.trend === 'stable' && "text-gray-500"
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

    </div>
  );
};