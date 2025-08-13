'use client';

import React from 'react';
import { Building2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dropdown, DropdownTrigger, DropdownMenu } from './Dropdown';
import { DropdownItem } from './DropdownItem';
import { DropdownSection, DropdownSeparator } from './DropdownSection';

export interface Company {
  id: string;
  name: string;
  logo?: string;
  plan: 'starter' | 'pro' | 'enterprise';
  country?: string;
  currency?: string;
}

interface CompanySelectorProps {
  companies: Company[];
  currentCompany: Company;
  onCompanyChange: (company: Company) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const CompanySelector: React.FC<CompanySelectorProps> = ({
  companies,
  currentCompany,
  onCompanyChange,
  size = 'md',
}) => {
  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_2px_8px_rgba(245,158,11,0.25)]';
      case 'pro':
        return 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-[0_2px_8px_rgba(94,114,255,0.25)]';
      default:
        return 'bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400';
    }
  };

  return (
    <Dropdown variant="company" size={size} value={currentCompany.id}>
      <DropdownTrigger className="min-w-[180px] md:min-w-[200px]">
        <div className="flex items-center gap-2.5 flex-1">
          <Building2 className="w-4 h-4 text-primary-500 transition-transform duration-300 group-hover:rotate-[5deg] group-hover:scale-110" />
          <span className="truncate max-w-[120px] md:max-w-[150px] font-medium">{currentCompany.name}</span>
        </div>
      </DropdownTrigger>
      
      <DropdownMenu align="left" className="min-w-[280px]">
        <DropdownSection>
          {companies.map((company) => (
            <DropdownItem
              key={company.id}
              value={company.id}
              selected={currentCompany.id === company.id}
              onClick={() => onCompanyChange(company)}
              icon={<Building2 className="w-4 h-4 text-primary-500/70" />}
              sublabel={company.country && company.currency ? `${company.country} · ${company.currency}` : undefined}
              badge={
                <span className={cn(
                  'px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full',
                  'transition-all duration-300',
                  company.plan === 'enterprise' && 'animate-pulse-subtle',
                  getPlanColor(company.plan)
                )}>
                  {company.plan}
                </span>
              }
            >
              {company.name}
            </DropdownItem>
          ))}
        </DropdownSection>
        
        <DropdownSeparator />
        
        <DropdownSection>
          <DropdownItem
            icon={<Plus className="w-4 h-4 text-neutral-500" />}
            onClick={() => console.log('Add company')}
            className="hover:bg-primary-50/50 dark:hover:bg-primary-900/20"
          >
            Ajouter une entreprise
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};