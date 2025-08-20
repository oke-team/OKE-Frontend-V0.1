'use client';

import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DashboardEnriched from '@/components/dashboard/DashboardEnriched';
import CompanySetupModal from '@/components/dashboard/CompanySetupModal';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [showCompanySetupModal, setShowCompanySetupModal] = useState(false);

  useEffect(() => {
    // Vérifier si c'est la première connexion et si l'entreprise n'est pas configurée
    if (typeof window !== 'undefined') {
      const companySetupCompleted = localStorage.getItem('company_setup_completed');
      const companySetupSkipped = localStorage.getItem('company_setup_skipped');
      const userCompany = localStorage.getItem('user_company');
      
      // Afficher le modal si :
      // - Configuration non complétée
      // - Pas encore passée
      // - Pas d'entreprise associée
      // - Utilisateur connecté
      if (!companySetupCompleted && !companySetupSkipped && !userCompany && user) {
        // Petit délai pour une meilleure UX
        setTimeout(() => {
          setShowCompanySetupModal(true);
        }, 1500);
      }
    }
  }, [user]);

  const handleCompanySetupComplete = () => {
    setShowCompanySetupModal(false);
    // Optionnel : rafraîchir les données du dashboard
    window.location.reload();
  };

  const handleCompanySetupClose = () => {
    setShowCompanySetupModal(false);
    // Marquer comme passé si l'utilisateur ferme le modal
    if (typeof window !== 'undefined') {
      localStorage.setItem('company_setup_skipped', 'true');
    }
  };

  return (
    <>
      <AppLayout>
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <DashboardEnriched />
        </div>
      </AppLayout>
      
      {/* Modal de configuration d'entreprise avec steppers */}
      <CompanySetupModal
        isOpen={showCompanySetupModal}
        onClose={handleCompanySetupClose}
        onComplete={handleCompanySetupComplete}
      />
    </>
  );
}