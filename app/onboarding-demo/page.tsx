'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import OnboardingModal from '@/components/onboarding/OnboardingModal';

export default function OnboardingDemoPage() {
  const [modalOpen, setModalOpen] = useState(true);

  // Au chargement, toujours préparer les données comme si on venait de la homepage
  React.useEffect(() => {
    const onboardingData = {
      personalInfo: {
        prenom: 'Jean',
        nom: 'Dupont',
        email: 'jean.dupont@entreprise.fr',
        password: 'MotDePasse123!',
        telephone: '06 12 34 56 78'
      },
      currentStep: 1 // Commencer à l'étape 2 (Pays)
    };
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Image de fond de la homepage - nette et vibrante SANS overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/login.jpg"
          alt=""
          fill
          priority
          quality={100}
          className="object-cover object-center md:object-[20%_center] lg:object-[30%_center]"
          sizes="100vw"
        />
        {/* PAS d'overlay pour garder l'image lumineuse et vibrante */}
      </div>
      
      {/* Contenu - Modal toujours ouvert */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">

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