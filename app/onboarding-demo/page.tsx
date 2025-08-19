'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import OnboardingModal from '@/components/onboarding/OnboardingModal';

export default function OnboardingDemoPage() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fond avec gradient animé style OKÉ */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4C34CE] via-[#7B5CDB] to-[#FAA016]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse" />
        
        {/* Motifs géométriques décoratifs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#FAA016]/10 rounded-full blur-3xl translate-x-1/3" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#4C34CE]/10 rounded-full blur-3xl translate-y-1/2" />
      </div>
      
      {/* Overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
      
      {/* Contenu */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {!modalOpen && (
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Tunnel d'Onboarding OKÉ
            </h1>
            <p className="text-white/90 text-lg drop-shadow">
              Démonstration du processus de création de compte
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-3 bg-[#FAA016] text-white font-medium rounded-xl hover:bg-[#E8941A] transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ouvrir le tunnel d'onboarding
            </button>
          </div>
        )}

        <OnboardingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            console.log('Onboarding terminé avec succès!');
            setModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}