const { execSync, spawn } = require("child_process");
const fs = require("fs").promises;
const { confirm } = require("./prompts");
const chalk = require("chalk");

const customColors = {
  info: (text) => chalk.cyan(text),
  success: (text) => chalk.green(text),
  error: (text) => chalk.red(text),
  warning: (text) => chalk.yellow(text),
};

async function detectPackageManager() {
  const packageManagers = {
    npm: "package-lock.json",
    pnpm: "pnpm-lock.yaml",
    bun: "bun.lockb",
    yarn: "yarn.lock",
  };

  for (const manager in packageManagers) {
    if (
      await fs
        .access(packageManagers[manager], fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
    ) {
      return manager;
    }
  }

  return "pnpm";
}

async function installOrUpdateDependencies(autoExecute = false) {
  const hasNodeModules = await fs
    .access("node_modules")
    .then(() => true)
    .catch(() => false);

  const shouldUpdateDeps =
    autoExecute ||
    (hasNodeModules &&
      (await confirm("🕗 Do you want to update dependencies? (y/n)")));
  const shouldInstallDeps =
    autoExecute ||
    (!hasNodeModules &&
      (await confirm("🔧 Do you want to install dependencies? (y/n)")));

  if (shouldUpdateDeps) {
    await updateDependencies();
  }

  if (shouldInstallDeps) {
    await installDependencies();
  }
}

async function updateDependencies() {
  try {
    console.log(customColors.info("Updating dependencies...🤞"));
    const packageManager = await detectPackageManager();
    execSync(`${packageManager} update`, { stdio: "inherit" });
    console.log(customColors.success("👍 Dependencies updated successfully!"));
  } catch (error) {
    console.error(customColors.error("❌ Error updating dependencies:"), error);
  }
}

async function installDependencies() {
  try {
    console.log(customColors.info("Installing dependencies...🤞"));
    const packageManager = await detectPackageManager();
    execSync(`${packageManager} install`, { stdio: "inherit" });
    console.log(
      customColors.success("👍 Dependencies installed successfully!")
    );
  } catch (error) {
    console.error(
      customColors.error("❌ Error installing dependencies:"),
      error
    );
  }
}

async function startDevServer() {
  try {
    console.log(
      customColors.info(`Starting development server in ${process.cwd()}...🤞`)
    );

    const packageManager = await detectPackageManager();
    const command = `${packageManager} run dev`;

    const childProcess = spawn(command, [], {
      stdio: "inherit",
      shell: true,
    });

    childProcess.on("exit", (code, signal) => {
      if (code === null) {
        console.log(
          customColors.warning(
            `Development server was terminated by signal: ${signal}`
          )
        );
      } else if (code === 0) {
        console.log(
          customColors.success("Development server exited successfully")
        );
      } else {
        console.error(
          customColors.error(`Development server exited with code ${code}`)
        );
      }
    });

    process.on("SIGINT", () => {
      console.log(customColors.info("Terminating development server..."));
      childProcess.kill("SIGINT"); // Propagar la señal al proceso hijo
    });

    childProcess.on("error", (err) => {
      console.error(
        customColors.error("Error starting development server:"),
        err
      );
    });
  } catch (error) {
    console.error(
      customColors.error("👎 Error starting development server:"),
      error
    );
  }
}

async function openInVSCode() {
  try {
    console.log(
      customColors.info("Opening project in Visual Studio Code...🤞")
    );
    execSync("code . -r", { stdio: "inherit" });
  } catch (error) {
    console.error(customColors.error("👎 Error opening project:"), error);
  }
}

function releasePorts(ports) {
  ports.forEach((port) => {
    try {
      execSync(`lsof -i :${port} | awk 'NR!=1 {print $2}' | xargs kill`, {
        stdio: "ignore",
      });
      console.log(customColors.success(`✅ Released port ${port}`));
    } catch (error) {}
  });

  console.log(customColors.success("🧹 Ports released."));
}

function showHeader() {
  console.log(
    customColors.success(
      "\n-------------------------------------------------\n"
    )
  );
  console.log(
    customColors.info("🤟 Welcome to Manakz - The Developer's Toolkit 🤟")
  );
  console.log(customColors.info("               Created by nekzus"));
  console.log(
    customColors.success(
      "\n-------------------------------------------------\n"
    )
  );
}

module.exports = {
  detectPackageManager,
  installOrUpdateDependencies,
  startDevServer,
  openInVSCode,
  releasePorts,
  showHeader,
  customColors,
};
