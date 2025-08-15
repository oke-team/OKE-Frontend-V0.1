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
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-xl p-4 border border-neutral-200/30 shadow-glass"
        >
          <div className="flex items-center justify-between mb-2">
            <Wallet className="w-5 h-5 text-primary-500" />
            <span className="text-xs text-green-600 font-semibold">+12.3%</span>
          </div>
          <p className="text-2xl font-bold text-neutral-900">{totalBalance.toLocaleString('fr-FR')}€</p>
          <p className="text-xs text-neutral-500 mt-1">Trésorerie totale</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white/90 backdrop-blur-xl rounded-xl p-4 border border-neutral-200/30 shadow-glass"
        >
          <div className="flex items-center justify-between mb-2">
            <Receipt className="w-5 h-5 text-amber-500" />
            <span className="text-xs text-red-600 font-semibold">{topReceivables.length}</span>
          </div>
          <p className="text-2xl font-bold text-neutral-900">{unpaidInvoices.toLocaleString('fr-FR')}€</p>
          <p className="text-xs text-neutral-500 mt-1">Créances clients</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-xl rounded-xl p-4 border border-neutral-200/30 shadow-glass"
        >
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-orange-600 font-semibold">{topPayables.length}</span>
          </div>
          <p className="text-2xl font-bold text-neutral-900">{pendingPayments.toLocaleString('fr-FR')}€</p>
          <p className="text-xs text-neutral-500 mt-1">Dettes fournisseurs</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/90 backdrop-blur-xl rounded-xl p-4 border border-neutral-200/30 shadow-glass"
        >
          <div className="flex items-center justify-between mb-2">
            <Percent className="w-5 h-5 text-purple-500" />
            <span className={cn("text-xs font-semibold", taxEstimation.trend === 'up' ? 'text-red-600' : 'text-green-600')}>
              {taxEstimation.trend === 'up' ? '+' : '-'}{taxEstimation.changePercent}%
            </span>
          </div>
          <p className="text-2xl font-bold text-neutral-900">{taxEstimation.estimatedPayment.toLocaleString('fr-FR')}€</p>
          <p className="text-xs text-neutral-500 mt-1">TVA à payer (15/08)</p>
        </motion.div>
      </div>

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
                <h3 className="text-lg font-semibold text-neutral-900">Comptes bancaires</h3>
                <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4 text-neutral-500" />
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
              <h4 className="text-sm font-semibold text-neutral-600 mb-3">Dernières transactions</h4>
              <div className="space-y-2">
                {selectedBankAccount.transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-neutral-50/50 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        transaction.type === 'credit' ? "bg-green-100" : "bg-red-100"
                      )}>
                        {transaction.type === 'credit' ? 
                          <ArrowDownRight className="w-4 h-4 text-green-600" /> :
                          <ArrowUpRight className="w-4 h-4 text-red-600" />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{transaction.label}</p>
                        <p className="text-xs text-neutral-500">{transaction.date} • {transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-sm font-bold",
                        transaction.type === 'credit' ? "text-green-600" : "text-neutral-900"
                      )}>
                        {transaction.type === 'credit' ? '+' : '-'}{Math.abs(transaction.amount).toLocaleString('fr-FR')}€
                      </p>
                      {transaction.status === 'pending' && (
                        <span className="text-xs text-amber-600">En attente</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
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
                <h3 className="text-lg font-semibold text-neutral-900">Ventes récentes</h3>
                <button className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors">
                  <Plus className="w-4 h-4 text-neutral-500" />
                </button>
              </div>
              
              <div className="space-y-2">
                {recentSales.slice(0, 4).map((sale) => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between p-2.5 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">{sale.client}</p>
                      <p className="text-xs text-neutral-500">{sale.reference}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-neutral-900">
                        {sale.amount.toLocaleString('fr-FR')}€
                      </p>
                      <span className={cn(
                        "text-xs px-1.5 py-0.5 rounded-full",
                        getStatusColor(sale.status)
                      )}>
                        {sale.status === 'paid' ? 'Payé' :
                         sale.status === 'sent' ? 'Envoyé' :
                         sale.status === 'overdue' ? `${sale.daysOverdue}j retard` :
                         sale.status === 'partial' ? 'Partiel' : 'Brouillon'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
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
                <h3 className="text-lg font-semibold text-neutral-900">Achats récents</h3>
                <button className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors">
                  <Upload className="w-4 h-4 text-neutral-500" />
                </button>
              </div>
              
              <div className="space-y-2">
                {recentPurchases.slice(0, 4).map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex items-center justify-between p-2.5 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">{purchase.supplier}</p>
                      <p className="text-xs text-neutral-500">{purchase.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-neutral-900">
                        {purchase.amount.toLocaleString('fr-FR')}€
                      </p>
                      <div className="flex items-center gap-1 justify-end">
                        {purchase.hasDocument && (
                          <FileText className="w-3 h-3 text-green-600" />
                        )}
                        <span className={cn(
                          "text-xs",
                          purchase.status === 'paid' ? 'text-green-600' : 
                          purchase.status === 'validated' ? 'text-amber-600' : 'text-neutral-500'
                        )}>
                          {purchase.status === 'paid' ? 'Payé' :
                           purchase.status === 'validated' ? 'Validé' : 'En attente'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
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
                <h3 className="text-lg font-semibold text-neutral-900">Créances clients</h3>
                <span className="text-xs px-2 py-1 bg-amber-50 text-amber-600 rounded-full font-semibold">
                  {unpaidInvoices.toLocaleString('fr-FR')}€ total
                </span>
              </div>
              
              <div className="space-y-2">
                {topReceivables.slice(0, 4).map((receivable) => (
                  <div
                    key={receivable.id}
                    className="flex items-center justify-between p-2.5 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">{receivable.client}</p>
                      <p className="text-xs text-neutral-500">
                        {receivable.invoices} facture{receivable.invoices > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-neutral-900">
                        {receivable.amount.toLocaleString('fr-FR')}€
                      </p>
                      <span className={cn(
                        "text-xs px-1.5 py-0.5 rounded-full",
                        getStatusColor(receivable.risk)
                      )}>
                        {receivable.daysOverdue}j retard
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
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
                <h3 className="text-lg font-semibold text-neutral-900">Dettes fournisseurs</h3>
                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full font-semibold">
                  {pendingPayments.toLocaleString('fr-FR')}€ total
                </span>
              </div>
              
              <div className="space-y-2">
                {topPayables.slice(0, 4).map((payable) => (
                  <div
                    key={payable.id}
                    className="flex items-center justify-between p-2.5 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">{payable.supplier}</p>
                      <p className="text-xs text-neutral-500">
                        {payable.bills} facture{payable.bills > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-neutral-900">
                        {payable.amount.toLocaleString('fr-FR')}€
                      </p>
                      <span className={cn(
                        "text-xs px-1.5 py-0.5 rounded-full",
                        getStatusColor(payable.priority)
                      )}>
                        Dans {payable.daysUntilDue}j
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
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
              <h3 className="text-lg font-semibold text-neutral-900">Indicateurs clés</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1">
                Reporting complet
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mainKPIs.map((kpi) => (
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
                  {kpi.chartData && (
                    <div className="flex items-end gap-0.5 h-8 mt-2">
                      {kpi.chartData.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex-1 bg-primary-200 rounded-t"
                          style={{ height: `${(point.value / Math.max(...kpi.chartData.map(p => p.value))) * 100}%` }}
                        />
                      ))}
                    </div>
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
              <h3 className="text-lg font-semibold text-neutral-900">TVA - Estimation</h3>
              <Percent className="w-5 h-5 text-purple-600" />
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
              <h3 className="text-lg font-semibold text-neutral-900">Échéances</h3>
              <Calendar className="w-5 h-5 text-neutral-500" />
            </div>
            
            <div className="space-y-2">
              {taxDeadlines.slice(0, 5).map((deadline) => (
                <div
                  key={deadline.id}
                  className="flex items-center justify-between p-2.5 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">{deadline.label}</p>
                    <p className="text-xs text-neutral-500">{deadline.type}</p>
                  </div>
                  <div className="text-right">
                    {deadline.amount && (
                      <p className="text-sm font-bold text-neutral-900">
                        {deadline.amount.toLocaleString('fr-FR')}€
                      </p>
                    )}
                    <span className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full",
                      getStatusColor(deadline.status)
                    )}>
                      {deadline.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
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
              <h3 className="text-lg font-semibold text-neutral-900">Société</h3>
              <Scale className="w-5 h-5 text-blue-600" />
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
              <h3 className="text-lg font-semibold text-neutral-900">Communications</h3>
              <div className="flex items-center gap-2">
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
              <h3 className="text-lg font-semibold text-neutral-900">Notifications</h3>
              {urgentNotifications > 0 && (
                <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-full font-semibold animate-pulse">
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
              <h3 className="text-lg font-semibold text-neutral-900">Agenda</h3>
              <Calendar className="w-5 h-5 text-neutral-500" />
            </div>
            
            <div className="space-y-2">
              {upcomingAppointments.slice(0, 3).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-start gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className={cn("w-1 h-full rounded-full", appointment.color)} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">{appointment.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-neutral-500">
                        {appointment.date} • {appointment.time}
                      </span>
                      {appointment.type === 'video' && <Video className="w-3 h-3 text-neutral-400" />}
                      {appointment.type === 'call' && <Phone className="w-3 h-3 text-neutral-400" />}
                      {appointment.location && <MapPin className="w-3 h-3 text-neutral-400" />}
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {appointment.participants.slice(0, 2).join(', ')}
                      {appointment.participants.length > 2 && ` +${appointment.participants.length - 2}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
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
              <h3 className="text-lg font-semibold text-neutral-900">À faire</h3>
              <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full">
                {pendingTodos} tâches
              </span>
            </div>
            
            <div className="space-y-2">
              {todos.filter(t => !t.completed).slice(0, 4).map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-start gap-2 p-2 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                >
                  <CheckSquare className="w-4 h-4 text-neutral-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-neutral-900">{todo.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={cn(
                        "text-xs px-1.5 py-0.5 rounded-full",
                        getPriorityColor(todo.priority)
                      )}>
                        {todo.priority === 'urgent' ? 'Urgent' :
                         todo.priority === 'high' ? 'Élevé' :
                         todo.priority === 'medium' ? 'Moyen' : 'Faible'}
                      </span>
                      {todo.dueDate && (
                        <span className="text-xs text-neutral-500">{todo.dueDate}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
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
              <h3 className="text-lg font-semibold text-neutral-900">Documents récents</h3>
              <FileText className="w-5 h-5 text-neutral-500" />
            </div>
            
            <div className="space-y-2">
              {recentDocuments.slice(0, 3).map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-neutral-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">{doc.name}</p>
                    <p className="text-xs text-neutral-500">
                      {doc.uploadedBy} • {doc.uploadedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
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
            
            <button className="w-full mt-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
              Tous les documents →
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}