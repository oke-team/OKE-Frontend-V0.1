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
  Send,
  Archive,
  Settings,
  CreditCard,
  Calendar,
  Clock,
  DollarSign,
  Calculator,
  Zap,
  Bell,
  Star,
  Flag,
  Bookmark,
  Edit3,
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface InvoiceEditorModal6Props {
  isOpen: boolean;
  onClose: () => void;
}

// Données complètes de la facture
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

interface TooltipButtonProps {
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  tooltip: string;
  color?: string;
  disabled?: boolean;
  processing?: boolean;
}

// Composant bouton avec tooltip
const TooltipButton: React.FC<TooltipButtonProps> = ({ 
  onClick, 
  icon: Icon, 
  tooltip, 
  color = 'bg-gray-100 hover:bg-gray-200 text-gray-700',
  disabled = false,
  processing = false
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`p-3 rounded-xl transition-all duration-200 shadow-sm ${color} ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
        }`}
      >
        <Icon className={`w-5 h-5 ${processing ? 'animate-spin' : ''}`} />
      </motion.button>
      
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 z-50"
          >
            <div 
              className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              {tooltip}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function InvoiceEditorModal6({ 
  isOpen, 
  onClose
}: InvoiceEditorModal6Props) {
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
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
  const handleArchive = () => console.log('Archiver la facture');
  const handleCalculate = () => console.log('Recalculer automatiquement');
  const handleSchedule = () => console.log('Programmer l\'envoi');
  const handlePayment = () => console.log('Gérer le paiement');
  const handleReminder = () => console.log('Configurer rappel');
  const handleFavorite = () => console.log('Marquer comme favori');
  const handleFlag = () => console.log('Ajouter un drapeau');
  const handleBookmark = () => console.log('Ajouter aux signets');
  const handleEdit = () => console.log('Mode édition avancé');
  const handleDelete = () => console.log('Supprimer la facture');
  const handleValidate = () => console.log('Valider la facture');
  const handleAlert = () => console.log('Configurer alertes');

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

  // Styles CSS optimisés pour une facture plus large
  const containerStyle = useMemo(() => ({
    width: '100%',
    maxWidth: 'none',
    minHeight: '29.7cm',
    margin: '0',
    padding: '2rem 3rem',
    background: 'white',
    position: 'relative' as const,
    boxSizing: 'border-box' as const,
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    borderRadius: '16px',
    border: '1px solid rgba(0,0,0,0.05)',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#1a1a1a'
  }), []);

  const inputStyle = {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: '4px 6px',
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
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          {/* Modal Container avec navbar verticale */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative m-4 h-[calc(100vh-2rem)] flex"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* Navbar Verticale à Droite */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex-shrink-0 w-20 border-l border-gray-100/50 flex flex-col items-center py-6 gap-3"
              style={{
                background: 'linear-gradient(180deg, rgba(248,250,252,0.95) 0%, rgba(241,245,249,0.95) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              {/* Actions principales */}
              <div className="space-y-3">
                {/* Groupe Aperçu & Impression */}
                <TooltipButton
                  onClick={handlePreview}
                  icon={Eye}
                  tooltip="Aperçu avant envoi"
                  color="bg-blue-100 hover:bg-blue-200 text-blue-700"
                />
                <TooltipButton
                  onClick={handlePrint}
                  icon={Printer}
                  tooltip="Imprimer la facture"
                  color="bg-gray-100 hover:bg-gray-200 text-gray-700"
                />
                
                {/* Séparateur */}
                <div className="h-px bg-gray-200 my-2" />
                
                {/* Groupe Export & Partage */}
                <TooltipButton
                  onClick={handleDownload}
                  icon={Download}
                  tooltip="Télécharger en PDF"
                  color="bg-orange-100 hover:bg-orange-200 text-orange-700"
                />
                <TooltipButton
                  onClick={handleEmail}
                  icon={Mail}
                  tooltip="Envoyer par email"
                  color="bg-purple-100 hover:bg-purple-200 text-purple-700"
                />
                <TooltipButton
                  onClick={handleShare}
                  icon={Share2}
                  tooltip="Partager la facture"
                  color="bg-teal-100 hover:bg-teal-200 text-teal-700"
                />
                
                {/* Séparateur */}
                <div className="h-px bg-gray-200 my-2" />
                
                {/* Groupe Gestion */}
                <TooltipButton
                  onClick={handleResend}
                  icon={RefreshCw}
                  tooltip="Relancer le client"
                  color="bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                  processing={isProcessing}
                />
                <TooltipButton
                  onClick={handleSchedule}
                  icon={Clock}
                  tooltip="Programmer l'envoi"
                  color="bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                />
                <TooltipButton
                  onClick={handlePayment}
                  icon={CreditCard}
                  tooltip="Gérer le paiement"
                  color="bg-green-100 hover:bg-green-200 text-green-700"
                />
                
                {/* Séparateur */}
                <div className="h-px bg-gray-200 my-2" />
                
                {/* Groupe Actions Avancées */}
                <TooltipButton
                  onClick={handleManageSubscriptions}
                  icon={Repeat}
                  tooltip="Gérer les abonnements"
                  color="bg-pink-100 hover:bg-pink-200 text-pink-700"
                />
                <TooltipButton
                  onClick={handleConvertQuote}
                  icon={FileText}
                  tooltip="Transformer devis en facture"
                  color="bg-cyan-100 hover:bg-cyan-200 text-cyan-700"
                />
                <TooltipButton
                  onClick={handleCalculate}
                  icon={Calculator}
                  tooltip="Recalculer automatiquement"
                  color="bg-emerald-100 hover:bg-emerald-200 text-emerald-700"
                />
                
                {/* Séparateur */}
                <div className="h-px bg-gray-200 my-2" />
                
                {/* Groupe Organisation */}
                <TooltipButton
                  onClick={handleFavorite}
                  icon={Star}
                  tooltip="Marquer comme favori"
                  color="bg-amber-100 hover:bg-amber-200 text-amber-700"
                />
                <TooltipButton
                  onClick={handleFlag}
                  icon={Flag}
                  tooltip="Ajouter un drapeau"
                  color="bg-red-100 hover:bg-red-200 text-red-700"
                />
                <TooltipButton
                  onClick={handleBookmark}
                  icon={Bookmark}
                  tooltip="Ajouter aux signets"
                  color="bg-violet-100 hover:bg-violet-200 text-violet-700"
                />
                
                {/* Séparateur */}
                <div className="h-px bg-gray-200 my-2" />
                
                {/* Groupe Configuration */}
                <TooltipButton
                  onClick={handleReminder}
                  icon={Bell}
                  tooltip="Configurer rappels"
                  color="bg-orange-100 hover:bg-orange-200 text-orange-700"
                />
                <TooltipButton
                  onClick={handleAlert}
                  icon={AlertCircle}
                  tooltip="Configurer alertes"
                  color="bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                />
                <TooltipButton
                  onClick={handleValidate}
                  icon={CheckCircle}
                  tooltip="Valider la facture"
                  color="bg-green-100 hover:bg-green-200 text-green-700"
                />
                
                {/* Séparateur */}
                <div className="h-px bg-gray-200 my-2" />
                
                {/* Groupe Édition */}
                <TooltipButton
                  onClick={handleEdit}
                  icon={Edit3}
                  tooltip="Mode édition avancé"
                  color="bg-blue-100 hover:bg-blue-200 text-blue-700"
                />
                <TooltipButton
                  onClick={handleDuplicate}
                  icon={Copy}
                  tooltip="Dupliquer la facture"
                  color="bg-gray-100 hover:bg-gray-200 text-gray-700"
                />
                <TooltipButton
                  onClick={handleArchive}
                  icon={Archive}
                  tooltip="Archiver la facture"
                  color="bg-slate-100 hover:bg-slate-200 text-slate-700"
                />
                <TooltipButton
                  onClick={handleDelete}
                  icon={Trash2}
                  tooltip="Supprimer la facture"
                  color="bg-red-100 hover:bg-red-200 text-red-700"
                />
              </div>
            </motion.div>

            {/* Contenu Principal */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header Réduit */}
              <div className="flex-shrink-0 px-6 py-2 border-b border-gray-100/50 flex items-center justify-between" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                backdropFilter: 'blur(20px)'
              }}>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#4C34CE]/10 to-[#FAA016]/10 border border-[#4C34CE]/20">
                    <FileText className="w-4 h-4 text-[#4C34CE]" />
                  </div>
                  <div>
                    <h1 className="text-sm font-semibold text-gray-900 tracking-tight">Facture {invoiceData.number}</h1>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Boutons d'action */}
                  <motion.button 
                    onClick={handleSave}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm hover:shadow-md transition-all duration-200 px-4 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Sauvegarder
                  </motion.button>

                  <motion.button 
                    onClick={handleValidate}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-sm hover:shadow-md transition-all duration-200 px-4 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Valider
                  </motion.button>

                  <button
                    onClick={onClose}
                    className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100/50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contenu de la facture élargie */}
              <div className="flex-1 overflow-y-auto p-8">
                <div style={containerStyle}>
                  {/* Header */}
                  <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                        <img src="/oke-logo.svg" alt="OKÉ" style={{ height: '56px', width: 'auto' }} />
                        <input
                          type="text"
                          value={invoiceData.issuer.name}
                          onChange={(e) => updateField('issuer.name', e.target.value)}
                          style={{ ...inputStyle, fontSize: '20px', fontWeight: 600 }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          onFocus={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.1)'}
                          onBlur={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <h1 style={{ fontSize: '32px', fontWeight: 300, marginBottom: '16px' }}>
                        <input
                          type="text"
                          value={invoiceData.title}
                          onChange={(e) => updateField('title', e.target.value)}
                          style={{ ...inputStyle, fontSize: '32px', fontWeight: 300, textAlign: 'right', width: '180px' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                      </h1>
                      
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginBottom: '16px' }}>
                        <span style={{ background: '#FAA016', color: 'white', padding: '6px 16px', borderRadius: '24px', fontSize: '12px', fontWeight: 500 }}>
                          {invoiceData.number}
                        </span>
                        <span style={{ background: '#4C34CE', color: 'white', padding: '6px 16px', borderRadius: '24px', fontSize: '12px', fontWeight: 500 }}>
                          Factur-X
                        </span>
                      </div>
                      
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        <div>Émise le : <strong>{invoiceData.issueDate}</strong></div>
                        <div>Échéance le : <strong>{invoiceData.dueDate}</strong></div>
                      </div>
                    </div>
                  </header>

                  {/* Parties */}
                  <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
                    {/* Émetteur */}
                    <div style={{ padding: '20px', background: '#fafbfc', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                      <div style={{ fontSize: '12px', color: '#DC2626', fontWeight: 600, marginBottom: '10px' }}>ÉMETTEUR</div>
                      <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>
                        <input
                          type="text"
                          value={invoiceData.issuer.name}
                          onChange={(e) => updateField('issuer.name', e.target.value)}
                          style={{ ...inputStyle, fontSize: '16px', fontWeight: 600, width: '100%' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                      </div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>
                        <input
                          type="text"
                          value={invoiceData.issuer.address}
                          onChange={(e) => updateField('issuer.address', e.target.value)}
                          style={{ ...inputStyle, width: '100%', marginBottom: '3px' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                        <br />
                        <input
                          type="text"
                          value={`${invoiceData.issuer.postalCode} ${invoiceData.issuer.city} - ${invoiceData.issuer.country}`}
                          onChange={(e) => {
                            const parts = e.target.value.split(' ');
                            updateField('issuer.postalCode', parts[0] || '');
                            updateField('issuer.city', parts.slice(1, -2).join(' ') || '');
                            updateField('issuer.country', parts.slice(-1)[0] || '');
                          }}
                          style={{ ...inputStyle, width: '100%', marginBottom: '3px' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                        <br />
                        <strong>SIRET</strong>{' '}
                        <input
                          type="text"
                          value={invoiceData.issuer.siret}
                          onChange={(e) => updateField('issuer.siret', e.target.value)}
                          style={{ ...inputStyle, width: '160px' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                        <br />
                        <strong>TVA</strong>{' '}
                        <input
                          type="text"
                          value={invoiceData.issuer.vat}
                          onChange={(e) => updateField('issuer.vat', e.target.value)}
                          style={{ ...inputStyle, width: '130px' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                      </div>
                    </div>
                    
                    {/* Client */}
                    <div style={{ padding: '20px', background: '#fafbfc', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                      <div style={{ fontSize: '12px', color: '#DC2626', fontWeight: 600, marginBottom: '10px' }}>CLIENT</div>
                      <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>
                        <input
                          type="text"
                          value={invoiceData.client.name}
                          onChange={(e) => updateField('client.name', e.target.value)}
                          style={{ ...inputStyle, fontSize: '16px', fontWeight: 600, width: '100%' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                      </div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>
                        <input
                          type="text"
                          value={invoiceData.client.address}
                          onChange={(e) => updateField('client.address', e.target.value)}
                          style={{ ...inputStyle, width: '100%', marginBottom: '3px' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                        <br />
                        <input
                          type="text"
                          value={invoiceData.client.address2}
                          onChange={(e) => updateField('client.address2', e.target.value)}
                          style={{ ...inputStyle, width: '100%', marginBottom: '3px' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                        <br />
                        <input
                          type="text"
                          value={`${invoiceData.client.postalCode} ${invoiceData.client.city} - ${invoiceData.client.country}`}
                          onChange={(e) => {
                            const parts = e.target.value.split(' ');
                            updateField('client.postalCode', parts[0] || '');
                            updateField('client.city', parts.slice(1, -2).join(' ') || '');
                            updateField('client.country', parts.slice(-1)[0] || '');
                          }}
                          style={{ ...inputStyle, width: '100%', marginBottom: '3px' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                        <br />
                        <strong>SIRET</strong>{' '}
                        <input
                          type="text"
                          value={invoiceData.client.siret}
                          onChange={(e) => updateField('client.siret', e.target.value)}
                          style={{ ...inputStyle, width: '160px' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                        <br />
                        <strong>TVA</strong>{' '}
                        <input
                          type="text"
                          value={invoiceData.client.vat}
                          onChange={(e) => updateField('client.vat', e.target.value)}
                          style={{ ...inputStyle, width: '130px' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                      </div>
                    </div>
                  </section>

                  {/* Items Table Élargie */}
                  <section style={{ marginBottom: '40px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
                      <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <tr>
                          <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '12px', color: '#6b7280', width: '40%' }}>DESCRIPTION</th>
                          <th style={{ textAlign: 'center', padding: '16px 12px', fontSize: '12px', color: '#6b7280', width: '15%' }}>QUANTITÉ</th>
                          <th style={{ textAlign: 'right', padding: '16px 12px', fontSize: '12px', color: '#6b7280', width: '15%' }}>PRIX HT (€)</th>
                          <th style={{ textAlign: 'center', padding: '16px 12px', fontSize: '12px', color: '#6b7280', width: '10%' }}>TVA</th>
                          <th style={{ textAlign: 'right', padding: '16px 20px', fontSize: '12px', color: '#6b7280', width: '20%' }}>TOTAL HT (€)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceData.items.map((item, index) => (
                          <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                            <td style={{ padding: '20px', verticalAlign: 'top' }}>
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => updateField(`items.${index}.description`, e.target.value)}
                                style={{ ...inputStyle, fontSize: '14px', fontWeight: 500, width: '100%' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              />
                            </td>
                            <td style={{ padding: '20px 12px', textAlign: 'center', verticalAlign: 'top' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                <input
                                  type="text"
                                  value={item.quantity}
                                  onChange={(e) => updateField(`items.${index}.quantity`, e.target.value)}
                                  style={{ ...inputStyle, width: '50px', textAlign: 'center', fontSize: '14px', fontWeight: 500 }}
                                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                />
                                <input
                                  type="text"
                                  value={item.unit}
                                  onChange={(e) => updateField(`items.${index}.unit`, e.target.value)}
                                  style={{ ...inputStyle, width: '70px', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}
                                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                />
                              </div>
                            </td>
                            <td style={{ padding: '20px 12px', textAlign: 'right', verticalAlign: 'top' }}>
                              <input
                                type="text"
                                value={item.unitPrice}
                                onChange={(e) => updateField(`items.${index}.unitPrice`, e.target.value)}
                                style={{ ...inputStyle, width: '100%', textAlign: 'right', fontSize: '14px', fontWeight: 500 }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              />
                            </td>
                            <td style={{ padding: '20px 12px', textAlign: 'center', verticalAlign: 'top' }}>
                              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 10px', background: '#e5e7eb', borderRadius: '8px' }}>
                                <input
                                  type="text"
                                  value={item.vatRate}
                                  onChange={(e) => updateField(`items.${index}.vatRate`, e.target.value)}
                                  style={{ ...inputStyle, width: '24px', textAlign: 'center', fontSize: '13px' }}
                                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                />%
                              </div>
                            </td>
                            <td style={{ padding: '20px', textAlign: 'right', verticalAlign: 'top' }}>
                              <input
                                type="text"
                                value={item.total}
                                onChange={(e) => updateField(`items.${index}.total`, e.target.value)}
                                style={{ ...inputStyle, width: '100%', textAlign: 'right', fontSize: '14px', fontWeight: 500 }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>

                  {/* Totals Élargis */}
                  <section style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '50px', marginBottom: '40px' }}>
                    <div>
                      <h3 style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600, marginBottom: '16px' }}>DÉTAILS TVA</h3>
                      <div style={{ background: '#f9fafb', borderRadius: '10px', padding: '16px 20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6b7280' }}>
                          <span>TVA 20% sur 50 000,00 €</span>
                          <span style={{ fontWeight: 500, color: '#374151' }}>10 000,00 €</span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ background: 'linear-gradient(135deg, #fafbfc 0%, #f3f4f6 100%)', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '15px', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ color: '#6b7280', fontWeight: 500 }}>Total HT</span>
                        <div>
                          <input
                            type="text"
                            value={invoiceData.totals.ht}
                            onChange={(e) => updateField('totals.ht', e.target.value)}
                            style={{ ...inputStyle, width: '140px', textAlign: 'right', fontSize: '15px', fontWeight: 600 }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          /> €
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '15px', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ color: '#6b7280', fontWeight: 500 }}>Total TVA</span>
                        <div>
                          <input
                            type="text"
                            value={invoiceData.totals.vat}
                            onChange={(e) => updateField('totals.vat', e.target.value)}
                            style={{ ...inputStyle, width: '140px', textAlign: 'right', fontSize: '15px', fontWeight: 600 }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          /> €
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 6px 0', fontSize: '20px', marginTop: '10px' }}>
                        <span style={{ color: '#1a1a1a', fontWeight: 700 }}>Total TTC</span>
                        <div>
                          <input
                            type="text"
                            value={invoiceData.totals.ttc}
                            onChange={(e) => updateField('totals.ttc', e.target.value)}
                            style={{ ...inputStyle, width: '160px', textAlign: 'right', fontSize: '20px', fontWeight: 700, color: '#DC2626' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          /> €
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Payment Élargi */}
                  <section style={{ background: 'linear-gradient(135deg, #fafbfc 0%, #f3f4f6 100%)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>Informations de paiement</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                      <div>
                        <div style={{ color: '#6b7280', marginBottom: '4px', fontSize: '12px' }}>Mode de paiement</div>
                        <input
                          type="text"
                          value={invoiceData.payment.method}
                          onChange={(e) => updateField('payment.method', e.target.value)}
                          style={{ ...inputStyle, width: '100%', fontSize: '14px', fontWeight: 500 }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                      </div>
                      <div>
                        <div style={{ color: '#6b7280', marginBottom: '4px', fontSize: '12px' }}>Établissement</div>
                        <input
                          type="text"
                          value={invoiceData.payment.bank}
                          onChange={(e) => updateField('payment.bank', e.target.value)}
                          style={{ ...inputStyle, width: '100%', fontSize: '14px', fontWeight: 500 }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                      </div>
                      <div>
                        <div style={{ color: '#6b7280', marginBottom: '4px', fontSize: '12px' }}>IBAN</div>
                        <input
                          type="text"
                          value={invoiceData.payment.iban}
                          onChange={(e) => updateField('payment.iban', e.target.value)}
                          style={{ ...inputStyle, width: '100%', fontSize: '14px', fontWeight: 500 }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                      </div>
                      <div>
                        <div style={{ color: '#6b7280', marginBottom: '4px', fontSize: '12px' }}>BIC</div>
                        <input
                          type="text"
                          value={invoiceData.payment.bic}
                          onChange={(e) => updateField('payment.bic', e.target.value)}
                          style={{ ...inputStyle, width: '100%', fontSize: '14px', fontWeight: 500 }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: '16px', padding: '12px', background: 'white', borderRadius: '8px', fontSize: '12px', color: '#6b7280' }}>
                      <strong>Paiement par chèque :</strong> À l'ordre de OKÉ SERVICES<br />
                      <em>Aucun escompte ne sera accordé en cas de règlement anticipé.</em>
                    </div>
                  </section>
                </div>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}