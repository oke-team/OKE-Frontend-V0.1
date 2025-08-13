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
  Coins,
  ChevronsUpDown,
  ChevronsDownUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDrillDown } from '@/contexts/DrillDownContext';
import { extractTierFromLabel } from '@/lib/mock-data/tiers-avatars';
import { TierAvatar } from '@/components/ui/TierAvatar';

interface Account {
  id: string;
  label: string;
  balance: number;
  balanceN1?: number;
  trend?: 'up' | 'down' | 'stable';
  warning?: boolean;
  lastMovement?: string;
}

interface AccountGroup {
  id: string;
  label: string;
  accounts: Account[];
  total: number;
  totalN1?: number;
}

interface AccountListViewProps {
  cardId: string;
  cardLabel: string;
  groups: AccountGroup[];
  cardColor?: 'violet' | 'green' | 'red' | 'blue' | 'orange';
}

export const AccountListView: React.FC<AccountListViewProps> = ({
  cardId,
  cardLabel,
  groups,
  cardColor = 'violet',
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

  const calculateVariation = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / Math.abs(previous)) * 100;
  };

  const formatVariation = (current: number, previous: number) => {
    const variation = calculateVariation(current, previous);
    const sign = variation > 0 ? '+' : '';
    return `${sign}${variation.toFixed(1)}%`;
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const toggleAllGroups = () => {
    if (expandedGroups.length === groups.length) {
      // Tout est ouvert, on ferme tout
      setExpandedGroups([]);
    } else {
      // Au moins un est fermé, on ouvre tout
      setExpandedGroups(groups.map(g => g.id));
    }
  };

  const isAllExpanded = expandedGroups.length === groups.length;

  // Couleurs basées sur la couleur du widget parent
  const getGroupColors = () => {
    switch(cardColor) {
      case 'violet':
        return {
          gradient: 'from-violet-50 to-purple-50',
          border: 'border-purple-200',
          borderLeft: ['border-l-violet-400', 'border-l-purple-400', 'border-l-indigo-400'],
          title: 'from-purple-600 to-purple-500',
          total: 'from-purple-600 to-purple-400'
        };
      case 'green':
        return {
          gradient: 'from-green-50 to-emerald-50',
          border: 'border-green-200',
          borderLeft: ['border-l-green-400', 'border-l-emerald-400', 'border-l-teal-400'],
          title: 'from-green-600 to-green-500',
          total: 'from-green-600 to-green-400'
        };
      case 'blue':
        return {
          gradient: 'from-blue-50 to-cyan-50',
          border: 'border-blue-200',
          borderLeft: ['border-l-blue-400', 'border-l-cyan-400', 'border-l-sky-400'],
          title: 'from-blue-600 to-blue-500',
          total: 'from-blue-600 to-blue-400'
        };
      case 'orange':
        return {
          gradient: 'from-orange-50 to-amber-50',
          border: 'border-orange-200',
          borderLeft: ['border-l-orange-400', 'border-l-amber-400', 'border-l-yellow-400'],
          title: 'from-orange-600 to-orange-500',
          total: 'from-orange-600 to-orange-400'
        };
      case 'red':
        return {
          gradient: 'from-red-50 to-rose-50',
          border: 'border-red-200',
          borderLeft: ['border-l-red-400', 'border-l-rose-400', 'border-l-pink-400'],
          title: 'from-red-600 to-red-500',
          total: 'from-red-600 to-red-400'
        };
      default:
        return {
          gradient: 'from-gray-50 to-slate-50',
          border: 'border-gray-200',
          borderLeft: ['border-l-gray-400', 'border-l-slate-400', 'border-l-zinc-400'],
          title: 'from-gray-600 to-gray-500',
          total: 'from-gray-600 to-gray-400'
        };
    }
  };

  const colors = getGroupColors();

  // Icône selon le type de compte
  const getAccountIcon = (accountId: string) => {
    if (accountId.includes('512') || accountId.includes('bank')) return CreditCard;
    if (accountId.includes('530') || accountId.includes('cash')) return Wallet;
    return Coins;
  };

  const filteredGroups = groups;

  const totalBalance = groups.reduce((sum, group) => sum + group.total, 0);
  const totalBalanceN1 = groups.reduce((sum, group) => sum + (group.totalN1 || group.total * 0.9), 0);

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 space-y-4">
      {/* Header avec design Liquid Glass et responsive */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg p-4 md:p-6 mb-6"
      >
        {/* Mobile: Stack vertical, Desktop: Flex horizontal */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Titre et navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={navigateBack}
              className="p-2 md:p-2.5 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 shadow-sm flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className={cn(
              "text-xl md:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
              colors.title
            )}>
              {cardLabel}
            </h1>
          </div>
          
          {/* Actions et montant */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
            {/* Bouton Tout ouvrir/fermer */}
            <button
              onClick={toggleAllGroups}
              className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-sm font-medium text-gray-700 bg-white/60 hover:bg-white/80 border border-gray-200/50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {isAllExpanded ? (
                <>
                  <ChevronsDownUp className="w-4 h-4" />
                  <span className="hidden sm:inline">Tout fermer</span>
                  <span className="sm:hidden">Fermer</span>
                </>
              ) : (
                <>
                  <ChevronsUpDown className="w-4 h-4" />
                  <span className="hidden sm:inline">Tout ouvrir</span>
                  <span className="sm:hidden">Ouvrir</span>
                </>
              )}
            </button>
            
            {/* Section montant */}
            <div className="flex-1 sm:flex-initial text-left sm:text-right">
              <div className={cn(
                "text-2xl md:text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                colors.total
              )}>
                {formatCurrency(totalBalance)}
              </div>
              <div className="flex items-center gap-2 sm:justify-end mt-1">
                {(() => {
                  const trend = totalBalance > totalBalanceN1 * 1.02 ? 'up' : 
                               totalBalance < totalBalanceN1 * 0.98 ? 'down' : 'stable';
                  return (
                    <div className="flex items-center gap-1">
                      {trend === 'up' ? (
                        <TrendingUp className="w-3 md:w-4 h-3 md:h-4 text-green-500" />
                      ) : trend === 'down' ? (
                        <TrendingDown className="w-3 md:w-4 h-3 md:h-4 text-red-500" />
                      ) : (
                        <div className="w-3 md:w-4 h-3 md:h-4" />
                      )}
                      <span className="text-xs md:text-sm text-gray-500">N-1:</span>
                      <span className={cn(
                        "text-xs md:text-sm font-semibold",
                        trend === 'up' && "text-green-600",
                        trend === 'down' && "text-red-600",
                        trend === 'stable' && "text-gray-600"
                      )}>
                        {formatCurrency(totalBalanceN1)}
                      </span>
                      <span className={cn(
                        "text-xs md:text-sm",
                        trend === 'up' && "text-green-600",
                        trend === 'down' && "text-red-600",
                        trend === 'stable' && "text-gray-600"
                      )}>
                        ({formatVariation(totalBalance, totalBalanceN1)})
                      </span>
                    </div>
                  );
                })()}
              </div>
              <p className="text-xs text-gray-500 mt-1 md:mt-2">
                {filteredGroups.reduce((sum, g) => sum + g.accounts.length, 0)} comptes
              </p>
            </div>
          </div>
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
              "bg-gradient-to-br rounded-xl border overflow-hidden transition-all hover:shadow-lg relative border-l-4",
              colors.gradient,
              colors.border,
              colors.borderLeft[groupIndex % colors.borderLeft.length]
            )}
          >
            {/* En-tête du groupe - responsive */}
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full p-3 md:p-4 flex items-center justify-between hover:bg-white/30 transition-colors"
            >
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                <motion.div
                  animate={{ rotate: expandedGroups.includes(group.id) ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronRight className="w-4 md:w-5 h-4 md:h-5 text-gray-600" />
                </motion.div>
                <div className="text-left min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{group.label}</h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    {group.accounts.length} compte{group.accounts.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="text-base md:text-lg font-bold text-gray-900 text-right">
                  {formatCurrency(group.total)}
                </div>
                {group.totalN1 !== undefined && (
                  <div className="flex items-center gap-1 justify-end">
                    {(() => {
                      const trend = group.total > group.totalN1 * 1.02 ? 'up' : 
                                   group.total < group.totalN1 * 0.98 ? 'down' : 'stable';
                      return (
                        <>
                          {trend === 'up' ? (
                            <TrendingUp className="w-3 h-3 text-green-500" />
                          ) : trend === 'down' ? (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                          ) : (
                            <div className="w-3 h-3" />
                          )}
                          <span className="text-xs text-gray-500 hidden sm:inline">N-1:</span>
                          <span className={cn(
                            "text-xs font-medium",
                            trend === 'up' && "text-green-600",
                            trend === 'down' && "text-red-600",
                            trend === 'stable' && "text-gray-600"
                          )}>
                            <span className="hidden sm:inline">{formatCurrency(group.totalN1)}</span>
                            <span className="text-xs"> ({formatVariation(group.total, group.totalN1)})</span>
                          </span>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            </button>

            {/* Liste des comptes */}
            {expandedGroups.includes(group.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="border-t border-white/30 bg-gray-50/30"
              >
                {group.accounts.map((account, accountIndex) => (
                  <motion.button
                    key={account.id}
                    onClick={() => navigateToTimeline(account.id, account.label)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: accountIndex * 0.02 }}
                    className="w-full p-3 md:p-4 pl-12 md:pl-16 flex items-center justify-between hover:bg-white/50 transition-all duration-300 border-b border-white/20 last:border-0 relative"
                  >
                    {/* Ligne de connexion verticale - s'arrête au milieu du dernier élément */}
                    {accountIndex < group.accounts.length - 1 ? (
                      <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-300/50" />
                    ) : (
                      <div className="absolute left-8 top-0 h-1/2 w-px bg-gray-300/50" />
                    )}
                    {/* Ligne de connexion horizontale */}
                    <div className="absolute left-8 top-1/2 w-6 h-px bg-gray-300/50" />
                    <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                      {(() => {
                        // Vérifier si c'est un compte avec un tiers identifiable
                        const tierAvatar = extractTierFromLabel(account.label);
                        
                        if (tierAvatar) {
                          // Si un tiers est identifié, afficher son avatar
                          return <TierAvatar tier={tierAvatar} size="sm" />;
                        } else {
                          // Sinon, afficher l'icône par défaut
                          const Icon = getAccountIcon(account.id);
                          return (
                            <div className="p-1 md:p-1.5 rounded-lg bg-white/60 flex-shrink-0">
                              <Icon className="w-3 md:w-4 h-3 md:h-4 text-gray-600" />
                            </div>
                          );
                        }
                      })()}
                      <div className="text-left min-w-0 flex-1">
                        <div className="font-medium text-gray-800 text-sm md:text-base truncate">
                          {account.label}
                        </div>
                        {account.lastMovement && (
                          <div className="text-xs text-gray-600 hidden md:block">
                            Dernier mouvement : {account.lastMovement}
                          </div>
                        )}
                      </div>
                      {account.warning && (
                        <AlertCircle className="w-3 md:w-4 h-3 md:h-4 text-orange-500 flex-shrink-0" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                      <div className="text-right">
                        <div className={cn(
                          "font-semibold text-sm md:text-base",
                          account.balance >= 0 ? "text-gray-900" : "text-red-600"
                        )}>
                          {formatCurrency(account.balance)}
                        </div>
                        {(account.balanceN1 !== undefined || account.trend) && (
                          <div className="flex items-center gap-1 justify-end">
                            {account.trend === 'up' ? (
                              <TrendingUp className="w-3 h-3 text-green-500" />
                            ) : account.trend === 'down' ? (
                              <TrendingDown className="w-3 h-3 text-red-500" />
                            ) : (
                              <div className="w-3 h-3" />
                            )}
                            <span className="text-xs text-gray-500 hidden sm:inline">N-1:</span>
                            <span className={cn(
                              "text-xs font-medium",
                              account.trend === 'up' && "text-green-600",
                              account.trend === 'down' && "text-red-600",
                              account.trend === 'stable' && "text-gray-600"
                            )}>
                              <span className="hidden sm:inline">{formatCurrency(account.balanceN1 || account.balance * 0.9)}</span>
                              <span className="text-xs"> ({formatVariation(account.balance, account.balanceN1 || account.balance * 0.9)})</span>
                            </span>
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-3 md:w-4 h-3 md:h-4 text-neutral-400" />
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