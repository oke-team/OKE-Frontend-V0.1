# Module Template - OKÉ V0.1

## 📋 Template Standard pour Nouveaux Modules

Ce document fournit un template standardisé pour créer de nouveaux modules dans OKÉ, basé sur les patterns établis dans le module Accounting.

## 🏗️ Structure de Base d'un Module

### 1. Page Principale (`/app/[module]/page.tsx`)

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';
import { 
  // Importer les icônes nécessaires
  TrendingUp, 
  Download, 
  Upload,
  Filter,
  Plus
} from 'lucide-react';

// Import des données mockées
import { 
  getModuleData,
  getModuleStats 
} from '@/lib/mock-data/[module]';

// Import des composants du module
import ModuleMainView from '@/components/[module]/ModuleMainView';
import ModuleDetailView from '@/components/[module]/ModuleDetailView';

export default function ModulePage() {
  // État
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [filterOpen, setFilterOpen] = useState(false);
  const [stats, setStats] = useState<any>(null);
  
  // Hooks
  const router = useRouter();
  
  // Chargement des données
  useEffect(() => {
    const data = getModuleStats();
    setStats(data);
  }, []);
  
  // Handlers
  const handleExport = () => {
    console.log('Export des données');
  };
  
  const handleImport = () => {
    console.log('Import des données');
  };
  
  const handleAdd = () => {
    console.log('Ajouter un nouvel élément');
  };
  
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                Nom du Module
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                Description du module
              </p>
            </div>
            
            {/* Actions Header */}
            <div className="flex gap-2">
              <button className="btn-secondary">
                <Upload className="w-4 h-4 mr-2" />
                Importer
              </button>
              <button className="btn-secondary">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </button>
              <button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats && stats.map((stat: any, index: number) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
            />
          ))}
        </div>
        
        {/* Filter Bar */}
        <FilterBar 
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />
        
        {/* Main Content - Desktop: Split View, Mobile: Swipeable */}
        <div className="mt-6">
          {/* Desktop View */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            <ModuleMainView 
              onItemSelect={setSelectedItem}
              selectedItem={selectedItem}
            />
            <ModuleDetailView 
              selectedItem={selectedItem}
            />
          </div>
          
          {/* Mobile View */}
          <div className="md:hidden">
            <SwipeableViews>
              <ModuleMainView 
                onItemSelect={setSelectedItem}
                selectedItem={selectedItem}
                mobile
              />
              <ModuleDetailView 
                selectedItem={selectedItem}
                mobile
              />
            </SwipeableViews>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
```

### 2. Composant Principal (`/components/[module]/ModuleMainView.tsx`)

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DataTable from '@/components/shared/DataTable';
import { getMainData } from '@/lib/mock-data/[module]';

interface ModuleMainViewProps {
  onItemSelect?: (itemId: string) => void;
  selectedItem?: string | null;
  mobile?: boolean;
}

export default function ModuleMainView({
  onItemSelect,
  selectedItem,
  mobile = false
}: ModuleMainViewProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Charger les données mockées
    const mockData = getMainData();
    setData(mockData);
    setLoading(false);
  }, []);
  
  // Configuration des colonnes pour la table
  const columns = [
    { 
      key: 'id', 
      label: 'ID', 
      width: '80px',
      sortable: true 
    },
    { 
      key: 'name', 
      label: 'Nom',
      sortable: true,
      editable: true
    },
    { 
      key: 'status', 
      label: 'Statut',
      render: (value: string) => (
        <span className={`badge badge-${value}`}>
          {value}
        </span>
      )
    },
    { 
      key: 'amount', 
      label: 'Montant',
      align: 'right',
      format: 'currency'
    },
    { 
      key: 'date', 
      label: 'Date',
      format: 'date'
    }
  ];
  
  // Vue Mobile : Cards
  if (mobile) {
    return (
      <div className="space-y-4">
        {data.map((item) => (
          <motion.div
            key={item.id}
            className="glass rounded-xl p-4"
            whileHover={{ scale: 1.02 }}
            onClick={() => onItemSelect?.(item.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-neutral-500">
                  {item.date}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">{item.amount}</p>
                <span className={`badge badge-${item.status}`}>
                  {item.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
  
  // Vue Desktop : Table
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        Vue Principale
      </h2>
      
      <DataTable
        columns={columns}
        data={data}
        selectable
        editable
        onRowClick={(row) => onItemSelect?.(row.id)}
        selectedRows={selectedItem ? [selectedItem] : []}
        loading={loading}
      />
    </div>
  );
}
```

### 3. Structure des Données (`/lib/mock-data/[module].ts`)

```typescript
// Types
export interface ModuleEntity {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  amount: number;
  date: string;
  description?: string;
  metadata?: Record<string, any>;
}

// Données mockées
export const moduleEntities: ModuleEntity[] = [
  {
    id: 'MOD-001',
    name: 'Élément 1',
    status: 'active',
    amount: 1500.00,
    date: '2024-01-15',
    description: 'Description de l\'élément'
  },
  // ... plus de données
];

// Fonctions d'accès
export function getMainData(): ModuleEntity[] {
  return moduleEntities;
}

export function getEntityById(id: string): ModuleEntity | undefined {
  return moduleEntities.find(e => e.id === id);
}

export function getModuleStats() {
  return [
    {
      title: 'Total',
      value: moduleEntities.length,
      change: 12.5,
      icon: 'TrendingUp'
    },
    {
      title: 'Actifs',
      value: moduleEntities.filter(e => e.status === 'active').length,
      change: 5.2,
      icon: 'Activity'
    },
    // ... plus de stats
  ];
}

// Fonctions de manipulation
export function updateEntity(id: string, updates: Partial<ModuleEntity>) {
  const index = moduleEntities.findIndex(e => e.id === id);
  if (index !== -1) {
    moduleEntities[index] = { ...moduleEntities[index], ...updates };
  }
}

export function createEntity(entity: Omit<ModuleEntity, 'id'>): ModuleEntity {
  const newEntity = {
    ...entity,
    id: `MOD-${String(moduleEntities.length + 1).padStart(3, '0')}`
  };
  moduleEntities.push(newEntity);
  return newEntity;
}
```

## 🎯 Patterns d'Interaction

### Édition Inline
```typescript
// Double-clic pour éditer
const handleDoubleClick = (field: string) => {
  setEditingField(field);
  setEditValue(currentValue);
};

// Validation avec Enter
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    saveEdit();
  } else if (e.key === 'Escape') {
    cancelEdit();
  }
};
```

### Navigation Clavier
```typescript
// Navigation avec Tab et flèches
const handleNavigation = (e: KeyboardEvent) => {
  switch(e.key) {
    case 'Tab':
      e.preventDefault();
      moveToNextField(e.shiftKey ? -1 : 1);
      break;
    case 'ArrowUp':
      moveToRow(-1);
      break;
    case 'ArrowDown':
      moveToRow(1);
      break;
    case 'ArrowLeft':
      moveToColumn(-1);
      break;
    case 'ArrowRight':
      moveToColumn(1);
      break;
  }
};
```

### Sélection Multiple
```typescript
// Gestion de la sélection
const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

const handleSelectAll = (checked: boolean) => {
  if (checked) {
    setSelectedRows(new Set(data.map(d => d.id)));
  } else {
    setSelectedRows(new Set());
  }
};

const handleSelectRow = (id: string, checked: boolean) => {
  const newSelection = new Set(selectedRows);
  if (checked) {
    newSelection.add(id);
  } else {
    newSelection.delete(id);
  }
  setSelectedRows(newSelection);
};
```

## 📱 Responsive Design

### Breakpoints
```tsx
// Mobile First
<div className="
  grid grid-cols-1           // Mobile: 1 colonne
  sm:grid-cols-2             // Small: 2 colonnes
  md:grid-cols-3             // Medium: 3 colonnes
  lg:grid-cols-4             // Large: 4 colonnes
  gap-4
">
```

### Composants Adaptatifs
```tsx
// Affichage conditionnel Desktop/Mobile
<>
  {/* Desktop */}
  <div className="hidden md:block">
    <TableView />
  </div>
  
  {/* Mobile */}
  <div className="md:hidden">
    <CardView />
  </div>
</>
```

## 🎨 Styles Standards

### Boutons
```css
.btn-primary {
  @apply px-4 py-2 bg-primary-500 text-white rounded-lg 
         hover:bg-primary-600 transition-colors;
}

.btn-secondary {
  @apply px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg 
         hover:bg-neutral-300 transition-colors;
}
```

### Cards
```css
.card {
  @apply glass rounded-2xl p-6 hover:shadow-lg transition-shadow;
}

.card-header {
  @apply text-xl font-semibold mb-4;
}
```

### Badges
```css
.badge {
  @apply px-2 py-1 text-xs font-medium rounded-full;
}

.badge-active {
  @apply bg-green-100 text-green-800;
}

.badge-pending {
  @apply bg-yellow-100 text-yellow-800;
}
```

## ✅ Checklist Module

Avant de considérer un module comme complet :

### Structure
- [ ] Page principale dans `/app/[module]/`
- [ ] Composants dans `/components/[module]/`
- [ ] Données dans `/lib/mock-data/[module].ts`
- [ ] Types TypeScript définis

### Fonctionnalités
- [ ] Vue liste/grille
- [ ] Édition inline
- [ ] Navigation clavier
- [ ] Sélection multiple
- [ ] Filtres et recherche
- [ ] Export/Import
- [ ] Stats cards

### Responsive
- [ ] Vue mobile (cards)
- [ ] Vue tablet (hybride)
- [ ] Vue desktop (tables)
- [ ] Navigation swipe mobile

### Qualité
- [ ] Pas d'erreurs TypeScript
- [ ] Animations fluides
- [ ] Accessibilité (aria-labels)
- [ ] Performance optimisée

## 📚 Exemples de Référence

### Modules Existants
1. **Accounting** : Exemple de double table avec édition complexe
2. **Dashboard** : Exemple de widgets et graphiques

### Patterns à Réutiliser
- Double vue (maître/détail)
- Édition inline avec double-clic
- Navigation clavier complète
- Responsive mobile-first
- Effets Liquid Glass

## 🔗 Ressources

- [Frontend Guidelines](./FRONTEND_GUIDELINES.md)
- [Design System](./DESIGN_SYSTEM.md)
- [Component Catalog](./COMPONENT_CATALOG.md)
- [Mobile Patterns](./MOBILE_PATTERNS.md)