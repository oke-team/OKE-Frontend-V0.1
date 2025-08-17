'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import GlassContainer from '@/components/ui/GlassContainer';

const BottomCTA: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeInUp = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0 : 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  };

  return (
    <motion.div
      {...fadeInUp}
      className="relative z-10 px-4 sm:px-6 pb-12 sm:pb-16"
    >
      <div className="max-w-4xl mx-auto">
        <GlassContainer
          variant="secondary"
          blur="lg"
          border="primary"
          glow={true}
          className="p-8 sm:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Prêt à révolutionner votre gestion d'entreprise ?
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Rejoignez des milliers d&apos;entrepreneurs qui ont simplifié leur quotidien avec OKÉ.
            Essai gratuit de 14 jours, sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:w-auto bg-[#FAA016] hover:bg-[#E8941A] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg min-h-[48px] text-lg"
            >
              Commencer gratuitement
            </motion.button>
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:w-auto text-white/80 hover:text-white py-4 px-8 border border-white/20 rounded-xl backdrop-blur-sm hover:bg-white/10 active:bg-white/20 transition-all min-h-[48px] text-lg"
            >
              Voir la démo
            </motion.button>
          </div>
        </GlassContainer>
      </div>
    </motion.div>
  );
};

export default BottomCTA;