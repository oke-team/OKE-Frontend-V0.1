'use client';

import React, { useState, useCallback, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';
import CabinetDossierTable from '@/components/cabinet-dashboard/CabinetDossierTable';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';
import { calculateCabinetStats } from '@/lib/mock-data/cabinet-dashboard-data';

export default function CabinetDashboardPage() {
  // États pour les widgets de statistiques
  const [showStats, setShowStats] = useState(true);
  
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  // Détection mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Mémoriser setCurrentPage pour éviter les boucles infinies
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const cabinetStats = calculateCabinetStats();
  
  // Fonction pour recevoir les mises à jour de pagination avec useMemo pour éviter les boucles
  const handlePaginationUpdate = useCallback((newTotalPages: number, newTotalItems: number) => {
    setTotalPages(newTotalPages);
    setTotalItems(newTotalItems);
  }, []);

  return (
    <AppLayout
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalItems}
      onPageChange={handlePageChange}
    >
      {isMobile ? (
        // Layout mobile simplifié
        <div className="min-h-screen bg-gray-50">
          {/* Statistiques fixes en haut */}
          <motion.div 
            variants={fadeInUp}
            className="fixed top-16 left-0 right-0 z-20 bg-gray-50 px-3 py-2 border-b border-gray-100"
          >
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-red-600">{cabinetStats.dossiersEnRetard.count}</div>
                <div className="text-xs text-gray-600 leading-tight">Retard</div>
              </div>
              <div className="bg-white rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-orange-600">{cabinetStats.echeancesSemaine.count}</div>
                <div className="text-xs text-gray-600 leading-tight">Échéances</div>
              </div>
              <div className="bg-white rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-blue-600">{cabinetStats.heuresFacturees.semaine}h</div>
                <div className="text-xs text-gray-600 leading-tight">Heures</div>
              </div>
              <div className="bg-white rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-green-600">+{(cabinetStats.rentabiliteMois.montant / 1000).toFixed(1)}K€</div>
                <div className="text-xs text-gray-600 leading-tight">Rentabilité</div>
              </div>
            </div>
          </motion.div>

          {/* Liste des dossiers avec marge pour les widgets */}
          <motion.div 
            className="pt-20 pb-20"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="px-4"
            >
              <CabinetDossierTable 
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalPages={totalPages}
                totalItems={totalItems}
                onPaginationUpdate={handlePaginationUpdate}
              />
            </motion.div>
          </motion.div>
        </div>
      ) : (
        // Layout desktop avec position absolue
        <div className="fixed top-16 left-0 right-0 bottom-0 overflow-hidden">
          <motion.div 
            className="h-full flex flex-col"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* KPIs pilotage cabinet - position absolue en haut */}
            <motion.div 
              variants={fadeInUp}
              className="absolute top-0 left-0 right-0 z-10 px-4 lg:px-6 pt-2 pb-1"
            >
              <div className="grid grid-cols-4 gap-3">
                {/* Dossiers en retard */}
                <div className="bg-white rounded-lg p-3 text-center border border-red-200 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-xl font-bold text-red-600">{cabinetStats.dossiersEnRetard.count}</div>
                  <div className="text-xs text-gray-600 leading-tight">Dossiers en retard</div>
                  <div className="text-xs text-red-500">{">"} {cabinetStats.dossiersEnRetard.seuilJours} jours</div>
                </div>
                
                {/* Échéances semaine */}
                <div className="bg-white rounded-lg p-3 text-center border border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-xl font-bold text-orange-600">{cabinetStats.echeancesSemaine.count}</div>
                  <div className="text-xs text-gray-600 leading-tight">Échéances semaine</div>
                  <div className="text-xs text-orange-500">{cabinetStats.echeancesSemaine.types.join(', ')}</div>
                </div>
                
                {/* Heures facturées */}
                <div className="bg-white rounded-lg p-3 text-center border border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-xl font-bold text-blue-600">{cabinetStats.heuresFacturees.semaine}h</div>
                  <div className="text-xs text-gray-600 leading-tight">Heures équipe</div>
                  <div className="text-xs text-green-500">+{cabinetStats.heuresFacturees.evolution.toFixed(1)}% vs N-1</div>
                </div>
                
                {/* Rentabilité */}
                <div className="bg-white rounded-lg p-3 text-center border border-green-200 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-xl font-bold text-green-600">+{(cabinetStats.rentabiliteMois.montant / 1000).toFixed(1)}K€</div>
                  <div className="text-xs text-gray-600 leading-tight">Rentabilité mois</div>
                  <div className="text-xs text-green-500">+{cabinetStats.rentabiliteMois.evolution.toFixed(1)}% vs N-1</div>
                </div>
              </div>
            </motion.div>

            {/* Table des dossiers - positionnée entre navbar et bas de page */}
            <motion.div 
              variants={fadeInUp}
              className="absolute top-20 left-0 right-0 px-4 lg:px-6"
              style={{ bottom: '12px' }}
            >
              <div className="h-full bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] border border-[#FAA016] overflow-hidden ring-2 ring-black/10 drop-shadow-2xl" style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 25px 50px -12px rgba(0, 0, 0, 0.15)'}}>
                <CabinetDossierTable 
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  onPaginationUpdate={handlePaginationUpdate}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AppLayout>
  );
}