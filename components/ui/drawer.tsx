import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface DrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
}

interface DrawerContentProps {
  children: React.ReactNode
  className?: string
  showCloseButton?: boolean
  onClose?: () => void
  side?: 'left' | 'right' | 'top' | 'bottom'
}

interface DrawerOverlayProps {
  className?: string
  onClick?: () => void
}

interface DrawerHeaderProps {
  children: React.ReactNode
  className?: string
}

interface DrawerTitleProps {
  children: React.ReactNode
  className?: string
}

const Drawer: React.FC<DrawerProps> = ({ open, onOpenChange, children, side = 'right' }) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [open, onOpenChange])

  return (
    <AnimatePresence mode="wait">
      {open && (
        <div className="fixed inset-0 z-50">
          {React.Children.map(children, child => 
            React.isValidElement(child) 
              ? React.cloneElement(child, { side } as any)
              : child
          )}
        </div>
      )}
    </AnimatePresence>
  )
}

const DrawerOverlay: React.FC<DrawerOverlayProps> = ({ className, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "fixed inset-0 bg-black/50 backdrop-blur-sm",
        className
      )}
      onClick={onClick}
    />
  )
}

const DrawerContent: React.FC<DrawerContentProps> = ({ 
  children, 
  className, 
  showCloseButton = true,
  onClose,
  side = 'right'
}) => {
  const slideVariants = {
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' }
    },
    left: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' }
    },
    top: {
      initial: { y: '-100%' },
      animate: { y: 0 },
      exit: { y: '-100%' }
    },
    bottom: {
      initial: { y: '100%' },
      animate: { y: 0 },
      exit: { y: '100%' }
    }
  }

  const getPositionClasses = (side: string) => {
    switch (side) {
      case 'left':
        return 'left-0 top-0 h-full w-80 max-w-[80vw]'
      case 'right':
        return 'right-0 top-0 h-full w-80 max-w-[80vw]'
      case 'top':
        return 'top-0 left-0 w-full h-80 max-h-[80vh]'
      case 'bottom':
        return 'bottom-0 left-0 w-full h-80 max-h-[80vh]'
      default:
        return 'right-0 top-0 h-full w-80 max-w-[80vw]'
    }
  }

  return (
    <>
      <DrawerOverlay onClick={onClose} />
      <motion.div
        initial={slideVariants[side].initial}
        animate={slideVariants[side].animate}
        exit={slideVariants[side].exit}
        transition={{ 
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
        className={cn(
          "fixed z-50",
          getPositionClasses(side),
          "bg-white dark:bg-neutral-900",
          "border-l border-neutral-200 dark:border-neutral-700",
          "shadow-xl",
          "flex flex-col",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && onClose && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute top-4 right-4 z-10 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {children}
      </motion.div>
    </>
  )
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "flex flex-col space-y-1.5 px-6 py-4 border-b border-neutral-200 dark:border-neutral-700",
      className
    )}>
      {children}
    </div>
  )
}

const DrawerTitle: React.FC<DrawerTitleProps> = ({ children, className }) => {
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
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerOverlay
}