# Component Catalog - OKÉ V0.1

## 📚 Catalogue des Composants Réutilisables

Ce document liste tous les composants réutilisables disponibles dans l'application avec leurs props, exemples d'usage et patterns.

## 🧩 Composants UI (Atomiques)

### Button
**Chemin** : À créer dans `/components/ui/Button.tsx`
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

// Usage
<Button variant="primary" size="md" onClick={handleClick}>
  Valider
</Button>
```

### Card
**Chemin** : À créer dans `/components/ui/Card.tsx`
```tsx
interface CardProps {
  glass?: boolean;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// Usage
<Card glass hover padding="md">
  <CardHeader>Titre</CardHeader>
  <CardContent>Contenu</CardContent>
</Card>
```

## 📊 Composants Partagés

### DataTable
**Chemin** : À extraire depuis GeneralLedgerTable
```tsx
interface DataTableProps {
  columns: Column[];
  data: any[];
  editable?: boolean;
  selectable?: boolean;
  expandable?: boolean;
  onEdit?: (row: any, field: string, value: any) => void;
  onSelect?: (selected: string[]) => void;
}

// Features
- Édition inline (double-clic)
- Navigation clavier (Tab, Flèches)
- Sélection multiple
- Expansion de lignes
- Tri et filtres
```

### StatsCard
**Chemin** : À extraire depuis DashboardEnriched
```tsx
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

// Usage
<StatsCard
  title="Chiffre d'affaires"
  value="42,150 €"
  change={12.5}
  trend="up"
  icon={<TrendingUp />}
/>
```

### FilterBar
**Chemin** : À créer dans `/components/shared/FilterBar.tsx`
```tsx
interface FilterBarProps {
  filters: Filter[];
  onFilterChange: (filters: FilterValues) => void;
  onSearch?: (query: string) => void;
  onExport?: () => void;
}

// Usage
<FilterBar
  filters={[
    { type: 'date', label: 'Période', key: 'period' },
    { type: 'select', label: 'Statut', key: 'status', options: [...] }
  ]}
  onFilterChange={handleFilters}
/>
```

### SplitView
**Chemin** : À créer dans `/components/shared/SplitView.tsx`
```tsx
interface SplitViewProps {
  left: React.ReactNode;
  right: React.ReactNode;
  mobileView?: 'swipe' | 'tabs' | 'stack';
  ratio?: '1:1' | '1:2' | '2:1';
}

// Usage Desktop : Affiche côte à côte
// Usage Mobile : Swipe entre les vues
<SplitView
  left={<BalanceTable />}
  right={<GeneralLedgerTable />}
  mobileView="swipe"
  ratio="1:1"
/>
```

## 🎨 Composants Layout

### AppLayout
**Chemin** : `/components/layout/AppLayout.tsx` ✅ Existant
```tsx
interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

// Features
- Header fixe
- Bottom navigation (mobile)
- Sidebar (desktop)
- Chatbot intégré
```

### HeaderFixed
**Chemin** : `/components/layout/HeaderFixed.tsx` ✅ Existant
```tsx
interface HeaderFixedProps {
  currentCompany: Company;
  onCompanyChange: (company: Company) => void;
  onChatOpen: () => void;
  activeModule: string;
  expertMode: boolean;
  onExpertModeToggle: () => void;
}
```

### UnifiedBottomNav
**Chemin** : `/components/navigation/UnifiedBottomNav.tsx` ✅ Existant
```tsx
interface UnifiedBottomNavProps {
  activeItem: string;
  onItemSelect: (itemId: string) => void;
}

// Features
- 5 icônes max
- Bouton central flottant
- Indicateur actif animé
- Responsive (caché sur desktop)
```

## 🔧 Composants Utilitaires

### Modal
**Chemin** : À créer dans `/components/ui/Modal.tsx`
```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

// Usage
<Modal isOpen={showModal} onClose={handleClose} title="Détails">
  <ModalContent />
</Modal>
```

### Dropdown
**Chemin** : À créer dans `/components/ui/Dropdown.tsx`
```tsx
interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  position?: 'bottom' | 'top' | 'left' | 'right';
}

// Usage
<Dropdown
  trigger={<Button>Options</Button>}
  items={[
    { label: 'Éditer', onClick: handleEdit, icon: <Edit /> },
    { label: 'Supprimer', onClick: handleDelete, danger: true }
  ]}
/>
```

### Toast
**Chemin** : À créer dans `/components/ui/Toast.tsx`
```tsx
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: { label: string; onClick: () => void };
}

// Usage via hook
const { showToast } = useToast();
showToast({
  message: 'Enregistrement réussi',
  type: 'success'
});
```

## 📱 Composants Mobile

### SwipeableViews
**Chemin** : À créer dans `/components/mobile/SwipeableViews.tsx`
```tsx
interface SwipeableViewsProps {
  children: React.ReactNode[];
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  indicators?: boolean;
}

// Usage
<SwipeableViews activeIndex={0} indicators>
  <View1 />
  <View2 />
  <View3 />
</SwipeableViews>
```

### FloatingActionButton
**Chemin** : À créer dans `/components/mobile/FloatingActionButton.tsx`
```tsx
interface FABProps {
  icon: React.ReactNode;
  onClick: () => void;
  position?: { bottom?: number; right?: number };
  actions?: FABAction[];
}

// Usage
<FloatingActionButton
  icon={<Plus />}
  onClick={handleAdd}
  actions={[
    { icon: <Camera />, label: 'Scanner', onClick: handleScan },
    { icon: <FileText />, label: 'Facture', onClick: handleInvoice }
  ]}
/>
```

## 🎭 Composants avec Effets

### GlassCard
**Chemin** : À créer dans `/components/ui/GlassCard.tsx`
```tsx
interface GlassCardProps {
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
  blur?: 'sm' | 'md' | 'lg';
}

// Usage avec effet Liquid Glass
<GlassCard hover glow blur="md">
  <div className="p-6">
    Contenu avec effet glass
  </div>
</GlassCard>
```

### AnimatedNumber
**Chemin** : À créer dans `/components/ui/AnimatedNumber.tsx`
```tsx
interface AnimatedNumberProps {
  value: number;
  format?: 'currency' | 'percent' | 'number';
  duration?: number;
  prefix?: string;
  suffix?: string;
}

// Usage
<AnimatedNumber 
  value={42150} 
  format="currency" 
  duration={1000}
/>
```

## 📋 Composants de Module

### Accounting

#### BalanceTable
**Chemin** : `/components/accounting/BalanceTable.tsx` ✅ Existant
- Table des comptes avec soldes
- Expansion pour voir les auxiliaires
- Sélection pour filtrer le grand livre

#### GeneralLedgerTable
**Chemin** : `/components/accounting/GeneralLedgerTable.tsx` ✅ Existant
- Table du grand livre
- Édition inline de toutes les cellules
- Navigation clavier complète
- Affichage des pièces jointes

## 🔄 Patterns de Composition

### Pattern Table Double
```tsx
// Desktop : Côte à côte
<div className="hidden md:grid grid-cols-2 gap-4">
  <BalanceTable />
  <GeneralLedgerTable />
</div>

// Mobile : Swipeable
<div className="md:hidden">
  <SwipeableViews>
    <BalanceTable />
    <GeneralLedgerTable />
  </SwipeableViews>
</div>
```

### Pattern Dashboard Module
```tsx
<AppLayout>
  {/* Header Section */}
  <div className="mb-6">
    <h1>Titre du Module</h1>
    <FilterBar />
  </div>
  
  {/* Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <StatsCard />
    <StatsCard />
    <StatsCard />
    <StatsCard />
  </div>
  
  {/* Main Content */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <DataTable />
    <Charts />
  </div>
</AppLayout>
```

### Pattern Formulaire
```tsx
<form className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Input label="Nom" />
    <Input label="Prénom" />
  </div>
  
  <Select label="Type" options={types} />
  
  <TextArea label="Description" rows={4} />
  
  <div className="flex justify-end gap-2">
    <Button variant="ghost">Annuler</Button>
    <Button variant="primary">Enregistrer</Button>
  </div>
</form>
```

## 🎨 Conventions de Style

### Classes Utilitaires
```css
/* Glass Effect */
.glass

/* Animations */
.hover-lift
.fade-in
.slide-up

/* Gradients */
.gradient-primary
.gradient-mesh

/* Text */
.gradient-text
```

### Props Standards
- `className` : Classes CSS additionnelles
- `style` : Styles inline (éviter si possible)
- `disabled` : État désactivé
- `loading` : État de chargement
- `error` : État d'erreur
- `variant` : Variante visuelle
- `size` : Taille du composant

## 📝 TODO : Composants à Extraire/Créer

### Priorité Haute
- [ ] DataTable (depuis GeneralLedgerTable)
- [ ] StatsCard (depuis DashboardEnriched)
- [ ] Button
- [ ] Input/Select/TextArea

### Priorité Moyenne
- [ ] Modal
- [ ] Toast
- [ ] Dropdown
- [ ] GlassCard

### Priorité Basse
- [ ] SwipeableViews
- [ ] FloatingActionButton
- [ ] AnimatedNumber
- [ ] Charts

## 🔗 Liens Utiles

- [Design System](./DESIGN_SYSTEM.md)
- [Frontend Guidelines](./FRONTEND_GUIDELINES.md)
- [Mobile Patterns](./MOBILE_PATTERNS.md)
- [Module Template](./MODULE_TEMPLATE.md)