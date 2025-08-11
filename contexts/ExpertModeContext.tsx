'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface ExpertModeContextType {
  expertMode: boolean;
  toggleExpertMode: () => void;
  setExpertMode: (value: boolean) => void;
  // Onboarding
  showOnboarding: boolean;
  setShowOnboarding: (value: boolean) => void;
  onboardingStep: number;
  nextOnboardingStep: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  // Transition et feedback
  isTransitioning: boolean;
  transitionMessage: string | null;
  // Helpers pour la traduction et formatage
  term: (key: string) => string;
  explain: (concept: string) => string | null;
  formatAmount: (amount: number, showSign?: boolean) => string;
  formatAccount: (code: string, label: string) => string;
  getAccountIcon: (code: string) => string;
}

const ExpertModeContext = createContext<ExpertModeContextType | undefined>(undefined);

// Dictionnaire de traduction des termes comptables
const technicalTerms: Record<string, string> = {
  // Termes généraux
  'balance': 'Balance',
  'general_ledger': 'Grand livre',
  'journal_entry': 'Écriture comptable',
  'reconciliation': 'Rapprochement bancaire',
  'lettrage': 'Lettrage',
  'debit': 'Débit',
  'credit': 'Crédit',
  'piece': 'Pièce',
  'journal': 'Journal',
  
  // Actions
  'create_invoice': 'Nouvelle facture',
  'record_payment': 'Enregistrer un règlement',
  'reconcile': 'Rapprocher',
  'post_entry': 'Passer une écriture',
  
  // Statuts
  'pending': 'En attente',
  'validated': 'Validé',
  'draft': 'Brouillon',
  'reconciled': 'Rapproché',
  'unreconciled': 'Non rapproché',
};

const friendlyTerms: Record<string, string> = {
  // Termes généraux
  'balance': 'Situation des comptes',
  'general_ledger': 'Historique détaillé',
  'journal_entry': 'Transaction',
  'reconciliation': 'Vérifier mes paiements',
  'lettrage': 'Lier facture et paiement',
  'debit': 'Sortie',
  'credit': 'Entrée',
  'piece': 'Référence',
  'journal': 'Registre',
  
  // Actions
  'create_invoice': 'Créer une facture',
  'record_payment': 'J\'ai reçu/fait un paiement',
  'reconcile': 'Associer à une facture',
  'post_entry': 'Ajouter une opération',
  
  // Statuts
  'pending': 'En attente',
  'validated': 'Confirmé',
  'draft': 'Brouillon',
  'reconciled': 'Vérifié ✓',
  'unreconciled': 'À vérifier',
};

// Explications pour les concepts comptables (mode novice uniquement)
const conceptExplanations: Record<string, string> = {
  'balance': 'Vue d\'ensemble de ce que vous possédez, devez et de vos revenus/dépenses',
  'general_ledger': 'Liste complète de toutes vos transactions triées par compte',
  'reconciliation': 'Vérifier que chaque transaction bancaire correspond bien à une facture ou dépense',
  'lettrage': 'Marquer qu\'une facture a été payée en la liant au paiement reçu',
  'debit_credit': 'En comptabilité, chaque transaction a deux côtés : ce qui sort (débit) et ce qui entre (crédit)',
  'journal': 'Registre où sont enregistrées chronologiquement toutes vos opérations',
  'piece': 'Numéro unique qui identifie chaque transaction',
};

// Mapping des codes de comptes vers des catégories user-friendly
const accountCategories: Record<string, { icon: string; name: string; description: string }> = {
  '1': { icon: '🏢', name: 'Patrimoine', description: 'Ce que possède votre entreprise' },
  '2': { icon: '🏭', name: 'Investissements', description: 'Matériel et équipements durables' },
  '3': { icon: '📦', name: 'Stocks', description: 'Marchandises et produits en stock' },
  '4': { icon: '👥', name: 'Tiers', description: 'Clients, fournisseurs, état, salariés' },
  '40': { icon: '💳', name: 'Fournisseurs', description: 'Factures à payer' },
  '401': { icon: '💳', name: 'Fournisseurs à payer', description: 'Factures reçues non payées' },
  '41': { icon: '💰', name: 'Clients', description: 'Factures à encaisser' },
  '411': { icon: '💰', name: 'Clients à encaisser', description: 'Factures envoyées non payées' },
  '42': { icon: '👷', name: 'Personnel', description: 'Salaires et charges sociales' },
  '43': { icon: '🏛️', name: 'Organismes sociaux', description: 'Cotisations sociales' },
  '44': { icon: '🏛️', name: 'État et collectivités', description: 'TVA, impôts et taxes' },
  '445': { icon: '📊', name: 'TVA', description: 'Taxes sur la valeur ajoutée' },
  '5': { icon: '🏦', name: 'Finances', description: 'Comptes bancaires et caisse' },
  '51': { icon: '🏦', name: 'Banques', description: 'Comptes bancaires' },
  '512': { icon: '💳', name: 'Compte bancaire', description: 'Votre compte en banque' },
  '53': { icon: '💵', name: 'Caisse', description: 'Argent liquide' },
  '6': { icon: '💸', name: 'Charges', description: 'Dépenses et frais' },
  '60': { icon: '🛒', name: 'Achats', description: 'Achats de marchandises et matières' },
  '61': { icon: '🔧', name: 'Services', description: 'Services extérieurs' },
  '62': { icon: '📋', name: 'Autres services', description: 'Autres services extérieurs' },
  '63': { icon: '🏛️', name: 'Impôts et taxes', description: 'Impôts et taxes' },
  '64': { icon: '👥', name: 'Charges de personnel', description: 'Salaires et charges' },
  '7': { icon: '💰', name: 'Produits', description: 'Revenus et ventes' },
  '70': { icon: '💵', name: 'Ventes', description: 'Ventes de produits et services' },
  '701': { icon: '📦', name: 'Ventes de produits', description: 'Ventes de produits finis' },
  '706': { icon: '🛠️', name: 'Prestations', description: 'Prestations de services' },
};

export const ExpertModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expertMode, setExpertModeState] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState<string | null>(null);

  // Charger la préférence depuis localStorage au montage
  useEffect(() => {
    // Vérifier que nous sommes côté client
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('expertMode');
      const onboardingCompleted = localStorage.getItem('onboardingCompleted');
      
      if (stored !== null) {
        setExpertModeState(stored === 'true');
      }
      
      // Afficher l'onboarding si pas encore complété
      if (!onboardingCompleted) {
        setTimeout(() => setShowOnboarding(true), 1000);
      }
    }
  }, []);

  const toggleExpertMode = useCallback(() => {
    setIsTransitioning(true);
    setExpertModeState(prev => {
      const newValue = !prev;
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('expertMode', String(newValue));
      }
      
      // Message de feedback contextuel
      setTransitionMessage(
        newValue 
          ? "Mode Expert activé : Accès complet aux fonctionnalités avancées"
          : "Mode Entrepreneur activé : Interface épurée et guidée"
      );
      
      // Masquer le message après 3 secondes
      setTimeout(() => {
        setTransitionMessage(null);
        setIsTransitioning(false);
      }, 3000);
      
      return newValue;
    });
  }, []);

  const setExpertMode = useCallback((value: boolean) => {
    setIsTransitioning(true);
    setExpertModeState(value);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('expertMode', String(value));
    }
    
    setTransitionMessage(
      value 
        ? "Mode Expert activé : Accès complet aux fonctionnalités avancées"
        : "Mode Entrepreneur activé : Interface épurée et guidée"
    );
    
    setTimeout(() => {
      setTransitionMessage(null);
      setIsTransitioning(false);
    }, 3000);
  }, []);
  
  const nextOnboardingStep = useCallback(() => {
    setOnboardingStep(prev => prev + 1);
  }, []);
  
  const completeOnboarding = useCallback(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('onboardingCompleted', 'true');
    }
    setShowOnboarding(false);
    setOnboardingStep(0);
  }, []);
  
  const resetOnboarding = useCallback(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('onboardingCompleted');
    }
    setOnboardingStep(0);
    setShowOnboarding(true);
  }, []);

  const term = (key: string): string => {
    const terms = expertMode ? technicalTerms : friendlyTerms;
    return terms[key] || key;
  };

  const explain = (concept: string): string | null => {
    if (expertMode) return null;
    return conceptExplanations[concept] || null;
  };

  const formatAmount = (amount: number, showSign: boolean = false): string => {
    const formatted = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));

    if (showSign && amount !== 0) {
      return amount > 0 ? `+${formatted}` : `-${formatted}`;
    }
    return formatted;
  };

  const formatAccount = (code: string, label: string): string => {
    if (expertMode) {
      return `${code} - ${label}`;
    }
    
    // En mode novice, utiliser les catégories user-friendly
    const icon = getAccountIcon(code);
    const category = getAccountCategory(code);
    
    if (category) {
      return `${icon} ${category.name}`;
    }
    return `${icon} ${label}`;
  };

  const getAccountIcon = (code: string): string => {
    // Chercher la correspondance la plus précise
    const prefixes = [code.substring(0, 3), code.substring(0, 2), code.substring(0, 1)];
    
    for (const prefix of prefixes) {
      if (accountCategories[prefix]) {
        return accountCategories[prefix].icon;
      }
    }
    return '📄'; // Icône par défaut
  };

  const getAccountCategory = (code: string): { icon: string; name: string; description: string } | null => {
    const prefixes = [code.substring(0, 3), code.substring(0, 2), code.substring(0, 1)];
    
    for (const prefix of prefixes) {
      if (accountCategories[prefix]) {
        return accountCategories[prefix];
      }
    }
    return null;
  };

  const value: ExpertModeContextType = {
    expertMode,
    toggleExpertMode,
    setExpertMode,
    showOnboarding,
    setShowOnboarding,
    onboardingStep,
    nextOnboardingStep,
    completeOnboarding,
    resetOnboarding,
    isTransitioning,
    transitionMessage,
    term,
    explain,
    formatAmount,
    formatAccount,
    getAccountIcon,
  };

  return (
    <ExpertModeContext.Provider value={value}>
      {children}
    </ExpertModeContext.Provider>
  );
};

export const useExpertMode = (): ExpertModeContextType => {
  const context = useContext(ExpertModeContext);
  if (context === undefined) {
    throw new Error('useExpertMode must be used within an ExpertModeProvider');
  }
  return context;
};

// Hook helper pour obtenir des traductions spécifiques
export const useAccountingTerms = () => {
  const { expertMode, term, explain, formatAccount, getAccountIcon } = useExpertMode();
  
  return {
    expertMode,
    // Termes courants pré-traduits
    balance: term('balance'),
    generalLedger: term('general_ledger'),
    journalEntry: term('journal_entry'),
    reconciliation: term('reconciliation'),
    debit: term('debit'),
    credit: term('credit'),
    
    // Fonction de traduction
    t: term,
    
    // Fonction d'explication
    explain,
    
    // Formatage
    formatAccount,
    getAccountIcon,
    
    // Helper pour afficher débit/crédit
    formatDebitCredit: (debit: number, credit: number) => {
      if (expertMode) {
        return {
          debit: debit > 0 ? new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(debit) : '',
          credit: credit > 0 ? new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(credit) : '',
        };
      } else {
        // En mode novice, afficher comme entrée/sortie
        if (debit > 0) {
          return {
            label: '↗️ Sortie',
            amount: new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(debit),
            type: 'debit'
          };
        } else if (credit > 0) {
          return {
            label: '↘️ Entrée',
            amount: new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(credit),
            type: 'credit'
          };
        }
        return { label: '', amount: '', type: 'none' };
      }
    },
  };
};