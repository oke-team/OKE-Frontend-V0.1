import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Printer, 
  Share, 
  Link,
  X,
  MoreHorizontal,
  Maximize2,
  RotateCcw
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { DocumentViewerToolbarProps } from '@/types/document-viewer'

/**
 * Toolbar responsive pour le DocumentViewer
 * S'adapte selon le breakpoint (desktop/tablet/mobile) avec groupes d'actions collapsibles
 */
export const DocumentViewerToolbar: React.FC<DocumentViewerToolbarProps> = ({
  title,
  currentPage = 1,
  totalPages = 1,
  onPreviousPage,
  onNextPage,
  onGoToPage,
  zoomLevel = 100,
  onZoomOut,
  onZoomIn,
  onZoomReset,
  onFitWidth,
  actions,
  onClose,
  variant = 'desktop'
}) => {
  const [showMoreActions, setShowMoreActions] = useState(false)
  const [pageInputValue, setPageInputValue] = useState(currentPage.toString())

  const handlePageInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const page = parseInt(pageInputValue)
      if (page >= 1 && page <= totalPages && onGoToPage) {
        onGoToPage(page)
      }
      setPageInputValue(currentPage.toString())
    }
  }

  const handlePageInputBlur = () => {
    setPageInputValue(currentPage.toString())
  }

  // Configuration responsive
  const isDesktop = variant === 'desktop'
  const isTablet = variant === 'tablet'
  const isMobile = variant === 'mobile'

  if (isMobile) {
    return <MobileToolbar 
      title={title}
      currentPage={currentPage}
      totalPages={totalPages}
      onPreviousPage={onPreviousPage}
      onNextPage={onNextPage}
      zoomLevel={zoomLevel}
      onZoomOut={onZoomOut}
      onZoomIn={onZoomIn}
      actions={actions}
      onClose={onClose}
    />
  }

  return (
    <div className={cn(
      "flex items-center justify-between gap-4 px-6 py-4",
      "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm",
      "border-b border-neutral-200 dark:border-neutral-700",
      "min-h-[64px]",
      isTablet && "min-h-[56px] px-4"
    )}>
      {/* Groupe Navigation */}
      <div className="flex items-center gap-2">
        <NavigationGroup
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
          onGoToPage={onGoToPage}
          pageInputValue={pageInputValue}
          setPageInputValue={setPageInputValue}
          onKeyDown={handlePageInput}
          onBlur={handlePageInputBlur}
          variant={variant}
        />
      </div>

      {/* Titre (masqué sur tablet si trop petit) */}
      {title && isDesktop && (
        <div className="flex-1 text-center min-w-0">
          <h2 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 truncate">
            {title}
          </h2>
        </div>
      )}

      {/* Groupe Actions */}
      <div className="flex items-center gap-2">
        {/* Contrôles de zoom */}
        <ZoomGroup
          zoomLevel={zoomLevel}
          onZoomOut={onZoomOut}
          onZoomIn={onZoomIn}
          onZoomReset={onZoomReset}
          onFitWidth={onFitWidth}
          variant={variant}
        />

        {/* Séparateur */}
        <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-1" />

        {/* Actions principales */}
        <ActionsGroup
          actions={actions}
          variant={variant}
          showMoreActions={showMoreActions}
          setShowMoreActions={setShowMoreActions}
        />

        {/* Séparateur */}
        <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-1" />

        {/* Bouton fermer */}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

/**
 * Groupe de navigation avec pages
 */
const NavigationGroup: React.FC<{
  currentPage: number
  totalPages: number
  onPreviousPage?: () => void
  onNextPage?: () => void
  onGoToPage?: (page: number) => void
  pageInputValue: string
  setPageInputValue: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onBlur: () => void
  variant: 'desktop' | 'tablet' | 'mobile'
}> = ({ 
  currentPage, 
  totalPages, 
  onPreviousPage, 
  onNextPage, 
  onGoToPage,
  pageInputValue,
  setPageInputValue,
  onKeyDown,
  onBlur,
  variant 
}) => {
  const isDesktop = variant === 'desktop'

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        disabled={currentPage <= 1}
        onClick={onPreviousPage}
        className="rounded-lg"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {isDesktop ? (
        <div className="flex items-center gap-2 mx-2">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">Page</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={pageInputValue}
            onChange={(e) => setPageInputValue(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            className="w-12 px-2 py-1 text-sm text-center border border-neutral-200 dark:border-neutral-700 rounded bg-transparent focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            sur {totalPages}
          </span>
        </div>
      ) : (
        <div className="mx-2">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {currentPage}/{totalPages}
          </span>
        </div>
      )}

      <Button
        variant="ghost"
        size="icon-sm"
        disabled={currentPage >= totalPages}
        onClick={onNextPage}
        className="rounded-lg"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

/**
 * Groupe de contrôles de zoom
 */
const ZoomGroup: React.FC<{
  zoomLevel: number
  onZoomOut?: () => void
  onZoomIn?: () => void
  onZoomReset?: () => void
  onFitWidth?: () => void
  variant: 'desktop' | 'tablet' | 'mobile'
}> = ({ zoomLevel, onZoomOut, onZoomIn, onZoomReset, onFitWidth, variant }) => {
  const isDesktop = variant === 'desktop'

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onZoomOut}
        disabled={zoomLevel <= 50}
        className="rounded-lg"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>

      {isDesktop && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomReset}
          className="min-w-[60px] text-xs"
        >
          {zoomLevel}%
        </Button>
      )}

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onZoomIn}
        disabled={zoomLevel >= 200}
        className="rounded-lg"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>

      {isDesktop && onFitWidth && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onFitWidth}
          className="text-xs ml-1"
        >
          <Maximize2 className="h-3 w-3 mr-1" />
          Ajuster
        </Button>
      )}
    </div>
  )
}

/**
 * Groupe d'actions avec overflow menu responsive
 */
const ActionsGroup: React.FC<{
  actions?: {
    download?: () => void
    print?: () => void
    share?: () => void
    copyLink?: () => void
  }
  variant: 'desktop' | 'tablet' | 'mobile'
  showMoreActions: boolean
  setShowMoreActions: (show: boolean) => void
}> = ({ actions, variant, showMoreActions, setShowMoreActions }) => {
  const isDesktop = variant === 'desktop'
  const isTablet = variant === 'tablet'

  if (!actions) return null

  const primaryActions = isDesktop 
    ? ['download', 'print', 'share', 'copyLink'] 
    : ['download', 'share']
  
  const secondaryActions = isDesktop 
    ? [] 
    : ['print', 'copyLink']

  const actionIcons = {
    download: Download,
    print: Printer,
    share: Share,
    copyLink: Link
  }

  const actionLabels = {
    download: 'Télécharger',
    print: 'Imprimer',
    share: 'Partager',
    copyLink: 'Copier le lien'
  }

  const renderAction = (actionKey: string, IconComponent: any, withLabel = false) => {
    const handler = actions[actionKey as keyof typeof actions]
    if (!handler) return null

    return (
      <Button
        key={actionKey}
        variant="ghost"
        size={withLabel ? "sm" : "icon-sm"}
        onClick={() => {
          handler()
          console.log(`Action: ${actionKey}`)
        }}
        className="rounded-lg"
      >
        <IconComponent className="h-4 w-4" />
        {withLabel && isDesktop && (
          <span className="ml-1 text-xs">{actionLabels[actionKey as keyof typeof actionLabels]}</span>
        )}
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-1 relative">
      {/* Actions principales toujours visibles */}
      {primaryActions.map(actionKey => {
        const IconComponent = actionIcons[actionKey as keyof typeof actionIcons]
        return renderAction(actionKey, IconComponent, isDesktop)
      })}

      {/* Menu overflow pour actions secondaires */}
      {secondaryActions.length > 0 && (
        <div className="relative">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setShowMoreActions(!showMoreActions)}
            className="rounded-lg"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>

          <AnimatePresence>
            {showMoreActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 z-50"
              >
                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg py-1 min-w-[150px]">
                  {secondaryActions.map(actionKey => {
                    const IconComponent = actionIcons[actionKey as keyof typeof actionIcons]
                    const handler = actions[actionKey as keyof typeof actions]
                    if (!handler) return null

                    return (
                      <button
                        key={actionKey}
                        onClick={() => {
                          handler()
                          setShowMoreActions(false)
                          console.log(`Action: ${actionKey}`)
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <IconComponent className="h-4 w-4" />
                        {actionLabels[actionKey as keyof typeof actionLabels]}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

/**
 * Toolbar optimisée pour mobile avec design thumb-friendly
 */
const MobileToolbar: React.FC<{
  title?: string
  currentPage: number
  totalPages: number
  onPreviousPage?: () => void
  onNextPage?: () => void
  zoomLevel: number
  onZoomOut?: () => void
  onZoomIn?: () => void
  actions?: {
    download?: () => void
    print?: () => void
    share?: () => void
    copyLink?: () => void
  }
  onClose?: () => void
}> = ({ 
  title, 
  currentPage, 
  totalPages, 
  onPreviousPage, 
  onNextPage, 
  zoomLevel, 
  onZoomOut, 
  onZoomIn, 
  actions, 
  onClose 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 shadow-lg pb-[env(safe-area-inset-bottom)]">
      {/* Header compact avec titre */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate flex-1">
            {title || 'Document'}
          </h2>
          <span className="text-xs text-neutral-500 ml-2 font-mono">
            Page {currentPage}/{totalPages}
          </span>
        </div>
      </div>

      {/* Grille d'actions touch-friendly compacte */}
      <div className="grid grid-cols-6 gap-2 p-3">
        {/* Navigation */}
        <Button
          variant="ghost"
          size="icon"
          disabled={currentPage <= 1}
          onClick={onPreviousPage}
          className="h-10 w-full rounded-lg bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          disabled={currentPage >= totalPages}
          onClick={onNextPage}
          className="h-10 w-full rounded-lg bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Zoom */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          disabled={zoomLevel <= 50}
          className="h-10 w-full rounded-lg bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
          disabled={zoomLevel >= 200}
          className="h-10 w-full rounded-lg bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>

        {/* Action principale */}
        {actions?.download && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              actions.download?.()
              console.log('Action: download')
            }}
            className="h-10 w-full rounded-lg bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700"
          >
            <Download className="h-4 w-4" />
          </Button>
        )}

        {/* Fermer */}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-10 w-full rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}