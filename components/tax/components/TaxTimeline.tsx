'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Deadline } from '@/lib/types/tax-types';
import { designTokens } from '@/lib/design-tokens';

interface TaxTimelineProps {
  deadlines: Deadline[];
  limit?: number;
}

export default function TaxTimeline({ deadlines, limit = 10 }: TaxTimelineProps) {
  const displayDeadlines = deadlines.slice(0, limit);

  const getDeadlineColor = (deadline: Deadline) => {
    if (deadline.isOverdue) return designTokens.tax.status.overdue.base;
    
    switch (deadline.priority) {
      case 'critical':
        return designTokens.tax.status.critical.base;
      case 'high':
        return designTokens.tax.status.pending.base;
      case 'medium':
        return designTokens.tax.status.normal.base;
      case 'low':
      default:
        return designTokens.tax.status.validated.base;
    }
  };

  const getDeadlineIcon = (deadline: Deadline) => {
    if (deadline.isOverdue) return AlertTriangle;
    
    switch (deadline.priority) {
      case 'critical':
        return AlertTriangle;
      case 'high':
        return Clock;
      case 'medium':
      case 'low':
      default:
        return Calendar;
    }
  };

  const getPriorityLabel = (deadline: Deadline) => {
    if (deadline.isOverdue) return 'En retard';
    
    switch (deadline.priority) {
      case 'critical':
        return 'Critique';
      case 'high':
        return 'Urgent';
      case 'medium':
        return 'Normal';
      case 'low':
      default:
        return 'Programmé';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
      {displayDeadlines.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Aucune échéance à venir
          </h3>
          <p className="text-neutral-400">
            Toutes vos déclarations sont à jour
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-neutral-700" />
          
          <div className="space-y-6">
            {displayDeadlines.map((deadline, index) => {
              const Icon = getDeadlineIcon(deadline);
              const color = getDeadlineColor(deadline);
              
              return (
                <motion.div
                  key={deadline.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  className="relative flex items-start gap-4"
                >
                  {/* Node */}
                  <div 
                    className="relative z-10 w-3 h-3 rounded-full border-2 flex-shrink-0 mt-2"
                    style={{ 
                      backgroundColor: color,
                      borderColor: color,
                      boxShadow: `0 0 8px ${color}40`
                    }}
                  />
                  
                  {/* Contenu */}
                  <div className="flex-1 pb-6">
                    <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-white mb-1">
                            {deadline.title}
                          </h4>
                          <div className="flex items-center gap-3 text-sm text-neutral-400">
                            <span>Type: {deadline.declarationType}</span>
                            {deadline.amount && (
                              <span>
                                Montant: {deadline.amount.toLocaleString('fr-FR', {
                                  style: 'currency',
                                  currency: 'EUR'
                                })}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Badge de priorité */}
                        <div 
                          className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border"
                          style={{ 
                            backgroundColor: `${color}20`,
                            borderColor: `${color}40`,
                            color: color
                          }}
                        >
                          <Icon className="w-3 h-3" />
                          {getPriorityLabel(deadline)}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-neutral-400" />
                            <span className="text-neutral-300">
                              {new Date(deadline.dueDate).toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                        
                        <div className={cn(
                          "text-sm font-semibold",
                          deadline.isOverdue && "text-red-400",
                          deadline.daysUntilDue <= 7 && !deadline.isOverdue && "text-orange-400",
                          deadline.daysUntilDue > 7 && "text-neutral-300"
                        )}>
                          {deadline.isOverdue 
                            ? `${Math.abs(deadline.daysUntilDue)} jour(s) de retard`
                            : `Dans ${deadline.daysUntilDue} jour(s)`
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Afficher plus si nécessaire */}
      {deadlines.length > limit && (
        <div className="text-center pt-4 border-t border-white/10 mt-4">
          <button className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors">
            Voir toutes les échéances ({deadlines.length - limit} de plus)
          </button>
        </div>
      )}
    </div>
  );
}