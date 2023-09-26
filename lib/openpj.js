#!/usr/bin/env node

const fs = require("fs").promises;

const {
  installOrUpdateDependencies,
  startDevServer,
  openInVSCode,
  releasePorts,
  showHeader,
  customColors,
} = require("./helpers/utils");
const { confirm } = require("./helpers/prompts");

async function openProject(options) {
  const { yesToAll, vscode, install, start } = options;
  try {
    await fs.access("package.json");
  } catch (err) {
    console.error(
      customColors.error(
        "❌ No package.json file found in the current directory."
      )
    );
    console.error(
      customColors.error(
        "❌ Make sure you are in the project folder before running this script."
      )
    );
    return;
  }
  if (!yesToAll) {
    showHeader();

    const confirmation = await confirm("Ready to go? (y/n)");

    if (!confirmation) {
      console.log(customColors.info("⛔ Operation cancelled."));
      return;
    }

    const selectAll = await confirm("⚡ Select 'Yes' for all options? (y/n)");

    if (selectAll) {
      console.log(customColors.success("✅ Executing all selected options..."));
      await openInVSCode();
      await installOrUpdateDependencies(selectAll);
      await startDevServer();
    } else {
      if (await confirm("📂 Open project in Visual Studio Code? (y/n)")) {
        await openInVSCode();
      }

      await installOrUpdateDependencies();

      if (await confirm("🚀 Start the development server? (y/n)")) {
        await startDevServer();
      }
    }
  } else {
    !vscode && (await openInVSCode());
    !install && (await installOrUpdateDependencies(yesToAll));
    !start && (await startDevServer());
  }
  releasePorts(["3000", "4200", "5173", "8000", "8080"]);
}

module.exports = {
  openProject,
};
