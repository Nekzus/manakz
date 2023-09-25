const yargs = require("yargs");

function configureYargs() {
  return yargs
    .options("install", {
      alias: "i",
      describe: "Install dependencies if not already installed",
      default: false,
      type: "boolean",
    })
    .options("start", {
      alias: "s",
      describe: "Start the development server",
      default: false,
      type: "boolean",
    })
    .options("vscode", {
      alias: "c",
      describe: "Open the project in Visual Studio Code Insiders",
      default: false,
      type: "boolean",
    })
    .options("yes", {
      alias: "y",
      describe: "Automatically answer 'yes' to all questions",
      default: false,
      type: "boolean",
    })
    .help()
    .alias("help", "h")
    .version()
    .alias("version", "v");
}

module.exports = {
  configureYargs,
};
