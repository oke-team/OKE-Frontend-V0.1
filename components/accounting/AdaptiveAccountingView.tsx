'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useExpertMode, useAccountingTerms } from '@/contexts/ExpertModeContext';
import BalanceTable from './BalanceTable';
import GeneralLedgerTable from './GeneralLedgerTable';
import Tooltip from '@/components/ui/Tooltip';
import { 
  HelpCircle,
  Download,
  Upload,
  FileText,
  Calculator,
  TrendingUp,
  Filter
} from 'lucide-react';

/**
 * Vue comptabilité adaptative qui affiche les mêmes données
 * mais avec un vocabulaire et une présentation adaptés au mode (expert/novice)
 */
export default function AdaptiveAccountingView() {
  const { expertMode, term, explain } = useExpertMode();
  const { balance, generalLedger, reconciliation } = useAccountingTerms();
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedAccountLabel, setSelectedAccountLabel] = useState<string>('');

  const handleAccountSelect = (accountCode: string, accountLabel: string) => {
    setSelectedAccount(accountCode);
    setSelectedAccountLabel(accountLabel);
  };

  return (
    <div className="space-y-6">
      {/* En-tête adaptatif */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {expertMode ? 'Module Comptabilité' : 'Gestion Financière'}
              {!expertMode && (
                <Tooltip 
                  content="Gérez vos finances sans connaissances comptables. Toutes les fonctionnalités sont disponibles avec un vocabulaire simplifié."
                  showIcon
                  iconType="help"
                />
              )}
            </h1>
            <p className="text-neutral-600 mt-1">
              {expertMode 
                ? 'Balance générale et grand livre auxiliaire'
                : 'Vue d\'ensemble de vos comptes et transactions'
              }
            </p>
          </div>
          
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              {expertMode ? 'Importer FEC' : 'Importer données'}
            </button>
            <button className="px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              {expertMode ? 'Export comptable' : 'Télécharger'}
            </button>
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {expertMode ? 'Nouvelle écriture' : 'Ajouter une opération'}
            </button>
          </div>
        </div>

        {/* Indicateurs clés */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-green-700 flex items-center gap-1">
              {expertMode ? 'Produits' : 'Revenus'}
              {!expertMode && (
                <Tooltip content="Total de vos ventes et prestations" showIcon iconType="info" />
              )}
            </div>
            <div className="text-xl font-bold text-green-900">45 250 €</div>
            <div className="text-xs text-green-600 mt-1">+12.5% ce mois</div>
          </div>
          
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="text-sm text-red-700 flex items-center gap-1">
              {expertMode ? 'Charges' : 'Dépenses'}
              {!expertMode && (
                <Tooltip content="Total de vos achats et frais" showIcon iconType="info" />
              )}
            </div>
            <div className="text-xl font-bold text-red-900">32 150 €</div>
            <div className="text-xs text-red-600 mt-1">-5.2% ce mois</div>
          </div>
          
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-700 flex items-center gap-1">
              {expertMode ? 'Créances clients' : 'À recevoir'}
              {!expertMode && (
                <Tooltip content="Factures envoyées en attente de paiement" showIcon iconType="info" />
              )}
            </div>
            <div className="text-xl font-bold text-blue-900">18 500 €</div>
            <div className="text-xs text-blue-600 mt-1">5 factures</div>
          </div>
          
          <div className="p-3 bg-orange-50 rounded-lg">
            <div className="text-sm text-orange-700 flex items-center gap-1">
              {expertMode ? 'Dettes fournisseurs' : 'À payer'}
              {!expertMode && (
                <Tooltip content="Factures reçues à régler" showIcon iconType="info" />
              )}
            </div>
            <div className="text-xl font-bold text-orange-900">12 300 €</div>
            <div className="text-xs text-orange-600 mt-1">8 factures</div>
          </div>
        </div>
      </div>

      {/* Instructions pour novices */}
      {!expertMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-blue-900">Comment utiliser cette page ?</h3>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• <strong>Tableau de gauche</strong> : Cliquez sur une catégorie pour voir ses détails</li>
                <li>• <strong>Tableau de droite</strong> : Double-cliquez sur une ligne pour la modifier</li>
                <li>• <strong>Navigation</strong> : Utilisez Tab ou les flèches pour naviguer</li>
                <li>• <strong>Icônes</strong> : 📎 = Document joint, 🏦 = Transaction bancaire</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tables adaptatives */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 w-full">
        {/* Balance / Situation des comptes */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden w-full min-w-0">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2">
              {expertMode ? 'Balance générale' : 'Situation des comptes'}
              {!expertMode && (
                <Tooltip 
                  content="Vue d'ensemble de tous vos comptes avec leurs soldes actuels"
                  showIcon
                />
              )}
            </h2>
            <button className="p-2 hover:bg-neutral-50 rounded-lg">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <BalanceTable
            accounts={[]} // Les données viendront du contexte
            selectedAccount={selectedAccount}
            onAccountSelect={handleAccountSelect}
          />
        </div>

        {/* Grand livre / Historique détaillé */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden w-full">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2">
              {expertMode ? 'Grand livre' : 'Historique détaillé'}
              {!expertMode && (
                <Tooltip 
                  content="Liste de toutes les transactions pour le compte sélectionné"
                  showIcon
                />
              )}
            </h2>
            {selectedAccount && (
              <span className="text-sm text-neutral-600">
                {selectedAccountLabel}
              </span>
            )}
          </div>
          <GeneralLedgerTable
            selectedAccount={selectedAccount}
            selectedAccountLabel={selectedAccountLabel}
          />
        </div>
      </div>

      {/* Actions guidées pour novices */}
      {!expertMode && (
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Actions suggérées</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
              <Calculator className="w-6 h-6 text-primary-500 mb-2" />
              <div className="font-medium">Rapprocher avec la banque</div>
              <div className="text-sm text-neutral-600 mt-1">
                Vérifiez que vos transactions correspondent à votre relevé bancaire
              </div>
            </button>
            
            <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
              <FileText className="w-6 h-6 text-primary-500 mb-2" />
              <div className="font-medium">Créer une facture</div>
              <div className="text-sm text-neutral-600 mt-1">
                Facturez un client pour un produit ou service
              </div>
            </button>
            
            <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
              <TrendingUp className="w-6 h-6 text-primary-500 mb-2" />
              <div className="font-medium">Voir les statistiques</div>
              <div className="text-sm text-neutral-600 mt-1">
                Analysez vos revenus et dépenses en détail
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}