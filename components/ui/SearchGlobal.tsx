'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, Users, Package, CreditCard, TrendingUp, Clock } from 'lucide-react';
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
  color: string;
}

const mockResults: SearchResult[] = [
  { id: '1', type: 'account', title: 'BNP Paribas - Compte courant', subtitle: '45 231 €', icon: CreditCard, color: 'blue' },
  { id: '2', type: 'client', title: 'Client ABC Corp', subtitle: '12 500 € à encaisser', icon: Users, color: 'green' },
  { id: '3', type: 'supplier', title: 'Fournisseur Alpha', subtitle: '8 500 € à payer', icon: Package, color: 'orange' },
  { id: '4', type: 'document', title: 'Facture FA-2024-001', subtitle: 'Émise le 15/01/2024', icon: FileText, color: 'purple' },
  { id: '5', type: 'transaction', title: 'Virement SEPA', subtitle: '3 200 € - Il y a 2 jours', icon: TrendingUp, color: 'indigo' },
];

const recentSearches = [
  'Compte bancaire',
  'Facture janvier',
  'TVA 2024',
  'Client ABC',
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

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600',
      indigo: 'bg-indigo-100 text-indigo-600',
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
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
            className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-[101]"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Rechercher un compte, une transaction, un client..."
                    className="w-full pl-12 pr-12 py-3 text-lg bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:bg-white transition-all"
                  />
                  <button
                    onClick={onClose}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Results or Suggestions */}
              <div className="max-h-[400px] overflow-y-auto">
                {query.length === 0 ? (
                  <div className="p-4">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Recherches récentes</h3>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, index) => (
                          <button
                            key={`recent-${search.replace(/\s+/g,'-')}-${index}`}
                            onClick={() => setQuery(search)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
                          >
                            <Clock className="w-3 h-3" />
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : isSearching ? (
                  <div className="p-8 text-center">
                    <div className="inline-flex items-center gap-2 text-gray-500">
                      <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                      Recherche en cours...
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="p-2">
                    {results.map((result) => {
                      const Icon = result.icon;
                      return (
                        <button
                          key={result.id}
                          onClick={() => {
                            console.log('Navigate to:', result);
                            onClose();
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                        >
                          <div className={cn('p-2 rounded-lg', getColorClasses(result.color))}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">{result.title}</div>
                            {result.subtitle && (
                              <div className="text-sm text-gray-500 truncate">{result.subtitle}</div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    Aucun résultat trouvé pour "{query}"
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              {query.length === 0 && (
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Astuce :</span> Utilisez 
                    <kbd className="mx-1 px-1.5 py-0.5 bg-white rounded border border-gray-300 text-xs">⌘</kbd>
                    <kbd className="mr-1 px-1.5 py-0.5 bg-white rounded border border-gray-300 text-xs">K</kbd>
                    pour ouvrir rapidement la recherche
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