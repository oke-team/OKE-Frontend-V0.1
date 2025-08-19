'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { buttonTap } from '@/lib/animations/variants';
import { useAnimation } from '@/lib/animations/useAnimation';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  animated?: boolean;
}

/**
 * Composant Button réutilisable
 * Extrait des patterns existants dans l'application
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  animated = true,
  className = '',
  children,
  disabled,
  ...props
}, ref) => {
  const animationConfig = useAnimation(buttonTap);

  // Classes de base
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variants
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-600 focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary-600 focus:ring-secondary',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500'
  };

  // Tailles
  const sizeClasses = {
    xs: 'px-2.5 py-1.5 text-xs rounded-md gap-1',
    sm: 'px-3 py-2 text-sm rounded-md gap-1.5',
    md: 'px-4 py-2 text-sm rounded-lg gap-2',
    lg: 'px-5 py-2.5 text-base rounded-lg gap-2',
    xl: 'px-6 py-3 text-base rounded-xl gap-2.5'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  const ButtonComponent = animated ? motion.button : 'button';
  const buttonProps = animated ? { ...animationConfig, ...props } : props;

  return (
    <ButtonComponent
      ref={ref}
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...buttonProps}
    >
      {isLoading ? (
        <svg 
          className="animate-spin h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </ButtonComponent>
  );
});

Button.displayName = 'Button';