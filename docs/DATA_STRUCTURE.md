# Data Structure - OKÉ V0.1

## 📊 Structure des Données Hardcodées

Ce document définit la structure complète des données mockées pour tous les modules de l'application OKÉ.

## 🏢 Données Communes

### Company (Entreprise)
```typescript
export interface Company {
  id: string;
  name: string;
  siret: string;
  vat: string;
  address: Address;
  logo?: string;
  plan: 'starter' | 'pro' | 'enterprise';
  currency: 'EUR' | 'USD' | 'GBP';
  language: 'fr' | 'en' | 'es';
  createdAt: string;
  settings: CompanySettings;
}

export interface Address {
  street: string;
  zipCode: string;
  city: string;
  country: string;
}

export interface CompanySettings {
  fiscalYearStart: string;  // MM-DD
  defaultPaymentTerms: number;  // jours
  defaultVatRate: number;  // pourcentage
  accountingPlan: 'PCG' | 'IFRS';  // Plan comptable
}
```

### User (Utilisateur)
```typescript
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'accountant' | 'employee' | 'viewer';
  avatar?: string;
  companies: string[];  // IDs des entreprises
  preferences: UserPreferences;
  lastLogin: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'fr' | 'en' | 'es';
  notifications: boolean;
  expertMode: boolean;
  defaultCompany?: string;
}
```

## 💼 Module Accounting (Comptabilité)

### Account (Compte)
```typescript
export interface Account {
  id: string;
  code: string;  // Ex: "401000"
  label: string;  // Ex: "Fournisseurs"
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  category: string;  // Ex: "Fournisseurs et comptes rattachés"
  balance: number;
  currency: string;
  isAuxiliary: boolean;
  parentAccount?: string;  // Pour les comptes auxiliaires
  active: boolean;
}
```

### JournalEntry (Écriture Comptable)
```typescript
export interface JournalEntry {
  id: string;
  date: string;
  journal: string;  // Code journal (VE, AC, BQ, etc.)
  piece: string;  // Numéro de pièce
  accountCode: string;
  accountLabel: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  lettrage?: string;  // Pour le rapprochement
  status: 'validated' | 'draft' | 'pending';
  attachmentUrl?: string;
  attachmentType?: 'invoice' | 'receipt' | 'contract' | 'bank_statement' | 'other';
  bankTransactionId?: string;
  userId: string;  // Qui a créé l'écriture
  companyId: string;
}
```

## 🏦 Module Bank (Banque)

### BankAccount (Compte Bancaire)
```typescript
export interface BankAccount {
  id: string;
  name: string;
  bank: string;
  iban: string;
  bic: string;
  type: 'checking' | 'savings' | 'credit';
  currency: string;
  balance: number;
  overdraft?: number;
  companyId: string;
  active: boolean;
  syncEnabled: boolean;  // Bridge API
  lastSync?: string;
}
```

### BankTransaction (Transaction Bancaire)
```typescript
export interface BankTransaction {
  id: string;
  accountId: string;
  date: string;
  valueDate: string;
  label: string;
  reference: string;
  amount: number;
  balance: number;
  type: 'debit' | 'credit';
  category?: string;
  counterparty?: string;
  status: 'pending' | 'cleared' | 'reconciled';
  journalEntryId?: string;  // Lien comptable
  attachments?: string[];
}
```

### Transfer (Virement)
```typescript
export interface Transfer {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  currency: string;
  date: string;
  reference: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  fees?: number;
  exchangeRate?: number;  // Si devises différentes
}
```

## 💰 Module Sales (Ventes)

### Customer (Client)
```typescript
export interface Customer {
  id: string;
  type: 'individual' | 'company';
  name: string;
  email: string;
  phone?: string;
  address: Address;
  vatNumber?: string;
  siret?: string;
  paymentTerms: number;  // jours
  creditLimit?: number;
  balance: number;
  status: 'active' | 'inactive' | 'blocked';
  notes?: string;
  createdAt: string;
}
```

### Invoice (Facture)
```typescript
export interface Invoice {
  id: string;
  number: string;  // FA-2024-001
  customerId: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  vatAmount: number;
  total: number;
  paid: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod?: 'transfer' | 'card' | 'check' | 'cash';
  notes?: string;
  attachments?: string[];
  facturX?: boolean;  // Facture électronique
}

export interface InvoiceItem {
  id: string;
  productId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  discount?: number;
  total: number;
}
```

### Product (Produit/Service)
```typescript
export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  type: 'product' | 'service';
  category: string;
  unitPrice: number;
  vatRate: number;
  unit: string;  // "pièce", "heure", "kg", etc.
  stock?: number;
  active: boolean;
  accountingCode?: string;
}
```

## 🛒 Module Purchases (Achats)

### Supplier (Fournisseur)
```typescript
export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address: Address;
  vatNumber?: string;
  siret?: string;
  paymentTerms: number;
  iban?: string;
  bic?: string;
  status: 'active' | 'inactive';
  category: string;
  notes?: string;
}
```

### PurchaseOrder (Commande)
```typescript
export interface PurchaseOrder {
  id: string;
  number: string;  // CMD-2024-001
  supplierId: string;
  date: string;
  expectedDate: string;
  items: PurchaseOrderItem[];
  subtotal: number;
  vatAmount: number;
  total: number;
  status: 'draft' | 'sent' | 'confirmed' | 'received' | 'cancelled';
  notes?: string;
}

export interface PurchaseOrderItem {
  id: string;
  productId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  total: number;
}
```

### Expense (Dépense)
```typescript
export interface Expense {
  id: string;
  date: string;
  supplierId?: string;
  category: string;
  description: string;
  amount: number;
  vatAmount: number;
  paymentMethod: 'card' | 'transfer' | 'check' | 'cash';
  status: 'pending' | 'validated' | 'rejected';
  receipt?: string;  // URL du justificatif
  accountingCode?: string;
  userId: string;
}
```

## 📦 Module Stocks

### StockItem (Article en Stock)
```typescript
export interface StockItem {
  id: string;
  productId: string;
  warehouse: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  unitCost: number;
  totalValue: number;
  minStock: number;
  maxStock: number;
  lastMovement: string;
}
```

### StockMovement (Mouvement de Stock)
```typescript
export interface StockMovement {
  id: string;
  date: string;
  type: 'in' | 'out' | 'transfer' | 'adjustment';
  productId: string;
  quantity: number;
  fromWarehouse?: string;
  toWarehouse?: string;
  reference?: string;  // Facture, commande, etc.
  reason?: string;
  userId: string;
}
```

## 📊 Module Reporting

### Report (Rapport)
```typescript
export interface Report {
  id: string;
  name: string;
  type: 'balance' | 'pnl' | 'cashflow' | 'vat' | 'custom';
  period: {
    start: string;
    end: string;
  };
  data: any;  // Structure variable selon le type
  generatedAt: string;
  userId: string;
}
```

### KPI (Indicateur Clé)
```typescript
export interface KPI {
  id: string;
  name: string;
  category: string;
  value: number;
  previousValue?: number;
  change?: number;
  unit: 'currency' | 'percent' | 'number';
  period: string;
  target?: number;
  status: 'good' | 'warning' | 'critical';
}
```

## 👥 Module Payroll (Paie/RH)

### Employee (Employé)
```typescript
export interface Employee {
  id: string;
  userId: string;
  employeeNumber: string;
  position: string;
  department: string;
  contractType: 'CDI' | 'CDD' | 'Apprentice' | 'Intern';
  startDate: string;
  endDate?: string;
  salary: {
    gross: number;
    net: number;
    frequency: 'monthly' | 'hourly';
  };
  workingHours: number;  // heures/semaine
  remainingVacation: number;  // jours
  socialSecurity: string;
  status: 'active' | 'leave' | 'terminated';
}
```

### Payslip (Bulletin de Paie)
```typescript
export interface Payslip {
  id: string;
  employeeId: string;
  period: {
    month: number;
    year: number;
  };
  grossSalary: number;
  socialCharges: number;
  netSalary: number;
  employerCharges: number;
  details: PayslipLine[];
  status: 'draft' | 'validated' | 'paid';
  paidDate?: string;
  document?: string;  // URL du PDF
}

export interface PayslipLine {
  label: string;
  base: number;
  rate: number;
  employeeAmount: number;
  employerAmount: number;
}
```

## 📅 Module Organization

### Event (Événement)
```typescript
export interface Event {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  allDay: boolean;
  location?: string;
  attendees: string[];  // User IDs
  type: 'meeting' | 'task' | 'reminder' | 'holiday';
  status: 'tentative' | 'confirmed' | 'cancelled';
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    until?: string;
  };
}
```

### Task (Tâche)
```typescript
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'done' | 'cancelled';
  assignedTo: string[];  // User IDs
  project?: string;
  tags: string[];
  checklist?: ChecklistItem[];
  attachments?: string[];
  createdAt: string;
  completedAt?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}
```

## 🔄 Module Automations

### Workflow (Flux Automatisé)
```typescript
export interface Workflow {
  id: string;
  name: string;
  description?: string;
  trigger: WorkflowTrigger;
  conditions?: WorkflowCondition[];
  actions: WorkflowAction[];
  active: boolean;
  lastRun?: string;
  runCount: number;
}

export interface WorkflowTrigger {
  type: 'schedule' | 'event' | 'webhook' | 'manual';
  config: any;  // Variable selon le type
}

export interface WorkflowCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater' | 'less';
  value: any;
}

export interface WorkflowAction {
  type: 'email' | 'notification' | 'createRecord' | 'updateRecord';
  config: any;  // Variable selon le type
}
```

## 📧 Module Communication

### Message (Message)
```typescript
export interface Message {
  id: string;
  threadId: string;
  from: string;  // User ID ou email
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  html?: string;
  attachments?: Attachment[];
  date: string;
  read: boolean;
  starred: boolean;
  labels: string[];
  folder: 'inbox' | 'sent' | 'draft' | 'trash' | 'spam';
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}
```

## 🔐 Données de Session

### Session
```typescript
export interface Session {
  user: User;
  currentCompany: Company;
  permissions: Permission[];
  preferences: SessionPreferences;
  token: string;
  expiresAt: string;
}

export interface Permission {
  module: string;
  actions: ('read' | 'write' | 'delete')[];
}

export interface SessionPreferences {
  sidebarCollapsed: boolean;
  recentModules: string[];
  favoriteReports: string[];
  dashboardLayout: any;  // Configuration des widgets
}
```

## 📝 Guidelines d'Utilisation

### Convention de Nommage
- IDs : Format `PREFIX-YEAR-NUMBER` (Ex: `FA-2024-001`)
- Dates : Format ISO 8601 (`YYYY-MM-DD`)
- Montants : En centimes pour éviter les erreurs de float
- Status : Enums stricts en lowercase

### Validation des Données
```typescript
// Exemple de validation
export function validateInvoice(invoice: Partial<Invoice>): string[] {
  const errors: string[] = [];
  
  if (!invoice.customerId) {
    errors.push('Customer is required');
  }
  
  if (!invoice.items || invoice.items.length === 0) {
    errors.push('At least one item is required');
  }
  
  if (invoice.dueDate && invoice.date) {
    if (new Date(invoice.dueDate) < new Date(invoice.date)) {
      errors.push('Due date must be after invoice date');
    }
  }
  
  return errors;
}
```

### Relations entre Modules
```typescript
// Exemple de liaison
// Invoice -> JournalEntry
function createAccountingEntryFromInvoice(invoice: Invoice): JournalEntry[] {
  return [
    {
      // Débit client
      accountCode: '411000',
      debit: invoice.total,
      credit: 0,
      // ...
    },
    {
      // Crédit ventes
      accountCode: '701000',
      debit: 0,
      credit: invoice.subtotal,
      // ...
    },
    {
      // TVA collectée
      accountCode: '445710',
      debit: 0,
      credit: invoice.vatAmount,
      // ...
    }
  ];
}
```

## 🔗 Ressources

- [Frontend Guidelines](./FRONTEND_GUIDELINES.md)
- [Module Template](./MODULE_TEMPLATE.md)
- [Component Catalog](./COMPONENT_CATALOG.md)