// Simple static file server for testing the docs folder
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
const DOCS_DIR = join(__dirname, 'docs');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json'
};

const server = createServer(async (req, res) => {
  try {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // Remove query parameters
    filePath = filePath.split('?')[0];
    
    const fullPath = join(DOCS_DIR, filePath);
    const ext = extname(fullPath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      const content = await readFile(fullPath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
      console.log(`✓ ${req.method} ${req.url} - 200`);
    } catch (err) {
      // If file not found, serve index.html for SPA routing
      if (err.code === 'ENOENT') {
        try {
          const indexContent = await readFile(join(DOCS_DIR, 'index.html'));
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(indexContent);
          console.log(`✓ ${req.method} ${req.url} - 200 (fallback to index.html)`);
        } catch {
          res.writeHead(404);
          res.end('Not Found');
          console.log(`✗ ${req.method} ${req.url} - 404`);
        }
      } else {
        throw err;
      }
    }
  } catch (error) {
    res.writeHead(500);
    res.end('Internal Server Error');
    console.error(`✗ Error: ${error.message}`);
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 Static server running at http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${DOCS_DIR}\n`);
});
