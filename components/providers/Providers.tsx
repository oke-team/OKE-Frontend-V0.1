'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ExpertModeProvider } from '@/contexts/ExpertModeContext';
import { PeriodProvider } from '@/contexts/PeriodContext';
import { SelectionProvider } from '@/contexts/SelectionContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { CabinetNavigationProvider } from '@/contexts/CabinetNavigationContext';
import Onboarding from '@/components/ui/Onboarding';
import TransitionNotification from '@/components/ui/TransitionNotification';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <ExpertModeProvider>
        <PeriodProvider>
          <SelectionProvider>
            <CabinetNavigationProvider>
              <OnboardingProvider>
                {children}
                <Onboarding />
                <TransitionNotification />
              </OnboardingProvider>
            </CabinetNavigationProvider>
          </SelectionProvider>
        </PeriodProvider>
      </ExpertModeProvider>
    </AuthProvider>
  );
}
