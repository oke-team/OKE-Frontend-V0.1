'use client';

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import AccountingModule from '@/components/accounting/AccountingModule';
import SimpleAccountingView from '@/components/accounting/SimpleAccountingView';
import { useExpertMode } from '@/contexts/ExpertModeContext';

export default function AccountingPage() {
  const { expertMode } = useExpertMode();
  
  return (
    <AppLayout>
      {expertMode ? (
        <div className="w-full h-[calc(100vh-64px-96px)] px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
          <AccountingModule />
        </div>
      ) : (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <SimpleAccountingView />
        </div>
      )}
    </AppLayout>
  );
}