'use client';

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Import dynamique pour éviter les erreurs SSR
const Document = dynamic(
  () => import('react-pdf').then(mod => mod.Document),
  { ssr: false }
);
const Page = dynamic(
  () => import('react-pdf').then(mod => mod.Page),
  { ssr: false }
);

// Import de pdfjs uniquement côté client
let pdfjs: any;
if (typeof window !== 'undefined') {
  try {
    pdfjs = require('react-pdf').pdfjs;
    // Utiliser le worker local pour éviter les problèmes de version
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
  } catch (error) {
    console.warn('PDF.js initialization warning:', error);
  }
}
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Printer, 
  Share2,
  RotateCw,
  Maximize2,
  Grid3X3,
  FileText,
  Search,
  MessageSquare,
  Highlighter,
  X,
  Loader2,
  AlertCircle,
  Check,
  Copy,
  MoreHorizontal,
  MoreVertical,
  Columns2,
  Layers,
  Square,
  Maximize
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { usePinchZoom } from '@/hooks/usePinchZoom';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface DocumentViewerPDFProps {
  src: string;
  title?: string;
  className?: string;
  onClose?: () => void;
  enableAnnotations?: boolean;
  enableTextSelection?: boolean;
  enablePrint?: boolean;
  enableDownload?: boolean;
  enableShare?: boolean;
  initialPage?: number;
  initialZoom?: number;
}

interface PDFInfo {
  numPages: number;
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  producer?: string;
  creationDate?: Date;
  modificationDate?: Date;
}

const ZOOM_LEVELS = [50, 75, 100, 125, 150, 200, 300, 400];
const MIN_ZOOM = 50;
const MAX_ZOOM = 400;
const ZOOM_STEP = 25;

// Options PDF.js constantes pour éviter les re-renders
const PDF_OPTIONS = {
  cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
  standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
};

const DocumentViewerPDFComponent: React.FC<DocumentViewerPDFProps> = ({
  src,
  title,
  className,
  onClose,
  enableAnnotations = true,
  enableTextSelection = true,
  enablePrint = true,
  enableDownload = true,
  enableShare = true,
  initialPage = 1,
  initialZoom = 100
}) => {
  // États principaux
  const [isClientSide, setIsClientSide] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [zoom, setZoom] = useState<number>(initialZoom);
  const [rotation, setRotation] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfInfo, setPdfInfo] = useState<PDFInfo | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(true);
  const [documentReady, setDocumentReady] = useState<boolean>(false);

  // Vérification client-side et détection tactile
  useEffect(() => {
    setIsClientSide(true);
    setIsMounted(true);
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    // Marquer le document comme prêt après un court délai
    const timer = setTimeout(() => {
      setDocumentReady(true);
      setLoading(false);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      setIsMounted(false);
    };
  }, []);

  // États UI
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showAnnotations, setShowAnnotations] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>('');
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
  
  // États de vue
  const [viewMode, setViewMode] = useState<'single' | 'continuous' | 'double'>('single');
  const [fitMode, setFitMode] = useState<'none' | 'width' | 'height' | 'page'>('width'); // Déjà sur 'width' par défaut
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  
  // Hooks pour gestures tactiles
  const { containerRef: pinchRef, zoom: pinchZoom, isPinching } = usePinchZoom({
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
    onZoomChange: (newZoom) => {
      setZoom(newZoom);
      setFitMode('none');
    }
  });
  
  const swipeRef = useSwipeGesture({
    onSwipeLeft: () => viewMode === 'single' && nextPage(),
    onSwipeRight: () => viewMode === 'single' && previousPage(),
    enabled: isTouchDevice && viewMode === 'single'
  });

  // Gestionnaire de chargement du PDF
  const onDocumentLoadSuccess = useCallback(({ numPages, _pdfInfo }: any) => {
    if (!isMounted) return;
    setNumPages(numPages);
    setLoading(false);
    setPdfInfo({
      numPages,
      title: _pdfInfo?.title,
      author: _pdfInfo?.author,
      subject: _pdfInfo?.subject,
      keywords: _pdfInfo?.keywords,
      creator: _pdfInfo?.creator,
      producer: _pdfInfo?.producer,
      creationDate: _pdfInfo?.creationDate,
      modificationDate: _pdfInfo?.modificationDate,
    });
  }, [isMounted]);

  const onDocumentLoadError = useCallback((error: Error) => {
    if (!isMounted) return;
    console.error('Erreur chargement PDF:', error);
    setError('Impossible de charger le document PDF');
    setLoading(false);
  }, [isMounted]);

  // Navigation
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= numPages) {
      setCurrentPage(page);
    }
  }, [numPages]);

  const previousPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  // Zoom
  const zoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
    setFitMode('none');
  }, []);

  const zoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
    setFitMode('none');
  }, []);

  const setZoomLevel = useCallback((level: number) => {
    setZoom(level);
    setFitMode('none');
  }, []);

  const fitToWidth = useCallback(() => {
    setFitMode('width');
    setZoom(100); // Réinitialiser le zoom
    // Forcer un recalcul
    setRefreshKey(prev => prev + 1);
  }, []);

  const fitToHeight = useCallback(() => {
    setFitMode('height');
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight - 120; // toolbar + padding
      setZoom(100);
    }
  }, []);

  // Rotation
  const rotate = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  // Plein écran
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Actions
  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = src;
    link.download = title || 'document.pdf';
    link.click();
  }, [src, title]);

  const handlePrint = useCallback(() => {
    window.open(src, '_blank')?.print();
  }, [src]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Document PDF',
          url: src
        });
      } catch (err) {
        console.log('Partage annulé');
      }
    }
  }, [src, title]);

  // Fermer le menu quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showMoreMenu && !(e.target as HTMLElement).closest('.relative')) {
        setShowMoreMenu(false);
      }
    };
    
    if (showMoreMenu) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMoreMenu]);

  // Raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '=':
          case '+':
            e.preventDefault();
            zoomIn();
            break;
          case '-':
            e.preventDefault();
            zoomOut();
            break;
          case '0':
            e.preventDefault();
            setZoomLevel(100);
            break;
          case 'p':
            e.preventDefault();
            handlePrint();
            break;
          case 's':
            e.preventDefault();
            handleDownload();
            break;
        }
      } else {
        switch (e.key) {
          case 'ArrowLeft':
            previousPage();
            break;
          case 'ArrowRight':
            nextPage();
            break;
          case 'Home':
            goToPage(1);
            break;
          case 'End':
            goToPage(numPages);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomIn, zoomOut, setZoomLevel, handlePrint, handleDownload, previousPage, nextPage, goToPage, numPages]);

  // Utiliser les options constantes
  const documentOptions = useMemo(() => PDF_OPTIONS, []);

  // Composants de chargement mémorisés
  const loadingComponent = useMemo(() => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-secondary" />
        <p className="text-sm text-gray-500">Chargement du PDF...</p>
      </div>
    </div>
  ), []);

  const errorComponent = useMemo(() => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
        <p className="text-sm text-red-600">Erreur lors du chargement du PDF</p>
        <p className="text-xs text-gray-500 mt-2">{src}</p>
      </div>
    </div>
  ), [src]);

  const pageLoadingComponent = useMemo(() => (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-6 w-6 animate-spin text-secondary" />
    </div>
  ), []);

  // Mémoriser la largeur de fenêtre pour mobile
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calcul de la largeur/hauteur selon le mode
  const getPageWidth = useCallback(() => {
    if (!containerRef.current) return undefined;
    // Padding réduit pour maximiser l'espace
    const containerWidth = containerRef.current.clientWidth - 32;
    
    if (fitMode === 'width') {
      return containerWidth;
    } else if (fitMode === 'page') {
      return containerWidth * 0.95; // Augmenté de 0.9 à 0.95
    }
    
    // Ajuster la base pour que 100% soit plus grand
    return containerWidth * (zoom / 100);
  }, [fitMode, zoom]);
  
  // Forcer le recalcul quand les vignettes changent
  useEffect(() => {
    // Attendre que l'animation soit terminée puis forcer le recalcul
    const timer = setTimeout(() => {
      setRefreshKey(prev => prev + 1);
    }, 250);
    
    return () => clearTimeout(timer);
  }, [showThumbnails]);

  // UI mobile simplifiée
  if (isTouchDevice) {
    return (
      <div className={cn("flex flex-col h-full bg-gray-50 dark:bg-gray-900", className)}>
        {/* Header mobile compact amélioré */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-2 py-2 gap-2">
            {/* Navigation mobile */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={previousPage}
                disabled={currentPage <= 1 || viewMode === 'continuous'}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs font-medium whitespace-nowrap">
                {currentPage}/{numPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextPage}
                disabled={currentPage >= numPages || viewMode === 'continuous'}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Titre mobile avec truncate */}
            <h3 className="flex-1 text-xs font-medium truncate text-center min-w-0 px-1">
              {title || pdfInfo?.title || 'Document'}
            </h3>

            {/* Actions mobile avec menu plus */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Actions essentielles toujours visibles */}
              <button
                onClick={rotate}
                className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-200"
                title="Rotation"
              >
                <RotateCw className="h-4 w-4" />
              </button>
              
              <button
                onClick={handleShare}
                className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-200"
                title="Partager"
              >
                <Share2 className="h-4 w-4" />
              </button>
              
              {/* Menu plus pour les autres actions */}
              <div className="relative">
                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-200"
                  title="Plus d'options"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
                
                {showMoreMenu && (
                  <div className="absolute right-0 top-10 z-50 min-w-[180px] bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <button
                      onClick={() => {
                        setViewMode(viewMode === 'single' ? 'continuous' : 'single');
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                    >
                      {viewMode === 'single' ? <Layers className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                      {viewMode === 'single' ? 'Scroll continu' : 'Page unique'}
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowThumbnails(!showThumbnails);
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Grid3X3 className="h-4 w-4" />
                      Vignettes
                    </button>
                    
                    <button
                      onClick={() => {
                        handleDownload();
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Télécharger
                    </button>
                    
                    <button
                      onClick={() => {
                        handlePrint();
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Printer className="h-4 w-4" />
                      Imprimer
                    </button>
                  </div>
                )}
              </div>
              
              {onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Contenu PDF mobile */}
        <div 
          ref={(el) => {
            containerRef.current = el;
            if (el) {
              pinchRef.current = el;
              swipeRef.current = el;
            }
          }}
          className="flex-1 overflow-auto"
          style={{ touchAction: isPinching ? 'none' : 'auto' }}
        >
          {isPinching && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {Math.round(pinchZoom)}%
            </div>
          )}

          {isClientSide && Document && Page && (
            <Document
              file={src}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={loadingComponent}
              error={errorComponent}
              className={viewMode === 'single' ? 'flex justify-center p-4' : 'p-4'}
              options={documentOptions}
            >
              {viewMode === 'single' ? (
                <div className="shadow-xl rounded-lg overflow-hidden bg-white">
                  <Page
                    pageNumber={currentPage}
                    width={windowWidth - 16}
                    rotate={rotation}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="pdf-page"
                    loading={pageLoadingComponent}
                  />
                </div>
              ) : (
                <>
                  {Array.from({ length: numPages }, (_, i) => i + 1).map(pageNum => (
                    <div 
                      key={`page-${pageNum}`}
                      className="shadow-lg rounded-lg overflow-hidden bg-white mb-3"
                    >
                      <Page
                        pageNumber={pageNum}
                        width={windowWidth - 16}
                        rotate={rotation}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="pdf-page"
                        loading={pageLoadingComponent}
                      />
                    </div>
                  ))}
                </>
              )}
            </Document>
          )}
        </div>

        {/* Navigation bar mobile */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {currentPage}/{numPages}
            </span>
            <div className="flex-1 relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-secondary transition-all duration-300"
                style={{ width: `${(currentPage / numPages) * 100}%` }}
              />
              <input
                type="range"
                min="1"
                max={numPages}
                value={currentPage}
                onChange={(e) => goToPage(parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={viewMode === 'continuous'}
              />
            </div>
            <div className="flex gap-1">
              <button
                onClick={handleDownload}
                className="h-8 w-8 p-0 rounded-lg hover:bg-purple-50 text-gray-600 hover:text-purple-600 transition-all duration-200"
                title="Télécharger"
              >
                <Download className="h-4 w-4 mx-auto" />
              </button>
              <button
                onClick={handleShare}
                className="h-8 w-8 p-0 rounded-lg hover:bg-purple-50 text-gray-600 hover:text-purple-600 transition-all duration-200"
                title="Partager"
              >
                <Share2 className="h-4 w-4 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // UI desktop complète
  return (
    <div className={cn("flex flex-col h-full bg-gray-50 dark:bg-gray-900", className)}>
      {/* Toolbar amélioré avec responsive */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-2 md:px-4 py-2 md:py-3 gap-2">
          {/* Navigation - toujours visible */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={previousPage}
              disabled={currentPage <= 1}
              className="h-8 w-8 p-0 md:px-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="1"
                max={numPages}
                value={currentPage}
                onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                className="w-10 md:w-12 px-1 py-1 text-xs md:text-sm text-center border rounded"
              />
              <span className="text-xs md:text-sm text-gray-500 whitespace-nowrap">/ {numPages || '-'}</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextPage}
              disabled={currentPage >= numPages}
              className="h-8 w-8 p-0 md:px-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Titre - avec truncate adaptatif */}
          <div className="flex-1 min-w-0 px-2">
            <h3 className="text-xs md:text-sm font-medium truncate text-center">
              {title || pdfInfo?.title || 'Document PDF'}
            </h3>
          </div>

          {/* Actions - responsive avec priorités */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Zoom - visible sur desktop, compact sur mobile */}
            <div className="hidden sm:flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={zoomOut}
                disabled={zoom <= MIN_ZOOM}
                className="h-8 w-8 p-0"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <select
                value={zoom}
                onChange={(e) => setZoomLevel(parseInt(e.target.value))}
                className="px-1 py-1 text-xs border rounded w-16"
              >
                {ZOOM_LEVELS.map(level => (
                  <option key={`zoom-level-${level}`} value={level}>{level}%</option>
                ))}
              </select>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={zoomIn}
                disabled={zoom >= MAX_ZOOM}
                className="h-8 w-8 p-0"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            {/* Zoom mobile avec boutons compacts */}
            <div className="sm:hidden flex items-center gap-1">
              <button
                onClick={zoomOut}
                disabled={zoom <= MIN_ZOOM}
                className="h-7 w-7 p-0 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                <ZoomOut className="h-3 w-3 mx-auto" />
              </button>
              <span className="text-xs text-gray-600 min-w-[35px] text-center">{zoom}%</span>
              <button
                onClick={zoomIn}
                disabled={zoom >= MAX_ZOOM}
                className="h-7 w-7 p-0 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                <ZoomIn className="h-3 w-3 mx-auto" />
              </button>
            </div>

            <div className="hidden md:block w-px h-6 bg-gray-200 dark:bg-gray-700" />

            {/* Modes de vue - visibles sur tablette et plus */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setViewMode('single')}
                className={cn(
                  "h-8 w-8 p-0 rounded-lg transition-all duration-200",
                  viewMode === 'single' 
                    ? "bg-gradient-to-br from-secondary/10 to-purple-600/10 text-purple-700 shadow-sm backdrop-blur-sm border border-purple-200/30" 
                    : "hover:bg-gray-100 text-gray-600"
                )}
                title="Page unique"
              >
                <Square className="h-4 w-4" />
              </button>

              <button
                onClick={() => setViewMode('continuous')}
                className={cn(
                  "h-8 w-8 p-0 rounded-lg transition-all duration-200",
                  viewMode === 'continuous' 
                    ? "bg-gradient-to-br from-secondary/10 to-purple-600/10 text-purple-700 shadow-sm backdrop-blur-sm border border-purple-200/30" 
                    : "hover:bg-gray-100 text-gray-600"
                )}
                title="Scroll continu"
              >
                <Layers className="h-4 w-4" />
              </button>

              {!isTouchDevice && (
                <button
                  onClick={() => setViewMode('double')}
                  className={cn(
                    "h-8 w-8 p-0 rounded-lg transition-all duration-200",
                    viewMode === 'double' 
                      ? "bg-gradient-to-br from-secondary/10 to-purple-600/10 text-purple-700 shadow-sm backdrop-blur-sm border border-purple-200/30" 
                      : "hover:bg-gray-100 text-gray-600"
                  )}
                  title="Double page"
                >
                  <Columns2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="hidden md:block w-px h-6 bg-gray-200 dark:bg-gray-700" />

            {/* Actions principales avec menu plus pour écrans étroits */}
            <button
              onClick={() => {
                if (fitMode === 'width') {
                  setFitMode('none');
                  setZoom(100);
                } else {
                  fitToWidth();
                }
              }}
              className={cn(
                "h-8 w-8 p-0 rounded-lg transition-all duration-200 hidden lg:block",
                fitMode === 'width'
                  ? "bg-gradient-to-br from-secondary/10 to-purple-600/10 text-purple-700 shadow-sm backdrop-blur-sm border border-purple-200/30"
                  : "hover:bg-gray-100 text-gray-600"
              )}
              title={fitMode === 'width' ? "Taille réelle" : "Adapter à la largeur"}
            >
              <Maximize2 className="h-4 w-4" />
            </button>

            {/* Rotation - toujours visible */}
            <button
              onClick={rotate}
              className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-200"
              title="Rotation"
            >
              <RotateCw className="h-4 w-4" />
            </button>

            {/* Vignettes - toujours visible */}
            <button
              onClick={() => {
                setShowThumbnails(!showThumbnails);
                if (fitMode === 'width') {
                  setFitMode('page');
                  setTimeout(() => setFitMode('width'), 10);
                }
              }}
              className={cn(
                "h-8 w-8 p-0 rounded-lg transition-all duration-200",
                showThumbnails 
                  ? "bg-gradient-to-br from-secondary/10 to-purple-600/10 text-purple-700 shadow-sm backdrop-blur-sm border border-purple-200/30" 
                  : "hover:bg-gray-100 text-gray-600"
              )}
              title="Vignettes"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-200 hidden xl:block"
              title="Plein écran"
            >
              <Maximize className="h-4 w-4" />
            </button>

            <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-gray-700" />

            {/* Actions prioritaires */}
            {enableShare && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="h-8 w-8 p-0"
                title="Partager"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            )}

            {enableDownload && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="h-8 w-8 p-0"
                title="Télécharger"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}

            {/* Menu plus pour tablette et desktop étroit */}
            <div className="relative lg:hidden">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-200"
                title="Plus d'options"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
              
              {showMoreMenu && (
                <div className="absolute right-0 top-10 z-50 min-w-[160px] bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  {enablePrint && (
                    <button
                      onClick={() => {
                        handlePrint();
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Printer className="h-4 w-4" />
                      Imprimer
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      if (fitMode === 'width') {
                        setFitMode('none');
                        setZoom(100);
                      } else {
                        fitToWidth();
                      }
                      setShowMoreMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Maximize2 className="h-4 w-4" />
                    {fitMode === 'width' ? 'Taille réelle' : 'Adapter largeur'}
                  </button>
                  
                  <button
                    onClick={() => {
                      toggleFullscreen();
                      setShowMoreMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Maximize className="h-4 w-4" />
                    Plein écran
                  </button>
                </div>
              )}
            </div>

            {/* Print - visible sur grand écran */}
            {enablePrint && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrint}
                className="h-8 w-8 p-0 hidden lg:block"
                title="Imprimer"
              >
                <Printer className="h-4 w-4" />
              </Button>
            )}

            {onClose && (
              <>
                <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-gray-700" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Contenu principal avec sidebar optionnelle */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Vignettes avec transition */}
        <AnimatePresence>
          {showThumbnails && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 180, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-y-auto"
            >
              <div className="p-2 space-y-2">
                {numPages > 0 && Array.from({ length: numPages }, (_, i) => i + 1).map(page => (
                  <div
                    key={page}
                    onClick={() => goToPage(page)}
                    className={cn(
                      "cursor-pointer border-2 rounded-lg overflow-hidden transition-all hover:scale-105",
                      currentPage === page 
                        ? "border-secondary shadow-lg ring-2 ring-secondary/20" 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className="relative">
                      <Document file={src} loading={null} error={null} options={documentOptions}>
                        <Page
                          pageNumber={page}
                          width={140}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </Document>
                      <div className={cn(
                        "absolute bottom-0 left-0 right-0 px-2 py-1 text-xs text-center font-medium",
                        currentPage === page
                          ? "bg-secondary text-white"
                          : "bg-gray-900/70 text-white"
                      )}>
                        Page {page}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zone PDF */}
        <div 
          ref={(el) => {
            containerRef.current = el;
            if (el) {
              pinchRef.current = el;
              swipeRef.current = el;
            }
          }}
          className="flex-1 overflow-auto p-4 relative"
          style={{
            background: 'radial-gradient(circle at center, colors.glass.white[10] 0%, transparent 70%)',
            touchAction: isPinching ? 'none' : 'auto'
          }}
        >
          {/* Indicateur de zoom pendant le pinch */}
          {isPinching && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {Math.round(pinchZoom)}%
            </div>
          )}
          {loading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-secondary" />
                <p className="text-sm text-gray-500">Chargement du document...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {isClientSide && Document && Page && (
            <Document
              key={`doc-${refreshKey}`} // Use refreshKey instead
              file={src}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={loadingComponent}
              error={errorComponent}
              className="flex flex-col items-center gap-4"
              options={documentOptions}
            >
              {viewMode === 'single' ? (
                // Mode page unique
                <div className="shadow-2xl rounded-lg overflow-hidden bg-white">
                  <Page
                    pageNumber={currentPage}
                    width={getPageWidth()}
                    rotate={rotation}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="pdf-page"
                    loading={pageLoadingComponent}
                  />
                </div>
              ) : viewMode === 'continuous' ? (
                // Mode continu - toutes les pages
                <>
                  {numPages > 0 && Array.from({ length: numPages }, (_, i) => i + 1).map(pageNum => (
                    <div 
                      key={`page-${pageNum}`}
                      id={`page-${pageNum}`}
                      className="shadow-lg rounded-lg overflow-hidden bg-white mb-4"
                    >
                      <Page
                        pageNumber={pageNum}
                        width={getPageWidth()}
                        rotate={rotation}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="pdf-page"
                        loading={pageLoadingComponent}
                      />
                    </div>
                  ))}
                </>
              ) : (
                // Mode double page
                <div className="flex gap-4">
                  <div className="shadow-2xl rounded-lg overflow-hidden bg-white">
                    <Page
                      pageNumber={currentPage}
                      width={getPageWidth() || undefined}
                      rotate={rotation}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="pdf-page"
                      loading={pageLoadingComponent}
                    />
                  </div>
                  {currentPage < numPages && (
                    <div className="shadow-2xl rounded-lg overflow-hidden bg-white">
                      <Page
                        pageNumber={currentPage + 1}
                        width={getPageWidth() || undefined}
                        rotate={rotation}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="pdf-page"
                        loading={pageLoadingComponent}
                      />
                    </div>
                  )}
                </div>
              )}
            </Document>
          )}
        </div>
      </div>

      {/* Barre de statut avec navigation tactile sur mobile */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        {isTouchDevice && viewMode === 'single' && (
          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {currentPage}/{numPages}
              </span>
              <div className="flex-1 relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-secondary transition-all duration-300"
                  style={{ width: `${(currentPage / numPages) * 100}%` }}
                />
                <input
                  type="range"
                  min="1"
                  max={numPages}
                  value={currentPage}
                  onChange={(e) => goToPage(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <span className="text-xs text-gray-500">
                {Math.round(zoom)}%
              </span>
            </div>
          </div>
        )}
        
        {!isTouchDevice && (
          <div className="px-4 py-2 text-xs text-gray-500 flex justify-between">
            <div>
              {pdfInfo && (
                <span>
                  {pdfInfo.author && `Auteur: ${pdfInfo.author} • `}
                  {pdfInfo.creationDate && `Créé le: ${new Date(pdfInfo.creationDate).toLocaleDateString()} • `}
                  Taille: {numPages} pages
                </span>
              )}
            </div>
            <div>
              Zoom: {zoom}% • Page {currentPage}/{numPages}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Export avec protection SSR
const DocumentViewerPDF = typeof window !== 'undefined' ? DocumentViewerPDFComponent : () => null;

export default DocumentViewerPDF;