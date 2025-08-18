'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, Reorder } from 'framer-motion';
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
  Scale,
  GripVertical,
  Settings2
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

// Types pour les widgets
type WidgetId = 
  | 'notifications' 
  | 'todos' 
  | 'bank' 
  | 'sales' 
  | 'purchases' 
  | 'receivables' 
  | 'payables' 
  | 'kpis'
  | 'tax' 
  | 'deadlines' 
  | 'company' 
  | 'communications' 
  | 'agenda' 
  | 'documents';

interface Widget {
  id: WidgetId;
  title: string;
  size: 'small' | 'medium' | 'large' | 'full';
  priority: number;
}

// Configuration initiale des widgets
const defaultWidgetOrder: Widget[] = [
  { id: 'notifications', title: 'Notifications', size: 'medium', priority: 1 },
  { id: 'todos', title: 'À faire', size: 'medium', priority: 2 },
  { id: 'bank', title: 'Comptes bancaires', size: 'large', priority: 3 },
  { id: 'sales', title: 'Ventes récentes', size: 'medium', priority: 4 },
  { id: 'purchases', title: 'Achats récents', size: 'medium', priority: 5 },
  { id: 'receivables', title: 'Créances clients', size: 'medium', priority: 6 },
  { id: 'payables', title: 'Dettes fournisseurs', size: 'medium', priority: 7 },
  { id: 'kpis', title: 'Indicateurs clés', size: 'large', priority: 8 },
  { id: 'tax', title: 'TVA - Estimation', size: 'small', priority: 9 },
  { id: 'deadlines', title: 'Échéances', size: 'small', priority: 10 },
  { id: 'company', title: 'Société', size: 'small', priority: 11 },
  { id: 'communications', title: 'Communications', size: 'small', priority: 12 },
  { id: 'agenda', title: 'Agenda', size: 'small', priority: 13 },
  { id: 'documents', title: 'Documents récents', size: 'small', priority: 14 }
];

export default function DashboardEnriched() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(bankAccounts[0].id);
  const [widgetOrder, setWidgetOrder] = useState<Widget[]>(defaultWidgetOrder);
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  // Charger l'ordre des widgets depuis le localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem('dashboardWidgetOrder');
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder);
        setWidgetOrder(parsed);
      } catch (e) {
        console.error('Error loading widget order:', e);
      }
    }
  }, []);

  // Sauvegarder l'ordre des widgets
  const saveWidgetOrder = (newOrder: Widget[]) => {
    setWidgetOrder(newOrder);
    localStorage.setItem('dashboardWidgetOrder', JSON.stringify(newOrder));
  };

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

  // Fonctions utilitaires
  const getBankIcon = (bank: string) => {
    if (bank.includes('BNP')) return <Building2 className="w-4 h-4" />;
    if (bank.includes('LCL')) return <Landmark className="w-4 h-4" />;
    if (bank.includes('Revolut')) return <Wallet className="w-4 h-4" />;
    return <PiggyBank className="w-4 h-4" />;
  };

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

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getMessageIcon = (type: string) => {
    switch(type) {
      case 'whatsapp': return '💬';
      case 'sms': return '📱';
      case 'chat': return '💭';
      default: return '📨';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      default: return 'text-neutral-600 bg-neutral-50';
    }
  };

  // Fonction pour rendre un widget
  const renderWidget = (widget: Widget) => {
    const widgetContent = () => {
      switch (widget.id) {
        case 'notifications':
          return (
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass h-full">
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
            </div>
          );

        case 'todos':
          return (
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-neutral-800">À faire</h3>
                <span className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-full font-medium">
                  {pendingTodos}
                </span>
              </div>
              
              <div className="space-y-0.5">
                {todos.filter(t => !t.completed).slice(0, 5).map((todo) => (
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
            </div>
          );

        case 'bank':
          const allTransactions = selectedAccount === 'all' 
            ? bankAccounts.flatMap(acc => 
                acc.transactions.map(t => ({ ...t, bank: acc.bank, bankColor: acc.color }))
              ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            : selectedBankAccount.transactions;
          
          const displayBalance = selectedAccount === 'all' ? totalBalance : selectedBankAccount.balance;
          
          return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-xl rounded-2xl border border-blue-200/30 shadow-glass overflow-hidden">
              <div className="p-6 border-b border-blue-100/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-neutral-800">
                    Comptes bancaires
                  </h3>
                  <button className="p-1.5 hover:bg-white/50 rounded-md transition-all backdrop-blur">
                    <RefreshCw className="w-3.5 h-3.5 text-primary-500" />
                  </button>
                </div>
                
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  <button
                    onClick={() => setSelectedAccount('all')}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap",
                      selectedAccount === 'all'
                        ? "bg-primary-600 text-white"
                        : "bg-white/50 text-neutral-600 hover:bg-white/70 border border-neutral-200/50"
                    )}
                  >
                    <Wallet className="w-4 h-4" />
                    <span className="text-sm font-medium">Tous</span>
                  </button>
                  {bankAccounts.map((account) => (
                    <button
                      key={account.id}
                      onClick={() => setSelectedAccount(account.id)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap",
                        selectedAccount === account.id
                          ? "bg-primary-600 text-white"
                          : "bg-white/50 text-neutral-600 hover:bg-white/70 border border-neutral-200/50"
                      )}
                    >
                      {getBankIcon(account.bank)}
                      <span className="text-sm font-medium hidden sm:inline">{account.bank}</span>
                      <span className="text-xs">({account.accountNumber})</span>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-3xl font-bold text-neutral-900">
                      {displayBalance.toLocaleString('fr-FR')}€
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">
                      {selectedAccount === 'all' ? 'Solde total • 3 comptes' : `${selectedBankAccount.name} • Sync ${selectedBankAccount.lastSync}`}
                    </p>
                  </div>
                  {selectedAccount !== 'all' && (
                    <div className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-semibold self-start sm:self-auto",
                      selectedBankAccount.trend === 'up' ? "bg-green-50 text-green-600" :
                      selectedBankAccount.trend === 'down' ? "bg-red-50 text-red-600" :
                      "bg-neutral-50 text-neutral-600"
                    )}>
                      {selectedBankAccount.trend === 'up' ? <TrendingUp className="inline w-3.5 h-3.5 mr-1" /> :
                       selectedBankAccount.trend === 'down' ? <TrendingDown className="inline w-3.5 h-3.5 mr-1" /> :
                       <Activity className="inline w-3.5 h-3.5 mr-1" />}
                      {selectedBankAccount.change > 0 ? '+' : ''}{selectedBankAccount.change}%
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                  {selectedAccount === 'all' ? 'Toutes les transactions' : 'Dernières transactions'}
                </h4>
                <div className="space-y-1 max-h-[400px] overflow-y-auto">
                  {allTransactions.slice(0, selectedAccount === 'all' ? 6 : 4).map((transaction) => (
                    <div
                      key={`${transaction.id}-${transaction.bank || ''}`}
                      className="group flex flex-col sm:flex-row sm:items-center sm:justify-between py-2.5 px-3 -mx-3 hover:bg-gradient-to-r hover:from-transparent hover:to-primary-50/20 rounded-lg transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3 mb-2 sm:mb-0">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm",
                          transaction.type === 'credit' ? "bg-gradient-to-br from-green-400 to-green-500" : "bg-gradient-to-br from-red-400 to-red-500"
                        )}>
                          {transaction.type === 'credit' ? 
                            <ArrowDownRight className="w-4 h-4 text-white" /> :
                            <ArrowUpRight className="w-4 h-4 text-white" />
                          }
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neutral-800 group-hover:text-neutral-900">
                            {transaction.label}
                            {selectedAccount === 'all' && transaction.bank && (
                              <span className={cn("ml-2 text-xs px-1.5 py-0.5 rounded-full", transaction.bankColor || 'bg-neutral-100')}>
                                {transaction.bank}
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-neutral-400">{transaction.date} • {transaction.category}</p>
                        </div>
                      </div>
                      <div className="text-right pl-11 sm:pl-0">
                        <p className={cn(
                          "text-sm font-bold tabular-nums",
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
                <button className="w-full mt-4 py-2 bg-gradient-to-r from-primary-50 to-purple-50 text-primary-600 font-medium rounded-lg hover:from-primary-100 hover:to-purple-100 transition-all">
                  Voir toutes les transactions →
                </button>
              </div>
            </div>
          );

        case 'sales':
          return (
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass h-full">
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
                      <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <span>{sale.reference}</span>
                        <span className="text-neutral-300">•</span>
                        <span title={`Uploadé le ${sale.uploadedAt}`}>
                          MAJ: {sale.updatedAt.split(' ')[0].split('-').slice(1).reverse().join('/')}
                        </span>
                      </div>
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
            </div>
          );

        case 'purchases':
          return (
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass h-full">
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
                      <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <span>{purchase.category}</span>
                        <span className="text-neutral-300">•</span>
                        <span title={`Uploadé le ${purchase.uploadedAt}`}>
                          MAJ: {purchase.updatedAt.split(' ')[0].split('-').slice(1).reverse().join('/')}
                        </span>
                      </div>
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
            </div>
          );

        case 'receivables':
          return (
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass h-full">
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
            </div>
          );

        case 'payables':
          return (
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass h-full">
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
            </div>
          );

        case 'kpis':
          return (
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/30 shadow-glass">
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

                {/* Autres KPIs */}
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
            </div>
          );

        // Autres widgets (tax, deadlines, company, etc.)
        case 'tax':
          return (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-xl rounded-2xl p-6 border border-purple-200/30 shadow-glass h-full">
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
            </div>
          );

        default:
          return null;
      }
    };

    return widgetContent();
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Barre de personnalisation */}
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={() => setIsCustomizing(!isCustomizing)}
          className={cn(
            "px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all text-sm font-medium",
            isCustomizing 
              ? "bg-primary-600 text-white" 
              : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
          )}
        >
          <Settings2 className="w-4 h-4" />
          {isCustomizing ? "Terminer" : "Personnaliser"}
        </button>
      </div>

      {/* Grille de widgets réorganisable */}
      {isCustomizing ? (
        <div className="relative">
          <Reorder.Group 
            values={widgetOrder} 
            onReorder={saveWidgetOrder}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {widgetOrder.map((widget) => (
              <Reorder.Item 
                key={widget.id} 
                value={widget}
                className={cn(
                  "relative group cursor-move",
                  widget.size === 'full' ? "col-span-full" :
                  widget.size === 'large' ? "md:col-span-2 col-span-1" :
                  "col-span-1"
                )}
                whileDrag={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  zIndex: 1000
                }}
                dragElastic={0.2}
                dragMomentum={false}
              >
                <div className="absolute -top-2 -left-2 z-20 p-2 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                  <GripVertical className="w-4 h-4" />
                </div>
                <div className="h-full">
                  {renderWidget(widget)}
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
          <div className="mt-4 text-center text-sm text-neutral-500">
            Glissez-déposez les cartes pour les réorganiser
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgetOrder.map((widget) => (
            <div 
              key={widget.id}
              className={cn(
                widget.size === 'full' ? "col-span-full" :
                widget.size === 'large' ? "md:col-span-2 col-span-1" :
                "col-span-1"
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: widgetOrder.indexOf(widget) * 0.05 }}
              >
                {renderWidget(widget)}
              </motion.div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}