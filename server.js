const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const FRONT_END_DIR = path.join(__dirname, 'FRONT-END');

// MIME types
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  // Remove query strings
  let filePath = path.join(FRONT_END_DIR, req.url === '/' ? 'index.html' : req.url);
  
  // Prevenir path traversal attacks
  if (!filePath.startsWith(FRONT_END_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Definir headers de cache e segurança
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Cache headers
  if (filePath.endsWith('.html')) {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  } else {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Tentar servir o ficheiro
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Se for um diretório, servir index.html
      if (err.code === 'ENOENT') {
        const indexPath = path.join(filePath, 'index.html');
        fs.stat(indexPath, (indexErr, indexStats) => {
          if (!indexErr && indexStats.isFile()) {
            serveFile(indexPath, '.html');
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
              <!DOCTYPE html>
              <html lang="pt">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>404 - Página não encontrada</title>
              </head>
              <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                <h1>404 - Página não encontrada</h1>
                <p>O ficheiro ${req.url} não foi encontrado.</p>
                <a href="/">Voltar à página principal</a>
              </body>
              </html>
            `);
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro interno do servidor');
      }
    } else if (stats.isFile()) {
      serveFile(filePath, path.extname(filePath));
    } else {
      // É um diretório, servir index.html
      const indexPath = path.join(filePath, 'index.html');
      fs.stat(indexPath, (indexErr, indexStats) => {
        if (!indexErr && indexStats.isFile()) {
          serveFile(indexPath, '.html');
        } else {
          res.writeHead(403, { 'Content-Type': 'text/plain' });
          res.end('Forbidden');
        }
      });
    }
  });

  function serveFile(filePath, ext) {
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro ao ler o ficheiro');
        return;
      }
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  }
});

server.listen(PORT, () => {
  console.log(`✓ Servidor iniciado em http://localhost:${PORT}`);
  console.log(`✓ Servindo ficheiros de: ${FRONT_END_DIR}`);
});

server.on('error', (err) => {
  console.error('Erro do servidor:', err.message);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Servidor encerrado');
  server.close();
});
