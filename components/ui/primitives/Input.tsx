'use client';

import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Composant Input réutilisable
 * Design cohérent avec le système Liquid Glass
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  // Classes de base
  const baseClasses = 'block w-full px-3 py-2 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  // Classes conditionnelles
  const stateClasses = error
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-primary focus:border-primary';

  const iconPadding = [
    leftIcon && 'pl-10',
    rightIcon && 'pr-10'
  ].filter(Boolean).join(' ');

  const combinedClasses = `${baseClasses} ${stateClasses} ${iconPadding} ${className}`;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">
              {leftIcon}
            </span>
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={combinedClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">
              {rightIcon}
            </span>
          </div>
        )}
      </div>
      
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// Composant Textarea utilisant les mêmes styles
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  id,
  rows = 4,
  ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  const baseClasses = 'block w-full px-3 py-2 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 resize-none';
  
  const stateClasses = error
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-primary focus:border-primary';

  const combinedClasses = `${baseClasses} ${stateClasses} ${className}`;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label 
          htmlFor={textareaId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={combinedClasses}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
        {...props}
      />
      
      {error && (
        <p id={`${textareaId}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${textareaId}-helper`} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';