'use client';

import React, { useState } from 'react';
import { CompanySelector, Company } from '@/components/ui/CompanySelector';
import { PeriodSelector } from '@/components/ui/PeriodSelector';
import { Dropdown, DropdownTrigger, DropdownMenu } from '@/components/ui/Dropdown';
import { DropdownItem } from '@/components/ui/DropdownItem';
import { DropdownSection, DropdownSeparator } from '@/components/ui/DropdownSection';
import { 
  Wand2, 
  User, 
  Settings, 
  LogOut, 
  Plus,
  FileText,
  Download,
  Upload,
  Send
} from 'lucide-react';

const mockCompanies: Company[] = [
  { id: '1', name: 'TechCorp SAS', plan: 'pro', country: 'FR', currency: 'EUR' },
  { id: '2', name: 'Design Studio', plan: 'starter', country: 'FR', currency: 'EUR' },
  { id: '3', name: 'Global Industries', plan: 'enterprise', country: 'US', currency: 'USD' },
  { id: '4', name: 'StartUp Innovation', plan: 'starter', country: 'UK', currency: 'GBP' },
  { id: '5', name: 'Creative Agency', plan: 'pro', country: 'DE', currency: 'EUR' },
  { id: '6', name: 'Tech Ventures', plan: 'enterprise', country: 'JP', currency: 'JPY' }
];

export default function TestDropdowns() {
  const [currentCompany, setCurrentCompany] = useState(mockCompanies[0]);
  const [selectedAction, setSelectedAction] = useState<string>('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Header avec fond glass */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-2xl border-b border-white/30 dark:border-white/10 z-40">
        <div className="h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              OKÉ Dropdowns
            </h1>
            
            {/* Selectors */}
            <div className="flex items-center gap-3">
              <CompanySelector
                companies={mockCompanies}
                currentCompany={currentCompany}
                onCompanyChange={setCurrentCompany}
                size="md"
              />
              
              <div className="w-px h-6 bg-neutral-200/50 dark:bg-neutral-700/50" />
              
              <PeriodSelector size="md" />
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Action Dropdown */}
            <Dropdown variant="action" size="md">
              <DropdownTrigger>
                <Wand2 className="w-4 h-4 text-secondary-500" />
                <span>Actions</span>
              </DropdownTrigger>
              
              <DropdownMenu align="right">
                <DropdownSection label="Documents">
                  <DropdownItem
                    icon={<FileText className="w-4 h-4" />}
                    onClick={() => setSelectedAction('report')}
                  >
                    Générer rapport
                  </DropdownItem>
                  <DropdownItem
                    icon={<Download className="w-4 h-4" />}
                    onClick={() => setSelectedAction('export')}
                  >
                    Exporter données
                  </DropdownItem>
                  <DropdownItem
                    icon={<Upload className="w-4 h-4" />}
                    onClick={() => setSelectedAction('import')}
                  >
                    Importer fichier
                  </DropdownItem>
                </DropdownSection>
                
                <DropdownSeparator />
                
                <DropdownSection label="Communications">
                  <DropdownItem
                    icon={<Send className="w-4 h-4" />}
                    onClick={() => setSelectedAction('send')}
                  >
                    Envoyer notification
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
            
            {/* User Dropdown */}
            <Dropdown variant="user" size="md">
              <DropdownTrigger className="!p-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-bold">
                  JD
                </div>
              </DropdownTrigger>
              
              <DropdownMenu align="right">
                <DropdownSection>
                  <div className="px-3 py-2">
                    <p className="font-semibold text-sm">Jean Dupont</p>
                    <p className="text-xs text-neutral-500">jean@techcorp.fr</p>
                  </div>
                </DropdownSection>
                
                <DropdownSeparator />
                
                <DropdownSection>
                  <DropdownItem icon={<User className="w-4 h-4" />}>
                    Mon profil
                  </DropdownItem>
                  <DropdownItem icon={<Settings className="w-4 h-4" />}>
                    Paramètres
                  </DropdownItem>
                </DropdownSection>
                
                <DropdownSeparator />
                
                <DropdownSection>
                  <DropdownItem 
                    icon={<LogOut className="w-4 h-4 text-red-500" />}
                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Déconnexion
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Demo Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Company Info Card */}
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <h3 className="text-lg font-semibold mb-4">Entreprise Actuelle</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Nom</span>
                  <span className="text-sm font-medium">{currentCompany.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Plan</span>
                  <span className={`
                    px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full
                    ${currentCompany.plan === 'enterprise' 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                      : currentCompany.plan === 'pro'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600'}
                  `}>
                    {currentCompany.plan}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Pays</span>
                  <span className="text-sm font-medium">{currentCompany.country}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Devise</span>
                  <span className="text-sm font-medium">{currentCompany.currency}</span>
                </div>
              </div>
            </div>
            
            {/* Action Info Card */}
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <h3 className="text-lg font-semibold mb-4">Dernière Action</h3>
              <div className="h-32 flex items-center justify-center">
                {selectedAction ? (
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-secondary-500/20 to-purple-500/20 flex items-center justify-center">
                      <Wand2 className="w-6 h-6 text-secondary-500" />
                    </div>
                    <p className="text-sm font-medium">{selectedAction}</p>
                  </div>
                ) : (
                  <p className="text-sm text-neutral-400">Aucune action sélectionnée</p>
                )}
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <h3 className="text-lg font-semibold mb-4">Statistiques</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Dropdowns</span>
                  <span className="text-sm font-bold text-primary-500">4 types</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Animations</span>
                  <span className="text-sm font-bold text-green-500">Liquid Glass</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Mobile</span>
                  <span className="text-sm font-bold text-secondary-500">Bottom Sheet</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Accessibilité</span>
                  <span className="text-sm font-bold text-amber-500">WCAG AAA</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Test different sizes */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/30 dark:border-white/10">
            <h3 className="text-lg font-semibold mb-6">Tailles de Dropdown</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Dropdown variant="default" size="xs">
                <DropdownTrigger>
                  <span>Size XS</span>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              
              <Dropdown variant="default" size="sm">
                <DropdownTrigger>
                  <span>Size SM</span>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              
              <Dropdown variant="default" size="md">
                <DropdownTrigger>
                  <span>Size MD</span>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              
              <Dropdown variant="default" size="lg">
                <DropdownTrigger>
                  <span>Size LG</span>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}