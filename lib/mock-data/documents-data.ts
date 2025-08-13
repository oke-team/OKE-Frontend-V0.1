import { DocumentAttachment } from '@/types/document-viewer'

/**
 * Données mock pour les documents du DocumentViewer
 * Contient 3 exemples : PDF facture, image reçu, document Excel non supporté
 */

export const mockDocuments: DocumentAttachment[] = [
  {
    id: 'doc-001',
    name: 'Facture_2024_001.pdf',
    type: 'application/pdf',
    size: 251658, // 245 KB
    src: '/api/documents/facture-001.pdf', // URL fictive
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJIMTVNOSAxNkgxNU05IDhIMTNNMTcgM0g3QzUuODk1NDMgMyA1IDMuODk1NDMgNSA1VjE5QzUgMjAuMTA0NiA1Ljg5NTQzIDIxIDcgMjFIMTdDMTguMTA0NiAyMSAxOSAyMC4xMDQ2IDE5IDE5VjlMMTcgM1oiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+',
    pageCount: 3,
    mimeType: 'application/pdf',
    lastModified: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: 'doc-002',
    name: 'Reçu_achat_materiel.jpg',
    type: 'image/jpeg',
    size: 1258291, // 1.2 MB
    src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=1000&fit=crop&crop=entropy&auto=format&q=75',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop&crop=entropy&auto=format&q=75',
    pageCount: 1,
    mimeType: 'image/jpeg',
    lastModified: new Date('2024-01-12T14:22:00Z')
  },
  {
    id: 'doc-003',
    name: 'Contrat_service_maintenance.pdf',
    type: 'application/pdf',
    size: 3567104, // 3.4 MB
    src: '/api/documents/contrat-service.pdf', // URL fictive
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJIMTVNOSAxNkgxNU05IDhIMTNNMTcgM0g3QzUuODk1NDMgMyA1IDMuODk1NDMgNSA1VjE5QzUgMjAuMTA0NiA1Ljg5NTQzIDIxIDcgMjFIMTdDMTguMTA0NiAyMSAxOSAyMC4xMDQ2IDE5IDE5VjlMMTcgM1oiIHN0cm9rZT0iIzRjMzRjZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+',
    pageCount: 12,
    mimeType: 'application/pdf',
    lastModified: new Date('2024-01-08T09:15:00Z')
  },
  {
    id: 'doc-004',
    name: 'Devis_renovation_bureau.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 891234, // 890 KB
    src: '/api/documents/devis-renovation.xlsx', // URL fictive - non supporté
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJIMTVNOSAxNkgxNU05IDhIMTNNMTcgM0g3QzUuODk1NDMgMyA1IDMuODk1NDMgNSA1VjE5QzUgMjAuMTA0NiA1Ljg5NTQzIDIxIDcgMjFIMTdDMTguMTA0NiAyMSAxOSAyMC4xMDQ2IDE5IDE5VjlMMTcgM1oiIHN0cm9rZT0iIzZmNmY2ZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+',
    pageCount: undefined,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    lastModified: new Date('2024-01-10T16:45:00Z')
  },
  {
    id: 'doc-005',
    name: 'Photo_produit_nouveau.png',
    type: 'image/png',
    size: 2145678, // 2.1 MB
    src: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop&crop=entropy&auto=format&q=75',
    thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop&crop=entropy&auto=format&q=75',
    pageCount: 1,
    mimeType: 'image/png',
    lastModified: new Date('2024-01-14T11:20:00Z')
  }
]

/**
 * Utilitaires pour travailler avec les documents mock
 */
export const mockDocumentUtils = {
  /**
   * Détermine le type de fichier pour le DocumentViewer
   */
  getFileType: (document: DocumentAttachment) => {
    if (document.mimeType?.startsWith('image/')) {
      return 'image'
    }
    if (document.mimeType === 'application/pdf') {
      return 'pdf'
    }
    return 'unsupported'
  },

  /**
   * Formate la taille du fichier en format lisible
   */
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 B'
    
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
  },

  /**
   * Formate la date de modification
   */
  formatLastModified: (date: Date): string => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  },

  /**
   * Obtient l'icône appropriée selon le type de fichier
   */
  getFileIcon: (document: DocumentAttachment): string => {
    const type = mockDocumentUtils.getFileType(document)
    
    switch (type) {
      case 'pdf':
        return '📄'
      case 'image':
        return '🖼️'
      default:
        return '📁'
    }
  },

  /**
   * Simule le téléchargement d'un document
   */
  downloadDocument: (document: DocumentAttachment): Promise<void> => {
    return new Promise((resolve) => {
      console.log(`📥 Téléchargement de ${document.name} (${mockDocumentUtils.formatFileSize(document.size)})`)
      
      // Simulation d'un délai de téléchargement
      setTimeout(() => {
        console.log(`✅ ${document.name} téléchargé avec succès`)
        resolve()
      }, 1000 + Math.random() * 2000) // 1-3 secondes
    })
  },

  /**
   * Simule l'impression d'un document
   */
  printDocument: (document: DocumentAttachment): void => {
    console.log(`🖨️ Impression de ${document.name}`)
    // En production, ouvrir la boîte de dialogue d'impression
    if (typeof window !== 'undefined') {
      window.print()
    }
  },

  /**
   * Simule le partage d'un document
   */
  shareDocument: async (document: DocumentAttachment): Promise<void> => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: document.name,
          text: `Partage du document: ${document.name}`,
          url: document.src
        })
        console.log(`📤 ${document.name} partagé avec succès`)
      } catch (error) {
        console.log(`❌ Erreur lors du partage: ${error}`)
      }
    } else {
      // Fallback: copie dans le presse-papier
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(document.src)
        console.log(`📋 Lien copié dans le presse-papier: ${document.name}`)
      }
    }
  },

  /**
   * Copie le lien du document dans le presse-papier
   */
  copyDocumentLink: async (document: DocumentAttachment): Promise<void> => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(document.src)
        console.log(`📋 Lien copié: ${document.name}`)
      } catch (error) {
        console.log(`❌ Erreur lors de la copie: ${error}`)
      }
    }
  }
}

/**
 * Générateur de données pour les tests
 */
export const mockDocumentGenerator = {
  /**
   * Génère un document PDF fictif
   */
  generatePDF: (override: Partial<DocumentAttachment> = {}): DocumentAttachment => ({
    id: `pdf-${Date.now()}`,
    name: 'Document.pdf',
    type: 'application/pdf',
    size: 500000,
    src: '/api/documents/generated.pdf',
    pageCount: 5,
    mimeType: 'application/pdf',
    lastModified: new Date(),
    ...override
  }),

  /**
   * Génère une image fictive
   */
  generateImage: (override: Partial<DocumentAttachment> = {}): DocumentAttachment => ({
    id: `img-${Date.now()}`,
    name: 'Image.jpg',
    type: 'image/jpeg',
    size: 1000000,
    src: 'https://picsum.photos/800/600',
    thumbnail: 'https://picsum.photos/200/200',
    pageCount: 1,
    mimeType: 'image/jpeg',
    lastModified: new Date(),
    ...override
  }),

  /**
   * Génère un document non supporté
   */
  generateUnsupported: (override: Partial<DocumentAttachment> = {}): DocumentAttachment => ({
    id: `doc-${Date.now()}`,
    name: 'Document.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 750000,
    src: '/api/documents/document.docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    lastModified: new Date(),
    ...override
  })
}

/**
 * Scénarios de test prédéfinis
 */
export const mockDocumentScenarios = {
  // Scénario 1: Document unique PDF
  singlePDF: {
    documents: [mockDocuments[0]],
    currentIndex: 0,
    title: 'Facture client'
  },

  // Scénario 2: Document unique image
  singleImage: {
    documents: [mockDocuments[1]],
    currentIndex: 0,
    title: 'Justificatif d\'achat'
  },

  // Scénario 3: Document non supporté
  unsupportedDocument: {
    documents: [mockDocuments[3]],
    currentIndex: 0,
    title: 'Devis Excel'
  },

  // Scénario 4: Collection de documents
  multipleDocuments: {
    documents: mockDocuments,
    currentIndex: 0,
    title: 'Documents de la transaction'
  },

  // Scénario 5: Collection d'images
  imageGallery: {
    documents: [mockDocuments[1], mockDocuments[4]],
    currentIndex: 0,
    title: 'Galerie photos'
  },

  // Scénario 6: État de chargement
  loading: {
    documents: [mockDocuments[0]],
    currentIndex: 0,
    loading: true,
    title: 'Chargement...'
  },

  // Scénario 7: État d'erreur
  error: {
    documents: [mockDocuments[0]],
    currentIndex: 0,
    error: 'NETWORK_ERROR',
    title: 'Erreur de chargement'
  }
}