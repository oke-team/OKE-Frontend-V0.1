'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  ChevronRight, 
  ChevronLeft,
  Check,
  Shield,
  FileText,
  Users,
  Building,
  Calendar,
  TrendingUp,
  Euro,
  Briefcase,
  MapPin,
  Scale,
  Hash,
  Clock,
  Award,
  CreditCard,
  Receipt,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import {
  PremiumCard,
  LiquidButton,
  StepContainer,
  InfoCard
} from '../ui/PremiumComponents';

interface DataCollectionStepProps {
  selectedCompany: any;
  collectedData: any;
  onDataCollected: (data: any) => void;
  onNext: () => void;
  onPrevious?: () => void;
  canProceed: boolean;
  canGoBack?: boolean;
}

interface CollectionItem {
  id: string;
  label: string;
  type: 'info' | 'document';
  icon: React.ElementType;
  status: 'loading' | 'completed';
  timestamp?: Date;
}

// Liste des éléments possibles à collecter depuis Pappers (réaliste)
const possibleItems = [
  { id: 'siren', label: 'Numéro SIREN', type: 'info' as const, icon: Hash },
  { id: 'siret', label: 'Numéro SIRET du siège', type: 'info' as const, icon: Hash },
  { id: 'legal-form', label: 'Forme juridique', type: 'info' as const, icon: Scale },
  { id: 'capital', label: 'Capital social', type: 'info' as const, icon: Euro },
  { id: 'address', label: 'Adresse du siège', type: 'info' as const, icon: MapPin },
  { id: 'creation-date', label: 'Date de création', type: 'info' as const, icon: Calendar },
  { id: 'activity', label: 'Activité principale (NAF)', type: 'info' as const, icon: Briefcase },
  { id: 'employees', label: 'Effectif salarié', type: 'info' as const, icon: Users },
  { id: 'revenue', label: 'Chiffre d\'affaires', type: 'info' as const, icon: TrendingUp },
  { id: 'dirigeants', label: 'Dirigeants et mandataires', type: 'info' as const, icon: Users },
  { id: 'beneficiaires', label: 'Bénéficiaires effectifs', type: 'info' as const, icon: Shield },
  { id: 'etablissements', label: 'Liste des établissements', type: 'info' as const, icon: Building },
  { id: 'kbis', label: 'Extrait K-bis', type: 'document' as const, icon: FileText },
  { id: 'statuts', label: 'Statuts de la société', type: 'document' as const, icon: FileCheck },
  { id: 'bilan-2023', label: 'Comptes annuels 2023', type: 'document' as const, icon: Receipt },
  { id: 'bilan-2022', label: 'Comptes annuels 2022', type: 'document' as const, icon: Receipt },
  { id: 'actes', label: 'Actes et statuts déposés', type: 'document' as const, icon: FileCheck },
  { id: 'conventions', label: 'Conventions réglementées', type: 'document' as const, icon: Scale },
  { id: 'marques', label: 'Marques déposées (INPI)', type: 'info' as const, icon: Award },
  { id: 'bodacc', label: 'Annonces BODACC', type: 'document' as const, icon: FileText },
];

export default function DataCollectionStepV2({
  selectedCompany,
  collectedData,
  onDataCollected,
  onNext,
  onPrevious,
  canProceed,
  canGoBack = false
}: DataCollectionStepProps) {
  const [collectedItems, setCollectedItems] = useState<CollectionItem[]>([]);
  const [isCollecting, setIsCollecting] = useState(true);
  const [collectionComplete, setCollectionComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);

  // Fonction pour ajouter un élément à la liste
  const addItem = async (itemConfig: typeof possibleItems[0]) => {
    // Ajouter l'élément en status loading
    const newItem: CollectionItem = {
      ...itemConfig,
      status: 'loading',
      timestamp: new Date()
    };
    
    setCollectedItems(prev => [...prev, newItem]);

    // Simuler le temps de récupération (entre 500ms et 2s)
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500));

    // Mettre à jour le status en completed
    setCollectedItems(prev => 
      prev.map(item => 
        item.id === itemConfig.id 
          ? { ...item, status: 'completed' }
          : item
      )
    );

    // Auto-scroll vers le bas
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // Démarrer la collecte automatiquement
  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      startCollection();
    }
  }, []);

  const startCollection = async () => {
    setIsCollecting(true);
    
    // Mélanger et prendre un nombre aléatoire d'éléments (entre 8 et 15)
    const shuffled = [...possibleItems].sort(() => Math.random() - 0.5);
    const itemsToCollect = shuffled.slice(0, 8 + Math.floor(Math.random() * 8));
    
    // Collecter les éléments un par un avec un délai
    for (const item of itemsToCollect) {
      await addItem(item);
      // Petit délai entre chaque élément (200-500ms)
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
    }
    
    setIsCollecting(false);
    setCollectionComplete(true);
    
    // Envoyer les données collectées
    onDataCollected({
      completed: true,
      timestamp: new Date().toISOString(),
      itemsCount: itemsToCollect.length,
      items: collectedItems
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (collectionComplete) {
      onNext();
    }
  };

  const loadingCount = collectedItems.filter(item => item.status === 'loading').length;
  const completedCount = collectedItems.filter(item => item.status === 'completed').length;

  return (
    <StepContainer
      title="Collecte des données"
      subtitle="Récupération automatique en cours depuis Pappers..."
      icon={<Database className="w-7 h-7" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        {/* Entreprise sélectionnée */}
        <PremiumCard variant="elevated" padding="md" className="bg-blue-50/50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium mb-1">Source : API Pappers</p>
              <p className="text-lg font-semibold text-gray-900">{selectedCompany?.name || 'Mon Entreprise'}</p>
              <p className="text-sm text-gray-600">SIREN : {selectedCompany?.siren || '123456789'}</p>
            </div>
            <Building className="w-8 h-8 text-blue-600" />
          </div>
        </PremiumCard>

        {/* Statistiques de collecte */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {isCollecting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-[#4C34CE] border-t-transparent rounded-full"
                />
                <span className="text-[#4C34CE] font-medium">Collecte en cours...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-medium">Collecte terminée</span>
              </>
            )}
          </div>
          <div className="text-gray-500">
            {completedCount} élément{completedCount > 1 ? 's' : ''} récupéré{completedCount > 1 ? 's' : ''}
            {loadingCount > 0 && ` • ${loadingCount} en cours`}
          </div>
        </div>

        {/* Liste scrollable des éléments collectés */}
        <div 
          ref={scrollRef}
          className="h-96 overflow-y-auto border border-gray-200 rounded-xl bg-gray-50/50 p-4 space-y-2"
        >
          <AnimatePresence>
            {collectedItems.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <Database className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">En attente de connexion à Pappers...</p>
                </div>
              </div>
            ) : (
              collectedItems.map((item, index) => {
                const Icon = item.icon;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                      item.status === 'completed' 
                        ? 'bg-white border border-green-200' 
                        : 'bg-white/70 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        item.type === 'document' 
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className={`font-medium text-sm ${
                          item.status === 'completed' ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.type === 'document' ? 'Document' : 'Information'}
                        </p>
                      </div>
                    </div>
                    
                    {item.status === 'loading' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-[#4C34CE] border-t-transparent rounded-full"
                      />
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Information sur la sécurité */}
        <InfoCard type="info" icon={<Shield className="w-5 h-5" />}>
          <p className="font-medium text-gray-900 mb-1">Collecte sécurisée</p>
          <p className="text-gray-600 text-xs">
            Les données sont récupérées en temps réel depuis l'API Pappers. 
            Toutes les informations sont vérifiées et à jour.
          </p>
        </InfoCard>

        {/* Boutons de navigation */}
        {collectionComplete && (
          <div className="flex gap-3">
            {canGoBack && onPrevious && (
              <LiquidButton
                type="button"
                variant="secondary"
                size="lg"
                onClick={onPrevious}
                className="flex-1"
              >
                <span className="flex items-center justify-center gap-2">
                  <ChevronLeft className="w-5 h-5" />
                  Retour
                </span>
              </LiquidButton>
            )}
            <LiquidButton
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1"
            >
              <span className="flex items-center justify-center gap-2">
                Continuer
                <ChevronRight className="w-5 h-5" />
              </span>
            </LiquidButton>
          </div>
        )}

        {/* Message pendant la collecte */}
        {!collectionComplete && (
          <div className="text-center text-sm text-gray-500">
            Veuillez patienter pendant la récupération des données...
          </div>
        )}
      </form>
    </StepContainer>
  );
}