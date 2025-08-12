'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cardTokens } from '@/lib/card-tokens';

export interface CardBaseProps {
  variant?: 'hero' | 'standard' | 'compact' | 'calculation';
  accentColor?: 'violet' | 'green' | 'red' | 'blue' | 'orange';
  glass?: boolean;
  interactive?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  badge?: React.ReactNode;
}

export const CardBase: React.FC<CardBaseProps> = ({
  variant = 'standard',
  accentColor = 'violet',
  glass = true,
  interactive = false,
  loading = false,
  disabled = false,
  onClick,
  className,
  children,
  header,
  footer,
  badge,
}) => {
  const isClickable = interactive && onClick && !disabled && !loading;

  const baseClasses = cn(
    'relative overflow-hidden rounded-2xl transition-all duration-300',
    glass && 'backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80',
    !glass && 'bg-white dark:bg-neutral-900',
    'border border-white/20 dark:border-white/10',
    'shadow-lg',
    variant === 'hero' && 'col-span-2 row-span-2 min-h-[320px] p-8',
    variant === 'standard' && 'min-h-[160px] p-6',
    variant === 'compact' && 'min-h-[120px] p-4',
    variant === 'calculation' && 'min-h-[180px] p-5',
    isClickable && 'cursor-pointer hover:shadow-xl hover:-translate-y-1',
    disabled && 'opacity-50 cursor-not-allowed',
    loading && 'animate-pulse',
    className
  );

  const accentStyles = {
    violet: 'hover:shadow-violet-500/10 hover:border-violet-500/30',
    green: 'hover:shadow-green-500/10 hover:border-green-500/30',
    red: 'hover:shadow-red-500/10 hover:border-red-500/30',
    blue: 'hover:shadow-blue-500/10 hover:border-blue-500/30',
    orange: 'hover:shadow-orange-500/10 hover:border-orange-500/30',
  };

  const glowStyles = {
    violet: 'before:bg-gradient-to-br before:from-violet-500/20 before:to-transparent',
    green: 'before:bg-gradient-to-br before:from-green-500/20 before:to-transparent',
    red: 'before:bg-gradient-to-br before:from-red-500/20 before:to-transparent',
    blue: 'before:bg-gradient-to-br before:from-blue-500/20 before:to-transparent',
    orange: 'before:bg-gradient-to-br before:from-orange-500/20 before:to-transparent',
  };

  return (
    <motion.div
      className={cn(baseClasses, isClickable && accentStyles[accentColor])}
      onClick={isClickable ? onClick : undefined}
      whileHover={isClickable ? cardTokens.animations.cardHover : undefined}
      whileTap={isClickable ? cardTokens.animations.cardTap : undefined}
      initial={cardTokens.animations.cardEntrance.initial}
      animate={cardTokens.animations.cardEntrance.animate}
      transition={cardTokens.animations.cardEntrance.transition}
      aria-disabled={disabled}
      aria-busy={loading}
      role={isClickable ? 'button' : 'article'}
      tabIndex={isClickable ? 0 : undefined}
    >
      {/* Accent glow effect */}
      {glass && (
        <div
          className={cn(
            'absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl',
            'before:absolute before:inset-0 before:rounded-full',
            glowStyles[accentColor]
          )}
        />
      )}

      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4 z-10">
          {badge}
        </div>
      )}

      {/* Header */}
      {header && (
        <div className="relative mb-4">
          {header}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="relative mt-4 pt-4 border-t border-white/10">
          {footer}
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 rounded-2xl flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </motion.div>
  );
};

// Pre-configured variants for common use cases
export const HeroCard: React.FC<Omit<CardBaseProps, 'variant'>> = (props) => (
  <CardBase variant="hero" {...props} />
);

export const StandardCard: React.FC<Omit<CardBaseProps, 'variant'>> = (props) => (
  <CardBase variant="standard" {...props} />
);

export const CompactCard: React.FC<Omit<CardBaseProps, 'variant'>> = (props) => (
  <CardBase variant="compact" {...props} />
);

export const CalculationCard: React.FC<Omit<CardBaseProps, 'variant'>> = (props) => (
  <CardBase variant="calculation" {...props} />
);