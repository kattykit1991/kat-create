# EAVA · READY_TO_USE 1.0.0

Living Parchment / Midnight Manuscript · bestehende unabhängige Foundation.

**Den gesamten Ordner EAVA/ kopieren.** Alle benötigten Schriften, Lizenzen, Icons, Bilder und Skripte liegen darin. Keine Installation, kein Build, keine Verweise zu einer Originalbibliothek. `starter.html` ist der kleine Ausgangspunkt ohne verpflichtendes Branding; `preview.html` zeigt funktionierende Beispiele; `assets.html` listet die tatsächlich beiliegenden Grafik-/Fontdateien. `ASSETS.json` und `manifest.json` enthalten Herkunft, Status und Inventar.

## Normales HTML

Kopiere den Ordner beispielsweise nach `styles/EAVA/` und binde ein:

```html
<script src="styles/EAVA/scripts/theme.js"></script>
<link rel="stylesheet" href="styles/EAVA/style.css">
<script defer src="styles/EAVA/scripts/components.js"></script>
<main class="eava-container">
  <h1>Mein Projekt</h1>
  <button type="button" class="eava-button eava-button--primary">Meine Aktion</button>
</main>
```

Eigene Buttons mit Anwendungsaktionen verbinden; die Stylingklasse allein führt keine Aktion aus. Die mitgelieferten HTML-Beispiele zeigen die echten lokalen Hooks. Dateipfade relativ zu deiner HTML-Seite wählen; den inneren Aufbau des Styleordners erhalten.

## React / Vite

Kopiere **den vollständigen Ordner** nach `public/styles/EAVA/`. In Vites index.html einbinden:

```html
<script src="%BASE_URL%styles/EAVA/scripts/theme.js"></script>
<link rel="stylesheet" href="%BASE_URL%styles/EAVA/style.css">
<script defer src="%BASE_URL%styles/EAVA/scripts/components.js"></script>
```

`%BASE_URL%` wird von Vite für öffentliche Ressourcen ersetzt und unterstützt auch eine konfigurierte Unterpfad-Basis. In JSX für Bilder `import.meta.env.BASE_URL + 'styles/EAVA/icons/search.svg'` verwenden; für EAVA `icons/light/search.svg` beziehungsweise `icons/dark/search.svg` wählen oder das Inline-Beispiel übernehmen.

Ein direkt kopierbarer React-Baustein für React 18 oder neuer liegt unter `examples/react.jsx`. Er setzt lediglich ein bereits bestehendes React-/Vite-Projekt voraus; hier liegen keine Builder-Anwendung, package.json oder node_modules bei. Die Komponenten-Runtime nutzt Ereignisdelegation und funktioniert auch für nachträglich von React eingefügte Inhalte. Nicht zusätzlich dieselben Hooks per eigener Click-Logik doppelt ausführen. Für SSR ist eine eigene clientseitige Einbindung notwendig; dies ist ein Browser-Stylepaket.

## Bausteine und Zustände

Bestehende EAVA-Tokens und Typografie bleiben erhalten. `style.css` lädt die eigene farblose technische Basis, Tokens, Theme und Komponenten vollständig lokal. Historische `--kat-*`-Rollennamen werden zur Quellenkompatibilität beibehalten; sie integrieren keine fremde Marke. Keine Maskottchen, fremden Logos, neue Lore oder erfundene Siegel.

Light/Dark/System über `data-theme` am html-Element; kein Attribut bedeutet System. Der optionale frühe scripts/theme.js speichert ausschließlich die eigene Auswahl unter eava-theme und behandelt gesperrten Speicher. React-Beispiele rufen nach dem Mount `EavaTheme.sync()` auf, damit dynamisch eingefügte Selects den aktuellen Modus zeigen. Kein Netzaufruf.

Buttons/Icon-Buttons mit Hover, focus-visible, Active, Disabled und Pressed, Karten/Oberflächen, beschriftete Felder, Select, Checkbox, neutraler Hinweis, Badge, Breadcrumb, native Details, Dialog und lokal validierendes Formular. Beispiele unter components/. `data-pack-dialog="ID"`, `data-pack-close`, `data-eava-toggle` und `data-pack-form` sind technische Hooks. `data-pack-form` prüft native Pflichtfelder lokal und sendet nichts. Native Disabled-Attribute beibehalten.

Zwölf einfache technische Funktionssymbole liegen in icons/currentColor/, icons/light/ und icons/dark/. Es sind neutrale Bedienzeichen, keine Runen, Zeichen eines neuen Weltalphabets oder kreativen Illustrationen. Inline-SVGs erben die tatsächliche aktuelle Textfarbe. Für externe Bilder die passende feste Kontrastvariante wählen. Ein optionaler vorhandener technischer Kapiteltrenner liegt unter decorations/; er ist kein kanonisches Siegel.

Vier lokale Familien: Cinzel, Literata, IM Fell English und Noto Sans; vollständige vorhandene SIL-OFL-Texte liegen in fonts/. Keine externen Fontanfragen. Die beiden Hintergrundflächen sind die vorhandenen Themefarben; keine Pseudo-Fantasytexturen oder fremden Ersatzbilder werden mitgeliefert.

## Herkunft, Rechte und Erweiterungen

Grafik-/Fontquellen und dokumentierter Status stehen in ASSETS.json. Alle Pfade darin sind logische Quellenlabels und keine Laufzeitabhängigkeiten. Fontlizenzen liegen direkt neben den Fontdateien. Es wird keine zusätzliche öffentliche Lizenz für Marken- oder persönliche Bildassets erfunden. preview.css und assets.js dienen ausschließlich den kleinen lokalen Beispielen und sind für die eigentliche UI nicht nötig.

GAPS.md nennt optionale kreative Erweiterungen und bewusst ausgeschlossene Kandidaten. Diese Erweiterungen verhindern nicht die direkte Nutzung der enthaltenen technischen Komponenten. QUALITY.md nennt die tatsächlich durchgeführten Prüfungen und deren Grenzen. Keine pauschale WCAG-Konformität oder nicht ausgeführte Browserprüfung behauptet.
