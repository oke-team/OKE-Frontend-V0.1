'use client';

import React, { useState } from 'react';
import { DocumentViewerAdvanced, useDocumentViewer } from '@/components/ui/DocumentViewerAdvanced';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Paperclip
} from 'lucide-react';
import { motion } from 'framer-motion';

// Données de l'écriture comptable avec la facture attachée
const ecritureComptable = {
  id: 'EC-2025-001',
  date: '2025-01-15',
  libelle: 'Centre de Santé Médico-Dentaire Blaise Pascal',
  compte: '401000',
  compteLibelle: 'Fournisseurs',
  montant: 480.11,
  type: 'debit',
  statut: 'validated',
  reference: 'PENNYLANE-2025-07-480111',
  documents: [
    {
      id: 'doc-1',
      name: 'Facture Centre de Santé Blaise Pascal',
      type: 'application/pdf',
      size: 245678,
      src: '/documents/facture-pennylane.pdf',
      uploadDate: '2025-01-15',
      status: 'validated'
    }
  ]
};

export default function InvoiceDemoPage() {
  const { open: openViewer, ViewerComponent } = useDocumentViewer();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Écriture Comptable avec Document
          </h1>
          <p className="text-gray-600">
            Démonstration du DocumentViewer avec une vraie facture PDF
          </p>
        </motion.div>

        {/* Écriture Comptable Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden"
        >
          {/* Header de l'écriture */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 p-6 border-b border-purple-200/30">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {ecritureComptable.libelle}
                  </h2>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Validée
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(ecritureComptable.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {ecritureComptable.reference}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(ecritureComptable.montant)}
                </div>
                <div className="text-sm text-gray-500">
                  {ecritureComptable.compte} - {ecritureComptable.compteLibelle}
                </div>
              </div>
            </div>
          </div>

          {/* Document attaché */}
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
              <Paperclip className="w-4 h-4" />
              Document attaché
            </h3>
            
            <div className="bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm rounded-xl border border-white/60 p-4 shadow-inner">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-red-100 to-red-50 rounded-lg shadow-sm">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {ecritureComptable.documents[0].name}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span>PDF</span>
                      <span>•</span>
                      <span>{formatFileSize(ecritureComptable.documents[0].size)}</span>
                      <span>•</span>
                      <span>Ajouté le {formatDate(ecritureComptable.documents[0].uploadDate)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      console.log('Téléchargement:', ecritureComptable.documents[0].name);
                      window.open(ecritureComptable.documents[0].src, '_blank');
                    }}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Télécharger"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => openViewer({
                      src: ecritureComptable.documents[0].src,
                      title: ecritureComptable.documents[0].name,
                      type: 'pdf'
                    })}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium rounded-lg hover:from-purple-700 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Visualiser
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>


        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-md"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Facture réelle attachée</p>
              <p className="text-blue-700">
                Cette démonstration utilise une vraie facture PDF du Centre de Santé Médico-Dentaire 
                Blaise Pascal. Le DocumentViewer affiche le PDF réel avec tous les contrôles de 
                navigation, zoom et actions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* DocumentViewer Avancé */}
      <ViewerComponent 
        mode="auto"
        glassMorphism={true}
        enableAnnotations={true}
        enableDownload={true}
        enablePrint={true}
        enableShare={true}
      />
    </div>
  );
}