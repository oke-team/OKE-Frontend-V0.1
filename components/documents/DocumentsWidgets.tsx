'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  FolderOpen, 
  HardDrive, 
  Clock, 
  Calculator,
  CreditCard,
  Scale,
  TrendingUp,
  Star,
  Download,
  Users,
  ShoppingCart
} from 'lucide-react';
import { realDocumentsStats } from '@/lib/mock-data/real-documents-data';

interface DocumentsWidgetsProps {
  selectedFolder?: string;
  totalDocuments?: number;
  className?: string;
}

const DocumentsWidgets: React.FC<DocumentsWidgetsProps> = ({
  selectedFolder,
  totalDocuments = 774,
  className = ''
}) => {
  
  // Configuration des dossiers avec leurs couleurs et icônes
  const folderConfigs = {
    comptabilite: { 
      icon: Calculator, 
      color: 'text-green-600', 
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    banque: { 
      icon: CreditCard, 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    fiscalite: { 
      icon: FileText, 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    juridique: { 
      icon: Scale, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    ventes: { 
      icon: TrendingUp, 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    paie: { 
      icon: Users, 
      color: 'text-indigo-600', 
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    achats: { 
      icon: ShoppingCart, 
      color: 'text-rose-600', 
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200'
    }
  };

  // Calcul de l'espace utilisé (simulation)
  const totalSize = totalDocuments * 2.1; // MB moyenne par document
  const totalSizeGB = (totalSize / 1024).toFixed(1);

  // Documents favoris/récents (simulation)
  const favoriteCategories = [
    { id: 'comptabilite', count: realDocumentsStats.byCategory.comptabilite },
    { id: 'juridique', count: realDocumentsStats.byCategory.juridique },
    { id: 'fiscalite', count: realDocumentsStats.byCategory.fiscalite }
  ].sort((a, b) => b.count - a.count);

  return (
    <div className={`${className}`}>
      {/* Dossiers d'accès rapide - plus compacts et utiles */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2">
        {Object.entries(folderConfigs).map(([folderId, config], index) => {
          const IconComponent = config.icon;
          const count = realDocumentsStats.byCategory[folderId as keyof typeof realDocumentsStats.byCategory] || 0;
          
          return (
            <motion.div
              key={folderId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg border-2 border-[#4C34CE]/20 p-2 min-w-0 hover:shadow-md hover:border-[#4C34CE] hover:-translate-y-0.5 transition-all cursor-pointer group relative overflow-hidden"
            >
              {/* Effet glass morphism subtil avec la couleur du folder */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${
                    config.color.includes('green') ? 'rgba(34, 197, 94, 0.03)' :
                    config.color.includes('purple') ? 'rgba(147, 51, 234, 0.03)' :
                    config.color.includes('orange') ? 'rgba(249, 115, 22, 0.03)' :
                    config.color.includes('blue') ? 'rgba(59, 130, 246, 0.03)' :
                    config.color.includes('emerald') ? 'rgba(16, 185, 129, 0.03)' :
                    config.color.includes('indigo') ? 'rgba(99, 102, 241, 0.03)' :
                    config.color.includes('rose') ? 'rgba(244, 63, 94, 0.03)' :
                    'rgba(76, 52, 206, 0.03)'
                  }, transparent)`
                }}
              />
              
              <div className="relative z-10 flex items-center gap-2">
                <div className={`w-6 h-6 ${config.bgColor} rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <IconComponent className={`w-3 h-3 ${config.color} group-hover:scale-110 transition-transform`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-xs capitalize truncate group-hover:text-[#4C34CE] transition-colors">
                    {folderId === 'paie' ? 'Paie/RH' : folderId.replace('_', ' ')}
                  </p>
                  <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
                    {count || '0'}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentsWidgets;