'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, RotateCcw, ArrowUp, Edit3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mobileNavItems, tabletNavItems, desktopNavItems } from '@/lib/modules-config';
import { useOptimizedAnimations } from '@/lib/performance-utils';
import { useDashboardDoubleClick } from '@/lib/hooks/useDashboardDoubleClick';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  category?: string;
  isPrimary?: boolean;
  isMore?: boolean;
  isNavigation?: boolean;
  isPlaceholder?: boolean;
  badgeCount?: number;
}

interface UnifiedNavigationProps {
  activeItem?: string;
  onItemSelect?: (itemId: string) => void;
  className?: string;
  // Props de pagination
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

// Conversion des modules en NavItems
const convertToNavItems = (modules: any[]): NavItem[] => {
  return modules.map(module => ({
    id: module.id,
    label: module.label,
    icon: module.icon,
    href: module.href,
    category: module.category,
    isPrimary: (module as any).isPrimary || false,
    isMore: (module as any).isMore || false,
    badgeCount: module.badge,
    isNavigation: (module as any).isNavigation,
    isPlaceholder: (module as any).isPlaceholder
  }));
};

// Composant pour chaque item de navigation
function NavItemComponent({ 
  item, 
  isActive, 
  screenSize, 
  onSelect,
  isCompact = false
}: {
  item: NavItem;
  isActive: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
  onSelect: (id: string) => void;
  isCompact?: boolean;
}) {
  const Icon = item.icon;
  const isMobile = screenSize === 'mobile';
  const { handleDashboardClick, isDashboardCabinet } = useDashboardDoubleClick();
  
  // Bouton primaire (bouton +)
  if (item.isPrimary) {
    return (
      <motion.button
        onClick={() => onSelect(item.id)}
        className={cn(
          "flex items-center justify-center",
          isMobile ? "w-14 h-14" : "w-11 h-11",
          "rounded-2xl transition-all duration-300",
          "hover:shadow-xl hover:shadow-purple-500/60 hover:scale-110 active:scale-95"
        )}
        style={{
          background: '#4C34CE',
          boxShadow: '0 8px 20px -5px rgba(76, 52, 206, 0.4)',
          border: '1px solid rgba(76, 52, 206, 0.2)'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-70" />
        <div className="relative z-10">
          <Icon size={isMobile ? 22 : 16} className="text-white drop-shadow-lg" />
        </div>
      </motion.button>
    );
  }

  // Gestion du clic - dashboard avec double-clic ou navigation normale
  const handleClick = () => {
    if (item.id === 'dashboard') {
      handleDashboardClick();
    } else {
      onSelect(item.id);
    }
  };

  // Item de navigation standard
  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center justify-center gap-0.5",
        isMobile ? "min-h-[54px] py-2 w-[72px]" : "min-h-[48px] px-2 py-1.5",
        "rounded-xl transition-all duration-300",
        "hover:bg-white/10 active:bg-white/15 hover:backdrop-blur-sm",
        isMobile ? "" : "min-w-[65px]"
      )}
      whileHover={screenSize === 'desktop' ? { y: -2 } : undefined}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        animate={{ 
          scale: isActive ? 1.1 : 1,
          y: isActive && isMobile ? -2 : 0
        }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <Icon 
          size={isMobile ? 20 : 18} 
          className={cn(
            isActive ? "text-[#4C34CE]" : "text-neutral-600 dark:text-neutral-400",
            "transition-colors duration-200"
          )}
        />
        {/* Indicateur cabinet pour le dashboard */}
        {item.id === 'dashboard' && isDashboardCabinet && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FAA016] rounded-full border border-white" 
               title="Mode Cabinet" />
        )}
      </motion.div>
      
      {item.label && !isCompact && (
        <motion.span 
          className={cn(
            isMobile ? "text-[10px]" : "text-[10px]",
            "font-medium transition-colors duration-200 truncate max-w-[65px]",
            isActive ? "text-[#4C34CE] font-semibold" : "text-neutral-600 dark:text-neutral-500"
          )}
        >
          {item.id === 'dashboard' && isDashboardCabinet ? 'Cabinet' : 
           (item.label.length > 9 && isMobile ? `${item.label.slice(0, 7)}...` : item.label)}
        </motion.span>
      )}
    </motion.button>
  );
}

// Composant de navigation contextuelle (pagination)
function ContextualNavigation({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  onRefresh,
  onScrollToTop,
  screenSize
}: {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onRefresh?: () => void;
  onScrollToTop?: () => void;
  screenSize: 'mobile' | 'tablet' | 'desktop';
}) {
  const isMobile = screenSize === 'mobile';
  const hasPagination = currentPage && totalPages && totalItems && onPageChange;

  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-1",
      isMobile ? "min-h-[54px] py-2 w-[72px]" : "min-h-[48px] px-2 py-1.5",
      "rounded-xl",
      isMobile ? "" : "min-w-[65px]"
    )}>
      {hasPagination ? (
        // Mode pagination avec flèches stylisées
        <div className="flex items-center gap-1.5">
          {/* Bouton début (<<) - visible si plus de 2 pages et pas sur première page */}
          {totalPages > 2 && currentPage > 1 && (
            <motion.button
              onClick={() => onPageChange(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 rounded-lg bg-[#4C34CE]/10 hover:bg-[#4C34CE]/20 transition-all duration-200"
              title="Première page"
            >
              <ChevronsLeft size={isMobile ? 16 : 14} className="text-[#4C34CE]" strokeWidth={2.5} />
            </motion.button>
          )}

          {/* Bouton précédent (<) */}
          <motion.button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-lg bg-[#4C34CE]/10 hover:bg-[#4C34CE]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft size={isMobile ? 20 : 18} className="text-[#4C34CE] font-bold" strokeWidth={2.5} />
          </motion.button>

          {/* Bouton suivant (>) */}
          <motion.button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-lg bg-[#4C34CE]/10 hover:bg-[#4C34CE]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronRight size={isMobile ? 20 : 18} className="text-[#4C34CE] font-bold" strokeWidth={2.5} />
          </motion.button>

          {/* Bouton fin (>>) - visible si plus de 2 pages et pas sur dernière page */}
          {totalPages > 2 && currentPage < totalPages && (
            <motion.button
              onClick={() => onPageChange(totalPages)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 rounded-lg bg-[#4C34CE]/10 hover:bg-[#4C34CE]/20 transition-all duration-200"
              title="Dernière page"
            >
              <ChevronsRight size={isMobile ? 16 : 14} className="text-[#4C34CE]" strokeWidth={2.5} />
            </motion.button>
          )}
        </div>
      ) : (
        // Mode navigation générale
        <div className="flex items-center gap-1">
          {onScrollToTop && (
            <motion.button
              onClick={onScrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-0.5 rounded hover:bg-white/20 transition-all duration-200"
              title="Retour en haut"
            >
              <ArrowUp size={isMobile ? 14 : 12} className="text-neutral-600" />
            </motion.button>
          )}

          {onRefresh && (
            <motion.button
              onClick={onRefresh}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-0.5 rounded hover:bg-white/20 transition-all duration-200"
              title="Actualiser"
            >
              <RotateCcw size={isMobile ? 14 : 12} className="text-neutral-600" />
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}

export default function UnifiedNavigation({ 
  activeItem = 'dashboard', 
  onItemSelect,
  className,
  currentPage,
  totalPages,
  totalItems,
  onPageChange
}: UnifiedNavigationProps) {
  const [localActiveItem, setLocalActiveItem] = useState(
    activeItem?.startsWith('add-') ? 'dashboard' : activeItem
  );
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isPageInputOpen, setIsPageInputOpen] = useState(false);
  const [pageInputValue, setPageInputValue] = useState('');
  const animationSettings = useOptimizedAnimations();
  
  // Synchroniser avec la prop activeItem
  useEffect(() => {
    if (activeItem && !activeItem.startsWith('add-')) {
      setLocalActiveItem(activeItem);
    }
  }, [activeItem]);

  // Détection de la taille d'écran - Breakpoints ajustés
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1200) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleItemSelect = (itemId: string) => {
    if (!itemId.startsWith('add-')) {
      setLocalActiveItem(itemId);
    }
    onItemSelect?.(itemId);
  };

  // Gestion de l'input de page
  const handlePageInputOpen = () => {
    if (currentPage && totalPages) {
      setPageInputValue(currentPage.toString());
      setIsPageInputOpen(true);
    }
  };

  const handlePageInputSubmit = () => {
    const pageNumber = parseInt(pageInputValue, 10);
    if (pageNumber >= 1 && pageNumber <= (totalPages || 1) && onPageChange) {
      onPageChange(pageNumber);
    }
    setIsPageInputOpen(false);
    setPageInputValue('');
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePageInputSubmit();
    } else if (e.key === 'Escape') {
      setIsPageInputOpen(false);
      setPageInputValue('');
    }
  };

  const handlePageInputBlur = () => {
    setIsPageInputOpen(false);
    setPageInputValue('');
  };

  // Sélection des items selon la taille d'écran
  const getNavItems = () => {
    switch (screenSize) {
      case 'mobile':
        return convertToNavItems(mobileNavItems);
      case 'tablet':
        return convertToNavItems(tabletNavItems);
      case 'desktop':
        return convertToNavItems(desktopNavItems);
      default:
        return convertToNavItems(desktopNavItems);
    }
  };

  const navItems = getNavItems();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation du conteneur
  const containerVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, opacity: 1,
      transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.05 }
    }
  };

  return (
    <motion.nav
      className={cn(
        "fixed z-50",
        screenSize === 'mobile' 
          ? "bottom-[env(safe-area-inset-bottom,20px)] left-4 right-4" 
          : "bottom-6 left-1/2 -translate-x-1/2",
        "flex items-center justify-center",
        screenSize === 'mobile' ? "px-3 py-3.5" : "px-3 py-2.5",
        "rounded-2xl backdrop-blur-2xl shadow-2xl",
        className
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(251, 207, 232, 0.15) 50%, rgba(255, 255, 255, 0.85) 100%)',
        border: '2px solid #FAA016',
        boxShadow: '0 20px 40px -10px rgba(250, 160, 22, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)'
      }}
      variants={containerVariants}
      initial={mounted ? "hidden" : "visible"}
      animate="visible"
    >
      {/* Effet Liquid Glass */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-blue-100/10 to-transparent opacity-60" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-blue-100/5 to-white/10" />
      
      {/* Contenu */}
      <div className={cn(
        "relative flex items-center",
        screenSize === 'mobile' ? "gap-2 justify-around w-full" : "gap-1.5 justify-center"
      )}>
        {navItems.map((item) => {
          // Navigation contextuelle avec pastille
          if (item.isNavigation) {
            return (
              <div key={item.id} className="relative">
                <ContextualNavigation
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  onPageChange={onPageChange}
                  onRefresh={() => window.location.reload()}
                  onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  screenSize={screenSize}
                />
                {/* Pastille de page interactive à cheval sur la navbar */}
                {currentPage && totalPages && totalPages > 1 && (
                  <div className="absolute -top-6 -right-2 z-[100]">
                    <AnimatePresence mode="wait">
                      {isPageInputOpen ? (
                        // Mode input de page élégant avec glass effect - à cheval sur la bordure
                        <motion.div
                          initial={{ scale: 0.7, opacity: 0, y: 8 }}
                          animate={{ scale: 1, opacity: 1, y: 0 }}
                          exit={{ scale: 0.7, opacity: 0, y: 8 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className={cn(
                            "relative rounded-2xl px-3 py-2.5 flex items-center justify-center h-11",
                            // Largeur adaptative selon le nombre de pages
                            totalPages < 10 ? "min-w-16" :
                            totalPages < 100 ? "min-w-20" : "min-w-24"
                          )}
                          style={{
                            background: 'linear-gradient(135deg, rgba(76, 52, 206, 0.98) 0%, rgba(90, 66, 214, 0.98) 100%)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            boxShadow: '0 12px 40px rgba(76, 52, 206, 0.5), 0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                            border: '2px solid rgba(255, 255, 255, 0.25)'
                          }}
                        >
                          {/* Effet de brillance subtil */}
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-50" />
                          
                          <input
                            type="number"
                            value={pageInputValue}
                            onChange={(e) => setPageInputValue(e.target.value)}
                            onKeyDown={handlePageInputKeyDown}
                            onBlur={handlePageInputBlur}
                            className={cn(
                              "relative z-10 bg-transparent text-white font-semibold text-center w-full outline-none placeholder-white/60 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]",
                              // Taille de police adaptative
                              totalPages < 100 ? "text-sm" : "text-xs"
                            )}
                            placeholder={currentPage.toString()}
                            min={1}
                            max={totalPages}
                            autoFocus
                            style={{ 
                              fontSize: totalPages < 100 ? '14px' : '12px'
                            }}
                          />
                          
                          {/* Indicateur de page totale */}
                          <span className="relative z-10 text-white/70 text-xs ml-1">
                            /{totalPages}
                          </span>
                        </motion.div>
                      ) : (
                        // Mode affichage normal élégant - à cheval sur la bordure
                        <motion.button
                          initial={{ scale: 1, opacity: 1 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.7, opacity: 0 }}
                          onClick={handlePageInputOpen}
                          className={cn(
                            "relative overflow-hidden text-white font-semibold rounded-xl h-8 px-2 flex items-center justify-center transition-all duration-300 group",
                            // Taille de police et largeur adaptatives
                            totalPages < 10 ? "text-[11px] min-w-8" :
                            totalPages < 100 ? "text-[10px] min-w-10" :
                            "text-[9px] min-w-12"
                          )}
                          style={{
                            background: 'linear-gradient(135deg, rgba(76, 52, 206, 0.95) 0%, rgba(90, 66, 214, 0.95) 100%)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            boxShadow: '0 8px 24px rgba(76, 52, 206, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                            border: '1.5px solid rgba(255, 255, 255, 0.2)'
                          }}
                          whileHover={{ 
                            scale: 1.08,
                            boxShadow: '0 12px 32px rgba(76, 52, 206, 0.5), 0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.15)'
                          }}
                          whileTap={{ scale: 0.95 }}
                          title="Cliquer pour aller à une page"
                        >
                          {/* Effet de brillance animé au hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Contenu avec animation */}
                          <div className="relative z-10 flex items-center gap-0.5">
                            <span className="group-hover:scale-110 transition-transform duration-200">{currentPage}</span>
                            <span className="text-white/60">/</span>
                            <span className="text-white/80 group-hover:scale-110 transition-transform duration-200">{totalPages}</span>
                          </div>
                          
                          {/* Icône edit qui apparaît en overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-br from-white/10 to-transparent rounded-lg">
                            <Edit3 size={10} className="text-white drop-shadow-sm" />
                          </div>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            );
          }

          // Placeholders
          if (item.isPlaceholder) {
            return (
              <div
                key={item.id}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5",
                  screenSize === 'mobile' ? "min-h-[54px] py-2 w-[72px]" : "min-h-[48px] px-2 py-1.5",
                  "rounded-xl opacity-30 cursor-not-allowed",
                  screenSize === 'mobile' ? "" : "min-w-[65px]"
                )}
              >
                <item.icon size={screenSize === 'mobile' ? 20 : 18} className="text-neutral-400 opacity-50" />
                <span className={cn(
                  screenSize === 'mobile' ? "text-[10px]" : "text-[10px]",
                  "font-medium truncate max-w-[50px] text-neutral-400 opacity-50"
                )}>
                  {item.label.length > 9 && screenSize === 'mobile' ? `${item.label.slice(0, 7)}...` : item.label}
                </span>
              </div>
            );
          }

          // Items normaux
          return (
            <NavItemComponent
              key={item.id}
              item={item}
              isActive={!item.id.startsWith('add-') && localActiveItem === item.id}
              screenSize={screenSize}
              onSelect={handleItemSelect}
            />
          );
        })}
      </div>
    </motion.nav>
  );
}