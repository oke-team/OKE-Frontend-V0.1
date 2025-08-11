'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Zap, Shield, ArrowRight } from 'lucide-react';

interface ModeTooltipProps {
  isExpertMode: boolean;
  children: React.ReactNode;
}

export default function ModeTooltip({ isExpertMode, children }: ModeTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const tooltipContent = isExpertMode ? {
    title: "Mode Expert activé",
    description: "Interface complète avec toutes les fonctionnalités avancées",
    features: [
      "Terminologie professionnelle",
      "Paramètres backoffice",
      "Vue détaillée des données"
    ],
    switchText: "Basculer vers Mode Entrepreneur",
    switchDescription: "pour une interface simplifiée",
    icon: <Shield className="w-5 h-5" />,
    color: "purple"
  } : {
    title: "Mode Entrepreneur activé",
    description: "Interface épurée pour une utilisation facilitée",
    features: [
      "Langage simplifié",
      "Guidance pas à pas",
      "Actions assistées par l'IA"
    ],
    switchText: "Basculer vers Mode Expert",
    switchDescription: "pour accéder aux fonctions avancées",
    icon: <Zap className="w-5 h-5" />,
    color: "blue"
  };

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className={`
              bg-white rounded-xl shadow-2xl p-4 min-w-[280px]
              border ${isExpertMode ? 'border-purple-200' : 'border-blue-200'}
            `}>
              {/* Arrow */}
              <div className={`
                absolute -top-2 left-1/2 -translate-x-1/2 
                w-4 h-4 rotate-45 bg-white border-t border-l
                ${isExpertMode ? 'border-purple-200' : 'border-blue-200'}
              `} />

              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className={`
                  p-2 rounded-lg
                  ${isExpertMode 
                    ? 'bg-gradient-to-br from-purple-500 to-purple-600' 
                    : 'bg-gradient-to-br from-blue-500 to-blue-600'
                  }
                `}>
                  <div className="text-white">
                    {tooltipContent.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {tooltipContent.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {tooltipContent.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-3">
                {tooltipContent.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div className={`
                      w-1.5 h-1.5 rounded-full
                      ${isExpertMode ? 'bg-purple-500' : 'bg-blue-500'}
                    `} />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Call to action */}
              <div className={`
                pt-3 border-t
                ${isExpertMode 
                  ? 'border-purple-100' 
                  : 'border-blue-100'
                }
              `}>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  isExpertMode ? 'text-purple-600' : 'text-blue-600'
                }`}>
                  <span>{tooltipContent.switchText}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {tooltipContent.switchDescription}
                </p>
              </div>

              {/* Keyboard shortcut hint */}
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <Info className="w-3 h-3" />
                <span>
                  Raccourci : 
                  <kbd className="ml-1 px-1.5 py-0.5 bg-gray-100 rounded text-xs">Ctrl</kbd>
                  +
                  <kbd className="ml-1 px-1.5 py-0.5 bg-gray-100 rounded text-xs">E</kbd>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}