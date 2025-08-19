# Configuration des Agents Claude - OKÉ V0.1

## Palette de Couleurs Officielle OKÉ

### Couleurs Principales
- **Violet profond (logo)** : `#4C34CE` - Couleur principale de la marque
- **Orange doré (logo)** : `#FAA016` - Couleur secondaire d'accent

### Couleurs Complémentaires Homepage
- **Prune** : `#512952` - Élégance et sophistication
- **Bleu ciel** : `#6da4c3` - Fraîcheur et modernité
- **Bleu marine** : `#182752` - Professionnalisme et confiance
- **Gris ardoise** : `#2b3642` - Neutralité et équilibre

## Règles d'Utilisation des Couleurs

### ⚠️ INTERDICTIONS ABSOLUES
1. **JAMAIS de gradients mélangés** : Ne jamais créer de dégradé entre #4C34CE (violet) et #FAA016 (orange)
2. **Séparation stricte** : Les couleurs violet et orange doivent être utilisées séparément, jamais ensemble dans un même gradient
3. **Pas de mélanges** : Éviter de créer des teintes intermédiaires entre ces deux couleurs

### ✅ BONNES PRATIQUES
1. **Alternance** : Utiliser les couleurs en alternance pour créer du rythme visuel
2. **Hiérarchie** : Violet pour les éléments principaux, orange pour les accents
3. **Fond clair** : Privilégier les fonds blancs ou gris très clairs
4. **Contraste** : Assurer un contraste suffisant pour l'accessibilité

## Application aux Widgets Dashboard

### Attribution des Couleurs
- **Notifications** : Prune (#512952) - Pour attirer l'attention avec élégance
- **Banque** : Bleu marine (#182752) - Pour inspirer confiance et sécurité
- **Achats** : Gris ardoise (#2b3642) - Pour la neutralité professionnelle
- **Ventes** : Bleu ciel (#6da4c3) - Pour la positivité et la croissance

### Icônes Vibrantes
Les icônes doivent conserver leurs couleurs vives originales pour contraster avec les fonds plus sobres :
- Utiliser des couleurs saturées pour les icônes (vert, rouge, bleu vif, etc.)
- Maintenir une luminosité élevée pour les icônes
- Créer un contraste fort entre l'icône et le fond du widget

## Instructions pour les Agents

### design-system-bot
- Vérifier systématiquement que les gradients ne mélangent pas violet et orange
- S'assurer que les couleurs homepage sont utilisées de manière cohérente
- Valider que les fonds restent clairs et épurés

### ui-designer
- Créer des designs utilisant la palette complète de 6 couleurs
- Appliquer les couleurs homepage aux nouveaux composants
- Maintenir la séparation visuelle entre violet et orange

### component-crafter
- Implémenter les couleurs exactes dans le code
- Utiliser les variables CSS ou constantes pour les couleurs
- Éviter les valeurs hardcodées de couleurs

### animation-director
- Les animations peuvent transitionner entre les couleurs, mais jamais créer de mélange violet-orange
- Privilégier les transitions de luminosité plutôt que de teinte

## Exemples de Code

### Définition des Couleurs
```typescript
export const OKE_COLORS = {
  primary: '#4C34CE',      // Violet profond
  secondary: '#FAA016',    // Orange doré
  homepage1: '#512952',    // Prune
  homepage2: '#6da4c3',    // Bleu ciel
  homepage3: '#182752',    // Bleu marine
  homepage4: '#2b3642',    // Gris ardoise
};
```

### Utilisation Correcte
```css
/* ✅ BON - Gradient monochrome */
background: linear-gradient(135deg, #512952 0%, #3a1f3b 100%);

/* ❌ MAUVAIS - Mélange violet et orange */
background: linear-gradient(135deg, #4C34CE 0%, #FAA016 100%);
```

## Notes Importantes

1. **Cohérence** : Toujours utiliser les codes hexadécimaux exacts
2. **Documentation** : Référencer ce fichier dans tous les développements
3. **Validation** : Faire valider les choix de couleurs par l'agent design-system-bot
4. **Accessibilité** : Vérifier les ratios de contraste WCAG AA minimum

---

*Ce document doit être consulté par tous les agents travaillant sur l'interface OKÉ pour garantir une cohérence visuelle parfaite.*