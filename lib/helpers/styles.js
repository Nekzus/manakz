const textStyler = {
  default: text => formatText(text, '39'), // White
  error: text => formatText(text, '31'), // Red
  info: text => formatText(text, '36'), // Cyan
  success: text => formatText(text, '32'), // Green
  warning: text => formatText(text, '33') // Yellow
}

function formatText(text, colorCode) {
  return `\x1b[${colorCode}m${text}\x1b[0m`
}

module.exports = { textStyler }
