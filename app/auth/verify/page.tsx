'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setVerificationStatus('error');
        setErrorMessage('Token de vérification manquant');
        return;
      }

      try {
        // Appel API pour vérifier le token
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/auth/verify-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setVerificationStatus('success');
          
          // Rediriger vers la page de connexion après 3 secondes
          setTimeout(() => {
            router.push('/?auth=login&verified=true');
          }, 3000);
        } else {
          const error = await response.json();
          setVerificationStatus('error');
          setErrorMessage(error.message || 'Token invalide ou expiré');
        }
      } catch (error) {
        setVerificationStatus('error');
        setErrorMessage('Erreur lors de la vérification. Veuillez réessayer.');
      }
    };

    verifyToken();
  }, [searchParams, router]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card principale */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header avec gradient */}
          <div className={`p-8 text-center ${
            verificationStatus === 'success' 
              ? 'bg-gradient-to-r from-green-500 to-green-600'
              : verificationStatus === 'error'
              ? 'bg-gradient-to-r from-red-500 to-red-600'
              : 'bg-gradient-to-r from-[#4C34CE] to-[#6B46C1]'
          }`}>
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
              {verificationStatus === 'loading' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 className="w-10 h-10 text-white" />
                </motion.div>
              )}
              {verificationStatus === 'success' && (
                <CheckCircle className="w-10 h-10 text-white" />
              )}
              {verificationStatus === 'error' && (
                <XCircle className="w-10 h-10 text-white" />
              )}
            </motion.div>
            
            <motion.h1 
              {...fadeInUp}
              className="text-2xl font-bold text-white mb-2"
            >
              {verificationStatus === 'loading' && 'Vérification en cours...'}
              {verificationStatus === 'success' && 'Email vérifié !'}
              {verificationStatus === 'error' && 'Erreur de vérification'}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/90 text-sm"
            >
              {verificationStatus === 'loading' && 'Veuillez patienter quelques instants'}
              {verificationStatus === 'success' && 'Votre compte a été activé avec succès'}
              {verificationStatus === 'error' && errorMessage}
            </motion.p>
          </div>

          {/* Contenu */}
          <div className="p-8">
            {verificationStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Félicitations ! Votre compte est maintenant actif.
                  </p>
                  <p className="text-sm text-gray-500">
                    Vous allez être redirigé vers la page de connexion...
                  </p>
                </div>

                <Link
                  href="/?auth=login"
                  className="w-full py-3 px-4 bg-[#4C34CE] text-white rounded-xl font-medium hover:bg-[#3A28B8] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Se connecter maintenant
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}

            {verificationStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    {errorMessage === 'Token invalide ou expiré' 
                      ? 'Ce lien de vérification est invalide ou a expiré. Veuillez demander un nouveau lien de confirmation.'
                      : errorMessage}
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/auth/confirm-email"
                    className="w-full py-3 px-4 bg-[#4C34CE] text-white rounded-xl font-medium hover:bg-[#3A28B8] active:scale-[0.98] transition-all text-center block"
                  >
                    Demander un nouveau lien
                  </Link>

                  <Link
                    href="/"
                    className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 active:scale-[0.98] transition-all text-center block"
                  >
                    Retour à l'accueil
                  </Link>
                </div>
              </motion.div>
            )}

            {verificationStatus === 'loading' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center gap-3 text-gray-600">
                  <motion.div
                    className="w-2 h-2 bg-[#4C34CE] rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-[#4C34CE] rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-[#4C34CE] rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer avec infos supplémentaires */}
        {verificationStatus !== 'loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-600">
              Besoin d'aide ?{' '}
              <a href="mailto:support@oke-app.com" className="text-[#4C34CE] hover:text-[#3A28B8] font-medium">
                Contactez le support
              </a>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Chargement...</div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}