#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DOCS_BASE_PATH = '/documents/Documents CL Evolution pour hardcode';
const OUTPUT_FILE = 'lib/mock-data/real-documents-data.ts';

// Mapping des dossiers physiques vers nos catégories OKE
const FOLDER_MAPPING = {
  'COMPTABLE/ACHATS': 'comptabilite',
  'COMPTABLE/BANQUE': 'banque', 
  'COMPTABLE/VENTES': 'ventes',
  'FISCALE': 'fiscalite',
  'JURIDIQUE': 'juridique',
  'SOCIALE': 'juridique' // On peut créer un dossier RH plus tard
};

// Types de fichiers supportés
const FILE_TYPES = {
  '.pdf': 'pdf',
  '.jpg': 'image',
  '.jpeg': 'image',
  '.png': 'image',
  '.gif': 'image',
  '.doc': 'office',
  '.docx': 'office',
  '.xls': 'office',
  '.xlsx': 'office',
  '.txt': 'office',
  '.zip': 'office',
  '.xml': 'office'
};

function getFileType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  return FILE_TYPES[ext] || 'unsupported';
}

function getFileSize() {
  // Simulation de tailles de fichiers réalistes
  const sizes = [245760, 512000, 1048576, 2097152, 524288, 1572864]; // 240KB à 2MB
  return sizes[Math.floor(Math.random() * sizes.length)];
}

function formatDate(dateStr) {
  const now = new Date();
  return now.toISOString();
}

function categorizeDocument(filePath, fileName) {
  const normalizedPath = filePath.toUpperCase();
  
  // Détection automatique de la catégorie basée sur le chemin
  for (const [pathPattern, category] of Object.entries(FOLDER_MAPPING)) {
    if (normalizedPath.includes(pathPattern)) {
      return category;
    }
  }
  
  // Classification basée sur le nom du fichier
  const normalizedName = fileName.toUpperCase();
  
  if (normalizedName.includes('FACTURE') || normalizedName.includes('ACHATS')) {
    return 'comptabilite';
  }
  if (normalizedName.includes('RELEVÉ') || normalizedName.includes('EXTRAIT') || normalizedName.includes('BANQUE')) {
    return 'banque';
  }
  if (normalizedName.includes('TVA') || normalizedName.includes('FISCAL') || normalizedName.includes('IMPOT')) {
    return 'fiscalite';
  }
  if (normalizedName.includes('STATUTS') || normalizedName.includes('KBIS') || normalizedName.includes('JURIDIQUE')) {
    return 'juridique';
  }
  if (normalizedName.includes('VENTE') || normalizedName.includes('CLIENT')) {
    return 'ventes';
  }
  
  // Par défaut, autres documents
  return 'juridique';
}

function scanDirectory(dir, basePath = '') {
  const documents = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.join(basePath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Récursion dans les sous-dossiers
        documents.push(...scanDirectory(fullPath, relativePath));
      } else if (stat.isFile()) {
        const fileType = getFileType(item);
        if (fileType !== 'unsupported') {
          const category = categorizeDocument(relativePath, item);
          
          documents.push({
            id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: item,
            src: `${DOCS_BASE_PATH}/${relativePath}`.replace(/\\/g, '/'),
            size: getFileSize(),
            type: fileType,
            category: category,
            lastModified: stat.mtime.toISOString(),
            thumbnail: fileType === 'image' ? `${DOCS_BASE_PATH}/${relativePath}`.replace(/\\/g, '/') : undefined,
            pageCount: fileType === 'pdf' ? Math.floor(Math.random() * 10) + 1 : undefined,
            folder: path.dirname(relativePath).replace(/\\/g, '/') || 'root'
          });
        }
      }
    }
  } catch (error) {
    console.error(`Erreur lors du scan de ${dir}:`, error.message);
  }
  
  return documents;
}

function generateTypeScriptFile(documents) {
  const documentsByCategory = {};
  const documentsByFolder = {};
  
  // Grouper par catégorie
  documents.forEach(doc => {
    if (!documentsByCategory[doc.category]) {
      documentsByCategory[doc.category] = [];
    }
    documentsByCategory[doc.category].push(doc);
  });
  
  // Grouper par dossier
  documents.forEach(doc => {
    if (!documentsByFolder[doc.folder]) {
      documentsByFolder[doc.folder] = [];
    }
    documentsByFolder[doc.folder].push(doc);
  });

  const content = `// Données réelles indexées automatiquement depuis les documents CL Evolution
// Généré le ${new Date().toISOString()}

import { DocumentAttachment } from '@/types/document-viewer';

export interface RealDocumentFolder {
  id: string;
  name: string;
  path: string;
  documentCount: number;
  documents: DocumentAttachment[];
}

// Documents indexés (${documents.length} au total)
export const realDocuments: DocumentAttachment[] = ${JSON.stringify(documents, null, 2)};

// Documents groupés par catégorie OKE
export const realDocumentsByCategory = ${JSON.stringify(documentsByCategory, null, 2)};

// Documents groupés par dossier physique
export const realDocumentsByFolder = ${JSON.stringify(documentsByFolder, null, 2)};

// Statistiques des documents
export const realDocumentsStats = {
  total: ${documents.length},
  byType: {
    pdf: ${documents.filter(d => d.type === 'pdf').length},
    image: ${documents.filter(d => d.type === 'image').length},
    office: ${documents.filter(d => d.type === 'office').length}
  },
  byCategory: {
    comptabilite: ${documentsByCategory.comptabilite?.length || 0},
    banque: ${documentsByCategory.banque?.length || 0},
    fiscalite: ${documentsByCategory.fiscalite?.length || 0},
    juridique: ${documentsByCategory.juridique?.length || 0},
    ventes: ${documentsByCategory.ventes?.length || 0}
  }
};

// Utilitaires pour les documents réels
export const realDocumentUtils = {
  getDocumentsByCategory: (category: string): DocumentAttachment[] => {
    return realDocumentsByCategory[category] || [];
  },
  
  getDocumentsByFolder: (folder: string): DocumentAttachment[] => {
    return realDocumentsByFolder[folder] || [];
  },
  
  searchDocuments: (query: string): DocumentAttachment[] => {
    const searchTerm = query.toLowerCase();
    return realDocuments.filter(doc => 
      doc.name.toLowerCase().includes(searchTerm) ||
      doc.folder.toLowerCase().includes(searchTerm)
    );
  }
};
`;

  return content;
}

// Fonction principale
function indexDocuments() {
  console.log('🔍 Indexation des documents CL Evolution...');
  
  const docsPath = path.join(__dirname, '..', 'public', 'documents', 'Documents CL Evolution pour hardcode');
  
  if (!fs.existsSync(docsPath)) {
    console.error('❌ Dossier des documents introuvable:', docsPath);
    return;
  }
  
  console.log('📁 Scanning:', docsPath);
  const documents = scanDirectory(docsPath);
  
  console.log(`📄 ${documents.length} documents trouvés`);
  
  // Statistiques par type
  const stats = {
    pdf: documents.filter(d => d.type === 'pdf').length,
    image: documents.filter(d => d.type === 'image').length, 
    office: documents.filter(d => d.type === 'office').length
  };
  
  console.log('📊 Répartition:');
  console.log(`   📄 PDF: ${stats.pdf}`);
  console.log(`   🖼️  Images: ${stats.image}`);
  console.log(`   📋 Office: ${stats.office}`);
  
  // Génération du fichier TypeScript
  const tsContent = generateTypeScriptFile(documents);
  const outputPath = path.join(__dirname, '..', OUTPUT_FILE);
  
  fs.writeFileSync(outputPath, tsContent);
  console.log(`✅ Fichier généré: ${OUTPUT_FILE}`);
  console.log(`🎉 Indexation terminée ! ${documents.length} documents disponibles dans la maquette.`);
}

// Exécution
if (require.main === module) {
  indexDocuments();
}

module.exports = { indexDocuments };