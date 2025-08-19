/**
 * Base de données d'entreprises françaises mockées pour le tunnel d'onboarding
 */

export interface FrenchCompany {
  siren: string;
  siret: string;
  nom_entreprise: string;
  denomination?: string;
  prenom?: string;
  nom?: string;
  adresse: {
    numero: string;
    voie: string;
    code_postal: string;
    ville: string;
    departement: string;
    region: string;
  };
  code_naf: string;
  libelle_code_naf: string;
  forme_juridique: string;
  date_creation: string;
  effectif: string;
  capital?: number;
  telephone?: string;
  site_internet?: string;
  email?: string;
  statut: 'Actif' | 'Cessé';
}

export const frenchCompanies: FrenchCompany[] = [
  {
    siren: "552100554",
    siret: "55210055400047",
    nom_entreprise: "APPLE FRANCE",
    denomination: "APPLE FRANCE",
    adresse: {
      numero: "114",
      voie: "Avenue Charles de Gaulle",
      code_postal: "92200",
      ville: "Neuilly-sur-Seine",
      departement: "Hauts-de-Seine",
      region: "Île-de-France"
    },
    code_naf: "4651Z",
    libelle_code_naf: "Commerce de gros d'ordinateurs, d'équipements informatiques périphériques et de logiciels",
    forme_juridique: "Société par actions simplifiée",
    date_creation: "1981-09-01",
    effectif: "250 à 499 salariés",
    capital: 99019020,
    telephone: "0800906701",
    site_internet: "https://www.apple.com/fr",
    statut: "Actif"
  },
  {
    siren: "542065479",
    siret: "54206547900054",
    nom_entreprise: "GOOGLE FRANCE",
    denomination: "GOOGLE FRANCE",
    adresse: {
      numero: "8",
      voie: "Rue de Londres",
      code_postal: "75009",
      ville: "Paris",
      departement: "Paris",
      region: "Île-de-France"
    },
    code_naf: "7311Z",
    libelle_code_naf: "Activités des agences de publicité",
    forme_juridique: "Société par actions simplifiée",
    date_creation: "2002-11-13",
    effectif: "1 000 à 4 999 salariés",
    capital: 2000000,
    telephone: "0153330800",
    site_internet: "https://www.google.fr",
    statut: "Actif"
  },
  {
    siren: "433048762",
    siret: "43304876200028",
    nom_entreprise: "MICROSOFT FRANCE",
    denomination: "MICROSOFT FRANCE",
    adresse: {
      numero: "37",
      voie: "Quai du Président Roosevelt",
      code_postal: "92130",
      ville: "Issy-les-Moulineaux",
      departement: "Hauts-de-Seine",
      region: "Île-de-France"
    },
    code_naf: "4651Z",
    libelle_code_naf: "Commerce de gros d'ordinateurs, d'équipements informatiques périphériques et de logiciels",
    forme_juridique: "Société par actions simplifiée",
    date_creation: "1985-07-12",
    effectif: "500 à 999 salariés",
    capital: 4240000,
    telephone: "0825827800",
    site_internet: "https://www.microsoft.com/fr-fr",
    statut: "Actif"
  },
  {
    siren: "775665943",
    siret: "77566594300410",
    nom_entreprise: "CARREFOUR",
    denomination: "CARREFOUR",
    adresse: {
      numero: "93",
      voie: "Avenue de Paris",
      code_postal: "91300",
      ville: "Massy",
      departement: "Essonne",
      region: "Île-de-France"
    },
    code_naf: "4711D",
    libelle_code_naf: "Supermarchés",
    forme_juridique: "Société anonyme",
    date_creation: "1959-01-03",
    effectif: "10 000 salariés et plus",
    capital: 1864071734,
    telephone: "0169360000",
    site_internet: "https://www.carrefour.fr",
    statut: "Actif"
  },
  {
    siren: "552032534",
    siret: "55203253407632",
    nom_entreprise: "L'OREAL",
    denomination: "L'OREAL",
    adresse: {
      numero: "14",
      voie: "Rue Royale",
      code_postal: "75008",
      ville: "Paris",
      departement: "Paris",
      region: "Île-de-France"
    },
    code_naf: "2042Z",
    libelle_code_naf: "Fabrication de parfums et de produits pour la toilette",
    forme_juridique: "Société anonyme",
    date_creation: "1909-07-30",
    effectif: "5 000 à 9 999 salariés",
    capital: 120000000,
    telephone: "0147561000",
    site_internet: "https://www.loreal.fr",
    statut: "Actif"
  },
  {
    siren: "542107596",
    siret: "54210759600047",
    nom_entreprise: "ORANGE",
    denomination: "ORANGE",
    adresse: {
      numero: "78",
      voie: "Rue Olivier de Serres",
      code_postal: "75015",
      ville: "Paris",
      departement: "Paris",
      region: "Île-de-France"
    },
    code_naf: "6110Z",
    libelle_code_naf: "Télécommunications filaires",
    forme_juridique: "Société anonyme",
    date_creation: "1988-01-01",
    effectif: "10 000 salariés et plus",
    capital: 10640226396,
    telephone: "0144442222",
    site_internet: "https://www.orange.fr",
    statut: "Actif"
  },
  {
    siren: "712042449",
    siret: "71204244900014",
    nom_entreprise: "BNP PARIBAS",
    denomination: "BNP PARIBAS",
    adresse: {
      numero: "16",
      voie: "Boulevard des Italiens",
      code_postal: "75009",
      ville: "Paris",
      departement: "Paris",
      region: "Île-de-France"
    },
    code_naf: "6419Z",
    libelle_code_naf: "Autres intermédiations monétaires",
    forme_juridique: "Société anonyme",
    date_creation: "1966-06-23",
    effectif: "10 000 salariés et plus",
    capital: 2492420358,
    telephone: "0140142000",
    site_internet: "https://www.bnpparibas.fr",
    statut: "Actif"
  },
  {
    siren: "775663284",
    siret: "77566328400299",
    nom_entreprise: "SOCIETE GENERALE",
    denomination: "SOCIETE GENERALE",
    adresse: {
      numero: "29",
      voie: "Boulevard Haussmann",
      code_postal: "75009",
      ville: "Paris",
      departement: "Paris",
      region: "Île-de-France"
    },
    code_naf: "6419Z",
    libelle_code_naf: "Autres intermédiations monétaires",
    forme_juridique: "Société anonyme",
    date_creation: "1864-05-04",
    effectif: "10 000 salariés et plus",
    capital: 1066714367,
    telephone: "0142141414",
    site_internet: "https://www.societegenerale.fr",
    statut: "Actif"
  },
  {
    siren: "493955843",
    siret: "49395584300121",
    nom_entreprise: "DANONE",
    denomination: "DANONE",
    adresse: {
      numero: "17",
      voie: "Boulevard Haussmann",
      code_postal: "75009",
      ville: "Paris",
      departement: "Paris",
      region: "Île-de-France"
    },
    code_naf: "1051C",
    libelle_code_naf: "Fabrication de fromage",
    forme_juridique: "Société anonyme",
    date_creation: "1919-02-22",
    effectif: "5 000 à 9 999 salariés",
    capital: 95000000,
    telephone: "0144352070",
    site_internet: "https://www.danone.fr",
    statut: "Actif"
  },
  {
    siren: "542044031",
    siret: "54204403100821",
    nom_entreprise: "PEUGEOT",
    denomination: "PEUGEOT",
    adresse: {
      numero: "75",
      voie: "Avenue de la Grande Armée",
      code_postal: "75116",
      ville: "Paris",
      departement: "Paris",
      region: "Île-de-France"
    },
    code_naf: "2910Z",
    libelle_code_naf: "Construction de véhicules automobiles",
    forme_juridique: "Société anonyme",
    date_creation: "1896-04-20",
    effectif: "10 000 salariés et plus",
    capital: 2674634309,
    telephone: "0155937000",
    site_internet: "https://www.peugeot.fr",
    statut: "Actif"
  },
  {
    siren: "384955171",
    siret: "38495517100010",
    nom_entreprise: "BOULANGERIE MARTIN",
    nom: "MARTIN",
    prenom: "Pierre",
    adresse: {
      numero: "15",
      voie: "Rue de la République",
      code_postal: "69001",
      ville: "Lyon",
      departement: "Rhône",
      region: "Auvergne-Rhône-Alpes"
    },
    code_naf: "1071C",
    libelle_code_naf: "Boulangerie et boulangerie-pâtisserie",
    forme_juridique: "Entreprise individuelle",
    date_creation: "2019-03-15",
    effectif: "1 ou 2 salariés",
    telephone: "0478123456",
    statut: "Actif"
  },
  {
    siren: "892456789",
    siret: "89245678900015",
    nom_entreprise: "GARAGE DUBOIS SARL",
    denomination: "GARAGE DUBOIS",
    adresse: {
      numero: "23",
      voie: "Avenue de la Paix",
      code_postal: "31000",
      ville: "Toulouse",
      departement: "Haute-Garonne",
      region: "Occitanie"
    },
    code_naf: "4520A",
    libelle_code_naf: "Entretien et réparation de véhicules automobiles légers",
    forme_juridique: "Société à responsabilité limitée",
    date_creation: "2015-09-10",
    effectif: "3 à 5 salariés",
    capital: 50000,
    telephone: "0561234567",
    site_internet: "https://garage-dubois.fr",
    statut: "Actif"
  },
  {
    siren: "753284691",
    siret: "75328469100028",
    nom_entreprise: "COIFFURE ELEGANCE",
    nom: "BERNARD",
    prenom: "Sophie",
    adresse: {
      numero: "8",
      voie: "Place du Marché",
      code_postal: "44000",
      ville: "Nantes",
      departement: "Loire-Atlantique",
      region: "Pays de la Loire"
    },
    code_naf: "9602A",
    libelle_code_naf: "Coiffure",
    forme_juridique: "Entreprise individuelle",
    date_creation: "2020-01-08",
    effectif: "0 salarié",
    telephone: "0240987654",
    statut: "Actif"
  },
  {
    siren: "456789123",
    siret: "45678912300012",
    nom_entreprise: "RESTAURANT LE GOURMET",
    denomination: "LE GOURMET",
    adresse: {
      numero: "42",
      voie: "Rue Victor Hugo",
      code_postal: "13001",
      ville: "Marseille",
      departement: "Bouches-du-Rhône",
      region: "Provence-Alpes-Côte d'Azur"
    },
    code_naf: "5610A",
    libelle_code_naf: "Restauration traditionnelle",
    forme_juridique: "Société à responsabilité limitée",
    date_creation: "2018-06-20",
    effectif: "6 à 9 salariés",
    capital: 30000,
    telephone: "0491876543",
    email: "contact@legourmet-marseille.fr",
    statut: "Actif"
  },
  {
    siren: "321654987",
    siret: "32165498700019",
    nom_entreprise: "PHARMACIE CENTRALE",
    nom: "DURAND",
    prenom: "Marie",
    adresse: {
      numero: "1",
      voie: "Place de la Mairie",
      code_postal: "67000",
      ville: "Strasbourg",
      departement: "Bas-Rhin",
      region: "Grand Est"
    },
    code_naf: "4773Z",
    libelle_code_naf: "Commerce de détail de produits pharmaceutiques en magasin spécialisé",
    forme_juridique: "Entreprise individuelle",
    date_creation: "2012-11-30",
    effectif: "3 à 5 salariés",
    telephone: "0388765432",
    statut: "Actif"
  }
];

/**
 * Fonction de recherche d'entreprises par nom ou SIREN
 */
export function searchFrenchCompanies(query: string): FrenchCompany[] {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return frenchCompanies.filter(company => {
    // Recherche par SIREN (avec ou sans espaces)
    if (/^\d+/.test(normalizedQuery)) {
      const querySiren = normalizedQuery.replace(/\s/g, '');
      return company.siren.includes(querySiren) || company.siret.includes(querySiren);
    }
    
    // Recherche par nom
    const companyName = company.nom_entreprise.toLowerCase();
    const denomination = company.denomination?.toLowerCase() || '';
    
    return companyName.includes(normalizedQuery) || 
           denomination.includes(normalizedQuery);
  });
}

/**
 * Fonction de filtrage par département
 */
export function filterByDepartment(companies: FrenchCompany[], department: string): FrenchCompany[] {
  if (!department) return companies;
  
  const normalizedDep = department.toLowerCase();
  
  return companies.filter(company => 
    company.adresse.departement.toLowerCase().includes(normalizedDep) ||
    company.adresse.code_postal.startsWith(department)
  );
}

/**
 * Fonction de filtrage par activité (NAF/APE)
 */
export function filterByActivity(companies: FrenchCompany[], activity: string): FrenchCompany[] {
  if (!activity) return companies;
  
  const normalizedActivity = activity.toLowerCase();
  
  return companies.filter(company => 
    company.code_naf.toLowerCase().includes(normalizedActivity) ||
    company.libelle_code_naf.toLowerCase().includes(normalizedActivity)
  );
}