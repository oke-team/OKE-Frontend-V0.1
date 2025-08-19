'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DashboardEnriched from '@/components/dashboard/DashboardEnriched';
import Chatbot from '@/components/ui/Chatbot';

export default function DashboardPage() {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <AppLayout>
      <div className="w-full min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto">
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