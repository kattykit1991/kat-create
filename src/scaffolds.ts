import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { ProjectType } from './catalog.js';
import { toPackageName } from './catalog.js';

export async function writeFiles(target: string, files: Record<string, string>): Promise<void> {
  for (const [path, content] of Object.entries(files)) {
    await mkdir(join(target, path, '..'), { recursive: true });
    await writeFile(join(target, path), content);
  }
}

export async function createLocalProject(target: string, name: string, type: ProjectType): Promise<void> {
  if (type.generator === 'docs') return;
  if (type.generator === 'node') {
    const ts = type.language === 'TypeScript';
    const extension = ts ? 'ts' : 'js';
    const api = type.template === 'node-api';
    const library = type.template === 'node-lib';
    const source = api
      ? `import { createServer } from 'node:http';\n\nconst server = createServer((request, response) => {\n  response.setHeader('Content-Type', 'application/json');\n  if (request.url === '/api/health' && request.method === 'GET') {\n    response.end(JSON.stringify({ status: 'ok' }));\n    return;\n  }\n  response.statusCode = 404;\n  response.end(JSON.stringify({ error: 'Not found' }));\n});\n\nserver.listen(Number(process.env.PORT ?? 3000), '127.0.0.1');\n`
      : library ? `export function greet(name${ts ? ': string' : ''})${ts ? ': string' : ''} {\n  return \`Hallo, \${name}!\`;\n}\n`
      : `const name = process.argv[2] ?? 'Kat';\nconsole.log(\`Hallo, \${name}!\`);\n`;
    const entry = ts ? 'dist/index.js' : 'src/index.js';
    const manifest = {
      name: toPackageName(name), version: '0.1.0', private: true, type: 'module',
      ...(library ? { exports: `./${entry}`, ...(ts ? { types: './dist/index.d.ts' } : {}) } : {}),
      scripts: { ...(ts ? { build: 'tsc', typecheck: 'tsc --noEmit' } : {}), ...(!library ? { start: `node ${entry}` } : {}) },
      ...(ts ? { devDependencies: { typescript: '^5.9.3', '@types/node': '^24.0.0' } } : {}),
    };
    await writeFiles(target, {
      'package.json': JSON.stringify(manifest, null, 2) + '\n',
      [`src/index.${extension}`]: source,
      '.gitignore': 'node_modules/\ndist/\n.env\n',
      ...(ts ? { 'tsconfig.json': JSON.stringify({ compilerOptions: { target: 'ES2023', module: 'NodeNext', types: ['node'], strict: true, rootDir: 'src', outDir: 'dist', declaration: library }, include: ['src'] }, null, 2) + '\n' } : {}),
    });
    return;
  }
  const api = type.template === 'fastapi' || type.template === 'flask';
  const source = type.template === 'fastapi'
    ? 'from fastapi import FastAPI\n\napp = FastAPI()\n\n\n@app.get("/api/health")\ndef health():\n    return {"status": "ok"}\n'
    : type.template === 'flask'
      ? 'from flask import Flask\n\napp = Flask(__name__)\n\n\n@app.get("/api/health")\ndef health():\n    return {"status": "ok"}\n'
      : 'import argparse\n\n\ndef main():\n    parser = argparse.ArgumentParser(description="Mein Konsolenprogramm")\n    parser.add_argument("name", nargs="?", default="Kat")\n    args = parser.parse_args()\n    print(f"Hallo, {args.name}!")\n\n\nif __name__ == "__main__":\n    main()\n';
  await writeFiles(target, {
    ...(type.template === 'python-lib'
      ? { 'src/starter/__init__.py': 'def greet(name: str) -> str:\n    return f"Hallo, {name}!"\n' }
      : { 'app.py': source }),
    'pyproject.toml': `[build-system]\nrequires = ["setuptools>=77"]\nbuild-backend = "setuptools.build_meta"\n\n[project]\nname = "${name}"\nversion = "0.1.0"\nrequires-python = ">=3.10"\ndependencies = ${type.template === 'fastapi' ? '["fastapi>=0.115,<1", "uvicorn>=0.34,<1"]' : type.template === 'flask' ? '["flask>=3.1,<4"]' : '[]'}\n\n${api || type.template === 'python-cli' ? '[tool.setuptools]\npy-modules = ["app"]\n' : '[tool.setuptools.packages.find]\nwhere = ["src"]\n'}`,
    '.gitignore': '.venv/\n__pycache__/\n*.egg-info/\nbuild/\ndist/\n.env\n',
  });
}
