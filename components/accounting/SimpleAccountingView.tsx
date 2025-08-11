'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CategoryDetailView from './CategoryDetailView';
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Wallet,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  HelpCircle,
  Plus,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { useExpertMode, useAccountingTerms } from '@/contexts/ExpertModeContext';

interface SimpleAccountingViewProps {
  onActionClick?: (action: string) => void;
}

export default function SimpleAccountingView({ onActionClick }: SimpleAccountingViewProps) {
  const { formatAmount, getAccountIcon } = useExpertMode();
  const { balance, generalLedger, reconciliation } = useAccountingTerms();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [detailView, setDetailView] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Catégories simplifiées pour les novices
  const categories = [
    {
      id: 'income',
      title: 'Revenus',
      icon: <TrendingUp className="w-5 h-5" />,
      amount: 45250.00,
      change: 12.5,
      color: 'bg-green-50 text-green-600',
      borderColor: 'border-green-200',
      items: [
        { label: 'Ventes de produits', amount: 35000, icon: '📦' },
        { label: 'Prestations de services', amount: 10250, icon: '🛠️' }
      ]
    },
    {
      id: 'expenses',
      title: 'Dépenses',
      icon: <TrendingDown className="w-5 h-5" />,
      amount: 32150.00,
      change: -5.2,
      color: 'bg-red-50 text-red-600',
      borderColor: 'border-red-200',
      items: [
        { label: 'Achats marchandises', amount: 15000, icon: '🛒' },
        { label: 'Services extérieurs', amount: 8500, icon: '🔧' },
        { label: 'Salaires', amount: 8650, icon: '👥' }
      ]
    },
    {
      id: 'receivables',
      title: 'À recevoir',
      icon: <DollarSign className="w-5 h-5" />,
      amount: 18500.00,
      subtitle: '5 factures en attente',
      color: 'bg-blue-50 text-blue-600',
      borderColor: 'border-blue-200',
      items: [
        { label: 'Client ABC - FA-2024-001', amount: 5500, daysLeft: 5, icon: '💰' },
        { label: 'Client XYZ - FA-2024-002', amount: 8000, daysLeft: 15, icon: '💰' },
        { label: 'Client 123 - FA-2024-003', amount: 5000, daysLeft: -3, overdue: true, icon: '⚠️' }
      ]
    },
    {
      id: 'payables',
      title: 'À payer',
      icon: <CreditCard className="w-5 h-5" />,
      amount: 12300.00,
      subtitle: '8 factures à régler',
      color: 'bg-orange-50 text-orange-600',
      borderColor: 'border-orange-200',
      items: [
        { label: 'Fournisseur Alpha', amount: 4500, daysLeft: 10, icon: '💳' },
        { label: 'Loyer bureaux', amount: 3500, daysLeft: 3, icon: '🏢' },
        { label: 'EDF', amount: 1200, daysLeft: 7, icon: '⚡' }
      ]
    },
    {
      id: 'bank',
      title: 'Banque',
      icon: <Wallet className="w-5 h-5" />,
      amount: 25480.00,
      subtitle: 'Solde actuel',
      color: 'bg-purple-50 text-purple-600',
      borderColor: 'border-purple-200',
      items: [
        { label: 'Compte courant BNP', amount: 20000, icon: '🏦' },
        { label: 'Livret A', amount: 5480, icon: '💵' }
      ]
    }
  ];

  const quickActions = [
    { 
      id: 'invoice', 
      label: 'Créer une facture', 
      icon: <FileText className="w-4 h-4" />,
      description: 'Facturer un client'
    },
    { 
      id: 'payment', 
      label: 'Enregistrer un paiement', 
      icon: <DollarSign className="w-4 h-4" />,
      description: 'Client ou fournisseur'
    },
    { 
      id: 'reconcile', 
      label: 'Vérifier mes paiements', 
      icon: <CheckCircle className="w-4 h-4" />,
      description: 'Rapprocher avec la banque'
    },
    { 
      id: 'expense', 
      label: 'Ajouter une dépense', 
      icon: <CreditCard className="w-4 h-4" />,
      description: 'Note de frais ou achat'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    // Ouvrir directement la vue détaillée au lieu d'expandre
    setDetailView(categoryId);
  };

  // Si une vue détaillée est sélectionnée, l'afficher
  if (detailView) {
    const category = categories.find(c => c.id === detailView);
    if (category) {
      return (
        <CategoryDetailView
          category={detailView as 'income' | 'expenses' | 'receivables' | 'payables' | 'bank'}
          title={category.title}
          onBack={() => setDetailView(null)}
        />
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec recherche */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Vue d&apos;ensemble financière</h2>
          <p className="text-neutral-600 mt-1">
            Gérez simplement vos finances sans connaissances comptables
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <motion.button
            key={action.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onActionClick?.(action.id)}
            className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-50 text-primary-600 rounded-lg group-hover:bg-primary-100">
                {action.icon}
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">{action.label}</div>
                <div className="text-xs text-neutral-500">{action.description}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Catégories financières */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-xl border ${category.borderColor} overflow-hidden cursor-pointer hover:shadow-lg transition-shadow`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {/* En-tête de catégorie */}
            <div className={`p-4 ${category.color}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {category.icon}
                  <h3 className="font-semibold">{category.title}</h3>
                </div>
                {category.change && (
                  <span className={`text-sm font-medium ${category.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {category.change > 0 ? '+' : ''}{category.change}%
                  </span>
                )}
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">{formatAmount(category.amount)}</div>
                {category.subtitle && (
                  <div className="text-sm opacity-80 mt-1">{category.subtitle}</div>
                )}
              </div>
            </div>

            {/* Indicateur cliquable */}
            <div className="absolute bottom-2 right-2 text-xs text-neutral-500">
              Cliquer pour voir les détails →
            </div>

            {/* Détails expandables - Désactivé car on ouvre maintenant une vue complète */}
            {false && selectedCategory === category.id && category.items && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                className="border-t"
              >
                <div className="p-4 space-y-2">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <div className="text-sm font-medium">{item.label}</div>
                          {'daysLeft' in item && item.daysLeft !== undefined && (
                            <div className={`text-xs ${'overdue' in item && item.overdue ? 'text-red-500' : 'text-neutral-500'}`}>
                              {'overdue' in item && item.overdue ? '⚠️ En retard de' : 'Dans'} {Math.abs(item.daysLeft)} jours
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-sm font-semibold">
                        {formatAmount(item.amount)}
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full mt-2 p-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    Voir tout →
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Aide contextuelle */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Besoin d&apos;aide ?</h4>
            <p className="text-sm text-blue-700 mt-1">
              Cette vue simplifiée vous permet de gérer votre comptabilité sans termes techniques. 
              Cliquez sur une catégorie pour voir les détails, ou utilisez les actions rapides pour 
              effectuer les opérations courantes.
            </p>
            <button className="text-sm text-blue-600 font-medium mt-2 hover:underline">
              Voir le guide complet →
            </button>
          </div>
        </div>
      </div>

      {/* Résumé du mois */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Résumé du mois</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-neutral-600">Bénéfice net</div>
            <div className="text-xl font-bold text-green-600">+13 100 €</div>
          </div>
          <div>
            <div className="text-sm text-neutral-600">Factures impayées</div>
            <div className="text-xl font-bold text-orange-600">5</div>
          </div>
          <div>
            <div className="text-sm text-neutral-600">À payer cette semaine</div>
            <div className="text-xl font-bold text-red-600">3 500 €</div>
          </div>
          <div>
            <div className="text-sm text-neutral-600">Trésorerie disponible</div>
            <div className="text-xl font-bold text-blue-600">25 480 €</div>
          </div>
        </div>
      </div>
    </div>
  );
}