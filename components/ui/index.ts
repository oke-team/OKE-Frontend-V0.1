/**
 * Export central pour tous les composants UI d'OKE
 * Permet d'importer facilement les composants depuis un seul endroit
 */

// Composants de base
export { Button, type ButtonProps } from './button'
export { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogOverlay 
} from './dialog'
export { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerOverlay 
} from './drawer'
export { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetOverlay 
} from './sheet'

// Document Viewer
export { 
  DocumentViewer, 
  useDocumentViewer 
} from './DocumentViewer'
export { DocumentViewerContent } from './DocumentViewerContent'
export { DocumentViewerToolbar } from './DocumentViewerToolbar'

// Composants existants OKE
export { CardBase } from './CardBase'
export { Chatbot } from './Chatbot'
export { CompanySelector } from './CompanySelector'
export { CompanySelectorLiquid } from './CompanySelectorLiquid'
export { CompanySelectorMobile } from './CompanySelectorMobile'
export { Dropdown } from './Dropdown'
export { DropdownItem } from './DropdownItem'
export { DropdownLiquid } from './DropdownLiquid'
export { DropdownSection } from './DropdownSection'
export { ExpertModeToggle } from './ExpertModeToggle'
export { MagicActionsButton } from './MagicActionsButton'
export { MobileDropdown } from './MobileDropdown'
export { ModeTooltip } from './ModeTooltip'
export { Onboarding } from './Onboarding'
export { PeriodSelector } from './PeriodSelector'
export { PeriodSelectorLiquid } from './PeriodSelectorLiquid'
export { PeriodSelectorMobile } from './PeriodSelectorMobile'
export { SearchGlobal } from './SearchGlobal'
export { Tooltip } from './Tooltip'
export { TooltipSimple } from './TooltipSimple'
export { TransitionNotification } from './TransitionNotification'

// Types du Document Viewer
export type {
  DocumentViewerProps,
  DocumentViewerToolbarProps,
  DocumentViewerContentProps,
  DocumentAttachment,
  DocumentFileType,
  DocumentViewerMode,
  DocumentViewerRef
} from '../../types/document-viewer'