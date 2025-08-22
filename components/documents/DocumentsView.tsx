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
    id: 'divers',
    name: 'Divers',
    icon: FolderOpen,
    color: 'text-amber-600',
    children: [] // Permet d'ajouter des sous-dossiers
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
      if (currentCategory === 'divers') {
        // Pour divers, on peut avoir des documents spécifiques ou vides pour commencer
        filtered = []; // Aucun document par défaut dans divers
      } else {
        filtered = realDocumentUtils.getDocumentsByCategory(currentCategory);
      }
    }
    // Si pas de chemin (racine), afficher tous les documents par défaut

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
        {currentPath.length > 0 && currentPath[currentPath.length - 1] === 'divers' && paginatedDocuments.length === 0 ? (
          // Dossier Divers vide
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center h-full text-gray-500"
          >
            <FolderOpen className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium">Dossier Divers vide</p>
            <p className="text-sm">Utilisez le menu + pour ajouter des documents et créer des sous-dossiers</p>
          </motion.div>
        ) : (
          // Affichage des documents (tous par défaut ou dans dossier spécifique)
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