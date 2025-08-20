"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import UnifiedBottomNav from '@/components/navigation/UnifiedBottomNav';
import HeaderSimple from './HeaderSimple';
import MagicActionsButton from '@/components/ui/MagicActionsButton';
import AssistantChat from '@/components/ui/AssistantChat';
import AddMenu from '@/components/ui/AddMenu';
import ModulesGrid from '@/components/ui/ModulesGrid';

interface AppLayoutWithPaginationProps {
  children: React.ReactNode;
  className?: string;
  // Props de pagination
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

/**
 * Layout avec navbar intégrée supportant la pagination
 */
const AppLayoutWithPagination: React.FC<AppLayoutWithPaginationProps> = ({ 
  children, 
  className,
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange
}) => {
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

  // Synchroniser l'item actif avec l'URL
  useEffect(() => {
    const path = pathname.split('/')[1] || 'dashboard';
    setActiveNavItem(path);
  }, [pathname]);

  const handleNavigation = (itemId: string) => {
    if (itemId === 'add') {
      setAddMenuOpen(true);
      return;
    }
    
    // Navigation vers les modules
    const moduleRoutes: Record<string, string> = {
      dashboard: '/',
      banking: '/bank',
      communication: '/communication',
      accounting: '/accounting',
      documents: '/documents',
      stocks: '/stocks',
      tax: '/tax',
      reporting: '/reporting',
      hr: '/hr',
      organization: '/organization',
      automation: '/automation',
      purchases: '/purchases',
      sales: '/sales'
    };

    const route = moduleRoutes[itemId];
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <HeaderSimple
        currentCompany={currentCompany}
        onCompanyChange={setCurrentCompany}
        onChatToggle={() => setChatOpen(!chatOpen)}
      />
      
      {/* Contenu principal avec padding pour header et navbar */}
      <main className={`flex-1 pt-16 ${className || ''}`}>
        {children}
      </main>
      
      {/* Navigation avec pagination intégrée */}
      <UnifiedBottomNav
        activeItem={activeNavItem}
        onItemSelect={handleNavigation}
        showPagination={showPagination}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />
      
      {/* Magic Actions Button */}
      <div className="fixed bottom-24 right-4 z-40">
        <MagicActionsButton currentModule={activeNavItem} />
      </div>
      
      {/* Chat Assistant */}
      <AssistantChat 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)} 
      />
      
      {/* Menu d'ajout */}
      <AddMenu 
        isOpen={addMenuOpen}
        onClose={() => setAddMenuOpen(false)}
        currentModule={activeNavItem}
      />
      
      {/* Grille des modules */}
      <ModulesGrid 
        isOpen={modulesGridOpen}
        onClose={() => setModulesGridOpen(false)}
        onModuleSelect={handleNavigation}
      />
    </div>
  );
};

export default AppLayoutWithPagination;