# CUTE_COZY · READY_TO_USE 1.0.0

## Wortmarken-Korrektur · 30.10.2026

Die vom Nutzer bestätigte typografische Korrektur von `katc()ded` wurde direkt in die vorhandenen 43 Wortmarken-Dateien übernommen: `brand/wordmark.svg`, die beiden Light-/Dark-Wortmarken und alle horizontalen sowie kompakten Floof-/Nibbs-/Plöpp-Kombinationen, jeweils in den vorhandenen SVG-/PNG-/WebP-Ausgaben. Dateinamen, Abmessungen, transparente Flächen, vorhandene Verweise und alle übrigen Logo-Bestandteile bleiben erhalten. Dies ist die gezielt freigegebene Ausnahme zu den ursprünglichen Aussagen über bytegleich übernommene Grafikdateien. UI, Farben, Bildlogos und Illustrationen sind unverändert. ASSETS.json kennzeichnet die abgeleiteten Wortmarken; vorhandene Ursprungs-Prüfsummen bleiben als Herkunftsnachweis erhalten.

Originale UI-v0.1 mit bestätigtem Mint-Fokus und Mint-Disabled; von v0.4 übernommen.

**Den gesamten Ordner CUTE_COZY/ kopieren.** Alle benötigten Schriften, Lizenzen, Icons, Bilder und Skripte liegen darin. Keine Installation, kein Build, keine Verweise zu einer Originalbibliothek. `starter.html` ist der kleine Ausgangspunkt ohne verpflichtendes Branding; `preview.html` zeigt funktionierende Beispiele; `assets.html` listet die tatsächlich beiliegenden Grafik-/Fontdateien. `ASSETS.json` und `manifest.json` enthalten Herkunft, Status und Inventar.

## Normales HTML

Kopiere den Ordner beispielsweise nach `styles/CUTE_COZY/` und binde ein:

```html
<link rel="stylesheet" href="styles/CUTE_COZY/style.css">
<script defer src="styles/CUTE_COZY/ui.js"></script>
<main class="kat-ui" data-kat-theme="cozy">
  <button type="button" class="kat-button kat-button--primary">Meine Aktion</button>
</main>
```

Eigene Buttons mit Anwendungsaktionen verbinden; die Stylingklasse allein führt keine Aktion aus. Die mitgelieferten HTML-Beispiele zeigen die echten lokalen Hooks. Dateipfade relativ zu deiner HTML-Seite wählen; den inneren Aufbau des Styleordners erhalten.

## React / Vite

Kopiere **den vollständigen Ordner** nach `public/styles/CUTE_COZY/`. In Vites index.html einbinden:

```html
<link rel="stylesheet" href="%BASE_URL%styles/CUTE_COZY/style.css">
<script defer src="%BASE_URL%styles/CUTE_COZY/ui.js"></script>
```

`%BASE_URL%` wird von Vite für öffentliche Ressourcen ersetzt und unterstützt auch eine konfigurierte Unterpfad-Basis. In JSX für Bilder `import.meta.env.BASE_URL + 'styles/CUTE_COZY/icons/search.svg'` verwenden.

Ein direkt kopierbarer React-Baustein für React 18 oder neuer liegt unter `examples/react.jsx`. Er setzt lediglich ein bereits bestehendes React-/Vite-Projekt voraus; hier liegen keine Builder-Anwendung, package.json oder node_modules bei. Die Komponenten-Runtime nutzt Ereignisdelegation und funktioniert auch für nachträglich von React eingefügte Inhalte. Nicht zusätzlich dieselben Hooks per eigener Click-Logik doppelt ausführen. Für SSR ist eine eigene clientseitige Einbindung notwendig; dies ist ein Browser-Stylepaket.

## Bausteine und Zustände

15 HTML-Snippets unter snippets/: Buttons, Icon-Buttons, Social, Menü, Dropdown, Projektordner, Projektkarte, Breadcrumb, Textfeld, Textarea, Select, Checkbox, Badge, neutraler Hinweis und nativer Dialog. example.html kombiniert alle Bausteine. `.kat-stack`, `.kat-cluster`, `.kat-grid` und `.kat-container` sind optionale Layouthelfer.

Die vorhandene ui.js bleibt unverändert (API 0.1.0). `data-kat-toggle` schaltet aria-pressed, `data-kat-dialog-open="ID"` öffnet den nativen Dialog. Native `<details data-kat-dropdown>` funktionieren mit Enter/Leertaste; das Script ergänzt Pfeile, Home/End, Escape/Rückfokus, Außen-/Linkklick. Dialoge haben native Schließenformen und Escape. IDs und alle for-/aria-/Dialogverweise bei mehrfacher Verwendung eindeutig anpassen.

Hover, focus-visible, Active, Pressed und echte native Disabled-Zustände sind enthalten. `<button disabled>` verwenden; ein Link mit aria-disabled allein wird nicht gesperrt. Die originale v0.4 ui.css und tokens.css bleiben bytegleich. CORE ist der neue visuelle Soft-&-Creamy-Style, nicht das frühere Corporate-BASIS und nicht der alte farblose technische CORE.

25 gemeinsame UI-Motive liegen unter icons/ als farbige eigenständige SVGs und unter icons/currentColor/ für Inline-SVG oder Masken. Externe img-Elemente erben currentColor nicht. Buttons brauchen einen sichtbaren Namen oder aria-label; dekorative Bilder darin alt="". Große Projektordner behalten 80×64; personalisierte Social-Kompositionen 60×60. Für kleine Controls den kompakten 24×24-Satz verwenden.

Branding, Hintergrundmuster und große Illustrationen sind optional. Keine Grafik oder Marke ist Voraussetzung der UI. `branding/` enthält vorhandene Logo-Familien, Wortmarken und Anwendungen; M01 ist nicht enthalten. Die Integration ist vom Nutzer bestätigt, daraus wird keine zusätzliche Favicon-/Einzelmotiv-Freigabe erfunden. `ASSETS.json` unterscheidet die dokumentierten Status. Bilder sind unveränderte vorhandene Ausgaben; mehrere Größen/Formate sind keine zusätzlichen Motive.

Normale Flächen bleiben unverändert. resources.css stellt nur ausdrücklich verwendbare Klassen bereit; Muster werden nicht automatisch auf die UI gelegt.

CUTE_COZY: Originale rosa dominante UI, originaler Ordnerverlauf und Blümchen. Nur die bestätigten Zustände: Fokus #376C62, Disabled-Fläche #CBECE5, Tinte #4B655E und gestrichelte Kontur #376C62. Die 76 vorhandenen Cozy-Importmotive und D01 sind enthalten; D02/D03 und deren Hintergründe/Glyphs fehlen bewusst bis zur entsprechenden Freigabe. Vorhandene Library-Erweiterungen sind separat als optionale Ressourcen markiert. Keine großflächige Türkisrevision wurde übernommen.

## Herkunft, Rechte und Erweiterungen

Grafik-/Fontquellen und dokumentierter Status stehen in ASSETS.json. Alle Pfade darin sind logische Quellenlabels und keine Laufzeitabhängigkeiten. Fontlizenzen liegen direkt neben den Fontdateien. Es wird keine zusätzliche öffentliche Lizenz für Marken- oder persönliche Bildassets erfunden. preview.css und assets.js dienen ausschließlich den kleinen lokalen Beispielen und sind für die eigentliche UI nicht nötig.

GAPS.md nennt optionale kreative Erweiterungen und bewusst ausgeschlossene Kandidaten. Diese Erweiterungen verhindern nicht die direkte Nutzung der enthaltenen technischen Komponenten. QUALITY.md nennt die tatsächlich durchgeführten Prüfungen und deren Grenzen. Keine pauschale WCAG-Konformität oder nicht ausgeführte Browserprüfung behauptet.
