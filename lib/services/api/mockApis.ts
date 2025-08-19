/**
 * APIs mockées pour le développement front-end
 * Simule les vraies APIs : pays, INSEE, Pappers, Logo.dev
 */

// Types pour les APIs
export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface CompanyData {
  siren: string;
  nom_entreprise: string;
  adresse_complete: string;
  code_postal: string;
  ville: string;
  forme_juridique?: string;
  capital?: number;
  date_creation?: string;
  activite_principale?: string;
  dirigeants?: string[];
}

export interface LogoData {
  found: boolean;
  logo_url?: string;
  source: 'logo_dev' | 'website' | 'social' | 'none';
  website_url?: string;
  social_links?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

/**
 * API Mock - Liste des pays
 */
export const mockCountriesApi = {
  getCountries: async (): Promise<Country[]> => {
    // Simulation délai réseau
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      { code: 'FR', name: 'France', flag: '🇫🇷' },
      { code: 'BE', name: 'Belgique', flag: '🇧🇪' },
      { code: 'CH', name: 'Suisse', flag: '🇨🇭' },
      { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
      { code: 'CA', name: 'Canada', flag: '🇨🇦' },
      { code: 'US', name: 'États-Unis', flag: '🇺🇸' },
      { code: 'GB', name: 'Royaume-Uni', flag: '🇬🇧' },
      { code: 'DE', name: 'Allemagne', flag: '🇩🇪' },
      { code: 'IT', name: 'Italie', flag: '🇮🇹' },
      { code: 'ES', name: 'Espagne', flag: '🇪🇸' }
    ];
  }
};

/**
 * API Mock - Recherche entreprise INSEE/Pappers
 */
export const mockCompanyApi = {
  searchCompany: async (query: string): Promise<CompanyData[]> => {
    // Simulation délai réseau
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (query.length < 2) return [];
    
    // Données mockées réalistes
    const mockCompanies: CompanyData[] = [
      {
        siren: '552070755',
        nom_entreprise: 'APPLE FRANCE SARL',
        adresse_complete: '19-21 Boulevard Malesherbes, 75008 Paris',
        code_postal: '75008',
        ville: 'Paris',
        forme_juridique: 'SARL',
        capital: 1000000,
        date_creation: '1981-09-17',
        activite_principale: 'Commerce de gros d\'ordinateurs, d\'équipements informatiques',
        dirigeants: ['Tim Cook', 'Jean Dupont']
      },
      {
        siren: '542065479',
        nom_entreprise: 'GOOGLE FRANCE SARL',
        adresse_complete: '8 Rue de Londres, 75009 Paris',
        code_postal: '75009',
        ville: 'Paris',
        forme_juridique: 'SARL',
        capital: 2500000,
        date_creation: '2003-02-11',
        activite_principale: 'Programmation informatique',
        dirigeants: ['Sundar Pichai', 'Marie Martin']
      },
      {
        siren: '489273022',
        nom_entreprise: 'MICROSOFT FRANCE',
        adresse_complete: '37 Quai du Président Roosevelt, 92130 Issy-les-Moulineaux',
        code_postal: '92130',
        ville: 'Issy-les-Moulineaux',
        forme_juridique: 'SA',
        capital: 4267000,
        date_creation: '1985-07-22',
        activite_principale: 'Edition de logiciels système et de réseau',
        dirigeants: ['Satya Nadella', 'Pierre Dubois']
      },
      {
        siren: '775671428',
        nom_entreprise: 'TESLA FRANCE',
        adresse_complete: '15 Avenue de la Grande Armée, 75116 Paris',
        code_postal: '75116',
        ville: 'Paris',
        forme_juridique: 'SASU',
        capital: 500000,
        date_creation: '2009-04-15',
        activite_principale: 'Commerce de voitures et de véhicules automobiles légers',
        dirigeants: ['Elon Musk', 'Sophie Laurent']
      },
      {
        siren: '432167567',
        nom_entreprise: 'AIRBNB FRANCE',
        adresse_complete: '25 Rue de Ponthieu, 75008 Paris',
        code_postal: '75008',
        ville: 'Paris',
        forme_juridique: 'SAS',
        capital: 1250000,
        date_creation: '2012-03-08',
        activite_principale: 'Portail Internet',
        dirigeants: ['Brian Chesky', 'Julie Moreau']
      }
    ];

    // Filtrer par query
    return mockCompanies.filter(company => 
      company.nom_entreprise.toLowerCase().includes(query.toLowerCase()) ||
      company.siren.includes(query) ||
      company.ville.toLowerCase().includes(query.toLowerCase())
    );
  },

  getCompanyBySiren: async (siren: string): Promise<CompanyData | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const companies = await mockCompanyApi.searchCompany('');
    return companies.find(c => c.siren === siren) || null;
  }
};

/**
 * API Mock - Logo.dev pour récupération automatique de logos
 */
export const mockLogoApi = {
  findLogo: async (companyName: string, website?: string): Promise<LogoData> => {
    // Simulation délai réseau
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const normalizedName = companyName.toLowerCase();
    
    // Simuler trouvé pour certaines entreprises connues
    const knownLogos: Record<string, LogoData> = {
      'apple france sarl': {
        found: true,
        logo_url: 'https://logo.clearbit.com/apple.com',
        source: 'logo_dev',
        website_url: 'https://apple.fr',
        social_links: {
          linkedin: 'https://linkedin.com/company/apple',
          twitter: 'https://twitter.com/apple'
        }
      },
      'google france sarl': {
        found: true,
        logo_url: 'https://logo.clearbit.com/google.com',
        source: 'logo_dev',
        website_url: 'https://google.fr',
        social_links: {
          linkedin: 'https://linkedin.com/company/google',
          twitter: 'https://twitter.com/google'
        }
      },
      'microsoft france': {
        found: true,
        logo_url: 'https://logo.clearbit.com/microsoft.com',
        source: 'logo_dev',
        website_url: 'https://microsoft.fr',
        social_links: {
          linkedin: 'https://linkedin.com/company/microsoft',
          twitter: 'https://twitter.com/microsoft'
        }
      },
      'tesla france': {
        found: true,
        logo_url: 'https://logo.clearbit.com/tesla.com',
        source: 'logo_dev',
        website_url: 'https://tesla.fr',
        social_links: {
          linkedin: 'https://linkedin.com/company/tesla',
          twitter: 'https://twitter.com/tesla'
        }
      }
    };

    return knownLogos[normalizedName] || {
      found: false,
      source: 'none'
    };
  },

  uploadLogo: async (file: File): Promise<{ success: boolean; url?: string; error?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Validation simple
    if (file.size > 5 * 1024 * 1024) { // 5MB
      return { success: false, error: 'Fichier trop volumineux (max 5MB)' };
    }
    
    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'Format non supporté (JPG, PNG uniquement)' };
    }
    
    // Simuler upload réussi
    return {
      success: true,
      url: URL.createObjectURL(file) // URL temporaire pour la démo
    };
  }
};

/**
 * API Mock - Collection de données entreprise
 */
export const mockDataCollectionApi = {
  collectCompanyData: async (siren: string): Promise<{
    success: boolean;
    data_collected: {
      documents_count: number;
      data_points: number;
      categories: string[];
    };
    progress: number;
  }> => {
    // Simulation longue pour effet réaliste
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    return {
      success: true,
      data_collected: {
        documents_count: Math.floor(Math.random() * 50) + 10,
        data_points: Math.floor(Math.random() * 200) + 50,
        categories: [
          'Informations légales',
          'Données financières',
          'Contacts et dirigeants',
          'Activité et secteur',
          'Géolocalisation'
        ]
      },
      progress: 100
    };
  }
};

// Export par défaut avec toutes les APIs
export default {
  countries: mockCountriesApi,
  company: mockCompanyApi,
  logo: mockLogoApi,
  dataCollection: mockDataCollectionApi
};