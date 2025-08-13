'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calculator, 
  Users, 
  FileText, 
  PieChart,
  Settings,
  Building2,
  CreditCard,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';

interface NavigationTabsProps {
  activeModule?: string;
  layout?: 'horizontal' | 'vertical' | 'vertical-compact';
  onNavigate?: (moduleId: string) => void;
  showInSearch?: boolean;
  className?: string;
}

interface NavigationModule {
  id: string;
  label: string;
  shortLabel?: string;
  icon: React.ElementType;
  href: string;
  color: string;
  description?: string;
}

/**
 * NavigationTabs - Navigation intelligente remplaçant le menu hamburger
 * 
 * Caractéristiques :
 * - Layout adaptatif (horizontal, vertical, compact)
 * - Animations fluides entre les onglets
 * - Indicateur d'état actif avec ring gradient
 * - Support keyboard navigation
 * - Couleurs thématiques par module
 * - Mode recherche intégré
 */
const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeModule = 'dashboard',
  layout = 'horizontal',
  onNavigate,
  showInSearch = false,
  className = ''
}) => {
  // Configuration des modules
  const modules: NavigationModule[] = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      shortLabel: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      color: 'from-blue-500 to-cyan-600',
      description: 'Vue d\'ensemble de votre activité'
    },
    {
      id: 'accounting',
      label: 'Comptabilité',
      shortLabel: 'Compta',
      icon: Calculator,
      href: '/accounting',
      color: 'from-emerald-500 to-teal-600',
      description: 'Gestion comptable complète'
    },
    {
      id: 'clients',
      label: 'Clients',
      shortLabel: 'Clients',
      icon: Users,
      href: '/clients',
      color: 'from-purple-500 to-indigo-600',
      description: 'Gestion de votre portefeuille client'
    },
    {
      id: 'invoicing',
      label: 'Facturation',
      shortLabel: 'Factures',
      icon: FileText,
      href: '/invoicing',
      color: 'from-orange-500 to-red-600',
      description: 'Création et suivi des factures'
    },
    {
      id: 'reports',
      label: 'Rapports',
      shortLabel: 'Rapports',
      icon: PieChart,
      href: '/reports',
      color: 'from-pink-500 to-rose-600',
      description: 'Analyses et reporting avancé'
    },
    {
      id: 'treasury',
      label: 'Trésorerie',
      shortLabel: 'Tréso',
      icon: CreditCard,
      href: '/treasury',
      color: 'from-violet-500 to-purple-600',
      description: 'Suivi de vos flux financiers'
    }
  ];

  const handleTabClick = (moduleId: string, href: string) => {
    onNavigate?.(moduleId);
    // Note: Dans un vrai contexte, on utiliserait un router
    console.log(`Navigation to: ${href}`);
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'vertical':
        return 'flex flex-col gap-2';
      case 'vertical-compact':
        return 'flex flex-col gap-1';
      case 'horizontal':
      default:
        return 'flex items-center gap-1';
    }
  };

  const getTabClasses = (isActive: boolean, module: NavigationModule) => {
    const base = 'relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 group';
    
    if (layout === 'vertical-compact') {
      return `${base} text-sm ${isActive 
        ? 'bg-white/80 text-slate-900 shadow-sm' 
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
      }`;
    }
    
    if (layout === 'vertical') {
      return `${base} ${isActive 
        ? `bg-gradient-to-r ${module.color} text-white shadow-lg shadow-current/20` 
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
      }`;
    }

    // Horizontal layout
    return `${base} ${isActive 
      ? 'text-slate-900 bg-white/60 shadow-sm ring-1 ring-slate-900/5' 
      : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
    }`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: layout === 'horizontal' ? -10 : 0, x: layout === 'horizontal' ? 0 : -10 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    }
  };

  const activeIndicatorVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    exit: { scale: 0, opacity: 0 }
  };

  return (
    <motion.nav
      className={`${getLayoutClasses()} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="navigation"
      aria-label="Navigation principale"
    >
      {modules.map((module) => {
        const isActive = activeModule === module.id;
        const Icon = module.icon;

        return (
          <motion.div
            key={module.id}
            variants={itemVariants}
            className="relative"
          >
            <button
              onClick={() => handleTabClick(module.id, module.href)}
              className={getTabClasses(isActive, module)}
              aria-current={isActive ? 'page' : undefined}
              title={module.description}
            >
              {/* Active indicator background */}
              {isActive && layout === 'horizontal' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/60 rounded-lg shadow-sm ring-1 ring-slate-900/5"
                  variants={activeIndicatorVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                />
              )}

              {/* Content */}
              <div className="relative flex items-center gap-2 z-10">
                <Icon 
                  size={layout === 'vertical-compact' ? 16 : 18} 
                  className={`
                    transition-colors duration-200
                    ${isActive && layout !== 'vertical' ? 'text-current' : 'text-current opacity-80 group-hover:opacity-100'}
                  `} 
                />
                
                <span className={`
                  font-medium transition-all duration-200
                  ${layout === 'vertical-compact' ? 'text-sm' : 'text-sm'}
                  ${layout === 'horizontal' && !showInSearch ? 'hidden lg:inline' : ''}
                `}>
                  {layout === 'horizontal' && !showInSearch ? module.shortLabel : module.label}
                </span>

                {/* Show description in search mode */}
                {showInSearch && module.description && (
                  <span className="text-xs text-slate-500 ml-auto">
                    {module.description}
                  </span>
                )}
              </div>

              {/* Hover effect */}
              {!isActive && (
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* Active ring effect for vertical layouts */}
              {isActive && layout !== 'horizontal' && (
                <motion.div
                  className="absolute inset-0 rounded-lg ring-2 ring-white/20"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>

            {/* Notification badge (exemple) */}
            {module.id === 'invoicing' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                title="Nouvelles factures en attente"
              />
            )}
          </motion.div>
        );
      })}

      {/* Settings tab (always at the end for desktop) */}
      {layout === 'horizontal' && (
        <motion.div variants={itemVariants} className="ml-2">
          <button
            onClick={() => handleTabClick('settings', '/settings')}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-white/40 transition-all duration-200"
            title="Paramètres de l'application"
            aria-label="Paramètres"
          >
            <Settings size={16} />
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default NavigationTabs;