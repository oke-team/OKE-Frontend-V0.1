'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Save, 
  Download, 
  Mail, 
  Printer,
  Eye,
  Settings
} from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';

interface InvoiceEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceEditorModal({ 
  isOpen, 
  onClose
}: InvoiceEditorModalProps) {

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-white"
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">Modal Test</h1>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p>Si vous voyez ce message, le modal fonctionne correctement.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}