'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations/variants';
import { useAnimation } from '@/lib/animations/useAnimation';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
}

/**
 * Composant Card réutilisable
 * Inspiré du design Liquid Glass de l'application
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(({
  variant = 'default',
  padding = 'md',
  animated = false,
  hoverable = false,
  clickable = false,
  className = '',
  children,
  ...props
}, ref) => {
  const animationConfig = useAnimation(fadeInUp);

  // Classes de base
  const baseClasses = 'rounded-2xl transition-all duration-200';

  // Variants
  const variantClasses = {
    default: 'bg-white shadow-sm',
    glass: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-glass',
    bordered: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg'
  };

  // Padding
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  // Classes interactives
  const interactiveClasses = [
    hoverable && 'hover:shadow-xl hover:scale-[1.02]',
    clickable && 'cursor-pointer active:scale-[0.98]'
  ].filter(Boolean).join(' ');

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${interactiveClasses} ${className}`;

  const CardComponent = animated ? motion.div : 'div';
  const cardProps = animated 
    ? { 
        ...animationConfig,
        initial: animationConfig.initial,
        animate: animationConfig.animate,
        ...props 
      } 
    : props;

  return (
    <CardComponent
      ref={ref}
      className={combinedClasses}
      {...cardProps}
    >
      {children}
    </CardComponent>
  );
});

Card.displayName = 'Card';

// Sous-composants pour une utilisation structurée
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = '', 
  children, 
  ...props 
}) => (
  <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ 
  className = '', 
  children, 
  ...props 
}) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ 
  className = '', 
  children, 
  ...props 
}) => (
  <p className={`text-sm text-gray-500 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = '', 
  children, 
  ...props 
}) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = '', 
  children, 
  ...props 
}) => (
  <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`} {...props}>
    {children}
  </div>
);