'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { buttonHoverVariants } from './animations/stepTransitions';

interface OnboardingTriggerProps {
  onTrigger: () => void;
  hasActiveSession?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

export default function OnboardingTrigger({
  onTrigger,
  hasActiveSession = false,
  variant = 'primary',
  size = 'md',
  className = '',
  children
}: OnboardingTriggerProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primary to-secondary hover:from-primary-400 hover:to-secondary-400 text-white shadow-lg hover:shadow-xl';
      case 'secondary':
        return 'bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm';
      case 'outline':
        return 'border-2 border-primary-400 text-primary-400 hover:bg-primary-400/10 hover:border-primary-300';
      default:
        return 'bg-primary hover:bg-primary-400 text-white';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm h-10';
      case 'lg':
        return 'px-8 py-4 text-lg h-14';
      case 'md':
      default:
        return 'px-6 py-3 text-base h-12';
    }
  };

  const getIcon = () => {
    if (hasActiveSession) {
      return <RefreshCw className="w-5 h-5" />;
    }
    return <UserPlus className="w-5 h-5" />;
  };

  const getLabel = () => {
    if (hasActiveSession) {
      return 'Reprendre l\'inscription';
    }
    return 'Créer mon compte';
  };

  if (children) {
    return (
      <motion.button
        variants={buttonHoverVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        onClick={() => {
        console.log('OnboardingTrigger clicked, calling onTrigger:', onTrigger);
        onTrigger();
      }}
        className={`
          relative overflow-hidden rounded-xl font-medium transition-all duration-200
          ${getVariantStyles()}
          ${getSizeStyles()}
          ${className}
        `}
      >
        {children}
        
        {/* Effet de brillance */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{
            x: '100%',
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        />
      </motion.button>
    );
  }

  return (
    <motion.button
      variants={buttonHoverVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={() => {
        console.log('OnboardingTrigger clicked, calling onTrigger:', onTrigger);
        onTrigger();
      }}
      className={`
        relative overflow-hidden rounded-xl font-medium transition-all duration-200 flex items-center space-x-3
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${className}
      `}
    >
      {/* Icône */}
      {getIcon()}
      
      {/* Texte principal */}
      <span>{getLabel()}</span>
      
      {/* Effet sparkles pour le variant primary */}
      {variant === 'primary' && !hasActiveSession && (
        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
      )}
      
      {/* Flèche pour indiquer l'action */}
      <ArrowRight className="w-4 h-4" />
      
      {/* Effet de brillance au survol */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{
          x: '100%',
          transition: { duration: 0.6, ease: "easeInOut" }
        }}
      />
      
      {/* Badge "Session en cours" */}
      {hasActiveSession && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </motion.div>
      )}
    </motion.button>
  );
}