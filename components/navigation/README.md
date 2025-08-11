# BottomNav Component

Un composant de navigation inférieure moderne avec des effets Liquid Glass inspirés d'Apple 2025 et des animations fluides Framer Motion.

## 🚀 Fonctionnalités

- **Design Liquid Glass** : Effets de transparence, backdrop blur et ombres douces
- **Responsive & Adaptatif** : 5 items sur mobile, tous les modules sur desktop
- **Animations Fluides** : Transitions douces avec Framer Motion et physics-based animations
- **Bouton Primaire Spécial** : Bouton "+" central avec effets visuels avancés (particules, rotation, glow)
- **Indicateur Actif** : Pill animée qui se déplace fluidement entre les items
- **Accessibilité Complète** : Navigation clavier, ARIA labels, screen reader support
- **TypeScript First** : Types complets et interfaces bien définies
- **Performance Optimisée** : Animations 60fps, lazy loading, memoization

## 📦 Installation

Le composant utilise ces dépendances (déjà installées dans le projet) :

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

## 🎨 Design System

Le composant utilise les tokens du design system OKE configurés dans :
- `/lib/design-tokens.ts` - Tokens de couleurs, espacements, ombres
- `/tailwind.config.ts` - Configuration Tailwind avec effets Glass

### Effets Liquid Glass

```tsx
// Backdrop blur + transparence
backdrop-blur-2xl bg-glass-light

// Ombres douces
shadow-glass-lg shadow-primary-500/25

// Bordures semi-transparentes  
border border-white/10

// Gradients subtils
bg-gradient-to-br from-white/5 via-white/2 to-transparent
```

## 🎯 Usage

### Usage Basique

```tsx
import { BottomNav } from '@/components/navigation';

function App() {
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <div className="min-h-screen">
      <main className="pb-24 md:pb-8">
        {/* Votre contenu */}
      </main>
      
      <BottomNav
        activeItem={activeItem}
        onItemSelect={setActiveItem}
      />
    </div>
  );
}
```

### Usage Avancé avec Layout

```tsx
import { AppLayout } from '@/components/layout';

function App() {
  return (
    <AppLayout>
      <YourPageContent />
    </AppLayout>
  );
}
```

### Configuration Personnalisée

```tsx
import { BottomNav } from '@/components/navigation';
import { MyCustomIcon } from 'lucide-react';

const customItems = [
  {
    id: 'custom',
    label: 'Custom',
    icon: MyCustomIcon,
    href: '/custom',
    category: 'core'
  },
  // ... autres items
];

<BottomNav
  activeItem="custom"
  onItemSelect={handleNavigation}
  items={customItems} // Items personnalisés
  variant="floating" // Style flottant
  className="custom-nav" // Classes CSS custom
/>
```

## 📱 Comportement Responsive

### Mobile (< 768px)
- **5 items visibles** : Dashboard, Banque, + (bouton primaire), Achats, Ventes
- **Hauteur fixe** : 80px avec safe area pour iPhone
- **Pleine largeur** avec padding latéral
- **Bouton "+" central** plus grand (56px) avec effets spéciaux

### Desktop (≥ 768px)  
- **Tous les modules visibles** (12 items par défaut)
- **Position flottante** centrée en bas avec bordure arrondie
- **Effet Glass prononcé** avec backdrop blur avancé
- **Layout horizontal** avec espacement optimal

## 🎨 Items de Navigation

### Items Core (Mobile + Desktop)
```tsx
const coreItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'bank', label: 'Banque', icon: Building2 },
  { id: 'add', label: 'Ajouter', icon: Plus, isPrimary: true },
  { id: 'purchases', label: 'Achats', icon: ShoppingCart },
  { id: 'sales', label: 'Ventes', icon: TrendingUp }
];
```

### Items Business (Desktop uniquement)
```tsx  
const businessItems = [
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'calendar', label: 'Calendrier', icon: Calendar }
];
```

### Items Tools (Desktop uniquement)
```tsx
const toolItems = [
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'payments', label: 'Paiements', icon: CreditCard },
  { id: 'settings', label: 'Paramètres', icon: Settings }
];
```

## ✨ Animations & Effets

### Bouton Primaire Central
- **Rotation au hover** : 15° de rotation au survol
- **Rotation active** : 45° quand actif (effet "+" vers "x")
- **Particules flottantes** : 3 particules animées quand actif
- **Glow pulsant** : Effet de lueur avec la couleur primaire
- **Scale animation** : Zoom subtil sur interaction

### Indicateur Actif
- **Pill fluide** : Barre qui se déplace entre les items avec spring physics
- **Morphing** : Changement de taille selon l'item actif
- **Couleur gradient** : Dégradé primary-400 → primary-500

### Transitions d'État
```tsx
const itemVariants = {
  inactive: { scale: 1, y: 0, filter: "brightness(0.7)" },
  active: { scale: 1.1, y: -2, filter: "brightness(1.2)" },
  hover: { scale: 1.05, y: -1, filter: "brightness(1.1)" }
};
```

## 🔧 API Reference

### BottomNavProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeItem` | `string` | `'dashboard'` | ID de l'item actuellement actif |
| `onItemSelect` | `(itemId: string) => void` | `undefined` | Callback appelé lors de la sélection |
| `className` | `string` | `undefined` | Classes CSS personnalisées |
| `items` | `NavItem[]` | `navigationItems` | Items de navigation personnalisés |
| `hidden` | `boolean` | `false` | Masquer la navigation |
| `variant` | `'default' \| 'minimal' \| 'floating'` | `'default'` | Variante de style |
| `disableAnimation` | `boolean` | `false` | Désactiver les animations |

### NavItem Interface

```tsx
interface NavItem {
  id: string;                    // Identifiant unique
  label: string;                 // Texte affiché
  icon: ComponentType<any>;      // Composant d'icône Lucide
  href: string;                  // URL de destination  
  isActive?: boolean;            // État actif
  isPrimary?: boolean;           // Bouton d'action primaire
  category?: NavCategory;        // Catégorie pour responsive
  disabled?: boolean;            // État désactivé
  badgeCount?: number;           // Badge de notification
  color?: string;                // Couleur personnalisée
}
```

## 🎪 Examples

### Exemple Simple
```tsx
import { BottomNavExample } from '@/components/examples/BottomNavExample';

<BottomNavExample />
```

### Exemple avec Router Next.js
```tsx  
import { useRouter } from 'next/navigation';
import { BottomNav } from '@/components/navigation';

function MyApp() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleNavigation = (itemId: string) => {
    setActiveItem(itemId);
    router.push(`/${itemId}`);
  };

  return (
    <BottomNav 
      activeItem={activeItem}
      onItemSelect={handleNavigation}
    />
  );
}
```

## 🎨 Customization

### Couleurs Personnalisées
Modifiez les couleurs dans `tailwind.config.ts` :

```ts
colors: {
  primary: {
    400: "#votre-couleur",
    500: "#votre-couleur", 
    600: "#votre-couleur"
  }
}
```

### Animations Personnalisées
Créez vos propres variantes d'animation :

```tsx
const customVariants = {
  inactive: { scale: 1, opacity: 0.7 },
  active: { scale: 1.2, opacity: 1 },
  hover: { scale: 1.1, opacity: 0.9 }
};
```

### Items Personnalisés
Remplacez les items par défaut :

```tsx
import { MyIcon } from 'lucide-react';

const myItems: NavItem[] = [
  {
    id: 'my-page',
    label: 'Ma Page', 
    icon: MyIcon,
    href: '/my-page',
    category: 'core'
  }
];

<BottomNav items={myItems} />
```

## 🔍 Accessibility

- ✅ **Navigation au clavier** : Tab, Arrow keys, Enter, Space
- ✅ **ARIA labels** : Descriptions complètes pour screen readers  
- ✅ **Focus management** : Focus visible et logique
- ✅ **Semantic HTML** : Structure nav/button appropriée
- ✅ **Color contrast** : Respect des standards WCAG AAA
- ✅ **Motion respect** : Respect de `prefers-reduced-motion`

## 📊 Performance

- 🚀 **60fps animations** : Optimisé pour la performance
- 🎯 **Lazy loading** : Icônes chargées à la demande
- 🧠 **Memoization** : React.memo pour éviter les re-renders
- 📦 **Bundle optimized** : Code splitting automatique
- ⚡ **CSS-in-JS minimal** : Utilise principalement Tailwind

## 🐛 Troubleshooting

### La navigation n'apparaît pas
- Vérifiez que `z-index` n'est pas masqué par d'autres éléments
- Assurez-vous que le parent a une hauteur suffisante

### Les animations sont saccadées
- Activez GPU acceleration : `transform: translateZ(0)`
- Réduisez la complexité des gradients en arrière-plan
- Vérifiez `will-change` sur les éléments animés

### Les icônes ne s'affichent pas
- Vérifiez l'import de `lucide-react`
- Assurez-vous que les composants d'icônes sont bien typés

## 🔄 Migration

### Depuis une version antérieure
1. Mettez à jour les imports vers les nouveaux chemins
2. Remplacez `onSelect` par `onItemSelect`  
3. Ajustez les types si vous utilisez des items personnalisés

## 📄 License

Ce composant fait partie du design system OKE Dashboard.