const { confirm } = require('./prompts')
const { customEmoji } = require('./emojis')
const { detectOrSelectPackageManager, detectPackageManager } = require('./package')
const { execSync } = require('child_process')
const { logMessage } = require('./message')
const fs = require('fs').promises
const { textStyler } = require('./styles')

async function installOrUpdateDependencies(autoExecute = false) {
  const hasNodeModules = await fs
    .access('node_modules', fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)

  let packageManager = await detectPackageManager(autoExecute)

  if (autoExecute) {
    if (!hasNodeModules || !packageManager) {
      return installDependencies(packageManager)
    } else {
      return updateDependencies(packageManager)
    }
  } else {
    let shouldUpdateDeps = false

    if (!hasNodeModules || !packageManager) {
      const shouldInstallDeps = await confirm(`${customEmoji.install} Do you want to install dependencies? (y/n)`)
      if (shouldInstallDeps) {
        packageManager = await detectOrSelectPackageManager()
        await installDependencies(packageManager)
      }
    } else {
      shouldUpdateDeps = await confirm(`${customEmoji.update} Do you want to update dependencies? (y/n)`)
    }

    if (shouldUpdateDeps) {
      await updateDependencies(packageManager)
    }

    if (!packageManager) {
      logMessage({
        color: 'error',
        emojiLt: 'error',
        text: 'No package manager detected or selected.',
        item: textStyler.info('Please select one:')
      })
      process.exit(0)
    }
  }
}

async function updateDependencies(packageManager) {
  try {
    logMessage({
      color: 'info',
      text: 'Updating dependencies...',
      emojiRt: 'lucky'
    })
    // const packageManager = await detectPackageManager()
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

async function installDependencies(packageManager) {
  try {
    const hasNodeModules = await fs
      .access('node_modules', fs.constants.F_OK)
      .then(() => true)
      .catch(() => false)

    if (hasNodeModules) {
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
    logMessage({
      color: 'info',
      text: 'Installing dependencies...',
      emojiRt: 'lucky'
    })
    // const packageManager = await detectPackageManager()
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
