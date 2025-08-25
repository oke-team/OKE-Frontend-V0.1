'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Calculator,
  Calendar,
  Euro,
  Building2,
  Shield,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TaxMode, DeclarationGroup } from '@/lib/types/tax-types';
import { mockTaxDashboardData, getCriticalDeadlines } from '@/lib/mock-data/tax-data';
import { designTokens } from '@/lib/design-tokens';

interface TaxDashboardInstitutionalProps {
  taxMode: TaxMode;
  onGroupSelect: (group: DeclarationGroup) => void;
}

export default function TaxDashboardInstitutional({ taxMode, onGroupSelect }: TaxDashboardInstitutionalProps) {
  const dashboardData = mockTaxDashboardData;
  const criticalDeadlines = getCriticalDeadlines();

  const statsCards = [
    {
      title: 'Déclarations actives',
      value: dashboardData.summary.totalDeclarations,
      icon: FileText,
      color: designTokens.tax.status.normal.base,
      bgColor: designTokens.tax.status.normal.light,
      change: '+2 ce mois'
    },
    {
      title: 'En attente de traitement',
      value: dashboardData.summary.pendingDeclarations,
      icon: Clock,
      color: designTokens.tax.status.pending.base,
      bgColor: designTokens.tax.status.pending.light,
      change: '3 prioritaires'
    },
    {
      title: 'Validées par l\'administration',
      value: dashboardData.summary.acceptedDeclarations,
      icon: CheckCircle,
      color: designTokens.tax.status.validated.base,
      bgColor: designTokens.tax.status.validated.light,
      change: '+1 cette semaine'
    },
    {
      title: 'Échéances urgentes',
      value: dashboardData.summary.criticalDeadlines,
      icon: AlertTriangle,
      color: designTokens.tax.status.critical.base,
      bgColor: designTokens.tax.status.critical.light,
      change: '< 7 jours'
    }
  ];

  const declarationGroups = [
    {
      key: 'tva' as DeclarationGroup,
      title: 'TVA - Taxe sur la Valeur Ajoutée',
      subtitle: 'CA3 • Régime normal • Déclarations mensuelles',
      description: 'Déclarations TVA avec calculs automatiques et transmission sécurisée',
      icon: Calculator,
      data: dashboardData.groups.tva,
      color: designTokens.tax.declarationTypes.TVA.base,
      bgPattern: designTokens.tax.declarationTypes.TVA.pattern,
      stats: [
        { label: 'Montant moyen', value: '8 450 €' },
        { label: 'Fréquence', value: 'Mensuelle' },
        { label: 'Prochaine', value: '15 janv.' }
      ]
    },
    {
      key: 'liasse' as DeclarationGroup,
      title: 'Liasse Fiscale Annuelle',
      subtitle: 'IS • IR • TDFC • Déclarations coordonnées',
      description: 'Ensemble des déclarations annuelles avec données interconnectées',
      icon: Building2,
      data: dashboardData.groups.liasse,
      color: designTokens.tax.declarationTypes.IR.base,
      bgPattern: designTokens.tax.declarationTypes.IR.pattern,
      stats: [
        { label: 'Exercice', value: '2024' },
        { label: 'Échéance', value: '15 mai 2025' },
        { label: 'Statut', value: 'En cours' }
      ]
    },
    {
      key: 'other' as DeclarationGroup,
      title: 'Autres Obligations Fiscales',
      subtitle: 'Paiements • PART • Requêtes administratives',
      description: 'Acomptes, participations et demandes spécifiques',
      icon: Shield,
      data: dashboardData.groups.other,
      color: designTokens.tax.declarationTypes.PAIEMENT.base,
      bgPattern: designTokens.tax.declarationTypes.PAIEMENT.pattern,
      stats: [
        { label: 'Acomptes IS', value: '4 versements' },
        { label: 'DAS2', value: 'À traiter' },
        { label: 'Requêtes', value: '0 en cours' }
      ]
    },
    {
      key: 'personal' as DeclarationGroup,
      title: 'Déclaration Dirigeant',
      subtitle: 'IR Personnel • Intégration entreprise → personnel',
      description: '🚀 Innovation OKÉ : Synchronisation automatique des revenus',
      icon: Target,
      data: dashboardData.groups.personal,
      color: designTokens.tax.declarationTypes.PART.base,
      bgPattern: designTokens.tax.declarationTypes.PART.pattern,
      stats: [
        { label: 'Revenus TNS', value: '48 000 €' },
        { label: 'Dividendes', value: '12 000 €' },
        { label: 'Optimisation', value: 'Active' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Header institutionnel */}
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Tableau de Bord Fiscal
              </h1>
              <p className="text-gray-600">
                {taxMode === 'entrepreneur' 
                  ? 'Interface guidée pour entrepreneurs - Gestion simplifiée de vos obligations fiscales'
                  : 'Mode Expert - Accès complet aux fonctionnalités avancées et backoffice ASP ONE'
                }
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Entreprise</div>
              <div className="font-semibold text-gray-900">DEMO ENTREPRISE SARL</div>
              <div className="text-sm text-gray-600">SIRET: 12345678901234</div>
            </div>
          </div>
        </div>

        {/* Alertes critiques */}
        {criticalDeadlines.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-200 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">
                  ⚠️ ÉCHÉANCES CRITIQUES À TRAITER
                </h3>
                <p className="text-red-700 mb-3">
                  {criticalDeadlines.length} déclaration(s) doivent être traitées dans les 7 prochains jours
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {criticalDeadlines.slice(0, 3).map((deadline) => (
                    <div
                      key={deadline.id}
                      className="bg-red-100 border border-red-200 rounded p-2"
                    >
                      <div className="font-semibold text-red-800 text-sm">
                        {deadline.title}
                      </div>
                      <div className="text-red-700 text-xs">
                        J-{deadline.daysUntilDue} • {deadline.amount?.toLocaleString('fr-FR', {
                          style: 'currency', currency: 'EUR'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Statistiques en grille */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg border-2 border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center border-2"
                    style={{ 
                      backgroundColor: stat.bgColor,
                      borderColor: stat.color 
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {stat.change}
                  </span>
                </div>
                
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {stat.title}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Groupes de déclarations */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-gray-700" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Groupes de Déclarations Fiscales
              </h2>
              <p className="text-gray-600">
                Organisées par type d'obligation - Cliquez pour accéder aux formulaires
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {declarationGroups.map((group, index) => {
              const Icon = group.icon;
              
              return (
                <motion.button
                  key={group.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onGroupSelect(group.key)}
                  className={cn(
                    "text-left bg-white rounded-lg border-2 p-6 shadow-sm hover:shadow-lg transition-all duration-200",
                    "hover:border-gray-300 hover:scale-[1.02]",
                    group.bgPattern
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-14 h-14 rounded-lg flex items-center justify-center border-2"
                          style={{ 
                            backgroundColor: `${group.color}10`,
                            borderColor: group.color 
                          }}
                        >
                          <Icon className="w-7 h-7" style={{ color: group.color }} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {group.title}
                          </h3>
                          <p className="text-sm font-medium text-gray-600">
                            {group.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Badge statut */}
                      <div className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold border-2",
                        group.data.status === 'critical' && "bg-red-50 border-red-200 text-red-700",
                        group.data.status === 'warning' && "bg-orange-50 border-orange-200 text-orange-700",
                        group.data.status === 'ok' && "bg-green-50 border-green-200 text-green-700"
                      )}>
                        {group.data.status === 'critical' && '🚨 URGENT'}
                        {group.data.status === 'warning' && '⚠️ ATTENTION'}
                        {group.data.status === 'ok' && '✅ À JOUR'}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed">
                      {group.description}
                    </p>

                    {/* Statistiques */}
                    <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                      {group.stats.map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className="text-lg font-bold" style={{ color: group.color }}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-600">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Compteurs */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">
                          {group.data.count} déclaration(s) au total
                        </span>
                        {group.data.pendingCount > 0 && (
                          <span className="font-semibold" style={{ color: group.color }}>
                            {group.data.pendingCount} en attente
                          </span>
                        )}
                      </div>
                      {group.data.nextDeadline && (
                        <div className="text-sm font-medium text-gray-700">
                          Prochaine: {new Date(group.data.nextDeadline).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}