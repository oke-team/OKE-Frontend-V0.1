'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';
import { Plus, FileText } from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import InvoiceEditorModal6 from '@/components/sales/InvoiceEditorModal6';

export default function SalesTest6Page() {
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
              Version Test 6 - Navbar Verticale + Facture Large
            </p>
            <p className="text-gray-400 text-sm">
              Header minimal, navbar droite, facture élargie avec tous les boutons colorés
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

      {/* Modal éditeur de facture - Version Navbar Verticale */}
      <InvoiceEditorModal6
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
      />
    </AppLayout>
  );
}