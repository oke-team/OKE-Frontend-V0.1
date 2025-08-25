'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, FileQuestion, Send } from 'lucide-react';
import { TaxMode } from '@/lib/types/tax-types';
import { mockTaxDeclarations } from '@/lib/mock-data/tax-data';
import DeclarationCard from '../components/DeclarationCard';

interface OtherDeclarationsModuleProps {
  taxMode: TaxMode;
}

export default function OtherDeclarationsModule({ taxMode }: OtherDeclarationsModuleProps) {
  const otherDeclarations = mockTaxDeclarations.filter(d => d.group === 'other');

  const declarationCategories = [
    {
      type: 'PAIEMENT',
      title: 'Paiements fiscaux',
      description: 'Acomptes IS, CVAE, RCM, etc.',
      icon: CreditCard,
      color: '#FAA016',
      declarations: otherDeclarations.filter(d => d.type === 'PAIEMENT')
    },
    {
      type: 'PART',
      title: 'Participations',
      description: 'IFU, Honoraires, DAS2',
      icon: Send,
      color: '#2b3642',
      declarations: otherDeclarations.filter(d => d.type === 'PART')
    },
    {
      type: 'REQUETE',
      title: 'Requêtes',
      description: 'Demandes d\'information, listes de locaux',
      icon: FileQuestion,
      color: '#6da4c3',
      declarations: otherDeclarations.filter(d => d.type === 'REQUETE')
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
          <div className="w-10 h-10 bg-[#FAA016]/20 rounded-xl flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-[#FAA016]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Autres déclarations
            </h2>
            <p className="text-neutral-400">
              Paiements, participations et requêtes spécifiques
            </p>
          </div>
        </div>

        {/* Guide pour mode entrepreneur */}
        {taxMode === 'entrepreneur' && (
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-3">
              Types de déclarations complémentaires
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-medium text-white mb-2">Paiements</div>
                <div className="text-orange-100">
                  Acomptes d'impôts, versements anticipés
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-medium text-white mb-2">Participations</div>
                <div className="text-orange-100">
                  Déclarations de revenus distribués
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-medium text-white mb-2">Requêtes</div>
                <div className="text-orange-100">
                  Demandes d'information à l'administration
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Catégories de déclarations */}
        <div className="space-y-8">
          {declarationCategories.map((category) => {
            const Icon = category.icon;
            
            return (
              <div key={category.type} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: category.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {category.title}
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>

                {category.declarations.length > 0 ? (
                  <div className="grid gap-4">
                    {category.declarations.map((declaration) => (
                      <DeclarationCard 
                        key={declaration.id}
                        declaration={declaration}
                        expertMode={taxMode === 'expert'}
                        onClick={() => {/* Ouvrir la déclaration */}}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                    <div className="text-center">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: category.color }} />
                      </div>
                      <p className="text-neutral-400 text-sm mb-4">
                        Aucune déclaration {category.title.toLowerCase()} en cours
                      </p>
                      <button 
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Créer une déclaration
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions rapides en mode expert */}
        {taxMode === 'expert' && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <h3 className="font-semibold text-white mb-4">
              Actions rapides - Mode Expert
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Import CSV paiements',
                'Génération IFU',
                'Export DAS2',
                'Requête automatique'
              ].map((action) => (
                <button
                  key={action}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-white transition-colors text-center"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}