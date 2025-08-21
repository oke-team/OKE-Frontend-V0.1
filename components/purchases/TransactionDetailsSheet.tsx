'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Calendar,
  CreditCard,
  Building2,
  Tag,
  Paperclip,
  Link2,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Check,
  FileText,
  Hash
} from 'lucide-react';
import { BankTransactionExtended } from '@/lib/mock-data/bank-transactions';
import { bottomSheet } from '@/lib/animations/variants';
import { cn, formatTransactionAmount, formatCurrency } from '@/lib/utils';

interface TransactionDetailsSheetProps {
  transaction: BankTransactionExtended;
  onClose: () => void;
  onOpenJustificatif: (transaction: BankTransactionExtended) => void;
}

const statusConfig = {
  rapproche: {
    icon: <CheckCircle className="w-5 h-5" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    label: 'Rapproché'
  },
  en_attente: {
    icon: <Clock className="w-5 h-5" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    label: 'En attente'
  },
  non_rapproche: {
    icon: <XCircle className="w-5 h-5" />,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    label: 'Non rapproché'
  }
};

const paymentTypeLabels = {
  virement: 'Virement',
  carte: 'Carte bancaire',
  cheque: 'Chèque',
  especes: 'Espèces',
  prelevement: 'Prélèvement automatique',
  remise_cheques: 'Remise de chèques'
};

const bankIcons: Record<string, string> = {
  BNP: '🏦',
  SG: '🏛️',
  CA: '🌾',
  LCL: '🦁',
  CE: '🐿️',
  CM: '💙',
  HSBC: '🌏',
  BP: '🔵',
  CIC: '🔷',
  LaPoste: '📮'
};

export default function TransactionDetailsSheet({
  transaction,
  onClose,
  onOpenJustificatif
}: TransactionDetailsSheetProps) {
  return (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[90vh] overflow-hidden"
        variants={bottomSheet}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Handle */}
        <div className="p-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
        </div>

        {/* Header */}
        <div className="px-4 pb-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Détails de la transaction
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-4 overflow-y-auto max-h-[70vh] space-y-4">
          {/* Montant et statut */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">Montant</p>
                <p className={cn(
                  "text-2xl font-bold",
                  transaction.montant < 0 ? "text-red-600" : "text-green-600"
                )}>
                  {formatTransactionAmount(transaction.montant, 'EUR', true)}
                </p>
                {transaction.montantEUR && transaction.devise !== 'EUR' && (
                  <p className="text-sm text-gray-500 mt-1">
                    {formatCurrency(transaction.montantEUR, 'EUR')} • {transaction.devise}
                  </p>
                )}
              </div>
              <div className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg",
                statusConfig[transaction.statut].bgColor
              )}>
                <span className={statusConfig[transaction.statut].color}>
                  {statusConfig[transaction.statut].icon}
                </span>
                <span className={cn("font-medium", statusConfig[transaction.statut].color)}>
                  {statusConfig[transaction.statut].label}
                </span>
              </div>
            </div>

            {/* Actions principales */}
            <div className="flex gap-2">
              {transaction.statut !== 'rapproche' && (
                <button className="flex-1 py-2 px-3 bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
                  <Check className="w-4 h-4" />
                  Rapprocher
                </button>
              )}
              {transaction.justificatif && (
                <button
                  onClick={() => onOpenJustificatif(transaction)}
                  className="flex-1 py-2 px-3 bg-[#4C34CE] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#4C34CE]/90 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Voir justificatif
                </button>
              )}
            </div>
          </div>

          {/* Informations détaillées */}
          <div className="space-y-3">
            {/* Date */}
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(transaction.date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Type de paiement */}
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Type de paiement</p>
                <p className="text-sm font-medium text-gray-900">
                  {paymentTypeLabels[transaction.typePaiement]}
                </p>
              </div>
            </div>

            {/* Libellé */}
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Libellé complet</p>
                <p className="text-sm font-medium text-gray-900">
                  {transaction.libelleComplet}
                </p>
              </div>
            </div>

            {/* Contrepartie */}
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Contrepartie</p>
                <p className="text-sm font-medium text-gray-900">
                  {transaction.contrepartie}
                </p>
              </div>
            </div>

            {/* Banque */}
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{bankIcons[transaction.banqueIcone]}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Banque</p>
                <p className="text-sm font-medium text-gray-900">
                  {transaction.nomCompte}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {transaction.numeroCompte}
                </p>
              </div>
            </div>

            {/* Catégorie et tags */}
            {(transaction.categorie || transaction.tags) && (
              <div className="flex items-start gap-3">
                <Tag className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Catégorie</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {transaction.categorie && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {transaction.categorie}
                      </span>
                    )}
                    {transaction.tags?.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Lien comptable */}
            {transaction.lienComptable && (
              <div className="flex items-start gap-3">
                <Link2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Lien comptable</p>
                  <p className="text-sm font-medium text-gray-900">
                    Compte: {transaction.lienComptable.codeCompte}
                  </p>
                  {transaction.lienComptable.ecritureJournal && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      Écriture: {transaction.lienComptable.ecritureJournal}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Code lettrage */}
            {transaction.codeLettrage && (
              <div className="flex items-start gap-3">
                <Hash className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Code lettrage</p>
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.codeLettrage}
                  </p>
                </div>
              </div>
            )}

            {/* Justificatif */}
            {transaction.justificatif && (
              <div className="flex items-start gap-3">
                <Paperclip className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Justificatif</p>
                  <button
                    onClick={() => onOpenJustificatif(transaction)}
                    className="text-sm font-medium text-[#4C34CE] hover:underline"
                  >
                    {transaction.justificatif.nom}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Actions secondaires */}
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <button className="w-full py-2 px-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Modifier
            </button>
            <button className="w-full py-2 px-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
              Supprimer
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}