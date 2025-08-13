'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Calendar, MessageSquare, Search, Menu, X } from 'lucide-react';
import { HeaderProps, HeaderContextType } from './HeaderNew';
import LogoSection from './components/LogoSection';
import QuickActions from './components/QuickActions';
import UserProfile from './components/UserProfile';
import Selectors from './components/Selectors';
import NavigationTabs from './components/NavigationTabs';
import { liquidGlass } from '@/lib/design-system/liquid-glass';

interface HeaderMobileProps extends HeaderProps {
  context: HeaderContextType;
}

/**
 * HeaderMobile - Version mobile optimisée (<768px)
 * 
 * Caractéristiques :
 * - Hauteur 56px avec touch targets 44px minimum
 * - Navigation intelligente remplaçant le menu hamburger
 * - Indicateurs compacts pour entreprise/période
 * - Actions rapides centrées sur l'essentiel
 * - Gestion du clavier virtuel sur mobile
 */
const HeaderMobile: React.FC<HeaderMobileProps> = ({
  currentCompany,
  onCompanyChange,
  onChatOpen,
  onMagicActions,
  onSearch,
  activeModule,
  context
}) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close navigation when clicking outside
  useEffect(() => {
    if (!isNavigationOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-navigation-menu]')) {
        setIsNavigationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNavigationOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInputRef.current?.value || '';
    if (query.trim()) {
      onSearch?.(query);
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-between h-full px-3 relative">
      {/* Navigation Menu Toggle */}
      <div className="flex items-center gap-2">
        <motion.button
          onClick={() => setIsNavigationOpen(!isNavigationOpen)}
          className="flex items-center justify-center w-11 h-11 rounded-lg hover:bg-slate-100/50 transition-colors"
          style={{ minWidth: '44px', minHeight: '44px' }}
          whileTap={{ scale: 0.95 }}
          aria-label={isNavigationOpen ? 'Fermer la navigation' : 'Ouvrir la navigation'}
          aria-expanded={isNavigationOpen}
        >
          <motion.div
            animate={{ rotate: isNavigationOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isNavigationOpen ? (
              <X size={20} className="text-slate-700" />
            ) : (
              <Menu size={20} className="text-slate-700" />
            )}
          </motion.div>
        </motion.button>

        <LogoSection 
          size="compact"
          showText={false}
        />
      </div>

      {/* Central Selectors - Compact Indicators */}
      <div className="flex-1 flex items-center justify-center px-2">
        <div className="flex items-center gap-2 max-w-[200px]">
          {/* Company Indicator */}
          <motion.button
            onClick={() => console.log('Open company selector modal')}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary-50/80 border border-primary-200/50"
            style={{ minHeight: '32px', maxWidth: '100px' }}
            whileTap={{ scale: 0.95 }}
          >
            <Building2 size={12} className="text-primary-600 flex-shrink-0" />
            <span className="truncate text-xs font-medium text-primary-700">
              {currentCompany?.name && currentCompany.name.length > 8 
                ? currentCompany.name.substring(0, 8) + '...' 
                : currentCompany?.name
              }
            </span>
          </motion.button>

          {/* Period Indicator - Only in accounting */}
          {context.isAccountingModule && (
            <motion.button
              onClick={() => console.log('Open period selector modal')}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50/80 border border-emerald-200/50"
              style={{ minHeight: '32px', maxWidth: '70px' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Calendar size={12} className="text-emerald-600 flex-shrink-0" />
              <span className="truncate text-xs font-medium text-emerald-700">
                2025
              </span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1">
        {/* Search Toggle */}
        <motion.button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100/50 transition-colors"
          whileTap={{ scale: 0.95 }}
          aria-label={isSearchOpen ? 'Fermer la recherche' : 'Ouvrir la recherche'}
        >
          <Search size={18} className="text-slate-600" />
        </motion.button>

        {/* Chat Button */}
        <motion.button
          onClick={onChatOpen}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors"
          whileTap={{ scale: 0.95 }}
          aria-label="Ouvrir le chat IA"
        >
          <MessageSquare size={18} className="text-primary-600" />
        </motion.button>

        {/* User Profile */}
        <UserProfile 
          size="compact"
          showName={false}
        />
      </div>

      {/* Navigation Menu Overlay */}
      <AnimatePresence>
        {isNavigationOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsNavigationOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="absolute left-0 top-0 h-full w-80 max-w-[85vw]"
              style={{
                ...liquidGlass.mobile.modal,
                paddingTop: 'calc(56px + env(safe-area-inset-top, 0px))'
              }}
              data-navigation-menu
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <NavigationTabs 
                  activeModule={activeModule}
                  layout="vertical"
                  onNavigate={(module) => {
                    setIsNavigationOpen(false);
                    console.log('Navigate to:', module);
                  }}
                />
              </div>

              <div className="mt-6 px-4">
                <Selectors 
                  currentCompany={currentCompany}
                  onCompanyChange={onCompanyChange}
                  showPeriod={context.isAccountingModule}
                  size="lg"
                  fullWidth
                />
              </div>

              <div className="mt-auto p-4 border-t border-slate-200/30">
                <QuickActions 
                  onMagicActions={onMagicActions}
                  expertMode={context.expertMode}
                  layout="mobile"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-40 mt-2 mx-3"
            style={liquidGlass.effects.elevated}
          >
            <div className="rounded-xl p-4">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Rechercher dans OKÉ..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-0 bg-slate-50/50 placeholder-slate-500 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                    style={{ fontSize: '16px' }} // Prevent zoom on iOS
                  />
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Rechercher
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderMobile;