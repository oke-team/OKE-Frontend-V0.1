'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X,
  Bell,
  CheckSquare,
  Calendar,
  MessageSquare,
  Building2,
  ShoppingCart,
  TrendingUp,
  UserCheck,
  CreditCard,
  Shield,
  Briefcase,
  BarChart3,
  Package,
  Zap,
  Mail,
  LayoutDashboard,
  Calculator,
  Receipt,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { modules } from '@/lib/modules-config';
import { useRouter } from 'next/navigation';

interface ModulesGridProps {
  isOpen: boolean;
  onClose: () => void;
  currentModule?: string;
}

// Mapping des icônes cohérentes avec le dashboard
const moduleIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  // Core modules
  'dashboard': LayoutDashboard,
  'bank': Building2, 
  'purchases': ShoppingCart,
  'sales': TrendingUp,
  
  // Business modules  
  'documents': Shield, // Proche de FileText mais plus distinctif
  'stocks': Package,
  'accounting': Calculator,
  'tax': Receipt,
  'reporting': BarChart3,
  'payroll': Users,
  
  // Tools modules
  'communication': MessageSquare,
  'mail': Mail,
  'organization': Calendar,
  'automations': Zap
};

// Mapping des couleurs exactes du dashboard
const moduleColors: Record<string, string> = {
  // Core modules
  'dashboard': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', // Violet Prune
  'bank': 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', // Bleu Marine
  'purchases': 'linear-gradient(135deg, #FAA016 0%, #F97316 100%)', // Orange OKÉ
  'sales': 'linear-gradient(135deg, #10B981 0%, #059669 100%)', // Vert Émeraude
  
  // Business modules
  'documents': 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', // Indigo Profond
  'stocks': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', // Jaune Doré
  'accounting': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', // Violet (comme notifications)
  'tax': 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)', // Violet Améthyste
  'reporting': 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)', // Cyan
  'payroll': 'linear-gradient(135deg, #E879F9 0%, #D946EF 100%)', // Fuchsia
  
  // Tools modules
  'communication': 'linear-gradient(135deg, #BEF264 0%, #84CC16 100%)', // Vert Lime
  'mail': 'linear-gradient(135deg, #64748B 0%, #475569 100%)', // Gris
  'organization': 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)', // Bleu Saphir
  'automations': 'linear-gradient(135deg, #F472B6 0%, #EC4899 100%)', // Magenta
};

export default function ModulesGrid({ isOpen, onClose, currentModule }: ModulesGridProps) {
  const router = useRouter();

  const handleModuleClick = (moduleId: string, href: string) => {
    router.push(href);
    onClose();
  };

  // Grouper les modules par catégorie
  const modulesByCategory = {
    core: modules.filter(m => m.category === 'core'),
    business: modules.filter(m => m.category === 'business'),
    tools: modules.filter(m => m.category === 'tools'),
    system: modules.filter(m => m.category === 'system')
  };

  const categoryLabels = {
    core: 'Modules principaux',
    business: 'Gestion d\'entreprise',
    tools: 'Outils & Communication',
    system: 'Système'
  };

  const categoryColors = {
    core: 'from-primary to-indigo-600',
    business: 'from-green-500 to-emerald-600',
    tools: 'from-secondary to-violet-600',
    system: 'from-gray-500 to-slate-600'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal pleine page sur mobile style iPhone, centré sur desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "fixed z-[101]",
              // Plein écran sur mobile comme iPhone
              "inset-0 md:inset-auto",
              "md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
              "md:w-[90%] md:max-w-4xl md:max-h-[85vh]",
              // Background dégradé iOS-like
              "bg-gradient-to-br from-gray-50 via-white to-gray-100",
              "dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
              "md:backdrop-blur-2xl md:bg-white/95 md:dark:bg-gray-900/95",
              "md:rounded-2xl md:border md:border-white/20",
              "shadow-2xl shadow-black/20",
              "overflow-hidden",
              "flex flex-col"
            )}
          >
            {/* Header style iPhone - Plus compact sur mobile */}
            <div className="relative px-4 py-6 md:px-6 md:py-4 bg-transparent md:border-b md:border-gray-200/50 md:bg-gradient-to-r md:from-white/50 md:to-gray-50/50">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent md:block hidden" />
              <div className="relative flex items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-xl font-bold md:font-semibold text-gray-900 dark:text-white">
                    Tous les modules
                  </h2>
                  <p className="text-base md:text-sm text-gray-600 dark:text-gray-400 mt-1 md:mt-0.5">
                    14 modules pour gérer votre entreprise
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 md:p-2 rounded-full md:rounded-lg bg-gray-200/80 md:bg-transparent hover:bg-gray-300/80 md:hover:bg-gray-100 transition-colors"
                >
                  <X size={24} className="text-gray-700 dark:text-gray-300 md:text-gray-500" />
                </button>
              </div>
            </div>

            {/* Contenu scrollable style iPhone */}
            <div className="flex-1 overflow-y-auto px-4 py-2 md:p-6">
              {Object.entries(modulesByCategory).map(([category, categoryModules]) => (
                categoryModules.length > 0 && (
                  <div key={category} className="mb-6 md:mb-8 last:mb-0">
                    {/* Titre de catégorie - Plus discret sur mobile */}
                    <div className="flex items-center gap-3 mb-4 md:mb-4">
                      <div className={cn(
                        "h-1 w-8 rounded-full bg-gradient-to-r",
                        categoryColors[category as keyof typeof categoryColors]
                      )} />
                      <h3 className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 md:text-gray-700 uppercase tracking-wider">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </h3>
                    </div>

                    {/* Grille de modules - Style iPhone 4x4 sur mobile */}
                    <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-3">
                      {categoryModules.map((module) => {
                        // Utiliser l'icône du dashboard si disponible, sinon celle par défaut
                        const Icon = moduleIcons[module.id] || module.icon;
                        const isActive = currentModule === module.id;
                        
                        return (
                          <motion.button
                            key={module.id}
                            onClick={() => handleModuleClick(module.id, module.href)}
                            className={cn(
                              "relative flex flex-col items-center justify-center",
                              // Style app iPhone - carré avec padding minimal
                              "aspect-square p-2 md:p-4",
                              "bg-white/90 dark:bg-gray-800/90 md:bg-white md:dark:bg-gray-800",
                              "rounded-2xl md:rounded-xl",
                              "border-0 md:border md:border-gray-200 md:dark:border-gray-700",
                              "shadow-sm md:shadow-none hover:shadow-lg md:hover:border-gray-300",
                              "backdrop-blur-sm md:backdrop-blur-none",
                              "transition-all duration-200",
                              "group",
                              isActive && "ring-2 ring-[#4C34CE] bg-blue-50/70 md:bg-blue-50/50"
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {/* Badge actif */}
                            {isActive && (
                              <div className="absolute top-1 right-1 md:top-2 md:right-2 w-2 h-2 bg-[#4C34CE] rounded-full animate-pulse" />
                            )}

                            {/* Icône avec gradient exact du dashboard - Plus grande sur mobile */}
                            <div 
                              className={cn(
                                "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-lg mb-1 md:mb-3",
                                "flex items-center justify-center",
                                "shadow-sm group-hover:shadow-md transition-shadow"
                              )}
                              style={{
                                background: moduleColors[module.id] || 'linear-gradient(135deg, #64748B 0%, #475569 100%)'
                              }}
                            >
                              <Icon size={20} className="text-white md:w-6 md:h-6" />
                            </div>

                            {/* Nom du module - Plus petit sur mobile */}
                            <h4 className="text-[10px] md:text-sm font-semibold text-gray-800 dark:text-gray-200 text-center leading-tight">
                              {module.label}
                            </h4>

                            {/* Description cachée sur mobile */}
                            <p className="hidden md:block text-xs text-gray-500 line-clamp-2 mt-1">
                              {module.description}
                            </p>

                            {/* Effet hover Liquid Glass */}
                            <div className="absolute inset-0 rounded-2xl md:rounded-xl bg-gradient-to-br from-[#4C34CE]/0 to-[#FAA016]/0 group-hover:from-[#4C34CE]/5 group-hover:to-[#FAA016]/5 transition-all duration-300 pointer-events-none" />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* Footer avec raccourcis clavier (desktop) */}
            <div className="hidden md:flex items-center justify-between px-6 py-3 border-t border-gray-200/50 bg-gray-50/50">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">ESC</kbd>
                  Fermer
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">↑↓</kbd>
                  Naviguer
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">Enter</kbd>
                  Sélectionner
                </span>
              </div>
              <div className="text-xs text-gray-400">
                {modules.length} modules disponibles
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}