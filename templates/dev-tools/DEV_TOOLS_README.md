# 👻 KAT · DEV TOOLS

> A personal developer workflow toolkit built around the way Kat actually learns, builds, debugs, and ships software.  
> **katcoded.de**

---

# 🇩🇪 Deutsch

## ✨ Was ist KAT · DEV TOOLS?

**KAT · DEV TOOLS** ist ein persönliches Developer-Workflow-Toolkit für Kat.

Die Tools wurden nicht als allgemeines Produktivitäts-System entworfen, sondern aus Kats tatsächlicher Arbeitsweise entwickelt und anhand echter Softwareprojekte getestet und verbessert.

Das Toolkit soll beim Bauen unterstützen, ohne selbst zum Projekt zu werden.

**Grundidee:**

> Klarheit, wenn sie gebraucht wird.  
> Freiheit, wenn der Build läuft.  
> So wenig Bürokratie wie möglich.

---

## 📦 Die Tools

### 🌱 `PROJECT_START.md`

Der kurze Start-Kompass für ein neues Projekt.

Klärt:

- Was baue ich?
- Warum baue ich es?
- Was ist mein aktuelles Ziel?
- Was gehört ausdrücklich noch nicht dazu?

`NOT NOW` bedeutet dabei nicht `NEVER` – es schützt nur den aktuellen Scope.

---

### 🗺️ `PROJECT_BUILD_GUIDE.md`

Der persönliche Bauplan vom aktuellen Ziel zum funktionierenden Projekt.

Er teilt den Build in verständliche Stages und konkrete Bauschritte.

Zu jedem Schritt können direkt die generischen Syntax- oder Technikmuster stehen, die dafür gebraucht werden.

**Erst die Aufgabe. Dann das Werkzeug.**

Der Build Guide ist eine Route, kein Vertrag. Wenn das echte Bauen einen besseren oder fehlenden Schritt zeigt, darf der Plan mitwachsen.

---

### 🎮 `PROJECT_STATE.md`

Das Savegame des Projekts.

Es hält den aktuellen Stand so fest, dass Kat nach einer Pause schnell wieder weiß:

- Wo bin ich?
- Was funktioniert bereits?
- Was kommt als Nächstes?
- Welche Probleme sind bekannt?
- Welche Sidequests warten?
- Was darf ich nicht vergessen?

**PROJECT STATE ist ein Savegame, kein Tagebuch.**

---

### 📝 `NOTES.md`

Die optionale Brainblerps-Schublade.

Hier landen projektbezogene Dinge, die wichtig genug zum Merken sind, aber gerade keinen besseren Platz haben.

Die groben Standardschubladen sind:

- Technisches
- Design / UI
- Ideen / Später
- Sonstiges

Projektspezifische Kategorien dürfen ergänzt werden, wenn sie wirklich gebraucht werden.

Wenn das Einsortieren länger als ein paar Sekunden dauert:

**SONSTIGES. BONK. WEITER.**

---

### 📖 `PROJECT_README.md`

Die vorbereitete öffentliche Projektbeschreibung.

Während Planung und Vorbereitung heißt sie bewusst `PROJECT_README.md`, damit Projektinitialisierungstools wie Vite nicht mit der geplanten README kollidieren.

Nach dem Setup:

1. eventuell erzeugte `README.md` prüfen
2. relevante Setup-Informationen übernehmen
3. `PROJECT_README.md` zur finalen `README.md` machen
4. nur eine README als Source of Truth behalten

---

### 🤖 `AGENTS.md`

Der universelle Arbeitsvertrag zwischen Kat und Coding Agents.

Grundprinzip:

> **Der Agent unterstützt. Kat programmiert.**

Der Agent darf erklären, analysieren, planen, debuggen, reviewen und organisieren – aber nicht ungefragt das Projekt für Kat programmieren.

Eine dauerhafte Ausnahme ist ausdrücklich erlaubtes visuelles Styling:

Wenn Kat es explizit delegiert, darf ein Agent CSS, Tailwind, Layout und andere visuelle Prettyfying-Arbeit direkt umsetzen.

`AGENTS.md` ist grundsätzlich **COPY & KEEP** und wird nicht für jedes Projekt neu erfunden.

---

## 🚀 Verwendung in einem neuen Projekt

Den `DEV_TOOLS`-Ordner in das neue Projekt kopieren.

Danach:

1. `PROJECT_START.md` ausfüllen.
2. `PROJECT_BUILD_GUIDE.md` für den geplanten Build vorbereiten.
3. `PROJECT_STATE.md` als Savegame verwenden.
4. `NOTES.md` nur benutzen, wenn Brainblerps einen Parkplatz brauchen.
5. `PROJECT_README.md` für das Projekt anpassen und nach dem Setup zur finalen `README.md` machen.
6. `AGENTS.md` normalerweise unverändert lassen.

Nicht jedes Tool muss ständig gepflegt werden.

Das System soll den Build unterstützen – nicht Kats Aufmerksamkeit auffressen.

---

## ♻️ Grundprinzip

**Information einmal erzeugen, danach wiederverwenden.**

Keine doppelten Wahrheiten.  
Keine zusätzlichen Workflow-Dateien ohne echten Bedarf.  
Keine Dokumentation nur um der Dokumentation willen.

Wenn etwas funktioniert und kein konkretes Problem existiert:

**Lass es funktionieren.**

---

## 👻 Herkunft

**KAT · DEV TOOLS** ist Teil von **KAT · DEV SYSTEM**.

Das Toolkit wurde für Kats persönliche Arbeits-, Lern- und Entwicklungsweise entwickelt und durch praktische Nutzung in echten Softwareprojekten iterativ verfeinert.

**katcoded.de**

---

# 🇬🇧 English

## ✨ What is KAT · DEV TOOLS?

**KAT · DEV TOOLS** is a personal developer workflow toolkit built for Kat.

It was not designed as a generic productivity system. The tools were derived from the way Kat actually learns, builds, debugs, and works on software, then tested and refined through real software projects.

The toolkit exists to support building without becoming a project of its own.

**Core idea:**

> Clarity when it is needed.  
> Freedom when the build is flowing.  
> As little bureaucracy as possible.

---

## 📦 The Tools

### 🌱 `PROJECT_START.md`

A short starting compass for a new project.

It clarifies:

- What am I building?
- Why am I building it?
- What is my current goal?
- What is explicitly outside the current scope?

`NOT NOW` does not mean `NEVER` – it only protects the current scope.

---

### 🗺️ `PROJECT_BUILD_GUIDE.md`

The personal build route from the current goal to a working project.

It divides the build into understandable stages and concrete implementation steps.

Each step can include the generic syntax or technical patterns needed for that specific task.

**First the task. Then the tool.**

The Build Guide is a route, not a contract. If the real build reveals a missing or better step, the guide may evolve with it.

---

### 🎮 `PROJECT_STATE.md`

The project's savegame.

It records enough current context for Kat to return after a break and quickly understand:

- Where am I?
- What already works?
- What comes next?
- What problems are known?
- What sidequests are parked?
- What context must not be forgotten?

**PROJECT STATE is a savegame, not a diary.**

---

### 📝 `NOTES.md`

The optional Brainblerps drawer.

It holds project-related information worth remembering that does not currently have a better home.

The default broad categories are:

- Technical
- Design / UI
- Ideas / Later
- Miscellaneous

Project-specific categories may be added when there is a real need for them.

If deciding where a note belongs takes more than a few seconds:

**MISCELLANEOUS. BONK. MOVE ON.**

---

### 📖 `PROJECT_README.md`

The prepared public-facing project description.

During planning and preparation it deliberately uses the name `PROJECT_README.md`, preventing project initialization tools such as Vite from colliding with the planned README.

After setup:

1. inspect any generated `README.md`
2. preserve useful setup-specific information if needed
3. turn `PROJECT_README.md` into the final `README.md`
4. keep only one README as the source of truth

---

### 🤖 `AGENTS.md`

The universal collaboration agreement between Kat and coding agents.

Core principle:

> **The agent assists. Kat programs.**

The agent may explain, inspect, plan, debug, review, and organize, but should not program the project for Kat without explicit authorization.

One permanent exception allows explicitly delegated visual styling:

When Kat asks for it, an agent may directly implement CSS, Tailwind, layout polish, and other visual prettyfying work.

`AGENTS.md` is generally **COPY & KEEP** rather than something rewritten for every project.

---

## 🚀 Using the toolkit in a new project

Copy the `DEV_TOOLS` folder into the new project.

Then:

1. Fill in `PROJECT_START.md`.
2. Prepare `PROJECT_BUILD_GUIDE.md` for the planned build.
3. Use `PROJECT_STATE.md` as the project savegame.
4. Use `NOTES.md` only when Brainblerps need somewhere to live.
5. Adapt `PROJECT_README.md` and turn it into the final `README.md` after project setup.
6. Normally leave `AGENTS.md` unchanged.

Not every tool needs constant maintenance.

The system should support the build – not consume Kat's attention.

---

## ♻️ Core principle

**Create information once, then reuse it.**

No duplicate sources of truth.  
No additional workflow files without a real need.  
No documentation for documentation's sake.

If something works and there is no concrete problem:

**Let it work.**

---

## 👻 Origin

**KAT · DEV TOOLS** is part of **KAT · DEV SYSTEM**.

The toolkit was developed around Kat's personal way of working, learning, and building software, then iteratively refined through practical use in real software projects.

**katcoded.de**
