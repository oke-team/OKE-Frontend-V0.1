import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContentProps {
  children: React.ReactNode
  className?: string
  showCloseButton?: boolean
  onClose?: () => void
}

interface DialogOverlayProps {
  className?: string
  onClick?: () => void
}

interface DialogHeaderProps {
  children: React.ReactNode
  className?: string
}

interface DialogTitleProps {
  children: React.ReactNode
  className?: string
}

interface DialogDescriptionProps {
  children: React.ReactNode
  className?: string
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {children}
        </div>
      )}
    </AnimatePresence>
  )
}

const DialogOverlay: React.FC<DialogOverlayProps> = ({ className, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "fixed inset-0 bg-black/20 backdrop-blur-2xl",
        className
      )}
      onClick={onClick}
    />
  )
}

const DialogContent: React.FC<DialogContentProps> = ({ 
  children, 
  className, 
  showCloseButton = true,
  onClose 
}) => {
  return (
    <>
      <DialogOverlay onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ 
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
        className={cn(
          "relative z-50 mx-4 w-full max-w-4xl max-h-[90vh] overflow-hidden",
          "bg-white/98 dark:bg-neutral-900/98 backdrop-blur-xl",
          "border border-neutral-200 dark:border-neutral-700",
          "rounded-2xl shadow-xl",
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

const DialogHeader: React.FC<DialogHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "flex flex-col space-y-1.5 px-6 py-4 border-b border-neutral-200 dark:border-neutral-700",
      className
    )}>
      {children}
    </div>
  )
}

const DialogTitle: React.FC<DialogTitleProps> = ({ children, className }) => {
  return (
    <h2 className={cn(
      "text-lg font-semibold leading-none tracking-tight text-neutral-900 dark:text-neutral-100",
      className
    )}>
      {children}
    </h2>
  )
}

const DialogDescription: React.FC<DialogDescriptionProps> = ({ children, className }) => {
  return (
    <p className={cn(
      "text-sm text-neutral-500 dark:text-neutral-400",
      className
    )}>
      {children}
    </p>
  )
}

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay
}