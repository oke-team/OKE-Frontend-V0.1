'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Info } from 'lucide-react';

interface TooltipProps {
  content: string | React.ReactNode;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  showIcon?: boolean;
  iconType?: 'help' | 'info';
  className?: string;
  maxWidth?: string;
}

export default function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  showIcon = false,
  iconType = 'help',
  className = '',
  maxWidth = '250px'
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;

        let x = 0;
        let y = 0;

        switch (position) {
          case 'top':
            x = rect.left + rect.width / 2 + scrollX;
            y = rect.top + scrollY - 8;
            break;
          case 'bottom':
            x = rect.left + rect.width / 2 + scrollX;
            y = rect.bottom + scrollY + 8;
            break;
          case 'left':
            x = rect.left + scrollX - 8;
            y = rect.top + rect.height / 2 + scrollY;
            break;
          case 'right':
            x = rect.right + scrollX + 8;
            y = rect.top + rect.height / 2 + scrollY;
            break;
        }

        setTooltipPosition({ x, y });
        setIsVisible(true);
      }
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return {
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: 'translate(-50%, -100%)'
        };
      case 'bottom':
        return {
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: 'translate(-50%, 0)'
        };
      case 'left':
        return {
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: 'translate(-100%, -50%)'
        };
      case 'right':
        return {
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: 'translate(0, -50%)'
        };
    }
  };

  const Icon = iconType === 'help' ? HelpCircle : Info;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`inline-flex items-center ${className}`}
        style={{ cursor: showIcon ? 'help' : 'inherit' }}
      >
        {showIcon && !children ? (
          <Icon className="w-4 h-4 text-neutral-400 hover:text-neutral-600" />
        ) : (
          children
        )}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              ...getPositionStyles(),
              maxWidth,
              zIndex: 9999,
              pointerEvents: 'none'
            }}
            className="px-3 py-2 text-sm text-white bg-neutral-900 dark:bg-neutral-700 rounded-lg shadow-lg"
          >
            {content}
            
            {/* Arrow pointer */}
            <div
              className={`absolute w-2 h-2 bg-neutral-900 dark:bg-neutral-700 rotate-45 ${
                position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' :
                position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' :
                position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' :
                'left-[-4px] top-1/2 -translate-y-1/2'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hook pour l'aide contextuelle basée sur le mode expert
export function useContextualHelp() {
  const [expertMode, setExpertMode] = useState(false);
  
  useEffect(() => {
    const stored = localStorage.getItem('expertMode');
    setExpertMode(stored === 'true');
  }, []);

  const getHelp = (concept: string): string | null => {
    if (expertMode) return null;
    
    const helpTexts: Record<string, string> = {
      'balance': 'La balance affiche le solde de tous vos comptes. C\'est une vue d\'ensemble de votre situation financière.',
      'grand_livre': 'Le grand livre liste toutes vos transactions triées par compte. C\'est l\'historique complet de vos mouvements.',
      'rapprochement': 'Le rapprochement consiste à vérifier que chaque transaction bancaire correspond bien à une facture ou dépense.',
      'lettrage': 'Le lettrage permet de marquer qu\'une facture a été payée en la liant au paiement reçu.',
      'debit_credit': 'Le débit représente ce qui sort (dépenses), le crédit ce qui entre (revenus).',
      'piece': 'Le numéro de pièce est un identifiant unique pour chaque transaction.',
      'journal': 'Le journal est le registre où sont enregistrées chronologiquement toutes vos opérations.',
      'compte_401': 'Ce compte représente les factures que vous devez payer à vos fournisseurs.',
      'compte_411': 'Ce compte représente les factures que vos clients doivent vous payer.',
      'compte_512': 'Ce compte représente votre argent en banque.',
      'compte_701': 'Ce compte représente vos ventes de produits ou services.'
    };
    
    return helpTexts[concept] || null;
  };
  
  return { getHelp, shouldShowHelp: !expertMode };
}