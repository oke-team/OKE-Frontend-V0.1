'use client';

import React from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Settings, Plus, X, RotateCcw, GripVertical, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getWidgetConfig } from '@/lib/dashboard/widget-data';

interface WidgetManagerProps {
  isOpen: boolean;
  onClose: () => void;
  activeWidgets: string[];
  availableWidgets: string[];
  onAddWidget: (widgetId: string) => void;
  onRemoveWidget: (widgetId: string) => void;
  onResetToDefault: () => void;
  onReorderWidgets?: (newOrder: string[]) => void;
}

export default function WidgetManager({
  isOpen,
  onClose,
  activeWidgets,
  availableWidgets,
  onAddWidget,
  onRemoveWidget,
  onResetToDefault,
  onReorderWidgets
}: WidgetManagerProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100]"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-white via-white to-purple-50 shadow-2xl z-[101] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-violet-500 to-purple-600 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Gérer les widgets</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6">
              {/* Widgets actifs */}
              <div>
                <h3 className="text-sm font-semibold text-violet-700 mb-3 uppercase tracking-wider">Widgets actifs</h3>
                {onReorderWidgets ? (
                  <Reorder.Group 
                    axis="y" 
                    values={activeWidgets} 
                    onReorder={onReorderWidgets}
                    className="space-y-2"
                  >
                    {activeWidgets.map((widgetId) => {
                      const config = getWidgetConfig(widgetId);
                      const Icon = config.icon;
                      return (
                        <Reorder.Item 
                          key={widgetId} 
                          value={widgetId}
                          className="list-none"
                        >
                          <motion.div
                            layout
                            className="flex items-center justify-between p-3 bg-white rounded-xl border border-purple-100 cursor-move shadow-sm hover:shadow-md transition-shadow"
                            whileDrag={{ scale: 1.02, opacity: 0.8 }}
                          >
                            <div className="flex items-center gap-3">
                              <GripVertical className="w-4 h-4 text-gray-400" />
                              <div className={cn(
                                "p-2 rounded-lg",
                                `bg-gradient-to-br ${config.colorFrom} ${config.colorTo}`
                              )}>
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{config.title}</p>
                                <p className="text-xs text-gray-500">{config.subtitle}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => onRemoveWidget(widgetId)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                            >
                              <EyeOff className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                            </button>
                          </motion.div>
                        </Reorder.Item>
                      );
                    })}
                  </Reorder.Group>
                ) : (
                  <div className="space-y-2">
                    {activeWidgets.map((widgetId) => {
                      const config = getWidgetConfig(widgetId);
                      const Icon = config.icon;
                      return (
                        <motion.div
                          key={widgetId}
                          layout
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                            <div className={cn(
                              "p-2 rounded-lg",
                              `bg-gradient-to-br ${config.colorFrom} ${config.colorTo}`
                            )}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{config.title}</p>
                              <p className="text-xs text-gray-500">{config.subtitle}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => onRemoveWidget(widgetId)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            <EyeOff className="w-4 h-4 text-gray-500" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
                
                {activeWidgets.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Aucun widget actif. Ajoutez-en depuis la liste ci-dessous.
                  </p>
                )}
              </div>

              {/* Widgets disponibles */}
              <div>
                <h3 className="text-sm font-semibold text-violet-700 mb-3 uppercase tracking-wider">Widgets disponibles</h3>
                <div className="space-y-2">
                  {availableWidgets.map((widgetId) => {
                    const config = getWidgetConfig(widgetId);
                    const Icon = config.icon;
                    return (
                      <motion.div
                        key={widgetId}
                        layout
                        className="flex items-center justify-between p-3 bg-white/80 rounded-xl border border-gray-200 hover:border-purple-200 transition-all hover:shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-lg opacity-60",
                            `bg-gradient-to-br ${config.colorFrom} ${config.colorTo}`
                          )}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{config.title}</p>
                            <p className="text-xs text-gray-500">{config.subtitle}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => onAddWidget(widgetId)}
                          className="p-2 hover:bg-green-50 rounded-lg transition-colors group"
                        >
                          <Eye className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors" />
                        </button>
                      </motion.div>
                    );
                  })}
                  
                  {availableWidgets.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Tous les widgets sont déjà actifs.
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-purple-100">
                <button
                  onClick={onResetToDefault}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-medium rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-sm font-semibold">Réinitialiser par défaut</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}