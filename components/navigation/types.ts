/**
 * Types pour les composants de navigation
 */

import { ComponentType } from 'react';

/**
 * Catégories d'items de navigation
 */
export type NavCategory = 'core' | 'business' | 'tools';

/**
 * Interface pour un item de navigation
 */
export interface NavItem {
  /** Identifiant unique de l'item */
  id: string;
  /** Label affiché sous l'icône */
  label: string;
  /** Composant d'icône Lucide React */
  icon: ComponentType<{ size?: number; className?: string }>;
  /** URL de destination */
  href: string;
  /** Si l'item est actuellement actif */
  isActive?: boolean;
  /** Si l'item est le bouton d'action primaire (bouton "+") */
  isPrimary?: boolean;
  /** Si l'item est le bouton "Autres" pour afficher tous les modules */
  isMore?: boolean;
  /** Si l'item est un composant de navigation contextuelle */
  isNavigation?: boolean;
  /** Si l'item est un placeholder non-cliquable */
  isPlaceholder?: boolean;
  /** Catégorie pour le filtrage responsive */
  category?: NavCategory;
  /** Si l'item est désactivé */
  disabled?: boolean;
  /** Badge count (pour les notifications) */
  badgeCount?: number;
  /** Couleur personnalisée pour l'item */
  color?: string;
}

/**
 * Props pour le composant BottomNav
 */
export interface BottomNavProps {
  /** ID de l'item actuellement actif */
  activeItem?: string;
  /** Callback appelé lors de la sélection d'un item */
  onItemSelect?: (itemId: string, item: NavItem) => void;
  /** Classes CSS personnalisées */
  className?: string;
  /** Items de navigation personnalisés (remplace la configuration par défaut) */
  items?: NavItem[];
  /** Si la navigation doit être masquée */
  hidden?: boolean;
  /** Variante de style */
  variant?: 'default' | 'minimal' | 'floating';
  /** Position pour la version desktop */
  position?: 'bottom' | 'top' | 'left' | 'right';
  /** Animation désactivée */
  disableAnimation?: boolean;
  /** Props de pagination pour navigation contextuelle */
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

/**
 * Configuration des items de navigation par défaut
 */
export interface NavigationConfig {
  /** Items principaux (toujours visibles) */
  core: NavItem[];
  /** Items business (visibles sur desktop) */
  business: NavItem[];
  /** Items outils (visibles sur desktop) */
  tools: NavItem[];
}

/**
 * État de navigation global
 */
export interface NavigationState {
  /** Item actuellement actif */
  activeItem: string;
  /** Historique de navigation */
  history: string[];
  /** Si la navigation est ouverte (pour mobile) */
  isOpen: boolean;
}

/**
 * Context de navigation
 */
export interface NavigationContextValue extends NavigationState {
  /** Fonction pour changer l'item actif */
  setActiveItem: (itemId: string) => void;
  /** Fonction pour basculer la navigation */
  toggleNavigation: () => void;
  /** Fonction pour naviguer vers un item */
  navigateTo: (itemId: string, item: NavItem) => void;
  /** Fonction pour revenir en arrière */
  goBack: () => void;
}