'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GlassButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export default function GlassButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  children,
  icon,
  iconPosition = 'left',
  className = ''
}: GlassButtonProps) {
  // Configuration des variants avec les couleurs OKÉ
  const variants = {
    primary: {
      base: 'bg-primary/20 border-primary/50 text-white hover:bg-primary/30 hover:border-primary/70 hover:shadow-glow-primary',
      disabled: 'bg-primary/10 border-primary/20 text-white/50',
    },
    secondary: {
      base: 'bg-secondary/20 border-secondary/50 text-white hover:bg-secondary/30 hover:border-secondary/70 hover:shadow-glow-secondary',
      disabled: 'bg-secondary/10 border-secondary/20 text-white/50',
    },
    ghost: {
      base: 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20',
      disabled: 'bg-white/5 border-white/5 text-white/30',
    },
    danger: {
      base: 'bg-red-500/20 border-red-500/50 text-white hover:bg-red-500/30 hover:border-red-500/70',
      disabled: 'bg-red-500/10 border-red-500/20 text-white/50',
    },
  };

  // Configuration des tailles
  const sizes = {
    sm: 'px-3 py-1.5 text-sm min-h-[32px]',
    md: 'px-4 py-2 text-base min-h-[40px]',
    lg: 'px-6 py-3 text-lg min-h-[48px]', // Touch target 48px
  };

  const isDisabled = disabled || loading;
  const currentVariant = isDisabled ? variants[variant].disabled : variants[variant].base;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        // Base styles
        'relative inline-flex items-center justify-center',
        'border rounded-xl font-medium',
        'backdrop-blur-md transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-neutral-900',
        
        // Variant styles
        currentVariant,
        
        // Size styles
        sizes[size],
        
        // Width
        fullWidth && 'w-full',
        
        // Disabled styles
        isDisabled && 'cursor-not-allowed opacity-60',
        
        // Custom className
        className
      )}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.15 }}
    >
      {/* Loading spinner ou icon gauche */}
      {(loading || (icon && iconPosition === 'left')) && (
        <span className="mr-2">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            icon
          )}
        </span>
      )}

      {/* Contenu du bouton */}
      <span className={cn(loading && 'opacity-70')}>
        {children}
      </span>

      {/* Icon droite */}
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">
          {icon}
        </span>
      )}

      {/* Effet de brillance au survol */}
      {!isDisabled && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0"
          initial={{ x: '-100%', opacity: 0 }}
          whileHover={{ x: '100%', opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  );
}