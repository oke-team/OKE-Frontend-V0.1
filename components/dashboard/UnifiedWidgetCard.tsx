'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, TrendingUp, TrendingDown, Paperclip, AlertCircle, Plus, X, Upload } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface WidgetItem {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  isImportant?: boolean;
  hasJustification?: boolean;
  needsJustification?: boolean;
}

export interface UnifiedWidgetProps {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  colorFrom: string;
  colorTo: string;
  accentColor: string;
  items: WidgetItem[];
  moduleHref: string;
  onClick?: () => void;
}

const UnifiedWidgetCard: React.FC<UnifiedWidgetProps> = ({
  id,
  title,
  subtitle,
  amount,
  icon: Icon,
  colorFrom,
  colorTo,
  accentColor,
  items,
  moduleHref,
  onClick
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showMobileExpanded, setShowMobileExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  // S'assurer d'avoir exactement 5 items
  const normalizedItems = [...items];
  while (normalizedItems.length < 5) {
    normalizedItems.push({
      id: `${id}-empty-${normalizedItems.length}`,
      label: '',
      value: '',
      trend: 'stable'
    });
  }
  const displayItems = normalizedItems.slice(0, 5);

  // Mapping des couleurs pour correspondre au style entrepreneur avec plus de variété
  const getGradientColor = () => {
    if (id === 'notifications') return 'from-purple-500 to-indigo-600';
    if (id === 'todo') return 'from-rose-500 to-pink-600';
    if (id === 'agenda') return 'from-blue-500 to-sky-600';
    if (id === 'messages') return 'from-teal-500 to-emerald-600';
    if (id === 'bank') return 'from-violet-500 to-purple-600';
    if (id === 'purchases') return 'from-orange-500 to-red-600';
    if (id === 'sales') return 'from-green-500 to-emerald-600';
    if (id === 'receivables') return 'from-amber-500 to-orange-600';
    if (id === 'payables') return 'from-fuchsia-500 to-pink-600';
    return 'from-violet-500 to-purple-600';
  };

  // Handler pour le clic sur le widget
  const handleWidgetClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setShowMobileExpanded(true);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <>
    <Link href={isMobile ? '#' : moduleHref} onClick={handleWidgetClick}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0
        }}
        whileHover={{ 
          y: -4,
          scale: 1.01,
          transition: { 
            duration: 0.2,
            ease: "easeOut"
          }
        }}
        transition={{ duration: 0.3 }}
        className="relative bg-white/90 backdrop-blur-xl rounded-xl p-6 cursor-pointer group h-full border border-white/50 shadow-lg hover:shadow-xl"
        style={{
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 4px 15px rgba(0, 0, 0, 0.05)'
        }}
        onClick={handleWidgetClick}
      >
        {/* Header avec icône, titre et montant */}
        <div className="flex items-start justify-between pb-3 mb-3 relative">
          <div className="flex items-center gap-2">
            {/* Icône avec gradient comme dans EntrepreneurDashboardV3 */}
            <div className={cn(
              "p-2 rounded-lg bg-gradient-to-br",
              getGradientColor()
            )}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            
            {/* Titre et sous-titre */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-neutral-900 truncate">
                {title}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5 truncate">
                {subtitle}
              </p>
            </div>
          </div>
          
          {/* Montant dans le header à droite avec cadre en L inversé */}
          {amount && (
            <div className="relative pr-2">
              <div className="text-xl font-bold text-neutral-900">
                {amount}
              </div>
              {/* Cadre en L simple à l'angle opposé (bas-droite) */}
              <div 
                className="absolute -bottom-1 -right-1 w-8 h-3"
                style={{
                  borderBottom: '3px solid #4C34CE',
                  borderRight: '3px solid #4C34CE'
                }}
              />
            </div>
          )}
        </div>
        
        {/* Ligne de séparation jaune élégante */}
        <div className="relative mb-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#FAA016]/20"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#FAA016] to-transparent"></div>
          </div>
        </div>
        
        {/* Liste des 5 items exactement */}
        <div className="space-y-1 mb-3">
          {displayItems.map((item, index) => (
            <div key={`${id}-item-${index}`}>
              {item.label ? (
                <div className="flex items-center justify-between py-0.5 group/item">
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    {/* Indicateur de justificatif pour le widget banque */}
                    {id === 'bank' && (
                      <>
                        {item.hasJustification ? (
                          <Paperclip className="w-3 h-3 text-green-500 flex-shrink-0" />
                        ) : item.needsJustification ? (
                          <AlertCircle className="w-3 h-3 text-orange-500 flex-shrink-0" />
                        ) : null}
                      </>
                    )}
                    <span className="text-xs text-neutral-600 truncate">
                      {item.label}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-xs font-medium",
                      item.trend === 'up' && "text-green-600",
                      item.trend === 'down' && "text-red-600",
                      (!item.trend || item.trend === 'stable') && "text-neutral-700"
                    )}>
                      {typeof item.value === 'number' 
                        ? new Intl.NumberFormat('fr-FR').format(item.value)
                        : item.value
                      }
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-4" />
              )}
            </div>
          ))}
        </div>
        
        {/* Footer avec légende pour le widget banque et boutons */}
        <div className="flex items-center justify-between">
          {/* Légende des indicateurs pour le widget banque */}
          {id === 'bank' && (
            <div className="flex items-center gap-3 text-[10px] text-neutral-500">
              <div className="flex items-center gap-1">
                <Paperclip className="w-3 h-3 text-green-500" />
                <span>Justifié</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-orange-500" />
                <span>À justifier</span>
              </div>
            </div>
          )}
          
          {/* Spacer si pas de légende */}
          {id !== 'bank' && <div />}
          
          {/* Boutons d'action - uniquement sur desktop */}
          {!isMobile && (
            <div className="flex items-center gap-2">
              {/* Bouton d'ajout de justificatifs pour le widget banque */}
              {id === 'bank' && items.some(item => item.needsJustification) && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowUploadModal(true);
                  }}
                  className="p-1.5 bg-orange-100 hover:bg-orange-200 rounded-full transition-colors"
                  title="Ajouter des justificatifs"
                >
                  <Plus className="w-3.5 h-3.5 text-orange-600" />
                </button>
              )}
              
              {/* Bouton "Voir +" */}
              <button 
                className="px-3 py-1 rounded-full text-xs font-medium text-white transition-all hover:shadow-md hover:scale-105"
                style={{
                  background: '#FAA016',
                  boxShadow: '0 2px 8px rgba(250, 160, 22, 0.3)'
                }}
              >
                Voir +
              </button>
            </div>
          )}
          
          {/* Indicateur de tap sur mobile */}
          {isMobile && (
            <div className="text-[10px] text-neutral-400">
              Toucher pour ouvrir
            </div>
          )}
        </div>
      </motion.div>
    </Link>
    
    {/* Modal d'upload de justificatifs */}
    <AnimatePresence>
      {id === 'bank' && showUploadModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUploadModal(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-xl shadow-xl z-50 p-6"
          >
            {/* Header de la modal */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">
                Ajouter des justificatifs
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>
            
            {/* Liste des transactions à justifier */}
            <div className="space-y-3 mb-6">
              <p className="text-sm text-neutral-600">
                Sélectionnez les transactions à justifier :
              </p>
              
              {items
                .filter(item => item.needsJustification)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      <div>
                        <div className="text-sm font-medium text-neutral-900">
                          {item.label}
                        </div>
                        <div className="text-xs text-neutral-500">
                          Montant : {item.value}
                        </div>
                      </div>
                    </div>
                    
                    <button className="p-2 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg transition-colors">
                      <Upload className="w-4 h-4 text-neutral-600" />
                    </button>
                  </div>
                ))}
            </div>
            
            {/* Zone d'upload global */}
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-neutral-700">
                Glissez vos fichiers ici
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                ou cliquez pour sélectionner
              </p>
              <p className="text-xs text-neutral-400 mt-2">
                PDF, JPG, PNG jusqu'à 10MB
              </p>
            </div>
            
            {/* Boutons d'action */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  // TODO: Implémenter l'upload
                  console.log('Upload des justificatifs');
                  setShowUploadModal(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
              >
                Valider
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    
    {/* Vue étendue mobile */}
    <AnimatePresence>
      {isMobile && showMobileExpanded && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50"
          />
          
          {/* Contenu étendu */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            {/* Header fixe */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg bg-gradient-to-br",
                  getGradientColor()
                )}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
                  <p className="text-xs text-neutral-500">{subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setShowMobileExpanded(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>
            
            {/* Montant principal */}
            <div className="px-4 py-6 bg-gradient-to-b from-neutral-50 to-white">
              <div className="text-3xl font-bold text-neutral-900 text-center">
                {amount}
              </div>
              {id === 'bank' && (
                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Paperclip className="w-3 h-3 text-green-500" />
                    <span>Justifié</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-orange-500" />
                    <span>À justifier</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Liste étendue des items (plus de 5) */}
            <div className="px-4 pb-24">
              <h3 className="text-sm font-medium text-neutral-700 mb-3">
                {id === 'bank' ? 'Toutes les transactions' : 'Tous les éléments'}
              </h3>
              <div className="space-y-2">
                {/* Afficher tous les items disponibles, pas seulement 5 */}
                {items.map((item, index) => (
                  <div
                    key={`${id}-mobile-item-${index}`}
                    className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      {id === 'bank' && (
                        <>
                          {item.hasJustification ? (
                            <Paperclip className="w-4 h-4 text-green-500 flex-shrink-0" />
                          ) : item.needsJustification ? (
                            <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                          ) : (
                            <div className="w-4 h-4" />
                          )}
                        </>
                      )}
                      <div className="flex-1">
                        <div className="text-sm text-neutral-900">
                          {item.label}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "text-sm font-semibold",
                        item.trend === 'up' && "text-green-600",
                        item.trend === 'down' && "text-red-600",
                        (!item.trend || item.trend === 'stable') && "text-neutral-700"
                      )}>
                        {typeof item.value === 'number' 
                          ? new Intl.NumberFormat('fr-FR').format(item.value)
                          : item.value
                        }
                      </span>
                      {id === 'bank' && item.needsJustification && (
                        <button
                          onClick={() => {
                            setShowMobileExpanded(false);
                            setTimeout(() => setShowUploadModal(true), 300);
                          }}
                          className="p-2 bg-orange-100 rounded-lg"
                        >
                          <Upload className="w-4 h-4 text-orange-600" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Ajouter plus d'items fictifs pour montrer le scroll */}
                {items.length < 10 && (
                  <div className="text-center py-8 text-sm text-neutral-400">
                    Fin de la liste
                  </div>
                )}
              </div>
            </div>
            
            {/* Boutons d'action fixes en bas */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4">
              <div className="flex gap-3">
                {id === 'bank' && items.some(item => item.needsJustification) && (
                  <button
                    onClick={() => {
                      setShowMobileExpanded(false);
                      setTimeout(() => setShowUploadModal(true), 300);
                    }}
                    className="flex-1 py-3 bg-orange-500 text-white font-medium rounded-lg flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Ajouter des justificatifs
                  </button>
                )}
                <Link
                  href={moduleHref}
                  className="flex-1 py-3 bg-primary-600 text-white font-medium rounded-lg text-center"
                  onClick={() => setShowMobileExpanded(false)}
                >
                  Voir tous les détails
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default UnifiedWidgetCard;