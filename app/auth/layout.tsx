'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // Si l'utilisateur est déjà connecté et qu'il essaie d'accéder aux pages auth,
    // le rediriger vers le dashboard
    if (!loading && isAuthenticated) {
      // Vérifier si on est sur une page spéciale (reset-password, verify, etc.)
      const currentPath = window.location.pathname;
      const specialAuthPages = ['/auth/reset-password', '/auth/verify', '/auth/confirm-email'];
      
      // Ne pas rediriger si on est sur une page spéciale d'authentification
      const isSpecialAuthPage = specialAuthPages.some(page => currentPath.startsWith(page));
      
      if (!isSpecialAuthPage) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, loading, router]);

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4C34CE]"></div>
      </div>
    );
  }

  return <>{children}</>;
}