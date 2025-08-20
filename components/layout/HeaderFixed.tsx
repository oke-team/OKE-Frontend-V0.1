'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExpertMode } from '@/contexts/ExpertModeContext';
import ModeTooltip from '@/components/ui/ModeTooltip';
import { CompanySelector } from '@/components/ui/CompanySelector';
import { PeriodSelector } from '@/components/ui/PeriodSelector';
import { usePathname } from 'next/navigation';
import {
  Building2,
  ChevronDown,
  Plus,
  Settings,
  User,
  LogOut,
  MessageSquare,
  HelpCircle,
  Users,
  Shield,
  Wrench,
  Wand2,
  Sparkles,
  FileText,
  Receipt,
  TrendingUp,
  BarChart3,
  Package,
  Send,
  Download,
  Upload,
  Calendar,
  Calculator
} from 'lucide-react';
import Image from 'next/image';

interface Company {
  id: string;
  name: string;
  logo?: string;
  plan: 'starter' | 'pro' | 'enterprise';
  country?: string;
  currency?: string;
}

interface HeaderProps {
  currentCompany?: Company;
  onCompanyChange?: (company: Company) => void;
  onChatOpen?: () => void;
  activeModule?: string;
}

const mockCompanies: Company[] = [
  { id: '1', name: 'TechCorp SAS', plan: 'pro', country: 'FR', currency: 'EUR' },
  { id: '2', name: 'Design Studio', plan: 'starter', country: 'FR', currency: 'EUR' },
  { id: '3', name: 'Global Industries', plan: 'enterprise', country: 'US', currency: 'USD' },
  { id: '4', name: 'StartUp Innovation', plan: 'starter', country: 'UK', currency: 'GBP' }
];

// Actions contextuelles par module
const moduleActions: Record<string, Array<{icon: React.ReactNode, label: string, action: string}>> = {
  dashboard: [
    { icon: <FileText size={16} />, label: 'Générer rapport', action: 'report' },
    { icon: <Download size={16} />, label: 'Exporter données', action: 'export' },
    { icon: <Calendar size={16} />, label: 'Planifier', action: 'schedule' }
  ],
  banking: [
    { icon: <Upload size={16} />, label: 'Importer relevé', action: 'import' },
    { icon: <Calculator size={16} />, label: 'Rapprocher', action: 'reconcile' },
    { icon: <Send size={16} />, label: 'Virement', action: 'transfer' }
  ],
  purchases: [
    { icon: <Receipt size={16} />, label: 'Scanner facture', action: 'scan' },
    { icon: <FileText size={16} />, label: 'Nouvelle facture', action: 'new' },
    { icon: <Package size={16} />, label: 'Bon de commande', action: 'order' }
  ],
  sales: [
    { icon: <FileText size={16} />, label: 'Créer facture', action: 'invoice' },
    { icon: <TrendingUp size={16} />, label: 'Devis', action: 'quote' },
    { icon: <BarChart3 size={16} />, label: 'Statistiques', action: 'stats' }
  ]
};

export default function HeaderFixed({
  currentCompany = mockCompanies[0],
  onCompanyChange,
  onChatOpen,
  activeModule = 'dashboard'
}: HeaderProps) {
  const { expertMode, toggleExpertMode, resetOnboarding } = useExpertMode();
  const pathname = usePathname();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [actionsDropdownOpen, setActionsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [showOnboardingBadge, setShowOnboardingBadge] = useState(false);
  
  const userRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  
  // Gestion du raccourci clavier global
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + E pour basculer le mode
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        toggleExpertMode();
      }
      
      // Ctrl/Cmd + H pour afficher l'aide (réinitialiser l'onboarding)
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        resetOnboarding();
      }
      
      // Escape pour fermer tous les dropdowns
      if (e.key === 'Escape') {
        setUserDropdownOpen(false);
        setActionsDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleExpertMode, resetOnboarding]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsCompact(window.innerWidth < 1200);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Check onboarding status on client side only
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      setShowOnboardingBadge(!localStorage.getItem('onboardingCompleted'));
    }
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
        setActionsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const actions = moduleActions[activeModule] || moduleActions.dashboard;

  const headerStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 40,
    height: '4rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderBottom: '1px solid rgba(229, 229, 229, 0.3)'
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.5rem',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
    fontSize: '14px',
    fontWeight: 500
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #5e72ff 0%, #d150da 100%)',
    color: 'white',
    boxShadow: '0 2px 8px rgba(94, 114, 255, 0.25)'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgba(229, 229, 229, 0.5)',
    color: '#171717'
  };

  const dropdownStyle = {
    position: 'absolute' as const,
    top: 'calc(100% + 8px)',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(229, 229, 229, 0.3)',
    borderRadius: '0.75rem',
    padding: '0.5rem',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
    minWidth: '14rem',
    zIndex: 50
  };

  return (
    <header style={headerStyle}>
      <div style={{ height: '100%', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo + Company Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem' }}>
          <Image
            src="/logo_oke_original.png"
            alt="OKE"
            width={120}
            height={40}
            style={{ height: isMobile ? '2rem' : '2.25rem', width: 'auto' }}
          />
          
          {/* Company Selector - Desktop */}
          {!isMobile && (
            <div style={{ position: 'relative' }}>
              <CompanySelector
                companies={mockCompanies}
                currentCompany={currentCompany}
                onCompanyChange={onCompanyChange || (() => {})}
                size="sm"
              />

              <AnimatePresence>
                {companyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{ ...dropdownStyle, left: 0, minWidth: '250px' }}
                  >
                    {mockCompanies.map((company) => (
                      <button
                        key={company.id}
                        onClick={() => {
                          onCompanyChange?.(company);
                          setCompanyDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.625rem',
                          borderRadius: '0.375rem',
                          backgroundColor: currentCompany.id === company.id ? 'rgba(94, 114, 255, 0.08)' : 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s'
                        }}
                        onMouseEnter={(e) => {
                          if (currentCompany.id !== company.id) {
                            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentCompany.id !== company.id) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                          <Building2 size={16} style={{ color: currentCompany.id === company.id ? '#5e72ff' : '#666' }} />
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '14px', fontWeight: 500 }}>{company.name}</div>
                            <div style={{ fontSize: '11px', color: '#888' }}>{company.country} · {company.currency}</div>
                          </div>
                        </div>
                        <span style={{ 
                          fontSize: '10px', 
                          padding: '2px 6px', 
                          borderRadius: '9999px', 
                          backgroundColor: currentCompany.id === company.id ? 'rgba(94, 114, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)',
                          color: currentCompany.id === company.id ? '#5e72ff' : '#666',
                          textTransform: 'uppercase',
                          fontWeight: 600
                        }}>
                          {company.plan}
                        </span>
                      </button>
                    ))}
                    
                    <div style={{ borderTop: '1px solid rgba(229, 229, 229, 0.3)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                      <button style={{
                        ...buttonStyle,
                        width: '100%',
                        justifyContent: 'flex-start',
                        backgroundColor: 'transparent',
                        color: '#5e72ff'
                      }}>
                        <Plus size={16} />
                        <span>Ajouter une entreprise</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile Company Selector */}
          {isMobile && (
            <div ref={companyRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.375rem 0.625rem',
                  backgroundColor: 'rgba(94, 114, 255, 0.08)',
                  borderRadius: '0.375rem',
                  border: '1px solid rgba(94, 114, 255, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                <Building2 size={14} style={{ color: '#5e72ff' }} />
                <span style={{ 
                  fontSize: '12px', 
                  color: '#5e72ff',
                  fontWeight: 600,
                  maxWidth: '100px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {currentCompany.name}
                </span>
                <ChevronDown size={14} style={{ 
                  color: '#5e72ff',
                  transform: companyDropdownOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s'
                }} />
              </button>

              <AnimatePresence>
                {companyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{ 
                      ...dropdownStyle, 
                      left: 0,
                      minWidth: '200px',
                      marginTop: '0.5rem'
                    }}
                  >
                    {mockCompanies.map((company) => (
                      <button
                        key={company.id}
                        onClick={() => {
                          onCompanyChange?.(company);
                          setCompanyDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.5rem',
                          borderRadius: '0.375rem',
                          backgroundColor: currentCompany.id === company.id ? 'rgba(94, 114, 255, 0.08)' : 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s'
                        }}
                        onMouseEnter={(e) => {
                          if (currentCompany.id !== company.id) {
                            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentCompany.id !== company.id) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Building2 size={14} />
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '13px', fontWeight: 500 }}>{company.name}</div>
                            <div style={{ fontSize: '10px', color: '#888' }}>{company.country} · {company.currency}</div>
                          </div>
                        </div>
                        <span style={{ 
                          fontSize: '10px', 
                          padding: '2px 5px', 
                          borderRadius: '9999px', 
                          backgroundColor: currentCompany.id === company.id ? 'rgba(94, 114, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)',
                          color: currentCompany.id === company.id ? '#5e72ff' : '#666',
                          textTransform: 'uppercase',
                          fontWeight: 600
                        }}>
                          {company.plan}
                        </span>
                      </button>
                    ))}
                    
                    <div style={{ borderTop: '1px solid rgba(229, 229, 229, 0.3)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                      <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        width: '100%',
                        padding: '0.5rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#5e72ff',
                        transition: 'background-color 0.15s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(94, 114, 255, 0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Plus size={14} />
                        <span>Ajouter une entreprise</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          
          {/* Period Selector - Next to company selector */}
          {pathname?.includes('/accounting') && !isMobile && (
            <>
              <div style={{
                width: '1px',
                height: '24px',
                backgroundColor: 'rgba(229, 229, 229, 0.4)',
                margin: '0 1rem'
              }} />
              <PeriodSelectorGlass aligned />
            </>
          )}
        </div>

        {/* Spacer for right alignment */}
        <div className="flex-1"></div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Expert Mode Toggle - Version compacte */}
          <ModeTooltip isExpertMode={expertMode}>
            <motion.button
              onClick={toggleExpertMode}
              aria-label={`Mode ${expertMode ? 'expert' : 'entrepreneur'} activé`}
              aria-pressed={expertMode}
              role="switch"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: isMobile ? '0.25rem 0.5rem' : '0.375rem 0.75rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: expertMode 
                  ? 'linear-gradient(135deg, #5e72ff 0%, #d150da 100%)'
                  : '#f5f5f5',
                background: expertMode 
                  ? 'linear-gradient(135deg, #5e72ff 0%, #d150da 100%)'
                  : '#f5f5f5',
                color: expertMode ? '#ffffff' : '#737373',
                fontSize: isMobile ? '11px' : '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {expertMode ? (
                <>
                  <Sparkles size={isMobile ? 12 : 14} />
                  {!isMobile && <span>EXPERT</span>}
                </>
              ) : (
                <span style={{ padding: '0 2px' }}>{isMobile ? 'OFF' : 'SIMPLE'}</span>
              )}
            </motion.button>
          </ModeTooltip>

          {/* AI Chatbot */}
          <button
            onClick={onChatOpen}
            style={{
              ...primaryButtonStyle,
              padding: isMobile ? '0.5rem' : '0.5rem 0.75rem'
            }}
          >
            <MessageSquare size={16} />
            {!isMobile && !isCompact && <span style={{ fontSize: '13px' }}>Chatbot</span>}
          </button>

          {/* Magic Actions Button */}
          <div ref={actionsRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setActionsDropdownOpen(!actionsDropdownOpen)}
              style={{
                ...secondaryButtonStyle,
                padding: isMobile ? '0.5rem' : '0.5rem 0.75rem',
                borderColor: actionsDropdownOpen ? 'rgba(209, 80, 218, 0.3)' : 'rgba(229, 229, 229, 0.5)',
                backgroundColor: actionsDropdownOpen ? 'rgba(209, 80, 218, 0.05)' : 'rgba(255, 255, 255, 0.9)'
              }}
            >
              <Wand2 size={16} style={{ color: '#d150da' }} />
              {!isMobile && !isCompact && <span style={{ fontSize: '13px' }}>Actions</span>}
            </button>

            <AnimatePresence>
              {actionsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  style={{ ...dropdownStyle, right: 0, minWidth: '200px' }}
                >
                  <div style={{ padding: '0.25rem 0.5rem', marginBottom: '0.25rem' }}>
                    <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', fontWeight: 600 }}>
                      Actions - {activeModule}
                    </p>
                  </div>
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        console.log(`Action: ${action.action}`);
                        setActionsDropdownOpen(false);
                      }}
                      style={{
                        ...buttonStyle,
                        width: '100%',
                        justifyContent: 'flex-start',
                        backgroundColor: 'transparent',
                        padding: '0.5rem 0.75rem'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(209, 80, 218, 0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {action.icon}
                      <span style={{ fontSize: '14px' }}>{action.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Avatar */}
          <div ref={userRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              style={{ 
                padding: '0.375rem',
                borderRadius: '0.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{ 
                width: '2rem', 
                height: '2rem', 
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #5e72ff 0%, #d150da 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '13px',
                fontWeight: 600
              }}>
                JD
              </div>
            </button>

            <AnimatePresence>
              {userDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ ...dropdownStyle, right: 0 }}
                >
                  <div style={{ padding: '0.75rem', borderBottom: '1px solid rgba(229, 229, 229, 0.3)' }}>
                    <p style={{ fontWeight: 600, margin: 0, fontSize: '14px' }}>Jean Dupont</p>
                    <p style={{ fontSize: '12px', color: '#666', margin: '2px 0 0 0' }}>jean@techcorp.fr</p>
                  </div>
                  
                  <div style={{ padding: '0.25rem 0' }}>
                    <button style={{ ...buttonStyle, width: '100%', justifyContent: 'flex-start', backgroundColor: 'transparent', fontSize: '13px' }}>
                      <User size={16} />
                      <span>Paramètres utilisateur</span>
                    </button>
                    
                    <button style={{ ...buttonStyle, width: '100%', justifyContent: 'flex-start', backgroundColor: 'transparent', fontSize: '13px' }}>
                      <Settings size={16} />
                      <span>Paramètres application</span>
                    </button>
                    
                    {expertMode && (
                      <button style={{ ...buttonStyle, width: '100%', justifyContent: 'flex-start', backgroundColor: 'transparent', fontSize: '13px' }}>
                        <Wrench size={16} />
                        <span>Paramètres backoffice</span>
                        <span style={{ 
                          fontSize: '10px', 
                          padding: '2px 6px', 
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          color: '#ef4444',
                          marginLeft: 'auto',
                          fontWeight: 600
                        }}>
                          ADMIN
                        </span>
                      </button>
                    )}
                  </div>
                  
                  <div style={{ borderTop: '1px solid rgba(229, 229, 229, 0.3)', paddingTop: '0.25rem' }}>
                    <button style={{ ...buttonStyle, width: '100%', justifyContent: 'flex-start', backgroundColor: 'transparent', fontSize: '13px' }}>
                      <Users size={16} />
                      <span>Inviter un utilisateur</span>
                    </button>
                    
                    <button 
                      onClick={resetOnboarding}
                      style={{ ...buttonStyle, width: '100%', justifyContent: 'flex-start', backgroundColor: 'transparent', fontSize: '13px' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(94, 114, 255, 0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <HelpCircle size={16} />
                      <span>Aide & Support</span>
                      <span style={{ 
                        fontSize: '10px', 
                        padding: '2px 6px', 
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(94, 114, 255, 0.1)',
                        color: '#5e72ff',
                        marginLeft: 'auto',
                        fontWeight: 600
                      }}>
                        Ctrl+H
                      </span>
                    </button>
                    
                    <button 
                      style={{ 
                        ...buttonStyle, 
                        width: '100%', 
                        justifyContent: 'flex-start', 
                        backgroundColor: 'transparent',
                        color: '#ef4444',
                        fontSize: '13px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LogOut size={16} />
                      <span>Déconnexion</span>
                    </button>
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