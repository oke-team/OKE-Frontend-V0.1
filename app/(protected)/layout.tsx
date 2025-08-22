'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const { isAuthenticated, loading, user } = useAuth();

  useEffect(() => {
    // Rediriger vers la page de connexion si non authentifié
    if (!loading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, loading, router]);

  // Afficher un loader pendant la vérification de l'authentification
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4C34CE] to-[#6B46FF] rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#4C34CE] animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
          <p className="text-gray-600 font-medium">Chargement...</p>
        </motion.div>
      </div>
    );
  }

  // Rediriger si non authentifié après le chargement
  if (!isAuthenticated) {
    return null;
  }

  // Vérifier si c'est la première connexion et si le profil est complet
  useEffect(() => {
    if (user && !user.hasCompletedFirstLogin) {
      // Vérifier si l'utilisateur doit compléter son profil
      const currentPath = window.location.pathname;
      
      // Ne pas rediriger si déjà sur une page d'onboarding
      if (!currentPath.includes('/onboarding') && !currentPath.includes('/setup')) {
        // Vous pouvez décommenter cette ligne pour forcer l'onboarding
        // router.push('/onboarding');
      }
    }
  }, [user, router]);

  // Afficher le contenu protégé avec AppLayout
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto"
      >
        {children}
      </motion.div>
    </AppLayout>
  );
}