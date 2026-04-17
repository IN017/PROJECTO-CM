const fs = require('fs');
const path = require('path');

// Criar directório .vercel/output se não existir
const outputDir = path.join(__dirname, '.vercel', 'output');
const staticDir = path.join(outputDir, 'static');

if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

// Copiar ficheiros de FRONT-END para .vercel/output/static
const sourceDir = path.join(__dirname, 'FRONT-END');
const copyRecursive = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  fs.readdirSync(src).forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    
    if (fs.statSync(srcFile).isDirectory()) {
      copyRecursive(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
};

copyRecursive(sourceDir, staticDir);
console.log('Build completo: ficheiros copiados de FRONT-END para .vercel/output/static');
