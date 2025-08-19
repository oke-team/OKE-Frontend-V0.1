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
    'bg-white dark:bg-neutral-900',
    'border border-white/20',
    variant === 'hero' && 'col-span-2 row-span-2 min-h-[320px] p-8',
    variant === 'standard' && 'min-h-[160px] p-6',
    variant === 'compact' && 'min-h-[120px] p-4',
    variant === 'calculation' && 'min-h-[180px] p-5',
    isClickable && 'cursor-pointer hover:-translate-y-1',
    disabled && 'opacity-50 cursor-not-allowed',
    loading && 'animate-pulse',
    className
  );

  const accentStyles = {
    violet: '',
    green: '',
    red: '',
    blue: '',
    orange: '',
  };

  const glowStyles = {
    violet: 'before:bg-gradient-to-br before:from-secondary/20 before:to-transparent',
    green: 'before:bg-gradient-to-br before:from-green-500/20 before:to-transparent',
    red: 'before:bg-gradient-to-br before:from-red-500/20 before:to-transparent',
    blue: 'before:bg-gradient-to-br before:from-primary/20 before:to-transparent',
    orange: 'before:bg-gradient-to-br before:from-orange-500/20 before:to-transparent',
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className={cn(baseClasses, isClickable && accentStyles[accentColor])}
      onClick={isClickable ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={isClickable ? cardTokens.animations.cardHover : undefined}
      whileTap={isClickable ? cardTokens.animations.cardTap : undefined}
      initial={cardTokens.animations.cardEntrance.initial}
      animate={cardTokens.animations.cardEntrance.animate}
      transition={cardTokens.animations.cardEntrance.transition}
      aria-disabled={disabled}
      aria-busy={loading}
      role={isClickable ? 'button' : 'article'}
      tabIndex={isClickable ? 0 : undefined}
      style={{
        boxShadow: isHovered && isClickable
          ? '0 8px 24px rgba(76, 52, 206, 0.15), 0 4px 8px rgba(250, 160, 22, 0.12), 0 16px 48px rgba(0, 0, 0, 0.08)'
          : '0 4px 12px rgba(76, 52, 206, 0.08), 0 2px 4px rgba(250, 160, 22, 0.06), 0 8px 24px rgba(0, 0, 0, 0.04)',
        transition: 'box-shadow 0.3s ease'
      }}
    >
      {/* Accent glow effect - supprimé pour plus de clarté */}

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
          <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
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