"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItem, BottomNavProps } from './types';
import { useOptimizedAnimations } from '@/lib/performance-utils';
import { mobileNavItems, tabletNavItems, desktopNavItems } from '@/lib/modules-config';

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
    badgeCount: module.badge
  }));
};

// Configuration des items de navigation
const mobileNavigationItems: NavItem[] = convertToNavItems(mobileNavItems);
const desktopNavigationItems: NavItem[] = convertToNavItems(desktopNavItems);

// Composant NavItem individuel
const NavItemComponent: React.FC<{
  item: NavItem;
  isActive: boolean;
  isMobile: boolean;
  onSelect: (id: string) => void;
}> = ({ item, isActive, isMobile, onSelect }) => {
  const Icon = item.icon;
  
  // Protection absolue : le bouton + n'est jamais actif
  const isReallyActive = item.id.startsWith('add-') ? false : isActive;
  
  const itemVariants = {
    inactive: { 
      scale: 1, 
      y: 0
    },
    active: { 
      scale: 1,
      y: 0
    },
    hover: { 
      scale: 1.02,
      y: 0
    }
  };

  const iconVariants = {
    inactive: { 
      rotate: 0, 
      scale: 1 
    },
    active: { 
      rotate: item.isPrimary ? 45 : 0,
      scale: item.isPrimary ? 1.1 : 1.05
    },
    hover: { 
      rotate: item.isPrimary ? 15 : 0,
      scale: 1.02
    }
  };

  if (item.isPrimary) {
    // Bouton primaire central avec effet spécial
    return (
      <motion.button
        onClick={() => onSelect(item.id)}
        className={cn(
          "flex items-center justify-center",
          isMobile ? "w-14 h-14" : "w-11 h-11",
          "rounded-2xl",
          "transition-all duration-300",
          "hover:shadow-xl hover:shadow-purple-500/60 hover:scale-110",
          "active:scale-95"
        )}
        style={{
          background: '#4C34CE',
          boxShadow: '0 8px 20px -5px rgba(76, 52, 206, 0.4)',
          border: '1px solid rgba(76, 52, 206, 0.2)'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Effet de glow intérieur */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-70" />
        
        {/* Particules flottantes pour le bouton primaire - Optimisé pour mobile */}
        <AnimatePresence>
          {isActive && !isMobile && (
            <>
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 0,
                    scale: 0 
                  }}
                  animate={{
                    x: (Math.random() - 0.5) * 30,
                    y: (Math.random() - 0.5) * 30,
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0]
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 1.5 + Math.random() * 0.5,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 4 + Math.random() * 2
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          <Icon 
            size={isMobile ? 22 : 16} 
            className="text-white drop-shadow-lg" 
          />
        </div>
      </motion.button>
    );
  }

  // Item de navigation standard avec style Liquid Glass
  return (
    <motion.button
      onClick={() => onSelect(item.id)}
      className={cn(
        "flex flex-col items-center justify-center gap-0.5",
        isMobile ? "min-h-[54px] py-2" : "min-h-[48px] px-2 py-1.5",
        "rounded-xl",
        "transition-all duration-300",
        // Effet hover Liquid Glass
        "hover:bg-white/10 active:bg-white/15",
        "hover:backdrop-blur-sm",
        // Largeur plus large sur mobile pour éviter la troncature
        isMobile ? "w-[72px]" : "min-w-[65px]"
      )}
      variants={itemVariants}
      initial="inactive"
      animate={isReallyActive ? "active" : "inactive"}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        variants={iconVariants}
        initial="inactive"
        animate={isReallyActive ? "active" : "inactive"}
        whileHover="hover"
        className="relative"
      >
        <Icon 
          size={isMobile ? 20 : 18} 
          className={cn(
            isReallyActive ? "text-[#4C34CE]" : "text-neutral-600 dark:text-neutral-400",
            "transition-colors duration-200"
          )}
        />
        
        {/* Indicateur actif - Supprimé pour plus d'élégance */}
      </motion.div>

      <motion.span 
        className={cn(
          isMobile ? "text-[10px]" : "text-[10px]",
          "font-medium transition-colors duration-200",
          "truncate max-w-[65px]",
          isReallyActive ? "text-[#4C34CE] font-semibold" : "text-neutral-600 dark:text-neutral-500"
        )}
      >
        {item.label.length > 9 && isMobile ? `${item.label.slice(0, 7)}...` : item.label}
      </motion.span>
      
    </motion.button>
  );
};

// Composant principal BottomNav
const BottomNav: React.FC<BottomNavProps> = ({
  activeItem = 'dashboard',
  onItemSelect,
  className
}) => {
  // S'assurer que 'add' n'est jamais l'item actif par défaut
  const [localActiveItem, setLocalActiveItem] = useState(
    activeItem?.startsWith('add-') ? 'dashboard' : activeItem
  );
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const animationSettings = useOptimizedAnimations();
  
  // Synchroniser avec la prop activeItem
  useEffect(() => {
    if (activeItem && !activeItem.startsWith('add-')) {
      setLocalActiveItem(activeItem);
    }
  }, [activeItem]);

  // Détection de la taille d'écran
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
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
    // Ne pas activer le bouton + comme item actif
    if (!itemId.startsWith('add-')) {
      setLocalActiveItem(itemId);
    }
    onItemSelect?.(itemId);
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
  const isMobile = screenSize === 'mobile';

  // Animation du conteneur optimisée
  const containerVariants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05
      }
    }
  };

  // État monté pour éviter les problèmes d'hydratation
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    // Une seule navbar flottante unifiée avec design Liquid Glass
    <motion.nav
      className={cn(
        "fixed z-50",
        // Position adaptée pour mobile avec safe area iOS et largeur définie
        screenSize === 'mobile' 
          ? "bottom-[env(safe-area-inset-bottom,20px)] left-4 right-4" // Marges latérales fixes
          : "bottom-6 left-1/2 -translate-x-1/2",
        "flex items-center justify-center",
        // Padding optimisé pour le centrage
        screenSize === 'mobile' ? "px-3 py-3.5" : "px-3 py-2.5",
        "rounded-2xl",
        // Style Liquid Glass avec teinte rose subtile
        "backdrop-blur-2xl",
        "shadow-2xl",
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
      {/* Effet Liquid Glass avec reflet bleu */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-blue-100/10 to-transparent opacity-60" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-blue-100/5 to-white/10" />
      
      {/* Contenu avec gestion du centrage mobile - SIMPLIFIÉ */}
      <div className={cn(
        "relative flex items-center",
        screenSize === 'mobile' ? "gap-2 justify-around w-full" : "gap-1.5 justify-center"
      )}>
        {navItems.map((item) => {
          // Gestion spéciale pour le bouton "Autres"
          if ((item as any).isMore) {
            return (
              <motion.button
                key={item.id}
                onClick={() => onItemSelect?.(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5",
                  screenSize === 'mobile' ? "min-h-[54px] py-2 w-[72px]" : "min-h-[48px] px-2 py-1.5",
                  "rounded-xl",
                  "transition-all duration-300",
                  "hover:bg-white/10 active:bg-white/15",
                  "hover:backdrop-blur-sm",
                  screenSize === 'mobile' ? "" : "min-w-[65px]"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon 
                  size={screenSize === 'mobile' ? 20 : 18} 
                  className={cn(
                    localActiveItem === item.id ? "text-[#4C34CE]" : "text-neutral-600 dark:text-neutral-400",
                    "transition-colors duration-200"
                  )}
                />
                <span className={cn(
                  screenSize === 'mobile' ? "text-[10px]" : "text-[10px]",
                  "font-medium truncate max-w-[50px]",
                  localActiveItem === item.id ? "text-[#4C34CE] font-semibold" : "text-neutral-600 dark:text-neutral-500",
                  "transition-colors duration-200"
                )}>
                  {item.label.length > 9 && screenSize === 'mobile' ? `${item.label.slice(0, 7)}...` : item.label}
                </span>
              </motion.button>
            );
          }
          
          return (
            <NavItemComponent
              key={item.id}
              item={item}
              isActive={!item.id.startsWith('add-') && localActiveItem === item.id}
              isMobile={isMobile}
              onSelect={handleItemSelect}
            />
          );
        })}
        
      </div>
    </motion.nav>
  );
};

export default BottomNav;