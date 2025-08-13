'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExpertMode } from '@/contexts/ExpertModeContext';
import { CompanySelectorLiquid, Company } from '@/components/ui/CompanySelectorLiquid';
import { PeriodSelectorLiquid } from '@/components/ui/PeriodSelectorLiquid';
import { CompanySelectorMobile } from '@/components/ui/CompanySelectorMobile';
import { PeriodSelectorMobile } from '@/components/ui/PeriodSelectorMobile';
import { usePathname } from 'next/navigation';
import { TooltipSimple } from '@/components/ui/TooltipSimple';
import { SearchGlobal } from '@/components/ui/SearchGlobal';
import {
  MessageSquare,
  Sparkles,
  Wand2,
  Settings,
  LogOut,
  User,
  Search
} from 'lucide-react';
import Image from 'next/image';

interface HeaderSimpleProps {
  currentCompany?: Company;
  onCompanyChange?: (company: Company) => void;
  onChatOpen?: () => void;
  onMagicActions?: () => void;
}

const mockCompanies: Company[] = [
  { id: '1', name: 'TechCorp SAS', plan: 'pro', country: 'FR', currency: 'EUR' },
  { id: '2', name: 'Design Studio', plan: 'starter', country: 'FR', currency: 'EUR' },
  { id: '3', name: 'Global Industries', plan: 'enterprise', country: 'US', currency: 'USD' }
];

export default function HeaderSimple({
  currentCompany = mockCompanies[0],
  onCompanyChange,
  onChatOpen,
  onMagicActions
}: HeaderSimpleProps) {
  const { expertMode, toggleExpertMode } = useExpertMode();
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const isAccountingModule = pathname?.includes('/accounting') || pathname?.includes('/compta');
  
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-gray-200/50 z-50">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        
        {/* Partie gauche : Logo + Badge Version */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Image
            src="/logo_oke_original.png"
            alt="Oké"
            width={100}
            height={35}
            className="h-8 md:h-9 w-auto"
            priority
          />
          <span 
            className="hidden md:inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(76, 52, 206, 0.08) 0%, rgba(250, 160, 22, 0.08) 100%)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(76, 52, 206, 0.2)',
              color: '#4C34CE',
              boxShadow: '0 2px 8px rgba(76, 52, 206, 0.1)',
            }}
          >
            V 0.1
          </span>
        </div>
        
        {/* Partie centrale : Sélecteurs */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-[45%] sm:max-w-[60%] lg:max-w-none lg:justify-center">
          {/* Version mobile : sélecteurs compacts */}
          <div className="lg:hidden flex items-center gap-2 w-full">
            <div className="flex-shrink-0">
              <CompanySelectorMobile
                companies={mockCompanies}
                currentCompany={currentCompany}
                onCompanyChange={onCompanyChange || (() => {})}
                size="sm"
                compact={true}
              />
            </div>
            {isAccountingModule && (
              <div className="flex-shrink-0">
                <PeriodSelectorMobile
                  size="sm"
                  compact={true}
                />
              </div>
            )}
          </div>
          
          {/* Version desktop : sélecteurs complets */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Sélecteur d'entreprise */}
            <div className="w-56">
              <CompanySelectorLiquid
                companies={mockCompanies}
                currentCompany={currentCompany}
                onCompanyChange={onCompanyChange || (() => {})}
                size="sm"
                fullWidth
              />
            </div>
            
            {/* Sélecteur de période ou espace réservé */}
            <div className="hidden sm:block h-5 w-px bg-gray-200" />
            <div className="w-48">
              {isAccountingModule ? (
                <PeriodSelectorLiquid
                  size="sm"
                  fullWidth
                />
              ) : (
                <div className="h-8" />
              )}
            </div>
          </div>
        </div>
        
        {/* Partie droite : Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 flex-shrink-0">
          
          {/* Recherche globale */}
          <TooltipSimple
            content="Rechercher dans toute l'application"
            position="bottom"
          >
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 sm:p-1.5 lg:p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <Search size={16} className="lg:w-[18px] lg:h-[18px]" />
            </button>
          </TooltipSimple>
          
          <div className="hidden sm:block h-5 w-px bg-gray-200" />
          
          {/* Mode Expert */}
          <TooltipSimple
            content={expertMode 
              ? "Mode Expert: Interface épurée sans aide contextuelle" 
              : "Mode Entrepreneur: Aide et explications activées"
            }
            position="bottom"
          >
            <button
              onClick={toggleExpertMode}
              className={`p-1.5 sm:p-1.5 lg:p-2 rounded-lg transition-all ${
                expertMode 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Sparkles size={16} className="lg:w-[18px] lg:h-[18px]" />
            </button>
          </TooltipSimple>
          
          {/* Actions Magiques */}
          <TooltipSimple
            content="Actions rapides et automatisations"
            position="bottom"
          >
            <button
              onClick={onMagicActions}
              className="p-1.5 sm:p-1.5 lg:p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
            >
              <Wand2 size={16} className="lg:w-[18px] lg:h-[18px]" />
            </button>
          </TooltipSimple>
          
          {/* Chat */}
          <TooltipSimple
            content="Assistant IA pour vous aider"
            position="bottom"
          >
            <button
              onClick={onChatOpen}
              className="p-1.5 sm:p-1.5 lg:p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
            >
              <MessageSquare size={16} className="lg:w-[18px] lg:h-[18px]" />
            </button>
          </TooltipSimple>
          
          {/* Avatar Utilisateur */}
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs lg:text-sm font-semibold hover:shadow-lg transition-shadow"
            >
              JD
            </button>
            
            {/* Menu Utilisateur */}
            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200/50 overflow-hidden"
                >
                  {/* Header du menu */}
                  <div className="px-4 py-3 border-b border-gray-200/50 bg-gray-50">
                    <p className="font-semibold text-gray-900">Jean Dupont</p>
                    <p className="text-sm text-gray-500">jean@techcorp.fr</p>
                  </div>
                  
                  {/* Options du menu */}
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <User size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-700">Mon profil</span>
                    </button>
                    
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <Settings size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-700">Paramètres</span>
                    </button>
                    
                    <div className="my-1 h-px bg-gray-200/50" />
                    
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-left">
                      <LogOut size={16} className="text-red-400" />
                      <span className="text-sm text-red-600">Déconnexion</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Search Global Overlay */}
      <SearchGlobal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}