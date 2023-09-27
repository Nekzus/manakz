const { logMessage } = require("./message");
const { execSync } = require("child_process");
async function openInVSCode() {
  try {
    logMessage({
      color: "info",
      text: "Opening project in Visual Studio Code...",
      emojiRt: "lucky",
    });

    execSync("code . -r", { stdio: "inherit" });
  } catch (error) {
    logMessage({
      color: "error",
      emojiLt: "thumbsDown",
      text: "Error opening project:",
      item: error,
    });
  }
}

module.exports = {
  openInVSCode,
};
