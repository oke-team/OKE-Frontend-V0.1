'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { DrillDownProvider } from '@/contexts/DrillDownContext';

// Import dynamique pour éviter les problèmes d'hydratation
const EntrepreneurDashboardV2 = dynamic(
  () => import('./EntrepreneurDashboardV2').then(mod => mod.EntrepreneurDashboardV2),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full max-w-[1400px] mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-12 bg-neutral-200 rounded-xl mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-neutral-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }
);

interface EntrepreneurDashboardWrapperProps {
  data?: Record<string, any>;
}

export const EntrepreneurDashboardWrapper: React.FC<EntrepreneurDashboardWrapperProps> = ({ data }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full max-w-[1400px] mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-12 bg-neutral-200 rounded-xl mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-neutral-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <DrillDownProvider>
      <EntrepreneurDashboardV2 data={data} />
    </DrillDownProvider>
  );
};