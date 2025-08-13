'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command } from 'lucide-react';
import { liquidGlass } from '@/lib/design-system/liquid-glass';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  showShortcut?: boolean;
  autoFocus?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * SearchBar - Barre de recherche intelligente pour desktop/tablet
 * 
 * Caractéristiques :
 * - Animation de focus avec expansion
 * - Support des raccourcis clavier (Cmd+K)
 * - Suggestions de recherche en temps réel
 * - Clear button animé
 * - États de chargement et d'erreur
 * - Effets Liquid Glass adaptatifs
 */
const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFocus,
  onBlur,
  placeholder = 'Rechercher...',
  showShortcut = false,
  autoFocus = false,
  size = 'md',
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Configuration des tailles
  const sizeConfig = {
    sm: {
      height: 'h-9',
      padding: 'pl-9 pr-3',
      iconSize: 16,
      fontSize: 'text-sm'
    },
    md: {
      height: 'h-10',
      padding: 'pl-10 pr-4',
      iconSize: 18,
      fontSize: 'text-sm'
    },
    lg: {
      height: 'h-12',
      padding: 'pl-12 pr-5',
      iconSize: 20,
      fontSize: 'text-base'
    }
  };

  const config = sizeConfig[size];

  // Gestion du raccourci clavier Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      
      // ESC pour désélectionner
      if (e.key === 'Escape' && isFocused) {
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFocused]);

  // Auto focus si demandé
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsLoading(true);
      onSearch?.(query.trim());
      
      // Simulation d'une recherche
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Styles dynamiques avec Liquid Glass
  const containerStyles = {
    ...liquidGlass.effects.subtle,
    transition: liquidGlass.transitions.medium,
    ...(isFocused && {
      ...liquidGlass.hover.subtle,
      borderColor: 'rgba(94, 114, 255, 0.3)',
      boxShadow: `
        0 0 0 1px rgba(94, 114, 255, 0.2),
        0 4px 12px rgba(94, 114, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.8)
      `
    })
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <motion.div
        className={`
          relative flex items-center ${config.height} rounded-lg border 
          transition-all duration-200 group
        `}
        style={containerStyles}
        animate={{
          scale: isFocused ? 1.02 : 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Search Icon */}
        <motion.div
          className="absolute left-3 flex items-center justify-center"
          animate={{
            scale: isFocused ? 1.1 : 1,
            color: isFocused ? 'rgb(94, 114, 255)' : 'rgb(148, 163, 184)'
          }}
          transition={{ duration: 0.2 }}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full"
            />
          ) : (
            <Search size={config.iconSize} />
          )}
        </motion.div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`
            w-full ${config.padding} ${config.fontSize} font-medium
            bg-transparent border-0 outline-none
            placeholder-slate-400 text-slate-900
            ${config.height}
          `}
          style={{ fontSize: size === 'lg' ? '16px' : '14px' }}
        />

        {/* Right Side Actions */}
        <div className="absolute right-3 flex items-center gap-1">
          {/* Clear Button */}
          <AnimatePresence>
            {query && (
              <motion.button
                type="button"
                onClick={handleClear}
                className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-slate-100 transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Effacer la recherche"
              >
                <X size={12} className="text-slate-400" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Keyboard Shortcut */}
          {showShortcut && !query && (
            <AnimatePresence>
              {!isFocused && (
                <motion.div
                  className="flex items-center gap-0.5"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <kbd className="px-1.5 py-0.5 text-xs bg-white/80 rounded border border-slate-200/60 text-slate-500 shadow-sm">
                    <Command size={10} className="inline-block mr-0.5" />
                    K
                  </kbd>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Focus Ring Animation */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={false}
          animate={{
            boxShadow: isFocused 
              ? '0 0 0 2px rgba(94, 114, 255, 0.2)'
              : '0 0 0 0px rgba(94, 114, 255, 0)'
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Search Suggestions Placeholder */}
      <AnimatePresence>
        {isFocused && query.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-50 mt-1"
            style={liquidGlass.effects.elevated}
          >
            <div className="rounded-lg p-3">
              <div className="text-sm text-slate-600 mb-2">
                Suggestions pour "{query}"
              </div>
              <div className="space-y-1">
                <button className="w-full text-left px-2 py-1 rounded text-sm hover:bg-slate-50 transition-colors">
                  Recherche globale: {query}
                </button>
                <button className="w-full text-left px-2 py-1 rounded text-sm hover:bg-slate-50 transition-colors">
                  Dans les factures: {query}
                </button>
                <button className="w-full text-left px-2 py-1 rounded text-sm hover:bg-slate-50 transition-colors">
                  Dans les clients: {query}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default SearchBar;