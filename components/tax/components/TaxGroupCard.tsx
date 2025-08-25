'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GroupSummary, TaxMode } from '@/lib/types/tax-types';

interface TaxGroupCardProps {
  title: string;
  description: string;
  data: GroupSummary;
  color: string;
  taxMode: TaxMode;
  onClick: () => void;
  delay?: number;
}

export default function TaxGroupCard({ 
  title, 
  description, 
  data, 
  color, 
  taxMode, 
  onClick, 
  delay = 0 
}: TaxGroupCardProps) {

  const getStatusIcon = () => {
    switch (data.status) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'ok':
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getStatusColor = () => {
    switch (data.status) {
      case 'critical':
        return 'border-red-500/30 bg-red-500/5';
      case 'warning':
        return 'border-orange-500/30 bg-orange-500/5';
      case 'ok':
      default:
        return 'border-green-500/30 bg-green-500/5';
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full text-left bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-200"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <h3 className="text-lg font-semibold text-white">
                {title}
              </h3>
            </div>
            <p className="text-sm text-neutral-400">
              {description}
            </p>
          </div>

          <ArrowRight className="w-5 h-5 text-neutral-400 flex-shrink-0" />
        </div>

        {/* Statistiques */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-white">
                {data.count}
              </div>
              <div className="text-xs text-neutral-400">
                Total
              </div>
            </div>
            
            {data.pendingCount > 0 && (
              <div className="text-center">
                <div className="text-xl font-bold text-orange-400">
                  {data.pendingCount}
                </div>
                <div className="text-xs text-neutral-400">
                  En attente
                </div>
              </div>
            )}
          </div>

          {/* Badge statut */}
          <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium",
            getStatusColor()
          )}>
            {getStatusIcon()}
            <span>
              {data.status === 'critical' && 'Critique'}
              {data.status === 'warning' && 'Attention'}
              {data.status === 'ok' && 'OK'}
            </span>
          </div>
        </div>

        {/* Prochaine échéance */}
        {data.nextDeadline && (
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-400">
                Prochaine échéance:
              </span>
              <span className="text-white font-medium">
                {new Date(data.nextDeadline).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short'
                })}
              </span>
            </div>
          </div>
        )}

        {/* Mode indicator */}
        <div className="pt-3 border-t border-white/10">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500">
              Mode {taxMode === 'entrepreneur' ? 'guidé' : 'expert'}
            </span>
            <div className="flex items-center gap-1">
              <div className={cn(
                "w-2 h-2 rounded-full",
                taxMode === 'entrepreneur' ? "bg-blue-400" : "bg-purple-400"
              )} />
              <span className="text-neutral-400">
                {taxMode === 'entrepreneur' ? 'Interface pédagogique' : 'Accès complet'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}