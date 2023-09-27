const { epilogueText } = require('./helpers/epilogue')
const yargs = require('yargs')

function configureYargs() {
  return yargs
    .options('install', {
      alias: 'i',
      describe: 'Skip dependency install',
      default: false,
      type: 'boolean'
    })
    .options('start', {
      alias: 's',
      describe: 'Skip dev server init',
      default: false,
      type: 'boolean'
    })
    .options('vscode', {
      alias: 'c',
      describe: 'Skip opening in VS Code',
      default: false,
      type: 'boolean'
    })
    .options('yes', {
      alias: 'y',
      describe: 'Execute without confirmation',
      default: false,
      type: 'boolean'
    })
    .help()
    .alias('help', 'h')
    .version()
    .alias('version', 'v')
    .usage('Usage: manakz [options]')
    .epilogue(epilogueText)
}

module.exports = {
  configureYargs
}
