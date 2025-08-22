'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Loader2, FileText } from 'lucide-react';

// Composant de remplacement pour le développement
const DevPDFPlaceholder = ({ onClose, title, ...props }: any) => (
  <div className="h-full flex items-center justify-center bg-gray-50">
    <div className="text-center p-8">
      <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">DocumentViewer OKÉ</h3>
      <p className="text-sm text-gray-500 mb-4">PDF temporairement désactivé en développement</p>
      <p className="text-xs text-gray-400 mb-4">Fichier: {title || 'Document'}</p>
      <button 
        onClick={onClose}
        className="px-4 py-2 bg-[#4C34CE] text-white hover:bg-[#4C34CE]/90 rounded-lg transition-colors"
      >
        Fermer
      </button>
    </div>
  </div>
);

// Import conditionnel basé sur la variable d'environnement
// En développement, on retourne directement le placeholder pour éviter l'import
let DocumentViewerPDF: React.ComponentType<any>;

if (process.env.NEXT_PUBLIC_DISABLE_PDF === 'true') {
  DocumentViewerPDF = DevPDFPlaceholder;
} else {
  DocumentViewerPDF = dynamic(
    () => import('./DocumentViewerPDF'),
    { 
      ssr: false,
      loading: () => (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-secondary" />
            <p className="text-sm text-gray-500">Chargement du viewer PDF...</p>
          </div>
        </div>
      )
    }
  );
}

export default DocumentViewerPDF;