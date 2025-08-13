# Wireframes DocumentViewer - OKE Dashboard

## Vue d'ensemble
Le composant DocumentViewer permet la visualisation de documents comptables (PDF, images) avec trois modes d'affichage adaptés selon le contexte et le device.

---

## 1. DESKTOP - MODE MODAL (Plein écran)

### Wireframe Principal
```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           Modal Overlay (backdrop blur)                       │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │                         TOOLBAR (64px height)                           │ │
│ │ ┌─────────────────────────────────────────────────────────────────────┐│ │
│ │ │ [←][→]  Page 1/10  │  [−][100%][+]  │  [↓][🖨][📤][🔗]  │    [✕]    ││ │
│ │ └─────────────────────────────────────────────────────────────────────┘│ │
│ ├────────────────────────────────────────────────────────────────────────┤ │
│ │                                                                          │ │
│ │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│ │  │                                                                  │  │ │
│ │  │                                                                  │  │ │
│ │  │                                                                  │  │ │
│ │  │                                                                  │  │ │
│ │  │                      DOCUMENT CONTENT AREA                      │  │ │
│ │  │                                                                  │  │ │
│ │  │                     (Centered, max-width: 900px)                │  │ │
│ │  │                                                                  │  │ │
│ │  │                           Scrollable                            │  │ │
│ │  │                                                                  │  │ │
│ │  │                                                                  │  │ │
│ │  │                                                                  │  │ │
│ │  └──────────────────────────────────────────────────────────────────┘  │ │
│ │                                                                          │ │
│ │              ┌──────────┐  ┌──────────┐  ┌──────────┐                  │ │
│ │              │ Thumb 1  │  │ Thumb 2  │  │ Thumb 3  │                  │ │
│ │              └──────────┘  └──────────┘  └──────────┘                  │ │
│ │                    Thumbnails Navigation (optional)                     │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Toolbar Détaillée - Desktop Modal
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Navigation          Zoom              Actions            Close             │
│ ┌──────────────┐ ┌─────────────┐ ┌──────────────────┐ ┌────────┐          │
│ │ [◀] [▶]      │ │ [−] 100% [+]│ │ [↓] [🖨] [📤] [🔗]│ │   [✕]  │          │
│ │ Page 3 / 10  │ │  Fit Width  │ │                  │ │        │          │
│ └──────────────┘ └─────────────┘ └──────────────────┘ └────────┘          │
│     180px           200px              240px              80px              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### États Multi-documents
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Document Navigation Sidebar (200px)  │         Main Viewer Area             │
│ ┌───────────────────────────────────┐│┌────────────────────────────────────┐│
│ │ Documents (3)                    ▼││                                      ││
│ ├───────────────────────────────────┤│                                      ││
│ │ ┌─────────────────────────────┐  ││                                      ││
│ │ │ 📄 Facture_2024_001.pdf    │  ││                                      ││
│ │ │     3 pages • 245 KB       │  ││       Current Document Display       ││
│ │ └─────────────────────────────┘  ││                                      ││
│ │ ┌─────────────────────────────┐  ││                                      ││
│ │ │ 🖼 Reçu_achat.jpg  [Active] │  ││                                      ││
│ │ │     1 page • 1.2 MB         │  ││                                      ││
│ │ └─────────────────────────────┘  ││                                      ││
│ │ ┌─────────────────────────────┐  ││                                      ││
│ │ │ 📄 Contrat_service.pdf      │  ││                                      ││
│ │ │     12 pages • 3.4 MB       │  ││                                      ││
│ │ └─────────────────────────────┘  ││                                      ││
│ └───────────────────────────────────┘│└────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. DESKTOP - MODE DRAWER (Panel latéral)

### Wireframe Principal
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Main Application View                               │
│ ┌─────────────────────┬────────────────────────────────────────────────────┐│
│ │                     │               DRAWER (70% width)                   ││
│ │                     │ ┌──────────────────────────────────────────────────┐│
│ │                     │ │              TOOLBAR (56px)                     ││
│ │   Main Content      │ │ ┌────────────────────────────────────────────┐ ││
│ │   (30% width)       │ │ │ Document Title            [↓][🖨][📤]  [✕]│ ││
│ │                     │ │ └────────────────────────────────────────────┘ ││
│ │                     │ ├──────────────────────────────────────────────────┤│
│ │  • Transaction #123  │ │                                                ││
│ │  • Amount: 1,250€    │ │                                                ││
│ │  • Date: 12/01/24    │ │           Document Content Area                ││
│ │  • Status: Pending   │ │                                                ││
│ │                     │ │               Scrollable                       ││
│ │  [View Document]     │ │                                                ││
│ │                     │ │                                                ││
│ │                     │ │                                                ││
│ │                     │ │                                                ││
│ │                     │ │                                                ││
│ │                     │ ├──────────────────────────────────────────────────┤│
│ │                     │ │ [◀] Page 1/5 [▶]  │  [−] 100% [+]             ││
│ │                     │ └──────────────────────────────────────────────────┘│
│ └─────────────────────┴────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

### Drawer avec liste de documents
```
┌──────────────────────────────────────────────────────────────────┐
│                    DRAWER CONTENT                                │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ Documents List │           Preview Area                    │ │
│ │    (250px)     │              (Rest)                       │ │
│ ├────────────────┼────────────────────────────────────────────┤ │
│ │ ┌────────────┐ │                                           │ │
│ │ │📄 Doc 1    │ │                                           │ │
│ │ │  Active    │ │                                           │ │
│ │ └────────────┘ │         Current Document                  │ │
│ │ ┌────────────┐ │           Display Area                    │ │
│ │ │📄 Doc 2    │ │                                           │ │
│ │ └────────────┘ │                                           │ │
│ │ ┌────────────┐ │                                           │ │
│ │ │📄 Doc 3    │ │                                           │ │
│ │ └────────────┘ │                                           │ │
│ └────────────────┴────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

---

## 3. MOBILE - MODE SHEET (Bottom Sheet)

### Wireframe Principal - Portrait
```
┌─────────────────────────────────────┐
│         Status Bar (System)          │
├─────────────────────────────────────┤
│                                     │
│         Main App Content            │
│                                     │
│                                     │
├─────────────────────────────────────┤
│        BOTTOM SHEET (Full)          │
│ ┌───────────────────────────────────┐
│ │        Handle Bar (4px)          │
│ │ ─────────────────────────────── │
│ │                                   │
│ │     Document Title                │
│ │     Page 1 of 5                   │
│ ├───────────────────────────────────┤
│ │                                   │
│ │                                   │
│ │                                   │
│ │      Document Content             │
│ │        (Pinch to zoom)            │
│ │                                   │
│ │                                   │
│ │                                   │
│ ├───────────────────────────────────┤
│ │  TOOLBAR (Bottom - 72px)         │
│ │ ┌─────────────────────────────┐  │
│ │ │ [◀][▶] [−][+] [↓] [📤] [✕] │  │
│ │ └─────────────────────────────┘  │
│ └───────────────────────────────────┘
└─────────────────────────────────────┘
```

### Mobile Toolbar - Optimisée pour le pouce
```
┌─────────────────────────────────────┐
│          SAFE AREA TOP              │
│ ┌───────────────────────────────────┐
│ │   Swipe down to close gesture     │
│ │          ━━━━━━━━━                 │
│ └───────────────────────────────────┘
│                                     │
│         Document Area               │
│                                     │
├─────────────────────────────────────┤
│       TOOLBAR (Bottom - 72px)       │
│ ┌───────────────────────────────────┐
│ │  ┌──────┐ ┌──────┐ ┌──────┐     │
│ │  │  ◀   │ │  ▶   │ │  ↓   │     │
│ │  └──────┘ └──────┘ └──────┘     │
│ │  ┌──────┐ ┌──────┐ ┌──────┐     │
│ │  │  −   │ │  +   │ │  ✕   │     │
│ │  └──────┘ └──────┘ └──────┘     │
│ │   Touch targets: 48x48px min      │
│ └───────────────────────────────────┘
│          SAFE AREA BOTTOM           │
└─────────────────────────────────────┘
```

### Gestes tactiles - Zones d'interaction
```
┌─────────────────────────────────────┐
│    ╔═══════════════════════════╗    │
│    ║  SWIPE DOWN TO CLOSE      ║    │
│    ║        (Top 80px)         ║    │
│    ╚═══════════════════════════╝    │
│                                     │
│    ┌───────────────────────────┐    │
│    │                           │    │
│    │     PINCH TO ZOOM         │    │
│    │     Double tap to fit     │    │
│    │                           │    │
│    │    Main Content Area      │    │
│    │                           │    │
│    └───────────────────────────┘    │
│                                     │
│    ╔═══════════════════════════╗    │
│    ║   SWIPE LEFT/RIGHT        ║    │
│    ║   Navigate pages          ║    │
│    ╚═══════════════════════════╝    │
│                                     │
│    ┌───────────────────────────┐    │
│    │   Toolbar Actions Zone    │    │
│    └───────────────────────────┘    │
└─────────────────────────────────────┘
```

---

## 4. ÉTATS SPÉCIAUX

### Loading State avec Skeleton
```
┌─────────────────────────────────────────────────────────┐
│                    LOADING STATE                        │
│ ┌─────────────────────────────────────────────────────┐│
│ │ ░░░░░░░░░░░░░░░░░░░  ░░░░░░░░  ░░░░░░              ││
│ │         Toolbar skeleton (animated)                 ││
│ ├─────────────────────────────────────────────────────┤│
│ │                                                     ││
│ │  ┌───────────────────────────────────────────┐     ││
│ │  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │     ││
│ │  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │     ││
│ │  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │     ││
│ │  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │     ││
│ │  │         Content skeleton (pulsing)        │     ││
│ │  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │     ││
│ │  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │     ││
│ │  └───────────────────────────────────────────┘     ││
│ │                                                     ││
│ │  Loading indicator: Spinner + "Chargement..."      ││
│ └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### Error State
```
┌─────────────────────────────────────────────────────────┐
│                     ERROR STATE                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │                                                     ││
│ │                    ⚠️                                ││
│ │                                                     ││
│ │         Impossible de charger le document           ││
│ │                                                     ││
│ │   Le fichier est corrompu ou temporairement         ││
│ │              indisponible                           ││
│ │                                                     ││
│ │          ┌──────────────┐  ┌──────────┐            ││
│ │          │   Réessayer  │  │  Fermer  │            ││
│ │          └──────────────┘  └──────────┘            ││
│ │                                                     ││
│ │         Code erreur: DOC_LOAD_ERROR_404             ││
│ └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### Unsupported File Type
```
┌─────────────────────────────────────────────────────────┐
│                UNSUPPORTED FILE TYPE                    │
│ ┌─────────────────────────────────────────────────────┐│
│ │                                                     ││
│ │                    📄                               ││
│ │                                                     ││
│ │         Format de fichier non supporté              ││
│ │                                                     ││
│ │   Type détecté: .docx                               ││
│ │   Formats supportés: PDF, JPG, PNG                  ││
│ │                                                     ││
│ │          ┌──────────────────────┐                   ││
│ │          │  Télécharger le doc  │                   ││
│ │          └──────────────────────┘                   ││
│ │                                                     ││
│ │              ┌──────────┐                           ││
│ │              │  Fermer  │                           ││
│ │              └──────────┘                           ││
│ └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────────────────────────────┐
│                    EMPTY STATE                          │
│ ┌─────────────────────────────────────────────────────┐│
│ │                                                     ││
│ │                    📭                               ││
│ │                                                     ││
│ │         Aucun document disponible                   ││
│ │                                                     ││
│ │   Cette transaction n'a pas encore de               ││
│ │        pièce justificative associée                 ││
│ │                                                     ││
│ │          ┌───────────────────────┐                  ││
│ │          │  Ajouter un document  │                  ││
│ │          └───────────────────────┘                  ││
│ │                                                     ││
│ │     Glissez-déposez ou cliquez pour ajouter        ││
│ └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

## 5. TOOLBAR DÉTAILLÉE - Groupes fonctionnels

### Desktop - Groupes d'actions
```
┌───────────────────────────────────────────────────────────────────┐
│                         TOOLBAR STRUCTURE                         │
├─────────────────┬──────────────┬────────────────┬────────────────┤
│   Navigation    │     Zoom     │    Actions     │     Close      │
├─────────────────┼──────────────┼────────────────┼────────────────┤
│ • Previous page │ • Zoom out   │ • Download     │ • Close modal  │
│ • Next page     │ • Zoom level │ • Print        │                │
│ • Page input    │ • Zoom in    │ • Share        │                │
│ • Total pages   │ • Fit options│ • Copy link    │                │
└─────────────────┴──────────────┴────────────────┴────────────────┘
```

### Responsive Breakpoints
```
// Desktop (>1024px)
┌──────────────────────────────────────────────────────────┐
│ [◀][▶] Page 3/10 │ [−] 100% [+] Fit │ [↓][🖨][📤][🔗] │ [✕] │
└──────────────────────────────────────────────────────────┘

// Tablet (768px - 1024px)
┌────────────────────────────────────────────┐
│ [◀][▶] 3/10 │ [−][+] │ [↓][📤] │ [✕]      │
└────────────────────────────────────────────┘

// Mobile (<768px)
┌──────────────────────┐
│ [◀][▶] [−][+] [↓][✕] │
└──────────────────────┘
```

### Touch Targets Specifications
```
┌─────────────────────────────────────────┐
│         Touch Target Guidelines          │
├─────────────────────────────────────────┤
│ Desktop:                                 │
│ • Minimum: 32x32px                       │
│ • Recommended: 40x40px                   │
│ • Spacing: 8px minimum                   │
│                                          │
│ Tablet:                                  │
│ • Minimum: 40x40px                       │
│ • Recommended: 44x44px                   │
│ • Spacing: 12px minimum                  │
│                                          │
│ Mobile:                                  │
│ • Minimum: 44x44px (iOS guideline)       │
│ • Recommended: 48x48px (Android)         │
│ • Spacing: 16px minimum                  │
│ • Thumb zone: Bottom 25% of screen       │
└─────────────────────────────────────────┘
```

---

## 6. ARCHITECTURE DE NAVIGATION

### Flow de navigation principal
```
Entry Points:
    │
    ├── From Transaction List
    │   └── Click "View Document" → Modal/Drawer
    │
    ├── From Invoice Module
    │   └── Click invoice row → Drawer with context
    │
    ├── From Dashboard Widget
    │   └── Click document link → Modal fullscreen
    │
    └── From Mobile Bottom Nav
        └── Tap document icon → Bottom Sheet

Exit Points:
    │
    ├── Close button (✕)
    ├── ESC key (Desktop)
    ├── Click outside (Modal only)
    ├── Swipe down (Mobile)
    └── Back navigation (Browser/App)
```

### États de transition
```
1. Opening Animation:
   - Desktop Modal: Fade in + Scale (0.95 → 1)
   - Desktop Drawer: Slide from right
   - Mobile Sheet: Slide from bottom

2. Closing Animation:
   - Desktop Modal: Fade out + Scale (1 → 0.95)
   - Desktop Drawer: Slide to right
   - Mobile Sheet: Slide to bottom

3. Document Switch:
   - Crossfade between documents
   - Progress indicator during load
   - Maintain zoom level if applicable
```

---

## 7. SPÉCIFICATIONS FONCTIONNELLES

### Comportements par défaut
- **Auto-fit**: Documents s'adaptent à la largeur disponible
- **Zoom**: Min 50%, Max 200%, Step 10%
- **Navigation**: Keyboard shortcuts actifs (←→ pour pages)
- **Loading**: Progressive rendering pour PDF multi-pages
- **Cache**: Documents récents en cache local (5 derniers)

### Raccourcis clavier (Desktop)
```
Navigation:
- ← / → : Page précédente/suivante
- Home/End : Première/Dernière page
- ESC : Fermer le viewer

Zoom:
- Ctrl/Cmd + : Zoom in
- Ctrl/Cmd - : Zoom out
- Ctrl/Cmd 0 : Reset zoom

Actions:
- Ctrl/Cmd P : Print
- Ctrl/Cmd S : Download
- Space : Scroll down
- Shift+Space : Scroll up
```

### Gestion des erreurs
1. **Timeout** (>10s): Message + Retry button
2. **Network error**: Offline message + Cache fallback
3. **Corrupted file**: Error message + Download option
4. **Access denied**: Permission message + Request access

### Performance optimizations
- Lazy loading pour PDF multi-pages
- Image compression on-the-fly
- Virtual scrolling pour documents longs
- Debounced zoom actions
- Prefetch next/previous page

---

## 8. INTÉGRATION DESIGN SYSTEM OKE

### Composants utilisés
- **Glass effect**: Pour le backdrop et les overlays
- **Liquid transitions**: Pour les animations d'ouverture/fermeture
- **Color tokens**: Primary pour actions, Neutral pour UI
- **Typography scale**: Respect de la hiérarchie définie
- **Spacing system**: Utilisation cohérente des tokens d'espacement

### Cohérence visuelle
- Respecter les radius: `rounded-xl` pour modal, `rounded-lg` pour boutons
- Shadows: `shadow-glass` pour elevation principale
- Animations: Spring physics (300ms standard)
- Icons: Lucide React library cohérente avec le reste

---

## Notes d'implémentation

### Priorités de développement
1. **P0**: Mode Modal Desktop avec navigation basique
2. **P1**: Mode Mobile Sheet avec gestes tactiles
3. **P2**: Mode Drawer avec multi-documents
4. **P3**: Fonctionnalités avancées (annotations, signatures)

### Accessibilité
- ARIA labels sur tous les boutons
- Keyboard navigation complète
- Focus trap dans les modals
- Announcements pour screen readers
- Respect du contraste WCAG AA

### Tests requis
- Cross-browser (Chrome, Safari, Firefox, Edge)
- Responsive breakpoints
- Performance avec documents >10MB
- Offline mode avec service worker
- Gesture recognition sur mobile