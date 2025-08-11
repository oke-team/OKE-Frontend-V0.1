# Design System OKÉ - Liquid Glass + ClickUp

## 🎨 Vision Design

### Inspirations Principales
- **Liquid Glass** : Effet de transparence et de fluidité Apple Vision Pro
- **ClickUp** : Organisation claire, navigation intuitive, productivité
- **Linear** : Minimalisme élégant, transitions fluides

## 🌈 Palette de Couleurs

### Couleurs Primaires
```css
--primary-50: #f0f4ff;
--primary-100: #e0e8ff;
--primary-200: #c7d6ff;
--primary-300: #a5b9ff;
--primary-400: #7f94ff;
--primary-500: #5e72ff; /* Couleur principale */
--primary-600: #4a5eff;
--primary-700: #3b4ded;
--primary-800: #3142c6;
--primary-900: #2b3aa1;
```

### Couleurs Secondaires
```css
--secondary-50: #fdf2fe;
--secondary-100: #fae5fc;
--secondary-200: #f5cbf9;
--secondary-300: #eda8f4;
--secondary-400: #e279ea;
--secondary-500: #d150da; /* Couleur principale */
```

### Accents Pastels
```css
--accent-pink: #ff6b9d;
--accent-purple: #c66fbc;
--accent-blue: #66d9ef;
--accent-green: #95e1a4;
--accent-yellow: #feca57;
--accent-orange: #ff9a76;
```

### Palette Neutre
```css
--neutral-50: #fafafa;
--neutral-100: #f5f5f5;
--neutral-200: #e5e5e5;
--neutral-300: #d4d4d4;
--neutral-400: #a3a3a3;
--neutral-500: #737373;
--neutral-600: #525252;
--neutral-700: #404040;
--neutral-800: #262626;
--neutral-900: #171717;
--neutral-950: #0a0a0a;
```

## 🔤 Typographie

### Font Stack
```css
--font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: "SF Mono", Monaco, Inconsolata, "Fira Code", monospace;
```

### Échelle Typographique
```css
--text-2xs: 10px / 14px;
--text-xs: 12px / 16px;
--text-sm: 14px / 20px;
--text-base: 16px / 24px;
--text-lg: 18px / 28px;
--text-xl: 20px / 30px;
--text-2xl: 24px / 32px;
--text-3xl: 30px / 36px;
--text-4xl: 36px / 40px;
--text-5xl: 48px / 48px;
```

### Font Weights
```css
--font-thin: 100;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

## 📐 Espacement

### Échelle de Base (4px)
```css
--space-0: 0px;
--space-px: 1px;
--space-0.5: 2px;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

## 🎭 Effets Visuels

### Liquid Glass Effect
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
}

.glass-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-hover:hover {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 48px 0 rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}
```

### Glow Effect
```css
.glow {
  box-shadow: 0 0 40px rgba(94, 114, 255, 0.2);
}

.glow-hover:hover {
  box-shadow: 0 0 60px rgba(94, 114, 255, 0.3);
}

.glow-inner {
  box-shadow: inset 0 0 20px rgba(94, 114, 255, 0.1);
}
```

### Gradient Backgrounds
```css
.gradient-primary {
  background: linear-gradient(135deg, var(--primary-400) 0%, var(--primary-600) 100%);
}

.gradient-mesh {
  background-image: 
    radial-gradient(at 40% 20%, var(--primary-100) 0px, transparent 50%),
    radial-gradient(at 80% 0%, var(--secondary-100) 0px, transparent 50%),
    radial-gradient(at 0% 50%, var(--accent-blue) 0px, transparent 50%);
}
```

## 🎬 Animations (Framer Motion)

### Transitions de Base
```typescript
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
  transition: { duration: 0.3, ease: "easeOut" }
};

export const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.2 }
};
```

### Animations ClickUp-Style
```typescript
export const clickupHover = {
  whileHover: { 
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },
  whileTap: { scale: 0.98 }
};

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};
```

## 🧩 Composants de Base

### Glass Card
```tsx
<motion.div
  className="glass rounded-2xl p-6"
  whileHover={{ scale: 1.02 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  {/* Contenu */}
</motion.div>
```

### Primary Button
```tsx
<button className="
  px-6 py-3 
  bg-gradient-to-r from-primary-500 to-primary-600 
  text-white font-medium 
  rounded-xl 
  hover:shadow-glow 
  transition-all duration-200
  active:scale-95
">
  Action
</button>
```

### Stats Card
```tsx
<div className="
  glass 
  rounded-2xl p-6 
  border border-white/20
  hover:shadow-lg transition-all
">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-neutral-500">Label</p>
      <p className="text-2xl font-bold">42,150 €</p>
      <p className="text-sm text-green-500">+12.5%</p>
    </div>
    <Icon className="w-8 h-8 text-primary-500" />
  </div>
</div>
```

## 📏 Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-3xl: 32px;
--radius-full: 9999px;
```

## 🌑 Ombres

### Ombres Standards
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### Ombres Glass
```css
--shadow-glass-sm: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
--shadow-glass: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
--shadow-glass-lg: 0 16px 48px 0 rgba(0, 0, 0, 0.12);
```

## 📱 Breakpoints Responsive

```css
--screen-xs: 475px;  /* Petits mobiles */
--screen-sm: 640px;  /* Mobiles */
--screen-md: 768px;  /* Tablettes */
--screen-lg: 1024px; /* Desktop */
--screen-xl: 1280px; /* Large desktop */
--screen-2xl: 1536px; /* Très large */
```

## 🎯 Patterns UI

### 1. Navigation Mobile (Bottom Nav)
- 5 icônes maximum
- Bouton central d'action flottant
- Indicateur actif avec animation
- Hauteur : 64px

### 2. Header Desktop
- Logo à gauche
- Navigation centrale
- Actions utilisateur à droite
- Hauteur : 64px

### 3. Tables Éditables
- Double-clic pour éditer
- Navigation clavier (Tab, Flèches)
- Sélection multiple avec checkboxes
- Expansion des lignes détaillées

### 4. Cards Mobile
- Swipeable entre vues
- Actions par swipe latéral
- Tap pour détails
- Long press pour sélection

## 🔧 Utilities CSS

### Classe Glass
```css
.glass {
  @apply backdrop-blur-md bg-white/10 border border-white/20;
}

.glass-dark {
  @apply backdrop-blur-md bg-black/10 border border-white/10;
}
```

### Classe Gradient Text
```css
.gradient-text {
  @apply bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent;
}
```

### Classe Hover Lift
```css
.hover-lift {
  @apply transition-transform hover:-translate-y-1;
}
```

## 🎨 Thèmes

### Light Theme
```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
}
```

### Dark Theme
```css
[data-theme="dark"] {
  --bg-primary: #0a0a0a;
  --bg-secondary: #171717;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
}
```

## 📝 Guidelines d'Usage

### Principe Fondamental : "Less is More"
**La simplicité élégante prime sur la complexité.** Chaque élément doit avoir une raison d'être. Si quelque chose peut être retiré sans nuire à la fonction ou à la compréhension, il doit l'être.

### Do's ✅
- Utiliser les tokens de design systématiquement
- Respecter la hiérarchie visuelle
- Maintenir la cohérence des espacements
- Prioriser la lisibilité
- Tester sur tous les breakpoints
- **Appliquer "Less is More"** : privilégier la simplicité et l'élégance
- **Éviter toute duplication** : une information ne doit apparaître qu'une seule fois
- **Favoriser l'espace blanc** : laisser l'interface respirer
- **Simplifier les interactions** : rendre chaque action intuitive

### Don'ts ❌
- Ne pas créer de nouvelles couleurs arbitraires
- Ne pas mixer les styles d'animation
- Ne pas ignorer l'accessibilité
- Ne pas surcharger avec des effets
- Ne pas oublier le mode sombre
- **Ne JAMAIS dupliquer les informations** : éviter la redondance visuelle
- **Ne pas ajouter d'éléments décoratifs inutiles**
- **Ne pas créer de complexité sans valeur ajoutée**
- **Ne pas afficher deux fois la même donnée** dans des formats différents

## 🚀 Quick Start

```tsx
// Import des tokens
import { designTokens } from '@/lib/design-tokens';

// Import des animations
import { fadeIn, slideUp } from '@/lib/animations';

// Utilisation
<motion.div 
  {...fadeIn}
  className="glass rounded-2xl p-6"
  style={{ 
    color: designTokens.colors.primary[500] 
  }}
>
  Contenu
</motion.div>
```

## 📚 Ressources

- [Frontend Guidelines](./FRONTEND_GUIDELINES.md)
- [Component Catalog](./COMPONENT_CATALOG.md)
- [Mobile Patterns](./MOBILE_PATTERNS.md)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS v4](https://tailwindcss.com/)