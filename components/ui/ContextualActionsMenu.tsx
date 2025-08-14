'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, GitMerge, CheckCircle, FileSpreadsheet, Archive, Calendar, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { PeriodSelectorMobile } from '@/components/ui/PeriodSelectorMobile';
import { useExpertMode } from '@/contexts/ExpertModeContext';

interface ContextualActionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  onLettrage?: () => void;
  onRapprochement?: () => void;
  onValidation?: () => void;
  onExport?: () => void;
  onReclassement?: () => void;
  isMobile?: boolean;
}

export const ContextualActionsMenu: React.FC<ContextualActionsMenuProps> = ({
  isOpen,
  onClose,
  selectedCount,
  onLettrage,
  onRapprochement,
  onValidation,
  onExport,
  onReclassement,
  isMobile = false
}) => {
  const pathname = usePathname();
  const { expertMode, toggleExpertMode } = useExpertMode();
  const isAccountingModule = pathname?.includes('/accounting') || pathname?.includes('/compta');
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);
  
  if (!isOpen) return null;

  const handleAction = (action: () => void | undefined) => {
    action?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200/50 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-purple-100/50 border-b border-purple-200/30">
              <p className="text-sm font-medium text-purple-900">
                {selectedCount > 0 ? (
                  <>{selectedCount} élément{selectedCount > 1 ? 's' : ''} sélectionné{selectedCount > 1 ? 's' : ''}</>
                ) : (
                  'Actions rapides'
                )}
              </p>
            </div>

            {/* Actions */}
            <div className="p-2">
              {/* Actions générales sur mobile */}
              {isMobile && (
                <>
                  {/* Mode Expert */}
                  <button
                    onClick={toggleExpertMode}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors group mb-2"
                  >
                    <div className={cn(
                      "p-1.5 rounded-lg transition-colors",
                      expertMode 
                        ? "bg-gradient-to-r from-purple-500 to-pink-500" 
                        : "bg-purple-100 group-hover:bg-purple-200"
                    )}>
                      <Sparkles className={cn(
                        "w-4 h-4",
                        expertMode ? "text-white" : "text-purple-600"
                      )} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-gray-900">
                        Mode {expertMode ? 'Expert' : 'Entrepreneur'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {expertMode 
                          ? "Interface épurée sans aide" 
                          : "Aide et explications activées"}
                      </div>
                    </div>
                  </button>
                  
                  {/* Sélecteur de période dans le module comptabilité */}
                  {isAccountingModule && (
                    <>
                      <button
                        onClick={() => setShowPeriodSelector(!showPeriodSelector)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors group mb-2"
                      >
                        <div className="p-1.5 rounded-lg bg-indigo-100 group-hover:bg-indigo-200">
                          <Calendar className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium text-gray-900">Période comptable</div>
                          <div className="text-xs text-gray-500">Sélectionner l'exercice</div>
                        </div>
                      </button>
                      
                      {showPeriodSelector && (
                        <div className="mb-2 px-3 py-2 bg-gray-50 rounded-lg">
                          <PeriodSelectorMobile size="sm" compact={false} />
                        </div>
                      )}
                    </>
                  )}
                  
                  <div className="my-2 h-px bg-gray-200/50" />
                </>
              )}
              {selectedCount > 0 && selectedCount >= 2 && (
                <button
                  onClick={() => handleAction(onLettrage)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <div className="p-1.5 rounded-lg bg-blue-100 group-hover:bg-blue-200">
                    <Link2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-gray-900">Lettrer</div>
                    <div className="text-xs text-gray-500">Rapprocher les écritures</div>
                  </div>
                </button>
              )}

              {selectedCount > 0 && (
                <button
                  onClick={() => handleAction(onRapprochement)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors group"
                >
                  <div className="p-1.5 rounded-lg bg-green-100 group-hover:bg-green-200">
                    <GitMerge className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-gray-900">Rapprocher</div>
                    <div className="text-xs text-gray-500">Avec relevé bancaire</div>
                  </div>
                </button>
              )}

              {selectedCount > 0 && (
                <button
                  onClick={() => handleAction(onValidation)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-purple-100 group-hover:bg-purple-200">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-gray-900">Valider</div>
                  <div className="text-xs text-gray-500">Marquer comme validé</div>
                </div>
                </button>
              )}

              {selectedCount > 0 && <div className="my-2 h-px bg-gray-200/50" />}

              {selectedCount > 0 && (
                <button
                  onClick={() => handleAction(onExport)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-200">
                  <FileSpreadsheet className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-gray-900">Exporter</div>
                  <div className="text-xs text-gray-500">Format Excel/CSV</div>
                </div>
                </button>
              )}

              {selectedCount > 0 && onReclassement && (
                <button
                  onClick={() => handleAction(onReclassement)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-amber-50 transition-colors group"
                >
                  <div className="p-1.5 rounded-lg bg-amber-100 group-hover:bg-amber-200">
                    <Archive className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-gray-900">Reclasser</div>
                    <div className="text-xs text-gray-500">Changer de compte</div>
                  </div>
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};