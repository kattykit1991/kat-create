#!/usr/bin/env node
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { projectTypes, styles, toPackageName, validateOptions } from './catalog.js';
import type { ProjectOptions } from './catalog.js';
import { createProject, generatorCommand, nextSteps } from './generator.js';

async function main(): Promise<void> {
  if (process.argv.includes('--help')) {
    console.log('KAT CREATE\n\nnpm start — interaktive Projektauswahl\nkat-create — nach npm run build und manuellem npm link\n\nKeine automatischen Projektinstallationen, Restores oder Starts.\nAPI: createProject(options, parentDirectory) aus generator.ts.');
    return;
  }
  if (!stdin.isTTY) throw new Error('Die interaktive CLI benötigt ein Terminal. Für Programme createProject() verwenden.');
  const rl = createInterface({ input: stdin, output: stdout });
  const controller = new AbortController();
  rl.on('SIGINT', () => controller.abort());
  const ask = (text: string) => rl.question(text, { signal: controller.signal });
  async function choose<T extends string>(title: string, items: readonly T[]): Promise<T> {
    console.log(`\n${title}`);
    items.forEach((item, index) => console.log(`  ${index + 1}. ${item}`));
    while (true) {
      const answer = (await ask('Nummer: ')).trim();
      const item = /^\d+$/.test(answer) ? items[Number(answer) - 1] : undefined;
      if (item !== undefined) return item;
      console.log('Bitte eine der angezeigten Nummern eingeben.');
    }
  }
  async function yesNo(text: string, defaultValue: boolean): Promise<boolean> {
    while (true) {
      const answer = (await ask(`${text} ${defaultValue ? '[J/n]' : '[j/N]'}: `)).trim().toLowerCase();
      if (!answer) return defaultValue;
      if (['j', 'ja', 'y', 'yes'].includes(answer)) return true;
      if (['n', 'nein', 'no'].includes(answer)) return false;
      console.log('Bitte j oder n eingeben.');
    }
  }
  let options: ProjectOptions;
  try {
    console.log('👻 KAT CREATE · Dein Projektstart');
    const category = await choose('Projektkategorie', [...new Set(projectTypes.map(type => type.category))]);
    const inCategory = projectTypes.filter(type => type.category === category);
    const language = await choose('Sprache', [...new Set(inCategory.map(type => type.language))]);
    const inLanguage = inCategory.filter(type => type.language === language);
    const framework = await choose('Framework / Umgebung', [...new Set(inLanguage.map(type => type.framework))]);
    const inFramework = inLanguage.filter(type => type.framework === framework);
    const label = await choose('Projekttyp', inFramework.map(type => type.label));
    const type = inFramework.find(type => type.label === label)!;
    let name = '';
    while (true) {
      name = await ask('\nProjektname (z. B. test_blerps_00): ');
      try {
        validateOptions({ name, typeId: type.id, devTools: false, style: null, starter: false });
        break;
      } catch (error) { console.log((error as Error).message); }
    }
    const devTools = category === 'Dokumentation' || await yesNo('KAT DEV TOOLS hinzufügen?', true);
    const selectedStyle = await choose('Optionales unabhängiges Style-Paket', ['Keines', ...styles] as const);
    const style = selectedStyle === 'Keines' ? null : selectedStyle;
    if (style && !['vite', 'next'].includes(type.generator)) console.log('Das Browser-Stylepaket wird als Ressource kopiert; es gestaltet keine API oder Konsole.');
    const starter = ['vite', 'next'].includes(type.generator) && await yesNo('Kleine persönliche Starteransicht hinzufügen?', true);
    options = { name, typeId: type.id, devTools, style, starter };
    console.log(`\nZiel: ${process.cwd()}/${name}\n${category} · ${language} · ${framework} · ${label}\nDEV TOOLS: ${devTools ? 'ja' : 'nein'} · Style: ${style ?? 'keiner'} · Starter: ${starter ? 'ja' : 'nein'}`);
    if (['vite', 'next', 'node'].includes(type.generator) && toPackageName(name) !== name) {
      console.log(`Interner Paketname: ${toPackageName(name)} · Projektordner bleibt: ${name}`);
    }
    const command = generatorCommand(type, name);
    if (command) {
      console.log(`\nExterner Generator im neuen Projektordner:\n${command.command} ${command.args.join(' ')}\n`);
      if (command.command === 'npm') console.log('npm kann den Generator in seinen Cache laden und fragt ggf. nach. Projektabhängigkeiten werden nicht installiert.');
    }
    if (!await yesNo('Projekt jetzt erzeugen?', false)) { console.log('Abgebrochen.'); return; }
  } finally { rl.close(); }
  const target = await createProject(options, process.cwd());
  console.log(`\n✨ Erstellt: ${target}\nAnleitung: KAT_CREATE.md\n\nManuell im Projektordner ausführen:\n${nextSteps(projectTypes.find(type => type.id === options.typeId)!).join('\n')}`);
}

main().catch(error => {
  if (error?.name === 'AbortError') console.error('\nAbgebrochen.');
  else {
    console.error(error instanceof Error ? error.message : error);
    if (error instanceof Error && error.cause) console.error(error.cause);
  }
  process.exitCode = 1;
});
