'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, CheckCircle } from 'lucide-react';
import { useExpertMode } from '@/contexts/ExpertModeContext';

export default function TransitionNotification() {
  const { transitionMessage, expertMode, isTransitioning } = useExpertMode();

  return (
    <AnimatePresence>
      {transitionMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            type: 'spring', 
            damping: 25, 
            stiffness: 300,
            duration: 0.4 
          }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 10px 40px rgba(94, 114, 255, 0.15)',
                '0 10px 60px rgba(94, 114, 255, 0.25)',
                '0 10px 40px rgba(94, 114, 255, 0.15)'
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className={`
              px-6 py-4 rounded-xl backdrop-blur-xl border
              ${expertMode 
                ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30' 
                : 'bg-white/95 border-gray-200'
              }
            `}
          >
            <div className="flex items-center gap-4">
              {/* Icône animée */}
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ 
                  type: 'spring', 
                  damping: 15,
                  delay: 0.1 
                }}
                className={`
                  p-2 rounded-lg
                  ${expertMode 
                    ? 'bg-gradient-to-br from-primary to-purple-600' 
                    : 'bg-gradient-to-br from-blue-400 to-primary'
                  }
                `}
              >
                {expertMode ? (
                  <Shield className="w-5 h-5 text-white" />
                ) : (
                  <Zap className="w-5 h-5 text-white" />
                )}
              </motion.div>

              {/* Message */}
              <div className="flex-1">
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`
                    font-medium
                    ${expertMode ? 'text-blue-900' : 'text-gray-900'}
                  `}
                >
                  {transitionMessage}
                </motion.p>
                
                {/* Barre de progression */}
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.8, ease: 'linear' }}
                  className="h-1 bg-gradient-to-r from-primary to-purple-600 rounded-full mt-2"
                />
              </div>

              {/* Indicateur de succès */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.3,
                  type: 'spring',
                  damping: 15
                }}
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
              </motion.div>
            </div>

            {/* Particules décoratives */}
            {isTransitioning && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                {[...Array(5)].map((_, i) => ( // safe key uses index because purely decorative

                  <motion.div
                    key={`particle-${i}`}
                    initial={{ 
                      x: Math.random() * 100 - 50,
                      y: 50,
                      opacity: 0 
                    }}
                    animate={{ 
                      x: Math.random() * 200 - 100,
                      y: -50,
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 1.5,
                      delay: i * 0.1,
                      ease: 'easeOut'
                    }}
                    className="absolute w-1 h-1 bg-primary rounded-full"
                    style={{ left: '50%' }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}