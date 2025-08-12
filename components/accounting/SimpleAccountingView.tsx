'use client';

import React from 'react';
import { EntrepreneurDashboardWrapper } from './entrepreneur/EntrepreneurDashboardWrapper';

interface SimpleAccountingViewProps {
  onActionClick?: (action: string) => void;
}

export default function SimpleAccountingView({ onActionClick }: SimpleAccountingViewProps) {
  // Données mockées pour le dashboard entrepreneur
  const mockData = {
    treasury: {
      totalAmount: 125000,
      evolution: 12.5,
      trend: 'up' as const,
      entriesAmount: 45000,
      exitsAmount: 32000,
      forecast30Days: 138000,
    },
    clients: {
      totalAmount: 87500,
      overdueAmount: 12300,
      averageDays: 28,
      trend: 'stable' as const,
    },
    suppliers: {
      totalAmount: 43200,
      overdueAmount: 5600,
      averageDays: 35,
      trend: 'down' as const,
    },
    payroll: {
      totalAmount: 28500,
      employees: 8,
      nextPayment: '25/01/2025',
    },
    tax: {
      totalAmount: 15600,
      nextDeadline: '15/02/2025',
      type: 'TVA',
    },
    revenue: {
      totalAmount: 285000,
      evolution: 18.5,
      trend: 'up' as const,
    },
    expenses: {
      totalAmount: 195000,
      evolution: 8.2,
      trend: 'up' as const,
    },
    margin: {
      percentage: 31.6,
      amount: 90000,
      evolution: 10.3,
    },
    netResult: {
      amount: 45000,
      evolution: 15.2,
      trend: 'up' as const,
    },
  };

  return (
    <div className="w-full">
      <EntrepreneurDashboardWrapper data={mockData} />
    </div>
  );
}