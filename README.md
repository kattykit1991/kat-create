# 👻 kat-create

> A tiny CLI project generator built with TypeScript, one hand, and potatoes. 🥔

---

## ✨ About

**kat-create** is a personal command-line tool for setting up new coding projects with my own development templates.

Instead of manually creating the same folders and copying documentation files every time, I wanted a little helper to do the repetitive work for me.

The current prototype can:

- Ask for a project name.
- Create a new project directory.
- Copy my KAT DEV TOOLS templates into the project.
- Include `PROJECT_REQUIREMENTS.md` to track requirements, implementation progress, and independent reviews.
- Place `AGENTS.md` and `README.md` in the project root.
- Handle basic file-system errors.
- Find its templates even when launched from another directory.

This is my first self-built CLI tool and an ongoing learning project.

And yes, the first working version was developed with one hand while eating potatoes. 🥔

---

## 🛠️ Tech

- **TypeScript** – Main programming language.
- **Node.js** – Runtime environment and file-system operations.
- **tsx** – Runs TypeScript files directly during development.
- **npm** – Dependency management.
- **Git & GitHub** – Version control and project hosting.

No frontend framework or UI is required. This little ghost lives in the terminal. 👻

---

## 🚀 Run locally

### Requirements

- Node.js
- npm

### Getting started

```bash
# Clone the repository
git clone git@github.com:kattykit1991/kat-create.git

# Enter the project directory
cd kat-create

# Install dependencies
npm install

# Start the CLI
npx tsx src/index.ts
```

The CLI will ask for a project name and create a new folder in your current working directory.

The generated project includes my personal KAT DEV TOOLS documentation templates.

### 📋 Project Requirements

Every newly generated project includes:

`dev-tools/PROJECT_REQUIREMENTS.md`

This document tracks what a project needs to fulfill and whether each requirement has actually been verified.

It keeps two important states separate:

- **Implementation** – Has the requirement been implemented?
- **Review** – Has the implementation actually been checked?

A completed implementation does not automatically mean a passed review.

The Requirements document complements the existing tools:

- `PROJECT_REQUIREMENTS.md` – What must the project fulfill?
- `PROJECT_BUILD_GUIDE.md` – How do I build it?
- `PROJECT_STATE.md` – Where am I right now?

The Requirements template is currently an **early pilot**, developed through practical use in my Artelier project.

Its structure may evolve as I continue testing it.

> ⚠️ This is an early prototype. It currently creates a basic project structure, not a complete React, Python, or fullstack application.

---

## 📍 Status

**Current version:** v0.1.0 – Early prototype  
**Project type:** Personal learning project  
**Development status:** In active development

### ✅ Implemented

- Interactive project name input.
- Automatic project folder creation.
- KAT DEV TOOLS template integration.
- Automatic inclusion of `PROJECT_REQUIREMENTS.md` in every new project.
- Basic error handling.
- Template paths independent of the working directory.

### 🔮 Planned

- Project type selection (frontend, backend, fullstack, Python).
- Vite integration for frontend projects.
- Automatic setup of project dependencies.
- Selection of custom design styles.
- More helpful input validation and error messages.

---

## 👩‍💻 Developer

Built with 💜 by **Kat**.

I'm currently learning Software Engineering at WBS CODING SCHOOL.

This project is part of my journey from learning to code to building my own development tools.

> 🥔 Fun fact: The first working prototype was coded with one hand because the other was busy eating potatoes.

---

> 👻 Part of **KAT · DEV TOOLS** · katcoded.de  
> Development templates are located in `templates/dev-tools/`.
