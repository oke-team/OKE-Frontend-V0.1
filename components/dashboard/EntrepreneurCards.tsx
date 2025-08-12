'use client';

import React from 'react';
import { 
  CardBase, 
  HeroCard, 
  StandardCard, 
  CalculationCard,
  CompactCard 
} from '@/components/ui/CardBase';
import { 
  TrendingUp, 
  TrendingDown, 
  Euro, 
  Users, 
  FileText,
  Calculator,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Composant pour afficher une métrique avec tendance
const MetricCard = ({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon: Icon,
  accentColor = 'violet' as const
}) => (
  <StandardCard
    accentColor={accentColor}
    interactive
    header={
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-400">{title}</span>
        {Icon && <Icon className="w-4 h-4 text-neutral-500" />}
      </div>
    }
  >
    <div className="space-y-2">
      <div className="text-2xl font-bold text-white">
        {value}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm ${
          trend === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          {trend === 'up' ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  </StandardCard>
);

// Carte principale du tableau de bord entrepreneur
export const EntrepreneurDashboard = () => {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Carte Hero - Vue d'ensemble */}
      <HeroCard
        accentColor="violet"
        glassMorphism
        badge={
          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
            Actif
          </span>
        }
        header={
          <div className="flex items-center justify-between">
            <h1 className="text-xl lg:text-2xl font-bold text-white">
              Tableau de Bord Entrepreneur
            </h1>
            <span className="text-sm text-neutral-400">
              Janvier 2025
            </span>
          </div>
        }
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-neutral-400">Chiffre d'affaires</p>
            <p className="text-xl font-bold text-white">€45,231</p>
            <p className="text-xs text-green-400">+12.5%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-neutral-400">Dépenses</p>
            <p className="text-xl font-bold text-white">€12,456</p>
            <p className="text-xs text-red-400">+3.2%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-neutral-400">Bénéfice net</p>
            <p className="text-xl font-bold text-white">€32,775</p>
            <p className="text-xs text-green-400">+18.9%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-neutral-400">Taux de marge</p>
            <p className="text-xl font-bold text-white">72.5%</p>
            <p className="text-xs text-green-400">+5.2%</p>
          </div>
        </div>
      </HeroCard>

      {/* Grille de métriques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Clients actifs"
          value="156"
          trend="up"
          trendValue="+8 ce mois"
          icon={Users}
          accentColor="green"
        />
        
        <MetricCard
          title="Factures en attente"
          value="12"
          trend="down"
          trendValue="-3 depuis hier"
          icon={FileText}
          accentColor="violet"
        />
        
        <MetricCard
          title="Trésorerie"
          value="€89,456"
          trend="up"
          trendValue="+15.3%"
          icon={Euro}
          accentColor="primary"
        />
      </div>

      {/* Cartes de calcul */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CalculationCard
          accentColor="green"
          header={
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-green-400" />
              <span className="font-semibold text-white">TVA à déclarer</span>
            </div>
          }
          footer={
            <button className="w-full py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors">
              Calculer maintenant
            </button>
          }
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">TVA collectée</span>
              <span className="text-white font-medium">€9,046.20</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">TVA déductible</span>
              <span className="text-white font-medium">€2,491.40</span>
            </div>
            <div className="border-t border-white/10 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">Solde à payer</span>
                <span className="text-green-400 font-bold text-xl">€6,554.80</span>
              </div>
            </div>
          </div>
        </CalculationCard>

        <CalculationCard
          accentColor="violet"
          header={
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-violet-400" />
              <span className="font-semibold text-white">Charges sociales</span>
            </div>
          }
          footer={
            <button className="w-full py-2 bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 rounded-lg transition-colors">
              Voir le détail
            </button>
          }
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">URSSAF</span>
              <span className="text-white font-medium">€3,234.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Retraite</span>
              <span className="text-white font-medium">€1,876.50</span>
            </div>
            <div className="border-t border-white/10 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">Total trimestre</span>
                <span className="text-violet-400 font-bold text-xl">€5,110.50</span>
              </div>
            </div>
          </div>
        </CalculationCard>
      </div>

      {/* Cartes compactes pour actions rapides */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <CompactCard
          interactive
          accentColor="green"
          className="flex items-center justify-center hover:scale-105"
        >
          <div className="text-center">
            <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <span className="text-sm text-white">Valider factures</span>
          </div>
        </CompactCard>

        <CompactCard
          interactive
          accentColor="violet"
          className="flex items-center justify-center hover:scale-105"
        >
          <div className="text-center">
            <FileText className="w-6 h-6 text-violet-400 mx-auto mb-1" />
            <span className="text-sm text-white">Nouveau devis</span>
          </div>
        </CompactCard>

        <CompactCard
          interactive
          accentColor="primary"
          className="flex items-center justify-center hover:scale-105"
        >
          <div className="text-center">
            <Users className="w-6 h-6 text-primary-400 mx-auto mb-1" />
            <span className="text-sm text-white">Gérer clients</span>
          </div>
        </CompactCard>

        <CompactCard
          interactive
          accentColor="red"
          className="flex items-center justify-center hover:scale-105"
        >
          <div className="text-center">
            <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-1" />
            <span className="text-sm text-white">3 urgences</span>
          </div>
        </CompactCard>
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;