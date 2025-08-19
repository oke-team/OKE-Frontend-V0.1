import { ClientDetail, Transaction } from '@/components/accounting/ClientDetailView';
import { ClientGroup } from '@/components/accounting/ClientGroupView';

// Transactions détaillées pour les clients
export const mockTransactions: Record<string, Transaction[]> = {
  'monsieur-madame-lesquen': [
    {
      id: 'inv-001',
      type: 'invoice',
      reference: 'FA-2024-001',
      date: '2024-01-15',
      label: 'Prestation de conseil stratégique',
      amount: 8554.84,
      status: 'partial',
      linkedTo: ['pay-001', 'pay-002'],
      dueDate: '2024-02-15'
    },
    {
      id: 'inv-002',
      type: 'invoice',
      reference: 'FA-2024-002',
      date: '2024-02-01',
      label: 'Formation équipe commerciale',
      amount: 10605.84,
      status: 'pending',
      dueDate: '2024-03-01'
    },
    {
      id: 'inv-003',
      type: 'invoice',
      reference: 'FA-2024-003',
      date: '2024-02-15',
      label: 'Audit processus qualité',
      amount: 13105.84,
      status: 'overdue',
      dueDate: '2024-03-15'
    },
    {
      id: 'pay-001',
      type: 'payment',
      reference: 'PAY-2024-001',
      date: '2024-01-20',
      label: 'Virement bancaire',
      amount: 2051.00,
      status: 'paid',
      linkedTo: ['inv-001'],
      paymentMethod: 'Virement SEPA'
    },
    {
      id: 'pay-002',
      type: 'payment',
      reference: 'PAY-2024-002',
      date: '2024-02-05',
      label: 'Virement bancaire',
      amount: 2500.00,
      status: 'paid',
      linkedTo: ['inv-001'],
      paymentMethod: 'Virement SEPA'
    },
    {
      id: 'pay-003',
      type: 'payment',
      reference: 'PAY-2024-003',
      date: '2024-02-10',
      label: 'Chèque',
      amount: 4551.00,
      status: 'paid',
      paymentMethod: 'Chèque n°4567890'
    }
  ],
  'societe-abc': [
    {
      id: 'inv-004',
      type: 'invoice',
      reference: 'FA-2024-004',
      date: '2024-01-10',
      label: 'Développement application mobile',
      amount: 15000.00,
      status: 'paid',
      linkedTo: ['pay-004'],
      dueDate: '2024-02-10'
    },
    {
      id: 'inv-005',
      type: 'invoice',
      reference: 'FA-2024-005',
      date: '2024-02-20',
      label: 'Maintenance mensuelle',
      amount: 3200.00,
      status: 'pending',
      dueDate: '2024-03-20'
    },
    {
      id: 'pay-004',
      type: 'payment',
      reference: 'PAY-2024-004',
      date: '2024-02-08',
      label: 'Virement bancaire',
      amount: 15000.00,
      status: 'paid',
      linkedTo: ['inv-004'],
      paymentMethod: 'Virement SEPA'
    }
  ],
  'entreprise-xyz': [
    {
      id: 'inv-006',
      type: 'invoice',
      reference: 'FA-2024-006',
      date: '2024-01-25',
      label: 'Refonte site web',
      amount: 8500.00,
      status: 'partial',
      linkedTo: ['pay-005'],
      dueDate: '2024-02-25'
    },
    {
      id: 'inv-007',
      type: 'invoice',
      reference: 'FA-2024-007',
      date: '2024-02-15',
      label: 'SEO & Marketing digital',
      amount: 4200.00,
      status: 'overdue',
      dueDate: '2024-03-15'
    },
    {
      id: 'pay-005',
      type: 'payment',
      reference: 'PAY-2024-005',
      date: '2024-02-01',
      label: 'Acompte',
      amount: 4000.00,
      status: 'paid',
      linkedTo: ['inv-006'],
      paymentMethod: 'Carte bancaire'
    },
    {
      id: 'credit-001',
      type: 'credit_note',
      reference: 'AV-2024-001',
      date: '2024-02-10',
      label: 'Remise commerciale',
      amount: 500.00,
      status: 'paid',
      linkedTo: ['inv-006']
    }
  ]
};

// Détails complets des clients
export const mockClientDetails: Record<string, ClientDetail> = {
  'monsieur-madame-lesquen': {
    id: 'monsieur-madame-lesquen',
    name: 'Monsieur et Madame de Lesquen',
    initials: 'ML',
    email: 'contact@lesquen.fr',
    phone: '+33 6 12 34 56 78',
    address: '12 Avenue de la République, 75011 Paris',
    totalDue: 8554.84,
    transactions: mockTransactions['monsieur-madame-lesquen'],
    creditLimit: 50000,
    customerSince: 'Janvier 2023',
    lastActivity: 'Il y a 2 jours',
    color: 'bg-gradient-to-br from-primary to-indigo-600',
    type: 'client' as const
  },
  'societe-abc': {
    id: 'societe-abc',
    name: 'Société ABC',
    initials: 'SA',
    email: 'compta@societe-abc.com',
    phone: '+33 1 23 45 67 89',
    address: '45 Rue du Commerce, 92100 Boulogne-Billancourt',
    totalDue: 3200.00,
    transactions: mockTransactions['societe-abc'],
    creditLimit: 30000,
    customerSince: 'Mars 2022',
    lastActivity: 'Aujourd\'hui',
    color: 'bg-gradient-to-br from-green-500 to-teal-600',
    type: 'client' as const
  },
  'entreprise-xyz': {
    id: 'entreprise-xyz',
    name: 'Entreprise XYZ',
    initials: 'XY',
    email: 'finance@xyz-corp.fr',
    phone: '+33 4 56 78 90 12',
    address: '78 Boulevard des Entreprises, 69003 Lyon',
    totalDue: 8200.00,
    transactions: mockTransactions['entreprise-xyz'],
    creditLimit: 20000,
    customerSince: 'Septembre 2023',
    lastActivity: 'Il y a 5 jours',
    color: 'bg-gradient-to-br from-secondary to-pink-600',
    type: 'client' as const
  }
};

// Groupes de clients pour la vue groupée
export const mockClientGroups: ClientGroup[] = [
  {
    id: 'monsieur-madame-lesquen',
    name: 'Monsieur et Madame de Lesquen',
    initials: 'ML',
    totalDue: 8554.84,
    transactions: mockTransactions['monsieur-madame-lesquen'].map(t => ({
      id: t.id,
      type: t.type as 'invoice' | 'payment' | 'credit_note',
      reference: t.reference,
      date: t.date,
      label: t.label,
      amount: t.amount,
      status: t.status as 'paid' | 'partial' | 'pending' | 'overdue',
      linkedTo: t.linkedTo
    })),
    daysOldest: 45,
    contactInfo: {
      email: 'contact@lesquen.fr',
      phone: '+33 6 12 34 56 78'
    },
    color: 'bg-gradient-to-br from-primary to-indigo-600'
  },
  {
    id: 'societe-abc',
    name: 'Société ABC',
    initials: 'SA',
    totalDue: 3200.00,
    transactions: mockTransactions['societe-abc'].map(t => ({
      id: t.id,
      type: t.type as 'invoice' | 'payment' | 'credit_note',
      reference: t.reference,
      date: t.date,
      label: t.label,
      amount: t.amount,
      status: t.status as 'paid' | 'partial' | 'pending' | 'overdue',
      linkedTo: t.linkedTo
    })),
    daysOldest: 15,
    contactInfo: {
      email: 'compta@societe-abc.com',
      phone: '+33 1 23 45 67 89'
    },
    color: 'bg-gradient-to-br from-green-500 to-teal-600'
  },
  {
    id: 'entreprise-xyz',
    name: 'Entreprise XYZ',
    initials: 'XY',
    totalDue: 8200.00,
    transactions: mockTransactions['entreprise-xyz'].map(t => ({
      id: t.id,
      type: t.type as 'invoice' | 'payment' | 'credit_note',
      reference: t.reference,
      date: t.date,
      label: t.label,
      amount: t.amount,
      status: t.status as 'paid' | 'partial' | 'pending' | 'overdue',
      linkedTo: t.linkedTo
    })),
    daysOldest: 35,
    contactInfo: {
      email: 'finance@xyz-corp.fr',
      phone: '+33 4 56 78 90 12'
    },
    color: 'bg-gradient-to-br from-secondary to-pink-600'
  },
  {
    id: 'tech-solutions',
    name: 'Tech Solutions SARL',
    initials: 'TS',
    totalDue: 5500.00,
    transactions: [
      {
        id: 'inv-008',
        type: 'invoice',
        reference: 'FA-2024-008',
        date: '2024-02-01',
        label: 'Consulting IT',
        amount: 5500.00,
        status: 'pending'
      }
    ],
    daysOldest: 20,
    contactInfo: {
      email: 'billing@techsolutions.fr',
      phone: '+33 2 34 56 78 90'
    },
    color: 'bg-gradient-to-br from-orange-500 to-red-600'
  },
  {
    id: 'boutique-marie',
    name: 'Boutique Marie',
    initials: 'BM',
    totalDue: 0,
    transactions: [
      {
        id: 'inv-009',
        type: 'invoice',
        reference: 'FA-2024-009',
        date: '2024-01-28',
        label: 'Création logo',
        amount: 2500.00,
        status: 'paid',
        linkedTo: ['pay-006']
      },
      {
        id: 'pay-006',
        type: 'payment',
        reference: 'PAY-2024-006',
        date: '2024-02-05',
        label: 'Virement',
        amount: 2500.00,
        status: 'paid',
        linkedTo: ['inv-009']
      }
    ],
    daysOldest: 0,
    contactInfo: {
      email: 'marie@boutique.fr',
      phone: '+33 6 98 76 54 32'
    },
    color: 'bg-gradient-to-br from-pink-500 to-rose-600'
  }
];

// Fonction pour obtenir les détails d'un client
export function getClientDetail(clientId: string): ClientDetail | undefined {
  return mockClientDetails[clientId];
}

// Fonction pour obtenir les groupes de clients filtrés
export function getClientGroups(category: 'receivables' | 'payables' | 'all' = 'all'): ClientGroup[] {
  if (category === 'all') return mockClientGroups;
  
  return mockClientGroups.filter(group => {
    if (category === 'receivables') {
      return group.totalDue > 0;
    } else {
      return group.totalDue < 0;
    }
  });
}

// Fonction pour calculer les statistiques globales
export function getGlobalStats() {
  const allTransactions = Object.values(mockTransactions).flat();
  
  const totalInvoices = allTransactions
    .filter(t => t.type === 'invoice')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalPayments = allTransactions
    .filter(t => t.type === 'payment')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalCreditNotes = allTransactions
    .filter(t => t.type === 'credit_note')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const overdueInvoices = allTransactions
    .filter(t => t.type === 'invoice' && t.status === 'overdue');
  
  const pendingInvoices = allTransactions
    .filter(t => t.type === 'invoice' && t.status === 'pending');
    
  return {
    totalInvoices,
    totalPayments,
    totalCreditNotes,
    balance: totalInvoices - totalPayments - totalCreditNotes,
    overdueCount: overdueInvoices.length,
    overdueAmount: overdueInvoices.reduce((sum, t) => sum + t.amount, 0),
    pendingCount: pendingInvoices.length,
    pendingAmount: pendingInvoices.reduce((sum, t) => sum + t.amount, 0),
    clientCount: mockClientGroups.length,
    activeClients: mockClientGroups.filter(g => g.totalDue > 0).length
  };
}