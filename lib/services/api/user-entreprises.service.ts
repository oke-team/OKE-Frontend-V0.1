import { ApiResponse } from '@/lib/types/api';

export interface UserEntreprise {
  id: string;
  siret: string;
  siren: string;
  nom: string;
  enseigne?: string;
  adresse?: string;
  code_postal?: string;
  ville?: string;
  pays?: string;
  forme_juridique?: string;
  date_creation?: string;
  effectif?: string;
  tranche_effectif?: string;
  chiffre_affaires?: string;
  logo_url?: string;
  is_primary?: boolean;
  created_at?: string;
  updated_at?: string;
}

class UserEntreprisesService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

  /**
   * Récupérer les entreprises de l'utilisateur connecté
   */
  async getUserEntreprises(): Promise<ApiResponse<UserEntreprise[]>> {
    try {
      const token = typeof window !== 'undefined' 
        ? (localStorage.getItem('oke_access_token') || sessionStorage.getItem('access_token'))
        : null;
      
      if (!token) {
        return {
          success: false,
          error: 'Non authentifié',
        };
      }

      // Appel à la nouvelle API
      console.log('Fetching user entreprises from:', `${this.baseUrl}/entreprises/my-entreprises`);
      const response = await fetch(`${this.baseUrl}/entreprises/my-entreprises`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Si 404, l'utilisateur n'a pas encore d'entreprises
        if (response.status === 404) {
          return {
            success: true,
            data: [],
          };
        }
        
        const errorData = await response.json().catch(() => null);
        return {
          success: false,
          error: errorData?.detail || `Erreur ${response.status}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data: data.entreprises || data || [],
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des entreprises:', error);
      return {
        success: false,
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  /**
   * Ajouter une entreprise à l'utilisateur
   */
  async addEntreprise(entrepriseData: Partial<UserEntreprise>): Promise<ApiResponse<UserEntreprise>> {
    try {
      const token = typeof window !== 'undefined' 
        ? (localStorage.getItem('oke_access_token') || sessionStorage.getItem('access_token'))
        : null;
      
      if (!token) {
        return {
          success: false,
          error: 'Non authentifié',
        };
      }

      const response = await fetch(`${this.baseUrl}/entreprises/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entrepriseData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return {
          success: false,
          error: errorData?.detail || `Erreur ${response.status}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'entreprise:', error);
      return {
        success: false,
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  /**
   * Définir une entreprise comme principale
   */
  async setPrimaryEntreprise(entrepriseId: string): Promise<ApiResponse<UserEntreprise>> {
    try {
      const token = typeof window !== 'undefined' 
        ? (localStorage.getItem('oke_access_token') || sessionStorage.getItem('access_token'))
        : null;
      
      if (!token) {
        return {
          success: false,
          error: 'Non authentifié',
        };
      }

      const response = await fetch(`${this.baseUrl}/entreprises/${entrepriseId}/set-primary`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return {
          success: false,
          error: errorData?.detail || `Erreur ${response.status}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Erreur lors de la définition de l\'entreprise principale:', error);
      return {
        success: false,
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  /**
   * Supprimer une entreprise de l'utilisateur
   */
  async removeEntreprise(entrepriseId: string): Promise<ApiResponse<void>> {
    try {
      const token = typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : null;
      
      if (!token) {
        return {
          success: false,
          error: 'Non authentifié',
        };
      }

      const response = await fetch(`${this.baseUrl}/users/me/entreprises/${entrepriseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return {
          success: false,
          error: errorData?.detail || `Erreur ${response.status}`,
        };
      }

      return {
        success: true,
        data: undefined,
      };
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'entreprise:', error);
      return {
        success: false,
        error: 'Erreur de connexion au serveur',
      };
    }
  }

  /**
   * Récupérer les entreprises depuis le localStorage (pour les données mock)
   */
  getMockEntreprises(): UserEntreprise[] {
    if (typeof window === 'undefined') return [];
    
    const storedData = localStorage.getItem('userCompanies');
    if (!storedData) return [];
    
    try {
      const companies = JSON.parse(storedData);
      // Convertir le format du localStorage vers UserEntreprise
      return companies.map((company: any) => ({
        id: company.id || company.siret || company.siren,
        siret: company.siret || '',
        siren: company.siren || company.siret?.substring(0, 9) || '',
        nom: company.name || company.nom || '',
        enseigne: company.enseigne,
        adresse: company.address || company.adresse,
        code_postal: company.postalCode || company.code_postal,
        ville: company.city || company.ville,
        pays: company.country || company.pays || 'France',
        forme_juridique: company.legalForm || company.forme_juridique,
        effectif: company.employees || company.effectif,
        logo_url: company.logo || company.logo_url,
        is_primary: company.is_primary || false,
      }));
    } catch (error) {
      console.error('Erreur lors de la lecture des entreprises mock:', error);
      return [];
    }
  }
}

export const userEntreprisesService = new UserEntreprisesService();