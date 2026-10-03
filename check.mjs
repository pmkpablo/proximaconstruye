import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
const html = await readFile('dist/index.html','utf8');
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
for (const [,path] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
 if (/^(https?:|mailto:)/.test(path)) continue;
 if (path.startsWith('#')) { if (!ids.has(path.slice(1))) throw new Error(`Ancla inexistente: ${path}`); }
 else await access(resolve('dist',path.split(/[?#]/)[0]));
}
execFileSync(process.execPath,['--check','dist/app.js'],{stdio:'inherit'});
console.log('Verificados: archivos locales, anclas y sintaxis JavaScript. dist/ está preparado para Cloudflare Pages.');
