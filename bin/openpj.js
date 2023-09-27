#!/usr/bin/env node

const { configureYargs } = require("../lib/cli");
const { logMessage } = require("../lib/helpers/message");
const { openProject } = require("../lib/openpj");

const main = async () => {
  const argv = configureYargs().argv;
  try {
    logMessage({
      color: "success",
      text: "Starting Manakz...",
    });
    const options = {
      install: argv.install || argv.i,
      start: argv.start || argv.s,
      vscode: argv.vscode || argv.c,
      yesToAll: argv.yes || argv.y,
    };
    await openProject(options);
    logMessage({
      color: "success",
      text: "Manakz completed successfully!",
      emojiLt: "completed",
    });
  } catch (error) {
    logMessage({
      color: "error",
      text: "An error occurred:",
      emojiLt: "thumbsDown",
      item: error.message,
      type: "error",
    });
    process.exit(1);
  }
};

main();
