'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TierAvatar as TierAvatarType } from '@/lib/mock-data/tiers-avatars';

interface TierAvatarProps {
  tier: TierAvatarType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
  showCategory?: boolean;
  className?: string;
}

export const TierAvatar: React.FC<TierAvatarProps> = ({
  tier,
  size = 'md',
  showName = false,
  showCategory = false,
  className
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const emojiSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-semibold text-white shadow-sm",
          sizeClasses[size],
          tier.color,
          "relative overflow-hidden"
        )}
      >
        {/* Effet de gradient subtil */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        
        {/* Logo ou initiales */}
        {tier.logo && tier.logo.length <= 2 ? (
          <span className={cn("relative z-10", emojiSizeClasses[size])}>{tier.logo}</span>
        ) : (
          <span className="relative z-10">{tier.initials}</span>
        )}
      </div>

      {(showName || showCategory) && (
        <div className="flex flex-col">
          {showName && (
            <span className={cn("font-medium text-gray-900", textSizeClasses[size])}>
              {tier.name}
            </span>
          )}
          {showCategory && tier.category && (
            <span className={cn("text-gray-500", 
              size === 'xs' || size === 'sm' ? 'text-xs' : 'text-sm'
            )}>
              {tier.category}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Composant pour afficher plusieurs avatars groupés
interface TierAvatarGroupProps {
  tiers: TierAvatarType[];
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const TierAvatarGroup: React.FC<TierAvatarGroupProps> = ({
  tiers,
  max = 3,
  size = 'sm',
  className
}) => {
  const visibleTiers = tiers.slice(0, max);
  const remainingCount = tiers.length - max;

  const overlapClasses = {
    xs: '-ml-2',
    sm: '-ml-3',
    md: '-ml-4',
    lg: '-ml-5',
    xl: '-ml-6'
  };

  return (
    <div className={cn("flex items-center", className)}>
      {visibleTiers.map((tier, index) => (
        <div
          key={tier.id}
          className={cn(
            "relative",
            index > 0 && overlapClasses[size],
            "transition-transform hover:z-10 hover:scale-110"
          )}
          style={{ zIndex: visibleTiers.length - index }}
        >
          <TierAvatar tier={tier} size={size} />
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div
          className={cn(
            "rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600",
            overlapClasses[size],
            size === 'xs' && 'w-6 h-6 text-xs',
            size === 'sm' && 'w-8 h-8 text-xs',
            size === 'md' && 'w-10 h-10 text-sm',
            size === 'lg' && 'w-12 h-12 text-base',
            size === 'xl' && 'w-16 h-16 text-lg'
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};