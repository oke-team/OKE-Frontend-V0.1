'use client';

import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Settings } from 'lucide-react';
import UnifiedWidgetCard from './UnifiedWidgetCard';
import WidgetManager from './WidgetManager';
import { getWidgetConfig } from '@/lib/dashboard/widget-data';
import { useWidgetManager } from '@/hooks/useWidgetManager';

export default function DashboardEnriched() {
  const {
    activeWidgets,
    availableWidgets,
    isManaging,
    setIsManaging,
    addWidget,
    removeWidget,
    reorderWidgets,
    resetToDefault
  } = useWidgetManager();

  const [showManager, setShowManager] = useState(false);
  
  // Widget Notifications toujours visible
  const notificationsConfig = getWidgetConfig('notifications');

  return (
    <div className="w-full space-y-6">
      {/* Zone 1 : Widget Notifications en pleine largeur */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <UnifiedWidgetCard {...notificationsConfig} fullWidth />
      </motion.div>
      
      {/* Bouton de gestion des widgets */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowManager(true)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Personnaliser</span>
        </button>
      </div>
      
      {/* Zone 2 : Widgets personnalisables avec drag & drop */}
      {isManaging ? (
        <Reorder.Group 
          axis="y" 
          values={activeWidgets} 
          onReorder={reorderWidgets}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {activeWidgets.map((widgetId) => {
            const config = getWidgetConfig(widgetId);
            return (
              <Reorder.Item key={widgetId} value={widgetId}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="cursor-move"
                  whileDrag={{ scale: 1.05 }}
                >
                  <UnifiedWidgetCard {...config} />
                </motion.div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeWidgets.map((widgetId, index) => {
            const config = getWidgetConfig(widgetId);
            return (
              <motion.div
                key={widgetId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (index + 1) * 0.05 }}
              >
                <UnifiedWidgetCard {...config} />
              </motion.div>
            );
          })}
        </div>
      )}
      
      {/* Gestionnaire de widgets */}
      <WidgetManager
        isOpen={showManager}
        onClose={() => setShowManager(false)}
        activeWidgets={activeWidgets}
        availableWidgets={availableWidgets}
        onAddWidget={addWidget}
        onRemoveWidget={removeWidget}
        onResetToDefault={resetToDefault}
        onReorderWidgets={reorderWidgets}
      />
    </div>
  );
}