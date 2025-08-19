'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'interactive' | 'compact';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  onClick?: () => void;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

export default function GlassCard({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  onClick,
  className = '',
  as = 'div'
}: GlassCardProps) {
  // Configuration des variants
  const variants = {
    default: {
      base: 'bg-white/5 border-white/10 shadow-glass-sm',
      hover: 'hover:bg-white/8 hover:border-white/15 hover:shadow-glass',
    },
    elevated: {
      base: 'bg-white/10 border-white/15 shadow-glass-md',
      hover: 'hover:bg-white/15 hover:border-white/20 hover:shadow-glass-lg',
    },
    interactive: {
      base: 'bg-white/5 border-white/10 shadow-glass-sm cursor-pointer',
      hover: 'hover:bg-white/10 hover:border-primary/30 hover:shadow-glow-primary hover:-translate-y-0.5',
    },
    compact: {
      base: 'bg-white/5 border-white/10',
      hover: 'hover:bg-white/8 hover:border-white/15',
    },
  };

  // Configuration du padding
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-10',
  };

  const Component = motion[as];
  const isClickable = !!onClick || variant === 'interactive';
  const currentVariant = variants[variant];

  return (
    <Component
      className={cn(
        // Base styles
        'relative overflow-hidden',
        'backdrop-blur-md border rounded-xl',
        'transition-all duration-200',
        
        // Variant styles
        currentVariant.base,
        hover && currentVariant.hover,
        
        // Padding
        paddings[padding],
        
        // Clickable styles
        isClickable && 'cursor-pointer select-none',
        
        // Custom className
        className
      )}
      onClick={onClick}
      whileHover={isClickable ? { scale: 1.01 } : {}}
      whileTap={isClickable ? { scale: 0.99 } : {}}
      transition={{ duration: 0.15 }}
    >
      {/* Contenu */}
      {children}

      {/* Effet de gradient subtil */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Pattern de fond optionnel */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
    </Component>
  );
}

// Export des variantes prédéfinies pour une utilisation facile
export const GlassCardHeader = ({ 
  title, 
  subtitle, 
  icon,
  action
}: { 
  title: string; 
  subtitle?: string; 
  icon?: React.ReactNode;
  action?: React.ReactNode;
}) => (
  <div className="flex items-start justify-between mb-4">
    <div className="flex items-start gap-3">
      {icon && (
        <div className="text-primary mt-0.5">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && (
          <p className="text-sm text-neutral-400 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
    {action && (
      <div className="flex-shrink-0">
        {action}
      </div>
    )}
  </div>
);

export const GlassCardContent = ({ 
  children,
  className = '' 
}: { 
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('text-neutral-200', className)}>
    {children}
  </div>
);

export const GlassCardFooter = ({ 
  children,
  className = '' 
}: { 
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('mt-4 pt-4 border-t border-white/10', className)}>
    {children}
  </div>
);