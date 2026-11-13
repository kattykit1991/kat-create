import { readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import type { ProjectOptions, ProjectType } from './catalog.js';
import { writeFiles } from './scaffolds.js';

export async function prepareWebProject(target: string, type: ProjectType, options: ProjectOptions): Promise<void> {
  const { name, style, starter } = options;
  const eava = style === 'EAVA';
  const theme = style ? ({ CORE: 'core', CUTE_COZY: 'cozy', DARK_MAGICAL: 'dark', EAVA: '' } as const)[style] : '';
  const classes = style ? (eava ? 'eava-container eava-stack' : 'kat-ui kat-container kat-stack') : '';
  const text = starter ? `<p>Hallo Kat! Hier beginnt dein nächstes Projekt.</p>` : '';
  const markup = `<main class="${classes}"${theme ? ` data-kat-theme="${theme}"` : ''}><h1>${name}</h1>${text}</main>`;
  const css = '/* Platz für deine eigenen Projektstile. */\n';
  if (type.generator === 'vite') {
    const entry = type.framework === 'React' ? `src/App.${type.language === 'TypeScript' ? 'tsx' : 'jsx'}` : type.framework === 'Vue' ? 'src/App.vue' : `src/main.${type.language === 'TypeScript' ? 'ts' : 'js'}`;
    await readFile(join(target, entry), 'utf8');
    let html = await readFile(join(target, 'index.html'), 'utf8');
    if (!html.includes('</head>')) throw new Error('Vite-Struktur unbekannt: index.html enthält kein </head>.');
    html = html.replace(/<title>.*?<\/title>/s, `<title>${name}</title>`)
      .replace(/<link\b[^>]*rel=["']icon["'][^>]*>/g, '')
      .replace('<html lang="en">', '<html lang="de">');
    if (style) html = html.replace('</head>', `<link rel="stylesheet" href="%BASE_URL%styles/${style}/style.css">\n</head>`);
    await writeFiles(target, { 'index.html': html, [type.framework === 'React' ? 'src/index.css' : 'src/style.css']: css });
    if (type.framework === 'React') {
      await writeFiles(target, { [`src/App.${type.language === 'TypeScript' ? 'tsx' : 'jsx'}`]: `export default function App() {\n  return (${markup.replace('class=', 'className=')});\n}\n`, 'src/App.css': css });
    } else if (type.framework === 'Vue') {
      await writeFiles(target, { 'src/App.vue': `<template>\n  ${markup}\n</template>\n` });
    } else {
      const ts = type.language === 'TypeScript';
      await writeFiles(target, { [`src/main.${ts ? 'ts' : 'js'}`]: `import './style.css';\n\ndocument.querySelector${ts ? '<HTMLDivElement>' : ''}('#app')${ts ? '!' : ''}.innerHTML = ${JSON.stringify(markup)};\n` });
    }
    // Nur bekannte Demo-Dateien der frisch erzeugten App entfernen.
    for (const path of ['public/vite.svg', 'src/assets/react.svg', 'src/assets/vue.svg', 'src/javascript.svg', 'src/typescript.svg', 'src/counter.ts', 'src/counter.js', 'src/components/HelloWorld.vue']) {
      await rm(join(target, path), { force: true });
    }
    return;
  }
  const extension = type.language === 'TypeScript' ? 'tsx' : 'js';
  await readFile(join(target, `src/app/layout.${extension}`), 'utf8');
  await writeFiles(target, {
    [`src/app/page.${extension}`]: `export default function Home() {\n  return (${markup.replace('class=', 'className=')});\n}\n`,
    [`src/app/layout.${extension}`]: `import './globals.css';\n\nexport const metadata = { title: '${name}', description: 'Ein KAT CREATE Projekt' };\n\nexport default function RootLayout({ children }${extension === 'tsx' ? ': { children: React.ReactNode }' : ''}) {\n  return (\n    <html lang="de">\n      <head>${style ? `<link rel="stylesheet" href="/styles/${style}/style.css" />` : ''}</head>\n      <body>{children}</body>\n    </html>\n  );\n}\n`,
    'src/app/globals.css': css,
    [`src/app/api/health/route.${extension === 'tsx' ? 'ts' : 'js'}`]: `export function GET() {\n  return Response.json({ status: 'ok' });\n}\n`,
  });
  for (const path of ['src/app/page.module.css', 'src/app/favicon.ico', 'public/next.svg', 'public/vercel.svg', 'public/file.svg', 'public/globe.svg', 'public/window.svg']) {
    await rm(join(target, path), { force: true });
  }
}
