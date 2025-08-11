'use client';

import React from 'react';
import { ExpertModeProvider } from '@/contexts/ExpertModeContext';
import Onboarding from '@/components/ui/Onboarding';
import TransitionNotification from '@/components/ui/TransitionNotification';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ExpertModeProvider>
      {children}
      <Onboarding />
      <TransitionNotification />
    </ExpertModeProvider>
  );
}