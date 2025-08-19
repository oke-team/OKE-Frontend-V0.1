/**
 * Service mocké pour Logo.dev
 */

import { generateLogoDevResponse, type LogoDevResponse } from '@/lib/mock-data/onboarding/mockApiResponses';

export interface LogoSearchResult {
  success: boolean;
  logo_found: boolean;
  primary_logo?: {
    url: string;
    format: string;
    size: { width: number; height: number };
    confidence: number;
  };
  alternative_logos: Array<{
    url: string;
    format: string;
    size: { width: number; height: number };
    confidence: number;
    variant?: string;
  }>;
  social_media: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  company_info?: {
    name: string;
    domain: string;
    description?: string;
  };
}

export interface LogoUploadResult {
  success: boolean;
  logo_url: string;
  filename: string;
  size: number;
  format: string;
  processed_variants?: {
    thumbnail: string;
    medium: string;
    large: string;
  };
}

/**
 * Simule la recherche de logo via Logo.dev
 */
export async function searchCompanyLogo(websiteUrl: string): Promise<LogoSearchResult> {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  try {
    // Valide l'URL
    const url = new URL(websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`);
    const domain = url.hostname;
    
    // Simule une chance de ne pas trouver de logo (20% de chance)
    if (Math.random() < 0.2) {
      return {
        success: true,
        logo_found: false,
        alternative_logos: [],
        social_media: {},
        company_info: {
          name: domain.replace(/\.(com|fr|org|net)$/, '').toUpperCase(),
          domain: domain
        }
      };
    }
    
    // Génère une réponse mockée complète
    const logoDevResponse = generateLogoDevResponse(websiteUrl);
    
    // Transforme la réponse pour notre interface
    const logoSearchResult: LogoSearchResult = {
      success: true,
      logo_found: true,
      primary_logo: {
        url: logoDevResponse.logo,
        format: 'PNG',
        size: { width: 256, height: 256 },
        confidence: 0.95
      },
      alternative_logos: logoDevResponse.alternatives.map((alt, index) => ({
        url: alt.logo,
        format: 'PNG',
        size: { 
          width: index === 0 ? 128 : 64, 
          height: index === 0 ? 128 : 64 
        },
        confidence: alt.confidence,
        variant: index === 0 ? 'dark' : index === 1 ? 'light' : 'square'
      })),
      social_media: logoDevResponse.social_media,
      company_info: {
        name: logoDevResponse.name,
        domain: logoDevResponse.domain,
        description: `${logoDevResponse.name} est une entreprise basée sur ${logoDevResponse.domain}`
      }
    };
    
    return logoSearchResult;
    
  } catch (error) {
    // URL invalide
    return {
      success: false,
      logo_found: false,
      alternative_logos: [],
      social_media: {}
    };
  }
}

/**
 * Simule l'upload d'un logo utilisateur
 */
export async function uploadCustomLogo(file: File): Promise<LogoUploadResult> {
  // Validation du fichier
  const validFormats = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
  
  if (!validFormats.includes(file.type)) {
    throw new Error('Format de fichier non supporté. Utilisez PNG, JPG, SVG ou WebP.');
  }
  
  if (file.size > 10 * 1024 * 1024) { // 10MB max
    throw new Error('Le fichier est trop volumineux. Taille maximum : 10MB.');
  }
  
  // Simulation d'upload progressif
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
  
  // Simulation d'échec occasionnel (5% de chance)
  if (Math.random() < 0.05) {
    throw new Error('Erreur lors de l\'upload. Veuillez réessayer.');
  }
  
  // Génère une URL mockée pour le logo uploadé
  const logoId = Math.random().toString(36).substr(2, 9);
  const baseUrl = `https://cdn.oke-app.com/logos/${logoId}`;
  
  return {
    success: true,
    logo_url: `${baseUrl}.${getFileExtension(file.type)}`,
    filename: file.name,
    size: file.size,
    format: file.type,
    processed_variants: {
      thumbnail: `${baseUrl}_thumb.png`,
      medium: `${baseUrl}_medium.png`,
      large: `${baseUrl}_large.png`
    }
  };
}

/**
 * Génère une prévisualisation d'un fichier logo avant upload
 */
export function generateLogoPreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };
    
    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier'));
    };
    
    reader.readAsDataURL(file);
  });
}

/**
 * Valide un fichier logo avant upload
 */
export function validateLogoFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const validFormats = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  const minSize = 1024; // 1KB
  
  if (!validFormats.includes(file.type)) {
    return {
      valid: false,
      error: 'Format non supporté. Utilisez PNG, JPG, SVG ou WebP.'
    };
  }
  
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Fichier trop volumineux (max 10MB).'
    };
  }
  
  if (file.size < minSize) {
    return {
      valid: false,
      error: 'Fichier trop petit (min 1KB).'
    };
  }
  
  return { valid: true };
}

/**
 * Simule la vérification d'une URL de site web
 */
export async function validateWebsiteUrl(url: string): Promise<{
  valid: boolean;
  formatted_url?: string;
  error?: string;
  suggestions?: string[];
}> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    // Ajoute https:// si pas de protocole
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    const urlObj = new URL(formattedUrl);
    
    // Simule une vérification de disponibilité (90% de succès)
    if (Math.random() < 0.9) {
      return {
        valid: true,
        formatted_url: formattedUrl
      };
    } else {
      return {
        valid: false,
        error: 'Site web inaccessible',
        suggestions: [
          `https://www.${urlObj.hostname}`,
          `http://${urlObj.hostname}`,
          `https://${urlObj.hostname.replace('www.', '')}`
        ]
      };
    }
    
  } catch {
    return {
      valid: false,
      error: 'URL invalide',
      suggestions: [
        'https://exemple.com',
        'www.exemple.fr',
        'exemple.org'
      ]
    };
  }
}

// Fonction utilitaire
function getFileExtension(mimeType: string): string {
  const extensions: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/svg+xml': 'svg',
    'image/webp': 'webp'
  };
  
  return extensions[mimeType] || 'png';
}

/**
 * Types d'export
 */
export type { LogoSearchResult, LogoUploadResult };