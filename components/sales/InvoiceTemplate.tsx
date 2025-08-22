'use client';

import React from 'react';
import { Invoice } from '@/lib/types/invoice';

interface InvoiceTemplateProps {
  invoice: Invoice;
  className?: string;
}

export default function InvoiceTemplate({ invoice, className = '' }: InvoiceTemplateProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className={`bg-white ${className}`}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .invoice-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 13px;
          line-height: 1.5;
          color: #1a1a1a;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .print-optimized {
          width: 21cm;
          min-height: 29.7cm;
          margin: 0 auto;
          padding: 1cm 1.2cm;
          box-sizing: border-box;
        }
        
        @media print {
          .print-optimized {
            width: 21cm;
            height: 29.7cm;
            padding: 1cm;
            page-break-after: always;
          }
        }
      `}</style>
      
      <div className="invoice-container print-optimized">
        {/* Header */}
        <header className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <div className="mb-3">
              {invoice.issuer.logo_url ? (
                <img 
                  src={invoice.issuer.logo_url} 
                  alt={invoice.issuer.name}
                  className="h-12 w-auto"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4C34CE] to-[#6246EA] rounded-lg flex items-center justify-center text-white font-semibold text-xl">
                    {invoice.issuer.logo_text || invoice.issuer.name.charAt(0)}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 tracking-tight">
                    {invoice.issuer.name}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <h1 className="text-3xl font-light text-gray-900 mb-3 tracking-tight">
              {invoice.title}
            </h1>
            <div className="flex gap-2 justify-end mb-3">
              <div className="inline-block px-3 py-1 bg-[#FAA016] text-white rounded-full text-xs font-semibold tracking-wide">
                {invoice.number}
              </div>
              {invoice.is_facturx && (
                <div className="inline-block px-3 py-1 bg-[#4C34CE] text-white rounded-full text-xs font-semibold tracking-wide">
                  Factur-X
                </div>
              )}
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              Émise le <strong className="text-gray-900">{formatDate(invoice.issue_date)}</strong><br />
              Échéance le <strong className="text-gray-900">{formatDate(invoice.due_date)}</strong>
            </div>
          </div>
        </header>

        {/* Parties */}
        <section className="grid grid-cols-2 gap-8 mb-10">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-xs uppercase tracking-wide text-[#4C34CE] font-semibold mb-2 flex items-center">
              <div className="w-1 h-1 bg-[#FAA016] rounded-full mr-2"></div>
              Émetteur
            </div>
            <div className="text-base font-semibold text-gray-900 mb-1 tracking-tight">
              {invoice.issuer.name}
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              {invoice.issuer.address_line1}<br />
              {invoice.issuer.address_line2 && <>{invoice.issuer.address_line2}<br /></>}
              {invoice.issuer.postal_code} {invoice.issuer.city} - {invoice.issuer.country}<br />
              {invoice.issuer.email && <>{invoice.issuer.email}<br /></>}
              {invoice.issuer.phone && <>{invoice.issuer.phone}<br /></>}
              {invoice.issuer.siren && (
                <><strong className="text-gray-800">SIREN</strong> {invoice.issuer.siren}<br /></>
              )}
              {invoice.issuer.vat_number && (
                <><strong className="text-gray-800">TVA</strong> {invoice.issuer.vat_number}</>
              )}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-xs uppercase tracking-wide text-[#4C34CE] font-semibold mb-2 flex items-center">
              <div className="w-1 h-1 bg-[#FAA016] rounded-full mr-2"></div>
              Client
            </div>
            <div className="text-base font-semibold text-gray-900 mb-1 tracking-tight">
              {invoice.client.name}
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              {invoice.client.address_line1}<br />
              {invoice.client.address_line2 && <>{invoice.client.address_line2}<br /></>}
              {invoice.client.postal_code} {invoice.client.city} - {invoice.client.country}<br />
              {invoice.client.email && <>{invoice.client.email}<br /></>}
              {invoice.client.siret && (
                <><strong className="text-gray-800">SIRET</strong> {invoice.client.siret}<br /></>
              )}
              {invoice.client.vat_number && (
                <><strong className="text-gray-800">TVA</strong> {invoice.client.vat_number}</>
              )}
            </div>
          </div>
        </section>

        {/* Items Table */}
        <section className="mb-8">
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Quantité
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Prix HT (€)
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    TVA
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Total HT (€)
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-100 last:border-b-0`}>
                    <td className="px-6 py-4 align-top">
                      <div className="font-medium text-gray-900 mb-1">
                        {item.description}
                      </div>
                      {item.details && item.details.length > 0 && (
                        <div className="text-sm text-gray-600 leading-relaxed">
                          {item.details.map((detail, idx) => (
                            <div key={idx}>{detail}</div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span className="text-sm text-gray-600">
                        {formatCurrency(item.quantity)} {item.unit}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right align-top">
                      <span className="text-sm text-gray-600">
                        {formatCurrency(item.unit_price)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right align-top">
                      <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium">
                        {item.vat_rate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right align-top font-medium">
                      {formatCurrency(item.total_ht)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Totals */}
        <section className="flex justify-between items-start mb-10">
          <div className="flex-1 max-w-sm">
            <h3 className="text-xs uppercase tracking-wide text-gray-600 font-semibold mb-3">
              Détails TVA
            </h3>
            {invoice.vat_groups.map((vat, index) => (
              <div key={index} className="flex justify-between py-1 text-sm text-gray-600">
                <span>TVA {vat.rate}% sur {formatCurrency(vat.base)} €</span>
                <span>{formatCurrency(vat.amount)} €</span>
              </div>
            ))}
          </div>
          
          <div className="w-80 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total HT</span>
                <span className="font-medium text-gray-900">{formatCurrency(invoice.total_ht)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total TVA</span>
                <span className="font-medium text-gray-900">{formatCurrency(invoice.total_vat)} €</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-gray-900">Total TTC</span>
                  <span className="font-bold text-[#4C34CE] tracking-tight">
                    {formatCurrency(invoice.total_ttc)} €
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Information */}
        {invoice.payment && (
          <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 mb-6 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-[#4C34CE] rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Informations de paiement
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-sm">
                <div className="text-gray-600 mb-1 text-xs">Mode de paiement</div>
                <div className="font-medium text-gray-900">{invoice.payment.method}</div>
              </div>
              {invoice.payment.bank_name && (
                <div className="text-sm">
                  <div className="text-gray-600 mb-1 text-xs">Établissement</div>
                  <div className="font-medium text-gray-900">{invoice.payment.bank_name}</div>
                </div>
              )}
              {invoice.payment.iban && (
                <div className="text-sm">
                  <div className="text-gray-600 mb-1 text-xs">IBAN</div>
                  <div className="font-medium text-gray-900 font-mono text-xs tracking-wide">
                    {invoice.payment.iban}
                  </div>
                </div>
              )}
              {invoice.payment.bic && (
                <div className="text-sm">
                  <div className="text-gray-600 mb-1 text-xs">BIC</div>
                  <div className="font-medium text-gray-900 font-mono text-xs tracking-wide">
                    {invoice.payment.bic}
                  </div>
                </div>
              )}
            </div>

            {invoice.payment.reference && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-xs text-gray-600 mb-2">
                  Merci d'inclure la référence dans le libellé de votre virement
                </div>
                <div className="font-semibold text-[#4C34CE] font-mono text-base tracking-wider">
                  {invoice.payment.reference}
                </div>
              </div>
            )}

            {invoice.payment.check_order && (
              <div className="mt-4 text-sm text-gray-600 italic">
                <strong>Paiement par chèque :</strong> À l'ordre de {invoice.payment.check_order}<br />
                <em>Aucun escompte ne sera accordé en cas de règlement anticipé.</em>
              </div>
            )}
          </section>
        )}

        {/* Footer */}
        <footer className="text-center text-xs text-gray-500 leading-relaxed border-t border-gray-200 pt-4">
          <div>
            {invoice.late_penalty_rate && (
              <>En cas de retard de paiement, pénalités appliquées au taux légal</>
            )}
            {invoice.recovery_indemnity && (
              <>{invoice.late_penalty_rate ? ' et' : 'En cas de retard de paiement,'} indemnité forfaitaire de {invoice.recovery_indemnity} € pour frais de recouvrement</>
            )}
            {(invoice.late_penalty_rate || invoice.recovery_indemnity) && '.'}
          </div>
          {invoice.notes && (
            <div className="mt-2 text-gray-600">
              {invoice.notes}
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}