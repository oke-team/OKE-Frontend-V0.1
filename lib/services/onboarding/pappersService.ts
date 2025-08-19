/**
 * Service mocké pour l'API Pappers
 */

import { frenchCompanies } from '@/lib/mock-data/onboarding/frenchCompanies';
import { generatePappersResponse, type PappersCompanyDetails } from '@/lib/mock-data/onboarding/mockApiResponses';

export interface DataCollectionNotification {
  id: string;
  message: string;
  status: 'loading' | 'success' | 'error';
  timestamp: number;
  details?: string;
}

export interface CollectedCompanyData {
  basic_info: PappersCompanyDetails;
  documents_count: {
    actes: number;
    comptes_annuels: number;
    total_documents: number;
  };
  data_sources: {
    insee: boolean;
    pappers: boolean;
    inpi: boolean;
    bodacc: boolean;
  };
  collection_summary: {
    total_fields: number;
    filled_fields: number;
    completion_rate: number;
  };
}

/**
 * Simule la collecte complète des données Pappers pour une entreprise
 */
export async function collectCompanyData(
  siren: string,
  onProgress?: (notification: DataCollectionNotification) => void
): Promise<CollectedCompanyData> {
  const company = frenchCompanies.find(c => c.siren === siren);
  
  if (!company) {
    throw new Error(`Aucune entreprise trouvée avec le SIREN ${siren}`);
  }
  
  const notifications: DataCollectionNotification[] = [
    {
      id: 'insee',
      message: 'Récupération des informations INSEE...',
      status: 'loading',
      timestamp: Date.now(),
      details: 'Accès à la base Sirène'
    },
    {
      id: 'pappers',
      message: 'Collecte des données Pappers...',
      status: 'loading',
      timestamp: Date.now(),
      details: 'Informations légales et financières'
    },
    {
      id: 'documents',
      message: 'Téléchargement des documents légaux...',
      status: 'loading',
      timestamp: Date.now(),
      details: 'Statuts, actes et procès-verbaux'
    },
    {
      id: 'comptes',
      message: 'Récupération des comptes annuels...',
      status: 'loading',
      timestamp: Date.now(),
      details: 'Liasses fiscales disponibles'
    },
    {
      id: 'finalization',
      message: 'Finalisation du profil entreprise...',
      status: 'loading',
      timestamp: Date.now(),
      details: 'Consolidation des données'
    }
  ];
  
  // Simulation progressive avec notifications
  for (let i = 0; i < notifications.length; i++) {
    const notification = notifications[i];
    
    // Envoie notification de début
    onProgress?.(notification);
    
    // Simule un délai de traitement réaliste
    const delay = 1500 + Math.random() * 2000; // Entre 1.5 et 3.5 secondes
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Simulation d'erreur occasionnelle (5% de chance)
    if (Math.random() < 0.05 && i > 0) {
      const errorNotification: DataCollectionNotification = {
        ...notification,
        status: 'error',
        message: `Erreur lors de ${notification.message.toLowerCase()}`,
        details: 'Nouvelle tentative en cours...'
      };
      onProgress?.(errorNotification);
      
      // Nouvelle tentative après 1 seconde
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Notification de succès
    const successNotification: DataCollectionNotification = {
      ...notification,
      status: 'success',
      message: notification.message.replace('...', ' terminée ✓'),
      timestamp: Date.now()
    };
    onProgress?.(successNotification);
  }
  
  // Génération des données complètes
  const pappersDetails = generatePappersResponse(company);
  
  // Calcul des statistiques de collecte
  const documentsCount = {
    actes: pappersDetails.depots_actes.length,
    comptes_annuels: pappersDetails.comptes.length,
    total_documents: pappersDetails.depots_actes.length + pappersDetails.comptes.length
  };
  
  const totalFields = 35; // Nombre total de champs possibles
  const filledFields = Object.values(pappersDetails).filter(value => 
    value !== null && value !== undefined && value !== ''
  ).length;
  
  const collectionSummary = {
    total_fields: totalFields,
    filled_fields: filledFields,
    completion_rate: Math.round((filledFields / totalFields) * 100)
  };
  
  return {
    basic_info: pappersDetails,
    documents_count: documentsCount,
    data_sources: {
      insee: true,
      pappers: true,
      inpi: Math.random() > 0.3, // 70% de chance d'avoir des données INPI
      bodacc: Math.random() > 0.5  // 50% de chance d'avoir des données BODACC
    },
    collection_summary: collectionSummary
  };
}

/**
 * Simule la récupération rapide d'informations de base Pappers
 */
export async function getBasicPappersInfo(siren: string): Promise<{
  nom_entreprise: string;
  forme_juridique: string;
  capital?: number;
  effectif: string;
  representants_count: number;
}> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const company = frenchCompanies.find(c => c.siren === siren);
  
  if (!company) {
    throw new Error(`Aucune entreprise trouvée avec le SIREN ${siren}`);
  }
  
  const pappersDetails = generatePappersResponse(company);
  
  return {
    nom_entreprise: pappersDetails.nom_entreprise,
    forme_juridique: pappersDetails.forme_juridique,
    capital: pappersDetails.capital,
    effectif: pappersDetails.effectif,
    representants_count: pappersDetails.representants.length
  };
}

/**
 * Simule le téléchargement d'un document spécifique
 */
export async function downloadDocument(siren: string, documentId: string): Promise<{
  url: string;
  filename: string;
  size: number;
}> {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Simulation d'échec occasionnel (10% de chance)
  if (Math.random() < 0.1) {
    throw new Error('Document temporairement indisponible');
  }
  
  return {
    url: `https://www.pappers.fr/download/${siren}/${documentId}`,
    filename: `${documentId}_${siren}.pdf`,
    size: Math.floor(Math.random() * 5000000) + 100000 // Entre 100KB et 5MB
  };
}

/**
 * Récupère la liste des documents disponibles pour une entreprise
 */
export async function getAvailableDocuments(siren: string): Promise<{
  actes: Array<{ id: string; type: string; date: string }>;
  comptes: Array<{ id: string; annee: number; date_depot: string }>;
}> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const company = frenchCompanies.find(c => c.siren === siren);
  
  if (!company) {
    return { actes: [], comptes: [] };
  }
  
  const pappersDetails = generatePappersResponse(company);
  
  return {
    actes: pappersDetails.depots_actes.map((acte, index) => ({
      id: `acte_${index}`,
      type: acte.type,
      date: acte.date_depot
    })),
    comptes: pappersDetails.comptes.map((compte, index) => ({
      id: `compte_${compte.annee}`,
      annee: compte.annee,
      date_depot: compte.date_depot
    }))
  };
}

/**
 * Types d'export
 */
export type { PappersCompanyDetails, DataCollectionNotification, CollectedCompanyData };