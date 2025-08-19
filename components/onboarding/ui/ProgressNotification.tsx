'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, AlertCircle, Clock } from 'lucide-react';

interface ProgressNotificationProps {
  id: string;
  message: string;
  details?: string;
  status: 'loading' | 'success' | 'error' | 'pending';
  timestamp: number;
  index?: number;
  onClick?: () => void;
  isMobile?: boolean;
}

export default function ProgressNotification({
  id,
  message,
  details,
  status,
  timestamp,
  index = 0,
  onClick,
  isMobile = false
}: ProgressNotificationProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="flex-shrink-0"
          >
            <Loader2 className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-primary-400`} />
          </motion.div>
        );
      case 'success':
        return (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              delay: 0.1 
            }}
            className="flex-shrink-0"
          >
            <div className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} rounded-full bg-green-500 flex items-center justify-center`}>
              <Check className={`${isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-white`} />
            </div>
          </motion.div>
        );
      case 'error':
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex-shrink-0"
          >
            <div className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} rounded-full bg-red-500 flex items-center justify-center`}>
              <AlertCircle className={`${isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-white`} />
            </div>
          </motion.div>
        );
      case 'pending':
        return (
          <div className="flex-shrink-0">
            <div className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} rounded-full border-2 border-neutral-600 flex items-center justify-center`}>
              <Clock className={`${isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-neutral-400`} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusStyles = () => {
    switch (status) {
      case 'loading':
        return {
          container: 'bg-primary/10 border-primary/20 shadow-lg shadow-primary/5',
          text: 'text-white',
          details: 'text-primary-200'
        };
      case 'success':
        return {
          container: 'bg-green-500/10 border-green-500/20 shadow-lg shadow-green-500/5',
          text: 'text-white',
          details: 'text-green-200'
        };
      case 'error':
        return {
          container: 'bg-red-500/10 border-red-500/20 shadow-lg shadow-red-500/5',
          text: 'text-white',
          details: 'text-red-200'
        };
      case 'pending':
        return {
          container: 'bg-neutral-800/50 border-neutral-700/50',
          text: 'text-neutral-400',
          details: 'text-neutral-500'
        };
      default:
        return {
          container: 'bg-neutral-800/50 border-neutral-700/50',
          text: 'text-neutral-300',
          details: 'text-neutral-400'
        };
    }
  };

  const styles = getStatusStyles();
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.4, 
        ease: "easeOut" 
      }}
      className={`
        relative overflow-hidden rounded-xl border backdrop-blur-sm
        ${styles.container}
        ${onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''}
        transition-transform duration-200
      `}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      {/* Effet de gradient animé pour le loading */}
      {status === 'loading' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      <div className={`relative ${isMobile ? 'p-3' : 'p-4'} flex items-start ${isMobile ? 'space-x-2' : 'space-x-3'}`}>
        {/* Icône de statut */}
        {getStatusIcon()}

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <motion.p
                className={`font-medium ${styles.text} ${isMobile ? 'text-sm' : 'text-base'}`}
                animate={{ 
                  x: status === 'loading' ? [0, 2, 0] : 0 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: status === 'loading' ? Infinity : 0 
                }}
              >
                {message}
              </motion.p>
              
              {details && (
                <motion.p
                  className={`${isMobile ? 'text-xs' : 'text-sm'} mt-1 ${styles.details}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {details}
                </motion.p>
              )}
            </div>

            {/* Timestamp */}
            {!isMobile && (
              <motion.span
                className="text-xs text-neutral-500 ml-2 flex-shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {formatTime(timestamp)}
              </motion.span>
            )}
          </div>
        </div>
      </div>

      {/* Barre de progression pour les success */}
      {status === 'success' && (
        <motion.div
          className="h-1 bg-gradient-to-r from-green-500 to-green-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          style={{ originX: 0 }}
        />
      )}

      {/* Effet de pulsation pour loading */}
      {status === 'loading' && (
        <motion.div
          className="absolute inset-0 border-2 border-primary-400/30 rounded-xl"
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
}