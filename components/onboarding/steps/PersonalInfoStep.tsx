'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff, Check, AlertCircle, Sparkles, Shield } from 'lucide-react';
import { formFieldVariants } from '../animations/stepTransitions';

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

export default function PersonalInfoStep({
  data,
  onUpdate,
  onNext,
  canProceed
}: PersonalInfoStepProps) {
  const [localData, setLocalData] = useState<PersonalInfoData>(data);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfoData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof PersonalInfoData, boolean>>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Validation rules
  const validateField = (field: keyof PersonalInfoData, value: string): string | null => {
    switch (field) {
      case 'prenom':
        if (!value.trim()) return 'Le prénom est requis';
        if (value.trim().length < 2) return 'Le prénom doit contenir au moins 2 caractères';
        return null;
      
      case 'nom':
        if (!value.trim()) return 'Le nom est requis';
        if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
        return null;
      
      case 'email':
        if (!value.trim()) return 'L\'email est requis';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Format d\'email invalide';
        return null;
      
      case 'telephone':
        if (value && value.length > 0) {
          const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
          if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Format de téléphone invalide';
        }
        return null;
      
      case 'password':
        if (!value) return 'Le mot de passe est requis';
        if (value.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
        if (!/(?=.*[a-z])/.test(value)) return 'Le mot de passe doit contenir au moins une minuscule';
        if (!/(?=.*[A-Z])/.test(value)) return 'Le mot de passe doit contenir au moins une majuscule';
        if (!/(?=.*\d)/.test(value)) return 'Le mot de passe doit contenir au moins un chiffre';
        return null;
      
      default:
        return null;
    }
  };

  // Met à jour un champ avec validation
  const updateField = (field: keyof PersonalInfoData, value: string) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onUpdate({ [field]: value });

    // Validation si le champ a déjà été touché
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  // Marque un champ comme touché et valide
  const handleBlur = (field: keyof PersonalInfoData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setFocusedField(null);
    const error = validateField(field, localData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Validation globale avant soumission
  const validateAll = (): boolean => {
    const newErrors: Partial<Record<keyof PersonalInfoData, string>> = {};
    let isValid = true;

    (Object.keys(localData) as Array<keyof PersonalInfoData>).forEach(field => {
      const error = validateField(field, localData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      prenom: true,
      nom: true,
      email: true,
      telephone: true,
      password: true
    });

    return isValid;
  };

  // Gestion de la soumission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll() && canProceed) {
      onNext();
    }
  };

  // Format du téléphone en temps réel
  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.startsWith('33')) {
      return `+33 ${numbers.slice(2).replace(/(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')}`.trim();
    }
    if (numbers.startsWith('0')) {
      return numbers.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    }
    return value;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    updateField('telephone', formatted);
  };

  // Contrôles de qualité du mot de passe
  const passwordStrength = {
    hasMinLength: localData.password.length >= 8,
    hasLowerCase: /(?=.*[a-z])/.test(localData.password),
    hasUpperCase: /(?=.*[A-Z])/.test(localData.password),
    hasNumber: /(?=.*\d)/.test(localData.password),
  };

  const passwordScore = Object.values(passwordStrength).filter(Boolean).length;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      {/* Header de section clair */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-8"
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#4C34CE] mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Informations personnelles</h2>
        <p className="text-gray-600">Créez votre compte pour démarrer avec OKÉ</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Prénom et Nom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            variants={formFieldVariants}
            custom={0}
            className="space-y-2"
          >
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
              Prénom *
            </label>
            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300
                ${focusedField === 'prenom' ? 'text-[#FAA016]' : 'text-gray-400'}`}>
                <User className="w-5 h-5" />
              </div>
              <input
                id="prenom"
                type="text"
                value={localData.prenom}
                onChange={(e) => updateField('prenom', e.target.value)}
                onFocus={() => setFocusedField('prenom')}
                onBlur={() => handleBlur('prenom')}
                className={`
                  w-full h-11 pl-10 pr-10 rounded-lg border text-sm
                  bg-white text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-1 transition-all duration-200
                  ${errors.prenom 
                    ? 'border-red-400 focus:ring-red-400 focus:border-red-400' 
                    : focusedField === 'prenom'
                      ? 'border-[#4C34CE] focus:ring-[#4C34CE] focus:border-[#4C34CE]'
                      : 'border-gray-200 hover:border-gray-300 focus:ring-[#4C34CE] focus:border-[#4C34CE]'
                  }
                `}
                placeholder="Votre prénom"
                autoComplete="given-name"
              />
              {localData.prenom && !errors.prenom && (
                <motion.div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <Check className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </div>
            {errors.prenom && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400 flex items-center space-x-1"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{errors.prenom}</span>
              </motion.p>
            )}
          </motion.div>

          <motion.div
            variants={formFieldVariants}
            custom={1}
            className="space-y-2"
          >
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
              Nom *
            </label>
            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300
                ${focusedField === 'nom' ? 'text-[#FAA016]' : 'text-gray-400'}`}>
                <User className="w-5 h-5" />
              </div>
              <input
                id="nom"
                type="text"
                value={localData.nom}
                onChange={(e) => updateField('nom', e.target.value)}
                onFocus={() => setFocusedField('nom')}
                onBlur={() => handleBlur('nom')}
                className={`
                  w-full h-12 pl-10 pr-10 rounded-xl border text-base
                  bg-white text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 transition-all duration-300
                  ${errors.nom 
                    ? 'border-red-500/50 focus:ring-red-400/30 focus:border-red-500/50' 
                    : focusedField === 'nom'
                      ? 'border-[#4C34CE] focus:ring-[#4C34CE]/20 focus:border-[#4C34CE] bg-white/[0.08]'
                      : 'border-gray-300 hover:border-gray-400 focus:ring-[#FAA016]/30 focus:border-[#FAA016]/50'
                  }
                `}
                placeholder="Votre nom"
                autoComplete="family-name"
              />
              {localData.nom && !errors.nom && (
                <motion.div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <Check className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </div>
            {errors.nom && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400 flex items-center space-x-1"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{errors.nom}</span>
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Email */}
        <motion.div
          variants={formFieldVariants}
          custom={2}
          className="space-y-2"
        >
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Adresse email *
          </label>
          <div className="relative group">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300
              ${focusedField === 'email' ? 'text-[#4C34CE]' : 'text-gray-400'}`}>
              <Mail className="w-5 h-5" />
            </div>
            <input
              id="email"
              type="email"
              value={localData.email}
              onChange={(e) => updateField('email', e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => handleBlur('email')}
              className={`
                w-full h-12 pl-10 pr-10 rounded-xl border text-base
                bg-white/[0.05] backdrop-blur-xl text-white placeholder-white/30
                focus:outline-none focus:ring-2 transition-all duration-300
                ${errors.email 
                  ? 'border-red-500/50 focus:ring-red-400/30 focus:border-red-500/50' 
                  : focusedField === 'email'
                    ? 'border-[#4C34CE]/50 focus:ring-[#4C34CE]/30 focus:border-[#4C34CE]/50 bg-white/[0.08]'
                    : 'border-gray-300 hover:border-gray-400 focus:ring-[#4C34CE]/30 focus:border-[#4C34CE]/50'
                }
              `}
              placeholder="votre@email.com"
              autoComplete="email"
            />
            {localData.email && !errors.email && (
              <motion.div 
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500/20 to-green-400/20 backdrop-blur-xl flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
              </motion.div>
            )}
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400 flex items-center space-x-1"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errors.email}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Téléphone (optionnel) */}
        <motion.div
          variants={formFieldVariants}
          custom={3}
          className="space-y-2"
        >
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
            Téléphone 
            <span className="text-gray-400 ml-2 text-xs">(optionnel)</span>
          </label>
          <div className="relative group">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300
              ${focusedField === 'telephone' ? 'text-[#FAA016]' : 'text-gray-400'}`}>
              <Phone className="w-5 h-5" />
            </div>
            <input
              id="telephone"
              type="tel"
              value={localData.telephone || ''}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onFocus={() => setFocusedField('telephone')}
              onBlur={() => handleBlur('telephone')}
              className={`
                w-full h-12 pl-10 pr-10 rounded-xl border text-base
                bg-white/[0.05] backdrop-blur-xl text-white placeholder-white/30
                focus:outline-none focus:ring-2 transition-all duration-300
                ${errors.telephone 
                  ? 'border-red-500/50 focus:ring-red-400/30 focus:border-red-500/50' 
                  : focusedField === 'telephone'
                    ? 'border-[#4C34CE] focus:ring-[#4C34CE]/20 focus:border-[#4C34CE] bg-white/[0.08]'
                    : 'border-gray-300 hover:border-gray-400 focus:ring-[#FAA016]/30 focus:border-[#FAA016]/50'
                }
              `}
              placeholder="06 12 34 56 78"
              autoComplete="tel"
            />
            {localData.telephone && !errors.telephone && (
              <motion.div 
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500/20 to-green-400/20 backdrop-blur-xl flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
              </motion.div>
            )}
          </div>
          {errors.telephone && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400 flex items-center space-x-1"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errors.telephone}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Mot de passe */}
        <motion.div
          variants={formFieldVariants}
          custom={4}
          className="space-y-2"
        >
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe *
          </label>
          <div className="relative group">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300
              ${focusedField === 'password' ? 'text-[#4C34CE]' : 'text-gray-400'}`}>
              <Lock className="w-5 h-5" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={localData.password}
              onChange={(e) => updateField('password', e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => handleBlur('password')}
              className={`
                w-full h-12 pl-10 pr-12 rounded-xl border text-base
                bg-white/[0.05] backdrop-blur-xl text-white placeholder-white/30
                focus:outline-none focus:ring-2 transition-all duration-300
                ${errors.password 
                  ? 'border-red-500/50 focus:ring-red-400/30 focus:border-red-500/50' 
                  : focusedField === 'password'
                    ? 'border-[#4C34CE]/50 focus:ring-[#4C34CE]/30 focus:border-[#4C34CE]/50 bg-white/[0.08]'
                    : 'border-gray-300 hover:border-gray-400 focus:ring-[#4C34CE]/30 focus:border-[#4C34CE]/50'
                }
              `}
              placeholder="Votre mot de passe sécurisé"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white/60 transition-colors duration-300"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Indicateur de force du mot de passe avec design moderne */}
          {localData.password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.1 }}
              className="space-y-3 p-4 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-white/60">Sécurité du mot de passe</span>
                <span className={`text-xs font-bold ${
                  passwordScore === 4 ? 'text-green-400' :
                  passwordScore === 3 ? 'text-yellow-400' :
                  passwordScore === 2 ? 'text-orange-400' :
                  'text-red-400'
                }`}>
                  {passwordScore === 4 ? 'Excellent' :
                   passwordScore === 3 ? 'Bon' :
                   passwordScore === 2 ? 'Moyen' :
                   'Faible'}
                </span>
              </div>
              
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((level) => (
                  <motion.div
                    key={level}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                      passwordScore >= level
                        ? passwordScore === 4
                          ? 'bg-gradient-to-r from-green-500 to-green-400 shadow-[0_0_10px_0_rgba(34,197,94,0.5)]'
                          : passwordScore === 3
                          ? 'bg-gradient-to-r from-yellow-500 to-yellow-400'
                          : passwordScore === 2
                          ? 'bg-gradient-to-r from-orange-500 to-orange-400'
                          : 'bg-gradient-to-r from-red-500 to-red-400'
                        : 'bg-white/[0.08]'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: passwordScore >= level ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: level * 0.1 }}
                  />
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3">
                {Object.entries(passwordStrength).map(([key, valid]) => (
                  <motion.div 
                    key={key} 
                    className={`flex items-center space-x-2 text-xs transition-all duration-300 ${
                      valid ? 'text-green-400' : 'text-gray-400'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                      valid ? 'bg-green-500/20 border border-green-500/30' : 'bg-white/[0.05] border border-white/[0.08]'
                    }`}>
                      <Check className={`w-2.5 h-2.5 ${valid ? 'opacity-100' : 'opacity-30'}`} />
                    </div>
                    <span>
                      {key === 'hasMinLength' && '8 caractères'}
                      {key === 'hasLowerCase' && 'Minuscule'}
                      {key === 'hasUpperCase' && 'Majuscule'}
                      {key === 'hasNumber' && 'Chiffre'}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400 flex items-center space-x-1"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errors.password}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Note de sécurité */}
        <div className="flex items-start space-x-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-gray-900 mb-1">Vos données sont sécurisées</p>
            <p className="text-gray-600 text-xs">Nous utilisons un chiffrement de bout en bout pour protéger vos informations personnelles.</p>
          </div>
        </div>

        {/* Bouton de soumission avec design moderne */}
        <motion.div
          variants={formFieldVariants}
          custom={6}
          className="pt-4"
        >
          <button
            type="submit"
            disabled={!canProceed}
            className={`
              w-full h-12 rounded-lg font-medium text-sm transition-all duration-200
              ${canProceed
                ? 'bg-[#FAA016] hover:bg-[#E8941A] text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Continuer
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}