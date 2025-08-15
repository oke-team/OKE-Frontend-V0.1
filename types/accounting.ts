/**
 * Types unifiés pour le module comptabilité
 * Centralise tous les types liés aux transactions, clients et fournisseurs
 */

// Types de base pour les transactions
export type TransactionType = 'invoice' | 'payment' | 'credit_note' | 'expense';

export type TransactionStatus = 'paid' | 'partial' | 'pending' | 'overdue' | 'draft';

export interface BaseTransaction {
  id: string;
  type: TransactionType;
  reference: string;
  date: string;
  label: string;
  amount: number;
  status: TransactionStatus;
  linkedTo?: string[]; // Références des transactions liées (pour le lettrage)
  attachments?: number;
  description?: string;
  lettrageCode?: string; // Code de lettrage (A, B, C, etc.)
}

// Transaction pour ClientDetailView
export interface Transaction extends BaseTransaction {
  dueDate?: string;
  paymentMethod?: string;
}

// Transaction pour CategoryDetailView
export interface CategoryTransaction extends BaseTransaction {
  daysLeft?: number;
  client?: string;
  supplier?: string;
  icon?: string;
}

// Transaction pour ClientGroupView
export interface TransactionDetail extends BaseTransaction {
  // Version simplifiée pour l'affichage groupé
}

// Types pour les entités (clients/fournisseurs)
export type EntityType = 'client' | 'supplier';

export interface BaseEntity {
  id: string;
  name: string;
  initials?: string;
  email?: string;
  phone?: string;
  address?: string;
  totalDue: number;
  transactions: Transaction[];
  creditLimit?: number;
  customerSince?: string;
  lastActivity?: string;
  color?: string;
}

export interface ClientDetail extends BaseEntity {
  type: EntityType;
}

// Type pour les groupes de clients/fournisseurs
export interface ClientGroup {
  id: string;
  name: string;
  initials?: string;
  totalDue: number;
  transactions: TransactionDetail[];
  icon?: string;
  daysOldest?: number;
  contactInfo?: {
    email?: string;
    phone?: string;
  };
  color?: string;
}

// Types pour les catégories comptables
export type AccountingCategory = 'income' | 'expenses' | 'receivables' | 'payables' | 'bank';

// Interface pour les calculs de totaux (optimisation performance)
export interface TransactionTotals {
  totalDebits: number;
  totalCredits: number;
  balance: number;
  countPaid: number;
  countPending: number;
  countOverdue: number;
}

// Types pour les filtres
export interface TransactionFilters {
  searchQuery: string;
  filterStatus: TransactionStatus | 'all';
  dateRange?: {
    start: string;
    end: string;
  };
}

// Types pour les actions
export type TransactionAction = 
  | 'view_detail'
  | 'send_reminder'
  | 'record_payment'
  | 'schedule_payment'
  | 'pay_now'
  | 'pay_supplier'
  | 'new_invoice'
  | 'view_history'
  | 'mark_as_paid'
  | 'create_credit_note';