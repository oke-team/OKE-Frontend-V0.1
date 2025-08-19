'use client';

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';

export default function BankPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Banque</h1>
            <p className="text-gray-600 mt-1">Module en cours de refonte</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="glass rounded-xl p-6"
        >
          <div className="space-y-2">
            <p className="text-gray-700">Cette page est temporairement neutralisée pour avancer sur les autres correctifs.</p>
            <ul className="list-disc pl-5 text-gray-600 text-sm">
              <li>Sélecteur de compte</li>
              <li>Table des transactions</li>
              <li>Rapprochement et actions</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
