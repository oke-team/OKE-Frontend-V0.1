'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle, XCircle, Check, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: '',
    color: 'bg-gray-200'
  });

  // Critères de validation du mot de passe
  const passwordCriteria = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  useEffect(() => {
    // Récupérer le token depuis l'URL
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError('Token de réinitialisation manquant');
    }
  }, [searchParams]);

  useEffect(() => {
    // Calculer la force du mot de passe
    if (!password) {
      setPasswordStrength({ score: 0, label: '', color: 'bg-gray-200' });
      return;
    }

    let score = 0;
    if (passwordCriteria.minLength) score++;
    if (passwordCriteria.hasUpperCase) score++;
    if (passwordCriteria.hasLowerCase) score++;
    if (passwordCriteria.hasNumber) score++;
    if (passwordCriteria.hasSpecial) score++;

    const strengthLevels = [
      { score: 1, label: 'Très faible', color: 'bg-red-500' },
      { score: 2, label: 'Faible', color: 'bg-orange-500' },
      { score: 3, label: 'Moyen', color: 'bg-yellow-500' },
      { score: 4, label: 'Fort', color: 'bg-green-500' },
      { score: 5, label: 'Très fort', color: 'bg-green-600' },
    ];

    const strength = strengthLevels.find(level => level.score === score) || strengthLevels[0];
    setPasswordStrength(strength);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!password || !confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/auth/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            new_password: password,
          }),
        }
      );

      if (response.ok) {
        setSuccess(true);
        
        // Rediriger vers la page de connexion après 3 secondes
        setTimeout(() => {
          router.push('/?auth=login&reset=success');
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.detail || data.message || 'Une erreur est survenue');
      }
    } catch (err) {
      setError('Impossible de contacter le serveur. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2 
                }}
                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.h1 
                {...fadeInUp}
                className="text-2xl font-bold text-white mb-2"
              >
                Mot de passe réinitialisé !
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/90 text-sm"
              >
                Vous pouvez maintenant vous connecter
              </motion.p>
            </div>

            <div className="p-8">
              <p className="text-gray-600 text-center mb-6">
                Votre mot de passe a été modifié avec succès. 
                Vous allez être redirigé vers la page de connexion...
              </p>

              <Link
                href="/?auth=login"
                className="w-full py-3 px-4 bg-[#4C34CE] text-white rounded-xl font-medium hover:bg-[#3A28B8] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Se connecter maintenant
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!token && error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-center">
              <XCircle className="w-16 h-16 text-white mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Lien invalide</h1>
              <p className="text-white/90 text-sm">
                Ce lien de réinitialisation est invalide ou a expiré
              </p>
            </div>
            <div className="p-8">
              <Link
                href="/auth/forgot-password"
                className="w-full py-3 px-4 bg-[#4C34CE] text-white rounded-xl font-medium hover:bg-[#3A28B8] active:scale-[0.98] transition-all text-center block"
              >
                Demander un nouveau lien
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#4C34CE] to-[#6B46C1] p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2 
              }}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Lock className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1 
              {...fadeInUp}
              className="text-2xl font-bold text-white mb-2"
            >
              Nouveau mot de passe
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/90 text-sm"
            >
              Choisissez un mot de passe sécurisé
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 mb-6"
            >
              {/* Nouveau mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C34CE] focus:border-transparent transition-all"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Indicateur de force */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Force du mot de passe</span>
                      <span className="text-xs font-medium text-gray-900">{passwordStrength.label}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${passwordStrength.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}

                {/* Critères de validation */}
                {password && (
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-2">
                      {passwordCriteria.minLength ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <X className="w-3 h-3 text-gray-400" />
                      )}
                      <span className={`text-xs ${passwordCriteria.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                        Au moins 8 caractères
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordCriteria.hasUpperCase && passwordCriteria.hasLowerCase ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <X className="w-3 h-3 text-gray-400" />
                      )}
                      <span className={`text-xs ${passwordCriteria.hasUpperCase && passwordCriteria.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                        Majuscules et minuscules
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordCriteria.hasNumber ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <X className="w-3 h-3 text-gray-400" />
                      )}
                      <span className={`text-xs ${passwordCriteria.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                        Au moins un chiffre
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordCriteria.hasSpecial ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <X className="w-3 h-3 text-gray-400" />
                      )}
                      <span className={`text-xs ${passwordCriteria.hasSpecial ? 'text-green-600' : 'text-gray-500'}`}>
                        Un caractère spécial (!@#$...)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirmer le mot de passe */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C34CE] focus:border-transparent transition-all"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">Les mots de passe ne correspondent pas</p>
                )}
              </div>

              {/* Message d'erreur */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-sm text-red-800">{error}</p>
                </motion.div>
              )}
            </motion.div>

            {/* Bouton de soumission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                type="submit"
                disabled={loading || !password || !confirmPassword || password !== confirmPassword}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  loading || !password || !confirmPassword || password !== confirmPassword
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#4C34CE] text-white hover:bg-[#3A28B8] active:scale-[0.98]'
                }`}
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-400 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Réinitialisation en cours...
                  </>
                ) : (
                  'Réinitialiser le mot de passe'
                )}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Chargement...</div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}