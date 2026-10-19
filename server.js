'use strict';
// Full Hosting Cloud Apps: minimal Node.js starter. No dependencies.
// The platform sets PORT; the app must listen on 0.0.0.0 so the domain can reach it.
const http = require('node:http');

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

const PAGE = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tu app Node.js está funcionando</title>
<style>
body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f7f8fa;color:#111827}
main{max-width:560px;margin:24px 16px;padding:32px;background:#fff;border:1px solid #e5e7eb;border-radius:16px;text-align:center}
h1{font-size:1.6rem;margin:0 0 12px}p{line-height:1.6;color:#4b5563;margin:0 0 8px}code{background:#f3f4f6;padding:2px 6px;border-radius:6px}
@media (prefers-color-scheme:dark){body{background:#0b0f17;color:#f3f4f6}main{background:#111827;border-color:#1f2937}p{color:#9ca3af}code{background:#1f2937}}
</style></head>
<body><main>
<h1>Tu app Node.js está funcionando</h1>
<p>Editá este proyecto y volvé a desplegar para ver tus cambios.</p>
<p>El punto de entrada es <code>server.js</code>.</p>
</main></body></html>`;

const server = http.createServer((req, res) => {
  const path = (req.url || '/').split('?')[0];
  if (path === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end('{"status":"ok"}');
  }
  if (path !== '/') {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    return res.end('No encontrado');
  }
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(PAGE);
});

server.listen(PORT, HOST, () => console.log(`Listening on http://${HOST}:${PORT}`));
process.on('SIGTERM', () => server.close(() => process.exit(0)));
