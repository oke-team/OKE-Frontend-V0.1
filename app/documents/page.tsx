'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';
import { Calculator, Building2, Receipt, FileText, TrendingUp } from 'lucide-react';
import DocumentsView from '@/components/documents/DocumentsView';
import DocumentsWidgets from '@/components/documents/DocumentsWidgets';
import DocumentsBreadcrumb from '@/components/documents/DocumentsBreadcrumb';
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
    { id: 'banque', name: 'Banque', icon: Building2, color: 'text-purple-600', children: [] },
    { id: 'fiscalite', name: 'Fiscalité', icon: Receipt, color: 'text-orange-600', children: [] },
    { id: 'juridique', name: 'Juridique', icon: FileText, color: 'text-blue-600', children: [] },
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
        // Layout mobile avec widgets fixes
        <div className="min-h-screen bg-gray-50">
          {/* Widgets fixes en haut */}
          <motion.div 
            variants={fadeInUp}
            className="fixed top-16 left-0 right-0 z-20 bg-gray-50 px-4 py-3 border-b border-gray-100"
          >
            <div className="space-y-2">
              <DocumentsWidgets 
                selectedFolder={currentPath[currentPath.length - 1]}
                totalDocuments={774}
              />
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

          {/* Liste des documents avec marge pour les widgets */}
          <motion.div 
            className="pt-32 pb-20"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="px-4"
            >
              <DocumentsView 
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onPaginationUpdate={handlePaginationUpdate}
                viewMode={viewMode}
                currentPath={currentPath}
                onNavigateToFolder={(folderId) => setCurrentPath([...currentPath, folderId])}
                onSelectDocument={setSelectedDocument}
              />
            </motion.div>
          </motion.div>
        </div>
      ) : (
        // Layout desktop avec position absolue
        <div className="fixed top-16 left-0 right-0 bottom-0 overflow-hidden">
          <motion.div 
            className="h-full flex flex-col"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Widgets - position absolue en haut */}
            <motion.div 
              variants={fadeInUp}
              className="absolute top-0 left-0 right-0 z-10 px-4 lg:px-6 pt-1 pb-0"
            >
              <div className="space-y-0.5">
                <DocumentsWidgets 
                  selectedFolder={currentPath[currentPath.length - 1]}
                  totalDocuments={774}
                />
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

            {/* Vue documents - positionnée entre widgets et bas de page */}
            <motion.div 
              variants={fadeInUp}
              className="absolute top-24 left-0 right-0 px-4 lg:px-6"
              style={{ bottom: '12px' }}
            >
              <div className="h-full bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-[#FAA016] overflow-hidden">
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
    </AppLayout>
  );
}