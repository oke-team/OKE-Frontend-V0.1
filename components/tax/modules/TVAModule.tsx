'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Receipt, Plus, FileText, Calculator, Send } from 'lucide-react';
import { TaxMode } from '@/lib/types/tax-types';
import { mockTaxDeclarations } from '@/lib/mock-data/tax-data';
import DeclarationCard from '../components/DeclarationCard';

interface TVAModuleProps {
  taxMode: TaxMode;
}

export default function TVAModule({ taxMode }: TVAModuleProps) {
  const [activeView, setActiveView] = useState<'list' | 'form' | 'expert'>('list');
  
  const tvaDeclarations = mockTaxDeclarations.filter(d => d.type === 'TVA');

  const renderEntrepreneurMode = () => (
    <div className="space-y-6">
      {/* Actions principales */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setActiveView('form')}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-[#4C34CE] hover:bg-[#6d5cde] text-white rounded-2xl font-semibold transition-colors flex-1 sm:flex-none"
        >
          <Plus className="w-5 h-5" />
          Nouvelle déclaration TVA
        </button>
        
        <button
          onClick={() => setActiveView('form')}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-medium transition-colors flex-1 sm:flex-none"
        >
          <Calculator className="w-5 h-5" />
          Calculateur TVA
        </button>
      </div>

      {/* Guide pédagogique */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Receipt className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">
              Comment remplir votre déclaration TVA ?
            </h3>
            <p className="text-blue-100 text-sm mb-4">
              Notre assistant vous guide pas à pas pour calculer et déclarer votre TVA en toute simplicité.
            </p>
            <ul className="text-blue-100 text-sm space-y-1">
              <li>• Import automatique des données comptables</li>
              <li>• Calcul automatique des montants</li>
              <li>• Vérifications avant transmission</li>
              <li>• Suivi de l'accusé de réception</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Liste des déclarations */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Mes déclarations TVA
        </h3>
        <div className="grid gap-4">
          {tvaDeclarations.map((declaration) => (
            <DeclarationCard 
              key={declaration.id}
              declaration={declaration}
              onClick={() => {/* Ouvrir la déclaration */}}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderExpertMode = () => (
    <div className="space-y-6">
      {/* Accès backoffice ASP ONE */}
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Send className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Backoffice ASP ONE
              </h3>
              <p className="text-purple-100 text-sm">
                Accès direct au portail professionnel
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors">
            Accéder au portail
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="font-medium text-white mb-1">Environnement</div>
            <div className="text-purple-200">Production</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="font-medium text-white mb-1">Statut connexion</div>
            <div className="text-green-400">Connecté</div>
          </div>
        </div>
      </div>

      {/* Actions avancées */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Transmission directe', icon: Send },
          { label: 'Génération XML-EDI', icon: FileText },
          { label: 'Import massif', icon: Plus },
          { label: 'Paramètres avancés', icon: Calculator }
        ].map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className="flex flex-col items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
            >
              <Icon className="w-6 h-6 text-neutral-400" />
              <span className="text-sm font-medium text-white">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Liste avec options avancées */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            Déclarations TVA - Vue Expert
          </h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white/10 text-white rounded-lg text-sm">
              Export CSV
            </button>
            <button className="px-3 py-1 bg-white/10 text-white rounded-lg text-sm">
              Filtres
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {tvaDeclarations.map((declaration) => (
            <DeclarationCard 
              key={declaration.id}
              declaration={declaration}
              expertMode={true}
              onClick={() => {/* Ouvrir en mode expert */}}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-white/10">
          <div className="w-10 h-10 bg-[#4C34CE]/20 rounded-xl flex items-center justify-center">
            <Receipt className="w-5 h-5 text-[#4C34CE]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Module TVA
            </h2>
            <p className="text-neutral-400">
              {taxMode === 'entrepreneur' 
                ? 'Interface guidée pour vos déclarations TVA'
                : 'Accès expert avec backoffice ASP ONE'
              }
            </p>
          </div>
        </div>

        {/* Contenu selon le mode */}
        {taxMode === 'entrepreneur' ? renderEntrepreneurMode() : renderExpertMode()}
      </motion.div>
    </div>
  );
}