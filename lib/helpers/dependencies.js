const { confirm } = require('./prompts')
const { customEmoji } = require('./emojis')
const { detectPackageManager } = require('./package')
const { execSync } = require('child_process')
const { logMessage } = require('./message')
const fs = require('fs').promises

async function installOrUpdateDependencies(autoExecute = false) {
  const hasNodeModules = await fs
    .access('node_modules')
    .then(() => true)
    .catch(() => false)

  if (autoExecute) {
    return hasNodeModules ? updateDependencies() : installDependencies()
  }

  const shouldUpdateDeps =
    hasNodeModules && (await confirm(`${customEmoji.update} Do you want to update dependencies? (y/n)`))
  const shouldInstallDeps =
    !hasNodeModules && (await confirm(`${customEmoji.install} Do you want to install dependencies? (y/n)`))

  if (shouldUpdateDeps) {
    await updateDependencies()
  }

  if (shouldInstallDeps) {
    await installDependencies()
  }
}

async function updateDependencies() {
  try {
    logMessage({
      color: 'info',
      text: 'Updating dependencies...',
      emojiRt: 'lucky'
    })
    const packageManager = await detectPackageManager()
    execSync(`${packageManager} ${packageManager === 'yarn' ? 'upgrade' : 'update'}`, { stdio: 'inherit' })
    logMessage({
      color: 'success',
      text: 'Dependencies updated successfully!',
      emojiRt: 'thumbsUp'
    })
  } catch (error) {
    logMessage({
      color: 'error',
      emojiLt: 'error',
      text: 'Error updating dependencies:',
      item: error,
      type: 'error'
    })
  }
}

async function installDependencies() {
  try {
    logMessage({
      color: 'info',
      text: 'Installing dependencies...',
      emojiRt: 'lucky'
    })
    const packageManager = await detectPackageManager()
    execSync(`${packageManager} install`, { stdio: 'inherit' })
    logMessage({
      color: 'success',
      text: 'Dependencies installed successfully!',
      emojiRt: 'thumbsUp'
    })
  } catch (error) {
    logMessage({
      color: 'error',
      emojiLt: 'error',
      text: 'Error installing dependencies:',
      item: error,
      type: 'error'
    })
  }
}

module.exports = {
  installDependencies,
  installOrUpdateDependencies,
  updateDependencies
}
