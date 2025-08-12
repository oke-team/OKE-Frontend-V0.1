'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, ChevronLeft, Filter, Download, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DrillDownViewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  cardType: string;
  children: React.ReactNode;
  accentColor?: 'violet' | 'green' | 'red' | 'blue' | 'orange';
}

export const DrillDownView: React.FC<DrillDownViewProps> = ({
  isOpen,
  onClose,
  title,
  cardType,
  children,
  accentColor = 'violet',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Gérer le verrouillage du scroll sur le body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Gestion du swipe pour fermer sur mobile
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onClose();
    }
  };

  const accentStyles = {
    violet: 'from-violet-500 to-purple-600',
    green: 'from-green-500 to-emerald-600',
    red: 'from-red-500 to-rose-600',
    blue: 'from-blue-500 to-cyan-600',
    orange: 'from-orange-500 to-amber-600',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel principal */}
          <motion.div
            className={cn(
              "fixed inset-y-0 right-0 w-full md:w-[500px] lg:w-[600px]",
              "bg-white dark:bg-neutral-900 shadow-2xl z-50",
              "overflow-hidden flex flex-col"
            )}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {/* Header avec gradient */}
            <div className={cn(
              "relative bg-gradient-to-r p-6 text-white",
              accentStyles[accentColor]
            )}>
              {/* Boutons de navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  aria-label="Retour"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label="Filtres"
                  >
                    <Filter className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label="Exporter"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors md:hidden"
                    aria-label="Fermer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Titre */}
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-white/80 text-sm mt-1">Détail {cardType}</p>

              {/* Barre de recherche */}
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg 
                           text-white placeholder-white/60 focus:bg-white/30 focus:outline-none 
                           focus:border-white/50 transition-all"
                />
              </div>
            </div>

            {/* Zone de filtres (collapsible) */}
            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  className="px-6 py-4 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <select className="px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm">
                      <option>Toutes les périodes</option>
                      <option>Ce mois</option>
                      <option>3 derniers mois</option>
                      <option>Cette année</option>
                    </select>
                    <select className="px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm">
                      <option>Tous les statuts</option>
                      <option>En cours</option>
                      <option>Validé</option>
                      <option>En attente</option>
                    </select>
                    <select className="px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm">
                      <option>Tous les montants</option>
                      <option>&lt; 1000€</option>
                      <option>1000€ - 5000€</option>
                      <option>&gt; 5000€</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contenu scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {children}
              </div>
            </div>

            {/* Footer avec actions */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">
                  Dernière mise à jour: il y a 2 min
                </span>
                <button
                  className={cn(
                    "px-4 py-2 rounded-lg bg-gradient-to-r text-white font-medium text-sm",
                    "hover:shadow-lg transition-all duration-300",
                    accentStyles[accentColor]
                  )}
                >
                  Actualiser
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};