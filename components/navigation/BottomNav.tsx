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
          "relative flex flex-col items-center justify-center",
          "w-11 h-11 rounded-2xl",
          "transition-all duration-300",
          "hover:shadow-xl hover:shadow-rose-500/60 hover:scale-110",
          "active:scale-95"
        )}
        style={{
          background: 'linear-gradient(135deg, rgb(167, 139, 250) 0%, rgb(217, 70, 239) 50%, rgb(251, 146, 176) 100%)',
          boxShadow: '0 10px 25px -5px rgba(217, 70, 239, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          filter: 'brightness(1.1) saturate(1.25)'
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
            size={16} 
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
        "min-h-[48px] px-2 py-1.5 rounded-xl",
        "transition-all duration-300",
        // Effet hover Liquid Glass
        "hover:bg-white/10 active:bg-white/15",
        "hover:backdrop-blur-sm",
        // Taille unifiée
        isMobile ? "min-w-[50px]" : "min-w-[65px]"
      )}
      variants={itemVariants}
      initial="inactive"
      animate={isActive ? "active" : "inactive"}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        variants={iconVariants}
        initial="inactive"
        animate={isActive ? "active" : "inactive"}
        whileHover="hover"
        className="relative"
      >
        <Icon 
          size={18} 
          className={cn(
            isActive ? "text-fuchsia-500" : "text-neutral-600 dark:text-neutral-400",
            "transition-colors duration-200"
          )}
        />
        
        {/* Indicateur actif - Glow rose */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute -inset-2 rounded-lg bg-fuchsia-500/20 blur-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <motion.span 
        className={cn(
          "text-[10px] font-medium transition-colors duration-200",
          isActive ? "text-fuchsia-500 font-semibold" : "text-neutral-600 dark:text-neutral-500"
        )}
      >
        {item.label}
      </motion.span>
      
      {/* Barre indicatrice active */}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-fuchsia-500 to-rose-500 rounded-full"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 20, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
};

// Composant principal BottomNav
const BottomNav: React.FC<BottomNavProps> = ({
  activeItem = 'dashboard',
  onItemSelect,
  className
}) => {
  const [localActiveItem, setLocalActiveItem] = useState(activeItem);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const animationSettings = useOptimizedAnimations();

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
    setLocalActiveItem(itemId);
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
      y: animationSettings.shouldReduceMotion ? 20 : 100, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: animationSettings.duration,
        ease: animationSettings.ease,
        staggerChildren: animationSettings.staggerDelay
      }
    }
  };

  // Indicateur actif fluide (pill)
  const ActiveIndicator: React.FC<{ items: NavItem[], activeId: string, isMobile: boolean }> = ({ 
    items, 
    activeId, 
    isMobile 
  }) => {
    const activeIndex = items.findIndex(item => item.id === activeId);
    const activeItem = items[activeIndex];
    
    if (activeIndex === -1 || activeItem?.isPrimary) return null;

    const pillWidth = isMobile ? "44px" : "52px";
    const itemWidth = isMobile ? "20%" : `${100 / items.length}%`;
    const leftPosition = isMobile ? 
      `calc(${activeIndex * 20}% + 10%)` : 
      `calc(${activeIndex * (100 / items.length)}% + ${(100 / items.length) / 2}% - 26px)`;

    return (
      <motion.div
        className={cn(
          "absolute bottom-1 h-1 rounded-full",
          "bg-gradient-to-r from-primary-500 to-primary-600",
          "shadow-glow-sm shadow-primary-500/70"
        )}
        style={{ 
          width: pillWidth,
          left: leftPosition
        }}
        layoutId="activeIndicator"
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      />
    );
  };

  return (
    // Une seule navbar flottante unifiée avec design Liquid Glass
    <motion.nav
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-1.5",
        "px-3 py-2.5 rounded-2xl",
        // Style Liquid Glass avec teinte rose subtile
        "backdrop-blur-2xl",
        "shadow-2xl",
        // Largeur adaptative mais toujours centrée
        screenSize === 'mobile' && "scale-90",
        screenSize === 'tablet' && "w-auto",
        screenSize === 'desktop' && "w-auto",
        className
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(251, 207, 232, 0.15) 50%, rgba(255, 255, 255, 0.85) 100%)',
        border: '1px solid rgba(251, 207, 232, 0.3)',
        boxShadow: '0 20px 40px -10px rgba(217, 70, 239, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)'
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Effet Liquid Glass avec reflet rose */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-fuchsia-100/10 to-transparent opacity-60" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-rose-100/5 to-white/10" />
      
      {/* Contenu unifié avec même espacement */}
      <div className={cn(
        "relative flex items-center gap-1",
        screenSize === 'tablet' && "gap-1.5"
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
                  "min-h-[48px] px-2 py-1.5 rounded-xl",
                  "transition-all duration-300",
                  "hover:bg-white/10 active:bg-white/15",
                  "hover:backdrop-blur-sm",
                  screenSize === 'mobile' ? "min-w-[50px]" : "min-w-[65px]"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon 
                  size={18} 
                  className={cn(
                    localActiveItem === item.id ? "text-fuchsia-500" : "text-neutral-600 dark:text-neutral-400",
                    "transition-colors duration-200"
                  )}
                />
                <span className={cn(
                  "text-[10px] font-medium",
                  localActiveItem === item.id ? "text-fuchsia-500 font-semibold" : "text-neutral-600 dark:text-neutral-500",
                  "transition-colors duration-200"
                )}>
                  {item.label}
                </span>
              </motion.button>
            );
          }
          
          return (
            <NavItemComponent
              key={item.id}
              item={item}
              isActive={localActiveItem === item.id}
              isMobile={isMobile}
              onSelect={handleItemSelect}
            />
          );
        })}
        
        {/* Indicateur actif */}
        {!isMobile && (
          <ActiveIndicator 
            items={navItems} 
            activeId={localActiveItem} 
            isMobile={isMobile} 
          />
        )}
      </div>
    </motion.nav>
  );
};

export default BottomNav;