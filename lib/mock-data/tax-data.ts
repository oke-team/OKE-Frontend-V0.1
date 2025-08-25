// Données mockées pour le module fiscalité OKÉ

import { 
  TaxDeclaration, 
  CompanyTaxProfile, 
  DirectorTaxData, 
  TaxDashboardData, 
  TVADeclarationData,
  CompanyVehicle,
  ASPONECredentials,
  ActivityLog,
  Deadline
} from '@/lib/types/tax-types';

// Profil fiscal de l'entreprise exemple
export const mockCompanyTaxProfile: CompanyTaxProfile = {
  siret: '12345678901234',
  legalForm: 'SARL',
  activityCode: '6201Z',
  businessName: 'DEMO ENTREPRISE SARL',
  address: {
    street: '123 Rue de la République',
    postalCode: '75001',
    city: 'Paris',
    country: 'France'
  },
  
  tva: {
    isSubjectToTVA: true,
    regime: 'NORMAL',
    frequency: 'MONTHLY',
    taxNumber: 'FR12345678901',
    startDate: '2024-01-01'
  },
  
  vehicles: {
    hasCompanyVehicles: true,
    vehicleCount: 2,
    vehicles: [
      {
        id: 'v1',
        brand: 'Peugeot',
        model: '308',
        licensePlate: 'AB-123-CD',
        co2Emissions: 120,
        fiscalPower: 7,
        acquisitionDate: '2023-03-15',
        acquisitionPrice: 25000,
        isElectric: false
      },
      {
        id: 'v2',
        brand: 'Tesla',
        model: 'Model 3',
        licensePlate: 'EF-456-GH',
        co2Emissions: 0,
        fiscalPower: 15,
        acquisitionDate: '2024-01-10',
        acquisitionPrice: 45000,
        isElectric: true
      }
    ]
  },
  
  director: {
    firstName: 'Jean',
    lastName: 'Dupont',
    status: 'TNS',
    sharePercentage: 60,
    personalTaxOptIn: true
  }
};

// Données fiscales du dirigeant
export const mockDirectorTaxData: DirectorTaxData = {
  tnsSalary: 48000,
  dividends: 12000,
  realEstateIncome: 8400,
  capitalGains: 0,
  familyStatus: 'MARRIED',
  dependents: 2,
  previousDeficits: 0,
  carryForwardLosses: 0
};

// Déclarations mockées
export const mockTaxDeclarations: TaxDeclaration[] = [
  // TVA
  {
    id: 'tva-2024-11',
    type: 'TVA',
    group: 'tva',
    status: 'accepted',
    title: 'Déclaration TVA Novembre 2024',
    description: 'CA3 - Régime normal mensuel',
    period: { start: '2024-11-01', end: '2024-11-30', year: 2024 },
    dueDate: '2024-12-15',
    amount: 8750.50,
    submissionDate: '2024-12-10',
    acknowledgmentRef: 'TVA202411-AC-789456',
    lastModified: '2024-12-10T14:30:00Z',
    createdBy: 'jean.dupont@demo.com'
  },
  {
    id: 'tva-2024-12',
    type: 'TVA',
    group: 'tva',
    status: 'draft',
    title: 'Déclaration TVA Décembre 2024',
    description: 'CA3 - Régime normal mensuel',
    period: { start: '2024-12-01', end: '2024-12-31', year: 2024 },
    dueDate: '2025-01-15',
    amount: 9200.00,
    lastModified: '2024-12-15T09:15:00Z',
    createdBy: 'jean.dupont@demo.com'
  },
  
  // Liasse fiscale
  {
    id: 'is-2024',
    type: 'IS',
    group: 'liasse',
    status: 'submitted',
    title: 'Impôt sur les Sociétés 2024',
    description: 'Déclaration annuelle IS + liasse fiscale',
    period: { start: '2024-01-01', end: '2024-12-31', year: 2024 },
    dueDate: '2025-05-15',
    amount: 15200.00,
    submissionDate: '2024-04-28',
    acknowledgmentRef: 'IS2024-SUB-456123',
    lastModified: '2024-04-28T16:45:00Z',
    createdBy: 'jean.dupont@demo.com'
  },
  {
    id: 'tdfc-2024',
    type: 'TDFC',
    group: 'liasse',
    status: 'pending',
    title: 'TDFC Véhicules de Société 2024',
    description: 'Taxe sur les véhicules de tourisme des sociétés',
    period: { start: '2024-01-01', end: '2024-12-31', year: 2024 },
    dueDate: '2025-05-31',
    amount: 1850.00,
    lastModified: '2024-12-01T11:20:00Z',
    createdBy: 'jean.dupont@demo.com'
  },
  
  // Autres déclarations
  {
    id: 'paiement-is-2024-acompte1',
    type: 'PAIEMENT',
    group: 'other',
    status: 'accepted',
    title: 'Acompte IS 1er trimestre 2024',
    description: 'Premier acompte d\'impôt sur les sociétés',
    period: { start: '2024-01-01', end: '2024-03-31', year: 2024 },
    dueDate: '2024-03-15',
    amount: 3800.00,
    submissionDate: '2024-03-10',
    acknowledgmentRef: 'PAY-IS-2024-Q1-789',
    lastModified: '2024-03-10T10:30:00Z',
    createdBy: 'jean.dupont@demo.com'
  },
  
  // Personnel dirigeant
  {
    id: 'ir-dirigeant-2024',
    type: 'IR',
    group: 'personal',
    status: 'draft',
    title: 'Déclaration IR Jean Dupont 2024',
    description: 'Déclaration personnelle avec revenus TNS et dividendes',
    period: { start: '2024-01-01', end: '2024-12-31', year: 2024 },
    dueDate: '2025-05-31',
    amount: 12450.00,
    lastModified: '2024-12-20T15:45:00Z',
    createdBy: 'jean.dupont@demo.com'
  }
];

// Données TVA détaillées pour déclaration en cours
export const mockTVADeclarationData: TVADeclarationData = {
  period: {
    month: 12,
    quarter: 4,
    year: 2024,
    type: 'monthly'
  },
  
  salesVATCollected: 12000.00,
  purchaseVATDeductible: 2800.00,
  previousCredit: 0,
  vatToPay: 9200.00,
  vatCredit: 0,
  
  vatByRate: {
    rate20: { baseAmount: 45000.00, vatAmount: 9000.00 },
    rate10: { baseAmount: 15000.00, vatAmount: 1500.00 },
    rate55: { baseAmount: 9090.91, vatAmount: 500.00 },
    rate21: { baseAmount: 0, vatAmount: 0 }
  },
  
  adjustments: [
    {
      description: 'Régularisation véhicule de tourisme',
      amount: -300.00,
      type: 'credit'
    }
  ],
  
  intraCommunityAcquisitions: 5000.00,
  intraCommunityDeliveries: 8000.00,
  exports: 12000.00
};

// Activité récente
export const mockActivityLog: ActivityLog[] = [
  {
    id: 'act1',
    timestamp: '2024-12-20T15:45:00Z',
    type: 'modification',
    declarationType: 'IR',
    message: 'Modification déclaration IR dirigeant 2024',
    details: 'Ajout revenus SCI'
  },
  {
    id: 'act2',
    timestamp: '2024-12-15T09:15:00Z',
    type: 'submission',
    declarationType: 'TVA',
    message: 'Brouillon TVA Décembre sauvegardé',
    details: 'Calculs automatiques effectués'
  },
  {
    id: 'act3',
    timestamp: '2024-12-10T14:30:00Z',
    type: 'acceptance',
    declarationType: 'TVA',
    message: 'TVA Novembre acceptée par l\'administration',
    details: 'Référence: TVA202411-AC-789456'
  },
  {
    id: 'act4',
    timestamp: '2024-12-01T11:20:00Z',
    type: 'modification',
    declarationType: 'TDFC',
    message: 'Mise à jour TDFC véhicules 2024',
    details: 'Ajout Tesla Model 3'
  }
];

// Échéances à venir
export const mockUpcomingDeadlines: Deadline[] = [
  {
    id: 'deadline1',
    declarationType: 'TVA',
    title: 'TVA Décembre 2024',
    dueDate: '2025-01-15',
    daysUntilDue: 26,
    priority: 'high',
    isOverdue: false,
    amount: 9200.00,
    status: 'draft'
  },
  {
    id: 'deadline2',
    declarationType: 'IS',
    title: 'Acompte IS T1 2025',
    dueDate: '2025-03-15',
    daysUntilDue: 85,
    priority: 'medium',
    isOverdue: false,
    amount: 3800.00,
    status: 'draft'
  },
  {
    id: 'deadline3',
    declarationType: 'IR',
    title: 'Déclaration IR dirigeant 2024',
    dueDate: '2025-05-31',
    daysUntilDue: 162,
    priority: 'low',
    isOverdue: false,
    amount: 12450.00,
    status: 'draft'
  },
  {
    id: 'deadline4',
    declarationType: 'TDFC',
    title: 'TDFC Véhicules 2024',
    dueDate: '2025-05-31',
    daysUntilDue: 162,
    priority: 'low',
    isOverdue: false,
    amount: 1850.00,
    status: 'draft'
  }
];

// Dashboard complet
export const mockTaxDashboardData: TaxDashboardData = {
  summary: {
    totalDeclarations: 6,
    pendingDeclarations: 3,
    submittedDeclarations: 1,
    acceptedDeclarations: 2,
    rejectedDeclarations: 0,
    upcomingDeadlines: 4,
    criticalDeadlines: 1
  },
  
  groups: {
    tva: {
      name: 'TVA',
      count: 2,
      pendingCount: 1,
      nextDeadline: '2025-01-15',
      status: 'warning',
      declarations: mockTaxDeclarations.filter(d => d.group === 'tva')
    },
    liasse: {
      name: 'Liasse fiscale',
      count: 2,
      pendingCount: 1,
      nextDeadline: '2025-05-15',
      status: 'ok',
      declarations: mockTaxDeclarations.filter(d => d.group === 'liasse')
    },
    other: {
      name: 'Autres déclarations',
      count: 1,
      pendingCount: 0,
      status: 'ok',
      declarations: mockTaxDeclarations.filter(d => d.group === 'other')
    },
    personal: {
      name: 'Personnel dirigeant',
      count: 1,
      pendingCount: 1,
      nextDeadline: '2025-05-31',
      status: 'ok',
      declarations: mockTaxDeclarations.filter(d => d.group === 'personal')
    }
  },
  
  recentActivity: mockActivityLog,
  upcomingDeadlines: mockUpcomingDeadlines
};

// Credentials ASP ONE (pour test)
export const mockASPONECredentials: ASPONECredentials = {
  environment: 'test',
  accountId: '151982',
  login: 'oke_test1',
  portal: 'OKE',
  apiUrl: 'https://recette-oke.tessitechno.fr/api/rest'
};

// Helpers pour simuler les opérations
export const getTaxDeclarationById = (id: string): TaxDeclaration | undefined => {
  return mockTaxDeclarations.find(d => d.id === id);
};

export const getTaxDeclarationsByGroup = (group: string): TaxDeclaration[] => {
  return mockTaxDeclarations.filter(d => d.group === group);
};

export const getUpcomingDeadlines = (limit: number = 10): Deadline[] => {
  return mockUpcomingDeadlines
    .sort((a, b) => a.daysUntilDue - b.daysUntilDue)
    .slice(0, limit);
};

export const getCriticalDeadlines = (): Deadline[] => {
  return mockUpcomingDeadlines.filter(d => d.priority === 'critical' || d.daysUntilDue <= 7);
};

// Simulation des statuts de transmission
export const simulateTransmissionStatus = (declarationId: string) => {
  // Simulation d'un workflow de transmission
  const statuses = ['submitted', 'processing', 'accepted'];
  let currentStatusIndex = 0;
  
  return {
    getCurrentStatus: () => statuses[currentStatusIndex],
    nextStatus: () => {
      if (currentStatusIndex < statuses.length - 1) {
        currentStatusIndex++;
        return statuses[currentStatusIndex];
      }
      return statuses[currentStatusIndex];
    }
  };
};