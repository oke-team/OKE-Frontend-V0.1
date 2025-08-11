// Données hardcodées pour le module Comptabilité

export interface Account {
  id: string;
  code: string;
  label: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  debit: number;
  credit: number;
  balance: number;
  parentCode?: string;
  isAuxiliary?: boolean;
  auxiliaryAccounts?: Account[];
}

export interface JournalEntry {
  id: string;
  date: string;
  journal: string;
  piece: string;
  accountCode: string;
  accountLabel: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  lettrage?: string;
  status: 'validated' | 'draft' | 'pending';
  attachmentUrl?: string;
  attachmentType?: 'invoice' | 'receipt' | 'contract' | 'bank_statement' | 'other';
  attachmentName?: string;
  bankTransactionId?: string;
}

export interface BankTransaction {
  id: string;
  date: string;
  reference: string;
  label: string;
  amount: number;
  balance: number;
  iban?: string;
  bic?: string;
  counterparty?: string;
  type: 'debit' | 'credit';
  category?: string;
  bankName?: 'BNP' | 'SG' | 'CA' | 'LCL' | 'CE' | 'CM' | 'HSBC' | 'BP' | 'other';
}

// Plan comptable français - uniquement les comptes (pas les classes)
export const accountsData: Account[] = [
  {
    id: '101',
    code: '101',
    label: 'Capital',
    type: 'equity',
    debit: 0,
    credit: 500000,
    balance: -500000,
    parentCode: '1'
  },
  {
    id: '106',
    code: '106',
    label: 'Réserves',
    type: 'equity',
    debit: 0,
    credit: 150000,
    balance: -150000,
    parentCode: '1'
  },
  {
    id: '120',
    code: '120',
    label: 'Résultat de l\'exercice',
    type: 'equity',
    debit: 0,
    credit: 85000,
    balance: -85000,
    parentCode: '1'
  },
  {
    id: '164',
    code: '164',
    label: 'Emprunts bancaires',
    type: 'liability',
    debit: 45000,
    credit: 160000,
    balance: -115000,
    parentCode: '1'
  },

  // Classe 2 - Immobilisations
  {
    id: '2',
    code: '2',
    label: 'COMPTES D\'IMMOBILISATIONS',
    type: 'asset',
    debit: 320000,
    credit: 0,
    balance: 320000
  },
  {
    id: '205',
    code: '205',
    label: 'Logiciels',
    type: 'asset',
    debit: 45000,
    credit: 0,
    balance: 45000,
    parentCode: '2'
  },
  {
    id: '211',
    code: '211',
    label: 'Terrains',
    type: 'asset',
    debit: 80000,
    credit: 0,
    balance: 80000,
    parentCode: '2'
  },
  {
    id: '213',
    code: '213',
    label: 'Constructions',
    type: 'asset',
    debit: 150000,
    credit: 0,
    balance: 150000,
    parentCode: '2'
  },
  {
    id: '218',
    code: '218',
    label: 'Matériel et outillage',
    type: 'asset',
    debit: 45000,
    credit: 0,
    balance: 45000,
    parentCode: '2'
  },

  // Classe 3 - Stocks
  {
    id: '3',
    code: '3',
    label: 'COMPTES DE STOCKS',
    type: 'asset',
    debit: 125000,
    credit: 0,
    balance: 125000
  },
  {
    id: '310',
    code: '310',
    label: 'Matières premières',
    type: 'asset',
    debit: 45000,
    credit: 0,
    balance: 45000,
    parentCode: '3'
  },
  {
    id: '355',
    code: '355',
    label: 'Produits finis',
    type: 'asset',
    debit: 80000,
    credit: 0,
    balance: 80000,
    parentCode: '3'
  },

  // Classe 4 - Tiers avec comptes auxiliaires
  {
    id: '4',
    code: '4',
    label: 'COMPTES DE TIERS',
    type: 'asset',
    debit: 285000,
    credit: 195000,
    balance: 90000
  },
  {
    id: '401',
    code: '401',
    label: 'Fournisseurs',
    type: 'liability',
    debit: 25000,
    credit: 95000,
    balance: -70000,
    parentCode: '4',
    auxiliaryAccounts: [
      {
        id: '401-001',
        code: '401001',
        label: 'TECH SUPPLIES SARL',
        type: 'liability',
        debit: 5000,
        credit: 25000,
        balance: -20000,
        isAuxiliary: true
      },
      {
        id: '401-002',
        code: '401002',
        label: 'OFFICE DEPOT',
        type: 'liability',
        debit: 8000,
        credit: 18000,
        balance: -10000,
        isAuxiliary: true
      },
      {
        id: '401-003',
        code: '401003',
        label: 'EDF ENTREPRISES',
        type: 'liability',
        debit: 3000,
        credit: 15000,
        balance: -12000,
        isAuxiliary: true
      },
      {
        id: '401-004',
        code: '401004',
        label: 'AMAZON BUSINESS',
        type: 'liability',
        debit: 4000,
        credit: 22000,
        balance: -18000,
        isAuxiliary: true
      },
      {
        id: '0BCENGLISH',
        code: '0BCENGLISH',
        label: 'Bc englishscore tutors',
        type: 'liability',
        debit: 0,
        credit: 0,
        balance: 0,
        isAuxiliary: true
      },
      {
        id: '0BOSUSHI',
        code: '0BOSUSHI',
        label: 'Bo sushi',
        type: 'liability',
        debit: 0,
        credit: 0,
        balance: 0,
        isAuxiliary: true
      },
      {
        id: '0CBCONSEILS',
        code: '0CBCONSEILS',
        label: 'C&b conseils',
        type: 'liability',
        debit: 3600,
        credit: 4680,
        balance: -1080,
        isAuxiliary: true
      },
      {
        id: '0CECILEPAUTHE',
        code: '0CECILEPAUTHE',
        label: 'Cecile pauthe',
        type: 'liability',
        debit: 0,
        credit: 0,
        balance: 0,
        isAuxiliary: true
      },
      {
        id: '0CLEVER',
        code: '0CLEVER',
        label: 'Clever cloud',
        type: 'liability',
        debit: 0,
        credit: 264,
        balance: -264,
        isAuxiliary: true
      }
    ]
  },
  {
    id: '411000',
    code: '411000',
    label: 'Clients',
    type: 'asset',
    debit: 0,
    credit: 0,
    balance: 0
  },
  {
    id: '445660',
    code: '445660',
    label: 'T.v.a. sur autres biens et services',
    type: 'asset',
    debit: 360,
    credit: 0,
    balance: 360
  },
  {
    id: '445710',
    code: '445710',
    label: 'T.v.a. collectée',
    type: 'liability',
    debit: 0,
    credit: 0,
    balance: 0
  },
  {
    id: '445800',
    code: '445800',
    label: 'Taxes sur le chiffre d\'affaires à régulariser ou en attente',
    type: 'liability',
    debit: 0,
    credit: 0,
    balance: 0
  },

  // Comptes de passif
  {
    id: '421000',
    code: '421000',
    label: 'Personnel - Rémunérations dues',
    type: 'liability',
    debit: 19500,
    credit: 19500,
    balance: 0,
    parentCode: '4'
  },
  {
    id: '431000',
    code: '431000',
    label: 'Sécurité sociale',
    type: 'liability',
    debit: 0,
    credit: 14000,
    balance: -14000,
    parentCode: '4'
  },
  
  // Comptes financiers
  {
    id: '512000',
    code: '512000',
    label: 'Banque',
    type: 'asset',
    debit: 7850,
    credit: 700,
    balance: 7150
  },

  
  // Comptes de charges
  {
    id: '606300',
    code: '606300',
    label: 'Fournitures d\'entretien et de petit équipement',
    type: 'expense',
    debit: 600,
    credit: 0,
    balance: 600
  },
  {
    id: '606100',
    code: '606100',
    label: 'Fournitures non stockables - Électricité',
    type: 'expense',
    debit: 1500,
    credit: 0,
    balance: 1500
  },
  {
    id: '606400',
    code: '606400',
    label: 'Fournitures administratives',
    type: 'expense',
    debit: 3000,
    credit: 0,
    balance: 3000
  },
  {
    id: '606800',
    code: '606800',
    label: 'Autres matières et fournitures',
    type: 'expense',
    debit: 2000,
    credit: 0,
    balance: 2000
  },
  {
    id: '622600',
    code: '622600',
    label: 'Honoraires',
    type: 'expense',
    debit: 3900,
    credit: 0,
    balance: 3900
  },
  {
    id: '622800',
    code: '622800',
    label: 'Rémunérations d\'intermédiaires et honoraires divers',
    type: 'expense',
    debit: 1800,
    credit: 0,
    balance: 1800
  },
  {
    id: '626700',
    code: '626700',
    label: 'Services informatiques',
    type: 'expense',
    debit: 220,
    credit: 0,
    balance: 220
  },
  {
    id: '641100',
    code: '641100',
    label: 'Salaires, appointements',
    type: 'expense',
    debit: 25000,
    credit: 0,
    balance: 25000
  },
  {
    id: '645100',
    code: '645100',
    label: 'Cotisations à l\'U.R.S.S.A.F.',
    type: 'expense',
    debit: 8500,
    credit: 0,
    balance: 8500
  },
  {
    id: '681120',
    code: '681120',
    label: 'Dotations aux amortissements des immobilisations corporelles',
    type: 'expense',
    debit: 294.94,
    credit: 0,
    balance: 294.94
  },

  // Comptes d'immobilisations
  {
    id: '218000',
    code: '218000',
    label: 'Matériel informatique',
    type: 'asset',
    debit: 7000,
    credit: 0,
    balance: 7000,
    parentCode: '2'
  },
  {
    id: '281300',
    code: '281300',
    label: 'Amortissements des constructions',
    type: 'asset',
    debit: 0,
    credit: 294.94,
    balance: -294.94,
    parentCode: '2'
  },
  {
    id: '445620',
    code: '445620',
    label: 'T.v.a. sur immobilisations',
    type: 'asset',
    debit: 1400,
    credit: 0,
    balance: 1400,
    parentCode: '4'
  },
  
  // Comptes de produits
  {
    id: '706000',
    code: '706000',
    label: 'Prestations de services',
    type: 'revenue',
    debit: 0,
    credit: 40000,
    balance: -40000
  },
  {
    id: '708500',
    code: '708500',
    label: 'Ports et frais accessoires facturés',
    type: 'revenue',
    debit: 0,
    credit: 0,
    balance: 0
  }
];

// Transactions bancaires
export const bankTransactions: BankTransaction[] = [
  {
    id: 'BT001',
    date: '2024-01-10',
    reference: 'VIR2401001',
    label: 'VIR SEPA TECH SUPPLIES SARL',
    amount: -12500,
    balance: 45230.50,
    iban: 'FR7630001007941234567890185',
    bic: 'BNPAFRPPXXX',
    counterparty: 'TECH SUPPLIES SARL',
    type: 'debit',
    category: 'Fournisseurs',
    bankName: 'BNP'
  },
  {
    id: 'BT002',
    date: '2024-01-25',
    reference: 'VIR2401002',
    label: 'VIR SEPA C&B CONSEILS',
    amount: -3600,
    balance: 41630.50,
    iban: 'FR7630001007941234567890185',
    bic: 'BNPAFRPPXXX',
    counterparty: 'C&B CONSEILS',
    type: 'debit',
    category: 'Honoraires',
    bankName: 'BNP'
  },
  {
    id: 'BT003',
    date: '2024-01-28',
    reference: 'VIR2401003',
    label: 'VIR RECU CLIENT ENTREPRISE ABC',
    amount: 18000,
    balance: 59630.50,
    iban: 'FR7630001007941234567890185',
    bic: 'BNPAFRPPXXX',
    counterparty: 'ENTREPRISE ABC',
    type: 'credit',
    category: 'Clients',
    bankName: 'BNP'
  },
  {
    id: 'BT004',
    date: '2024-02-01',
    reference: 'VIR2402001',
    label: 'VIREMENT MASSE SALARIALE',
    amount: -19500,
    balance: 40130.50,
    iban: 'FR7630001007941234567890185',
    bic: 'BNPAFRPPXXX',
    counterparty: 'SALARIÉS',
    type: 'debit',
    category: 'Salaires',
    bankName: 'BNP'
  },
  {
    id: 'BT005',
    date: '2024-02-15',
    reference: 'VIR2402002',
    label: 'VIR SEPA TECH SUPPLIES SARL',
    amount: -8400,
    balance: 31730.50,
    iban: 'FR7630001007941234567890185',
    bic: 'BNPAFRPPXXX',
    counterparty: 'TECH SUPPLIES SARL',
    type: 'debit',
    category: 'Fournisseurs',
    bankName: 'BNP'
  }
];

// Écritures du grand livre avec écritures complètes (plusieurs lignes par pièce)
export const journalEntries: JournalEntry[] = [
  // ======= FACTURE FOURNISSEUR 1 - TECH SUPPLIES (3 lignes) =======
  {
    id: 'e001-1',
    date: '2024-01-03',
    journal: 'AC',
    piece: 'FF2401-001',
    accountCode: '401001',
    accountLabel: 'TECH SUPPLIES SARL',
    description: 'Facture matériel informatique',
    debit: 0,
    credit: 12500,
    balance: -12500,
    status: 'validated',
    attachmentUrl: '/documents/factures/FF2401-001.pdf',
    attachmentType: 'invoice',
    attachmentName: 'Facture TECH SUPPLIES n°2401-001'
  },
  {
    id: 'e001-2',
    date: '2024-01-03',
    journal: 'AC',
    piece: 'FF2401-001',
    accountCode: '606300',
    accountLabel: 'Fournitures d\'entretien et de petit équipement',
    description: 'Facture matériel informatique',
    debit: 10416.67,
    credit: 0,
    balance: 10416.67,
    status: 'validated',
    attachmentUrl: '/documents/factures/FF2401-001.pdf',
    attachmentType: 'invoice',
    attachmentName: 'Facture TECH SUPPLIES n°2401-001'
  },
  {
    id: 'e001-3',
    date: '2024-01-03',
    journal: 'AC',
    piece: 'FF2401-001',
    accountCode: '445660',
    accountLabel: 'T.v.a. sur autres biens et services',
    description: 'Facture matériel informatique',
    debit: 2083.33,
    credit: 0,
    balance: 2083.33,
    status: 'validated',
    attachmentUrl: '/documents/factures/FF2401-001.pdf',
    attachmentType: 'invoice',
    attachmentName: 'Facture TECH SUPPLIES n°2401-001'
  },

  // ======= RÈGLEMENT FACTURE 1 (2 lignes) =======
  {
    id: 'e002-1',
    date: '2024-01-10',
    journal: 'BQ',
    piece: 'BQ2401-001',
    accountCode: '512000',
    accountLabel: 'Banque',
    description: 'Règlement facture FF2401-001',
    debit: 0,
    credit: 12500,
    balance: -12500,
    status: 'validated',
    bankTransactionId: 'BT001'
  },
  {
    id: 'e002-2',
    date: '2024-01-10',
    journal: 'BQ',
    piece: 'BQ2401-001',
    accountCode: '401001',
    accountLabel: 'TECH SUPPLIES SARL',
    description: 'Règlement facture FF2401-001',
    debit: 12500,
    credit: 0,
    balance: 12500,
    lettrage: 'AB',
    status: 'validated',
    bankTransactionId: 'BT001'
  },

  // ======= FACTURE FOURNISSEUR 2 - OFFICE DEPOT (3 lignes) =======
  {
    id: 'e003-1',
    date: '2024-01-08',
    journal: 'AC',
    piece: 'FF2401-002',
    accountCode: '401002',
    accountLabel: 'OFFICE DEPOT',
    description: 'Fournitures de bureau',
    debit: 0,
    credit: 3600,
    balance: -3600,
    status: 'validated'
  },
  {
    id: 'e003-2',
    date: '2024-01-08',
    journal: 'AC',
    piece: 'FF2401-002',
    accountCode: '606400',
    accountLabel: 'Fournitures administratives',
    description: 'Fournitures de bureau',
    debit: 3000,
    credit: 0,
    balance: 3000,
    status: 'validated'
  },
  {
    id: 'e003-3',
    date: '2024-01-08',
    journal: 'AC',
    piece: 'FF2401-002',
    accountCode: '445660',
    accountLabel: 'T.v.a. sur autres biens et services',
    description: 'Fournitures de bureau',
    debit: 600,
    credit: 0,
    balance: 600,
    status: 'validated'
  },

  // ======= FACTURE CLIENT 1 (3 lignes) =======
  {
    id: 'e004-1',
    date: '2024-01-12',
    journal: 'VE',
    piece: 'FC2401-001',
    accountCode: '411000',
    accountLabel: 'Clients',
    description: 'Facture prestation conseil',
    debit: 18000,
    credit: 0,
    balance: 18000,
    status: 'validated'
  },
  {
    id: 'e004-2',
    date: '2024-01-12',
    journal: 'VE',
    piece: 'FC2401-001',
    accountCode: '706000',
    accountLabel: 'Prestations de services',
    description: 'Facture prestation conseil',
    debit: 0,
    credit: 15000,
    balance: -15000,
    status: 'validated'
  },
  {
    id: 'e004-3',
    date: '2024-01-12',
    journal: 'VE',
    piece: 'FC2401-001',
    accountCode: '445710',
    accountLabel: 'T.v.a. collectée',
    description: 'Facture prestation conseil',
    debit: 0,
    credit: 3000,
    balance: -3000,
    status: 'validated'
  },

  // ======= SALAIRES (4 lignes) =======
  {
    id: 'e005-1',
    date: '2024-01-31',
    journal: 'PA',
    piece: 'PA2401-001',
    accountCode: '641100',
    accountLabel: 'Salaires, appointements',
    description: 'Salaires janvier 2024',
    debit: 25000,
    credit: 0,
    balance: 25000,
    status: 'validated'
  },
  {
    id: 'e005-2',
    date: '2024-01-31',
    journal: 'PA',
    piece: 'PA2401-001',
    accountCode: '645100',
    accountLabel: 'Cotisations à l\'U.R.S.S.A.F.',
    description: 'Salaires janvier 2024',
    debit: 8500,
    credit: 0,
    balance: 8500,
    status: 'validated'
  },
  {
    id: 'e005-3',
    date: '2024-01-31',
    journal: 'PA',
    piece: 'PA2401-001',
    accountCode: '421000',
    accountLabel: 'Personnel - Rémunérations dues',
    description: 'Salaires janvier 2024',
    debit: 0,
    credit: 19500,
    balance: -19500,
    status: 'validated'
  },
  {
    id: 'e005-4',
    date: '2024-01-31',
    journal: 'PA',
    piece: 'PA2401-001',
    accountCode: '431000',
    accountLabel: 'Sécurité sociale',
    description: 'Salaires janvier 2024',
    debit: 0,
    credit: 14000,
    balance: -14000,
    status: 'validated'
  },

  // ======= RÈGLEMENT SALAIRES (2 lignes) =======
  {
    id: 'e006-1',
    date: '2024-02-01',
    journal: 'BQ',
    piece: 'BQ2402-001',
    accountCode: '512000',
    accountLabel: 'Banque',
    description: 'Virement salaires nets',
    debit: 0,
    credit: 19500,
    balance: -19500,
    status: 'validated',
    bankTransactionId: 'BT004'
  },
  {
    id: 'e006-2',
    date: '2024-02-01',
    journal: 'BQ',
    piece: 'BQ2402-001',
    accountCode: '421000',
    accountLabel: 'Personnel - Rémunérations dues',
    description: 'Virement salaires nets',
    debit: 19500,
    credit: 0,
    balance: 19500,
    lettrage: 'CD',
    status: 'validated',
    bankTransactionId: 'BT004'
  },

  // ======= FACTURE EDF (3 lignes) =======
  {
    id: 'e007-1',
    date: '2024-01-15',
    journal: 'AC',
    piece: 'FF2401-003',
    accountCode: '401003',
    accountLabel: 'EDF ENTREPRISES',
    description: 'Facture électricité janvier',
    debit: 0,
    credit: 1800,
    balance: -1800,
    status: 'validated'
  },
  {
    id: 'e007-2',
    date: '2024-01-15',
    journal: 'AC',
    piece: 'FF2401-003',
    accountCode: '606100',
    accountLabel: 'Fournitures non stockables - Électricité',
    description: 'Facture électricité janvier',
    debit: 1500,
    credit: 0,
    balance: 1500,
    status: 'validated'
  },
  {
    id: 'e007-3',
    date: '2024-01-15',
    journal: 'AC',
    piece: 'FF2401-003',
    accountCode: '445660',
    accountLabel: 'T.v.a. sur autres biens et services',
    description: 'Facture électricité janvier',
    debit: 300,
    credit: 0,
    balance: 300,
    status: 'validated'
  },

  // ======= HONORAIRES COMPTABLE (3 lignes) =======
  {
    id: 'e008-1',
    date: '2024-01-20',
    journal: 'AC',
    piece: 'FF2401-004',
    accountCode: '0CBCONSEILS',
    accountLabel: 'C&B CONSEILS',
    description: 'Honoraires comptables T4 2023',
    debit: 0,
    credit: 4680,
    balance: -4680,
    status: 'validated'
  },
  {
    id: 'e008-2',
    date: '2024-01-20',
    journal: 'AC',
    piece: 'FF2401-004',
    accountCode: '622600',
    accountLabel: 'Honoraires',
    description: 'Honoraires comptables T4 2023',
    debit: 3900,
    credit: 0,
    balance: 3900,
    status: 'validated'
  },
  {
    id: 'e008-3',
    date: '2024-01-20',
    journal: 'AC',
    piece: 'FF2401-004',
    accountCode: '445660',
    accountLabel: 'T.v.a. sur autres biens et services',
    description: 'Honoraires comptables T4 2023',
    debit: 780,
    credit: 0,
    balance: 780,
    status: 'validated'
  },

  // ======= RÈGLEMENT HONORAIRES (2 lignes) =======
  {
    id: 'e009-1',
    date: '2024-01-25',
    journal: 'BQ',
    piece: 'BQ2401-002',
    accountCode: '512000',
    accountLabel: 'Banque',
    description: 'Paiement honoraires C&B',
    debit: 0,
    credit: 3600,
    balance: -3600,
    status: 'validated',
    bankTransactionId: 'BT002'
  },
  {
    id: 'e009-2',
    date: '2024-01-25',
    journal: 'BQ',
    piece: 'BQ2401-002',
    accountCode: '0CBCONSEILS',
    accountLabel: 'C&B CONSEILS',
    description: 'Paiement honoraires C&B',
    debit: 3600,
    credit: 0,
    balance: 3600,
    lettrage: 'EF',
    status: 'validated',
    bankTransactionId: 'BT002'
  },

  // ======= ENCAISSEMENT CLIENT (2 lignes) =======
  {
    id: 'e010-1',
    date: '2024-01-28',
    journal: 'BQ',
    piece: 'BQ2401-003',
    accountCode: '512000',
    accountLabel: 'Banque',
    description: 'Encaissement facture FC2401-001',
    debit: 18000,
    credit: 0,
    balance: 18000,
    status: 'validated',
    bankTransactionId: 'BT003'
  },
  {
    id: 'e010-2',
    date: '2024-01-28',
    journal: 'BQ',
    piece: 'BQ2401-003',
    accountCode: '411000',
    accountLabel: 'Clients',
    description: 'Encaissement facture FC2401-001',
    debit: 0,
    credit: 18000,
    balance: -18000,
    lettrage: 'GH',
    status: 'validated',
    bankTransactionId: 'BT003'
  },

  // ======= ACHAT AMAZON BUSINESS (3 lignes) =======
  {
    id: 'e011-1',
    date: '2024-02-02',
    journal: 'AC',
    piece: 'FF2402-001',
    accountCode: '401004',
    accountLabel: 'AMAZON BUSINESS',
    description: 'Matériel bureau & fournitures',
    debit: 0,
    credit: 2400,
    balance: -2400,
    status: 'validated'
  },
  {
    id: 'e011-2',
    date: '2024-02-02',
    journal: 'AC',
    piece: 'FF2402-001',
    accountCode: '606800',
    accountLabel: 'Autres matières et fournitures',
    description: 'Matériel bureau & fournitures',
    debit: 2000,
    credit: 0,
    balance: 2000,
    status: 'validated'
  },
  {
    id: 'e011-3',
    date: '2024-02-02',
    journal: 'AC',
    piece: 'FF2402-001',
    accountCode: '445660',
    accountLabel: 'T.v.a. sur autres biens et services',
    description: 'Matériel bureau & fournitures',
    debit: 400,
    credit: 0,
    balance: 400,
    status: 'validated'
  },

  // ======= FACTURE CLIENT 2 (3 lignes) =======
  {
    id: 'e012-1',
    date: '2024-02-05',
    journal: 'VE',
    piece: 'FC2402-001',
    accountCode: '411000',
    accountLabel: 'Clients',
    description: 'Mission audit financier',
    debit: 30000,
    credit: 0,
    balance: 30000,
    status: 'validated'
  },
  {
    id: 'e012-2',
    date: '2024-02-05',
    journal: 'VE',
    piece: 'FC2402-001',
    accountCode: '706000',
    accountLabel: 'Prestations de services',
    description: 'Mission audit financier',
    debit: 0,
    credit: 25000,
    balance: -25000,
    status: 'validated'
  },
  {
    id: 'e012-3',
    date: '2024-02-05',
    journal: 'VE',
    piece: 'FC2402-001',
    accountCode: '445710',
    accountLabel: 'T.v.a. collectée',
    description: 'Mission audit financier',
    debit: 0,
    credit: 5000,
    balance: -5000,
    status: 'validated'
  },

  // ======= DOTATION AUX AMORTISSEMENTS (2 lignes) =======
  {
    id: 'e013-1',
    date: '2024-01-31',
    journal: 'OD',
    piece: 'OD2401-001',
    accountCode: '681120',
    accountLabel: 'Dotations aux amortissements des immobilisations corporelles',
    description: 'Amortissement janvier 2024',
    debit: 294.94,
    credit: 0,
    balance: 294.94,
    status: 'validated'
  },
  {
    id: 'e013-2',
    date: '2024-01-31',
    journal: 'OD',
    piece: 'OD2401-001',
    accountCode: '281300',
    accountLabel: 'Amortissements des constructions',
    description: 'Amortissement janvier 2024',
    debit: 0,
    credit: 294.94,
    balance: -294.94,
    status: 'validated'
  },

  // ======= CLEVER CLOUD (3 lignes) =======
  {
    id: 'e014-1',
    date: '2024-02-08',
    journal: 'AC',
    piece: 'FF2402-002',
    accountCode: '0CLEVER',
    accountLabel: 'CLEVER CLOUD',
    description: 'Hébergement cloud février',
    debit: 0,
    credit: 264,
    balance: -264,
    status: 'validated'
  },
  {
    id: 'e014-2',
    date: '2024-02-08',
    journal: 'AC',
    piece: 'FF2402-002',
    accountCode: '626700',
    accountLabel: 'Services informatiques',
    description: 'Hébergement cloud février',
    debit: 220,
    credit: 0,
    balance: 220,
    status: 'validated'
  },
  {
    id: 'e014-3',
    date: '2024-02-08',
    journal: 'AC',
    piece: 'FF2402-002',
    accountCode: '445660',
    accountLabel: 'T.v.a. sur autres biens et services',
    description: 'Hébergement cloud février',
    debit: 44,
    credit: 0,
    balance: 44,
    status: 'validated'
  },

  // ======= AUTRES ÉCRITURES pour TECH SUPPLIES (pour avoir plus de mouvements) =======
  {
    id: 'e015-1',
    date: '2024-02-10',
    journal: 'AC',
    piece: 'FF2402-003',
    accountCode: '401001',
    accountLabel: 'TECH SUPPLIES SARL',
    description: 'Commande serveurs',
    debit: 0,
    credit: 8400,
    balance: -8400,
    status: 'validated'
  },
  {
    id: 'e015-2',
    date: '2024-02-10',
    journal: 'AC',
    piece: 'FF2402-003',
    accountCode: '218000',
    accountLabel: 'Matériel informatique',
    description: 'Commande serveurs',
    debit: 7000,
    credit: 0,
    balance: 7000,
    status: 'validated'
  },
  {
    id: 'e015-3',
    date: '2024-02-10',
    journal: 'AC',
    piece: 'FF2402-003',
    accountCode: '445620',
    accountLabel: 'T.v.a. sur immobilisations',
    description: 'Commande serveurs',
    debit: 1400,
    credit: 0,
    balance: 1400,
    status: 'validated'
  },

  // ======= RÈGLEMENT TECH SUPPLIES 2 =======
  {
    id: 'e016-1',
    date: '2024-02-15',
    journal: 'BQ',
    piece: 'BQ2402-002',
    accountCode: '512000',
    accountLabel: 'Banque',
    description: 'Règlement FF2402-003',
    debit: 0,
    credit: 8400,
    balance: -8400,
    status: 'validated',
    bankTransactionId: 'BT005'
  },
  {
    id: 'e016-2',
    date: '2024-02-15',
    journal: 'BQ',
    piece: 'BQ2402-002',
    accountCode: '401001',
    accountLabel: 'TECH SUPPLIES SARL',
    description: 'Règlement FF2402-003',
    debit: 8400,
    credit: 0,
    balance: 8400,
    lettrage: 'IJ',
    status: 'validated',
    bankTransactionId: 'BT005'
  }
];

// Fonction pour obtenir les écritures d'un compte spécifique
export function getEntriesByAccount(accountCode: string): JournalEntry[] {
  return journalEntries.filter(entry => 
    entry.accountCode === accountCode || 
    entry.accountCode.startsWith(accountCode)
  );
}

// Fonction pour obtenir toutes les lignes d'une même pièce comptable
export function getEntriesByPiece(piece: string): JournalEntry[] {
  return journalEntries.filter(entry => entry.piece === piece);
}

// Fonction pour calculer le solde progressif
export function calculateProgressiveBalance(entries: JournalEntry[]): JournalEntry[] {
  let balance = 0;
  return entries.map(entry => {
    balance += entry.debit - entry.credit;
    return { ...entry, balance };
  });
}

// Fonction pour obtenir une transaction bancaire par ID
export function getBankTransactionById(id: string): BankTransaction | undefined {
  return bankTransactions.find(transaction => transaction.id === id);
}