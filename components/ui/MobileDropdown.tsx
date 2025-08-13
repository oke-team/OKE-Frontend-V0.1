'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Check } from 'lucide-react';
import { createPortal } from 'react-dom';

interface DropdownOption {
  id: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

interface MobileDropdownProps {
  options: DropdownOption[];
  selectedId: string;
  onSelect: (option: DropdownOption) => void;
  trigger: React.ReactNode;
  title?: string;
  placeholder?: string;
  fullscreen?: boolean;
  searchable?: boolean;
  maxHeight?: string;
  className?: string;
}

export const MobileDropdown: React.FC<MobileDropdownProps> = ({
  options,
  selectedId,
  onSelect,
  trigger,
  title = "Sélectionner",
  placeholder = "Rechercher...",
  fullscreen = false,
  searchable = false,
  maxHeight = "70vh",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isMobile, setIsMobile] = useState(false);
  
  const triggerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filtrage des options
  useEffect(() => {
    if (!searchable || !searchTerm.trim()) {
      setFilteredOptions(options);
      return;
    }

    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.sublabel?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [options, searchTerm, searchable]);

  // Focus automatique sur la recherche
  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      const timer = setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, searchable]);

  // Gestion des touches
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    
    onSelect(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const selectedOption = options.find(opt => opt.id === selectedId);

  // Styles adaptatifs
  const overlayStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 9999,
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
  };

  const modalStyle = {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    maxHeight: fullscreen ? '90vh' : maxHeight,
    boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.2)',
    zIndex: 10000,
    // Support du safe area iOS
    paddingBottom: 'env(safe-area-inset-bottom, 16px)',
  };

  const desktopModalStyle = {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    marginTop: '8px',
    backgroundColor: 'white',
    borderRadius: '16px',
    border: '1px solid rgba(229, 231, 235, 0.3)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
    minWidth: '280px',
    maxHeight: '400px',
    zIndex: 10000,
  };

  const optionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderBottom: '1px solid rgba(229, 231, 235, 0.2)',
    minHeight: '60px', // Zone de tap confortable sur mobile
  };

  const renderDropdown = () => (
    <AnimatePresence>
      {isOpen && (
        <>
          {isMobile && (
            <div style={overlayStyle} onClick={() => setIsOpen(false)} />
          )}
          
          <motion.div
            initial={isMobile 
              ? { y: '100%', opacity: 0 } 
              : { y: -10, opacity: 0, scale: 0.95 }
            }
            animate={isMobile 
              ? { y: 0, opacity: 1 } 
              : { y: 0, opacity: 1, scale: 1 }
            }
            exit={isMobile 
              ? { y: '100%', opacity: 0 } 
              : { y: -10, opacity: 0, scale: 0.95 }
            }
            transition={{ 
              type: 'spring', 
              damping: 30, 
              stiffness: 300,
              duration: 0.3
            }}
            style={isMobile ? modalStyle : desktopModalStyle}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 20px 12px',
              borderBottom: '1px solid rgba(229, 231, 235, 0.3)'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: 600,
                color: '#111827'
              }}>
                {title}
              </h3>
              
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(243, 244, 246, 0.8)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Barre de recherche */}
            {searchable && (
              <div style={{ padding: '12px 20px' }}>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder={placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: '1px solid rgba(209, 213, 219, 0.5)',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(249, 250, 251, 0.5)',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#5e72ff';
                    e.target.style.backgroundColor = 'white';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(209, 213, 219, 0.5)';
                    e.target.style.backgroundColor = 'rgba(249, 250, 251, 0.5)';
                  }}
                />
              </div>
            )}

            {/* Liste des options */}
            <div style={{
              maxHeight: isMobile ? '50vh' : '300px',
              overflowY: 'auto' as const,
              WebkitOverflowScrolling: 'touch'
            }}>
              {filteredOptions.length === 0 ? (
                <div style={{
                  padding: '40px 20px',
                  textAlign: 'center' as const,
                  color: '#6b7280',
                  fontSize: '14px'
                }}>
                  Aucun résultat trouvé
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = option.id === selectedId;
                  const isLast = index === filteredOptions.length - 1;
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option)}
                      disabled={option.disabled}
                      style={{
                        ...optionStyle,
                        backgroundColor: isSelected 
                          ? 'rgba(94, 114, 255, 0.08)' 
                          : 'transparent',
                        borderBottom: isLast ? 'none' : optionStyle.borderBottom,
                        opacity: option.disabled ? 0.5 : 1,
                        cursor: option.disabled ? 'not-allowed' : 'pointer',
                        border: 'none',
                        width: '100%',
                        textAlign: 'left' as const
                      }}
                      onTouchStart={(e) => {
                        if (!option.disabled && !isSelected) {
                          e.currentTarget.style.backgroundColor = 'rgba(243, 244, 246, 0.8)';
                        }
                      }}
                      onTouchEnd={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {/* Icône */}
                      {option.icon && (
                        <div style={{ 
                          color: isSelected ? '#5e72ff' : '#6b7280',
                          flexShrink: 0 
                        }}>
                          {option.icon}
                        </div>
                      )}
                      
                      {/* Contenu principal */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: 500,
                          color: isSelected ? '#5e72ff' : '#111827',
                          marginBottom: option.sublabel ? '2px' : 0
                        }}>
                          {option.label}
                        </div>
                        
                        {option.sublabel && (
                          <div style={{
                            fontSize: '14px',
                            color: '#6b7280'
                          }}>
                            {option.sublabel}
                          </div>
                        )}
                      </div>
                      
                      {/* Badge */}
                      {option.badge && (
                        <div style={{ flexShrink: 0 }}>
                          {option.badge}
                        </div>
                      )}
                      
                      {/* Indicateur de sélection */}
                      {isSelected && (
                        <div style={{ 
                          color: '#5e72ff',
                          flexShrink: 0 
                        }}>
                          <Check size={20} />
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div ref={triggerRef} style={{ position: 'relative' }} className={className}>
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {/* Dropdown Portal pour mobile, inline pour desktop */}
      {isMobile && typeof window !== 'undefined'
        ? createPortal(renderDropdown(), document.body)
        : renderDropdown()
      }
    </div>
  );
};

export default MobileDropdown;