/**
 * Configuration des 14 modules de l'application Oké
 * Architecture modulaire et évolutive
 */

import {
  LayoutDashboard,
  Building2,
  ShoppingCart,
  TrendingUp,
  FileText,
  Package,
  Calculator,
  Receipt,
  BarChart3,
  Users,
  MessageSquare,
  Mail,
  Calendar,
  Zap,
  Plus
} from 'lucide-react';

export interface Module {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  description: string;
  category: 'core' | 'business' | 'tools' | 'system';
  mobileVisible: boolean;
  color?: string;
  badge?: number;
}

/**
 * Les 14 modules de l'application Oké
 */
export const modules: Module[] = [
  // Core modules (visibles sur mobile)
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    description: 'Notifications, widgets et conseils personnalisés',
    category: 'core',
    mobileVisible: true
  },
  {
    id: 'bank',
    label: 'Banque',
    icon: Building2,
    href: '/bank',
    description: 'Bridge + Paynovate BAAS - Gestion bancaire intégrée',
    category: 'core',
    mobileVisible: true
  },
  {
    id: 'purchases',
    label: 'Achats',
    icon: ShoppingCart,
    href: '/purchases',
    description: 'PDP, facture électronique, invoice fetch Apify',
    category: 'core',
    mobileVisible: true
  },
  {
    id: 'sales',
    label: 'Ventes',
    icon: TrendingUp,
    href: '/sales',
    description: 'PDP, Factur-X, caisse retail, intégrations ecommerce CHIFT',
    category: 'core',
    mobileVisible: true
  },

  // Business modules
  {
    id: 'documents',
    label: 'Documents',
    icon: FileText,
    href: '/documents',
    description: 'Filebrowser Quantum + Univer + LibreOffice',
    category: 'business',
    mobileVisible: false
  },
  {
    id: 'stocks',
    label: 'Stocks',
    icon: Package,
    href: '/stocks',
    description: 'Gestion des stocks façon Odoo',
    category: 'business',
    mobileVisible: false
  },
  {
    id: 'accounting',
    label: 'Comptabilité',
    icon: Calculator,
    href: '/accounting',
    description: 'Balance, grand livre, auxiliaires, révision, immobilisations',
    category: 'business',
    mobileVisible: false
  },
  {
    id: 'tax',
    label: 'Fiscalité',
    icon: Receipt,
    href: '/tax',
    description: 'TVA, liasse fiscale, ASP One France',
    category: 'business',
    mobileVisible: false
  },
  {
    id: 'reporting',
    label: 'Reporting',
    icon: BarChart3,
    href: '/reporting',
    description: 'Analyses Finthesis-like avec Echarts',
    category: 'business',
    mobileVisible: false
  },
  {
    id: 'payroll',
    label: 'Paie/RH',
    icon: Users,
    href: '/payroll',
    description: 'OpenPayes France - Gestion complète RH',
    category: 'business',
    mobileVisible: false
  },

  // Tools modules
  {
    id: 'communication',
    label: 'Communication',
    icon: MessageSquare,
    href: '/communication',
    description: 'Intercom/Superhuman-like avec SnappyMail',
    category: 'tools',
    mobileVisible: false
  },
  {
    id: 'mail',
    label: 'Mail Backend',
    icon: Mail,
    href: '/mail',
    description: 'Infrastructure mail Mailu',
    category: 'system',
    mobileVisible: false
  },
  {
    id: 'organization',
    label: 'Organisation',
    icon: Calendar,
    href: '/organization',
    description: 'Agenda, Notes Tiptap, Todo/Kanban ClickUp-like',
    category: 'tools',
    mobileVisible: false
  },
  {
    id: 'automations',
    label: 'Automatisations',
    icon: Zap,
    href: '/automations',
    description: 'ActivePieces, Airtable-like automation',
    category: 'tools',
    mobileVisible: false
  }
];

/**
 * Configuration de la navigation mobile (5 icônes)
 */
export const mobileNavItems = [
  modules.find(m => m.id === 'dashboard')!,
  modules.find(m => m.id === 'bank')!,
  {
    id: 'add',
    label: 'Ajouter',
    icon: Plus,
    href: '#',
    description: 'Ajouter ou scanner',
    category: 'core' as const,
    mobileVisible: true,
    isPrimary: true
  },
  modules.find(m => m.id === 'purchases')!,
  modules.find(m => m.id === 'sales')!
];

/**
 * Configuration de la navigation desktop (tous les modules)
 */
export const desktopNavItems = modules.filter(m => m.category !== 'system');

/**
 * Obtenir un module par son ID
 */
export function getModuleById(id: string): Module | undefined {
  return modules.find(m => m.id === id);
}

/**
 * Obtenir les modules par catégorie
 */
export function getModulesByCategory(category: Module['category']): Module[] {
  return modules.filter(m => m.category === category);
}

/**
 * Obtenir les modules visibles sur mobile
 */
export function getMobileModules(): Module[] {
  return modules.filter(m => m.mobileVisible);
}