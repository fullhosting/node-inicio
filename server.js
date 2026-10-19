'use strict';
// Full Hosting Cloud Apps: minimal Node.js starter. No dependencies.
// The platform sets PORT; the app must listen on 0.0.0.0 so the domain can reach it.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';
const PAGE = fs.readFileSync(path.join(__dirname, 'index.html'));

const server = http.createServer((req, res) => {
  const url = (req.url || '/').split('?')[0];
  if (url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end('{"status":"ok"}');
  }
  if (url !== '/') {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    return res.end('No encontrado');
  }
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(PAGE);
});

server.listen(PORT, HOST, () => console.log(`Listening on http://${HOST}:${PORT}`));
process.on('SIGTERM', () => server.close(() => process.exit(0)));
