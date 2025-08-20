'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExpertMode } from '@/contexts/ExpertModeContext';
import { CompanySelectorLiquid, Company } from '@/components/ui/CompanySelectorLiquid';
import { PeriodSelectorLiquid } from '@/components/ui/PeriodSelectorLiquid';
import { usePathname } from 'next/navigation';
import { liquidGlass, applyLiquidGlass } from '@/lib/design-system/liquid-glass';
import {
  MessageSquare,
  Sparkles,
  Menu,
  Settings,
  LogOut,
  User,
  Building2,
  Calendar
} from 'lucide-react';
import Image from 'next/image';

interface HeaderLiquidProps {
  currentCompany?: Company;
  onCompanyChange?: (company: Company) => void;
  onChatOpen?: () => void;
  onMenuToggle?: () => void;
  activeModule?: string;
}

const mockCompanies: Company[] = [
  { id: '1', name: 'TechCorp SAS', plan: 'pro', country: 'FR', currency: 'EUR' },
  { id: '2', name: 'Design Studio', plan: 'starter', country: 'FR', currency: 'EUR' },
  { id: '3', name: 'Global Industries', plan: 'enterprise', country: 'US', currency: 'USD' }
];

export default function HeaderLiquid({
  currentCompany = mockCompanies[0],
  onCompanyChange,
  onChatOpen,
  onMenuToggle,
  activeModule = 'dashboard'
}: HeaderLiquidProps) {
  const { expertMode, toggleExpertMode } = useExpertMode();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const isAccountingModule = pathname?.includes('/accounting');
  
  // Style du header avec Liquid Glass
  const headerStyle = {
    ...applyLiquidGlass('header'),
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    height: isMobile ? '56px' : '64px',
    zIndex: 50,
    paddingTop: 'env(safe-area-inset-top, 0)',
    transition: liquidGlass.transitions.medium
  };
  
  return (
    <header style={headerStyle}>
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Partie gauche */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Menu burger sur mobile */}
          {isMobile && (
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg hover:bg-slate-100/50 transition-colors"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <Menu size={20} />
            </button>
          )}
          
          {/* Logo */}
          <Image
            src="/logo_oke_original.png"
            alt="Oké"
            width={isMobile ? 100 : 120}
            height={isMobile ? 32 : 40}
            className="h-auto"
          />
          
          {/* Séparateur vertical desktop */}
          {!isMobile && (
            <div className="h-8 w-px bg-slate-200/50" />
          )}
        </div>
        
        {/* Partie centrale - Sélecteurs */}
        {!isMobile ? (
          <div className="flex-1 flex items-center justify-center gap-3 max-w-2xl mx-auto px-2">
            {/* Sélecteur d'entreprise */}
            <div className="w-64">
              <CompanySelectorLiquid
                companies={mockCompanies}
                currentCompany={currentCompany}
                onCompanyChange={onCompanyChange || (() => {})}
                size="md"
                fullWidth
              />
            </div>
            
            {/* Sélecteur de période - uniquement en comptabilité */}
            {isAccountingModule && (
              <>
                {/* Séparateur */}
                <div className="h-6 w-px bg-slate-200/30" />
                
                <div className="w-56">
                  <PeriodSelectorLiquid
                    size="md"
                    fullWidth
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          /* Sur mobile : indicateurs compacts */
          <div className="flex-1 flex items-center justify-center px-2">
            <div className="flex items-center gap-2">
              {/* Indicateur d'entreprise compact */}
              <button
                onClick={() => console.log('Open company selector')}
                className="flex items-center gap-1 px-2 py-1 rounded-full liquid-glass-primary liquid-glass-adaptive-text"
                style={{ minHeight: '32px', maxWidth: '120px' }}
              >
                <Building2 size={12} className="text-primary-600 flex-shrink-0" />
                <span className="truncate text-xs font-medium text-primary-700">
                  {currentCompany.name.length > 10 
                    ? currentCompany.name.substring(0, 10) + '...' 
                    : currentCompany.name
                  }
                </span>
              </button>
              
              {/* Indicateur de période compact - uniquement en comptabilité */}
              {isAccountingModule && (
                <button
                  onClick={() => console.log('Open period selector')}
                  className="flex items-center gap-1 px-2 py-1 rounded-full liquid-glass-success liquid-glass-adaptive-text"
                  style={{ minHeight: '32px', maxWidth: '80px' }}
                >
                  <Calendar size={12} className="text-emerald-600 flex-shrink-0" />
                  <span className="truncate text-xs font-medium text-emerald-700">
                    2025
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Partie droite */}
        <div className={`flex items-center ${isMobile ? 'gap-1 liquid-glass-mobile-spacing' : 'gap-2'}`}>
          {/* Mode Expert - caché sur très petit mobile */}
          {!isMobile && (
            <button
              onClick={toggleExpertMode}
              className={`
                rounded-lg transition-all duration-200 liquid-glass-touch-target
                ${expertMode 
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
                  : 'hover:bg-slate-100/50 text-slate-600'
                }
              `}
              style={{ 
                padding: isMobile ? '8px' : '8px 12px',
                minWidth: isMobile ? '36px' : 'auto',
                minHeight: isMobile ? '36px' : '36px'
              }}
            >
              {isMobile ? (
                <Sparkles size={16} />
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles size={16} />
                  <span className="text-sm font-medium">
                    {expertMode ? 'Expert' : 'Mode Expert'}
                  </span>
                </div>
              )}
            </button>
          )}
          
          {/* Chatbot */}
          <button
            onClick={onChatOpen}
            className="rounded-lg transition-all duration-200 liquid-glass-touch-target liquid-glass-primary"
            style={{
              padding: isMobile ? '8px' : '8px 12px',
              minWidth: isMobile ? '36px' : 'auto',
              minHeight: isMobile ? '36px' : '36px'
            }}
          >
            {isMobile ? (
              <MessageSquare size={16} className="text-primary-700" />
            ) : (
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-primary-700" />
                <span className="text-sm font-medium text-primary-700">Chat</span>
              </div>
            )}
          </button>
          
          {/* Menu utilisateur */}
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="p-1 rounded-lg hover:bg-slate-100/50 transition-colors liquid-glass-touch-target"
              style={{ 
                minWidth: isMobile ? '36px' : '40px', 
                minHeight: isMobile ? '36px' : '40px',
                padding: isMobile ? '2px' : '4px'
              }}
            >
              <div className={`${isMobile ? 'w-7 h-7 text-xs' : 'w-8 h-8 text-sm'} rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold`}>
                JD
              </div>
            </button>
            
            {/* Dropdown menu utilisateur */}
            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-64"
                  style={applyLiquidGlass('elevated')}
                >
                  <div className="rounded-xl overflow-hidden">
                    {/* Header du menu */}
                    <div className="px-4 py-3 border-b border-slate-200/50">
                      <p className="font-semibold text-slate-900">Jean Dupont</p>
                      <p className="text-sm text-slate-500">jean@techcorp.fr</p>
                    </div>
                    
                    {/* Options du menu */}
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50/80 transition-colors text-left">
                        <User size={16} className="text-slate-400" />
                        <span className="text-sm text-slate-700">Mon profil</span>
                      </button>
                      
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50/80 transition-colors text-left">
                        <Settings size={16} className="text-slate-400" />
                        <span className="text-sm text-slate-700">Paramètres</span>
                      </button>
                      
                      <div className="my-1 h-px bg-slate-200/50" />
                      
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50/80 transition-colors text-left">
                        <LogOut size={16} className="text-red-400" />
                        <span className="text-sm text-red-600">Déconnexion</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}