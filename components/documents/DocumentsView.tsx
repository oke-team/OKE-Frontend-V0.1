'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid3X3, 
  List, 
  Eye, 
  Download,
  MoreVertical,
  FileText,
  FolderOpen,
  ChevronRight,
  Home,
  Plus,
  Shield,
  Calendar,
  Building2,
  ShoppingCart,
  Calculator
} from 'lucide-react';
import DocumentCard from './DocumentCard';
import { useDocumentViewer } from '@/components/ui/DocumentViewerAdvanced';
import { realDocuments, realDocumentUtils, realDocumentsStats } from '@/lib/mock-data/real-documents-data';
import { DocumentAttachment } from '@/types/document-viewer';
import { fadeInUp } from '@/lib/animations/variants';

type ViewMode = 'grid' | 'list';

interface DocumentsViewProps {
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onPaginationUpdate?: (totalPages: number, totalItems: number) => void;
  viewMode?: 'grid' | 'list';
  currentPath?: string[];
  onNavigateToFolder?: (folderId: string) => void;
  onSelectDocument?: (documentName: string) => void;
}

interface Folder {
  id: string;
  name: string;
  icon: any;
  color: string;
  parentId?: string;
  children?: Folder[];
}

// Dossiers prédéfinis avec les mêmes icônes que le modal
const defaultFolders: Folder[] = [
  {
    id: 'comptabilite',
    name: 'Comptabilité',
    icon: Calendar,
    color: 'text-purple-600',
    children: []
  },
  {
    id: 'banque',
    name: 'Banque',
    icon: Building2,
    color: 'text-blue-600',
    children: []
  },
  {
    id: 'fiscalite',
    name: 'Fiscalité',
    icon: Calculator,
    color: 'text-purple-600',
    children: []
  },
  {
    id: 'juridique',
    name: 'Juridique',
    icon: Shield,
    color: 'text-blue-600',
    children: []
  },
  {
    id: 'ventes',
    name: 'Ventes',
    icon: ShoppingCart,
    color: 'text-green-600',
    children: []
  }
];


export default function DocumentsView({
  currentPage = 1,
  onPageChange,
  onPaginationUpdate,
  viewMode = 'grid',
  currentPath = [],
  onNavigateToFolder,
  onSelectDocument
}: DocumentsViewProps) {
  const { open: openDocument, ViewerComponent } = useDocumentViewer();
  const [selectedDocuments, setSelectedDocuments] = useState<Set<string>>(new Set());
  
  // États pour la navigation de dossiers
  const [folders, setFolders] = useState<Folder[]>(defaultFolders);
  const [showCreateFolder, setShowCreateFolder] = useState(false);

  // Configuration de la pagination
  const ITEMS_PER_PAGE = 24; // 4x6 pour la grille
  
  // Filtrage et pagination des documents réels
  const { paginatedDocuments, totalPages, totalItems } = useMemo(() => {
    let filtered = realDocuments;

    // Filtrage par dossier courant
    if (currentPath.length > 0) {
      const currentCategory = currentPath[currentPath.length - 1];
      filtered = realDocumentUtils.getDocumentsByCategory(currentCategory);
    }

    // Calcul de la pagination
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedDocuments = filtered.slice(startIndex, endIndex);

    return { 
      paginatedDocuments, 
      totalPages, 
      totalItems 
    };
  }, [currentPath, currentPage]);

  // Mettre à jour les informations de pagination
  useEffect(() => {
    if (onPaginationUpdate) {
      onPaginationUpdate(totalPages, totalItems);
    }
  }, [totalPages, totalItems, onPaginationUpdate]);

  const handleDocumentClick = (document: DocumentAttachment) => {
    // Notifier la sélection du document
    onSelectDocument?.(document.name);
    
    if (document.type !== 'unsupported') {
      openDocument({
        src: document.src,
        title: document.name,
        type: document.type as any
      });
    }
  };

  const handleDocumentSelect = (documentId: string) => {
    const newSelected = new Set(selectedDocuments);
    if (newSelected.has(documentId)) {
      newSelected.delete(documentId);
    } else {
      newSelected.add(documentId);
    }
    setSelectedDocuments(newSelected);
  };


  // Navigation de dossiers - déléguée au parent
  const handleFolderClick = (folderId: string) => {
    onNavigateToFolder?.(folderId);
    if (onPageChange) {
      onPageChange(1);
    }
  };

  // Obtenir le dossier courant et ses enfants
  const getCurrentFolder = (): Folder | null => {
    if (currentPath.length === 0) return null;
    
    let currentFolder: Folder | undefined;
    let searchIn = folders;
    
    for (const pathId of currentPath) {
      currentFolder = searchIn.find(f => f.id === pathId);
      if (!currentFolder) return null;
      searchIn = currentFolder.children || [];
    }
    
    return currentFolder || null;
  };

  const getCurrentFolderContents = () => {
    if (currentPath.length === 0) {
      return folders;
    }
    
    const currentFolder = getCurrentFolder();
    return currentFolder?.children || [];
  };

  return (
    <div className="h-full flex flex-col">
      {/* Contenu principal - header déplacé vers la page */}
      <div className="flex-1 overflow-auto p-4">
        {currentPath.length === 0 ? (
          // Affichage des dossiers à la racine
          <motion.div
            variants={fadeInUp}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'
                : 'space-y-2'
            }
          >
            <AnimatePresence>
              {folders.map((folder, index) => (
                <motion.div
                  key={folder.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.02 }}
                  className="group bg-white rounded-xl border border-[#4C34CE]/10 p-4 transition-all cursor-pointer hover:border-[#4C34CE]/20 hover:shadow-[0_8px_32px_rgba(76,52,206,0.1)] hover:-translate-y-0.5"
                  onClick={() => handleFolderClick(folder.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
                      <folder.icon className={`w-6 h-6 ${folder.color}`} />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">
                      {folder.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {realDocumentsStats.byCategory[folder.id as keyof typeof realDocumentsStats.byCategory] || 0} document{(realDocumentsStats.byCategory[folder.id as keyof typeof realDocumentsStats.byCategory] || 0) !== 1 ? 's' : ''}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : paginatedDocuments.length === 0 ? (
          // Aucun document dans le dossier
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center h-full text-gray-500"
          >
            <FolderOpen className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium">Dossier vide</p>
            <p className="text-sm">Utilisez le menu + pour ajouter des documents dans ce dossier</p>
          </motion.div>
        ) : (
          // Affichage des documents dans le dossier
          <motion.div
            variants={fadeInUp}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'
                : 'space-y-2'
            }
          >
            <AnimatePresence>
              {paginatedDocuments.map((document, index) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  viewMode={viewMode}
                  isSelected={selectedDocuments.has(document.id)}
                  onSelect={() => handleDocumentSelect(document.id)}
                  onClick={() => handleDocumentClick(document)}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Actions sélection multiple */}
      <AnimatePresence>
        {selectedDocuments.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="shrink-0 p-4 bg-[#4C34CE]/5 border-t border-[#4C34CE]/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#4C34CE]">
                {selectedDocuments.size} document{selectedDocuments.size > 1 ? 's' : ''} sélectionné{selectedDocuments.size > 1 ? 's' : ''}
              </span>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Télécharger
                </button>
                <button 
                  onClick={() => setSelectedDocuments(new Set())}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DocumentViewer */}
      <ViewerComponent mode="auto" glassMorphism={true} />
    </div>
  );
}