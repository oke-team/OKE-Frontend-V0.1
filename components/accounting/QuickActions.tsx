'use client';

import React, { memo } from 'react';
import { FileText, DollarSign, Eye } from 'lucide-react';
import { ClientDetail } from '@/types/accounting';

interface QuickActionsProps {
  client: ClientDetail;
  onActionClick: (action: string, data?: unknown) => void;
}

const QuickActions = memo<QuickActionsProps>(({ client, onActionClick }) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onActionClick('new_invoice', client)}
        className="flex-1 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 flex items-center justify-center gap-2"
      >
        <FileText className="w-4 h-4" />
        Nouvelle facture
      </button>
      <button
        onClick={() => onActionClick('record_payment', client)}
        className="flex-1 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 flex items-center justify-center gap-2"
      >
        <DollarSign className="w-4 h-4" />
        Enregistrer paiement
      </button>
      <button
        onClick={() => onActionClick('view_history', client)}
        className="flex-1 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 flex items-center justify-center gap-2"
      >
        <Eye className="w-4 h-4" />
        Historique complet
      </button>
    </div>
  );
});

QuickActions.displayName = 'QuickActions';

export default QuickActions;