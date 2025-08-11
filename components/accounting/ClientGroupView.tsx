'use client';

import React, { useState, useCallback } from 'react';
import { useExpertMode } from '@/contexts/ExpertModeContext';
import { TransactionDetail, ClientGroup } from '@/types/accounting';
import ClientGroupItem from './ClientGroupItem';

// Types importés depuis /types/accounting.ts

interface ClientGroupViewProps {
  groups: ClientGroup[];
  category: 'receivables' | 'payables';
  onActionClick?: (action: string, group: ClientGroup) => void;
}

export default function ClientGroupView({ 
  groups, 
  category,
  onActionClick 
}: ClientGroupViewProps) {
  const { formatAmount, expertMode } = useExpertMode();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Optimisation: Handler avec useCallback
  const toggleGroup = useCallback((groupId: string) => {
    setExpandedGroups(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(groupId)) {
        newExpanded.delete(groupId);
      } else {
        newExpanded.add(groupId);
      }
      return newExpanded;
    });
  }, []);

  // Optimisation: Handler d'action avec useCallback
  const handleActionClick = useCallback((action: string, group: ClientGroup, event?: React.MouseEvent) => {
    event?.stopPropagation();
    onActionClick?.(action, group);
  }, [onActionClick]);

  // Les fonctions utilitaires sont maintenant dans ClientGroupItem

  return (
    <div className="space-y-3">
      {groups.map((group) => {
        const isExpanded = expandedGroups.has(group.id);
        const isReceivable = category === 'receivables';

        return (
          <ClientGroupItem
            key={group.id}
            group={group}
            isExpanded={isExpanded}
            isReceivable={isReceivable}
            onToggle={toggleGroup}
            onActionClick={handleActionClick}
            expertMode={expertMode}
          />
        );
      })}
    </div>
  );
}