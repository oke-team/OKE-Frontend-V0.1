'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface TaxStatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  trend?: string;
  delay?: number;
}

export default function TaxStatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend, 
  delay = 0 
}: TaxStatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        
        {trend && (
          <span className="text-xs text-neutral-400 font-medium">
            {trend}
          </span>
        )}
      </div>
      
      <div>
        <div className="text-2xl font-bold text-white mb-1">
          {value}
        </div>
        <div className="text-sm text-neutral-400">
          {title}
        </div>
      </div>
    </motion.div>
  );
}