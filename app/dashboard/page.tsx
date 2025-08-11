'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import DashboardEnriched from '@/components/dashboard/DashboardEnriched';
import Chatbot from '@/components/ui/Chatbot';
import { modules } from '@/lib/modules-config';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const router = useRouter();

  const handleModuleClick = (moduleId: string) => {
    router.push(`/${moduleId}`);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Tableau de bord
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            Bienvenue dans votre espace de gestion OKÉ
          </p>
        </div>

        {/* Dashboard Enriched avec Widgets et Graphiques */}
        <DashboardEnriched />

        {/* Grille de modules - Accès rapide */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Accès rapide aux modules</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {modules.filter(m => m.category !== 'system').map((module) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  className={cn(
                    "p-4 rounded-xl",
                    "bg-white dark:bg-neutral-900",
                    "border border-neutral-200 dark:border-neutral-800",
                    "hover:shadow-lg transition-all cursor-pointer",
                    "group",
                    "relative overflow-hidden"
                  )}
                >
                  {/* Effet de gradient au hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <Icon className="w-8 h-8 mb-2 text-primary group-hover:scale-110 transition-transform relative z-10" />
                  <h3 className="text-sm font-medium relative z-10">{module.label}</h3>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2 relative z-10">
                    {module.description}
                  </p>
                  
                  {/* Badge pour comptabilité */}
                  {module.id === 'accounting' && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section d'activité récente */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activités récentes */}
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Activité récente
            </h3>
            <div className="space-y-3">
              {[
                { time: 'Il y a 2h', action: 'Nouvelle facture créée', detail: 'FA-2024-001', color: 'text-green-600' },
                { time: 'Il y a 4h', action: 'Paiement reçu', detail: '2 500 € - Client ABC', color: 'text-blue-600' },
                { time: 'Hier', action: 'Rapprochement bancaire', detail: '45 opérations', color: 'text-purple-600' },
                { time: 'Hier', action: 'Export comptable', detail: 'Janvier 2024', color: 'text-orange-600' }
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className={cn("text-xs mt-1", activity.color)}>{activity.detail}</p>
                  </div>
                  <span className="text-xs text-neutral-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Raccourcis rapides */}
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Actions rapides
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Nouvelle facture', icon: '📄', color: 'bg-blue-50 dark:bg-blue-900/20' },
                { label: 'Encaisser', icon: '💰', color: 'bg-green-50 dark:bg-green-900/20' },
                { label: 'Nouveau client', icon: '👤', color: 'bg-purple-50 dark:bg-purple-900/20' },
                { label: 'Rapport', icon: '📊', color: 'bg-orange-50 dark:bg-orange-900/20' },
                { label: 'Export', icon: '📤', color: 'bg-pink-50 dark:bg-pink-900/20' },
                { label: 'Scanner', icon: '📷', color: 'bg-yellow-50 dark:bg-yellow-900/20' }
              ].map((action, index) => (
                <button
                  key={index}
                  className={cn(
                    "p-3 rounded-lg flex flex-col items-center gap-2",
                    "hover:scale-105 transition-transform",
                    action.color
                  )}
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="text-xs font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
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