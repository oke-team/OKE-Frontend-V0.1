'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExpertMode } from '@/contexts/ExpertModeContext';
import { CompanySelector, Company } from '@/components/ui/CompanySelector';
import { PeriodSelector } from '@/components/ui/PeriodSelector';
import CompanySelectorMobile from '@/components/ui/CompanySelectorMobile';
import PeriodSelectorMobile from '@/components/ui/PeriodSelectorMobile';
import useVirtualKeyboard from '@/hooks/useVirtualKeyboard';
import { usePathname } from 'next/navigation';
import {
  MessageSquare,
  Wand2,
  User,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Building2,
  Calendar,
  X,
  Menu,
  Settings
} from 'lucide-react';
import Image from 'next/image';

interface HeaderMobileOptimizedProps {
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

export default function HeaderMobileOptimized({
  currentCompany = mockCompanies[0],
  onCompanyChange,
  onChatOpen,
  onMenuToggle,
  activeModule = 'dashboard'
}: HeaderMobileOptimizedProps) {
  const { expertMode, toggleExpertMode } = useExpertMode();
  const pathname = usePathname();
  const { isVisible: keyboardVisible, height: keyboardHeight, adjustedViewportHeight } = useVirtualKeyboard();
  
  // États pour gérer l'interface
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSelectorMode, setIsSelectorMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  
  const headerRef = useRef<HTMLElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // Détection de la taille d'écran
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Gestion des clics extérieurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fermeture automatique du header étendu quand le clavier apparaît
  useEffect(() => {
    if (keyboardVisible && isExpanded) {
      setIsExpanded(false);
      setIsSelectorMode(false);
    }
  }, [keyboardVisible, isExpanded]);

  // Détermine si on est dans le module comptabilité
  const isAccountingModule = pathname?.includes('/accounting');
  const isCompact = screenSize.width < 375;
  const isVerySmall = screenSize.width < 320;
  
  // Calculs responsifs
  const headerHeight = isExpanded ? 'auto' : (isCompact ? '52px' : '56px');
  const logoSize = isVerySmall ? { width: 80, height: 28 } : { width: 100, height: 32 };
  
  // Styles adaptatifs avec gestion du clavier virtuel
  const headerStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: keyboardVisible ? 60 : 50, // Z-index plus élevé quand le clavier est visible
    height: headerHeight,
    minHeight: isCompact ? '52px' : '56px',
    backgroundColor: keyboardVisible 
      ? 'rgba(255, 255, 255, 0.98)' // Plus opaque quand le clavier est visible
      : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px) saturate(150%)',
    WebkitBackdropFilter: 'blur(20px) saturate(150%)',
    borderBottom: '1px solid rgba(229, 231, 235, 0.3)',
    boxShadow: keyboardVisible 
      ? '0 2px 8px 0 rgba(0, 0, 0, 0.12)' // Ombre plus marquée avec clavier
      : '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    // Support du safe area iOS
    paddingTop: 'env(safe-area-inset-top, 0)',
    // Réduction automatique si clavier visible et header étendu
    transform: keyboardVisible && isExpanded ? 'translateY(-20px)' : 'none',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    padding: '0 12px',
    gap: isExpanded ? '12px' : '0'
  };

  const mainRowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: isCompact ? '52px' : '56px',
    minHeight: isCompact ? '52px' : '56px',
    gap: '8px'
  };

  // Bouton tactile optimisé (44x44px minimum)
  const touchButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '44px',
    minHeight: '44px',
    padding: '8px',
    borderRadius: '12px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    fontSize: '14px',
    fontWeight: 500,
  };

  const primaryButtonStyle = {
    ...touchButtonStyle,
    background: 'linear-gradient(135deg, #5e72ff 0%, #d150da 100%)',
    color: 'white',
    boxShadow: '0 2px 8px rgba(94, 114, 255, 0.25)',
    minWidth: isCompact ? '44px' : '52px',
  };

  const compactButtonStyle = {
    ...touchButtonStyle,
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
    border: '1px solid rgba(226, 232, 240, 0.6)',
    color: '#475569',
  };

  return (
    <header ref={headerRef} style={headerStyle}>
      <div style={containerStyle}>
        {/* Ligne principale */}
        <div style={mainRowStyle}>
          {/* Gauche : Menu + Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '0 0 auto' }}>
            {/* Bouton Menu */}
            <button
              onClick={onMenuToggle}
              style={touchButtonStyle}
              onTouchStart={(e) => e.currentTarget.style.backgroundColor = 'rgba(241, 245, 249, 0.8)'}
              onTouchEnd={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Menu size={20} />
            </button>
            
            {/* Logo adaptatif */}
            <Image
              src="/logo_oke_original.png"
              alt="Oké"
              width={logoSize.width}
              height={logoSize.height}
              style={{ 
                height: `${logoSize.height}px`, 
                width: 'auto',
                maxWidth: isVerySmall ? '80px' : '100px'
              }}
            />
          </div>

          {/* Centre : Indicateur contextuel compact */}
          <div style={{ 
            flex: '1 1 auto', 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: 0 
          }}>
            {isAccountingModule && !isExpanded && (
              <button
                onClick={() => setIsSelectorMode(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  backgroundColor: 'rgba(34, 197, 94, 0.08)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#16a34a',
                  maxWidth: '120px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap' as const,
                  textOverflow: 'ellipsis'
                }}
              >
                <Calendar size={12} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>2025</span>
                <ChevronDown size={10} />
              </button>
            )}
            
            {!isAccountingModule && !isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  backgroundColor: 'rgba(94, 114, 255, 0.08)',
                  border: '1px solid rgba(94, 114, 255, 0.2)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#5e72ff',
                  maxWidth: '100px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap' as const,
                  textOverflow: 'ellipsis'
                }}
              >
                <Building2 size={12} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentCompany.name.length > 8 
                    ? currentCompany.name.substring(0, 8) + '...' 
                    : currentCompany.name
                  }
                </span>
                <ChevronDown size={10} />
              </button>
            )}
          </div>

          {/* Droite : Actions principales */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            flex: '0 0 auto'
          }}>
            {/* Mode Expert compact */}
            <button
              onClick={toggleExpertMode}
              style={{
                ...touchButtonStyle,
                backgroundColor: expertMode 
                  ? 'linear-gradient(135deg, #5e72ff 0%, #d150da 100%)'
                  : 'rgba(248, 250, 252, 0.8)',
                background: expertMode 
                  ? 'linear-gradient(135deg, #5e72ff 0%, #d150da 100%)'
                  : 'rgba(248, 250, 252, 0.8)',
                color: expertMode ? 'white' : '#64748b',
                border: expertMode ? 'none' : '1px solid rgba(226, 232, 240, 0.6)',
                minWidth: '44px',
                fontSize: '10px',
                fontWeight: 700,
                padding: '6px'
              }}
            >
              {expertMode ? <Sparkles size={16} /> : <span>OFF</span>}
            </button>

            {/* Chatbot */}
            <button
              onClick={onChatOpen}
              style={primaryButtonStyle}
            >
              <MessageSquare size={18} />
            </button>

            {/* Menu utilisateur */}
            <div ref={userMenuRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={touchButtonStyle}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #5e72ff 0%, #d150da 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  JD
                </div>
              </button>

              {/* Menu utilisateur simplifié */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '8px',
                      width: '240px',
                      backgroundColor: 'rgba(255, 255, 255, 0.98)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(229, 231, 235, 0.3)',
                      borderRadius: '16px',
                      padding: '12px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                      zIndex: 60
                    }}
                  >
                    <div style={{ padding: '8px', borderBottom: '1px solid rgba(229, 231, 235, 0.3)' }}>
                      <p style={{ fontWeight: 600, margin: 0, fontSize: '14px' }}>Jean Dupont</p>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>jean@techcorp.fr</p>
                    </div>
                    
                    <div style={{ padding: '8px 0' }}>
                      <button style={{
                        ...touchButtonStyle,
                        width: '100%',
                        justifyContent: 'flex-start',
                        gap: '12px',
                        padding: '12px',
                        fontSize: '14px'
                      }}>
                        <Settings size={16} />
                        <span>Paramètres</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bouton d'expansion/collapse */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                ...compactButtonStyle,
                backgroundColor: isExpanded ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.08)',
                borderColor: isExpanded ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                color: isExpanded ? '#dc2626' : '#16a34a',
                minWidth: '44px'
              }}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* Zone étendue : Sélecteurs complets */}
        <AnimatePresence>
          {(isExpanded || isSelectorMode) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{
                overflow: 'hidden',
                paddingBottom: '12px',
                borderTop: '1px solid rgba(229, 231, 235, 0.3)'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                paddingTop: '12px'
              }}>
                {/* Ligne des sélecteurs */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isAccountingModule ? '1fr 1fr' : '1fr',
                  gap: '12px'
                }}>
                  {/* Sélecteur de société - Touch friendly */}
                  <CompanySelectorMobile
                    companies={mockCompanies}
                    currentCompany={currentCompany}
                    onCompanyChange={onCompanyChange || (() => {})}
                    size="md"
                  />

                  {/* Sélecteur de période - Uniquement en comptabilité */}
                  {isAccountingModule && (
                    <PeriodSelectorMobile
                      size="md"
                    />
                  )}
                </div>

                {/* Actions rapides */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap' as const
                }}>
                  <button
                    style={{
                      ...touchButtonStyle,
                      backgroundColor: 'rgba(209, 80, 218, 0.08)',
                      border: '1px solid rgba(209, 80, 218, 0.2)',
                      color: '#d150da',
                      gap: '8px',
                      padding: '12px 16px',
                      fontSize: '13px'
                    }}
                  >
                    <Wand2 size={16} />
                    <span>Actions</span>
                  </button>

                  {/* Bouton de fermeture */}
                  <button
                    onClick={() => {
                      setIsExpanded(false);
                      setIsSelectorMode(false);
                    }}
                    style={{
                      ...touchButtonStyle,
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      color: '#dc2626',
                      marginLeft: 'auto'
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay pour fermer les menus */}
      <AnimatePresence>
        {(isExpanded || isSelectorMode || userMenuOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              zIndex: 30
            }}
            onClick={() => {
              setIsExpanded(false);
              setIsSelectorMode(false);
              setUserMenuOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </header>
  );
}