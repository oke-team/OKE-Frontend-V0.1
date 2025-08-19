'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building, MapPin, Users, Hash, Filter, X, Loader2 } from 'lucide-react';

interface CompanySearchResult {
  siren: string;
  nom_entreprise: string;
  adresse_complete: string;
  code_naf: string;
  libelle_code_naf: string;
  effectif: string;
  statut: string;
}

interface CompanySearchFilters {
  department?: string;
  activity?: string;
}

interface CompanySearchInputProps {
  value: string;
  onChange: (value: string) => void;
  results: CompanySearchResult[];
  isLoading: boolean;
  onSelectCompany: (company: CompanySearchResult) => void;
  placeholder?: string;
  filters?: CompanySearchFilters;
  onFiltersChange?: (filters: CompanySearchFilters) => void;
  searchType: 'name' | 'siren';
  error?: string;
  className?: string;
}

export default function CompanySearchInput({
  value,
  onChange,
  results,
  isLoading,
  onSelectCompany,
  placeholder = "Rechercher une entreprise par nom ou SIREN...",
  filters = {},
  onFiltersChange,
  searchType,
  error,
  className = ''
}: CompanySearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Auto-focus sur le premier résultat avec les touches fléchées
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setIsOpen(results.length > 0 || isLoading);
  }, [results.length, isLoading]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [results]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelectCompany(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelectCompany = (company: CompanySearchResult) => {
    onSelectCompany(company);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleFiltersChange = (newFilters: Partial<CompanySearchFilters>) => {
    const updatedFilters = { ...localFilters, ...newFilters };
    setLocalFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const clearFilters = () => {
    setLocalFilters({});
    onFiltersChange?.({});
  };

  const hasActiveFilters = Boolean(localFilters.department || localFilters.activity);

  return (
    <div className={`relative ${className}`}>
      {/* Input principal */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-neutral-400" />
          )}
        </div>

        <motion.input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(results.length > 0 || isLoading)}
          placeholder={placeholder}
          className={`
            w-full h-12 sm:h-12 pl-12 pr-20 rounded-xl border backdrop-blur-sm
            bg-white/5 border-white/10 text-white placeholder-neutral-400
            focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50
            transition-all duration-200 text-base
            ${error ? 'border-red-500/50 focus:ring-red-400/50 focus:border-red-500/50' : ''}
          `}
          autoComplete="off"
          inputMode="search"
        />

        {/* Bouton filtres */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
          {hasActiveFilters && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={clearFilters}
              className="w-6 h-6 rounded-full bg-neutral-600 hover:bg-neutral-500 flex items-center justify-center transition-colors"
              title="Effacer les filtres"
            >
              <X className="w-3 h-3 text-white" />
            </motion.button>
          )}
          
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className={`
              w-8 h-8 rounded-lg flex items-center justify-center transition-colors
              ${showFilters ? 'bg-primary text-white' : 'bg-white/10 text-neutral-400 hover:text-white hover:bg-white/20'}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Type de recherche indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 flex items-center space-x-2 text-sm text-neutral-400"
      >
        {searchType === 'siren' ? (
          <>
            <Hash className="w-4 h-4" />
            <span>Recherche par SIREN</span>
          </>
        ) : (
          <>
            <Building className="w-4 h-4" />
            <span>Recherche par nom d'entreprise</span>
          </>
        )}
      </motion.div>

      {/* Erreur */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-2 text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2 border border-red-500/20"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filtres */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-3 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
          >
            <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Département
                </label>
                <input
                  type="text"
                  value={localFilters.department || ''}
                  onChange={(e) => handleFiltersChange({ department: e.target.value })}
                  placeholder="Ex: 75, Paris..."
                  className="w-full h-10 sm:h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary-400/50 text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Activité
                </label>
                <input
                  type="text"
                  value={localFilters.activity || ''}
                  onChange={(e) => handleFiltersChange({ activity: e.target.value })}
                  placeholder="Ex: Commerce, 4711D..."
                  className="w-full h-10 sm:h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary-400/50 text-base"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Résultats */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 z-50 mt-2 bg-neutral-900/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl max-h-64 sm:max-h-80 overflow-y-auto overscroll-contain"
          >
            {isLoading ? (
              <div className="p-4 flex items-center space-x-3">
                <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                <span className="text-neutral-400">Recherche en cours...</span>
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center text-neutral-400">
                <Building className="w-8 h-8 mx-auto mb-2 text-neutral-500" />
                <p>Aucune entreprise trouvée</p>
                <p className="text-sm text-neutral-500 mt-1">
                  Essayez avec un autre nom ou SIREN
                </p>
              </div>
            ) : (
              <div className="py-2">
                {results.map((company, index) => (
                  <motion.div
                    key={String(company.siren)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelectCompany(company)}
                    className={`
                      px-3 sm:px-4 py-3 sm:py-3 cursor-pointer transition-colors border-l-2
                      ${selectedIndex === index 
                        ? 'bg-primary/20 border-l-primary-400' 
                        : 'hover:bg-white/5 border-l-transparent'
                      }
                      active:bg-primary/30 touch-manipulation
                    `}
                  >
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <Building className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white text-sm sm:text-base truncate leading-tight">
                          {company.nom_entreprise}
                        </h4>
                        <div className="flex items-center space-x-3 mt-1 text-xs sm:text-sm text-neutral-400">
                          <div className="flex items-center space-x-1">
                            <Hash className="w-3 h-3" />
                            <span>{company.siren}</span>
                          </div>
                        </div>
                        <div className="mt-1.5">
                          <div className="flex items-center space-x-1 text-xs text-neutral-500 mb-1">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{company.adresse_complete}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-500 truncate flex-1 mr-2">
                              {company.libelle_code_naf}
                            </span>
                            <div className="flex items-center space-x-1 text-xs text-neutral-500 flex-shrink-0">
                              <Users className="w-3 h-3" />
                              <span>{company.effectif}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}