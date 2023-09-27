const { logMessage } = require('./message')
const { textStyler } = require('./styles')
const inquirer = require('inquirer')
const fs = require('fs').promises

async function detectPackageManager() {
  const packageManagers = {
    npm: 'package-lock.json',
    pnpm: 'pnpm-lock.yaml',
    bun: 'bun.lockb',
    yarn: 'yarn.lock'
  }

  for (const manager in packageManagers) {
    try {
      await fs.access(packageManagers[manager], fs.constants.F_OK)
      logMessage({
        color: 'success',
        text: 'Package manager detected:',
        emojiLt: 'success',
        item: textStyler.info(manager)
      })
      return manager
    } catch (error) {}
  }

  logMessage({
    color: 'warning',
    text: 'No package manager detected.',
    emojiLt: 'warning',
    item: textStyler.info('Please select one:')
  })

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedPackageManager',
      message: 'Select a package manager:',
      choices: ['npm', 'pnpm', 'yarn', 'bun'],
      default: 'npm'
    }
  ])

  const selectedManager = answers.selectedPackageManager
  logMessage({
    color: 'success',
    text: 'Package manager selected:',
    emojiLt: 'success',
    item: textStyler.info(selectedManager)
  })

  const nodeModulesExists = await fs
    .access('node_modules', fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)

  if (nodeModulesExists) {
    logMessage({
      color: 'warning',
      text: 'Node modules directory detected.',
      emojiLt: 'warning'
    })

    logMessage({
      color: 'info',
      text: 'Deleting node_modules directory...'
    })

    await fs.rm('node_modules', { recursive: true })
    logMessage({
      color: 'success',
      text: 'Node modules directory deleted successfully.',
      emojiLt: 'success'
    })
  }

  return selectedManager
}

module.exports = {
  detectPackageManager
}
