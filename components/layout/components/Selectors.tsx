'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Calendar, 
  ChevronDown, 
  Plus,
  Check,
  Globe,
  MapPin
} from 'lucide-react';
import { liquidGlass } from '@/lib/design-system/liquid-glass';
type Company = { id: string; name: string; plan: 'starter' | 'pro' | 'enterprise'; country: string; currency: string };

interface SelectorsProps {
  currentCompany?: Company;
  onCompanyChange?: (company: Company) => void;
  showCompany?: boolean;
  showPeriod?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'subtle';
  fullWidth?: boolean;
  className?: string;
}

interface Period {
  id: string;
  label: string;
  shortLabel: string;
  startDate: Date;
  endDate: Date;
  type: 'exercise' | 'quarter' | 'month' | 'custom';
  isCurrent?: boolean;
}

/**
 * Selectors - Sélecteurs avec bordures subtiles
 * 
 * Caractéristiques :
 * - Bordures subtiles réduites selon les specs UX
 * - Animations fluides entre états
 * - Support combiné entreprise + période
 * - Variant subtle pour intégration harmonieuse
 * - Menu déroulant avec liquid glass
 * - Indicateurs visuels améliorés
 */
const Selectors: React.FC<SelectorsProps> = ({
  currentCompany,
  onCompanyChange,
  showCompany = true,
  showPeriod = false,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  className = ''
}) => {
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState<Period>({
    id: '2025',
    label: 'Exercice fiscal 2025',
    shortLabel: '2025',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-12-31'),
    type: 'exercise',
    isCurrent: true
  });
  
  const companyRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);

  // Mock data
  const mockCompanies: Company[] = [
    { id: '1', name: 'TechCorp SAS', plan: 'pro', country: 'FR', currency: 'EUR' },
    { id: '2', name: 'Design Studio SARL', plan: 'starter', country: 'FR', currency: 'EUR' },
    { id: '3', name: 'Global Industries Inc.', plan: 'enterprise', country: 'US', currency: 'USD' },
    { id: '4', name: 'Innovation Lab', plan: 'pro', country: 'CA', currency: 'CAD' }
  ];

  const mockPeriods: Period[] = [
    {
      id: '2025',
      label: 'Exercice fiscal 2025',
      shortLabel: '2025',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31'),
      type: 'exercise',
      isCurrent: true
    },
    {
      id: '2024',
      label: 'Exercice fiscal 2024',
      shortLabel: '2024',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      type: 'exercise'
    },
    {
      id: 'q4-2024',
      label: 'T4 2024 (Oct-Déc)',
      shortLabel: 'T4 2024',
      startDate: new Date('2024-10-01'),
      endDate: new Date('2024-12-31'),
      type: 'quarter'
    },
    {
      id: 'jan-2025',
      label: 'Janvier 2025',
      shortLabel: 'Jan 2025',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-31'),
      type: 'month'
    }
  ];

  // Configuration des tailles
  const sizeConfig = {
    sm: {
      height: 'h-8',
      padding: 'px-2 py-1',
      text: 'text-xs',
      gap: 'gap-1'
    },
    md: {
      height: 'h-9',
      padding: 'px-3 py-2',
      text: 'text-sm',
      gap: 'gap-2'
    },
    lg: {
      height: 'h-10',
      padding: 'px-4 py-2',
      text: 'text-sm',
      gap: 'gap-2'
    }
  };

  const config = sizeConfig[size];

  // Styles selon le variant
  const getVariantStyles = (isActive: boolean = false) => {
    if (variant === 'subtle') {
      return {
        background: isActive 
          ? 'rgba(248, 250, 252, 0.8)' 
          : 'rgba(248, 250, 252, 0.4)',
        border: isActive 
          ? '1px solid rgba(94, 114, 255, 0.2)' 
          : '1px solid rgba(148, 163, 184, 0.2)',
        boxShadow: isActive 
          ? '0 2px 4px rgba(94, 114, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
          : '0 1px 2px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
      };
    }
    
    return {
      background: isActive 
        ? 'rgba(255, 255, 255, 0.8)' 
        : 'rgba(255, 255, 255, 0.6)',
      border: isActive 
        ? '1px solid rgba(94, 114, 255, 0.3)' 
        : '1px solid rgba(203, 213, 225, 0.4)',
      boxShadow: isActive 
        ? '0 4px 8px rgba(94, 114, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
        : '0 2px 4px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
    };
  };

  // Gestion des clics extérieurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (companyRef.current && !companyRef.current.contains(event.target as Node)) {
        setCompanyDropdownOpen(false);
      }
      if (periodRef.current && !periodRef.current.contains(event.target as Node)) {
        setPeriodDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPlanBadge = (plan: string) => {
    const planStyles = {
      enterprise: { bg: 'bg-gradient-to-r from-amber-500 to-orange-600', text: 'text-white', label: 'ENT' },
      pro: { bg: 'bg-gradient-to-r from-blue-500 to-purple-600', text: 'text-white', label: 'PRO' },
      starter: { bg: 'bg-slate-200', text: 'text-slate-600', label: 'STR' }
    };
    
    const style = planStyles[plan as keyof typeof planStyles];
    
    return (
      <span className={`
        px-1.5 py-0.5 rounded-full text-xs font-bold
        ${style.bg} ${style.text}
      `}>
        {style.label}
      </span>
    );
  };

  const getPeriodTypeIcon = (type: string) => {
    const icons = {
      exercise: Calendar,
      quarter: Calendar,
      month: Calendar,
      custom: Calendar
    };
    
    const Icon = icons[type as keyof typeof icons];
    return <Icon size={14} />;
  };

  return (
    <div className={`flex items-center ${config.gap} ${fullWidth ? 'w-full' : ''} ${className}`}>
      {/* Company Selector */}
      {showCompany && (
        <div ref={companyRef} className={`relative ${fullWidth && !showPeriod ? 'flex-1' : ''}`}>
          <motion.button
            onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
            className={`
              ${config.height} ${config.padding} ${config.text}
              flex items-center justify-between ${fullWidth && !showPeriod ? 'w-full' : 'min-w-0'}
              rounded-lg font-medium transition-all duration-200 group
              ${fullWidth ? 'w-full' : 'max-w-xs'}
            `}
            style={getVariantStyles(companyDropdownOpen)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            aria-expanded={companyDropdownOpen}
            aria-label="Sélectionner une entreprise"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Building2 size={16} className="text-primary-500 flex-shrink-0" />
              <span className="truncate font-medium text-slate-800">
                {currentCompany?.name || 'Sélectionner'}
              </span>
              {currentCompany && (
                <div className="flex items-center gap-1 ml-auto flex-shrink-0">
                  {currentCompany.country && (
                    <span className="text-xs text-slate-500 flex items-center gap-0.5">
                      <Globe size={10} />
                      {currentCompany.country}
                    </span>
                  )}
                  {getPlanBadge(currentCompany.plan)}
                </div>
              )}
            </div>
            <ChevronDown 
              size={14} 
              className={`
                ml-2 text-slate-400 transition-transform duration-200
                ${companyDropdownOpen ? 'rotate-180' : ''}
              `} 
            />
          </motion.button>

          {/* Company Dropdown */}
          <AnimatePresence>
            {companyDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute top-full left-0 right-0 z-50 mt-1"
                style={liquidGlass.effects.elevated}
              >
                <div className="rounded-lg overflow-hidden max-h-80 overflow-y-auto">
                  <div className="p-2">
                    {mockCompanies.map((company) => (
                      <motion.button
                        key={company.id}
                        onClick={() => {
                          onCompanyChange?.(company);
                          setCompanyDropdownOpen(false);
                        }}
                        className={`
                          w-full flex items-center justify-between p-3 rounded-lg
                          transition-colors text-left group
                          ${currentCompany?.id === company.id 
                            ? 'bg-primary-50 text-primary-900' 
                            : 'hover:bg-slate-50'
                          }
                        `}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <Building2 size={16} className="text-slate-400 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-slate-900 truncate">
                              {company.name}
                            </div>
                            <div className="text-xs text-slate-500 flex items-center gap-2">
                              <span className="flex items-center gap-1">
                                <MapPin size={10} />
                                {company.country || 'Non spécifié'}
                              </span>
                              <span>•</span>
                              <span>{company.currency || 'EUR'}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {getPlanBadge(company.plan)}
                          {currentCompany?.id === company.id && (
                            <Check size={14} className="text-primary-600" />
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="border-t border-slate-200/50 p-2">
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left">
                      <Plus size={16} className="text-primary-500" />
                      <span className="text-sm font-medium text-primary-700">
                        Ajouter une entreprise
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Period Selector */}
      {showPeriod && (
        <div ref={periodRef} className={`relative ${fullWidth && !showCompany ? 'flex-1' : ''}`}>
          <motion.button
            onClick={() => setPeriodDropdownOpen(!periodDropdownOpen)}
            className={`
              ${config.height} ${config.padding} ${config.text}
              flex items-center justify-between ${fullWidth && !showCompany ? 'w-full' : 'min-w-0'}
              rounded-lg font-medium transition-all duration-200 group
            `}
            style={getVariantStyles(periodDropdownOpen)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            aria-expanded={periodDropdownOpen}
            aria-label="Sélectionner une période"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {getPeriodTypeIcon(currentPeriod.type)}
              <span className="truncate font-medium text-slate-800">
                {currentPeriod.shortLabel}
              </span>
              {currentPeriod.isCurrent && (
                <span className="flex-shrink-0 px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                  Actuel
                </span>
              )}
            </div>
            <ChevronDown 
              size={14} 
              className={`
                ml-2 text-slate-400 transition-transform duration-200
                ${periodDropdownOpen ? 'rotate-180' : ''}
              `} 
            />
          </motion.button>

          {/* Period Dropdown */}
          <AnimatePresence>
            {periodDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute top-full left-0 right-0 z-50 mt-1"
                style={liquidGlass.effects.elevated}
              >
                <div className="rounded-lg overflow-hidden max-h-80 overflow-y-auto">
                  <div className="p-2">
                    {mockPeriods.map((period) => (
                      <motion.button
                        key={period.id}
                        onClick={() => {
                          setCurrentPeriod(period);
                          setPeriodDropdownOpen(false);
                        }}
                        className={`
                          w-full flex items-center justify-between p-3 rounded-lg
                          transition-colors text-left group
                          ${currentPeriod.id === period.id 
                            ? 'bg-emerald-50 text-emerald-900' 
                            : 'hover:bg-slate-50'
                          }
                        `}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          {getPeriodTypeIcon(period.type)}
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-slate-900 truncate">
                              {period.label}
                            </div>
                            <div className="text-xs text-slate-500">
                              Du {period.startDate.toLocaleDateString()} au {period.endDate.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {period.isCurrent && (
                            <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                              Actuel
                            </span>
                          )}
                          {currentPeriod.id === period.id && (
                            <Check size={14} className="text-emerald-600" />
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="border-t border-slate-200/50 p-2">
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left">
                      <Plus size={16} className="text-emerald-500" />
                      <span className="text-sm font-medium text-emerald-700">
                        Période personnalisée
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Selectors;