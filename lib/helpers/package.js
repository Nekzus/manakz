const { logMessage } = require('./message')
const { textStyler } = require('./styles')
const prompts = require('prompts')
const fs = require('fs').promises
const { execSync } = require('child_process')

const packageManagersToCheck = ['npm', 'pnpm', 'yarn', 'bun']
const installedPackageManagers = detectInstalledPackageManagers(packageManagersToCheck)
function isPackageManagerInstalled(packageManagerName) {
  try {
    execSync(`${packageManagerName} --version`, { stdio: 'ignore' })
    return true
  } catch (error) {
    return false
  }
}
function detectInstalledPackageManagers(packageManagersToCheck) {
  return packageManagersToCheck
    .filter(packageManager => isPackageManagerInstalled(packageManager))
    .map(packageManager => ({
      title: packageManager,
      value: packageManager
    }))
}

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

  const answers = await prompts(
    [
      {
        type: 'select',
        name: 'selectedPackageManager',
        message: 'Select a package manager:',
        choices: installedPackageManagers,
        initial: 0
      }
    ],
    {
      onCancel: () => {
        logMessage({
          color: 'error',
          text: 'Operation cancelled.',
          emojiLt: 'cancel'
        })
        process.exit(0)
      }
    }
  )

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
  detectPackageManager,
  installedPackageManagers
}
