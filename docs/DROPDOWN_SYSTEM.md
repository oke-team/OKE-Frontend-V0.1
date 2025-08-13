# Système de Dropdown Unifié OKÉ

## Vue d'ensemble

Le système de dropdown unifié d'OKÉ fournit une interface cohérente pour tous les menus déroulants de l'application. Il assure une expérience utilisateur uniforme sur desktop et mobile avec des adaptations automatiques.

## Composants

### 1. Dropdown (Conteneur principal)

Le composant racine qui gère l'état et le contexte du dropdown.

```tsx
import { Dropdown } from '@/components/ui/Dropdown';

<Dropdown
  variant="primary"  // 'default' | 'primary' | 'secondary' | 'success' | 'danger'
  size="md"         // 'sm' | 'md' | 'lg'
  value={selectedValue}
  onValueChange={handleChange}
>
  {/* Children components */}
</Dropdown>
```

### 2. DropdownTrigger

Le bouton qui déclenche l'ouverture du dropdown.

```tsx
import { DropdownTrigger } from '@/components/ui/Dropdown';

<DropdownTrigger>
  <Icon />
  <span>Label</span>
</DropdownTrigger>
```

### 3. DropdownMenu

Le conteneur du menu qui s'affiche.

```tsx
import { DropdownMenu } from '@/components/ui/Dropdown';

<DropdownMenu align="left">  // 'left' | 'center' | 'right'
  {/* Menu items */}
</DropdownMenu>
```

### 4. DropdownItem

Un élément du menu.

```tsx
import { DropdownItem } from '@/components/ui/DropdownItem';

<DropdownItem
  value="option1"
  selected={isSelected}
  disabled={false}
  onClick={handleClick}
  icon={<Icon />}
  badge="PRO"
  sublabel="Additional info"
>
  Main label
</DropdownItem>
```

### 5. DropdownSection

Groupe des éléments avec un label optionnel.

```tsx
import { DropdownSection, DropdownSeparator } from '@/components/ui/DropdownSection';

<DropdownSection label="Section Title">
  {/* Items */}
</DropdownSection>

<DropdownSeparator />
```

## Variants

### Default (Neutre)
```tsx
<Dropdown variant="default">
```
- Background : `bg-white/90`
- Border : `border-neutral-200/50`
- Text : `text-neutral-700`

### Primary (Bleu)
```tsx
<Dropdown variant="primary">
```
- Background : `bg-primary-500/[0.08]`
- Border : `border-primary-500/20`
- Text : `text-primary-500`

### Secondary (Violet)
```tsx
<Dropdown variant="secondary">
```
- Background : `bg-secondary-500/[0.08]`
- Border : `border-secondary-500/20`
- Text : `text-secondary-500`

### Success (Vert)
```tsx
<Dropdown variant="success">
```
- Background : `bg-green-500/[0.08]`
- Border : `border-green-500/20`
- Text : `text-green-500`

### Danger (Rouge)
```tsx
<Dropdown variant="danger">
```
- Background : `bg-red-500/[0.08]`
- Border : `border-red-500/20`
- Text : `text-red-500`

## Tailles

### Small
```tsx
<Dropdown size="sm">
```
- Height : `36px`
- Padding : `8px 12px`
- Font : `text-sm`

### Medium (défaut)
```tsx
<Dropdown size="md">
```
- Height : `40px`
- Padding : `10px 16px`
- Font : `text-sm`

### Large
```tsx
<Dropdown size="lg">
```
- Height : `48px`
- Padding : `12px 20px`
- Font : `text-base`

## Exemples d'utilisation

### Sélecteur d'entreprise

```tsx
import { CompanySelector } from '@/components/ui/CompanySelector';

<CompanySelector
  companies={companies}
  currentCompany={currentCompany}
  onCompanyChange={handleCompanyChange}
  size="md"
/>
```

### Sélecteur de période

```tsx
import { PeriodSelector } from '@/components/ui/PeriodSelector';

<PeriodSelector
  size="md"
  variant="success"
/>
```

### Dropdown personnalisé

```tsx
<Dropdown variant="primary" size="md">
  <DropdownTrigger>
    <Settings className="w-4 h-4" />
    <span>Options</span>
  </DropdownTrigger>
  
  <DropdownMenu>
    <DropdownSection label="Paramètres">
      <DropdownItem icon={<User />}>
        Profil
      </DropdownItem>
      <DropdownItem icon={<Bell />}>
        Notifications
      </DropdownItem>
    </DropdownSection>
    
    <DropdownSeparator />
    
    <DropdownItem icon={<LogOut />} onClick={handleLogout}>
      Déconnexion
    </DropdownItem>
  </DropdownMenu>
</Dropdown>
```

## Comportement Responsive

### Desktop (≥768px)
- Dropdown classique qui s'ouvre sous le trigger
- Positionnement automatique pour éviter le débordement
- Fermeture au clic extérieur

### Mobile (<768px)
- Bottom sheet qui slide depuis le bas
- Overlay sombre en arrière-plan
- Barre de handle pour le swipe
- Hauteur maximale de 70% de l'écran

## Accessibilité

- Navigation au clavier supportée (Tab, Entrée, Échap)
- Attributs ARIA appropriés
- Focus visible sur tous les éléments interactifs
- Annonce des changements d'état pour les lecteurs d'écran

## Animations

Les animations utilisent Framer Motion pour des transitions fluides :

- **Ouverture** : Fade in + scale de 0.95 à 1
- **Fermeture** : Fade out + scale de 1 à 0.95
- **Hover sur items** : Translation X de 2px
- **Tap sur items** : Scale de 0.98
- **Rotation chevron** : 180° à l'ouverture

## Personnalisation

### Via props
```tsx
<DropdownItem
  className="custom-class"
  icon={<CustomIcon />}
  badge={<CustomBadge />}
/>
```

### Via CSS
```css
.custom-dropdown {
  --dropdown-trigger-bg: rgba(255, 255, 255, 0.95);
  --dropdown-trigger-border: rgba(0, 0, 0, 0.1);
  --dropdown-menu-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}
```

## Best Practices

1. **Toujours utiliser les variants prédéfinis** pour maintenir la cohérence
2. **Limiter le nombre d'items** à 10-15 maximum pour une meilleure UX
3. **Grouper les items liés** avec DropdownSection
4. **Utiliser des icônes** pour améliorer la reconnaissance visuelle
5. **Fournir un feedback visuel** sur l'item sélectionné
6. **Gérer les états de chargement** avec un spinner si nécessaire
7. **Tester sur mobile** pour s'assurer du bon fonctionnement du bottom sheet

## Migration depuis l'ancien système

Si vous aviez un ancien dropdown :

```tsx
// Ancien
<div className="dropdown">
  <button onClick={toggle}>Select</button>
  {isOpen && (
    <div className="menu">
      {items.map(item => <div>{item}</div>)}
    </div>
  )}
</div>

// Nouveau
<Dropdown>
  <DropdownTrigger>Select</DropdownTrigger>
  <DropdownMenu>
    {items.map(item => (
      <DropdownItem key={item.id}>
        {item.label}
      </DropdownItem>
    ))}
  </DropdownMenu>
</Dropdown>
```

## Troubleshooting

### Le dropdown ne se ferme pas
- Vérifier que le contexte Dropdown englobe tous les composants
- S'assurer que le handleClickOutside est bien configuré

### Les animations sont saccadées
- Vérifier que Framer Motion est bien installé
- Utiliser `will-change: transform` sur les éléments animés

### Le bottom sheet ne fonctionne pas sur mobile
- Vérifier la détection de la taille d'écran
- S'assurer que les styles fixed sont appliqués

## Support

Pour toute question ou problème, consultez la documentation complète ou contactez l'équipe de développement.