# Guide de Cohérence du Design System OKÉ

## 📋 Audit de Cohérence - Tunnel d'Onboarding

### 🎨 1. PROBLÈMES IDENTIFIÉS

#### A. Incohérence des Couleurs
- **Problème** : Utilisation de `primary-500` (#5e72ff bleu) au lieu de #FAA016 (orange OKÉ)
- **Fichiers concernés** : Tous les composants d'onboarding
- **Solution** : Migration vers les tokens V2 avec couleurs officielles

#### B. Valeurs Hardcodées
- **Problème** : Valeurs rgba() et hex hardcodées dans les composants
- **Exemples** :
  - `rgba(255, 255, 255, 0.05)` dans stepTransitions.ts
  - `rgba(0, 0, 0, 0.8)` dans onboarding-mobile.css
  - `#3b82f6` dans les styles CSS
- **Solution** : Utilisation des tokens `colors.glass.*`

#### C. Duplications de Styles Glass
- **Problème** : Effets Glass réimplémentés dans chaque composant
- **Solution** : Utilisation du composant `GlassContainer` unifié

#### D. Animations Non Standardisées
- **Problème** : Durées et easing functions variables
- **Solution** : Utilisation des tokens `animations.*`

### 🔧 2. STANDARDS À APPLIQUER

#### A. Palette de Couleurs Officielle
```typescript
// COULEURS PRINCIPALES
primary: "#FAA016"     // Orange OKÉ
secondary: "#4C34CE"   // Violet OKÉ

// UTILISATION
- Actions principales : primary
- Actions secondaires : secondary
- Texte : neutral.100 à neutral.900
- Arrière-plans : glass.white.*
- Bordures : glass.white.10 à glass.white.20
```

#### B. Effets Glass Standardisés
```typescript
// COMPOSANT STANDARD
<GlassContainer 
  variant="default"    // default | primary | secondary
  blur="md"           // sm | md | lg | xl | 2xl
  border="white"      // white | primary | secondary | none
  glow={false}        // Effet glow optionnel
>
  {/* Contenu */}
</GlassContainer>

// STYLES GLASS DIRECTS (si nécessaire)
import { glassStyles } from '@/lib/design-tokens-v2';
style={glassStyles.container.default}
```

#### C. Espacements Cohérents
```typescript
// ÉCHELLE D'ESPACEMENT (base 4px)
spacing: {
  1: "4px",    // Très petit
  2: "8px",    // Petit
  3: "12px",   // Compact
  4: "16px",   // Standard
  6: "24px",   // Large
  8: "32px",   // Très large
  11: "44px",  // Touch target minimum
}

// UTILISATION TAILWIND
p-4  // padding 16px
m-2  // margin 8px
gap-6 // gap 24px
```

#### D. Animations Unifiées
```typescript
// DURÉES STANDARD
duration: {
  fast: "150ms",
  normal: "200ms",
  medium: "300ms",
  slow: "500ms",
}

// EASING STANDARD
easing: {
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)", // Par défaut
}

// UTILISATION FRAMER MOTION
transition={{ 
  duration: 0.2,  // 200ms
  ease: [0.4, 0, 0.2, 1] 
}}
```

#### E. Responsive Mobile-First
```typescript
// BREAKPOINTS STANDARD
breakpoints: {
  sm: "640px",   // Téléphones
  md: "768px",   // Tablettes portrait
  lg: "1024px",  // Tablettes paysage
  xl: "1280px",  // Desktop
}

// TOUCH TARGETS
- Minimum 44px × 44px (iOS standard)
- Espacement tactile : min 8px entre éléments
```

### 📝 3. REFACTORING REQUIS

#### Phase 1 : Migration des Couleurs
- [ ] Remplacer toutes les références `primary-500` par `primary.500` (#FAA016)
- [ ] Remplacer `#5e72ff` par `#FAA016`
- [ ] Remplacer `#4a5eff` par `#4C34CE`
- [ ] Mettre à jour les gradients avec les nouvelles couleurs

#### Phase 2 : Élimination des Valeurs Hardcodées
- [ ] Remplacer les rgba() par les tokens `colors.glass.*`
- [ ] Remplacer les hex colors par les tokens appropriés
- [ ] Unifier les border-radius avec les tokens

#### Phase 3 : Composants Réutilisables
- [ ] Créer `GlassButton` unifié
- [ ] Créer `GlassCard` unifié
- [ ] Créer `GlassInput` unifié
- [ ] Migrer vers ces composants dans l'onboarding

#### Phase 4 : Animations Cohérentes
- [ ] Standardiser toutes les durées d'animation
- [ ] Unifier les transitions de page/étape
- [ ] Respecter `prefers-reduced-motion`

### 🎯 4. COMPOSANTS À CRÉER/MODIFIER

#### A. GlassContainer V2
```typescript
interface GlassContainerProps {
  variant?: 'default' | 'primary' | 'secondary' | 'elevated';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean | 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
}
```

#### B. GlassButton
```typescript
interface GlassButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

#### C. GlassInput
```typescript
interface GlassInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}
```

### 🔍 5. CHECKLIST DE VALIDATION

#### Avant chaque commit :
- [ ] Aucune couleur hardcodée (hex ou rgba)
- [ ] Utilisation des tokens de design-tokens-v2.ts
- [ ] Composants Glass réutilisables utilisés
- [ ] Animations avec durées standard
- [ ] Touch targets ≥ 44px sur mobile
- [ ] Contrastes WCAG AAA respectés
- [ ] Responsive mobile-first testé

#### Tests de cohérence :
- [ ] Vérifier la cohérence visuelle avec le dashboard
- [ ] Tester sur iPhone SE (375px) jusqu'à desktop
- [ ] Valider les animations avec reduced-motion
- [ ] Contrôler les performances (Lighthouse > 90)

### 📊 6. MÉTRIQUES DE SUCCÈS

- **Réutilisation** : > 80% des styles via tokens
- **Duplication** : < 5% de code dupliqué
- **Performance** : Build CSS < 50kb
- **Accessibilité** : Score WCAG AAA
- **Maintenance** : 1 seul fichier de tokens à maintenir

### 🚀 7. PLAN D'ACTION IMMÉDIAT

1. **Étape 1** : Mettre à jour tailwind.config.ts avec les couleurs OKÉ
2. **Étape 2** : Créer les composants Glass unifiés
3. **Étape 3** : Migrer OnboardingModal vers les nouveaux composants
4. **Étape 4** : Propager aux autres composants d'onboarding
5. **Étape 5** : Supprimer les styles dupliqués et hardcodés
6. **Étape 6** : Tester la cohérence complète

### 📚 8. RESSOURCES

- **Tokens V2** : `/lib/design-tokens-v2.ts`
- **Composants Glass** : `/components/ui/Glass*.tsx`
- **Documentation** : `/docs/DESIGN_SYSTEM.md`
- **Tailwind Config** : `/tailwind.config.ts`

---

## ⚠️ RÈGLES ABSOLUES

1. **JAMAIS** hardcoder une couleur - TOUJOURS utiliser les tokens
2. **JAMAIS** dupliquer un effet Glass - TOUJOURS utiliser GlassContainer
3. **JAMAIS** créer une nouvelle animation - TOUJOURS utiliser les tokens animations
4. **TOUJOURS** tester sur mobile avant desktop
5. **TOUJOURS** vérifier la cohérence avec le reste de l'app

---

*Document maintenu par le Design System Lead*
*Dernière mise à jour : ${new Date().toISOString()}*