'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDropdown } from './Dropdown';

interface DropdownItemProps {
  children: React.ReactNode;
  value?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  sublabel?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  value,
  selected,
  disabled = false,
  onClick,
  className,
  icon,
  badge,
  sublabel,
}) => {
  const { selectedValue, onSelect, setIsOpen, variant } = useDropdown();
  const isSelected = selected || (value && selectedValue === value);

  const handleClick = () => {
    if (disabled) return;
    
    if (value && onSelect) {
      onSelect(value);
    }
    
    if (onClick) {
      onClick();
    }
    
    setIsOpen(false);
  };

  const variantColors = {
    default: 'hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50',
    company: 'hover:bg-primary-50/50 dark:hover:bg-primary-900/20',
    period: 'hover:bg-green-50/50 dark:hover:bg-green-900/20',
    action: 'hover:bg-secondary-50/50 dark:hover:bg-secondary-900/20',
    user: 'hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50',
  };

  const selectedColors = {
    default: 'bg-neutral-100/70 dark:bg-neutral-800/70',
    company: 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 ring-1 ring-primary-500/20',
    period: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 ring-1 ring-green-500/20',
    action: 'bg-secondary-50 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 ring-1 ring-secondary-500/20',
    user: 'bg-neutral-100/70 dark:bg-neutral-800/70',
  };
  
  // Add selected indicator bar for better visual feedback
  const selectedIndicator = {
    company: 'before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-primary-500 before:rounded-full',
    period: 'before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-green-500 before:rounded-full',
    action: 'before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-secondary-500 before:rounded-full',
    default: '',
    user: '',
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      whileHover={!disabled ? { x: 2 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className={cn(
        'relative w-full flex items-center gap-3 px-3 py-2.5 mx-1 my-0.5',
        'rounded-lg text-sm text-left',
        'transition-all duration-200',
        !disabled && 'cursor-pointer',
        !disabled && !isSelected && variantColors[variant],
        isSelected && selectedColors[variant],
        isSelected && selectedIndicator[variant],
        disabled && 'opacity-40 cursor-not-allowed',
        className
      )}
    >
      {icon && (
        <div className="flex-shrink-0">
          {icon}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="font-medium">
          {children}
        </div>
        {sublabel && (
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {sublabel}
          </div>
        )}
      </div>
      
      {badge && (
        <div className="flex-shrink-0">
          {badge}
        </div>
      )}
      
      {isSelected && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <Check className="w-4 h-4 flex-shrink-0 text-current" />
        </motion.div>
      )}
    </motion.button>
  );
};