# 🧪 PROJECT TESTING

<!-- KAT · DEV TOOLS | Vorlagen-Release: v1.0.0 | 2026-11-03 -->

> Mein Testlabor für DAS DING™.
> Hier sammle ich Tests, die ich während der Planung oder Entwicklung durchführen möchte.
> Codex hilft später beim Prüfen, Dokumentieren und Finden weiterer Testfälle.
> **Geplant ≠ Getestet ≠ Bestanden.**

---

## 🎯 PURPOSE

**Was soll getestet werden – und was funktioniert tatsächlich?**

Hier stehen alle geplanten Testfälle und ihre Ergebnisse.

Tests dürfen jederzeit ergänzt werden:

- während der Projektvorbereitung
- während der Entwicklung
- nach dem Auftreten eines Fehlers
- bei späteren Änderungen

Die Testfälle dürfen in einfacher Alltagssprache beschrieben werden.
Codex kann sie bei der Durchführung technisch präzisieren.

<!--
Wenn ein Test zu einer Anforderung aus PROJECT_REQUIREMENTS.md gehört,
kann deren ID angegeben werden, z. B. FR001.

Die Anforderung nicht vollständig kopieren.
PROJECT_REQUIREMENTS.md bleibt die Quelle für die Anforderungen.
Eine Anforderung gilt durch den Testfall allein nicht als geprüft oder bestanden.
Review-Notizen dürfen bei Bedarf auf die Test-ID verweisen, statt das Ergebnis zu kopieren.

Die Platzhalterzeile unten durch echte Tests ersetzen oder entfernen.
-->

---

## 📋 TEST CASES

| ID   | Added by | Test                       | Expected Result       | Status |
| ---- | -------- | -------------------------- | --------------------- | ------ |
| T001 | KAT      | [Was soll geprüft werden?] | [Was soll passieren?] | Open   |

<!--
TESTFÄLLE

ID:
- Jeder Test erhält eine eindeutige ID: T001, T002, T003 usw.
- Bereits vergebene IDs nicht wiederverwenden.

Added by:
- KAT: Von Kat vorgegeben oder ausdrücklich beauftragt.
- CODEX: Von Codex selbstständig vorgeschlagen und ergänzt.
- Die ursprüngliche Herkunft bleibt auch nach Bearbeitungen erhalten.

Test:
- Was soll überprüft werden?
- Eine verständliche Beschreibung reicht zunächst.
- Konkrete technische Testschritte dürfen später ergänzt werden.

Expected Result:
- Welches Verhalten wird erwartet?
- Bei Unklarheiten nachfragen oder die Erwartung als ungeklärt markieren.
- Codex darf Erwartungen nicht willkürlich festlegen.

Bei Bedarf zusätzliche Spalten ergänzen, aber die Tabelle kompakt halten.
-->

---

## 🏷️ TEST STATUS

| Status        | Bedeutung                                        |
| ------------- | ------------------------------------------------ |
| Open          | Test geplant, noch nicht ausgeführt              |
| Passed        | Tatsächlich durchgeführt und erfolgreich         |
| Failed        | Durchgeführt, erwartetes Ergebnis nicht erreicht |
| Blocked       | Test aktuell nicht durchführbar                  |
| Manual Check  | Manuelle Überprüfung erforderlich                |
| Retest Needed | Nach einer Änderung erneut zu prüfen             |

<!--
Ein Status beschreibt das aktuelle Prüfergebnis, nicht den Implementierungsstand.

- Open ist auch erlaubt, wenn die Funktion noch nicht implementiert wurde.
- Passed setzt eine tatsächlich erfolgreiche Prüfung voraus.
- Failed bedeutet, dass ein Fehler oder eine Abweichung beobachtet wurde.
- Blocked und Manual Check benötigen eine kurze Begründung.
- Retest Needed wird verwendet, wenn ein früheres Ergebnis nicht mehr
  zuverlässig für den aktuellen Projektstand gilt.

Keine Tests als bestanden markieren, nur weil Code vorhanden ist.
-->

---

## 🔎 TEST RESULTS

**Was wurde tatsächlich geprüft und dabei beobachtet?**

Hier dokumentieren Kat oder Codex die Ergebnisse ausgeführter Tests.

Erfolgreiche Tests brauchen meist nur einen kurzen Nachweis.
Bei Fehlern sollen die Informationen zum Nachvollziehen und Reproduzieren ausreichen.

<!--
BEISPIELSTRUKTUR – KEIN ECHTES TESTERGEBNIS

### T001 · [Testname]

- Geprüft am: [Datum]
- Durchgeführt von: [KAT / CODEX]
- Methode: [Unit Test / Integration / E2E / Browser / Manuell / ...]
- Ausführung: [Befehl, Testdatei oder Prüfschritte]
- Erwartet: [Falls weitere Details nötig sind]
- Beobachtet: [Tatsächliches Ergebnis]
- Ergebnis: [Passed / Failed / Blocked / ...]
- Fehler / Follow-up: [Nur falls nötig]

Bei fehlgeschlagenen Tests möglichst dokumentieren:
- Was ist schiefgelaufen?
- Welche Fehlermeldung gab es?
- Wie lässt sich das Problem reproduzieren?
- Was sollte als Nächstes untersucht werden?

Bei Blocked oder Manual Check:
- Warum konnte der Test nicht ausgeführt werden?
- Was wird benötigt, um ihn durchzuführen?

Bei einem erneuten Test:
- Aktuellen Status und Nachweis aktualisieren.
- Wichtige frühere Fehlerbefunde bei Bedarf erhalten.
- Keine endlosen Testlauf-Protokolle sammeln.

Keine leeren Detailabschnitte für jeden geplanten Test erstellen.
-->

---

## 🤖 CODEX TEST WORKFLOW

**Wenn Kat Codex ausdrücklich mit dem Testen beauftragt:**

1. Lies die vorhandenen Testfälle und untersuche den tatsächlichen Projektstand.
2. Prüfe, welche Tests aktuell durchgeführt werden können.
3. Führe die möglichen Tests aus und nutze vorhandene Testwerkzeuge.
4. Aktualisiere die Statuswerte anhand der tatsächlichen Ergebnisse.
5. Dokumentiere Beobachtungen, Fehler und relevante Nachweise unter TEST RESULTS.
6. Ergänze sinnvolle fehlende Testfälle und kennzeichne sie mit `CODEX`.
7. Markiere nicht ausführbare Tests als `Blocked` oder `Manual Check`.
8. Gib Kat abschließend eine verständliche Zusammenfassung der Ergebnisse.

<!--
WICHTIG FÜR CODEX

- Ein Testauftrag erlaubt die Durchführung geeigneter vorhandener Tests
  und die Aktualisierung dieser PROJECT_TESTING.md.
- Zusätzliche Testfälle dürfen in der Markdown-Datei ergänzt werden.
- Neue ausführbare Testdateien, Testskripte oder zusätzliche Dependencies
  benötigen eine entsprechende Autorisierung.
- Anwendungscode nicht ungefragt ändern oder reparieren.
- Fehlgeschlagene Tests nicht löschen, abschwächen oder überspringen,
  um ein erfolgreiches Ergebnis zu erzeugen.
- Kats Tests nicht stillschweigend entfernen oder inhaltlich umdeuten.
- Statische Codeanalyse nicht als bestandenen Verhaltenstest ausgeben.
- Nicht ausgeführte Prüfungen niemals als Passed markieren.
- AGENTS.md und Kats ausdrückliche Anweisungen bleiben maßgeblich.

TESTING ≠ FIXING

Fehler finden und dokumentieren ist der Auftrag.
Fehler beheben ist ein separater Auftrag.
-->

---

## 🧭 KAT-REGELN FÜR TESTING

- **Planung ≠ Ausführung ≠ Erfolg.** Ein eingetragener Test ist noch kein Testnachweis.
- **Tests dürfen jederzeit entstehen.** Auch spontan und ohne technische Fachsprache.
- **CODEX-Ergänzungen bleiben erkennbar.** Neue Tests werden eindeutig als CODEX markiert.
- **Nur belegte Ergebnisse eintragen.** Keine erfundenen Testläufe, Prüfungen oder Erfolge.
- **Fehler sind hilfreiche Ergebnisse.** Failed bedeutet: Hier haben wir etwas herausgefunden.
- **Testing ≠ Fixing.** Keine ungefragten Änderungen am Anwendungscode.
- **Keine doppelten Wahrheiten.** Anforderungen gehören in PROJECT_REQUIREMENTS.md, Bauschritte in PROJECT_BUILD_GUIDE.md und der aktuelle Wiedereinstiegsstand in PROJECT_STATE.md.
- **Keine zusätzlichen Agentenregeln.** Zuständigkeiten und Schreibrechte regelt AGENTS.md.
- **Kompakt bleiben.** Ausführliche Details nur dort, wo sie beim Verstehen oder Beheben eines Problems helfen.
- **Eine Datei reicht.** Keine weiteren Testmanagement-Dokumente erzeugen, solange kein echter Bedarf besteht.

---

> 👻 Part of **KAT · DEV TOOLS** · katcoded.de  
> See `DEV_TOOLS_README.md` for information about this toolkit.
