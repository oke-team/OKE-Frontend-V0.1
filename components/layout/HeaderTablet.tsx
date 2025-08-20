'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageSquare, Sparkles, Menu } from 'lucide-react';
import { HeaderProps, HeaderContextType } from './HeaderNew';
import LogoSection from './components/LogoSection';
import QuickActions from './components/QuickActions';
import UserProfile from './components/UserProfile';
import Selectors from './components/Selectors';
import SearchBar from './components/SearchBar';
import { liquidGlass } from '@/lib/design-system/liquid-glass';

interface HeaderTabletProps extends HeaderProps {
  context: HeaderContextType;
}

/**
 * HeaderTablet - Version tablet optimisée (768px-1024px)
 * 
 * Caractéristiques :
 * - Hauteur 64px avec éléments plus spacieux
 * - Navigation hybride avec menu collapse optionnel
 * - Sélecteurs plus visibles qu'en mobile
 * - Barre de recherche intégrée
 * - Actions rapides regroupées intelligemment
 */
const HeaderTablet: React.FC<HeaderTabletProps> = ({
  currentCompany,
  onCompanyChange,
  onChatOpen,
  onMagicActions,
  onSearch,
  activeModule,
  context
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const handleSearchFocus = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchBlur = () => {
    setIsSearchExpanded(false);
  };

  return (
    <div className="flex items-center h-full px-4 relative">
      {/* Left Section - Logo & Navigation */}
      <div className="flex items-center gap-4 min-w-0">
        <LogoSection 
          size="medium"
          showText={!isSearchExpanded}
        />
        
        {/* Optional menu toggle for collapsed nav */}
        {isMenuCollapsed && (
          <motion.button
            onClick={() => setIsMenuCollapsed(false)}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100/50 transition-colors"
            whileTap={{ scale: 0.95 }}
            aria-label="Développer la navigation"
          >
            <Menu size={20} className="text-slate-600" />
          </motion.button>
        )}
      </div>

      {/* Center Section - Search & Selectors */}
      <div className="flex-1 flex items-center justify-center gap-3 px-6 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {isSearchExpanded ? (
            /* Expanded Search Mode */
            <motion.div
              key="search-expanded"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex-1 max-w-2xl"
            >
              <SearchBar 
                onSearch={onSearch}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                placeholder="Rechercher dans OKÉ..."
                autoFocus
              />
            </motion.div>
          ) : (
            /* Normal Mode with Selectors */
            <motion.div
              key="normal-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 flex-1 justify-center"
            >
              {/* Company Selector */}
              <div className="w-72">
                <Selectors 
                  currentCompany={currentCompany}
                  onCompanyChange={onCompanyChange}
                  showPeriod={false}
                  size="md"
                  fullWidth
                />
              </div>

              {/* Period Selector - Only in accounting */}
              {context.isAccountingModule && (
                <>
                  <div className="h-6 w-px bg-slate-200/50" />
                  <div className="w-60">
                    <Selectors 
                      currentCompany={currentCompany}
                      onCompanyChange={onCompanyChange}
                      showPeriod={true}
                      showCompany={false}
                      size="md"
                      fullWidth
                    />
                  </div>
                </>
              )}

              {/* Search Toggle */}
              <motion.button
                onClick={handleSearchFocus}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100/50 transition-colors ml-2"
                whileTap={{ scale: 0.95 }}
                aria-label="Ouvrir la recherche"
              >
                <Search size={20} className="text-slate-500" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Section - Actions & Profile */}
      <div className="flex items-center gap-2">
        {!isSearchExpanded && (
          <>
            {/* Expert Mode Toggle */}
            <motion.button
              onClick={() => console.log('Toggle expert mode')}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg transition-all
                ${context.expertMode 
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md' 
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }
              `}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles size={16} />
              <span className="text-sm font-medium">
                {context.expertMode ? 'Expert' : 'Standard'}
              </span>
            </motion.button>

            {/* Quick Actions */}
            <QuickActions 
              onMagicActions={onMagicActions}
              expertMode={context.expertMode}
              layout="tablet"
            />

            {/* Chat Button */}
            <motion.button
              onClick={onChatOpen}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-50 hover:bg-primary-100 text-primary-700 transition-colors"
              whileTap={{ scale: 0.95 }}
              aria-label="Ouvrir le chat IA"
            >
              <MessageSquare size={16} />
              <span className="text-sm font-medium">Chat IA</span>
            </motion.button>
          </>
        )}

        {/* User Profile */}
        <UserProfile 
          size="medium"
          showName={!isSearchExpanded}
        />
      </div>

      {/* Search Blur Overlay */}
      <AnimatePresence>
        {isSearchExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 -z-10"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 50%, rgba(255,255,255,0.95) 100%)',
              backdropFilter: 'blur(8px)'
            }}
            onClick={handleSearchBlur}
          />
        )}
      </AnimatePresence>

      {/* Quick Search Results Dropdown */}
      <AnimatePresence>
        {isSearchExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-50 mt-2 mx-4"
            style={liquidGlass.effects.elevated}
          >
            <div className="rounded-xl p-4 max-h-80 overflow-y-auto">
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Suggestions rapides</h3>
                  <div className="space-y-1">
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Search size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-700">Rechercher dans les transactions</span>
                      </div>
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Search size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-700">Rechercher dans les clients</span>
                      </div>
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-slate-200/50 pt-3">
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Recherches récentes</h3>
                  <div className="space-y-1">
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="text-sm text-slate-600">facture client dupont</span>
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="text-sm text-slate-600">TVA décembre 2024</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderTablet;