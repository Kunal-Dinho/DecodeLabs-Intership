'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { courses, internships } = require('./data');
const root = path.join(__dirname, '..');
const applicationsFile = path.join(__dirname, 'applications.json');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json' };

function json(res, status, body) { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(body)); }
function readBody(req) { return new Promise((resolve, reject) => { let data = ''; req.on('data', c => { data += c; if (data.length > 100000) req.destroy(); }); req.on('end', () => { try { resolve(JSON.parse(data || '{}')); } catch { reject(new Error('Invalid JSON')); } }); }); }
function saveApplication(application) { const records = fs.existsSync(applicationsFile) ? JSON.parse(fs.readFileSync(applicationsFile, 'utf8') || '[]') : []; records.push(application); fs.writeFileSync(applicationsFile, JSON.stringify(records, null, 2)); }

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/api/courses') return json(res, 200, courses);
  if (req.method === 'GET' && url.pathname === '/api/internships') return json(res, 200, internships);
  const match = url.pathname.match(/^\/api\/(courses|internships)\/([a-z0-9-]+)$/);
  if (req.method === 'GET' && match) { const item = (match[1] === 'courses' ? courses : internships).find(x => x.slug === match[2]); return item ? json(res, 200, item) : json(res, 404, { error: 'Not found' }); }
  if (req.method === 'POST' && url.pathname === '/api/applications') { try { const body = await readBody(req); if (!body.name || !/^\S+@\S+\.\S+$/.test(body.email) || !body.internship) return json(res, 400, { error: 'Name, email and internship are required.' }); saveApplication({ id: Date.now(), createdAt: new Date().toISOString(), ...body }); return json(res, 201, { message: 'Application received. We will contact you soon.' }); } catch { return json(res, 400, { error: 'Please send a valid application.' }); } }
  if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { error: 'Method not allowed' });
  const safePath = path.normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '');
  const filePath = path.join(root, safePath || 'index.html');
  if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) return res.end('Not found');
  res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream' }); fs.createReadStream(filePath).pipe(res);
});
server.listen(process.env.PORT || 3000, () => console.log('NTESHIP running at http://localhost:' + (process.env.PORT || 3000)));
