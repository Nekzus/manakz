const { customEmoji } = require("./emojis");
const { textStyler } = require("./styles");
function logMessage({
  color = "default",
  emojiLt = "",
  emojiRt = "",
  item = "",
  text = "",
  type = "log",
}) {
  const message = `${
    customEmoji[emojiLt] === undefined ? "" : customEmoji[emojiLt]
  } ${textStyler[color](text) === undefined ? "" : textStyler[color](text)} ${
    customEmoji[emojiRt] === undefined ? "" : customEmoji[emojiRt]
  } ${item}`;
  console[type](message);
}

module.exports = { logMessage };
