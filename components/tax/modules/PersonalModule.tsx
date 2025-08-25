'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, TrendingUp, Banknote, Home, PieChart } from 'lucide-react';
import { TaxMode } from '@/lib/types/tax-types';
import { mockTaxDeclarations, mockDirectorTaxData } from '@/lib/mock-data/tax-data';
import DeclarationCard from '../components/DeclarationCard';

interface PersonalModuleProps {
  taxMode: TaxMode;
}

export default function PersonalModule({ taxMode }: PersonalModuleProps) {
  const personalDeclarations = mockTaxDeclarations.filter(d => d.group === 'personal');
  const directorData = mockDirectorTaxData;

  const incomeCategories = [
    {
      title: 'Revenus TNS',
      amount: directorData.tnsSalary,
      icon: Banknote,
      color: '#4C34CE',
      description: 'Rémunération dirigeant TNS'
    },
    {
      title: 'Dividendes',
      amount: directorData.dividends,
      icon: TrendingUp,
      color: '#10b981',
      description: 'Revenus de capitaux mobiliers'
    },
    {
      title: 'Revenus fonciers',
      amount: directorData.realEstateIncome,
      icon: Home,
      color: '#f59e0b',
      description: 'SCI et immobilier'
    },
    {
      title: 'Plus-values',
      amount: directorData.capitalGains,
      icon: PieChart,
      color: '#ef4444',
      description: 'Gains en capital'
    }
  ];

  const totalIncome = incomeCategories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-white/10">
          <div className="w-10 h-10 bg-[#512952]/20 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-[#512952]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Personnel dirigeant
            </h2>
            <p className="text-neutral-400">
              Déclaration IR avec données entreprise intégrées
            </p>
          </div>
        </div>

        {/* Valeur ajoutée différenciante */}
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">
                🚀 Révolutionnaire : Intégration entreprise ↔ personnel
              </h3>
              <p className="text-purple-100 text-sm mb-4">
                OKÉ est le premier logiciel à synchroniser automatiquement vos données d'entreprise 
                avec votre déclaration IR personnelle. Fini la double saisie !
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="font-medium text-white mb-1">✨ Automatisation</div>
                  <div className="text-purple-200">Import automatique des revenus TNS et dividendes</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="font-medium text-white mb-1">🎯 Optimisation</div>
                  <div className="text-purple-200">Suggestions d'arbitrages salaire/dividendes</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Synthèse des revenus */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Synthèse des revenus 2024
          </h3>
          
          {/* Total */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-neutral-400 mb-1">Total des revenus</div>
                <div className="text-3xl font-bold text-white">
                  {totalIncome.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-neutral-400 mb-1">Situation familiale</div>
                <div className="text-white font-medium">
                  {directorData.familyStatus === 'MARRIED' ? 'Marié(e)' : 'Célibataire'}
                  {directorData.dependents > 0 && ` • ${directorData.dependents} enfants`}
                </div>
              </div>
            </div>
          </div>

          {/* Détail par catégorie */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {incomeCategories.map((category, index) => {
              const Icon = category.icon;
              const percentage = totalIncome > 0 ? (category.amount / totalIncome * 100) : 0;
              
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: category.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">
                        {category.title}
                      </div>
                      <div className="text-xs text-neutral-400">
                        {category.description}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-white">
                      {category.amount.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                      })}
                    </div>
                    <div className="text-sm text-neutral-400">
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                  
                  {/* Barre de progression */}
                  <div className="mt-3">
                    <div className="w-full bg-neutral-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                        className="h-2 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mode entrepreneur : Assistant */}
        {taxMode === 'entrepreneur' && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-3">
              🎓 Assistant déclaration IR
            </h3>
            <p className="text-blue-100 text-sm mb-4">
              Notre assistant vous guide pour remplir votre déclaration personnelle en utilisant 
              automatiquement les données de votre entreprise.
            </p>
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors">
              Lancer l'assistant IR 2024
            </button>
          </div>
        )}

        {/* Liste des déclarations personnelles */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Mes déclarations personnelles
          </h3>
          <div className="space-y-4">
            {personalDeclarations.length > 0 ? (
              personalDeclarations.map((declaration) => (
                <DeclarationCard 
                  key={declaration.id}
                  declaration={declaration}
                  expertMode={taxMode === 'expert'}
                  onClick={() => {/* Ouvrir la déclaration */}}
                />
              ))
            ) : (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
                <User className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2">
                  Aucune déclaration personnelle
                </h4>
                <p className="text-neutral-400 text-sm mb-4">
                  Commencez par créer votre déclaration IR avec les données d'entreprise
                </p>
                <button className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors">
                  Créer ma déclaration IR 2024
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mode expert : Outils avancés */}
        {taxMode === 'expert' && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <h3 className="font-semibold text-white mb-4">
              Outils experts - Optimisation fiscale
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors">
                <div className="font-medium text-white mb-1">Simulateur d'optimisation</div>
                <div className="text-sm text-neutral-400">
                  Arbitrages salaire vs dividendes
                </div>
              </button>
              <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors">
                <div className="font-medium text-white mb-1">Export comptable</div>
                <div className="text-sm text-neutral-400">
                  Pour transmission au cabinet
                </div>
              </button>
              <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors">
                <div className="font-medium text-white mb-1">Historique fiscal</div>
                <div className="text-sm text-neutral-400">
                  Suivi pluriannuel
                </div>
              </button>
              <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors">
                <div className="font-medium text-white mb-1">Projections N+1</div>
                <div className="text-sm text-neutral-400">
                  Prévisionnel fiscal
                </div>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}