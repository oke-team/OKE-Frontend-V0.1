'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Euro, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText,
  ExternalLink,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TaxDeclaration } from '@/lib/types/tax-types';
import { designTokens } from '@/lib/design-tokens';

interface DeclarationCardProps {
  declaration: TaxDeclaration;
  expertMode?: boolean;
  onClick?: () => void;
}

export default function DeclarationCard({ 
  declaration, 
  expertMode = false, 
  onClick 
}: DeclarationCardProps) {

  const getStatusConfig = () => {
    switch (declaration.status) {
      case 'accepted':
        return {
          icon: CheckCircle,
          label: 'Acceptée',
          color: designTokens.tax.status.validated.base,
          bgColor: designTokens.tax.status.validated.light,
          borderColor: designTokens.tax.status.validated.border
        };
      case 'submitted':
        return {
          icon: Clock,
          label: 'Transmise',
          color: designTokens.tax.status.normal.base,
          bgColor: designTokens.tax.status.normal.light,
          borderColor: designTokens.tax.status.normal.border
        };
      case 'rejected':
        return {
          icon: AlertTriangle,
          label: 'Rejetée',
          color: designTokens.tax.status.critical.base,
          bgColor: designTokens.tax.status.critical.light,
          borderColor: designTokens.tax.status.critical.border
        };
      case 'error':
        return {
          icon: AlertTriangle,
          label: 'Erreur',
          color: designTokens.tax.status.overdue.base,
          bgColor: designTokens.tax.status.overdue.light,
          borderColor: designTokens.tax.status.overdue.border
        };
      case 'draft':
      default:
        return {
          icon: FileText,
          label: 'Brouillon',
          color: designTokens.tax.status.pending.base,
          bgColor: designTokens.tax.status.pending.light,
          borderColor: designTokens.tax.status.pending.border
        };
    }
  };

  const getTypeColor = () => {
    const typeKey = declaration.type as keyof typeof designTokens.tax.declarationTypes;
    return designTokens.tax.declarationTypes[typeKey]?.base || '#737373';
  };

  const isOverdue = new Date(declaration.dueDate) < new Date() && declaration.status === 'draft';
  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <motion.div
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.99 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: getTypeColor() }}
            />
            <div>
              <h4 className="font-semibold text-white">
                {declaration.title}
              </h4>
              <p className="text-sm text-neutral-400">
                {declaration.description}
              </p>
            </div>
          </div>

          {/* Badge de statut */}
          <div 
            className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border"
            style={{ 
              backgroundColor: statusConfig.bgColor,
              borderColor: statusConfig.borderColor,
              color: statusConfig.color
            }}
          >
            <StatusIcon className="w-3 h-3" />
            {statusConfig.label}
          </div>
        </div>

        {/* Informations principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {/* Période */}
          <div>
            <div className="text-neutral-400 mb-1">Période</div>
            <div className="text-white font-medium">
              {declaration.type === 'TVA' 
                ? `${new Date(declaration.period.start).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`
                : `${declaration.period.year}`
              }
            </div>
          </div>

          {/* Échéance */}
          <div>
            <div className="text-neutral-400 mb-1">Échéance</div>
            <div className={cn(
              "font-medium flex items-center gap-1",
              isOverdue ? "text-red-400" : "text-white"
            )}>
              <Calendar className="w-3 h-3" />
              {new Date(declaration.dueDate).toLocaleDateString('fr-FR')}
            </div>
          </div>

          {/* Montant */}
          {declaration.amount !== undefined && (
            <div>
              <div className="text-neutral-400 mb-1">Montant</div>
              <div className="text-white font-medium flex items-center gap-1">
                <Euro className="w-3 h-3" />
                {declaration.amount.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </div>
            </div>
          )}

          {/* Type */}
          <div>
            <div className="text-neutral-400 mb-1">Type</div>
            <div className="text-white font-medium">
              {declaration.type}
            </div>
          </div>
        </div>

        {/* Informations de transmission (si applicable) */}
        {declaration.submissionDate && (
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-neutral-400">Transmise le: </span>
                <span className="text-white">
                  {new Date(declaration.submissionDate).toLocaleDateString('fr-FR')}
                </span>
              </div>
              {declaration.acknowledgmentRef && (
                <div>
                  <span className="text-neutral-400">Réf: </span>
                  <span className="text-white font-mono text-xs">
                    {declaration.acknowledgmentRef}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Erreurs (si applicable) */}
        {declaration.errors && declaration.errors.length > 0 && (
          <div className="pt-3 border-t border-red-500/20">
            <div className="bg-red-500/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-medium text-sm">
                  Erreurs à corriger
                </span>
              </div>
              <div className="space-y-1">
                {declaration.errors.slice(0, 2).map((error, index) => (
                  <div key={index} className="text-red-300 text-xs">
                    {error.field}: {error.message}
                  </div>
                ))}
                {declaration.errors.length > 2 && (
                  <div className="text-red-400 text-xs">
                    ... et {declaration.errors.length - 2} autres erreurs
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Actions en mode expert */}
        {expertMode && (
          <div className="pt-3 border-t border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <span>Modifié le {new Date(declaration.lastModified).toLocaleDateString('fr-FR')}</span>
              <span>Par {declaration.createdBy}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-neutral-400" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ExternalLink className="w-4 h-4 text-neutral-400" />
              </button>
            </div>
          </div>
        )}

        {/* Alerte retard */}
        {isOverdue && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span className="text-red-300 text-sm font-medium">
                Déclaration en retard - Action requise
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}