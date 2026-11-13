import { access, cp, mkdir, readFile, readdir, rename, rmdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { toPackageName, validateOptions } from './catalog.js';
import type { ProjectOptions, ProjectType } from './catalog.js';
import { createLocalProject, writeFiles } from './scaffolds.js';
import { prepareWebProject } from './presentation.js';

const templates = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'templates');
export interface Command { command: string; args: string[] }
export type CommandRunner = (command: Command, cwd: string) => Promise<void>;

export function generatorCommand(type: ProjectType, name: string): Command | null {
  const webDirectory = toPackageName(name) === name ? '.' : toPackageName(name);
  if (type.generator === 'vite') {
    return { command: 'npm', args: [
      'exec', '--package=create-vite@latest', '--', 'create-vite', webDirectory,
      '--template', type.template, '--no-interactive', '--no-immediate',
      '--eslint', '--no-devtools',
    ] };
  }
  if (type.generator === 'next') {
    return { command: 'npm', args: [
      'exec', '--package=create-next-app@latest', '--', 'create-next-app', webDirectory,
      type.language === 'TypeScript' ? '--ts' : '--js',
      '--app', '--src-dir', '--no-tailwind', '--eslint', '--no-react-compiler',
      '--no-cache-components', '--import-alias', '@/*', '--use-npm',
      '--skip-install', '--disable-git', '--no-agents-md', '--no-agent-feedback', '--yes',
    ] };
  }
  if (type.generator === 'dotnet') {
    const projectName = name.replace(/-([a-z0-9])/gi, (_, letter: string) => letter.toUpperCase());
    return { command: 'dotnet', args: [
      'new', type.template, '--name', projectName, '--output', '.', '--no-restore',
      ...(type.template === 'webapi' ? ['--no-openapi'] : []),
    ] };
  }
  return null;
}

export const runCommand: CommandRunner = ({ command, args }, cwd) => new Promise((resolve, reject) => {
  const child = spawn(command, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
  child.once('error', error => reject(new Error(`${command} konnte nicht gestartet werden: ${error.message}`)));
  child.once('close', (code, signal) => code === 0 ? resolve() : reject(new Error(`${command} fehlgeschlagen (${signal ?? code}).`)));
});

export function nextSteps(type: ProjectType): string[] {
  if (type.generator === 'vite' || type.generator === 'next') return ['npm install', 'npm run dev'];
  if (type.generator === 'node') return ['npm install', ...(type.language === 'TypeScript' ? ['npm run build'] : []), ...(type.template !== 'node-lib' ? ['npm start'] : [])];
  if (type.generator === 'dotnet') return ['dotnet restore', type.template === 'classlib' ? 'dotnet build --no-restore' : 'dotnet run --no-restore'];
  if (type.generator === 'python') return ['python3 -m venv .venv', '# macOS/Linux: source .venv/bin/activate | PowerShell: .venv\\Scripts\\Activate.ps1', 'python -m pip install -e .', ...(type.template === 'fastapi' ? ['python -m uvicorn app:app --reload'] : type.template === 'flask' ? ['python -m flask --app app run --debug'] : type.template === 'python-cli' ? ['python app.py'] : ['python -c "from starter import greet; print(greet(\'Kat\'))"'])];
  return ['# README.md und gegebenenfalls dev-tools/ bearbeiten.'];
}

async function addDevTools(target: string): Promise<void> {
  const source = join(templates, 'dev-tools');
  await mkdir(join(target, 'dev-tools'));
  for (const entry of await readdir(source)) {
    if (entry === 'AGENTS.md' || entry === 'PROJECT_README.md') continue;
    await cp(join(source, entry), join(target, 'dev-tools', entry), { recursive: true, force: false, errorOnExist: true });
  }
  // Offizielle Generator-Dokumentation aufheben, statt sie still zu verlieren.
  const entries = await readdir(target);
  for (const file of ['README.md', 'AGENTS.md']) {
    if (entries.includes(file)) await rename(join(target, file), join(target, `GENERATOR_${file}`));
  }
  await cp(join(source, 'AGENTS.md'), join(target, 'AGENTS.md'), { errorOnExist: true, force: false });
  await cp(join(source, 'PROJECT_README.md'), join(target, 'README.md'), { errorOnExist: true, force: false });
}

/** UI-unabhängiger Einstieg für spätere Aufrufer wie KATUARY. Führt nie Installation oder Start aus. */
export async function createProject(options: ProjectOptions, parentDirectory: string, runner: CommandRunner = runCommand): Promise<string> {
  const type = validateOptions(options);
  if (options.devTools) await access(join(templates, 'dev-tools', 'PROJECT_README.md'));
  if (options.style) await access(join(templates, 'styles', options.style, 'style.css'));
  const target = resolve(parentDirectory, options.name);
  // mkdir ohne recursive reserviert das Ziel und lehnt auch leere Ordner/Symlinks ab.
  await mkdir(target);
  try {
    const command = generatorCommand(type, options.name);
    if (command) {
      await runner(command, target);
      // Next.js prüft auch den Ordnernamen als npm-Paketnamen. Nur intern ausweichen;
      // der vom Nutzer gewünschte Zielordner wird weder ersetzt noch umbenannt.
      if (['vite', 'next'].includes(type.generator) && toPackageName(options.name) !== options.name) {
        const generated = join(target, toPackageName(options.name));
        for (const entry of await readdir(generated)) {
          await rename(join(generated, entry), join(target, entry));
        }
        await rmdir(generated);
      }
    } else await createLocalProject(target, options.name, type);
    if (type.generator === 'vite' || type.generator === 'next') await prepareWebProject(target, type, options);
    if (type.generator === 'dotnet' && type.template === 'webapi') {
      await readFile(join(target, 'Program.cs'), 'utf8');
      await writeFiles(target, { 'Program.cs': 'var builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\n\napp.MapGet("/api/health", () => new { status = "ok" });\n\napp.Run();\n' });
    }
    if (options.style) {
      const destination = ['vite', 'next'].includes(type.generator) ? 'public/styles' : 'styles';
      await cp(join(templates, 'styles', options.style), join(target, destination, options.style), { recursive: true, force: false, errorOnExist: true, filter: source => !source.endsWith('/.DS_Store') });
    }
    if (options.devTools) await addDevTools(target);
    const steps = nextSteps(type);
    await writeFiles(target, {
      'KAT_CREATE.md': `# ${options.name}\n\nErzeugt mit KAT CREATE: ${type.category} · ${type.language} · ${type.framework} · ${type.label}\n\n## Manuelle nächste Schritte\n\nIm Projektordner, Befehle einzeln ausführen:\n\n\`\`\`sh\n${steps.join('\n')}\n\`\`\`\n\nEs wurden keine Projektabhängigkeiten installiert, keine Restores und keine Projektstarts ausgeführt.\n\n${options.style ? `Style: ${options.style}. Vollständiges Paket unter ${['vite', 'next'].includes(type.generator) ? 'public/' : ''}styles/${options.style}/.\n\nWeb-Apps binden das CSS ein. Interaktive Pack-Skripte bei Bedarf entsprechend der Paket-README ergänzen. Bei Next.js mit basePath die Stylesheet-URL im Layout anpassen.\n` : 'Kein Style-Paket ausgewählt.\n'}\n${type.template === 'webapi' ? 'Die WeatherForecast-Demo wurde durch GET /api/health ersetzt.\n' : ''}`,
      'kat-create.json': JSON.stringify({ version: 1, ...options }, null, 2) + '\n',
    });
    // Fehlt ein README (z. B. lokaler Starter ohne DEV TOOLS), auf die Anleitung verweisen.
    if (!(await readdir(target)).includes('README.md')) await writeFile(join(target, 'README.md'), await readFile(join(target, 'KAT_CREATE.md')));
    return target;
  } catch (error) {
    // Kein rekursives Löschen: auch bei Fehlern bleiben erzeugte Dateien prüfbar.
    throw new Error(`Erzeugung in ${target} fehlgeschlagen. Teilstand bleibt erhalten; für einen neuen Versuch einen freien Namen wählen.`, { cause: error });
  }
}
