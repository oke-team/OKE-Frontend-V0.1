/**
 * Service mocké pour l'API INSEE SIREN V3
 */

import { frenchCompanies, searchFrenchCompanies, filterByDepartment, filterByActivity } from '@/lib/mock-data/onboarding/frenchCompanies';
import { generateInseeResponse, type InseeResponse } from '@/lib/mock-data/onboarding/mockApiResponses';

export interface CompanySearchFilters {
  department?: string;
  activity?: string;
}

export interface CompanySearchResult {
  siren: string;
  nom_entreprise: string;
  adresse_complete: string;
  code_naf: string;
  libelle_code_naf: string;
  effectif: string;
  statut: string;
}

/**
 * Simule la recherche d'entreprises via l'API INSEE
 */
export async function searchCompaniesInsee(
  query: string,
  filters: CompanySearchFilters = {}
): Promise<CompanySearchResult[]> {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
  
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  let results = searchFrenchCompanies(query.trim());
  
  // Application des filtres
  if (filters.department) {
    results = filterByDepartment(results, filters.department);
  }
  
  if (filters.activity) {
    results = filterByActivity(results, filters.activity);
  }
  
  // Limitation des résultats pour l'UI
  results = results.slice(0, 20);
  
  // Transformation des résultats pour l'UI
  return results.map(company => ({
    siren: company.siren,
    nom_entreprise: company.nom_entreprise,
    adresse_complete: `${company.adresse.numero} ${company.adresse.voie}, ${company.adresse.code_postal} ${company.adresse.ville}`,
    code_naf: company.code_naf,
    libelle_code_naf: company.libelle_code_naf,
    effectif: company.effectif,
    statut: company.statut
  }));
}

/**
 * Simule la récupération d'informations détaillées d'une entreprise via INSEE
 */
export async function getCompanyInseeDetails(siren: string): Promise<InseeResponse | null> {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
  
  const company = frenchCompanies.find(c => c.siren === siren);
  
  if (!company) {
    throw new Error(`Aucune entreprise trouvée avec le SIREN ${siren}`);
  }
  
  return generateInseeResponse(company);
}

/**
 * Valide un numéro SIREN
 */
export function validateSiren(siren: string): boolean {
  // Supprime tous les espaces et caractères non numériques
  const cleanSiren = siren.replace(/\D/g, '');
  
  // Vérifie que c'est bien 9 chiffres
  if (cleanSiren.length !== 9) {
    return false;
  }
  
  // Algorithme de Luhn pour valider le SIREN
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    let digit = parseInt(cleanSiren[i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit = digit.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
      }
    }
    sum += digit;
  }
  
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(cleanSiren[8]);
}

/**
 * Formate un SIREN pour l'affichage (XXX XXX XXX)
 */
export function formatSiren(siren: string): string {
  const cleanSiren = siren.replace(/\D/g, '');
  if (cleanSiren.length === 9) {
    return `${cleanSiren.slice(0, 3)} ${cleanSiren.slice(3, 6)} ${cleanSiren.slice(6)}`;
  }
  return siren;
}

/**
 * Simule une recherche par SIREN spécifique
 */
export async function searchBySiren(siren: string): Promise<CompanySearchResult[]> {
  if (!validateSiren(siren)) {
    return [];
  }
  
  const cleanSiren = siren.replace(/\D/g, '');
  const company = frenchCompanies.find(c => c.siren === cleanSiren);
  
  if (!company) {
    return [];
  }
  
  // Simulation d'un délai
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [{
    siren: company.siren,
    nom_entreprise: company.nom_entreprise,
    adresse_complete: `${company.adresse.numero} ${company.adresse.voie}, ${company.adresse.code_postal} ${company.adresse.ville}`,
    code_naf: company.code_naf,
    libelle_code_naf: company.libelle_code_naf,
    effectif: company.effectif,
    statut: company.statut
  }];
}

/**
 * Types d'export pour l'utilisation dans les composants
 */
export type { InseeResponse };
export type { CompanySearchResult, CompanySearchFilters };