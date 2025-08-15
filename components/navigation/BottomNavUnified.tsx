"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItem, BottomNavProps } from './types';
import { useOptimizedAnimations } from '@/lib/performance-utils';
import { mobileNavItems } from '@/lib/modules-config';

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

// Configuration unifiée - mêmes items pour toutes les tailles
const navigationItems: NavItem[] = convertToNavItems(mobileNavItems);

// Composant NavItem individuel
const NavItemComponent: React.FC<{
  item: NavItem;
  isActive: boolean;
  onSelect: (id: string) => void;
}> = ({ item, isActive, onSelect }) => {
  const Icon = item.icon;

  // Bouton primaire central avec effet spécial
  if (item.isPrimary) {
    return (
      <motion.button
        onClick={() => onSelect(item.id)}
        className={cn(
          "relative flex flex-col items-center justify-center",
          "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl",
          "bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600",
          "shadow-lg shadow-primary-500/25",
          "border border-white/30",
          "transition-all duration-300",
          "hover:shadow-xl hover:shadow-primary-400/30 hover:scale-105",
          "active:scale-95"
        )}
        whileTap={{ scale: 0.9 }}
      >
        {/* Effet de glow intérieur */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-60" />
        
        <motion.div
          animate={{ rotate: isActive ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="w-5 h-5 text-white relative z-10" />
        </motion.div>
      </motion.button>
    );
  }

  // Item de navigation standard
  return (
    <motion.button
      onClick={() => onSelect(item.id)}
      className={cn(
        "relative flex flex-col items-center justify-center gap-0.5 sm:gap-1",
        "px-2 py-2 sm:px-3 sm:py-2.5 rounded-xl",
        "transition-all duration-300",
        "hover:bg-white/20 active:bg-white/25",
        "min-w-[60px] sm:min-w-[70px]"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ 
          scale: isActive ? 1.1 : 1,
          y: isActive ? -2 : 0 
        }}
        transition={{ duration: 0.2 }}
      >
        <Icon 
          className={cn(
            "w-5 h-5 sm:w-5 sm:h-5 transition-colors",
            isActive 
              ? "text-primary-600 dark:text-primary-400" 
              : "text-neutral-700 dark:text-neutral-400"
          )}
        />
      </motion.div>

      <motion.span 
        className={cn(
          "text-[10px] sm:text-xs font-medium transition-all",
          isActive 
            ? "text-primary-600 dark:text-primary-400 font-semibold" 
            : "text-neutral-600 dark:text-neutral-500"
        )}
        animate={{
          opacity: isActive ? 1 : 0.8,
          y: isActive ? -1 : 0
        }}
      >
        {item.label}
      </motion.span>

      {/* Indicateur actif individuel */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute bottom-0 h-0.5 w-8 sm:w-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Composant principal BottomNav unifié
const BottomNavUnified: React.FC<BottomNavProps> = ({
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

  return (
    <motion.nav
      className={cn(
        // Positionnement flottant pour toutes les tailles
        "fixed z-50",
        // Toujours centré et flottant avec marges
        "bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2",
        // Largeur auto avec max pour mobile
        "w-[calc(100%-32px)] max-w-[400px] sm:w-auto",
        // Bordure arrondie partout
        "rounded-2xl",
        // Padding unifié
        "px-4 py-3 sm:px-6 sm:py-4",
        // Style Liquid Glass magnifique
        "backdrop-blur-2xl",
        "border border-white/20 dark:border-white/10",
        "shadow-2xl shadow-black/10",
        className
      )}
      style={{
        // Effets Liquid Glass Apple Vision Pro magnifiques
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.10) 50%, rgba(255, 255, 255, 0.05) 100%)',
        backdropFilter: 'blur(30px) saturate(200%)',
        WebkitBackdropFilter: 'blur(30px) saturate(200%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
      }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: animationSettings.duration,
        ease: animationSettings.ease
      }}
    >
      {/* Effet de brillance supérieure */}
      <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      
      {/* Effet de glow interne magnifique */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-40" />
      
      {/* Ombre interne pour profondeur */}
      <div className="absolute inset-0 rounded-2xl shadow-inner opacity-20" />
      
      {/* Effet de reflet subtil */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-transparent to-white/5" />
      
      {/* Contenu de navigation */}
      <div className="relative h-full flex items-center justify-around lg:justify-center lg:gap-2">
        {navigationItems.map((item) => (
          <NavItemComponent
            key={item.id}
            item={item}
            isActive={localActiveItem === item.id}
            onSelect={handleItemSelect}
          />
        ))}
      </div>
    </motion.nav>
  );
};

export default BottomNavUnified;