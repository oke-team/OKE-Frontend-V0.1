/**
 * Données mock pour le module Banque
 * Transactions bancaires réalistes avec tous les champs nécessaires
 */

export type TypePaiement = 'virement' | 'carte' | 'cheque' | 'especes' | 'prelevement' | 'remise_cheques';
export type Devise = 'EUR' | 'USD' | 'GBP' | 'CHF';
export type Banque = 'BNP' | 'SG' | 'CA' | 'LCL' | 'CE' | 'CM' | 'HSBC' | 'BP' | 'CIC' | 'LaPoste';
export type StatutRapprochement = 'rapproche' | 'en_attente' | 'non_rapproche';

export interface BankTransactionExtended {
  id: string;
  date: string;
  montant: number;
  montantEUR?: number;
  devise: Devise;
  typePaiement: TypePaiement;
  justificatif?: {
    url: string;
    type: 'pdf' | 'image';
    nom: string;
  };
  libelleComplet: string;
  lienComptable?: {
    codeCompte: string;
    ecritureJournal?: string;
  };
  contrepartie: string;
  banqueIcone: Banque;
  codeLettrage?: string;
  numeroCompte: string;
  nomCompte: string;
  statut: StatutRapprochement;
  categorie: string;
  tags?: string[];
  soldeProgressif?: number;
}

// Fonction helper pour générer des dates
const generateDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

// Fonction helper pour générer un code lettrage
const generateLettrage = (index: number): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[Math.floor(index / 100) % 26] + letters[Math.floor(index / 10) % 26] + (index % 10);
};

// Transactions mock réalistes
export const bankTransactions: BankTransactionExtended[] = [
  // Transactions récentes
  {
    id: 'bt-001',
    date: generateDate(0),
    montant: -1245.67,
    devise: 'EUR',
    typePaiement: 'virement',
    justificatif: {
      url: '/documents/facture-fournisseur-001.pdf',
      type: 'pdf',
      nom: 'Facture EDF Janvier 2024'
    },
    libelleComplet: 'VIREMENT SEPA EDF ENTREPRISES - Facture électricité janvier 2024',
    lienComptable: {
      codeCompte: '606100',
      ecritureJournal: 'ACH-2024-001'
    },
    contrepartie: 'EDF ENTREPRISES',
    banqueIcone: 'BNP',
    codeLettrage: 'AA1',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Charges',
    tags: ['Énergie', 'Charges fixes']
  },
  {
    id: 'bt-002',
    date: generateDate(1),
    montant: 8500.00,
    devise: 'EUR',
    typePaiement: 'virement',
    libelleComplet: 'VIREMENT RECU - CLIENT DUPONT SA - Règlement facture FA-2024-0156',
    lienComptable: {
      codeCompte: '411000',
      ecritureJournal: 'VTE-2024-156'
    },
    contrepartie: 'DUPONT SA',
    banqueIcone: 'BNP',
    codeLettrage: 'AB2',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Ventes',
    tags: ['Client', 'Règlement']
  },
  {
    id: 'bt-003',
    date: generateDate(2),
    montant: -156.45,
    devise: 'EUR',
    typePaiement: 'carte',
    libelleComplet: 'CB AMAZON WEB SERVICES - Hébergement cloud mensuel',
    lienComptable: {
      codeCompte: '626700'
    },
    contrepartie: 'AMAZON WEB SERVICES',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'en_attente',
    categorie: 'Services',
    tags: ['IT', 'Abonnement']
  },
  {
    id: 'bt-004',
    date: generateDate(3),
    montant: -2500.00,
    devise: 'EUR',
    typePaiement: 'prelevement',
    justificatif: {
      url: '/documents/loyer-janvier-2024.pdf',
      type: 'pdf',
      nom: 'Quittance loyer Janvier 2024'
    },
    libelleComplet: 'PRELEVEMENT SEPA SCI IMMOBILIERE PARIS - Loyer bureaux janvier 2024',
    lienComptable: {
      codeCompte: '613200',
      ecritureJournal: 'OD-2024-001'
    },
    contrepartie: 'SCI IMMOBILIERE PARIS',
    banqueIcone: 'BNP',
    codeLettrage: 'AC3',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Immobilier',
    tags: ['Loyer', 'Charges fixes']
  },
  {
    id: 'bt-005',
    date: generateDate(4),
    montant: 15678.90,
    devise: 'EUR',
    typePaiement: 'virement',
    justificatif: {
      url: '/documents/facture-client-002.pdf',
      type: 'pdf',
      nom: 'Facture FA-2024-0157'
    },
    libelleComplet: 'VIREMENT RECU - MARTIN INDUSTRIES - Acompte projet développement',
    lienComptable: {
      codeCompte: '411000',
      ecritureJournal: 'VTE-2024-157'
    },
    contrepartie: 'MARTIN INDUSTRIES',
    banqueIcone: 'SG',
    codeLettrage: 'AD4',
    numeroCompte: 'FR76 3000 3008 0400 0207 2835 847',
    nomCompte: 'Compte Société Générale',
    statut: 'rapproche',
    categorie: 'Ventes',
    tags: ['Client', 'Acompte', 'Projet']
  },
  {
    id: 'bt-006',
    date: generateDate(5),
    montant: -450.00,
    devise: 'EUR',
    typePaiement: 'cheque',
    libelleComplet: 'CHEQUE N°0001234 - SARL MAINTENANCE INFO - Intervention technique',
    lienComptable: {
      codeCompte: '615500'
    },
    contrepartie: 'SARL MAINTENANCE INFO',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'non_rapproche',
    categorie: 'Maintenance',
    tags: ['Informatique', 'Prestataire']
  },
  {
    id: 'bt-007',
    date: generateDate(6),
    montant: -89.99,
    devise: 'EUR',
    typePaiement: 'carte',
    libelleComplet: 'CB MICROSOFT IRELAND - Abonnement Office 365 Business',
    lienComptable: {
      codeCompte: '626700'
    },
    contrepartie: 'MICROSOFT IRELAND',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'en_attente',
    categorie: 'Logiciels',
    tags: ['Abonnement', 'Bureautique']
  },
  {
    id: 'bt-008',
    date: generateDate(7),
    montant: 3200.00,
    devise: 'EUR',
    typePaiement: 'virement',
    libelleComplet: 'VIREMENT RECU - SOCIÉTÉ ABC - Solde facture FA-2024-0145',
    lienComptable: {
      codeCompte: '411000',
      ecritureJournal: 'VTE-2024-145'
    },
    contrepartie: 'SOCIÉTÉ ABC',
    banqueIcone: 'CA',
    codeLettrage: 'AE5',
    numeroCompte: 'FR76 1250 6008 0400 0307 2835 958',
    nomCompte: 'Compte Crédit Agricole',
    statut: 'rapproche',
    categorie: 'Ventes',
    tags: ['Client', 'Règlement']
  },
  {
    id: 'bt-009',
    date: generateDate(8),
    montant: -1850.00,
    montantEUR: -1850.00,
    devise: 'USD',
    typePaiement: 'virement',
    justificatif: {
      url: '/documents/invoice-supplier-us.pdf',
      type: 'pdf',
      nom: 'Invoice US Supplier #2024-089'
    },
    libelleComplet: 'WIRE TRANSFER - US TECH SUPPLIER - Software licenses Q1 2024',
    lienComptable: {
      codeCompte: '205000'
    },
    contrepartie: 'US TECH SUPPLIER',
    banqueIcone: 'HSBC',
    numeroCompte: 'FR76 3000 5008 0400 0407 2835 069',
    nomCompte: 'Compte Devises HSBC',
    statut: 'en_attente',
    categorie: 'Licences',
    tags: ['International', 'USD', 'Logiciels']
  },
  {
    id: 'bt-010',
    date: generateDate(9),
    montant: -567.34,
    devise: 'EUR',
    typePaiement: 'prelevement',
    libelleComplet: 'PRELEVEMENT URSSAF - Cotisations sociales janvier 2024',
    lienComptable: {
      codeCompte: '645100',
      ecritureJournal: 'PAY-2024-001'
    },
    contrepartie: 'URSSAF ILE DE FRANCE',
    banqueIcone: 'BNP',
    codeLettrage: 'AF6',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Charges sociales',
    tags: ['Cotisations', 'Obligatoire']
  },
  {
    id: 'bt-011',
    date: generateDate(10),
    montant: -234.50,
    devise: 'EUR',
    typePaiement: 'carte',
    justificatif: {
      url: '/documents/facture-restaurant-011.jpg',
      type: 'image',
      nom: 'Note restaurant client 15/01'
    },
    libelleComplet: 'CB LE GRAND RESTAURANT - Repas affaires client DUPONT',
    lienComptable: {
      codeCompte: '625700'
    },
    contrepartie: 'LE GRAND RESTAURANT',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'non_rapproche',
    categorie: 'Frais de réception',
    tags: ['Restaurant', 'Client']
  },
  {
    id: 'bt-012',
    date: generateDate(11),
    montant: 5600.00,
    devise: 'EUR',
    typePaiement: 'remise_cheques',
    libelleComplet: 'REMISE DE CHEQUES - 3 chèques clients',
    lienComptable: {
      codeCompte: '411000'
    },
    contrepartie: 'REMISE CHEQUES MULTIPLES',
    banqueIcone: 'LCL',
    numeroCompte: 'FR76 3000 6008 0400 0507 2835 170',
    nomCompte: 'Compte LCL Secondaire',
    statut: 'en_attente',
    categorie: 'Encaissements',
    tags: ['Chèques', 'Clients']
  },
  {
    id: 'bt-013',
    date: generateDate(12),
    montant: -145.00,
    devise: 'EUR',
    typePaiement: 'prelevement',
    libelleComplet: 'PRELEVEMENT ORANGE BUSINESS - Abonnement téléphonie mobile flotte',
    lienComptable: {
      codeCompte: '626200'
    },
    contrepartie: 'ORANGE BUSINESS',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Télécommunications',
    tags: ['Téléphone', 'Abonnement']
  },
  {
    id: 'bt-014',
    date: generateDate(13),
    montant: -3456.78,
    devise: 'EUR',
    typePaiement: 'virement',
    justificatif: {
      url: '/documents/facture-fournisseur-014.pdf',
      type: 'pdf',
      nom: 'Facture matériel informatique'
    },
    libelleComplet: 'VIREMENT SEPA DELL FRANCE - Achat serveurs et équipements IT',
    lienComptable: {
      codeCompte: '218300',
      ecritureJournal: 'ACH-2024-014'
    },
    contrepartie: 'DELL FRANCE',
    banqueIcone: 'BNP',
    codeLettrage: 'AG7',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Immobilisations',
    tags: ['Matériel', 'IT', 'Investissement']
  },
  {
    id: 'bt-015',
    date: generateDate(14),
    montant: 12340.00,
    devise: 'EUR',
    typePaiement: 'virement',
    libelleComplet: 'VIREMENT RECU - ENTREPRISE XYZ - Facture prestation conseil FA-2024-0142',
    lienComptable: {
      codeCompte: '411000',
      ecritureJournal: 'VTE-2024-142'
    },
    contrepartie: 'ENTREPRISE XYZ',
    banqueIcone: 'CE',
    codeLettrage: 'AH8',
    numeroCompte: 'FR76 1315 5008 0400 0607 2835 281',
    nomCompte: 'Compte Caisse Épargne',
    statut: 'rapproche',
    categorie: 'Ventes',
    tags: ['Conseil', 'Client premium']
  },
  {
    id: 'bt-016',
    date: generateDate(15),
    montant: -78.90,
    devise: 'EUR',
    typePaiement: 'carte',
    libelleComplet: 'CB TOTAL STATION SERVICE - Carburant véhicule société',
    lienComptable: {
      codeCompte: '606600'
    },
    contrepartie: 'TOTAL STATION SERVICE',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'non_rapproche',
    categorie: 'Carburant',
    tags: ['Véhicule', 'Déplacement']
  },
  {
    id: 'bt-017',
    date: generateDate(16),
    montant: -890.00,
    devise: 'EUR',
    typePaiement: 'virement',
    libelleComplet: 'VIREMENT SEPA CABINET COMPTABLE - Honoraires comptables janvier 2024',
    lienComptable: {
      codeCompte: '622600',
      ecritureJournal: 'OD-2024-017'
    },
    contrepartie: 'CABINET EXPERT COMPTABLE',
    banqueIcone: 'BNP',
    codeLettrage: 'AI9',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Honoraires',
    tags: ['Comptabilité', 'Prestataire']
  },
  {
    id: 'bt-018',
    date: generateDate(17),
    montant: 4500.00,
    devise: 'EUR',
    typePaiement: 'virement',
    justificatif: {
      url: '/documents/facture-client-018.pdf',
      type: 'pdf',
      nom: 'Facture FA-2024-0139'
    },
    libelleComplet: 'VIREMENT RECU - SARL BERNARD - Règlement total facture formation',
    lienComptable: {
      codeCompte: '411000',
      ecritureJournal: 'VTE-2024-139'
    },
    contrepartie: 'SARL BERNARD',
    banqueIcone: 'CM',
    codeLettrage: 'AJ0',
    numeroCompte: 'FR76 1027 8008 0400 0707 2835 392',
    nomCompte: 'Compte Crédit Mutuel',
    statut: 'rapproche',
    categorie: 'Formation',
    tags: ['Formation', 'Service']
  },
  {
    id: 'bt-019',
    date: generateDate(18),
    montant: -320.00,
    devise: 'EUR',
    typePaiement: 'especes',
    libelleComplet: 'RETRAIT ESPECES - Caisse petites dépenses',
    lienComptable: {
      codeCompte: '530000'
    },
    contrepartie: 'RETRAIT DAB',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Caisse',
    tags: ['Espèces', 'Petite caisse']
  },
  {
    id: 'bt-020',
    date: generateDate(19),
    montant: -156.78,
    devise: 'EUR',
    typePaiement: 'prelevement',
    libelleComplet: 'PRELEVEMENT SFR BUSINESS - Abonnement internet fibre pro',
    lienComptable: {
      codeCompte: '626200'
    },
    contrepartie: 'SFR BUSINESS',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Télécommunications',
    tags: ['Internet', 'Abonnement']
  },
  // Transactions plus anciennes pour avoir du volume
  {
    id: 'bt-021',
    date: generateDate(20),
    montant: 7890.00,
    devise: 'EUR',
    typePaiement: 'virement',
    libelleComplet: 'VIREMENT RECU - GROUPE INDUSTRIEL SA - Acompte commande 2024-089',
    lienComptable: {
      codeCompte: '411000',
      ecritureJournal: 'VTE-2024-089'
    },
    contrepartie: 'GROUPE INDUSTRIEL SA',
    banqueIcone: 'BP',
    codeLettrage: 'BA1',
    numeroCompte: 'FR76 1470 7008 0400 0807 2835 403',
    nomCompte: 'Compte Banque Populaire',
    statut: 'rapproche',
    categorie: 'Ventes',
    tags: ['Industrie', 'Acompte']
  },
  {
    id: 'bt-022',
    date: generateDate(21),
    montant: -234.56,
    devise: 'EUR',
    typePaiement: 'carte',
    libelleComplet: 'CB AMAZON FRANCE - Fournitures de bureau',
    lienComptable: {
      codeCompte: '606400'
    },
    contrepartie: 'AMAZON FRANCE',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'en_attente',
    categorie: 'Fournitures',
    tags: ['Bureau', 'E-commerce']
  },
  {
    id: 'bt-023',
    date: generateDate(22),
    montant: -5000.00,
    devise: 'EUR',
    typePaiement: 'virement',
    justificatif: {
      url: '/documents/salaire-janvier-2024.pdf',
      type: 'pdf',
      nom: 'Bulletin de paie Janvier 2024'
    },
    libelleComplet: 'VIREMENT SALAIRE - M. DUPONT JEAN - Salaire net janvier 2024',
    lienComptable: {
      codeCompte: '641100',
      ecritureJournal: 'PAY-2024-023'
    },
    contrepartie: 'M. DUPONT JEAN',
    banqueIcone: 'BNP',
    codeLettrage: 'BB2',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Salaires',
    tags: ['Paie', 'Personnel']
  },
  {
    id: 'bt-024',
    date: generateDate(23),
    montant: -45.90,
    devise: 'EUR',
    typePaiement: 'carte',
    libelleComplet: 'CB LINKEDIN IRELAND - Abonnement LinkedIn Sales Navigator',
    lienComptable: {
      codeCompte: '626700'
    },
    contrepartie: 'LINKEDIN IRELAND',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'non_rapproche',
    categorie: 'Marketing',
    tags: ['Réseaux sociaux', 'Abonnement']
  },
  {
    id: 'bt-025',
    date: generateDate(24),
    montant: 2100.00,
    devise: 'EUR',
    typePaiement: 'cheque',
    libelleComplet: 'ENCAISSEMENT CHEQUE N°5678901 - CLIENT MARTIN',
    lienComptable: {
      codeCompte: '411000'
    },
    contrepartie: 'CLIENT MARTIN',
    banqueIcone: 'CIC',
    numeroCompte: 'FR76 3006 6008 0400 0907 2835 514',
    nomCompte: 'Compte CIC',
    statut: 'en_attente',
    categorie: 'Encaissements',
    tags: ['Chèque', 'Client']
  },
  {
    id: 'bt-026',
    date: generateDate(25),
    montant: -678.90,
    devise: 'EUR',
    typePaiement: 'prelevement',
    libelleComplet: 'PRELEVEMENT MUTUELLE ENTREPRISE - Cotisation collective janvier',
    lienComptable: {
      codeCompte: '645800'
    },
    contrepartie: 'MUTUELLE SANTÉ PRO',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Charges sociales',
    tags: ['Mutuelle', 'Cotisations']
  },
  {
    id: 'bt-027',
    date: generateDate(26),
    montant: -1234.00,
    montantEUR: -1100.00,
    devise: 'GBP',
    typePaiement: 'virement',
    libelleComplet: 'WIRE TRANSFER - UK SUPPLIER LTD - Marketing services Q1',
    lienComptable: {
      codeCompte: '622800'
    },
    contrepartie: 'UK SUPPLIER LTD',
    banqueIcone: 'HSBC',
    numeroCompte: 'FR76 3000 5008 0400 0407 2835 069',
    nomCompte: 'Compte Devises HSBC',
    statut: 'en_attente',
    categorie: 'Marketing',
    tags: ['International', 'GBP', 'Marketing']
  },
  {
    id: 'bt-028',
    date: generateDate(27),
    montant: 18900.00,
    devise: 'EUR',
    typePaiement: 'virement',
    justificatif: {
      url: '/documents/facture-client-028.pdf',
      type: 'pdf',
      nom: 'Facture FA-2024-0125'
    },
    libelleComplet: 'VIREMENT RECU - GRAND COMPTE SA - Projet développement sur mesure',
    lienComptable: {
      codeCompte: '411000',
      ecritureJournal: 'VTE-2024-125'
    },
    contrepartie: 'GRAND COMPTE SA',
    banqueIcone: 'BNP',
    codeLettrage: 'BC3',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Ventes',
    tags: ['Développement', 'Grand compte']
  },
  {
    id: 'bt-029',
    date: generateDate(28),
    montant: -345.67,
    devise: 'EUR',
    typePaiement: 'carte',
    justificatif: {
      url: '/documents/note-hotel-029.jpg',
      type: 'image',
      nom: 'Note hôtel déplacement Lyon'
    },
    libelleComplet: 'CB HOTEL MERCURE LYON - Déplacement professionnel 2 nuits',
    lienComptable: {
      codeCompte: '625100'
    },
    contrepartie: 'HOTEL MERCURE LYON',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'non_rapproche',
    categorie: 'Déplacements',
    tags: ['Hôtel', 'Déplacement']
  },
  {
    id: 'bt-030',
    date: generateDate(29),
    montant: -89.00,
    devise: 'EUR',
    typePaiement: 'prelevement',
    libelleComplet: 'PRELEVEMENT ADOBE FRANCE - Creative Cloud for Business',
    lienComptable: {
      codeCompte: '626700'
    },
    contrepartie: 'ADOBE FRANCE',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Logiciels',
    tags: ['Adobe', 'Abonnement', 'Design']
  },
  {
    id: 'bt-031',
    date: generateDate(30),
    montant: 3450.00,
    devise: 'EUR',
    typePaiement: 'virement',
    libelleComplet: 'VIREMENT RECU - PME LOCALE - Solde facture prestation décembre',
    lienComptable: {
      codeCompte: '411000',
      ecritureJournal: 'VTE-2023-458'
    },
    contrepartie: 'PME LOCALE',
    banqueIcone: 'LaPoste',
    codeLettrage: 'BD4',
    numeroCompte: 'FR76 2004 1008 0400 1007 2835 625',
    nomCompte: 'Compte La Banque Postale',
    statut: 'rapproche',
    categorie: 'Ventes',
    tags: ['PME', 'Règlement']
  },
  {
    id: 'bt-032',
    date: generateDate(31),
    montant: -156.00,
    devise: 'EUR',
    typePaiement: 'carte',
    libelleComplet: 'CB FNAC PRO - Achat matériel bureautique',
    lienComptable: {
      codeCompte: '218300'
    },
    contrepartie: 'FNAC PRO',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'en_attente',
    categorie: 'Matériel',
    tags: ['Bureautique', 'Achat']
  },
  {
    id: 'bt-033',
    date: generateDate(32),
    montant: -3200.00,
    devise: 'EUR',
    typePaiement: 'virement',
    justificatif: {
      url: '/documents/facture-assurance-2024.pdf',
      type: 'pdf',
      nom: 'Police assurance RC Pro 2024'
    },
    libelleComplet: 'VIREMENT SEPA AXA ASSURANCES - Prime annuelle RC professionnelle',
    lienComptable: {
      codeCompte: '616100',
      ecritureJournal: 'OD-2024-033'
    },
    contrepartie: 'AXA ASSURANCES',
    banqueIcone: 'BNP',
    codeLettrage: 'BE5',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Assurances',
    tags: ['RC Pro', 'Assurance', 'Annuel']
  },
  {
    id: 'bt-034',
    date: generateDate(33),
    montant: 6789.00,
    devise: 'EUR',
    typePaiement: 'remise_cheques',
    libelleComplet: 'REMISE DE CHEQUES - 5 chèques clients divers',
    lienComptable: {
      codeCompte: '411000'
    },
    contrepartie: 'REMISE CHEQUES MULTIPLES',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'en_attente',
    categorie: 'Encaissements',
    tags: ['Chèques', 'Remise']
  },
  {
    id: 'bt-035',
    date: generateDate(34),
    montant: -456.78,
    devise: 'EUR',
    typePaiement: 'prelevement',
    libelleComplet: 'PRELEVEMENT ENGIE PRO - Gaz bureaux janvier 2024',
    lienComptable: {
      codeCompte: '606100'
    },
    contrepartie: 'ENGIE PRO',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Charges',
    tags: ['Énergie', 'Gaz']
  },
  {
    id: 'bt-036',
    date: generateDate(35),
    montant: -123.45,
    devise: 'EUR',
    typePaiement: 'carte',
    libelleComplet: 'CB UBER EATS - Repas équipe réunion tardive',
    lienComptable: {
      codeCompte: '625700'
    },
    contrepartie: 'UBER EATS',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'non_rapproche',
    categorie: 'Frais de réception',
    tags: ['Repas', 'Équipe']
  },
  {
    id: 'bt-037',
    date: generateDate(36),
    montant: 9870.00,
    devise: 'EUR',
    typePaiement: 'virement',
    justificatif: {
      url: '/documents/facture-client-037.pdf',
      type: 'pdf',
      nom: 'Facture FA-2024-0098'
    },
    libelleComplet: 'VIREMENT RECU - ENTREPRISE TECH - Formation équipe développement',
    lienComptable: {
      codeCompte: '411000',
      ecritureJournal: 'VTE-2024-098'
    },
    contrepartie: 'ENTREPRISE TECH',
    banqueIcone: 'SG',
    codeLettrage: 'BF6',
    numeroCompte: 'FR76 3000 3008 0400 0207 2835 847',
    nomCompte: 'Compte Société Générale',
    statut: 'rapproche',
    categorie: 'Formation',
    tags: ['Formation', 'Tech']
  },
  {
    id: 'bt-038',
    date: generateDate(37),
    montant: -567.00,
    devise: 'EUR',
    typePaiement: 'virement',
    libelleComplet: 'VIREMENT SEPA LEASING AUTO - Mensualité véhicule société',
    lienComptable: {
      codeCompte: '612500'
    },
    contrepartie: 'LEASING AUTO PRO',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Véhicule',
    tags: ['Leasing', 'Véhicule']
  },
  {
    id: 'bt-039',
    date: generateDate(38),
    montant: -89.99,
    devise: 'EUR',
    typePaiement: 'carte',
    libelleComplet: 'CB GOOGLE IRELAND - Google Workspace Business',
    lienComptable: {
      codeCompte: '626700'
    },
    contrepartie: 'GOOGLE IRELAND',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'en_attente',
    categorie: 'Logiciels',
    tags: ['Google', 'Cloud', 'Abonnement']
  },
  {
    id: 'bt-040',
    date: generateDate(39),
    montant: 4567.89,
    devise: 'EUR',
    typePaiement: 'virement',
    libelleComplet: 'VIREMENT RECU - STARTUP INNOVANTE - Consulting stratégique janvier',
    lienComptable: {
      codeCompte: '411000',
      ecritureJournal: 'VTE-2024-076'
    },
    contrepartie: 'STARTUP INNOVANTE',
    banqueIcone: 'CA',
    codeLettrage: 'BG7',
    numeroCompte: 'FR76 1250 6008 0400 0307 2835 958',
    nomCompte: 'Compte Crédit Agricole',
    statut: 'rapproche',
    categorie: 'Conseil',
    tags: ['Startup', 'Consulting']
  },
  {
    id: 'bt-041',
    date: generateDate(40),
    montant: -234.56,
    devise: 'EUR',
    typePaiement: 'prelevement',
    libelleComplet: 'PRELEVEMENT CANAL+ PRO - Abonnement salles attente',
    lienComptable: {
      codeCompte: '626700'
    },
    contrepartie: 'CANAL+ PRO',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Abonnements',
    tags: ['TV', 'Abonnement']
  },
  {
    id: 'bt-042',
    date: generateDate(41),
    montant: -1500.00,
    devise: 'EUR',
    typePaiement: 'cheque',
    libelleComplet: 'CHEQUE N°0001235 - EXPERT JURIDIQUE - Conseil dossier contentieux',
    lienComptable: {
      codeCompte: '622700'
    },
    contrepartie: 'CABINET JURIDIQUE ASSOCIÉS',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'non_rapproche',
    categorie: 'Honoraires',
    tags: ['Juridique', 'Conseil']
  },
  {
    id: 'bt-043',
    date: generateDate(42),
    montant: 7890.12,
    devise: 'EUR',
    typePaiement: 'virement',
    justificatif: {
      url: '/documents/facture-client-043.pdf',
      type: 'pdf',
      nom: 'Facture FA-2024-0065'
    },
    libelleComplet: 'VIREMENT RECU - INDUSTRIE MANUFACTURIERE - Audit qualité processus',
    lienComptable: {
      codeCompte: '411000',
      ecritureJournal: 'VTE-2024-065'
    },
    contrepartie: 'INDUSTRIE MANUFACTURIERE SA',
    banqueIcone: 'CE',
    codeLettrage: 'BH8',
    numeroCompte: 'FR76 1315 5008 0400 0607 2835 281',
    nomCompte: 'Compte Caisse Épargne',
    statut: 'rapproche',
    categorie: 'Audit',
    tags: ['Industrie', 'Audit', 'Qualité']
  },
  {
    id: 'bt-044',
    date: generateDate(43),
    montant: -456.00,
    devise: 'EUR',
    typePaiement: 'carte',
    justificatif: {
      url: '/documents/facture-fournitures-044.jpg',
      type: 'image',
      nom: 'Facture Office Depot Pro'
    },
    libelleComplet: 'CB OFFICE DEPOT PRO - Commande fournitures bureau janvier',
    lienComptable: {
      codeCompte: '606400'
    },
    contrepartie: 'OFFICE DEPOT PRO',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'en_attente',
    categorie: 'Fournitures',
    tags: ['Bureau', 'Fournitures']
  },
  {
    id: 'bt-045',
    date: generateDate(44),
    montant: -3400.00,
    devise: 'EUR',
    typePaiement: 'virement',
    libelleComplet: 'VIREMENT SALAIRE - MME MARTIN SOPHIE - Salaire net janvier 2024',
    lienComptable: {
      codeCompte: '641100',
      ecritureJournal: 'PAY-2024-045'
    },
    contrepartie: 'MME MARTIN SOPHIE',
    banqueIcone: 'BNP',
    codeLettrage: 'BI9',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Salaires',
    tags: ['Paie', 'Personnel']
  },
  {
    id: 'bt-046',
    date: generateDate(45),
    montant: 2345.67,
    devise: 'EUR',
    typePaiement: 'virement',
    libelleComplet: 'VIREMENT RECU - ASSOCIATION PROFESSIONNELLE - Remboursement formation',
    lienComptable: {
      codeCompte: '791000'
    },
    contrepartie: 'OPCO ENTREPRISES',
    banqueIcone: 'CM',
    numeroCompte: 'FR76 1027 8008 0400 0707 2835 392',
    nomCompte: 'Compte Crédit Mutuel',
    statut: 'rapproche',
    categorie: 'Subventions',
    tags: ['OPCO', 'Formation', 'Remboursement']
  },
  {
    id: 'bt-047',
    date: generateDate(46),
    montant: -178.90,
    devise: 'EUR',
    typePaiement: 'prelevement',
    libelleComplet: 'PRELEVEMENT VEOLIA EAU - Consommation eau janvier 2024',
    lienComptable: {
      codeCompte: '606100'
    },
    contrepartie: 'VEOLIA EAU',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Charges',
    tags: ['Eau', 'Charges fixes']
  },
  {
    id: 'bt-048',
    date: generateDate(47),
    montant: -67.89,
    devise: 'EUR',
    typePaiement: 'carte',
    libelleComplet: 'CB SNCF BUSINESS - Billet train Paris-Marseille A/R',
    lienComptable: {
      codeCompte: '625100'
    },
    contrepartie: 'SNCF BUSINESS',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'non_rapproche',
    categorie: 'Déplacements',
    tags: ['Train', 'Transport']
  },
  {
    id: 'bt-049',
    date: generateDate(48),
    montant: 11234.56,
    devise: 'EUR',
    typePaiement: 'virement',
    justificatif: {
      url: '/documents/facture-client-049.pdf',
      type: 'pdf',
      nom: 'Facture FA-2024-0054'
    },
    libelleComplet: 'VIREMENT RECU - GROUPE INTERNATIONAL - Solde projet export',
    lienComptable: {
      codeCompte: '411000',
      ecritureJournal: 'VTE-2024-054'
    },
    contrepartie: 'GROUPE INTERNATIONAL',
    banqueIcone: 'HSBC',
    codeLettrage: 'BJ0',
    numeroCompte: 'FR76 3000 5008 0400 0407 2835 069',
    nomCompte: 'Compte Devises HSBC',
    statut: 'rapproche',
    categorie: 'Export',
    tags: ['International', 'Export', 'Projet']
  },
  {
    id: 'bt-050',
    date: generateDate(49),
    montant: -890.00,
    devise: 'EUR',
    typePaiement: 'virement',
    libelleComplet: 'VIREMENT SEPA NOTAIRE - Frais acte modification statuts',
    lienComptable: {
      codeCompte: '622800'
    },
    contrepartie: 'OFFICE NOTARIAL PARIS',
    banqueIcone: 'BNP',
    numeroCompte: 'FR76 3000 4008 0400 0107 2835 736',
    nomCompte: 'Compte Courant Principal',
    statut: 'rapproche',
    categorie: 'Frais juridiques',
    tags: ['Notaire', 'Statuts']
  }
];

// Calcul des soldes progressifs
let soldeProgressif = 50000; // Solde initial
bankTransactions.forEach(transaction => {
  soldeProgressif += transaction.montant;
  transaction.soldeProgressif = soldeProgressif;
});

// Logos des banques françaises
export const bankLogos: Record<Banque, string> = {
  BNP: "/documents/logos banques/BNP.jpeg",
  SG: "/documents/logos banques/societegenerale.jpeg",
  CA: "/documents/logos banques/ca-paris.jpeg",
  LCL: "/documents/logos banques/lcl.jpeg",
  CE: "/documents/logos banques/qonto.jpeg", // Placeholder - pas de CE dans vos logos
  CM: "/documents/logos banques/qonto.jpeg", // Placeholder - pas de CM dans vos logos
  HSBC: "/documents/logos banques/qonto.jpeg", // Placeholder - pas de HSBC dans vos logos
  BP: "/documents/logos banques/qonto.jpeg", // Placeholder - pas de BP dans vos logos
  CIC: "/documents/logos banques/qonto.jpeg", // Placeholder - pas de CIC dans vos logos
  LaPoste: "/documents/logos banques/qonto.jpeg" // Placeholder - pas de LaPoste dans vos logos
};

// Données des comptes bancaires pour les widgets de solde
export const bankAccounts: Array<{
  id: string;
  name: string;
  balance: number;
  currency: string;
  bankCode: Banque;
  bankName: string;
  accountNumber: string;
  type: 'current' | 'savings' | 'foreign';
}> = [
  {
    id: 'acc-bnp-001',
    name: 'Compte Courant Principal',
    balance: 65387.20,
    currency: 'EUR',
    bankCode: 'BNP',
    bankName: 'BNP Paribas',
    accountNumber: 'FR76 3000 4008 0400 0107 2835 736',
    type: 'current'
  },
  {
    id: 'acc-sg-001',
    name: 'Compte Société Générale',
    balance: 21099.00,
    currency: 'EUR',
    bankCode: 'SG',
    bankName: 'Société Générale',
    accountNumber: 'FR76 3000 3008 0400 0207 2835 847',
    type: 'current'
  },
  {
    id: 'acc-ca-001',
    name: 'Compte Crédit Agricole',
    balance: 8756.45,
    currency: 'EUR',
    bankCode: 'CA',
    bankName: 'Crédit Agricole',
    accountNumber: 'FR76 1250 6008 0400 0307 2835 958',
    type: 'current'
  },
  {
    id: 'acc-hsbc-001',
    name: 'Compte Devises HSBC',
    balance: -2340.67,
    currency: 'USD',
    bankCode: 'HSBC',
    bankName: 'HSBC',
    accountNumber: 'FR76 3000 5008 0400 0407 2835 069',
    type: 'foreign'
  },
  {
    id: 'acc-lcl-001',
    name: 'Compte LCL Secondaire',
    balance: 12456.78,
    currency: 'EUR',
    bankCode: 'LCL',
    bankName: 'LCL',
    accountNumber: 'FR76 3000 6008 0400 0507 2835 170',
    type: 'savings'
  }
];

// Fonction pour calculer le résumé des soldes avec filtrage
export const calculateBalanceSummary = (selectedBanks?: string[]) => {
  let accounts = bankAccounts;
  
  // Filtrer par banques sélectionnées si spécifié
  if (selectedBanks && selectedBanks.length > 0) {
    accounts = bankAccounts.filter(acc => selectedBanks.includes(acc.id));
  }
  
  const eurAccounts = accounts.filter(acc => acc.currency === 'EUR');
  const totalBalance = eurAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  
  // Calcul des débits et crédits depuis les transactions des comptes sélectionnés
  let relevantTransactions = bankTransactions;
  if (selectedBanks && selectedBanks.length > 0) {
    const selectedAccountNumbers = accounts.map(acc => acc.accountNumber);
    relevantTransactions = bankTransactions.filter(t => 
      selectedAccountNumbers.includes(t.numeroCompte)
    );
  }
  
  const totalCredits = relevantTransactions
    .filter(t => t.montant > 0)
    .reduce((sum, t) => sum + t.montant, 0);
    
  const totalDebits = relevantTransactions
    .filter(t => t.montant < 0)
    .reduce((sum, t) => sum + t.montant, 0);
  
  return {
    totalBalance,
    totalCredits,
    totalDebits,
    accountsCount: accounts.length
  };
};

// Export des helpers pour les filtres et tri
export const filterTransactions = (
  transactions: BankTransactionExtended[],
  filters: {
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    typePaiement?: TypePaiement[];
    statut?: StatutRapprochement[];
    banque?: Banque[];
    montantMin?: number;
    montantMax?: number;
  }
): BankTransactionExtended[] => {
  return transactions.filter(t => {
    // Filtre recherche globale
    if (filters.search) {
      const search = filters.search.toLowerCase();
      if (
        !t.libelleComplet.toLowerCase().includes(search) &&
        !t.contrepartie.toLowerCase().includes(search) &&
        !t.numeroCompte.toLowerCase().includes(search) &&
        !t.categorie.toLowerCase().includes(search) &&
        !t.tags?.some(tag => tag.toLowerCase().includes(search))
      ) {
        return false;
      }
    }

    // Filtre dates
    if (filters.dateFrom && t.date < filters.dateFrom) return false;
    if (filters.dateTo && t.date > filters.dateTo) return false;

    // Filtre type de paiement
    if (filters.typePaiement?.length && !filters.typePaiement.includes(t.typePaiement)) return false;

    // Filtre statut
    if (filters.statut?.length && !filters.statut.includes(t.statut)) return false;

    // Filtre banque
    if (filters.banque?.length && !filters.banque.includes(t.banqueIcone)) return false;

    // Filtre montant
    if (filters.montantMin !== undefined && Math.abs(t.montant) < filters.montantMin) return false;
    if (filters.montantMax !== undefined && Math.abs(t.montant) > filters.montantMax) return false;

    return true;
  });
};

export const sortTransactions = (
  transactions: BankTransactionExtended[],
  sortBy: keyof BankTransactionExtended,
  order: 'asc' | 'desc' = 'desc'
): BankTransactionExtended[] => {
  return [...transactions].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    
    if (aVal === undefined || bVal === undefined) return 0;
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return order === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    return 0;
  });
};