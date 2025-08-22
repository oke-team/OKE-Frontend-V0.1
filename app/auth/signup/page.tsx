'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthPage from '../page';

export default function SignupPage() {
  // On réutilise la page auth principale car le AuthWidget gère déjà les deux modes
  // Cette page existe juste pour avoir une URL dédiée /auth/signup
  return <AuthPage />;
}