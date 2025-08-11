import { ClientDetail, Transaction } from '@/components/accounting/ClientDetailView';
import { ClientGroup } from '@/components/accounting/ClientGroupView';

// Transactions avec les fournisseurs
export const supplierTransactions: Record<string, Transaction[]> = {
  'edf-energie': [
    {
      id: 'bill-001',
      type: 'invoice',
      reference: 'EDF-2024-01',
      date: '2024-01-10',
      label: 'Électricité Janvier',
      amount: 1200.00,
      status: 'paid',
      linkedTo: ['spay-001'],
      dueDate: '2024-02-10'
    },
    {
      id: 'bill-002',
      type: 'invoice',
      reference: 'EDF-2024-02',
      date: '2024-02-10',
      label: 'Électricité Février',
      amount: 1150.00,
      status: 'pending',
      dueDate: '2024-03-10'
    },
    {
      id: 'spay-001',
      type: 'payment',
      reference: 'VIR-2024-001',
      date: '2024-01-25',
      label: 'Prélèvement automatique',
      amount: 1200.00,
      status: 'paid',
      linkedTo: ['bill-001'],
      paymentMethod: 'Prélèvement SEPA'
    }
  ],
  'immobilier-pro': [
    {
      id: 'rent-001',
      type: 'invoice',
      reference: 'LOYER-2024-01',
      date: '2024-01-01',
      label: 'Loyer Janvier',
      amount: 3500.00,
      status: 'paid',
      linkedTo: ['spay-002'],
      dueDate: '2024-01-05'
    },
    {
      id: 'rent-002',
      type: 'invoice',
      reference: 'LOYER-2024-02',
      date: '2024-02-01',
      label: 'Loyer Février',
      amount: 3500.00,
      status: 'paid',
      linkedTo: ['spay-003'],
      dueDate: '2024-02-05'
    },
    {
      id: 'rent-003',
      type: 'invoice',
      reference: 'LOYER-2024-03',
      date: '2024-03-01',
      label: 'Loyer Mars',
      amount: 3500.00,
      status: 'pending',
      dueDate: '2024-03-05'
    },
    {
      id: 'spay-002',
      type: 'payment',
      reference: 'VIR-2024-002',
      date: '2024-01-03',
      label: 'Virement loyer',
      amount: 3500.00,
      status: 'paid',
      linkedTo: ['rent-001'],
      paymentMethod: 'Virement bancaire'
    },
    {
      id: 'spay-003',
      type: 'payment',
      reference: 'VIR-2024-003',
      date: '2024-02-03',
      label: 'Virement loyer',
      amount: 3500.00,
      status: 'paid',
      linkedTo: ['rent-002'],
      paymentMethod: 'Virement bancaire'
    }
  ],
  'fournitures-alpha': [
    {
      id: 'supp-001',
      type: 'invoice',
      reference: 'FA-ALPHA-001',
      date: '2024-01-15',
      label: 'Fournitures de bureau',
      amount: 850.00,
      status: 'paid',
      linkedTo: ['spay-004'],
      dueDate: '2024-02-15'
    },
    {
      id: 'supp-002',
      type: 'invoice',
      reference: 'FA-ALPHA-002',
      date: '2024-02-20',
      label: 'Matériel informatique',
      amount: 2300.00,
      status: 'pending',
      dueDate: '2024-03-20'
    },
    {
      id: 'spay-004',
      type: 'payment',
      reference: 'CB-2024-001',
      date: '2024-02-10',
      label: 'Paiement CB',
      amount: 850.00,
      status: 'paid',
      linkedTo: ['supp-001'],
      paymentMethod: 'Carte bancaire'
    }
  ],
  'orange-telecom': [
    {
      id: 'tel-001',
      type: 'invoice',
      reference: 'ORA-2024-01',
      date: '2024-01-05',
      label: 'Abonnement Internet + Mobile',
      amount: 120.00,
      status: 'paid',
      linkedTo: ['spay-005'],
      dueDate: '2024-01-20'
    },
    {
      id: 'tel-002',
      type: 'invoice',
      reference: 'ORA-2024-02',
      date: '2024-02-05',
      label: 'Abonnement Internet + Mobile',
      amount: 120.00,
      status: 'paid',
      linkedTo: ['spay-006'],
      dueDate: '2024-02-20'
    },
    {
      id: 'tel-003',
      type: 'invoice',
      reference: 'ORA-2024-03',
      date: '2024-03-05',
      label: 'Abonnement Internet + Mobile',
      amount: 120.00,
      status: 'pending',
      dueDate: '2024-03-20'
    },
    {
      id: 'spay-005',
      type: 'payment',
      reference: 'PREL-2024-001',
      date: '2024-01-18',
      label: 'Prélèvement automatique',
      amount: 120.00,
      status: 'paid',
      linkedTo: ['tel-001'],
      paymentMethod: 'Prélèvement automatique'
    },
    {
      id: 'spay-006',
      type: 'payment',
      reference: 'PREL-2024-002',
      date: '2024-02-18',
      label: 'Prélèvement automatique',
      amount: 120.00,
      status: 'paid',
      linkedTo: ['tel-002'],
      paymentMethod: 'Prélèvement automatique'
    }
  ]
};

// Détails des fournisseurs
export const mockSupplierDetails: Record<string, ClientDetail> = {
  'edf-energie': {
    id: 'edf-energie',
    name: 'EDF Énergie',
    initials: 'EDF',
    email: 'professionnel@edf.fr',
    phone: '09 69 32 15 15',
    address: 'Tour EDF, 20 Place de La Défense, 92050 Paris',
    totalDue: 1150.00,
    transactions: supplierTransactions['edf-energie'],
    customerSince: 'Janvier 2020',
    lastActivity: 'Il y a 3 jours',
    color: 'bg-gradient-to-br from-orange-500 to-yellow-600',
    type: 'supplier'
  },
  'immobilier-pro': {
    id: 'immobilier-pro',
    name: 'Immobilier Pro SCI',
    initials: 'IP',
    email: 'gestion@immobilier-pro.fr',
    phone: '+33 1 45 67 89 00',
    address: '123 Avenue des Champs-Élysées, 75008 Paris',
    totalDue: 3500.00,
    transactions: supplierTransactions['immobilier-pro'],
    customerSince: 'Mars 2021',
    lastActivity: 'Il y a 1 jour',
    color: 'bg-gradient-to-br from-gray-600 to-gray-800',
    type: 'supplier'
  },
  'fournitures-alpha': {
    id: 'fournitures-alpha',
    name: 'Fournitures Alpha',
    initials: 'FA',
    email: 'commande@fournitures-alpha.com',
    phone: '+33 2 34 56 78 90',
    address: '45 Rue du Commerce, 44000 Nantes',
    totalDue: 2300.00,
    transactions: supplierTransactions['fournitures-alpha'],
    customerSince: 'Juin 2022',
    lastActivity: 'Aujourd\'hui',
    color: 'bg-gradient-to-br from-red-500 to-orange-600',
    type: 'supplier'
  },
  'orange-telecom': {
    id: 'orange-telecom',
    name: 'Orange Business',
    initials: 'OR',
    email: 'entreprise@orange.fr',
    phone: '3900',
    address: '78 Rue Olivier de Serres, 75015 Paris',
    totalDue: 120.00,
    transactions: supplierTransactions['orange-telecom'],
    customerSince: 'Décembre 2019',
    lastActivity: 'Il y a 5 jours',
    color: 'bg-gradient-to-br from-orange-600 to-orange-700',
    type: 'supplier'
  }
};

// Groupes de fournisseurs pour la vue groupée
export const mockSupplierGroups: ClientGroup[] = [
  {
    id: 'edf-energie',
    name: 'EDF Énergie',
    initials: 'EDF',
    totalDue: 1150.00,
    transactions: supplierTransactions['edf-energie'].map(t => ({
      id: t.id,
      type: t.type as 'invoice' | 'payment' | 'credit_note',
      reference: t.reference,
      date: t.date,
      label: t.label,
      amount: t.amount,
      status: t.status as 'paid' | 'partial' | 'pending' | 'overdue',
      linkedTo: t.linkedTo
    })),
    daysOldest: 0,
    contactInfo: {
      email: 'professionnel@edf.fr',
      phone: '09 69 32 15 15'
    },
    color: 'bg-gradient-to-br from-orange-500 to-yellow-600'
  },
  {
    id: 'immobilier-pro',
    name: 'Immobilier Pro SCI',
    initials: 'IP',
    totalDue: 3500.00,
    transactions: supplierTransactions['immobilier-pro'].map(t => ({
      id: t.id,
      type: t.type as 'invoice' | 'payment' | 'credit_note',
      reference: t.reference,
      date: t.date,
      label: t.label,
      amount: t.amount,
      status: t.status as 'paid' | 'partial' | 'pending' | 'overdue',
      linkedTo: t.linkedTo
    })),
    daysOldest: 3,
    contactInfo: {
      email: 'gestion@immobilier-pro.fr',
      phone: '+33 1 45 67 89 00'
    },
    color: 'bg-gradient-to-br from-gray-600 to-gray-800'
  },
  {
    id: 'fournitures-alpha',
    name: 'Fournitures Alpha',
    initials: 'FA',
    totalDue: 2300.00,
    transactions: supplierTransactions['fournitures-alpha'].map(t => ({
      id: t.id,
      type: t.type as 'invoice' | 'payment' | 'credit_note',
      reference: t.reference,
      date: t.date,
      label: t.label,
      amount: t.amount,
      status: t.status as 'paid' | 'partial' | 'pending' | 'overdue',
      linkedTo: t.linkedTo
    })),
    daysOldest: 0,
    contactInfo: {
      email: 'commande@fournitures-alpha.com',
      phone: '+33 2 34 56 78 90'
    },
    color: 'bg-gradient-to-br from-red-500 to-orange-600'
  },
  {
    id: 'orange-telecom',
    name: 'Orange Business',
    initials: 'OR',
    totalDue: 120.00,
    transactions: supplierTransactions['orange-telecom'].map(t => ({
      id: t.id,
      type: t.type as 'invoice' | 'payment' | 'credit_note',
      reference: t.reference,
      date: t.date,
      label: t.label,
      amount: t.amount,
      status: t.status as 'paid' | 'partial' | 'pending' | 'overdue',
      linkedTo: t.linkedTo
    })),
    daysOldest: 0,
    contactInfo: {
      email: 'entreprise@orange.fr',
      phone: '3900'
    },
    color: 'bg-gradient-to-br from-orange-600 to-orange-700'
  }
];

// Fonction pour obtenir les détails d'un fournisseur
export function getSupplierDetail(supplierId: string): ClientDetail | undefined {
  return mockSupplierDetails[supplierId];
}

// Fonction pour obtenir tous les détails (clients + fournisseurs)
export function getEntityDetail(entityId: string): ClientDetail | undefined {
  return mockSupplierDetails[entityId];
}