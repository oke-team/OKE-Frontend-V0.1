'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  ChevronRight, 
  Plus, 
  FolderPlus,
  Upload,
  Search,
  Grid3X3,
  List
} from 'lucide-react';

interface DocumentsBreadcrumbProps {
  currentPath: string[];
  folders: any[];
  viewMode: 'grid' | 'list';
  onNavigateToRoot: () => void;
  onNavigateToPath: (index: number) => void;
  onCreateFolder: () => void;
  onSetViewMode: (mode: 'grid' | 'list') => void;
  selectedDocument?: string;
  className?: string;
}

const DocumentsBreadcrumb: React.FC<DocumentsBreadcrumbProps> = ({
  currentPath,
  folders,
  viewMode,
  onNavigateToRoot,
  onNavigateToPath,
  onCreateFolder,
  onSetViewMode,
  selectedDocument,
  className = ''
}) => {

  // Fonction pour trouver un dossier par ID
  const findFolderById = (folderList: any[], id: string): any => {
    for (const folder of folderList) {
      if (folder.id === id) return folder;
      if (folder.children) {
        const found = findFolderById(folder.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <div className={`flex items-center justify-between py-1 ${className}`}>
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1 flex-1 min-w-0">
          
          {/* Bouton Home */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNavigateToRoot}
            className="flex items-center gap-1 px-2 py-1 text-sm text-gray-700 hover:text-[#4C34CE] hover:bg-[#4C34CE]/5 rounded transition-all"
          >
            <Home className="w-4 h-4" />
            <span className="font-medium">Documents</span>
          </motion.button>
          
          {/* Chemin des dossiers */}
          {currentPath.map((pathId, index) => {
            const folder = findFolderById(folders, pathId);
            if (!folder) return null;
            
            return (
              <React.Fragment key={pathId}>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigateToPath(index)}
                  className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:text-[#4C34CE] hover:bg-[#4C34CE]/5 rounded transition-all truncate max-w-32"
                >
                  <folder.icon className={`w-4 h-4 ${folder.color}`} />
                  <span className="truncate">{folder.name}</span>
                </motion.button>
              </React.Fragment>
            );
          })}
          
          {/* Document sélectionné */}
          {selectedDocument && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <div className="flex items-center gap-1 px-2 py-1 bg-[#4C34CE]/5 text-[#4C34CE] rounded text-sm">
                <span className="truncate max-w-48">{selectedDocument}</span>
              </div>
            </>
          )}
          
          {/* Actions rapides */}
          <div className="flex items-center gap-1 ml-4">
            
            {/* Nouveau dossier */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCreateFolder}
              className="p-1 text-gray-400 hover:text-[#4C34CE] hover:bg-[#4C34CE]/5 rounded transition-all"
              title="Créer un dossier"
            >
              <FolderPlus className="w-4 h-4" />
            </motion.button>
            
            {/* Upload rapide */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-all"
              title="Upload rapide"
            >
              <Upload className="w-4 h-4" />
            </motion.button>
            
            {/* Recherche dans le dossier */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all"
              title="Rechercher dans ce dossier"
            >
              <Search className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Actions de vue */}
        <div className="flex items-center gap-2 ml-4">
          
          {/* Compteur */}
          <div className="text-xs text-gray-500 hidden sm:block">
            {currentPath.length === 0 ? '5 dossiers' : 'Navigation active'}
          </div>
          
          {/* Toggle vue */}
          <div className="flex bg-gray-100 rounded-md p-0.5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSetViewMode('grid')}
              className={`p-1.5 rounded transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Vue grille"
            >
              <Grid3X3 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSetViewMode('list')}
              className={`p-1.5 rounded transition-all ${
                viewMode === 'list' 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Vue liste"
            >
              <List className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
    </div>
  );
};

export default DocumentsBreadcrumb;