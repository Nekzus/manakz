const { logMessage } = require('./message')
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

async function detectPackageManager(auto) {
  const packageManagers = {
    npm: 'package-lock.json',
    pnpm: 'pnpm-lock.yaml',
    bun: 'bun.lockb',
    yarn: 'yarn.lock'
  }

  for (const manager in packageManagers) {
    try {
      await fs.access(packageManagers[manager], fs.constants.F_OK)

      return manager
    } catch (error) {}
  }

  return auto ? 'npm' : null
}

async function selectPackageManager() {
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

  return answers.selectedPackageManager
}

async function detectOrSelectPackageManager() {
  const detectedManager = await detectPackageManager()
  if (detectedManager) {
    return detectedManager
  } else {
    return selectPackageManager()
  }
}

module.exports = {
  detectPackageManager,
  installedPackageManagers,
  selectPackageManager,
  detectOrSelectPackageManager
}
