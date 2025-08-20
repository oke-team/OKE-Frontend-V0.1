/**
 * Service de recherche et gestion des entreprises
 * Utilise l'API backend pour obtenir les données d'entreprises françaises
 */

interface EntrepriseSearchResult {
  siren: string;
  siret?: string;
  denomination: string; // Changé de nom_complet à denomination
  enseigne?: string; // Changé de nom_commercial à enseigne
  sigle?: string;
  adresse: string;
  code_postal: string;
  ville: string;
  departement: string;
  region?: string;
  pays?: string;
  activite_principale: string; // Changé de code_naf à activite_principale
  libelle_code_naf?: string;
  forme_juridique: string;
  effectif?: string; // Changé de tranche_effectif à effectif
  date_creation?: string;
  date_cessation?: string;
  etat?: string; // Changé de statut à etat
  donnees_financieres?: {
    chiffre_affaires?: number;
    resultat?: number;
    effectif_finance?: number;
    annee?: number;
  };
  siege?: boolean;
}

interface EntrepriseSearchResponse {
  total: number;
  source: string;
  entreprises: EntrepriseSearchResult[];
}

interface EntrepriseSearchParams {
  q?: string;           // SIREN, SIRET ou nom
  code_postal?: string;
  departement?: string;
  limit?: number;
}

class EntrepriseService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  }

  /**
   * Rechercher des entreprises
   * @param params Paramètres de recherche
   * @returns Liste des entreprises trouvées
   */
  async search(params: EntrepriseSearchParams): Promise<EntrepriseSearchResponse> {
    try {
      // Construire les query params
      const queryParams = new URLSearchParams();
      
      if (params.q) queryParams.append('q', params.q);
      if (params.code_postal) queryParams.append('code_postal', params.code_postal);
      if (params.departement) queryParams.append('departement', params.departement);
      if (params.limit) queryParams.append('limit', params.limit.toString());

      const url = `${this.baseUrl}/entreprises/search?${queryParams.toString()}`;
      
      // Récupérer le token si disponible
      const token = this.getAccessToken();
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || error.message || 'Erreur lors de la recherche');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur recherche entreprises:', error);
      
      // En cas d'erreur, retourner des données vides
      return {
        total: 0,
        source: 'ERROR',
        entreprises: []
      };
    }
  }

  /**
   * Obtenir les détails d'une entreprise par SIREN ou SIRET
   * @param identifier SIREN (9 chiffres) ou SIRET (14 chiffres)
   * @returns Détails de l'entreprise
   */
  async getDetails(identifier: string): Promise<any> {
    try {
      const token = this.getAccessToken();
      
      const response = await fetch(`${this.baseUrl}/entreprises/details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          siren: identifier.length === 9 ? identifier : undefined,
          siret: identifier.length === 14 ? identifier : undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || error.message || 'Erreur lors de la récupération des détails');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur détails entreprise:', error);
      throw error;
    }
  }

  /**
   * Formater une entreprise pour l'affichage dans le composant
   */
  formatForDisplay(entreprise: EntrepriseSearchResult) {
    return {
      id: entreprise.siret || entreprise.siren,
      name: entreprise.denomination || entreprise.enseigne || 'N/A',
      siren: entreprise.siren,
      siret: entreprise.siret,
      address: entreprise.adresse || '',
      city: entreprise.ville || '',
      postalCode: entreprise.code_postal || '',
      department: entreprise.departement || '',
      activity: this.formatNafCode(entreprise.activite_principale) || entreprise.libelle_code_naf || '',
      nafCode: entreprise.activite_principale || '',
      nafLabel: entreprise.libelle_code_naf || this.formatNafCode(entreprise.activite_principale) || '',
      employees: this.formatEmployees(entreprise.effectif),
      revenue: entreprise.donnees_financieres?.chiffre_affaires ? 
        `${(entreprise.donnees_financieres.chiffre_affaires / 1000000).toFixed(1)}M€` : 'N/A',
      creationDate: this.formatDate(entreprise.date_creation),
      legalForm: this.formatLegalForm(entreprise.forme_juridique) || '',
      isActive: entreprise.etat === 'Actif',
    };
  }

  /**
   * Formater la tranche d'effectif
   */
  private formatEmployees(tranche?: string): string {
    if (!tranche) return 'N/A';
    
    const tranches: Record<string, string> = {
      '00': '0',
      '01': '1-2',
      '02': '3-5',
      '03': '6-9',
      '11': '10-19',
      '12': '20-49',
      '21': '50-99',
      '22': '100-199',
      '31': '200-249',
      '32': '250-499',
      '41': '500-999',
      '42': '1000-1999',
      '51': '2000-4999',
      '52': '5000-9999',
      '53': '10000+',
    };
    
    return tranches[tranche] || tranche;
  }

  /**
   * Formater une date
   */
  private formatDate(date?: string): string {
    if (!date) return 'N/A';
    
    try {
      const d = new Date(date);
      return d.getFullYear().toString();
    } catch {
      return date;
    }
  }

  /**
   * Formater le code NAF/APE en libellé lisible
   */
  private formatNafCode(code?: string): string {
    if (!code) return '';
    
    // Mapping simplifié des codes NAF courants
    const nafMapping: Record<string, string> = {
      '47.11D': 'Supermarchés',
      '47.11F': 'Hypermarchés',
      '62.01Z': 'Programmation informatique',
      '62.02A': 'Conseil en systèmes et logiciels informatiques',
      '70.22Z': 'Conseil pour les affaires et autres conseils de gestion',
      '56.10A': 'Restauration traditionnelle',
      '56.10C': 'Restauration de type rapide',
      '68.20A': 'Location de logements',
      '68.20B': 'Location de terrains et d\'autres biens immobiliers',
      '47.71Z': 'Commerce de détail d\'habillement',
    };
    
    return nafMapping[code] || code;
  }

  /**
   * Formater la forme juridique
   */
  private formatLegalForm(code?: string): string {
    if (!code) return '';
    
    // Mapping des codes de formes juridiques INSEE
    const formeMapping: Record<string, string> = {
      '5710': 'SAS',
      '5499': 'SARL',
      '5308': 'EURL',
      '5203': 'SA',
      '1000': 'Entrepreneur individuel',
      '5202': 'SASU',
      '6540': 'SCI',
      '6599': 'SCP',
      '9220': 'Association',
      '6100': 'SELARL',
    };
    
    return formeMapping[code] || code;
  }

  /**
   * Récupérer le token d'accès depuis le storage
   */
  private getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    return sessionStorage.getItem('oke_access_token') || 
           localStorage.getItem('oke_access_token');
  }

  /**
   * Recherche publique (sans authentification)
   * Pour l'étape de création de compte
   */
  async publicSearch(query: string): Promise<EntrepriseSearchResult[]> {
    try {
      // Pour la recherche publique, on n'envoie pas de token
      const queryParams = new URLSearchParams({ q: query, limit: '10' });
      const url = `${this.baseUrl}/entreprises/search/public?${queryParams.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Si l'endpoint public n'existe pas, essayer avec l'endpoint normal
      if (response.status === 404) {
        const result = await this.search({ q: query, limit: 10 });
        return result.entreprises;
      }

      if (!response.ok) {
        console.warn('Recherche publique échouée, utilisation de données mockées');
        return [];
      }

      const data = await response.json();
      return data.entreprises || [];
    } catch (error) {
      console.error('Erreur recherche publique:', error);
      // En cas d'erreur, retourner un tableau vide
      return [];
    }
  }
}

// Export une instance unique
export const entrepriseService = new EntrepriseService();

// Export aussi la classe pour les tests
export { EntrepriseService };