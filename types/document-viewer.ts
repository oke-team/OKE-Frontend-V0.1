/**
 * Types pour le composant DocumentViewer
 * Définit toutes les interfaces et types utilisés par le viewer de documents
 */

export interface DocumentAttachment {
  id: string
  name: string
  type: string
  size: number
  src: string
  thumbnail?: string
  pageCount?: number
  mimeType?: string
  lastModified?: Date
}

export type DocumentFileType = 'pdf' | 'image' | 'unsupported'

export type DocumentViewerMode = 'auto' | 'modal' | 'drawer' | 'sheet'

export interface DocumentViewerProps {
  /** Contrôle l'ouverture/fermeture du viewer */
  open: boolean
  /** Callback appelé lors du changement d'état open/close */
  onOpenChange: (open: boolean) => void
  /** Mode d'affichage : auto détecte selon la taille d'écran */
  mode?: DocumentViewerMode
  /** Type de fichier pour adapter le rendu */
  fileType?: DocumentFileType
  /** URL source du document principal */
  src?: string
  /** Titre affiché dans la toolbar */
  title?: string
  /** Liste des documents attachés pour navigation */
  attachments?: DocumentAttachment[]
  /** Index du document actuellement affiché */
  currentIndex?: number
  /** Callback appelé lors de la navigation entre documents */
  onNavigate?: (index: number) => void
  /** Page actuelle pour les PDF multi-pages */
  currentPage?: number
  /** Nombre total de pages pour les PDF */
  totalPages?: number
  /** Callback appelé lors du changement de page */
  onPageChange?: (page: number) => void
  /** Niveau de zoom actuel (en pourcentage) */
  zoomLevel?: number
  /** Callback appelé lors du changement de zoom */
  onZoomChange?: (level: number) => void
  /** État de chargement */
  loading?: boolean
  /** État d'erreur */
  error?: string | null
  /** Callbacks pour les actions de la toolbar */
  onDownload?: () => void
  onPrint?: () => void
  onShare?: () => void
  onCopyLink?: () => void
}

export interface DocumentViewerToolbarProps {
  /** Titre du document */
  title?: string
  /** Page actuelle */
  currentPage?: number
  /** Nombre total de pages */
  totalPages?: number
  /** Callback navigation page précédente */
  onPreviousPage?: () => void
  /** Callback navigation page suivante */
  onNextPage?: () => void
  /** Callback navigation vers une page spécifique */
  onGoToPage?: (page: number) => void
  /** Niveau de zoom actuel */
  zoomLevel?: number
  /** Callback zoom out */
  onZoomOut?: () => void
  /** Callback zoom in */
  onZoomIn?: () => void
  /** Callback reset zoom */
  onZoomReset?: () => void
  /** Callback ajuster à la largeur */
  onFitWidth?: () => void
  /** Actions disponibles dans la toolbar */
  actions?: {
    download?: () => void
    print?: () => void
    share?: () => void
    copyLink?: () => void
  }
  /** Callback fermeture du viewer */
  onClose?: () => void
  /** Variante responsive de la toolbar */
  variant?: 'desktop' | 'tablet' | 'mobile'
}

export interface DocumentViewerContentProps {
  /** Type de fichier à afficher */
  fileType: DocumentFileType
  /** URL source du document */
  src?: string
  /** Titre du document */
  title?: string
  /** Niveau de zoom */
  zoomLevel?: number
  /** Page actuelle pour les PDF */
  currentPage?: number
  /** État de chargement */
  loading?: boolean
  /** État d'erreur */
  error?: string | null
  /** Callback pour la gestion du zoom par pincement */
  onZoomChange?: (level: number) => void
  /** Callback pour la navigation par glissement */
  onPageChange?: (page: number) => void
  /** Classe CSS personnalisée */
  className?: string
}

export interface DocumentThumbnailProps {
  /** Document à afficher en thumbnail */
  document: DocumentAttachment
  /** Document actuellement actif */
  isActive?: boolean
  /** Callback au clic sur le thumbnail */
  onClick: () => void
  /** Taille du thumbnail */
  size?: 'sm' | 'md' | 'lg'
}

export interface DocumentNavigationProps {
  /** Liste des documents */
  documents: DocumentAttachment[]
  /** Index du document actuel */
  currentIndex: number
  /** Callback de navigation */
  onNavigate: (index: number) => void
  /** Disposition de la navigation */
  layout?: 'vertical' | 'horizontal'
  /** Affichage des thumbnails */
  showThumbnails?: boolean
}

/** États du viewer */
export type DocumentViewerState = 'loading' | 'ready' | 'error' | 'empty'

/** Paramètres de zoom */
export interface ZoomControls {
  min: number
  max: number
  step: number
  default: number
}

/** Configuration des gestes tactiles */
export interface TouchGestureConfig {
  enablePinchZoom: boolean
  enableSwipeNavigation: boolean
  enablePullToClose: boolean
  swipeThreshold: number
  pinchThreshold: number
}

/** Configuration responsive */
export interface ResponsiveConfig {
  breakpoints: {
    mobile: number
    tablet: number
    desktop: number
  }
  modes: {
    mobile: DocumentViewerMode
    tablet: DocumentViewerMode
    desktop: DocumentViewerMode
  }
}

/** Paramètres d'animation */
export interface AnimationConfig {
  duration: {
    open: number
    close: number
    transition: number
  }
  easing: string
  stagger: number
}

/** Types d'erreur du document viewer */
export type DocumentViewerError = 
  | 'LOAD_ERROR'
  | 'NETWORK_ERROR'
  | 'PERMISSION_ERROR'
  | 'UNSUPPORTED_TYPE'
  | 'CORRUPTED_FILE'
  | 'TIMEOUT_ERROR'

/** Interface pour la gestion des erreurs */
export interface DocumentViewerErrorInfo {
  type: DocumentViewerError
  message: string
  code?: string
  retryable: boolean
}

/** Configuration par défaut */
export const DOCUMENT_VIEWER_DEFAULTS = {
  zoomControls: {
    min: 50,
    max: 200,
    step: 10,
    default: 100,
  } as ZoomControls,
  
  touchGestures: {
    enablePinchZoom: true,
    enableSwipeNavigation: true,
    enablePullToClose: true,
    swipeThreshold: 50,
    pinchThreshold: 0.1,
  } as TouchGestureConfig,
  
  responsive: {
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1280,
    },
    modes: {
      mobile: 'sheet',
      tablet: 'drawer',
      desktop: 'modal',
    },
  } as ResponsiveConfig,
  
  animation: {
    duration: {
      open: 300,
      close: 200,
      transition: 150,
    },
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    stagger: 50,
  } as AnimationConfig,
}

/** Utilitaires de type */
export type DocumentViewerRef = {
  zoomIn: () => void
  zoomOut: () => void
  resetZoom: () => void
  nextPage: () => void
  previousPage: () => void
  goToPage: (page: number) => void
  close: () => void
}