'use client';

import React, { useState, useEffect } from 'react';
import { Building2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  onAddCompany?: () => void;
}

export const CompanySelectorLiquid: React.FC<CompanySelectorLiquidProps> = ({
  companies,
  currentCompany,
  onCompanyChange,
  size = 'md',
  fullWidth = false,
  className,
  onAddCompany
}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const getPlanBadge = (plan: string) => {
    const styles = {
      enterprise: {
        background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        color: 'white',
        text: 'ENTERPRISE'
      },
      pro: {
        background: '#FAA016',
        color: 'white',
        text: 'PRO'
      },
      starter: {
        background: '#e5e7eb',
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
        icon={<Building2 size={16} style={{ color: '#4C34CE' }} />}
        badge={!isMobile ? getPlanBadge(currentCompany.plan) : undefined}
        sublabel={!isMobile ? `${currentCompany.country || 'FR'} · ${currentCompany.currency || 'EUR'}` : undefined}
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
        
        {onAddCompany && (
          <DropdownItem
            onClick={onAddCompany}
            icon={<Plus size={16} className="text-primary" />}
          >
            Ajouter une entreprise
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};