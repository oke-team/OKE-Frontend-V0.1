'use client';

import React from 'react';
import { CalendarDays, Clock, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dropdown, DropdownTrigger, DropdownMenu } from './Dropdown';
import { DropdownItem } from './DropdownItem';
import { DropdownSection } from './DropdownSection';
import { usePeriod, Period } from '@/contexts/PeriodContext';

interface PeriodSelectorProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  size = 'md',
  className,
}) => {
  const { currentPeriod, periods, setPeriod } = usePeriod();

  const getIcon = (type: string, isHover: boolean = false) => {
    const iconClass = cn(
      'w-4 h-4 text-green-500',
      'transition-all duration-300',
      isHover && 'text-green-600 animate-pulse-once'
    );
    
    switch(type) {
      case 'exercise': return <CalendarDays className={iconClass} />;
      case 'situation': return <Clock className={iconClass} />;
      case 'custom': return <TrendingUp className={iconClass} />;
      default: return <CalendarDays className={iconClass} />;
    }
  };

  const formatLabel = (period: Period) => {
    if (period.type === 'exercise') {
      return period.label.split(' ')[1]; // Just the year
    }
    return period.label;
  };

  const formatSublabel = (period: Period) => {
    if (period.type === 'exercise') {
      return period.startDate.getFullYear().toString();
    }
    if (period.type === 'situation') {
      return `Au ${period.endDate.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}`;
    }
    return `${period.startDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - ${period.endDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  };

  const groupedPeriods = {
    exercise: periods.filter(p => p.type === 'exercise'),
    situation: periods.filter(p => p.type === 'situation'),
    custom: periods.filter(p => p.type === 'custom'),
  };

  return (
    <Dropdown variant="period" size={size} value={currentPeriod.id}>
      <DropdownTrigger className={cn('min-w-[140px] md:min-w-[160px]', className)}>
        <div className="flex items-center gap-2.5 flex-1">
          {getIcon(currentPeriod.type, false)}
          <span className="font-medium">{formatLabel(currentPeriod)}</span>
        </div>
      </DropdownTrigger>
      
      <DropdownMenu align="left" className="min-w-[260px]">
        {/* Exercices */}
        {groupedPeriods.exercise.length > 0 && (
          <DropdownSection label="Exercices">
            {groupedPeriods.exercise.map(period => (
              <DropdownItem
                key={period.id}
                value={period.id}
                selected={currentPeriod.id === period.id}
                onClick={() => setPeriod(period)}
                icon={<CalendarDays className="w-4 h-4 text-green-500/70" />}
                sublabel={formatSublabel(period)}
              >
                {period.label}
              </DropdownItem>
            ))}
          </DropdownSection>
        )}
        
        {/* Situations */}
        {groupedPeriods.situation.length > 0 && (
          <DropdownSection label="Situations">
            {groupedPeriods.situation.map(period => (
              <DropdownItem
                key={period.id}
                value={period.id}
                selected={currentPeriod.id === period.id}
                onClick={() => setPeriod(period)}
                icon={<Clock className="w-4 h-4 text-green-500/70" />}
                sublabel={formatSublabel(period)}
              >
                {period.label}
              </DropdownItem>
            ))}
          </DropdownSection>
        )}
        
        {/* Custom periods */}
        {groupedPeriods.custom.length > 0 && (
          <DropdownSection label="Personnalisé">
            {groupedPeriods.custom.map(period => (
              <DropdownItem
                key={period.id}
                value={period.id}
                selected={currentPeriod.id === period.id}
                onClick={() => setPeriod(period)}
                icon={<TrendingUp className="w-4 h-4 text-green-500/70" />}
                sublabel={formatSublabel(period)}
              >
                {period.label}
              </DropdownItem>
            ))}
          </DropdownSection>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};