#!/usr/bin/env node

/**
 * Script de migration des couleurs vers le design system OKÉ
 * Remplace automatiquement les anciennes couleurs par les nouvelles
 */

const fs = require('fs');
const path = require('path');

// Mapping des anciennes couleurs vers les nouvelles
const colorMappings = [
  // Couleurs primaires (bleu → orange OKÉ)
  { from: /#5e72ff/gi, to: '#FAA016' },
  { from: /#4a5eff/gi, to: '#FAA016' },
  { from: /#3b4ded/gi, to: '#FAA016' },
  { from: /#3142c6/gi, to: '#ea580c' },
  { from: /#2b3aa1/gi, to: '#c2410c' },
  { from: /#3b82f6/gi, to: '#FAA016' }, // Tailwind blue-500
  
  // Couleurs secondaires (violet pastel → violet OKÉ)
  { from: /#d150da/gi, to: '#4C34CE' },
  { from: /#b432bc/gi, to: '#4C34CE' },
  { from: /#942799/gi, to: '#3730a3' },
  { from: /#8b5cf6/gi, to: '#4C34CE' }, // Tailwind violet-500
  
  // Classes Tailwind
  { from: /primary-500/g, to: 'primary' },
  { from: /primary-600/g, to: 'primary-600' },
  { from: /primary-400/g, to: 'primary-400' },
  { from: /secondary-500/g, to: 'secondary' },
  { from: /blue-500/g, to: 'primary' },
  { from: /purple-500/g, to: 'secondary' },
  { from: /violet-500/g, to: 'secondary' },
  
  // Valeurs rgba hardcodées → tokens
  { from: /rgba\(255,\s*255,\s*255,\s*0\.05\)/g, to: 'colors.glass.white[5]' },
  { from: /rgba\(255,\s*255,\s*255,\s*0\.1\)/g, to: 'colors.glass.white[10]' },
  { from: /rgba\(255,\s*255,\s*255,\s*0\.15\)/g, to: 'colors.glass.white[15]' },
  { from: /rgba\(255,\s*255,\s*255,\s*0\.2\)/g, to: 'colors.glass.white[20]' },
  { from: /rgba\(0,\s*0,\s*0,\s*0\.8\)/g, to: 'colors.glass.black[80]' },
];

// Extensions de fichiers à traiter
const fileExtensions = ['.tsx', '.ts', '.jsx', '.js', '.css'];

// Dossiers à traiter
const directories = [
  'components/onboarding',
  'components/ui',
  'lib',
];

// Fonction pour traiter un fichier
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    colorMappings.forEach(mapping => {
      const originalContent = content;
      content = content.replace(mapping.from, mapping.to);
      if (originalContent !== content) {
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Migré: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Erreur lors du traitement de ${filePath}:`, error.message);
    return false;
  }
}

// Fonction pour parcourir récursivement les dossiers
function processDirectory(dirPath) {
  let totalFiles = 0;
  let migratedFiles = 0;
  
  function walk(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walk(filePath);
      } else if (fileExtensions.some(ext => filePath.endsWith(ext))) {
        totalFiles++;
        if (processFile(filePath)) {
          migratedFiles++;
        }
      }
    });
  }
  
  walk(dirPath);
  return { totalFiles, migratedFiles };
}

// Fonction principale
function main() {
  console.log('🎨 Migration des couleurs vers le design system OKÉ...\n');
  
  let totalFiles = 0;
  let totalMigrated = 0;
  
  directories.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    
    if (fs.existsSync(fullPath)) {
      console.log(`📁 Traitement de ${dir}...`);
      const { totalFiles: files, migratedFiles: migrated } = processDirectory(fullPath);
      totalFiles += files;
      totalMigrated += migrated;
      console.log(`   ${migrated}/${files} fichiers migrés\n`);
    } else {
      console.log(`⚠️  Dossier non trouvé: ${dir}\n`);
    }
  });
  
  console.log('═══════════════════════════════════════');
  console.log(`✨ Migration terminée!`);
  console.log(`📊 ${totalMigrated}/${totalFiles} fichiers migrés au total`);
  console.log('═══════════════════════════════════════');
  
  if (totalMigrated > 0) {
    console.log('\n⚠️  Important: Vérifiez les changements et testez l\'application');
    console.log('💡 Conseil: Utilisez "git diff" pour revoir les modifications');
  }
}

// Lancer le script
if (require.main === module) {
  main();
}