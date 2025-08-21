'use client';

import { useEffect, useState } from 'react';

let isConfigured = false;

export const usePdfConfig = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || isConfigured) {
      setIsReady(isConfigured);
      return;
    }

    const configurePdf = async () => {
      try {
        // Import dynamique de pdfjs-dist
        const pdfjs = await import('pdfjs-dist');
        
        // Configuration professionnelle du worker PDF
        // Utiliser le worker local pour performance et fiabilité maximales
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
        
        // Marquer comme configuré
        isConfigured = true;
        setIsReady(true);
        
        console.log('PDF.js configured successfully with version:', pdfjs.version);
      } catch (error) {
        console.warn('Failed to configure PDF.js:', error);
        setIsReady(false);
      }
    };

    configurePdf();
  }, []);

  return { isReady };
};