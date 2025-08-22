"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import BottomNav from '@/components/navigation/BottomNav';
import HeaderSimple from './HeaderSimple';
import MagicActionsButton from '@/components/ui/MagicActionsButton';
import AssistantChat from '@/components/ui/AssistantChat';
import AddMenu from '@/components/ui/AddMenu';
import ModulesGrid from '@/components/ui/ModulesGrid';
import CompanySetupModal from '@/components/dashboard/CompanySetupModal';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Layout principal de l'application avec BottomNav intégrée
 * 
 * Ce composant wrap le contenu de l'application et ajoute la navigation inférieure
 * avec gestion automatique du padding pour éviter que le contenu soit masqué.
 */
const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const [currentCompany, setCurrentCompany] = useState({
    id: '1',
    name: 'TechCorp SAS',
    plan: 'pro' as const
  });
  const [chatOpen, setChatOpen] = useState(false);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [modulesGridOpen, setModulesGridOpen] = useState(false);
  const [showCompanySetupModal, setShowCompanySetupModal] = useState(false);

  // Synchroniser l'item actif avec l'URL
  useEffect(() => {
    const path = pathname.split('/')[1] || 'dashboard';
    setActiveNavItem(path);
  }, [pathname]);

  const handleNavigation = (itemId: string) => {
    if (itemId === 'add') {
      // Ouvrir le menu d'ajout
      setAddMenuOpen(true);
      return;
    }
    if (itemId === 'more') {
      // Ouvrir la grille de modules
      setModulesGridOpen(true);
      return;
    }
    // Toujours mettre à jour l'état actif, même si c'est le même
    setActiveNavItem(itemId);
    if (itemId !== activeNavItem) {
      router.push(`/${itemId}`);
    }
  };

  const handleChatOpen = () => {
    setChatOpen(true);
    console.log('Ouverture du chatbot IA');
  };

  const handleMagicActions = () => {
    console.log('Actions magiques contextuelles');
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implémentation de la recherche globale
  };

  const handleAddCompany = () => {
    setShowCompanySetupModal(true);
  };

  const handleCompanySetupComplete = () => {
    setShowCompanySetupModal(false);
    // Rafraîchir les données
    window.location.reload();
  };

  const handleCompanySetupClose = () => {
    setShowCompanySetupModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Header fixe en haut - Simple et minimaliste */}
      <HeaderSimple
        currentCompany={currentCompany}
        onCompanyChange={setCurrentCompany}
        onChatOpen={handleChatOpen}
        onMagicActions={handleMagicActions}
        onAddCompany={handleAddCompany}
      />

      {/* Contenu principal avec padding pour header et navigation */}
      <main className={`pt-16 min-h-screen ${className || ''}`}>
        <div className="pb-24">
          {children}
        </div>
        {/* Spacer pour éviter que le contenu soit caché par la navbar flottante */}
        <div className="h-24" aria-hidden="true" />
      </main>

      {/* Navigation inférieure unifiée */}
      <BottomNav
        activeItem={activeNavItem}
        onItemSelect={handleNavigation}
      />
      
      {/* Assistant Chat OKÉ */}
      <AssistantChat 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)} 
      />
      
      {/* Menu d'ajout */}
      <AddMenu
        isOpen={addMenuOpen}
        onClose={() => setAddMenuOpen(false)}
      />
      
      {/* Grille de modules */}
      <ModulesGrid
        isOpen={modulesGridOpen}
        onClose={() => setModulesGridOpen(false)}
        currentModule={activeNavItem}
      />
      
      {/* Modal de configuration d'entreprise */}
      <CompanySetupModal
        isOpen={showCompanySetupModal}
        onClose={handleCompanySetupClose}
        onComplete={handleCompanySetupComplete}
      />
    </div>
  );
};

export default AppLayout;