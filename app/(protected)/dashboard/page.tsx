'use client';

import React, { useState, useEffect } from 'react';
import DashboardEnriched from '@/components/dashboard/DashboardEnriched';
import CompanySetupModal from '@/components/dashboard/CompanySetupModal';
import { useAuth } from '@/contexts/AuthContext';
import { useAppSelector } from '@/lib/store/hooks';

export default function DashboardPage() {
  const { user } = useAuth();
  const [showCompanySetupModal, setShowCompanySetupModal] = useState(false);
  
  // Récupérer les entreprises depuis Redux
  const { entreprises, loading: entreprisesLoading } = useAppSelector((state) => state.entreprises);

  useEffect(() => {
    // Vérifier si l'utilisateur n'a pas d'entreprises
    if (user && !entreprisesLoading) {
      const companySetupSkipped = sessionStorage.getItem('company_setup_skipped');
      
      // Afficher le modal si :
      // - L'utilisateur est connecté
      // - Les entreprises ont fini de charger
      // - L'utilisateur n'a aucune entreprise
      // - Le modal n'a pas été fermé précédemment dans cette session
      if (entreprises.length === 0 && !companySetupSkipped) {
        // Petit délai pour une meilleure UX
        setTimeout(() => {
          setShowCompanySetupModal(true);
        }, 1500);
      }
    }
  }, [user, entreprises, entreprisesLoading]);

  const handleCompanySetupComplete = () => {
    setShowCompanySetupModal(false);
    // Ne pas recharger la page, les entreprises seront mises à jour via Redux
  };

  const handleCompanySetupClose = () => {
    setShowCompanySetupModal(false);
    // Utiliser sessionStorage pour ne pas afficher le modal à nouveau dans cette session
    // mais permettre de le réafficher lors de la prochaine connexion
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('company_setup_skipped', 'true');
      // Nettoyer localStorage des anciennes clés
      localStorage.removeItem('company_setup_skipped');
    }
  };

  return (
    <>
      <DashboardEnriched />
      
      {/* Modal de configuration d'entreprise avec steppers */}
      <CompanySetupModal
        isOpen={showCompanySetupModal}
        onClose={handleCompanySetupClose}
        onComplete={handleCompanySetupComplete}
      />
    </>
  );
}