"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BottomNav } from '@/components/navigation';
import { NavItem } from '@/components/navigation/types';

/**
 * Exemple d'utilisation du composant BottomNav
 * 
 * Ce composant démontre différents cas d'usage et configurations
 * du composant BottomNav avec des animations et interactions complètes.
 */
const BottomNavExample: React.FC = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [notifications, setNotifications] = useState({ sales: 3, messages: 12 });

  // Simulation du contenu des pages
  const renderContent = () => {
    const contentVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" as const }
      }
    };

    const contents: Record<string, React.ReactNode> = {
      dashboard: (
        <motion.div variants={contentVariants} initial="hidden" animate="visible">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Dashboard OKE
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
              Bienvenue sur votre tableau de bord. Gérez votre activité et suivez vos performances en temps réel.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { title: "Ventes du mois", value: "€24,500", change: "+12%" },
                { title: "Clients actifs", value: "142", change: "+8%" },
                { title: "Commandes", value: "67", change: "+15%" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  className="p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-glass"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <h3 className="text-sm text-neutral-500 mb-2">{stat.title}</h3>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold text-neutral-800 dark:text-white">
                      {stat.value}
                    </span>
                    <span className="text-green-500 text-sm font-medium">
                      {stat.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ),
      bank: (
        <motion.div variants={contentVariants} initial="hidden" animate="visible">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-white">
              Comptes Bancaires
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Gérez vos comptes et suivez vos flux financiers
            </p>
            <div className="max-w-md mx-auto p-6 rounded-2xl backdrop-blur-md bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-white/20">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                € 45,230.50
              </div>
              <div className="text-sm text-neutral-500 mt-1">
                Solde total disponible
              </div>
            </div>
          </div>
        </motion.div>
      ),
      add: (
        <motion.div variants={contentVariants} initial="hidden" animate="visible">
          <div className="text-center space-y-6">
            <motion.div
              className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <span className="text-2xl text-white">+</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-white">
              Ajouter un élément
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Créez une nouvelle transaction, facture ou client
            </p>
          </div>
        </motion.div>
      ),
      purchases: (
        <motion.div variants={contentVariants} initial="hidden" animate="visible">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-white">
              Achats & Dépenses
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Suivez vos achats et gérez vos dépenses professionnelles
            </p>
          </div>
        </motion.div>
      ),
      sales: (
        <motion.div variants={contentVariants} initial="hidden" animate="visible">
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <h1 className="text-3xl font-bold text-neutral-800 dark:text-white">
                Ventes & Revenus
              </h1>
              {notifications.sales > 0 && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {notifications.sales}
                </motion.div>
              )}
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Gérez vos ventes et analysez vos performances commerciales
            </p>
          </div>
        </motion.div>
      ),
    };

    return contents[activeItem] || contents.dashboard;
  };

  const handleNavigation = (itemId: string) => {
    setActiveItem(itemId);
    
    // Simulation de mise à jour des notifications
    if (itemId === 'sales' && notifications.sales > 0) {
      setTimeout(() => {
        setNotifications(prev => ({ ...prev, sales: 0 }));
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800">
      {/* Header avec titre dynamique */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            key={activeItem}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-neutral-800 dark:text-white capitalize">
                {activeItem === 'add' ? 'Nouveau' : activeItem}
              </h2>
              <p className="text-sm text-neutral-500">
                OKE Dashboard • {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
            
            {/* Indicateur de connexion */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-neutral-500">En ligne</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-12 pb-32 md:pb-24">
        {renderContent()}
      </main>

      {/* Navigation inférieure */}
      <BottomNav
        activeItem={activeItem}
        onItemSelect={handleNavigation}
      />

      {/* Background pattern décoratif */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-primary-500/5 via-transparent to-transparent" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-secondary-500/5 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default BottomNavExample;