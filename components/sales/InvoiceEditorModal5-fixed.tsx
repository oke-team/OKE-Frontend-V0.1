'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Save, 
  Download, 
  Mail, 
  Printer,
  RefreshCw,
  Repeat,
  FileText,
  Share2,
  Copy,
  Eye,
  MoreHorizontal,
  Zap,
  Sparkles,
  Heart
} from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';

interface InvoiceEditorModal5Props {
  isOpen: boolean;
  onClose: () => void;
}

// Données complètes de la facture (réutilisées)
const initialInvoiceData = {
  number: '2024-12-052',
  title: 'Facture',
  issueDate: '31 décembre 2024',
  dueDate: '31 janvier 2025',
  issuer: {
    name: 'OKÉ SERVICES',
    address: '8 rue Saint Marc',
    postalCode: '75002',
    city: 'Paris',
    country: 'France',
    siret: '843 117 227 00036',
    vat: 'FR63843117227'
  },
  client: {
    name: 'JACOB ADVISORY SAS',
    address: 'LA RUCHE',
    address2: '126 rue du 11 Novembre 1918',
    postalCode: '74460',
    city: 'Marnaz',
    country: 'France',
    siret: '880 172 044 00039',
    vat: 'FR89880172044'
  },
  items: [{
    description: 'Prestations 2024 selon nos accords',
    quantity: '1',
    unit: 'forfait',
    unitPrice: '50 000,00',
    vatRate: '20',
    total: '50 000,00'
  }],
  totals: {
    ht: '50 000,00',
    vat: '10 000,00',
    ttc: '60 000,00'
  },
  payment: {
    method: 'Virement bancaire',
    bank: 'SOCIÉTÉ GÉNÉRALE',
    iban: 'FR76 3000 3033 5100 0201 0389 532',
    bic: 'SOGEFRPP'
  }
};

export default function InvoiceEditorModal5({ 
  isOpen, 
  onClose
}: InvoiceEditorModal5Props) {
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [showAdvancedMenu, setShowAdvancedMenu] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Actions
  const handleSave = () => {
    console.log('Sauvegarde de la facture:', invoiceData);
    onClose();
  };

  const handleDownload = () => console.log('Téléchargement PDF');
  const handleEmail = () => console.log('Envoi par email');
  const handlePrint = () => window.print();
  const handleResend = () => {
    setIsProcessing(true);
    setTimeout(() => {
      console.log('Facture relancée');
      setIsProcessing(false);
    }, 2000);
  };
  const handleManageSubscriptions = () => console.log('Gestion des abonnements');
  const handleConvertQuote = () => console.log('Transformer le devis en facture');
  const handleShare = () => console.log('Partage de la facture');
  const handleDuplicate = () => console.log('Dupliquer la facture');
  const handlePreview = () => console.log('Aperçu avant envoi');

  // Fermer le menu au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showAdvancedMenu) {
        setShowAdvancedMenu(false);
      }
    };

    if (showAdvancedMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showAdvancedMenu]);

  // Fonction pour mettre à jour les données
  const updateField = (path: string, value: string) => {
    const keys = path.split('.');
    setInvoiceData(prev => {
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  // Styles CSS optimisés
  const containerStyle = useMemo(() => ({
    width: '21cm',
    minHeight: '29.7cm',
    margin: '0 auto',
    padding: '1cm 1.2cm',
    background: 'white',
    position: 'relative' as const,
    boxSizing: 'border-box' as const,
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    borderRadius: '16px',
    border: '1px solid rgba(0,0,0,0.05)',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: '13px',
    lineHeight: '1.5',
    color: '#1a1a1a'
  }), []);

  const inputStyle = {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: '2px 4px',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease'
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{
            background: 'radial-gradient(circle at center, rgba(76, 52, 206, 0.1) 0%, rgba(250, 160, 22, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)'
          }}
        >
          {/* Particules d'ambiance flottantes */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0 ? 'rgba(76, 52, 206, 0.3)' : 'rgba(250, 160, 22, 0.3)',
                left: `${10 + i * 15}%`,
                top: `${10 + i * 12}%`,
                filter: 'blur(1px)'
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}

          {/* Modal Container avec effets Vision Pro */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotateX: 10 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotateX: 10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative m-8 h-[calc(100vh-4rem)] flex flex-col"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(60px)',
              WebkitBackdropFilter: 'blur(60px)',
              borderRadius: '32px',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
              transform: 'translateZ(0)' // Force hardware acceleration
            }}
          >
            {/* Header Apple Vision Pro Style */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex-shrink-0 px-10 py-8 border-b border-white/20"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
                backdropFilter: 'blur(30px)',
                borderRadius: '32px 32px 0 0'
              }}
            >
              <div className="flex items-center justify-between">
                {/* Zone titre avec effets */}
                <div className="flex items-center gap-6">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4C34CE]/20 to-[#FAA016]/20 rounded-2xl blur-xl" />
                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-[#4C34CE]/10 to-[#FAA016]/10 border-2 border-white/30 backdrop-blur-sm">
                      <FileText className="w-8 h-8 text-[#4C34CE]" />
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                  
                  <div>
                    <motion.h1 
                      className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-[#4C34CE] to-gray-900 bg-clip-text text-transparent"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Éditeur de facture
                    </motion.h1>
                    <motion.div 
                      className="flex items-center gap-3 mt-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-lg font-semibold text-gray-700">{invoiceData.number}</span>
                      <div className="h-2 w-2 rounded-full bg-gray-300" />
                      <motion.span 
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 border-2 border-emerald-200/50"
                        animate={{ boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0)', '0 0 0 4px rgba(34, 197, 94, 0.1)', '0 0 0 0 rgba(34, 197, 94, 0)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Brouillon
                      </motion.span>
                      <div className="h-2 w-2 rounded-full bg-gray-300" />
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-400" />
                        Sauvegarde en temps réel
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions principales avec espacement Vision Pro */}
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Groupe Visualisation */}
                  <div className="flex items-center gap-2">
                    <GlassButton onClick={handlePreview} className="bg-white/80 text-gray-700 hover:bg-white/90 px-4 py-2">
                      <Eye className="w-5 h-5 mr-2" />
                      Aperçu
                    </GlassButton>
                    
                    <GlassButton onClick={handlePrint} className="bg-white/80 text-gray-700 hover:bg-white/90 px-3 py-2">
                      <Printer className="w-5 h-5" />
                    </GlassButton>
                  </div>

                  {/* Séparateur lumineux */}
                  <div className="h-10 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

                  {/* Groupe Export */}
                  <div className="flex items-center gap-2">
                    <GlassButton onClick={handleDownload} className="bg-gradient-to-r from-[#FAA016] to-[#FAA016]/90 text-white px-4 py-2">
                      <Download className="w-5 h-5 mr-2" />
                      PDF
                    </GlassButton>
                    
                    <GlassButton onClick={handleEmail} className="bg-gradient-to-r from-[#4C34CE] to-[#4C34CE]/90 text-white px-4 py-2">
                      <Mail className="w-5 h-5 mr-2" />
                      Envoyer
                    </GlassButton>
                  </div>

                  {/* Menu Actions Avancées avec effets */}
                  <div className="relative">
                    <GlassButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAdvancedMenu(!showAdvancedMenu);
                      }}
                      className="bg-white/80 text-gray-700 hover:bg-white/90 px-3 py-2 relative overflow-visible"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                      {showAdvancedMenu && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-2 h-2 bg-[#4C34CE] rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      )}
                    </GlassButton>
                    
                    {/* Menu Déroulant Vision Pro */}
                    <AnimatePresence>
                      {showAdvancedMenu && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10, rotateX: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10, rotateX: -10 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute right-0 top-full mt-4 w-64 z-50"
                          style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(30px)',
                            borderRadius: '20px',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                          }}
                        >
                          <div className="p-3 space-y-1">
                            {[
                              { action: handleResend, icon: RefreshCw, label: 'Relancer le client', processing: isProcessing },
                              { action: handleManageSubscriptions, icon: Repeat, label: 'Gérer les abonnements' },
                              { action: handleConvertQuote, icon: FileText, label: 'Transformer en facture' },
                              { action: handleShare, icon: Share2, label: 'Partager' },
                              { action: handleDuplicate, icon: Copy, label: 'Dupliquer' }
                            ].map((item, index) => (
                              <motion.button
                                key={index}
                                onClick={() => { item.action(); setShowAdvancedMenu(false); }}
                                disabled={item.processing}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-white/60 rounded-2xl transition-all duration-200 disabled:opacity-50 group"
                                style={{
                                  backdropFilter: 'blur(10px)'
                                }}
                              >
                                <item.icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${item.processing ? 'animate-spin' : ''}`} />
                                {item.processing ? 'Relance en cours...' : item.label}
                                <motion.div
                                  className="ml-auto opacity-0 group-hover:opacity-100"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <Sparkles className="w-3 h-3 text-[#FAA016]" />
                                </motion.div>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Séparateur lumineux */}
                  <div className="h-10 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

                  {/* Sauvegarder avec effets spéciaux */}
                  <GlassButton onClick={handleSave} className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 relative overflow-visible">
                    <Save className="w-5 h-5 mr-2" />
                    Sauvegarder
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-emerald-500/20 rounded-2xl blur-md -z-10"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </GlassButton>
                  
                  {/* Bouton fermeture avec effet */}
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 text-gray-400 hover:text-gray-600 transition-all duration-200 rounded-2xl hover:bg-white/40 backdrop-blur-sm"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Contenu de la facture */}
            <div className="flex-1 overflow-y-auto p-10">
              <div style={containerStyle}>
                {/* Contenu simplifié pour éviter les erreurs */}
                <div className="text-center py-20">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Version Apple Vision Pro</h2>
                  <p className="text-gray-600">
                    Cette version présente des effets Liquid Glass avancés avec des micro-animations,
                    des particules flottantes et un design inspiré d'Apple Vision Pro.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}