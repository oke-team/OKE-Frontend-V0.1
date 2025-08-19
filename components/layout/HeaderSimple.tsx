'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useExpertMode } from '@/contexts/ExpertModeContext';
import { CompanySelectorLiquid, Company } from '@/components/ui/CompanySelectorLiquid';
import { PeriodSelectorLiquid } from '@/components/ui/PeriodSelectorLiquid';
import { usePathname } from 'next/navigation';
import { TooltipSimple } from '@/components/ui/TooltipSimple';
import { SearchGlobal } from '@/components/ui/SearchGlobal';
import { useSelection } from '@/contexts/SelectionContext';
import { ContextualActionsMenu } from '@/components/ui/ContextualActionsMenu';
import {
  MessageSquare,
  Sparkles,
  Wand2,
  Settings,
  LogOut,
  User,
  Search,
  X,
  Rocket
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
  const { selectedCount } = useSelection();
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const actionsMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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
  
  const isAccountingModule = pathname?.includes('/accounting') || pathname?.includes('/compta');
  
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b-2 border-[#FAA016] z-50">
      <div className="flex items-center justify-between h-full px-3 sm:px-4 md:px-6">
        
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
            className="hidden sm:inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-lg transition-all duration-200 hover:scale-105"
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
        
        {/* Slogan avec fusée - visible uniquement sur desktop large */}
        <div className="hidden xl:flex items-center gap-2 ml-8 h-8">
          <span className="font-bold text-sm tracking-tight">
            <span style={{ color: '#4C34CE' }}>Une Super App</span>
            {' '}
            <span style={{ color: '#FAA016' }}>pour des Supers Entrepreneurs</span>
          </span>
          <div className="flex items-center">
            <Rocket 
              className="w-6 h-6 transform -rotate-45" 
              style={{ 
                fill: '#FAA016',
                stroke: '#4C34CE',
                strokeWidth: 1.5,
                filter: 'drop-shadow(0 2px 4px rgba(76, 52, 206, 0.3))'
              }} 
            />
          </div>
        </div>
        
        {/* Partie centrale : Sélecteurs alignés à gauche avec espacement */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1">
          {/* Utiliser le même sélecteur pour toutes les tailles d'écran */}
          <div className="flex items-center gap-3 sm:ml-4 md:ml-6 lg:ml-8">
            {/* Sélecteur d'entreprise */}
            <div className="w-full sm:w-auto sm:min-w-[200px] md:w-56">
              <CompanySelectorLiquid
                companies={mockCompanies}
                currentCompany={currentCompany}
                onCompanyChange={onCompanyChange || (() => {})}
                size="sm"
                fullWidth={false}
              />
            </div>
            
            {/* Sélecteur de période - uniquement sur desktop et dans le module accounting */}
            {!isMobile && isAccountingModule && (
              <>
                <div className="hidden sm:block h-5 w-px bg-gray-200" />
                <div className="w-48">
                  <PeriodSelectorLiquid
                    size="sm"
                    fullWidth
                  />
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Partie droite : Actions */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-2 flex-shrink-0">
          
          {/* Recherche globale - cachée sur mobile */}
          {!isMobile && (
            <TooltipSimple
              content="Rechercher dans toute l'application"
              position="bottom"
            >
              <button
                onClick={() => setSearchOpen(true)}
                className="w-8 h-8 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-600 hover:from-indigo-200 hover:to-violet-200 transition-all border border-[#FAA016]/50"
              >
                <Search size={16} className="lg:w-[18px] lg:h-[18px]" />
              </button>
            </TooltipSimple>
          )}
          
          {!isMobile && (
            <>
              <div className="hidden sm:block h-6 w-px bg-gray-200/50" />
              
              {/* Mode Expert - caché sur mobile */}
              <TooltipSimple
                content={expertMode 
                  ? "Mode Expert: Interface épurée sans aide contextuelle" 
                  : "Mode Entrepreneur: Aide et explications activées"
                }
                position="bottom"
              >
                <button
                  onClick={toggleExpertMode}
                  className={cn(
                    "w-8 h-8 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-lg transition-all border",
                    expertMode 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 border-[#FAA016]' 
                      : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 hover:from-purple-200 hover:to-pink-200 border-[#FAA016]/50'
                  )}
                >
                  <Sparkles size={16} className="lg:w-[18px] lg:h-[18px]" />
                </button>
              </TooltipSimple>
            </>
          )}
          
          {/* Actions Magiques - Assistant Contextuel */}
          <div ref={actionsMenuRef} className="relative">
            <TooltipSimple
              content={selectedCount > 0 ? `${selectedCount} éléments sélectionnés` : "Actions suggérées"}
              position="bottom"
            >
              <button
                onClick={() => {
                  setActionsMenuOpen(!actionsMenuOpen);
                  if (selectedCount > 0) {
                    onMagicActions?.();
                  }
                }}
                className={cn(
                  "relative flex items-center justify-center rounded-lg transition-all border border-[#FAA016]/50",
                  "bg-gradient-to-r from-violet-100 to-purple-100 text-violet-600 hover:from-violet-200 hover:to-purple-200",
                  isMobile ? "w-10 h-10" : "w-8 h-8 sm:w-8 sm:h-8 lg:w-9 lg:h-9"
                )}
              >
                <Wand2 size={isMobile ? 20 : 16} className="lg:w-[18px] lg:h-[18px]" />
                {selectedCount > 0 && (
                  <span className={cn(
                    "absolute bg-purple-600 text-white rounded-full flex items-center justify-center",
                    isMobile 
                      ? "-top-1.5 -right-1.5 w-5 h-5 text-xs" 
                      : "-top-1 -right-1 w-4 h-4 text-[10px]"
                  )}>
                    {selectedCount}
                  </span>
                )}
              </button>
            </TooltipSimple>
            
            {/* Menu contextuel */}
            <ContextualActionsMenu
              isOpen={actionsMenuOpen}
              onClose={() => setActionsMenuOpen(false)}
              selectedCount={selectedCount}
              isMobile={isMobile}
              onSearchOpen={() => setSearchOpen(true)}
              onLettrage={() => {
                console.log('Lettrage depuis header');
                alert(`Lettrage de ${selectedCount} écritures`);
              }}
              onRapprochement={() => {
                console.log('Rapprochement depuis header');
                alert(`Rapprochement de ${selectedCount} écritures`);
              }}
              onValidation={() => {
                console.log('Validation depuis header');
                alert(`Validation de ${selectedCount} écritures`);
              }}
              onExport={() => {
                console.log('Export depuis header');
                alert(`Export de ${selectedCount} écritures`);
              }}
              onReclassement={() => {
                console.log('Reclassement depuis header');
                alert(`Reclassement de ${selectedCount} écritures`);
              }}
            />
          </div>
          
          {/* Chat */}
          <TooltipSimple
            content="Assistant IA pour vous aider"
            position="bottom"
          >
            <button
              onClick={onChatOpen}
              className={cn(
                "flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 hover:from-blue-200 hover:to-cyan-200 transition-all border border-[#FAA016]/50",
                isMobile ? "w-10 h-10" : "w-8 h-8 sm:w-8 sm:h-8 lg:w-9 lg:h-9"
              )}
            >
              <MessageSquare size={isMobile ? 20 : 16} className="lg:w-[18px] lg:h-[18px]" />
            </button>
          </TooltipSimple>
          
          {/* Avatar Utilisateur */}
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={cn(
                "flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white font-semibold shadow-lg shadow-fuchsia-500/30 hover:shadow-xl hover:shadow-fuchsia-500/40 transition-all",
                isMobile 
                  ? "w-10 h-10 text-sm" 
                  : "w-8 h-8 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-xs lg:text-sm"
              )}
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
                  {/* Header du menu avec croix de fermeture */}
                  <div className="px-4 py-3 border-b border-gray-200/50 bg-gray-50 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Jean Dupont</p>
                      <p className="text-sm text-gray-500">jean@techcorp.fr</p>
                    </div>
                    <button
                      onClick={() => setUserMenuOpen(false)}
                      className="p-1 hover:bg-gray-200/50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
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