'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TaxTabs from './TaxTabs';
import TaxDashboardInstitutional from './TaxDashboardInstitutional';
import TVAModule from './modules/TVAModule';
import LiasseModule from './modules/LiasseModule';
import OtherDeclarationsModule from './modules/OtherDeclarationsModule';
import PersonalModule from './modules/PersonalModule';
import { TaxMode, DeclarationGroup } from '@/lib/types/tax-types';

interface TaxModuleProps {
  expertMode: boolean;
}

export default function TaxModule({ expertMode }: TaxModuleProps) {
  const [activeGroup, setActiveGroup] = useState<DeclarationGroup | 'dashboard'>('dashboard');
  
  // Convertir expertMode boolean en TaxMode
  const taxMode: TaxMode = expertMode ? 'expert' : 'entrepreneur';

  const renderContent = () => {
    switch (activeGroup) {
      case 'dashboard':
        return <TaxDashboardInstitutional taxMode={taxMode} onGroupSelect={setActiveGroup} />;
      case 'tva':
        return <TVAModule taxMode={taxMode} />;
      case 'liasse':
        return <LiasseModule taxMode={taxMode} />;
      case 'other':
        return <OtherDeclarationsModule taxMode={taxMode} />;
      case 'personal':
        return <PersonalModule taxMode={taxMode} />;
      default:
        return <TaxDashboardInstitutional taxMode={taxMode} onGroupSelect={setActiveGroup} />;
    }
  };

  // Pour le dashboard, on affiche directement le contenu sans wrapper
  if (activeGroup === 'dashboard') {
    return renderContent();
  }

  // Pour les autres onglets, on garde la structure avec navigation
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Navigation par onglets */}
      <div className="flex-shrink-0 mb-6 bg-white border-b border-gray-200 p-6">
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