const { logMessage } = require("./message");

function showHeader() {
  logMessage({
    color: "success",
    text: "\n-------------------------------------------------\n",
  });
  logMessage({
    text: "Welcome to Manakz - The Developer's Toolkit",
    emojiLt: "fire",
    emojiRt: "fire",
  });

  logMessage({ color: "info", text: "               Created by nekzus" });
  logMessage({
    color: "success",
    text: "\n-------------------------------------------------\n",
  });
}

module.exports = {
  showHeader,
};
