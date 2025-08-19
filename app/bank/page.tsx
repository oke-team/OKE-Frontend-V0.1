'use client';

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';
import BankTransactionTable from '@/components/bank/BankTransactionTable';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function BankPage() {
  return (
    <AppLayout>
      {/* Conteneur avec hauteur fixe calculée : 100vh - header(64px) - bottom nav(96px) */}
      <div 
        className="overflow-hidden"
        style={{ height: 'calc(100vh - 160px)' }}
      >
        <motion.div 
          className="h-full flex flex-col"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Table des transactions - occupe toute la hauteur disponible */}
          <motion.div 
            variants={fadeInUp}
            className="flex-1 px-4 lg:px-6 pt-4 pb-4 min-h-0"
          >
            <div className="h-full bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] border border-gray-200 overflow-hidden ring-2 ring-black/10 drop-shadow-2xl" style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 25px 50px -12px rgba(0, 0, 0, 0.15)'}}>
              <BankTransactionTable />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
