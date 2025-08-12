'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreasuryHeroCard } from './TreasuryHeroCard';
import { ClientsCard } from './ClientsCard';
import { SuppliersCard } from './SuppliersCard';
import { PayrollCard } from './PayrollCard';
import { TaxCard } from './TaxCard';
import { RevenueCard } from './RevenueCard';
import { ExpensesCard } from './ExpensesCard';
import { MarginCard } from './MarginCard';
import { NetResultCard } from './NetResultCard';
import { DrillDownView } from './DrillDownView';
import { cn } from '@/lib/utils';

interface EntrepreneurDashboardProps {
  data?: {
    treasury?: {
      totalAmount: number;
      evolution: number;
      trend: 'up' | 'down' | 'stable';
      entriesAmount: number;
      exitsAmount: number;
      forecast30Days: number;
    };
    clients?: {
      totalAmount: number;
      overdueAmount: number;
      averageDays: number;
      trend: 'up' | 'down' | 'stable';
    };
    suppliers?: {
      totalAmount: number;
      overdueAmount: number;
      averageDays: number;
      trend: 'up' | 'down' | 'stable';
    };
    payroll?: {
      totalAmount: number;
      employees: number;
      nextPayment: string;
    };
    tax?: {
      totalAmount: number;
      nextDeadline: string;
      type: string;
    };
    revenue?: {
      totalAmount: number;
      evolution: number;
      trend: 'up' | 'down' | 'stable';
    };
    expenses?: {
      totalAmount: number;
      evolution: number;
      trend: 'up' | 'down' | 'stable';
    };
    margin?: {
      percentage: number;
      amount: number;
      evolution: number;
    };
    netResult?: {
      amount: number;
      evolution: number;
      trend: 'up' | 'down' | 'stable';
    };
  };
  loading?: boolean;
}

export const EntrepreneurDashboard: React.FC<EntrepreneurDashboardProps> = ({
  data = {},
  loading = false,
}) => {
  const [activeTab, setActiveTab] = useState<'bilan' | 'resultat'>('bilan');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
  };

  const handleCloseDrillDown = () => {
    setSelectedCard(null);
  };

  // Configuration des drill-down views par type de carte
  const getDrillDownConfig = (cardId: string) => {
    const configs: Record<string, { title: string; color: 'violet' | 'green' | 'red' | 'blue' | 'orange' }> = {
      treasury: { title: 'Trésorerie', color: 'violet' },
      clients: { title: 'Clients', color: 'green' },
      suppliers: { title: 'Fournisseurs', color: 'orange' },
      payroll: { title: 'Salaires', color: 'blue' },
      tax: { title: 'Taxes & Impôts', color: 'orange' },
      revenue: { title: 'Chiffre d\'Affaires', color: 'blue' },
      expenses: { title: 'Charges', color: 'red' },
      margin: { title: 'Marge', color: 'green' },
      netResult: { title: 'Résultat Net', color: 'green' },
    };
    return configs[cardId] || { title: '', color: 'violet' };
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
        <button
          onClick={() => setActiveTab('bilan')}
          className={cn(
            "flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300",
            activeTab === 'bilan'
              ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-white/10"
          )}
        >
          Bilan
        </button>
        <button
          onClick={() => setActiveTab('resultat')}
          className={cn(
            "flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300",
            activeTab === 'resultat'
              ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-white/10"
          )}
        >
          Résultat
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'bilan' ? (
          <motion.div
            key="bilan"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {/* Trésorerie - Hero Card (prend 2 colonnes sur desktop) */}
            <div className="md:col-span-2">
              <TreasuryHeroCard
                totalAmount={data.treasury?.totalAmount ?? 125000}
                evolution={data.treasury?.evolution ?? 12.5}
                trend={data.treasury?.trend ?? 'up'}
                entriesAmount={data.treasury?.entriesAmount ?? 45000}
                exitsAmount={data.treasury?.exitsAmount ?? 32000}
                forecast30Days={data.treasury?.forecast30Days ?? 138000}
                onClick={() => handleCardClick('treasury')}
                loading={loading}
              />
            </div>

            {/* Clients */}
            <ClientsCard
              totalAmount={data.clients?.totalAmount ?? 87500}
              overdueAmount={data.clients?.overdueAmount ?? 12300}
              averageDays={data.clients?.averageDays ?? 28}
              trend={data.clients?.trend ?? 'stable'}
              onClick={() => handleCardClick('clients')}
              loading={loading}
            />

            {/* Fournisseurs */}
            <SuppliersCard
              totalAmount={data.suppliers?.totalAmount ?? 43200}
              overdueAmount={data.suppliers?.overdueAmount ?? 5600}
              averageDays={data.suppliers?.averageDays ?? 35}
              trend={data.suppliers?.trend ?? 'down'}
              onClick={() => handleCardClick('suppliers')}
              loading={loading}
            />

            {/* Salaires */}
            <PayrollCard
              totalAmount={data.payroll?.totalAmount ?? 28500}
              employees={data.payroll?.employees ?? 8}
              nextPayment={data.payroll?.nextPayment ?? '25/01/2025'}
              onClick={() => handleCardClick('payroll')}
              loading={loading}
            />

            {/* Taxes */}
            <TaxCard
              totalAmount={data.tax?.totalAmount ?? 15600}
              nextDeadline={data.tax?.nextDeadline ?? '15/02/2025'}
              type={data.tax?.type ?? 'TVA'}
              onClick={() => handleCardClick('tax')}
              loading={loading}
            />
          </motion.div>
        ) : (
          <motion.div
            key="resultat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {/* Chiffre d'affaires - Hero Card */}
            <div className="md:col-span-2">
              <RevenueCard
                totalAmount={data.revenue?.totalAmount ?? 285000}
                evolution={data.revenue?.evolution ?? 18.5}
                trend={data.revenue?.trend ?? 'up'}
                onClick={() => handleCardClick('revenue')}
                loading={loading}
              />
            </div>

            {/* Charges */}
            <ExpensesCard
              totalAmount={data.expenses?.totalAmount ?? 195000}
              evolution={data.expenses?.evolution ?? 8.2}
              trend={data.expenses?.trend ?? 'up'}
              onClick={() => handleCardClick('expenses')}
              loading={loading}
            />

            {/* Marge - Calculation Card */}
            <MarginCard
              percentage={data.margin?.percentage ?? 31.6}
              amount={data.margin?.amount ?? 90000}
              evolution={data.margin?.evolution ?? 10.3}
              onClick={() => handleCardClick('margin')}
              loading={loading}
            />

            {/* Résultat Net - Calculation Card */}
            <div className="md:col-span-2">
              <NetResultCard
                amount={data.netResult?.amount ?? 45000}
                evolution={data.netResult?.evolution ?? 15.2}
                trend={data.netResult?.trend ?? 'up'}
                onClick={() => handleCardClick('netResult')}
                loading={loading}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Scroll Indicator */}
      <div className="md:hidden flex justify-center mt-4">
        <div className="flex gap-1">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                dot === 2
                  ? "w-8 bg-gradient-to-r from-violet-500 to-purple-600"
                  : "bg-neutral-300"
              )}
            />
          ))}
        </div>
      </div>

      {/* Drill-down View */}
      {selectedCard && (
        <DrillDownView
          isOpen={!!selectedCard}
          onClose={handleCloseDrillDown}
          title={getDrillDownConfig(selectedCard).title}
          cardType={selectedCard}
          accentColor={getDrillDownConfig(selectedCard).color}
        >
          {/* Contenu spécifique par type de carte */}
          <div className="space-y-4">
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <h3 className="font-semibold mb-2">Détails {getDrillDownConfig(selectedCard).title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Vue détaillée des données de {getDrillDownConfig(selectedCard).title.toLowerCase()}.
                Cette section affichera les transactions, graphiques et analyses spécifiques.
              </p>
            </div>
            
            {/* Placeholder pour le contenu spécifique */}
            <div className="grid gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </DrillDownView>
      )}
    </div>
  );
};