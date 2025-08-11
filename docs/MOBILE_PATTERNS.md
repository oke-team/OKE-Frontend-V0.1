# Mobile Patterns - OKÉ V0.1

## 📱 Patterns Mobile-First

Ce document définit les patterns d'interface et d'interaction spécifiques au mobile pour assurer une expérience optimale sur tous les appareils.

## 🎯 Principes Mobile-First

### 1. Performance First
- **Lazy loading** des images et composants lourds
- **Pagination** ou **infinite scroll** pour les listes
- **Optimisation** des bundles JavaScript
- **Cache** agressif avec Service Worker

### 2. Touch First
- **Zones tactiles** minimum 44x44px (recommandation Apple)
- **Espacement** suffisant entre éléments cliquables
- **Gestures** naturelles (swipe, pinch, long press)
- **Feedback** visuel immédiat sur interaction

### 3. Content First
- **Hiérarchie** claire de l'information
- **Progressive disclosure** : révéler progressivement
- **Priorité** au contenu essentiel
- **Réduction** du bruit visuel

## 📐 Breakpoints et Layouts

### Breakpoints Standards
```css
/* Extra Small (Portrait phones) */
@media (max-width: 474px) {
  /* Stack tout verticalement */
}

/* Small (Landscape phones) */
@media (min-width: 475px) and (max-width: 639px) {
  /* Début de layouts 2 colonnes */
}

/* Medium (Tablets) */
@media (min-width: 640px) and (max-width: 767px) {
  /* Layouts hybrides */
}

/* Large (Small laptops) */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Transition vers desktop */
}

/* Extra Large (Desktop) */
@media (min-width: 1024px) {
  /* Full desktop experience */
}
```

### Layout Patterns

#### Pattern 1: Stack Mobile → Grid Desktop
```tsx
// Mobile: Tout empilé
// Desktop: Grille
<div className="
  flex flex-col space-y-4      // Mobile
  md:grid md:grid-cols-2 md:gap-4  // Tablet
  lg:grid-cols-3                   // Desktop
">
  <Card />
  <Card />
  <Card />
</div>
```

#### Pattern 2: Bottom Sheet Mobile → Sidebar Desktop
```tsx
// Mobile: Bottom sheet
<div className="
  fixed bottom-0 left-0 right-0    // Mobile
  md:relative md:w-80               // Desktop
">
  <Sidebar />
</div>
```

#### Pattern 3: Tabs Mobile → Split View Desktop
```tsx
// Mobile: Tabs
<div className="md:hidden">
  <TabView tabs={['Vue 1', 'Vue 2']}>
    <View1 />
    <View2 />
  </TabView>
</div>

// Desktop: Côte à côte
<div className="hidden md:grid grid-cols-2 gap-4">
  <View1 />
  <View2 />
</div>
```

## 🎨 Composants Mobile

### 1. Bottom Navigation
```tsx
const BottomNav = () => (
  <nav className="
    fixed bottom-0 left-0 right-0
    h-16 bg-white border-t
    flex items-center justify-around
    md:hidden
  ">
    <NavItem icon={<Home />} label="Accueil" active />
    <NavItem icon={<Chart />} label="Stats" />
    <FloatingActionButton />
    <NavItem icon={<Settings />} label="Paramètres" />
    <NavItem icon={<User />} label="Profil" />
  </nav>
);
```

### 2. Pull to Refresh
```tsx
const PullToRefresh = ({ onRefresh, children }) => {
  const [pulling, setPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  
  const handleTouchStart = (e: TouchEvent) => {
    if (window.scrollY === 0) {
      setPulling(true);
    }
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    if (pulling) {
      const distance = e.touches[0].clientY;
      setPullDistance(Math.min(distance, 100));
    }
  };
  
  const handleTouchEnd = () => {
    if (pullDistance > 50) {
      onRefresh();
    }
    setPulling(false);
    setPullDistance(0);
  };
  
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {pullDistance > 0 && (
        <div style={{ height: pullDistance }}>
          <Spinner />
        </div>
      )}
      {children}
    </div>
  );
};
```

### 3. Swipeable Cards
```tsx
const SwipeableCard = ({ onSwipeLeft, onSwipeRight, children }) => {
  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  
  const bind = useDrag(({ down, movement: [mx], cancel }) => {
    if (!down && Math.abs(mx) > 100) {
      if (mx > 0) onSwipeRight();
      else onSwipeLeft();
      cancel();
    }
    
    api.start({ 
      x: down ? mx : 0,
      immediate: down 
    });
  });
  
  return (
    <animated.div
      {...bind()}
      style={{ x }}
      className="touch-none"
    >
      {children}
    </animated.div>
  );
};
```

### 4. Action Sheet
```tsx
const ActionSheet = ({ isOpen, onClose, actions }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
        
        {/* Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          className="fixed bottom-0 left-0 right-0 z-50
                     bg-white rounded-t-2xl p-4"
        >
          <div className="w-12 h-1 bg-gray-300 rounded-full 
                          mx-auto mb-4" />
          
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={() => {
                action.onClick();
                onClose();
              }}
              className="w-full p-4 text-left hover:bg-gray-50
                         flex items-center gap-3"
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
          
          <button
            onClick={onClose}
            className="w-full p-4 text-center font-medium
                       text-red-500 mt-2"
          >
            Annuler
          </button>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
```

### 5. Floating Labels
```tsx
const FloatingLabelInput = ({ label, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;
  
  return (
    <div className="relative">
      <input
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-3 pt-5 pb-2 border rounded-lg"
      />
      <label
        className={`
          absolute left-3 transition-all
          ${focused || hasValue 
            ? 'top-1 text-xs text-blue-500' 
            : 'top-3.5 text-base text-gray-500'}
        `}
      >
        {label}
      </label>
    </div>
  );
};
```

## 🖱️ Gestures et Interactions

### Gestures Supportées
```typescript
// Tap
onClick={() => handleTap()}

// Double Tap
onDoubleClick={() => handleDoubleTap()}

// Long Press
onMouseDown={() => startTimer()}
onMouseUp={() => clearTimer()}
onTouchStart={() => startTimer()}
onTouchEnd={() => clearTimer()}

// Swipe
onTouchStart={handleTouchStart}
onTouchMove={handleTouchMove}
onTouchEnd={handleTouchEnd}

// Pinch to Zoom
onWheel={handlePinch}
onTouchMove={handlePinchTouch}
```

### Feedback Haptique (iOS)
```typescript
// Vibration API (Android + certains iOS)
const hapticFeedback = (type: 'light' | 'medium' | 'heavy') => {
  if ('vibrate' in navigator) {
    const patterns = {
      light: 10,
      medium: 20,
      heavy: 30
    };
    navigator.vibrate(patterns[type]);
  }
};
```

## 📊 Patterns de Navigation

### 1. Tab Navigation
```tsx
const TabNavigation = ({ tabs, activeTab, onChange }) => (
  <div className="flex border-b">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`
          flex-1 py-3 text-sm font-medium
          ${activeTab === tab.id 
            ? 'border-b-2 border-primary-500 text-primary-500' 
            : 'text-gray-500'}
        `}
      >
        {tab.label}
      </button>
    ))}
  </div>
);
```

### 2. Drawer Navigation
```tsx
const Drawer = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          className="fixed left-0 top-0 bottom-0 w-80
                     bg-white z-50 shadow-xl"
        >
          {children}
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
```

### 3. Stack Navigation
```tsx
const StackNavigator = ({ screens, currentScreen }) => {
  const [history, setHistory] = useState([currentScreen]);
  
  const navigate = (screen: string) => {
    setHistory([...history, screen]);
  };
  
  const goBack = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
    }
  };
  
  const current = history[history.length - 1];
  
  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
        >
          {screens[current]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
```

## 🎨 Adaptations Visuelles

### Densité d'Information
```tsx
// Mobile: Moins dense, plus d'espace
<div className="p-4 space-y-4">
  <Card className="p-4">
    <h3 className="text-lg">Titre</h3>
    <p className="text-sm mt-2">Description</p>
  </Card>
</div>

// Desktop: Plus dense, optimisé
<div className="p-2">
  <Card className="p-3">
    <h3 className="text-base">Titre</h3>
    <p className="text-xs mt-1">Description</p>
  </Card>
</div>
```

### Typographie Responsive
```css
/* Mobile: Tailles plus grandes pour lisibilité */
.text-responsive {
  font-size: 16px;  /* Mobile */
}

@media (min-width: 768px) {
  .text-responsive {
    font-size: 14px;  /* Desktop */
  }
}
```

## ⚡ Performance Mobile

### 1. Lazy Loading Images
```tsx
const LazyImage = ({ src, alt, ...props }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, [src]);
  
  return (
    <img
      ref={imgRef}
      src={imageSrc || '/placeholder.png'}
      alt={alt}
      {...props}
    />
  );
};
```

### 2. Virtual Scrolling
```tsx
import { FixedSizeList } from 'react-window';

const VirtualList = ({ items, itemHeight = 50 }) => (
  <FixedSizeList
    height={window.innerHeight}
    itemCount={items.length}
    itemSize={itemHeight}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>
        {items[index]}
      </div>
    )}
  </FixedSizeList>
);
```

### 3. Debounced Search
```tsx
const DebouncedSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) onSearch(query);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query, onSearch]);
  
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Rechercher..."
      className="w-full p-3 rounded-lg"
    />
  );
};
```

## 📱 PWA Configuration

### Manifest.json
```json
{
  "name": "OKÉ Business Management",
  "short_name": "OKÉ",
  "theme_color": "#5e72ff",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}
```

### Service Worker
```javascript
// Service Worker pour mode offline
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('oke-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/dashboard',
        '/offline.html',
        '/styles/app.css',
        '/scripts/app.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match('/offline.html');
    })
  );
});
```

## 🔧 Testing Mobile

### Checklist de Test
- [ ] Test sur vrais appareils (iOS/Android)
- [ ] Test orientation (portrait/paysage)
- [ ] Test offline/online
- [ ] Test performances (3G/4G)
- [ ] Test accessibilité (VoiceOver/TalkBack)
- [ ] Test gestures tactiles
- [ ] Test zoom et pinch
- [ ] Test clavier virtuel

### Outils Recommandés
- Chrome DevTools Device Mode
- Safari Web Inspector
- BrowserStack pour tests multi-appareils
- Lighthouse pour audits PWA

## 📚 Ressources

- [Frontend Guidelines](./FRONTEND_GUIDELINES.md)
- [Design System](./DESIGN_SYSTEM.md)
- [Component Catalog](./COMPONENT_CATALOG.md)
- [Module Template](./MODULE_TEMPLATE.md)