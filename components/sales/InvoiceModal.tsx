'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Save, 
  Eye, 
  Download, 
  Mail, 
  Share2, 
  Plus, 
  Minus, 
  Search,
  Building2,
  Package,
  Calendar,
  Globe,
  CreditCard,
  FileText,
  RefreshCw
} from 'lucide-react';
import { Invoice, InvoiceFormData, Client, Product } from '@/lib/types/invoice';
import GlassButton from '@/components/ui/GlassButton';
import InvoiceTemplate from './InvoiceTemplate';
import { useDocumentViewer } from '@/components/ui/DocumentViewerAdvanced';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice?: Invoice;
  mode?: 'create' | 'edit';
}

export default function InvoiceModal({ 
  isOpen, 
  onClose, 
  invoice,
  mode = 'create' 
}: InvoiceModalProps) {
  const { open: openDocumentViewer, ViewerComponent } = useDocumentViewer();
  
  // État du formulaire
  const [formData, setFormData] = useState<InvoiceFormData>({
    type: 'invoice',
    client_id: '',
    items: [{
      description: '',
      details: [],
      quantity: 1,
      unit: 'unité',
      unit_price: 0,
      vat_rate: 20
    }],
    currency: 'EUR',
    language: 'fr',
    payment: {
      method: 'Virement bancaire',
      bank_name: '',
      iban: '',
      bic: ''
    }
  });

  // États de l'interface
  const [activeTab, setActiveTab] = useState<'general' | 'client' | 'items' | 'payment'>('general');
  const [isClientSearchOpen, setIsClientSearchOpen] = useState(false);
  const [isProductSearchOpen, setIsProductSearchOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Données mock pour les tests
  const mockClients: Client[] = [
    {
      id: '1',
      name: 'JACOB ADVISORY SAS',
      client_code: 'CLI001',
      address_line1: 'LA RUCHE',
      address_line2: '126 rue du 11 Novembre 1918',
      postal_code: '74460',
      city: 'Marnaz',
      country: 'France',
      siret: '880 172 044 00039',
      vat_number: 'FR89880172044',
      email: 'contact@jacob-advisory.com',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const mockProducts: Product[] = [
    {
      id: '1',
      code: 'PREST001',
      name: 'Prestations conseil selon nos accords',
      unit_price: 50000,
      unit: 'forfait',
      vat_rate: 20,
      account_code: '706000',
      account_name: 'Prestations de services',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  // Calculs automatiques
  const calculateTotals = () => {
    const items = formData.items.map(item => ({
      ...item,
      total_ht: item.quantity * item.unit_price,
      vat_amount: (item.quantity * item.unit_price) * (item.vat_rate / 100),
      total_ttc: (item.quantity * item.unit_price) * (1 + item.vat_rate / 100)
    }));

    const total_ht = items.reduce((sum, item) => sum + item.total_ht, 0);
    const total_vat = items.reduce((sum, item) => sum + item.vat_amount, 0);
    const total_ttc = total_ht + total_vat;

    // Grouper les TVA par taux
    const vatGroups = items.reduce((groups: any[], item) => {
      const existingGroup = groups.find(g => g.rate === item.vat_rate);
      if (existingGroup) {
        existingGroup.base += item.total_ht;
        existingGroup.amount += item.vat_amount;
      } else {
        groups.push({
          rate: item.vat_rate,
          base: item.total_ht,
          amount: item.vat_amount
        });
      }
      return groups;
    }, []);

    return { items, total_ht, total_vat, total_ttc, vatGroups };
  };

  // Gestion des lignes de facture
  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        description: '',
        details: [],
        quantity: 1,
        unit: 'unité',
        unit_price: 0,
        vat_rate: 20
      }]
    }));
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const updateItem = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Sélection de client
  const selectClient = (client: Client) => {
    setSelectedClient(client);
    setFormData(prev => ({ ...prev, client_id: client.id }));
    setIsClientSearchOpen(false);
  };

  // Sélection de produit
  const selectProduct = (product: Product, itemIndex: number) => {
    updateItem(itemIndex, 'description', product.name);
    updateItem(itemIndex, 'unit_price', product.unit_price);
    updateItem(itemIndex, 'unit', product.unit);
    updateItem(itemIndex, 'vat_rate', product.vat_rate);
    setIsProductSearchOpen(false);
  };

  // Générer facture pour prévisualisation
  const generatePreviewInvoice = (): Invoice => {
    const { items, total_ht, total_vat, total_ttc, vatGroups } = calculateTotals();
    
    return {
      id: 'preview',
      number: mode === 'create' ? 'PREVIEW-001' : invoice?.number || 'PREVIEW-001',
      title: formData.type === 'invoice' ? 'Facture' : formData.type === 'quote' ? 'Devis' : 'Avoir',
      type: formData.type,
      status: 'draft',
      issue_date: new Date().toISOString(),
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      issuer: {
        name: 'LOGEFI SERVICES SARL',
        address_line1: '8 rue Saint Marc',
        postal_code: '75002',
        city: 'Paris',
        country: 'France',
        siret: '843 117 227 00036',
        vat_number: 'FR63843117227',
        logo_text: 'LS'
      },
      client: selectedClient || {
        name: 'Client non sélectionné',
        address_line1: 'Adresse à définir',
        postal_code: '00000',
        city: 'Ville',
        country: 'France'
      },
      items: items.map((item, index) => ({
        ...item,
        id: `item-${index}`
      })),
      payment: formData.payment,
      currency: formData.currency,
      language: formData.language,
      is_facturx: true,
      total_ht,
      total_vat,
      total_ttc,
      vat_groups: vatGroups,
      late_penalty_rate: 3,
      recovery_indemnity: 40,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'current-user'
    };
  };

  // Actions
  const handlePreview = () => {
    const previewInvoice = generatePreviewInvoice();
    const htmlContent = `
      <div id="invoice-preview">
        <!-- Ici, nous utiliserions le rendu HTML du composant InvoiceTemplate -->
      </div>
    `;
    
    openDocumentViewer({
      src: `data:text/html;base64,${btoa(unescape(encodeURIComponent(htmlContent)))}`,
      title: `${previewInvoice.title} - ${previewInvoice.number}`,
      type: 'html'
    });
  };

  const handleSave = () => {
    // Ici, on sauvegarderait la facture
    console.log('Saving invoice:', formData);
    onClose();
  };

  const handleSendEmail = () => {
    console.log('Sending email...');
  };

  const handleDownload = () => {
    console.log('Downloading PDF...');
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'general', label: 'Général', icon: FileText },
    { id: 'client', label: 'Client', icon: Building2 },
    { id: 'items', label: 'Articles', icon: Package },
    { id: 'payment', label: 'Paiement', icon: CreditCard }
  ] as const;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {mode === 'create' ? 'Nouvelle' : 'Modifier'} {formData.type === 'invoice' ? 'facture' : formData.type === 'quote' ? 'devis' : 'avoir'}
                  </h2>
                  
                  {/* Type selector */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {['invoice', 'quote', 'credit_note'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFormData(prev => ({ ...prev, type: type as any }))}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          formData.type === type
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {type === 'invoice' ? 'Facture' : type === 'quote' ? 'Devis' : 'Avoir'}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <GlassButton
                    onClick={handlePreview}
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Aperçu
                  </GlassButton>
                  
                  <GlassButton
                    onClick={handleDownload}
                    className="bg-[#FAA016] text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </GlassButton>
                  
                  <GlassButton
                    onClick={handleSendEmail}
                    className="bg-[#4C34CE] text-white"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Envoyer
                  </GlassButton>
                  
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Tabs */}
                <div className="w-64 border-r border-gray-200 bg-gray-50 p-6">
                  <div className="space-y-2">
                    {tabs.map((tab) => {
                      const IconComponent = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                            activeTab === tab.id
                              ? 'bg-white text-[#4C34CE] shadow-sm border border-gray-200'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-2">Récapitulatif</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Total HT:</span>
                        <span className="font-medium">
                          {calculateTotals().total_ht.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>TVA:</span>
                        <span className="font-medium">
                          {calculateTotals().total_vat.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                        </span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-gray-200 font-semibold text-gray-900">
                        <span>Total TTC:</span>
                        <span>
                          {calculateTotals().total_ttc.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Tab: General */}
                  {activeTab === 'general' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Langue
                          </label>
                          <select
                            value={formData.language}
                            onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value as any }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                          >
                            <option value="fr">Français</option>
                            <option value="en">English</option>
                            <option value="zh">中文</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Devise
                          </label>
                          <select
                            value={formData.currency}
                            onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                          >
                            <option value="EUR">EUR - Euro</option>
                            <option value="USD">USD - Dollar américain</option>
                            <option value="GBP">GBP - Livre sterling</option>
                            <option value="CNY">CNY - Yuan chinois</option>
                          </select>
                        </div>
                      </div>

                      {/* Récurrence */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <RefreshCw className="w-5 h-5 text-[#4C34CE]" />
                          <h3 className="font-medium text-gray-900">Facture récurrente</h3>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.is_recurring || false}
                              onChange={(e) => setFormData(prev => ({ ...prev, is_recurring: e.target.checked }))}
                              className="rounded border-gray-300 text-[#4C34CE] focus:ring-[#4C34CE]"
                            />
                            <span className="ml-2 text-sm text-gray-700">Activer la récurrence</span>
                          </label>
                        </div>

                        {formData.is_recurring && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fréquence
                              </label>
                              <select
                                value={formData.recurring_frequency}
                                onChange={(e) => setFormData(prev => ({ ...prev, recurring_frequency: e.target.value as any }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                              >
                                <option value="monthly">Mensuelle</option>
                                <option value="quarterly">Trimestrielle</option>
                                <option value="yearly">Annuelle</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date de fin
                              </label>
                              <input
                                type="date"
                                value={formData.recurring_end_date}
                                onChange={(e) => setFormData(prev => ({ ...prev, recurring_end_date: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notes
                        </label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Notes et conditions particulières..."
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Tab: Client */}
                  {activeTab === 'client' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">Sélection du client</h3>
                        <GlassButton
                          onClick={() => setIsClientSearchOpen(!isClientSearchOpen)}
                          className="bg-[#4C34CE] text-white"
                        >
                          <Search className="w-4 h-4 mr-2" />
                          Rechercher
                        </GlassButton>
                      </div>

                      {isClientSearchOpen && (
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <div className="mb-4">
                            <input
                              type="text"
                              placeholder="Rechercher un client ou une entreprise..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            {mockClients.map((client) => (
                              <button
                                key={client.id}
                                onClick={() => selectClient(client)}
                                className="w-full p-3 text-left bg-white rounded-lg border border-gray-200 hover:border-[#4C34CE] hover:shadow-sm transition-all"
                              >
                                <div className="font-medium text-gray-900">{client.name}</div>
                                <div className="text-sm text-gray-600">
                                  {client.address_line1}, {client.postal_code} {client.city}
                                </div>
                                {client.siret && (
                                  <div className="text-sm text-gray-500">SIRET: {client.siret}</div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedClient && (
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Client sélectionné</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-600">Nom</div>
                              <div className="font-medium">{selectedClient.name}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Code client</div>
                              <div className="font-medium">{selectedClient.client_code}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Adresse</div>
                              <div className="font-medium">
                                {selectedClient.address_line1}<br />
                                {selectedClient.postal_code} {selectedClient.city}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Contact</div>
                              <div className="font-medium">
                                {selectedClient.email && <div>{selectedClient.email}</div>}
                                {selectedClient.phone && <div>{selectedClient.phone}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab: Items */}
                  {activeTab === 'items' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">Articles et services</h3>
                        <GlassButton
                          onClick={addItem}
                          className="bg-[#FAA016] text-white"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter une ligne
                        </GlassButton>
                      </div>

                      <div className="space-y-4">
                        {formData.items.map((item, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-gray-900">Ligne {index + 1}</h4>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setCurrentItemIndex(index);
                                    setIsProductSearchOpen(!isProductSearchOpen);
                                  }}
                                  className="p-2 text-gray-600 hover:text-[#4C34CE] transition-colors"
                                >
                                  <Package className="w-4 h-4" />
                                </button>
                                {formData.items.length > 1 && (
                                  <button
                                    onClick={() => removeItem(index)}
                                    className="p-2 text-red-600 hover:text-red-700 transition-colors"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {isProductSearchOpen && currentItemIndex === index && (
                              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                <div className="mb-2">
                                  <input
                                    type="text"
                                    placeholder="Rechercher un article..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                                  />
                                </div>
                                <div className="space-y-2">
                                  {mockProducts.map((product) => (
                                    <button
                                      key={product.id}
                                      onClick={() => selectProduct(product, index)}
                                      className="w-full p-2 text-left bg-white rounded border border-gray-200 hover:border-[#4C34CE] transition-colors"
                                    >
                                      <div className="font-medium">{product.name}</div>
                                      <div className="text-sm text-gray-600">
                                        {product.unit_price.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} € / {product.unit} - TVA {product.vat_rate}%
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                              <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Description
                                </label>
                                <input
                                  type="text"
                                  value={item.description}
                                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                                  placeholder="Description de l'article ou service"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Quantité
                                </label>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                                  min="0"
                                  step="0.01"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Unité
                                </label>
                                <input
                                  type="text"
                                  value={item.unit}
                                  onChange={(e) => updateItem(index, 'unit', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Prix unitaire HT (€)
                                </label>
                                <input
                                  type="number"
                                  value={item.unit_price}
                                  onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                                  min="0"
                                  step="0.01"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Taux TVA (%)
                                </label>
                                <select
                                  value={item.vat_rate}
                                  onChange={(e) => updateItem(index, 'vat_rate', parseFloat(e.target.value))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                                >
                                  <option value={0}>0%</option>
                                  <option value={5.5}>5,5%</option>
                                  <option value={10}>10%</option>
                                  <option value={20}>20%</option>
                                </select>
                              </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="text-right">
                                <span className="text-sm text-gray-600">Total HT: </span>
                                <span className="font-medium text-gray-900">
                                  {(item.quantity * item.unit_price).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab: Payment */}
                  {activeTab === 'payment' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-900">Informations de paiement</h3>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Méthode de paiement
                          </label>
                          <select
                            value={formData.payment?.method || ''}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              payment: { ...prev.payment!, method: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                          >
                            <option value="Virement bancaire">Virement bancaire</option>
                            <option value="Prélèvement SEPA">Prélèvement SEPA</option>
                            <option value="Chèque">Chèque</option>
                            <option value="Espèces">Espèces</option>
                            <option value="Carte bancaire">Carte bancaire</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Établissement bancaire
                          </label>
                          <input
                            type="text"
                            value={formData.payment?.bank_name || ''}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              payment: { ...prev.payment!, bank_name: e.target.value }
                            }))}
                            placeholder="Nom de la banque"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            IBAN
                          </label>
                          <input
                            type="text"
                            value={formData.payment?.iban || ''}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              payment: { ...prev.payment!, iban: e.target.value }
                            }))}
                            placeholder="FR76 1234 1234 1234 1234 1234 123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            BIC
                          </label>
                          <input
                            type="text"
                            value={formData.payment?.bic || ''}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              payment: { ...prev.payment!, bic: e.target.value }
                            }))}
                            placeholder="BNPAFRPPXXX"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Total: {calculateTotals().total_ttc.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} {formData.currency}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <GlassButton
                    onClick={onClose}
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    Annuler
                  </GlassButton>
                  
                  <GlassButton
                    onClick={handleSave}
                    className="bg-[#4C34CE] text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </GlassButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DocumentViewer Component */}
      <ViewerComponent mode="auto" glassMorphism={true} />
    </>
  );
}