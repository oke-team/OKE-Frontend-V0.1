'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ProtectedLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
        className="text-center"
      >
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Cercle extérieur animé */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#4C34CE] to-[#6B46FF] rounded-full opacity-20"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#4C34CE] rounded-full"></div>
          </motion.div>
          
          {/* Logo OKÉ au centre */}
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#4C34CE] to-[#6B46FF] bg-clip-text text-transparent">
              OKÉ
            </span>
          </div>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 font-medium"
        >
          Chargement en cours...
        </motion.p>
        
        {/* Barre de progression */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 w-48 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-full w-1/3 bg-gradient-to-r from-[#4C34CE] to-[#6B46FF] rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}