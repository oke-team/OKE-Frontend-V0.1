const fs = require('fs');
const path = require('path');

// Script pour copier le worker PDF dans le dossier public
// Partie intégrante de la super app de gestion - performance maximale

const sourceFile = path.join(__dirname, '../node_modules/pdfjs-dist/build/pdf.worker.min.mjs');
const targetFile = path.join(__dirname, '../public/pdf.worker.min.mjs');

try {
  // Vérifier que le fichier source existe
  if (!fs.existsSync(sourceFile)) {
    console.error('❌ Worker PDF source introuvable:', sourceFile);
    process.exit(1);
  }

  // Créer le dossier public si nécessaire
  const publicDir = path.dirname(targetFile);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Copier le fichier
  fs.copyFileSync(sourceFile, targetFile);
  
  console.log('✅ Worker PDF copié avec succès pour la super app OKÉ');
  console.log(`   Source: ${sourceFile}`);
  console.log(`   Cible:  ${targetFile}`);
  
  // Vérifier la taille du fichier copié
  const stats = fs.statSync(targetFile);
  console.log(`   Taille: ${Math.round(stats.size / 1024)} KB`);
  
} catch (error) {
  console.error('❌ Erreur lors de la copie du worker PDF:', error.message);
  process.exit(1);
}