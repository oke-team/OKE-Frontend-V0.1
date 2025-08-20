import { 
  FileText, 
  Receipt, 
  CreditCard, 
  Camera,
  Upload,
  ShoppingCart,
  TrendingUp,
  FileSpreadsheet,
  Database,
  FileCheck,
  Building,
  Building2,
  Calculator,
  Download,
  FileCode,
  DollarSign,
  Package,
  Users,
  Calendar,
  MessageSquare,
  Zap
} from 'lucide-react';

export interface AddMenuItem {
  id: string;
  label: string;
  icon: any;
  color: string;
  description: string;
  hint?: string;
  acceptedFormats?: string[];
  isCommon?: boolean; // Pour identifier les options communes
  isHighlighted?: boolean; // Pour mettre en évidence certaines options
}

export interface ModuleAddConfig {
  moduleId: string;
  title: string;
  description: string;
  items: AddMenuItem[];
  dragDropHint?: string;
}

// Options communes à tous les modules
const commonItems: AddMenuItem[] = [
  {
    id: 'purchase-invoice',
    label: 'Facture d\'achat',
    icon: ShoppingCart,
    color: 'from-orange-500 to-red-500',
    description: 'Dépense payée par l\'entreprise',
    hint: 'Facture fournisseur, abonnement, service...',
    acceptedFormats: ['.pdf', '.jpg', '.png', '.xml'],
    isCommon: true
  },
  {
    id: 'expense-note',
    label: 'Note de frais',
    icon: Receipt,
    color: 'from-primary to-cyan-500',
    description: 'Dépense personnelle remboursable',
    hint: 'Payée par vous, à rembourser',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    isCommon: true
  },
  {
    id: 'document',
    label: 'Document',
    icon: FileText,
    color: 'from-gray-500 to-slate-600',
    description: 'Contrat, devis, courrier...',
    hint: 'Tout document à archiver',
    acceptedFormats: ['.pdf', '.doc', '.docx', '.jpg', '.png'],
    isCommon: true
  },
  {
    id: 'sales-invoice',
    label: 'Facture de vente',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    description: 'Créée depuis un autre logiciel',
    hint: 'Import pour archivage et suivi',
    acceptedFormats: ['.pdf', '.xml'],
    isCommon: true
  }
];

// Configuration pour le module Comptabilité
const accountingConfig: ModuleAddConfig = {
  moduleId: 'accounting',
  title: 'Importer en comptabilité',
  description: 'Documents et données comptables',
  dragDropHint: 'Factures, FEC, immobilisations, OD de paie...',
  items: [
    ...commonItems,
    {
      id: 'fec-import',
      label: 'Fichier FEC',
      icon: Database,
      color: 'from-secondary to-violet-600',
      description: 'Fichier des Écritures Comptables',
      hint: 'Export officiel pour l\'administration fiscale',
      acceptedFormats: ['.txt', '.csv', '.xml']
    },
    {
      id: 'payroll-od',
      label: 'OD de paie',
      icon: Users,
      color: 'from-indigo-500 to-blue-600',
      description: 'Écritures de paie mensuelles',
      hint: 'Import depuis votre logiciel de paie',
      acceptedFormats: ['.csv', '.xlsx', '.txt']
    },
    {
      id: 'immobilisations',
      label: 'Immobilisations',
      icon: Building,
      color: 'from-teal-500 to-green-600',
      description: 'Tableau des immobilisations',
      hint: 'Matériel, véhicules, logiciels...',
      acceptedFormats: ['.xlsx', '.xls', '.csv']
    },
    {
      id: 'chart-accounts',
      label: 'Plan comptable',
      icon: FileSpreadsheet,
      color: 'from-pink-500 to-rose-600',
      description: 'Import ou mise à jour du plan',
      hint: 'Liste des comptes comptables',
      acceptedFormats: ['.csv', '.xlsx', '.txt']
    }
  ]
};

// Configuration pour le module Banque
const bankConfig: ModuleAddConfig = {
  moduleId: 'bank',
  title: 'Importer dans le module bancaire',
  description: 'Relevés, transactions et paiements',
  dragDropHint: 'Relevés PDF, CSV, CFONB, listes de paiements...',
  items: [
    ...commonItems,
    {
      id: 'new-bank-account',
      label: 'Nouveau compte bancaire',
      icon: Building2,
      color: 'from-blue-500 to-cyan-600',
      description: 'Connexion sécurisée Bridge',
      hint: 'Synchronisation automatique des transactions',
      acceptedFormats: ['bridge-sync'],
      isHighlighted: true
    },
    {
      id: 'bank-statement-pdf',
      label: 'Relevé bancaire PDF',
      icon: FileText,
      color: 'from-primary to-indigo-600',
      description: 'Extraction intelligente du PDF',
      hint: 'Nous lisons automatiquement vos relevés',
      acceptedFormats: ['.pdf']
    },
    {
      id: 'bank-statement-file',
      label: 'Relevé bancaire',
      icon: FileSpreadsheet,
      color: 'from-green-500 to-teal-600',
      description: 'CSV, TXT, CFONB, OFX...',
      hint: 'Format exporté depuis votre banque',
      acceptedFormats: ['.csv', '.txt', '.cfonb', '.ofx', '.qif']
    },
    {
      id: 'payment-list',
      label: 'Liste de paiements',
      icon: CreditCard,
      color: 'from-secondary to-violet-600',
      description: 'Paiements effectués ou à venir',
      hint: 'Virements, prélèvements, chèques...',
      acceptedFormats: ['.csv', '.xlsx', '.txt']
    }
  ]
};

// Configuration pour le module Achats
const purchasesConfig: ModuleAddConfig = {
  moduleId: 'purchases',
  title: 'Importer dans les achats',
  description: 'Factures fournisseurs et dépenses',
  dragDropHint: 'Factures, notes de frais, bons de commande...',
  items: [
    ...commonItems,
    {
      id: 'purchase-order',
      label: 'Bon de commande',
      icon: FileCheck,
      color: 'from-amber-500 to-orange-600',
      description: 'Commande passée au fournisseur',
      hint: 'Pour suivi et rapprochement',
      acceptedFormats: ['.pdf', '.doc', '.docx']
    },
    {
      id: 'delivery-note',
      label: 'Bon de livraison',
      icon: Package,
      color: 'from-secondary to-pink-600',
      description: 'Confirmation de réception',
      hint: 'Réception de marchandises',
      acceptedFormats: ['.pdf', '.jpg']
    }
  ]
};

// Configuration pour le module Ventes
const salesConfig: ModuleAddConfig = {
  moduleId: 'sales',
  title: 'Importer dans les ventes',
  description: 'Factures clients et documents commerciaux',
  dragDropHint: 'Factures de vente, devis signés, avoirs...',
  items: [
    ...commonItems,
    {
      id: 'signed-quote',
      label: 'Devis signé',
      icon: FileCheck,
      color: 'from-indigo-500 to-blue-600',
      description: 'Devis accepté par le client',
      hint: 'Pour transformation en facture',
      acceptedFormats: ['.pdf', '.jpg']
    },
    {
      id: 'credit-note',
      label: 'Avoir client',
      icon: FileText,
      color: 'from-pink-500 to-rose-600',
      description: 'Note de crédit émise',
      hint: 'Remboursement ou réduction',
      acceptedFormats: ['.pdf', '.xml']
    },
    {
      id: 'customer-list',
      label: 'Liste de clients',
      icon: Users,
      color: 'from-secondary to-violet-600',
      description: 'Import base clients',
      hint: 'CSV ou Excel avec contacts',
      acceptedFormats: ['.csv', '.xlsx']
    }
  ]
};

// Configuration par défaut (Dashboard)
const defaultConfig: ModuleAddConfig = {
  moduleId: 'default',
  title: 'Ajouter rapidement',
  description: 'Import intelligent de documents',
  dragDropHint: 'Déposez n\'importe quel fichier, nous l\'analyserons automatiquement',
  items: commonItems
};

// Autres modules avec configuration basique
const stocksConfig: ModuleAddConfig = {
  moduleId: 'stocks',
  title: 'Gestion des stocks',
  description: 'Import d\'inventaire et mouvements',
  items: [
    {
      id: 'inventory',
      label: 'Inventaire',
      icon: Package,
      color: 'from-primary to-indigo-600',
      description: 'Import inventaire',
      acceptedFormats: ['.csv', '.xlsx']
    },
    {
      id: 'movement',
      label: 'Mouvement stock',
      icon: TrendingUp,
      color: 'from-green-500 to-teal-600',
      description: 'Entrée/Sortie'
    }
  ]
};

// Map de toutes les configurations
export const moduleConfigs: Record<string, ModuleAddConfig> = {
  accounting: accountingConfig,
  bank: bankConfig,
  purchases: purchasesConfig,
  sales: salesConfig,
  stocks: stocksConfig,
  default: defaultConfig,
  dashboard: defaultConfig
};

// Fonction helper pour obtenir la config d'un module
export function getModuleAddConfig(moduleId: string): ModuleAddConfig {
  return moduleConfigs[moduleId] || moduleConfigs.default;
}