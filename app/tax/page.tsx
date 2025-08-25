'use client';

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TaxModule from '@/components/tax/TaxModule';
import { useExpertMode } from '@/contexts/ExpertModeContext';

export default function TaxPage() {
  const { expertMode } = useExpertMode();
  
  return (
    <AppLayout>
      <div className="w-full h-[calc(100vh-64px-96px)] px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
        <TaxModule expertMode={expertMode} />
      </div>
    </AppLayout>
  );
}