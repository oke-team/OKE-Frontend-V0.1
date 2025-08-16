'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DashboardEnriched from '@/components/dashboard/DashboardEnriched';
import Chatbot from '@/components/ui/Chatbot';

export default function DashboardPage() {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Tableau de bord
          </h1>
        </div>

        {/* Dashboard Enriched avec Widgets et Graphiques */}
        <DashboardEnriched />
      </div>

      {/* Chatbot */}
      <Chatbot 
        isOpen={chatbotOpen} 
        onClose={() => setChatbotOpen(false)} 
      />
    </AppLayout>
  );
}