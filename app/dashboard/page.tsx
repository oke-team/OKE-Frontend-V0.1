'use client';

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DashboardEnriched from '@/components/dashboard/DashboardEnriched';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="w-full min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto">
        <DashboardEnriched />
      </div>
    </AppLayout>
  );
}