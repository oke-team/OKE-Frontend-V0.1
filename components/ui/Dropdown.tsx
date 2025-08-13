'use client';

import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DropdownVariant = 'default' | 'company' | 'period' | 'action' | 'user';
export type DropdownSize = 'xs' | 'sm' | 'md' | 'lg';

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  variant: DropdownVariant;
  size: DropdownSize;
  selectedValue?: string;
  onSelect?: (value: string) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a Dropdown');
  }
  return context;
};

interface DropdownProps {
  children: React.ReactNode;
  variant?: DropdownVariant;
  size?: DropdownSize;
  defaultOpen?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  variant = 'default',
  size = 'md',
  defaultOpen = false,
  value,
  onValueChange,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        setIsOpen,
        variant,
        size,
        selectedValue: value,
        onSelect: onValueChange,
      }}
    >
      <div className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

interface DropdownTriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children,
  className,
  asChild = false,
}) => {
  const { isOpen, setIsOpen, variant, size } = useDropdown();

  const sizeClasses = {
    xs: 'h-8 px-2.5 text-xs',
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-5 text-base',
  };

  // Liquid Glass unified design with subtle variations
  const variantClasses = {
    default: `
      bg-white/65 dark:bg-neutral-900/65
      backdrop-blur-xl
      border-white/25 dark:border-white/10
      text-neutral-700 dark:text-neutral-200
      shadow-[0_2px_12px_rgba(0,0,0,0.04)]
      hover:bg-white/75 dark:hover:bg-neutral-900/75
      hover:border-white/35 dark:hover:border-white/15
      hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]
    `,
    company: `
      bg-white/65 dark:bg-neutral-900/65
      backdrop-blur-xl
      border-white/25 dark:border-white/10
      text-neutral-700 dark:text-neutral-200
      shadow-[0_2px_12px_rgba(94,114,255,0.08)]
      hover:bg-white/75 dark:hover:bg-neutral-900/75
      hover:border-primary-500/20 dark:hover:border-primary-400/20
      hover:shadow-[0_4px_20px_rgba(94,114,255,0.12)]
      after:absolute after:inset-0 after:rounded-[inherit]
      after:bg-gradient-to-br after:from-primary-500/5 after:to-secondary-500/5
      after:opacity-0 after:transition-opacity after:duration-300
      hover:after:opacity-100
    `,
    period: `
      bg-white/65 dark:bg-neutral-900/65
      backdrop-blur-xl
      border-white/25 dark:border-white/10
      text-neutral-700 dark:text-neutral-200
      shadow-[0_2px_12px_rgba(16,185,129,0.08)]
      hover:bg-white/75 dark:hover:bg-neutral-900/75
      hover:border-green-500/20 dark:hover:border-green-400/20
      hover:shadow-[0_4px_20px_rgba(16,185,129,0.12)]
      after:absolute after:inset-0 after:rounded-[inherit]
      after:bg-gradient-to-br after:from-green-500/5 after:to-emerald-500/5
      after:opacity-0 after:transition-opacity after:duration-300
      hover:after:opacity-100
    `,
    action: `
      bg-white/65 dark:bg-neutral-900/65
      backdrop-blur-xl
      border-white/25 dark:border-white/10
      text-neutral-700 dark:text-neutral-200
      shadow-[0_2px_12px_rgba(209,80,218,0.08)]
      hover:bg-white/75 dark:hover:bg-neutral-900/75
      hover:border-secondary-500/20 dark:hover:border-secondary-400/20
      hover:shadow-[0_4px_20px_rgba(209,80,218,0.12)]
      after:absolute after:inset-0 after:rounded-[inherit]
      after:bg-gradient-to-br after:from-purple-500/5 after:to-pink-500/5
      after:opacity-0 after:transition-opacity after:duration-300
      hover:after:opacity-100
    `,
    user: `
      bg-white/65 dark:bg-neutral-900/65
      backdrop-blur-xl
      border-white/25 dark:border-white/10
      text-neutral-700 dark:text-neutral-200
      shadow-[0_2px_12px_rgba(0,0,0,0.04)]
      hover:bg-white/75 dark:hover:bg-neutral-900/75
      hover:border-white/35 dark:hover:border-white/15
      hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]
    `
  };

  // Enhanced focus states based on variant
  const focusRingColors = {
    default: 'focus:ring-neutral-500/20',
    company: 'focus:ring-primary-500/20',
    period: 'focus:ring-green-500/20',
    action: 'focus:ring-secondary-500/20',
    user: 'focus:ring-neutral-500/20'
  };

  const baseClasses = cn(
    'group relative inline-flex items-center justify-between gap-2 font-medium',
    'transition-all duration-300 ease-out',
    'rounded-xl border',
    'hover:-translate-y-[1px]',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    focusRingColors[variant],
    sizeClasses[size],
    variantClasses[variant],
    isOpen && 'ring-2 ring-offset-2',
    isOpen && variant === 'company' && 'ring-primary-500/20',
    isOpen && variant === 'period' && 'ring-green-500/20',
    isOpen && variant === 'action' && 'ring-secondary-500/20',
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: () => setIsOpen(!isOpen),
      className: baseClasses,
      'data-state': isOpen ? 'open' : 'closed',
    });
  }

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={baseClasses}
      data-state={isOpen ? 'open' : 'closed'}
    >
      {children}
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex items-center"
      >
        <ChevronDown className={cn(
          'w-4 h-4 ml-1 transition-colors duration-300',
          'text-neutral-400 dark:text-neutral-500',
          'group-hover:text-neutral-600 dark:group-hover:text-neutral-300',
          isOpen && 'text-neutral-600 dark:text-neutral-300'
        )} />
      </motion.div>
    </button>
  );
};

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  className,
  align = 'left',
}) => {
  const { isOpen, setIsOpen } = useDropdown();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        const trigger = (event.target as Element)?.closest('[data-state]');
        if (!trigger) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  const alignClasses = {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0',
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: isMobile ? '100%' : -10,
      scale: isMobile ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: isMobile ? '100%' : -10,
      scale: isMobile ? 1 : 0.95,
      transition: {
        duration: 0.15,
        ease: 'easeIn',
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}
          <motion.div
            ref={menuRef}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'z-50',
              isMobile ? [
                'fixed bottom-0 left-0 right-0',
                'rounded-t-3xl max-h-[75vh]',
                'animate-in slide-in-from-bottom duration-300',
              ] : [
                'absolute top-[calc(100%+8px)]',
                'min-w-[260px] max-w-[360px]',
                'rounded-2xl',
                alignClasses[align],
              ],
              'bg-white/95 dark:bg-neutral-900/95',
              'backdrop-blur-2xl',
              'border border-white/30 dark:border-white/10',
              'shadow-[0_20px_60px_rgba(0,0,0,0.15)]',
              'overflow-hidden',
              // Liquid Glass overlay effect
              'before:absolute before:inset-0 before:opacity-30',
              'before:bg-gradient-to-t before:from-transparent before:via-white/10 before:to-white/20',
              'before:pointer-events-none',
              className
            )}
          >
            {isMobile && (
              <div className="flex flex-col items-center pt-3 pb-2">
                <div className="w-12 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                <div className="w-8 h-0.5 bg-neutral-200 dark:bg-neutral-800 rounded-full mt-1.5" />
              </div>
            )}
            <div className={cn(
              'overflow-y-auto overscroll-contain',
              'scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700',
              'scrollbar-track-transparent',
              isMobile ? 'max-h-[calc(75vh-3rem)]' : 'max-h-[420px]',
              'p-2'
            )}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};