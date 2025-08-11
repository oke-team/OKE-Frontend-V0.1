"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItem, BottomNavProps } from './types';
import { useOptimizedAnimations } from '@/lib/performance-utils';
import { mobileNavItems, desktopNavItems } from '@/lib/modules-config';

// Conversion des modules en NavItems
const convertToNavItems = (modules: typeof mobileNavItems): NavItem[] => {
  return modules.map(module => ({
    id: module.id,
    label: module.label,
    icon: module.icon,
    href: module.href,
    category: module.category,
    isPrimary: module.isPrimary || false,
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
      y: 0,
      filter: "brightness(0.7)"
    },
    active: { 
      scale: isMobile ? 1.1 : 1.05,
      y: isMobile ? -2 : -1,
      filter: "brightness(1.2)"
    },
    hover: { 
      scale: isMobile ? 1.05 : 1.02,
      y: isMobile ? -1 : -0.5,
      filter: "brightness(1.1)"
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

  if (item.isPrimary && isMobile) {
    // Bouton primaire central avec effet spécial
    return (
      <motion.button
        onClick={() => onSelect(item.id)}
        className={cn(
          "relative flex flex-col items-center justify-center",
          "w-14 h-14 landscape:w-12 landscape:h-12 rounded-2xl landscape:rounded-xl",
          "bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600",
          "shadow-glass-lg shadow-primary-500/25",
          "border border-white/20",
          "backdrop-blur-md",
          "transition-all duration-300",
          "hover:shadow-glow-sm hover:shadow-primary-400/30",
          "active:scale-95"
        )}
        variants={itemVariants}
        initial="inactive"
        animate={isActive ? "active" : "inactive"}
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
      >
        {/* Effet de glow intérieur */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-60" />
        
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

        <motion.div
          variants={iconVariants}
          initial="inactive"
          animate={isActive ? "active" : "inactive"}
          whileHover="hover"
        >
          <Icon 
            size={isMobile ? 20 : 20} 
            className="text-white drop-shadow-sm landscape:w-4 landscape:h-4" 
          />
        </motion.div>
      </motion.button>
    );
  }

  // Item de navigation standard
  return (
    <motion.button
      onClick={() => onSelect(item.id)}
      className={cn(
        "flex flex-col items-center justify-center gap-1",
        "min-h-[60px] landscape:min-h-[50px] px-3 py-2 rounded-xl",
        "transition-all duration-300",
        "hover:bg-white/5 active:bg-white/10",
        // Optimisation des touch targets pour mobile
        isMobile ? "flex-1 min-w-[44px] touch-manipulation" : "min-w-[80px]"
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
        className={cn(
          "relative",
          isActive && "text-primary-400",
          !isActive && "text-neutral-400"
        )}
      >
        <Icon size={isMobile ? 20 : 18} className="landscape:w-4 landscape:h-4" />
        
        {/* Indicateur actif - Optimisé pour mobile */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className={cn(
                "absolute -inset-1 rounded-lg",
                isMobile 
                  ? "bg-primary-500/30 shadow-sm" // Plus simple sur mobile
                  : "bg-primary-500/20 blur-sm" // Effet blur sur desktop
              )}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: isMobile ? 0.15 : 0.2 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <motion.span 
        className={cn(
          "text-xs font-medium transition-colors duration-200",
          isActive ? "text-primary-300" : "text-neutral-500",
          isMobile ? "text-2xs landscape:text-[10px]" : "text-xs"
        )}
        animate={{
          opacity: isActive ? 1 : 0.7,
          y: isActive ? 0 : 1
        }}
      >
        {item.label}
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
  const [localActiveItem, setLocalActiveItem] = useState(activeItem);
  const animationSettings = useOptimizedAnimations();

  const handleItemSelect = (itemId: string) => {
    setLocalActiveItem(itemId);
    onItemSelect?.(itemId);
  };

  // Utilisation des configurations spécifiques mobile/desktop
  const mobileItems = mobileNavigationItems;
  const desktopItems = desktopNavigationItems;

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
          "bg-gradient-to-r from-primary-400 to-primary-500",
          "shadow-glow-sm shadow-primary-500/50"
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
    <>
      {/* Version Mobile */}
      <motion.nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "desktop:hidden", // Caché sur desktop
          "h-16 landscape:h-14 phone-landscape:h-10 px-4 pb-4 landscape:pb-2",
          "safe-area-bottom",
          "iphone-se:h-12 iphone-se:pb-2",
          className
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Effet Liquid Glass - Amélioré pour mobile */}
        <div className="absolute inset-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-glass-medium dark:from-glass-dark to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300/50 dark:via-glass-light to-transparent" />
        
        {/* Contenu */}
        <div className="relative h-full flex items-center justify-between">
          {mobileItems.map((item) => (
            <NavItemComponent
              key={item.id}
              item={item}
              isActive={localActiveItem === item.id}
              isMobile={true}
              onSelect={handleItemSelect}
            />
          ))}
          
          {/* Indicateur actif */}
          <ActiveIndicator 
            items={mobileItems} 
            activeId={localActiveItem} 
            isMobile={true} 
          />
        </div>
      </motion.nav>

      {/* Version Desktop */}
      <motion.nav
        className={cn(
          "hidden md:fixed md:bottom-6 md:left-1/2 md:-translate-x-1/2 z-50",
          "md:flex md:items-center md:gap-2",
          "px-4 py-3 rounded-2xl",
          "backdrop-blur-2xl bg-glass-light",
          "border border-white/10",
          "shadow-glass-lg",
          className
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Effet Liquid Glass Desktop */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-glass-white via-transparent to-transparent" />
        <div className="absolute inset-0 rounded-2xl shadow-inner-glow" />
        
        {/* Contenu Desktop */}
        <div className="relative flex items-center gap-1">
          {desktopItems.map((item) => (
            <NavItemComponent
              key={item.id}
              item={item}
              isActive={localActiveItem === item.id}
              isMobile={false}
              onSelect={handleItemSelect}
            />
          ))}
          
          {/* Indicateur actif desktop */}
          <ActiveIndicator 
            items={desktopItems} 
            activeId={localActiveItem} 
            isMobile={false} 
          />
        </div>
      </motion.nav>
    </>
  );
};

export default BottomNav;