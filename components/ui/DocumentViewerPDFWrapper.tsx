'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Import dynamique du viewer PDF pour éviter les erreurs SSR
const DocumentViewerPDF = dynamic(
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

export default DocumentViewerPDF;