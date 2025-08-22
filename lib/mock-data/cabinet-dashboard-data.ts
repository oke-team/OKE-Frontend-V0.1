/**
 * Données mock pour le module Cabinet Dashboard
 * Structure pour la gestion des dossiers clients et collaborateurs
 */

export type StatutDossier = 'actif' | 'suspendu' | 'archive' | 'nouveau';
export type TypeEntreprise = 'SARL' | 'SAS' | 'EURL' | 'SA' | 'SCI' | 'AUTO' | 'MICRO' | 'EI';
export type RoleCollaborateur = 'superviseur' | 'collaborateur' | 'expert-comptable' | 'gestionnaire-paie' | 'juriste' | 'stagiaire';
export type StatutBanque = 'connectee' | 'en_cours' | 'non_connectee' | 'erreur';

export interface CabinetCollaborateur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: RoleCollaborateur;
  avatar?: string;
  actif: boolean;
  dateAjout: string;
}

export interface CabinetDossier {
  id: string;
  raisonSociale: string;
  formeJuridique: TypeEntreprise;
  siret: string;
  logo?: string;
  statut: StatutDossier;
  dateCreation: string;
  derniereActivite: string;
  
  // Collaborateurs assignés
  collaborateurs: CabinetCollaborateur[];
  superviseur: CabinetCollaborateur;
  
  // Informations financières métier
  chiffreAffaires: {
    actuel: number;
    precedent: number;
    evolution: number; // en %
  };
  resultat: {
    actuel: number;
    precedent: number;
    evolution: number; // en %
  };
  tresorerie: {
    montant: number; // somme des soldes bancaires
    evolution: number; // évolution vs mois dernier
  };
  effectifSalarie: number;
  secteurActivite: string;
  
  // Connexions bancaires
  banquesConnectees: {
    nom: string;
    statut: StatutBanque;
    derniereSynchro?: string;
    nombreComptes: number;
    solde: number; // solde du compte
  }[];
  
  // Budget honoraires et temps passé
  budget: {
    honorairesPrevu: number;
    honorairesConsomme: number;
    tempsPasseHeures: number;
    tauxHoraireMoyen: number;
    restant: number;
  };
  
  // Informations comptables et fiscales
  comptabilite: {
    dateCloture: string;
    avancementCompta: number; // pourcentage 0-100
    operationsAttente: number;
    reglementsNonJustifies: number;
    derniereSaisie: string;
  };
  
  // TVA et fiscalité
  tva: {
    dernierePeriode: string;
    statut: 'deposee' | 'en_cours' | 'en_retard' | 'non_due';
    montant: number;
    dateEcheance: string;
  };
  
  // Automatisations
  automatisations: {
    bancaires: boolean;
    fiscales: boolean;
    sociales: boolean;
    factures: boolean;
  };
  
  // Communication
  chatActif: boolean;
  derniersMessages: number;
}

export interface CabinetStats {
  // Pilotage cabinet (pas agrégation client)
  dossiersEnRetard: {
    count: number;
    seuilJours: number;
  };
  echeancesSemaine: {
    count: number;
    types: string[];
  };
  heuresFacturees: {
    semaine: number;
    evolution: number;
  };
  rentabiliteMois: {
    montant: number;
    evolution: number;
  };
  // Stats générales pour info
  totalDossiers: number;
  dossiersActifs: number;
  totalCollaborateurs: number;
}

// Logos des entreprises clientes (hardcodés avec des placeholders)
export const companyLogos: Record<string, string> = {
  'TechCorp': 'https://ui-avatars.com/api/?name=TechCorp&background=4C34CE&color=fff&size=40&rounded=true&font-size=0.6',
  'Design Studio': 'https://ui-avatars.com/api/?name=Design+Studio&background=FAA016&color=fff&size=40&rounded=true&font-size=0.4',
  'Global Industries': 'https://ui-avatars.com/api/?name=Global+Industries&background=512952&color=fff&size=40&rounded=true&font-size=0.3',
  'Eco Solutions': 'https://ui-avatars.com/api/?name=Eco+Solutions&background=6da4c3&color=fff&size=40&rounded=true&font-size=0.4',
  'Artisan Plus': 'https://ui-avatars.com/api/?name=Artisan+Plus&background=182752&color=fff&size=40&rounded=true&font-size=0.4',
  'Médical Center': 'https://ui-avatars.com/api/?name=Medical+Center&background=2b3642&color=fff&size=40&rounded=true&font-size=0.3',
  'Transport Express': 'https://ui-avatars.com/api/?name=Transport&background=16a085&color=fff&size=40&rounded=true&font-size=0.4',
  'Café Central': 'https://ui-avatars.com/api/?name=Cafe+Central&background=8e44ad&color=fff&size=40&rounded=true&font-size=0.4'
};

// Avatars des collaborateurs (hardcodés avec des placeholders)
export const collaborateurAvatars: Record<string, string> = {
  'martin': 'https://ui-avatars.com/api/?name=Pierre+Martin&background=4C34CE&color=fff&size=32&rounded=true',
  'dupont': 'https://ui-avatars.com/api/?name=Marie+Dupont&background=FAA016&color=fff&size=32&rounded=true',
  'bernard': 'https://ui-avatars.com/api/?name=Jean+Bernard&background=512952&color=fff&size=32&rounded=true',
  'petit': 'https://ui-avatars.com/api/?name=Sophie+Petit&background=6da4c3&color=fff&size=32&rounded=true',
  'robert': 'https://ui-avatars.com/api/?name=Lucas+Robert&background=182752&color=fff&size=32&rounded=true',
  'richard': 'https://ui-avatars.com/api/?name=Emma+Richard&background=2b3642&color=fff&size=32&rounded=true',
  'durand': 'https://ui-avatars.com/api/?name=Paul+Durand&background=16a085&color=fff&size=32&rounded=true',
  'lefebvre': 'https://ui-avatars.com/api/?name=Julie+Lefebvre&background=8e44ad&color=fff&size=32&rounded=true'
};

// Fonction helper pour générer des dates
const generateDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

// Générateur de nombres pseudo-aléatoires déterministe pour éviter les erreurs d'hydratation
const seededRandom = (seed: string): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Normalize to 0-1 range
  return Math.abs(hash) / 2147483647;
};

// Helper pour générer des données financières cohérentes (non utilisé mais gardé pour référence)
const generateFinancialData = (baseCA: number, secteur: string, seed: string = '0') => {
  const rand1 = seededRandom(seed + 'fin1');
  const rand2 = seededRandom(seed + 'fin2');
  const rand3 = seededRandom(seed + 'fin3');
  
  const variation = (rand1 - 0.5) * 30; // -15% à +15%
  const precedentCA = Math.round(baseCA / (1 + variation / 100));
  const margeType = secteur.includes('Santé') ? 0.25 : secteur.includes('Tech') ? 0.18 : 0.12;
  
  return {
    chiffreAffaires: {
      actuel: baseCA,
      precedent: precedentCA,
      evolution: +((baseCA - precedentCA) / precedentCA * 100)
    },
    resultat: {
      actuel: Math.round(baseCA * margeType),
      precedent: Math.round(precedentCA * margeType),
      evolution: +((baseCA * margeType - precedentCA * margeType) / (precedentCA * margeType) * 100)
    },
    tresorerie: {
      montant: Math.round(baseCA * 0.15 + (rand2 - 0.5) * baseCA * 0.1),
      evolution: +(rand3 - 0.3) * 25 // Bias légèrement négatif
    }
  };
};

// Collaborateurs du cabinet
const collaborateurs: CabinetCollaborateur[] = [
  {
    id: 'collab-001',
    nom: 'Martin',
    prenom: 'Pierre',
    email: 'pierre.martin@cabinet.com',
    role: 'expert-comptable',
    avatar: collaborateurAvatars['martin'],
    actif: true,
    dateAjout: '2020-01-15'
  },
  {
    id: 'collab-002',
    nom: 'Dupont',
    prenom: 'Marie',
    email: 'marie.dupont@cabinet.com',
    role: 'superviseur',
    avatar: collaborateurAvatars['dupont'],
    actif: true,
    dateAjout: '2021-03-20'
  },
  {
    id: 'collab-003',
    nom: 'Bernard',
    prenom: 'Jean',
    email: 'jean.bernard@cabinet.com',
    role: 'collaborateur',
    avatar: collaborateurAvatars['bernard'],
    actif: true,
    dateAjout: '2022-09-10'
  },
  {
    id: 'collab-004',
    nom: 'Petit',
    prenom: 'Sophie',
    email: 'sophie.petit@cabinet.com',
    role: 'gestionnaire-paie',
    avatar: collaborateurAvatars['petit'],
    actif: true,
    dateAjout: '2023-01-05'
  },
  {
    id: 'collab-005',
    nom: 'Robert',
    prenom: 'Lucas',
    email: 'lucas.robert@cabinet.com',
    role: 'juriste',
    avatar: collaborateurAvatars['robert'],
    actif: true,
    dateAjout: '2023-06-15'
  },
  {
    id: 'collab-006',
    nom: 'Richard',
    prenom: 'Emma',
    email: 'emma.richard@cabinet.com',
    role: 'stagiaire',
    avatar: collaborateurAvatars['richard'],
    actif: true,
    dateAjout: '2024-01-08'
  }
];

// Helper pour créer un dossier avec toutes les données métier
const createDossier = (
  id: string, 
  raisonSociale: string, 
  formeJuridique: TypeEntreprise,
  siret: string,
  logo: string,
  statut: StatutDossier,
  dateCreation: string,
  collaborateurs: CabinetCollaborateur[],
  superviseur: CabinetCollaborateur,
  baseCA: number,
  effectif: number,
  secteur: string,
  banques: any[],
  chatActif: boolean = false,
  derniersMessages: number = 0
): CabinetDossier => {
  // Utilisation de seededRandom pour éviter les erreurs d'hydratation
  const seed = id + raisonSociale;
  const rand1 = seededRandom(seed + '1');
  const rand2 = seededRandom(seed + '2');
  const rand3 = seededRandom(seed + '3');
  const rand4 = seededRandom(seed + '4');
  const rand5 = seededRandom(seed + '5');
  const rand6 = seededRandom(seed + '6');
  const rand7 = seededRandom(seed + '7');
  const rand8 = seededRandom(seed + '8');
  const rand9 = seededRandom(seed + '9');
  const rand10 = seededRandom(seed + '10');
  const rand11 = seededRandom(seed + '11');
  const rand12 = seededRandom(seed + '12');
  
  const caVariation = (rand1 - 0.5) * 20; // -10% à +10%
  const precedentCA = Math.round(baseCA / (1 + caVariation / 100));
  const margeType = secteur.includes('Santé') || secteur.includes('Médical') ? 0.25 : 
                   secteur.includes('Tech') || secteur.includes('information') ? 0.18 : 0.12;
  
  return {
    id,
    raisonSociale,
    formeJuridique,
    siret,
    logo,
    statut,
    dateCreation,
    derniereActivite: generateDate(Math.floor(rand2 * 10)),
    collaborateurs,
    superviseur,
    chiffreAffaires: {
      actuel: baseCA,
      precedent: precedentCA,
      evolution: +((baseCA - precedentCA) / precedentCA * 100).toFixed(1)
    },
    resultat: {
      actuel: Math.round(baseCA * margeType),
      precedent: Math.round(precedentCA * margeType),
      evolution: +((baseCA * margeType - precedentCA * margeType) / (precedentCA * margeType) * 100).toFixed(1)
    },
    tresorerie: {
      montant: Math.round(baseCA * (0.1 + rand3 * 0.2)),
      evolution: +((rand4 - 0.3) * 25).toFixed(1)
    },
    effectifSalarie: effectif,
    secteurActivite: secteur,
    banquesConnectees: banques,
    budget: {
      honorairesPrevu: Math.round(baseCA * (0.025 + rand5 * 0.015)),
      honorairesConsomme: Math.round(baseCA * (0.015 + rand6 * 0.015)),
      tempsPasseHeures: Math.round(baseCA * 0.0002 + rand7 * 50),
      tauxHoraireMoyen: 100 + Math.round(rand8 * 80),
      restant: Math.round(baseCA * 0.01)
    },
    comptabilite: {
      dateCloture: '2024-12-31',
      avancementCompta: 30 + Math.round(rand9 * 60),
      operationsAttente: Math.round(rand10 * 25),
      reglementsNonJustifies: Math.round(rand11 * 10),
      derniereSaisie: generateDate(Math.floor(rand12 * 15))
    },
    tva: {
      dernierePeriode: 'T4 2024',
      statut: ['deposee', 'en_cours', 'en_retard', 'non_due'][Math.floor(rand1 * 4)] as any,
      montant: Math.round(baseCA * 0.015),
      dateEcheance: '2025-01-20'
    },
    automatisations: {
      bancaires: rand2 > 0.5,
      fiscales: rand3 > 0.5,
      sociales: rand4 > 0.5,
      factures: rand5 > 0.5
    },
    chatActif,
    derniersMessages
  };
};

// Dossiers clients du cabinet
export const cabinetDossiers: CabinetDossier[] = [
  createDossier(
    'dossier-001',
    'TechCorp SAS',
    'SAS',
    '12345678901234',
    companyLogos['TechCorp'],
    'actif',
    '2022-01-15',
    [collaborateurs[0], collaborateurs[2]],
    collaborateurs[1],
    850000,
    12,
    'Technologies de l\'information',
    [
      { nom: 'BNP Paribas', statut: 'connectee', derniereSynchro: generateDate(0), nombreComptes: 2, solde: 85000 },
      { nom: 'Crédit Agricole', statut: 'connectee', derniereSynchro: generateDate(1), nombreComptes: 1, solde: 40000 }
    ],
    true,
    3
  ),
  
  createDossier(
    'dossier-002',
    'Design Studio SARL',
    'SARL',
    '98765432109876',
    companyLogos['Design Studio'],
    'actif',
    '2021-06-20',
    [collaborateurs[2]],
    collaborateurs[0],
    420000,
    8,
    'Services créatifs',
    [
      { nom: 'Société Générale', statut: 'connectee', derniereSynchro: generateDate(2), nombreComptes: 1, solde: 65000 },
      { nom: 'LCL', statut: 'en_cours', nombreComptes: 1, solde: 20000 }
    ],
    false,
    0
  ),
  
  createDossier(
    'dossier-003',
    'Global Industries',
    'SA',
    '45678912345678',
    companyLogos['Global Industries'],
    'nouveau',
    generateDate(30),
    [collaborateurs[3], collaborateurs[4]],
    collaborateurs[1],
    1200000,
    25,
    'Industrie manufacturière',
    [
      { nom: 'HSBC', statut: 'non_connectee', nombreComptes: 3, solde: 0 },
      { nom: 'BNP Paribas', statut: 'erreur', nombreComptes: 1, solde: 0 }
    ],
    true,
    8
  )
];

// Statistiques du cabinet (pilotage interne)
export const calculateCabinetStats = (): CabinetStats => {
  const today = new Date();
  const seuilRetard = 5; // jours
  
  // Dossiers en retard (simulation basée sur dernière activité)
  const dossiersEnRetard = cabinetDossiers.filter(d => {
    const derniereActivite = new Date(d.derniereActivite);
    const diffJours = Math.floor((today.getTime() - derniereActivite.getTime()) / (1000 * 60 * 60 * 24));
    return diffJours > seuilRetard && d.statut === 'actif';
  });

  return {
    dossiersEnRetard: {
      count: dossiersEnRetard.length,
      seuilJours: seuilRetard
    },
    echeancesSemaine: {
      count: 7, // Simulation : 7 échéances cette semaine
      types: ['TVA', 'DSN', 'DUCS']
    },
    heuresFacturees: {
      semaine: 142, // Simulation heures équipe
      evolution: +5.2 // % vs semaine précédente
    },
    rentabiliteMois: {
      montant: 8200, // Bénéfice cabinet ce mois
      evolution: +12.8 // % vs mois précédent
    },
    // Stats générales
    totalDossiers: cabinetDossiers.length,
    dossiersActifs: cabinetDossiers.filter(d => d.statut === 'actif').length,
    totalCollaborateurs: collaborateurs.filter(c => c.actif).length
  };
};

// Fonctions utilitaires pour les dossiers
export const filterDossiers = (
  dossiers: CabinetDossier[],
  filters: {
    search?: string;
    statut?: StatutDossier[];
    formeJuridique?: TypeEntreprise[];
    secteur?: string;
    chiffreAffairesMin?: number;
    chiffreAffairesMax?: number;
    banquesConnectees?: StatutBanque[];
  }
): CabinetDossier[] => {
  return dossiers.filter(dossier => {
    if (filters.search && !dossier.raisonSociale.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.statut && filters.statut.length > 0 && !filters.statut.includes(dossier.statut)) {
      return false;
    }
    if (filters.formeJuridique && filters.formeJuridique.length > 0 && !filters.formeJuridique.includes(dossier.formeJuridique)) {
      return false;
    }
    if (filters.secteur && filters.secteur.trim() !== '' && !dossier.secteurActivite.toLowerCase().includes(filters.secteur.toLowerCase())) {
      return false;
    }
    if (filters.chiffreAffairesMin && (dossier.chiffreAffaires?.actuel || 0) < filters.chiffreAffairesMin) {
      return false;
    }
    if (filters.chiffreAffairesMax && (dossier.chiffreAffaires?.actuel || 0) > filters.chiffreAffairesMax) {
      return false;
    }
    return true;
  });
};

export const sortDossiers = (
  dossiers: CabinetDossier[],
  field: keyof CabinetDossier,
  order: 'asc' | 'desc'
): CabinetDossier[] => {
  return [...dossiers].sort((a, b) => {
    let aVal: any = a[field];
    let bVal: any = b[field];
    
    // Gestion spéciale pour les nouveaux champs complexes
    if (field === 'chiffreAffaires') {
      aVal = a.chiffreAffaires?.actuel || 0;
      bVal = b.chiffreAffaires?.actuel || 0;
    } else if (field === 'tresorerie') {
      aVal = a.tresorerie?.montant || 0;
      bVal = b.tresorerie?.montant || 0;
    }
    
    if (aVal === undefined || aVal === null) return order === 'asc' ? 1 : -1;
    if (bVal === undefined || bVal === null) return order === 'asc' ? -1 : 1;
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// Helper pour obtenir les badges de statut
export const getStatutBadgeProps = (statut: StatutDossier) => {
  switch (statut) {
    case 'actif':
      return { variant: 'success' as const, label: 'Actif' };
    case 'nouveau':
      return { variant: 'info' as const, label: 'Nouveau' };
    case 'suspendu':
      return { variant: 'warning' as const, label: 'Suspendu' };
    case 'archive':
      return { variant: 'secondary' as const, label: 'Archivé' };
    default:
      return { variant: 'secondary' as const, label: statut };
  }
};

// Helper pour les badges de connexion bancaire
export const getBanqueStatutBadgeProps = (statut: StatutBanque) => {
  switch (statut) {
    case 'connectee':
      return { variant: 'success' as const, label: 'Connectée' };
    case 'en_cours':
      return { variant: 'info' as const, label: 'En cours' };
    case 'non_connectee':
      return { variant: 'secondary' as const, label: 'Non connectée' };
    case 'erreur':
      return { variant: 'danger' as const, label: 'Erreur' };
    default:
      return { variant: 'secondary' as const, label: statut };
  }
};