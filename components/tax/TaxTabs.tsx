'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Receipt, 
  FileText, 
  CreditCard, 
  User 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DeclarationGroup, TaxMode } from '@/lib/types/tax-types';
import { mockTaxDashboardData } from '@/lib/mock-data/tax-data';

interface TaxTabsProps {
  activeGroup: DeclarationGroup | 'dashboard';
  onGroupChange: (group: DeclarationGroup | 'dashboard') => void;
  taxMode: TaxMode;
}

export default function TaxTabs({ activeGroup, onGroupChange, taxMode }: TaxTabsProps) {
  const dashboardData = mockTaxDashboardData;
  
  const tabs = [
    {
      key: 'dashboard' as const,
      label: 'Tableau de bord',
      shortLabel: 'Dashboard',
      icon: LayoutDashboard,
      color: '#737373',
      count: dashboardData.summary.criticalDeadlines
    },
    {
      key: 'tva' as const,
      label: 'TVA',
      shortLabel: 'TVA',
      icon: Receipt,
      color: '#4C34CE', // Violet OKÉ
      count: dashboardData.groups.tva.pendingCount
    },
    {
      key: 'liasse' as const,
      label: 'Liasse fiscale',
      shortLabel: 'Liasse',
      icon: FileText,
      color: '#182752', // Bleu marine
      count: dashboardData.groups.liasse.pendingCount
    },
    {
      key: 'other' as const,
      label: 'Autres déclarations',
      shortLabel: 'Autres',
      icon: CreditCard,
      color: '#FAA016', // Orange OKÉ
      count: dashboardData.groups.other.pendingCount
    },
    {
      key: 'personal' as const,
      label: 'Personnel dirigeant',
      shortLabel: 'Personnel',
      icon: User,
      color: '#512952', // Prune
      count: dashboardData.groups.personal.pendingCount
    }
  ];

  return (
    <div className="w-full">
      {/* Navigation desktop */}
      <div className="hidden lg:flex bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeGroup === tab.key;
          
          return (
            <motion.button
              key={tab.key}
              onClick={() => onGroupChange(tab.key)}
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                "flex-1 text-left",
                isActive && "text-white",
                !isActive && "text-neutral-400 hover:text-neutral-200"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background actif */}
              {isActive && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 rounded-xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${tab.color}, ${tab.color}dd)` 
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Contenu */}
              <div className="relative z-10 flex items-center gap-3 w-full">
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm flex-1">
                  {tab.label}
                </span>
                
                {/* Badge count */}
                {tab.count > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      "flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold",
                      isActive 
                        ? "bg-white/20 text-white" 
                        : "bg-red-500/90 text-white"
                    )}
                  >
                    {tab.count}
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Navigation mobile (scroll horizontal) */}
      <div className="lg:hidden">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeGroup === tab.key;
            
            return (
              <motion.button
                key={tab.key}
                onClick={() => onGroupChange(tab.key)}
                className={cn(
                  "relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200",
                  "min-w-[80px] flex-shrink-0",
                  "backdrop-blur-sm border border-white/10",
                  isActive && "text-white bg-white/10",
                  !isActive && "text-neutral-400 hover:text-neutral-200 bg-white/5"
                )}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background actif mobile */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabBackgroundMobile"
                    className="absolute inset-0 rounded-xl"
                    style={{ 
                      background: `linear-gradient(135deg, ${tab.color}40, ${tab.color}20)` 
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <div className="relative">
                    <Icon className="w-6 h-6" />
                    
                    {/* Badge count mobile */}
                    {tab.count > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 rounded-full text-xs font-semibold text-white"
                      >
                        {tab.count}
                      </motion.div>
                    )}
                  </div>
                  
                  <span className="text-xs font-medium text-center leading-tight">
                    {tab.shortLabel}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}