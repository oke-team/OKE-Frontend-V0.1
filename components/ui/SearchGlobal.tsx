'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, Users, Package, CreditCard, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchGlobalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  type: 'account' | 'transaction' | 'client' | 'supplier' | 'document';
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  accent: 'violet' | 'orange';
}

const mockResults: SearchResult[] = [
  { id: '1', type: 'account', title: 'BNP Paribas - Compte courant', subtitle: '45 231 €', icon: CreditCard, accent: 'violet' },
  { id: '2', type: 'client', title: 'Client ABC Corp', subtitle: '12 500 € à encaisser', icon: Users, accent: 'orange' },
  { id: '3', type: 'supplier', title: 'Fournisseur Alpha', subtitle: '8 500 € à payer', icon: Package, accent: 'violet' },
  { id: '4', type: 'document', title: 'Facture FA-2024-001', subtitle: 'Émise le 15/01/2024', icon: FileText, accent: 'orange' },
  { id: '5', type: 'transaction', title: 'Virement SEPA', subtitle: '3 200 € - Il y a 2 jours', icon: TrendingUp, accent: 'violet' },
];

const recentSearches = [
  { id: 'r1', query: 'Compte bancaire', accent: 'violet' as const },
  { id: 'r2', query: 'Facture janvier', accent: 'orange' as const },
  { id: 'r3', query: 'TVA 2024', accent: 'violet' as const },
  { id: 'r4', query: 'Client ABC', accent: 'orange' as const },
];

export const SearchGlobal: React.FC<SearchGlobalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 1) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = mockResults.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle?.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const getAccentClasses = (accent: 'violet' | 'orange', type: 'bg' | 'text' | 'border' = 'bg') => {
    if (accent === 'violet') {
      return {
        bg: 'bg-purple-50',
        text: 'text-[#4C34CE]',
        border: 'border-[#4C34CE]',
        icon: 'bg-[#4C34CE] text-white',
        hover: 'hover:bg-purple-100'
      };
    } else {
      return {
        bg: 'bg-orange-50',
        text: 'text-[#FAA016]',
        border: 'border-[#FAA016]',
        icon: 'bg-[#FAA016] text-white',
        hover: 'hover:bg-orange-100'
      };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-3xl z-[101]"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Header avec fine ligne violette */}
              <div className="border-t-2 border-[#4C34CE]">
                {/* Search Input */}
                <div className="p-5">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-10 h-10 bg-[#4C34CE] rounded-lg flex items-center justify-center">
                        <Search className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Rechercher un compte, une transaction, un client..."
                      className="w-full pl-16 pr-12 py-3 text-base bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4C34CE] focus:bg-white transition-all placeholder-gray-400"
                    />
                    <button
                      onClick={onClose}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                      <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Results or Suggestions */}
              <div className="max-h-[400px] overflow-y-auto bg-white">
                {query.length === 0 ? (
                  <div className="p-5">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#FAA016]" />
                        Recherches récentes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, index) => {
                          const isViolet = search.accent === 'violet';
                          return (
                            <motion.button
                              key={search.id}
                              onClick={() => setQuery(search.query)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all border",
                                isViolet 
                                  ? "border-[#4C34CE]/20 text-[#4C34CE] hover:bg-[#4C34CE]/5"
                                  : "border-[#FAA016]/20 text-[#FAA016] hover:bg-[#FAA016]/5"
                              )}
                            >
                              <Clock className="w-3 h-3" />
                              {search.query}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : isSearching ? (
                  <div className="p-8 text-center bg-white">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-10 h-10 border-2 border-[#4C34CE] border-t-transparent rounded-full mx-auto mb-3"
                    />
                    <p className="text-sm text-gray-500">Recherche en cours...</p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="p-2">
                    {results.map((result, index) => {
                      const Icon = result.icon;
                      const isViolet = result.accent === 'violet';
                      return (
                        <motion.button
                          key={result.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            console.log('Navigate to:', result);
                            onClose();
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-all text-left group"
                        >
                          <div className={cn(
                            'w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105',
                            isViolet ? 'bg-[#4C34CE]/10' : 'bg-[#FAA016]/10'
                          )}>
                            <Icon className={cn('w-4 h-4', isViolet ? 'text-[#4C34CE]' : 'text-[#FAA016]')} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">{result.title}</div>
                            {result.subtitle && (
                              <div className="text-xs text-gray-500 truncate">{result.subtitle}</div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-white">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 font-medium mb-1">Aucun résultat trouvé</p>
                    <p className="text-sm text-gray-500">pour "{query}"</p>
                  </div>
                )}
              </div>

              {/* Footer avec raccourci */}
              {query.length === 0 && (
                <div className="p-3 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs">
                    <div className="text-gray-500">
                      <span className="font-medium">Astuce :</span> Utilisez 
                      <kbd className="mx-1 px-1.5 py-0.5 bg-white rounded border border-gray-200 font-mono text-[10px]">⌘</kbd>
                      <kbd className="mr-1 px-1.5 py-0.5 bg-white rounded border border-gray-200 font-mono text-[10px]">K</kbd>
                      pour ouvrir rapidement la recherche
                    </div>
                    <div className="flex items-center gap-1 text-[#FAA016]">
                      <Sparkles className="w-3 h-3" />
                      <span className="font-medium">Recherche intelligente</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};