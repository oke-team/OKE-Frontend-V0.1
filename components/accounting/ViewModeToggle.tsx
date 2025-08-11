'use client';

import React, { memo } from 'react';
import { Download } from 'lucide-react';

interface ViewModeToggleProps {
  viewMode: 'timeline' | 'list';
  onViewModeChange: (mode: 'timeline' | 'list') => void;
}

const ViewModeToggle = memo<ViewModeToggleProps>(({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <button
          onClick={() => onViewModeChange('timeline')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'timeline' 
              ? 'bg-primary-100 text-primary-700' 
              : 'bg-white text-neutral-600 hover:bg-neutral-50'
          }`}
        >
          Vue chronologique
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'list' 
              ? 'bg-primary-100 text-primary-700' 
              : 'bg-white text-neutral-600 hover:bg-neutral-50'
          }`}
        >
          Vue liste
        </button>
      </div>
      
      <button className="p-2 bg-white rounded-lg hover:bg-neutral-50">
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
});

ViewModeToggle.displayName = 'ViewModeToggle';

export default ViewModeToggle;