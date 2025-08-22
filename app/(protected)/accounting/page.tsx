'use client';

import React from 'react';
import AccountingModule from '@/components/accounting/AccountingModule';
import SimpleAccountingView from '@/components/accounting/SimpleAccountingView';
import { useExpertMode } from '@/contexts/ExpertModeContext';

export default function AccountingPage() {
  const { expertMode } = useExpertMode();
  
  return (
    <>
      {expertMode ? (
        <div className="w-full h-[calc(100vh-64px-96px)] -mx-4 sm:-mx-6 lg:-mx-8 -my-6 px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
          <AccountingModule />
        </div>
      ) : (
        <SimpleAccountingView />
      )}
    </>
  );
}