'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Building, Car, Banknote } from 'lucide-react';
import { TaxMode } from '@/lib/types/tax-types';
import { mockTaxDeclarations } from '@/lib/mock-data/tax-data';
import DeclarationCard from '../components/DeclarationCard';

interface LiasseModuleProps {
  taxMode: TaxMode;
}

export default function LiasseModule({ taxMode }: LiasseModuleProps) {
  const liasseDeclarations = mockTaxDeclarations.filter(d => d.group === 'liasse');

  const declarationTypes = [
    {
      type: 'IS',
      title: 'Impôt sur les Sociétés',
      description: 'Déclaration annuelle des bénéfices',
      icon: Building,
      color: '#182752'
    },
    {
      type: 'IR',
      title: 'Impôt sur le Revenu',
      description: 'Déclaration des revenus BIC/BNC',
      icon: Banknote,
      color: '#512952'
    },
    {
      type: 'TDFC',
      title: 'Taxe sur les véhicules',
      description: 'TDFC véhicules de société',
      icon: Car,
      color: '#2b3642'
    }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-white/10">
          <div className="w-10 h-10 bg-[#182752]/20 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#182752]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Liasse fiscale
            </h2>
            <p className="text-neutral-400">
              Déclarations annuelles interconnectées
            </p>
          </div>
        </div>

        {/* Guide pour mode entrepreneur */}
        {taxMode === 'entrepreneur' && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-3">
              Qu'est-ce que la liasse fiscale ?
            </h3>
            <p className="text-blue-100 text-sm mb-4">
              La liasse fiscale regroupe vos déclarations annuelles qui sont souvent liées entre elles. 
              Elle comprend généralement l'IS, l'IR et les taxes spécifiques comme la TDFC.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-medium text-white mb-1">Période</div>
                <div className="text-blue-200">Année civile</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-medium text-white mb-1">Échéance</div>
                <div className="text-blue-200">15 mai N+1</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-medium text-white mb-1">Coordination</div>
                <div className="text-blue-200">Données liées</div>
              </div>
            </div>
          </div>
        )}

        {/* Types de déclarations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {declarationTypes.map((type) => {
            const Icon = type.icon;
            const declarations = liasseDeclarations.filter(d => d.type === type.type);
            
            return (
              <div
                key={type.type}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${type.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: type.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {type.title}
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      {type.description}
                    </p>
                  </div>
                </div>

                {declarations.length > 0 ? (
                  <div className="space-y-3">
                    {declarations.map((declaration) => (
                      <div
                        key={declaration.id}
                        className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-white text-sm">
                            {declaration.period.year}
                          </span>
                          <span 
                            className="px-2 py-1 rounded-lg text-xs font-medium"
                            style={{ 
                              backgroundColor: declaration.status === 'accepted' ? '#10b98120' : '#FAA01620',
                              color: declaration.status === 'accepted' ? '#10b981' : '#FAA016'
                            }}
                          >
                            {declaration.status === 'accepted' ? 'Acceptée' : 
                             declaration.status === 'submitted' ? 'Transmise' : 'Brouillon'}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400">
                          Échéance: {new Date(declaration.dueDate).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-neutral-400 text-sm">
                      Aucune déclaration {type.type} en cours
                    </p>
                    <button 
                      className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Créer une déclaration
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Vue d'ensemble des déclarations */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Historique complet
          </h3>
          <div className="space-y-4">
            {liasseDeclarations.map((declaration) => (
              <DeclarationCard 
                key={declaration.id}
                declaration={declaration}
                expertMode={taxMode === 'expert'}
                onClick={() => {/* Ouvrir la déclaration */}}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}