'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Euro,
  Receipt,
  ShoppingCart,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  FileText,
  Users,
  Package,
  Calendar,
  BarChart3,
  Activity,
  Zap,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Widget {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description?: string;
}

interface ActivityItem {
  id: string;
  type: 'invoice' | 'payment' | 'expense' | 'bank';
  title: string;
  description: string;
  time: string;
  status: 'pending' | 'completed' | 'warning';
  amount?: string;
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

const widgets: Widget[] = [
  {
    id: 'revenue',
    title: 'Chiffre d\'affaires',
    value: '45,230€',
    change: 12.5,
    trend: 'up',
    icon: <Euro className="w-5 h-5" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    description: 'Ce mois'
  },
  {
    id: 'expenses',
    title: 'Dépenses',
    value: '18,420€',
    change: -3.2,
    trend: 'down',
    icon: <ShoppingCart className="w-5 h-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    description: 'Ce mois'
  },
  {
    id: 'invoices',
    title: 'Factures en attente',
    value: '12',
    icon: <Receipt className="w-5 h-5" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    description: '3,450€ total'
  },
  {
    id: 'balance',
    title: 'Solde bancaire',
    value: '23,850€',
    change: 8.1,
    trend: 'up',
    icon: <CreditCard className="w-5 h-5" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    description: 'Tous comptes'
  }
];

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'invoice',
    title: 'Nouvelle facture reçue',
    description: 'Amazon Web Services - 342€',
    time: 'Il y a 5 min',
    status: 'pending',
    amount: '342€'
  },
  {
    id: '2',
    type: 'payment',
    title: 'Paiement client reçu',
    description: 'TechStart SAS - Facture #2024-001',
    time: 'Il y a 1h',
    status: 'completed',
    amount: '2,800€'
  },
  {
    id: '3',
    type: 'bank',
    title: 'Rapprochement bancaire',
    description: '12 transactions à valider',
    time: 'Il y a 2h',
    status: 'warning'
  },
  {
    id: '4',
    type: 'expense',
    title: 'Note de frais ajoutée',
    description: 'Transport - Marie Dupont',
    time: 'Il y a 3h',
    status: 'pending',
    amount: '45€'
  },
  {
    id: '5',
    type: 'invoice',
    title: 'Facture payée',
    description: 'GlobalTech - Facture #2024-089',
    time: 'Hier',
    status: 'completed',
    amount: '5,200€'
  }
];

const quickActions: QuickAction[] = [
  {
    id: 'invoice',
    title: 'Créer une facture',
    icon: <FileText className="w-5 h-5" />,
    color: 'text-blue-600'
  },
  {
    id: 'expense',
    title: 'Ajouter une dépense',
    icon: <Receipt className="w-5 h-5" />,
    color: 'text-orange-600'
  },
  {
    id: 'client',
    title: 'Nouveau client',
    icon: <Users className="w-5 h-5" />,
    color: 'text-green-600'
  },
  {
    id: 'report',
    title: 'Voir les rapports',
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'text-purple-600'
  }
];

const chartData = [
  { month: 'Jan', revenue: 32000, expenses: 24000 },
  { month: 'Fév', revenue: 35000, expenses: 22000 },
  { month: 'Mar', revenue: 38000, expenses: 25000 },
  { month: 'Avr', revenue: 42000, expenses: 28000 },
  { month: 'Mai', revenue: 45230, expenses: 18420 }
];

export default function DashboardWidgets() {
  const maxValue = Math.max(...chartData.flatMap(d => [d.revenue, d.expenses]));

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* KPI Cards - Responsive grid optimisé */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {widgets.map((widget, index) => (
          <motion.div
            key={widget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-3 sm:p-4 hover:shadow-glass-lg transition-all duration-300 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 truncate">{widget.title}</p>
                <p className="text-xl sm:text-2xl font-bold mt-1">{widget.value}</p>
                
                {widget.change && (
                  <div className="flex items-center gap-1 mt-2">
                    {widget.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={cn(
                      "text-sm font-medium",
                      widget.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    )}>
                      {widget.trend === 'up' ? '+' : ''}{widget.change}%
                    </span>
                  </div>
                )}
                
                {widget.description && (
                  <p className="text-xs text-neutral-500 mt-1">{widget.description}</p>
                )}
              </div>
              
              <div className={cn(
                "p-2 rounded-lg group-hover:scale-110 transition-transform",
                widget.bgColor
              )}>
                <div className={widget.color}>{widget.icon}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-card p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
            <h3 className="text-base sm:text-lg font-semibold">Évolution des revenus</h3>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs sm:text-sm">Revenus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-xs sm:text-sm">Dépenses</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-end justify-between gap-2">
              {chartData.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex gap-1 items-end h-48">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.revenue / maxValue) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-primary to-primary/60 rounded-t-lg hover:opacity-80 transition-opacity relative group"
                    >
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {(data.revenue / 1000).toFixed(0)}k€
                      </span>
                    </motion.div>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.expenses / maxValue) * 100}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-secondary to-secondary/60 rounded-t-lg hover:opacity-80 transition-opacity relative group"
                    >
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {(data.expenses / 1000).toFixed(0)}k€
                      </span>
                    </motion.div>
                  </div>
                  <span className="text-xs text-neutral-600 dark:text-neutral-400">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={action.onClick}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/50 dark:bg-neutral-800/50 hover:bg-white/80 dark:hover:bg-neutral-800/80 transition-all duration-200 group"
              >
                <div className={cn(
                  "p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 group-hover:scale-110 transition-transform",
                  action.color
                )}>
                  {action.icon}
                </div>
                <span className="text-xs font-medium text-center">{action.title}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Activité récente</h3>
            <button className="text-sm text-primary hover:underline">Voir tout</button>
          </div>
          
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <div className={cn(
                  "p-2 rounded-lg",
                  activity.status === 'completed' && "bg-green-50 dark:bg-green-900/20 text-green-600",
                  activity.status === 'pending' && "bg-orange-50 dark:bg-orange-900/20 text-orange-600",
                  activity.status === 'warning' && "bg-red-50 dark:bg-red-900/20 text-red-600"
                )}>
                  {activity.type === 'invoice' && <Receipt className="w-4 h-4" />}
                  {activity.type === 'payment' && <CreditCard className="w-4 h-4" />}
                  {activity.type === 'expense' && <ShoppingCart className="w-4 h-4" />}
                  {activity.type === 'bank' && <Activity className="w-4 h-4" />}
                </div>
                
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {activity.description}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">{activity.time}</p>
                </div>
                
                {activity.amount && (
                  <span className="text-sm font-semibold">{activity.amount}</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Insights IA</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Opportunité détectée</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                    Vos revenus ont augmenté de 28% ce trimestre. C'est le moment idéal pour négocier de meilleurs tarifs fournisseurs.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Bon point</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                    Votre délai moyen de paiement client s'est amélioré de 5 jours ce mois.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Action recommandée</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                    3 factures clients sont en retard de plus de 30 jours. Envisagez une relance automatique.
                  </p>
                  <button className="mt-2 text-xs text-orange-600 hover:underline flex items-center gap-1">
                    Configurer les relances <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}