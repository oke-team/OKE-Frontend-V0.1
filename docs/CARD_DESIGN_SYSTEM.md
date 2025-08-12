# Système de Design des Cartes Entrepreneur

## Vue d'ensemble

Le système de cartes pour l'application Oké suit le design system **Liquid Glass** avec une approche **"Less is More"** et **mobile-first**. Les cartes sont conçues pour être modulaires, performantes et visuellement cohérentes.

## Architecture des Tokens

### 1. Tokens de Couleurs pour Cartes

```typescript
cards.colors = {
  background: {
    default: "rgba(255, 255, 255, 0.05)",
    hover: "rgba(255, 255, 255, 0.08)",
    active: "rgba(255, 255, 255, 0.1)",
    glass: "rgba(255, 255, 255, 0.03)"
  },
  border: {
    default: "rgba(255, 255, 255, 0.1)",
    hover: "rgba(255, 255, 255, 0.15)",
    active: "rgba(94, 114, 255, 0.3)",
    focus: "rgba(94, 114, 255, 0.5)"
  },
  accent: {
    violet: "#8b5cf6",
    green: "#10b981",
    red: "#ef4444"
  }
}
```

### 2. Espacements Spécifiques

- **xs**: 12px - Espacement minimal
- **sm**: 16px - Petits éléments
- **md**: 20px - Standard
- **lg**: 24px - Sections importantes
- **xl**: 32px - Grandes sections

### 3. Tailles de Cartes

| Variante | Min Height | Max Height | Padding | Usage |
|----------|------------|------------|---------|--------|
| **hero** | 200px | 280px | 24-32px | Carte principale, vue d'ensemble |
| **standard** | 120px | 160px | 16-24px | Métriques, informations |
| **compact** | 80px | 100px | 12-16px | Actions rapides |
| **calculation** | 140px | - | 16-20px | Calculs interactifs |

### 4. États des Cartes

```typescript
states = {
  normal: { /* État par défaut */ },
  hover: { transform: "translateY(-2px)" },
  pressed: { transform: "scale(0.98)" },
  loading: { opacity: "0.7", pointerEvents: "none" },
  disabled: { opacity: "0.5", pointerEvents: "none" }
}
```

## Composant CardBase

### Props Principales

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'hero' \| 'standard' \| 'compact' \| 'calculation'` | `'standard'` | Type de carte |
| `state` | `'normal' \| 'hover' \| 'pressed' \| 'loading' \| 'disabled'` | `'normal'` | État visuel |
| `accentColor` | `'violet' \| 'green' \| 'red' \| 'primary' \| 'none'` | `'none'` | Couleur d'accent |
| `interactive` | `boolean` | `false` | Active les interactions |
| `glassMorphism` | `boolean` | `true` | Effet glass |
| `header` | `ReactNode` | - | En-tête optionnel |
| `footer` | `ReactNode` | - | Pied de page optionnel |
| `badge` | `ReactNode` | - | Badge optionnel |

### Exemples d'Utilisation

#### 1. Carte Hero (Vue d'ensemble)

```tsx
<HeroCard
  accentColor="violet"
  badge={<StatusBadge status="active" />}
  header={<h1>Tableau de Bord</h1>}
>
  <MetricsGrid />
</HeroCard>
```

#### 2. Carte de Métrique

```tsx
<StandardCard
  accentColor="green"
  interactive
  header={<span>Chiffre d'affaires</span>}
>
  <div className="text-2xl font-bold">€45,231</div>
  <TrendIndicator value="+12.5%" trend="up" />
</StandardCard>
```

#### 3. Carte de Calcul

```tsx
<CalculationCard
  accentColor="violet"
  header={<>TVA à déclarer</>}
  footer={<CalculateButton />}
>
  <CalculationDetails />
</CalculationCard>
```

#### 4. Carte Compacte (Action rapide)

```tsx
<CompactCard interactive accentColor="primary">
  <ActionIcon />
  <span>Nouvelle facture</span>
</CompactCard>
```

## Patterns Responsive

### Mobile First Approach

```css
/* Mobile (par défaut) */
.card { 
  padding: 16px;
  min-height: 80px;
}

/* Tablette */
@media (min-width: 768px) {
  .card { 
    padding: 20px;
    min-height: 120px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .card { 
    padding: 24px;
    min-height: 140px;
  }
}
```

### Grilles Adaptatives

```tsx
// Grille responsive pour les cartes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {cards.map(card => <StandardCard key={card.id} {...card} />)}
</div>
```

## Accessibilité

### ARIA Attributes

- `aria-disabled`: Indique l'état désactivé
- `aria-busy`: Indique le chargement
- `role="button"`: Pour les cartes interactives
- `tabindex="0"`: Pour la navigation au clavier

### Contraste et Lisibilité

- Contraste minimum **4.5:1** pour le texte normal
- Contraste minimum **3:1** pour le texte large
- Focus visible avec ring de **2px minimum**

## Performance

### Optimisations

1. **Composants légers** : < 150 lignes de code
2. **CSS-in-JS minimal** : Utilisation de Tailwind classes
3. **Lazy loading** : Pour les contenus lourds
4. **Memoization** : Pour les calculs coûteux

### Bundle Size

- CardBase: ~3.2KB gzipped
- Avec variants: ~4.8KB gzipped
- CSS utilities: ~1.2KB gzipped

## Guidelines d'Utilisation

### ✅ À Faire

1. **Utiliser les variantes prédéfinies** pour la cohérence
2. **Respecter la hiérarchie** : hero > standard > compact
3. **Limiter les couleurs d'accent** à 1-2 par écran
4. **Tester sur mobile** en premier
5. **Utiliser l'interactivité** avec parcimonie

### ❌ À Éviter

1. **Surcharger les cartes** avec trop d'informations
2. **Mélanger trop de variantes** sur un même écran
3. **Utiliser des animations excessives**
4. **Ignorer les états de chargement**
5. **Oublier l'accessibilité**

## Migration et Intégration

### Étapes d'Intégration

1. **Importer les tokens** depuis `lib/design-tokens.ts`
2. **Utiliser CardBase** comme base pour toutes les cartes
3. **Appliquer les variantes** selon le contexte
4. **Tester la responsivité** sur tous les breakpoints
5. **Valider l'accessibilité** avec les outils appropriés

### Exemple de Migration

```tsx
// Avant (ancien composant)
<div className="card custom-styles">
  <h2>{title}</h2>
  <p>{content}</p>
</div>

// Après (avec CardBase)
<StandardCard
  accentColor="violet"
  interactive
  header={<h2>{title}</h2>}
>
  <p>{content}</p>
</StandardCard>
```

## Évolutions Futures

### Roadmap

1. **Q1 2025**: Animation de transition entre états
2. **Q2 2025**: Thème sombre adaptatif
3. **Q3 2025**: Cartes skeleton pour le chargement
4. **Q4 2025**: Micro-interactions avancées

### Contribution

Pour proposer des améliorations :
1. Suivre les principes du design system
2. Documenter les nouveaux tokens
3. Tester sur tous les breakpoints
4. Valider avec l'équipe UX

## Support

Pour toute question sur le système de cartes :
- Consulter `design-system-bot` pour les tokens
- Voir `ui-designer` pour l'implémentation
- Contacter `ux-lead` pour la vision produit