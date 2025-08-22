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
  Edit3,
  Command
} from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';

interface InvoiceEditorModal4Props {
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

export default function InvoiceEditorModal4({ 
  isOpen, 
  onClose
}: InvoiceEditorModal4Props) {
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
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

  // Raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  // Actions pour la Command Palette
  const commandActions = [
    { id: 'preview', label: 'Aperçu avant envoi', icon: Eye, action: handlePreview, shortcut: '⌘+P' },
    { id: 'print', label: 'Imprimer', icon: Printer, action: handlePrint, shortcut: '⌘+⇧+P' },
    { id: 'download', label: 'Télécharger PDF', icon: Download, action: handleDownload, shortcut: '⌘+D' },
    { id: 'email', label: 'Envoyer par email', icon: Mail, action: handleEmail, shortcut: '⌘+E' },
    { id: 'share', label: 'Partager', icon: Share2, action: handleShare, shortcut: '⌘+⇧+S' },
    { id: 'duplicate', label: 'Dupliquer', icon: Copy, action: handleDuplicate, shortcut: '⌘+⇧+D' },
    { id: 'resend', label: 'Relancer le client', icon: RefreshCw, action: handleResend, shortcut: '⌘+R' },
    { id: 'subscriptions', label: 'Gérer les abonnements', icon: Repeat, action: handleManageSubscriptions },
    { id: 'convert', label: 'Transformer en facture', icon: FileText, action: handleConvertQuote },
    { id: 'save', label: 'Sauvegarder', icon: Save, action: handleSave, shortcut: '⌘+S' },
  ];

  // Fonction pour mettre à jour les données
  const updateField = (path: string, value: string) => {
    const keys = path.split('.');
    setInvoiceData(prev => {
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (keys[i].includes('.')) {
          const subKeys = keys[i].split('.');
          for (const subKey of subKeys) {
            current = current[subKey];
          }
        } else {
          current = current[keys[i]];
        }
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

  // Composant Quick Actions
  const QuickActions = ({ sectionId, actions }: { sectionId: string, actions: Array<{icon: any, action: () => void, label: string}> }) => (
    <AnimatePresence>
      {hoveredSection === sectionId && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.15 }}
          className="absolute top-2 right-2 z-10 flex items-center gap-1"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.15)'
          }}
        >
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded transition-colors"
              title={action.label}
            >
              <action.icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

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
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative m-8 h-[calc(100vh-4rem)] flex flex-col"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* Header Ultra-Minimaliste */}
            <div className="flex-shrink-0 px-8 py-6 border-b border-gray-100/30" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
              backdropFilter: 'blur(20px)'
            }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-[#4C34CE]/10 to-[#FAA016]/10 border border-[#4C34CE]/20">
                    <FileText className="w-5 h-5 text-[#4C34CE]" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Éditeur de facture</h1>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-medium text-gray-600">{invoiceData.number}</span>
                      <div className="h-1 w-1 rounded-full bg-gray-300"></div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                        Brouillon
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Command Palette Trigger */}
                  <GlassButton
                    onClick={() => setShowCommandPalette(true)}
                    className="bg-white/60 text-gray-700 hover:bg-white/80 border border-gray-200/50 shadow-sm"
                  >
                    <Command className="w-4 h-4 mr-2" />
                    Actions
                    <span className="ml-2 text-xs text-gray-400">⌘K</span>
                  </GlassButton>
                  
                  <button
                    onClick={onClose}
                    className="p-2.5 text-gray-400 hover:text-gray-600 transition-colors rounded-xl hover:bg-gray-100/50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Contenu de la facture avec Quick Actions */}
            <div className="flex-1 overflow-y-auto p-8">
              <div style={containerStyle}>
                {/* Header avec Quick Actions */}
                <header 
                  className="relative"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}
                  onMouseEnter={() => setHoveredSection('header')}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <QuickActions 
                    sectionId="header"
                    actions={[
                      { icon: Edit3, action: () => {}, label: 'Éditer en-tête' },
                      { icon: Copy, action: handleDuplicate, label: 'Dupliquer' }
                    ]}
                  />
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <img src="/oke-logo.svg" alt="OKÉ" style={{ height: '48px', width: 'auto' }} />
                      <input
                        type="text"
                        value={invoiceData.issuer.name}
                        onChange={(e) => updateField('issuer.name', e.target.value)}
                        style={{ ...inputStyle, fontSize: '18px', fontWeight: 600 }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        onFocus={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.1)'}
                        onBlur={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 300, marginBottom: '12px' }}>
                      <input
                        type="text"
                        value={invoiceData.title}
                        onChange={(e) => updateField('title', e.target.value)}
                        style={{ ...inputStyle, fontSize: '28px', fontWeight: 300, textAlign: 'right', width: '150px' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                    </h1>
                    
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginBottom: '12px' }}>
                      <span style={{ background: '#FAA016', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '11px' }}>
                        {invoiceData.number}
                      </span>
                      <span style={{ background: '#4C34CE', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '11px' }}>
                        Factur-X
                      </span>
                    </div>
                    
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      <div>Émise le : <strong>{invoiceData.issueDate}</strong></div>
                      <div>Échéance le : <strong>{invoiceData.dueDate}</strong></div>
                    </div>
                  </div>
                </header>

                {/* Parties avec Quick Actions */}
                <section 
                  className="relative"
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '35px' }}
                  onMouseEnter={() => setHoveredSection('parties')}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <QuickActions 
                    sectionId="parties"
                    actions={[
                      { icon: Edit3, action: () => {}, label: 'Éditer parties' },
                      { icon: RefreshCw, action: () => {}, label: 'Actualiser données' }
                    ]}
                  />
                  
                  {/* Émetteur */}
                  <div style={{ padding: '16px', background: '#fafbfc', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 600, marginBottom: '8px' }}>ÉMETTEUR</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
                      <input
                        type="text"
                        value={invoiceData.issuer.name}
                        onChange={(e) => updateField('issuer.name', e.target.value)}
                        style={{ ...inputStyle, fontSize: '15px', fontWeight: 600, width: '100%' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      <input
                        type="text"
                        value={invoiceData.issuer.address}
                        onChange={(e) => updateField('issuer.address', e.target.value)}
                        style={{ ...inputStyle, width: '100%', marginBottom: '2px' }}
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
                        style={{ ...inputStyle, width: '100%', marginBottom: '2px' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                      <br />
                      <strong>SIRET</strong>{' '}
                      <input
                        type="text"
                        value={invoiceData.issuer.siret}
                        onChange={(e) => updateField('issuer.siret', e.target.value)}
                        style={{ ...inputStyle, width: '150px' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                      <br />
                      <strong>TVA</strong>{' '}
                      <input
                        type="text"
                        value={invoiceData.issuer.vat}
                        onChange={(e) => updateField('issuer.vat', e.target.value)}
                        style={{ ...inputStyle, width: '120px' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                    </div>
                  </div>
                  
                  {/* Client */}
                  <div style={{ padding: '16px', background: '#fafbfc', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 600, marginBottom: '8px' }}>CLIENT</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
                      <input
                        type="text"
                        value={invoiceData.client.name}
                        onChange={(e) => updateField('client.name', e.target.value)}
                        style={{ ...inputStyle, fontSize: '15px', fontWeight: 600, width: '100%' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      <input
                        type="text"
                        value={invoiceData.client.address}
                        onChange={(e) => updateField('client.address', e.target.value)}
                        style={{ ...inputStyle, width: '100%', marginBottom: '2px' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                      <br />
                      <input
                        type="text"
                        value={invoiceData.client.address2}
                        onChange={(e) => updateField('client.address2', e.target.value)}
                        style={{ ...inputStyle, width: '100%', marginBottom: '2px' }}
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
                        style={{ ...inputStyle, width: '100%', marginBottom: '2px' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                      <br />
                      <strong>SIRET</strong>{' '}
                      <input
                        type="text"
                        value={invoiceData.client.siret}
                        onChange={(e) => updateField('client.siret', e.target.value)}
                        style={{ ...inputStyle, width: '150px' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                      <br />
                      <strong>TVA</strong>{' '}
                      <input
                        type="text"
                        value={invoiceData.client.vat}
                        onChange={(e) => updateField('client.vat', e.target.value)}
                        style={{ ...inputStyle, width: '120px' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                    </div>
                  </div>
                </section>

                {/* Items Table avec Quick Actions */}
                <section 
                  className="relative"
                  style={{ marginBottom: '30px' }}
                  onMouseEnter={() => setHoveredSection('items')}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <QuickActions 
                    sectionId="items"
                    actions={[
                      { icon: Edit3, action: () => {}, label: 'Ajouter ligne' },
                      { icon: Copy, action: () => {}, label: 'Dupliquer ligne' }
                    ]}
                  />
                  
                  <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                    <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', color: '#6b7280', width: '40%' }}>DESCRIPTION</th>
                        <th style={{ textAlign: 'center', padding: '12px 8px', fontSize: '11px', color: '#6b7280', width: '15%' }}>QUANTITÉ</th>
                        <th style={{ textAlign: 'right', padding: '12px 8px', fontSize: '11px', color: '#6b7280', width: '15%' }}>PRIX HT (€)</th>
                        <th style={{ textAlign: 'center', padding: '12px 8px', fontSize: '11px', color: '#6b7280', width: '10%' }}>TVA</th>
                        <th style={{ textAlign: 'right', padding: '12px 16px', fontSize: '11px', color: '#6b7280', width: '20%' }}>TOTAL HT (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.items.map((item, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                          <td style={{ padding: '16px', verticalAlign: 'top' }}>
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => updateField(`items.${index}.description`, e.target.value)}
                              style={{ ...inputStyle, fontSize: '13px', fontWeight: 500, width: '100%' }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            />
                          </td>
                          <td style={{ padding: '16px 8px', textAlign: 'center', verticalAlign: 'top' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                              <input
                                type="text"
                                value={item.quantity}
                                onChange={(e) => updateField(`items.${index}.quantity`, e.target.value)}
                                style={{ ...inputStyle, width: '40px', textAlign: 'center', fontSize: '13px', fontWeight: 500 }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              />
                              <input
                                type="text"
                                value={item.unit}
                                onChange={(e) => updateField(`items.${index}.unit`, e.target.value)}
                                style={{ ...inputStyle, width: '60px', textAlign: 'center', fontSize: '11px', color: '#6b7280' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              />
                            </div>
                          </td>
                          <td style={{ padding: '16px 8px', textAlign: 'right', verticalAlign: 'top' }}>
                            <input
                              type="text"
                              value={item.unitPrice}
                              onChange={(e) => updateField(`items.${index}.unitPrice`, e.target.value)}
                              style={{ ...inputStyle, width: '100%', textAlign: 'right', fontSize: '13px', fontWeight: 500 }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            />
                          </td>
                          <td style={{ padding: '16px 8px', textAlign: 'center', verticalAlign: 'top' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 8px', background: '#e5e7eb', borderRadius: '6px' }}>
                              <input
                                type="text"
                                value={item.vatRate}
                                onChange={(e) => updateField(`items.${index}.vatRate`, e.target.value)}
                                style={{ ...inputStyle, width: '20px', textAlign: 'center', fontSize: '12px' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              />%
                            </div>
                          </td>
                          <td style={{ padding: '16px', textAlign: 'right', verticalAlign: 'top' }}>
                            <input
                              type="text"
                              value={item.total}
                              onChange={(e) => updateField(`items.${index}.total`, e.target.value)}
                              style={{ ...inputStyle, width: '100%', textAlign: 'right', fontSize: '13px', fontWeight: 500 }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>

                {/* Totals avec Quick Actions */}
                <section 
                  className="relative"
                  style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '40px', marginBottom: '35px' }}
                  onMouseEnter={() => setHoveredSection('totals')}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <QuickActions 
                    sectionId="totals"
                    actions={[
                      { icon: Edit3, action: () => {}, label: 'Recalculer' },
                      { icon: Eye, action: handlePreview, label: 'Aperçu' }
                    ]}
                  />
                  
                  <div>
                    <h3 style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, marginBottom: '12px' }}>DÉTAILS TVA</h3>
                    <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '12px 16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280' }}>
                        <span>TVA 20% sur 50 000,00 €</span>
                        <span style={{ fontWeight: 500, color: '#374151' }}>10 000,00 €</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ background: 'linear-gradient(135deg, #fafbfc 0%, #f3f4f6 100%)', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px', borderBottom: '1px solid #e5e7eb' }}>
                      <span style={{ color: '#6b7280', fontWeight: 500 }}>Total HT</span>
                      <div>
                        <input
                          type="text"
                          value={invoiceData.totals.ht}
                          onChange={(e) => updateField('totals.ht', e.target.value)}
                          style={{ ...inputStyle, width: '120px', textAlign: 'right', fontSize: '14px', fontWeight: 600 }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        /> €
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px', borderBottom: '1px solid #e5e7eb' }}>
                      <span style={{ color: '#6b7280', fontWeight: 500 }}>Total TVA</span>
                      <div>
                        <input
                          type="text"
                          value={invoiceData.totals.vat}
                          onChange={(e) => updateField('totals.vat', e.target.value)}
                          style={{ ...inputStyle, width: '120px', textAlign: 'right', fontSize: '14px', fontWeight: 600 }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        /> €
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 4px 0', fontSize: '18px', marginTop: '8px' }}>
                      <span style={{ color: '#1a1a1a', fontWeight: 700 }}>Total TTC</span>
                      <div>
                        <input
                          type="text"
                          value={invoiceData.totals.ttc}
                          onChange={(e) => updateField('totals.ttc', e.target.value)}
                          style={{ ...inputStyle, width: '140px', textAlign: 'right', fontSize: '18px', fontWeight: 700, color: '#DC2626' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        /> €
                      </div>
                    </div>
                  </div>
                </section>

                {/* Payment avec Quick Actions */}
                <section 
                  className="relative"
                  style={{ background: 'linear-gradient(135deg, #fafbfc 0%, #f3f4f6 100%)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}
                  onMouseEnter={() => setHoveredSection('payment')}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <QuickActions 
                    sectionId="payment"
                    actions={[
                      { icon: Edit3, action: () => {}, label: 'Modifier paiement' },
                      { icon: Mail, action: handleEmail, label: 'Envoyer' }
                    ]}
                  />
                  
                  <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Informations de paiement</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    <div>
                      <div style={{ color: '#6b7280', marginBottom: '3px', fontSize: '11px' }}>Mode de paiement</div>
                      <input
                        type="text"
                        value={invoiceData.payment.method}
                        onChange={(e) => updateField('payment.method', e.target.value)}
                        style={{ ...inputStyle, width: '100%', fontSize: '13px', fontWeight: 500 }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                    </div>
                    <div>
                      <div style={{ color: '#6b7280', marginBottom: '3px', fontSize: '11px' }}>Établissement</div>
                      <input
                        type="text"
                        value={invoiceData.payment.bank}
                        onChange={(e) => updateField('payment.bank', e.target.value)}
                        style={{ ...inputStyle, width: '100%', fontSize: '13px', fontWeight: 500 }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                    </div>
                    <div>
                      <div style={{ color: '#6b7280', marginBottom: '3px', fontSize: '11px' }}>IBAN</div>
                      <input
                        type="text"
                        value={invoiceData.payment.iban}
                        onChange={(e) => updateField('payment.iban', e.target.value)}
                        style={{ ...inputStyle, width: '100%', fontSize: '13px', fontWeight: 500 }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                    </div>
                    <div>
                      <div style={{ color: '#6b7280', marginBottom: '3px', fontSize: '11px' }}>BIC</div>
                      <input
                        type="text"
                        value={invoiceData.payment.bic}
                        onChange={(e) => updateField('payment.bic', e.target.value)}
                        style={{ ...inputStyle, width: '100%', fontSize: '13px', fontWeight: 500 }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: '12px', padding: '10px', background: 'white', borderRadius: '6px', fontSize: '11px', color: '#6b7280' }}>
                    <strong>Paiement par chèque :</strong> À l'ordre de OKÉ SERVICES<br />
                    <em>Aucun escompte ne sera accordé en cas de règlement anticipé.</em>
                  </div>
                </section>

                {/* Footer */}
                <footer style={{ position: 'absolute', bottom: '0.8cm', left: '1.2cm', right: '1.2cm', paddingTop: '12px', borderTop: '1px solid #f0f0f0', fontSize: '10px', color: '#9ca3af', textAlign: 'center' }}>
                  <div>En cas de retard de paiement, pénalités appliquées au taux légal et indemnité forfaitaire de 80 € pour frais de recouvrement.</div>
                </footer>
              </div>

              {/* Bouton Sauvegarder flottant */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10"
              >
                <GlassButton 
                  onClick={handleSave} 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder les modifications
                </GlassButton>
              </motion.div>
            </div>
          </motion.div>

          {/* COMMAND PALETTE */}
          <AnimatePresence>
            {showCommandPalette && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/20 flex items-start justify-center pt-32 z-10"
                onClick={() => setShowCommandPalette(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-lg mx-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 border-b border-gray-100/50">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Command className="w-4 h-4" />
                      <span>Rechercher une action...</span>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {commandActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => {
                          action.action();
                          setShowCommandPalette(false);
                        }}
                        disabled={action.id === 'resend' && isProcessing}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50/50 transition-colors disabled:opacity-50"
                      >
                        <action.icon className={`w-4 h-4 text-gray-600 ${action.id === 'resend' && isProcessing ? 'animate-spin' : ''}`} />
                        <span className="flex-1 text-sm text-gray-900">{action.label}</span>
                        {action.shortcut && (
                          <span className="text-xs text-gray-400 font-mono">{action.shortcut}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}