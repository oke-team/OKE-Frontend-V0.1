'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft,
  Building,
  Globe,
  Palette,
  Check,
  Download,
  RefreshCw,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  ExternalLink,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Search,
  Link,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import {
  PremiumCard,
  LiquidButton,
  StepContainer,
  InfoCard,
  PremiumInput
} from '../ui/PremiumComponents';

interface LogoFinalizationStepProps {
  selectedCompany: any;
  brandingData: any;
  onBrandingUpdate: (data: any) => void;
  onComplete: () => void;
  onPrevious?: () => void;
  canProceed: boolean;
  canGoBack?: boolean;
}

// Simuler plusieurs propositions de logos
const mockLogoSuggestions = [
  {
    id: 1,
    name: 'OKÉ Solutions',
    domain: 'oke-solutions.fr',
    logo: 'https://logo.clearbit.com/stripe.com',
    confidence: 0.95
  },
  {
    id: 2,
    name: 'OKÉ Digital',
    domain: 'oke-digital.com',
    logo: 'https://logo.clearbit.com/notion.so',
    confidence: 0.78
  },
  {
    id: 3,
    name: 'OKÉ Tech',
    domain: 'oketech.io',
    logo: 'https://logo.clearbit.com/linear.app',
    confidence: 0.65
  },
  {
    id: 4,
    name: 'OKÉ Services',
    domain: 'oke-services.fr',
    logo: 'https://logo.clearbit.com/vercel.com',
    confidence: 0.52
  }
];

// Simuler la réponse complète de l'API Logo.dev
const mockLogoDevResponse = {
  status: 'success',
  data: {
    name: 'OKÉ Solutions',
    domain: 'oke-solutions.fr',
    description: 'Solution de gestion d\'entreprise tout-en-un pour les entrepreneurs modernes',
    logo: {
      url: 'https://logo.clearbit.com/example.com',
      blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.',
      formats: {
        png: 'https://logo.clearbit.com/example.com?format=png&size=512',
        svg: 'https://logo.clearbit.com/example.com?format=svg'
      }
    },
    colors: [
      { hex: '#4C34CE', name: 'Violet Principal', usage: 'primary' },
      { hex: '#FAA016', name: 'Orange Accent', usage: 'accent' },
      { hex: '#1A1A2E', name: 'Noir Profond', usage: 'text' },
      { hex: '#F5F5F7', name: 'Gris Clair', usage: 'background' }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/okesolutions',
      instagram: 'https://instagram.com/okesolutions',
      twitter: 'https://twitter.com/okesolutions',
      linkedin: 'https://linkedin.com/company/oke-solutions',
      youtube: null
    },
    industry: 'Technology',
    tags: ['SaaS', 'B2B', 'FinTech', 'Enterprise Software']
  }
};

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube
};

export default function LogoFinalizationStepV2({
  selectedCompany,
  brandingData,
  onBrandingUpdate,
  onComplete,
  onPrevious,
  canProceed,
  canGoBack = false
}: LogoFinalizationStepProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [logoData, setLogoData] = useState<typeof mockLogoDevResponse.data | null>(null);
  const [logoSuggestions, setLogoSuggestions] = useState<typeof mockLogoSuggestions | null>(null);
  const [selectedLogoId, setSelectedLogoId] = useState<number | null>(null);
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchMode, setSearchMode] = useState<'suggestions' | 'url' | 'upload' | 'skip'>('suggestions');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [urlSearching, setUrlSearching] = useState(false);
  const [showSkipOption, setShowSkipOption] = useState(false);
  const [socialMediaLoading, setSocialMediaLoading] = useState(false);
  const [detectedSocialMedia, setDetectedSocialMedia] = useState<Record<string, string | null>>({});

  // Simuler l'appel API Logo.dev au chargement - recherche par nom
  useEffect(() => {
    searchLogoByName();
  }, []);

  const searchLogoByName = async () => {
    setIsLoading(true);
    setSearchMode('suggestions');
    
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Simuler une recherche qui retourne plusieurs suggestions
    if (Math.random() > 0.2) {
      setLogoSuggestions(mockLogoSuggestions);
    } else {
      // Aucun logo trouvé
      setLogoSuggestions([]);
      setSearchMode('url');
    }
    
    setIsLoading(false);
  };

  const handleLogoSelection = async (suggestionId: number) => {
    setSelectedLogoId(suggestionId);
    setIsLoading(true);
    
    // Simuler la récupération des données complètes pour le logo sélectionné
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const selectedSuggestion = mockLogoSuggestions.find(s => s.id === suggestionId);
    if (selectedSuggestion) {
      setLogoData({
        ...mockLogoDevResponse.data,
        name: selectedSuggestion.name,
        domain: selectedSuggestion.domain,
        logo: {
          ...mockLogoDevResponse.data.logo,
          url: selectedSuggestion.logo
        }
      });
      
      // Déclencher la recherche des réseaux sociaux
      searchSocialMedia(selectedSuggestion.domain);
      
      onBrandingUpdate({
        logo: mockLogoDevResponse.data.logo,
        colors: mockLogoDevResponse.data.colors,
        socialMedia: mockLogoDevResponse.data.socialMedia
      });
      setSearchMode('suggestions');
    }
    
    setIsLoading(false);
  };

  // Recherche progressive des réseaux sociaux
  const searchSocialMedia = async (domain: string) => {
    setSocialMediaLoading(true);
    setDetectedSocialMedia({});
    
    const socialPlatforms = [
      { platform: 'linkedin', url: `https://linkedin.com/company/${domain.replace('.fr', '').replace('.com', '')}`, delay: 500 },
      { platform: 'facebook', url: `https://facebook.com/${domain.replace('.fr', '').replace('.com', '')}`, delay: 800 },
      { platform: 'twitter', url: `https://twitter.com/${domain.replace('.fr', '').replace('.com', '')}`, delay: 1200 },
      { platform: 'instagram', url: `https://instagram.com/${domain.replace('.fr', '').replace('.com', '')}`, delay: 1500 },
    ];

    for (const social of socialPlatforms) {
      await new Promise(resolve => setTimeout(resolve, social.delay));
      
      // Simuler une détection aléatoire (70% de chance de trouver)
      if (Math.random() > 0.3) {
        setDetectedSocialMedia(prev => ({
          ...prev,
          [social.platform]: social.url
        }));
      }
    }
    
    setSocialMediaLoading(false);
  };

  const searchLogoByUrl = async () => {
    if (!websiteUrl.trim()) return;
    
    setUrlSearching(true);
    
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Simuler une recherche par URL
    if (websiteUrl.includes('.') && Math.random() > 0.3) {
      // Logo trouvé
      setLogoData({
        ...mockLogoDevResponse.data,
        domain: websiteUrl,
        logo: {
          ...mockLogoDevResponse.data.logo,
          url: `https://logo.clearbit.com/${websiteUrl}`
        }
      });
      
      // Déclencher la recherche des réseaux sociaux
      searchSocialMedia(websiteUrl);
      
      onBrandingUpdate({
        logo: mockLogoDevResponse.data.logo,
        colors: mockLogoDevResponse.data.colors,
        socialMedia: mockLogoDevResponse.data.socialMedia
      });
      setSearchMode('suggestions');
    } else {
      // Aucun logo trouvé avec l'URL
      setSearchMode('upload');
      setShowSkipOption(true);
    }
    
    setUrlSearching(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await searchLogoByName();
    setIsRefreshing(false);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedLogo(reader.result as string);
        onBrandingUpdate({
          ...brandingData,
          logo: { url: reader.result as string, uploaded: true }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (logoData || uploadedLogo || searchMode === 'skip') {
      onComplete();
    }
  };

  const handleSkip = () => {
    setSearchMode('skip');
    onBrandingUpdate({ skipped: true });
    onComplete();
  };

  return (
    <StepContainer
      title="Logo et identité visuelle"
      subtitle="Détection automatique de votre identité de marque"
      icon={<Sparkles className="w-7 h-7" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
        {/* Entreprise sélectionnée */}
        <PremiumCard variant="elevated" padding="md" className="bg-gradient-to-r from-blue-50 to-purple-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium mb-1">Entreprise en cours de configuration</p>
              <p className="text-lg font-semibold text-gray-900">{selectedCompany?.name || 'Mon Entreprise'}</p>
              <p className="text-sm text-gray-600">SIREN : {selectedCompany?.siren || '123456789'}</p>
            </div>
            <Building className="w-8 h-8 text-purple-600" />
          </div>
        </PremiumCard>

        {/* État de chargement initial */}
        {isLoading && !logoSuggestions ? (
          <div className="space-y-6">
            {/* Animation de recherche */}
            <div className="flex flex-col items-center justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-4 border-[#4C34CE] border-t-transparent rounded-full mb-4"
              />
              <p className="text-gray-600 text-center">
                Recherche du logo via Logo.dev...<br />
                <span className="text-sm text-gray-500">Analyse de "{selectedCompany?.name || 'Mon Entreprise'}"</span>
              </p>
            </div>

            {/* Skeleton loaders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />
            </div>
          </div>
        ) : logoSuggestions && logoSuggestions.length > 0 && !logoData ? (
          // Affichage des suggestions de logos
          <div className="space-y-6">
            <InfoCard type="info" icon={<Search className="w-5 h-5" />}>
              <p className="font-medium text-gray-900 mb-1">Logos trouvés</p>
              <p className="text-gray-600 text-xs">
                Nous avons trouvé {logoSuggestions.length} logo{logoSuggestions.length > 1 ? 's' : ''} correspondant à votre recherche.
                Cliquez sur votre logo ou saisissez l'URL de votre site web.
              </p>
            </InfoCard>

            {/* Grille de suggestions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {logoSuggestions.map((suggestion) => (
                <motion.button
                  key={suggestion.id}
                  type="button"
                  onClick={() => handleLogoSelection(suggestion.id)}
                  className={`p-4 bg-white border-2 rounded-xl hover:border-[#4C34CE] hover:shadow-md transition-all ${
                    selectedLogoId === suggestion.id ? 'border-[#4C34CE] shadow-md' : 'border-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-full h-20 bg-gray-50 rounded-lg mb-2 flex items-center justify-center">
                    <img 
                      src={suggestion.logo} 
                      alt={suggestion.name}
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiM0QzM0Q0UiLz4KPHRleHQgeD0iMzIiIHk9IjQwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk9LPC90ZXh0Pgo8L3N2Zz4=';
                      }}
                    />
                  </div>
                  <p className="text-xs font-medium text-gray-900 truncate">{suggestion.name}</p>
                  <p className="text-xs text-gray-500 truncate">{suggestion.domain}</p>
                  {suggestion.confidence > 0.8 && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                      {Math.round(suggestion.confidence * 100)}% match
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Option de recherche par URL */}
            <PremiumCard variant="default" padding="md">
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-700">
                  Vous ne voyez pas votre logo ? Saisissez l'URL de votre site web :
                </p>
                <div className="flex gap-2">
                  <PremiumInput
                    type="url"
                    placeholder="ex: www.monentreprise.fr"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    icon={<Link className="w-4 h-4" />}
                    className="flex-1"
                  />
                  <LiquidButton
                    type="button"
                    variant="secondary"
                    onClick={searchLogoByUrl}
                    loading={urlSearching}
                    disabled={!websiteUrl.trim() || urlSearching}
                  >
                    <Search className="w-4 h-4" />
                  </LiquidButton>
                </div>
              </div>
            </PremiumCard>
          </div>
        ) : searchMode === 'url' && !logoData ? (
          // Mode recherche par URL
          <div className="space-y-6">
            <InfoCard type="warning" icon={<AlertCircle className="w-5 h-5" />}>
              <p className="font-medium text-gray-900 mb-1">Aucun logo trouvé</p>
              <p className="text-gray-600 text-xs">
                Nous n'avons pas trouvé de logo pour "{selectedCompany?.name || 'Mon Entreprise'}". 
                Essayez avec l'URL de votre site web.
              </p>
            </InfoCard>

            {/* Recherche par URL */}
            <PremiumCard variant="default" padding="md">
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-700">
                  Saisissez l'URL de votre site web pour trouver votre logo :
                </p>
                <div className="flex gap-2">
                  <PremiumInput
                    type="url"
                    placeholder="ex: www.monentreprise.fr"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    icon={<Link className="w-4 h-4" />}
                    className="flex-1"
                  />
                  <LiquidButton
                    type="button"
                    variant="primary"
                    onClick={searchLogoByUrl}
                    loading={urlSearching}
                    disabled={!websiteUrl.trim() || urlSearching}
                  >
                    Rechercher
                  </LiquidButton>
                </div>
              </div>
            </PremiumCard>
          </div>
        ) : searchMode === 'upload' ? (
          // Mode upload manuel
          <div className="space-y-6">
            <InfoCard type="warning" icon={<AlertCircle className="w-5 h-5" />}>
              <p className="font-medium text-gray-900 mb-1">Logo non trouvé</p>
              <p className="text-gray-600 text-xs">
                Nous n'avons pas pu détecter votre logo automatiquement. 
                Vous pouvez l'ajouter manuellement ou passer cette étape.
              </p>
            </InfoCard>

            {/* Zone d'upload */}
            <PremiumCard variant="default" padding="lg">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-32 h-32 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-gray-200">
                    {uploadedLogo ? (
                      <img src={uploadedLogo} alt="Logo" className="w-full h-full object-contain rounded-2xl" />
                    ) : (
                      <ImageIcon className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                </div>

                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-dashed border-gray-300 rounded-xl hover:border-[#4C34CE] hover:bg-purple-50 transition-all">
                    <Upload className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700 font-medium">
                      {uploadedLogo ? 'Changer le logo' : 'Télécharger votre logo'}
                    </span>
                  </div>
                </label>

                <p className="text-xs text-gray-500 mt-3">
                  PNG, JPG ou SVG • Max 5MB • Fond transparent recommandé
                </p>

                {/* Options alternatives */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setSearchMode('url')}
                    className="text-sm text-[#4C34CE] hover:text-[#3A28B8] font-medium flex items-center gap-1"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Réessayer avec une URL
                  </button>
                  
                  {showSkipOption && (
                    <button
                      type="button"
                      onClick={handleSkip}
                      className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                    >
                      Passer cette étape
                    </button>
                  )}
                </div>
              </div>
            </PremiumCard>
          </div>
        ) : logoData ? (
          // Affichage des données récupérées - VERSION SIMPLIFIÉE
          <div className="space-y-6">
            {/* Logo centré */}
            <PremiumCard variant="elevated" padding="lg">
              <div className="flex flex-col items-center">
                <h3 className="font-semibold text-gray-900 mb-6">Logo de votre entreprise</h3>
                
                <div className="w-40 h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  {uploadedLogo ? (
                    <img src={uploadedLogo} alt="Logo" className="w-32 h-32 object-contain" />
                  ) : (
                    <div className="w-32 h-32 bg-[#4C34CE] rounded-xl flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">OKÉ</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {logoData.domain}
                </p>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Télécharger PNG
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Télécharger SVG
                  </button>
                </div>

                {/* Option de changement */}
                <label className="mt-6 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <span className="text-sm text-[#4C34CE] hover:text-[#3A28B8] font-medium flex items-center gap-1">
                    <RefreshCw className="w-4 h-4" />
                    Utiliser un autre logo
                  </span>
                </label>
              </div>
            </PremiumCard>

            {/* Réseaux sociaux détectés - Avec animation de recherche */}
            <PremiumCard variant="default" padding="md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900 text-sm">Réseaux sociaux</h3>
                {socialMediaLoading && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-[#4C34CE] border-t-transparent rounded-full"
                  />
                )}
              </div>
              
              {socialMediaLoading && Object.keys(detectedSocialMedia).length === 0 ? (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Search className="w-4 h-4 animate-pulse" />
                  <span>Recherche des réseaux sociaux en cours...</span>
                </div>
              ) : Object.keys(detectedSocialMedia).length > 0 ? (
                <>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(detectedSocialMedia).map(([platform, url], index) => {
                      if (!url) return null;
                      const Icon = socialIcons[platform as keyof typeof socialIcons];
                      if (!Icon) return null;
                      
                      // Alterner entre violet et orange
                      const isOrange = index % 2 === 0;
                      const bgColor = isOrange ? 'bg-orange-50' : 'bg-purple-50';
                      const hoverBgColor = isOrange ? 'hover:bg-orange-100' : 'hover:bg-purple-100';
                      const iconColor = isOrange ? 'text-[#FAA016]' : 'text-[#4C34CE]';
                      const textColor = isOrange ? 'text-orange-700' : 'text-purple-700';
                      
                      return (
                        <motion.a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-3 py-1.5 ${bgColor} ${hoverBgColor} rounded-lg transition-colors text-xs group`}
                          initial={{ opacity: 0, scale: 0, x: -20 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
                          <span className={`font-medium ${textColor} capitalize`}>{platform}</span>
                          <Check className="w-3 h-3 text-green-500" />
                        </motion.a>
                      );
                    })}
                  </div>
                  
                  {socialMediaLoading && (
                    <p className="text-xs text-gray-500 mt-3 animate-pulse">
                      Recherche en cours...
                    </p>
                  )}
                  
                  {!socialMediaLoading && (
                    <p className="text-xs text-gray-500 mt-3">
                      {Object.keys(detectedSocialMedia).length} réseau{Object.keys(detectedSocialMedia).length > 1 ? 'x' : ''} trouvé{Object.keys(detectedSocialMedia).length > 1 ? 's' : ''}
                    </p>
                  )}
                </>
              ) : !socialMediaLoading ? (
                <p className="text-sm text-gray-500">
                  Aucun réseau social détecté pour ce domaine
                </p>
              ) : null}
            </PremiumCard>
          </div>
        ) : null}

        {/* Message de confirmation */}
        {(logoData || uploadedLogo) && !isLoading && (
          <InfoCard type="success" icon={<Check className="w-5 h-5" />}>
            <p className="font-medium text-gray-900 mb-1">Configuration terminée !</p>
            <p className="text-gray-600 text-xs">
              Votre identité visuelle a été configurée avec succès. 
              Vous pourrez la modifier à tout moment dans les paramètres.
            </p>
          </InfoCard>
        )}

        {/* Boutons de navigation */}
        {!isLoading && !urlSearching && (
          <div className="flex gap-3">
            {canGoBack && onPrevious && (
              <LiquidButton
                type="button"
                variant="secondary"
                size="lg"
                onClick={onPrevious}
                className="flex-1"
              >
                <span className="flex items-center justify-center gap-2">
                  <ChevronLeft className="w-5 h-5" />
                  Retour
                </span>
              </LiquidButton>
            )}
            {(logoData || uploadedLogo) && (
              <LiquidButton
                type="submit"
                variant="primary"
                size="lg"
                className="flex-1"
              >
                <span className="flex items-center justify-center gap-2">
                  Terminer la configuration
                  <ChevronRight className="w-5 h-5" />
                </span>
              </LiquidButton>
            )}
            {searchMode === 'upload' && !uploadedLogo && showSkipOption && (
              <LiquidButton
                type="button"
                variant="outline"
                size="lg"
                onClick={handleSkip}
                className="flex-1"
              >
                <span className="flex items-center justify-center gap-2">
                  Passer cette étape
                  <ArrowRight className="w-5 h-5" />
                </span>
              </LiquidButton>
            )}
          </div>
        )}
      </form>
    </StepContainer>
  );
}