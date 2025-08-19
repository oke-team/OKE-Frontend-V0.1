'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Upload, Image, ExternalLink, CheckCircle2, 
  AlertCircle, Loader2, Sparkles, ArrowRight, SkipForward
} from 'lucide-react';
import { contentFadeVariants } from '../animations/stepTransitions';
import LogoUploader from '../ui/LogoUploader';
import { 
  searchCompanyLogo, 
  uploadCustomLogo, 
  validateWebsiteUrl,
  type LogoSearchResult,
  type LogoUploadResult 
} from '@/lib/services/onboarding/logoService';

interface BrandingData {
  website_url?: string;
  logo_url?: string | null;
  logo_source: 'found' | 'uploaded' | 'none';
  social_media?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

interface LogoFinalizationStepProps {
  selectedCompany: {
    siren: string;
    nom_entreprise: string;
  } | null;
  brandingData: BrandingData | null;
  onBrandingUpdate: (data: BrandingData) => void;
  onComplete: () => void;
  canProceed: boolean;
}

export default function LogoFinalizationStep({
  selectedCompany,
  brandingData,
  onBrandingUpdate,
  onComplete,
  canProceed
}: LogoFinalizationStepProps) {
  const [currentStep, setCurrentStep] = useState<'website' | 'logo-search' | 'logo-upload' | 'final'>('website');
  const [websiteUrl, setWebsiteUrl] = useState(brandingData?.website_url || '');
  const [websiteError, setWebsiteError] = useState<string | null>(null);
  const [isValidatingWebsite, setIsValidatingWebsite] = useState(false);
  const [logoSearchResult, setLogoSearchResult] = useState<LogoSearchResult | null>(null);
  const [isSearchingLogo, setIsSearchingLogo] = useState(false);
  const [selectedLogoIndex, setSelectedLogoIndex] = useState(0);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [localBrandingData, setLocalBrandingData] = useState<BrandingData>(
    brandingData ? { ...brandingData, logo_url: brandingData.logo_url ? brandingData.logo_url : undefined } : { logo_source: 'none' }
  );

  // Met à jour les données parent à chaque changement
  useEffect(() => {
    onBrandingUpdate(localBrandingData);
  }, [localBrandingData, onBrandingUpdate]);

  // Validation de l'URL et recherche de logo
  const handleWebsiteSubmit = async (url: string) => {
    if (!url.trim()) {
      setCurrentStep('logo-upload');
      return;
    }

    setIsValidatingWebsite(true);
    setWebsiteError(null);

    try {
      // Valide l'URL
      const validation = await validateWebsiteUrl(url);
      
      if (!validation.valid) {
        setWebsiteError(validation.error || 'URL invalide');
        setIsValidatingWebsite(false);
        return;
      }

      // Met à jour l'URL formatée
      const formattedUrl = validation.formatted_url || url;
      setWebsiteUrl(formattedUrl);
      setLocalBrandingData(prev => ({ ...prev, website_url: formattedUrl }));

      // Lance la recherche de logo
      setIsSearchingLogo(true);
      const logoResult = await searchCompanyLogo(formattedUrl);
      
      setLogoSearchResult(logoResult);
      
      if (logoResult.success && logoResult.logo_found) {
        // Logo trouvé, mise à jour des données
        setLocalBrandingData(prev => ({
          ...prev,
          logo_url: logoResult.primary_logo?.url,
          logo_source: 'found',
          social_media: logoResult.social_media
        }));
        setCurrentStep('logo-search');
      } else {
        // Pas de logo trouvé, passer à l'upload
        setCurrentStep('logo-upload');
      }

    } catch (error) {
      setWebsiteError('Erreur lors de la vérification de l\'URL');
    } finally {
      setIsValidatingWebsite(false);
      setIsSearchingLogo(false);
    }
  };

  // Sélection d'un logo alternatif
  const handleLogoSelect = (logoUrl: string, index: number) => {
    setSelectedLogoIndex(index);
    setLocalBrandingData(prev => ({
      ...prev,
      logo_url: logoUrl,
      logo_source: 'found'
    }));
  };

  // Upload d'un logo personnalisé
  const handleLogoUpload = async (file: File) => {
    setIsUploadingLogo(true);
    setUploadError(null);

    try {
      const uploadResult = await uploadCustomLogo(file);
      
      if (uploadResult.success) {
        setLocalBrandingData(prev => ({
          ...prev,
          logo_url: uploadResult.logo_url,
          logo_source: 'uploaded'
        }));
        setCurrentStep('final');
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Erreur lors de l\'upload');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  // Passer sans logo
  const handleSkipLogo = () => {
    setLocalBrandingData(prev => ({
      ...prev,
      logo_url: undefined,
      logo_source: 'none'
    }));
    setCurrentStep('final');
  };

  // Finaliser et continuer
  const handleFinalize = () => {
    onComplete();
  };

  // Retour à l'étape précédente
  const handleGoBack = () => {
    switch (currentStep) {
      case 'logo-search':
        setCurrentStep('website');
        break;
      case 'logo-upload':
        setCurrentStep('website');
        break;
      case 'final':
        setCurrentStep(localBrandingData.logo_source === 'found' ? 'logo-search' : 'logo-upload');
        break;
    }
  };

  return (
    <motion.div
      variants={contentFadeVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto space-y-8"
    >
      {/* Progress indicator pour les étapes internes */}
      <motion.div
        variants={contentFadeVariants}
        className="flex items-center justify-center space-x-4 mb-8"
      >
        {[
          { id: 'website', label: 'Site web', icon: Globe },
          { id: 'logo', label: 'Logo', icon: Image },
          { id: 'final', label: 'Finalisation', icon: Sparkles }
        ].map((step, index) => {
          const isActive = (
            (currentStep === 'website' && step.id === 'website') ||
            ((currentStep === 'logo-search' || currentStep === 'logo-upload') && step.id === 'logo') ||
            (currentStep === 'final' && step.id === 'final')
          );
          const isCompleted = (
            (step.id === 'website' && currentStep !== 'website') ||
            (step.id === 'logo' && currentStep === 'final')
          );

          return (
            <div key={step.id} className="flex items-center space-x-2">
              <div className={`
                w-8 h-8 rounded-full border-2 flex items-center justify-center
                ${isCompleted 
                  ? 'bg-green-500 border-green-500' 
                  : isActive 
                    ? 'border-primary-400 bg-primary-400/10' 
                    : 'border-neutral-600 bg-neutral-800'
                }
              `}>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : (
                  <step.icon className={`w-4 h-4 ${isActive ? 'text-primary-400' : 'text-neutral-400'}`} />
                )}
              </div>
              <span className={`text-sm ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                {step.label}
              </span>
              {index < 2 && (
                <div className={`w-8 h-0.5 ${isCompleted ? 'bg-green-500' : 'bg-neutral-600'}`} />
              )}
            </div>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Étape 1: URL du site web */}
        {currentStep === 'website' && (
          <motion.div
            key="website"
            variants={contentFadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Site web de votre entreprise</h2>
              <p className="text-neutral-300 max-w-2xl mx-auto">
                Indiquez l'URL de votre site web pour que nous puissions automatiquement 
                récupérer votre logo et vos réseaux sociaux.
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-300">
                  URL du site web (optionnel)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="w-5 h-5 text-neutral-400" />
                  </div>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => {
                      setWebsiteUrl(e.target.value);
                      setWebsiteError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleWebsiteSubmit(websiteUrl);
                      }
                    }}
                    placeholder="https://www.exemple.com"
                    className={`
                      w-full h-12 pl-10 pr-4 rounded-xl border backdrop-blur-sm
                      bg-white/5 text-white placeholder-neutral-500
                      focus:outline-none focus:ring-2 transition-all duration-200
                      ${websiteError 
                        ? 'border-red-500/50 focus:ring-red-400/50' 
                        : 'border-white/10 focus:ring-primary-400/50'
                      }
                    `}
                    disabled={isValidatingWebsite}
                  />
                  {isValidatingWebsite && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                    </div>
                  )}
                </div>
                
                {websiteError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-sm text-red-400"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{websiteError}</span>
                  </motion.div>
                )}
              </div>

              <div className="flex space-x-3">
                <motion.button
                  onClick={() => handleWebsiteSubmit(websiteUrl)}
                  disabled={isValidatingWebsite}
                  className="flex-1 h-12 rounded-xl font-medium bg-primary hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all duration-200 flex items-center justify-center space-x-2"
                  whileHover={!isValidatingWebsite ? { scale: 1.02 } : {}}
                  whileTap={!isValidatingWebsite ? { scale: 0.98 } : {}}
                >
                  {isValidatingWebsite ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Vérification...</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4" />
                      <span>Rechercher le logo</span>
                    </>
                  )}
                </motion.button>
                
                <motion.button
                  onClick={handleSkipLogo}
                  className="px-6 h-12 rounded-xl font-medium bg-neutral-700 hover:bg-neutral-600 text-white transition-all duration-200 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <SkipForward className="w-4 h-4" />
                  <span>Passer</span>
                </motion.button>
              </div>
            </div>

            {isSearchingLogo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-12 h-12 border-2 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-neutral-300 font-medium">Recherche du logo en cours...</p>
                <p className="text-sm text-neutral-500 mt-1">Analyse du site web et des réseaux sociaux</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Étape 2a: Logo trouvé - Sélection */}
        {currentStep === 'logo-search' && logoSearchResult?.logo_found && (
          <motion.div
            key="logo-search"
            variants={contentFadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Logo trouvé ! ✨</h2>
              <p className="text-neutral-300">
                Nous avons trouvé le logo de <strong>{selectedCompany?.nom_entreprise}</strong>. 
                Sélectionnez celui qui vous convient le mieux.
              </p>
            </div>

            {/* Logo principal */}
            <div className="max-w-2xl mx-auto">
              {logoSearchResult.primary_logo && (
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onClick={() => handleLogoSelect(logoSearchResult.primary_logo!.url, 0)}
                    className={`
                      inline-block p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200
                      ${selectedLogoIndex === 0 
                        ? 'border-primary-400 bg-primary/10 shadow-lg shadow-primary/20' 
                        : 'border-neutral-600 bg-white/5 hover:border-neutral-500'
                      }
                    `}
                  >
                    <img
                      src={logoSearchResult.primary_logo.url}
                      alt="Logo principal"
                      className="w-24 h-24 object-contain mx-auto"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-logo.png';
                      }}
                    />
                    {selectedLogoIndex === 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-3 flex items-center justify-center text-primary-400"
                      >
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Sélectionné</span>
                      </motion.div>
                    )}
                  </motion.div>
                  <p className="text-sm text-neutral-400 mt-3">Logo principal</p>
                </div>
              )}

              {/* Logos alternatifs */}
              {logoSearchResult.alternative_logos.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-center font-medium text-white">Autres options disponibles</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {logoSearchResult.alternative_logos.map((alt, index) => (
                      <motion.div
                        key={`alt-logo-${index}-${alt.url.substring(0,8)}` }
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleLogoSelect(alt.url, index + 1)}
                        className={`
                          p-4 rounded-xl border cursor-pointer transition-all duration-200
                          ${selectedLogoIndex === index + 1
                            ? 'border-primary-400 bg-primary/10' 
                            : 'border-neutral-600 bg-white/5 hover:border-neutral-500'
                          }
                        `}
                      >
                        <img
                          src={alt.url}
                          alt={`Logo alternatif ${index + 1}`}
                          className="w-16 h-16 object-contain mx-auto"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-logo.png';
                          }}
                        />
                        {selectedLogoIndex === index + 1 && (
                          <div className="mt-2 text-center">
                            <CheckCircle2 className="w-4 h-4 text-primary-400 mx-auto" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Réseaux sociaux trouvés */}
              {logoSearchResult.social_media && Object.keys(logoSearchResult.social_media).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 bg-green-500/10 border border-green-500/20 rounded-xl p-4"
                >
                  <h4 className="font-medium text-green-400 mb-3 text-center">
                    🎉 Réseaux sociaux détectés automatiquement
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(logoSearchResult.social_media).map(([platform, url]) => (
                      url && (
                        <div key={platform} className="flex items-center space-x-2 text-neutral-300">
                          <span className="capitalize">{platform}:</span>
                          <a 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-400 hover:text-green-300 truncate"
                          >
                            {url}
                          </a>
                        </div>
                      )
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex justify-between max-w-md mx-auto">
              <motion.button
                onClick={handleGoBack}
                className="px-6 h-12 rounded-xl font-medium bg-neutral-700 hover:bg-neutral-600 text-white transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Modifier l'URL
              </motion.button>
              
              <motion.button
                onClick={() => setCurrentStep('final')}
                className="px-8 h-12 rounded-xl font-medium bg-primary hover:bg-primary-400 text-white transition-all duration-200 flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Valider ce logo</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Étape 2b: Upload de logo */}
        {currentStep === 'logo-upload' && (
          <motion.div
            key="logo-upload"
            variants={contentFadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Ajoutez votre logo</h2>
              <p className="text-neutral-300">
                {websiteUrl 
                  ? "Nous n'avons pas pu trouver automatiquement votre logo. Vous pouvez l'uploader manuellement."
                  : "Uploadez le logo de votre entreprise pour personnaliser votre profil."
                }
              </p>
            </div>

            <div className="max-w-lg mx-auto">
              <LogoUploader
                onLogoUpload={handleLogoUpload}
                onLogoRemove={() => {
                  setLocalBrandingData(prev => ({
                    ...prev,
                    logo_url: undefined,
                    logo_source: 'none'
                  }));
                }}
                currentLogoUrl={localBrandingData.logo_url === null ? undefined : localBrandingData.logo_url}
                isUploading={isUploadingLogo}
                error={uploadError}
                maxSize={10 * 1024 * 1024} // 10MB
              />
            </div>

            <div className="flex justify-between max-w-md mx-auto">
              <motion.button
                onClick={handleGoBack}
                className="px-6 h-12 rounded-xl font-medium bg-neutral-700 hover:bg-neutral-600 text-white transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Retour
              </motion.button>
              
              <motion.button
                onClick={handleSkipLogo}
                className="px-6 h-12 rounded-xl font-medium bg-neutral-600 hover:bg-neutral-500 text-white transition-all duration-200 flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SkipForward className="w-4 h-4" />
                <span>Passer sans logo</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Étape 3: Finalisation */}
        {currentStep === 'final' && (
          <motion.div
            key="final"
            variants={contentFadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-20 h-20 bg-gradient-to-r from-primary to-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white">Profil terminé ! 🎉</h2>
              <p className="text-neutral-300 text-lg">
                Votre entreprise est maintenant prête à utiliser OKÉ.
              </p>
            </div>

            {/* Résumé du profil */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-green-500/10 border border-primary-400/30 rounded-2xl p-8"
            >
              <div className="text-center space-y-6">
                {/* Logo si disponible */}
                {localBrandingData.logo_url && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                    className="flex justify-center"
                  >
                    <img
                      src={localBrandingData.logo_url}
                      alt="Logo de l'entreprise"
                      className="w-20 h-20 object-contain rounded-lg shadow-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </motion.div>
                )}

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedCompany?.nom_entreprise}
                  </h3>
                  {localBrandingData.website_url && (
                    <a
                      href={localBrandingData.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      <span>{localBrandingData.website_url}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Réseaux sociaux */}
                {localBrandingData.social_media && Object.keys(localBrandingData.social_media).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-2"
                  >
                    <h4 className="font-medium text-neutral-300">Réseaux sociaux connectés</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {Object.entries(localBrandingData.social_media).map(([platform, url]) => (
                        url && (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-xs bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded-full transition-colors"
                          >
                            <span className="capitalize">{platform}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Statut du logo */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-center justify-center space-x-2 text-sm text-neutral-400"
                >
                  {localBrandingData.logo_source === 'found' && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Logo trouvé automatiquement</span>
                    </>
                  )}
                  {localBrandingData.logo_source === 'uploaded' && (
                    <>
                      <Upload className="w-4 h-4 text-primary-400" />
                      <span>Logo personnalisé uploadé</span>
                    </>
                  )}
                  {localBrandingData.logo_source === 'none' && (
                    <>
                      <Image className="w-4 h-4 text-neutral-500" />
                      <span>Pas de logo défini</span>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>

            <div className="flex justify-between max-w-md mx-auto">
              <motion.button
                onClick={handleGoBack}
                className="px-6 h-12 rounded-xl font-medium bg-neutral-700 hover:bg-neutral-600 text-white transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Modifier
              </motion.button>
              
              <motion.button
                onClick={handleFinalize}
                className="px-8 h-12 rounded-xl font-medium bg-gradient-to-r from-primary to-green-500 hover:from-primary-400 hover:to-green-400 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Lancer OKÉ !</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Note d'information */}
      <motion.div
        variants={contentFadeVariants}
        className="text-center text-sm text-neutral-500 bg-neutral-900/30 rounded-lg p-4 border border-neutral-800/50"
      >
        <p>
          💡 Vous pourrez toujours modifier ces informations plus tard 
          depuis les paramètres de votre profil d'entreprise.
        </p>
      </motion.div>
    </motion.div>
  );
}