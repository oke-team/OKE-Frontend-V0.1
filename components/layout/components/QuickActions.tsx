'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wand2, 
  Plus, 
  FileText, 
  Users, 
  Calculator, 
  CreditCard,
  Upload,
  Download,
  Settings,
  Sparkles,
  Zap,
  ChevronDown
} from 'lucide-react';
import { liquidGlass } from '@/lib/design-system/liquid-glass';

interface QuickActionsProps {
  onMagicActions?: () => void;
  expertMode?: boolean;
  layout?: 'mobile' | 'tablet' | 'desktop';
  className?: string;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  shortcut?: string;
  color: string;
  category: 'create' | 'import' | 'magic' | 'admin';
  expertOnly?: boolean;
  description: string;
}

/**
 * QuickActions - Actions rapides restaurées et améliorées
 * 
 * Caractéristiques :
 * - Bouton Magic Actions restauré et amélioré
 * - Menu contextuel intelligent selon le module actif
 * - Support du mode Expert avec actions avancées
 * - Raccourcis clavier intégrés
 * - Animations fluides et feedback visuel
 * - Layout adaptatif selon l'écran
 */
const QuickActions: React.FC<QuickActionsProps> = ({
  onMagicActions,
  expertMode = false,
  layout = 'desktop',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Actions rapides disponibles
  const quickActions: QuickAction[] = [
    // Actions de création
    {
      id: 'new-invoice',
      label: 'Nouvelle facture',
      icon: FileText,
      shortcut: 'Cmd+N',
      color: 'from-blue-500 to-blue-600',
      category: 'create',
      description: 'Créer une nouvelle facture client'
    },
    {
      id: 'new-client',
      label: 'Nouveau client',
      icon: Users,
      shortcut: 'Cmd+Shift+C',
      color: 'from-emerald-500 to-emerald-600',
      category: 'create',
      description: 'Ajouter un nouveau client'
    },
    {
      id: 'new-transaction',
      label: 'Nouvelle écriture',
      icon: Calculator,
      shortcut: 'Cmd+T',
      color: 'from-purple-500 to-purple-600',
      category: 'create',
      description: 'Saisir une nouvelle écriture comptable'
    },
    {
      id: 'new-payment',
      label: 'Nouveau paiement',
      icon: CreditCard,
      color: 'from-indigo-500 to-indigo-600',
      category: 'create',
      description: 'Enregistrer un paiement'
    },
    
    // Actions d\'import
    {
      id: 'import-bank',
      label: 'Importer relevé bancaire',
      icon: Upload,
      color: 'from-amber-500 to-amber-600',
      category: 'import',
      description: 'Importer des données bancaires'
    },
    {
      id: 'export-data',
      label: 'Exporter les données',
      icon: Download,
      color: 'from-teal-500 to-teal-600',
      category: 'import',
      expertOnly: true,
      description: 'Exporter vers Excel ou CSV'
    },

    // Actions magiques IA
    {
      id: 'magic-categorize',
      label: 'Catégoriser automatiquement',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-600',
      category: 'magic',
      description: 'IA catégorise vos transactions'
    },
    {
      id: 'magic-reconcile',
      label: 'Rapprochement intelligent',
      icon: Zap,
      color: 'from-violet-500 to-purple-600',
      category: 'magic',
      expertOnly: true,
      description: 'IA fait le rapprochement bancaire'
    },

    // Actions admin
    {
      id: 'advanced-settings',
      label: 'Paramètres avancés',
      icon: Settings,
      color: 'from-slate-500 to-slate-600',
      category: 'admin',
      expertOnly: true,
      description: 'Configuration avancée'
    }
  ];

  // Filtrer les actions selon le mode expert
  const availableActions = quickActions.filter(action => 
    !action.expertOnly || expertMode
  );

  // Grouper les actions par catégorie
  const actionsByCategory = availableActions.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = [];
    }
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, QuickAction[]>);

  // Gestion des clics extérieurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Actions rapides avec raccourcis
      availableActions.forEach(action => {
        if (action.shortcut) {
          const keys = action.shortcut.toLowerCase().split('+');
          const hasCmd = keys.includes('cmd') && (e.metaKey || e.ctrlKey);
          const hasShift = keys.includes('shift') && e.shiftKey;
          const key = keys[keys.length - 1];
          
          if (hasCmd && e.key.toLowerCase() === key && (!keys.includes('shift') || hasShift)) {
            e.preventDefault();
            handleActionClick(action);
          }
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [availableActions]);

  const handleActionClick = (action: QuickAction) => {
    console.log(`Action executed: ${action.id}`);
    setIsOpen(false);
    
    // Actions spéciales
    if (action.category === 'magic') {
      onMagicActions?.();
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      create: 'Créer',
      import: 'Importer / Exporter',
      magic: 'Actions IA',
      admin: 'Administration'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getButtonStyles = () => {
    const base = 'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200';
    
    switch (layout) {
      case 'mobile':
        return `${base} w-full justify-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg`;
      case 'tablet':
        return `${base} bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl`;
      case 'desktop':
      default:
        return `${base} bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl border border-primary-600/20`;
    }
  };

  const getButtonContent = () => {
    if (layout === 'mobile') {
      return (
        <>
          <Wand2 size={18} />
          <span className="font-medium">Actions Rapides</span>
        </>
      );
    }
    
    return (
      <>
        <Wand2 size={16} />
        <span className="font-medium">Actions</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </>
    );
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Bouton principal */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={getButtonStyles()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Ouvrir le menu d'actions rapides"
        aria-expanded={isOpen}
      >
        {getButtonContent()}
      </motion.button>

      {/* Menu déroulant */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`
              absolute z-50 mt-2 w-80 
              ${layout === 'mobile' ? 'left-0 right-0' : 'right-0'}
            `}
            style={liquidGlass.effects.elevated}
          >
            <div className="rounded-xl overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-slate-200/30">
                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <Sparkles size={16} className="text-primary-600" />
                  Actions Rapides
                  {expertMode && (
                    <span className="px-2 py-0.5 text-xs bg-primary-100 text-primary-700 rounded-full">
                      Expert
                    </span>
                  )}
                </h3>
              </div>

              {/* Actions par catégorie */}
              <div className="max-h-96 overflow-y-auto">
                {Object.entries(actionsByCategory).map(([category, actions]) => (
                  <div key={category} className="p-2">
                    <div className="px-2 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {getCategoryLabel(category)}
                    </div>
                    
                    <div className="space-y-1 mt-1">
                      {actions.map((action) => {
                        const Icon = action.icon;
                        const isHovered = hoveredAction === action.id;
                        
                        return (
                          <motion.button
                            key={action.id}
                            onClick={() => handleActionClick(action)}
                            onMouseEnter={() => setHoveredAction(action.id)}
                            onMouseLeave={() => setHoveredAction(null)}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50/95 transition-colors text-left group"
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <motion.div
                              className={`p-2 rounded-lg bg-gradient-to-br ${action.color} text-white`}
                              animate={{
                                scale: isHovered ? 1.1 : 1,
                                rotate: isHovered ? 5 : 0
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <Icon size={14} />
                            </motion.div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-800 group-hover:text-slate-900">
                                  {action.label}
                                </span>
                                {action.shortcut && (
                                  <kbd className="px-1.5 py-0.5 text-xs bg-slate-100 text-slate-500 rounded border">
                                    {action.shortcut}
                                  </kbd>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {action.description}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 bg-slate-50/50 border-t border-slate-200/30">
                <div className="text-xs text-slate-500 text-center">
                  {expertMode ? (
                    <span className="flex items-center justify-center gap-1">
                      <Sparkles size={12} />
                      Mode Expert activé - Plus d'actions disponibles
                    </span>
                  ) : (
                    'Activez le Mode Expert pour plus d\'options'
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickActions;