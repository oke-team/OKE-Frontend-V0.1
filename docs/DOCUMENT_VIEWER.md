# 📄 DocumentViewer OKÉ - Guide Complet

## ⚠️ RÈGLE ABSOLUE
**TOUJOURS utiliser le DocumentViewer OKÉ pour afficher des documents (PDF, images, etc.)**
**JAMAIS créer un nouveau viewer ou utiliser une autre solution**

## 🎯 Composants Disponibles

### 1. DocumentViewerAdvanced (Principal)
Le composant wrapper intelligent qui s'adapte automatiquement au device.

```typescript
import { DocumentViewerAdvanced, useDocumentViewer } from '@/components/ui/DocumentViewerAdvanced';
```

### 2. DocumentViewerPDF (Core)
Le viewer PDF complet avec toutes les fonctionnalités.

```typescript
import DocumentViewerPDF from '@/components/ui/DocumentViewerPDF';
```

## 🚀 Utilisation Standard

### Méthode 1 : Avec le Hook (Recommandé)
```tsx
import { useDocumentViewer } from '@/components/ui/DocumentViewerAdvanced';

function MyComponent() {
  const { open: openDocument, ViewerComponent } = useDocumentViewer();

  const handleOpenDocument = () => {
    openDocument({
      src: '/documents/facture.pdf',
      title: 'Facture Client',
      type: 'pdf'
    });
  };

  return (
    <>
      <button onClick={handleOpenDocument}>
        Voir la facture
      </button>
      
      {/* Placer le viewer à la fin du composant */}
      <ViewerComponent 
        mode="auto"
        glassMorphism={true}
        enableAnnotations={true}
        enableDownload={true}
        enablePrint={true}
        enableShare={true}
      />
    </>
  );
}
```

### Méthode 2 : Composant Direct
```tsx
import { DocumentViewerAdvanced } from '@/components/ui/DocumentViewerAdvanced';

function MyComponent() {
  const [documentOpen, setDocumentOpen] = useState(false);

  return (
    <DocumentViewerAdvanced
      open={documentOpen}
      onOpenChange={setDocumentOpen}
      src="/documents/facture.pdf"
      title="Facture Client"
      fileType="pdf"
      mode="auto"
      glassMorphism={true}
      enableAnnotations={true}
      enableDownload={true}
      enablePrint={true}
      enableShare={true}
    />
  );
}
```

## 📱 Modes d'Affichage

### Mode `auto` (Recommandé)
S'adapte automatiquement selon l'appareil :
- **Mobile** : Sheet (panneau glissant du bas)
- **Desktop** : Modal (fenêtre centrée)

### Modes Manuels
- `modal` : Force l'affichage en modal
- `sheet` : Force l'affichage en sheet

## ⚙️ Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `src` | string | - | URL du document (requis) |
| `title` | string | 'Document' | Titre affiché dans le header |
| `fileType` | 'pdf' \| 'image' \| 'document' | 'pdf' | Type de document |
| `open` | boolean | false | État d'ouverture |
| `onOpenChange` | (open: boolean) => void | - | Callback de changement d'état |
| `mode` | 'auto' \| 'modal' \| 'sheet' | 'auto' | Mode d'affichage |
| `glassMorphism` | boolean | true | Effet Liquid Glass |
| `enableAnnotations` | boolean | true | Annotations activées |
| `enableDownload` | boolean | true | Bouton télécharger |
| `enablePrint` | boolean | true | Bouton imprimer |
| `enableShare` | boolean | true | Bouton partager |

## 🎨 Fonctionnalités

### Desktop
- ✅ Navigation pages (précédent/suivant)
- ✅ Zoom (boutons +/-, sélecteur, raccourcis clavier)
- ✅ Modes de vue (page unique, scroll continu, double page)
- ✅ Rotation
- ✅ Vignettes latérales
- ✅ Plein écran
- ✅ Téléchargement
- ✅ Impression
- ✅ Partage

### Mobile
- ✅ Navigation tactile (swipe)
- ✅ Pinch-to-zoom
- ✅ Zoom avec boutons compacts
- ✅ Actions essentielles (rotation, partage)
- ✅ Menu "Plus" pour actions secondaires
- ✅ Barre de progression

### Tablette/Desktop Étroit
- ✅ Interface adaptative
- ✅ Menu "Plus" intelligent
- ✅ Toutes les actions importantes visibles

## 🎮 Raccourcis Clavier (Desktop)

| Raccourci | Action |
|-----------|--------|
| `Ctrl/Cmd + =` | Zoom avant |
| `Ctrl/Cmd + -` | Zoom arrière |
| `Ctrl/Cmd + 0` | Zoom 100% |
| `Ctrl/Cmd + P` | Imprimer |
| `Ctrl/Cmd + S` | Télécharger |
| `←` | Page précédente |
| `→` | Page suivante |
| `Home` | Première page |
| `End` | Dernière page |
| `Escape` | Fermer le viewer |

## 📁 Structure des Fichiers

```
/components/ui/
├── DocumentViewerAdvanced.tsx      # Wrapper intelligent
├── DocumentViewerPDF.tsx           # Viewer PDF principal
├── DocumentViewerPDFWrapper.tsx    # Wrapper pour import dynamique
└── DocumentViewerContent.tsx       # Contenu partagé (legacy)
```

## 🔧 Configuration Technique

### PDF.js Worker
Le worker PDF.js est configuré automatiquement :
```javascript
// Fichier: /public/pdf.worker.min.js
// Version: Compatible avec react-pdf
```

### Import Dynamique (SSR)
Le viewer utilise des imports dynamiques pour éviter les erreurs SSR :
```tsx
const Document = dynamic(
  () => import('react-pdf').then(mod => mod.Document),
  { ssr: false }
);
```

## 🚨 Points d'Attention

### À FAIRE
- ✅ Toujours utiliser le hook `useDocumentViewer` pour une intégration simple
- ✅ Placer le `ViewerComponent` à la fin du composant parent
- ✅ Utiliser `mode="auto"` pour l'adaptation automatique
- ✅ Activer `glassMorphism` pour le style Liquid Glass

### À NE PAS FAIRE
- ❌ Ne JAMAIS créer un nouveau viewer
- ❌ Ne JAMAIS utiliser `window.open()` pour les PDFs
- ❌ Ne JAMAIS oublier d'ajouter le `ViewerComponent` après l'avoir initialisé
- ❌ Ne JAMAIS modifier les fichiers du viewer sans comprendre l'architecture

## 💡 Exemples d'Intégration

### Dans une Table Comptable
```tsx
// components/accounting/GeneralLedgerTable.tsx
import { useDocumentViewer } from '@/components/ui/DocumentViewerAdvanced';

export default function GeneralLedgerTable() {
  const { open: openDocument, ViewerComponent } = useDocumentViewer();

  const handleAttachmentClick = (entry: JournalEntry) => {
    if (entry.attachmentUrl) {
      openDocument({
        src: entry.attachmentUrl,
        title: entry.attachmentName || `Pièce jointe - ${entry.label}`,
        type: 'pdf'
      });
    }
  };

  return (
    <>
      {/* Contenu de la table */}
      <button onClick={() => handleAttachmentClick(entry)}>
        <Paperclip />
      </button>
      
      {/* Viewer à la fin */}
      <ViewerComponent mode="auto" />
    </>
  );
}
```

### Dans une Page de Facture
```tsx
// app/accounting/invoice-demo/page.tsx
import { useDocumentViewer } from '@/components/ui/DocumentViewerAdvanced';

export default function InvoicePage() {
  const { open: openViewer, ViewerComponent } = useDocumentViewer();

  return (
    <>
      <button
        onClick={() => openViewer({
          src: '/documents/facture-pennylane.pdf',
          title: 'Facture Pennylane',
          type: 'pdf'
        })}
      >
        Visualiser
      </button>
      
      <ViewerComponent 
        mode="auto"
        glassMorphism={true}
      />
    </>
  );
}
```

## 🎯 Checklist d'Intégration

- [ ] Import du hook `useDocumentViewer`
- [ ] Déclaration du hook dans le composant
- [ ] Appel de `openDocument()` avec les bons paramètres
- [ ] Ajout du `<ViewerComponent />` à la fin
- [ ] Test sur mobile et desktop
- [ ] Vérification des actions (télécharger, partager, etc.)

## 📝 Notes pour les Agents

**IMPORTANT** : Ce DocumentViewer est LA solution officielle OKÉ pour afficher des documents. Il a été soigneusement conçu avec :
- Design Liquid Glass Apple Vision Pro
- Responsive mobile-first
- Animations Framer Motion
- Accessibilité complète
- Performance optimisée

**Ne JAMAIS** :
- Créer un nouveau viewer
- Utiliser une bibliothèque externe
- Modifier l'architecture existante

**TOUJOURS** :
- Utiliser ce viewer pour TOUS les documents
- Suivre les exemples fournis
- Maintenir la cohérence du design system

---

*Document créé le 13/01/2025 - Version 1.0*
*Viewer finalisé et approuvé par l'utilisateur*