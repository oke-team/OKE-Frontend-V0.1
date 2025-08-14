'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  Plus,
  ShoppingCart,
  TrendingUp,
  FileText,
  Package,
  Calculator,
  Receipt,
  BarChart3,
  Users,
  MessageSquare,
  Mail,
  Calendar,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isCenter?: boolean;
}

interface UnifiedBottomNavProps {
  activeItem?: string;
  onItemSelect?: (id: string) => void;
}

// Items de navigation mobile (5 icônes avec bouton + central)
const mobileNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'banking', label: 'Banque', icon: <Building2 size={18} /> },
  { id: 'add', label: '', icon: <Plus size={24} />, isCenter: true },
  { id: 'purchases', label: 'Achats', icon: <ShoppingCart size={18} /> },
  { id: 'accounting', label: 'Compta', icon: <Calculator size={18} /> }
];

// Items de navigation desktop (tous les modules avec bouton + central)
const desktopNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { id: 'banking', label: 'Banque', icon: <Building2 size={16} /> },
  { id: 'documents', label: 'Documents', icon: <FileText size={16} /> },
  { id: 'stocks', label: 'Stocks', icon: <Package size={16} /> },
  { id: 'accounting', label: 'Compta', icon: <Calculator size={16} /> },
  { id: 'tax', label: 'Fiscalité', icon: <Receipt size={16} /> },
  { id: 'add', label: '', icon: <Plus size={22} />, isCenter: true },
  { id: 'reporting', label: 'Reporting', icon: <BarChart3 size={16} /> },
  { id: 'hr', label: 'Paie/RH', icon: <Users size={16} /> },
  { id: 'communication', label: 'Comm.', icon: <MessageSquare size={16} /> },
  { id: 'organization', label: 'Orga.', icon: <Calendar size={16} /> },
  { id: 'automation', label: 'Auto.', icon: <Zap size={16} /> },
  { id: 'purchases', label: 'Achats', icon: <ShoppingCart size={16} /> },
  { id: 'sales', label: 'Ventes', icon: <TrendingUp size={16} /> }
];

export default function UnifiedBottomNav({ 
  activeItem = 'dashboard', 
  onItemSelect 
}: UnifiedBottomNavProps) {
  const [localActiveItem, setLocalActiveItem] = useState(activeItem);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleItemSelect = (id: string) => {
    setLocalActiveItem(id);
    onItemSelect?.(id);
  };

  // Sélection des items selon la plateforme (structure simple et cohérente)
  const allItems = isDesktop ? desktopNavItems : mobileNavItems;

  return (
    <nav className={cn(
      "fixed bottom-0 z-50",
      isDesktop ? "left-1/2 -translate-x-1/2 px-8 w-auto max-w-[calc(100vw-4rem)]" : "left-0 right-0 w-full px-4"
    )}>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          "bg-white/90 backdrop-blur-xl",
          "border border-neutral-200/30",
          "shadow-glass-lg",
          isDesktop ? "rounded-3xl px-3 py-1.5 mb-6" : "rounded-t-3xl py-2",
          "overflow-hidden"
        )}
      >
        <div className={cn(
          "flex items-center",
          isDesktop ? "justify-center gap-1" : "justify-around px-1",
          "w-full"
        )}>
          {allItems.map((item) => (
            <NavItemButton
              key={item.id}
              item={item}
              isActive={localActiveItem === item.id}
              isDesktop={isDesktop}
              onSelect={handleItemSelect}
            />
          ))}
        </div>
      </motion.div>
    </nav>
  );
}

// Composant pour chaque bouton de navigation
function NavItemButton({ 
  item, 
  isActive, 
  isDesktop, 
  onSelect 
}: {
  item: NavItem;
  isActive: boolean;
  isDesktop: boolean;
  onSelect: (id: string) => void;
}) {
  if (item.isCenter) {
    // Bouton + central spécial
    return (
      <motion.button
        onClick={() => onSelect(item.id)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative flex items-center justify-center overflow-hidden flex-shrink-0",
          isDesktop ? "w-10 h-10 mx-1" : "w-12 h-12 mx-1",
          "bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500",
          "rounded-2xl border border-white/20 cursor-pointer",
          "shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/35",
          "transition-all duration-200",
          "text-white"
        )}
      >
        {/* Effet glow intérieur */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-60" />
        
        <motion.div
          animate={{ rotate: isActive ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="relative flex z-10"
        >
          <Plus size={isDesktop ? 20 : 24} strokeWidth={2.5} />
        </motion.div>
      </motion.button>
    );
  }

  // Boutons normaux
  return (
    <motion.button
      onClick={() => onSelect(item.id)}
      whileHover={isDesktop ? { y: -2 } : undefined}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative flex flex-col items-center justify-center",
        isDesktop ? "px-2 py-1.5" : "px-1.5 py-2",
        "bg-transparent border-none cursor-pointer rounded-xl",
        "transition-all duration-150",
        isDesktop ? "min-w-fit" : "flex-1 min-w-[50px]",
        "text-xs whitespace-nowrap",
        isActive ? "text-violet-600" : "text-neutral-500",
        !isActive && isDesktop && "hover:bg-violet-50/50"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className={cn(
            "absolute inset-0",
            "bg-violet-50/80 rounded-xl",
            "border border-violet-200/50"
          )}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      
      <div className={cn(
        "relative flex",
        isDesktop ? "flex-row items-center gap-2" : "flex-col items-center gap-1"
      )}>
        <motion.div
          animate={{ 
            scale: isActive ? 1.1 : 1,
            y: isActive && !isDesktop ? -2 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          {item.icon}
        </motion.div>
        
        {item.label && (
          <motion.span
            className={cn(
              isDesktop ? "text-xs" : "text-2xs",
              isActive ? "font-semibold opacity-100" : "font-medium",
              !isActive && (isDesktop ? "opacity-80" : "opacity-70")
            )}
            animate={{ 
              opacity: isActive ? 1 : (isDesktop ? 0.8 : 0.7)
            }}
          >
            {item.label}
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}