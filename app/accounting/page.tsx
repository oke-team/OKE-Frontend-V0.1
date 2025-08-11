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
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {expertMode ? (
          <AccountingModule />
        ) : (
          <SimpleAccountingView />
        )}
      </div>
    </AppLayout>
  );
}