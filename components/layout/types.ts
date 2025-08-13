/**
 * TypeScript interfaces for the OKÉ Header System
 * Comprehensive type definitions with proper accessibility support
 */

import React from 'react';

// Base types
export type ViewportSize = 'mobile' | 'tablet' | 'desktop';
export type ComponentSize = 'sm' | 'md' | 'lg' | 'compact' | 'medium' | 'large';
export type LayoutOrientation = 'horizontal' | 'vertical' | 'vertical-compact';
export type ComponentVariant = 'default' | 'subtle' | 'primary' | 'success' | 'warning';

// Company and Plan types
export type PlanType = 'starter' | 'pro' | 'enterprise';
export type StatusType = 'online' | 'away' | 'busy' | 'offline';

export interface Company {
  id: string;
  name: string;
  logo?: string;
  plan: PlanType;
  country?: string;
  currency?: string;
}

// Period types
export type PeriodType = 'exercise' | 'quarter' | 'month' | 'custom';

export interface Period {
  id: string;
  label: string;
  shortLabel: string;
  startDate: Date;
  endDate: Date;
  type: PeriodType;
  isCurrent?: boolean;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatar?: string;
  role: string;
  status: StatusType;
  plan: PlanType;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  notifications: boolean;
  expertMode: boolean;
}

// Header System types
export interface HeaderContextType {
  currentCompany: Company;
  currentUser: User;
  expertMode: boolean;
  pathname: string;
  isAccountingModule: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  viewport: ViewportSize;
}

export interface BaseHeaderProps {
  currentCompany?: Company;
  currentUser?: User;
  onCompanyChange?: (company: Company) => void;
  onChatOpen?: () => void;
  onMagicActions?: () => void;
  onSearch?: (query: string) => void;
  activeModule?: string;
  className?: string;
}

export interface HeaderProps extends BaseHeaderProps {
  context?: HeaderContextType;
}

// Component-specific interfaces
export interface LogoSectionProps {
  size?: ComponentSize;
  showText?: boolean;
  href?: string;
  className?: string;
  'aria-label'?: string;
}

export interface NavigationModule {
  id: string;
  label: string;
  shortLabel?: string;
  icon: React.ElementType;
  href: string;
  color: string;
  description?: string;
  badge?: number | string;
  isNew?: boolean;
  requiresExpert?: boolean;
}

export interface NavigationTabsProps {
  activeModule?: string;
  layout?: LayoutOrientation;
  onNavigate?: (moduleId: string) => void;
  showInSearch?: boolean;
  modules?: NavigationModule[];
  className?: string;
  role?: string;
  'aria-label'?: string;
}

export interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  showShortcut?: boolean;
  autoFocus?: boolean;
  size?: ComponentSize;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  shortcut?: string;
  color: string;
  category: 'create' | 'import' | 'magic' | 'admin';
  expertOnly?: boolean;
  description: string;
  onClick?: () => void;
  disabled?: boolean;
  hidden?: boolean;
}

export interface QuickActionsProps {
  actions?: QuickAction[];
  onMagicActions?: () => void;
  onActionClick?: (action: QuickAction) => void;
  expertMode?: boolean;
  layout?: 'mobile' | 'tablet' | 'desktop';
  className?: string;
  'aria-label'?: string;
}

export interface UserProfileProps {
  user?: User;
  size?: ComponentSize;
  showName?: boolean;
  showStatus?: boolean;
  onMenuAction?: (action: string) => void;
  className?: string;
  'aria-label'?: string;
}

export interface SelectorsProps {
  companies?: Company[];
  periods?: Period[];
  currentCompany?: Company;
  currentPeriod?: Period;
  onCompanyChange?: (company: Company) => void;
  onPeriodChange?: (period: Period) => void;
  showCompany?: boolean;
  showPeriod?: boolean;
  size?: ComponentSize;
  variant?: ComponentVariant;
  fullWidth?: boolean;
  className?: string;
  'aria-label'?: string;
}

// Animation types
export interface AnimationConfig {
  duration: number;
  ease: string | number[];
  delay?: number;
  stagger?: number;
}

export interface MotionVariants {
  initial?: any;
  animate?: any;
  exit?: any;
  hover?: any;
  tap?: any;
  focus?: any;
}

// Accessibility types
export interface AccessibilityProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-current'?: string | boolean;
  'aria-selected'?: boolean;
  'aria-disabled'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  role?: string;
  tabIndex?: number;
}

export interface KeyboardShortcut {
  key: string;
  modifiers?: ('ctrl' | 'cmd' | 'shift' | 'alt')[];
  description: string;
  action: () => void;
}

// Event types
export interface SearchEvent {
  query: string;
  timestamp: Date;
  source: 'keyboard' | 'click' | 'suggestion';
}

export interface NavigationEvent {
  from: string;
  to: string;
  timestamp: Date;
  method: 'click' | 'keyboard' | 'programmatic';
}

export interface UserActionEvent {
  action: string;
  context: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// Performance types
export interface PerformanceMetrics {
  renderTime: number;
  interactionDelay: number;
  animationFPS: number;
  memoryUsage?: number;
}

export interface LazyComponentProps {
  fallback?: React.ReactNode;
  loading?: boolean;
  error?: Error | null;
  retry?: () => void;
}

// Theme and styling types
export interface ThemeConfig {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, any>;
  shadows: Record<string, string>;
  transitions: Record<string, string>;
}

export interface ResponsiveConfig {
  breakpoints: Record<ViewportSize, number>;
  touchTargets: Record<ComponentSize, number>;
  spacing: Record<ViewportSize, Record<string, string>>;
}

// Error handling types
export interface HeaderError {
  code: string;
  message: string;
  component: string;
  timestamp: Date;
  recovered?: boolean;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// Configuration types
export interface HeaderConfig {
  features: {
    search: boolean;
    quickActions: boolean;
    expertMode: boolean;
    notifications: boolean;
    userProfile: boolean;
  };
  layout: {
    sticky: boolean;
    collapsible: boolean;
    showBreadcrumbs: boolean;
  };
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    screenReaderOptimized: boolean;
  };
  performance: {
    lazyLoad: boolean;
    virtualization: boolean;
    memoryOptimization: boolean;
  };
}

// Export utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = 
  Pick<T, Exclude<keyof T, Keys>> & 
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

// Generic component props with accessibility
export interface BaseComponentProps extends AccessibilityProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  testId?: string;
}