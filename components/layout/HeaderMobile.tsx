'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  User,
  Settings,
  HelpCircle,
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useExpertMode } from '@/contexts/ExpertModeContext';
import { PeriodSelector, Period } from './PeriodSelector';
import { usePathname } from 'next/navigation';

interface HeaderMobileProps {
  onMenuClick?: () => void;
  className?: string;
}

export const HeaderMobile: React.FC<HeaderMobileProps> = ({ 
  onMenuClick,
  className 
}) => {
  const { expertMode, toggleExpertMode } = useExpertMode();
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const pathname = usePathname();
  
  // Vérifier si on est dans le module comptabilité
  const isAccountingModule = pathname?.includes('/accounting');

  // Données mockées pour les périodes
  const [currentPeriod, setCurrentPeriod] = useState<Period>({
    id: '2025',
    type: 'exercise',
    label: 'Exercice 2025',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-12-31'),
    isCurrent: true,
  });

  const periods: Period[] = [
    {
      id: '2025',
      type: 'exercise',
      label: 'Exercice 2025',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31'),
      isCurrent: true,
    },
    {
      id: '2024',
      type: 'exercise',
      label: 'Exercice 2024',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
    },
    {
      id: 'q4-2024',
      type: 'situation',
      label: 'Situation T4 2024',
      startDate: new Date('2024-10-01'),
      endDate: new Date('2024-12-31'),
    },
    {
      id: 'jan-2025',
      type: 'custom',
      label: 'Janvier 2025',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-31'),
    },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-40",
      "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl",
      "border-b border-neutral-200 dark:border-neutral-700",
      className
    )}>
      <div className="px-4 py-3">
        {/* Ligne principale */}
        <div className="flex items-center justify-between gap-2">
          {/* Gauche : Menu + Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Oké
              </div>
            </div>
          </div>

          {/* Centre : Sélecteur de période (si comptabilité) */}
          {isAccountingModule && (
            <div className="flex-1 flex justify-center">
              <PeriodSelector
                currentPeriod={currentPeriod}
                periods={periods}
                onPeriodChange={setCurrentPeriod}
                compact={true}
              />
            </div>
          )}

          {/* Droite : Expert mode + Actions */}
          <div className="flex items-center gap-2">
            {/* Toggle Expert compact */}
            <button
              onClick={toggleExpertMode}
              className={cn(
                "relative flex items-center gap-1.5 px-2 py-1.5 rounded-full transition-all",
                expertMode 
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              )}
            >
              {expertMode ? (
                <>
                  <Sparkles className="w-3 h-3" />
                  <span className="text-xs font-medium hidden sm:inline">PRO</span>
                </>
              ) : (
                <span className="text-xs font-medium px-1">OFF</span>
              )}
            </button>

            {/* Company selector compact */}
            <button
              onClick={() => setShowCompanyMenu(!showCompanyMenu)}
              className="flex items-center gap-1 px-2 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-lg"
            >
              <span className="text-xs font-medium hidden sm:inline">TechCorp</span>
              <span className="text-xs font-medium sm:hidden">TC</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* User menu */}
            <button className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
              <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                JD
              </div>
            </button>
          </div>
        </div>

        {/* Ligne secondaire : Breadcrumb ou info contextuelle (si nécessaire) */}
        {pathname && pathname !== '/' && (
          <div className="mt-2 text-xs text-neutral-500 truncate">
            {pathname.split('/').filter(Boolean).map((segment, index, array) => (
              <span key={index}>
                {index > 0 && ' / '}
                <span className={index === array.length - 1 ? 'text-neutral-700 dark:text-neutral-300' : ''}>
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Company menu dropdown */}
      {showCompanyMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full right-4 mt-2 w-64 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-2"
        >
          <button className="w-full px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
            <div className="font-medium">TechCorp SAS</div>
            <div className="text-xs text-neutral-500">Société active</div>
          </button>
          <button className="w-full px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
            <div className="font-medium">StartUp Inc</div>
            <div className="text-xs text-neutral-500">Société test</div>
          </button>
          <hr className="my-2 border-neutral-200 dark:border-neutral-700" />
          <button className="w-full px-3 py-2 text-left text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg text-sm">
            + Ajouter une société
          </button>
        </motion.div>
      )}
    </header>
  );
};