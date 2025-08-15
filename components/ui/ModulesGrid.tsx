'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { modules } from '@/lib/modules-config';
import { useRouter } from 'next/navigation';

interface ModulesGridProps {
  isOpen: boolean;
  onClose: () => void;
  currentModule?: string;
}

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
    core: 'from-blue-500 to-indigo-600',
    business: 'from-green-500 to-emerald-600',
    tools: 'from-purple-500 to-violet-600',
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

          {/* Modal pleine page sur mobile, centré sur desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "fixed z-[101]",
              "inset-4 md:inset-auto",
              "md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
              "md:w-[90%] md:max-w-4xl md:max-h-[85vh]",
              "bg-white/95 dark:bg-gray-900/95",
              "backdrop-blur-2xl",
              "rounded-2xl",
              "border border-white/20",
              "shadow-2xl shadow-black/20",
              "overflow-hidden",
              "flex flex-col"
            )}
          >
            {/* Header avec effet Liquid Glass */}
            <div className="relative px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-white/50 to-gray-50/50">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
              <div className="relative flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Tous les modules
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    14 modules disponibles pour gérer votre entreprise
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Contenu scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {Object.entries(modulesByCategory).map(([category, categoryModules]) => (
                categoryModules.length > 0 && (
                  <div key={category} className="mb-8 last:mb-0">
                    {/* Titre de catégorie */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn(
                        "h-1 w-8 rounded-full bg-gradient-to-r",
                        categoryColors[category as keyof typeof categoryColors]
                      )} />
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </h3>
                    </div>

                    {/* Grille de modules */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {categoryModules.map((module) => {
                        const Icon = module.icon;
                        const isActive = currentModule === module.id;
                        
                        return (
                          <motion.button
                            key={module.id}
                            onClick={() => handleModuleClick(module.id, module.href)}
                            className={cn(
                              "relative p-4 rounded-xl",
                              "bg-white dark:bg-gray-800",
                              "border border-gray-200 dark:border-gray-700",
                              "hover:shadow-lg hover:border-gray-300",
                              "transition-all duration-200",
                              "group",
                              isActive && "ring-2 ring-blue-500 bg-blue-50/50"
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Badge actif */}
                            {isActive && (
                              <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                            )}

                            {/* Icône avec gradient */}
                            <div className={cn(
                              "w-12 h-12 rounded-lg mb-3 mx-auto",
                              "bg-gradient-to-br",
                              categoryColors[category as keyof typeof categoryColors],
                              "flex items-center justify-center",
                              "shadow-sm group-hover:shadow-md transition-shadow"
                            )}>
                              <Icon size={24} className="text-white" />
                            </div>

                            {/* Nom du module */}
                            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                              {module.label}
                            </h4>

                            {/* Description courte */}
                            <p className="text-xs text-gray-500 line-clamp-2">
                              {module.description}
                            </p>

                            {/* Effet hover Liquid Glass */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
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