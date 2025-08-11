'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  ChevronDown,
  Plus,
  Settings,
  User,
  LogOut,
  MessageSquare,
  HelpCircle,
  Sparkles,
  Users,
  Shield,
  Wrench,
  Wand2
} from 'lucide-react';
import Image from 'next/image';

interface Company {
  id: string;
  name: string;
  logo?: string;
  plan: 'starter' | 'pro' | 'enterprise';
}

interface HeaderProps {
  currentCompany?: Company;
  onCompanyChange?: (company: Company) => void;
  onChatOpen?: () => void;
  onMagicActions?: () => void;
  expertMode?: boolean;
  onExpertModeToggle?: () => void;
}

const mockCompanies: Company[] = [
  { id: '1', name: 'TechCorp SAS', plan: 'pro' },
  { id: '2', name: 'Design Studio', plan: 'starter' },
  { id: '3', name: 'Global Industries', plan: 'enterprise' }
];

export default function Header({
  currentCompany = mockCompanies[0],
  onCompanyChange,
  onChatOpen,
  onMagicActions,
  expertMode = false,
  onExpertModeToggle
}: HeaderProps) {
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const companyRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (companyRef.current && !companyRef.current.contains(event.target as Node)) {
        setCompanyDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const headerStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 40,
    height: '4rem',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(24px)',
    borderBottom: '1px solid rgba(229, 229, 229, 0.5)'
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.375rem 0.75rem',
    borderRadius: '0.5rem',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
    fontSize: '14px'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #5e72ff 0%, #d150da 100%)',
    color: 'white'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'rgba(250, 250, 250, 0.5)',
    border: '1px solid rgba(229, 229, 229, 0.5)',
    color: '#171717'
  };

  const dropdownStyle = {
    position: 'absolute' as const,
    top: '100%',
    marginTop: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(229, 229, 229, 0.5)',
    borderRadius: '0.75rem',
    padding: '0.5rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    minWidth: '14rem'
  };

  return (
    <header style={headerStyle}>
      <div style={{ height: '100%', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Image
            src="/logo_oke_original.png"
            alt="OKE"
            width={120}
            height={40}
            style={{ height: '2.5rem', width: 'auto' }}
          />
          
          {/* Company Selector - Desktop */}
          <div ref={companyRef} style={{ position: 'relative', display: window.innerWidth >= 768 ? 'block' : 'none' }}>
            <button
              onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
              style={secondaryButtonStyle}
            >
              <Building2 size={16} style={{ color: '#5e72ff' }} />
              <span style={{ fontWeight: 500 }}>{currentCompany.name}</span>
              <span style={{ 
                fontSize: '12px', 
                padding: '2px 6px', 
                borderRadius: '9999px', 
                backgroundColor: 'rgba(94, 114, 255, 0.1)', 
                color: '#5e72ff',
                textTransform: 'capitalize'
              }}>
                {currentCompany.plan}
              </span>
              <ChevronDown size={16} style={{ 
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
                  style={{ ...dropdownStyle, left: 0 }}
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
                        borderRadius: '0.5rem',
                        backgroundColor: currentCompany.id === company.id ? 'rgba(94, 114, 255, 0.1)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (currentCompany.id !== company.id) {
                          e.currentTarget.style.backgroundColor = 'rgba(250, 250, 250, 0.5)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentCompany.id !== company.id) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Building2 size={16} />
                        <span style={{ fontSize: '14px' }}>{company.name}</span>
                      </div>
                      <span style={{ 
                        fontSize: '12px', 
                        padding: '2px 6px', 
                        borderRadius: '9999px', 
                        backgroundColor: 'rgba(245, 245, 245, 1)',
                        textTransform: 'capitalize'
                      }}>
                        {company.plan}
                      </span>
                    </button>
                  ))}
                  
                  <div style={{ borderTop: '1px solid rgba(229, 229, 229, 0.5)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                    <button style={{
                      ...buttonStyle,
                      width: '100%',
                      justifyContent: 'flex-start',
                      backgroundColor: 'transparent'
                    }}>
                      <Plus size={16} />
                      <span style={{ fontSize: '14px' }}>Ajouter une entreprise</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* AI Chatbot */}
          <button
            onClick={onChatOpen}
            style={primaryButtonStyle}
          >
            <MessageSquare size={16} />
            <span style={{ fontWeight: 500 }}>Chatbot</span>
          </button>

          {/* Magic Actions Button */}
          <button
            onClick={onMagicActions}
            style={secondaryButtonStyle}
          >
            <Wand2 size={16} style={{ color: '#d150da' }} />
            <span style={{ fontWeight: 500 }}>Actions</span>
          </button>

          {/* User Avatar */}
          <div ref={userRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              style={{ 
                padding: '0.25rem',
                borderRadius: '0.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(250, 250, 250, 0.5)'}
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
                fontSize: '14px',
                fontWeight: 500
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
                  <div style={{ padding: '0.5rem', borderBottom: '1px solid rgba(229, 229, 229, 0.5)' }}>
                    <p style={{ fontWeight: 500, margin: 0 }}>Jean Dupont</p>
                    <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>jean@techcorp.fr</p>
                  </div>
                  
                  <div style={{ padding: '0.25rem 0' }}>
                    <button style={{ ...buttonStyle, width: '100%', justifyContent: 'flex-start', backgroundColor: 'transparent' }}>
                      <User size={16} />
                      <span style={{ fontSize: '14px' }}>Paramètres utilisateur</span>
                    </button>
                    
                    <button style={{ ...buttonStyle, width: '100%', justifyContent: 'flex-start', backgroundColor: 'transparent' }}>
                      <Settings size={16} />
                      <span style={{ fontSize: '14px' }}>Paramètres application</span>
                    </button>
                    
                    <button style={{ ...buttonStyle, width: '100%', justifyContent: 'flex-start', backgroundColor: 'transparent' }}>
                      <Wrench size={16} />
                      <span style={{ fontSize: '14px' }}>Paramètres backoffice</span>
                      <span style={{ 
                        fontSize: '12px', 
                        padding: '2px 6px', 
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        marginLeft: 'auto'
                      }}>
                        Admin
                      </span>
                    </button>
                    
                    <button 
                      onClick={onExpertModeToggle}
                      style={{ ...buttonStyle, width: '100%', justifyContent: 'flex-start', backgroundColor: 'transparent' }}
                    >
                      <Shield size={16} />
                      <span style={{ fontSize: '14px' }}>Mode Expert</span>
                      <div style={{ 
                        marginLeft: 'auto',
                        width: '2rem',
                        height: '1rem',
                        backgroundColor: expertMode ? '#5e72ff' : '#e5e5e5',
                        borderRadius: '9999px',
                        position: 'relative',
                        transition: 'background-color 0.2s'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '0.125rem',
                          left: expertMode ? '1.125rem' : '0.125rem',
                          width: '0.75rem',
                          height: '0.75rem',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                          transition: 'left 0.2s'
                        }} />
                      </div>
                    </button>
                  </div>
                  
                  <div style={{ borderTop: '1px solid rgba(229, 229, 229, 0.5)', paddingTop: '0.25rem' }}>
                    <button style={{ ...buttonStyle, width: '100%', justifyContent: 'flex-start', backgroundColor: 'transparent' }}>
                      <Users size={16} />
                      <span style={{ fontSize: '14px' }}>Inviter un utilisateur</span>
                    </button>
                    
                    <button style={{ ...buttonStyle, width: '100%', justifyContent: 'flex-start', backgroundColor: 'transparent' }}>
                      <HelpCircle size={16} />
                      <span style={{ fontSize: '14px' }}>Aide & Support</span>
                    </button>
                    
                    <button 
                      style={{ 
                        ...buttonStyle, 
                        width: '100%', 
                        justifyContent: 'flex-start', 
                        backgroundColor: 'transparent',
                        color: '#ef4444'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LogOut size={16} />
                      <span style={{ fontSize: '14px' }}>Déconnexion</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Mobile Company Quick Selector - Only on mobile */}
      <div style={{ 
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.25rem 0.5rem',
          backgroundColor: 'rgba(250, 250, 250, 0.5)',
          borderRadius: '0.5rem',
          border: '1px solid rgba(229, 229, 229, 0.5)'
        }}>
          <Building2 size={14} style={{ color: '#5e72ff' }} />
          <span style={{ 
            fontSize: '12px', 
            fontWeight: 500, 
            color: '#5e72ff',
            textTransform: 'capitalize'
          }}>
            {currentCompany.plan}
          </span>
        </div>
      </div>
    </header>
  );
}