'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useExpertMode } from '@/contexts/ExpertModeContext';
import { CompanySelectorLiquid, Company } from '@/components/ui/CompanySelectorLiquid';
import { PeriodSelectorLiquid } from '@/components/ui/PeriodSelectorLiquid';
import { usePathname } from 'next/navigation';
import { TooltipSimple } from '@/components/ui/TooltipSimple';
import { SearchGlobal } from '@/components/ui/SearchGlobal';
import { useSelection } from '@/contexts/SelectionContext';
import { ContextualActionsMenu } from '@/components/ui/ContextualActionsMenu';
import AvatarDropdown from '@/components/ui/AvatarDropdown';
import {
  MessageSquare,
  Sparkles,
  Wand2,
  Search,
  Rocket,
  GraduationCap,
  User
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
  const { user, logout } = useAuth();
  const { expertMode, toggleExpertMode } = useExpertMode();
  const { selectedCount } = useSelection();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const actionsMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
            {/* Sélecteur d'entreprise - largeur réduite sur mobile */}
            <div className={cn(
              "transition-all",
              isMobile ? "w-[140px] max-w-[140px]" : "sm:w-auto sm:min-w-[200px] md:w-56"
            )}>
              <CompanySelectorLiquid
                companies={mockCompanies}
                currentCompany={currentCompany}
                onCompanyChange={onCompanyChange || (() => {})}
                size={isMobile ? "sm" : "sm"}
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
              
              {/* Mode Expert/Entrepreneur avec icônes différentes */}
              <TooltipSimple
                content={expertMode 
                  ? "Mode Expert: Fonctionnalités avancées" 
                  : "Mode Entrepreneur: Gestion sans formation comptable"
                }
                position="bottom"
              >
                <button
                  onClick={toggleExpertMode}
                  className={cn(
                    "w-8 h-8 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-lg transition-all",
                    expertMode 
                      ? 'bg-[#4C34CE] text-white shadow-lg border border-[#4C34CE]' 
                      : 'bg-gradient-to-r from-purple-100 to-pink-100 text-[#4C34CE] hover:from-purple-200 hover:to-pink-200 border border-[#FAA016]/50'
                  )}
                >
                  {expertMode ? (
                    <GraduationCap size={16} className="lg:w-[18px] lg:h-[18px]" />
                  ) : (
                    <User size={16} className="lg:w-[18px] lg:h-[18px]" />
                  )}
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
          
          {/* Avatar Utilisateur avec nouveau composant */}
          <AvatarDropdown
            user={{
              name: user?.full_name || user?.email?.split('@')[0] || 'Utilisateur',
              email: user?.email || '',
              initials: user?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 
                       user?.email?.substring(0, 2).toUpperCase() || 'U',
              role: 'Administrateur',
              company: currentCompany.name
            }}
            onSignOut={async () => {
              console.log('Déconnexion en cours...');
              await logout();
            }}
          />
        </div>
      </div>
      
      {/* Search Global Overlay */}
      <SearchGlobal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}