# 👻 KAT CREATE

Ein persönlicher Projektgenerator mit TypeScript, KAT DEV TOOLS und optionalen Style-Paketen. Gleichzeitig ein Portfolio- und Lernprojekt: verständliche Funktionen statt eines Plugin-Frameworks.

Der erste Prototyp entstand mit einer Hand und Kartoffeln in der anderen. 🥔 Der bisherige React/Vite-Ablauf und alle vorhandenen Templates bleiben die Grundlage dieser Erweiterung.

## Benutzung

Voraussetzung für den Generator: Node.js ab 22.12 und die manuell installierten Repository-Abhängigkeiten. Getestet wurde mit Node.js 24.19.0.

```sh
# Einmalig selbst ausführen, falls die Abhängigkeiten fehlen:
npm install

# Im Repository:
npm start
```

Die CLI fragt Kategorie, Sprache, Framework, Projekttyp und Namen ab. Danach folgen die optionalen DEV TOOLS, ein unabhängiges Style-Paket und bei Web-Apps eine persönliche Starteransicht. Eine Zusammenfassung zeigt das Ziel und gegebenenfalls den externen Generatorbefehl. Erst nach Bestätigung wird erzeugt; Enter allein bricht ab. Strg+C beendet die Auswahl.

Projektname: maximal 64 Zeichen, Groß-/Kleinbuchstaben, Ziffern und einzelne Bindestriche oder Unterstriche, beginnend mit einem Buchstaben. `test_blerps_00`, `TEST_BLERPS_00` und `testblerpsi_00` bleiben als Ordnernamen exakt erhalten. Windows-Gerätenamen sind unabhängig von der Schreibweise gesperrt; Leerzeichen werden abgelehnt. Das Ziel liegt im aktuellen Arbeitsverzeichnis und darf noch nicht existieren – auch kein leerer Ordner oder Symlink.

Interne npm-Paketnamen werden kleingeschrieben und Unterstriche durch Bindestriche ersetzt, z. B. `TEST_BLERPS_00` → `test-blerps-00`. Die CLI zeigt den abweichenden Paketnamen vor der Erzeugung an. Da Next.js auch den Ordnernamen als Paketnamen validiert, erzeugen die Web-Generatoren bei Bedarf intern in einem kompatibel benannten Unterordner. Dessen Inhalt wird in den gewünschten Projektordner übernommen; dieser selbst wird nicht umbenannt. Python-Projektnamen dürfen Großbuchstaben und Unterstriche enthalten und bleiben in den Metadaten erhalten. .NET erhält einen geeigneten internen Projektnamen; Bindestriche werden wie bisher entfernt, Unterstriche und Großbuchstaben bleiben erhalten.

Für einen lokal verlinkten Befehl selbst ausführen:

```sh
npm run build
npm link
# Danach in deinem gewünschten Elternordner:
kat-create
```

Es wird nichts automatisch installiert, wiederhergestellt, gestartet, committet oder gepusht. Externe npm-Generatoren können nach deiner Bestätigung heruntergeladen werden und selbst nach Cache-Installation fragen. Das ist vom anschließenden `npm install` **im erzeugten Projekt** getrennt. Lokale Node-/Python-/Dokumentations-Starter benötigen zum Erzeugen keinen Download. Die .NET-Varianten benötigen ein vorhandenes SDK.

## Unterstützte Projekttypen

| Kategorie | Sprache | Framework / Projekttyp | Erzeugung |
| --- | --- | --- | --- |
| Frontend | JavaScript, TypeScript | React, Vue, Vanilla | Offizielles create-vite |
| Fullstack | JavaScript, TypeScript | Next.js App Router mit `/api/health` | Offizielles create-next-app |
| Backend | JavaScript, TypeScript | Node.js HTTP JSON-API, `/api/health` | Kleiner lokaler Starter ohne Web-Dependency |
| Backend | Python | FastAPI oder Flask, `/api/health` | Lokaler Starter mit pyproject.toml |
| Backend | C# | ASP.NET Core Minimal API, `/api/health` | dotnet new webapi |
| CLI | JavaScript, TypeScript | Node.js Konsolenprogramm | Lokaler Starter |
| CLI | Python | argparse-Konsolenprogramm | Lokaler Starter |
| CLI | C# | .NET Konsole | dotnet new console |
| Bibliothek | JavaScript, TypeScript | Node.js ES-Modul | Lokaler Starter |
| Bibliothek | Python | Paket `starter` unter src/ | Lokaler Starter |
| Bibliothek | C# | .NET Klassenbibliothek | dotnet new classlib |
| Dokumentation | Keine | Projektordner mit DEV TOOLS | Vorhandene Templates |

Das sind 22 auswählbare Kombinationen. Next.js liefert eine zusammenhängende Fullstack-Anwendung; ein getrenntes Frontend-/Backend-Monorepo gehört noch nicht zum Umfang. Für Python existiert kein einheitlicher offizieller Generator für diese vier Varianten; hier werden bewusst kleine lokale Startdateien erzeugt.

Vite erhält `--no-immediate`, Next.js `--skip-install --disable-git` und .NET `--no-restore`. Framework-Versionen der externen npm-Generatoren folgen `latest`: neue Upstream-Strukturen müssen erneut geprüft werden. Unbekannte Dateistrukturen führen zu einem Fehler statt zu einem als erfolgreich gemeldeten leeren Projekt.

## DEV TOOLS und Styles

Die Dateien unter `templates/` werden nicht verändert. Bei gewählten DEV TOOLS werden `AGENTS.md` und `PROJECT_README.md` wie bisher zu `AGENTS.md` und `README.md` im Ziel-Root. Die übrigen Vorlagen liegen unter `dev-tools/`, einschließlich `PROJECT_REQUIREMENTS.md` mit getrennten Implementierungs- und Reviewzuständen. Bereits erzeugte Generator-READMEs/AGENTS werden als `GENERATOR_README.md` beziehungsweise `GENERATOR_AGENTS.md` erhalten.

CORE, CUTE_COZY, DARK_MAGICAL und EAVA sind vier eigenständige, optionale Browser-Pakete. Es wird genau das gewählte Paket vollständig kopiert; keine Vererbung und kein automatisches Hinzufügen von CORE. Der hier enthaltene CORE ist laut seiner Paket-README der visuelle Soft-&-Creamy-Style, nicht die frühere farblose technische Basis.

Web-Apps erhalten das Paket unter `public/styles/<PAKET>/`, andere Projekttypen unter `styles/<PAKET>/` als zusätzliche Ressource. Web-Apps binden das Stylesheet ein und setzen passende Containerklassen. Optionale Dialog-/Theme-Skripte des Pakets werden bei Bedarf nach dessen README eingebunden. Der persönliche Starter zeigt den Projektnamen und einen Gruß an Kat; ohne diese Option bleibt eine minimale Projektüberschrift. Es werden keine neuen Logos oder Illustrationen erfunden.

Vite-Demos, Zähler, Demo-Styles und bekannte Logos werden in der frisch erzeugten Anwendung bereinigt. Next.js erhält eine kleine Seite, ein Layout ohne externe Demo-Schriften und einen Health-Endpunkt. Die .NET-WeatherForecast-Demo wird ebenfalls durch einen Health-Endpunkt ersetzt. Die originalen Dateien in `templates/` bleiben dabei unangetastet.

## Nach dem Erzeugen

`KAT_CREATE.md` enthält die zum Projekttyp passenden manuellen Installations-, Build- und Startbefehle. Die CLI zeigt sie ebenfalls an. Beispiele:

- Vite / Next.js: `npm install`, danach `npm run dev`.
- Node.js mit TypeScript: `npm install`, `npm run build`, bei Apps `npm start`.
- Python: virtuelle Umgebung selbst erstellen/aktivieren, `python -m pip install -e .`, danach den dokumentierten Framework-Befehl ausführen. Python-Starter setzen Python 3.10+ voraus.
- .NET: `dotnet restore`, danach `dotnet run --no-restore` oder bei Bibliotheken `dotnet build --no-restore`.

`kat-create.json` speichert die gewählten Optionen mit Formatversion 1. Es werden keine geheimen Zugangsdaten abgefragt. Backend-Starter besitzen einen kleinen funktionierenden Endpunkt, aber keine Authentifizierung, Datenbank oder Deploymentkonfiguration.

Bei Fehlern endet die CLI mit Exitcode 1. Ein bereits erzeugter Teilstand bleibt zur Prüfung erhalten; es wird kein Zielordner rekursiv gelöscht. Für einen neuen Versuch einen freien Namen verwenden oder den Teilstand selbst prüfen und entfernen.

## Code und Erweiterung

| Datei | Verantwortung |
| --- | --- |
| `src/index.ts` | Terminaldialog, Auswahl, Zusammenfassung und Bestätigung |
| `src/catalog.ts` | Typen, verfügbare Kombinationen und Optionsvalidierung |
| `src/generator.ts` | Externe Befehle, Ablauf, Templatekopien und Folgeanleitung |
| `src/scaffolds.ts` | Kleine lokale Node.js-/Python-Starter und Dateischreiben |
| `src/presentation.ts` | Bereinigung frisch erzeugter Web-Demos und Starteransichten |
| `tests/generator.test.ts` | Erzeugung, Kopiertreue, Befehle und Fehlerfälle |

Neue Kombinationen werden im Katalog ergänzt. Ein tatsächlich neuer Erzeugungsweg benötigt zusätzlich eine überschaubare Funktion im Generator bzw. Scaffold-Modul und passende Tests. Es gibt keine leeren Adapter oder angeblich fertigen Platzhalter.

Für spätere Aufrufer ist `createProject()` unabhängig vom Terminal verfügbar. KATUARY selbst wird nicht implementiert. Nach `npm run build` ist beispielsweise möglich:

```js
import { createProject } from './dist/generator.js';

await createProject({
  name: 'mein-projekt',
  typeId: 'node-cli-javascript',
  devTools: true,
  style: null,
  starter: false,
}, '/absoluter/elternordner');
```

Der Aufrufer verantwortet die Zustimmung zu externen Generatoren. Der optionale dritte Parameter ist eine einfache Prozessfunktion für Tests; die normale Verwendung braucht ihn nicht. `projectTypes` aus `catalog.ts` liefert gültige IDs und Auswahlmetadaten.

## Prüfungen und Grenzen

```sh
npm run typecheck
npm run build
npm test
# Optional mit vorhandenem .NET SDK, ohne Restore/Build/Start:
KAT_CREATE_TEST_DOTNET=1 npm test
```

Die Tests installieren keine Pakete und starten keine erzeugten Anwendungen. Die .NET-Tests isolieren CLI-Home und NuGet-Verzeichnis in einem temporären Ordner. Ohne die Umgebungsvariable werden die zwölf .NET-Fälle (je Projekttyp vier Namen) ausdrücklich übersprungen. Weitere 32 Integrationstests lassen sich mit `KAT_CREATE_TEST_VITE=/absoluter/pfad/create-vite/index.js` und `KAT_CREATE_TEST_NEXT=/absoluter/pfad/create-next-app/dist/index.js` aktivieren. Die Pfade müssen auf bereits vorhandene Generatoren zeigen; die Tests installieren sie nicht. Die Generator-Einstellungen werden nur im jeweiligen Testprozess in ein temporäres Home-Verzeichnis umgeleitet.

Prüfstand vom 13.11.2026: **143 Tests erfolgreich**, einschließlich 32 echter Web-Erzeugungen mit bereits vorhandenem create-vite 9.3.3 / create-next-app 16.4.3 und zwölf echter .NET-Erzeugungen mit SDK 10.0.404. Die drei bevorzugten Namensbeispiele werden für alle 22 Projekttypen geprüft; Web- und .NET-Varianten zusätzlich mit den vorhandenen echten Generatoren. Lokale Node-/Python-Starter wurden tatsächlich erzeugt, Node-Dateien auf Syntax geprüft, generiertes Node-TypeScript mit dem vorhandenen Compiler geprüft und Python-Quellen/TOML geparst. Alle vier Stylekopien und die DEV TOOLS wurden auf Bytegleichheit geprüft. Typecheck und Build des Generators waren erfolgreich.

**Vite/Next.js wurden sowohl mit synthetischen Ausgaben als auch mit vorhandenen echten Generatoren geprüft.** Das belegt die Erzeugung, Übergabe und Bereinigung aller angebotenen Web-Varianten, aber keinen neuen Download oder vollständigen Framework-Build. Ohne optionale Werkzeuge/Pfade besteht der Standardlauf aus 99 erfolgreichen Tests und 44 ausdrücklich übersprungenen Integrationstests. Es gab keine Paketinstallation, keinen Restore und keinen App-Start als Teil der Prüfung. Browser-/Layoutprüfung, Windows-Ausführung sowie die Installation/Builds der erzeugten Apps bleiben offen. Die CLI wurde zusätzlich im echten Terminal geprüft.

Weitere Grenzen: Next.js-Stylesheet-URLs verwenden den Rootpfad; bei einem später konfigurierten `basePath` muss das Layout angepasst werden. Die Starteransicht nutzt CSS und keine interaktiven Pack-Komponenten. Python-Paket-/Framework-Installationen und .NET-Kompilation sind nicht durch den Erzeugungstest abgedeckt. Die vollständigen Grafikpakete sind teilweise groß (CORE ca. 128 MB, CUTE_COZY ca. 227 MB, DARK_MAGICAL ca. 117 MB).

Befehlsreferenzen: [Vite-Generator](https://github.com/vitejs/vite/tree/main/packages/create-vite), [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app), [dotnet new](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new).

Gebaut von Kat · Software-Engineering-Lernprojekt · KAT DEV TOOLS 👻🥔
