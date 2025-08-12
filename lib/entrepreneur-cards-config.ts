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
    id: 'stocks',
    title: 'Stocks',
    accounts: ['31', '32', '33', '34', '35', '36', '37'],
    type: 'bilan',
    icon: 'Package2',
    color: 'violet',
    description: 'Valeur des stocks et en-cours',
  },
  {
    id: 'debts',
    title: 'Dettes financières',
    accounts: ['16', '164', '165', '166', '167', '168'],
    type: 'bilan',
    icon: 'CreditCard',
    color: 'red',
    description: 'Emprunts et dettes bancaires',
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
    title: 'Achats marchandises',
    accounts: ['60', '601', '602', '603', '604', '605', '606', '607', '608', '609'],
    type: 'resultat',
    icon: 'ShoppingCart',
    color: 'orange',
    description: 'Achats de marchandises et matières premières',
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
    id: 'exceptional',
    title: 'Charges exceptionnelles',
    accounts: ['67', '671', '675', '678'],
    type: 'resultat',
    icon: 'AlertTriangle',
    color: 'red',
    description: 'Charges exceptionnelles',
  },
  {
    id: 'other_income',
    title: 'Autres produits',
    accounts: ['74', '75', '76', '77', '791'],
    type: 'resultat',
    icon: 'Plus',
    color: 'green',
    description: 'Subventions, produits financiers et exceptionnels',
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
    treasury: [
      {
        id: 'bank',
        label: 'Comptes bancaires',
        accounts: [
          { id: '512001', label: 'BNP Paribas - Compte courant', balance: 45231, trend: 'up' as const },
          { id: '512002', label: 'Crédit Agricole - Compte pro', balance: 28450, trend: 'stable' as const },
        ],
        total: 73681,
      },
      {
        id: 'cash',
        label: 'Disponibilités',
        accounts: [
          { id: '530001', label: 'Caisse principale', balance: 1250, trend: 'down' as const },
          { id: '514001', label: 'Chèques à encaisser', balance: 5600, trend: 'up' as const },
        ],
        total: 6850,
      },
    ],
    clients: [
      {
        id: 'invoices',
        label: 'Factures clients',
        accounts: [
          { id: '411001', label: 'Client ABC Corp', balance: 12500, trend: 'stable' as const, warning: true, lastMovement: 'Il y a 3 jours' },
          { id: '411002', label: 'Client XYZ Ltd', balance: 8750, trend: 'up' as const, lastMovement: 'Aujourd\'hui' },
          { id: '411003', label: 'Client DEF Sarl', balance: 15230, trend: 'down' as const, lastMovement: 'Il y a 7 jours' },
        ],
        total: 36480,
      },
      {
        id: 'doubtful',
        label: 'Créances douteuses',
        accounts: [
          { id: '416001', label: 'Client en litige', balance: 3200, warning: true, lastMovement: 'Il y a 45 jours' },
        ],
        total: 3200,
      },
    ],
    suppliers: [
      {
        id: 'invoices',
        label: 'Factures fournisseurs',
        accounts: [
          { id: '401001', label: 'Fournisseur Alpha', balance: -8500, trend: 'up' as const },
          { id: '401002', label: 'Fournisseur Beta', balance: -4200, trend: 'stable' as const },
          { id: '401003', label: 'EDF', balance: -1850, trend: 'down' as const },
        ],
        total: -14550,
      },
    ],
    // Ajouter les autres groupes selon les besoins...
  };

  return mockGroups[cardId as keyof typeof mockGroups] || [];
};

// Export de toutes les cartes
export const allCards = [...bilanCards, ...resultatCards];