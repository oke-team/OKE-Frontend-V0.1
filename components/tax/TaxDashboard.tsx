'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TaxMode, DeclarationGroup } from '@/lib/types/tax-types';
import { mockTaxDashboardData, getCriticalDeadlines } from '@/lib/mock-data/tax-data';
import TaxGroupCard from './components/TaxGroupCard';
import TaxTimeline from './components/TaxTimeline';
import TaxStatsCard from './components/TaxStatsCard';

interface TaxDashboardProps {
  taxMode: TaxMode;
  onGroupSelect: (group: DeclarationGroup) => void;
}

export default function TaxDashboard({ taxMode, onGroupSelect }: TaxDashboardProps) {
  const dashboardData = mockTaxDashboardData;
  const criticalDeadlines = getCriticalDeadlines();

  const statsCards = [
    {
      title: 'Total déclarations',
      value: dashboardData.summary.totalDeclarations,
      icon: FileText,
      color: '#737373',
      trend: '+2 ce mois'
    },
    {
      title: 'En attente',
      value: dashboardData.summary.pendingDeclarations,
      icon: Clock,
      color: '#FAA016',
      trend: '3 prioritaires'
    },
    {
      title: 'Validées',
      value: dashboardData.summary.acceptedDeclarations,
      icon: CheckCircle,
      color: '#10b981',
      trend: '+1 cette semaine'
    },
    {
      title: 'Échéances critiques',
      value: dashboardData.summary.criticalDeadlines,
      icon: AlertTriangle,
      color: '#ef4444',
      trend: '< 7 jours'
    }
  ];

  const groupCards = [
    {
      key: 'tva' as DeclarationGroup,
      title: 'TVA',
      description: 'Déclarations de TVA mensuelles et trimestrielles',
      data: dashboardData.groups.tva,
      color: '#4C34CE'
    },
    {
      key: 'liasse' as DeclarationGroup,
      title: 'Liasse fiscale',
      description: 'IS, IR et TDFC - Déclarations annuelles',
      data: dashboardData.groups.liasse,
      color: '#182752'
    },
    {
      key: 'other' as DeclarationGroup,
      title: 'Autres déclarations',
      description: 'Paiements, PART et requêtes spécifiques',
      data: dashboardData.groups.other,
      color: '#FAA016'
    },
    {
      key: 'personal' as DeclarationGroup,
      title: 'Personnel dirigeant',
      description: 'Déclaration IR personnelle avec données entreprise',
      data: dashboardData.groups.personal,
      color: '#512952'
    }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-8">
        
        {/* Messages d'alerte critiques */}
        {criticalDeadlines.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">
                  Échéances critiques à traiter
                </h3>
                <p className="text-sm text-red-700 mb-2">
                  {criticalDeadlines.length} déclaration(s) à traiter dans les 7 prochains jours
                </p>
                <div className="flex flex-wrap gap-2">
                  {criticalDeadlines.slice(0, 3).map((deadline) => (
                    <span
                      key={deadline.id}
                      className="px-2 py-1 bg-red-500/20 text-red-800 rounded-lg text-xs font-medium"
                    >
                      {deadline.title} - {deadline.daysUntilDue} jours
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Statistiques générales */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat, index) => (
            <TaxStatsCard
              key={stat.title}
              {...stat}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Groupes de déclarations */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-neutral-600" />
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">
                Groupes de déclarations
              </h2>
              <p className="text-sm text-neutral-600">
                {taxMode === 'entrepreneur' 
                  ? 'Interface guidée pour chaque type de déclaration'
                  : 'Accès expert avec backoffice ASP ONE'
                }
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {groupCards.map((group, index) => (
              <TaxGroupCard
                key={group.key}
                title={group.title}
                description={group.description}
                data={group.data}
                color={group.color}
                taxMode={taxMode}
                onClick={() => onGroupSelect(group.key)}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Timeline des échéances */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-neutral-600" />
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">
                Prochaines échéances
              </h2>
              <p className="text-sm text-neutral-600">
                Calendrier des obligations fiscales
              </p>
            </div>
          </div>

          <TaxTimeline 
            deadlines={dashboardData.upcomingDeadlines}
            limit={8}
          />
        </div>

        {/* Activité récente */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-neutral-600" />
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">
                Activité récente
              </h2>
              <p className="text-sm text-neutral-600">
                Dernières modifications et transmissions
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="space-y-4">
              {dashboardData.recentActivity.slice(0, 5).map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full flex-shrink-0",
                    activity.type === 'acceptance' && "bg-green-500",
                    activity.type === 'submission' && "bg-blue-500",
                    activity.type === 'modification' && "bg-orange-500",
                    activity.type === 'rejection' && "bg-red-500",
                    activity.type === 'error' && "bg-red-600"
                  )} />
                  
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-200">
                      {activity.message}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {new Date(activity.timestamp).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}