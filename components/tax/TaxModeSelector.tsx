'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TaxMode } from '@/lib/types/tax-types';

interface TaxModeSelectorProps {
  mode: TaxMode;
  onChange: (mode: TaxMode) => void;
  expertModeAvailable: boolean;
}

export default function TaxModeSelector({ 
  mode, 
  onChange, 
  expertModeAvailable 
}: TaxModeSelectorProps) {
  
  const modes = [
    {
      key: 'entrepreneur' as TaxMode,
      label: 'Entrepreneur',
      description: 'Interface guidée et pédagogique',
      icon: GraduationCap,
      available: true
    },
    {
      key: 'expert' as TaxMode,
      label: 'Expert',
      description: 'Accès complet et backoffice ASP ONE',
      icon: Settings,
      available: expertModeAvailable
    }
  ];

  return (
    <div className="flex bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-1">
      {modes.map((modeOption) => {
        const Icon = modeOption.icon;
        const isActive = mode === modeOption.key;
        const isAvailable = modeOption.available;
        
        return (
          <motion.button
            key={modeOption.key}
            onClick={() => isAvailable && onChange(modeOption.key)}
            disabled={!isAvailable}
            className={cn(
              "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
              "min-w-[140px] text-left",
              isActive && "text-white",
              !isActive && isAvailable && "text-neutral-400 hover:text-neutral-200",
              !isAvailable && "text-neutral-600 cursor-not-allowed opacity-50"
            )}
            whileHover={isAvailable ? { scale: 1.02 } : undefined}
            whileTap={isAvailable ? { scale: 0.98 } : undefined}
          >
            {/* Background actif */}
            {isActive && (
              <motion.div
                layoutId="activeModeBackground"
                className="absolute inset-0 bg-gradient-to-r from-[#4C34CE] to-[#6d5cde] rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {/* Contenu */}
            <div className="relative z-10 flex items-center gap-3">
              <Icon className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">
                  {modeOption.label}
                </div>
                <div className="text-xs opacity-75 hidden sm:block">
                  {modeOption.description}
                </div>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}