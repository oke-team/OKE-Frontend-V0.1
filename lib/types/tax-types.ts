// Types pour le module fiscalité OKÉ

export type DeclarationType = 'TVA' | 'IR' | 'IS' | 'TDFC' | 'PAIEMENT' | 'PART' | 'REQUETE';

export type DeclarationGroup = 'tva' | 'liasse' | 'other' | 'personal';

export type DeclarationStatus = 'draft' | 'submitted' | 'accepted' | 'rejected' | 'error';

export type TaxMode = 'entrepreneur' | 'expert';

export type TVARegime = 'NORMAL' | 'SIMPLIFIE' | 'MICRO' | 'EXEMPT';

export type CompanyStatus = 'SARL' | 'SAS' | 'EURL' | 'SASU' | 'SA' | 'SCI' | 'MICRO' | 'EI';

export interface TaxDeclaration {
  id: string;
  type: DeclarationType;
  group: DeclarationGroup;
  status: DeclarationStatus;
  title: string;
  description: string;
  period: {
    start: string;
    end: string;
    year: number;
  };
  dueDate: string;
  amount?: number;
  xmlContent?: string;
  submissionDate?: string;
  acknowledgmentRef?: string;
  errors?: ValidationError[];
  adminResponse?: string;
  lastModified: string;
  createdBy: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  severity: 'error' | 'warning' | 'info';
}

export interface CompanyTaxProfile {
  siret: string;
  legalForm: CompanyStatus;
  activityCode: string;
  businessName: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  
  // Paramètres TVA
  tva: {
    isSubjectToTVA: boolean;
    regime: TVARegime;
    frequency: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
    taxNumber: string;
    startDate: string;
  };
  
  // Paramètres TDFC
  vehicles: {
    hasCompanyVehicles: boolean;
    vehicleCount: number;
    vehicles: CompanyVehicle[];
  };
  
  // Informations dirigeant
  director: {
    firstName: string;
    lastName: string;
    status: 'TNS' | 'ASSIMILE_SALARIE' | 'MIXTE';
    sharePercentage: number;
    personalTaxOptIn: boolean;
  };
}

export interface CompanyVehicle {
  id: string;
  brand: string;
  model: string;
  licensePlate: string;
  co2Emissions: number;
  fiscalPower: number;
  acquisitionDate: string;
  acquisitionPrice: number;
  isElectric: boolean;
}

export interface DirectorTaxData {
  // Revenus détectés automatiquement
  tnsSalary: number;
  dividends: number;
  realEstateIncome: number;
  capitalGains: number;
  
  // Informations personnelles
  familyStatus: 'SINGLE' | 'MARRIED' | 'CIVIL_UNION' | 'DIVORCED' | 'WIDOWED';
  dependents: number;
  
  // Déficits et reports
  previousDeficits: number;
  carryForwardLosses: number;
}

export interface TaxDashboardData {
  summary: {
    totalDeclarations: number;
    pendingDeclarations: number;
    submittedDeclarations: number;
    acceptedDeclarations: number;
    rejectedDeclarations: number;
    upcomingDeadlines: number;
    criticalDeadlines: number;
  };
  
  groups: {
    tva: GroupSummary;
    liasse: GroupSummary;
    other: GroupSummary;
    personal: GroupSummary;
  };
  
  recentActivity: ActivityLog[];
  upcomingDeadlines: Deadline[];
}

export interface GroupSummary {
  name: string;
  count: number;
  pendingCount: number;
  nextDeadline?: string;
  status: 'ok' | 'warning' | 'critical';
  declarations: TaxDeclaration[];
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'submission' | 'acceptance' | 'rejection' | 'error' | 'modification';
  declarationType: DeclarationType;
  message: string;
  details?: string;
}

export interface Deadline {
  id: string;
  declarationType: DeclarationType;
  title: string;
  dueDate: string;
  daysUntilDue: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  isOverdue: boolean;
  amount?: number;
  status: DeclarationStatus;
}

export interface TVADeclarationData {
  period: {
    month: number;
    quarter: number;
    year: number;
    type: 'monthly' | 'quarterly';
  };
  
  // Données de base CA3
  salesVATCollected: number;
  purchaseVATDeductible: number;
  previousCredit: number;
  vatToPay: number;
  vatCredit: number;
  
  // Détails par taux
  vatByRate: {
    rate20: { baseAmount: number; vatAmount: number };
    rate10: { baseAmount: number; vatAmount: number };
    rate55: { baseAmount: number; vatAmount: number };
    rate21: { baseAmount: number; vatAmount: number };
  };
  
  // Régularisations
  adjustments: {
    description: string;
    amount: number;
    type: 'debit' | 'credit';
  }[];
  
  // Données complémentaires
  intraCommunityAcquisitions: number;
  intraCommunityDeliveries: number;
  exports: number;
}

export interface ASPONECredentials {
  environment: 'test' | 'production';
  accountId: string;
  login: string;
  portal: string;
  apiUrl: string;
  // Note: Le mot de passe sera géré côté backend par Tony
}

export interface XMLEDIFile {
  declarationType: DeclarationType;
  filename: string;
  content: string;
  schema: string;
  validation: {
    isValid: boolean;
    errors: ValidationError[];
    warnings: ValidationError[];
  };
  generatedAt: string;
}