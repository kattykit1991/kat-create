# Technische Prüfung · 1.0.0 · 2026-10-29

Die bestehende eigene Fantasy-Foundation liefert Farben, Typografie und Light-/Dark-Themes. Technische Ergänzungen: neutrale UI-SVGs, dynamisch einsetzbare Dialog-/Formularsteuerung und eigene Theme-Speicherung. Keine neue Lore oder fremde Markenbilder.

## Tatsächlich durchgeführte Prüfungen

- Vollständiger Styleordner in einen unabhängigen temporären Ordner kopiert, ohne Symlinks oder Zugriff auf die Originalbibliotheken. Reale Browserprüfung im Codex-In-App-Browser über einen lokalen HTTP-Server.
- Vorschau bei 320, 390, 768 und 1280 Pixel Breite ohne horizontales Überlaufen; EAVA in beiden Themes. Startbeispiel zusätzlich bei 320 Pixel geprüft, Dialog geöffnet, mit Escape geschlossen, Fokus zurückgegeben.
- Assetsuche mit Treffern und leerem Ergebnis im echten Browser geprüft. Lokale Fonts geladen; in den geprüften Vorschauseiten keine defekten Bilder.
- Sämtliche HTML-/CSS-Verweise auf mitgelieferte Dateien geprüft; keine absoluten Mac-Pfade, entfernten Laufzeitquellen, Symlinks oder Builder-Werkzeuge. Alle SVGs als XML geprüft und gerendert, alle Grafikdateien auf lesbare Bildmetadaten geprüft.
- 50 ausgewählte Kontrastpaare über alle vier Pakete berechnet: Text mindestens 4,5:1, geprüfte Fokusgrenzen mindestens 3:1 zu angrenzenden Flächen. Disabled zusätzlich gemessen, obwohl ausgenommen. Kein pauschaler WCAG-Konformitätsnachweis.

EAVA: vier lokale Schriftfamilien, Light/Dark/System, Speicherung nach Reload, erforderliche Formfelder, lokale Erfolgsmeldung, Reset sowie Fokus nach Dialogschluss im Browser geprüft. 20 zusätzliche synthetische Controllerprüfungen einschließlich blockiertem Speicher bestanden.

## Prüfgrenzen

Der direkte Aufruf über das Dateiprotokoll wurde nicht im Browser geprüft. Die Dateien benötigen technisch weder Fetch noch Serverfunktionen; die reale Prüfung erfolgte mit isolierten Kopien über localhost. Safari und Firefox, Screenreader, erzwungene Systemfarben und Reduced Motion wurden nicht gesondert getestet. Die React-/Vite-Beispiele wurden dokumentiert und statisch geprüft, aber kein React-/Vite-Projekt installiert oder gebaut. React-Beispiel setzt React 18 oder neuer voraus. Individuelle Aktionen, Anwendungszustand, Serverintegration und Formularversand gehören zum Zielprojekt.

Grafikprüfung und technische Nutzbarkeit sind keine neue gestalterische Einzelasset-Freigabe. Herkunft und dokumentierter Status stehen in ASSETS.json; offene kreative Ergänzungen in GAPS.md. Vorhandene Quellen wurden nur gelesen und kopiert.
