#!/usr/bin/env node

const { openProject } = require("../lib/openpj");
const { configureYargs } = require("../lib/cli");
const { customColors } = require("../lib/helpers/utils");

const main = async () => {
  const argv = configureYargs().argv;
  try {
    console.log(customColors.success("Starting Manakz..."));
    const options = {
      install: argv.install || argv.i,
      start: argv.start || argv.s,
      vscode: argv.vscode || argv.c,
      yesToAll: argv.yes || argv.y,
    };
    await openProject(options);
    console.log(customColors.success("🤟 Manakz completed successfully!"));
  } catch (error) {
    console.error(customColors.error("👎 An error occurred:"), error.message);
    process.exit(1);
  }
};

main();
