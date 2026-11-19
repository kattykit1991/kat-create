export type Category = 'Frontend' | 'Backend' | 'Fullstack' | 'CLI' | 'Bibliothek' | 'Dokumentation';
export type Language = 'JavaScript' | 'TypeScript' | 'Python' | 'C#' | 'Keine';
export type Generator = 'vite' | 'next' | 'node' | 'python' | 'dotnet' | 'docs';
export interface ProjectType {
  id: string;
  category: Category;
  language: Language;
  framework: string;
  label: string;
  generator: Generator;
  template: string;
}

// Neue Varianten hier ergänzen; Generatoren bleiben einfache, explizite Funktionen.
export const projectTypes: ProjectType[] = [];
function add(category: Category, language: Language, framework: string, generator: Generator, template: string, label: string) {
  projectTypes.push({ id: `${template}-${language.toLowerCase().replace('#', 'sharp')}`, category, language, framework, generator, template, label });
}
for (const language of ['TypeScript', 'JavaScript'] as const) {
  for (const framework of ['React', 'Vue', 'Vanilla']) {
    const template = framework.toLowerCase() + (language === 'TypeScript' ? '-ts' : '');
    add('Frontend', language, framework, 'vite', template, 'Vite Web-App');
  }
  add('Fullstack', language, 'Next.js', 'next', 'next', 'App Router');
  add('Backend', language, 'Node.js', 'node', 'node-api', 'HTTP JSON-API');
  add('CLI', language, 'Node.js', 'node', 'node-cli', 'Konsolenprogramm');
  add('Bibliothek', language, 'Node.js', 'node', 'node-lib', 'ES-Modul');
}
add('Backend', 'Python', 'FastAPI', 'python', 'fastapi', 'JSON-API');
add('Backend', 'Python', 'Flask', 'python', 'flask', 'JSON-API');
add('CLI', 'Python', 'Standardbibliothek', 'python', 'python-cli', 'Konsolenprogramm');
add('Bibliothek', 'Python', 'Standardbibliothek', 'python', 'python-lib', 'Python-Paket');
add('Backend', 'C#', 'ASP.NET Core', 'dotnet', 'webapi', 'Minimal API');
add('CLI', 'C#', '.NET', 'dotnet', 'console', 'Konsolenprogramm');
add('Bibliothek', 'C#', '.NET', 'dotnet', 'classlib', 'Klassenbibliothek');
add('Dokumentation', 'Keine', 'DEV TOOLS', 'docs', 'docs', 'Projektordner');

export const styles = ['CORE', 'CUTE_COZY', 'DARK_MAGICAL', 'EAVA'] as const;
export type Style = typeof styles[number];
export interface ProjectOptions {
  name: string;
  typeId: string;
  devTools: boolean;
  style: Style | null;
  starter: boolean;
}
export function getProjectType(id: string): ProjectType {
  const type = projectTypes.find(type => type.id === id);
  if (!type) throw new Error(`Unbekannter Projekttyp: ${id}`);
  return type;
}
export function toPackageName(name: string): string {
  return name.toLowerCase().replace(/_/g, '-');
}

export function supportsStyles(type: ProjectType): boolean {
  return type.generator === 'vite' || type.generator === 'next';
}

export function validateOptions(options: ProjectOptions): ProjectType {
  // Ein einzelner portabler Ordnername verhindert Traversal und Shell-Sonderzeichen.
  if (!/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/i.test(options.name) || options.name.length > 64 || /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i.test(options.name)) {
    throw new Error('Projektname: 1–64 Zeichen, Groß-/Kleinbuchstaben, Ziffern und einzelne Bindestriche oder Unterstriche; mit Buchstabe oder Ziffer beginnen.');
  }
  const type = getProjectType(options.typeId);
  if (typeof options.devTools !== 'boolean' || typeof options.starter !== 'boolean' || (options.style !== null && !styles.includes(options.style))) {
    throw new Error('Ungültige Projektoptionen.');
  }
  if (options.style !== null && !supportsStyles(type)) throw new Error('Style-Pakete sind nur für Projekte mit Web-UI verfügbar.');
  if (options.starter && !supportsStyles(type)) throw new Error('Eine Starteransicht ist nur für Web-Apps verfügbar.');
  return type;
}
