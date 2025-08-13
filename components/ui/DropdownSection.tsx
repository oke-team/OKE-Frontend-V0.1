'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface DropdownSectionProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

export const DropdownSection: React.FC<DropdownSectionProps> = ({
  children,
  label,
  className,
}) => {
  return (
    <div className={cn('py-1', className)}>
      {label && (
        <div className="px-3 py-2 text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          {label}
        </div>
      )}
      {children}
    </div>
  );
};

export const DropdownSeparator: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn(
      'h-px bg-neutral-200/50 dark:bg-neutral-700/50',
      'my-1.5',
      className
    )} />
  );
};