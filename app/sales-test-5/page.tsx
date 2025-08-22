'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';
import { Plus, FileText } from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
// Import temporairement désactivé pour éviter les erreurs
// import InvoiceEditorModal5 from '@/components/sales/InvoiceEditorModal5-fixed';

export default function SalesTest5Page() {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  return (
    <AppLayout>
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Placeholder pour les données futures */}
          <div className="mb-12">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg mb-2">
              Version Test 5 - Apple Vision Pro
            </p>
            <p className="text-gray-400 text-sm">
              Header amélioré avec effets Liquid Glass poussés
            </p>
          </div>

          {/* Bouton principal */}
          <GlassButton
            onClick={() => setIsInvoiceModalOpen(true)}
            className="bg-gradient-to-r from-[#4C34CE] to-[#6246EA] text-white text-lg px-8 py-4"
          >
            <Plus className="w-6 h-6 mr-3" />
            Nouvelle facture
          </GlassButton>
        </motion.div>
      </div>

      {/* Modal temporairement désactivé */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Version 5 - Apple Vision Pro</h2>
            <p className="text-gray-600 mb-6">
              Cette version présente des effets Liquid Glass avancés mais rencontre 
              actuellement un problème de compilation. Les 4 autres versions sont 
              parfaitement fonctionnelles !
            </p>
            <button 
              onClick={() => setIsInvoiceModalOpen(false)}
              className="bg-[#4C34CE] text-white px-4 py-2 rounded-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
}