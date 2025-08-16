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
  Clock,
  Building2,
  Users,
  Calendar,
  BarChart3,
  Activity,
  Percent,
  ChevronRight,
  Mail,
  MessageSquare,
  Bell,
  FileText,
  CheckSquare,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Eye,
  Download,
  Plus,
  RefreshCw,
  MapPin,
  Upload,
  Phone,
  Video,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  Briefcase,
  Gavel,
  FileSignature,
  Banknote,
  TrendingUp as Trend,
  Landmark,
  Wallet,
  PiggyBank,
  Building,
  Shield,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  bankAccounts,
  taxDeadlines,
  recentSales,
  recentPurchases,
  topReceivables,
  topPayables,
  taxEstimation,
  companyInfo,
  recentEmails,
  recentMessages,
  notifications,
  recentDocuments,
  upcomingAppointments,
  todos,
  mainKPIs
} from '@/lib/mock-data/dashboard-data';

export default function DashboardEnriched() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(bankAccounts[0].id);
  
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const selectedBankAccount = bankAccounts.find(acc => acc.id === selectedAccount) || bankAccounts[0];
  const totalBalance = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const unpaidInvoices = topReceivables.reduce((sum, rec) => sum + rec.amount, 0);
  const pendingPayments = topPayables.reduce((sum, pay) => sum + pay.amount, 0);
  const unreadEmails = recentEmails.filter(e => e.unread).length;
  const unreadMessages = recentMessages.filter(m => m.unread).length;
  const pendingTodos = todos.filter(t => !t.completed).length;
  const urgentNotifications = notifications.filter(n => n.actionRequired).length;

  // Fonction pour obtenir l'icône de la banque
  const getBankIcon = (bank: string) => {
    if (bank.includes('BNP')) return <Building2 className="w-4 h-4" />;
    if (bank.includes('LCL')) return <Landmark className="w-4 h-4" />;
    if (bank.includes('Revolut')) return <Wallet className="w-4 h-4" />;
    return <PiggyBank className="w-4 h-4" />;
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'paid':
      case 'completed':
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'pending':
      case 'upcoming':
      case 'info':
        return 'text-amber-600 bg-amber-50';
      case 'overdue':
      case 'due':
      case 'warning':
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'partial':
      case 'medium':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-neutral-600 bg-neutral-50';
    }
  };

  // Fonction pour obtenir l'icône du type de notification
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  // Fonction pour obtenir l'icône du type de message
  const getMessageIcon = (type: string) => {
    switch(type) {
      case 'whatsapp': return '💬';
      case 'sms': return '📱';
      case 'chat': return '💭';
      default: return '📨';
    }
  };

  // Fonction pour obtenir la couleur de priorité
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      default: return 'text-neutral-600 bg-neutral-50';
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Comptes Bancaires */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl border border-neutral-200/30 shadow-glass"
          >
            <div className="p-6 border-b border-neutral-200/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-neutral-800">Comptes bancaires</h3>
                <button className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors">
                  <RefreshCw className="w-3.5 h-3.5 text-neutral-400" />
                </button>
              </div>
              
              {/* Tabs des comptes */}
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {bankAccounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => setSelectedAccount(account.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap",
                      selectedAccount === account.id
                        ? "bg-primary-50 text-primary-600 border border-primary-200"
                        : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                    )}
                  >
                    {getBankIcon(account.bank)}
                    <span className="text-sm font-medium">{account.bank}</span>
                    <span className="text-xs">({account.accountNumber})</span>
                  </button>
                ))}
              </div>

              {/* Solde du compte sélectionné */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-neutral-900">
                    {selectedBankAccount.balance.toLocaleString('fr-FR')}€
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    {selectedBankAccount.name} • Sync {selectedBankAccount.lastSync}
                  </p>
                </div>
                <div className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-semibold",
                  selectedBankAccount.trend === 'up' ? "bg-green-50 text-green-600" :
                  selectedBankAccount.trend === 'down' ? "bg-red-50 text-red-600" :
                  "bg-neutral-50 text-neutral-600"
                )}>
                  {selectedBankAccount.trend === 'up' ? <TrendingUp className="inline w-3.5 h-3.5 mr-1" /> :
                   selectedBankAccount.trend === 'down' ? <TrendingDown className="inline w-3.5 h-3.5 mr-1" /> :
                   <Activity className="inline w-3.5 h-3.5 mr-1" />}
                  {selectedBankAccount.change > 0 ? '+' : ''}{selectedBankAccount.change}%
                </div>
              </div>
            </div>

            {/* Transactions du compte */}
            <div className="p-6">
              <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">Dernières transactions</h4>
              <div className="space-y-1">
                {selectedBankAccount.transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="group flex items-center justify-between py-2.5 px-3 -mx-3 hover:bg-neutral-50/70 rounded-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:scale-110",
                        transaction.type === 'credit' ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                      )}>
                        {transaction.type === 'credit' ? 
                          <ArrowDownRight className="w-3.5 h-3.5 text-green-600" /> :
                          <ArrowUpRight className="w-3.5 h-3.5 text-red-600" />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-800 group-hover:text-neutral-900">{transaction.label}</p>
                        <p className="text-xs text-neutral-400">{transaction.date} • {transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-sm font-semibold tabular-nums",
                        transaction.type === 'credit' ? "text-green-600" : "text-neutral-700"
                      )}>
                        {transaction.type === 'credit' ? '+' : '-'}{Math.abs(transaction.amount).toLocaleString('fr-FR')}€
                      </p>
                      {transaction.status === 'pending' && (
                        <span className="text-xs text-amber-500 font-medium">En attente</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50/50 rounded-lg transition-all">
                Voir toutes les transactions →
              </button>
            </div>
          </motion.div>

          {/* Row 2: Ventes & Achats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dernières Ventes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-neutral-800">Ventes récentes</h3>
                <button className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors">
                  <Plus className="w-3.5 h-3.5 text-neutral-400" />
                </button>
              </div>
              
              <div className="space-y-0.5">
                {recentSales.slice(0, 4).map((sale) => (
                  <div
                    key={sale.id}
                    className="group flex items-center justify-between py-2 px-2 -mx-2 hover:bg-neutral-50/70 rounded-lg transition-all cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-800 truncate group-hover:text-neutral-900">{sale.client}</p>
                      <p className="text-xs text-neutral-400">{sale.reference}</p>
                    </div>
                    <div className="text-right ml-2">
                      <p className="text-sm font-semibold text-neutral-700 tabular-nums">
                        {sale.amount.toLocaleString('fr-FR')}€
                      </p>
                      <span className={cn(
                        "inline-flex items-center text-xs font-medium",
                        sale.status === 'paid' ? "text-green-600" :
                        sale.status === 'sent' ? "text-blue-600" :
                        sale.status === 'overdue' ? "text-red-600" :
                        sale.status === 'partial' ? "text-orange-600" : "text-neutral-400"
                      )}>
                        {sale.status === 'paid' ? '✓ Payé' :
                         sale.status === 'sent' ? '↗ Envoyé' :
                         sale.status === 'overdue' ? `⚠ ${sale.daysOverdue}j` :
                         sale.status === 'partial' ? '◐ Partiel' : '○ Brouillon'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50/50 rounded-lg transition-all">
                Voir toutes les factures →
              </button>
            </motion.div>

            {/* Derniers Achats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-neutral-800">Achats récents</h3>
                <button className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors">
                  <Upload className="w-3.5 h-3.5 text-neutral-400" />
                </button>
              </div>
              
              <div className="space-y-0.5">
                {recentPurchases.slice(0, 4).map((purchase) => (
                  <div
                    key={purchase.id}
                    className="group flex items-center justify-between py-2 px-2 -mx-2 hover:bg-neutral-50/70 rounded-lg transition-all cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-800 truncate group-hover:text-neutral-900">{purchase.supplier}</p>
                      <p className="text-xs text-neutral-400">{purchase.category}</p>
                    </div>
                    <div className="text-right ml-2">
                      <p className="text-sm font-semibold text-neutral-700 tabular-nums">
                        {purchase.amount.toLocaleString('fr-FR')}€
                      </p>
                      <div className="flex items-center gap-1 justify-end">
                        {purchase.hasDocument && (
                          <FileText className="w-3 h-3 text-green-500" />
                        )}
                        <span className={cn(
                          "text-xs font-medium",
                          purchase.status === 'paid' ? 'text-green-600' : 
                          purchase.status === 'validated' ? 'text-amber-600' : 'text-neutral-400'
                        )}>
                          {purchase.status === 'paid' ? '✓ Payé' :
                           purchase.status === 'validated' ? '• Validé' : '○ En attente'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50/50 rounded-lg transition-all">
                Voir tous les achats →
              </button>
            </motion.div>
          </div>

          {/* Row 3: Créances & Dettes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Créances Clients */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-neutral-800">Créances clients</h3>
                <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full font-medium">
                  {unpaidInvoices.toLocaleString('fr-FR')}€
                </span>
              </div>
              
              <div className="space-y-0.5">
                {topReceivables.slice(0, 4).map((receivable) => (
                  <div
                    key={receivable.id}
                    className="group flex items-center justify-between py-2 px-2 -mx-2 hover:bg-neutral-50/70 rounded-lg transition-all cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-800 truncate group-hover:text-neutral-900">{receivable.client}</p>
                      <p className="text-xs text-neutral-400">
                        {receivable.invoices} facture{receivable.invoices > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right ml-2">
                      <p className="text-sm font-semibold text-neutral-700 tabular-nums">
                        {receivable.amount.toLocaleString('fr-FR')}€
                      </p>
                      <span className={cn(
                        "text-xs font-medium",
                        receivable.risk === 'high' ? "text-red-600" :
                        receivable.risk === 'medium' ? "text-orange-600" : "text-amber-600"
                      )}>
                        {receivable.daysOverdue}j retard
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50/50 rounded-lg transition-all">
                Gérer les relances →
              </button>
            </motion.div>

            {/* Dettes Fournisseurs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-neutral-800">Dettes fournisseurs</h3>
                <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium">
                  {pendingPayments.toLocaleString('fr-FR')}€
                </span>
              </div>
              
              <div className="space-y-0.5">
                {topPayables.slice(0, 4).map((payable) => (
                  <div
                    key={payable.id}
                    className="group flex items-center justify-between py-2 px-2 -mx-2 hover:bg-neutral-50/70 rounded-lg transition-all cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-800 truncate group-hover:text-neutral-900">{payable.supplier}</p>
                      <p className="text-xs text-neutral-400">
                        {payable.bills} facture{payable.bills > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right ml-2">
                      <p className="text-sm font-semibold text-neutral-700 tabular-nums">
                        {payable.amount.toLocaleString('fr-FR')}€
                      </p>
                      <span className={cn(
                        "text-xs font-medium",
                        payable.priority === 'high' ? "text-red-600" :
                        payable.priority === 'medium' ? "text-orange-600" : "text-green-600"
                      )}>
                        Dans {payable.daysUntilDue}j
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50/50 rounded-lg transition-all">
                Planifier paiements →
              </button>
            </motion.div>
          </div>

          {/* KPIs avec graphiques */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-800">Indicateurs clés</h3>
              <button className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1">
                Reporting complet
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* KPI avec graphique en ligne */}
              <div className="col-span-2 md:col-span-1 p-4 bg-neutral-50/50 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs text-neutral-500">{mainKPIs[0].label}</p>
                  <span className={cn(
                    "text-xs font-semibold",
                    mainKPIs[0].trend === 'up' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {mainKPIs[0].change > 0 ? '+' : ''}{mainKPIs[0].change}%
                  </span>
                </div>
                <p className="text-xl font-bold text-neutral-900 mb-3">
                  {mainKPIs[0].value.toLocaleString('fr-FR')}
                  <span className="text-sm font-normal text-neutral-600 ml-1">{mainKPIs[0].unit}</span>
                </p>
                {/* Graphique en ligne */}
                <div className="h-12 flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 100 48">
                    <polyline
                      fill="none"
                      stroke="url(#gradient1)"
                      strokeWidth="2"
                      points={mainKPIs[0].chartData?.map((point, idx) => 
                        `${(idx * 25)},${48 - (point.value / Math.max(...mainKPIs[0].chartData!.map(p => p.value)) * 40)}`
                      ).join(' ')}
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4C34CE" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#4C34CE" />
                      </linearGradient>
                    </defs>
                    {mainKPIs[0].chartData?.map((point, idx) => (
                      <circle
                        key={idx}
                        cx={idx * 25}
                        cy={48 - (point.value / Math.max(...mainKPIs[0].chartData!.map(p => p.value)) * 40)}
                        r="2"
                        fill="#4C34CE"
                      />
                    ))}
                  </svg>
                </div>
                <div className="flex justify-between mt-1">
                  {mainKPIs[0].chartData?.map((point, idx) => (
                    <span key={idx} className="text-xs text-neutral-400">{point.label}</span>
                  ))}
                </div>
              </div>

              {/* KPI avec graphique en barres */}
              <div className="p-4 bg-neutral-50/50 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs text-neutral-500">{mainKPIs[1].label}</p>
                  <span className={cn(
                    "text-xs font-semibold",
                    mainKPIs[1].trend === 'up' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {mainKPIs[1].change > 0 ? '+' : ''}{mainKPIs[1].change}%
                  </span>
                </div>
                <p className="text-xl font-bold text-neutral-900 mb-3">
                  {mainKPIs[1].value}
                  <span className="text-sm font-normal text-neutral-600 ml-1">{mainKPIs[1].unit}</span>
                </p>
                {/* Graphique en barres */}
                <div className="flex items-end gap-1 h-10">
                  {mainKPIs[1].chartData?.map((point, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div 
                        className="w-full bg-gradient-to-t from-primary-500 to-primary-300 rounded-t"
                        style={{ height: `${(point.value / Math.max(...mainKPIs[1].chartData!.map(p => p.value))) * 100}%` }}
                      />
                    </div>
                  ))}
                </div>
                {mainKPIs[1].target && (
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-200">
                    <span className="text-xs text-neutral-400">Objectif</span>
                    <span className="text-xs font-semibold text-primary-600">{mainKPIs[1].target}%</span>
                  </div>
                )}
              </div>

              {/* KPI avec graphique circulaire */}
              <div className="p-4 bg-neutral-50/50 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs text-neutral-500">Taux conversion</p>
                  <span className="text-xs font-semibold text-green-600">+2.1%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#e5e5e5"
                        strokeWidth="4"
                        fill="none"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#4C34CE"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 20 * 0.245} ${2 * Math.PI * 20}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold">24.5%</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-neutral-900">24.5%</p>
                    <p className="text-xs text-neutral-400">vs 25% objectif</p>
                  </div>
                </div>
              </div>

              {/* Autres KPIs sans graphiques */}
              {mainKPIs.slice(3, 6).map((kpi) => (
                <div
                  key={kpi.id}
                  className="p-4 bg-neutral-50/50 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs text-neutral-500">{kpi.label}</p>
                    <span className={cn(
                      "text-xs font-semibold",
                      kpi.trend === 'up' ? 'text-green-600' :
                      kpi.trend === 'down' ? 'text-red-600' : 'text-neutral-500'
                    )}>
                      {kpi.change > 0 ? '+' : ''}{kpi.change}%
                    </span>
                  </div>
                  <p className="text-xl font-bold text-neutral-900">
                    {typeof kpi.value === 'number' ? kpi.value.toLocaleString('fr-FR') : kpi.value}
                    {kpi.unit && <span className="text-sm font-normal text-neutral-600 ml-1">{kpi.unit}</span>}
                  </p>
                  {kpi.target && (
                    <p className="text-xs text-neutral-400 mt-1">
                      Objectif: {typeof kpi.target === 'number' ? kpi.target.toLocaleString('fr-FR') : kpi.target}
                      {kpi.unit}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* TVA Estimation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-xl rounded-2xl p-6 border border-purple-200/30 shadow-glass"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-800">TVA - Estimation</h3>
              <Percent className="w-4 h-4 text-purple-600" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">TVA collectée</span>
                <span className="text-sm font-semibold text-neutral-900">
                  +{taxEstimation.collected.toLocaleString('fr-FR')}€
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">TVA déductible</span>
                <span className="text-sm font-semibold text-neutral-900">
                  -{taxEstimation.deductible.toLocaleString('fr-FR')}€
                </span>
              </div>
              <div className="pt-3 border-t border-purple-200/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-neutral-900">Solde à payer</span>
                  <span className="text-lg font-bold text-purple-600">
                    {taxEstimation.balance.toLocaleString('fr-FR')}€
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Échéance: {taxEstimation.nextDeadline}
                </p>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
              Préparer déclaration
            </button>
          </motion.div>

          {/* Échéances Fiscales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-800">Échéances</h3>
              <Calendar className="w-4 h-4 text-neutral-400" />
            </div>
            
            <div className="space-y-0.5">
              {taxDeadlines.slice(0, 5).map((deadline) => (
                <div
                  key={deadline.id}
                  className="group flex items-center justify-between py-2 px-2 -mx-2 hover:bg-neutral-50/70 rounded-lg transition-all cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800 truncate group-hover:text-neutral-900">{deadline.label}</p>
                    <p className="text-xs text-neutral-400">{deadline.type}</p>
                  </div>
                  <div className="text-right ml-2">
                    {deadline.amount && (
                      <p className="text-sm font-semibold text-neutral-700 tabular-nums">
                        {deadline.amount.toLocaleString('fr-FR')}€
                      </p>
                    )}
                    <span className={cn(
                      "text-xs font-medium",
                      deadline.status === 'due' || deadline.status === 'overdue' ? "text-red-600" :
                      deadline.status === 'upcoming' ? "text-amber-600" : "text-green-600"
                    )}>
                      {deadline.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50/50 rounded-lg transition-all">
              Calendrier fiscal →
            </button>
          </motion.div>

          {/* Infos Juridiques */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 backdrop-blur-xl rounded-2xl p-6 border border-blue-200/30 shadow-glass"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-800">Société</h3>
              <Scale className="w-4 h-4 text-blue-600" />
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-600">Raison sociale</span>
                <span className="text-xs font-semibold text-neutral-900">{companyInfo.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-600">Forme juridique</span>
                <span className="text-xs font-semibold text-neutral-900">{companyInfo.legalForm}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-600">SIRET</span>
                <span className="text-xs font-mono text-neutral-900">{companyInfo.siret}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-600">Capital</span>
                <span className="text-xs font-semibold text-neutral-900">
                  {companyInfo.capital.toLocaleString('fr-FR')}€
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-600">Effectif</span>
                <span className="text-xs font-semibold text-neutral-900">{companyInfo.employees} salariés</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 py-1.5 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium flex items-center justify-center gap-1">
                <FileSignature className="w-3.5 h-3.5" />
                Statuts
              </button>
              <button className="flex-1 py-1.5 px-3 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-xs font-medium flex items-center justify-center gap-1">
                <Gavel className="w-3.5 h-3.5" />
                Actes
              </button>
            </div>
          </motion.div>

          {/* Communications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-800">Communications</h3>
              <div className="flex items-center gap-1.5">
                {unreadEmails > 0 && (
                  <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-full font-semibold">
                    {unreadEmails}
                  </span>
                )}
                {unreadMessages > 0 && (
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full font-semibold">
                    {unreadMessages}
                  </span>
                )}
              </div>
            </div>
            
            {/* Emails */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-neutral-600 mb-2">Emails récents</p>
              <div className="space-y-1">
                {recentEmails.slice(0, 2).map((email) => (
                  <div
                    key={email.id}
                    className={cn(
                      "p-2 rounded-lg transition-colors cursor-pointer",
                      email.unread ? "bg-blue-50/50 hover:bg-blue-50" : "hover:bg-neutral-50"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <Mail className={cn(
                        "w-4 h-4 mt-0.5",
                        email.unread ? "text-blue-600" : "text-neutral-400"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-xs truncate",
                          email.unread ? "font-semibold text-neutral-900" : "text-neutral-600"
                        )}>
                          {email.from}
                        </p>
                        <p className={cn(
                          "text-xs truncate",
                          email.unread ? "font-medium text-neutral-800" : "text-neutral-500"
                        )}>
                          {email.subject}
                        </p>
                      </div>
                      {email.hasAttachment && (
                        <FileText className="w-3.5 h-3.5 text-neutral-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Messages */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-neutral-600 mb-2">Messages</p>
              <div className="space-y-1">
                {recentMessages.slice(0, 2).map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "p-2 rounded-lg transition-colors cursor-pointer",
                      message.unread ? "bg-green-50/50 hover:bg-green-50" : "hover:bg-neutral-50"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-base">{getMessageIcon(message.type)}</span>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-xs",
                          message.unread ? "font-semibold text-neutral-900" : "text-neutral-600"
                        )}>
                          {message.from}
                        </p>
                        <p className="text-xs text-neutral-500 truncate">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="w-full py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
              Centre de messages →
            </button>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-800">Notifications</h3>
              {urgentNotifications > 0 && (
                <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-full font-medium animate-pulse">
                  {urgentNotifications} urgentes
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              {notifications.slice(0, 4).map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    "flex items-start gap-2 p-2 rounded-lg transition-colors cursor-pointer",
                    notif.actionRequired ? "bg-amber-50/50 hover:bg-amber-50" : "hover:bg-neutral-50"
                  )}
                >
                  <div className={cn("p-1 rounded", getStatusColor(notif.type).split(' ')[1])}>
                    {getNotificationIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-neutral-900">{notif.title}</p>
                    <p className="text-xs text-neutral-500">{notif.message}</p>
                    <p className="text-xs text-neutral-400 mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Agenda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-800">Agenda</h3>
              <Calendar className="w-4 h-4 text-neutral-400" />
            </div>
            
            <div className="space-y-1">
              {upcomingAppointments.slice(0, 3).map((appointment) => (
                <div
                  key={appointment.id}
                  className="group flex items-start gap-2.5 py-2 px-2 -mx-2 hover:bg-neutral-50/70 rounded-lg transition-all cursor-pointer"
                >
                  <div className={cn("w-0.5 h-12 rounded-full mt-0.5", appointment.color)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800 truncate group-hover:text-neutral-900">{appointment.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-neutral-500 font-medium">
                        {appointment.date} • {appointment.time}
                      </span>
                      {appointment.type === 'video' && <Video className="w-3 h-3 text-neutral-400" />}
                      {appointment.type === 'call' && <Phone className="w-3 h-3 text-neutral-400" />}
                      {appointment.location && <MapPin className="w-3 h-3 text-neutral-400" />}
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5 truncate">
                      {appointment.participants.slice(0, 2).join(', ')}
                      {appointment.participants.length > 2 && ` +${appointment.participants.length - 2}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50/50 rounded-lg transition-all">
              Voir l'agenda complet →
            </button>
          </motion.div>

          {/* Todos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-800">À faire</h3>
              <span className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-full font-medium">
                {pendingTodos}
              </span>
            </div>
            
            <div className="space-y-0.5">
              {todos.filter(t => !t.completed).slice(0, 4).map((todo) => (
                <div
                  key={todo.id}
                  className="group flex items-start gap-2 py-2 px-2 -mx-2 hover:bg-neutral-50/70 rounded-lg transition-all cursor-pointer"
                >
                  <div className="w-4 h-4 border border-neutral-300 rounded mt-0.5 group-hover:border-primary-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-800 group-hover:text-neutral-900">{todo.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={cn(
                        "text-xs font-medium",
                        todo.priority === 'urgent' ? "text-red-600" :
                        todo.priority === 'high' ? "text-orange-600" :
                        todo.priority === 'medium' ? "text-amber-600" : "text-neutral-400"
                      )}>
                        {todo.priority === 'urgent' ? '⚠ Urgent' :
                         todo.priority === 'high' ? '↑ Élevé' :
                         todo.priority === 'medium' ? '• Moyen' : '↓ Faible'}
                      </span>
                      {todo.dueDate && (
                        <span className="text-xs text-neutral-400">{todo.dueDate}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50/50 rounded-lg transition-all">
              Toutes les tâches →
            </button>
          </motion.div>

          {/* Documents récents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-800">Documents récents</h3>
              <FileText className="w-4 h-4 text-neutral-400" />
            </div>
            
            <div className="space-y-0.5">
              {recentDocuments.slice(0, 3).map((doc) => (
                <div
                  key={doc.id}
                  className="group flex items-center gap-2.5 py-2 px-2 -mx-2 hover:bg-neutral-50/70 rounded-lg transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 bg-neutral-100 rounded-md flex items-center justify-center group-hover:bg-neutral-200">
                    <FileText className="w-3.5 h-3.5 text-neutral-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800 truncate group-hover:text-neutral-900">{doc.name}</p>
                    <p className="text-xs text-neutral-400">
                      {doc.uploadedBy} • {doc.uploadedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-neutral-200 rounded transition-colors">
                      <Eye className="w-3.5 h-3.5 text-neutral-500" />
                    </button>
                    <button className="p-1 hover:bg-neutral-200 rounded transition-colors">
                      <Download className="w-3.5 h-3.5 text-neutral-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50/50 rounded-lg transition-all">
              Tous les documents →
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}