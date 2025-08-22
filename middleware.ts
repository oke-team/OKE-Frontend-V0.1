import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes qui nécessitent une authentification
const protectedRoutes = ['/dashboard', '/accounting', '/bank'];

// Routes publiques (accessibles sans authentification)
const publicRoutes = [
  '/', 
  '/auth', 
  '/auth/signup', 
  '/auth/reset-password',
  '/auth/forgot-password',
  '/auth/verify',
  '/auth/confirm-email'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Vérifier si c'est une route protégée
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    // Vérifier la présence du token dans les cookies
    const token = request.cookies.get('oke_access_token')?.value || 
                  request.cookies.get('access_token')?.value;
    
    // Si pas de token, rediriger vers la page de connexion
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth';
      // Ajouter l'URL de retour pour rediriger après connexion
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
  }
  
  // Si c'est une route publique et que l'utilisateur est connecté
  const isPublicRoute = publicRoutes.includes(pathname);
  if (isPublicRoute && pathname === '/auth') {
    const token = request.cookies.get('oke_access_token')?.value || 
                  request.cookies.get('access_token')?.value;
    
    // Si l'utilisateur est déjà connecté, rediriger vers le dashboard
    if (token) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

// Configuration du middleware
export const config = {
  // Appliquer le middleware sur toutes les routes sauf les assets statiques et API
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|icons|manifest.json|service-worker.js).*)',
  ],
};