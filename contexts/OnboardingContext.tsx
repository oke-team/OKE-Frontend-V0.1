'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Import dynamique du modal pour éviter les problèmes SSR
const OnboardingModal = dynamic(
  () => import('@/components/onboarding/OnboardingModal'),
  { ssr: false }
);

interface OnboardingContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  hasActiveSession: () => boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const openModal = useCallback(() => {
    console.log('Opening onboarding modal');
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    console.log('Closing onboarding modal');
    setIsOpen(false);
  }, []);

  const hasActiveSession = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const data = localStorage.getItem('onboardingData');
    return !!data;
  }, []);

  const handleSuccess = useCallback(() => {
    console.log('Onboarding completed successfully!');
    closeModal();
    // Rediriger vers le dashboard après succès
    router.push('/dashboard');
  }, [closeModal, router]);

  return (
    <OnboardingContext.Provider value={{ isOpen, openModal, closeModal, hasActiveSession }}>
      {children}
      
      {/* Background image et modal */}
      {isOpen && (
        <>
          {/* Image de fond fixe */}
          <div className="fixed inset-0 z-40">
            <Image
              src="/login.jpg"
              alt=""
              fill
              priority
              quality={100}
              className="object-cover object-center md:object-[20%_center] lg:object-[30%_center]"
              sizes="100vw"
            />
          </div>
          
          {/* Modal par-dessus l'image */}
          <div className="relative z-50">
            <OnboardingModal
              isOpen={isOpen}
              onClose={closeModal}
              onSuccess={handleSuccess}
            />
          </div>
        </>
      )}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}