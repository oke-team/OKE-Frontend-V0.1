# CLAUDE.md - Guide de Persistance pour Claude Code

## 🎯 Objectif du Projet
Développer OKÉ V0.1 - Une super app de gestion d'entreprise en front-end uniquement avec données hardcodées.

## 🏗️ Architecture Actuelle

### Structure des Dossiers
```
/oke-dashboard/
├── /app/              # Pages Next.js (App Router)
├── /components/       # Composants React organisés
│   ├── /ui/          # Composants atomiques
│   ├── /shared/      # Composants réutilisables
│   ├── /layout/      # Layout components
│   └── /[module]/    # Composants spécifiques par module
├── /lib/             # Logique et données
│   ├── /mock-data/   # Données hardcodées
│   └── design-tokens.ts
├── /docs/            # Documentation complète
└── /public/          # Assets statiques
```

### Technologies Utilisées
- **Next.js 15.4.6** avec App Router et Turbopack
- **TypeScript** pour le typage
- **Tailwind CSS v4** (syntaxe @import)
- **Framer Motion** pour les animations
- **React 19.1.0**

## 📋 Méthodologie de Développement

### 1. AUDIT RÉGULIER DU CODE ⚠️ PRIORITÉ ABSOLUE

**Fréquence** : Après chaque ajout de module ou fonctionnalité majeure

**Checklist d'Audit** :
```bash
# Commandes à exécuter systématiquement
npm run lint       # Vérification du linting
npm run typecheck  # Vérification des types (à créer si absent)
npm run build      # Test de build production

# Points de vérification manuelle
- [ ] Pas de duplication de code
- [ ] Composants réutilisables utilisés
- [ ] Design tokens respectés
- [ ] Données dans /lib/mock-data/
- [ ] Responsive mobile-first
- [ ] Accessibilité (aria-labels, keyboard nav)
- [ ] Performance (lazy loading, memoization)
```

**Agent à utiliser** : Lancer régulièrement un agent général pour audit
```
"Fais un audit complet du code pour vérifier la maintenabilité, 
les bonnes pratiques, et identifie les duplications ou problèmes potentiels"
```

### 2. Workflow avec les Agents Spécialisés

#### Pour un Nouveau Module
1. **product-designer** → Conception des flux utilisateur
2. **ui-designer** → Maquettes et design visuel
3. **design-system-bot** → Validation cohérence design
4. **component-crafter** → Développement des composants
5. **responsive-master** → Adaptation mobile
6. **animation-director** → Micro-animations

#### Pour la Maintenance
- **ux-lead** → Vision globale et cohérence
- **agent général** → Audit et refactoring

### 3. Standards de Code Obligatoires

#### Imports (ordre strict)
```typescript
// 1. React/Next
import React from 'react';
import { useRouter } from 'next/navigation';

// 2. Bibliothèques externes
import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';

// 3. Composants internes
import Component from '@/components/...';

// 4. Utilities et données
import { cn } from '@/lib/utils';
import { data } from '@/lib/mock-data/...';
```

#### Structure des Composants
```typescript
'use client';

interface ComponentProps {
  // Props typées obligatoires
}

export default function Component({ props }: ComponentProps) {
  // 1. Hooks
  // 2. État local
  // 3. Effets
  // 4. Handlers
  // 5. Rendu
}
```

## 🔑 Fichiers Clés de Référence

### Composants de Référence
- `/components/accounting/GeneralLedgerTable.tsx` - Table éditable avec navigation clavier
- `/components/accounting/BalanceTable.tsx` - Table avec expansion de lignes
- `/components/layout/AppLayout.tsx` - Layout principal avec navigation
- `/components/dashboard/DashboardEnriched.tsx` - Dashboard avec widgets
- **`/components/ui/DocumentViewerAdvanced.tsx`** - 🔴 **VIEWER OFFICIEL OKÉ POUR TOUS LES DOCUMENTS**

### Données de Référence
- `/lib/accounting-data.ts` - Structure de données comptables
- `/lib/modules-config.ts` - Configuration des modules
- `/lib/design-tokens.ts` - Tokens du design system

### Documentation
- `/docs/FRONTEND_GUIDELINES.md` - Règles de développement
- `/docs/DESIGN_SYSTEM.md` - Design tokens et patterns
- `/docs/COMPONENT_CATALOG.md` - Catalogue des composants
- `/docs/MODULE_TEMPLATE.md` - Template pour nouveaux modules
- **`/docs/DOCUMENT_VIEWER.md`** - 🔴 **GUIDE COMPLET DU DOCUMENTVIEWER (OBLIGATOIRE)**

## 🚀 Commandes Essentielles

```bash
# Développement
npm run dev

# Vérifications OBLIGATOIRES avant commit
npm run lint
npm run typecheck  # À implémenter

# Build production
npm run build

# Installation de dépendances
npm install
```

## 📱 Configuration PWA

### À Implémenter
1. **manifest.json** avec icônes adaptatives
2. **Service Worker** pour mode offline
3. **Meta tags** iOS/Android
4. **Splash screens**

### Structure Mobile-First
- Mobile : < 768px (cards, swipe, bottom nav)
- Tablet : 768px - 1024px (hybride)
- Desktop : > 1024px (tables, sidebar)

## 📄 DocumentViewer OKÉ - COMPOSANT OBLIGATOIRE

### ⚠️ Règle ABSOLUE
**TOUJOURS utiliser le DocumentViewer OKÉ pour afficher des documents (PDF, images, etc.)**
**JAMAIS créer un nouveau viewer ou utiliser une autre solution**

### Utilisation Standard
```typescript
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
      <button onClick={handleOpenDocument}>Voir document</button>
      {/* TOUJOURS ajouter le ViewerComponent à la fin */}
      <ViewerComponent mode="auto" glassMorphism={true} />
    </>
  );
}
```

### Caractéristiques
- ✅ Responsive mobile-first (swipe, pinch-to-zoom)
- ✅ Design Liquid Glass Apple Vision Pro
- ✅ Modes adaptatifs (Modal desktop, Sheet mobile)
- ✅ Toutes les fonctionnalités PDF (zoom, rotation, vignettes)
- ✅ Menu "Plus" intelligent sur petits écrans
- ✅ Raccourcis clavier complets

### Documentation Complète
➡️ **LIRE OBLIGATOIREMENT** : `/docs/DOCUMENT_VIEWER.md`

## 🎨 Design System

### Principe Fondamental : "Less is More"
- **Simplicité élégante** : Chaque élément doit avoir une raison d'être
- **Aucune duplication** : Une information ne doit apparaître qu'une fois
- **Interface épurée** : Favoriser l'espace blanc et la clarté
- **Minimalisme fonctionnel** : Si ça peut être retiré sans nuire, le retirer

### Inspirations
- **Liquid Glass** : Effets Apple Vision Pro (transparence, blur, profondeur)
- **ClickUp** : UX productive, navigation claire, interactions fluides

### Patterns Clés
```css
/* Glass Effect */
.glass {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Animations */
- Toujours utiliser Framer Motion
- Transitions : 200-300ms
- Easing : cubic-bezier(0.4, 0, 0.2, 1)
```

## ⚠️ Points d'Attention Critiques

### À TOUJOURS Vérifier
1. **Réutilisabilité** : Un composant existe-t-il déjà ?
2. **Responsive** : Fonctionne sur mobile ?
3. **Accessibilité** : Navigation clavier OK ?
4. **Performance** : Pas de re-renders inutiles ?
5. **Maintenabilité** : Code lisible et documenté ?

### À JAMAIS Faire
- ❌ Créer des composants dupliqués
- ❌ **Créer un nouveau viewer de documents (utiliser DocumentViewer OKÉ)**
- ❌ **Utiliser window.open() pour les PDFs (utiliser DocumentViewer OKÉ)**
- ❌ Hardcoder des valeurs (utiliser tokens)
- ❌ Ignorer les erreurs TypeScript
- ❌ Faire des appels API (tout est mock)
- ❌ Oublier la version mobile

## 📊 État d'Avancement

### Modules Complétés ✅
- **Dashboard** : Page principale avec widgets
- **Accounting** : Comptabilité avec tables éditables

### Modules À Développer 🚧
- **Bank** : Gestion bancaire
- **Sales** : Ventes et facturation
- **Purchases** : Achats et fournisseurs
- **Documents** : Gestion documentaire
- **Stocks** : Gestion des stocks
- **Tax** : Fiscalité
- **Reporting** : Tableaux de bord
- **Payroll** : Paie et RH
- **Communication** : Messagerie
- **Organization** : Agenda et tâches
- **Automations** : Workflows automatisés

## 🔄 Process d'Amélioration Continue

### Cycle de Révision
1. **Développement** : Ajout de fonctionnalités
2. **Audit** : Vérification qualité code
3. **Refactoring** : Amélioration si nécessaire
4. **Documentation** : Mise à jour des docs
5. **Tests** : Validation mobile/desktop

### Métriques de Qualité
- Temps de build < 30s
- Lighthouse score > 90
- Pas de warnings TypeScript
- 0 duplication de code
- 100% responsive

## 🤝 Collaboration

### Avec Tony (Backend)
- Frontend : 100% indépendant avec mock data
- API contracts : À définir ensemble
- Migration future : Remplacer mock par API

### Avec les Agents Claude
- Toujours référencer ce fichier CLAUDE.md
- Suivre les guidelines strictement
- Lancer des audits réguliers
- Documenter les changements

## 📝 Notes de Session

### Dernière Session
- Création de la structure de documentation
- Mise en place des guidelines
- Définition du design system
- Configuration de la méthodologie

### Prochaines Priorités
1. Implémenter script typecheck
2. Créer composants réutilisables depuis existants
3. Configurer PWA
4. Développer module Bank
5. Audit complet du code actuel

---

**IMPORTANT** : Ce fichier doit être lu au début de chaque session Claude Code pour assurer la continuité et la cohérence du développement.