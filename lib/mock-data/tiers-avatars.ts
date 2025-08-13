/**
 * Configuration des avatars et logos pour les tiers
 * Inclut clients, fournisseurs et organismes publics
 */

export interface TierAvatar {
  id: string;
  name: string;
  type: 'client' | 'supplier' | 'organism' | 'bank';
  logo?: string; // URL ou emoji
  initials: string;
  color: string; // Couleur de fond si pas de logo
  category?: string;
}

// Base de données des tiers avec leurs avatars
export const tiersAvatars: TierAvatar[] = [
  // === CLIENTS ===
  {
    id: 'ABC',
    name: 'ABC Corp',
    type: 'client',
    logo: '🏢',
    initials: 'ABC',
    color: 'bg-blue-500',
    category: 'Entreprise'
  },
  {
    id: 'XYZ',
    name: 'XYZ Ltd',
    type: 'client',
    logo: '🚀',
    initials: 'XYZ',
    color: 'bg-purple-500',
    category: 'Startup'
  },
  {
    id: 'DEF',
    name: 'DEF Sarl',
    type: 'client',
    logo: '🏭',
    initials: 'DEF',
    color: 'bg-green-500',
    category: 'Industrie'
  },
  {
    id: 'GHI',
    name: 'GHI Industries',
    type: 'client',
    logo: '⚙️',
    initials: 'GHI',
    color: 'bg-orange-500',
    category: 'Industrie'
  },
  {
    id: 'JKL',
    name: 'JKL Services',
    type: 'client',
    logo: '💼',
    initials: 'JKL',
    color: 'bg-indigo-500',
    category: 'Services'
  },

  // === FOURNISSEURS ===
  {
    id: 'ALPHA',
    name: 'Fournisseur Alpha',
    type: 'supplier',
    logo: '📦',
    initials: 'FA',
    color: 'bg-red-500',
    category: 'Matières premières'
  },
  {
    id: 'BETA',
    name: 'Fournisseur Beta',
    type: 'supplier',
    logo: '🚚',
    initials: 'FB',
    color: 'bg-amber-500',
    category: 'Logistique'
  },
  {
    id: 'EDF',
    name: 'EDF',
    type: 'supplier',
    logo: '⚡',
    initials: 'EDF',
    color: 'bg-blue-600',
    category: 'Énergie'
  },
  {
    id: 'ORANGE',
    name: 'Orange Business',
    type: 'supplier',
    logo: '📱',
    initials: 'OR',
    color: 'bg-orange-600',
    category: 'Télécommunications'
  },
  {
    id: 'AWS',
    name: 'Amazon Web Services',
    type: 'supplier',
    logo: '☁️',
    initials: 'AWS',
    color: 'bg-yellow-600',
    category: 'Cloud'
  },

  // === ORGANISMES PUBLICS ===
  {
    id: 'URSSAF',
    name: 'URSSAF',
    type: 'organism',
    logo: '🏛️',
    initials: 'UR',
    color: 'bg-blue-700',
    category: 'Cotisations sociales'
  },
  {
    id: 'TRESOR',
    name: 'Trésor Public',
    type: 'organism',
    logo: '🏦',
    initials: 'TP',
    color: 'bg-indigo-700',
    category: 'Impôts'
  },
  {
    id: 'DGFIP',
    name: 'Direction Générale des Finances Publiques',
    type: 'organism',
    logo: '📊',
    initials: 'DG',
    color: 'bg-purple-700',
    category: 'Impôts'
  },
  {
    id: 'CAF',
    name: 'CAF',
    type: 'organism',
    logo: '👨‍👩‍👧‍👦',
    initials: 'CAF',
    color: 'bg-green-700',
    category: 'Allocations'
  },
  {
    id: 'CPAM',
    name: 'CPAM - Assurance Maladie',
    type: 'organism',
    logo: '🏥',
    initials: 'CP',
    color: 'bg-cyan-700',
    category: 'Santé'
  },
  {
    id: 'AGIRC',
    name: 'AGIRC-ARRCO',
    type: 'organism',
    logo: '👴',
    initials: 'AA',
    color: 'bg-gray-700',
    category: 'Retraite'
  },
  {
    id: 'POLE',
    name: 'Pôle Emploi',
    type: 'organism',
    logo: '💼',
    initials: 'PE',
    color: 'bg-teal-700',
    category: 'Emploi'
  },

  // === BANQUES ===
  {
    id: 'BNP',
    name: 'BNP Paribas',
    type: 'bank',
    logo: '🏦',
    initials: 'BNP',
    color: 'bg-green-600',
    category: 'Banque'
  },
  {
    id: 'CA',
    name: 'Crédit Agricole',
    type: 'bank',
    logo: '🌿',
    initials: 'CA',
    color: 'bg-green-700',
    category: 'Banque'
  },
  {
    id: 'SG',
    name: 'Société Générale',
    type: 'bank',
    logo: '🔴',
    initials: 'SG',
    color: 'bg-red-600',
    category: 'Banque'
  },
  {
    id: 'CM',
    name: 'Crédit Mutuel',
    type: 'bank',
    logo: '🔷',
    initials: 'CM',
    color: 'bg-blue-700',
    category: 'Banque'
  },
  {
    id: 'REVOLUT',
    name: 'Revolut',
    type: 'bank',
    logo: '💳',
    initials: 'R',
    color: 'bg-gray-800',
    category: 'Néobanque'
  }
];

// Fonction pour récupérer l'avatar d'un tiers
export const getTierAvatar = (tierId: string): TierAvatar | undefined => {
  return tiersAvatars.find(tier => 
    tier.id.toLowerCase() === tierId.toLowerCase() ||
    tier.name.toLowerCase().includes(tierId.toLowerCase())
  );
};

// Fonction pour générer un avatar par défaut
export const getDefaultAvatar = (name: string, type: 'client' | 'supplier' | 'organism' | 'bank' = 'client'): TierAvatar => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = {
    client: 'bg-blue-500',
    supplier: 'bg-orange-500',
    organism: 'bg-purple-500',
    bank: 'bg-green-500'
  };

  const emojis = {
    client: '👤',
    supplier: '📦',
    organism: '🏛️',
    bank: '🏦'
  };

  return {
    id: name.replace(/\s+/g, '-').toUpperCase(),
    name,
    type,
    logo: emojis[type],
    initials,
    color: colors[type],
    category: 'Autre'
  };
};

// Fonction pour extraire le tiers d'un libellé de compte
export const extractTierFromLabel = (label: string): TierAvatar | null => {
  // Patterns pour identifier les tiers dans les libellés
  const patterns = [
    /Client\s+([A-Z]+(?:\s+[A-Z]+)*)/i,
    /Fournisseur\s+([A-Z]+(?:\s+[A-Z]+)*)/i,
    /Facture\s+(?:client\s+)?([A-Z]+(?:\s+[A-Z]+)*)/i,
    /Paiement\s+(?:reçu\s+)?([A-Z]+(?:\s+[A-Z]+)*)/i,
    /Avoir\s+(?:client\s+)?([A-Z]+(?:\s+[A-Z]+)*)/i,
  ];

  for (const pattern of patterns) {
    const match = label.match(pattern);
    if (match && match[1]) {
      const tierId = match[1].trim();
      const avatar = getTierAvatar(tierId);
      if (avatar) return avatar;
      
      // Si pas trouvé, créer un avatar par défaut
      const type = label.toLowerCase().includes('fournisseur') ? 'supplier' : 'client';
      return getDefaultAvatar(tierId, type);
    }
  }

  // Vérifier les organismes connus dans le libellé
  const organisms = ['URSSAF', 'Trésor Public', 'DGFIP', 'CAF', 'CPAM', 'AGIRC', 'Pôle Emploi'];
  for (const org of organisms) {
    if (label.toLowerCase().includes(org.toLowerCase())) {
      return getTierAvatar(org) || getDefaultAvatar(org, 'organism');
    }
  }

  // Vérifier les banques
  const banks = ['BNP', 'Crédit Agricole', 'Société Générale', 'Crédit Mutuel', 'Revolut'];
  for (const bank of banks) {
    if (label.toLowerCase().includes(bank.toLowerCase())) {
      return getTierAvatar(bank) || getDefaultAvatar(bank, 'bank');
    }
  }

  return null;
};