'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Tag,
  Calculator,
  FileText,
  CheckCircle,
  XCircle,
  Filter
} from 'lucide-react';
import { Product } from '@/lib/types/invoice';
import { mockProducts } from '@/lib/mock-data/sales-data';
import GlassButton from '@/components/ui/GlassButton';
import GlassCard from '@/components/ui/GlassCard';

interface ProductCatalogProps {
  onProductSelect?: (product: Product) => void;
  selectedProductId?: string;
  mode?: 'selection' | 'management';
}

export default function ProductCatalog({ 
  onProductSelect, 
  selectedProductId,
  mode = 'management' 
}: ProductCatalogProps) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Récupérer les catégories uniques
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  // Filtrer les produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.account_code.includes(searchQuery);
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Sauvegarder un produit
  const saveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
      // Modification
      setProducts(prev => prev.map(product => 
        product.id === editingProduct.id 
          ? { ...product, ...productData, updated_at: new Date().toISOString() }
          : product
      ));
    } else {
      // Création
      const newProduct: Product = {
        id: `product-${Date.now()}`,
        code: `PROD${String(products.length + 1).padStart(3, '0')}`,
        ...productData as Product,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setProducts(prev => [...prev, newProduct]);
    }
    
    setEditingProduct(null);
    setIsCreating(false);
  };

  // Supprimer un produit
  const deleteProduct = (productId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(prev => prev.filter(product => product.id !== productId));
    }
  };

  // Dupliquer un produit
  const duplicateProduct = (product: Product) => {
    const duplicated: Product = {
      ...product,
      id: `product-${Date.now()}`,
      code: `${product.code}-COPY`,
      name: `${product.name} (Copie)`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setProducts(prev => [...prev, duplicated]);
  };

  return (
    <div className="space-y-6">
      {/* Header avec recherche et filtres */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un article, code, ou compte comptable..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE] bg-white"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        {mode === 'management' && (
          <GlassButton
            onClick={() => setIsCreating(true)}
            className="bg-[#4C34CE] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvel article
          </GlassButton>
        )}
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Total articles</div>
          <div className="text-2xl font-semibold text-gray-900">{products.length}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Articles actifs</div>
          <div className="text-2xl font-semibold text-green-600">
            {products.filter(p => p.is_active).length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Catégories</div>
          <div className="text-2xl font-semibold text-[#4C34CE]">{categories.length}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Prix moyen</div>
          <div className="text-2xl font-semibold text-[#FAA016]">
            {Math.round(products.reduce((sum, p) => sum + p.unit_price, 0) / products.length).toLocaleString()} €
          </div>
        </div>
      </div>

      {/* Liste des produits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            layoutId={`product-${product.id}`}
            className={`group cursor-pointer ${
              selectedProductId === product.id ? 'ring-2 ring-[#4C34CE]' : ''
            }`}
            onClick={() => onProductSelect && onProductSelect(product)}
          >
            <GlassCard className="p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FAA016] to-[#FF8C00] rounded-lg flex items-center justify-center text-white">
                    <Package className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#4C34CE] transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">{product.code}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {product.is_active ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  
                  {mode === 'management' && (
                    <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateProduct(product);
                        }}
                        className="p-1 text-gray-400 hover:text-[#FAA016] transition-colors"
                        title="Dupliquer"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProduct(product);
                        }}
                        className="p-1 text-gray-400 hover:text-[#4C34CE] transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProduct(product.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {product.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
              )}

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Prix unitaire:</span>
                  <span className="font-medium text-gray-900">
                    {product.unit_price.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} € / {product.unit}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">TVA:</span>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {product.vat_rate}%
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Compte:</span>
                  <span className="text-sm font-mono text-gray-700">
                    {product.account_code}
                  </span>
                </div>
              </div>

              {product.category && (
                <div className="inline-block px-2 py-1 bg-[#4C34CE]/10 text-[#4C34CE] text-xs rounded-full mb-2">
                  {product.category}
                </div>
              )}

              {product.track_stock && product.stock_quantity !== undefined && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600">Stock:</span>
                    <span className={`font-medium ${
                      product.stock_quantity > (product.min_stock_level || 0)
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {product.stock_quantity} {product.unit}
                    </span>
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">
            {searchQuery || categoryFilter !== 'all' 
              ? 'Aucun article trouvé' 
              : 'Aucun article dans le catalogue'
            }
          </p>
          <p className="text-gray-400 text-sm">
            {searchQuery || categoryFilter !== 'all'
              ? 'Essayez de modifier vos critères de recherche'
              : 'Commencez par ajouter votre premier article'
            }
          </p>
        </div>
      )}

      {/* Modal de création/édition */}
      <AnimatePresence>
        {(isCreating || editingProduct) && (
          <ProductFormModal
            product={editingProduct}
            isOpen={true}
            onClose={() => {
              setIsCreating(false);
              setEditingProduct(null);
            }}
            onSave={saveProduct}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Composant modal pour créer/éditer un produit
interface ProductFormModalProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
}

function ProductFormModal({ product, isOpen, onClose, onSave }: ProductFormModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    unit_price: 0,
    unit: 'unité',
    vat_rate: 20,
    account_code: '',
    account_name: '',
    category: '',
    track_stock: false,
    stock_quantity: 0,
    min_stock_level: 0
  });

  React.useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

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
              {product ? 'Modifier l\'article' : 'Nouvel article'}
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'article *
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
                  Catégorie
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Conseil, Formation, Logiciel..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix unitaire HT (€) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.unit_price}
                  onChange={(e) => setFormData(prev => ({ ...prev, unit_price: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unité *
                </label>
                <input
                  type="text"
                  required
                  value={formData.unit}
                  onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                  placeholder="unité, heure, forfait..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taux TVA (%) *
                </label>
                <select
                  required
                  value={formData.vat_rate}
                  onChange={(e) => setFormData(prev => ({ ...prev, vat_rate: parseFloat(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                >
                  <option value={0}>0%</option>
                  <option value={5.5}>5,5%</option>
                  <option value={10}>10%</option>
                  <option value={20}>20%</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compte comptable *
                </label>
                <input
                  type="text"
                  required
                  value={formData.account_code}
                  onChange={(e) => setFormData(prev => ({ ...prev, account_code: e.target.value }))}
                  placeholder="706000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Libellé du compte *
                </label>
                <input
                  type="text"
                  required
                  value={formData.account_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, account_name: e.target.value }))}
                  placeholder="Prestations de services"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                />
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-[#4C34CE]" />
                <h3 className="font-medium text-gray-900">Gestion du stock</h3>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.track_stock || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, track_stock: e.target.checked }))}
                    className="rounded border-gray-300 text-[#4C34CE] focus:ring-[#4C34CE]"
                  />
                  <span className="ml-2 text-sm text-gray-700">Suivre le stock pour cet article</span>
                </label>
              </div>

              {formData.track_stock && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantité en stock
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock minimum
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.min_stock_level}
                      onChange={(e) => setFormData(prev => ({ ...prev, min_stock_level: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-[#4C34CE]"
                    />
                  </div>
                </div>
              )}
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