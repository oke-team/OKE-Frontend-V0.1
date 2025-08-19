'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Euro, Building2, Tag, CheckCircle } from 'lucide-react';
import { TypePaiement, StatutRapprochement, Banque } from '@/lib/mock-data/bank-transactions';
import { fadeInDown } from '@/lib/animations/variants';

interface BankFiltersProps {
  filters: {
    dateFrom: string;
    dateTo: string;
    typePaiement: TypePaiement[];
    statut: StatutRapprochement[];
    banque: Banque[];
    montantMin?: number;
    montantMax?: number;
  };
  onFiltersChange: (filters: any) => void;
  onClose: () => void;
}

const typePaiementOptions: { value: TypePaiement; label: string }[] = [
  { value: 'virement', label: 'Virement' },
  { value: 'carte', label: 'Carte' },
  { value: 'cheque', label: 'Chèque' },
  { value: 'especes', label: 'Espèces' },
  { value: 'prelevement', label: 'Prélèvement' },
  { value: 'remise_cheques', label: 'Remise de chèques' }
];

const statutOptions: { value: StatutRapprochement; label: string; color: string }[] = [
  { value: 'rapproche', label: 'Rapproché', color: 'green' },
  { value: 'en_attente', label: 'En attente', color: 'orange' },
  { value: 'non_rapproche', label: 'Non rapproché', color: 'red' }
];

const banqueOptions: { value: Banque; label: string; icon: string }[] = [
  { value: 'BNP', label: 'BNP Paribas', icon: '🏦' },
  { value: 'SG', label: 'Société Générale', icon: '🏛️' },
  { value: 'CA', label: 'Crédit Agricole', icon: '🌾' },
  { value: 'LCL', label: 'LCL', icon: '🦁' },
  { value: 'CE', label: 'Caisse d\'Épargne', icon: '🐿️' },
  { value: 'CM', label: 'Crédit Mutuel', icon: '💙' },
  { value: 'HSBC', label: 'HSBC', icon: '🌏' },
  { value: 'BP', label: 'Banque Populaire', icon: '🔵' },
  { value: 'CIC', label: 'CIC', icon: '🔷' },
  { value: 'LaPoste', label: 'La Banque Postale', icon: '📮' }
];

export default function BankFilters({ filters, onFiltersChange, onClose }: BankFiltersProps) {
  const handleTypeToggle = (type: TypePaiement) => {
    const newTypes = filters.typePaiement.includes(type)
      ? filters.typePaiement.filter(t => t !== type)
      : [...filters.typePaiement, type];
    onFiltersChange({ ...filters, typePaiement: newTypes });
  };

  const handleStatutToggle = (statut: StatutRapprochement) => {
    const newStatuts = filters.statut.includes(statut)
      ? filters.statut.filter(s => s !== statut)
      : [...filters.statut, statut];
    onFiltersChange({ ...filters, statut: newStatuts });
  };

  const handleBanqueToggle = (banque: Banque) => {
    const newBanques = filters.banque.includes(banque)
      ? filters.banque.filter(b => b !== banque)
      : [...filters.banque, banque];
    onFiltersChange({ ...filters, banque: newBanques });
  };

  const handleReset = () => {
    onFiltersChange({
      dateFrom: '',
      dateTo: '',
      typePaiement: [],
      statut: [],
      banque: [],
      montantMin: undefined,
      montantMax: undefined
    });
  };

  return (
    <motion.div
      className="border-b border-gray-200 bg-gray-50 p-4"
      variants={fadeInDown}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Filtres avancés</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Réinitialiser
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Filtres en grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Période */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <Calendar className="w-3 h-3" />
              Période
            </label>
            <div className="space-y-2">
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE]/20 focus:border-[#4C34CE]"
                placeholder="Du"
              />
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE]/20 focus:border-[#4C34CE]"
                placeholder="Au"
              />
            </div>
          </div>

          {/* Montant */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <Euro className="w-3 h-3" />
              Montant
            </label>
            <div className="space-y-2">
              <input
                type="number"
                value={filters.montantMin || ''}
                onChange={(e) => onFiltersChange({ ...filters, montantMin: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE]/20 focus:border-[#4C34CE]"
                placeholder="Min"
              />
              <input
                type="number"
                value={filters.montantMax || ''}
                onChange={(e) => onFiltersChange({ ...filters, montantMax: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE]/20 focus:border-[#4C34CE]"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Type de paiement */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <Tag className="w-3 h-3" />
              Type de paiement
            </label>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {typePaiementOptions.map(option => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-100 px-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.typePaiement.includes(option.value)}
                    onChange={() => handleTypeToggle(option.value)}
                    className="rounded border-gray-300 text-[#4C34CE] focus:ring-[#4C34CE]"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Statut */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <CheckCircle className="w-3 h-3" />
              Statut
            </label>
            <div className="space-y-1">
              {statutOptions.map(option => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-100 px-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.statut.includes(option.value)}
                    onChange={() => handleStatutToggle(option.value)}
                    className="rounded border-gray-300 text-[#4C34CE] focus:ring-[#4C34CE]"
                  />
                  <span className={`text-sm text-${option.color}-600`}>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Banques */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-medium text-gray-700">
            <Building2 className="w-3 h-3" />
            Banques
          </label>
          <div className="flex flex-wrap gap-2">
            {banqueOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleBanqueToggle(option.value)}
                className={`px-3 py-1.5 rounded-lg border text-sm flex items-center gap-1.5 transition-all ${
                  filters.banque.includes(option.value)
                    ? 'bg-[#4C34CE] text-white border-[#4C34CE]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="text-base">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Résumé des filtres actifs */}
        {(filters.typePaiement.length > 0 || filters.statut.length > 0 || filters.banque.length > 0 || filters.dateFrom || filters.dateTo || filters.montantMin || filters.montantMax) && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
            {filters.dateFrom && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#4C34CE]/10 text-[#4C34CE] rounded-lg text-xs">
                Du {new Date(filters.dateFrom).toLocaleDateString('fr-FR')}
              </span>
            )}
            {filters.dateTo && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#4C34CE]/10 text-[#4C34CE] rounded-lg text-xs">
                Au {new Date(filters.dateTo).toLocaleDateString('fr-FR')}
              </span>
            )}
            {filters.montantMin !== undefined && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#4C34CE]/10 text-[#4C34CE] rounded-lg text-xs">
                Min: {filters.montantMin} €
              </span>
            )}
            {filters.montantMax !== undefined && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#4C34CE]/10 text-[#4C34CE] rounded-lg text-xs">
                Max: {filters.montantMax} €
              </span>
            )}
            {filters.typePaiement.map(type => (
              <span key={type} className="inline-flex items-center gap-1 px-2 py-1 bg-[#4C34CE]/10 text-[#4C34CE] rounded-lg text-xs">
                {typePaiementOptions.find(o => o.value === type)?.label}
              </span>
            ))}
            {filters.statut.map(statut => (
              <span key={statut} className="inline-flex items-center gap-1 px-2 py-1 bg-[#4C34CE]/10 text-[#4C34CE] rounded-lg text-xs">
                {statutOptions.find(o => o.value === statut)?.label}
              </span>
            ))}
            {filters.banque.map(banque => (
              <span key={banque} className="inline-flex items-center gap-1 px-2 py-1 bg-[#4C34CE]/10 text-[#4C34CE] rounded-lg text-xs">
                {banqueOptions.find(o => o.value === banque)?.icon} {banqueOptions.find(o => o.value === banque)?.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}