'use client';

import React from 'react';
import { Calendar, CalendarDays, Clock, TrendingUp, Plus } from 'lucide-react';
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  DropdownSection,
  DropdownSeparator 
} from './DropdownLiquid';
import { usePeriod, Period } from '@/contexts/PeriodContext';

interface PeriodSelectorLiquidProps {
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export const PeriodSelectorLiquid: React.FC<PeriodSelectorLiquidProps> = ({
  size = 'md',
  fullWidth = false,
  className
}) => {
  const { currentPeriod, periods, setPeriod } = usePeriod();
  
  const getIcon = (type: string) => {
    switch(type) {
      case 'exercise': 
        return <CalendarDays size={16} className="text-emerald-500" />;
      case 'situation': 
        return <Clock size={16} className="text-emerald-500" />;
      case 'custom': 
        return <TrendingUp size={16} className="text-emerald-500" />;
      default: 
        return <Calendar size={16} className="text-emerald-500" />;
    }
  };
  
  const formatSublabel = (period: Period) => {
    if (period.type === 'exercise') {
      return `${period.startDate.getFullYear()} - ${period.endDate.getFullYear()}`;
    }
    if (period.type === 'situation') {
      return `Au ${period.endDate.toLocaleDateString('fr-FR', { 
        day: 'numeric',
        month: 'short', 
        year: 'numeric' 
      })}`;
    }
    return `${period.startDate.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short' 
    })} - ${period.endDate.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })}`;
  };
  
  const getCurrentBadge = () => {
    if (!currentPeriod.isCurrent) return null;
    
    return (
      <span
        style={{
          padding: '3px 8px',
          fontSize: '10px',
          fontWeight: 600,
          textTransform: 'uppercase' as const,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
          color: '#15803d',
          border: '1px solid rgba(34, 197, 94, 0.2)'
        }}
      >
        ACTUEL
      </span>
    );
  };
  
  // Grouper les périodes par type
  const groupedPeriods = periods.reduce((groups: any, period) => {
    const type = period.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(period);
    return groups;
  }, {});
  
  return (
    <Dropdown 
      variant="success" 
      size={size}
      fullWidth={fullWidth}
      className={className}
    >
      <DropdownTrigger
        icon={getIcon(currentPeriod.type)}
        badge={getCurrentBadge()}
        sublabel={formatSublabel(currentPeriod)}
      >
        {currentPeriod.label}
      </DropdownTrigger>
      
      <DropdownMenu>
        {/* Exercices */}
        {groupedPeriods.exercise?.length > 0 && (
          <DropdownSection label="Exercices">
            {groupedPeriods.exercise.map((period: Period) => (
              <DropdownItem
                key={period.id}
                onClick={() => setPeriod(period)}
                icon={getIcon(period.type)}
                badge={period.isCurrent ? (
                  <span className="text-xs font-semibold text-emerald-600">
                    ACTUEL
                  </span>
                ) : null}
                sublabel={formatSublabel(period)}
                selected={period.id === currentPeriod.id}
              >
                {period.label}
              </DropdownItem>
            ))}
          </DropdownSection>
        )}
        
        {/* Situations */}
        {groupedPeriods.situation?.length > 0 && (
          <>
            {groupedPeriods.exercise?.length > 0 && <DropdownSeparator />}
            <DropdownSection label="Situations">
              {groupedPeriods.situation.map((period: Period) => (
                <DropdownItem
                  key={period.id}
                  onClick={() => setPeriod(period)}
                  icon={getIcon(period.type)}
                  sublabel={formatSublabel(period)}
                  selected={period.id === currentPeriod.id}
                >
                  {period.label}
                </DropdownItem>
              ))}
            </DropdownSection>
          </>
        )}
        
        {/* Personnalisées */}
        {groupedPeriods.custom?.length > 0 && (
          <>
            <DropdownSeparator />
            <DropdownSection label="Personnalisé">
              {groupedPeriods.custom.map((period: Period) => (
                <DropdownItem
                  key={period.id}
                  onClick={() => setPeriod(period)}
                  icon={getIcon(period.type)}
                  sublabel={formatSublabel(period)}
                  selected={period.id === currentPeriod.id}
                >
                  {period.label}
                </DropdownItem>
              ))}
            </DropdownSection>
          </>
        )}
        
        <DropdownSeparator />
        
        <DropdownItem
          onClick={() => console.log('Create custom period')}
          icon={<Plus size={16} className="text-emerald-500" />}
        >
          Créer une période personnalisée
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};