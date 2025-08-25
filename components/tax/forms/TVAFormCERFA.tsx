'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Save, Send, FileText, AlertCircle, CheckCircle, Euro } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockTVADeclarationData } from '@/lib/mock-data/tax-data';
import { designTokens } from '@/lib/design-tokens';

interface TVAFormCERFAProps {
  taxMode: 'entrepreneur' | 'expert';
}

export default function TVAFormCERFA({ taxMode }: TVAFormCERFAProps) {
  const [formData, setFormData] = useState(mockTVADeclarationData);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Supprimer l'erreur si le champ est corrigé
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const calculateTVA = () => {
    setIsCalculating(true);
    // Simulation de calcul automatique
    setTimeout(() => {
      const vatToPay = Math.max(0, formData.salesVATCollected - formData.purchaseVATDeductible + formData.previousCredit);
      setFormData(prev => ({
        ...prev,
        vatToPay,
        vatCredit: vatToPay < 0 ? Math.abs(vatToPay) : 0
      }));
      setIsCalculating(false);
    }, 1500);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.salesVATCollected < 0) {
      newErrors.salesVATCollected = 'La TVA collectée ne peut pas être négative';
    }
    if (formData.purchaseVATDeductible < 0) {
      newErrors.purchaseVATDeductible = 'La TVA déductible ne peut pas être négative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderCERFAField = (
    caseNumber: string,
    label: string,
    value: number,
    field: string,
    required = false,
    readOnly = false,
    help?: string
  ) => {
    const hasError = errors[field];
    
    return (
      <div className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-100 hover:bg-gray-50/50">
        {/* Numéro de case CERFA */}
        <div className="col-span-1">
          <div 
            className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: designTokens.tax.cerfa.caseNumber.background }}
          >
            {caseNumber}
          </div>
        </div>
        
        {/* Label et aide */}
        <div className="col-span-6">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-900">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {help && taxMode === 'entrepreneur' && (
              <div className="group relative">
                <AlertCircle className="w-4 h-4 text-blue-500 cursor-help" />
                <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-blue-900 text-white text-xs rounded p-2 whitespace-nowrap z-10">
                  {help}
                </div>
              </div>
            )}
          </div>
          {hasError && (
            <div className="text-xs text-red-600 mt-1">{hasError}</div>
          )}
        </div>
        
        {/* Champ de saisie */}
        <div className="col-span-4">
          <div className="relative">
            <input
              type="number"
              value={value || ''}
              onChange={(e) => handleFieldChange(field, parseFloat(e.target.value) || 0)}
              readOnly={readOnly}
              className={cn(
                "w-full px-3 py-2 border text-right font-mono text-sm",
                "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                readOnly ? "bg-gray-50 cursor-not-allowed" : "bg-white",
                hasError ? "border-red-300" : "border-gray-300",
                "rounded-md"
              )}
              placeholder="0,00"
              step="0.01"
              style={{
                borderRadius: designTokens.tax.components.formField.borderRadius
              }}
            />
            <Euro className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          </div>
        </div>
        
        {/* Case validation en mode expert */}
        {taxMode === 'expert' && (
          <div className="col-span-1 flex justify-center">
            {readOnly && value > 0 ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <div className="w-4 h-4 border border-gray-300 rounded"></div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      
      {/* Header type CERFA */}
      <div className="bg-white border-2 border-gray-300 rounded-lg mb-6 overflow-hidden">
        <div className="bg-red-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">
                DÉCLARATION DE TVA - CA3
              </h1>
              <p className="text-red-100 text-sm">
                Régime normal • Déclaration mensuelle • N° 3310-CA3-SD
              </p>
            </div>
            <div className="text-right">
              <div className="text-red-100 text-xs">Période</div>
              <div className="text-white font-bold">
                {formData.period.month.toString().padStart(2, '0')}/{formData.period.year}
              </div>
            </div>
          </div>
        </div>
        
        {/* Informations entreprise */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-700">Raison sociale:</span>
              <span className="ml-2">DEMO ENTREPRISE SARL</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">N° TVA:</span>
              <span className="ml-2">FR12345678901</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">SIRET:</span>
              <span className="ml-2">12345678901234</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Centre des Impôts:</span>
              <span className="ml-2">PARIS 1er</span>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire principal */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
        
        {/* Section I : TVA due */}
        <div className="mb-8">
          <div 
            className="px-4 py-2 mb-4 border-b-2 border-gray-300"
            style={{ 
              backgroundColor: designTokens.tax.cerfa.sectionHeader.background,
              borderColor: designTokens.tax.cerfa.sectionHeader.border
            }}
          >
            <h2 className="text-lg font-bold text-gray-900">
              I. TVA DUE AU TITRE DE LA PÉRIODE
            </h2>
          </div>

          {renderCERFAField(
            '01',
            'TVA collectée (ventes, prestations)',
            formData.salesVATCollected,
            'salesVATCollected',
            true,
            false,
            'Montant total de la TVA facturée à vos clients'
          )}

          {/* Détail par taux */}
          {taxMode === 'expert' && (
            <div className="ml-8 mt-4 mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
              <h4 className="font-semibold text-blue-900 mb-3">Détail par taux de TVA</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Base 20%:</span>
                  <span className="font-mono">{formData.vatByRate.rate20.baseAmount.toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between">
                  <span>TVA 20%:</span>
                  <span className="font-mono font-semibold">{formData.vatByRate.rate20.vatAmount.toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Base 10%:</span>
                  <span className="font-mono">{formData.vatByRate.rate10.baseAmount.toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between">
                  <span>TVA 10%:</span>
                  <span className="font-mono font-semibold">{formData.vatByRate.rate10.vatAmount.toLocaleString('fr-FR')} €</span>
                </div>
              </div>
            </div>
          )}

          {renderCERFAField(
            '07',
            'TVA sur acquisitions intracommunautaires',
            formData.intraCommunityAcquisitions * 0.2,
            'intraCommunityVAT',
            false,
            true,
            'TVA due sur vos achats dans l\'UE'
          )}
        </div>

        {/* Section II : TVA déductible */}
        <div className="mb-8">
          <div 
            className="px-4 py-2 mb-4 border-b-2 border-gray-300"
            style={{ 
              backgroundColor: designTokens.tax.cerfa.sectionHeader.background,
              borderColor: designTokens.tax.cerfa.sectionHeader.border
            }}
          >
            <h2 className="text-lg font-bold text-gray-900">
              II. TVA DÉDUCTIBLE
            </h2>
          </div>

          {renderCERFAField(
            '20',
            'TVA déductible (achats, charges)',
            formData.purchaseVATDeductible,
            'purchaseVATDeductible',
            true,
            false,
            'TVA payée sur vos achats et charges professionnelles'
          )}

          {renderCERFAField(
            '21',
            'TVA sur acquisitions intracommunautaires déductible',
            formData.intraCommunityAcquisitions * 0.2,
            'intraCommunityVATDeductible',
            false,
            true
          )}
        </div>

        {/* Section III : Calcul */}
        <div className="mb-8">
          <div 
            className="px-4 py-2 mb-4 border-b-2 border-gray-300"
            style={{ 
              backgroundColor: designTokens.tax.cerfa.sectionHeader.background,
              borderColor: designTokens.tax.cerfa.sectionHeader.border
            }}
          >
            <h2 className="text-lg font-bold text-gray-900">
              III. CALCUL DE LA TVA
            </h2>
          </div>

          {renderCERFAField(
            '23',
            'Crédit de TVA de la période précédente',
            formData.previousCredit,
            'previousCredit',
            false,
            false,
            'Report du crédit du mois précédent'
          )}

          {/* Zone de calcul avec bouton */}
          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Calcul automatique</h3>
                <p className="text-blue-700 text-sm">
                  Cliquez pour calculer le montant de TVA à payer ou le crédit
                </p>
              </div>
              <button
                onClick={calculateTVA}
                disabled={isCalculating}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <Calculator className="w-4 h-4" />
                {isCalculating ? 'Calcul...' : 'Calculer'}
              </button>
            </div>
          </div>

          {formData.vatToPay > 0 && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              {renderCERFAField(
                '24',
                'TVA à payer',
                formData.vatToPay,
                'vatToPay',
                false,
                true
              )}
            </div>
          )}

          {formData.vatCredit > 0 && (
            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              {renderCERFAField(
                '25',
                'Crédit de TVA à reporter',
                formData.vatCredit,
                'vatCredit',
                false,
                true
              )}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center bg-white border-2 border-gray-300 rounded-lg p-4">
        <div className="text-sm text-gray-600">
          Dernière sauvegarde: Automatique
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => validateForm()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            Sauvegarder
          </button>
          <button
            onClick={() => {
              if (validateForm()) {
                alert('Déclaration prête à être transmise');
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            <Send className="w-4 h-4" />
            Transmettre à l'administration
          </button>
        </div>
      </div>
    </div>
  );
}