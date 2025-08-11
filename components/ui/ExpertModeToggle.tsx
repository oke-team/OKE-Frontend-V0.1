'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useExpertMode } from '@/contexts/ExpertModeContext';

export default function ExpertModeToggle() {
  const { expertMode, toggleExpertMode } = useExpertMode();

  return (
    <button
      onClick={toggleExpertMode}
      className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-all duration-200"
    >
      <div className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
        expertMode ? 'bg-violet-600' : 'bg-neutral-300'
      }`}>
        <motion.div
          animate={{ x: expertMode ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </div>
      <Shield className={`w-4 h-4 transition-colors duration-200 ${
        expertMode ? 'text-violet-600' : 'text-neutral-500'
      }`} />
      <span className={`text-sm font-medium transition-colors duration-200 ${
        expertMode ? 'text-violet-600' : 'text-neutral-700'
      }`}>
        {expertMode ? 'Mode Expert' : 'Mode Entrepreneur'}
      </span>
    </button>
  );
}