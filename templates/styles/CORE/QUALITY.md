# Technische Prüfung · 1.0.0 · 2026-10-29

## Nachtrag · gezielte Wortmarken-Integration am 30.10.2026

43 bestehende Grafikdateien dieses Ordners wurden durch die bereits bestätigte Typografie-Korrektur aktualisiert. Keine zusätzliche Designänderung. Vorherige Dateien und Metadaten wurden außerhalb dieses kopierbaren Ordners gesichert; das Wiederherstellungsarchiv wurde per ZIP-CRC und Datei-Prüfsummen verifiziert.

- Bestehende SVGs einschließlich verschachtelter SVG-Inhalte vollständig nach der betroffenen Wortmarke durchsucht. Alle betroffenen SVGs übernehmen exakt die bestätigte Korrektur; keine alte Konstruktion in diesen SVGs übrig.
- Vorhandene Rasterausgaben stimmen vor der Änderung pixelgenau mit den Original-SVGs überein. Aktualisierte PNG-/WebP-Dateien wurden verlustfrei ausgegeben; Größe, Alphakanal und alle sichtbaren Pixel außerhalb des Wortmarkenbereichs bleiben erhalten. Bei WebP können unsichtbare RGB-Werte vollständig transparenter Pixel anders kodiert sein; die sichtbaren Bildwerte und Alpha bleiben unverändert.
- Reale Browserprüfung gegen diesen tatsächlich aktualisierten Ordner: bestehende Vorschau-Header bei 1280, 390 und 320 px ohne horizontales Überlaufen, Headergrafik weiterhin 220 × 56 px; SVG-Verweis im bestehenden Komponentenbeispiel intakt; sämtliche 43 korrigierten Dateien über den vorhandenen Assetkatalog geladen. Keine Konsolenfehler beobachtet.
- README, Assetherkunft, Größen, Prüfsummen und Lieferinventar wurden an den tatsächlichen Stand angepasst. Keine Dateinamen, Ordner oder Laufzeitverweise ergänzt, entfernt oder umbenannt. EAVA ist vollständig unverändert.

Diese Prüfung ergänzt die ursprüngliche Lieferung. Kein separater Test in Safari/Firefox oder einem nicht bereitgestellten Website-Projekt; geprüft wurden die bestehenden lokalen Vorschauseiten im In-App-Browser über localhost.

Die drei Laufzeitdateien tokens.css, ui.css und ui.js sind bytegleich mit dem bestätigten UI-Assetpack v0.4. Die ursprüngliche v0.1-Gestaltung und die bestätigten Cozy-Zustände bleiben erhalten.

## Tatsächlich durchgeführte Prüfungen

- Vollständiger Styleordner in einen unabhängigen temporären Ordner kopiert, ohne Symlinks oder Zugriff auf die Originalbibliotheken. Reale Browserprüfung im Codex-In-App-Browser über einen lokalen HTTP-Server.
- Vorschau bei 320, 390, 768 und 1280 Pixel Breite ohne horizontales Überlaufen; EAVA in beiden Themes. Startbeispiel zusätzlich bei 320 Pixel geprüft, Dialog geöffnet, mit Escape geschlossen, Fokus zurückgegeben.
- Assetsuche mit Treffern und leerem Ergebnis im echten Browser geprüft. Lokale Fonts geladen; in den geprüften Vorschauseiten keine defekten Bilder.
- Sämtliche HTML-/CSS-Verweise auf mitgelieferte Dateien geprüft; keine absoluten Mac-Pfade, entfernten Laufzeitquellen, Symlinks oder Builder-Werkzeuge. Alle SVGs als XML geprüft und gerendert, alle Grafikdateien auf lesbare Bildmetadaten geprüft.
- 50 ausgewählte Kontrastpaare über alle vier Pakete berechnet: Text mindestens 4,5:1, geprüfte Fokusgrenzen mindestens 3:1 zu angrenzenden Flächen. Disabled zusätzlich gemessen, obwohl ausgenommen. Kein pauschaler WCAG-Konformitätsnachweis.

Lokale Schriften, vorhandene Bilder, sichtbarer Tastaturfokus und das Überspringen deaktivierter Buttons im Browser geprüft.

## Prüfgrenzen

Der direkte Aufruf über das Dateiprotokoll wurde nicht im Browser geprüft. Die Dateien benötigen technisch weder Fetch noch Serverfunktionen; die reale Prüfung erfolgte mit isolierten Kopien über localhost. Safari und Firefox, Screenreader, erzwungene Systemfarben und Reduced Motion wurden nicht gesondert getestet. Die React-/Vite-Beispiele wurden dokumentiert und statisch geprüft, aber kein React-/Vite-Projekt installiert oder gebaut. React-Beispiel setzt React 18 oder neuer voraus. Individuelle Aktionen, Anwendungszustand, Serverintegration und Formularversand gehören zum Zielprojekt.

Grafikprüfung und technische Nutzbarkeit sind keine neue gestalterische Einzelasset-Freigabe. Herkunft und dokumentierter Status stehen in ASSETS.json; offene kreative Ergänzungen in GAPS.md. Vorhandene Quellen wurden nur gelesen und kopiert.
