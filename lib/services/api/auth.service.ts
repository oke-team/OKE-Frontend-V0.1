/**
 * Service d'authentification pour OKÉ
 * Gère la connexion avec l'API backend FastAPI
 */

interface AuthTokens {
  access_token: string;
  refresh_token?: string;
  token_type: string;
}

interface User {
  id: string;
  email: string;
  full_name?: string;
  username?: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    tokens: AuthTokens;
  };
  message?: string;
}

class AuthService {
  private baseUrl: string;
  private tokenKey = 'oke_access_token';
  private refreshTokenKey = 'oke_refresh_token';
  private userKey = 'oke_user';

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  }

  /**
   * Connexion utilisateur
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur de connexion');
      }

      const data = await response.json();
      
      // Gérer les deux formats de réponse possibles
      const accessToken = data.data?.access_token || data.access_token;
      const refreshToken = data.data?.refresh_token || data.refresh_token;
      const user = data.data?.user || data.user;
      
      // Stocker les tokens et les infos utilisateur
      if (accessToken) {
        this.setTokens({
          access_token: accessToken,
          refresh_token: refreshToken,
          token_type: data.data?.token_type || data.token_type || 'Bearer',
        }, credentials.rememberMe);
        
        // Stocker les infos utilisateur
        if (user) {
          this.setUser(user, credentials.rememberMe);
        }
      }

      return {
        success: true,
        data: {
          user: user || { email: credentials.email } as User,
          tokens: {
            access_token: accessToken,
            refresh_token: refreshToken,
            token_type: data.data?.token_type || data.token_type || 'Bearer',
          },
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erreur de connexion',
      };
    }
  }

  /**
   * Inscription utilisateur
   */
  async signup(signupData: SignupData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signupData.email, // L'API utilise l'email comme username
          email: signupData.email,
          password: signupData.password,
          full_name: `${signupData.firstName} ${signupData.lastName}`,
          phone: signupData.phone,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de l\'inscription');
      }

      const data = await response.json();
      
      // NE PAS stocker les tokens lors de l'inscription
      // L'utilisateur doit confirmer son email avant de pouvoir se connecter
      
      return {
        success: true,
        data: {
          user: data.data?.user || data.user || { email: signupData.email, full_name: `${signupData.firstName} ${signupData.lastName}` } as User,
          tokens: {
            access_token: '', // Pas de token avant confirmation email
            refresh_token: '',
            token_type: 'Bearer',
          },
        },
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erreur lors de l\'inscription',
      };
    }
  }

  /**
   * Déconnexion
   */
  async logout(): Promise<void> {
    try {
      const token = this.getAccessToken();
      if (token) {
        // Appeler l'endpoint de logout sur le backend
        await fetch(`${this.baseUrl}/auth/signout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Nettoyer le stockage local
      this.clearAuth();
    }
  }

  /**
   * Rafraîchir le token d'accès
   */
  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        return false;
      }

      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      
      if (data.data?.access_token) {
        this.setTokens({
          access_token: data.data.access_token,
          refresh_token: data.data.refresh_token || refreshToken,
          token_type: data.data.token_type || 'Bearer',
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearAuth();
      return false;
    }
  }

  /**
   * Récupérer l'utilisateur actuel depuis le backend
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const token = this.getAccessToken();
      if (!token) {
        return null;
      }

      const response = await fetch(`${this.baseUrl}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expiré, essayer de le rafraîchir
          const refreshed = await this.refreshToken();
          if (refreshed) {
            return this.getCurrentUser();
          }
        }
        throw new Error('Failed to get user');
      }

      const data = await response.json();
      
      // Gérer les deux formats de réponse possibles
      const userData = data.data || data;
      
      if (userData && userData.email) {
        // Déterminer si on utilise localStorage ou sessionStorage
        const hasRememberMe = localStorage.getItem(this.tokenKey) !== null;
        this.setUser(userData, hasRememberMe);
        return userData;
      }

      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  /**
   * Demander la réinitialisation du mot de passe
   */
  async requestPasswordReset(email: string): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Email de réinitialisation envoyé',
        };
      }

      const error = await response.json();
      return {
        success: false,
        message: error.detail || error.message || 'Erreur lors de la demande',
      };
    } catch (error) {
      console.error('Password reset request error:', error);
      return {
        success: false,
        message: 'Impossible de contacter le serveur',
      };
    }
  }

  /**
   * Réinitialiser le mot de passe avec un token
   */
  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Mot de passe réinitialisé avec succès',
        };
      }

      const error = await response.json();
      return {
        success: false,
        message: error.detail || error.message || 'Token invalide ou expiré',
      };
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        message: 'Impossible de contacter le serveur',
      };
    }
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  /**
   * Obtenir le token d'accès
   */
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    // Vérifier d'abord sessionStorage puis localStorage
    return sessionStorage.getItem(this.tokenKey) || localStorage.getItem(this.tokenKey);
  }

  /**
   * Obtenir le refresh token
   */
  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    return sessionStorage.getItem(this.refreshTokenKey) || localStorage.getItem(this.refreshTokenKey);
  }

  /**
   * Obtenir l'utilisateur stocké
   */
  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userJson = sessionStorage.getItem(this.userKey) || localStorage.getItem(this.userKey);
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }

  /**
   * Stocker les tokens
   */
  private setTokens(tokens: AuthTokens, rememberMe = false): void {
    if (typeof window === 'undefined') return;
    
    const storage = rememberMe ? localStorage : sessionStorage;
    
    storage.setItem(this.tokenKey, tokens.access_token);
    if (tokens.refresh_token) {
      storage.setItem(this.refreshTokenKey, tokens.refresh_token);
    }
    
    // Définir également les cookies pour le middleware
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 0; // 30 jours ou session
    document.cookie = `oke_access_token=${tokens.access_token}; path=/; ${maxAge ? `max-age=${maxAge}` : ''}; SameSite=Lax`;
    if (tokens.refresh_token) {
      document.cookie = `oke_refresh_token=${tokens.refresh_token}; path=/; ${maxAge ? `max-age=${maxAge}` : ''}; SameSite=Lax`;
    }
  }

  /**
   * Stocker l'utilisateur
   */
  setUser(user: User, rememberMe = false): void {
    if (typeof window === 'undefined') return;
    
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(this.userKey, JSON.stringify(user));
  }

  /**
   * Nettoyer l'authentification
   */
  private clearAuth(): void {
    if (typeof window === 'undefined') return;
    
    // Nettoyer les deux storages
    [sessionStorage, localStorage].forEach(storage => {
      storage.removeItem(this.tokenKey);
      storage.removeItem(this.refreshTokenKey);
      storage.removeItem(this.userKey);
    });
    
    // Supprimer également les cookies
    document.cookie = 'oke_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax';
    document.cookie = 'oke_refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax';
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax';
  }

  /**
   * Helper pour faire des requêtes authentifiées
   */
  async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const token = this.getAccessToken();
    
    if (!token) {
      throw new Error('No authentication token');
    }

    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Si le token est expiré, essayer de le rafraîchir
    if (response.status === 401) {
      const refreshed = await this.refreshToken();
      if (refreshed) {
        // Réessayer la requête avec le nouveau token
        const newToken = this.getAccessToken();
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${newToken}`,
          },
        });
      }
    }

    return response;
  }
}

// Export une instance unique
export const authService = new AuthService();

// Export aussi la classe pour les tests
export { AuthService };