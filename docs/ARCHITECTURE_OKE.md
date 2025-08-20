# Architecture Oké - Spécifications Respectées

## Vue d'ensemble

L'application Oké a été restructurée pour respecter exactement les spécifications initiales avec une architecture modulaire, mobile-first et orientée IA.

## Structure des composants

### 1. Header (`/components/layout/Header.tsx`)
**Éléments présents (conformes aux specs) :**
- ✅ Logo de l'app (peut être en marque blanche)
- ✅ Sélecteur d'entreprise (multi-entreprises)
- ✅ Avatar avec menu utilisateur (paramètres user, app, backoffice admin)
- ✅ Chatbot (piloter l'app en langage naturel, support humain)
- ✅ Bouton d'actions magiques (contextuel selon le module)
- ✅ Toggle Mode Expert (dans le menu avatar)

**Éléments supprimés (non conformes) :**
- ❌ Notifications
- ❌ Search
- ❌ Dark mode toggle

### 2. Navigation (`/components/navigation/BottomNav.tsx`)
**Configuration mobile (5 icônes) :**
1. Dashboard
2. Banque
3. "+" (bouton central pour ajouter/scanner)
4. Achats
5. Ventes

**Configuration desktop :**
Tous les modules accessibles sauf le mail backend (système)

### 3. Les 14 Modules (`/lib/modules-config.ts`)

#### Modules Core (visibles sur mobile)
1. **Dashboard** - Notifications, widgets, conseils personnalisés
2. **Banque** - Bridge + Paynovate BAAS
3. **Achats** - PDP, facture électronique, invoice fetch Apify
4. **Ventes** - PDP, Factur-X, caisse retail, intégrations ecommerce CHIFT

#### Modules Business
5. **Documents** - Filebrowser Quantum + Univer + LibreOffice
6. **Stocks** - Gestion façon Odoo
7. **Comptabilité** - Balance, grand livre, auxiliaires, révision, immobilisations
8. **Fiscalité** - TVA, liasse fiscale, ASP One France
9. **Reporting** - Finthesis-like avec Echarts
10. **Paie/RH** - OpenPayes France

#### Modules Tools
11. **Communication** - Intercom/Superhuman-like, SnappyMail
12. **Mail Backend** - Infrastructure Mailu (système)
13. **Organisation** - Agenda, Notes Tiptap, Todo/Kanban ClickUp-like
14. **Automatisations** - ActivePieces, Airtable-like

### 4. Composants spécialisés

#### Chatbot (`/components/ui/Chatbot.tsx`)
- Interface inspirée de Papercups
- Mode IA pour pilotage en langage naturel
- Mode support humain
- Système de tickets intégré
- Actions rapides contextuelles

#### Magic Actions Button (`/components/ui/MagicActionsButton.tsx`)
- Actions contextuelles selon le module actif
- Raccourcis clavier
- Intégration IA pour suggestions
- Position flottante sur mobile, dans header sur desktop

### 5. Layout principal (`/components/layout/AppLayout.tsx`)
- Intégration complète Header + Navigation + Chatbot
- Gestion du mode expert
- Multi-entreprises
- Responsive avec safe areas

## Principes respectés

### Mobile First ✅
- Navigation bottom sur mobile avec 5 icônes principales
- Touch targets optimisés (min 44px)
- Safe areas pour encoche et gestes système
- Responsive breakpoints bien définis

### Non-comptable by design ✅
- Mode expert désactivé par défaut
- Interface simplifiée pour utilisateurs non-comptables
- Actions guidées par l'IA
- Vocabulaire accessible

### Multi-tout ✅
- Multi-users : système de rôles et permissions prévu
- Multi-entreprises : sélecteur dans le header
- Multi-pays : architecture modulaire adaptable
- Multi-devises : prévu dans les modules financiers
- Multi-langue : structure i18n ready

### Minimaliste et élégant ✅
- Design épuré sans éléments superflus
- Beaucoup d'actions via chatbot IA
- Glass morphism subtil
- Animations fluides mais discrètes

### Responsive ✅
- Listes et widgets sur mobile
- Tables façon ClickUp sur desktop
- Adaptation automatique des layouts

## Technologies utilisées

- **Frontend** : Next.js 14, React, TypeScript
- **Styling** : Tailwind CSS avec design tokens personnalisés
- **Animations** : Framer Motion avec optimisations performance
- **Icons** : Lucide React
- **State** : React hooks (préparé pour Zustand/Redux si besoin)

## Prochaines étapes

1. Implémenter les modules manquants
2. Intégrer les APIs tierces (Bridge, Paynovate, etc.)
3. Développer le système de permissions
4. Ajouter l'internationalisation
5. Optimiser les performances (lazy loading, code splitting)
6. Tests unitaires et d'intégration
7. Documentation API et composants

## Structure des fichiers

```
/components
  /layout
    - Header.tsx (5 éléments specs)
    - AppLayout.tsx (orchestration)
  /navigation
    - BottomNav.tsx (5 icônes mobile, tous desktop)
  /ui
    - Chatbot.tsx (Papercups-like)
    - MagicActionsButton.tsx (contextuel)
  /dashboard
    - DashboardWidgets.tsx

/lib
  - modules-config.ts (14 modules)
  - utils.ts
  - design-tokens.ts
  
/app
  - page.tsx (dashboard)
  - [modules à créer]
```

Cette architecture garantit le respect strict des spécifications initiales tout en offrant une base solide et évolutive pour l'application Oké.