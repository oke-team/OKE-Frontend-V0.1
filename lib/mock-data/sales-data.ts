import { Invoice, Client, Product, SalesStats } from '../types/invoice';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'JACOB ADVISORY SAS',
    client_code: 'CLI001',
    address_line1: 'LA RUCHE',
    address_line2: '126 rue du 11 Novembre 1918',
    postal_code: '74460',
    city: 'Marnaz',
    country: 'France',
    siret: '880 172 044 00039',
    vat_number: 'FR89880172044',
    email: 'contact@jacob-advisory.com',
    phone: '+33 4 50 89 12 34',
    payment_terms: 30,
    payment_method: 'Virement bancaire',
    industry: 'Conseil en gestion',
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-12-01T14:30:00Z'
  },
  {
    id: '2',
    name: 'TECH SOLUTIONS SARL',
    client_code: 'CLI002',
    address_line1: '25 Avenue des Champs-Élysées',
    postal_code: '75008',
    city: 'Paris',
    country: 'France',
    siret: '789 456 123 00012',
    vat_number: 'FR12789456123',
    email: 'contact@tech-solutions.fr',
    phone: '+33 1 42 89 56 78',
    payment_terms: 45,
    payment_method: 'Prélèvement SEPA',
    industry: 'Technologies de l\'information',
    website: 'https://tech-solutions.fr',
    is_active: true,
    created_at: '2024-02-20T09:15:00Z',
    updated_at: '2024-11-28T16:45:00Z'
  },
  {
    id: '3',
    name: 'INNOVATION CORP',
    client_code: 'CLI003',
    address_line1: '12 Rue de Rivoli',
    postal_code: '75004',
    city: 'Paris',
    country: 'France',
    siret: '654 321 987 00089',
    vat_number: 'FR89654321987',
    email: 'hello@innovation-corp.com',
    phone: '+33 1 23 45 67 89',
    payment_terms: 60,
    payment_method: 'Chèque',
    industry: 'Innovation technologique',
    credit_limit: 100000,
    notes: 'Client premium avec conditions spéciales',
    is_active: true,
    created_at: '2024-03-10T11:30:00Z',
    updated_at: '2024-12-15T08:20:00Z'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    code: 'PREST001',
    name: 'Prestations conseil selon nos accords',
    description: 'Missions de conseil en gestion d\'entreprise',
    unit_price: 50000,
    unit: 'forfait',
    vat_rate: 20,
    account_code: '706000',
    account_name: 'Prestations de services',
    category: 'Conseil',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-12-01T00:00:00Z'
  },
  {
    id: '2',
    code: 'FORM001',
    name: 'Formation en gestion financière',
    description: 'Formation personnalisée en gestion financière pour dirigeants',
    unit_price: 1500,
    unit: 'jour',
    vat_rate: 20,
    account_code: '706100',
    account_name: 'Prestations de formation',
    category: 'Formation',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-12-01T00:00:00Z'
  },
  {
    id: '3',
    code: 'AUDIT001',
    name: 'Audit comptable et financier',
    description: 'Mission d\'audit complet des comptes annuels',
    unit_price: 8000,
    unit: 'mission',
    vat_rate: 20,
    account_code: '706200',
    account_name: 'Prestations d\'audit',
    category: 'Audit',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-12-01T00:00:00Z'
  },
  {
    id: '4',
    code: 'SOFT001',
    name: 'Licence logiciel de gestion',
    description: 'Licence annuelle pour logiciel de gestion d\'entreprise',
    unit_price: 2400,
    unit: 'licence',
    vat_rate: 20,
    account_code: '706300',
    account_name: 'Ventes de licences',
    category: 'Logiciel',
    track_stock: false,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-12-01T00:00:00Z'
  },
  {
    id: '5',
    code: 'MAINT001',
    name: 'Maintenance informatique',
    description: 'Maintenance préventive et corrective du parc informatique',
    unit_price: 120,
    unit: 'heure',
    vat_rate: 20,
    account_code: '706400',
    account_name: 'Services de maintenance',
    category: 'Maintenance',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-12-01T00:00:00Z'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: '2024-001',
    title: 'Facture',
    type: 'invoice',
    status: 'paid',
    issue_date: '2024-11-15T00:00:00Z',
    due_date: '2024-12-15T00:00:00Z',
    payment_date: '2024-12-10T00:00:00Z',
    issuer: {
      name: 'LOGEFI SERVICES SARL',
      address_line1: '8 rue Saint Marc',
      postal_code: '75002',
      city: 'Paris',
      country: 'France',
      siret: '843 117 227 00036',
      vat_number: 'FR63843117227',
      email: 'contact@logefi-services.fr',
      phone: '+33 1 42 97 42 97',
      legal_form: 'SARL',
      capital: 10000,
      logo_text: 'LS'
    },
    client: mockClients[0],
    items: [
      {
        id: 'item-1',
        description: 'Prestations conseil selon nos accords',
        details: ['Mission de conseil en gestion d\'entreprise', 'Période : Novembre 2024'],
        quantity: 1,
        unit: 'forfait',
        unit_price: 50000,
        vat_rate: 20,
        account_code: '706000',
        account_name: 'Prestations de services',
        total_ht: 50000,
        vat_amount: 10000,
        total_ttc: 60000
      }
    ],
    payment: {
      method: 'Virement bancaire',
      bank_name: 'SOCIÉTÉ GÉNÉRALE',
      iban: 'FR76 3000 3033 5100 0201 0389 532',
      bic: 'SOGEFRPP',
      reference: 'FACT2024001'
    },
    currency: 'EUR',
    language: 'fr',
    is_facturx: true,
    total_ht: 50000,
    total_vat: 10000,
    total_ttc: 60000,
    vat_groups: [
      {
        rate: 20,
        base: 50000,
        amount: 10000
      }
    ],
    late_penalty_rate: 3,
    recovery_indemnity: 40,
    created_at: '2024-11-15T10:00:00Z',
    updated_at: '2024-11-15T10:00:00Z',
    created_by: 'user-1'
  },
  {
    id: '2',
    number: '2024-002',
    title: 'Facture',
    type: 'invoice',
    status: 'sent',
    issue_date: '2024-12-01T00:00:00Z',
    due_date: '2024-12-31T00:00:00Z',
    issuer: {
      name: 'LOGEFI SERVICES SARL',
      address_line1: '8 rue Saint Marc',
      postal_code: '75002',
      city: 'Paris',
      country: 'France',
      siret: '843 117 227 00036',
      vat_number: 'FR63843117227',
      email: 'contact@logefi-services.fr',
      phone: '+33 1 42 97 42 97',
      legal_form: 'SARL',
      capital: 10000,
      logo_text: 'LS'
    },
    client: mockClients[1],
    items: [
      {
        id: 'item-1',
        description: 'Formation en gestion financière',
        details: ['Formation personnalisée pour dirigeants', '3 jours de formation intensive'],
        quantity: 3,
        unit: 'jour',
        unit_price: 1500,
        vat_rate: 20,
        account_code: '706100',
        account_name: 'Prestations de formation',
        total_ht: 4500,
        vat_amount: 900,
        total_ttc: 5400
      },
      {
        id: 'item-2',
        description: 'Documentation et support',
        details: ['Manuel de formation', 'Support téléphonique 1 mois'],
        quantity: 1,
        unit: 'forfait',
        unit_price: 500,
        vat_rate: 20,
        account_code: '706100',
        account_name: 'Prestations de formation',
        total_ht: 500,
        vat_amount: 100,
        total_ttc: 600
      }
    ],
    payment: {
      method: 'Prélèvement SEPA',
      bank_name: 'BNP PARIBAS',
      iban: 'FR14 2004 1010 0505 0001 3M02 606',
      bic: 'BNPAFRPP',
      reference: 'FACT2024002'
    },
    currency: 'EUR',
    language: 'fr',
    is_facturx: true,
    total_ht: 5000,
    total_vat: 1000,
    total_ttc: 6000,
    vat_groups: [
      {
        rate: 20,
        base: 5000,
        amount: 1000
      }
    ],
    late_penalty_rate: 3,
    recovery_indemnity: 40,
    created_at: '2024-12-01T09:30:00Z',
    updated_at: '2024-12-01T09:30:00Z',
    created_by: 'user-1'
  }
];

export const mockQuotes: Invoice[] = [
  {
    id: 'q1',
    number: 'DEV-2024-001',
    title: 'Devis',
    type: 'quote',
    status: 'sent',
    issue_date: '2024-12-20T00:00:00Z',
    due_date: '2025-01-20T00:00:00Z',
    issuer: {
      name: 'LOGEFI SERVICES SARL',
      address_line1: '8 rue Saint Marc',
      postal_code: '75002',
      city: 'Paris',
      country: 'France',
      siret: '843 117 227 00036',
      vat_number: 'FR63843117227',
      email: 'contact@logefi-services.fr',
      phone: '+33 1 42 97 42 97',
      legal_form: 'SARL',
      capital: 10000,
      logo_text: 'LS'
    },
    client: mockClients[2],
    items: [
      {
        id: 'item-1',
        description: 'Audit comptable complet',
        details: ['Audit des comptes 2024', 'Rapport détaillé avec recommandations'],
        quantity: 1,
        unit: 'mission',
        unit_price: 8000,
        vat_rate: 20,
        account_code: '706200',
        account_name: 'Prestations d\'audit',
        total_ht: 8000,
        vat_amount: 1600,
        total_ttc: 9600
      }
    ],
    payment: {
      method: 'Virement bancaire',
      reference: 'DEV2024001'
    },
    currency: 'EUR',
    language: 'fr',
    is_facturx: false,
    total_ht: 8000,
    total_vat: 1600,
    total_ttc: 9600,
    vat_groups: [
      {
        rate: 20,
        base: 8000,
        amount: 1600
      }
    ],
    notes: 'Devis valable 30 jours. Signature électronique requise.',
    created_at: '2024-12-20T14:15:00Z',
    updated_at: '2024-12-20T14:15:00Z',
    created_by: 'user-1'
  }
];

export const mockSalesStats: SalesStats = {
  current_month: {
    invoice_count: 24,
    quote_count: 8,
    total_revenue: 156420,
    total_pending: 45300
  },
  previous_month: {
    invoice_count: 21,
    quote_count: 6,
    total_revenue: 142800,
    total_pending: 32100
  },
  top_clients: [
    {
      client_name: 'JACOB ADVISORY SAS',
      total_amount: 75000,
      invoice_count: 3
    },
    {
      client_name: 'TECH SOLUTIONS SARL',
      total_amount: 45600,
      invoice_count: 5
    },
    {
      client_name: 'INNOVATION CORP',
      total_amount: 35820,
      invoice_count: 2
    }
  ],
  top_products: [
    {
      product_name: 'Prestations conseil selon nos accords',
      quantity_sold: 4,
      total_amount: 200000
    },
    {
      product_name: 'Formation en gestion financière',
      quantity_sold: 12,
      total_amount: 18000
    },
    {
      product_name: 'Audit comptable et financier',
      quantity_sold: 3,
      total_amount: 24000
    }
  ]
};

// Données pour la recherche API Pappers (mock)
export const mockPappersResults = [
  {
    siren: '880172044',
    siret: '88017204400039',
    denomination: 'JACOB ADVISORY',
    forme_juridique: 'SAS',
    adresse: {
      ligne1: 'LA RUCHE',
      ligne2: '126 rue du 11 Novembre 1918',
      code_postal: '74460',
      ville: 'Marnaz',
      pays: 'France'
    },
    numero_tva_intracommunautaire: 'FR89880172044',
    email: 'contact@jacob-advisory.com',
    telephone: '+33450891234'
  },
  {
    siren: '789456123',
    siret: '78945612300012',
    denomination: 'TECH SOLUTIONS',
    forme_juridique: 'SARL',
    adresse: {
      ligne1: '25 Avenue des Champs-Élysées',
      code_postal: '75008',
      ville: 'Paris',
      pays: 'France'
    },
    numero_tva_intracommunautaire: 'FR12789456123',
    email: 'contact@tech-solutions.fr',
    telephone: '+33142895678',
    site_web: 'https://tech-solutions.fr'
  }
];

// Configuration par défaut pour les factures
export const defaultInvoiceSettings = {
  invoice_prefix: 'FACT-',
  quote_prefix: 'DEV-',
  credit_note_prefix: 'AVOIR-',
  next_invoice_number: 3,
  next_quote_number: 2,
  default_currency: 'EUR',
  default_language: 'fr' as const,
  default_payment_terms: 30,
  default_vat_rate: 20,
  late_penalty_rate: 3,
  recovery_indemnity: 40,
  legal_mentions: 'En cas de retard de paiement, pénalités appliquées au taux légal et indemnité forfaitaire de 40 € pour frais de recouvrement.',
  email_subject_template: 'Facture {{invoice_number}} - {{client_name}}',
  email_body_template: 'Bonjour,\n\nVeuillez trouver ci-joint votre facture {{invoice_number}}.\n\nCordialement,\nL\'équipe OKÉ',
  pappers_api_enabled: true,
  yousign_api_enabled: true,
  chift_api_enabled: true
};

// Fonctions utilitaires pour les calculs
export const calculateInvoiceTotals = (items: any[]) => {
  const itemsWithTotals = items.map(item => ({
    ...item,
    total_ht: item.quantity * item.unit_price,
    vat_amount: (item.quantity * item.unit_price) * (item.vat_rate / 100),
    total_ttc: (item.quantity * item.unit_price) * (1 + item.vat_rate / 100)
  }));

  const total_ht = itemsWithTotals.reduce((sum, item) => sum + item.total_ht, 0);
  const total_vat = itemsWithTotals.reduce((sum, item) => sum + item.vat_amount, 0);
  const total_ttc = total_ht + total_vat;

  // Grouper les TVA par taux
  const vatGroups = itemsWithTotals.reduce((groups: any[], item) => {
    const existingGroup = groups.find(g => g.rate === item.vat_rate);
    if (existingGroup) {
      existingGroup.base += item.total_ht;
      existingGroup.amount += item.vat_amount;
    } else {
      groups.push({
        rate: item.vat_rate,
        base: item.total_ht,
        amount: item.vat_amount
      });
    }
    return groups;
  }, []);

  return {
    items: itemsWithTotals,
    total_ht,
    total_vat,
    total_ttc,
    vat_groups: vatGroups
  };
};

export const generateInvoiceNumber = (type: 'invoice' | 'quote' | 'credit_note') => {
  const year = new Date().getFullYear();
  const settings = defaultInvoiceSettings;
  
  switch (type) {
    case 'invoice':
      return `${settings.invoice_prefix}${year}-${String(settings.next_invoice_number).padStart(3, '0')}`;
    case 'quote':
      return `${settings.quote_prefix}${year}-${String(settings.next_quote_number).padStart(3, '0')}`;
    case 'credit_note':
      return `${settings.credit_note_prefix}${year}-001`;
    default:
      return `${year}-001`;
  }
};