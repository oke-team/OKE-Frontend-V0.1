export interface Company {
  name: string;
  address_line1: string;
  address_line2?: string;
  postal_code: string;
  city: string;
  country: string;
  email?: string;
  phone?: string;
  
  // Informations légales
  siren?: string;
  siret?: string;
  vat_number?: string;
  legal_form?: string;
  capital?: number;
  
  // Logo et branding
  logo_text?: string;
  logo_url?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  details?: string[];
  quantity: number;
  unit: string;
  unit_price: number;
  vat_rate: number;
  
  // Compte comptable associé
  account_code?: string;
  account_name?: string;
  
  // Calculs automatiques
  total_ht: number;
  vat_amount: number;
  total_ttc: number;
}

export interface VATGroup {
  rate: number;
  base: number;
  amount: number;
}

export interface PaymentInfo {
  method: string;
  bank_name?: string;
  iban?: string;
  bic?: string;
  reference?: string;
  
  // Autres moyens de paiement
  check_order?: string;
  payment_terms?: string;
  due_date?: string;
}

export interface Invoice {
  // Identifiants et métadonnées
  id: string;
  number: string;
  title: string;
  type: 'invoice' | 'quote' | 'credit_note';
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  
  // Dates
  issue_date: string;
  due_date: string;
  payment_date?: string;
  
  // Parties
  issuer: Company;
  client: Company;
  
  // Contenu
  items: InvoiceItem[];
  
  // Informations de paiement
  payment?: PaymentInfo;
  
  // Configuration
  currency: string;
  language: 'fr' | 'en' | 'zh';
  is_facturx: boolean;
  
  // Récurrence (pour abonnements)
  is_recurring?: boolean;
  recurring_frequency?: 'monthly' | 'quarterly' | 'yearly';
  recurring_end_date?: string;
  
  // Mentions légales
  late_penalty_rate?: number;
  recovery_indemnity?: number;
  notes?: string;
  
  // Calculs automatiques
  total_ht: number;
  total_vat: number;
  total_ttc: number;
  vat_groups: VATGroup[];
  
  // Traçabilité
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface Client extends Company {
  id: string;
  client_code: string;
  payment_terms?: number; // en jours
  payment_method?: string;
  credit_limit?: number;
  
  // Informations additionnelles
  industry?: string;
  website?: string;
  notes?: string;
  
  // Statut
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  
  // Prix et unité
  unit_price: number;
  unit: string;
  vat_rate: number;
  
  // Comptabilité
  account_code: string;
  account_name: string;
  
  // Catégorie
  category?: string;
  
  // Stock (optionnel pour services)
  track_stock?: boolean;
  stock_quantity?: number;
  min_stock_level?: number;
  
  // Statut
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  
  // Configuration du template
  show_company_logo: boolean;
  show_client_logo: boolean;
  show_facturx_badge: boolean;
  
  // Couleurs et style
  primary_color: string;
  secondary_color: string;
  font_family: string;
  
  // Sections à afficher
  show_vat_details: boolean;
  show_payment_info: boolean;
  show_legal_mentions: boolean;
  
  // Mentions personnalisées
  header_text?: string;
  footer_text?: string;
  
  created_at: string;
  updated_at: string;
}

export interface InvoiceSettings {
  // Numérotation automatique
  invoice_prefix: string;
  quote_prefix: string;
  credit_note_prefix: string;
  next_invoice_number: number;
  next_quote_number: number;
  
  // Paramètres par défaut
  default_currency: string;
  default_language: 'fr' | 'en' | 'zh';
  default_payment_terms: number;
  default_vat_rate: number;
  
  // Mentions légales par défaut
  late_penalty_rate: number;
  recovery_indemnity: number;
  legal_mentions: string;
  
  // Configuration e-mail
  email_subject_template: string;
  email_body_template: string;
  
  // Intégrations
  pappers_api_enabled: boolean;
  yousign_api_enabled: boolean;
  chift_api_enabled: boolean;
}

// Types pour les formulaires
export interface InvoiceFormData {
  type: 'invoice' | 'quote' | 'credit_note';
  client_id: string;
  items: Omit<InvoiceItem, 'id' | 'total_ht' | 'vat_amount' | 'total_ttc'>[];
  payment?: Omit<PaymentInfo, 'reference'>;
  currency: string;
  language: 'fr' | 'en' | 'zh';
  notes?: string;
  is_recurring?: boolean;
  recurring_frequency?: 'monthly' | 'quarterly' | 'yearly';
  recurring_end_date?: string;
}

// Types pour les statistiques
export interface SalesStats {
  current_month: {
    invoice_count: number;
    quote_count: number;
    total_revenue: number;
    total_pending: number;
  };
  previous_month: {
    invoice_count: number;
    quote_count: number;
    total_revenue: number;
    total_pending: number;
  };
  top_clients: Array<{
    client_name: string;
    total_amount: number;
    invoice_count: number;
  }>;
  top_products: Array<{
    product_name: string;
    quantity_sold: number;
    total_amount: number;
  }>;
}

// Types pour les actions
export interface InvoiceAction {
  type: 'send_email' | 'download_pdf' | 'mark_paid' | 'send_reminder' | 'duplicate' | 'convert_to_invoice';
  label: string;
  icon: string;
  color: string;
}

// Types pour l'intégration API Pappers
export interface PappersSearchResult {
  siren: string;
  siret: string;
  denomination: string;
  nom_commercial?: string;
  adresse: {
    ligne1: string;
    ligne2?: string;
    code_postal: string;
    ville: string;
    pays: string;
  };
  forme_juridique?: string;
  capital?: number;
  numero_tva_intracommunautaire?: string;
  site_web?: string;
  telephone?: string;
  email?: string;
}

// Types pour l'intégration e-commerce
export interface EcommerceOrder {
  platform: 'amazon' | 'woocommerce' | 'shopify' | 'prestashop';
  order_id: string;
  customer_info: Partial<Company>;
  items: Array<{
    name: string;
    quantity: number;
    unit_price: number;
    vat_rate: number;
  }>;
  total_amount: number;
  currency: string;
  order_date: string;
}

// Types pour la signature électronique
export interface SignatureRequest {
  document_url: string;
  signers: Array<{
    email: string;
    name: string;
    role: 'client' | 'provider';
  }>;
  callback_url?: string;
  expires_at?: string;
}