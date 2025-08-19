'use client';

import React, { forwardRef, ButtonHTMLAttributes, InputHTMLAttributes, HTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, AlertCircle } from 'lucide-react';

// ============= PREMIUM CARD =============
interface PremiumCardProps extends HTMLMotionProps<"div"> {
  variant?: 'default' | 'elevated' | 'interactive';
  padding?: 'sm' | 'md' | 'lg';
}

export const PremiumCard = forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const paddingClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    const variantClasses = {
      default: 'bg-white border border-gray-200 shadow-sm',
      elevated: 'bg-white border border-gray-100 shadow-lg',
      interactive: 'bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-2xl',
          paddingClasses[padding],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

PremiumCard.displayName = 'PremiumCard';

// ============= LIQUID BUTTON =============
interface LiquidButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const LiquidButton = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg'
    };

    const variantClasses = {
      primary: 'bg-[#FAA016] hover:bg-[#E8941A] text-white shadow-sm hover:shadow-md',
      secondary: 'bg-[#4C34CE] hover:bg-[#3A28B8] text-white shadow-sm hover:shadow-md',
      outline: 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300'
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        disabled={disabled || loading}
        whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
        whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
        {...props}
      >
        {/* Liquid effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
        
        {/* Loading spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
            <motion.div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        )}
        
        <span className={cn('relative z-10', loading && 'invisible')}>
          {children}
        </span>
      </motion.button>
    );
  }
);

LiquidButton.displayName = 'LiquidButton';

// ============= PREMIUM INPUT =============
interface PremiumInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
}

export const PremiumInput = forwardRef<HTMLInputElement, PremiumInputProps>(
  ({ className, label, error, success, icon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="text-gray-400">{icon}</div>
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full h-11 px-4 rounded-lg border bg-white text-gray-900 placeholder-gray-400',
              'focus:outline-none focus:ring-2 transition-all duration-200',
              icon && 'pl-10',
              error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' :
              success ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20' :
              'border-gray-200 hover:border-gray-300 focus:border-[#4C34CE] focus:ring-[#4C34CE]/20',
              className
            )}
            {...props}
          />
          {success && !error && (
            <motion.div
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              <Check className="w-5 h-5 text-green-500" />
            </motion.div>
          )}
          {error && (
            <motion.div
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              <AlertCircle className="w-5 h-5 text-red-500" />
            </motion.div>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

PremiumInput.displayName = 'PremiumInput';

// ============= PROGRESS INDICATOR =============
interface ProgressIndicatorProps {
  steps: number;
  currentStep: number;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  className
}) => {
  const progress = ((currentStep - 1) / (steps - 1)) * 100;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Progress bar */}
      <div className="relative">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">
            Étape <span className="font-semibold text-[#4C34CE]">{currentStep}</span> sur {steps}
          </span>
          <span className="text-gray-600">
            <span className="font-semibold text-[#FAA016]">{Math.round(progress)}%</span>
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#4C34CE] to-[#FAA016] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step dots */}
      <div className="flex justify-between">
        {Array.from({ length: steps }, (_, i) => {
          const stepNumber = i + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <motion.div
              key={stepNumber}
              className="relative"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                  isCompleted ? 'bg-green-500 text-white' :
                  isActive ? 'bg-[#4C34CE] text-white shadow-lg' :
                  'bg-white border-2 border-gray-300 text-gray-400'
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </div>
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#4C34CE]/20"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ============= STEP CONTAINER =============
interface StepContainerProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const StepContainer: React.FC<StepContainerProps> = ({
  title,
  subtitle,
  icon,
  children,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn('space-y-8', className)}
    >
      {/* Header */}
      <div className="text-center">
        {icon && (
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4C34CE] to-[#FAA016] mb-4 shadow-lg">
            <div className="text-white">{icon}</div>
          </div>
        )}
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 mt-2 text-lg">{subtitle}</p>
        )}
      </div>

      {/* Content */}
      <div>{children}</div>
    </motion.div>
  );
};

// ============= INFO CARD =============
interface InfoCardProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'info' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  type = 'info',
  icon,
  children,
  className
}) => {
  const typeStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    success: 'bg-green-50 border-green-200 text-green-900',
    warning: 'bg-orange-50 border-orange-200 text-orange-900',
    error: 'bg-red-50 border-red-200 text-red-900'
  };

  const iconColors = {
    info: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-orange-600',
    error: 'text-red-600'
  };

  return (
    <div className={cn(
      'flex items-start gap-3 p-4 rounded-lg border',
      typeStyles[type],
      className
    )}>
      {icon && (
        <div className={cn('flex-shrink-0 mt-0.5', iconColors[type])}>
          {icon}
        </div>
      )}
      <div className="flex-1 text-sm">{children}</div>
    </div>
  );
};