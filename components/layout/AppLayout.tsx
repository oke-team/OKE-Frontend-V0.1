"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import UnifiedBottomNav from '@/components/navigation/UnifiedBottomNav';
import HeaderFixed from './HeaderFixed';
import MagicActionsButton from '@/components/ui/MagicActionsButton';
import Chatbot from '@/components/ui/Chatbot';

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

  // Synchroniser l'item actif avec l'URL
  useEffect(() => {
    const path = pathname.split('/')[1] || 'dashboard';
    setActiveNavItem(path);
  }, [pathname]);

  const handleNavigation = (itemId: string) => {
    if (itemId === 'add') {
      // Gérer le bouton d'ajout spécialement
      console.log('Bouton Ajouter cliqué');
      return;
    }
    setActiveNavItem(itemId);
    router.push(`/${itemId}`);
  };

  const handleChatOpen = () => {
    setChatOpen(true);
    console.log('Ouverture du chatbot IA');
  };

  const handleMagicActions = () => {
    console.log('Actions magiques contextuelles');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Header fixe en haut */}
      <HeaderFixed
        currentCompany={currentCompany}
        onCompanyChange={setCurrentCompany}
        onChatOpen={handleChatOpen}
        activeModule={activeNavItem}
      />

      {/* Contenu principal avec padding pour header et navigation */}
      <main className={`pt-16 min-h-screen ${className || ''}`}>
        <div className="pb-24 md:pb-8">
          {children}
        </div>
        {/* Spacer pour éviter que le contenu soit caché par la navbar sur mobile */}
        <div className="h-20 md:hidden" aria-hidden="true" />
      </main>

      {/* Navigation inférieure unifiée */}
      <UnifiedBottomNav
        activeItem={activeNavItem}
        onItemSelect={handleNavigation}
      />
      
      {/* Chatbot */}
      <Chatbot 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)} 
      />
    </div>
  );
};

export default AppLayout;