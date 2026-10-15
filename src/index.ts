#! /usr/bin/env node

import { createInterface } from "node:readline/promises";
import { mkdir, cp, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFile);
const templateDir = resolve(currentDir, "..", "templates", "dev-tools");

console.log("👻 Welcome to KAT CREATE!");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const projectName = await rl.question("👻 Project name: ");
  console.log(`Project name: ${projectName}`);
  try {
    await mkdir(projectName);
    await mkdir(`${projectName}/dev-tools`);
    await cp(templateDir, `${projectName}/dev-tools`, {
      recursive: true,
    });
    await cp(resolve(templateDir, "AGENTS.md"), `${projectName}/AGENTS.md`);

    await cp(
      resolve(templateDir, "PROJECT_README.md"),
      `${projectName}/README.md`,
    );
    await rm(`${projectName}/dev-tools/AGENTS.md`);
    await rm(`${projectName}/dev-tools/PROJECT_README.md`);
    console.log(`✨ Project "${projectName}" created successfully!`);
  } catch (error) {
    console.log("🥔 Oops! Project creation failed!");
    console.error(error);
  }
  rl.close();
}

main();
