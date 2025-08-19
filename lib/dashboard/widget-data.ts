/**
 * Données standardisées pour les widgets du dashboard
 * Format uniforme avec exactement 5 items par widget
 */

import { 
  Bell,
  CheckSquare,
  Calendar,
  MessageSquare,
  Building2,
  ShoppingCart,
  TrendingUp,
  UserCheck,
  CreditCard,
  FileText,
  Shield,
  Briefcase
} from 'lucide-react';

import { WidgetItem, UnifiedWidgetProps } from '@/components/dashboard/UnifiedWidgetCard';
import { getWidgetColors } from './widget-colors';

// Données mockées pour les notifications avec actions
const notificationsItems: WidgetItem[] = [
  { 
    id: 'notif-widget',
    label: '🎯 Personnalisez votre dashboard ! De nouveaux widgets sont disponibles pour simplifier vos démarches administratives',
    value: 'Personnaliser',
    trend: 'stable',
    action: '#',
    actionLabel: 'Découvrir',
    date: 'À l\'instant',
    isProcessed: false
  },
  { 
    id: 'notif-1', 
    label: 'Bienvenue dans OKÉ ! Connectez votre premier compte bancaire pour synchroniser vos transactions', 
    value: 'Connecter ma banque',
    trend: 'stable',
    action: '/bank/connect',
    actionLabel: 'Connecter',
    date: 'Il y a 2 heures',
    isProcessed: false
  },
  { 
    id: 'notif-2', 
    label: 'Vérifiez les informations juridiques de votre entreprise', 
    value: 'Vérifier',
    trend: 'stable',
    action: '/settings/company',
    actionLabel: 'Vérifier',
    date: 'Il y a 3 heures',
    isProcessed: false
  },
  { 
    id: 'notif-3', 
    label: 'Mettez à jour vos informations fiscales pour une gestion optimale', 
    value: 'Configurer',
    trend: 'stable',
    action: '/settings/tax',
    actionLabel: 'Configurer',
    date: 'Hier à 14h30',
    isProcessed: false
  },
  { 
    id: 'notif-4', 
    label: `Envoyez vos justificatifs par email à ${process.env.NEXT_PUBLIC_SIREN || '123456789'}@oke.pro`, 
    value: 'Tester',
    trend: 'stable',
    action: 'mailto:123456789@oke.pro',
    actionLabel: 'Envoyer un test',
    date: 'Hier à 10h00',
    isProcessed: true
  },
  { 
    id: 'notif-5', 
    label: 'Nous avons importé vos statuts et comptes annuels depuis Pappers', 
    value: 'Consulter',
    trend: 'stable',
    action: '/documents',
    actionLabel: 'Voir les documents',
    date: '15 février',
    isProcessed: true
  },
  { 
    id: 'notif-6', 
    label: 'Découvrez notre assistant IA pour répondre à toutes vos questions', 
    value: 'Essayer',
    trend: 'stable',
    action: '/chat',
    actionLabel: 'Ouvrir le chat',
    date: '14 février',
    isProcessed: false
  },
  { 
    id: 'notif-7', 
    label: 'Notre équipe support est disponible 24/7 dans le chat', 
    value: 'Contacter',
    trend: 'stable',
    action: '/chat?support=true',
    actionLabel: 'Contacter le support',
    date: '14 février',
    isProcessed: true
  }
];

// Données mockées pour la todo list
const todoItems: WidgetItem[] = [
  { id: 'todo-1', label: 'Valider les factures d\'achat', value: '5 en attente', trend: 'down' },
  { id: 'todo-2', label: 'Préparer déclaration TVA', value: 'Échéance 20/02', trend: 'down' },
  { id: 'todo-3', label: 'Relancer client ABC Corp', value: 'Retard 15j', trend: 'stable' },
  { id: 'todo-4', label: 'Réviser contrat fournisseur', value: 'En cours', trend: 'stable' },
  { id: 'todo-5', label: 'Rapprochement bancaire', value: 'À faire', trend: 'stable' }
];

// Données mockées pour l'agenda
const agendaItems: WidgetItem[] = [
  { id: 'agenda-1', label: 'RDV Expert-comptable', value: 'Aujourd\'hui 14h', trend: 'stable' },
  { id: 'agenda-2', label: 'Call client TechCorp', value: 'Demain 10h', trend: 'stable' },
  { id: 'agenda-3', label: 'Formation fiscalité', value: 'Lun 09h-12h', trend: 'stable' },
  { id: 'agenda-4', label: 'Audit interne', value: 'Mar 14h', trend: 'stable' },
  { id: 'agenda-5', label: 'Réunion équipe', value: 'Ven 16h', trend: 'stable' }
];

// Données mockées pour les messages
const messagesItems: WidgetItem[] = [
  { id: 'msg-1', label: 'Sophie Martin - Comptabilité', value: 'Question TVA', trend: 'stable' },
  { id: 'msg-2', label: 'Pierre Dupont - Client', value: 'Demande devis', trend: 'up' },
  { id: 'msg-3', label: 'Support Oké', value: 'Ticket résolu', trend: 'stable' },
  { id: 'msg-4', label: 'Banque - Conseiller', value: 'RDV proposé', trend: 'stable' },
  { id: 'msg-5', label: 'URSSAF', value: 'Rappel cotisations', trend: 'down' }
];

// Données mockées pour la banque (transactions récentes avec dates et justificatifs)
const bankItems: WidgetItem[] = [
  { 
    id: 'bank-1', 
    label: '18/02 - Virement TechCorp', 
    value: '+12 450 €', 
    trend: 'up',
    hasJustification: true, // Transaction avec justificatif
    needsJustification: false
  },
  { 
    id: 'bank-2', 
    label: '17/02 - Prélèvement loyer', 
    value: '-2 800 €', 
    trend: 'down',
    hasJustification: true, // Transaction avec justificatif
    needsJustification: false
  },
  { 
    id: 'bank-3', 
    label: '16/02 - Paiement fournisseur ABC', 
    value: '-4 320 €', 
    trend: 'down',
    hasJustification: false,
    needsJustification: true // Transaction nécessitant un justificatif
  },
  { 
    id: 'bank-4', 
    label: '15/02 - Encaissement CB', 
    value: '+892 €', 
    trend: 'up',
    hasJustification: false,
    needsJustification: true // Transaction nécessitant un justificatif
  },
  { 
    id: 'bank-5', 
    label: '15/02 - Frais bancaires', 
    value: '-45 €', 
    trend: 'down',
    hasJustification: true, // Transaction avec justificatif
    needsJustification: false
  },
  // Transactions supplémentaires visibles uniquement dans la vue étendue mobile
  { 
    id: 'bank-6', 
    label: '14/02 - Virement salaire employé', 
    value: '-3 500 €', 
    trend: 'down',
    hasJustification: true,
    needsJustification: false
  },
  { 
    id: 'bank-7', 
    label: '13/02 - Client StartupX', 
    value: '+5 670 €', 
    trend: 'up',
    hasJustification: true,
    needsJustification: false
  },
  { 
    id: 'bank-8', 
    label: '12/02 - Restaurant équipe', 
    value: '-234 €', 
    trend: 'down',
    hasJustification: false,
    needsJustification: true
  },
  { 
    id: 'bank-9', 
    label: '11/02 - Fournitures bureau', 
    value: '-156 €', 
    trend: 'down',
    hasJustification: false,
    needsJustification: true
  },
  { 
    id: 'bank-10', 
    label: '10/02 - Commission bancaire', 
    value: '-89 €', 
    trend: 'down',
    hasJustification: true,
    needsJustification: false
  }
];

// Données mockées pour les achats (dernières factures avec dates)
const purchasesItems: WidgetItem[] = [
  { id: 'purchases-1', label: '18/02 - Office Pro', value: '1 250 €', trend: 'stable' },
  { id: 'purchases-2', label: '17/02 - Telecom SA', value: '180 €', trend: 'stable' },
  { id: 'purchases-3', label: '16/02 - EDF', value: '420 €', trend: 'up', change: '+12%' },
  { id: 'purchases-4', label: '15/02 - Fournitures bureau', value: '892 €', trend: 'stable' },
  { id: 'purchases-5', label: '14/02 - Maintenance info', value: '650 €', trend: 'stable' }
];

// Données mockées pour les ventes (dernières factures avec dates)
const salesItems: WidgetItem[] = [
  { id: 'sales-1', label: '19/02 - TechCorp', value: '12 450 €', trend: 'up' },
  { id: 'sales-2', label: '18/02 - ABC Solutions', value: '8 900 €', trend: 'stable' },
  { id: 'sales-3', label: '17/02 - StartupX', value: '3 200 €', trend: 'stable' },
  { id: 'sales-4', label: '16/02 - InnovCo', value: '5 670 €', trend: 'stable' },
  { id: 'sales-5', label: '15/02 - Digital Pro', value: '4 030 €', trend: 'stable' }
];

// Données mockées pour les créances clients
const receivablesItems: WidgetItem[] = [
  { id: 'receivables-1', label: 'TechCorp - Retard 15j', value: '12 450 €', trend: 'down' },
  { id: 'receivables-2', label: 'ABC Solutions - Échue', value: '8 900 €', trend: 'down' },
  { id: 'receivables-3', label: 'StartupX - À échoir 5j', value: '3 200 €', trend: 'stable' },
  { id: 'receivables-4', label: 'InnovCo - Payée partiel', value: '2 835 €', trend: 'stable' },
  { id: 'receivables-5', label: 'Digital Pro - En cours', value: '4 030 €', trend: 'stable' }
];

// Données mockées pour les dettes fournisseurs
const payablesItems: WidgetItem[] = [
  { id: 'payables-1', label: 'Office Pro - Échue 5j', value: '4 250 €', trend: 'down' },
  { id: 'payables-2', label: 'Telecom SA - À échoir', value: '890 €', trend: 'stable' },
  { id: 'payables-3', label: 'EDF - Prélèvement 20/02', value: '420 €', trend: 'stable' },
  { id: 'payables-4', label: 'Maintenance Co - Payée', value: '0 €', trend: 'up' },
  { id: 'payables-5', label: 'Fournitures - En cours', value: '892 €', trend: 'stable' }
];

// Données mockées pour les attestations URSSAF - Format spécial
const urssafItems: WidgetItem[] = [
  { 
    id: 'urssaf-action', 
    label: 'Demandez une attestation de vigilance URSSAF pour vos appels d\'offres et marchés publics', 
    value: 'Demander',
    action: '/documents/urssaf/request',
    actionLabel: 'Demander l\'attestation',
    isSpecialFormat: true
  },
  { 
    id: 'urssaf-last', 
    label: 'Dernière attestation reçue le 01/02/2025', 
    value: 'Voir',
    action: '/documents/urssaf/last',
    actionLabel: 'Consulter',
    isSecondary: true
  }
];

// Données mockées pour les attestations fiscales - Format spécial
const fiscalItems: WidgetItem[] = [
  { 
    id: 'fiscal-action', 
    label: 'Demandez une attestation de régularité fiscale pour justifier votre situation auprès de l\'administration', 
    value: 'Demander',
    action: '/documents/fiscal/request',
    actionLabel: 'Demander l\'attestation',
    isSpecialFormat: true
  },
  { 
    id: 'fiscal-last', 
    label: 'Dernière attestation générée le 15/01/2025', 
    value: 'Voir',
    action: '/documents/fiscal/last',
    actionLabel: 'Consulter',
    isSecondary: true
  }
];

// Données mockées pour les PV de non rémunération - Format spécial
const pvRemunerationItems: WidgetItem[] = [
  { 
    id: 'pv-action', 
    label: 'Générez un PV de non rémunération du dirigeant pour renouveler vos Allocations de Retour à l\'Emploi ou pour justifier de votre non imposition ou optimiser votre situation', 
    value: 'Générer',
    action: '/documents/pv/generate',
    actionLabel: 'Générer le PV',
    isSpecialFormat: true
  },
  { 
    id: 'pv-last', 
    label: 'Dernier PV établi pour Q4 2024', 
    value: 'Voir',
    action: '/documents/pv/last',
    actionLabel: 'Consulter',
    isSecondary: true
  }
];

/**
 * Configuration complète des widgets avec leurs données
 */
export const widgetConfigs: Record<string, Omit<UnifiedWidgetProps, 'id'>> = {
  notifications: {
    title: 'Centre de notifications',
    subtitle: 'Actions recommandées pour bien démarrer',
    amount: undefined,
    icon: Bell,
    items: notificationsItems,
    moduleHref: '/notifications',
    ...getWidgetColors('notifications')
  },
  
  todo: {
    title: 'To-do list',
    subtitle: 'Tâches à effectuer',
    amount: undefined,
    icon: CheckSquare,
    items: todoItems,
    moduleHref: '/tasks',
    ...getWidgetColors('todo')
  },
  
  agenda: {
    title: 'Agenda',
    subtitle: 'Rendez-vous à venir',
    amount: undefined,
    icon: Calendar,
    items: agendaItems,
    moduleHref: '/calendar',
    ...getWidgetColors('agenda')
  },
  
  messages: {
    title: 'Messages',
    subtitle: 'Communications récentes',
    amount: undefined,
    icon: MessageSquare,
    items: messagesItems,
    moduleHref: '/messages',
    ...getWidgetColors('messages')
  },
  
  bank: {
    title: 'Banque',
    subtitle: 'Dernières transactions',
    amount: '48 750 €',
    icon: Building2,
    items: bankItems,
    moduleHref: '/bank',
    ...getWidgetColors('bank')
  },
  
  purchases: {
    title: 'Achats',
    subtitle: 'Dernières factures',
    amount: '3 392 €',
    icon: ShoppingCart,
    items: purchasesItems,
    moduleHref: '/purchases',
    ...getWidgetColors('purchases')
  },
  
  sales: {
    title: 'Ventes',
    subtitle: 'Dernières factures',
    amount: '34 250 €',
    icon: TrendingUp,
    items: salesItems,
    moduleHref: '/sales',
    ...getWidgetColors('sales')
  },
  
  receivables: {
    title: 'Créances clients',
    subtitle: 'Factures à encaisser',
    amount: undefined,
    icon: UserCheck,
    items: receivablesItems,
    moduleHref: '/accounting/receivables',
    ...getWidgetColors('receivables')
  },
  
  payables: {
    title: 'Dettes fournisseurs',
    subtitle: 'Factures à payer',
    amount: undefined,
    icon: CreditCard,
    items: payablesItems,
    moduleHref: '/accounting/payables',
    ...getWidgetColors('payables')
  },
  
  urssaf: {
    title: 'Attestations URSSAF',
    subtitle: 'Documents sociaux',
    amount: undefined,
    icon: Shield,
    items: urssafItems,
    moduleHref: '/documents/urssaf',
    ...getWidgetColors('urssaf')
  },
  
  fiscal: {
    title: 'Attestations fiscales',
    subtitle: 'Régularité fiscale',
    amount: undefined,
    icon: FileText,
    items: fiscalItems,
    moduleHref: '/documents/fiscal',
    ...getWidgetColors('fiscal')
  },
  
  pvRemuneration: {
    title: 'PV non rémunération',
    subtitle: 'Documents dirigeants',
    amount: undefined,
    icon: Briefcase,
    items: pvRemunerationItems,
    moduleHref: '/documents/pv',
    ...getWidgetColors('pvRemuneration')
  }
};

/**
 * Configuration par défaut des widgets affichés sur le dashboard
 */
export const defaultWidgetOrder = [
  'notifications', // Zone 1 - toujours visible
];

/**
 * Widgets de la zone 2 par défaut
 */
export const defaultZone2Widgets = [
  'bank',
  'purchases', 
  'sales'
];

/**
 * Widgets disponibles mais non affichés par défaut
 */
export const availableWidgets = [
  'todo',
  'agenda',
  'messages',
  'receivables',
  'payables',
  'urssaf',
  'fiscal',
  'pvRemuneration'
];

/**
 * Obtenir la configuration d'un widget par son ID
 */
export function getWidgetConfig(widgetId: string): UnifiedWidgetProps {
  const config = widgetConfigs[widgetId] || widgetConfigs.notifications;
  return {
    id: widgetId,
    ...config
  };
}