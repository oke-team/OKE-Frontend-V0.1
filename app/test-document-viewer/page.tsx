'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Image as ImageIcon, File, Play, Settings, Smartphone, Tablet, Monitor } from 'lucide-react'
import { 
  DocumentViewer, 
  useDocumentViewer, 
  Button 
} from '@/components/ui'
import { 
  mockDocuments, 
  mockDocumentScenarios, 
  mockDocumentUtils 
} from '@/lib/mock-data/documents-data'
import { DocumentViewerMode, DocumentAttachment } from '@/types/document-viewer'
import { cn } from '@/lib/utils'

/**
 * Page de démonstration du DocumentViewer
 * Permet de tester tous les modes et fonctionnalités
 */
export default function DocumentViewerTestPage() {
  const documentViewer = useDocumentViewer()
  const [selectedScenario, setSelectedScenario] = useState('multipleDocuments')
  const [forcedMode, setForcedMode] = useState<DocumentViewerMode>('auto')
  const [currentDocuments, setCurrentDocuments] = useState<DocumentAttachment[]>(mockDocuments)

  // Récupération du scénario actuel
  const currentScenario = mockDocumentScenarios[selectedScenario as keyof typeof mockDocumentScenarios]
  const currentDocument = currentDocuments[documentViewer.currentIndex] || currentDocuments[0]

  const handleOpenViewer = (scenarioKey: string) => {
    const scenario = mockDocumentScenarios[scenarioKey as keyof typeof mockDocumentScenarios]
    setCurrentDocuments(scenario.documents)
    setSelectedScenario(scenarioKey)
    documentViewer.open(0)
  }

  const handleDocumentNavigation = (index: number) => {
    documentViewer.navigate(index)
  }

  const handleActions = {
    onDownload: async () => {
      if (currentDocument) {
        await mockDocumentUtils.downloadDocument(currentDocument)
      }
    },
    onPrint: () => {
      if (currentDocument) {
        mockDocumentUtils.printDocument(currentDocument)
      }
    },
    onShare: async () => {
      if (currentDocument) {
        await mockDocumentUtils.shareDocument(currentDocument)
      }
    },
    onCopyLink: async () => {
      if (currentDocument) {
        await mockDocumentUtils.copyDocumentLink(currentDocument)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            DocumentViewer
            <span className="text-primary-500 ml-2">Test Lab</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Testez tous les modes et fonctionnalités du composant DocumentViewer d'OKE.
            Responsive design avec modes auto-détectés selon la taille d'écran.
          </p>
        </motion.div>

        {/* Configuration Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg mb-8"
        >
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuration
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mode Selection */}
            <div>
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Mode d'affichage
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'auto', label: 'Auto-détection', icon: Settings },
                  { value: 'modal', label: 'Modal Desktop', icon: Monitor },
                  { value: 'drawer', label: 'Drawer Tablet', icon: Tablet },
                  { value: 'sheet', label: 'Sheet Mobile', icon: Smartphone }
                ].map((mode) => (
                  <Button
                    key={mode.value}
                    variant={forcedMode === mode.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setForcedMode(mode.value as DocumentViewerMode)}
                    className="justify-start"
                  >
                    <mode.icon className="h-4 w-4 mr-2" />
                    {mode.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Current Document Info */}
            <div>
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Document actuel
              </h3>
              {currentDocument && (
                <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {mockDocumentUtils.getFileIcon(currentDocument)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                        {currentDocument.name}
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {mockDocumentUtils.formatFileSize(currentDocument.size)} • {' '}
                        {mockDocumentUtils.getFileType(currentDocument)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Scenarios Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Object.entries(mockDocumentScenarios).map(([key, scenario], index) => (
            <ScenarioCard
              key={key}
              title={scenario.title}
              description={getScenarioDescription(key)}
              documents={scenario.documents}
              onPlay={() => handleOpenViewer(key)}
              isActive={selectedScenario === key}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Document Collection */}
        {currentDocuments.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Collection de documents ({currentDocuments.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentDocuments.map((doc, index) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  isActive={index === documentViewer.currentIndex}
                  onClick={() => {
                    setCurrentDocuments(currentDocuments)
                    documentViewer.open(index)
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* DocumentViewer Component */}
        <DocumentViewer
          open={documentViewer.open}
          onOpenChange={documentViewer.close}
          mode={forcedMode}
          fileType={currentDocument ? mockDocumentUtils.getFileType(currentDocument) : 'pdf'}
          src={currentDocument?.src}
          title={currentDocument?.name}
          attachments={currentDocuments}
          currentIndex={documentViewer.currentIndex}
          onNavigate={handleDocumentNavigation}
          currentPage={documentViewer.currentPage}
          totalPages={currentDocument?.pageCount || 1}
          onPageChange={documentViewer.setPage}
          zoomLevel={documentViewer.zoomLevel}
          onZoomChange={documentViewer.setZoom}
          loading={documentViewer.loading}
          error={documentViewer.error}
          {...handleActions}
        />
      </div>
    </div>
  )
}

/**
 * Carte pour chaque scénario de test
 */
interface ScenarioCardProps {
  title: string
  description: string
  documents: DocumentAttachment[]
  onPlay: () => void
  isActive: boolean
  delay: number
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({
  title,
  description,
  documents,
  onPlay,
  isActive,
  delay
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn(
        "bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-2",
        isActive 
          ? "border-primary-500 bg-primary-50 dark:bg-primary-950" 
          : "border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
      )}
      onClick={onPlay}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
        <Button
          size="icon-sm"
          variant={isActive ? "default" : "outline"}
          onClick={(e) => {
            e.stopPropagation()
            onPlay()
          }}
        >
          <Play className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        {description}
      </p>

      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
        <span>{documents.length} document{documents.length > 1 ? 's' : ''}</span>
        <span>•</span>
        <span>
          {documents.map(d => mockDocumentUtils.getFileType(d)).join(', ')}
        </span>
      </div>
    </motion.div>
  )
}

/**
 * Carte pour chaque document individuel
 */
interface DocumentCardProps {
  document: DocumentAttachment
  isActive: boolean
  onClick: () => void
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, isActive, onClick }) => {
  const fileType = mockDocumentUtils.getFileType(document)
  
  return (
    <div
      className={cn(
        "relative bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4 cursor-pointer transition-all duration-200 border-2",
        isActive 
          ? "border-primary-500 bg-primary-50 dark:bg-primary-950" 
          : "border-transparent hover:border-neutral-200 dark:hover:border-neutral-600"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">
          {fileType === 'pdf' && <FileText className="h-6 w-6 text-red-500" />}
          {fileType === 'image' && <ImageIcon className="h-6 w-6 text-blue-500" />}
          {fileType === 'unsupported' && <File className="h-6 w-6 text-neutral-400" />}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-neutral-900 dark:text-neutral-100 truncate text-sm">
            {document.name}
          </h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {mockDocumentUtils.formatFileSize(document.size)}
          </p>
          {document.pageCount && document.pageCount > 1 && (
            <p className="text-xs text-neutral-400">
              {document.pageCount} pages
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Descriptions des scénarios de test
 */
function getScenarioDescription(scenarioKey: string): string {
  const descriptions = {
    singlePDF: "Test avec un seul document PDF multi-pages. Parfait pour tester la navigation entre pages et les contrôles de zoom.",
    singleImage: "Test avec une seule image. Idéal pour valider les fonctionnalités de zoom et pan sur les images.",
    unsupportedDocument: "Test avec un fichier Excel non supporté. Vérifie l'affichage de l'état de fallback.",
    multipleDocuments: "Collection complète avec PDF, images et documents non supportés. Test de navigation entre documents.",
    imageGallery: "Galerie d'images uniquement. Parfait pour tester l'expérience de navigation dans une collection d'images.",
    loading: "État de chargement avec skeleton. Simule l'attente pendant le chargement d'un document.",
    error: "État d'erreur réseau. Teste l'affichage des messages d'erreur et les options de récupération."
  }
  
  return descriptions[scenarioKey as keyof typeof descriptions] || "Scénario de test"
}