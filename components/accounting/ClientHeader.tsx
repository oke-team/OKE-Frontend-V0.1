'use client';

import React, { memo } from 'react';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { ClientDetail, TransactionTotals } from '@/types/accounting';
import { useExpertMode } from '@/contexts/ExpertModeContext';

interface ClientHeaderProps {
  client: ClientDetail;
  totals: TransactionTotals;
  onBack: () => void;
  onActionClick?: (action: string, data?: unknown) => void;
}

const ClientHeader = memo<ClientHeaderProps>(({ 
  client, 
  totals, 
  onBack, 
  onActionClick 
}) => {
  const { formatAmount } = useExpertMode();

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            {/* Avatar avec initiales */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold ${
              client.color || 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}>
              {client.initials}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold">{client.name}</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-neutral-600">
                {client.email && (
                  <a href={`mailto:${client.email}`} className="flex items-center gap-1 hover:text-primary-600">
                    <Mail className="w-4 h-4" />
                    {client.email}
                  </a>
                )}
                {client.phone && (
                  <a href={`tel:${client.phone}`} className="flex items-center gap-1 hover:text-primary-600">
                    <Phone className="w-4 h-4" />
                    {client.phone}
                  </a>
                )}
              </div>
              {client.customerSince && (
                <div className="text-xs text-neutral-500 mt-2">
                  Client depuis {client.customerSince}
                </div>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-neutral-500">
              {client.type === 'supplier' 
                ? (totals.balance > 0 ? 'Vous devez' : totals.balance < 0 ? 'Crédit' : 'Solde')
                : (totals.balance > 0 ? 'Vous doit' : totals.balance < 0 ? 'Trop payé' : 'Solde')
              }
            </div>
            <div className={`text-3xl font-bold ${
              client.type === 'supplier'
                ? (totals.balance > 0 ? 'text-orange-600' : totals.balance < 0 ? 'text-green-600' : 'text-neutral-600')
                : (totals.balance > 0 ? 'text-red-600' : totals.balance < 0 ? 'text-blue-600' : 'text-neutral-600')
            }`}>
              {formatAmount(Math.abs(totals.balance))}
            </div>
            
            {totals.balance > 0 && (
              <button
                onClick={() => onActionClick?.(client.type === 'supplier' ? 'pay_supplier' : 'send_reminder', client)}
                className={`mt-3 px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2 mx-auto ${
                  client.type === 'supplier' 
                    ? 'bg-orange-600 hover:bg-orange-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                <Mail className="w-4 h-4" />
                {client.type === 'supplier' ? 'Payer le fournisseur' : 'Relancer le client'}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Stats rapides */}
      <div className="border-t border-neutral-100 px-6 py-3 bg-neutral-50">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-xs text-neutral-500">Total factures</div>
            <div className="text-lg font-semibold">{formatAmount(totals.totalDebits)}</div>
          </div>
          <div>
            <div className="text-xs text-neutral-500">Total paiements</div>
            <div className="text-lg font-semibold text-green-600">{formatAmount(totals.totalCredits)}</div>
          </div>
          <div>
            <div className="text-xs text-neutral-500">Dernière activité</div>
            <div className="text-lg font-semibold">{client.lastActivity || 'Aujourd\'hui'}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

ClientHeader.displayName = 'ClientHeader';

export default ClientHeader;