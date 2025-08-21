'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FileText, Eye, AlertCircle, File, Image as ImageIcon } from 'lucide-react';
import { DocumentAttachment } from '@/types/document-viewer';
import { usePdfConfig } from '@/lib/hooks/usePdfConfig';

// Import dynamique des composants react-pdf
const Document = dynamic(
  () => import('react-pdf').then(mod => mod.Document),
  { 
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-100 rounded-lg h-full w-full" />
  }
);

const Page = dynamic(
  () => import('react-pdf').then(mod => mod.Page),
  { ssr: false }
);

interface DocumentPreviewProps {
  document: DocumentAttachment;
  className?: string;
  width?: number;
  height?: number;
  lazy?: boolean;
}

// Cache en mémoire pour les thumbnails
const thumbnailCache = new Map<string, string>();

// Cache localStorage pour persistance
const CACHE_KEY = 'oke_document_thumbnails_v1';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 jours

const getCachedThumbnail = (documentId: string): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    // Vérifier le cache mémoire d'abord
    if (thumbnailCache.has(documentId)) {
      return thumbnailCache.get(documentId)!;
    }

    // Vérifier le localStorage
    const cached = localStorage.getItem(`${CACHE_KEY}_${documentId}`);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        thumbnailCache.set(documentId, data);
        return data;
      } else {
        localStorage.removeItem(`${CACHE_KEY}_${documentId}`);
      }
    }
  } catch (error) {
    console.warn('Cache read error:', error);
  }
  return null;
};

const setCachedThumbnail = (documentId: string, thumbnail: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    // Mettre en cache en mémoire
    thumbnailCache.set(documentId, thumbnail);
    
    // Mettre en cache dans localStorage avec gestion de la taille
    const cacheData = {
      data: thumbnail,
      timestamp: Date.now()
    };
    
    const cacheString = JSON.stringify(cacheData);
    
    // Vérifier la taille du cache (éviter de saturer le localStorage)
    if (cacheString.length < 1024 * 1024) { // Max 1MB par thumbnail
      localStorage.setItem(`${CACHE_KEY}_${documentId}`, cacheString);
    } else {
      console.warn('Thumbnail too large for cache:', documentId);
    }
  } catch (error) {
    // Si le localStorage est plein, essayer de nettoyer
    if (error instanceof DOMException && error.code === 22) {
      console.warn('LocalStorage full, cleaning old thumbnails...');
      cleanOldThumbnails();
    } else {
      console.warn('Cache write error:', error);
    }
  }
};

// Fonction pour nettoyer les anciens thumbnails
const cleanOldThumbnails = () => {
  if (typeof window === 'undefined') return;
  
  try {
    const keys = Object.keys(localStorage);
    const thumbnailKeys = keys.filter(key => key.startsWith(CACHE_KEY));
    
    // Supprimer les thumbnails de plus de 7 jours
    const cutoff = Date.now() - CACHE_EXPIRY;
    
    thumbnailKeys.forEach(key => {
      try {
        const cached = localStorage.getItem(key);
        if (cached) {
          const { timestamp } = JSON.parse(cached);
          if (timestamp < cutoff) {
            localStorage.removeItem(key);
          }
        }
      } catch (e) {
        localStorage.removeItem(key); // Supprimer les entrées corrompues
      }
    });
  } catch (error) {
    console.warn('Cache cleanup error:', error);
  }
};

// Hook pour gérer l'intersection observer (lazy loading)
function useIntersectionObserver(
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || isLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsIntersecting(true);
          setIsLoaded(true);
          callback();
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [callback, isLoaded]);

  return { targetRef, isIntersecting: isIntersecting || isLoaded };
}

export default function DocumentPreview({ 
  document, 
  className = '', 
  width = 120, 
  height = 160,
  lazy = true 
}: DocumentPreviewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [isClient, setIsClient] = useState(false);
  const [numPages, setNumPages] = useState<number>();
  
  // Configuration PDF
  const { isReady: isPdfReady } = usePdfConfig();

  // S'assurer qu'on est côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Gestion du lazy loading
  const handleLoadTrigger = useCallback(() => {
    setShouldLoad(true);
  }, []);

  const { targetRef, isIntersecting } = useIntersectionObserver(
    handleLoadTrigger,
    { threshold: 0.1 }
  );

  // Callbacks pour les PDFs
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setHasError(false);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.warn('PDF preview failed:', error);
    setIsLoading(false);
    setHasError(true);
  }, []);

  const onPageLoadError = useCallback((error: Error) => {
    console.warn('PDF page preview failed:', error);
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Vérifier si on doit charger le preview
  const shouldShowPreview = isClient && (lazy ? (isIntersecting && shouldLoad) : shouldLoad);

  // Fallback pour les documents non-PDF ou en cas d'erreur
  const FallbackPreview = ({ icon: Icon = FileText, message }: { icon?: any; message?: string }) => {
    const iconSize = width < 60 ? 'w-4 h-4' : 'w-8 h-8';
    const showMessage = width > 80 && message;
    
    return (
      <div 
        className={`${className} flex flex-col items-center justify-center bg-gray-50 rounded-lg`}
        style={{ width, height }}
      >
        <Icon className={`${iconSize} text-gray-400 ${showMessage ? 'mb-2' : ''}`} />
        {showMessage && <span className="text-xs text-gray-500 text-center px-2">{message}</span>}
      </div>
    );
  };

  // Aperçu d'image
  if (document.type === 'image') {
    return (
      <div ref={targetRef} className={className} style={{ width, height }}>
        {shouldShowPreview ? (
          <img
            src={document.src}
            alt={document.name}
            className="w-full h-full object-cover border border-gray-200 rounded-lg"
            loading="lazy"
            onError={() => setHasError(true)}
          />
        ) : (
          <div 
            className="bg-gray-100 border border-gray-200 rounded-lg animate-pulse"
            style={{ width, height }}
          />
        )}
      </div>
    );
  }

  // Aperçu PDF avec configuration robuste
  if (document.type === 'pdf') {
    return (
      <div ref={targetRef} className={className} style={{ width, height }}>
        {!shouldShowPreview ? (
          // Skeleton pendant le lazy loading
          <div 
            className="bg-gray-100 border border-gray-200 rounded-lg animate-pulse"
            style={{ width, height }}
          />
        ) : hasError || !isPdfReady ? (
          // Fallback en cas d'erreur ou si PDF pas prêt
          <FallbackPreview 
            icon={hasError ? AlertCircle : FileText} 
            message={width > 80 ? (hasError ? "Aperçu indisponible" : `PDF • ${document.pageCount || '?'} pages`) : undefined}
          />
        ) : !Document || !Page ? (
          // Fallback pendant le chargement des composants PDF
          <div 
            className="flex items-center justify-center bg-gray-50 rounded-lg"
            style={{ width, height }}
          >
            <div className={`animate-spin rounded-full border-2 border-[#4C34CE] border-t-transparent ${width < 60 ? 'h-4 w-4' : 'h-6 w-6'}`}></div>
          </div>
        ) : (
          // Preview PDF complet
          <div className="relative overflow-hidden rounded-lg bg-white">
            <Document
              file={document.src}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div 
                  className="flex items-center justify-center bg-gray-50 rounded-lg"
                  style={{ width, height }}
                >
                  <div className={`animate-spin rounded-full border-2 border-[#4C34CE] border-t-transparent ${width < 60 ? 'h-4 w-4' : 'h-6 w-6'}`}></div>
                </div>
              }
              options={{
                cMapUrl: '/cmaps/',
                cMapPacked: true,
                standardFontDataUrl: '/standard_fonts/',
              }}
            >
              <Page
                pageNumber={1}
                width={width}
                height={height}
                onLoadError={onPageLoadError}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="pdf-page"
              />
            </Document>
            
            {/* Indicateur nombre de pages */}
            {numPages && numPages > 1 && width > 100 && (
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {numPages}p
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Documents non supportés pour le preview
  const getDocumentIcon = () => {
    switch (document.type) {
      case 'pdf':
        return FileText;
      case 'image':
        return ImageIcon;
      case 'office':
        return File;
      default:
        return File;
    }
  };

  return <FallbackPreview icon={getDocumentIcon()} />;
}

// Styles CSS pour react-pdf
const pdfStyles = `
.pdf-page canvas {
  width: 100% !important;
  height: auto !important;
  max-width: 100%;
  object-fit: cover;
}
`;

// Injecter les styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = pdfStyles;
  document.head.appendChild(style);
}