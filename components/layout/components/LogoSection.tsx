'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface LogoSectionProps {
  size?: 'compact' | 'medium' | 'large';
  showText?: boolean;
  href?: string;
  className?: string;
}

/**
 * LogoSection - Composant logo avec transitions fluides
 * 
 * Caractéristiques :
 * - Tailles adaptatives selon le contexte
 * - Transitions fluides entre les états
 * - Support du texte optionnel
 * - Navigation vers dashboard par défaut
 * - Animations de hover subtiles
 */
const LogoSection: React.FC<LogoSectionProps> = ({
  size = 'medium',
  showText = true,
  href = '/',
  className = ''
}) => {
  // Configuration des tailles
  const sizeConfig = {
    compact: {
      logoWidth: 32,
      logoHeight: 32,
      textSize: 'text-lg',
      gap: 'gap-2'
    },
    medium: {
      logoWidth: 40,
      logoHeight: 40,
      textSize: 'text-xl',
      gap: 'gap-3'
    },
    large: {
      logoWidth: 44,
      logoHeight: 44,
      textSize: 'text-2xl',
      gap: 'gap-3'
    }
  };

  const config = sizeConfig[size];

  // Animations
  const logoVariants = {
    idle: { 
      scale: 1,
      rotate: 0,
      filter: 'brightness(1)',
    },
    hover: { 
      scale: 1.05,
      rotate: 2,
      filter: 'brightness(1.1)',
      transition: { 
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    tap: { 
      scale: 0.95,
      rotate: -1,
      transition: { 
        duration: 0.1 
      }
    }
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      x: -10,
      width: 0
    },
    visible: {
      opacity: 1,
      x: 0,
      width: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  const containerVariants = {
    hover: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <Link href={href} className={`flex items-center ${config.gap} ${className}`}>
      <motion.div
        className="flex items-center cursor-pointer"
        variants={containerVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
      >
        {/* Logo Image */}
        <motion.div
          variants={logoVariants}
          className="relative flex-shrink-0"
        >
          <Image
            src="/logo_oke_original.png"
            alt="OKÉ"
            width={config.logoWidth}
            height={config.logoHeight}
            priority
            className="object-contain"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }}
          />
          
          {/* Subtle glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400/20 to-secondary-400/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 0.3 }}
            style={{ filter: 'blur(8px)', zIndex: -1 }}
          />
        </motion.div>

        {/* Logo Text */}
        <motion.div
          className="overflow-hidden"
          variants={textVariants}
          animate={showText ? 'visible' : 'hidden'}
        >
          <motion.div
            className={`
              font-bold bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 
              bg-clip-text text-transparent ${config.textSize}
            `}
            variants={{
              hover: {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }
            }}
            style={{
              backgroundSize: '200% 100%',
            }}
          >
            OKÉ
          </motion.div>
        </motion.div>

        {/* Beta/Pro Badge (optionnel) */}
        {size === 'large' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="ml-2 px-2 py-1 text-xs font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full shadow-sm"
          >
            BETA
          </motion.div>
        )}
      </motion.div>
    </Link>
  );
};

export default LogoSection;