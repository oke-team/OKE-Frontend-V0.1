import React from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface SheetContentProps {
  children: React.ReactNode
  className?: string
  showCloseButton?: boolean
  showHandle?: boolean
  onClose?: () => void
  enableSwipeDown?: boolean
}

interface SheetOverlayProps {
  className?: string
  onClick?: () => void
}

interface SheetHeaderProps {
  children: React.ReactNode
  className?: string
}

interface SheetTitleProps {
  children: React.ReactNode
  className?: string
}

const Sheet: React.FC<SheetProps> = ({ open, onOpenChange, children }) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      // Prévenir le scroll sur mobile
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
      document.body.style.width = 'unset'
    }
  }, [open, onOpenChange])

  return (
    <AnimatePresence mode="wait">
      {open && (
        <div className="fixed inset-0 z-50">
          {children}
        </div>
      )}
    </AnimatePresence>
  )
}

const SheetOverlay: React.FC<SheetOverlayProps> = ({ className, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "fixed inset-0 bg-black/30 backdrop-blur-xl",
        className
      )}
      onClick={onClick}
    />
  )
}

const SheetContent: React.FC<SheetContentProps> = ({ 
  children, 
  className,
  showCloseButton = true,
  showHandle = true,
  onClose,
  enableSwipeDown = true
}) => {
  const [dragY, setDragY] = React.useState(0)

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (enableSwipeDown && info.offset.y > 100) {
      onClose?.()
    } else {
      setDragY(0)
    }
  }

  const handleDrag = (event: any, info: PanInfo) => {
    if (enableSwipeDown && info.offset.y > 0) {
      setDragY(info.offset.y)
    }
  }

  return (
    <>
      <SheetOverlay onClick={onClose} />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: dragY }}
        exit={{ y: '100%' }}
        transition={{ 
          duration: dragY > 0 ? 0 : 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
        drag={enableSwipeDown ? "y" : false}
        dragConstraints={{ top: 0, bottom: 500 }}
        dragElastic={0.1}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl",
          "shadow-2xl",
          "h-[95vh]",
          "border-t border-white/20",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle pour indiquer qu'on peut glisser */}
        {showHandle && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-50">
            <div className="w-10 h-1 bg-gray-500 dark:bg-gray-400 rounded-full" />
          </div>
        )}

        {/* Bouton de fermeture */}
        {showCloseButton && onClose && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute top-3 right-3 z-50 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        {/* Contenu principal */}
        {children}
      </motion.div>
    </>
  )
}

const SheetHeader: React.FC<SheetHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "flex flex-col space-y-1.5 px-6 py-4 border-b border-neutral-200 dark:border-neutral-700",
      className
    )}>
      {children}
    </div>
  )
}

const SheetTitle: React.FC<SheetTitleProps> = ({ children, className }) => {
  return (
    <h2 className={cn(
      "text-lg font-semibold leading-none tracking-tight text-neutral-900 dark:text-neutral-100",
      className
    )}>
      {children}
    </h2>
  )
}

export {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetOverlay
}