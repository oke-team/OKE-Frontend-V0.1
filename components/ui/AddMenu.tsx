'use client';

import React, { useState, useRef, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getModuleAddConfig, type AddMenuItem } from '@/lib/add-menu-config';
import { usePathname } from 'next/navigation';

interface AddMenuProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLElement>;
}

export default function AddMenu({ isOpen, onClose, anchorRef }: AddMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Obtenir le module actuel depuis l'URL
  const currentModule = pathname?.split('/')[1] || 'dashboard';
  const moduleConfig = getModuleAddConfig(currentModule);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        anchorRef?.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  const handleItemClick = (item: AddMenuItem, action?: 'camera' | 'file') => {
    setSelectedItem(item.id);
    
    // Gestion spéciale pour "Nouveau compte bancaire"
    if (item.id === 'new-bank-account') {
      const actionText = action === 'file' ? 'Connexion manuelle' : 'Synchronisation automatique';
      const message = `🏦 CONNEXION BANCAIRE - Bridge API\n\n` +
        `${actionText}\n` +
        `🔒 Connexion sécurisée à votre banque\n` +
        `📊 Synchronisation automatique des transactions\n` +
        `⚡ Temps réel via Bridge by Bankin'\n\n` +
        `• Plus de 300 banques françaises supportées\n` +
        `• Conformité DSP2 et Open Banking\n` +
        `• Chiffrement bancaire bout-en-bout\n\n` +
        `➡️ Redirection vers l'interface Bridge...`;
      
      alert(message);
      setTimeout(() => {
        setSelectedItem(null);
        onClose();
      }, 500);
      return;
    }
    
    // Message contextuel selon le module et l'action
    let message = `${currentModule.toUpperCase()} - ${item.label}\n\n`;
    
    if (action === 'camera') {
      message += `📸 Ouverture de l'appareil photo...\n\n`;
    } else if (action === 'file') {
      message += `📁 Sélection de fichier...\n\n`;
    }
    
    if (item.acceptedFormats && item.acceptedFormats.length > 0) {
      message += `Formats acceptés: ${item.acceptedFormats.join(', ')}\n`;
    }
    
    message += `\n${item.description}`;
    
    alert(message);
    
    setTimeout(() => {
      setSelectedItem(null);
      onClose();
    }, 300);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const fileNames = files.map(f => f.name).join(', ');
      alert(`Fichiers déposés: ${fileNames}\n\nTraitement intelligent en cours...`);
      setTimeout(() => onClose(), 1000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "fixed z-[70]",
              isMobile 
                ? "bottom-20 left-3 right-3" 
                : "bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl",
              "p-4",
              "bg-white/95 dark:bg-gray-900/95",
              "backdrop-blur-2xl",
              "rounded-2xl",
              "border border-white/20",
              "shadow-2xl shadow-black/20",
              isMobile ? "max-h-[70vh]" : "max-h-[80vh]",
              "overflow-y-auto"
            )}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {moduleConfig.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {moduleConfig.description}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            {/* Effet de brillance */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />


            {/* Grid d'options */}
            <div className="grid grid-cols-1 gap-3">
              {moduleConfig.items.map((item, index) => {
                const Icon = item.icon;
                // Ajouter un séparateur après les options communes
                const isLastCommon = item.isCommon && 
                  index < moduleConfig.items.length - 1 && 
                  !moduleConfig.items[index + 1].isCommon;
                
                // Sur mobile, afficher avec boutons photo/fichier
                if (isMobile && item.acceptedFormats) {
                  return (
                    <React.Fragment key={item.id}>
                      <div
                      className={cn(
                        "rounded-xl overflow-hidden",
                        "bg-white dark:bg-gray-800",
                        "border border-gray-200 dark:border-gray-700",
                        selectedItem === item.id && "ring-2 ring-secondary",
                        item.isHighlighted && "ring-2 ring-blue-500 shadow-lg shadow-blue-500/25 border-blue-300"
                      )}
                    >
                      {/* Header avec info de l'item */}
                      <div className="p-3 pb-2 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2.5 rounded-lg flex-shrink-0 relative",
                            `bg-gradient-to-br ${item.color}`,
                            "shadow-sm"
                          )}>
                            <Icon size={20} className="text-white" />
                            {item.isHighlighted && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {item.label}
                              </p>
                              {item.isHighlighted && (
                                <span className="px-1.5 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm animate-pulse">
                                  TOP
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Boutons d'action - Plus grands et accessibles */}
                      <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
                        <motion.button
                          onClick={() => handleItemClick(item, 'camera')}
                          className={cn(
                            "py-3 px-4",
                            "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
                            "hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30",
                            "transition-all duration-200",
                            "flex flex-col items-center gap-1",
                            "active:bg-blue-200"
                          )}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Camera size={22} className="text-blue-600 dark:text-blue-400" />
                          <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                            Photo
                          </span>
                        </motion.button>
                        
                        <motion.button
                          onClick={() => handleItemClick(item, 'file')}
                          className={cn(
                            "py-3 px-4",
                            "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
                            "hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30",
                            "transition-all duration-200",
                            "flex flex-col items-center gap-1",
                            "active:bg-purple-200"
                          )}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Upload size={22} className="text-purple-600 dark:text-purple-400" />
                          <span className="text-xs font-medium text-purple-700 dark:text-purple-300">
                            Fichier
                          </span>
                        </motion.button>
                      </div>
                    </div>
                    {isLastCommon && (
                      <div className="flex items-center gap-3 my-2 px-4">
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                        <span className="text-xs text-gray-500 font-medium">Options spécifiques</span>
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                      </div>
                    )}
                  </React.Fragment>
                );
                }
                
                // Desktop/Tablette - avec boutons import et drag & drop
                return (
                  <React.Fragment key={item.id}>
                    <motion.div
                    className={cn(
                      "rounded-xl",
                      "bg-white dark:bg-gray-800",
                      "border border-gray-200 dark:border-gray-700",
                      selectedItem === item.id && "ring-2 ring-secondary",
                      "hover:shadow-lg transition-all duration-200",
                      "flex flex-col sm:flex-row",
                      item.isHighlighted && "ring-2 ring-blue-500 shadow-lg shadow-blue-500/25 border-blue-300 bg-gradient-to-r from-blue-50/50 to-cyan-50/50"
                    )}
                    animate={item.isHighlighted ? {
                      boxShadow: [
                        "0 4px 20px rgba(59, 130, 246, 0.15)",
                        "0 4px 30px rgba(59, 130, 246, 0.25)",
                        "0 4px 20px rgba(59, 130, 246, 0.15)"
                      ]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: item.isHighlighted ? Infinity : 0,
                      repeatType: "reverse"
                    }}
                  >
                    {/* Info de l'item */}
                    <div className="flex-1 p-4 flex items-center gap-3">
                      <div className={cn(
                        "p-2.5 rounded-lg flex-shrink-0 relative",
                        `bg-gradient-to-br ${item.color}`,
                        "shadow-sm"
                      )}>
                        <Icon size={20} className="text-white" />
                        {item.isHighlighted && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {item.label}
                          </p>
                          {item.isHighlighted && (
                            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm animate-pulse">
                              AUTOMATISÉ
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {item.description}
                        </p>
                        {item.hint && (
                          <p className="text-xs text-gray-500 mt-0.5 italic">
                            {item.hint}
                          </p>
                        )}
                        {item.acceptedFormats && (
                          <p className="text-xs text-gray-400 mt-1">
                            Formats : {item.acceptedFormats.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions - Import ou Drag & Drop */}
                    {item.acceptedFormats ? (
                      <div className="flex sm:w-80 border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700">
                        {/* Bouton Import */}
                        <motion.button
                          onClick={() => handleItemClick(item, 'file')}
                          className={cn(
                            "flex-1 py-3 px-4",
                            "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
                            "hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30",
                            "transition-all duration-200",
                            "flex items-center justify-center gap-2"
                          )}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Upload size={18} className="text-blue-600 dark:text-blue-400" />
                          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                            Importer
                          </span>
                        </motion.button>
                        
                        {/* Zone Drag & Drop */}
                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedItem(item.id);
                          }}
                          onDragLeave={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedItem(null);
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            // Gestion spéciale pour nouveau compte bancaire
                            if (item.id === 'new-bank-account') {
                              const message = `🏦 CONNEXION BANCAIRE - Bridge API\n\n` +
                                `Synchronisation par glisser-déposer\n` +
                                `🔒 Connexion sécurisée à votre banque\n` +
                                `📊 Synchronisation automatique des transactions\n` +
                                `⚡ Temps réel via Bridge by Bankin'\n\n` +
                                `➡️ Redirection vers l'interface Bridge...`;
                              
                              alert(message);
                              setTimeout(() => {
                                setSelectedItem(null);
                                onClose();
                              }, 500);
                              return;
                            }
                            
                            const files = Array.from(e.dataTransfer.files);
                            if (files.length > 0) {
                              const fileNames = files.map(f => f.name).join(', ');
                              alert(`${item.label}\n\nFichiers déposés: ${fileNames}`);
                              setTimeout(() => {
                                setSelectedItem(null);
                                onClose();
                              }, 500);
                            }
                          }}
                          className={cn(
                            "flex-1 py-3 px-4",
                            "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
                            "hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30",
                            "transition-all duration-200",
                            "flex items-center justify-center gap-2",
                            "cursor-pointer group",
                            selectedItem === item.id && "from-purple-100 to-pink-100 scale-[1.02]"
                          )}
                        >
                          <div className="w-4 h-4 border-2 border-dashed border-purple-400 rounded group-hover:border-purple-600" />
                          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                            Glisser ici
                          </span>
                        </div>
                      </div>
                    ) : (
                      <motion.button
                        onClick={() => handleItemClick(item)}
                        className={cn(
                          "w-full py-3 px-4",
                          "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20",
                          "hover:from-gray-100 hover:to-slate-100 dark:hover:from-gray-900/30 dark:hover:to-slate-900/30",
                          "transition-all duration-200",
                          "text-sm font-medium text-gray-700 dark:text-gray-300"
                        )}
                        whileTap={{ scale: 0.98 }}
                      >
                        Créer
                      </motion.button>
                    )}
                  </motion.div>
                  {isLastCommon && (
                    <div className="flex items-center gap-3 my-2 px-4">
                      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                      <span className="text-xs text-gray-500 font-medium">Options spécifiques au module</span>
                      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                    </div>
                  )}
                </React.Fragment>
                );
              })}
            </div>

            {/* Quick tip */}
            <div className="mt-4 p-3 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg">
              <p className="text-xs text-purple-700 dark:text-purple-300 text-center">
                {isMobile 
                  ? "💡 Astuce : Utilisez les boutons 📸 et 📁 pour importer vos documents"
                  : "💡 Astuce : Glissez vos fichiers directement sur chaque carte ou utilisez le bouton Importer"
                }
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}