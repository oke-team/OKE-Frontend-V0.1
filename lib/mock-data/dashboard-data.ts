// Types pour le nouveau dashboard
export interface BankAccount {
  id: string;
  name: string;
  bank: string;
  accountNumber: string;
  balance: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  lastSync: string;
  transactions: BankTransaction[];
  color: string;
  logo?: string;
}

export interface BankTransaction {
  id: string;
  date: string;
  label: string;
  amount: number;
  type: 'credit' | 'debit';
  category?: string;
  status?: 'pending' | 'completed' | 'rejected';
}

export interface TaxDeadline {
  id: string;
  type: 'TVA' | 'IS' | 'CFE' | 'URSSAF' | 'CVAE' | 'Retraite';
  label: string;
  dueDate: string;
  amount?: number;
  status: 'upcoming' | 'due' | 'overdue' | 'paid';
  description?: string;
  recurring?: boolean;
}

export interface SalesInvoice {
  id: string;
  reference: string;
  client: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'partial' | 'paid' | 'overdue';
  daysOverdue?: number;
}

export interface Purchase {
  id: string;
  reference: string;
  supplier: string;
  amount: number;
  date: string;
  category: string;
  status: 'pending' | 'validated' | 'paid';
  hasDocument: boolean;
}

export interface Receivable {
  id: string;
  client: string;
  amount: number;
  invoices: number;
  oldestDue: string;
  daysOverdue: number;
  risk: 'low' | 'medium' | 'high';
}

export interface Payable {
  id: string;
  supplier: string;
  amount: number;
  bills: number;
  nextDue: string;
  daysUntilDue: number;
  priority: 'low' | 'medium' | 'high';
}

export interface TaxEstimation {
  collected: number;
  deductible: number;
  balance: number;
  nextDeadline: string;
  estimatedPayment: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export interface CompanyInfo {
  name: string;
  legalForm: string;
  siret: string;
  vatNumber: string;
  capital: number;
  address: string;
  creationDate: string;
  lastStatutesUpdate: string;
  lastActsUpdate: string;
  employees: number;
}

export interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
  hasAttachment: boolean;
  important: boolean;
}

export interface Message {
  id: string;
  type: 'whatsapp' | 'sms' | 'chat';
  from: string;
  content: string;
  date: string;
  unread: boolean;
  avatar?: string;
}

export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'warning' | 'success';
  title: string;
  message: string;
  time: string;
  actionRequired: boolean;
  module?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'excel' | 'word' | 'other';
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  category: string;
  thumbnail?: string;
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  participants: string[];
  location?: string;
  type: 'meeting' | 'call' | 'video' | 'event';
  color: string;
}

export interface Todo {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  category: string;
  completed: boolean;
  assignedTo?: string;
}

export interface KPI {
  id: string;
  label: string;
  value: number | string;
  unit?: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  target?: number | string;
  chartData?: Array<{ label: string; value: number }>;
}

// Données mock pour les comptes bancaires
export const bankAccounts: BankAccount[] = [
  {
    id: 'bnp-001',
    name: 'Compte Professionnel',
    bank: 'BNP Paribas',
    accountNumber: '***4521',
    balance: 185420.50,
    trend: 'up',
    change: 12.3,
    lastSync: 'Il y a 5 min',
    color: 'bg-green-500',
    transactions: [
      {
        id: 't1',
        date: '2024-08-08',
        label: 'Virement client TECHSTART SAS',
        amount: 12500,
        type: 'credit',
        category: 'Ventes',
        status: 'completed'
      },
      {
        id: 't2',
        date: '2024-08-08',
        label: 'Prélèvement loyer bureau',
        amount: -3200,
        type: 'debit',
        category: 'Charges fixes',
        status: 'completed'
      },
      {
        id: 't3',
        date: '2024-08-07',
        label: 'Commission bancaire',
        amount: -125,
        type: 'debit',
        category: 'Frais bancaires',
        status: 'completed'
      },
      {
        id: 't4',
        date: '2024-08-07',
        label: 'Paiement fournisseur AWS',
        amount: -3842,
        type: 'debit',
        category: 'Services',
        status: 'pending'
      }
    ]
  },
  {
    id: 'lcl-001',
    name: 'Compte Courant',
    bank: 'LCL',
    accountNumber: '***8923',
    balance: 65200.00,
    trend: 'down',
    change: -5.2,
    lastSync: 'Il y a 1h',
    color: 'bg-blue-500',
    transactions: [
      {
        id: 't5',
        date: '2024-08-08',
        label: 'Virement interne',
        amount: -10000,
        type: 'debit',
        category: 'Transfert',
        status: 'completed'
      },
      {
        id: 't6',
        date: '2024-08-07',
        label: 'Remboursement TVA',
        amount: 3240,
        type: 'credit',
        category: 'Fiscal',
        status: 'completed'
      },
      {
        id: 't7',
        date: '2024-08-06',
        label: 'Achat fournitures bureau',
        amount: -456,
        type: 'debit',
        category: 'Fournitures',
        status: 'completed'
      }
    ]
  },
  {
    id: 'revolut-001',
    name: 'Compte Devises',
    bank: 'Revolut Business',
    accountNumber: '***2341',
    balance: 35000.00,
    trend: 'stable',
    change: 0.1,
    lastSync: 'Il y a 10 min',
    color: 'bg-purple-500',
    transactions: [
      {
        id: 't8',
        date: '2024-08-08',
        label: 'Paiement client US - GlobalTech',
        amount: 8420,
        type: 'credit',
        category: 'Ventes Export',
        status: 'completed'
      },
      {
        id: 't9',
        date: '2024-08-07',
        label: 'Abonnement SaaS mensuel',
        amount: -299,
        type: 'debit',
        category: 'Abonnements',
        status: 'completed'
      },
      {
        id: 't10',
        date: '2024-08-06',
        label: 'Conversion EUR/USD',
        amount: -50,
        type: 'debit',
        category: 'Frais change',
        status: 'completed'
      }
    ]
  }
];

// Échéances fiscales et sociales
export const taxDeadlines: TaxDeadline[] = [
  {
    id: 'tva-001',
    type: 'TVA',
    label: 'Déclaration TVA mensuelle',
    dueDate: '2024-08-15',
    amount: 18920,
    status: 'upcoming',
    description: 'CA3 - Juillet 2024',
    recurring: true
  },
  {
    id: 'urssaf-001',
    type: 'URSSAF',
    label: 'Cotisations sociales',
    dueDate: '2024-08-12',
    amount: 8450,
    status: 'due',
    description: 'Charges sociales mensuelles',
    recurring: true
  },
  {
    id: 'is-001',
    type: 'IS',
    label: 'Acompte IS 2ème trimestre',
    dueDate: '2024-09-15',
    amount: 12300,
    status: 'upcoming',
    description: 'Impôt sur les sociétés'
  },
  {
    id: 'cfe-001',
    type: 'CFE',
    label: 'Cotisation Foncière Entreprises',
    dueDate: '2024-12-15',
    amount: 3200,
    status: 'upcoming',
    description: 'Acompte CFE'
  },
  {
    id: 'retraite-001',
    type: 'Retraite',
    label: 'Cotisations retraite complémentaire',
    dueDate: '2024-08-20',
    amount: 2340,
    status: 'upcoming',
    description: 'AGIRC-ARRCO',
    recurring: true
  }
];

// Dernières ventes
export const recentSales: SalesInvoice[] = [
  {
    id: 'fa-001',
    reference: 'FA-2024-0456',
    client: 'TechStart SAS',
    amount: 12500,
    date: '2024-08-05',
    dueDate: '2024-09-05',
    status: 'paid'
  },
  {
    id: 'fa-002',
    reference: 'FA-2024-0457',
    client: 'GlobalTech Industries',
    amount: 8420,
    date: '2024-08-04',
    dueDate: '2024-09-04',
    status: 'sent'
  },
  {
    id: 'fa-003',
    reference: 'FA-2024-0458',
    client: 'DataCorp',
    amount: 5680,
    date: '2024-08-03',
    dueDate: '2024-08-18',
    status: 'overdue',
    daysOverdue: 3
  },
  {
    id: 'fa-004',
    reference: 'FA-2024-0459',
    client: 'Innovation Labs',
    amount: 3200,
    date: '2024-08-02',
    dueDate: '2024-09-02',
    status: 'partial'
  },
  {
    id: 'fa-005',
    reference: 'FA-2024-0460',
    client: 'Digital Services',
    amount: 15600,
    date: '2024-08-01',
    dueDate: '2024-08-31',
    status: 'sent'
  }
];

// Derniers achats
export const recentPurchases: Purchase[] = [
  {
    id: 'ach-001',
    reference: 'ACH-2024-0234',
    supplier: 'Amazon Web Services',
    amount: 3842,
    date: '2024-08-07',
    category: 'Services Cloud',
    status: 'validated',
    hasDocument: true
  },
  {
    id: 'ach-002',
    reference: 'ACH-2024-0235',
    supplier: 'EDF Entreprises',
    amount: 842,
    date: '2024-08-06',
    category: 'Énergie',
    status: 'paid',
    hasDocument: true
  },
  {
    id: 'ach-003',
    reference: 'ACH-2024-0236',
    supplier: 'Office Depot',
    amount: 456,
    date: '2024-08-05',
    category: 'Fournitures',
    status: 'validated',
    hasDocument: true
  },
  {
    id: 'ach-004',
    reference: 'ACH-2024-0237',
    supplier: 'Orange Business',
    amount: 299,
    date: '2024-08-04',
    category: 'Télécom',
    status: 'paid',
    hasDocument: false
  },
  {
    id: 'ach-005',
    reference: 'ACH-2024-0238',
    supplier: 'Adobe Creative Cloud',
    amount: 59.99,
    date: '2024-08-03',
    category: 'Logiciels',
    status: 'paid',
    hasDocument: true
  }
];

// Principales créances clients
export const topReceivables: Receivable[] = [
  {
    id: 'rec-001',
    client: 'DataCorp',
    amount: 34280,
    invoices: 5,
    oldestDue: '2024-06-15',
    daysOverdue: 45,
    risk: 'high'
  },
  {
    id: 'rec-002',
    client: 'Innovation Labs',
    amount: 22180,
    invoices: 3,
    oldestDue: '2024-07-01',
    daysOverdue: 30,
    risk: 'medium'
  },
  {
    id: 'rec-003',
    client: 'Digital Services',
    amount: 18340,
    invoices: 2,
    oldestDue: '2024-07-15',
    daysOverdue: 15,
    risk: 'low'
  },
  {
    id: 'rec-004',
    client: 'TechCorp France',
    amount: 12450,
    invoices: 2,
    oldestDue: '2024-07-20',
    daysOverdue: 10,
    risk: 'low'
  },
  {
    id: 'rec-005',
    client: 'StartUp Nation',
    amount: 8900,
    invoices: 1,
    oldestDue: '2024-08-01',
    daysOverdue: 5,
    risk: 'low'
  }
];

// Principales dettes fournisseurs
export const topPayables: Payable[] = [
  {
    id: 'pay-001',
    supplier: 'Immobilier Pro',
    amount: 9600,
    bills: 3,
    nextDue: '2024-08-10',
    daysUntilDue: 2,
    priority: 'high'
  },
  {
    id: 'pay-002',
    supplier: 'Amazon Web Services',
    amount: 7684,
    bills: 2,
    nextDue: '2024-08-15',
    daysUntilDue: 7,
    priority: 'medium'
  },
  {
    id: 'pay-003',
    supplier: 'Leasing Auto',
    amount: 4200,
    bills: 1,
    nextDue: '2024-08-20',
    daysUntilDue: 12,
    priority: 'medium'
  },
  {
    id: 'pay-004',
    supplier: 'Assurance AXA',
    amount: 3450,
    bills: 1,
    nextDue: '2024-08-25',
    daysUntilDue: 17,
    priority: 'low'
  },
  {
    id: 'pay-005',
    supplier: 'Expert Comptable',
    amount: 2400,
    bills: 1,
    nextDue: '2024-08-31',
    daysUntilDue: 23,
    priority: 'low'
  }
];

// Estimation TVA
export const taxEstimation: TaxEstimation = {
  collected: 25420,
  deductible: 6500,
  balance: 18920,
  nextDeadline: '2024-08-15',
  estimatedPayment: 18920,
  trend: 'up',
  changePercent: 8.5
};

// Informations juridiques
export const companyInfo: CompanyInfo = {
  name: 'OKÉ Solutions SAS',
  legalForm: 'SAS - Société par Actions Simplifiée',
  siret: '892 456 789 00021',
  vatNumber: 'FR 89 892456789',
  capital: 50000,
  address: '123 Avenue de l\'Innovation, 75008 Paris',
  creationDate: '2021-03-15',
  lastStatutesUpdate: '2023-06-20',
  lastActsUpdate: '2024-07-15',
  employees: 12
};

// Derniers emails
export const recentEmails: Email[] = [
  {
    id: 'email-001',
    from: 'client@techstart.fr',
    subject: 'RE: Proposition commerciale - Projet 2024',
    preview: 'Bonjour, suite à notre échange téléphonique, je valide votre proposition...',
    date: 'Il y a 12 min',
    unread: true,
    hasAttachment: true,
    important: true
  },
  {
    id: 'email-002',
    from: 'comptable@cabinet-expert.fr',
    subject: 'Rappel: Documents pour bilan 2024',
    preview: 'Merci de nous transmettre les pièces manquantes avant le 15 août...',
    date: 'Il y a 2h',
    unread: true,
    hasAttachment: false,
    important: false
  },
  {
    id: 'email-003',
    from: 'noreply@urssaf.fr',
    subject: 'Échéance de paiement proche',
    preview: 'Votre prochaine échéance de cotisations est prévue le 12 août...',
    date: 'Il y a 4h',
    unread: false,
    hasAttachment: false,
    important: true
  },
  {
    id: 'email-004',
    from: 'support@aws.amazon.com',
    subject: 'Facture mensuelle disponible',
    preview: 'Votre facture AWS pour juillet 2024 est maintenant disponible...',
    date: 'Hier',
    unread: false,
    hasAttachment: true,
    important: false
  }
];

// Messages récents
export const recentMessages: Message[] = [
  {
    id: 'msg-001',
    type: 'whatsapp',
    from: 'Marie Dupont',
    content: 'Les slides pour la présentation client sont prêts 👍',
    date: 'Il y a 5 min',
    unread: true,
    avatar: '👩'
  },
  {
    id: 'msg-002',
    type: 'sms',
    from: '+33 6 12 34 56 78',
    content: 'RDV confirmé demain 14h pour signature contrat',
    date: 'Il y a 1h',
    unread: true
  },
  {
    id: 'msg-003',
    type: 'chat',
    from: 'Support Technique',
    content: 'Votre ticket #4521 a été résolu',
    date: 'Il y a 3h',
    unread: false,
    avatar: '🛠️'
  },
  {
    id: 'msg-004',
    type: 'whatsapp',
    from: 'Groupe Commercial',
    content: 'Pierre: Objectif mensuel atteint à 120% ! 🎉',
    date: 'Il y a 5h',
    unread: false,
    avatar: '👥'
  }
];

// Notifications
export const notifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'alert',
    title: 'Échéance fiscale proche',
    message: 'TVA à payer dans 7 jours (18 920€)',
    time: 'Il y a 30 min',
    actionRequired: true,
    module: 'tax'
  },
  {
    id: 'notif-002',
    type: 'warning',
    title: 'Facture en retard',
    message: 'DataCorp - 45 jours de retard',
    time: 'Il y a 2h',
    actionRequired: true,
    module: 'accounting'
  },
  {
    id: 'notif-003',
    type: 'success',
    title: 'Paiement reçu',
    message: 'TechStart SAS - 12 500€',
    time: 'Il y a 4h',
    actionRequired: false,
    module: 'bank'
  },
  {
    id: 'notif-004',
    type: 'info',
    title: 'Nouveau document',
    message: 'Contrat GlobalTech signé',
    time: 'Hier',
    actionRequired: false,
    module: 'documents'
  }
];

// Documents récents
export const recentDocuments: Document[] = [
  {
    id: 'doc-001',
    name: 'Contrat_GlobalTech_2024.pdf',
    type: 'pdf',
    size: '2.4 MB',
    uploadedBy: 'Marie Dupont',
    uploadedAt: 'Il y a 2h',
    category: 'Contrats',
    thumbnail: '/thumbnails/contract.png'
  },
  {
    id: 'doc-002',
    name: 'Facture_AWS_Juillet.pdf',
    type: 'pdf',
    size: '156 KB',
    uploadedBy: 'Système',
    uploadedAt: 'Il y a 4h',
    category: 'Factures fournisseurs'
  },
  {
    id: 'doc-003',
    name: 'RIB_BNP_2024.pdf',
    type: 'pdf',
    size: '89 KB',
    uploadedBy: 'Admin',
    uploadedAt: 'Hier',
    category: 'Documents bancaires'
  },
  {
    id: 'doc-004',
    name: 'Presentation_Client.pptx',
    type: 'other',
    size: '5.6 MB',
    uploadedBy: 'Pierre Martin',
    uploadedAt: 'Hier',
    category: 'Présentations'
  },
  {
    id: 'doc-005',
    name: 'Budget_2024_V3.xlsx',
    type: 'excel',
    size: '1.2 MB',
    uploadedBy: 'Comptable',
    uploadedAt: '2 jours',
    category: 'Finance'
  }
];

// Prochains RDV
export const upcomingAppointments: Appointment[] = [
  {
    id: 'rdv-001',
    title: 'Signature contrat GlobalTech',
    date: '2024-08-09',
    time: '14:00',
    duration: '1h',
    participants: ['Jean Dupont', 'Marie Martin', 'Client GlobalTech'],
    location: 'Bureau Paris',
    type: 'meeting',
    color: 'bg-blue-500'
  },
  {
    id: 'rdv-002',
    title: 'Call investisseurs',
    date: '2024-08-09',
    time: '16:30',
    duration: '45min',
    participants: ['Direction', 'Investisseurs'],
    type: 'video',
    color: 'bg-purple-500'
  },
  {
    id: 'rdv-003',
    title: 'Réunion équipe commerciale',
    date: '2024-08-10',
    time: '09:00',
    duration: '2h',
    participants: ['Équipe commerciale'],
    location: 'Salle de réunion A',
    type: 'meeting',
    color: 'bg-green-500'
  },
  {
    id: 'rdv-004',
    title: 'Webinar produit',
    date: '2024-08-10',
    time: '11:00',
    duration: '1h30',
    participants: ['Marketing', 'Clients'],
    type: 'video',
    color: 'bg-amber-500'
  }
];

// Todos
export const todos: Todo[] = [
  {
    id: 'todo-001',
    title: 'Préparer déclaration TVA',
    priority: 'urgent',
    dueDate: '2024-08-12',
    category: 'Fiscal',
    completed: false,
    assignedTo: 'Comptable'
  },
  {
    id: 'todo-002',
    title: 'Relancer client DataCorp',
    priority: 'high',
    dueDate: '2024-08-08',
    category: 'Commercial',
    completed: false,
    assignedTo: 'Marie'
  },
  {
    id: 'todo-003',
    title: 'Valider devis Innovation Labs',
    priority: 'medium',
    dueDate: '2024-08-09',
    category: 'Commercial',
    completed: false
  },
  {
    id: 'todo-004',
    title: 'Mettre à jour documentation',
    priority: 'low',
    dueDate: '2024-08-15',
    category: 'Admin',
    completed: false
  },
  {
    id: 'todo-005',
    title: 'Backup mensuel serveurs',
    priority: 'medium',
    dueDate: '2024-08-10',
    category: 'IT',
    completed: true
  }
];

// KPIs principaux
export const mainKPIs: KPI[] = [
  {
    id: 'kpi-001',
    label: 'Chiffre d\'affaires mensuel',
    value: 127845,
    unit: '€',
    change: 18.3,
    trend: 'up',
    target: 120000,
    chartData: [
      { label: 'Sem 1', value: 28500 },
      { label: 'Sem 2', value: 31200 },
      { label: 'Sem 3', value: 33600 },
      { label: 'Sem 4', value: 34545 }
    ]
  },
  {
    id: 'kpi-002',
    label: 'Taux de marge',
    value: 62.1,
    unit: '%',
    change: 3.2,
    trend: 'up',
    target: 60,
    chartData: [
      { label: 'Jan', value: 58 },
      { label: 'Fév', value: 59 },
      { label: 'Mar', value: 60 },
      { label: 'Avr', value: 61 },
      { label: 'Mai', value: 62 }
    ]
  },
  {
    id: 'kpi-003',
    label: 'Délai moyen paiement',
    value: 32,
    unit: 'jours',
    change: -5,
    trend: 'down',
    target: 30
  },
  {
    id: 'kpi-004',
    label: 'Taux conversion',
    value: 24.5,
    unit: '%',
    change: 2.1,
    trend: 'up',
    target: 25
  },
  {
    id: 'kpi-005',
    label: 'NPS Client',
    value: 72,
    change: 8,
    trend: 'up',
    target: 70
  },
  {
    id: 'kpi-006',
    label: 'Panier moyen',
    value: 3250,
    unit: '€',
    change: 12,
    trend: 'up',
    target: 3000
  }
];