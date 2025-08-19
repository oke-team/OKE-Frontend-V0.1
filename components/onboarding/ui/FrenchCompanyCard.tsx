'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building, MapPin, Users, Hash, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

interface CompanyData {
  siren: string;
  nom_entreprise: string;
  adresse_complete: string;
  code_naf: string;
  libelle_code_naf: string;
  effectif: string;
  statut: string;
  forme_juridique?: string;
  date_creation?: string;
}

interface FrenchCompanyCardProps {
  company: CompanyData;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function FrenchCompanyCard({
  company,
  isSelected = false,
  onClick,
  className = ''
}: FrenchCompanyCardProps) {
  const isActive = company.statut === 'Actif';

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: { 
      y: -2, 
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1, ease: "easeOut" }
    }
  };

  const formatSiren = (siren: string) => {
    return `${siren.slice(0, 3)} ${siren.slice(3, 6)} ${siren.slice(6)}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR');
    } catch {
      return dateString;
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={onClick ? "hover" : undefined}
      whileTap={onClick ? "tap" : undefined}
      onClick={onClick}
      className={`
        relative p-6 rounded-xl border backdrop-blur-sm transition-all duration-200
        ${isSelected 
          ? 'bg-primary/10 border-primary-400/50 shadow-lg shadow-primary/10' 
          : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
        }
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Badge de sélection */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
        >
          <CheckCircle className="w-4 h-4 text-white" />
        </motion.div>
      )}

      <div className="space-y-4">
        {/* Header avec nom et statut */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate">
              {company.nom_entreprise}
            </h3>
            {company.forme_juridique && (
              <p className="text-sm text-neutral-400 mt-1">
                {company.forme_juridique}
              </p>
            )}
          </div>
          
          <div className="flex-shrink-0 ml-3">
            <div className={`
              inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
              ${isActive 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }
            `}>
              {isActive ? (
                <CheckCircle className="w-3 h-3 mr-1" />
              ) : (
                <AlertCircle className="w-3 h-3 mr-1" />
              )}
              {company.statut}
            </div>
          </div>
        </div>

        {/* Informations principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* SIREN */}
          <div className="flex items-center space-x-2 text-sm">
            <Hash className="w-4 h-4 text-primary-400 flex-shrink-0" />
            <span className="text-neutral-300">SIREN:</span>
            <span className="text-white font-mono">{formatSiren(company.siren)}</span>
          </div>

          {/* Effectif */}
          <div className="flex items-center space-x-2 text-sm">
            <Users className="w-4 h-4 text-primary-400 flex-shrink-0" />
            <span className="text-neutral-300">Effectif:</span>
            <span className="text-white">{company.effectif}</span>
          </div>

          {/* Date de création */}
          {company.date_creation && (
            <div className="flex items-center space-x-2 text-sm sm:col-span-2">
              <Calendar className="w-4 h-4 text-primary-400 flex-shrink-0" />
              <span className="text-neutral-300">Créée le:</span>
              <span className="text-white">{formatDate(company.date_creation)}</span>
            </div>
          )}
        </div>

        {/* Adresse */}
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-neutral-300 text-sm">Adresse:</span>
            <p className="text-white text-sm mt-0.5">{company.adresse_complete}</p>
          </div>
        </div>

        {/* Activité */}
        <div className="flex items-start space-x-2">
          <Building className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <span className="text-neutral-300 text-sm">Activité:</span>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-xs text-neutral-400 font-mono bg-neutral-800 px-2 py-1 rounded">
                {company.code_naf}
              </span>
              <p className="text-white text-sm truncate">
                {company.libelle_code_naf}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Effet de glow au survol */}
      {onClick && (
        <motion.div
          className={`
            absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200
            ${isSelected ? 'bg-primary-400/5' : 'bg-white/5'}
          `}
          whileHover={{ opacity: 1 }}
        />
      )}

      {/* Indicateur de sélection sur le bord */}
      {isSelected && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute left-0 top-4 bottom-4 w-1 bg-primary-400 rounded-r-full"
          style={{ originY: 0 }}
        />
      )}
    </motion.div>
  );
}