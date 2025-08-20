'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, TrendingUp, TrendingDown, Paperclip, AlertCircle, Plus, X, Upload, Filter, Eye, EyeOff, Check } from 'lucide-react';
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
  action?: string;
  actionLabel?: string;
  date?: string;
  isProcessed?: boolean;
  isSpecialFormat?: boolean;
  isSecondary?: boolean;
}

export interface UnifiedWidgetProps {
  id: string;
  title: string;
  subtitle: string;
  amount?: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  colorFrom: string;
  colorTo: string;
  accentColor: string;
  items: WidgetItem[];
  moduleHref: string;
  onClick?: () => void;
  fullWidth?: boolean;
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
  onClick,
  fullWidth = false
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showMobileExpanded, setShowMobileExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [processedItems, setProcessedItems] = useState<string[]>(() => 
    items.filter(item => item.isProcessed).map(item => item.id)
  );

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

  // Utiliser les couleurs passées en props pour le gradient
  const getGradientStyle = () => {
    return {
      background: `linear-gradient(135deg, ${colorFrom} 0%, ${colorTo} 100%)`
    };
  };

  // Vérifier si c'est un widget avec format spécial (attestations/PV)
  const isSpecialWidget = ['urssaf', 'fiscal', 'pvRemuneration'].includes(id);

  // Handler pour le clic sur le widget
  const handleWidgetClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setShowMobileExpanded(true);
    } else if (onClick) {
      onClick();
    }
  };

  // Gérer le changement d'état d'une notification
  const toggleNotificationProcessed = (itemId: string) => {
    setProcessedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Pour les notifications en pleine largeur et widgets spéciaux, pas de Link parent
  const shouldHaveLink = !(fullWidth && id === 'notifications') && !isSpecialWidget;
  const WidgetWrapper = shouldHaveLink ? Link : 'div';
  const wrapperProps = shouldHaveLink
    ? { href: isMobile ? '#' : moduleHref, onClick: handleWidgetClick }
    : {};

  return (
    <>
    <WidgetWrapper {...wrapperProps}>
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
        className={cn(
          "relative bg-white/90 backdrop-blur-xl rounded-xl p-4 md:p-6 group border border-white/50 shadow-lg flex flex-col",
          shouldHaveLink && "cursor-pointer hover:shadow-xl",
          // Hauteur fixe pour desktop seulement, auto sur mobile
          !fullWidth && "min-h-[240px] md:h-[280px]"
        )}
        style={{
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 4px 15px rgba(0, 0, 0, 0.05)'
        }}
        onClick={shouldHaveLink ? handleWidgetClick : undefined}
      >
        {/* Header avec icône, titre et montant */}
        <div className="flex items-start justify-between pb-3 mb-3 relative">
          <div className="flex items-center gap-2">
            {/* Icône avec gradient comme dans EntrepreneurDashboardV3 */}
            <div 
              className="p-2 rounded-lg"
              style={getGradientStyle()}
            >
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
        
        {/* Liste des items - disposition différente selon fullWidth */}
        {fullWidth && id === 'notifications' ? (
          // Mode notifications : liste verticale avec actions
          <div className="divide-y divide-gray-100 max-h-[320px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {items
              .filter(item => item.label)
              .filter(item => showAllNotifications || !processedItems.includes(item.id))
              .map((item, index) => {
                const isProcessed = processedItems.includes(item.id);
                return (
                  <div 
                    key={`${id}-item-${index}`} 
                    className={cn(
                      "flex items-start justify-between gap-4 py-3 transition-all",
                      !isProcessed && "bg-blue-50/50",
                      "hover:bg-gray-50/50"
                    )}
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start gap-3">
                        {/* Case à cocher ronde */}
                        <button
                          onClick={() => toggleNotificationProcessed(item.id)}
                          className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-all",
                            isProcessed 
                              ? "bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600" 
                              : "bg-white border-gray-300 hover:border-gray-400"
                          )}
                        >
                          {isProcessed && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <div className={cn(
                            "text-sm leading-relaxed break-words",
                            !isProcessed ? "text-neutral-800 font-medium" : "text-neutral-600"
                          )}>
                            {item.label}
                          </div>
                          {item.date && (
                            <div className="text-xs text-neutral-500 mt-1">
                              {item.date}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {item.action && (
                        <Link 
                          href={item.action}
                          className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap",
                            !isProcessed 
                              ? "text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
                              : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                          )}
                        >
                          {item.actionLabel || item.value}
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            
            {/* Message si aucune notification non traitée */}
            {!showAllNotifications && items.filter(item => !processedItems.includes(item.id)).length === 0 && (
              <div className="py-8 text-center">
                <div className="text-sm text-gray-500">
                  Toutes les notifications ont été traitées
                </div>
                <button
                  onClick={() => setShowAllNotifications(true)}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Voir toutes les notifications
                </button>
              </div>
            )}
          </div>
        ) : isSpecialWidget ? (
          // Mode spécial pour attestations et PV
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="space-y-2">
              {items.filter(item => item.isSpecialFormat).map((item) => (
                <div key={item.id} className="space-y-2">
                  <p className={cn(
                    "text-sm text-neutral-700 leading-snug",
                    "line-clamp-3 md:line-clamp-none"
                  )}>
                    {item.label}
                  </p>
                  {item.action && (
                    <Link 
                      href={item.action}
                      className="inline-flex items-center gap-2 px-3 py-2 text-xs md:text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg hover:from-violet-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg w-full md:w-auto justify-center md:justify-start"
                    >
                      {item.actionLabel || item.value}
                      <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                    </Link>
                  )}
                </div>
              ))}
            
            </div>
            {/* Lien vers la dernière attestation */}
            <div className="mt-auto">
              {items.filter(item => item.isSecondary).map((item) => (
                <div key={item.id} className="pt-2 border-t border-gray-100">
                  <Link 
                    href={item.action || '#'}
                    className="flex items-center justify-between text-xs text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <span className="truncate">{item.label}</span>
                    <span className="text-purple-600 font-medium flex-shrink-0 ml-2">{item.actionLabel}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : fullWidth ? (
          // Mode pleine largeur : affichage horizontal
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-3">
            {items.map((item, index) => (
              <div key={`${id}-item-${index}`} className="bg-white/50 rounded-lg p-3 border border-white/20">
                {item.label ? (
                  <div className="space-y-1">
                    <div className="text-xs text-neutral-600 line-clamp-2">
                      {item.label}
                    </div>
                    <div className={cn(
                      "text-sm font-semibold",
                      item.trend === 'up' && "text-green-600",
                      item.trend === 'down' && "text-red-600",
                      (!item.trend || item.trend === 'stable') && "text-neutral-700"
                    )}>
                      {typeof item.value === 'number' 
                        ? new Intl.NumberFormat('fr-FR').format(item.value)
                        : item.value
                      }
                    </div>
                  </div>
                ) : (
                  <div className="h-12" />
                )}
              </div>
            ))}
          </div>
        ) : (
          // Mode normal : affichage vertical
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-1">
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
          </div>
        )}
        
        {/* Footer avec légende pour le widget banque et boutons */}
        {(fullWidth && id === 'notifications') ? (
          // Footer spécial pour les notifications
          <div className="flex items-center justify-between mt-3">
            <div className="text-xs text-gray-500">
              {showAllNotifications 
                ? `${items.length} notifications au total`
                : `${items.filter(item => !processedItems.includes(item.id)).length} non traitées`
              }
            </div>
            <button 
              onClick={() => setShowAllNotifications(!showAllNotifications)}
              className="px-3 py-1 rounded-full text-xs font-medium text-white transition-all hover:shadow-md hover:scale-105 flex items-center gap-1"
              style={{
                background: '#FAA016',
                boxShadow: '0 2px 8px rgba(250, 160, 22, 0.3)'
              }}
            >
              {showAllNotifications ? 'Voir -' : 'Voir +'}
            </button>
          </div>
        ) : (
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
        )}
      </motion.div>
    </WidgetWrapper>
    
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