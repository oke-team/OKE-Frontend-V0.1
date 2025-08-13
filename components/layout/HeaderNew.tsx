'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useExpertMode } from '@/contexts/ExpertModeContext';
import { Company } from '@/components/ui/CompanySelectorLiquid';
import { liquidGlass } from '@/lib/design-system/liquid-glass';

// Import viewport-specific components
import HeaderMobile from './HeaderMobile';
import HeaderTablet from './HeaderTablet';
import HeaderDesktop from './HeaderDesktop';

// Types and interfaces
export interface HeaderProps {
  currentCompany?: Company;
  onCompanyChange?: (company: Company) => void;
  onChatOpen?: () => void;
  onMagicActions?: () => void;
  onSearch?: (query: string) => void;
  activeModule?: string;
  className?: string;
}

export interface HeaderContextType {
  currentCompany: Company;
  expertMode: boolean;
  pathname: string;
  isAccountingModule: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// Responsive breakpoints
const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

// Mock data
const mockCompanies: Company[] = [
  { id: '1', name: 'TechCorp SAS', plan: 'pro', country: 'FR', currency: 'EUR' },
  { id: '2', name: 'Design Studio', plan: 'starter', country: 'FR', currency: 'EUR' },
  { id: '3', name: 'Global Industries', plan: 'enterprise', country: 'US', currency: 'USD' }
];

/**
 * HeaderNew - Container intelligent pour le nouveau header OKÉ
 * 
 * Ce composant gère automatiquement le rendu responsive en sélectionnant
 * le composant approprié selon la taille de l'écran :
 * - Mobile: <768px
 * - Tablet: 768-1024px
 * - Desktop: >1024px
 */
const HeaderNew: React.FC<HeaderProps> = ({
  currentCompany = mockCompanies[0],
  onCompanyChange,
  onChatOpen,
  onMagicActions,
  onSearch,
  activeModule = 'dashboard',
  className
}) => {
  const { expertMode } = useExpertMode();
  const pathname = usePathname();
  
  // Responsive state
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isLoaded, setIsLoaded] = useState(false);

  // Determine viewport size
  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      if (width < MOBILE_BREAKPOINT) {
        setViewport('mobile');
      } else if (width < TABLET_BREAKPOINT) {
        setViewport('tablet');
      } else {
        setViewport('desktop');
      }
    };

    updateViewport();
    setIsLoaded(true);
    
    const debouncedResize = () => {
      clearTimeout(window.resizeTimeout as any);
      window.resizeTimeout = setTimeout(updateViewport, 150) as any;
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(window.resizeTimeout as any);
    };
  }, []);

  // Create header context
  const headerContext: HeaderContextType = useMemo(() => ({
    currentCompany,
    expertMode,
    pathname,
    isAccountingModule: pathname?.includes('/accounting') || false,
    isMobile: viewport === 'mobile',
    isTablet: viewport === 'tablet',
    isDesktop: viewport === 'desktop'
  }), [currentCompany, expertMode, pathname, viewport]);

  // Common props for all viewport components
  const commonProps = {
    currentCompany,
    onCompanyChange,
    onChatOpen,
    onMagicActions,
    onSearch,
    activeModule,
    context: headerContext
  };

  // Header styles with Liquid Glass effect
  const headerStyles = {
    ...liquidGlass.effects.header,
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    height: viewport === 'mobile' ? '56px' : '64px',
    zIndex: 50,
    paddingTop: 'env(safe-area-inset-top, 0)',
    transition: liquidGlass.transitions.medium
  };

  // Don't render until we know the viewport size
  if (!isLoaded) {
    return (
      <header style={headerStyles} className={className}>
        <div className="flex items-center justify-center h-full">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full"
          />
        </div>
      </header>
    );
  }

  return (
    <motion.header
      style={headerStyles}
      className={className}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <AnimatePresence mode="wait">
        {viewport === 'mobile' && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <HeaderMobile {...commonProps} />
          </motion.div>
        )}
        
        {viewport === 'tablet' && (
          <motion.div
            key="tablet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <HeaderTablet {...commonProps} />
          </motion.div>
        )}
        
        {viewport === 'desktop' && (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <HeaderDesktop {...commonProps} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default HeaderNew;

// Export types for other components
export type { HeaderContextType };