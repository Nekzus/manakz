#!/usr/bin/env node

const { openProject } = require("../lib/openpj");
const { configureYargs } = require("../lib/cli");
const colors = require("colors");

const main = async () => {
  const argv = configureYargs().argv;
  try {
    console.log(colors.green("Starting Manakz..."));
    const options = {
      install: argv.install || argv.i,
      start: argv.start || argv.s,
      vscode: argv.vscode || argv.c,
      yesToAll: argv.yes || argv.y,
    };
    await openProject(options);
    console.log(colors.green("🤟 Manakz completed successfully!"));
  } catch (error) {
    console.error(colors.red("👎 An error occurred:"), error.message);
    process.exit(1);
  }
};

main();
