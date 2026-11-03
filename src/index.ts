#! /usr/bin/env node

import { createInterface } from "node:readline/promises";
import { mkdir, cp, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { spawn } from "node:child_process";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFile);
const templateDir = resolve(currentDir, "..", "templates", "dev-tools");

console.log("👻 Welcome to KAT CREATE!");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function runCommand(
  command: string,
  args: string[],
  cwd?: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("error", reject);

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
}

async function createReactProject(projectName: string): Promise<void> {
  await runCommand("npm", [
    "create",
    "vite@latest",
    projectName,
    "--",
    "--template",
    "react-ts",
    "--no-interactive",
    "--no-immediate",
    "--eslint",
  ]);
}

async function main() {
  const projectName = await rl.question("👻 Project name: ");
  rl.close();
  console.log(`Project name: ${projectName}`);
  try {
    await createReactProject(projectName);
    await runCommand("npm", ["install"], projectName);
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
}

main();
