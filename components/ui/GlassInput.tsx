'use client';

import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  variant?: 'default' | 'primary' | 'secondary';
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      label,
      error,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      variant = 'default',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    // Configuration des variants
    const variants = {
      default: {
        border: 'border-white/20 focus:border-white/40',
        bg: 'bg-white/5 focus:bg-white/10',
      },
      primary: {
        border: 'border-primary/30 focus:border-primary/50',
        bg: 'bg-primary/5 focus:bg-primary/10',
      },
      secondary: {
        border: 'border-secondary/30 focus:border-secondary/50',
        bg: 'bg-secondary/5 focus:bg-secondary/10',
      },
    };

    const currentVariant = variants[variant];
    const hasError = !!error;

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <motion.label
            className={cn(
              'block text-sm font-medium mb-2 transition-colors duration-200',
              isFocused ? 'text-white' : 'text-neutral-300',
              hasError && 'text-red-400'
            )}
            animate={{ y: 0 }}
            initial={{ y: -5 }}
          >
            {label}
          </motion.label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Icon gauche */}
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none z-10">
              {icon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            className={cn(
              // Base styles
              'w-full px-4 py-2.5 min-h-[44px]', // Touch target 44px
              'backdrop-blur-md border rounded-xl',
              'text-white placeholder-neutral-400',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-neutral-900',
              
              // Variant styles
              currentVariant.border,
              currentVariant.bg,
              
              // Icon padding
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              
              // Error styles
              hasError && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30',
              
              // Disabled styles
              disabled && 'opacity-50 cursor-not-allowed bg-white/5',
              
              // Custom className
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${props.id}-error` : undefined}
            {...props}
          />

          {/* Icon droite */}
          {icon && iconPosition === 'right' && !hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none z-10">
              {icon}
            </div>
          )}

          {/* Error icon */}
          {hasError && (
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 pointer-events-none z-10"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              <AlertCircle className="w-5 h-5" />
            </motion.div>
          )}
        </div>

        {/* Error message */}
        <AnimatePresence>
          {hasError && (
            <motion.div
              id={`${props.id}-error`}
              className="mt-2 text-sm text-red-400 flex items-center gap-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Focus glow effect */}
        {isFocused && !hasError && (
          <motion.div
            className={cn(
              'absolute inset-0 rounded-xl pointer-events-none',
              variant === 'primary' && 'shadow-glow-primary',
              variant === 'secondary' && 'shadow-glow-secondary',
              variant === 'default' && 'shadow-glow'
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';

export default GlassInput;