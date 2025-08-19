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
  CreditCard
} from 'lucide-react';

import { WidgetItem, UnifiedWidgetProps } from '@/components/dashboard/UnifiedWidgetCard';
import { getWidgetColors } from './widget-colors';

// Données mockées pour les notifications
const notificationsItems: WidgetItem[] = [
  { id: 'notif-1', label: 'Facture échue #INV-2025-089', value: 'Urgent', trend: 'down' },
  { id: 'notif-2', label: 'Nouveau message de Sophie Martin', value: 'Hier', trend: 'stable' },
  { id: 'notif-3', label: 'TVA à déclarer avant le 20/02', value: '3 jours', trend: 'down' },
  { id: 'notif-4', label: 'Paiement reçu de TechCorp', value: '2 450 €', trend: 'up' },
  { id: 'notif-5', label: 'Mise à jour système disponible', value: 'v2.1.0', trend: 'stable' }
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

// Données mockées pour les achats (dernières factures)
const purchasesItems: WidgetItem[] = [
  { id: 'purchases-1', label: 'FA-2025-156 Office Pro', value: '1 250 €', trend: 'stable' },
  { id: 'purchases-2', label: 'FA-2025-155 Telecom SA', value: '180 €', trend: 'stable' },
  { id: 'purchases-3', label: 'FA-2025-154 EDF', value: '420 €', trend: 'up', change: '+12%' },
  { id: 'purchases-4', label: 'FA-2025-153 Fournitures', value: '892 €', trend: 'stable' },
  { id: 'purchases-5', label: 'FA-2025-152 Maintenance', value: '650 €', trend: 'stable' }
];

// Données mockées pour les ventes (dernières factures)
const salesItems: WidgetItem[] = [
  { id: 'sales-1', label: 'FV-2025-089 TechCorp', value: '12 450 €', trend: 'up' },
  { id: 'sales-2', label: 'FV-2025-088 ABC Solutions', value: '8 900 €', trend: 'stable' },
  { id: 'sales-3', label: 'FV-2025-087 StartupX', value: '3 200 €', trend: 'stable' },
  { id: 'sales-4', label: 'FV-2025-086 InnovCo', value: '5 670 €', trend: 'stable' },
  { id: 'sales-5', label: 'FV-2025-085 Digital Pro', value: '4 030 €', trend: 'stable' }
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

/**
 * Configuration complète des widgets avec leurs données
 */
export const widgetConfigs: Record<string, Omit<UnifiedWidgetProps, 'id'>> = {
  notifications: {
    title: 'Notifications',
    subtitle: 'Alertes et rappels',
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
  }
};

/**
 * Configuration par défaut des widgets affichés sur le dashboard
 */
export const defaultWidgetOrder = [
  'notifications',
  'todo',
  'agenda',
  'messages',
  'bank',
  'purchases',
  'sales',
  'receivables',
  'payables'
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