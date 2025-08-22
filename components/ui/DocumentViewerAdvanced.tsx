'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import DocumentViewerPDF from './DocumentViewerPDFWrapper';
import { Dialog, DialogContent } from './dialog';
import { Sheet, SheetContent } from './sheet';
import { 
  FileText, 
  X
} from 'lucide-react';

export type ViewerMode = 'auto' | 'modal' | 'sheet';
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DocumentViewerAdvancedProps {
  // Document
  src: string;
  title?: string;
  fileType?: 'pdf' | 'image' | 'document';
  
  // État
  open: boolean;
  onOpenChange: (open: boolean) => void;
  
  // Mode d'affichage
  mode?: ViewerMode;
  preferredMode?: ViewerMode;
  allowModeSwitch?: boolean;
  
  // Options
  enableAnnotations?: boolean;
  enableDownload?: boolean;
  enablePrint?: boolean;
  enableShare?: boolean;
  
  // Callbacks
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onPageChange?: (page: number) => void;
  onAnnotate?: (annotation: any) => void;
  
  // Style
  className?: string;
  glassMorphism?: boolean;
}

// Breakpoints responsive
const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280
};

// Détection du type d'appareil
const getDeviceType = (): DeviceType => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < BREAKPOINTS.mobile) return 'mobile';
  if (width < BREAKPOINTS.tablet) return 'tablet';
  return 'desktop';
};

// Configuration optimale par appareil
const DEVICE_CONFIGS = {
  mobile: {
    defaultMode: 'sheet' as ViewerMode,
    animation: { type: 'spring', damping: 25, stiffness: 300 },
    gestures: true,
    compactUI: true
  },
  tablet: {
    defaultMode: 'modal' as ViewerMode,
    animation: { type: 'spring', damping: 20, stiffness: 250 },
    gestures: true,
    compactUI: false
  },
  desktop: {
    defaultMode: 'modal' as ViewerMode,
    animation: { type: 'spring', damping: 30, stiffness: 400 },
    gestures: false,
    compactUI: false
  }
};

export const DocumentViewerAdvanced: React.FC<DocumentViewerAdvancedProps> = ({
  src,
  title,
  fileType = 'pdf',
  open,
  onOpenChange,
  mode = 'auto',
  preferredMode,
  allowModeSwitch = true,
  enableAnnotations = true,
  enableDownload = true,
  enablePrint = true,
  enableShare = true,
  onLoad,
  onError,
  onPageChange,
  onAnnotate,
  className,
  glassMorphism = true
}) => {
  // États
  const [effectiveMode, setEffectiveMode] = useState<ViewerMode>('modal');
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [preloadedSrc, setPreloadedSrc] = useState<string | null>(null);
  
  // Refs
  const viewerRef = useRef<any>(null);
  
  // Media queries
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mobile}px)`);
  const isTablet = useMediaQuery(`(min-width: ${BREAKPOINTS.mobile}px) and (max-width: ${BREAKPOINTS.tablet}px)`);
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.tablet}px)`);
  
  // Déterminer le mode effectif
  useEffect(() => {
    const device = getDeviceType();
    setDeviceType(device);
    
    if (mode === 'auto') {
      const config = DEVICE_CONFIGS[device];
      setEffectiveMode(preferredMode || config.defaultMode);
    } else {
      setEffectiveMode(mode);
    }
  }, [mode, preferredMode, isMobile, isTablet, isDesktop]);
  
  // Préchargement du document (simplifié pour éviter les conflits)
  useEffect(() => {
    if (src && open) {
      // Utiliser directement le src sans préchargement pour éviter les problèmes
      setPreloadedSrc(src);
      onLoad?.();
    }
    
    return () => {
      // Nettoyage si nécessaire
      if (preloadedSrc && preloadedSrc.startsWith('blob:')) {
        URL.revokeObjectURL(preloadedSrc);
      }
    };
  }, [src, open]);
  
  // Gestionnaire de changement de mode avec animation
  const handleModeChange = useCallback((newMode: ViewerMode) => {
    if (!allowModeSwitch || newMode === effectiveMode) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setEffectiveMode(newMode);
      setIsTransitioning(false);
    }, 300);
  }, [effectiveMode, allowModeSwitch]);
  
  // Rendu du viewer PDF
  const renderViewer = () => {
    // Vérifier si les PDFs sont désactivés en développement
    if (process.env.NEXT_PUBLIC_DISABLE_PDF === 'true') {
      return (
        <div className="h-full flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">DocumentViewer OKÉ</h3>
            <p className="text-sm text-gray-500 mb-4">PDF temporairement désactivé en développement</p>
            <p className="text-xs text-gray-400">Fichier: {title || 'Document'}</p>
            <button 
              onClick={() => onOpenChange(false)}
              className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      );
    }

    return (
      <DocumentViewerPDF
        ref={viewerRef}
        src={preloadedSrc || src}
        title={title}
        enableAnnotations={enableAnnotations}
        enableDownload={enableDownload}
        enablePrint={enablePrint}
        enableShare={enableShare}
        onClose={() => onOpenChange(false)}
        className="h-full"
      />
    );
  };
  
  
  // Effet de transition Liquid Glass
  const glassEffect = glassMorphism ? {
    backdropFilter: 'blur(20px)',
    background: 'colors.glass.white[10]',
    border: '1px solid colors.glass.white[20]',
  } : {};
  
  // Rendu selon le mode
  switch (effectiveMode) {
    case 'modal':
      return (
        <AnimatePresence>
          {open && (
            <Dialog open={open} onOpenChange={onOpenChange}>
              <DialogContent 
                className={cn(
                  "max-w-7xl w-[95vw] h-[90vh] p-0 overflow-hidden",
                  glassMorphism && "bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-white/20",
                  className
                )}
                showCloseButton={false}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={DEVICE_CONFIGS[deviceType].animation}
                  className="relative h-full"
                >
                  {!isTransitioning && renderViewer()}
                </motion.div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      );
    
    case 'sheet':
      return (
        <AnimatePresence>
          {open && (
            <Sheet open={open} onOpenChange={onOpenChange}>
              <SheetContent 
                className={cn(
                  "h-[95vh] p-0",
                  glassMorphism && "bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-white/20",
                  className
                )}
                showCloseButton={false}
                showHandle={true}
                enableSwipeDown={true}
              >
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={DEVICE_CONFIGS[deviceType].animation}
                  className="relative h-full"
                >
                  {!isTransitioning && renderViewer()}
                </motion.div>
              </SheetContent>
            </Sheet>
          )}
        </AnimatePresence>
      );
    
    default:
      return null;
  }
};

// Hook helper pour utiliser le viewer
export const useDocumentViewer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [document, setDocument] = useState<{
    src: string;
    title?: string;
    type?: 'pdf' | 'image' | 'document';
  } | null>(null);
  
  const open = useCallback((doc: typeof document) => {
    setDocument(doc);
    setIsOpen(true);
  }, []);
  
  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setDocument(null), 300);
  }, []);
  
  return {
    isOpen,
    document,
    open,
    close,
    ViewerComponent: (props: Partial<DocumentViewerAdvancedProps>) => (
      <DocumentViewerAdvanced
        open={isOpen}
        onOpenChange={setIsOpen}
        src={document?.src || ''}
        title={document?.title}
        fileType={document?.type}
        {...props}
      />
    )
  };
};

export default DocumentViewerAdvanced;