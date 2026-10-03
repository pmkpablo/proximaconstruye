import { readFile, access, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, relative, sep } from 'node:path';
import { execFileSync } from 'node:child_process';
const root = resolve('dist');
async function walk(dir) {
  const entries = await readdir(dir,{withFileTypes:true});
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(resolve(dir,e.name)) : resolve(dir,e.name)))).flat();
}
const files = await walk(root);
const htmls = files.filter(f => f.endsWith('.html'));
const documents = new Map();
for (const file of htmls) documents.set(file,await readFile(file,'utf8'));
let checked = 0;
for (const [file,html] of documents) {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  if (ids.length !== new Set(ids).size) throw new Error(`IDs duplicados: ${file}`);
  if (!file.endsWith('404.html')) {
    if ((html.match(/<h1[ >]/g) || []).length !== 1) throw new Error(`Debe haber un h1: ${file}`);
    if (!html.includes('rel="canonical"') || !html.includes('name="description"')) throw new Error(`Falta metadata: ${file}`);
    if (!html.includes('Sitio web por <strong>Axhum Tech</strong>')) throw new Error(`Falta crédito: ${file}`);
    const text = html.replace(/<[^>]*>/g,' ');
    if (/\$\s*\d|\b(?:USD|ARS)\s*\d|\d+[.,]?\d*\s*(?:pesos|dólares)/i.test(text)) throw new Error(`Precio publicado: ${file}`);
  }
  for (const [,link] of html.matchAll(/(?:src|href|data-image)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(link)) continue;
    const [path,fragment] = link.split('#');
    const clean = path.split('?')[0];
    let target = clean ? (clean.startsWith('/') ? resolve(root,'.' + clean) : resolve(dirname(file),clean)) : file;
    if (target !== root && !target.startsWith(root + sep)) throw new Error(`Ruta fuera de dist: ${link}`);
    await access(target);
    if ((await stat(target)).isDirectory()) target = resolve(target,'index.html');
    await access(target);
    if (fragment) {
      const targetHtml = documents.get(target);
      if (!targetHtml || ![...targetHtml.matchAll(/\bid="([^"]+)"/g)].some(m=>m[1]===fragment)) throw new Error(`Ancla inexistente ${relative(root,file)}: ${link}`);
    }
    checked++;
  }
}
for (const file of files) if ((await stat(file)).size > 25 * 1024 * 1024) throw new Error(`Asset supera límite de Pages: ${file}`);
execFileSync(process.execPath,['--check','dist/app.js'],{stdio:'inherit'});
execFileSync(process.execPath,['--check','build-site.mjs'],{stdio:'inherit'});
console.log(`Verificados ${htmls.length-1} páginas, ${checked} enlaces/recursos, metadata, crédito, ausencia de precios y sintaxis JavaScript. dist/ listo para Cloudflare Pages.`);
