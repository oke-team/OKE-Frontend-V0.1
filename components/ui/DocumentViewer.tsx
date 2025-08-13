import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { 
  DocumentViewerProps, 
  DocumentViewerMode,
  DocumentViewerRef,
  DOCUMENT_VIEWER_DEFAULTS
} from '@/types/document-viewer'
import { Dialog, DialogContent } from './dialog'
import { Drawer, DrawerContent } from './drawer'
import { Sheet, SheetContent } from './sheet'
import { DocumentViewerToolbar } from './DocumentViewerToolbar'
import { DocumentViewerContent } from './DocumentViewerContent'

/**
 * Composant principal DocumentViewer avec détection automatique des modes
 * selon la taille d'écran et gestion complète des documents
 */
export const DocumentViewer = forwardRef<DocumentViewerRef, DocumentViewerProps>(({
  open,
  onOpenChange,
  mode = 'auto',
  fileType = 'pdf',
  src,
  title,
  attachments = [],
  currentIndex = 0,
  onNavigate,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  zoomLevel = 100,
  onZoomChange,
  loading = false,
  error = null,
  onDownload,
  onPrint,
  onShare,
  onCopyLink
}, ref) => {
  // États internes
  const [internalZoomLevel, setInternalZoomLevel] = useState(zoomLevel)
  const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage)
  const [effectiveMode, setEffectiveMode] = useState<DocumentViewerMode>('modal')

  // Hooks pour la détection responsive
  const isMobile = useMediaQuery(`(max-width: ${DOCUMENT_VIEWER_DEFAULTS.responsive.breakpoints.mobile}px)`)
  const isTablet = useMediaQuery(`(max-width: ${DOCUMENT_VIEWER_DEFAULTS.responsive.breakpoints.tablet}px)`)

  // Détection automatique du mode selon la taille d'écran
  useEffect(() => {
    if (mode === 'auto') {
      if (isMobile) {
        setEffectiveMode('sheet')
      } else if (isTablet) {
        setEffectiveMode('drawer')
      } else {
        setEffectiveMode('modal')
      }
    } else {
      setEffectiveMode(mode)
    }
  }, [mode, isMobile, isTablet])

  // Synchronisation des props avec l'état interne
  useEffect(() => {
    setInternalZoomLevel(zoomLevel)
  }, [zoomLevel])

  useEffect(() => {
    setInternalCurrentPage(currentPage)
  }, [currentPage])

  // Fonctions de contrôle du zoom
  const handleZoomIn = useCallback(() => {
    const newZoom = Math.min(DOCUMENT_VIEWER_DEFAULTS.zoomControls.max, internalZoomLevel + DOCUMENT_VIEWER_DEFAULTS.zoomControls.step)
    setInternalZoomLevel(newZoom)
    onZoomChange?.(newZoom)
  }, [internalZoomLevel, onZoomChange])

  const handleZoomOut = useCallback(() => {
    const newZoom = Math.max(DOCUMENT_VIEWER_DEFAULTS.zoomControls.min, internalZoomLevel - DOCUMENT_VIEWER_DEFAULTS.zoomControls.step)
    setInternalZoomLevel(newZoom)
    onZoomChange?.(newZoom)
  }, [internalZoomLevel, onZoomChange])

  const handleZoomReset = useCallback(() => {
    setInternalZoomLevel(DOCUMENT_VIEWER_DEFAULTS.zoomControls.default)
    onZoomChange?.(DOCUMENT_VIEWER_DEFAULTS.zoomControls.default)
  }, [onZoomChange])

  const handleFitWidth = useCallback(() => {
    // Logique pour ajuster à la largeur - placeholder
    setInternalZoomLevel(100)
    onZoomChange?.(100)
  }, [onZoomChange])

  // Fonctions de navigation des pages
  const handlePreviousPage = useCallback(() => {
    if (internalCurrentPage > 1) {
      const newPage = internalCurrentPage - 1
      setInternalCurrentPage(newPage)
      onPageChange?.(newPage)
    }
  }, [internalCurrentPage, onPageChange])

  const handleNextPage = useCallback(() => {
    if (internalCurrentPage < totalPages) {
      const newPage = internalCurrentPage + 1
      setInternalCurrentPage(newPage)
      onPageChange?.(newPage)
    }
  }, [internalCurrentPage, totalPages, onPageChange])

  const handleGoToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setInternalCurrentPage(page)
      onPageChange?.(page)
    }
  }, [totalPages, onPageChange])

  // Navigation entre documents
  const handleDocumentNavigation = useCallback((direction: 'prev' | 'next') => {
    if (!attachments.length || !onNavigate) return

    const newIndex = direction === 'next' 
      ? Math.min(currentIndex + 1, attachments.length - 1)
      : Math.max(currentIndex - 1, 0)
    
    if (newIndex !== currentIndex) {
      onNavigate(newIndex)
      // Reset page et zoom lors du changement de document
      setInternalCurrentPage(1)
      setInternalZoomLevel(DOCUMENT_VIEWER_DEFAULTS.zoomControls.default)
    }
  }, [attachments, currentIndex, onNavigate])

  // Actions de la toolbar
  const toolbarActions = {
    download: onDownload,
    print: onPrint,
    share: onShare,
    copyLink: onCopyLink
  }

  // Gestion des raccourcis clavier
  useEffect(() => {
    if (!open) return

    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          handlePreviousPage()
          break
        case 'ArrowRight':
          e.preventDefault()
          handleNextPage()
          break
        case 'Home':
          e.preventDefault()
          handleGoToPage(1)
          break
        case 'End':
          e.preventDefault()
          handleGoToPage(totalPages)
          break
        case '+':
        case '=':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            handleZoomIn()
          }
          break
        case '-':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            handleZoomOut()
          }
          break
        case '0':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            handleZoomReset()
          }
          break
        case 'p':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            onPrint?.()
          }
          break
        case 's':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            onDownload?.()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [open, handlePreviousPage, handleNextPage, handleGoToPage, handleZoomIn, handleZoomOut, handleZoomReset, totalPages, onPrint, onDownload])

  // API exposée via ref
  useImperativeHandle(ref, () => ({
    zoomIn: handleZoomIn,
    zoomOut: handleZoomOut,
    resetZoom: handleZoomReset,
    nextPage: handleNextPage,
    previousPage: handlePreviousPage,
    goToPage: handleGoToPage,
    close: () => onOpenChange(false)
  }), [handleZoomIn, handleZoomOut, handleZoomReset, handleNextPage, handlePreviousPage, handleGoToPage, onOpenChange])

  // Détermination de la variante de toolbar selon le mode
  const getToolbarVariant = () => {
    if (effectiveMode === 'sheet') return 'mobile'
    if (effectiveMode === 'drawer') return 'tablet'
    return 'desktop'
  }

  // Déterminer le document actuel
  const currentDocument = attachments.length > 0 && currentIndex >= 0 && currentIndex < attachments.length
    ? attachments[currentIndex]
    : null

  const effectiveFileType = currentDocument?.fileType || fileType || 'unsupported'
  const effectiveSrc = currentDocument?.src || src || ''
  const effectiveTitle = currentDocument?.name || title || 'Document'

  // Contenu partagé entre tous les modes
  const renderContent = (includeToolbar = true) => (
    <div className="h-full w-full flex flex-col">
      {includeToolbar && (
        <DocumentViewerToolbar
          title={effectiveTitle}
          currentPage={internalCurrentPage}
          totalPages={totalPages}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          onGoToPage={handleGoToPage}
          zoomLevel={internalZoomLevel}
          onZoomOut={handleZoomOut}
          onZoomIn={handleZoomIn}
          onZoomReset={handleZoomReset}
          onFitWidth={handleFitWidth}
          actions={toolbarActions}
          onClose={() => onOpenChange(false)}
          variant={getToolbarVariant()}
        />
      )}
      
      <DocumentViewerContent
        fileType={effectiveFileType}
        src={effectiveSrc}
        title={effectiveTitle}
        zoomLevel={internalZoomLevel}
        currentPage={internalCurrentPage}
        loading={loading}
        error={error}
        onZoomChange={setInternalZoomLevel}
        onPageChange={setInternalCurrentPage}
        className="flex-1 w-full h-full"
      />
    </div>
  )

  // Rendu selon le mode effectif
  switch (effectiveMode) {
    case 'modal':
      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent 
            className="max-w-7xl w-[95vw] h-[90vh] p-0 flex flex-col"
            showCloseButton={true}
            onClose={() => onOpenChange(false)}
          >
            {renderContent(false)}
          </DialogContent>
        </Dialog>
      )

    case 'drawer':
      return (
        <Drawer open={open} onOpenChange={onOpenChange} side="right">
          <DrawerContent 
            className="w-[70vw] max-w-4xl p-0 flex flex-col h-full"
            showCloseButton={true}
            onClose={() => onOpenChange(false)}
          >
            {renderContent(false)}
          </DrawerContent>
        </Drawer>
      )

    case 'sheet':
      return (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent 
            className="h-[95vh] max-h-[95vh] p-0"
            showCloseButton={true}
            showHandle={true}
            enableSwipeDown={true}
            onClose={() => onOpenChange(false)}
          >
            {renderContent(false)}
          </SheetContent>
        </Sheet>
      )

    default:
      return null
  }
})

DocumentViewer.displayName = 'DocumentViewer'

/**
 * Hook pour faciliter l'utilisation du DocumentViewer
 */
export const useDocumentViewer = () => {
  const [state, setState] = useState({
    open: false,
    currentIndex: 0,
    currentPage: 1,
    zoomLevel: 100,
    loading: false,
    error: null as string | null
  })

  const open = useCallback((index = 0) => {
    setState(prev => ({
      ...prev,
      open: true,
      currentIndex: index,
      currentPage: 1,
      zoomLevel: 100,
      loading: false,
      error: null
    }))
  }, [])

  const close = useCallback(() => {
    setState(prev => ({ ...prev, open: false }))
  }, [])

  const navigate = useCallback((index: number) => {
    setState(prev => ({ ...prev, currentIndex: index, currentPage: 1 }))
  }, [])

  const setPage = useCallback((page: number) => {
    setState(prev => ({ ...prev, currentPage: page }))
  }, [])

  const setZoom = useCallback((zoom: number) => {
    setState(prev => ({ ...prev, zoomLevel: zoom }))
  }, [])

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }))
  }, [])

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }))
  }, [])

  return {
    ...state,
    open: open,
    close,
    navigate,
    setPage,
    setZoom,
    setLoading,
    setError
  }
}