import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FileText, Image as ImageIcon, Download, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { DocumentViewerContentProps, DocumentFileType } from '@/types/document-viewer'

/**
 * Composant pour afficher le contenu d'un document selon son type
 * Gère PDF, images et fichiers non supportés avec états loading/error
 */
export const DocumentViewerContent: React.FC<DocumentViewerContentProps> = ({
  fileType,
  src,
  title,
  zoomLevel = 100,
  currentPage = 1,
  loading = false,
  error = null,
  onZoomChange,
  onPageChange,
  className
}) => {
  const [imageError, setImageError] = useState(false)
  const [isPanning, setIsPanning] = useState(false)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Gestion du zoom par pincement (mobile)
  const handlePinchZoom = useCallback((scale: number) => {
    if (onZoomChange) {
      const newZoom = Math.max(50, Math.min(200, zoomLevel * scale))
      onZoomChange(newZoom)
    }
  }, [zoomLevel, onZoomChange])

  // Gestion du pan pour les images zoomées
  const handlePanStart = () => {
    setIsPanning(true)
  }

  const handlePanEnd = () => {
    setIsPanning(false)
  }

  // États de chargement avec skeleton
  if (loading) {
    return (
      <div className={cn(
        "flex-1 flex items-center justify-center p-8",
        className
      )}>
        <LoadingSkeleton fileType={fileType} />
      </div>
    )
  }

  // États d'erreur
  if (error) {
    return (
      <div className={cn(
        "flex-1 flex items-center justify-center p-8",
        className
      )}>
        <ErrorState error={error} onRetry={() => window.location.reload()} />
      </div>
    )
  }

  // Aucun document
  if (!src) {
    return (
      <div className={cn(
        "flex-1 flex items-center justify-center p-8",
        className
      )}>
        <EmptyState />
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full h-full",
        className
      )}
    >
      {/* Rendu selon le type de fichier */}
      {fileType === 'pdf' && (
        <PDFContent 
          src={src} 
          title={title}
          zoomLevel={zoomLevel}
          currentPage={currentPage}
        />
      )}
      
      {fileType === 'image' && (
        <ImageContent 
          src={src} 
          title={title}
          zoomLevel={zoomLevel}
          onImageError={() => setImageError(true)}
          onPinchZoom={handlePinchZoom}
          panOffset={panOffset}
          onPanStart={handlePanStart}
          onPanEnd={handlePanEnd}
          isPanning={isPanning}
        />
      )}
      
      {fileType === 'unsupported' && (
        <UnsupportedContent src={src} title={title} />
      )}
    </div>
  )
}

/**
 * Composant pour afficher les PDF
 */
const PDFContent: React.FC<{
  src: string
  title?: string
  zoomLevel: number
  currentPage: number
}> = ({ src, title, zoomLevel, currentPage }) => {
  // Si on a un vrai PDF, on l'affiche dans un iframe
  if (src && (src.endsWith('.pdf') || src.includes('pdf'))) {
    return (
      <div className="w-full h-full relative">
        {/* Effet de bordure Liquid Glass */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/10 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/10 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/10 to-transparent" />
        </div>
        <iframe
          src={src}
          className="w-full h-full border-0"
          title={title || 'Document PDF'}
        />
      </div>
    )
  }
  
  // Fallback placeholder si pas de src valide
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div 
        className="w-full max-w-4xl bg-white rounded-lg shadow-lg"
        style={{ transform: `scale(${zoomLevel / 100})` }}
      >
        <div className="aspect-[8.5/11] bg-white border border-neutral-200 rounded-lg p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium text-neutral-600">
              PDF Document - Page {currentPage}
            </span>
          </div>
          
          <div className="flex-1 bg-neutral-50 rounded border-2 border-dashed border-neutral-200 flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-500 font-medium">{title || 'Document PDF'}</p>
              <p className="text-sm text-neutral-400 mt-2">
                Aucun document PDF à afficher
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Composant pour afficher les images
 */
const ImageContent: React.FC<{
  src: string
  title?: string
  zoomLevel: number
  onImageError: () => void
  onPinchZoom: (scale: number) => void
  panOffset: { x: number; y: number }
  onPanStart: () => void
  onPanEnd: () => void
  isPanning: boolean
}> = ({ 
  src, 
  title, 
  zoomLevel, 
  onImageError,
  onPinchZoom,
  panOffset,
  onPanStart,
  onPanEnd,
  isPanning
}) => {
  return (
    <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
      <motion.div
        drag={zoomLevel > 100}
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        onDragStart={onPanStart}
        onDragEnd={onPanEnd}
        className={cn(
          "relative",
          isPanning && "cursor-grabbing",
          zoomLevel > 100 && "cursor-grab"
        )}
        style={{ 
          transform: `scale(${zoomLevel / 100}) translate(${panOffset.x}px, ${panOffset.y}px)`,
          transformOrigin: 'center'
        }}
        whileTap={zoomLevel > 100 ? { cursor: 'grabbing' } : {}}
      >
        <img
          src={src}
          alt={title || 'Document image'}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
          onError={onImageError}
          onDoubleClick={() => onPinchZoom(zoomLevel > 100 ? 0.5 : 1.5)}
          style={{ 
            userSelect: 'none',
            WebkitUserSelect: 'none',
            pointerEvents: zoomLevel > 100 ? 'none' : 'auto'
          }}
        />
      </motion.div>
    </div>
  )
}

/**
 * Composant pour les fichiers non supportés
 */
const UnsupportedContent: React.FC<{
  src: string
  title?: string
}> = ({ src, title }) => {
  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toUpperCase() || 'UNKNOWN'
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="mx-auto w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-xl flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-neutral-400" />
        </div>
        
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          Format de fichier non supporté
        </h3>
        
        <p className="text-neutral-500 dark:text-neutral-400 mb-4">
          Type détecté: <span className="font-medium">.{getFileExtension(title || src)}</span>
        </p>
        
        <p className="text-sm text-neutral-400 mb-6">
          Formats supportés: PDF, JPG, PNG, GIF, WEBP
        </p>
        
        <Button
          variant="default"
          onClick={() => window.open(src, '_blank')}
          className="mb-3"
        >
          <Download className="h-4 w-4 mr-2" />
          Télécharger le fichier
        </Button>
        
        <p className="text-xs text-neutral-400">
          Le fichier sera ouvert dans une nouvelle fenêtre
        </p>
      </div>
    </div>
  )
}

/**
 * État de chargement avec skeleton
 */
const LoadingSkeleton: React.FC<{ fileType: DocumentFileType }> = ({ fileType }) => {
  return (
    <div className="w-full max-w-4xl">
      <div className="animate-pulse">
        {fileType === 'pdf' ? (
          <div className="aspect-[8.5/11] bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
        ) : (
          <div className="aspect-video bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
        )}
      </div>
      <div className="text-center mt-4">
        <div className="inline-flex items-center gap-2 text-neutral-500">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full"
          />
          Chargement du document...
        </div>
      </div>
    </div>
  )
}

/**
 * État d'erreur
 */
const ErrorState: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => {
  return (
    <div className="text-center max-w-md">
      <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mb-4">
        <AlertCircle className="h-8 w-8 text-red-500" />
      </div>
      
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        Impossible de charger le document
      </h3>
      
      <p className="text-neutral-500 dark:text-neutral-400 mb-6">
        {error === 'NETWORK_ERROR' && 'Erreur de connexion réseau'}
        {error === 'LOAD_ERROR' && 'Le fichier est corrompu ou temporairement indisponible'}
        {error === 'PERMISSION_ERROR' && 'Vous n\'avez pas les permissions pour accéder à ce document'}
        {error === 'TIMEOUT_ERROR' && 'Le chargement du document a pris trop de temps'}
        {!['NETWORK_ERROR', 'LOAD_ERROR', 'PERMISSION_ERROR', 'TIMEOUT_ERROR'].includes(error) && error}
      </p>
      
      <div className="flex gap-3 justify-center">
        <Button variant="outline" onClick={onRetry}>
          Réessayer
        </Button>
        <Button variant="ghost" onClick={() => window.history.back()}>
          Retour
        </Button>
      </div>
      
      <p className="text-xs text-neutral-400 mt-4">
        Code erreur: {error}
      </p>
    </div>
  )
}

/**
 * État vide
 */
const EmptyState: React.FC = () => {
  return (
    <div className="text-center max-w-md">
      <div className="mx-auto w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-xl flex items-center justify-center mb-4">
        <ImageIcon className="h-8 w-8 text-neutral-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        Aucun document disponible
      </h3>
      
      <p className="text-neutral-500 dark:text-neutral-400 mb-6">
        Cette transaction n'a pas encore de pièce justificative associée
      </p>
      
      <Button variant="default">
        Ajouter un document
      </Button>
      
      <p className="text-xs text-neutral-400 mt-4">
        Glissez-déposez ou cliquez pour ajouter
      </p>
    </div>
  )
}