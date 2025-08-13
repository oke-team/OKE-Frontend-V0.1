'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, ChevronDown, Check, Clock, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePeriod, Period } from '@/contexts/PeriodContext';

interface PeriodSelectorGlassProps {
  compact?: boolean;
}

export const PeriodSelectorGlass: React.FC<PeriodSelectorGlassProps> = ({ compact = false }) => {
  const { currentPeriod, periods, setPeriod } = usePeriod();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch(type) {
      case 'exercise': return <CalendarDays className="w-3.5 h-3.5" />;
      case 'situation': return <Clock className="w-3.5 h-3.5" />;
      case 'custom': return <TrendingUp className="w-3.5 h-3.5" />;
      default: return <CalendarDays className="w-3.5 h-3.5" />;
    }
  };

  const formatLabel = (period: Period) => {
    if (compact && period.type === 'exercise') {
      return period.label.split(' ')[1];
    }
    return period.label;
  };

  const groupedPeriods = {
    exercise: periods.filter(p => p.type === 'exercise'),
    situation: periods.filter(p => p.type === 'situation'),
    custom: periods.filter(p => p.type === 'custom'),
  };

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2",
          compact ? "px-2 py-1.5" : "px-3 py-2",
          "rounded-xl",
          "bg-white/70 dark:bg-neutral-900/70",
          "backdrop-blur-md",
          "border border-white/20 dark:border-white/10",
          "shadow-sm hover:shadow-md",
          "transition-all duration-200",
          "hover:bg-white/80 dark:hover:bg-neutral-800/80",
          "group"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="text-primary-500">
          {getIcon(currentPeriod.type)}
        </div>
        <span className={cn(
          "font-medium",
          compact ? "text-xs" : "text-sm",
          "text-neutral-700 dark:text-neutral-300"
        )}>
          {formatLabel(currentPeriod)}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className={cn(
            "text-neutral-500",
            compact ? "w-3 h-3" : "w-4 h-4"
          )} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "absolute top-full mt-2 right-0",
              "min-w-[240px] max-h-[400px]",
              "bg-white/95 dark:bg-neutral-900/95",
              "backdrop-blur-xl",
              "border border-white/20 dark:border-white/10",
              "rounded-2xl",
              "shadow-xl shadow-black/10",
              "overflow-hidden",
              "z-50"
            )}
          >
            <div className="overflow-y-auto max-h-[380px] py-2">
              {/* Exercices */}
              {groupedPeriods.exercise.length > 0 && (
                <div className="px-3 py-1">
                  <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Exercices
                  </p>
                  {groupedPeriods.exercise.map(period => (
                    <motion.button
                      key={period.id}
                      onClick={() => {
                        setPeriod(period);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between",
                        "px-3 py-2.5 rounded-lg",
                        "transition-all duration-150",
                        currentPeriod.id === period.id
                          ? "bg-primary-50/50 dark:bg-primary-900/20 border border-primary-200/50 dark:border-primary-700/30"
                          : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                      )}
                      whileHover={{ x: currentPeriod.id !== period.id ? 2 : 0 }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={cn(
                          "text-primary-500",
                          currentPeriod.id === period.id && "text-primary-600"
                        )}>
                          <CalendarDays className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium">
                            {period.label}
                          </div>
                          <div className="text-[10px] text-neutral-500">
                            {period.startDate.getFullYear()}
                          </div>
                        </div>
                      </div>
                      {currentPeriod.id === period.id && (
                        <Check className="w-3.5 h-3.5 text-primary-500" />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Situations */}
              {groupedPeriods.situation.length > 0 && (
                <div className="px-3 py-1 mt-2">
                  <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Situations
                  </p>
                  {groupedPeriods.situation.map(period => (
                    <motion.button
                      key={period.id}
                      onClick={() => {
                        setPeriod(period);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between",
                        "px-3 py-2.5 rounded-lg",
                        "transition-all duration-150",
                        currentPeriod.id === period.id
                          ? "bg-primary-50/50 dark:bg-primary-900/20 border border-primary-200/50 dark:border-primary-700/30"
                          : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                      )}
                      whileHover={{ x: currentPeriod.id !== period.id ? 2 : 0 }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={cn(
                          "text-secondary-500",
                          currentPeriod.id === period.id && "text-secondary-600"
                        )}>
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium">
                            {period.label}
                          </div>
                          <div className="text-[10px] text-neutral-500">
                            Au {period.endDate.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                      {currentPeriod.id === period.id && (
                        <Check className="w-3.5 h-3.5 text-primary-500" />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Custom */}
              {groupedPeriods.custom.length > 0 && (
                <div className="px-3 py-1 mt-2">
                  <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Personnalisé
                  </p>
                  {groupedPeriods.custom.map(period => (
                    <motion.button
                      key={period.id}
                      onClick={() => {
                        setPeriod(period);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between",
                        "px-3 py-2.5 rounded-lg",
                        "transition-all duration-150",
                        currentPeriod.id === period.id
                          ? "bg-primary-50/50 dark:bg-primary-900/20 border border-primary-200/50 dark:border-primary-700/30"
                          : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                      )}
                      whileHover={{ x: currentPeriod.id !== period.id ? 2 : 0 }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={cn(
                          "text-accent-green",
                          currentPeriod.id === period.id && "text-accent-green"
                        )}>
                          <TrendingUp className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium">
                            {period.label}
                          </div>
                          <div className="text-[10px] text-neutral-500">
                            {period.startDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - 
                            {period.endDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                      {currentPeriod.id === period.id && (
                        <Check className="w-3.5 h-3.5 text-primary-500" />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};