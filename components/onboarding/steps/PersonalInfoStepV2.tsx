'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff, Shield, ArrowRight } from 'lucide-react';
import {
  PremiumCard,
  LiquidButton,
  PremiumInput,
  StepContainer,
  InfoCard
} from '../ui/PremiumComponents';

interface PersonalInfoData {
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  password: string;
}

interface PersonalInfoStepProps {
  data: PersonalInfoData;
  onUpdate: (data: Partial<PersonalInfoData>) => void;
  onNext: () => void;
  canProceed: boolean;
}

export default function PersonalInfoStepV2({
  data,
  onUpdate,
  onNext,
  canProceed
}: PersonalInfoStepProps) {
  const [localData, setLocalData] = useState<PersonalInfoData>(data);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfoData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof PersonalInfoData, boolean>>>({});
  const [loading, setLoading] = useState(false);

  // Validation rules
  const validateField = (field: keyof PersonalInfoData, value: string): string | null => {
    switch (field) {
      case 'prenom':
        if (!value.trim()) return 'Le prénom est requis';
        if (value.trim().length < 2) return 'Minimum 2 caractères';
        return null;
      
      case 'nom':
        if (!value.trim()) return 'Le nom est requis';
        if (value.trim().length < 2) return 'Minimum 2 caractères';
        return null;
      
      case 'email':
        if (!value.trim()) return 'L\'email est requis';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Email invalide';
        return null;
      
      case 'telephone':
        if (value && value.length > 0) {
          const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
          if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Format invalide';
        }
        return null;
      
      case 'password':
        if (!value) return 'Le mot de passe est requis';
        if (value.length < 8) return 'Minimum 8 caractères';
        return null;
      
      default:
        return null;
    }
  };

  // Update field with validation
  const updateField = (field: keyof PersonalInfoData, value: string) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onUpdate({ [field]: value });

    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  // Handle field blur
  const handleBlur = (field: keyof PersonalInfoData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, localData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Password strength calculation
  const getPasswordStrength = () => {
    const pass = localData.password;
    if (!pass) return 0;
    
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.length >= 12) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;
    
    return Math.min(4, strength);
  };

  const passwordStrength = getPasswordStrength();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Partial<Record<keyof PersonalInfoData, string>> = {};
    let isValid = true;

    (Object.keys(localData) as Array<keyof PersonalInfoData>).forEach(field => {
      if (field !== 'telephone') { // Telephone is optional
        const error = validateField(field, localData[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    setTouched({
      prenom: true,
      nom: true,
      email: true,
      password: true
    });

    if (isValid) {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
      onNext();
    }
  };

  return (
    <StepContainer
      title="Informations personnelles"
      subtitle="Créez votre compte pour démarrer avec OKÉ"
      icon={<User className="w-7 h-7" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        {/* Name fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PremiumInput
            label="Prénom"
            placeholder="Jean"
            value={localData.prenom}
            onChange={(e) => updateField('prenom', e.target.value)}
            onBlur={() => handleBlur('prenom')}
            error={errors.prenom}
            success={!errors.prenom && touched.prenom && localData.prenom.length > 0}
            icon={<User className="w-4 h-4" />}
            required
          />
          
          <PremiumInput
            label="Nom"
            placeholder="Dupont"
            value={localData.nom}
            onChange={(e) => updateField('nom', e.target.value)}
            onBlur={() => handleBlur('nom')}
            error={errors.nom}
            success={!errors.nom && touched.nom && localData.nom.length > 0}
            icon={<User className="w-4 h-4" />}
            required
          />
        </div>

        {/* Email field */}
        <PremiumInput
          type="email"
          label="Email professionnel"
          placeholder="jean.dupont@entreprise.fr"
          value={localData.email}
          onChange={(e) => updateField('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          error={errors.email}
          success={!errors.email && touched.email && localData.email.length > 0}
          icon={<Mail className="w-4 h-4" />}
          required
        />

        {/* Phone field (optional) */}
        <PremiumInput
          type="tel"
          label="Téléphone (optionnel)"
          placeholder="06 12 34 56 78"
          value={localData.telephone || ''}
          onChange={(e) => updateField('telephone', e.target.value)}
          onBlur={() => handleBlur('telephone')}
          error={errors.telephone}
          success={!errors.telephone && touched.telephone && localData.telephone?.length > 0}
          icon={<Phone className="w-4 h-4" />}
        />

        {/* Password field */}
        <div className="space-y-3">
          <div className="relative">
            <PremiumInput
              type={showPassword ? 'text' : 'password'}
              label="Mot de passe"
              placeholder="••••••••"
              value={localData.password}
              onChange={(e) => updateField('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              error={errors.password}
              icon={<Lock className="w-4 h-4" />}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Password strength indicator */}
          {localData.password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 w-12 rounded-full transition-all duration-300 ${
                        passwordStrength >= level
                          ? passwordStrength === 4 ? 'bg-green-500'
                          : passwordStrength === 3 ? 'bg-[#FAA016]'
                          : passwordStrength === 2 ? 'bg-orange-400'
                          : 'bg-red-400'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className={`text-xs font-medium ${
                  passwordStrength === 4 ? 'text-green-600'
                  : passwordStrength === 3 ? 'text-[#FAA016]'
                  : passwordStrength === 2 ? 'text-orange-500'
                  : passwordStrength === 1 ? 'text-red-500'
                  : 'text-gray-400'
                }`}>
                  {passwordStrength === 4 ? 'Très fort' 
                  : passwordStrength === 3 ? 'Fort'
                  : passwordStrength === 2 ? 'Moyen'
                  : passwordStrength === 1 ? 'Faible'
                  : 'Très faible'}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Security info */}
        <InfoCard type="info" icon={<Shield className="w-5 h-5" />}>
          <p className="font-medium text-gray-900 mb-1">Vos données sont sécurisées</p>
          <p className="text-gray-600 text-xs">
            Nous utilisons un chiffrement de bout en bout pour protéger vos informations personnelles.
          </p>
        </InfoCard>

        {/* Submit button */}
        <LiquidButton
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={!canProceed || loading}
          className="w-full"
        >
          <span className="flex items-center justify-center gap-2">
            Continuer
            <ArrowRight className="w-5 h-5" />
          </span>
        </LiquidButton>

        {/* Terms */}
        <p className="text-xs text-center text-gray-500">
          En créant un compte, vous acceptez nos{' '}
          <a href="#" className="text-[#4C34CE] hover:underline">
            Conditions d'utilisation
          </a>{' '}
          et notre{' '}
          <a href="#" className="text-[#4C34CE] hover:underline">
            Politique de confidentialité
          </a>
        </p>
      </form>
    </StepContainer>
  );
}