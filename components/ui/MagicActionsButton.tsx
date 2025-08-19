'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wand2, 
  Plus, 
  Camera, 
  FileText, 
  Receipt, 
  Users, 
  Package,
  TrendingUp,
  ShoppingCart,
  Calculator,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MagicAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  shortcut?: string;
  onClick: () => void;
}

interface MagicActionsButtonProps {
  currentModule?: string;
  className?: string;
}

/**
 * Bouton d'actions magiques contextuel
 * S'adapte automatiquement selon le module actif
 */
export default function MagicActionsButton({ 
  currentModule = 'dashboard',
  className 
}: MagicActionsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Actions contextuelles selon le module
  const getContextualActions = (): MagicAction[] => {
    const baseActions: MagicAction[] = [
      {
        id: 'quick-add',
        label: 'Création rapide',
        icon: Plus,
        shortcut: 'Cmd+N',
        onClick: () => console.log('Quick add')
      },
      {
        id: 'scan',
        label: 'Scanner document',
        icon: Camera,
        shortcut: 'Cmd+S',
        onClick: () => console.log('Scan document')
      }
    ];

    // Actions spécifiques par module
    const moduleActions: Record<string, MagicAction[]> = {
      dashboard: [
        ...baseActions,
        {
          id: 'ai-insights',
          label: 'Insights IA',
          icon: Sparkles,
          onClick: () => console.log('AI Insights')
        }
      ],
      bank: [
        ...baseActions,
        {
          id: 'new-transaction',
          label: 'Nouveau virement',
          icon: TrendingUp,
          onClick: () => console.log('New transaction')
        }
      ],
      purchases: [
        {
          id: 'new-purchase',
          label: 'Nouvelle facture achat',
          icon: ShoppingCart,
          shortcut: 'Cmd+P',
          onClick: () => console.log('New purchase')
        },
        {
          id: 'scan-invoice',
          label: 'Scanner facture',
          icon: Camera,
          onClick: () => console.log('Scan invoice')
        },
        {
          id: 'import-invoices',
          label: 'Importer factures',
          icon: FileText,
          onClick: () => console.log('Import invoices')
        }
      ],
      sales: [
        {
          id: 'new-invoice',
          label: 'Nouvelle facture',
          icon: Receipt,
          shortcut: 'Cmd+I',
          onClick: () => console.log('New invoice')
        },
        {
          id: 'new-quote',
          label: 'Nouveau devis',
          icon: FileText,
          shortcut: 'Cmd+Q',
          onClick: () => console.log('New quote')
        },
        {
          id: 'new-customer',
          label: 'Nouveau client',
          icon: Users,
          onClick: () => console.log('New customer')
        }
      ],
      stocks: [
        {
          id: 'new-product',
          label: 'Nouveau produit',
          icon: Package,
          onClick: () => console.log('New product')
        },
        {
          id: 'inventory',
          label: 'Inventaire',
          icon: Calculator,
          onClick: () => console.log('Inventory')
        }
      ],
      accounting: [
        {
          id: 'new-entry',
          label: 'Nouvelle écriture',
          icon: Calculator,
          onClick: () => console.log('New entry')
        },
        {
          id: 'reconcile',
          label: 'Rapprochement',
          icon: FileText,
          onClick: () => console.log('Reconcile')
        }
      ]
    };

    return moduleActions[currentModule] || baseActions;
  };

  const actions = getContextualActions();

  return (
    <div className="relative">
      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg",
          "bg-gradient-to-r from-secondary to-pink-500",
          "text-white hover:shadow-glow transition-all duration-200",
          "group",
          className
        )}
      >
        <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        <span className="text-sm font-medium">Actions</span>
      </button>

      {/* Menu d'actions */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute top-full mt-2 right-0 z-50",
                "w-64 p-2",
                "bg-white dark:bg-neutral-900",
                "rounded-xl shadow-2xl",
                "border border-neutral-200 dark:border-neutral-800",
                "backdrop-blur-xl"
              )}
            >
              <div className="text-xs font-medium text-neutral-500 px-2 py-1 mb-1">
                Actions rapides
              </div>

              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => {
                      action.onClick();
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between",
                      "px-3 py-2 rounded-lg",
                      "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                      "transition-colors group"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium">{action.label}</span>
                    </div>
                    {action.shortcut && (
                      <span className="text-xs text-neutral-400 font-mono">
                        {action.shortcut}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Séparateur */}
              <div className="border-t border-neutral-200 dark:border-neutral-800 my-2" />

              {/* Action IA */}
              <button
                onClick={() => {
                  console.log('AI Assistant');
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3",
                  "px-3 py-2 rounded-lg",
                  "bg-gradient-to-r from-secondary/10 to-pink-500/10",
                  "hover:from-secondary/20 hover:to-pink-500/20",
                  "transition-colors group"
                )}
              >
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  Demander à l&apos;IA
                </span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}