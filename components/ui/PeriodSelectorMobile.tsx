'use client';

import React from 'react';
import { CalendarDays, Clock, TrendingUp, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import MobileDropdown from './MobileDropdown';
import { usePeriod, Period } from '@/contexts/PeriodContext';

interface PeriodSelectorMobileProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  compact?: boolean;
  className?: string;
}

export const PeriodSelectorMobile: React.FC<PeriodSelectorMobileProps> = ({
  size = 'md',
  compact = false,
  className
}) => {
  const { currentPeriod, periods, setPeriod } = usePeriod();

  const getIcon = (type: string, size: number = 16) => {
    const iconClass = 'text-emerald-500';
    
    switch(type) {
      case 'exercise': 
        return <CalendarDays size={size} className={iconClass} />;
      case 'situation': 
        return <Clock size={size} className={iconClass} />;
      case 'custom': 
        return <TrendingUp size={size} className={iconClass} />;
      default: 
        return <CalendarDays size={size} className={iconClass} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'exercise': return 'Exercice';
      case 'situation': return 'Situation';
      case 'custom': return 'Personnalisé';
      default: return 'Période';
    }
  };

  const formatSublabel = (period: Period) => {
    if (period.type === 'exercise') {
      return `${period.startDate.getFullYear()} - ${period.endDate.getFullYear()}`;
    }
    if (period.type === 'situation') {
      return `Au ${period.endDate.toLocaleDateString('fr-FR', { 
        day: 'numeric',
        month: 'long', 
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

  const formatDisplayLabel = (period: Period) => {
    if (period.type === 'exercise') {
      // Juste l'année pour les exercices
      return period.startDate.getFullYear().toString();
    }
    return period.label;
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

  // Conversion en options pour MobileDropdown avec sections
  const options: any[] = [];
  
  // Ajout des exercices
  if (groupedPeriods.exercise?.length > 0) {
    options.push({
      id: '__section_exercise',
      label: '━━━━━ EXERCICES ━━━━━',
      disabled: true,
      sublabel: `${groupedPeriods.exercise.length} disponible(s)`
    });
    
    groupedPeriods.exercise.forEach((period: Period) => {
      options.push({
        id: period.id,
        label: period.label,
        sublabel: formatSublabel(period),
        icon: getIcon(period.type),
        badge: period.isCurrent && (
          <span className="px-2 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full">
            Actuel
          </span>
        )
      });
    });
  }

  // Ajout des situations
  if (groupedPeriods.situation?.length > 0) {
    options.push({
      id: '__section_situation',
      label: '━━━━━ SITUATIONS ━━━━━',
      disabled: true,
      sublabel: `${groupedPeriods.situation.length} disponible(s)`
    });
    
    groupedPeriods.situation.forEach((period: Period) => {
      options.push({
        id: period.id,
        label: period.label,
        sublabel: formatSublabel(period),
        icon: getIcon(period.type),
      });
    });
  }

  // Ajout des périodes personnalisées
  if (groupedPeriods.custom?.length > 0) {
    options.push({
      id: '__section_custom',
      label: '━━━━━ PERSONNALISÉ ━━━━━',
      disabled: true,
      sublabel: `${groupedPeriods.custom.length} créée(s)`
    });
    
    groupedPeriods.custom.forEach((period: Period) => {
      options.push({
        id: period.id,
        label: period.label,
        sublabel: formatSublabel(period),
        icon: getIcon(period.type),
      });
    });
  }

  // Ajout de l'option pour créer une nouvelle période
  options.push({
    id: 'add-period',
    label: 'Créer une nouvelle période',
    icon: <Plus size={16} className="text-emerald-500" />,
  });

  const handleSelect = (option: any) => {
    if (option.id === 'add-period') {
      console.log('Create new period');
      return;
    }
    
    if (option.id.startsWith('__section_')) {
      return; // Ignore les sections
    }
    
    const period = periods.find(p => p.id === option.id);
    if (period) {
      setPeriod(period);
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
        'bg-emerald-50/80 backdrop-blur-sm',
        'border border-emerald-200/60 rounded-xl',
        'hover:bg-emerald-50/90 hover:border-emerald-300/60',
        'active:scale-98 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-emerald-500/20',
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
        {getIcon(currentPeriod.type, size === 'xs' ? 14 : size === 'sm' ? 16 : 18)}
        
        <div className="flex-1 min-w-0 text-left">
          <div 
            className="font-medium text-slate-900 truncate"
            style={{ fontSize: currentStyle.fontSize }}
          >
            {compact 
              ? formatDisplayLabel(currentPeriod)
              : currentPeriod.label
            }
          </div>
          
          {!compact && (
            <div 
              className="text-slate-600 truncate"
              style={{ fontSize: `${parseInt(currentStyle.fontSize) - 2}px` }}
            >
              {getTypeLabel(currentPeriod.type)} · {formatSublabel(currentPeriod)}
            </div>
          )}
        </div>
      </div>

      {/* Partie droite */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Badge actuel */}
        {currentPeriod.isCurrent && (
          <span
            style={{
              padding: compact ? '2px 6px' : '3px 8px',
              fontSize: compact ? '8px' : '9px',
              fontWeight: 600,
              textTransform: 'uppercase' as const,
              borderRadius: '6px',
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              color: '#15803d'
            }}
          >
            {compact ? '●' : 'ACTUEL'}
          </span>
        )}

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
      selectedId={currentPeriod.id}
      onSelect={handleSelect}
      trigger={trigger}
      title="Sélectionner une période"
      searchable={periods.length > 8}
      placeholder="Rechercher une période..."
      fullscreen={true} // Fullscreen pour les périodes car plus de contenu
      className={className}
    />
  );
};

export default PeriodSelectorMobile;