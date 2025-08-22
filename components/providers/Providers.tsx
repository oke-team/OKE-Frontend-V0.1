'use client';

import React from 'react';
import { StoreProvider } from '@/lib/store/StoreProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { ExpertModeProvider } from '@/contexts/ExpertModeContext';
import { PeriodProvider } from '@/contexts/PeriodContext';
import { SelectionProvider } from '@/contexts/SelectionContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import Onboarding from '@/components/ui/Onboarding';
import TransitionNotification from '@/components/ui/TransitionNotification';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <AuthProvider>
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
      </AuthProvider>
    </StoreProvider>
  );
}
