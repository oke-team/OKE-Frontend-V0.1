/**
 * Hook pour gérer la recherche d'entreprises
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { 
  searchCompaniesInsee, 
  searchBySiren, 
  validateSiren,
  formatSiren,
  type CompanySearchResult,
  type CompanySearchFilters
} from '@/lib/services/onboarding/inseeService';

interface UseCompanySearchOptions {
  minSearchLength?: number;
  debounceDelay?: number;
  maxResults?: number;
}

export function useCompanySearch(options: UseCompanySearchOptions = {}) {
  const {
    minSearchLength = 3,
    debounceDelay = 300,
    maxResults = 20
  } = options;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CompanySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<CompanySearchResult | null>(null);
  const [filters, setFilters] = useState<CompanySearchFilters>({});
  const [searchType, setSearchType] = useState<'name' | 'siren'>('name');

  // Refs pour gérer les debounces et annulations
  const debounceRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();

  // Détecte automatiquement le type de recherche
  const detectSearchType = useCallback((searchQuery: string): 'name' | 'siren' => {
    const cleanQuery = searchQuery.replace(/\s/g, '');
    return /^\d+$/.test(cleanQuery) ? 'siren' : 'name';
  }, []);

  // Fonction de recherche principale
  const performSearch = useCallback(async (searchQuery: string, searchFilters: CompanySearchFilters = {}) => {
    if (!searchQuery.trim() || searchQuery.trim().length < minSearchLength) {
      setResults([]);
      return;
    }

    // Annule la recherche précédente
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      const type = detectSearchType(searchQuery);
      setSearchType(type);

      let searchResults: CompanySearchResult[] = [];

      if (type === 'siren') {
        // Recherche par SIREN
        if (validateSiren(searchQuery)) {
          searchResults = await searchBySiren(searchQuery);
        } else {
          // SIREN invalide, affiche un message d'erreur
          setError('Format SIREN invalide (9 chiffres requis)');
          setResults([]);
          return;
        }
      } else {
        // Recherche par nom
        searchResults = await searchCompaniesInsee(searchQuery, searchFilters);
      }

      // Limite les résultats
      const limitedResults = searchResults.slice(0, maxResults);
      setResults(limitedResults);

      // Si un seul résultat et recherche par SIREN, sélectionne automatiquement
      if (type === 'siren' && limitedResults.length === 1) {
        setSelectedCompany(limitedResults[0]);
      }

    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(`Erreur lors de la recherche: ${err.message}`);
        setResults([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [minSearchLength, maxResults, detectSearchType]);

  // Mise à jour de la requête avec debounce
  const updateQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setSelectedCompany(null); // Reset la sélection lors de la nouvelle recherche

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout for debounced search
    debounceRef.current = setTimeout(() => {
      performSearch(newQuery, filters);
    }, debounceDelay);
  }, [performSearch, filters, debounceDelay]);

  // Mise à jour des filtres
  const updateFilters = useCallback((newFilters: Partial<CompanySearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Relance la recherche avec les nouveaux filtres si on a une requête
    if (query.trim().length >= minSearchLength) {
      performSearch(query, updatedFilters);
    }
  }, [filters, query, minSearchLength, performSearch]);

  // Sélection d'une entreprise
  const selectCompany = useCallback((company: CompanySearchResult) => {
    setSelectedCompany(company);
    setQuery(company.nom_entreprise); // Met à jour le champ de recherche
    setResults([]); // Cache les résultats
  }, []);

  // Effacement de la sélection
  const clearSelection = useCallback(() => {
    setSelectedCompany(null);
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  // Recherche directe (sans debounce)
  const searchImmediately = useCallback((searchQuery: string, searchFilters?: CompanySearchFilters) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    performSearch(searchQuery, searchFilters || filters);
  }, [performSearch, filters]);

  // Effacement des erreurs
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Format de SIREN pour l'affichage
  const formattedSiren = useCallback((siren: string) => {
    return formatSiren(siren);
  }, []);

  // Validation SIREN
  const isValidSiren = useCallback((siren: string) => {
    return validateSiren(siren);
  }, []);

  // Nettoyage à la destruction
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Statistiques de recherche
  const searchStats = {
    hasQuery: query.trim().length > 0,
    hasMinLength: query.trim().length >= minSearchLength,
    resultsCount: results.length,
    isValidQuery: searchType === 'name' ? query.trim().length >= minSearchLength : validateSiren(query),
    searchType,
    hasFilters: Object.keys(filters).some(key => filters[key as keyof CompanySearchFilters])
  };

  return {
    // État de recherche
    query,
    results,
    isLoading,
    error,
    selectedCompany,
    filters,
    searchType,
    searchStats,

    // Actions
    updateQuery,
    updateFilters,
    selectCompany,
    clearSelection,
    searchImmediately,
    clearError,

    // Utilitaires
    formattedSiren,
    isValidSiren,
    detectSearchType,

    // Configuration
    minSearchLength,
    maxResults
  };
}