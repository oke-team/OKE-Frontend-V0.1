'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/services/api/auth.service';
import { useAppDispatch } from '@/lib/store/hooks';
import { fetchUserEntreprises, clearEntreprises } from '@/lib/store/slices/entreprisesSlice';

interface User {
  id: string;
  email: string;
  full_name?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  company?: any;
  hasCompletedFirstLogin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; message?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      
      // Vérifier si on a un token
      if (authService.isAuthenticated()) {
        // Essayer de récupérer l'utilisateur depuis le storage local d'abord
        const storedUser = authService.getUser();
        if (storedUser) {
          setUser(storedUser);
          // Récupérer les entreprises même avec l'utilisateur stocké
          dispatch(fetchUserEntreprises());
        }
        
        // Puis vérifier avec le backend (mais ne pas effacer si ça échoue)
        try {
          const currentUser = await authService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            // Sauvegarder l'utilisateur mis à jour
            const hasRememberMe = localStorage.getItem('oke_access_token') !== null;
            authService.setUser(currentUser, hasRememberMe);
          }
        } catch (error) {
          // Si l'appel API échoue mais qu'on a un utilisateur stocké, on le garde
          console.log('Could not fetch current user from API, using stored user');
          if (!storedUser) {
            // Seulement si on n'a pas d'utilisateur stocké
            await authService.logout();
            setUser(null);
            dispatch(clearEntreprises());
          }
        }
      } else {
        // Pas de token, pas d'utilisateur
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // Ne pas effacer l'utilisateur en cas d'erreur générale
      if (!authService.isAuthenticated()) {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (
    email: string, 
    password: string, 
    rememberMe = false
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      setLoading(true);
      
      const response = await authService.login({ email, password, rememberMe });
      
      if (response.success && response.data) {
        setUser(response.data.user);
        
        // Récupérer les entreprises de l'utilisateur après connexion
        dispatch(fetchUserEntreprises());
        
        return { success: true };
      }
      
      return { 
        success: false, 
        message: response.message || 'Erreur de connexion' 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'Une erreur est survenue lors de la connexion' 
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (
    signupData: SignupData
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      setLoading(true);
      
      const response = await authService.signup(signupData);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        return { success: true };
      }
      
      return { 
        success: false, 
        message: response.message || 'Erreur lors de l\'inscription' 
      };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        message: 'Une erreur est survenue lors de l\'inscription' 
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      // Nettoyer les entreprises du store Redux
      dispatch(clearEntreprises());
      // Utiliser setTimeout pour permettre au composant de se démonter proprement
      setTimeout(() => {
        router.push('/');
      }, 0);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  }, [router, dispatch]);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  }, []);

  const updateUser = useCallback((userData: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, ...userData };
      // Sauvegarder également dans le localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('oke_user', JSON.stringify(updatedUser));
      }
      return updatedUser;
    });
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    refreshUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}