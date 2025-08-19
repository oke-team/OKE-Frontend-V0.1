'use client';

import React from 'react';
import { motion } from 'framer-motion';
import UnifiedWidgetCard from './UnifiedWidgetCard';
import { widgetConfigs, defaultWidgetOrder, getWidgetConfig } from '@/lib/dashboard/widget-data';

export default function DashboardEnriched() {
  const widgetOrder = defaultWidgetOrder;

  return (
    <div className="w-full">
      {/* Grille de widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgetOrder.map((widgetId, index) => {
          const config = getWidgetConfig(widgetId);
          return (
            <motion.div
              key={widgetId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <UnifiedWidgetCard {...config} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}