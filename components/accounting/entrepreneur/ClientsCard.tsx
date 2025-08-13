'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingUp, TrendingDown, Clock, ArrowRight, MoreVertical, Download, FileText, TrendingUp as Analytics } from 'lucide-react';
import { StandardCard } from '@/components/ui/CardBase';
import { cn } from '@/lib/utils';

interface ClientsCardProps {
  totalAmount: number;
  overdueAmount: number;
  averageDays: number;
  trend: 'up' | 'down' | 'stable';
  onClick?: () => void;
  loading?: boolean;
}

export const ClientsCard: React.FC<ClientsCardProps> = ({
  totalAmount,
  overdueAmount,
  averageDays,
  trend,
  onClick,
  loading = false,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const longPressTimer = useRef<NodeJS.Timeout>();
  const cardRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Gestion du long press
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setMenuPosition({ x: touch.clientX, y: touch.clientY });
    
    longPressTimer.current = setTimeout(() => {
      setShowMenu(true);
      // Vibration légère si supportée
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Support desktop pour le test
    if (e.button === 2) return; // Ignore right click
    setMenuPosition({ x: e.clientX, y: e.clientY });
    
    longPressTimer.current = setTimeout(() => {
      setShowMenu(true);
    }, 500);
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleMenuAction = (action: string) => {
    console.log(`Action: ${action}`);
    setShowMenu(false);
    
    // Actions selon le type
    if (action === 'export') {
      // Export logic
      alert('Export des données clients...');
    } else if (action === 'report') {
      // Report logic
      alert('Génération du rapport clients...');
    } else if (action === 'analyze') {
      // Analyze logic
      alert('Analyse des tendances clients...');
    }
  };

  const header = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
          <Users className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Clients
        </h3>
      </div>
      {overdueAmount > 0 && (
        <span className="px-2 py-0.5 text-xs bg-orange-500/10 text-orange-600 rounded-full">
          Retards
        </span>
      )}
    </div>
  );

  const footer = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-xs text-neutral-500">
        <Clock className="w-3 h-3" />
        <span>{averageDays}j moy.</span>
      </div>
      <button className="flex items-center gap-1 text-xs text-green-600 font-medium hover:text-green-700">
        <span>Détail</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );

  return (
    <>
      <div
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <StandardCard
          accentColor="green"
          interactive
          onClick={onClick}
          loading={loading}
          header={header}
          footer={footer}
        >
          <div className="space-y-3">
        <div>
          <motion.div 
            className="text-2xl font-bold text-neutral-900 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {formatCurrency(totalAmount)}
          </motion.div>
          
          <div className="flex items-center gap-1 mt-1">
            {trend === 'up' ? (
              <TrendingUp className="w-3 h-3 text-green-500" />
            ) : trend === 'down' ? (
              <TrendingDown className="w-3 h-3 text-red-500" />
            ) : null}
            <span className={cn(
              "text-xs font-medium",
              trend === 'up' && "text-green-600",
              trend === 'down' && "text-red-600",
              trend === 'stable' && "text-neutral-600"
            )}>
              {trend === 'stable' ? 'Stable' : trend === 'up' ? 'En hausse' : 'En baisse'}
            </span>
          </div>
        </div>

        {overdueAmount > 0 && (
          <div className="p-2 bg-orange-500/5 rounded-lg border border-orange-500/10">
            <div className="text-xs text-orange-600 font-medium">
              {formatCurrency(overdueAmount)} en retard
            </div>
          </div>
        )}
      </div>
        </StandardCard>
      </div>

      {/* Menu contextuel discret */}
      <AnimatePresence>
        {showMenu && (
          <>
            {/* Overlay pour fermer le menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="fixed z-50 bg-white rounded-xl shadow-xl border border-gray-200/50 overflow-hidden"
              style={{
                left: menuPosition.x,
                top: menuPosition.y,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="p-1">
                <button
                  onClick={() => handleMenuAction('export')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Download size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-700">Exporter</span>
                </button>
                
                <button
                  onClick={() => handleMenuAction('report')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <FileText size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-700">Rapport détaillé</span>
                </button>
                
                <button
                  onClick={() => handleMenuAction('analyze')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Analytics size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-700">Analyser</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};