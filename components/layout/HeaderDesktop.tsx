'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageSquare, Sparkles, Bell, Settings } from 'lucide-react';
import { HeaderProps, HeaderContextType } from './HeaderNew';
import LogoSection from './components/LogoSection';
import NavigationTabs from './components/NavigationTabs';
import QuickActions from './components/QuickActions';
import UserProfile from './components/UserProfile';
import Selectors from './components/Selectors';
import SearchBar from './components/SearchBar';
import { liquidGlass } from '@/lib/design-system/liquid-glass';

interface HeaderDesktopProps extends HeaderProps {
  context: HeaderContextType;
}

/**
 * HeaderDesktop - Version desktop complète (>1024px)
 * 
 * Caractéristiques :
 * - Hauteur 64px avec navigation complète
 * - Tabs de navigation intelligente remplaçant le menu hamburger
 * - Barre de recherche persistante et intelligente
 * - Actions rapides étendues avec notifications
 * - Sélecteurs avec bordures subtiles
 * - Avatar avec ring gradient amélioré
 */
const HeaderDesktop: React.FC<HeaderDesktopProps> = ({
  currentCompany,
  onCompanyChange,
  onChatOpen,
  onMagicActions,
  onSearch,
  activeModule,
  context
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <div className="flex items-center h-full px-6">
      {/* Left Section - Logo & Navigation */}
      <div className="flex items-center gap-6">
        <LogoSection 
          size="large"
          showText={true}
        />
        
        {/* Navigation Tabs */}
        <NavigationTabs 
          activeModule={activeModule}
          layout="horizontal"
          onNavigate={(module) => console.log('Navigate to:', module)}
        />
      </div>

      {/* Center Section - Search Bar */}
      <div className="flex-1 flex justify-center px-8 max-w-4xl mx-auto">
        <div className="w-full max-w-xl">
          <SearchBar 
            onSearch={onSearch}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            placeholder="Rechercher dans OKÉ (Cmd+K)"
            showShortcut={true}
          />
        </div>
      </div>

      {/* Right Section - Selectors & Actions */}
      <div className="flex items-center gap-4">
        {/* Company/Period Selectors */}
        <div className="flex items-center gap-3">
          <Selectors 
            currentCompany={currentCompany}
            onCompanyChange={onCompanyChange}
            showPeriod={context.isAccountingModule}
            size="md"
            variant="subtle"
          />
        </div>

        {/* Vertical Separator */}
        <div className="h-8 w-px bg-slate-200/50" />

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Expert Mode Toggle */}
          <motion.button
            onClick={() => console.log('Toggle expert mode')}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg transition-all
              ${context.expertMode 
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/50'
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles size={16} />
            <span className="text-sm font-medium">
              {context.expertMode ? 'Mode Expert' : 'Mode Standard'}
            </span>
          </motion.button>

          {/* Quick Actions */}
          <QuickActions 
            onMagicActions={onMagicActions}
            expertMode={context.expertMode}
            layout="desktop"
          />

          {/* Notifications */}
          <motion.button
            className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Notifications"
          >
            <Bell size={18} className="text-slate-600" />
            {notifications > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span className="text-xs font-bold text-white">{notifications}</span>
              </motion.div>
            )}
          </motion.button>

          {/* Chat IA */}
          <motion.button
            onClick={onChatOpen}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-50 hover:bg-primary-100 text-primary-700 border border-primary-200/50 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Ouvrir le chat IA"
          >
            <MessageSquare size={16} />
            <span className="text-sm font-medium">Chat IA</span>
          </motion.button>
        </div>

        {/* User Profile */}
        <UserProfile 
          size="large"
          showName={true}
          showStatus={true}
        />
      </div>

      {/* Enhanced Search Results Overlay */}
      <AnimatePresence>
        {isSearchFocused && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-full left-6 right-6 z-50 mt-2"
            style={liquidGlass.effects.elevated}
          >
            <div className="rounded-xl overflow-hidden">
              {/* Quick Actions Header */}
              <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/30">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-800">Recherche rapide</h3>
                  <div className="flex gap-2">
                    <kbd className="px-2 py-1 text-xs bg-white rounded border border-slate-200 text-slate-500">Cmd</kbd>
                    <kbd className="px-2 py-1 text-xs bg-white rounded border border-slate-200 text-slate-500">K</kbd>
                  </div>
                </div>
              </div>

              {/* Search Categories */}
              <div className="p-6 grid grid-cols-3 gap-6">
                {/* Recent Searches */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Recherches récentes</h4>
                  <div className="space-y-2">
                    {['facture client dupont', 'TVA décembre 2024', 'rapport mensuel'].map((item) => (
                      <button
                        key={item}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Search size={14} className="text-slate-400 group-hover:text-slate-600" />
                          <span className="text-sm text-slate-700 truncate">{item}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Actions rapides</h4>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                          <MessageSquare size={14} className="text-primary-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-800">Nouvelle facture</div>
                          <div className="text-xs text-slate-500">Créer une facture client</div>
                        </div>
                      </div>
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Settings size={14} className="text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-800">Nouveau client</div>
                          <div className="text-xs text-slate-500">Ajouter un client</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Modules */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Modules</h4>
                  <div className="space-y-2">
                    <NavigationTabs 
                      activeModule={activeModule}
                      layout="vertical-compact"
                      onNavigate={(module) => {
                        console.log('Navigate to:', module);
                        setIsSearchFocused(false);
                      }}
                      showInSearch={true}
                    />
                  </div>
                </div>
              </div>

              {/* Footer with Tips */}
              <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-200/30">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Tapez pour rechercher dans toute l'application</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white rounded text-xs border">↵</kbd>
                      pour sélectionner
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white rounded text-xs border">Esc</kbd>
                      pour fermer
                    </span>
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

export default HeaderDesktop;