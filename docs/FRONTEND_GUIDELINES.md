# Frontend Development Guidelines - OKÉ V0.1

## 🎯 Objectif
Ce document définit les règles et conventions pour le développement front-end de l'application OKÉ. Tous les développeurs et agents Claude Code doivent suivre ces directives pour maintenir la cohérence et la qualité du code.

## 📋 Règles de Base

### 1. Architecture des Composants
- **Composants atomiques** : Placés dans `/components/ui/`
- **Composants partagés** : Placés dans `/components/shared/`
- **Composants de module** : Placés dans `/components/[module]/`
- **Toujours vérifier** si un composant existe avant d'en créer un nouveau

### 2. Gestion des Données
- **Toutes les données sont hardcodées** dans `/lib/mock-data/`
- **Aucun appel API** dans cette version V0.1
- **Structure type** :
  ```typescript
  export interface Entity {
    id: string;
    // ... autres propriétés typées
  }
  
  export const entities: Entity[] = [
    // Données hardcodées
  ];
  ```

### 3. Styles et Design System
- **Utiliser Tailwind CSS v4** avec la syntaxe `@import`
- **Référencer les design tokens** depuis `/lib/design-tokens.ts`
- **Effets Liquid Glass** : Utiliser les classes prédéfinies
- **Animations** : Framer Motion obligatoire
- **Pas de styles inline** sauf cas exceptionnels justifiés

### 4. Gestion de l'État
- **État local** : `useState` pour les composants
- **État partagé** : React Context (pas de Redux dans V0.1)
- **État de formulaire** : Contrôlé avec useState

### 5. Navigation
- **Toujours utiliser Next.js App Router**
- **Routes** : `/[module]` pour chaque module
- **Navigation mobile** : Via `UnifiedBottomNav`
- **Navigation desktop** : Via sidebar ou header

## 🏗️ Patterns à Suivre

### Pattern 1: Double Table (Desktop)
```typescript
// Inspiré du module Accounting
<div className="grid grid-cols-2 gap-4">
  <BalanceTable />
  <GeneralLedgerTable />
</div>
```

### Pattern 2: Vue Mobile (Cards/Slides)
```typescript
// Vue mobile avec swipe
<div className="md:hidden">
  <SwipeableViews>
    <Card>Vue 1</Card>
    <Card>Vue 2</Card>
  </SwipeableViews>
</div>
```

### Pattern 3: Édition Inline
```typescript
// Double-clic pour éditer
onDoubleClick={() => setEditing(true)}
// Navigation clavier
onKeyDown={handleKeyboardNavigation}
```

### Pattern 4: Header + Bottom Nav
```typescript
<AppLayout>
  <HeaderFixed />
  {children}
  <UnifiedBottomNav />
</AppLayout>
```

## 🚫 À NE PAS FAIRE

1. **Ne pas créer de composants dupliqués**
2. **Ne pas utiliser de styles inline** (sauf exceptions)
3. **Ne pas mettre de logique métier dans les composants UI**
4. **Ne pas faire d'appels API**
5. **Ne pas utiliser de bibliothèques non approuvées**
6. **Ne pas ignorer l'accessibilité**
7. **Ne pas oublier la version mobile**

## 📱 Mobile First

### Breakpoints
```css
xs: 475px   /* Petits mobiles */
sm: 640px   /* Mobiles */
md: 768px   /* Tablettes */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Très large */
```

### Principe
1. **Concevoir d'abord pour mobile**
2. **Améliorer progressivement pour desktop**
3. **Tester sur tous les breakpoints**

## 🧩 Structure des Composants

### Composant Type
```typescript
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ComponentProps {
  // Props typées
}

export default function Component({ 
  // Props destructurées
}: ComponentProps) {
  // État local
  const [state, setState] = useState();
  
  // Effets
  useEffect(() => {
    // Logique
  }, []);
  
  // Handlers
  const handleAction = () => {
    // Logique
  };
  
  // Rendu
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "base-classes",
        "conditional-classes"
      )}
    >
      {/* Contenu */}
    </motion.div>
  );
}
```

## 🎨 Conventions de Nommage

### Fichiers et Dossiers
- **Composants** : PascalCase (`UserProfile.tsx`)
- **Utilities** : kebab-case (`format-date.ts`)
- **Données** : kebab-case (`accounting-data.ts`)
- **Styles** : kebab-case (`design-system.css`)

### Variables et Fonctions
- **Composants** : PascalCase
- **Fonctions** : camelCase
- **Constantes** : UPPER_SNAKE_CASE
- **Interfaces** : PascalCase avec préfixe I optionnel

## ✅ Checklist Avant Commit

- [ ] Le composant est-il réutilisable ?
- [ ] Les props sont-elles typées ?
- [ ] Le code est-il responsive ?
- [ ] Les animations sont-elles fluides ?
- [ ] L'accessibilité est-elle respectée ?
- [ ] Le design system est-il utilisé ?
- [ ] Les données sont-elles dans `/lib/mock-data/` ?
- [ ] Le composant suit-il les patterns établis ?

## 🔧 Outils et Commandes

### Développement
```bash
npm run dev        # Lancer le serveur de développement
npm run build      # Construire pour production
npm run lint       # Vérifier le code
npm run typecheck  # Vérifier les types TypeScript
```

### Structure de Fichiers
```
/oke-dashboard/
├── /app/              # Pages (Next.js App Router)
├── /components/       # Composants React
├── /lib/              # Logique et données
├── /public/           # Assets statiques
├── /styles/           # Styles globaux
└── /docs/             # Documentation
```

## 📚 Références

- [Design System](./DESIGN_SYSTEM.md)
- [Component Catalog](./COMPONENT_CATALOG.md)
- [Module Template](./MODULE_TEMPLATE.md)
- [Mobile Patterns](./MOBILE_PATTERNS.md)
- [Data Structure](./DATA_STRUCTURE.md)

## 🚀 Workflow avec les Agents

1. **ui-designer** : Pour les maquettes et layouts
2. **design-system-bot** : Pour valider les tokens
3. **component-crafter** : Pour développer les composants
4. **responsive-master** : Pour l'adaptation mobile
5. **animation-director** : Pour les micro-animations

## 📝 Notes Importantes

- Cette version V0.1 est **front-end uniquement**
- Le backend sera développé séparément par Tony
- Toutes les données sont **hardcodées**
- L'objectif est la **maintenabilité** et la **réutilisabilité**
- Inspiration : **Liquid Glass** (Apple) + **ClickUp** (UX)