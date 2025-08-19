'use client';

import React from 'react';
import { ExpertModeProvider } from '@/contexts/ExpertModeContext';
import { PeriodProvider } from '@/contexts/PeriodContext';
import { SelectionProvider } from '@/contexts/SelectionContext';
import Onboarding from '@/components/ui/Onboarding';
import TransitionNotification from '@/components/ui/TransitionNotification';
import OnboardingProvider from '@/components/onboarding/OnboardingProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ExpertModeProvider>
      <PeriodProvider>
        <SelectionProvider>
          <OnboardingProvider>
            {children}
            <Onboarding />
            <TransitionNotification />
          </OnboardingProvider>
        </SelectionProvider>
      </PeriodProvider>
    </ExpertModeProvider>
  );
}
