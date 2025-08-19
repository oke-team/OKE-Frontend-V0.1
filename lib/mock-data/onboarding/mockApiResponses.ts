/**
 * Réponses mockées détaillées pour les APIs INSEE et Pappers
 */

import { FrenchCompany } from './frenchCompanies';

export interface InseeResponse {
  siren: string;
  siren_formate: string;
  nom_entreprise: string;
  code_naf: string;
  libelle_code_naf: string;
  date_creation: string;
  effectif: string;
  statut: string;
}

export interface PappersCompanyDetails {
  siren: string;
  siren_formate: string;
  nom_entreprise: string;
  denomination?: string;
  personne_morale: boolean;
  code_naf: string;
  libelle_code_naf: string;
  domaine_activite: string;
  date_creation: string;
  date_creation_formate: string;
  entreprise_cessee: boolean;
  entreprise_employeuse: boolean;
  categorie_juridique: string;
  forme_juridique: string;
  effectif: string;
  effectif_min: number;
  effectif_max: number;
  capital?: number;
  capital_formate?: string;
  siege: {
    siret: string;
    adresse: string;
    code_postal: string;
    ville: string;
    departement: string;
    region: string;
  };
  numero_tva_intracommunautaire: string;
  representants: Array<{
    nom: string;
    prenom: string;
    fonction: string;
    date_naissance?: string;
  }>;
  finances: Array<{
    annee: number;
    chiffre_affaires?: number;
    resultat_net?: number;
    disponible: boolean;
  }>;
  depots_actes: Array<{
    date_depot: string;
    type: string;
    numero_depot: string;
    disponible: boolean;
  }>;
  comptes: Array<{
    annee: number;
    date_depot: string;
    type_comptes: string;
    disponible: boolean;
    url_download?: string;
  }>;
  sites_internet?: string[];
  telephone?: string;
  email?: string;
}

export interface LogoDevResponse {
  name: string;
  domain: string;
  logo: string;
  social_media: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  alternatives: Array<{
    logo: string;
    confidence: number;
  }>;
}

/**
 * Génère une réponse INSEE mockée à partir d'une entreprise
 */
export function generateInseeResponse(company: FrenchCompany): InseeResponse {
  return {
    siren: company.siren,
    siren_formate: `${company.siren.slice(0, 3)} ${company.siren.slice(3, 6)} ${company.siren.slice(6)}`,
    nom_entreprise: company.nom_entreprise,
    code_naf: company.code_naf,
    libelle_code_naf: company.libelle_code_naf,
    date_creation: company.date_creation,
    effectif: company.effectif,
    statut: company.statut === 'Actif' ? 'Actif' : 'Cessé'
  };
}

/**
 * Génère une réponse Pappers détaillée à partir d'une entreprise
 */
export function generatePappersResponse(company: FrenchCompany): PappersCompanyDetails {
  const isPersonneMorale = !!company.denomination;
  
  // Génération de données financières mockées
  const currentYear = new Date().getFullYear();
  const finances = [];
  const comptes = [];
  const depots_actes = [];
  
  // 3 années de données financières
  for (let i = 0; i < 3; i++) {
    const year = currentYear - 1 - i;
    finances.push({
      annee: year,
      chiffre_affaires: Math.floor(Math.random() * 10000000) + 100000,
      resultat_net: Math.floor(Math.random() * 1000000) - 50000,
      disponible: true
    });
    
    comptes.push({
      annee: year,
      date_depot: `${year + 1}-06-${Math.floor(Math.random() * 28) + 1}`,
      type_comptes: "Comptes annuels",
      disponible: true,
      url_download: `https://www.pappers.fr/download/comptes/${company.siren}/${year}`
    });
  }
  
  // Génération d'actes mockés
  const actes = ["Statuts", "Procès-verbal AG", "Modification capital"];
  for (let i = 0; i < 3; i++) {
    const randomDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 3);
    depots_actes.push({
      date_depot: randomDate.toISOString().split('T')[0],
      type: actes[i % actes.length],
      numero_depot: `${company.siren}-${i + 1}`,
      disponible: true
    });
  }
  
  // Génération de représentants
  const representants = [];
  if (isPersonneMorale) {
    representants.push({
      nom: "MARTIN",
      prenom: "Jean-Pierre",
      fonction: "Président",
      date_naissance: "1975-03-15"
    });
    representants.push({
      nom: "BERNARD",
      prenom: "Marie",
      fonction: "Directeur Général",
      date_naissance: "1980-11-22"
    });
  } else if (company.nom && company.prenom) {
    representants.push({
      nom: company.nom,
      prenom: company.prenom,
      fonction: "Gérant",
    });
  }
  
  return {
    siren: company.siren,
    siren_formate: `${company.siren.slice(0, 3)} ${company.siren.slice(3, 6)} ${company.siren.slice(6)}`,
    nom_entreprise: company.nom_entreprise,
    denomination: company.denomination,
    personne_morale: isPersonneMorale,
    code_naf: company.code_naf,
    libelle_code_naf: company.libelle_code_naf,
    domaine_activite: getDomainFromNaf(company.code_naf),
    date_creation: company.date_creation,
    date_creation_formate: formatDateFrench(company.date_creation),
    entreprise_cessee: company.statut !== 'Actif',
    entreprise_employeuse: !company.effectif.includes('0 salarié'),
    categorie_juridique: getCategorieJuridique(company.forme_juridique),
    forme_juridique: company.forme_juridique,
    effectif: company.effectif,
    effectif_min: getEffectifMin(company.effectif),
    effectif_max: getEffectifMax(company.effectif),
    capital: company.capital,
    capital_formate: company.capital ? `${company.capital.toLocaleString()} €` : undefined,
    siege: {
      siret: company.siret,
      adresse: `${company.adresse.numero} ${company.adresse.voie}`,
      code_postal: company.adresse.code_postal,
      ville: company.adresse.ville,
      departement: company.adresse.departement,
      region: company.adresse.region
    },
    numero_tva_intracommunautaire: `FR${(97 - (parseInt(company.siren) % 97)).toString().padStart(2, '0')}${company.siren}`,
    representants,
    finances,
    comptes,
    depots_actes,
    sites_internet: company.site_internet ? [company.site_internet] : undefined,
    telephone: company.telephone,
    email: company.email
  };
}

/**
 * Génère une réponse Logo.dev mockée
 */
export function generateLogoDevResponse(websiteUrl: string): LogoDevResponse {
  const domain = new URL(websiteUrl).hostname;
  const logoUrl = `https://logo.clearbit.com/${domain}`;
  
  // Logos alternatifs mockés
  const alternatives = [
    { logo: `${logoUrl}?size=256`, confidence: 0.95 },
    { logo: `${logoUrl}?size=128`, confidence: 0.87 },
    { logo: `${logoUrl}?variant=dark`, confidence: 0.76 }
  ];
  
  return {
    name: domain.replace(/\.(com|fr|org|net)$/, '').toUpperCase(),
    domain,
    logo: logoUrl,
    social_media: {
      linkedin: `https://linkedin.com/company/${domain.split('.')[0]}`,
      twitter: `https://twitter.com/${domain.split('.')[0]}`,
      facebook: `https://facebook.com/${domain.split('.')[0]}`,
      instagram: `https://instagram.com/${domain.split('.')[0]}`
    },
    alternatives
  };
}

// Fonctions utilitaires

function getDomainFromNaf(codeNaf: string): string {
  const nafDomains: Record<string, string> = {
    '47': 'Commerce de détail',
    '46': 'Commerce de gros',
    '62': 'Programmation informatique',
    '73': 'Publicité et études de marché',
    '56': 'Restauration',
    '96': 'Services personnels',
    '45': 'Automobile',
    '20': 'Industrie chimique',
    '29': 'Industrie automobile',
    '64': 'Services financiers',
    '61': 'Télécommunications',
    '10': 'Industries alimentaires'
  };
  
  const prefix = codeNaf.slice(0, 2);
  return nafDomains[prefix] || 'Autres activités';
}

function getCategorieJuridique(formeJuridique: string): string {
  const mapping: Record<string, string> = {
    'Société anonyme': '5599',
    'Société par actions simplifiée': '5720',
    'Société à responsabilité limitée': '5498',
    'Entreprise individuelle': '1000'
  };
  
  return mapping[formeJuridique] || '5499';
}

function getEffectifMin(effectif: string): number {
  const mapping: Record<string, number> = {
    '0 salarié': 0,
    '1 ou 2 salariés': 1,
    '3 à 5 salariés': 3,
    '6 à 9 salariés': 6,
    '10 à 19 salariés': 10,
    '20 à 49 salariés': 20,
    '50 à 99 salariés': 50,
    '100 à 199 salariés': 100,
    '200 à 249 salariés': 200,
    '250 à 499 salariés': 250,
    '500 à 999 salariés': 500,
    '1 000 à 4 999 salariés': 1000,
    '5 000 à 9 999 salariés': 5000,
    '10 000 salariés et plus': 10000
  };
  
  return mapping[effectif] || 0;
}

function getEffectifMax(effectif: string): number {
  const mapping: Record<string, number> = {
    '0 salarié': 0,
    '1 ou 2 salariés': 2,
    '3 à 5 salariés': 5,
    '6 à 9 salariés': 9,
    '10 à 19 salariés': 19,
    '20 à 49 salariés': 49,
    '50 à 99 salariés': 99,
    '100 à 199 salariés': 199,
    '200 à 249 salariés': 249,
    '250 à 499 salariés': 499,
    '500 à 999 salariés': 999,
    '1 000 à 4 999 salariés': 4999,
    '5 000 à 9 999 salariés': 9999,
    '10 000 salariés et plus': 50000
  };
  
  return mapping[effectif] || 0;
}

function formatDateFrench(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
}