'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Building2, 
  Plus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin,
  Globe,
  FileText,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Client } from '@/lib/types/invoice';
import { mockClients, mockPappersResults } from '@/lib/mock-data/sales-data';
import GlassButton from '@/components/ui/GlassButton';
import GlassCard from '@/components/ui/GlassCard';

interface ClientManagerProps {
  onClientSelect?: (client: Client) => void;
  selectedClientId?: string;
  mode?: 'selection' | 'management';
}

export default function ClientManager({ 
  onClientSelect, 
  selectedClientId,
  mode = 'management' 
}: ClientManagerProps) {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchingPappers, setIsSearchingPappers] = useState(false);
  const [pappersResults, setPappersResults] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  // Filtrer les clients selon la recherche
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.client_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Recherche API Pappers (mock)
  const searchPappers = async (query: string) => {
    if (query.length < 3) return;
    
    setIsSearchingPappers(true);
    
    // Simulation d'appel API
    setTimeout(() => {
      const results = mockPappersResults.filter(result =>
        result.denomination.toLowerCase().includes(query.toLowerCase()) ||
        result.siren.includes(query)
      );
      setPappersResults(results);
      setIsSearchingPappers(false);
    }, 1000);
  };

  // Créer un client depuis Pappers
  const createClientFromPappers = (pappersData: any) => {
    const newClient: Client = {
      id: `client-${Date.now()}`,
      name: pappersData.denomination,
      client_code: `CLI${String(clients.length + 1).padStart(3, '0')}`,
      address_line1: pappersData.adresse.ligne1,
      address_line2: pappersData.adresse.ligne2,
      postal_code: pappersData.adresse.code_postal,
      city: pappersData.adresse.ville,
      country: pappersData.adresse.pays,
      email: pappersData.email,
      phone: pappersData.telephone,
      siren: pappersData.siren,
      siret: pappersData.siret,
      vat_number: pappersData.numero_tva_intracommunautaire,
      legal_form: pappersData.forme_juridique,
      website: pappersData.site_web,
      payment_terms: 30,
      payment_method: 'Virement bancaire',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setClients(prev => [...prev, newClient]);
    setPappersResults([]);
    
    if (onClientSelect) {
      onClientSelect(newClient);
    }
  };

  // Sauvegarder un client
  const saveClient = (clientData: Partial<Client>) => {
    if (editingClient) {
      // Modification
      setClients(prev => prev.map(client => 
        client.id === editingClient.id 
          ? { ...client, ...clientData, updated_at: new Date().toISOString() }
          : client
      ));
    } else {
      // Création
      const newClient: Client = {
        id: `client-${Date.now()}`,
        client_code: `CLI${String(clients.length + 1).padStart(3, '0')}`,
        ...clientData as Client,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setClients(prev => [...prev, newClient]);
    }
    
    setEditingClient(null);
    setIsCreating(false);
  };

  // Supprimer un client
  const deleteClient = (clientId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      setClients(prev => prev.filter(client => client.id !== clientId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec recherche */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length >= 3) {
                  searchPappers(e.target.value);
                } else {
                  setPappersResults([]);
                }
              }}
              placeholder="Rechercher un client ou une entreprise..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
            />
            {isSearchingPappers && (
              <div className="absolute right-3 top-3">
                <div className="w-5 h-5 border-2 border-[#4C34CE] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
        
        {mode === 'management' && (
          <GlassButton
            onClick={() => setIsCreating(true)}
            className="bg-[#4C34CE] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau client
          </GlassButton>
        )}
      </div>

      {/* Résultats Pappers */}
      <AnimatePresence>
        {pappersResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <h3 className="text-sm font-medium text-blue-900 mb-3 flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              Entreprises trouvées via API Pappers
            </h3>
            <div className="space-y-2">
              {pappersResults.map((result, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{result.denomination}</div>
                      <div className="text-sm text-gray-600">
                        {result.forme_juridique} - SIREN: {result.siren}
                      </div>
                      <div className="text-sm text-gray-600">
                        {result.adresse.ligne1}, {result.adresse.code_postal} {result.adresse.ville}
                      </div>
                    </div>
                    <GlassButton
                      onClick={() => createClientFromPappers(result)}
                      className="bg-[#4C34CE] text-white"
                    >
                      Ajouter
                    </GlassButton>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Liste des clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <motion.div
            key={client.id}
            layoutId={`client-${client.id}`}
            className={`group cursor-pointer ${
              selectedClientId === client.id ? 'ring-2 ring-[#4C34CE]' : ''
            }`}
            onClick={() => onClientSelect && onClientSelect(client)}
          >
            <GlassCard className="p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4C34CE] to-[#6246EA] rounded-lg flex items-center justify-center text-white font-semibold">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#4C34CE] transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-sm text-gray-600">{client.client_code}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {client.is_active ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  
                  {mode === 'management' && (
                    <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingClient(client);
                        }}
                        className="p-1 text-gray-400 hover:text-[#4C34CE] transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteClient(client.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{client.postal_code} {client.city}</span>
                </div>
                
                {client.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="truncate">{client.email}</span>
                  </div>
                )}
                
                {client.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{client.phone}</span>
                  </div>
                )}

                {client.website && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="truncate">{client.website}</span>
                  </div>
                )}
              </div>

              {client.industry && (
                <div className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {client.industry}
                </div>
              )}

              {client.payment_terms && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-600">
                    Conditions de paiement: {client.payment_terms} jours
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {filteredClients.length === 0 && !isSearchingPappers && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">
            {searchQuery ? 'Aucun client trouvé' : 'Aucun client enregistré'}
          </p>
          <p className="text-gray-400 text-sm">
            {searchQuery 
              ? 'Essayez une recherche différente ou créez un nouveau client'
              : 'Commencez par ajouter votre premier client'
            }
          </p>
        </div>
      )}

      {/* Modal de création/édition */}
      <AnimatePresence>
        {(isCreating || editingClient) && (
          <ClientFormModal
            client={editingClient}
            isOpen={true}
            onClose={() => {
              setIsCreating(false);
              setEditingClient(null);
            }}
            onSave={saveClient}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Composant modal pour créer/éditer un client
interface ClientFormModalProps {
  client?: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: Partial<Client>) => void;
}

function ClientFormModal({ client, isOpen, onClose, onSave }: ClientFormModalProps) {
  const [formData, setFormData] = useState<Partial<Client>>({
    name: '',
    address_line1: '',
    address_line2: '',
    postal_code: '',
    city: '',
    country: 'France',
    email: '',
    phone: '',
    siret: '',
    vat_number: '',
    legal_form: '',
    website: '',
    payment_terms: 30,
    payment_method: 'Virement bancaire',
    industry: '',
    notes: ''
  });

  React.useEffect(() => {
    if (client) {
      setFormData(client);
    }
  }, [client]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">
              {client ? 'Modifier le client' : 'Nouveau client'}
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'entreprise *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Forme juridique
                </label>
                <input
                  type="text"
                  value={formData.legal_form}
                  onChange={(e) => setFormData(prev => ({ ...prev, legal_form: e.target.value }))}
                  placeholder="SAS, SARL, EURL..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SIRET
                </label>
                <input
                  type="text"
                  value={formData.siret}
                  onChange={(e) => setFormData(prev => ({ ...prev, siret: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  N° TVA
                </label>
                <input
                  type="text"
                  value={formData.vat_number}
                  onChange={(e) => setFormData(prev => ({ ...prev, vat_number: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse ligne 1 *
              </label>
              <input
                type="text"
                required
                value={formData.address_line1}
                onChange={(e) => setFormData(prev => ({ ...prev, address_line1: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse ligne 2
              </label>
              <input
                type="text"
                value={formData.address_line2}
                onChange={(e) => setFormData(prev => ({ ...prev, address_line2: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code postal *
                </label>
                <input
                  type="text"
                  required
                  value={formData.postal_code}
                  onChange={(e) => setFormData(prev => ({ ...prev, postal_code: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pays *
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Délai de paiement (jours)
                </label>
                <input
                  type="number"
                  value={formData.payment_terms}
                  onChange={(e) => setFormData(prev => ({ ...prev, payment_terms: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mode de paiement
                </label>
                <select
                  value={formData.payment_method}
                  onChange={(e) => setFormData(prev => ({ ...prev, payment_method: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                >
                  <option value="Virement bancaire">Virement bancaire</option>
                  <option value="Prélèvement SEPA">Prélèvement SEPA</option>
                  <option value="Chèque">Chèque</option>
                  <option value="Espèces">Espèces</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <GlassButton
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Annuler
            </GlassButton>
            
            <GlassButton
              type="submit"
              className="bg-[#4C34CE] text-white"
            >
              Sauvegarder
            </GlassButton>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}