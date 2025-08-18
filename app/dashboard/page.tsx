'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DashboardEnriched from '@/components/dashboard/DashboardEnriched';
import Chatbot from '@/components/ui/Chatbot';

export default function DashboardPage() {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <AppLayout>
      <div className="w-full h-[calc(100vh-64px-96px)] px-4 sm:px-6 lg:px-8 pt-4 overflow-hidden">
        {/* Dashboard Header - Optimisé */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          Tableau de bord
        </h1>

        {/* Dashboard Enriched avec Widgets et Graphiques */}
        <div className="h-[calc(100%-3rem-1rem)] overflow-y-auto">
          <DashboardEnriched />
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot 
        isOpen={chatbotOpen} 
        onClose={() => setChatbotOpen(false)} 
      />
    </AppLayout>
  );
}