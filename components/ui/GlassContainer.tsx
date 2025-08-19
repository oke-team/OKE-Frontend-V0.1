'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassContainerProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'elevated';
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  border?: 'primary' | 'secondary' | 'white' | 'none';
  glow?: boolean | 'primary' | 'secondary';
  className?: string;
}

export default function GlassContainer({ 
  children, 
  variant = 'default',
  blur = 'md',
  border = 'white',
  glow = false,
  className = ''
}: GlassContainerProps) {
  // Configuration des variants avec les couleurs OKÉ
  const variants = {
    default: 'bg-white/5 border-white/10',
    primary: 'bg-primary/10 border-primary/20',
    secondary: 'bg-secondary/10 border-secondary/20',
    elevated: 'bg-white/10 border-white/15'
  };

  // Configuration du blur
  const blurStyles = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl'
  };

  // Configuration des bordures avec les couleurs OKÉ
  const borderStyles = {
    primary: 'border-primary/30',
    secondary: 'border-secondary/30',
    white: 'border-white/20',
    none: 'border-transparent'
  };

  // Configuration du glow avec les couleurs OKÉ
  const glowStyle = glow === true 
    ? 'shadow-2xl shadow-primary/10' 
    : glow === 'primary'
    ? 'shadow-2xl shadow-primary/15'
    : glow === 'secondary'
    ? 'shadow-2xl shadow-secondary/15'
    : 'shadow-glass';

  return (
    <div className={cn(
      'rounded-2xl border transition-all duration-200',
      variants[variant],
      blurStyles[blur],
      borderStyles[border],
      glowStyle,
      className
    )}>
      {children}
    </div>
  );
}