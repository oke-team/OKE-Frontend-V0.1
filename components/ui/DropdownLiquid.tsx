'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { liquidGlass, applyLiquidGlass } from '@/lib/design-system/liquid-glass';
import { ChevronDown } from 'lucide-react';

// Context pour gérer l'état du dropdown
interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  variant: 'default' | 'primary' | 'success' | 'warning';
  size: 'sm' | 'md' | 'lg';
  isMobile: boolean;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown must be used within DropdownProvider');
  }
  return context;
};

// Props principales
interface DropdownProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  align?: 'left' | 'right' | 'center';
  fullWidth?: boolean;
}

// Container principal
export const Dropdown: React.FC<DropdownProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  align = 'left',
  fullWidth = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, variant, size, isMobile }}>
      <div 
        ref={containerRef}
        className={cn(
          'relative',
          fullWidth && 'w-full',
          className
        )}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// Trigger (bouton qui ouvre le dropdown)
interface DropdownTriggerProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  sublabel?: string;
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children,
  className,
  icon,
  badge,
  sublabel
}) => {
  const { isOpen, setIsOpen, variant, size } = useDropdown();
  
  // Déterminer le style glass approprié
  const glassVariant = variant === 'default' ? 'subtle' : variant;
  const glassStyle = applyLiquidGlass(glassVariant as any);
  
  const sizeStyles = {
    sm: {
      padding: '6px 12px',
      fontSize: '13px',
      minHeight: '32px',
      borderRadius: '8px'
    },
    md: {
      padding: '8px 14px',
      fontSize: '14px',
      minHeight: '38px',
      borderRadius: '10px'
    },
    lg: {
      padding: '10px 18px',
      fontSize: '15px',
      minHeight: '44px',
      borderRadius: '12px'
    }
  };
  
  const currentSize = sizeStyles[size];
  
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        'w-full flex items-center justify-between gap-2',
        'transition-all duration-200',
        'hover:scale-[1.02] active:scale-[0.98]',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        variant === 'primary' && 'focus:ring-primary-500/30',
        variant === 'success' && 'focus:ring-emerald-500/30',
        variant === 'warning' && 'focus:ring-amber-500/30',
        variant === 'default' && 'focus:ring-slate-500/20',
        className
      )}
      style={{
        ...glassStyle,
        ...currentSize,
        transition: liquidGlass.transitions.medium
      }}
    >
      {/* Contenu gauche */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {icon && (
          <span className="flex-shrink-0 opacity-70">
            {icon}
          </span>
        )}
        
        <div className="flex-1 text-left min-w-0">
          <div className="font-medium text-slate-900 truncate" style={{ lineHeight: '1.2' }}>
            {children}
          </div>
          {sublabel && (
            <div 
              className="text-slate-500 truncate"
              style={{ 
                fontSize: `${parseInt(currentSize.fontSize) - 3}px`,
                lineHeight: '1.2',
                marginTop: '1px'
              }}
            >
              {sublabel}
            </div>
          )}
        </div>
      </div>
      
      {/* Contenu droite */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {badge && (
          <span className="flex-shrink-0">
            {badge}
          </span>
        )}
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown 
            size={size === 'sm' ? 14 : size === 'md' ? 16 : 18}
            className="text-slate-400"
          />
        </motion.div>
      </div>
    </button>
  );
};

// Menu (contenu du dropdown)
interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  className,
  maxHeight = '320px'
}) => {
  const { isOpen, isMobile, size } = useDropdown();
  
  const menuStyle = applyLiquidGlass('elevated');
  
  const sizeStyles = {
    sm: { padding: '4px', marginTop: '4px' },
    md: { padding: '6px', marginTop: '6px' },
    lg: { padding: '8px', marginTop: '8px' }
  };
  
  const currentSize = sizeStyles[size];
  
  if (isMobile) {
    // Sur mobile : bottom sheet
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              style={{ backdropFilter: 'blur(4px)' }}
            />
            
            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={liquidGlass.transitions.spring}
              className={cn(
                'fixed bottom-0 left-0 right-0 z-50',
                'max-h-[70vh] overflow-y-auto',
                className
              )}
              style={{
                ...liquidGlass.mobile.bottomSheet,
                padding: '20px',
                paddingBottom: 'calc(20px + env(safe-area-inset-bottom))'
              }}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
  
  // Sur desktop : dropdown classique
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className={cn(
            'absolute z-30 w-full min-w-[200px]',
            'rounded-xl overflow-hidden',
            className
          )}
          style={{
            ...menuStyle,
            ...currentSize,
            maxHeight,
            overflowY: 'auto',
            transition: liquidGlass.transitions.fast
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Item du dropdown
interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  sublabel?: string;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
  icon,
  badge,
  sublabel,
  selected = false,
  disabled = false,
  className
}) => {
  const { size, setIsOpen } = useDropdown();
  
  const sizeStyles = {
    sm: { padding: '8px 12px', fontSize: '13px', minHeight: '36px' },
    md: { padding: '10px 14px', fontSize: '14px', minHeight: '44px' },
    lg: { padding: '12px 16px', fontSize: '15px', minHeight: '52px' }
  };
  
  const currentSize = sizeStyles[size];
  
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
      setIsOpen(false);
    }
  };
  
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'w-full flex items-center gap-3',
        'rounded-lg transition-all duration-150',
        'hover:bg-slate-50/80',
        selected && 'bg-primary-50/50 text-primary-700',
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && 'hover:scale-[1.02] active:scale-[0.98]',
        className
      )}
      style={{
        ...currentSize,
        transition: liquidGlass.transitions.fast
      }}
    >
      {/* Icône */}
      {icon && (
        <span className={cn(
          'flex-shrink-0',
          selected ? 'text-primary-500' : 'text-slate-400'
        )}>
          {icon}
        </span>
      )}
      
      {/* Contenu */}
      <div className="flex-1 text-left min-w-0">
        <div className={cn(
          'font-medium truncate',
          selected ? 'text-primary-900' : 'text-slate-900'
        )}>
          {children}
        </div>
        {sublabel && (
          <div 
            className="text-slate-500 truncate mt-0.5"
            style={{ fontSize: `${parseInt(currentSize.fontSize) - 2}px` }}
          >
            {sublabel}
          </div>
        )}
      </div>
      
      {/* Badge */}
      {badge && (
        <span className="flex-shrink-0">
          {badge}
        </span>
      )}
      
      {/* Indicateur de sélection */}
      {selected && (
        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-500" />
      )}
    </button>
  );
};

// Section separator
export const DropdownSeparator: React.FC = () => (
  <div className="my-1 h-px bg-slate-200/50" />
);

// Section avec label
interface DropdownSectionProps {
  label?: string;
  children: React.ReactNode;
}

export const DropdownSection: React.FC<DropdownSectionProps> = ({ label, children }) => {
  const { size } = useDropdown();
  
  const labelStyles = {
    sm: { padding: '4px 12px', fontSize: '11px' },
    md: { padding: '6px 14px', fontSize: '12px' },
    lg: { padding: '8px 16px', fontSize: '13px' }
  };
  
  return (
    <div>
      {label && (
        <div 
          className="text-slate-400 font-medium uppercase tracking-wider"
          style={labelStyles[size]}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
};