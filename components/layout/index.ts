/**
 * Layout Components
 * 
 * Exporte tous les composants de layout pour un import simplifié
 */

// Legacy components
export { default as AppLayout } from './AppLayout';

// New Header System
export { default as HeaderNew } from './HeaderNew';
export { default as HeaderDesktop } from './HeaderDesktop';
export { default as HeaderTablet } from './HeaderTablet';

// Export HeaderMobile with both named and default export for compatibility
export { default as HeaderMobileNew } from './HeaderMobile';

// Component exports
export * from './components';

// Type exports
export * from './types';