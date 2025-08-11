'use client';

import React, { useState, useEffect } from 'react';
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
  Target,
  Building2,
  Briefcase,
  DollarSign,
  Percent,
  AlertTriangle,
  ChevronRight,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Send,
  Mail,
  Phone,
  MapPin,
  Globe,
  Star,
  TrendingUp as Trend
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Widget {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description?: string;
  details?: string[];
}

interface ActivityItem {
  id: string;
  type: 'invoice' | 'payment' | 'expense' | 'bank' | 'client' | 'product' | 'tax' | 'alert';
  title: string;
  description: string;
  time: string;
  status: 'pending' | 'completed' | 'warning' | 'info';
  amount?: string;
  badge?: string;
}

// Données enrichies pour les widgets principaux
const widgets: Widget[] = [
  {
    id: 'revenue',
    title: 'Chiffre d\'affaires',
    value: '127,845€',
    change: 18.3,
    trend: 'up',
    icon: <Euro className="w-5 h-5" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Ce mois (vs 108,152€)',
    details: ['42 factures émises', '38 payées', '4 en attente']
  },
  {
    id: 'expenses',
    title: 'Dépenses',
    value: '48,392€',
    change: -5.2,
    trend: 'down',
    icon: <ShoppingCart className="w-5 h-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Ce mois (vs 51,045€)',
    details: ['156 transactions', '23 fournisseurs', 'Budget: 85%']
  },
  {
    id: 'profit',
    title: 'Résultat net',
    value: '79,453€',
    change: 32.7,
    trend: 'up',
    icon: <Trend className="w-5 h-5" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Marge: 62.1%',
    details: ['Objectif: 75,000€', 'Atteint: 105.9%']
  },
  {
    id: 'balance',
    title: 'Trésorerie',
    value: '285,620€',
    change: 12.4,
    trend: 'up',
    icon: <CreditCard className="w-5 h-5" />,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    description: '4 comptes bancaires',
    details: ['BNP: 185,420€', 'LCL: 65,200€', 'Revolut: 35,000€']
  },
  {
    id: 'unpaid',
    title: 'Factures impayées',
    value: '34,280€',
    change: 8,
    trend: 'up',
    icon: <AlertCircle className="w-5 h-5" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    description: '12 factures',
    details: ['5 < 30 jours', '4 > 30 jours', '3 > 60 jours']
  },
  {
    id: 'clients',
    title: 'Clients actifs',
    value: '247',
    change: 15,
    trend: 'up',
    icon: <Users className="w-5 h-5" />,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    description: 'Ce trimestre',
    details: ['32 nouveaux', '8 premium', 'NPS: 72']
  },
  {
    id: 'products',
    title: 'Stock valorisé',
    value: '142,350€',
    change: -3.2,
    trend: 'down',
    icon: <Package className="w-5 h-5" />,
    color: 'text-lime-600',
    bgColor: 'bg-lime-50',
    description: '1,234 articles',
    details: ['15 ruptures', '28 alertes stock', 'Rotation: 4.2']
  },
  {
    id: 'tax',
    title: 'TVA à payer',
    value: '18,920€',
    change: 0,
    trend: 'stable',
    icon: <Percent className="w-5 h-5" />,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Échéance: 15/06',
    details: ['Collectée: 25,420€', 'Déductible: 6,500€']
  }
];

// Activités récentes enrichies
const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'invoice',
    title: 'Facture reçue - Amazon Web Services',
    description: 'Services cloud computing mensuel',
    time: 'Il y a 12 min',
    status: 'pending',
    amount: '3,842€',
    badge: 'Récurrent'
  },
  {
    id: '2',
    type: 'payment',
    title: 'Paiement reçu - TechStart SAS',
    description: 'Facture #2024-0456 - Projet développement',
    time: 'Il y a 45 min',
    status: 'completed',
    amount: '12,500€',
    badge: 'Premium'
  },
  {
    id: '3',
    type: 'alert',
    title: 'Alerte trésorerie',
    description: 'Prévision négative dans 45 jours si tendance maintenue',
    time: 'Il y a 2h',
    status: 'warning',
    badge: 'Important'
  },
  {
    id: '4',
    type: 'client',
    title: 'Nouveau client - GlobalTech Industries',
    description: 'Contrat annuel signé - 85,000€ HT',
    time: 'Il y a 3h',
    status: 'info',
    badge: 'Enterprise'
  },
  {
    id: '5',
    type: 'expense',
    title: 'Note de frais validée',
    description: 'Marie Dupont - Déplacement client Lyon',
    time: 'Il y a 4h',
    status: 'completed',
    amount: '342€'
  },
  {
    id: '6',
    type: 'bank',
    title: 'Rapprochement bancaire',
    description: '45 transactions rapprochées automatiquement',
    time: 'Il y a 5h',
    status: 'completed',
    badge: 'Auto'
  },
  {
    id: '7',
    type: 'product',
    title: 'Alerte stock faible',
    description: 'MacBook Pro 14" - Plus que 3 unités',
    time: 'Il y a 6h',
    status: 'warning',
    badge: 'Stock'
  },
  {
    id: '8',
    type: 'tax',
    title: 'Déclaration TVA',
    description: 'Rappel: déclaration mensuelle à faire avant le 15',
    time: 'Hier',
    status: 'info',
    badge: 'Fiscal'
  },
  {
    id: '9',
    type: 'invoice',
    title: 'Relance automatique envoyée',
    description: 'DataCorp - Facture #2024-0398 (45 jours de retard)',
    time: 'Hier',
    status: 'warning',
    amount: '8,750€'
  },
  {
    id: '10',
    type: 'payment',
    title: 'Virement SEPA programmé',
    description: 'Salaires équipe - 15 virements',
    time: 'Hier',
    status: 'pending',
    amount: '45,230€'
  }
];

// Top clients
const topClients = [
  { name: 'TechStart SAS', revenue: '45,230€', invoices: 12, trend: 'up', growth: '+23%' },
  { name: 'GlobalTech Industries', revenue: '38,420€', invoices: 8, trend: 'up', growth: '+15%' },
  { name: 'DataCorp', revenue: '28,950€', invoices: 15, trend: 'down', growth: '-5%' },
  { name: 'Innovation Labs', revenue: '22,180€', invoices: 6, trend: 'up', growth: '+42%' },
  { name: 'Digital Services', revenue: '18,340€', invoices: 9, trend: 'stable', growth: '0%' }
];

// Mouvements bancaires récents
const bankMovements = [
  { id: '1', date: '08/08', label: 'Virement SEPA - Salaires', amount: -45230, type: 'debit' },
  { id: '2', date: '08/08', label: 'Paiement client - TechStart', amount: 12500, type: 'credit' },
  { id: '3', date: '07/08', label: 'Prélèvement EDF', amount: -842, type: 'debit' },
  { id: '4', date: '07/08', label: 'Virement reçu - GlobalTech', amount: 8420, type: 'credit' },
  { id: '5', date: '06/08', label: 'Commission bancaire', amount: -125, type: 'debit' },
  { id: '6', date: '06/08', label: 'Remboursement TVA', amount: 3240, type: 'credit' },
  { id: '7', date: '05/08', label: 'Achat fournitures', amount: -456, type: 'debit' },
  { id: '8', date: '05/08', label: 'Facture DataCorp', amount: 5680, type: 'credit' }
];

// Données graphique enrichies
const chartData = [
  { month: 'Jan', revenue: 89000, expenses: 67000, profit: 22000 },
  { month: 'Fév', revenue: 92000, expenses: 65000, profit: 27000 },
  { month: 'Mar', revenue: 105000, expenses: 72000, profit: 33000 },
  { month: 'Avr', revenue: 118000, expenses: 78000, profit: 40000 },
  { month: 'Mai', revenue: 127845, expenses: 48392, profit: 79453 },
  { month: 'Jun', revenue: 135000, expenses: 52000, profit: 83000 }
];

export default function DashboardEnriched() {
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);
  
  const maxValue = Math.max(...chartData.flatMap(d => [d.revenue, d.expenses]));

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-amber-600 bg-amber-50';
      case 'warning': return 'text-red-600 bg-red-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      default: return 'text-neutral-600 bg-neutral-50';
    }
  };

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'invoice': return <Receipt className="w-4 h-4" />;
      case 'payment': return <CreditCard className="w-4 h-4" />;
      case 'expense': return <ShoppingCart className="w-4 h-4" />;
      case 'bank': return <Activity className="w-4 h-4" />;
      case 'client': return <Users className="w-4 h-4" />;
      case 'product': return <Package className="w-4 h-4" />;
      case 'tax': return <Percent className="w-4 h-4" />;
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {widgets.map((widget, index) => (
          <motion.div
            key={widget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 border border-neutral-200/30 shadow-glass hover:shadow-glass-lg hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-neutral-500 mb-2">{widget.title}</p>
                <p className="text-2xl font-bold text-neutral-900 mb-2">{widget.value}</p>
                
                {widget.change !== undefined && (
                  <div className="flex items-center gap-1 mb-2">
                    {widget.trend === 'up' ? (
                      <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                    ) : widget.trend === 'down' ? (
                      <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                    ) : (
                      <Activity className="w-3.5 h-3.5 text-neutral-500" />
                    )}
                    <span className={cn(
                      "text-sm font-semibold",
                      widget.trend === 'up' ? "text-green-600" : 
                      widget.trend === 'down' ? "text-red-600" : "text-neutral-500"
                    )}>
                      {widget.trend === 'up' ? '+' : ''}{widget.change}%
                    </span>
                  </div>
                )}
                
                {widget.description && (
                  <p className="text-xs text-neutral-400">{widget.description}</p>
                )}

                {widget.details && (
                  <div className="mt-3 pt-3 border-t border-neutral-200/30">
                    {widget.details.map((detail, idx) => (
                      <p key={idx} className="text-2xs text-neutral-500 mb-1">
                        • {detail}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              
              <div className={cn("p-2.5 rounded-xl", widget.bgColor, widget.color)}>
                {widget.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-900">Performance financière</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary-500" />
                  <span className="text-xs text-neutral-500">Revenus</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-secondary-500" />
                  <span className="text-xs text-neutral-500">Dépenses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-500" />
                  <span className="text-xs text-neutral-500">Profit</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-[280px]">
              <div className="absolute inset-0 flex items-end justify-between gap-2">
                {chartData.map((data, index) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex gap-0.5 items-end h-[240px]">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.revenue / maxValue) * 100}%` }}
                        transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
                        className="flex-1 bg-gradient-to-t from-primary-500 to-primary-300 rounded-t relative"
                      >
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-2xs font-semibold text-primary-600 whitespace-nowrap">
                          {(data.revenue / 1000).toFixed(0)}k
                        </span>
                      </motion.div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.expenses / maxValue) * 100}%` }}
                        transition={{ delay: 0.45 + index * 0.05, duration: 0.5 }}
                        className="flex-1 bg-gradient-to-t from-secondary-500 to-secondary-300 rounded-t"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.profit / maxValue) * 100}%` }}
                        transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                        className="flex-1 bg-gradient-to-t from-green-500 to-green-300 rounded-t"
                      />
                    </div>
                    <span className="text-2xs text-neutral-500">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Top Clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">Top clients</h3>
              <button className="text-sm text-primary-500 hover:text-primary-600 transition-colors">
                Voir tous →
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              {topClients.map((client, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-neutral-50/50 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold text-sm",
                      index === 0 ? "bg-gradient-to-br from-primary-500 to-primary-600" :
                      index === 1 ? "bg-gradient-to-br from-secondary-500 to-secondary-600" :
                      index === 2 ? "bg-gradient-to-br from-green-500 to-green-600" :
                      index === 3 ? "bg-gradient-to-br from-amber-500 to-amber-600" :
                      "bg-gradient-to-br from-red-500 to-red-600"
                    )}>
                      {client.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{client.name}</p>
                      <p className="text-xs text-neutral-500">{client.invoices} factures</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-neutral-900">{client.revenue}</p>
                    <p className={cn(
                      "text-xs font-semibold",
                      client.trend === 'up' ? "text-green-600" : 
                      client.trend === 'down' ? "text-red-600" : "text-neutral-500"
                    )}>
                      {client.growth}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mouvements bancaires */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">Derniers mouvements bancaires</h3>
              <button className="text-sm text-primary-500 hover:text-primary-600 transition-colors flex items-center gap-1">
                Voir tout →
              </button>
            </div>
            
            {/* Version Desktop - Table */}
            {isDesktop ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200/30">
                      <th className="text-left py-3 px-2 text-2xs font-semibold text-neutral-500 uppercase tracking-wider">Date</th>
                      <th className="text-left py-3 px-2 text-2xs font-semibold text-neutral-500 uppercase tracking-wider">Libellé</th>
                      <th className="text-center py-3 px-2 text-2xs font-semibold text-neutral-500 uppercase tracking-wider">Type</th>
                      <th className="text-right py-3 px-2 text-2xs font-semibold text-neutral-500 uppercase tracking-wider">Montant</th>
                      <th className="text-right py-3 px-2 text-2xs font-semibold text-neutral-500 uppercase tracking-wider">Solde</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {bankMovements.map((movement, index) => {
                      const runningBalance = bankMovements.slice(0, index + 1).reduce((acc, m) => acc + m.amount, 285620);
                      return (
                        <tr key={movement.id} className="hover:bg-neutral-50/50 transition-colors cursor-pointer">
                          <td className="py-3.5 px-2 text-sm text-neutral-500">{movement.date}</td>
                          <td className="py-3.5 px-2 text-sm font-medium text-neutral-900">{movement.label}</td>
                          <td className="py-3.5 px-2 text-center">
                            <span className={cn(
                              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-2xs font-semibold",
                              movement.type === 'credit' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                            )}>
                              <div className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                movement.type === 'credit' ? "bg-green-600" : "bg-red-600"
                              )} />
                              {movement.type === 'credit' ? 'Crédit' : 'Débit'}
                            </span>
                          </td>
                          <td className={cn(
                            "py-3.5 px-2 text-right text-sm font-semibold",
                            movement.type === 'credit' ? "text-green-600" : "text-neutral-900"
                          )}>
                            {movement.type === 'credit' ? '+' : '-'}{Math.abs(movement.amount).toLocaleString('fr-FR')}€
                          </td>
                          <td className="py-3.5 px-2 text-right text-sm text-neutral-500">
                            {runningBalance.toLocaleString('fr-FR')}€
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Version Mobile - Cards */
              <div className="flex flex-col gap-2">
                {bankMovements.map((movement) => (
                  <div
                    key={movement.id}
                    className="flex items-center justify-between p-3 bg-neutral-50/30 hover:bg-neutral-50/80 rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center",
                        movement.type === 'credit' ? "bg-green-50" : "bg-red-50"
                      )}>
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          movement.type === 'credit' ? "bg-green-600" : "bg-red-600"
                        )} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{movement.label}</p>
                        <p className="text-2xs text-neutral-400">{movement.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        "text-sm font-bold",
                        movement.type === 'credit' ? "text-green-600" : "text-neutral-900"
                      )}>
                        {movement.type === 'credit' ? '+' : ''}{movement.amount.toLocaleString('fr-FR')}€
                      </span>
                      <p className="text-2xs text-neutral-400 mt-0.5">
                        {movement.type === 'credit' ? 'Crédit' : 'Débit'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column - Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass max-h-[800px] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Activité récente</h3>
            <Bell className="w-4 h-4 text-neutral-500" />
          </div>
          
          <div className="flex flex-col gap-2">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-xl transition-colors cursor-pointer",
                  activity.status === 'warning' ? "bg-amber-50/30" : "hover:bg-neutral-50/50"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl",
                  getStatusColor(activity.status).split(' ')[1]
                )}>
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1">
                  <p className="text-sm font-semibold text-neutral-900 mb-1">
                    {activity.title}
                  </p>
                  <p className="text-xs text-neutral-500 mb-1">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xs text-neutral-400">{activity.time}</p>
                    {activity.badge && (
                      <span className="text-2xs px-1.5 py-0.5 rounded-full bg-primary-50 text-primary-600 font-semibold">
                        {activity.badge}
                      </span>
                    )}
                  </div>
                </div>
                
                {activity.amount && (
                  <span className={cn(
                    "text-sm font-bold",
                    activity.status === 'completed' ? "text-green-600" : "text-neutral-900"
                  )}>
                    {activity.amount}
                  </span>
                )}
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 bg-neutral-50/50 hover:bg-neutral-50 rounded-xl border border-neutral-200/30 text-sm font-medium text-neutral-500 transition-colors">
            Charger plus d&apos;activités
          </button>
        </motion.div>
      </div>

      {/* Bottom Stats */}
      <div className="mt-8 p-4 bg-neutral-50/50 rounded-2xl border border-neutral-200/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-neutral-900">98.2%</p>
            <p className="text-xs text-neutral-500">Taux de satisfaction client</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-neutral-900">32 jours</p>
            <p className="text-xs text-neutral-500">Délai moyen de paiement</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-neutral-900">4.8/5</p>
            <p className="text-xs text-neutral-500">Note moyenne produits</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-neutral-900">152</p>
            <p className="text-xs text-neutral-500">Commandes ce mois</p>
          </div>
        </div>
      </div>
    </div>
  );
}