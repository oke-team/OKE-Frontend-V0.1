/**
 * Configuration des couleurs pour les widgets du dashboard
 * Style moderne et professionnel
 */

export interface WidgetColorScheme {
  colorFrom: string;
  colorTo: string;
  accentColor: string;
  name: string;
}

export const widgetColors: Record<string, WidgetColorScheme> = {
  // Notifications - Violet (comme les cartes entrepreneur)
  notifications: {
    colorFrom: '#8B5CF6',
    colorTo: '#9333EA',
    accentColor: '#7C3AED',
    name: 'Violet'
  },
  
  // Todo - Rouge (comme charges)
  todo: {
    colorFrom: '#EF4444',
    colorTo: '#F43F5E',
    accentColor: '#EF4444',
    name: 'Rouge'
  },
  
  // Agenda - Bleu (comme trésorerie)
  agenda: {
    colorFrom: '#3B82F6',
    colorTo: '#0EA5E9',
    accentColor: '#3B82F6',
    name: 'Bleu'
  },
  
  // Messages - Vert (comme produits)
  messages: {
    colorFrom: '#10B981',
    colorTo: '#059669',
    accentColor: '#10B981',
    name: 'Vert'
  },
  
  // Banque - Indigo profond
  bank: {
    colorFrom: '#6366F1',
    colorTo: '#4F46E5',
    accentColor: '#6366F1',
    name: 'Indigo'
  },
  
  // Achats - Orange vif
  purchases: {
    colorFrom: '#F97316',
    colorTo: '#EA580C',
    accentColor: '#F97316',
    name: 'Orange'
  },
  
  // Ventes - Vert émeraude
  sales: {
    colorFrom: '#10B981',
    colorTo: '#059669',
    accentColor: '#059669',
    name: 'Émeraude'
  },
  
  // Créances clients - Ambre doré
  receivables: {
    colorFrom: '#FCD34D',
    colorTo: '#FCA311',
    accentColor: '#F59E0B',
    name: 'Ambre'
  },
  
  // Dettes fournisseurs - Rose vif
  payables: {
    colorFrom: '#EC4899',
    colorTo: '#DB2777',
    accentColor: '#EC4899',
    name: 'Rose'
  },
  
  // Documents - Indigo profond
  documents: {
    colorFrom: '#6366F1',
    colorTo: '#4F46E5',
    accentColor: '#4338CA',
    name: 'Indigo Profond'
  },
  
  // Stocks - Jaune doré
  stocks: {
    colorFrom: '#F59E0B',
    colorTo: '#D97706',
    accentColor: '#B45309',
    name: 'Jaune Doré'
  },
  
  // Fiscalité - Violet améthyste
  tax: {
    colorFrom: '#A78BFA',
    colorTo: '#8B5CF6',
    accentColor: '#7C3AED',
    name: 'Violet Améthyste'
  },
  
  // Reporting - Cyan
  reporting: {
    colorFrom: '#22D3EE',
    colorTo: '#06B6D4',
    accentColor: '#0891B2',
    name: 'Cyan'
  },
  
  // Paie/RH - Fuchsia
  payroll: {
    colorFrom: '#E879F9',
    colorTo: '#D946EF',
    accentColor: '#C026D3',
    name: 'Fuchsia'
  },
  
  // Communication - Vert lime
  communication: {
    colorFrom: '#BEF264',
    colorTo: '#84CC16',
    accentColor: '#65A30D',
    name: 'Vert Lime'
  },
  
  // Organisation - Bleu saphir
  organization: {
    colorFrom: '#60A5FA',
    colorTo: '#2563EB',
    accentColor: '#1D4ED8',
    name: 'Bleu Saphir'
  },
  
  // Automatisations - Magenta
  automations: {
    colorFrom: '#F472B6',
    colorTo: '#EC4899',
    accentColor: '#DB2777',
    name: 'Magenta'
  }
};

/**
 * Obtenir le schéma de couleurs pour un module
 */
export function getWidgetColors(moduleId: string): WidgetColorScheme {
  return widgetColors[moduleId] || widgetColors.notifications;
}

/**
 * Générer des couleurs de gradient CSS pour un module
 */
export function getWidgetGradient(moduleId: string): string {
  const colors = getWidgetColors(moduleId);
  return `linear-gradient(135deg, ${colors.colorFrom} 0%, ${colors.colorTo} 100%)`;
}

/**
 * Toutes les couleurs disponibles pour le customizer
 */
export const availableColors = Object.entries(widgetColors).map(([id, scheme]) => ({
  id,
  ...scheme
}));