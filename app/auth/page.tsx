'use client';

import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import AuthWidget from '@/components/homepage/AuthWidget';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthPage() {
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Rediriger vers le dashboard si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Animations complexes pour le logo
  const logoAnimation = {
    initial: { 
      opacity: 0, 
      scale: 0.3, 
      rotate: -20,
      y: shouldReduceMotion ? 0 : 50 
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 1.2,
        ease: [0.68, -0.55, 0.265, 1.55], // bounce ultra-fluide
        delay: 0.3
      }
    }
  };

  // Animation du titre avec délai
  const titleAnimation = {
    initial: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 40 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: shouldReduceMotion ? 0 : 0.8
      }
    }
  };

  // Animation du sous-titre
  const subtitleAnimation = {
    initial: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: shouldReduceMotion ? 0 : 1.2
      }
    }
  };

  // Animation du widget auth
  const authWidgetAnimation = {
    initial: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : 60,
      scale: shouldReduceMotion ? 1 : 0.95
    },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: shouldReduceMotion ? 0 : 1.0
      }
    }
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] overflow-hidden supports-[height:100dvh]:min-h-[100dvh]">
      
      {/* Background Image - Couleurs vives sans transparence */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/login.jpg"
          alt=""
          fill
          priority
          quality={95}
          className="object-cover object-center md:object-[20%_center] lg:object-[30%_center]"
          sizes="100vw"
        />
        {/* Overlay très léger pour contraste texte uniquement */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Header avec Logo */}
        <header className="pt-8 pb-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between">
              <motion.div
                {...logoAnimation}
                className="flex justify-center lg:justify-start"
              >
              <div className="relative">
                <motion.div
                  className="relative p-4 sm:p-5 lg:p-6 rounded-3xl backdrop-blur-xl border-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)'
                  }}
                  whileHover={shouldReduceMotion ? {} : {
                    scale: 1.05,
                    rotate: [0, 2, -2, 0],
                    transition: { 
                      duration: 0.6,
                      rotate: { duration: 0.8, ease: "easeInOut" }
                    }
                  }}
                >
                  <motion.img 
                    src="/logo_oke_original.png" 
                    alt="OKÉ" 
                    className="h-16 w-auto sm:h-20 md:h-24 lg:h-28 xl:h-32"
                    whileHover={shouldReduceMotion ? {} : {
                      filter: [
                        'drop-shadow(0 0 20px rgba(250, 160, 22, 0.4))',
                        'drop-shadow(0 0 40px rgba(250, 160, 22, 0.6))',
                        'drop-shadow(0 0 20px rgba(250, 160, 22, 0.4))'
                      ],
                      transition: { 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }
                    }}
                  />
                  
                  {/* Pastille V0.1 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 1.5, duration: 0.4 }}
                    className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-full backdrop-blur-xl border text-xs font-bold"
                    style={{
                      background: 'linear-gradient(135deg, rgba(250, 160, 22, 0.9) 0%, rgba(250, 160, 22, 0.7) 100%)',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      boxShadow: '0 4px 20px rgba(250, 160, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    V0.1
                  </motion.div>

                  {/* Effets de brillance liquid glass */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-2 left-1/4 w-1/2 h-1/3 rounded-3xl bg-gradient-to-b from-white/30 to-transparent blur-sm pointer-events-none" />
                </motion.div>
              </div>
              </motion.div>

              {/* AuthWidget dans le header pour alignement parfait avec le badge */}
              <div className="hidden lg:block">
                <AuthWidget className="w-full max-w-md" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 pb-8 lg:-mt-70 xl:-mt-84">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center pt-8 lg:pt-16">
              
              {/* Hero Section - 7 colonnes pour être visuellement à côté de l'AuthWidget */}
              <div className="lg:col-span-7 text-center lg:text-left lg:self-start lg:max-h-[400px] xl:max-h-[450px] lg:overflow-visible">
                
                {/* Titre principal */}
                <motion.h1 
                  {...titleAnimation}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight mb-4 lg:mb-6"
                >
                  <span className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                    Une Super App pour des
                  </span>
                  <br />
                  <motion.span 
                    className="bg-gradient-to-r from-[#FAA016] via-[#FF6B35] to-[#FAA016] bg-clip-text text-transparent"
                    animate={shouldReduceMotion ? {} : {
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={shouldReduceMotion ? {} : {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    style={shouldReduceMotion ? {} : {
                      backgroundSize: '200% 200%'
                    }}
                  >
                    Supers Entrepreneurs
                  </motion.span>
                </motion.h1>
                
                {/* Sous-titre */}
                <motion.p 
                  {...subtitleAnimation}
                  className="text-lg sm:text-xl lg:text-lg xl:text-xl leading-relaxed max-w-2xl lg:max-w-lg xl:max-w-2xl mx-auto lg:mx-0 font-medium text-white"
                  style={{ 
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  Simplifiez votre comptabilité, automatisez vos factures et pilotez votre 
                  entreprise en toute sérénité grâce à notre assistant intelligent.
                </motion.p>
              </div>
              
              {/* Colonne vide sur desktop pour maintenir l'alignement du grid, AuthWidget sur mobile/tablette */}
              <div className="lg:col-span-5 lg:hidden flex justify-center">
                <AuthWidget className="w-full max-w-md" />
              </div>
            </div>
          </div>
        </main>

        {/* Particules flottantes subtiles */}
        {!shouldReduceMotion && (
          <div className="fixed inset-0 pointer-events-none z-[1]">
            {/* Particule 1 */}
            <motion.div
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full blur-sm"
            />
            
            {/* Particule 2 */}
            <motion.div
              animate={{
                y: [0, 40, 0],
                x: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
              className="absolute top-3/4 right-1/3 w-3 h-3 bg-[#FAA016]/20 rounded-full blur-sm"
            />
            
            {/* Particule 3 */}
            <motion.div
              animate={{
                y: [0, -25, 0],
                x: [0, 25, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 6
              }}
              className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white/40 rounded-full blur-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}