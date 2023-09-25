const yargs = require("yargs");

function configureYargs() {
  return yargs
    .options("install", {
      alias: "i",
      describe: "Bypass installation of dependencies if not already present",
      default: false,
      type: "boolean",
    })
    .options("start", {
      alias: "s",
      describe: "Bypass initialization of the development server",
      default: false,
      type: "boolean",
    })
    .options("vscode", {
      alias: "c",
      describe: "Bypass opening the project in Visual Studio Code",
      default: false,
      type: "boolean",
    })
    .options("yes", {
      alias: "y",
      describe: "Executes actions without asking for confirmation",
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
