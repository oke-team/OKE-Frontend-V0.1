'use client';

import React, { useState, useCallback, useMemo, memo, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlassContainer from '@/components/ui/GlassContainer';
import OnboardingTrigger from '@/components/onboarding/OnboardingTrigger';
import { useOnboardingModal } from '@/components/onboarding/hooks/useOnboardingModal';

interface AuthWidgetProps {
  className?: string;
}

type AuthMode = 'login' | 'signup';

interface FormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  rememberMe?: boolean;
}

const AuthWidget: React.FC<AuthWidgetProps> = memo(({ className = '' }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();
  const { openModal, hasActiveSession } = useOnboardingModal();
  
  // Debug logging
  useEffect(() => {
    console.log('AuthWidget - openModal function:', openModal);
    console.log('AuthWidget - hasActiveSession function:', hasActiveSession);
  }, [openModal, hasActiveSession]);

  const handleInputChange = useCallback((field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      // MODE DÉVELOPPEMENT : Redirection directe sans validation
      await new Promise(resolve => setTimeout(resolve, 500)); // Temps réduit
      
      console.log(`${authMode} submission (dev mode):`, formData);
      
      // Redirection immédiate vers le dashboard pour le développement
      router.push('/dashboard');
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  }, [authMode, formData, router]);

  const fadeInUp = useMemo(() => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0 : 0.6 }
  }), [shouldReduceMotion]);

  const animationVariants = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  }), [shouldReduceMotion]);

  return (
    <div className={`w-full max-w-md mx-auto lg:mx-0 lg:ml-auto ${className}`}>
      <div>
        <GlassContainer
          variant="primary"
          blur="lg"
          border="primary"
          glow={true}
          className="p-4 sm:p-5 md:p-6 lg:p-6 xl:p-8 min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] xl:min-h-[600px] relative overflow-hidden"
        >
        {/* Auth Toggle */}
        <div className="flex bg-white/5 backdrop-blur-sm rounded-xl p-1 mb-6 sm:mb-8 border border-white/10">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            aria-label="Basculer en mode connexion"
            className={`flex-1 py-3 px-4 sm:px-6 rounded-lg text-sm font-medium transition-all duration-300 min-h-[44px] touch-manipulation ${
              authMode === 'login'
                ? 'bg-white text-[#4C34CE] shadow-lg transform scale-[0.98]'
                : 'text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20'
            }`}
          >
            Se connecter
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            aria-label="Basculer en mode inscription"
            className={`flex-1 py-3 px-4 sm:px-6 rounded-lg text-sm font-medium transition-all duration-300 min-h-[44px] touch-manipulation ${
              authMode === 'signup'
                ? 'bg-white text-[#4C34CE] shadow-lg transform scale-[0.98]'
                : 'text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20'
            }`}
          >
            Créer mon compte
          </button>
        </div>

        {/* Auth Form */}
        {authMode === 'signup' ? (
          // Mode inscription simple et classique
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-[#FAA016] focus:ring-2 focus:ring-[#FAA016]/20 focus:outline-none transition-all min-h-[44px] text-base backdrop-blur-sm touch-manipulation"
                  autoComplete="given-name"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-[#FAA016] focus:ring-2 focus:ring-[#FAA016]/20 focus:outline-none transition-all min-h-[44px] text-base backdrop-blur-sm touch-manipulation"
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Email professionnel"
                value={formData.email}
                onChange={handleInputChange('email')}
                className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-[#FAA016] focus:ring-2 focus:ring-[#FAA016]/20 focus:outline-none transition-all min-h-[44px] text-base backdrop-blur-sm touch-manipulation"
                autoComplete="email"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleInputChange('password')}
                className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-[#FAA016] focus:ring-2 focus:ring-[#FAA016]/20 focus:outline-none transition-all min-h-[44px] text-base backdrop-blur-sm touch-manipulation"
                autoComplete="new-password"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-[#FAA016] hover:bg-[#E8941A] active:bg-[#D8841A] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg min-h-[48px] disabled:opacity-70 disabled:cursor-not-allowed touch-manipulation focus-visible:ring-2 focus-visible:ring-[#FAA016]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Créer mon compte</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
            
            <p className="text-xs text-white/60 text-center">
              En créant un compte, vous acceptez nos{' '}
              <a href="#" className="text-[#FAA016] hover:text-[#E8941A]">
                Conditions d'utilisation
              </a>{' '}
              et notre{' '}
              <a href="#" className="text-[#FAA016] hover:text-[#E8941A]">
                Politique de confidentialité
              </a>
            </p>
          </form>
        ) : (
          // Mode connexion (existant)
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email professionnel"
                value={formData.email}
                onChange={handleInputChange('email')}
                className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-[#FAA016] focus:ring-2 focus:ring-[#FAA016]/20 focus:outline-none transition-all min-h-[44px] text-base backdrop-blur-sm touch-manipulation"
                autoComplete="email"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleInputChange('password')}
                className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-[#FAA016] focus:ring-2 focus:ring-[#FAA016]/20 focus:outline-none transition-all min-h-[44px] text-base backdrop-blur-sm touch-manipulation"
                autoComplete="current-password"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-white/80 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.rememberMe || false}
                  onChange={handleInputChange('rememberMe')}
                  className="mr-2 rounded bg-white/10 border-white/20 text-orange-400 focus:ring-orange-400/20" 
                />
                Se souvenir de moi
              </label>
              <a href="#" className="text-[#FAA016] hover:text-[#E8941A] transition-colors">
                Mot de passe oublié ?
              </a>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-[#FAA016] hover:bg-[#E8941A] active:bg-[#D8841A] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg min-h-[48px] disabled:opacity-70 disabled:cursor-not-allowed touch-manipulation focus-visible:ring-2 focus-visible:ring-[#FAA016]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        )}

        {/* Social Login */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <p className="text-center text-white/60 text-sm mb-4">
            Ou continuer avec
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button" 
              onClick={() => router.push('/dashboard')}
              className="flex items-center justify-center py-3 px-4 bg-white/5 border border-white/20 rounded-xl text-white/80 hover:bg-white/10 active:bg-white/20 transition-all text-sm min-h-[44px] backdrop-blur-sm touch-manipulation focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2"
            >
              Google
            </button>
            <button type="button" className="flex items-center justify-center py-3 px-4 bg-white/5 border border-white/20 rounded-xl text-white/80 hover:bg-white/10 active:bg-white/20 transition-all text-sm min-h-[44px] backdrop-blur-sm touch-manipulation focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2">
              Microsoft
            </button>
          </div>
        </div>

        {/* Terms */}
        {authMode === 'signup' && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs text-white/60 text-center mt-6"
          >
            En vous inscrivant, vous acceptez nos{' '}
            <a href="#" className="text-[#FAA016] hover:text-[#E8941A]">
              Conditions d&apos;utilisation
            </a>{' '}
            et notre{' '}
            <a href="#" className="text-[#FAA016] hover:text-[#E8941A]">
              Politique de confidentialité
            </a>
          </motion.p>
        )}
        </GlassContainer>
      </div>
    </div>
  );
});

AuthWidget.displayName = 'AuthWidget';

export default AuthWidget;