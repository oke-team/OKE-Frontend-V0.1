'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';
import { Calculator, CreditCard, FileText, Scale, TrendingUp } from 'lucide-react';
import DocumentsView from '@/components/documents/DocumentsView';
import DocumentsWidgets from '@/components/documents/DocumentsWidgets';
import DocumentsBreadcrumb from '@/components/documents/DocumentsBreadcrumb';
import PdfPreviewTest from '@/components/documents/PdfPreviewTest';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function DocumentsPage() {
  const [isMobile, setIsMobile] = useState(false);
  
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  // États pour la navigation des documents
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDocument, setSelectedDocument] = useState<string>();
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  
  // Mock folders structure
  const folders = [
    { id: 'comptabilite', name: 'Comptabilité', icon: Calculator, color: 'text-green-600', children: [] },
    { id: 'banque', name: 'Banque', icon: CreditCard, color: 'text-purple-600', children: [] },
    { id: 'fiscalite', name: 'Fiscalité', icon: FileText, color: 'text-orange-600', children: [] },
    { id: 'juridique', name: 'Juridique', icon: Scale, color: 'text-blue-600', children: [] },
    { id: 'ventes', name: 'Ventes', icon: TrendingUp, color: 'text-emerald-600', children: [] }
  ];
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Gestion de la pagination
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);
  
  const handlePaginationUpdate = useCallback((newTotalPages: number, newTotalItems: number) => {
    setTotalPages(newTotalPages);
    setTotalItems(newTotalItems);
  }, []);

  // Navigation handlers
  const handleNavigateToRoot = useCallback(() => {
    setCurrentPath([]);
    setCurrentPage(1);
  }, []);

  const handleNavigateToPath = useCallback((index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1));
    setCurrentPage(1);
  }, [currentPath]);

  const handleCreateFolder = useCallback(() => {
    setShowCreateFolder(true);
  }, []);

  const handleSetViewMode = useCallback((mode: 'grid' | 'list') => {
    setViewMode(mode);
  }, []);

  return (
    <AppLayout
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalItems}
      onPageChange={handlePageChange}
    >
      {isMobile ? (
        // Layout mobile optimisé
        <div className="min-h-screen bg-gray-50">
          <motion.div 
            className="px-4 py-6"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <DocumentsView 
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onPaginationUpdate={handlePaginationUpdate}
            />
          </motion.div>
        </div>
      ) : (
        // Layout desktop 
        <div className="min-h-screen px-4 lg:px-6">
          <motion.div 
            className="space-y-4"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Zone Widgets Documents */}
            <motion.div 
              variants={fadeInUp}
              className="py-2"
            >
              <div className="space-y-2">
                {/* Widgets de statistiques */}
                <DocumentsWidgets 
                  selectedFolder={currentPath[currentPath.length - 1]}
                  totalDocuments={774}
                />
                
                {/* Breadcrumb dynamique */}
                <DocumentsBreadcrumb
                  currentPath={currentPath}
                  folders={folders}
                  viewMode={viewMode}
                  onNavigateToRoot={handleNavigateToRoot}
                  onNavigateToPath={handleNavigateToPath}
                  onCreateFolder={handleCreateFolder}
                  onSetViewMode={handleSetViewMode}
                  selectedDocument={selectedDocument}
                />
              </div>
            </motion.div>

            {/* Contenu principal */}
            <motion.div 
              variants={fadeInUp}
              className="min-h-[600px]"
            >
              <div className="bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-[#FAA016] overflow-hidden">
                <DocumentsView 
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  onPaginationUpdate={handlePaginationUpdate}
                  viewMode={viewMode}
                  currentPath={currentPath}
                  onNavigateToFolder={(folderId) => setCurrentPath([...currentPath, folderId])}
                  onSelectDocument={setSelectedDocument}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
      
      {/* Composant de test temporaire */}
      <PdfPreviewTest />
    </AppLayout>
  );
}