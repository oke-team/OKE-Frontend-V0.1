'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Lock } from 'lucide-react';

interface StepIndicatorProps {
  steps: Array<{
    id: number;
    title: string;
    subtitle: string;
    isCompleted: boolean;
  }>;
  currentStep: number;
  className?: string;
  isMobile?: boolean;
  isCompact?: boolean;
}

export default function StepIndicator({ 
  steps, 
  currentStep, 
  className = '', 
  isMobile = false, 
  isCompact = false 
}: StepIndicatorProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Barre de progression globale avec gradient */}
      <div className={isCompact ? 'mb-4' : 'mb-8'}>
        <div className={`flex justify-between text-gray-600 mb-3 ${
          isCompact ? 'text-xs' : 'text-sm'
        }`}>
          <span className="font-medium text-gray-700">
            Étape <span className="text-[#4C34CE] font-semibold">{currentStep + 1}</span> sur {steps.length}
          </span>
          {!isCompact && (
            <span className="font-medium text-gray-600">
              <span className="text-[#FAA016] font-semibold">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </span>
          )}
        </div>
        <div className={`relative w-full bg-gray-200 rounded-full overflow-hidden ${
          isCompact ? 'h-1.5' : 'h-2'
        }`}>
          {/* Effet de lueur subtile */}
          
          {/* Barre de progression principale */}
          <motion.div
            className="h-full bg-[#4C34CE] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: isCompact ? 0.3 : 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Liste des étapes - Version desktop */}
      <div className="hidden lg:block">
        <div className="space-y-5">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = step.isCompleted;
            const isPending = index > currentStep;

            return (
              <motion.div
                key={step.id}
                className="flex items-start space-x-4 group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                {/* Indicateur circulaire avec effet Glass */}
                <div className="relative flex-shrink-0 mt-1">
                  <motion.div
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                      ${isCompleted 
                        ? 'bg-gradient-to-br from-[#FAA016] to-[#FAA016]/80 shadow-md' 
                        : isActive 
                          ? 'bg-white border-2 border-[#4C34CE] shadow-lg' 
                          : isPending
                            ? 'bg-gray-100 border border-gray-300'
                            : 'bg-white border border-gray-300'
                      }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 25,
                          delay: 0.2 
                        }}
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    ) : isActive ? (
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                        }}
                        transition={{ 
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <Sparkles className="w-5 h-5 text-[#4C34CE]" />
                      </motion.div>
                    ) : isPending ? (
                      <Lock className="w-4 h-4 text-gray-400" />
                    ) : (
                      <span className={`text-sm font-bold text-gray-500`}>
                        {index + 1}
                      </span>
                    )}

                    {/* Effet de pulsation pour l'étape active */}
                    {isActive && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[#4C34CE]/10"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </>
                    )}
                  </motion.div>

                  {/* Ligne de connexion entre les étapes */}
                  {index < steps.length - 1 && (
                    <div className={`absolute top-12 left-5 w-px h-8 transition-all duration-500
                      ${isCompleted 
                        ? 'bg-gradient-to-b from-[#FAA016] to-transparent' 
                        : 'bg-gradient-to-b from-gray-300 to-transparent'
                      }`}
                    />
                  )}
                </div>

                {/* Contenu de l'étape */}
                <div className="flex-1 min-w-0">
                  <motion.h4
                    className={`font-semibold transition-all duration-300
                      ${isActive 
                        ? 'text-gray-900 text-base' 
                        : isCompleted 
                          ? 'text-gray-700 text-sm' 
                          : 'text-gray-500 text-sm'
                      }`}
                    animate={{ 
                      x: isActive ? 4 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {step.title}
                  </motion.h4>
                  <motion.p 
                    className={`text-sm mt-1 transition-all duration-300
                      ${isActive 
                        ? 'text-gray-600' 
                        : 'text-gray-400'
                      }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {step.subtitle}
                  </motion.p>
                  
                  {/* Indicateur de statut textuel */}
                  {isActive && (
                    <motion.div
                      className="flex items-center space-x-1 mt-2"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#4C34CE]" />
                      <span className="text-xs text-[#4C34CE] font-medium">En cours...</span>
                    </motion.div>
                  )}
                  {isCompleted && !isActive && (
                    <motion.div
                      className="flex items-center space-x-1 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Check className="w-3 h-3 text-[#FAA016]" />
                      <span className="text-xs text-[#FAA016] font-medium">Terminé</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Version mobile - Indicateurs horizontaux optimisés */}
      <div className="lg:hidden">
        {/* Mini indicateurs en ligne avec design moderne */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = step.isCompleted;
            const isPending = index > currentStep;

            return (
              <React.Fragment key={step.id}>
                <motion.div
                  className={`relative flex items-center justify-center flex-shrink-0 transition-all duration-300
                    ${isActive ? 'w-12 h-12' : 'w-10 h-10'}
                    ${isCompleted 
                      ? 'bg-gradient-to-br from-[#FAA016] to-[#FAA016]/80 rounded-full shadow-md' 
                      : isActive 
                        ? 'bg-white rounded-full border-2 border-[#4C34CE] shadow-lg' 
                        : isPending
                          ? 'bg-gray-100 rounded-full border border-gray-300'
                          : 'bg-white rounded-full border border-gray-300'
                    }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 25 
                      }}
                    >
                      <Check className="w-5 h-5 text-white drop-shadow-lg" />
                    </motion.div>
                  ) : isActive ? (
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                      }}
                      transition={{ 
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Sparkles className="w-5 h-5 text-white drop-shadow-lg" />
                    </motion.div>
                  ) : isPending ? (
                    <Lock className="w-4 h-4 text-white/40" />
                  ) : (
                    <span className={`text-sm font-bold text-white/60`}>
                      {index + 1}
                    </span>
                  )}

                  {/* Effet de pulsation pour l'étape active sur mobile */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#4C34CE]/10"
                      animate={{ 
                        scale: [1, 1.2, 1], 
                        opacity: [0.4, 0, 0.4] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>

                {/* Trait de connexion avec gradient */}
                {index < steps.length - 1 && (
                  <div className={`relative flex-1 h-0.5 transition-all duration-500
                    ${isCompleted || (index < currentStep) 
                      ? 'bg-gradient-to-r from-[#FAA016] to-[#4C34CE]' 
                      : 'bg-gray-300'
                    }`} 
                  >
                    {(isCompleted || (index < currentStep)) && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ['-200%', '200%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Étiquettes mobiles - Uniquement l'étape courante */}
        {!isCompact && (
          <div className="text-center space-y-2">
            <motion.h3 
              key={String(currentStep)}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-base font-semibold text-gray-900"
            >
              {steps[currentStep]?.title}
            </motion.h3>
            <motion.p 
              key={`${String(currentStep)}-subtitle`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-gray-600"
            >
              {steps[currentStep]?.subtitle}
            </motion.p>
          </div>
        )}
        
        {/* Version compacte - juste le titre */}
        {isCompact && (
          <div className="text-center">
            <motion.h3 
              key={String(currentStep)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-semibold text-gray-900 truncate"
            >
              {steps[currentStep]?.title}
            </motion.h3>
          </div>
        )}
      </div>

      {/* Titre et sous-titre de l'étape courante - Desktop uniquement */}
      <motion.div 
        className="mt-10 hidden lg:block"
        key={String(currentStep)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          {steps[currentStep]?.title}
        </h2>
        <p className="text-gray-600 text-lg">
          {steps[currentStep]?.subtitle}
        </p>
      </motion.div>
    </div>
  );
}