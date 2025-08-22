'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Calculator, 
  Calendar, 
  ShoppingCart,
  Users,
  Package,
  Building2
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
  
  // Configuration des dossiers avec les mêmes icônes et couleurs vibrantes que le modal
  const folderConfigs = {
    comptabilite: { 
      icon: Calendar, 
      color: 'text-white', 
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    banque: { 
      icon: Building2, 
      color: 'text-white', 
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    fiscalite: { 
      icon: Calculator, 
      color: 'text-white', 
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    juridique: { 
      icon: Shield, 
      color: 'text-white', 
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    ventes: { 
      icon: ShoppingCart, 
      color: 'text-white', 
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    paie: { 
      icon: Users, 
      color: 'text-white', 
      bgColor: 'bg-gradient-to-br from-pink-500 to-pink-600'
    },
    achats: { 
      icon: ShoppingCart, 
      color: 'text-white', 
      bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600'
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
              className="bg-white rounded-lg border border-[#4C34CE] p-2 min-w-0 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group relative overflow-hidden"
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
                <div className={`w-8 h-8 ${config.bgColor} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                  <IconComponent className={`w-4 h-4 ${config.color} group-hover:scale-110 transition-transform`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 text-xs capitalize truncate group-hover:text-[#4C34CE] transition-colors">
                    {folderId === 'paie' ? 'Paie/RH' : 
                     folderId === 'comptabilite' ? 'Compta' :
                     folderId === 'fiscalite' ? 'Fiscalité' :
                     folderId === 'juridique' ? 'Juridique' :
                     folderId === 'achats' ? 'Achats' :
                     folderId === 'stocks' ? 'Stocks' :
                     folderId.replace('_', ' ')}
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