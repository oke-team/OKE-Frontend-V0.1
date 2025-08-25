'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TaxModeSelector from './TaxModeSelector';
import TaxTabs from './TaxTabs';
import TaxDashboard from './TaxDashboard';
import TVAModule from './modules/TVAModule';
import LiasseModule from './modules/LiasseModule';
import OtherDeclarationsModule from './modules/OtherDeclarationsModule';
import PersonalModule from './modules/PersonalModule';
import { TaxMode, DeclarationGroup } from '@/lib/types/tax-types';

interface TaxModuleProps {
  expertMode: boolean;
}

export default function TaxModule({ expertMode }: TaxModuleProps) {
  const [taxMode, setTaxMode] = useState<TaxMode>('entrepreneur');
  const [activeGroup, setActiveGroup] = useState<DeclarationGroup | 'dashboard'>('dashboard');

  const renderContent = () => {
    switch (activeGroup) {
      case 'dashboard':
        return <TaxDashboard taxMode={taxMode} onGroupSelect={setActiveGroup} />;
      case 'tva':
        return <TVAModule taxMode={taxMode} />;
      case 'liasse':
        return <LiasseModule taxMode={taxMode} />;
      case 'other':
        return <OtherDeclarationsModule taxMode={taxMode} />;
      case 'personal':
        return <PersonalModule taxMode={taxMode} />;
      default:
        return <TaxDashboard taxMode={taxMode} onGroupSelect={setActiveGroup} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header avec sélecteur de mode */}
      <div className="flex-shrink-0 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              Module Fiscalité
            </h1>
            <p className="text-neutral-600 mt-1">
              Gestion complète de vos obligations fiscales
            </p>
          </div>
          
          <TaxModeSelector 
            mode={taxMode} 
            onChange={setTaxMode}
            expertModeAvailable={expertMode}
          />
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="flex-shrink-0 mb-6">
        <TaxTabs 
          activeGroup={activeGroup} 
          onGroupChange={setActiveGroup} 
          taxMode={taxMode}
        />
      </div>

      {/* Contenu principal */}
      <motion.div 
        key={activeGroup}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
        className="flex-1 overflow-hidden"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}