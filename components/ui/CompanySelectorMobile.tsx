'use client';

import React from 'react';
import { Building2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import MobileDropdown from './MobileDropdown';

export interface Company {
  id: string;
  name: string;
  logo?: string;
  plan: 'starter' | 'pro' | 'enterprise';
  country?: string;
  currency?: string;
}

interface CompanySelectorMobileProps {
  companies: Company[];
  currentCompany: Company;
  onCompanyChange: (company: Company) => void;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  compact?: boolean;
  className?: string;
}

export const CompanySelectorMobile: React.FC<CompanySelectorMobileProps> = ({
  companies,
  currentCompany,
  onCompanyChange,
  size = 'md',
  compact = false,
  className
}) => {
  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise':
        return 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)';
      case 'pro':
        return 'linear-gradient(135deg, #5e72ff 0%, #d150da 100%)';
      default:
        return '#e5e7eb';
    }
  };

  const getPlanTextColor = (plan: string) => {
    return plan === 'starter' ? '#6b7280' : 'white';
  };

  // Conversion des companies en options pour MobileDropdown
  const options = companies.map(company => ({
    id: company.id,
    label: company.name,
    sublabel: company.country && company.currency 
      ? `${company.country} · ${company.currency}` 
      : undefined,
    icon: <Building2 size={16} />,
    badge: (
      <span
        style={{
          padding: '4px 8px',
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          borderRadius: '12px',
          background: getPlanColor(company.plan),
          color: getPlanTextColor(company.plan),
          boxShadow: company.plan !== 'starter' ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'
        }}
      >
        {company.plan}
      </span>
    )
  }));

  // Ajout de l'option "Ajouter une entreprise"
  options.push({
    id: 'add-company',
    label: 'Ajouter une entreprise',
    icon: <Plus size={16} style={{ color: '#5e72ff' }} />,
  });

  const handleSelect = (option: any) => {
    if (option.id === 'add-company') {
      console.log('Add new company');
      return;
    }
    
    const company = companies.find(c => c.id === option.id);
    if (company) {
      onCompanyChange(company);
    }
  };

  // Styles adaptatifs selon la taille
  const sizeStyles = {
    xs: {
      padding: '8px 12px',
      fontSize: '12px',
      minHeight: '36px'
    },
    sm: {
      padding: '10px 14px',
      fontSize: '13px',
      minHeight: '40px'
    },
    md: {
      padding: '12px 16px',
      fontSize: '14px',
      minHeight: '44px'
    },
    lg: {
      padding: '14px 18px',
      fontSize: '16px',
      minHeight: '48px'
    }
  };

  const currentStyle = sizeStyles[size];

  // Trigger du dropdown
  const trigger = (
    <button
      className={cn(
        'flex items-center justify-between w-full',
        'bg-white/80 backdrop-blur-sm',
        'border border-slate-200/60 rounded-xl',
        'hover:bg-white/90 hover:border-slate-300/60',
        'active:scale-98 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
        compact && 'rounded-lg',
        className
      )}
      style={{
        ...currentStyle,
        gap: compact ? '6px' : '8px'
      }}
    >
      {/* Partie gauche */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Building2 
          size={size === 'xs' ? 14 : size === 'sm' ? 16 : 18} 
          className="text-primary-500 flex-shrink-0" 
        />
        
        <div className="flex-1 min-w-0 text-left">
          <div 
            className="font-medium text-slate-900 truncate"
            style={{ fontSize: currentStyle.fontSize }}
          >
            {compact && currentCompany.name.length > 15
              ? `${currentCompany.name.substring(0, 15)}...`
              : currentCompany.name
            }
          </div>
          
          {!compact && currentCompany.country && (
            <div 
              className="text-slate-500 truncate"
              style={{ fontSize: `${parseInt(currentStyle.fontSize) - 2}px` }}
            >
              {currentCompany.country} · {currentCompany.currency}
            </div>
          )}
        </div>
      </div>

      {/* Partie droite */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Badge plan */}
        <span
          style={{
            padding: compact ? '2px 6px' : '3px 8px',
            fontSize: compact ? '9px' : '10px',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            borderRadius: '8px',
            background: getPlanColor(currentCompany.plan),
            color: getPlanTextColor(currentCompany.plan),
            boxShadow: currentCompany.plan !== 'starter' ? '0 1px 3px rgba(0, 0, 0, 0.15)' : 'none'
          }}
        >
          {compact ? currentCompany.plan.charAt(0).toUpperCase() : currentCompany.plan}
        </span>

        {/* Chevron */}
        <svg
          width={size === 'xs' ? 14 : 16}
          height={size === 'xs' ? 14 : 16}
          viewBox="0 0 16 16"
          fill="none"
          className="text-slate-400"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );

  return (
    <MobileDropdown
      options={options}
      selectedId={currentCompany.id}
      onSelect={handleSelect}
      trigger={trigger}
      title="Sélectionner une entreprise"
      searchable={companies.length > 5}
      placeholder="Rechercher une entreprise..."
      className={className}
    />
  );
};

export default CompanySelectorMobile;