'use client';

import React from 'react';
import { Building2, Plus } from 'lucide-react';
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  DropdownSeparator 
} from './DropdownLiquid';

export interface Company {
  id: string;
  name: string;
  logo?: string;
  plan: 'starter' | 'pro' | 'enterprise';
  country?: string;
  currency?: string;
}

interface CompanySelectorLiquidProps {
  companies: Company[];
  currentCompany: Company;
  onCompanyChange: (company: Company) => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export const CompanySelectorLiquid: React.FC<CompanySelectorLiquidProps> = ({
  companies,
  currentCompany,
  onCompanyChange,
  size = 'md',
  fullWidth = false,
  className
}) => {
  const getPlanBadge = (plan: string) => {
    const styles = {
      enterprise: {
        background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        color: 'white',
        text: 'ENTERPRISE'
      },
      pro: {
        background: 'linear-gradient(135deg, #5e72ff 0%, #d150da 100%)',
        color: 'white',
        text: 'PRO'
      },
      starter: {
        background: 'rgba(229, 231, 235, 0.5)',
        color: '#6b7280',
        text: 'STARTER'
      }
    };
    
    const style = styles[plan as keyof typeof styles];
    
    return (
      <span
        style={{
          padding: '3px 8px',
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          borderRadius: '12px',
          background: style.background,
          color: style.color,
          boxShadow: plan !== 'starter' ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'
        }}
      >
        {style.text}
      </span>
    );
  };
  
  return (
    <Dropdown 
      variant="primary" 
      size={size}
      fullWidth={fullWidth}
      className={className}
    >
      <DropdownTrigger
        icon={<Building2 size={16} className="text-primary-500" />}
        badge={getPlanBadge(currentCompany.plan)}
        sublabel={`${currentCompany.country || 'FR'} · ${currentCompany.currency || 'EUR'}`}
      >
        {currentCompany.name}
      </DropdownTrigger>
      
      <DropdownMenu>
        {companies.map((company) => (
          <DropdownItem
            key={company.id}
            onClick={() => onCompanyChange(company)}
            icon={<Building2 size={16} />}
            badge={getPlanBadge(company.plan)}
            sublabel={`${company.country || 'FR'} · ${company.currency || 'EUR'}`}
            selected={company.id === currentCompany.id}
          >
            {company.name}
          </DropdownItem>
        ))}
        
        <DropdownSeparator />
        
        <DropdownItem
          onClick={() => console.log('Add company')}
          icon={<Plus size={16} className="text-primary-500" />}
        >
          Ajouter une entreprise
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};