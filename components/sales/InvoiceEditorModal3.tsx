'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

// Constantes pour les sélecteurs
const VAT_RATES = [
  { value: '0', label: '0%' },
  { value: '5.5', label: '5,5%' },
  { value: '10', label: '10%' },
  { value: '20', label: '20%' },
];

const UNITS = [
  { value: 'u', label: 'u' },
  { value: 'pce', label: 'pce' },
  { value: 'h', label: 'h' },
  { value: 'j', label: 'j' },
  { value: 'kg', label: 'kg' },
  { value: 'm', label: 'm' },
  { value: 'm²', label: 'm²' },
  { value: 'ml', label: 'ml' },
  { value: 'l', label: 'l' },
  { value: 'forfait', label: 'forfait' },
];
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Save, 
  Download, 
  Mail, 
  Printer,
  RefreshCw,
  Repeat,
  Share2,
  Copy,
  Eye,
  Settings,
  MoreHorizontal,
  Edit3,
  Send,
  Archive,
  CheckCircle,
  Clock,
  Bell,
  Upload,
  ChevronDown,
  ChevronUp,
  Menu,
  Plus,
  Trash2
} from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';

interface InvoiceEditorModal3Props {
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
    name: 'LOGEFI SERVICES',
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
  items: [
    {
      name: 'Prestations 2024',
      description: 'selon nos accords',
      quantity: '1',
      unit: 'forfait',
      unitPrice: '50 000,00',
      vatRate: '20',
      total: '50 000,00'
    },
    {
      name: 'Développement module comptabilité',
      description: 'Interface utilisateur et logique métier',
      quantity: '120',
      unit: 'heures',
      unitPrice: '85,00',
      vatRate: '20',
      total: '10 200,00'
    },
    {
      name: 'Développement module facturation',
      description: 'Gestion complète des factures clients',
      quantity: '80',
      unit: 'heures',
      unitPrice: '85,00',
      vatRate: '20',
      total: '6 800,00'
    },
    {
      name: 'Développement module banque',
      description: '',
      quantity: '60',
      unit: 'heures',
      unitPrice: '85,00',
      vatRate: '20',
      total: '5 100,00'
    },
    {
      description: 'Intégration API bancaire',
      quantity: '40',
      unit: 'heures',
      unitPrice: '95,00',
      vatRate: '20',
      total: '3 800,00'
    },
    {
      description: 'Tests et débogage',
      quantity: '25',
      unit: 'heures',
      unitPrice: '75,00',
      vatRate: '20',
      total: '1 875,00'
    },
    {
      description: 'Formation utilisateurs',
      quantity: '16',
      unit: 'heures',
      unitPrice: '90,00',
      vatRate: '20',
      total: '1 440,00'
    },
    {
      description: 'Documentation technique',
      quantity: '12',
      unit: 'heures',
      unitPrice: '70,00',
      vatRate: '20',
      total: '840,00'
    },
    {
      description: 'Support post-livraison (3 mois)',
      quantity: '1',
      unit: 'forfait',
      unitPrice: '2 500,00',
      vatRate: '20',
      total: '2 500,00'
    },
    {
      description: 'Maintenance préventive annuelle',
      quantity: '1',
      unit: 'forfait',
      unitPrice: '4 800,00',
      vatRate: '20',
      total: '4 800,00'
    },
    {
      description: 'Licence logiciel (1 an)',
      quantity: '1',
      unit: 'forfait',
      unitPrice: '1 200,00',
      vatRate: '20',
      total: '1 200,00'
    },
    {
      description: 'Hébergement cloud (12 mois)',
      quantity: '12',
      unit: 'mois',
      unitPrice: '180,00',
      vatRate: '20',
      total: '2 160,00'
    },
    {
      description: 'Sauvegarde automatique',
      quantity: '12',
      unit: 'mois',
      unitPrice: '45,00',
      vatRate: '20',
      total: '540,00'
    },
    {
      description: 'Audit sécurité',
      quantity: '1',
      unit: 'forfait',
      unitPrice: '1 500,00',
      vatRate: '20',
      total: '1 500,00'
    },
    {
      description: 'Optimisation performance',
      quantity: '20',
      unit: 'heures',
      unitPrice: '100,00',
      vatRate: '20',
      total: '2 000,00'
    }
  ],
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
  className?: string;
  disabled?: boolean;
  processing?: boolean;
}

// Composant bouton avec tooltip adaptatif
const TooltipButton: React.FC<TooltipButtonProps> = ({ 
  onClick, 
  icon: Icon, 
  tooltip, 
  className = 'bg-transparent text-gray-600 hover:bg-gray-100/50',
  disabled = false,
  processing = false
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInteraction = () => {
    if (isMobile) {
      // Sur mobile, afficher le tooltip au tap pendant 2s
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={(e) => {
          onClick();
          handleInteraction();
        }}
        disabled={disabled}
        onMouseEnter={() => !isMobile && setShowTooltip(true)}
        onMouseLeave={() => !isMobile && setShowTooltip(false)}
        onTouchStart={handleInteraction}
        whileHover={{ scale: isMobile ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`p-2 rounded-lg transition-all duration-200 touch-manipulation ${className} ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm'
        } ${isMobile ? 'min-h-[44px] min-w-[44px] flex items-center justify-center' : ''}`}
      >
        <Icon className={`w-4 h-4 ${processing ? 'animate-spin' : ''}`} />
      </motion.button>
      
      {/* Tooltip adaptatif */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 10 : -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isMobile ? 10 : -10, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${isMobile ? 'top-full mt-2' : 'bottom-full mb-2'} left-1/2 transform -translate-x-1/2 z-50`}
          >
            <div 
              className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              {tooltip}
              <div className={`absolute ${isMobile ? 'bottom-full' : 'top-full'} left-1/2 transform -translate-x-1/2 w-0 h-0 ${
                isMobile ? 'border-b-4 border-b-gray-900' : 'border-t-4 border-t-gray-900'
              } border-l-2 border-l-transparent border-r-2 border-r-transparent`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function InvoiceEditorModal3({ 
  isOpen, 
  onClose
}: InvoiceEditorModal3Props) {
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [activeGroup, setActiveGroup] = useState<string>('edition');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMobileActions, setShowMobileActions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Constantes pour gestion multipages
  const ITEMS_PER_PAGE = 8; // Nombre d'articles par page pour PDF
  const TOTAL_PAGES = Math.ceil(invoiceData.items.length / ITEMS_PER_PAGE);
  
  // Fonction pour générer les indicateurs de page
  const getPageBreakIndicators = () => {
    const indicators = [];
    for (let page = 1; page <= TOTAL_PAGES; page++) {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, invoiceData.items.length - 1);
      indicators.push({
        page,
        startIndex,
        endIndex,
        items: invoiceData.items.slice(startIndex, startIndex + ITEMS_PER_PAGE)
      });
    }
    return indicators;
  };

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Actions
  const handleSave = () => {
    console.log('Sauvegarde de la facture:', invoiceData);
    onClose();
  };

  const handleValidate = () => {
    alert('✅ Facture validée avec succès !');
    console.log('Validation de la facture');
  };
  
  const handleDownload = () => {
    alert('📥 Téléchargement du PDF en cours...');
    console.log('Téléchargement PDF');
  };
  
  const handleEmail = () => {
    alert('📧 Email envoyé avec succès !');
    console.log('Envoi par email');
  };
  
  const handlePrint = () => {
    alert('🖨️ Impression en cours...');
    window.print();
  };
  const handleResend = () => {
    setIsProcessing(true);
    setTimeout(() => {
      console.log('Facture relancée');
      setIsProcessing(false);
    }, 2000);
  };
  const handleManageSubscriptions = () => console.log('Gestion des abonnements');
  const handleImportLines = () => {
    // Créer un input file caché pour l'import
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.xls';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Import de lignes depuis:', file.name);
        // Ici Tony implémentera le parsing du fichier
        // Pour le mock, on peut ajouter une ligne d'exemple
        setInvoiceData(prev => ({
          ...prev,
          items: [
            ...prev.items,
            {
              description: 'Ligne importée depuis ' + file.name,
              quantity: '2',
              unit: 'unité',
              unitPrice: '100,00',
              vatRate: '20',
              total: '200,00'
            }
          ]
        }));
      }
    };
    input.click();
  };
  const handleConvertQuote = () => console.log('Transformer le devis en facture');
  const handleShare = () => {
    alert('🔗 Lien de partage copié dans le presse-papier !');
    console.log('Partage de la facture');
  };
  
  const handleDuplicate = () => {
    alert('📋 Facture dupliquée avec succès !');
    console.log('Dupliquer la facture');
  };
  
  const handlePreview = () => {
    alert('👀 Ouverture de l\'aperçu...');
    console.log('Aperçu avant envoi');
  };

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

  // Fonctions de gestion des articles
  const addItem = (position = -1) => {
    const newItem = {
      name: '',
      description: '',
      quantity: '1',
      unit: 'u',
      unitPrice: '0',
      vatRate: '20',
      total: '0'
    };

    setInvoiceData(prev => {
      const items = [...prev.items];
      if (position === -1) {
        items.push(newItem);
      } else {
        items.splice(position + 1, 0, newItem);
      }
      return { ...prev, items };
    });
  };

  const removeItem = (index: number) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  // Styles CSS optimisés et responsives
  const containerStyle = useMemo(() => ({
    width: isMobile ? '100%' : '21cm',
    minHeight: isMobile ? 'auto' : '29.7cm',
    margin: '0 auto',
    padding: isMobile ? '1rem' : '1cm 1.2cm',
    background: 'white',
    position: 'relative' as const,
    boxSizing: 'border-box' as const,
    boxShadow: isMobile ? '0 4px 16px rgba(0,0,0,0.08)' : '0 8px 32px rgba(0,0,0,0.12)',
    borderRadius: isMobile ? '12px' : '16px',
    border: '1px solid rgba(0,0,0,0.05)',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: isMobile ? '12px' : '13px',
    lineHeight: '1.5',
    color: '#1a1a1a'
  }), [isMobile]);

  const inputStyle = {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: '2px 0',
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
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 overflow-auto"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          {/* Modal Container */}
          <motion.div
            initial={{ scale: isMobile ? 1 : 0.95, opacity: 0, y: isMobile ? '100%' : 0 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: isMobile ? 1 : 0.95, opacity: 0, y: isMobile ? '100%' : 0 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative flex flex-col w-full ${
              isMobile 
                ? 'h-full max-h-screen rounded-none' 
                : 'max-w-7xl max-h-[calc(100vh-2rem)] rounded-3xl'
            }`}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderRadius: isMobile ? '0' : '24px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* HEADER RESPONSIVE */}
            <div className={`flex-shrink-0 border-b border-gray-100/30 ${
              isMobile ? 'px-4 py-3 rounded-none' : 'px-6 py-3 rounded-t-3xl'
            }`} style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
              backdropFilter: 'blur(20px)'
            }}>
              <div className="flex items-center justify-between">
                {/* Informations essentielles */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200 flex-shrink-0">
                      Brouillon
                    </span>
                  </div>
                </div>

                {/* Actions responsives */}
                {isMobile ? (
                  /* Version mobile avec menu déroulant */
                  <div className="flex items-center gap-2">
                    {/* Actions principales en premier sur mobile */}
                    <motion.button 
                      onClick={handleSave}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md px-3 py-2 rounded-lg flex items-center gap-1.5 text-sm font-semibold touch-manipulation"
                    >
                      <Save className="w-4 h-4" />
                      <span className="hidden xs:inline">Sauver</span>
                    </motion.button>

                    <motion.button 
                      onClick={handleValidate}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md px-3 py-2 rounded-lg flex items-center gap-1.5 text-sm font-semibold touch-manipulation"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span className="hidden xs:inline">Valider</span>
                    </motion.button>
                    
                    {/* Menu actions secondaires */}
                    <div className="relative" style={{ overflow: 'visible' }}>
                      <motion.button
                        onClick={() => setShowMobileActions(!showMobileActions)}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100/70 rounded-lg border border-gray-200 touch-manipulation"
                      >
                        <Menu className="w-4 h-4" />
                      </motion.button>
                      
                      {/* Panneau d'actions mobile via portail */}
                      {showMobileActions && typeof window !== 'undefined' && createPortal(
                        <AnimatePresence>
                          <>
                            {/* Overlay invisible pour fermer au clic extérieur */}
                            <div
                              className="fixed inset-0"
                              style={{ zIndex: 999998 }}
                              onClick={() => setShowMobileActions(false)}
                            />
                            
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              className="w-64 bg-white rounded-xl border border-gray-200 shadow-2xl"
                              style={{
                                position: 'fixed',
                                top: '120px',
                                right: '16px',
                                zIndex: 999999,
                                backdropFilter: 'blur(20px)',
                                background: 'rgba(255, 255, 255, 0.98)'
                              }}
                            >
                              <div className="p-3 space-y-3">
                                {/* Groupe Export */}
                                <div className="space-y-2">
                                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Export</h4>
                                  <div className="flex gap-2">
                                    <TooltipButton onClick={handleDownload} icon={Download} tooltip="Télécharger PDF" className="bg-gradient-to-r from-[#FAA016] to-[#FAA016]/90 text-white hover:shadow-md" />
                                    <TooltipButton onClick={handlePrint} icon={Printer} tooltip="Imprimer" className="bg-gray-100 text-gray-600 hover:bg-gray-200" />
                                  </div>
                                </div>
                                
                                {/* Groupe Communication */}
                                <div className="space-y-2">
                                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Communication</h4>
                                  <div className="flex gap-2">
                                    <TooltipButton onClick={handleEmail} icon={Mail} tooltip="Envoyer par email" className="bg-gradient-to-r from-[#4C34CE] to-[#4C34CE]/90 text-white hover:shadow-md" />
                                    <TooltipButton onClick={handleShare} icon={Share2} tooltip="Partager" className="bg-gray-100 text-gray-600 hover:bg-gray-200" />
                                  </div>
                                </div>
                                
                                {/* Groupe Edition */}
                                <div className="space-y-2">
                                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Edition</h4>
                                  <div className="flex gap-2">
                                    <TooltipButton onClick={handlePreview} icon={Eye} tooltip="Aperçu" className="bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:shadow-md" />
                                    <TooltipButton onClick={handleDuplicate} icon={Copy} tooltip="Dupliquer" className="bg-gray-100 text-gray-600 hover:bg-gray-200" />
                                    <TooltipButton onClick={handleImportLines} icon={Upload} tooltip="Importer lignes" className="bg-gray-100 text-gray-600 hover:bg-gray-200" />
                                  </div>
                                </div>
                                
                                {/* Groupe Gestion */}
                                <div className="space-y-2">
                                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Gestion</h4>
                                  <div className="flex gap-2">
                                    <TooltipButton onClick={handleResend} icon={Bell} tooltip="Relancer" disabled={isProcessing} processing={isProcessing} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-md" />
                                    <TooltipButton onClick={handleManageSubscriptions} icon={Clock} tooltip="Récurrence" className="bg-gray-100 text-gray-600 hover:bg-gray-200" />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </>
                        </AnimatePresence>,
                        document.body
                      )}
                    </div>
                    
                    <button
                      onClick={onClose}
                      className="p-2.5 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100/70 border border-gray-200 touch-manipulation"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  /* Version desktop */
                  <div className="flex items-center gap-2 xl:gap-4 overflow-x-auto">
                    {/* Groupes d'actions avec labels */}
                    <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
                      {/* Groupe Édition */}
                      <div className="flex items-center gap-1 px-3 py-2 bg-teal-50/80 rounded-xl border border-teal-300/60 relative">
                        {/* Barre de sélection personnalisée */}
                        <div 
                          className="absolute -top-1 left-1/2 transform -translate-x-1/2 rounded-full"
                          style={{ 
                            width: '30px',
                            height: '3px',
                            backgroundColor: '#4C34CE'
                          }}
                        />
                        <span className="text-xs font-medium text-teal-800 mr-2">Édition</span>
                        <TooltipButton onClick={handlePreview} icon={Eye} tooltip="Aperçu avant envoi" className="bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:shadow-md p-1.5" />
                        <TooltipButton onClick={handleDuplicate} icon={Copy} tooltip="Dupliquer la facture" className="bg-transparent text-teal-700 hover:bg-teal-200/50 p-1.5" />
                        <TooltipButton onClick={handleImportLines} icon={Upload} tooltip="Importer lignes (CSV/Excel)" className="bg-transparent text-teal-700 hover:bg-teal-200/50 p-1.5" />
                      </div>
                      
                      {/* Groupe Export */}
                      <div className="flex items-center gap-1 px-3 py-2 bg-orange-50/80 rounded-xl border border-orange-200/60">
                        <span className="text-xs font-medium text-orange-700 mr-2">Export</span>
                        <TooltipButton onClick={handleDownload} icon={Download} tooltip="Télécharger PDF" className="bg-gradient-to-r from-[#FAA016] to-[#FAA016]/90 text-white hover:shadow-md p-1.5" />
                        <TooltipButton onClick={handlePrint} icon={Printer} tooltip="Imprimer" className="bg-transparent text-orange-600 hover:bg-orange-200/50 p-1.5" />
                      </div>
                      
                      {/* Groupe Communication */}
                      <div className="flex items-center gap-1 px-3 py-2 bg-purple-50/80 rounded-xl border border-purple-200/60">
                        <span className="text-xs font-medium text-purple-700 mr-2">Communication</span>
                        <TooltipButton onClick={handleEmail} icon={Mail} tooltip="Envoyer par email" className="bg-gradient-to-r from-[#4C34CE] to-[#4C34CE]/90 text-white hover:shadow-md p-1.5" />
                        <TooltipButton onClick={handleShare} icon={Share2} tooltip="Partager" className="bg-transparent text-purple-600 hover:bg-purple-200/50 p-1.5" />
                      </div>
                      
                      {/* Groupe Gestion */}
                      <div className="flex items-center gap-1 px-3 py-2 bg-blue-50/80 rounded-xl border border-blue-200/60">
                        <span className="text-xs font-medium text-blue-700 mr-2">Gestion</span>
                        <TooltipButton onClick={handleResend} icon={Bell} tooltip="Relancer le client" disabled={isProcessing} processing={isProcessing} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-md p-1.5" />
                        <TooltipButton onClick={handleManageSubscriptions} icon={Clock} tooltip="Gérer la récurrence" className="bg-transparent text-blue-600 hover:bg-blue-200/50 p-1.5" />
                      </div>
                    </div>
                    
                    {/* Actions compactes pour tablette */}
                    <div className="lg:hidden flex items-center gap-2">
                      <TooltipButton onClick={handleDownload} icon={Download} tooltip="Télécharger PDF" className="bg-gradient-to-r from-[#FAA016] to-[#FAA016]/90 text-white hover:shadow-md" />
                      <TooltipButton onClick={handleEmail} icon={Mail} tooltip="Envoyer par email" className="bg-gradient-to-r from-[#4C34CE] to-[#4C34CE]/90 text-white hover:shadow-md" />
                      <TooltipButton onClick={handlePreview} icon={Eye} tooltip="Aperçu" className="bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:shadow-md" />
                      <TooltipButton onClick={handleResend} icon={Bell} tooltip="Relancer" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-md" />
                    </div>
                    
                    <div className="h-8 w-px bg-gray-300 mx-1 xl:mx-2 flex-shrink-0"></div>
                    
                    {/* Actions principales prominentes */}
                    <div className="flex items-center gap-2 xl:gap-3 flex-shrink-0">
                      <motion.button 
                        onClick={handleSave}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200 px-3 xl:px-5 py-2 xl:py-2.5 rounded-xl flex items-center gap-1 xl:gap-2 text-sm font-semibold border border-blue-400/50"
                      >
                        <Save className="w-4 h-4" />
                        Sauvegarder
                      </motion.button>

                      <motion.button 
                        onClick={handleValidate}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md hover:shadow-lg transition-all duration-200 px-3 xl:px-5 py-2 xl:py-2.5 rounded-xl flex items-center gap-1 xl:gap-2 text-sm font-semibold border border-emerald-400/50"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Valider
                      </motion.button>
                      
                      <button
                        onClick={onClose}
                        className="p-2.5 text-gray-500 hover:text-gray-700 transition-colors rounded-xl hover:bg-gray-100/70 border border-gray-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>


            {/* Contenu de la facture */}
            <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-4' : 'p-8'}`}>
              <div style={containerStyle}>
                {/* Header */}
                <header style={{ 
                  display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: 'space-between', 
                  alignItems: isMobile ? 'stretch' : 'flex-start', 
                  gap: isMobile ? '20px' : '0',
                  marginBottom: isMobile ? '20px' : '30px' 
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <img src="/documents/logos%20entreprises/Logo%20Logefi%20Services%202.png" alt="LOGEFI SERVICES" style={{ height: '48px', width: 'auto', marginTop: '6px' }} />
                    </div>
                  </div>
                  
                  <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                    <h1 style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: 300, marginBottom: '12px' }}>
                      <input
                        type="text"
                        value={invoiceData.title}
                        onChange={(e) => updateField('title', e.target.value)}
                        style={{ 
                          ...inputStyle, 
                          fontSize: isMobile ? '24px' : '28px', 
                          fontWeight: 300, 
                          textAlign: isMobile ? 'left' : 'right', 
                          width: isMobile ? '100%' : '150px'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                    </h1>
                    
                    <div style={{ 
                      display: 'flex', 
                      gap: '8px', 
                      justifyContent: isMobile ? 'flex-start' : 'flex-end', 
                      marginBottom: '12px',
                      flexWrap: 'wrap'
                    }}>
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

                {/* Parties */}
                <section style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                  gap: isMobile ? '20px' : '40px', 
                  marginBottom: isMobile ? '25px' : '35px', 
                  alignItems: 'start' 
                }}>
                  {/* Émetteur */}
                  <div style={{ padding: '20px', background: '#fafbfc', borderRadius: '12px', border: '1px solid #e5e7eb', minHeight: '180px' }}>
                    <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px', marginLeft: '0' }}>ÉMETTEUR</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>
                      <input
                        type="text"
                        value={invoiceData.issuer.name}
                        onChange={(e) => updateField('issuer.name', e.target.value)}
                        style={{ ...inputStyle, fontSize: '15px', fontWeight: 600, width: '100%' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.6' }}>
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
                      <div style={{ marginTop: '8px' }}>
                        <input
                          type="text"
                          value={`SIRET ${invoiceData.issuer.siret}`}
                          onChange={(e) => updateField('issuer.siret', e.target.value.replace('SIRET ', ''))}
                          style={{ ...inputStyle, width: '100%', marginBottom: '2px' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                        <input
                          type="text"
                          value={`TVA ${invoiceData.issuer.vat}`}
                          onChange={(e) => updateField('issuer.vat', e.target.value.replace('TVA ', ''))}
                          style={{ ...inputStyle, width: '100%', marginBottom: '2px' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Client */}
                  <div style={{ padding: '20px', background: '#fafbfc', borderRadius: '12px', border: '1px solid #e5e7eb', minHeight: '180px' }}>
                    <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px', marginLeft: '0' }}>CLIENT</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>
                      <input
                        type="text"
                        value={invoiceData.client.name}
                        onChange={(e) => updateField('client.name', e.target.value)}
                        style={{ ...inputStyle, fontSize: '15px', fontWeight: 600, width: '100%' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      />
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.6' }}>
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
                      <div style={{ marginTop: '8px' }}>
                        <input
                          type="text"
                          value={`SIRET ${invoiceData.client.siret}`}
                          onChange={(e) => updateField('client.siret', e.target.value.replace('SIRET ', ''))}
                          style={{ ...inputStyle, width: '100%', marginBottom: '2px' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                        <input
                          type="text"
                          value={`TVA ${invoiceData.client.vat}`}
                          onChange={(e) => updateField('client.vat', e.target.value.replace('TVA ', ''))}
                          style={{ ...inputStyle, width: '100%', marginBottom: '2px' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Items - Responsive Table/Cards */}
                <section style={{ marginBottom: isMobile ? '20px' : '30px' }}>
                  {isMobile ? (
                    /* Version mobile - Cards */
                    <div>
                      <h3 style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px' }}>PRESTATIONS</h3>
                      {invoiceData.items.map((item, index) => {
                        const isPageBreak = (index + 1) % ITEMS_PER_PAGE === 0 && index < invoiceData.items.length - 1;
                        const currentPage = Math.floor(index / ITEMS_PER_PAGE) + 1;
                        return (
                          <React.Fragment key={index}>
                            {/* Article normal */}
                        <div key={index} style={{ 
                          background: 'white', 
                          borderRadius: '12px', 
                          padding: '16px', 
                          marginBottom: '12px',
                          border: '1px solid #e5e7eb',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}>
                          <div style={{ marginBottom: '12px' }}>
                            <label style={{ fontSize: '10px', color: '#6b7280', fontWeight: 600, letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>ARTICLE</label>
                            {/* Nom de l'article */}
                            <input
                              type="text"
                              value={item.name || item.description}
                              onChange={(e) => updateField(`items.${index}.${item.name ? 'name' : 'description'}`, e.target.value)}
                              style={{ ...inputStyle, fontSize: '13px', fontWeight: 600, width: '100%', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px', marginBottom: '6px' }}
                              placeholder="Nom de l'article"
                              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            />
                            {/* Descriptif avec unité entre parenthèses */}
                            <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                              <input
                                type="text"
                                value={item.description && item.name ? item.description : ''}
                                onChange={(e) => updateField(`items.${index}.description`, e.target.value)}
                                style={{ ...inputStyle, fontSize: '11px', color: '#6b7280', flex: 1, padding: '6px', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                                placeholder="Descriptif optionnel"
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              />
                              <select
                                value={item.unit}
                                onChange={(e) => updateField(`items.${index}.unit`, e.target.value)}
                                style={{ ...inputStyle, width: '55px', fontSize: '11px', color: '#6b7280', textAlign: 'center', padding: '4px', border: '1px solid #e5e7eb', borderRadius: '4px', marginLeft: '4px', cursor: 'pointer', appearance: 'none' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              >
                                {UNITS.map(unit => (
                                  <option key={unit.value} value={unit.value}>
                                    {unit.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                              <label style={{ fontSize: '10px', color: '#6b7280', fontWeight: 600, letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>QUANTITÉ</label>
                              <input
                                type="text"
                                value={item.quantity}
                                onChange={(e) => updateField(`items.${index}.quantity`, e.target.value)}
                                style={{ ...inputStyle, width: '80px', textAlign: 'center', fontSize: '13px', fontWeight: 500, padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              />
                            </div>
                            
                            <div>
                              <label style={{ fontSize: '10px', color: '#6b7280', fontWeight: 600, letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>TVA</label>
                              <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                padding: '2px 6px', 
                                background: '#f3f4f6',
                                borderRadius: '4px', 
                                minWidth: '50px',
                                border: '1px solid #e5e7eb'
                              }}>
                                <select
                                  value={item.vatRate}
                                  onChange={(e) => updateField(`items.${index}.vatRate`, e.target.value)}
                                  style={{ 
                                    ...inputStyle, 
                                    width: '42px', 
                                    textAlign: 'center', 
                                    fontSize: '11px', 
                                    fontWeight: '500',
                                    color: '#6b7280',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    appearance: 'none'
                                  }}
                                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                  {VAT_RATES.map(rate => (
                                    <option key={rate.value} value={rate.value}>
                                      {rate.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                              <label style={{ fontSize: '10px', color: '#6b7280', fontWeight: 600, letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>PRIX HT (€)</label>
                              <input
                                type="text"
                                value={item.unitPrice}
                                onChange={(e) => updateField(`items.${index}.unitPrice`, e.target.value)}
                                style={{ ...inputStyle, width: '100%', textAlign: 'right', fontSize: '13px', fontWeight: 500, padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              />
                            </div>
                            
                            <div>
                              <label style={{ fontSize: '10px', color: '#6b7280', fontWeight: 600, letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>TOTAL HT (€)</label>
                              <input
                                type="text"
                                value={item.total}
                                onChange={(e) => updateField(`items.${index}.total`, e.target.value)}
                                style={{ ...inputStyle, width: '100%', textAlign: 'right', fontSize: '13px', fontWeight: 600, padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px', background: '#f9fafb' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Indicateur de saut de page */}
                        {isPageBreak && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '20px 0',
                            position: 'relative'
                          }}>
                            <div style={{
                              position: 'absolute',
                              top: '50%',
                              left: 0,
                              right: 0,
                              height: '1px',
                              background: 'linear-gradient(to right, transparent, #e5e7eb 20%, #e5e7eb 80%, transparent)',
                              transform: 'translateY(-50%)'
                            }} />
                            <div style={{
                              background: 'white',
                              padding: '8px 16px',
                              borderRadius: '20px',
                              border: '1px solid #e5e7eb',
                              fontSize: '11px',
                              fontWeight: 600,
                              color: '#6b7280',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              position: 'relative',
                              zIndex: 1
                            }}>
                              <div style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: '#4C34CE'
                              }} />
                              PAGE {currentPage + 1}
                              <div style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: '#4C34CE'
                              }} />
                            </div>
                          </div>
                        )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  ) : (
                    /* Version desktop - Table */
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
                        {invoiceData.items.map((item, index) => {
                          const isPageBreak = (index + 1) % ITEMS_PER_PAGE === 0 && index < invoiceData.items.length - 1;
                          const currentPage = Math.floor(index / ITEMS_PER_PAGE) + 1;
                          return (
                            <React.Fragment key={index}>
                              {/* Ligne d'article normal */}
                          {/* Ligne principale avec nom de l'article */}
                          <tr key={`${index}-main`} style={{ borderBottom: (item.description && item.name) ? 'none' : '1px solid #f3f4f6' }}>
                            <td style={{ padding: '16px', verticalAlign: 'top' }}>
                              <input
                                type="text"
                                value={item.name || item.description}
                                onChange={(e) => updateField(`items.${index}.${item.name ? 'name' : 'description'}`, e.target.value)}
                                style={{ ...inputStyle, fontSize: '13px', fontWeight: 600, width: '100%' }}
                                placeholder="Nom de l'article"
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              />
                            </td>
                            <td style={{ padding: '16px 8px', textAlign: 'center', verticalAlign: 'top' }}>
                              <input
                                type="text"
                                value={item.quantity}
                                onChange={(e) => updateField(`items.${index}.quantity`, e.target.value)}
                                style={{ ...inputStyle, width: '70px', textAlign: 'center', fontSize: '13px', fontWeight: 500 }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              />
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
                              <div style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                padding: '2px 4px', 
                                background: '#f3f4f6',
                                borderRadius: '4px',
                                border: '1px solid #e5e7eb',
                                minWidth: '55px',
                                justifyContent: 'center'
                              }}>
                                <select
                                  value={item.vatRate}
                                  onChange={(e) => updateField(`items.${index}.vatRate`, e.target.value)}
                                  style={{ 
                                    ...inputStyle, 
                                    width: '45px', 
                                    textAlign: 'center', 
                                    fontSize: '11px', 
                                    fontWeight: '500',
                                    color: '#6b7280',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    appearance: 'none'
                                  }}
                                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                  {VAT_RATES.map(rate => (
                                    <option key={rate.value} value={rate.value}>
                                      {rate.label}
                                    </option>
                                  ))}
                                </select>
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
                          
                          {/* Ligne description étalée sur toute la largeur */}
                          {(item.description && item.name) && (
                            <tr key={`${index}-desc`} style={{ borderBottom: '1px solid #f3f4f6' }}>
                              <td colSpan={5} style={{ padding: '8px 16px', paddingTop: '0' }}>
                                <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                                  <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => updateField(`items.${index}.description`, e.target.value)}
                                    style={{ ...inputStyle, fontSize: '11px', color: '#6b7280', flex: 1, border: 'none', background: 'transparent' }}
                                    placeholder="Descriptif optionnel"
                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                  />
                                  <select
                                    value={item.unit}
                                    onChange={(e) => updateField(`items.${index}.unit`, e.target.value)}
                                    style={{ ...inputStyle, width: '55px', fontSize: '11px', color: '#6b7280', textAlign: 'center', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '2px', marginLeft: '4px', cursor: 'pointer', appearance: 'none' }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(250, 160, 22, 0.05)'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                  >
                                    {UNITS.map(unit => (
                                      <option key={unit.value} value={unit.value}>
                                        {unit.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </td>
                            </tr>
                          )}
                          
                          {/* Indicateur de saut de page pour table */}
                          {isPageBreak && (
                            <tr>
                              <td colSpan={5} style={{ padding: '20px 0', textAlign: 'center', position: 'relative' }}>
                                <div style={{
                                  position: 'absolute',
                                  top: '50%',
                                  left: '16px',
                                  right: '16px',
                                  height: '1px',
                                  background: 'linear-gradient(to right, transparent, #e5e7eb 20%, #e5e7eb 80%, transparent)',
                                  transform: 'translateY(-50%)'
                                }} />
                                <div style={{
                                  background: 'white',
                                  padding: '8px 20px',
                                  borderRadius: '20px',
                                  border: '1px solid #e5e7eb',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  color: '#6b7280',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  position: 'relative',
                                  zIndex: 1
                                }}>
                                  <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#4C34CE'
                                  }} />
                                  PAGE {currentPage + 1}
                                  <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#4C34CE'
                                  }} />
                                </div>
                              </td>
                            </tr>
                          )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </section>

                {/* Indicateur global de pagination */}
                {TOTAL_PAGES > 1 && (
                  <section style={{ marginBottom: isMobile ? '20px' : '25px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      padding: '12px 20px',
                      background: 'linear-gradient(135deg, rgba(76, 52, 206, 0.05), rgba(250, 160, 22, 0.05))',
                      borderRadius: '12px',
                      border: '1px solid rgba(76, 52, 206, 0.1)',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#374151'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4C34CE" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <line x1="9" y1="9" x2="15" y2="9"/>
                          <line x1="9" y1="12" x2="15" y2="12"/>
                          <line x1="9" y1="15" x2="15" y2="15"/>
                        </svg>
                        <span style={{ color: '#6b7280' }}>Document PDF:</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontWeight: 600,
                        color: '#4C34CE'
                      }}>
                        <span>{TOTAL_PAGES} {TOTAL_PAGES === 1 ? 'page' : 'pages'}</span>
                        <div style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: '#4C34CE'
                        }} />
                        <span>{invoiceData.items.length} articles</span>
                      </div>
                      {!isMobile && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '11px',
                          color: '#6b7280'
                        }}>
                          <span>•</span>
                          <span>Flux continu en édition</span>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* Totals */}
                <section style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 320px', 
                  gap: isMobile ? '20px' : '40px', 
                  marginBottom: isMobile ? '25px' : '35px' 
                }}>
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

                {/* Payment */}
                <section style={{ background: 'linear-gradient(135deg, #fafbfc 0%, #f3f4f6 100%)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Informations de paiement</h3>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                    gap: isMobile ? '12px' : '16px' 
                  }}>
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
                    <strong>Paiement par chèque :</strong> À l'ordre de LOGEFI SERVICES<br />
                    <em>Aucun escompte ne sera accordé en cas de règlement anticipé.</em>
                  </div>
                </section>

                {/* Footer */}
                <footer style={{ position: 'absolute', bottom: '0.8cm', left: '1.2cm', right: '1.2cm', paddingTop: '12px', borderTop: '1px solid #f0f0f0', fontSize: '10px', color: '#9ca3af', textAlign: 'center' }}>
                  <div style={{ marginBottom: '8px' }}>En cas de retard de paiement, pénalités appliquées au taux légal et indemnité forfaitaire de 80 € pour frais de recouvrement.</div>
                  
                  {/* Signature Oké */}
                  <div style={{ 
                    fontSize: '9px', 
                    textAlign: 'center',
                    fontWeight: 500,
                    marginTop: '8px'
                  }}>
                    <span style={{ color: '#4C34CE' }}>Facture générée avec </span>
                    <span style={{ color: '#FAA016', fontWeight: 600 }}>Oké Invoice</span>
                  </div>
                </footer>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}