/**
 * Script Node.js pour générer les icônes PWA
 * 
 * Ce script crée des icônes placeholder pour le PWA.
 * Pour de vraies icônes, utilisez un outil comme:
 * - https://realfavicongenerator.net/
 * - https://www.pwabuilder.com/imageGenerator
 * - sharp ou jimp pour générer depuis un logo
 */

const fs = require('fs');
const path = require('path');

// Créer le dossier icons s'il n'existe pas
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Fonction pour créer un SVG carré avec le logo OKÉ
function createSVG(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4C34CE;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#6B46C1;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#bg)" rx="${size * 0.1}" />
  <circle cx="${size/2}" cy="${size/2}" r="${size * 0.35}" fill="rgba(255, 255, 255, 0.15)" />
  <text x="${size/2}" y="${size/2 + size * 0.05}" 
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-size="${size * 0.27}" font-weight="bold" fill="white" text-anchor="middle">OKÉ</text>
</svg>`;
}

// Fonction pour créer un SVG maskable (avec plus de padding)
function createMaskableSVG(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4C34CE;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#6B46C1;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#bg)" />
  <circle cx="${size/2}" cy="${size/2}" r="${size * 0.25}" fill="rgba(255, 255, 255, 0.15)" />
  <text x="${size/2}" y="${size/2 + size * 0.04}" 
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-size="${size * 0.2}" font-weight="bold" fill="white" text-anchor="middle">OKÉ</text>
</svg>`;
}

// Tailles d'icônes à générer
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const maskableSizes = [192, 512];

// Générer les icônes normales
sizes.forEach(size => {
  const svg = createSVG(size);
  const filename = path.join(iconsDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(filename, svg);
  console.log(`✅ Créé: icon-${size}x${size}.svg`);
});

// Générer les icônes maskable
maskableSizes.forEach(size => {
  const svg = createMaskableSVG(size);
  const filename = path.join(iconsDir, `maskable-icon-${size}x${size}.svg`);
  fs.writeFileSync(filename, svg);
  console.log(`✅ Créé: maskable-icon-${size}x${size}.svg`);
});

// Générer les icônes spéciales pour les raccourcis
const specialIcons = [
  { name: 'dashboard-96x96', letter: 'D', color: '#4C34CE' },
  { name: 'accounting-96x96', letter: 'C', color: '#FAA016' },
  { name: 'invoice-96x96', letter: 'F', color: '#10B981' }
];

specialIcons.forEach(icon => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <rect width="96" height="96" fill="${icon.color}" rx="10" />
  <circle cx="48" cy="48" r="35" fill="rgba(255, 255, 255, 0.2)" />
  <text x="48" y="58" 
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-size="48" font-weight="bold" fill="white" text-anchor="middle">${icon.letter}</text>
</svg>`;
  
  const filename = path.join(iconsDir, `${icon.name}.svg`);
  fs.writeFileSync(filename, svg);
  console.log(`✅ Créé: ${icon.name}.svg`);
});

console.log('\n📱 Icônes PWA créées avec succès!');
console.log('Note: Ces icônes sont des placeholders. Pour de vraies icônes, utilisez un générateur professionnel.');