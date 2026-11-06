import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4173;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  let filePath = path.join(DIST_DIR, reqPath);

  // Security check: ensure path is within DIST_DIR
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403);
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // SPA Fallback: serve index.html for unknown routes
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const isImmutableAsset = filePath.includes(path.join('dist', 'assets'));

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500);
        res.end('500 Server Error');
        return;
      }

      const headers = {
        'Content-Type': contentType,
        'Cache-Control': isImmutableAsset ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
      };

      const acceptEncoding = req.headers['accept-encoding'] || '';
      const shouldCompress = ['.html', '.js', '.css', '.json', '.svg'].includes(ext);

      if (shouldCompress && acceptEncoding.includes('gzip')) {
        headers['Content-Encoding'] = 'gzip';
        zlib.gzip(content, (gzipErr, compressed) => {
          if (gzipErr) {
            delete headers['Content-Encoding'];
            res.writeHead(200, headers);
            res.end(content);
          } else {
            res.writeHead(200, headers);
            res.end(compressed);
          }
        });
      } else {
        res.writeHead(200, headers);
        res.end(content);
      }
    });
  });
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n🎉 HSK Free Lab preview server running at: ${url}`);
  console.log(`Serving files from: ${DIST_DIR}`);
  console.log(`Press Ctrl+C to stop the server.\n`);
});