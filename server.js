// Run:  node server.js     then open  http://localhost:3000
// Serves the www folder and lets the Save button write www/data.json directly.
const http = require('http'), fs = require('fs'), path = require('path');
const WWW = path.join(__dirname, 'www');
const TYPES = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.png':'image/png','.webmanifest':'application/manifest+json','.css':'text/css','.md':'text/plain'};

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  if (req.method === 'POST' && url === '/__save') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try { JSON.parse(body); fs.writeFileSync(path.join(WWW, 'data.json'), body); res.writeHead(200); res.end('ok'); console.log('Saved www/data.json', new Date().toLocaleTimeString()); }
      catch (e) { res.writeHead(400); res.end('bad'); }
    });
    return;
  }
  let file = path.join(WWW, url === '/' ? 'index.html' : url);
  if (!file.startsWith(WWW)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, {'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store'});
    res.end(data);
  });
}).listen(3000, () => console.log('Open http://localhost:3000  (Save writes to www/data.json)'));
