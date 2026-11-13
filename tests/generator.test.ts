import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, rm, writeFile, mkdir, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { projectTypes, styles, toPackageName, validateOptions } from '../src/catalog.js';
import type { ProjectOptions, ProjectType } from '../src/catalog.js';
import { createProject, generatorCommand, runCommand } from '../src/generator.js';
import { writeFiles } from '../src/scaffolds.js';

function options(type: ProjectType, extra: Partial<ProjectOptions> = {}): ProjectOptions {
  return { name: 'test-project', typeId: type.id, devTools: false, style: null, starter: false, ...extra };
}
async function temporary(work: (directory: string) => Promise<void>) {
  const directory = await mkdtemp(join(tmpdir(), 'kat-create-test-'));
  try { await work(directory); } finally { await rm(directory, { recursive: true, force: true }); }
}
const nodeType = projectTypes.find(type => type.template === 'node-cli' && type.language === 'JavaScript')!;

// Bewusst kleine synthetische Generatorausgaben: kein Netzwerk, keine Paketinstallation.
async function fakeWebGenerator(target: string, type: ProjectType, name = 'test-project') {
  const ts = type.language === 'TypeScript';
  await writeFiles(target, {
    'package.json': JSON.stringify({ name }),
    'README.md': 'Official generator instructions',
    'AGENTS.md': 'Official agent instructions',
    'index.html': '<html lang="en"><head><link rel="icon" href="/vite.svg"><title>Vite</title></head><body><div id="app"></div></body></html>',
    [type.framework === 'React' ? `src/App.${ts ? 'tsx' : 'jsx'}` : type.framework === 'Vue' ? 'src/App.vue' : `src/main.${ts ? 'ts' : 'js'}`]: 'Demo',
    [`src/app/layout.${ts ? 'tsx' : 'js'}`]: 'Demo layout',
    'public/vite.svg': 'demo logo',
    'src/counter.ts': 'demo counter',
  });
}

test('Katalog: eindeutige IDs und gültige Optionen für alle Varianten', () => {
  assert.equal(new Set(projectTypes.map(type => type.id)).size, projectTypes.length);
  for (const type of projectTypes) assert.equal(validateOptions(options(type)), type);
});

test('ungültige Namen und Optionen werden vor Dateischreibzugriffen abgelehnt', async () => {
  await temporary(async directory => {
    for (const name of ['', '.', '..', '../escape', '/tmp/escape', 'has space', 'bad;echo', '$(pwd)', 'con', 'CON', 'aux', 'AUX', 'com1', 'COM1', 'foo--bar', ' foo', 'foo ', 'a'.repeat(65)]) {
      await assert.rejects(createProject(options(nodeType, { name }), directory), /Projektname/);
    }
    await assert.rejects(createProject(options(nodeType, { typeId: 'unknown' }), directory), /Unbekannter/);
    await assert.rejects(createProject(options(nodeType, { style: '../escape' as never }), directory), /Projektoptionen/);
    await assert.rejects(createProject(options(nodeType, { starter: true }), directory), /Web-Apps/);
    assert.deepEqual(await readdir(directory), []);
  });
});

const preferredNames = ['test_blerps_00', 'TEST_BLERPS_00', 'testblerpsi_00'];
test('Namenskompatibilität für npm und .NET ohne Änderung der Eingabe', () => {
  assert.equal(toPackageName('node_modules'), 'node-modules');
  const type = projectTypes.find(type => type.generator === 'dotnet')!;
  const command = generatorCommand(type, 'TEST-BLERPS_00')!;
  assert.equal(command.args[command.args.indexOf('--name') + 1], 'TESTBLERPS_00');
});

test('Fehler im internen Generator-Unterordner erhalten den exakten Zielordner und den Teilstand', async () => temporary(async directory => {
  const name = 'TEST_BLERPS_00';
  const type = projectTypes.find(type => type.generator === 'next')!;
  await assert.rejects(createProject(options(type, { name }), directory, async (command, cwd) => {
    await writeFiles(join(cwd, command.args[4]!), { 'evidence.txt': 'Teilstand' });
    throw new Error('Generatorfehler');
  }), /Teilstand bleibt/);
  assert.deepEqual(await readdir(directory), [name]);
  assert.equal(await readFile(join(directory, name, toPackageName(name), 'evidence.txt'), 'utf8'), 'Teilstand');
  await assert.rejects(createProject(options(type, { name }), directory), { code: 'EEXIST' });
}));

for (const name of preferredNames) {
  for (const type of projectTypes) {
    test(`exakter Ordnername und kompatible interne Namen: ${name} · ${type.id}`, async () => temporary(async directory => {
      const packageName = toPackageName(name);
      const target = await createProject(options(type, { name }), directory, async (command, cwd) => {
        assert.equal(cwd, join(directory, name));
        if (['vite', 'next'].includes(type.generator)) {
          const generatorDirectory = command.args[4]!;
          assert.equal(generatorDirectory, packageName === name ? '.' : packageName);
          await fakeWebGenerator(join(cwd, generatorDirectory), type, packageName);
        } else {
          const projectName = command.args[command.args.indexOf('--name') + 1]!;
          assert.equal(projectName, name);
          await writeFiles(cwd, { [`${projectName}.csproj`]: '<Project />', 'Program.cs': '// SDK output' });
        }
      });
      assert.equal(target, join(directory, name));
      assert.deepEqual(await readdir(directory), [name]);
      assert.equal(JSON.parse(await readFile(join(target, 'kat-create.json'), 'utf8')).name, name);
      assert.match(await readFile(join(target, 'KAT_CREATE.md'), 'utf8'), new RegExp(`^# ${name}\\n`));
      if (['vite', 'next', 'node'].includes(type.generator)) {
        assert.equal(JSON.parse(await readFile(join(target, 'package.json'), 'utf8')).name, name.toLowerCase().replace(/_/g, '-'));
        assert.ok(!(await readdir(target)).includes(packageName), 'Kein interner Generator-Unterordner bleibt zurück');
      }
      if (type.generator === 'python') {
        assert.ok((await readFile(join(target, 'pyproject.toml'), 'utf8')).includes(`name = "${name}"`));
      }
    }));
  }
}

test('bestehende Dateien, leere Ordner und Symlinks bleiben geschützt', async () => {
  await temporary(async directory => {
    const target = join(directory, 'test-project');
    await mkdir(target);
    await assert.rejects(createProject(options(nodeType), directory), { code: 'EEXIST' });
    await rm(target, { recursive: true });
    await writeFile(target, 'Original');
    await assert.rejects(createProject(options(nodeType), directory), { code: 'EEXIST' });
    assert.equal(await readFile(target, 'utf8'), 'Original');
    await rm(target);
    await symlink(join(directory, 'elsewhere'), target);
    await assert.rejects(createProject(options(nodeType), directory), { code: 'EEXIST' });
  });
});

for (const type of projectTypes.filter(type => ['node', 'python', 'docs'].includes(type.generator))) {
  test(`lokal erzeugen: ${type.id}`, async () => temporary(async directory => {
    const target = await createProject(options(type), directory, async () => assert.fail('Kein externer Prozess erlaubt'));
    assert.match(await readFile(join(target, 'KAT_CREATE.md'), 'utf8'), /Manuelle nächste Schritte/);
    assert.equal((JSON.parse(await readFile(join(target, 'kat-create.json'), 'utf8'))).typeId, type.id);
    assert.ok(!(await readdir(target)).includes('node_modules'));
    if (type.generator === 'node') {
      const ts = type.language === 'TypeScript';
      const entry = join(target, 'src', `index.${ts ? 'ts' : 'js'}`);
      const syntax = spawnSync(process.execPath, ['--check', entry], { encoding: 'utf8' });
      assert.equal(syntax.status, 0, syntax.stderr);
      if (ts) {
        const check = spawnSync(process.execPath, [resolve('node_modules/typescript/bin/tsc'), '--noEmit', '--project', target, '--typeRoots', resolve('node_modules/@types')], { encoding: 'utf8' });
        assert.equal(check.status, 0, check.stdout + check.stderr);
      }
      // Kein Projektstart: Bibliotheksfunktion nur isoliert importieren und prüfen.
      if (type.template === 'node-lib' && !ts) {
        const { greet } = await import(entry);
        assert.equal(greet('Kat'), 'Hallo, Kat!');
      }
    }
    if (type.generator === 'python') {
      const source = join(target, type.template === 'python-lib' ? 'src/starter/__init__.py' : 'app.py');
      const result = spawnSync('python3', ['-c', 'import ast, pathlib, sys, tomllib; ast.parse(pathlib.Path(sys.argv[1]).read_text()); tomllib.loads(pathlib.Path(sys.argv[2]).read_text())', source, join(target, 'pyproject.toml')], { encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
    }
  }));
}

for (const type of projectTypes.filter(type => ['vite', 'next'].includes(type.generator))) {
  test(`synthetische Web-Generatorübergabe und Demo-Bereinigung: ${type.id}`, async () => temporary(async directory => {
    let calls = 0;
    const target = await createProject(options(type, { starter: true, devTools: true }), directory, async (command, cwd) => {
      calls++;
      assert.equal(cwd, join(directory, 'test-project'));
      assert.deepEqual(command, generatorCommand(type, 'test-project'));
      await fakeWebGenerator(cwd, type);
    });
    assert.equal(calls, 1);
    const source = type.generator === 'next' ? `src/app/page.${type.language === 'TypeScript' ? 'tsx' : 'js'}` : type.framework === 'React' ? `src/App.${type.language === 'TypeScript' ? 'tsx' : 'jsx'}` : type.framework === 'Vue' ? 'src/App.vue' : `src/main.${type.language === 'TypeScript' ? 'ts' : 'js'}`;
    assert.match(await readFile(join(target, source), 'utf8'), /Hallo Kat/);
    assert.equal(await readFile(join(target, 'GENERATOR_README.md'), 'utf8'), 'Official generator instructions');
    assert.equal(await readFile(join(target, 'GENERATOR_AGENTS.md'), 'utf8'), 'Official agent instructions');
    assert.equal(await readFile(join(target, 'AGENTS.md'), 'utf8'), await readFile('templates/dev-tools/AGENTS.md', 'utf8'));
    await assert.rejects(readFile(join(target, type.generator === 'vite' ? 'public/vite.svg' : 'public/next.svg')));
    if (type.generator === 'next') {
      assert.match(await readFile(join(target, `src/app/api/health/route.${type.language === 'TypeScript' ? 'ts' : 'js'}`), 'utf8'), /Response.json/);
      assert.doesNotMatch(await readFile(join(target, `src/app/layout.${type.language === 'TypeScript' ? 'tsx' : 'js'}`), 'utf8'), /next\/font/);
    }
  }));
}

async function hashes(directory: string, prefix = ''): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  for (const entry of await readdir(join(directory, prefix), { withFileTypes: true })) {
    if (entry.name === '.DS_Store') continue;
    const path = join(prefix, entry.name);
    if (entry.isDirectory()) Object.assign(result, await hashes(directory, path));
    else result[path] = createHash('sha256').update(await readFile(join(directory, path))).digest('hex');
  }
  return result;
}
for (const style of styles) {
  test(`vollständige unveränderte Stylekopie: ${style}`, async () => temporary(async directory => {
    const type = projectTypes.find(type => type.template === 'react-ts')!;
    const before = await hashes(resolve('templates/styles', style));
    const target = await createProject(options(type, { style }), directory, async (_, cwd) => fakeWebGenerator(cwd, type));
    assert.deepEqual(await hashes(join(target, 'public/styles', style)), before);
    assert.deepEqual(await hashes(resolve('templates/styles', style)), before);
    assert.match(await readFile(join(target, 'index.html'), 'utf8'), new RegExp(`%BASE_URL%styles/${style}/style.css`));
    const source = await readFile(join(target, 'src/App.tsx'), 'utf8');
    assert.ok(source.includes(style === 'EAVA' ? 'eava-container' : 'kat-ui'));
    assert.doesNotMatch(source, /Hallo Kat/);
  }));
}

test('DEV TOOLS vollständig und bytegleich, keine doppelten Root-Vorlagen', async () => temporary(async directory => {
  const target = await createProject(options(nodeType, { devTools: true }), directory);
  for (const file of await readdir('templates/dev-tools')) {
    const destination = file === 'PROJECT_README.md' ? 'README.md' : file === 'AGENTS.md' ? 'AGENTS.md' : `dev-tools/${file}`;
    assert.deepEqual(await readFile(join(target, destination)), await readFile(join('templates/dev-tools', file)));
  }
  assert.ok(!(await readdir(join(target, 'dev-tools'))).includes('AGENTS.md'));
}));

test('Fehler und unbekannte Generatorstruktur: Teilstand bleibt, erneuter Versuch überschreibt nichts', async () => temporary(async directory => {
  const type = projectTypes.find(type => type.generator === 'vite')!;
  await assert.rejects(createProject(options(type), directory, async (_, cwd) => {
    await writeFile(join(cwd, 'evidence.txt'), 'keep');
    throw new Error('simulierter Generatorfehler');
  }), /Teilstand bleibt/);
  assert.equal(await readFile(join(directory, 'test-project/evidence.txt'), 'utf8'), 'keep');
  await assert.rejects(createProject(options(type), directory), { code: 'EEXIST' });
  await assert.rejects(createProject(options(type, { name: 'unexpected' }), directory, async () => {}), /Teilstand bleibt/);
}));

test('Prozessfehler und fehlendes Werkzeug werden gemeldet', async () => {
  await assert.rejects(runCommand({ command: 'kat-create-missing-executable', args: [] }, tmpdir()), /konnte nicht gestartet/);
  await assert.rejects(runCommand({ command: process.execPath, args: ['-e', 'process.exit(7)'] }, tmpdir()), /7/);
});

test('offizielle Befehle unterbinden Installation/Restore/Start', () => {
  for (const type of projectTypes) {
    const command = generatorCommand(type, 'sample');
    if (!command) continue;
    assert.ok(!command.args.includes('install'));
    if (type.generator === 'vite') assert.ok(command.args.includes('--no-immediate'));
    if (type.generator === 'next') {
      assert.ok(command.args.includes('--skip-install'));
      assert.ok(command.args.includes('--disable-git'));
    }
    if (type.generator === 'dotnet') assert.ok(command.args.includes('--no-restore'));
  }
});

for (const type of projectTypes.filter(type => type.generator === 'dotnet')) {
  for (const name of ['test-project', ...preferredNames]) {
    test(`echtes .NET SDK ohne Restore: ${type.id} · ${name}`, { skip: process.env.KAT_CREATE_TEST_DOTNET !== '1' }, async () => temporary(async directory => {
      const target = await createProject(options(type, { name }), directory, async (command, cwd) => {
        const result = spawnSync(command.command, command.args, {
          cwd, encoding: 'utf8', timeout: 30000,
          env: { ...process.env, DOTNET_CLI_HOME: join(directory, 'dotnet-home'), NUGET_PACKAGES: join(directory, 'nuget'), DOTNET_CLI_TELEMETRY_OPTOUT: '1', DOTNET_CLI_WORKLOAD_UPDATE_NOTIFY_DISABLE: 'true', DOTNET_NOLOGO: '1' },
        });
        assert.equal(result.status, 0, result.stdout + result.stderr);
      });
      assert.equal(target, join(directory, name));
      assert.ok((await readdir(target)).includes(`${name.replace(/-([a-z0-9])/gi, (_, letter: string) => letter.toUpperCase())}.csproj`));
      assert.ok(!(await readdir(target)).includes('obj'), 'Kein Restore-Artefakt');
      if (type.template === 'webapi') {
        const program = await readFile(join(target, 'Program.cs'), 'utf8');
        assert.match(program, /api\/health/);
        assert.doesNotMatch(program, /WeatherForecast/);
      }
    }));
  }
}

test('CLI-Hilfe und fehlendes Terminal erzeugen keine Projekte', () => {
  const help = spawnSync(process.execPath, ['--import', 'tsx', 'src/index.ts', '--help'], { encoding: 'utf8' });
  assert.equal(help.status, 0, help.stderr);
  assert.match(help.stdout, /KAT CREATE/);
  const noTerminal = spawnSync(process.execPath, ['--import', 'tsx', 'src/index.ts'], { encoding: 'utf8' });
  assert.equal(noTerminal.status, 1);
  assert.match(noTerminal.stderr, /benötigt ein Terminal/);
});

// Optional vorhandene Generatoren nutzen, niemals per npm nachinstallieren.
for (const type of projectTypes.filter(type => ['vite', 'next'].includes(type.generator))) {
  const script = process.env[type.generator === 'vite' ? 'KAT_CREATE_TEST_VITE' : 'KAT_CREATE_TEST_NEXT'];
  for (const name of ['test-project', ...preferredNames]) {
    test(`echter vorhandener Web-Generator ohne Installation: ${type.id} · ${name}`, { skip: !script }, async () => temporary(async directory => {
      const preload = join(directory, 'isolated-home.cjs');
      // Conf verwendet auf macOS os.homedir() statt XDG_CONFIG_HOME. Nur im Testprozess isolieren.
      await writeFile(preload, "require('node:os').homedir = () => process.env.KAT_CREATE_TEST_HOME;\n");
      const target = await createProject(options(type, { name, style: 'EAVA', starter: true }), directory, async (command, cwd) => {
        const args = command.args.slice(command.args.indexOf('--') + 2);
        const result = spawnSync(process.execPath, ['--require', preload, script!, ...args], {
          cwd, encoding: 'utf8', timeout: 30000,
          env: { ...process.env, CI: '1', NEXT_TELEMETRY_DISABLED: '1', KAT_CREATE_TEST_HOME: join(directory, 'generator-home') },
        });
        assert.equal(result.status, 0, result.stdout + result.stderr);
      });
      assert.equal(target, join(directory, name));
      const entries = await readdir(target);
      assert.ok(!entries.includes(toPackageName(name)), 'Kein interner Generator-Unterordner bleibt zurück');
      assert.ok(entries.includes('package.json'));
      assert.ok(!entries.includes('node_modules'));
      assert.ok(!entries.includes('package-lock.json'));
      assert.ok(!entries.includes('.git'));
      assert.ok(!entries.includes('.next'));
      const manifest = JSON.parse(await readFile(join(target, 'package.json'), 'utf8'));
      assert.equal(manifest.name, toPackageName(name));
      assert.ok(manifest.scripts.dev);
      if (type.generator === 'next') {
        const extension = type.language === 'TypeScript' ? 'tsx' : 'js';
        assert.match(await readFile(join(target, `src/app/page.${extension}`), 'utf8'), /Hallo Kat/);
        assert.match(await readFile(join(target, `src/app/layout.${extension}`), 'utf8'), /styles\/EAVA\/style.css/);
      } else {
        assert.match(await readFile(join(target, 'index.html'), 'utf8'), /%BASE_URL%styles\/EAVA\/style.css/);
      }
    }));
  }
}
