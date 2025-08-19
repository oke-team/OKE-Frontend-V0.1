'use client';

import React, { memo, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Shield, Zap, Users } from 'lucide-react';
import LogoSection from '@/components/layout/components/LogoSection';
import GlassContainer from '@/components/ui/GlassContainer';
import { heroTitleAnimations, featureGridAnimations, featureItemAnimations, createReducedMotionVariants } from '@/lib/animations/homepage';

interface FeatureItem {
  icon: typeof Sparkles;
  text: string;
  accent?: 'violet' | 'green' | 'orange' | 'blue';
}

const features: FeatureItem[] = [
  { icon: Sparkles, text: 'IA Avancée', accent: 'violet' },
  { icon: Shield, text: 'Sécurisé', accent: 'green' },
  { icon: Zap, text: 'Automatisé', accent: 'orange' },
  { icon: Users, text: 'Collaboratif', accent: 'blue' }
];

const HeroSection: React.FC = memo(() => {
  const shouldReduceMotion = useReducedMotion();

  // Memoized animations pour performances
  const titleVariants = useMemo(() => 
    shouldReduceMotion ? createReducedMotionVariants(heroTitleAnimations) : heroTitleAnimations, 
    [shouldReduceMotion]
  );
  
  const gridVariants = useMemo(() => 
    shouldReduceMotion ? createReducedMotionVariants(featureGridAnimations) : featureGridAnimations, 
    [shouldReduceMotion]
  );
  
  const itemVariants = useMemo(() => 
    shouldReduceMotion ? createReducedMotionVariants(featureItemAnimations) : featureItemAnimations, 
    [shouldReduceMotion]
  );

  return (
    <div className="space-y-1 sm:space-y-2 md:space-y-3 text-center lg:text-left">

      {/* Hero Content */}
      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2 sm:space-y-3"
      >
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight"
          variants={titleVariants}
        >
          <span className="block mb-1 sm:mb-2">Une Super App pour des</span>
          <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
            Supers Entrepreneurs
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/90 leading-[1.5] max-w-2xl mx-auto lg:mx-0 font-medium mt-4 sm:mt-6"
          variants={titleVariants}
        >
          Simplifiez votre comptabilité, automatisez vos factures et pilotez votre entreprise en 
          toute sérénité grâce à notre assistant intelligent.
        </motion.p>
        
        {/* Features badges optimisés pour mobile */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mt-6 sm:mt-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const accentColors = {
              violet: 'from-violet-400/20 to-violet-600/20 border-violet-400/30',
              green: 'from-green-400/20 to-green-600/20 border-green-400/30',
              orange: 'from-orange-400/20 to-orange-600/20 border-orange-400/30',
              blue: 'from-blue-400/20 to-blue-600/20 border-blue-400/30'
            };
            
            return (
              <motion.div
                key={feature.text}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl backdrop-blur-sm border bg-gradient-to-r ${accentColors[feature.accent || 'violet']} text-white/90 text-xs sm:text-sm font-medium transition-all duration-300 hover:text-white cursor-default select-none`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{feature.text}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>


    </div>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;