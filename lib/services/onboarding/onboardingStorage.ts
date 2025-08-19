/**
 * Service de persistence localStorage pour le tunnel d'onboarding
 */

export interface OnboardingFormData {
  // Étape 1: Informations personnelles
  personal_info: {
    prenom: string;
    nom: string;
    email: string;
    telephone?: string;
    password: string;
  };
  
  // Étape 2: Pays sélectionné
  country: {
    code: string;
    name: string;
    flag: string;
  };
  
  // Étape 3: Entreprise sélectionnée
  company: {
    siren: string;
    nom_entreprise: string;
    adresse_complete: string;
    selected: boolean;
  } | null;
  
  // Étape 4: Données collectées
  collected_data: {
    completed: boolean;
    data_count: number;
    documents_count: number;
  } | null;
  
  // Étape 5: Logo et finalisation
  branding: {
    website_url?: string;
    logo_url?: string;
    logo_source: 'found' | 'uploaded' | 'none';
    social_media?: {
      linkedin?: string;
      twitter?: string;
      facebook?: string;
      instagram?: string;
    };
  } | null;
}

export interface OnboardingSession {
  session_id: string;
  current_step: number;
  form_data: OnboardingFormData;
  started_at: string;
  last_updated: string;
  completed: boolean;
}

const STORAGE_KEY = 'oke_onboarding_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 heures

/**
 * Initialise une nouvelle session d'onboarding
 */
export function createOnboardingSession(): OnboardingSession {
  const session: OnboardingSession = {
    session_id: generateSessionId(),
    current_step: 0,
    form_data: {
      personal_info: {
        prenom: '',
        nom: '',
        email: '',
        password: ''
      },
      country: {
        code: 'FR',
        name: 'France',
        flag: '🇫🇷'
      },
      company: null,
      collected_data: null,
      branding: null
    },
    started_at: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    completed: false
  };
  
  saveOnboardingSession(session);
  return session;
}

/**
 * Récupère la session d'onboarding actuelle
 */
export function getOnboardingSession(): OnboardingSession | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const session: OnboardingSession = JSON.parse(stored);
    
    // Vérifie si la session n'a pas expiré
    const lastUpdated = new Date(session.last_updated);
    const now = new Date();
    
    if (now.getTime() - lastUpdated.getTime() > SESSION_DURATION) {
      clearOnboardingSession();
      return null;
    }
    
    return session;
    
  } catch (error) {
    console.error('Erreur lors de la récupération de la session:', error);
    clearOnboardingSession();
    return null;
  }
}

/**
 * Sauvegarde la session d'onboarding
 */
export function saveOnboardingSession(session: OnboardingSession): void {
  try {
    session.last_updated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la session:', error);
  }
}

/**
 * Met à jour l'étape courante
 */
export function updateCurrentStep(step: number): void {
  const session = getOnboardingSession();
  if (session) {
    session.current_step = step;
    saveOnboardingSession(session);
  }
}

/**
 * Met à jour les informations personnelles
 */
export function updatePersonalInfo(personalInfo: Partial<OnboardingFormData['personal_info']>): void {
  const session = getOnboardingSession();
  if (session) {
    session.form_data.personal_info = {
      ...session.form_data.personal_info,
      ...personalInfo
    };
    saveOnboardingSession(session);
  }
}

/**
 * Met à jour le pays sélectionné
 */
export function updateCountry(country: OnboardingFormData['country']): void {
  const session = getOnboardingSession();
  if (session) {
    session.form_data.country = country;
    saveOnboardingSession(session);
  }
}

/**
 * Met à jour l'entreprise sélectionnée
 */
export function updateSelectedCompany(company: OnboardingFormData['company']): void {
  const session = getOnboardingSession();
  if (session) {
    session.form_data.company = company;
    saveOnboardingSession(session);
  }
}

/**
 * Met à jour les données collectées
 */
export function updateCollectedData(collectedData: OnboardingFormData['collected_data']): void {
  const session = getOnboardingSession();
  if (session) {
    session.form_data.collected_data = collectedData;
    saveOnboardingSession(session);
  }
}

/**
 * Met à jour les informations de branding
 */
export function updateBranding(branding: OnboardingFormData['branding']): void {
  const session = getOnboardingSession();
  if (session) {
    session.form_data.branding = branding;
    saveOnboardingSession(session);
  }
}

/**
 * Marque la session comme terminée
 */
export function completeOnboardingSession(): void {
  const session = getOnboardingSession();
  if (session) {
    session.completed = true;
    session.current_step = 5; // Dernière étape
    saveOnboardingSession(session);
  }
}

/**
 * Supprime la session d'onboarding
 */
export function clearOnboardingSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erreur lors de la suppression de la session:', error);
  }
}

/**
 * Vérifie si une session est en cours
 */
export function hasActiveOnboardingSession(): boolean {
  const session = getOnboardingSession();
  return session !== null && !session.completed;
}

/**
 * Récupère les données de formulaire partielles pour une reprise
 */
export function getPartialFormData(): Partial<OnboardingFormData> | null {
  const session = getOnboardingSession();
  return session ? session.form_data : null;
}

/**
 * Exporte les données finales pour création du compte
 */
export function exportFinalData(): {
  user_data: {
    prenom: string;
    nom: string;
    email: string;
    telephone?: string;
  };
  company_data: {
    siren: string;
    nom_entreprise: string;
    adresse_complete: string;
  } | null;
  branding_data: {
    website_url?: string;
    logo_url?: string;
    social_media?: Record<string, string>;
  } | null;
} | null {
  const session = getOnboardingSession();
  
  if (!session || !session.completed) {
    return null;
  }
  
  return {
    user_data: {
      prenom: session.form_data.personal_info.prenom,
      nom: session.form_data.personal_info.nom,
      email: session.form_data.personal_info.email,
      telephone: session.form_data.personal_info.telephone
    },
    company_data: session.form_data.company ? {
      siren: session.form_data.company.siren,
      nom_entreprise: session.form_data.company.nom_entreprise,
      adresse_complete: session.form_data.company.adresse_complete
    } : null,
    branding_data: session.form_data.branding ? {
      website_url: session.form_data.branding.website_url,
      logo_url: session.form_data.branding.logo_url,
      social_media: session.form_data.branding.social_media
    } : null
  };
}

/**
 * Statistiques de la session
 */
export function getSessionStats(): {
  progress: number;
  time_elapsed: number;
  steps_completed: number;
  total_steps: number;
} | null {
  const session = getOnboardingSession();
  
  if (!session) return null;
  
  const startTime = new Date(session.started_at);
  const now = new Date();
  const timeElapsed = now.getTime() - startTime.getTime();
  
  return {
    progress: (session.current_step / 4) * 100, // 5 étapes (0-4)
    time_elapsed: timeElapsed,
    steps_completed: session.current_step,
    total_steps: 5
  };
}

// Fonction utilitaire privée
function generateSessionId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

/**
 * Types d'export
 */
export type { OnboardingFormData, OnboardingSession };