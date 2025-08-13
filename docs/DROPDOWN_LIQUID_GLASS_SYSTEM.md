# Système de Dropdown Liquid Glass - OKÉ Dashboard

## Vue d'ensemble

Le système de dropdown Liquid Glass est une évolution majeure de l'interface OKÉ, unifiant l'esthétique tout en préservant l'identité unique de chaque composant. Cette refonte résout les problèmes de cohérence visuelle, réintroduit les effets caractéristiques d'OKÉ et optimise l'expérience mobile.

## Philosophie de Design

### Principes Fondamentaux

1. **Unité dans la Diversité** : Un système visuel cohérent qui permet des variations subtiles
2. **Liquid Glass Evolution** : Effets de transparence et de flou signature d'OKÉ
3. **Adaptive Experience** : Comportements optimisés pour chaque contexte d'usage
4. **Performance First** : Animations fluides sans compromis sur les performances

## Architecture du Système

### 1. Variants de Dropdown

```typescript
type DropdownVariant = 'default' | 'company' | 'period' | 'action' | 'user';
```

#### Company Variant
- **Couleur d'accent** : Bleu primaire (#5e72ff)
- **Effet hover** : Rotation subtile de l'icône, glow bleu
- **Usage** : Sélection d'entreprise, contexte métier

#### Period Variant
- **Couleur d'accent** : Vert émeraude (#10b981)
- **Effet hover** : Pulse animation sur l'icône
- **Usage** : Sélection temporelle, exercices comptables

#### Action Variant
- **Couleur d'accent** : Violet/Rose (#d150da)
- **Effet hover** : Effet shimmer, transformation
- **Usage** : Actions magiques, fonctionnalités AI

#### User Variant
- **Couleur d'accent** : Neutre
- **Effet hover** : Subtil, professionnel
- **Usage** : Menu utilisateur, paramètres

### 2. Structure des Composants

```jsx
<Dropdown variant="company" size="md">
  <DropdownTrigger>
    {/* Contenu du trigger */}
  </DropdownTrigger>
  
  <DropdownMenu>
    <DropdownSection label="Section">
      <DropdownItem>Item</DropdownItem>
    </DropdownSection>
  </DropdownMenu>
</Dropdown>
```

## Effets Visuels Liquid Glass

### Base Glass Effect

```css
/* Effet de base pour tous les dropdowns */
.dropdown-trigger {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

/* État hover */
.dropdown-trigger:hover {
  background: rgba(255, 255, 255, 0.75);
  border-color: rgba(255, 255, 255, 0.35);
  transform: translateY(-1px);
}
```

### Gradient Overlays

Chaque variant a son propre gradient overlay subtil :

```css
/* Company - Gradient bleu/violet */
.company-variant::after {
  background: linear-gradient(135deg, 
    rgba(94, 114, 255, 0.05) 0%, 
    rgba(209, 80, 218, 0.05) 100%);
}

/* Period - Gradient vert */
.period-variant::after {
  background: linear-gradient(135deg, 
    rgba(16, 185, 129, 0.05) 0%, 
    rgba(52, 211, 153, 0.05) 100%);
}
```

### Animations Signature

#### Entrée du Menu (Cascade Effect)
```javascript
const cascadeAnimation = {
  initial: { opacity: 0, y: -10, scale: 0.95, filter: 'blur(4px)' },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    filter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: [0.32, 0.72, 0, 1] // Courbe custom Apple-like
    }
  }
};
```

#### Hover States
```javascript
const hoverAnimation = {
  scale: 1.02,
  y: -1,
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 25
  }
};
```

## Système Mobile Adaptatif

### Breakpoints et Comportements

| Breakpoint | Taille | Header | Dropdown Type | Trigger Size |
|------------|--------|--------|---------------|--------------|
| Mobile | < 768px | 56px | Bottom Sheet | Compact (xs) |
| Tablet | 768-1024px | 64px | Popover | Medium |
| Desktop | > 1024px | 64px | Dropdown | Medium |

### Mobile Bottom Sheet

Sur mobile, les dropdowns se transforment en bottom sheets :

```jsx
const mobileMenu = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  maxHeight: '75vh',
  borderRadius: '24px 24px 0 0',
  animation: 'slide-in-from-bottom 300ms'
};
```

### Optimisations Mobile

1. **Taille réduite des triggers** : Mode `xs` automatique
2. **Espacement optimisé** : Gaps réduits pour maximiser l'espace
3. **Touch targets** : Minimum 44x44px pour une interaction confortable
4. **Scroll momentum** : Support du overscroll natif iOS/Android

## Accessibilité

### Support Clavier

| Touche | Action |
|--------|--------|
| `Enter` / `Space` | Ouvre/ferme le dropdown |
| `Escape` | Ferme le dropdown |
| `ArrowDown` | Navigation vers le bas |
| `ArrowUp` | Navigation vers le haut |
| `Home` | Premier élément |
| `End` | Dernier élément |
| `Tab` | Navigation entre dropdowns |

### Attributs ARIA

```jsx
<button
  role="combobox"
  aria-expanded={isOpen}
  aria-haspopup="listbox"
  aria-controls={menuId}
  aria-label="Sélectionner une entreprise"
/>

<div
  role="listbox"
  aria-labelledby={triggerId}
>
  <button
    role="option"
    aria-selected={isSelected}
  />
</div>
```

### Contrastes et Lisibilité

- Ratio minimum 7:1 pour le texte principal
- Ratio minimum 4.5:1 pour le texte secondaire
- Indicateurs de focus visibles (ring de 2px)
- Support du mode `prefers-reduced-motion`

## Performance

### Optimisations Techniques

1. **GPU Acceleration**
```css
.dropdown {
  transform: translateZ(0);
  will-change: transform, opacity;
  backface-visibility: hidden;
}
```

2. **Lazy Loading**
```javascript
const LazyDropdownMenu = lazy(() => import('./DropdownMenu'));
```

3. **Virtualisation** pour les longues listes
```javascript
const VirtualList = {
  itemHeight: 40,
  overscan: 5,
  maxHeight: 400
};
```

4. **Debouncing** des interactions
```javascript
const searchDebounce = 300;
const scrollThrottle = 16; // 60fps
```

## Patterns d'Usage

### Sélecteur d'Entreprise

```jsx
<CompanySelector
  companies={companies}
  currentCompany={current}
  onCompanyChange={handleChange}
  size="md"
/>
```

### Sélecteur de Période

```jsx
<PeriodSelector
  size="md"
  className="min-w-[160px]"
/>
```

### Menu d'Actions Contextuelles

```jsx
<Dropdown variant="action" size="md">
  <DropdownTrigger>
    <Wand2 className="w-4 h-4" />
    <span>Actions</span>
  </DropdownTrigger>
  <DropdownMenu>
    {actions.map(action => (
      <DropdownItem key={action.id} onClick={action.handler}>
        {action.label}
      </DropdownItem>
    ))}
  </DropdownMenu>
</Dropdown>
```

## Tokens de Design

### Couleurs
```javascript
const colors = {
  glass: {
    base: 'rgba(255, 255, 255, 0.65)',
    hover: 'rgba(255, 255, 255, 0.75)',
    border: 'rgba(255, 255, 255, 0.25)'
  },
  accents: {
    company: '#5e72ff',
    period: '#10b981',
    action: '#d150da'
  }
};
```

### Espacements
```javascript
const spacing = {
  dropdown: {
    gap: '8px',    // Entre trigger et menu
    padding: '8px', // Padding du menu
    itemGap: '2px'  // Entre les items
  }
};
```

### Animations
```javascript
const transitions = {
  fast: '200ms',
  normal: '300ms',
  slow: '500ms',
  spring: {
    type: 'spring',
    stiffness: 400,
    damping: 25
  }
};
```

## Migration depuis l'Ancien Système

### Changements Breaking

1. **Variants renommés** :
   - `primary` → `company`
   - `success` → `period`
   - `secondary` → `action`

2. **Nouvelle taille** :
   - Ajout de `xs` pour mobile

3. **Props modifiées** :
   - Suppression de `variant` sur PeriodSelector
   - Ajout de `className` pour customisation

### Guide de Migration

```jsx
// Ancien
<Dropdown variant="primary" size="sm">
  
// Nouveau
<Dropdown variant="company" size="xs">

// Ancien
<PeriodSelector variant="success" />

// Nouveau
<PeriodSelector />
```

## Roadmap Future

### V2.1 - Améliorations Planifiées
- Animation de morphing entre états
- Support du multi-select
- Recherche intégrée avec highlighting
- Keyboard shortcuts personnalisables

### V2.2 - Intelligence Artificielle
- Suggestions contextuelles
- Auto-complétion intelligente
- Prédiction des sélections fréquentes

### V3.0 - Spatial Computing Ready
- Support Vision Pro
- Effets de profondeur 3D
- Interactions gestuelles

## Ressources

- [Figma Design System](https://figma.com/oke-liquid-glass)
- [Storybook Components](https://storybook.oke.app)
- [Performance Metrics](https://metrics.oke.app/dropdowns)
- [A11y Report](https://a11y.oke.app/dropdowns)

---

*Dernière mise à jour : Janvier 2025*
*Version : 2.0.0*
*Auteur : UI Design Team OKÉ*