/**
 * Configuration des cartes entrepreneur avec mapping des comptes comptables
 * Respecte la séparation stricte Bilan (classes 1-5) / Résultat (classes 6-7)
 */

export interface CardConfig {
  id: string;
  title: string;
  accounts: string[];
  type: 'bilan' | 'resultat';
  icon: string;
  color: 'violet' | 'green' | 'red' | 'blue' | 'orange';
  description?: string;
}

// Configuration des cartes BILAN (classes 1 à 5)
export const bilanCards: CardConfig[] = [
  // ACTIF - Immobilisations
  {
    id: 'immobilisations',
    title: 'Immobilisations',
    accounts: ['20', '21', '22', '23', '26', '27', '28'],
    type: 'bilan',
    icon: 'Building',
    color: 'violet',
    description: 'Actifs immobilisés corporels et incorporels',
  },
  // ACTIF - Créances et disponibilités
  {
    id: 'treasury',
    title: 'Trésorerie disponible',
    accounts: ['53', '512', '514', '516', '517', '518'],
    type: 'bilan',
    icon: 'Wallet',
    color: 'violet',
    description: 'Liquidités immédiatement disponibles',
  },
  {
    id: 'clients',
    title: 'Clients à encaisser',
    accounts: ['411', '413', '416', '418'],
    type: 'bilan',
    icon: 'Users',
    color: 'green',
    description: 'Factures clients en attente de paiement',
  },
  {
    id: 'stocks',
    title: 'Stocks',
    accounts: ['31', '32', '33', '34', '35', '36', '37'],
    type: 'bilan',
    icon: 'Package2',
    color: 'violet',
    description: 'Valeur des stocks et en-cours',
  },
  {
    id: 'other_receivables',
    title: 'Autres créances',
    accounts: ['409', '46', '467', '468', '471', '472', '476', '478', '486', '487'],
    type: 'bilan',
    icon: 'FileCheck',
    color: 'green',
    description: 'Créances diverses, avances et acomptes',
  },
  // PASSIF - Capitaux propres
  {
    id: 'capital',
    title: 'Capitaux propres',
    accounts: ['10', '101', '104', '106', '108', '11', '12'],
    type: 'bilan',
    icon: 'Landmark',
    color: 'blue',
    description: 'Capital social et réserves',
  },
  {
    id: 'group_associates',
    title: 'Groupe et associés',
    accounts: ['455', '456', '457', '458'],
    type: 'bilan',
    icon: 'Users',
    color: 'blue',
    description: 'Comptes courants et opérations groupe',
  },
  // PASSIF - Dettes
  {
    id: 'debts',
    title: 'Dettes financières',
    accounts: ['16', '164', '165', '166', '167', '168'],
    type: 'bilan',
    icon: 'CreditCard',
    color: 'red',
    description: 'Emprunts et dettes bancaires',
  },
  {
    id: 'suppliers',
    title: 'Fournisseurs à payer',
    accounts: ['401', '403', '404', '408', '4096'],
    type: 'bilan',
    icon: 'Package',
    color: 'orange',
    description: 'Factures fournisseurs à régler',
  },
  {
    id: 'payroll',
    title: 'Salaires à verser',
    accounts: ['421', '422', '425', '426', '427', '428'],
    type: 'bilan',
    icon: 'Users2',
    color: 'blue',
    description: 'Salaires et charges sociales',
  },
  {
    id: 'social',
    title: 'Cotisations sociales',
    accounts: ['43', '431', '437', '438'],
    type: 'bilan',
    icon: 'Shield',
    color: 'blue',
    description: 'URSSAF, retraite, prévoyance',
  },
  {
    id: 'vat',
    title: 'TVA à payer/récupérer',
    accounts: ['44566', '44567', '44571', '44562', '44563'],
    type: 'bilan',
    icon: 'Receipt',
    color: 'orange',
    description: 'TVA collectée et déductible',
  },
  {
    id: 'tax',
    title: 'Dettes fiscales',
    accounts: ['444', '447', '448'], // Hors TVA (445)
    type: 'bilan',
    icon: 'FileText',
    color: 'red',
    description: 'Impôts et taxes à payer',
  },
  {
    id: 'other_debts',
    title: 'Autres dettes',
    accounts: ['419', '46', '467', '468', '471', '472', '476', '478', '486', '487', '488'],
    type: 'bilan',
    icon: 'FileWarning',
    color: 'orange',
    description: 'Dettes diverses, avances reçues',
  },
];

// Configuration des cartes RÉSULTAT (classes 6 et 7)
export const resultatCards: CardConfig[] = [
  {
    id: 'revenue',
    title: "Chiffre d'affaires",
    accounts: ['70', '701', '702', '703', '704', '705', '706', '707', '708', '709'],
    type: 'resultat',
    icon: 'BarChart3',
    color: 'blue',
    description: 'Ventes et prestations',
  },
  {
    id: 'purchases',
    title: 'Achats de marchandises et matières premières',
    accounts: ['60', '601', '602', '603', '604', '605', '606', '607', '608', '609'],
    type: 'resultat',
    icon: 'ShoppingCart',
    color: 'orange',
    description: 'Achats et approvisionnements',
  },
  {
    id: 'external',
    title: 'Charges externes',
    accounts: ['61', '62', '611', '612', '613', '614', '615', '621', '622', '623', '624', '625', '626', '627', '628'],
    type: 'resultat',
    icon: 'Briefcase',
    color: 'red',
    description: 'Services extérieurs et frais généraux',
  },
  {
    id: 'wages',
    title: 'Masse salariale',
    accounts: ['641', '644', '645', '646', '647', '648'],
    type: 'resultat',
    icon: 'Users',
    color: 'orange',
    description: 'Salaires et cotisations patronales',
  },
  {
    id: 'taxes',
    title: 'Impôts et taxes',
    accounts: ['63', '631', '633', '635', '637'],
    type: 'resultat',
    icon: 'Building',
    color: 'red',
    description: "Impôts et taxes d'exploitation",
  },
  {
    id: 'financial',
    title: 'Charges financières',
    accounts: ['66', '661', '665', '666', '667', '668'],
    type: 'resultat',
    icon: 'Percent',
    color: 'red',
    description: 'Intérêts et charges financières',
  },
  {
    id: 'other_charges',
    title: 'Autres charges',
    accounts: ['67', '671', '675', '678', '681', '686', '687'],
    type: 'resultat',
    icon: 'MoreHorizontal',
    color: 'red',
    description: 'Charges exceptionnelles et diverses',
  },
  {
    id: 'financial_income',
    title: 'Produits financiers',
    accounts: ['76', '761', '762', '763', '764', '765', '766', '767', '768'],
    type: 'resultat',
    icon: 'TrendingUp',
    color: 'green',
    description: 'Revenus financiers et intérêts',
  },
  {
    id: 'other_income',
    title: 'Autres produits',
    accounts: ['74', '75', '77', '78', '781', '786', '787', '791'],
    type: 'resultat',
    icon: 'Plus',
    color: 'green',
    description: 'Subventions, produits exceptionnels et divers',
  },
];

// Cartes calculées (ne correspondent pas directement à des comptes)
export const calculatedCards = [
  {
    id: 'gross_margin',
    title: 'Marge brute',
    formula: 'revenue - purchases',
    type: 'resultat',
    icon: 'Calculator',
    color: 'violet' as const,
    description: 'CA - Achats marchandises',
  },
  {
    id: 'net_result',
    title: 'Résultat net',
    formula: 'total_income - total_expenses',
    type: 'resultat',
    icon: 'Trophy',
    color: 'green' as const,
    description: 'Résultat avant impôts',
  },
];

// Fonction pour obtenir les données mockées d'un groupe de comptes
export const getAccountGroupData = (cardId: string) => {
  const card = [...bilanCards, ...resultatCards].find(c => c.id === cardId);
  if (!card) return null;

  // Simulation de données pour chaque groupe
  const mockGroups = {
    immobilisations: [
      {
        id: 'incorporelles',
        label: 'Immobilisations incorporelles',
        accounts: [
          { id: '201001', label: 'Frais d\'établissement', balance: 5000, balanceN1: 4500, trend: 'stable' as const },
          { id: '205001', label: 'Logiciels', balance: 12500, balanceN1: 11250, trend: 'up' as const },
          { id: '207001', label: 'Fonds commercial', balance: 50000, balanceN1: 45000, trend: 'stable' as const },
        ],
        total: 67500,
        totalN1: 60750,
      },
      {
        id: 'corporelles',
        label: 'Immobilisations corporelles',
        accounts: [
          { id: '211001', label: 'Terrains', balance: 150000, balanceN1: 150000, trend: 'stable' as const },
          { id: '213001', label: 'Constructions', balance: 280000, balanceN1: 265000, trend: 'up' as const },
          { id: '215001', label: 'Matériel et outillage', balance: 45000, balanceN1: 48000, trend: 'down' as const },
          { id: '218001', label: 'Matériel de transport', balance: 35000, balanceN1: 42000, trend: 'down' as const },
          { id: '218301', label: 'Matériel informatique', balance: 8500, balanceN1: 10000, trend: 'down' as const },
        ],
        total: 518500,
        totalN1: 515000,
      },
      {
        id: 'financieres',
        label: 'Immobilisations financières',
        accounts: [
          { id: '261001', label: 'Titres de participation', balance: 25000, balanceN1: 22000, trend: 'up' as const },
          { id: '275001', label: 'Dépôts et cautionnements', balance: 3500, balanceN1: 3300, trend: 'stable' as const },
        ],
        total: 28500,
        totalN1: 25300,
      },
    ],
    capital: [
      {
        id: 'capital_social',
        label: 'Capital et réserves',
        accounts: [
          { id: '101001', label: 'Capital social', balance: 100000, balanceN1: 100000, trend: 'stable' as const },
          { id: '104001', label: 'Prime d\'émission', balance: 15000, balanceN1: 15000, trend: 'stable' as const },
          { id: '106001', label: 'Réserve légale', balance: 10000, balanceN1: 8500, trend: 'up' as const },
          { id: '106801', label: 'Autres réserves', balance: 45000, balanceN1: 38000, trend: 'up' as const },
        ],
        total: 170000,
        totalN1: 161500,
      },
      {
        id: 'resultat',
        label: 'Résultat',
        accounts: [
          { id: '110001', label: 'Report à nouveau', balance: 28000, balanceN1: 22000, trend: 'up' as const },
          { id: '120001', label: 'Résultat de l\'exercice', balance: 45000, balanceN1: 38000, trend: 'up' as const },
        ],
        total: 73000,
        totalN1: 60000,
      },
    ],
    treasury: [
      {
        id: 'bank',
        label: 'Comptes bancaires',
        accounts: [
          { id: '512001', label: 'BNP Paribas - Compte courant', balance: 45231, balanceN1: 38500, trend: 'up' as const },
          { id: '512002', label: 'Crédit Agricole - Compte pro', balance: 28450, balanceN1: 27800, trend: 'stable' as const },
        ],
        total: 73681,
        totalN1: 66300,
      },
      {
        id: 'cash',
        label: 'Disponibilités',
        accounts: [
          { id: '530001', label: 'Caisse principale', balance: 1250, balanceN1: 1450, trend: 'down' as const },
          { id: '514001', label: 'Chèques à encaisser', balance: 5600, balanceN1: 4200, trend: 'up' as const },
        ],
        total: 6850,
        totalN1: 5650,
      },
    ],
    clients: [
      {
        id: 'invoices',
        label: 'Factures clients',
        accounts: [
          { id: '411001', label: 'Client ABC Corp', balance: 12500, balanceN1: 11800, trend: 'stable' as const, warning: true, lastMovement: 'Il y a 3 jours' },
          { id: '411002', label: 'Client XYZ Ltd', balance: 8750, balanceN1: 6200, trend: 'up' as const, lastMovement: 'Aujourd\'hui' },
          { id: '411003', label: 'Client DEF Sarl', balance: 15230, balanceN1: 18500, trend: 'down' as const, lastMovement: 'Il y a 7 jours' },
        ],
        total: 36480,
        totalN1: 36500,
      },
      {
        id: 'doubtful',
        label: 'Créances douteuses',
        accounts: [
          { id: '416001', label: 'Client en litige', balance: 3200, balanceN1: 2800, warning: true, lastMovement: 'Il y a 45 jours' },
        ],
        total: 3200,
        totalN1: 2800,
      },
    ],
    suppliers: [
      {
        id: 'invoices',
        label: 'Factures fournisseurs',
        accounts: [
          { id: '401001', label: 'Fournisseur Alpha', balance: -8500, balanceN1: -9200, trend: 'up' as const },
          { id: '401002', label: 'Fournisseur Beta', balance: -4200, balanceN1: -4100, trend: 'stable' as const },
          { id: '401003', label: 'EDF', balance: -1850, balanceN1: -1600, trend: 'down' as const },
        ],
        total: -14550,
        totalN1: -14900,
      },
    ],
    stocks: [
      {
        id: 'marchandises',
        label: 'Stocks de marchandises',
        accounts: [
          { id: '370001', label: 'Stock marchandises A', balance: 25000, balanceN1: 22000, trend: 'up' as const },
          { id: '370002', label: 'Stock marchandises B', balance: 18000, balanceN1: 17500, trend: 'stable' as const },
        ],
        total: 43000,
        totalN1: 39500,
      },
      {
        id: 'matieres',
        label: 'Matières premières',
        accounts: [
          { id: '310001', label: 'Matières premières', balance: 12000, balanceN1: 14000, trend: 'down' as const },
          { id: '320001', label: 'Fournitures', balance: 3500, balanceN1: 3400, trend: 'stable' as const },
        ],
        total: 15500,
        totalN1: 17400,
      },
    ],
    other_receivables: [
      {
        id: 'avances',
        label: 'Avances et acomptes versés',
        accounts: [
          { id: '409001', label: 'Avances fournisseurs', balance: 8500, balanceN1: 7200, trend: 'up' as const },
          { id: '467001', label: 'Créances sur opérations diverses', balance: 3200, balanceN1: 3100, trend: 'stable' as const },
        ],
        total: 11700,
        totalN1: 10300,
      },
      {
        id: 'subventions',
        label: 'Subventions à recevoir',
        accounts: [
          { id: '441001', label: 'Subvention Région', balance: 15000, balanceN1: 15000, trend: 'stable' as const },
          { id: '441002', label: 'Aide à l\'innovation', balance: 25000, balanceN1: 20000, trend: 'up' as const },
        ],
        total: 40000,
        totalN1: 35000,
      },
      {
        id: 'divers',
        label: 'Débiteurs divers',
        accounts: [
          { id: '468001', label: 'Produits à recevoir', balance: 5600, balanceN1: 4800, trend: 'up' as const },
          { id: '486001', label: 'Charges constatées d\'avance', balance: 2800, balanceN1: 2700, trend: 'stable' as const },
        ],
        total: 8400,
        totalN1: 7500,
      },
    ],
    group_associates: [
      {
        id: 'associates',
        label: 'Comptes courants associés',
        accounts: [
          { id: '455001', label: 'Compte courant - Associé A', balance: -25000, balanceN1: -24000, trend: 'stable' as const },
          { id: '455002', label: 'Compte courant - Associé B', balance: -15000, balanceN1: -12000, trend: 'down' as const },
        ],
        total: -40000,
        totalN1: -36000,
      },
      {
        id: 'group',
        label: 'Opérations groupe',
        accounts: [
          { id: '456001', label: 'Société mère', balance: -50000, balanceN1: -48000, trend: 'stable' as const },
          { id: '457001', label: 'Filiale A', balance: 12000, balanceN1: 8000, trend: 'up' as const },
        ],
        total: -38000,
        totalN1: -40000,
      },
    ],
    other_debts: [
      {
        id: 'avances_recues',
        label: 'Avances et acomptes reçus',
        accounts: [
          { id: '419001', label: 'Avances clients', balance: -12000, balanceN1: -10500, trend: 'up' as const },
          { id: '419002', label: 'Acomptes sur commandes', balance: -8500, balanceN1: -8200, trend: 'stable' as const },
        ],
        total: -20500,
        totalN1: -18700,
      },
      {
        id: 'dettes_diverses',
        label: 'Dettes diverses',
        accounts: [
          { id: '467001', label: 'Créditeurs divers', balance: -3500, balanceN1: -4200, trend: 'down' as const },
          { id: '468001', label: 'Charges à payer', balance: -6200, balanceN1: -5800, trend: 'up' as const },
          { id: '487001', label: 'Produits constatés d\'avance', balance: -4800, balanceN1: -4600, trend: 'stable' as const },
        ],
        total: -14500,
        totalN1: -14600,
      },
    ],
    financial_income: [
      {
        id: 'interets',
        label: 'Intérêts et revenus financiers',
        accounts: [
          { id: '761001', label: 'Produits de participations', balance: 8500, balanceN1: 7000, trend: 'up' as const },
          { id: '762001', label: 'Revenus des placements', balance: 3200, balanceN1: 3100, trend: 'stable' as const },
          { id: '768001', label: 'Intérêts bancaires', balance: 850, balanceN1: 600, trend: 'up' as const },
        ],
        total: 12550,
        totalN1: 10700,
      },
      {
        id: 'change',
        label: 'Gains de change',
        accounts: [
          { id: '766001', label: 'Gains de change', balance: 2100, balanceN1: 1800, trend: 'up' as const },
        ],
        total: 2100,
        totalN1: 1800,
      },
    ],
    other_charges: [
      {
        id: 'exceptionnelles',
        label: 'Charges exceptionnelles',
        accounts: [
          { id: '671001', label: 'Pénalités et amendes', balance: -1200, balanceN1: -1500, trend: 'down' as const },
          { id: '675001', label: 'VNC des immobilisations cédées', balance: -5000, balanceN1: -4800, trend: 'stable' as const },
          { id: '678001', label: 'Autres charges exceptionnelles', balance: -800, balanceN1: -1200, trend: 'down' as const },
        ],
        total: -7000,
        totalN1: -7500,
      },
      {
        id: 'dotations',
        label: 'Dotations aux provisions',
        accounts: [
          { id: '681001', label: 'Dotations aux amortissements', balance: -15000, balanceN1: -14500, trend: 'stable' as const },
          { id: '686001', label: 'Dotations aux provisions', balance: -3500, balanceN1: -3000, trend: 'up' as const },
        ],
        total: -18500,
        totalN1: -17500,
      },
    ],
    // Ajouter les autres groupes selon les besoins...
  };

  return mockGroups[cardId as keyof typeof mockGroups] || [];
};

// Export de toutes les cartes
export const allCards = [...bilanCards, ...resultatCards];