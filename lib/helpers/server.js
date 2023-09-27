const { detectPackageManager } = require("./package");
const { spawn } = require("child_process");
const { logMessage } = require("./message");
async function startDevServer() {
  try {
    logMessage({
      color: "info",
      text: `Starting development server in ${process.cwd()}...`,
      emojiRt: "lucky",
    });

    const packageManager = await detectPackageManager();
    const command = `${packageManager} run dev`;

    const childProcess = spawn(command, [], {
      stdio: "inherit",
      shell: true,
    });

    childProcess.on("exit", (code, signal) => {
      if (code === null) {
        logMessage({
          color: "warning",
          text: "Development server was terminated by signal:",
          item: signal,
        });
      } else if (code === 0) {
        logMessage({
          color: "success",
          text: "Development server exited successfully",
        });
      } else {
        logMessage({
          color: "error",
          text: "Development server exited with code",
          item: code,
          type: "error",
        });
      }
    });

    process.on("SIGINT", () => {
      logMessage({
        color: "info",
        text: "Terminating development server...",
        emojiLt: "thumbsDown",
      });
      childProcess.kill("SIGINT");
    });

    childProcess.on("error", (err) => {
      logMessage({
        color: "error",
        text: "Error starting development server:",
        item: err,
      });
    });
  } catch (error) {
    logMessage({
      color: "error",
      emojiLt: "thumbsDown",
      text: "Error starting development server:",
      item: error,
    });
  }
}

module.exports = {
  startDevServer,
};
