#!/usr/bin/env node

const fs = require('fs').promises

const { showHeader } = require('./helpers/utils')
const { startDevServer } = require('./helpers/server')
const { releasePorts } = require('./helpers/release')
const { customEmoji } = require('./helpers/emojis')
const { confirm } = require('./helpers/prompts')
const { logMessage } = require('./helpers/message')
const { openInVSCode } = require('./helpers/vscode')
const { installOrUpdateDependencies } = require('./helpers/dependencies')
const { installedPackageManagers } = require('./helpers/package')

async function openProject(options) {
  const { yesToAll, vscode, install, start } = options
  try {
    await fs.access('package.json')
  } catch (err) {
    logMessage({
      color: 'error',
      text: 'No package.json file found in the current directory.',
      emojiLt: 'error',
      type: 'error'
    })

    logMessage({
      color: 'error',
      text: 'Make sure you are in the project folder before running this script.',
      emojiLt: 'error',
      type: 'error'
    })
    return
  }

  if (installedPackageManagers.length === 0) {
    logMessage({
      color: 'error',
      text: 'No package managers detected.',
      emojiLt: 'error'
    })
    logMessage({
      color: 'info',
      text: 'Please install one of the following package managers: npm, pnpm, yarn, or bun.'
    })

    return
  }

  if (!yesToAll) {
    showHeader()

    const confirmation = await confirm('Ready to go? (y/n)')

    if (!confirmation) {
      logMessage({
        color: 'info',
        text: 'Operation cancelled.',
        emojiLt: 'cancel'
      })
      return
    }

    const selectAll = await confirm(`${customEmoji.flash} Select 'Yes' for all options? (y/n)`)

    if (selectAll) {
      logMessage({
        color: 'success',
        text: 'Executing all selected options...',
        emojiLt: 'success'
      })
      await openInVSCode()
      await installOrUpdateDependencies(selectAll)
      await startDevServer()
    } else {
      if (await confirm(`${customEmoji.file} Open project in Visual Studio Code? (y/n)`)) {
        await openInVSCode()
      }

      await installOrUpdateDependencies()

      if (await confirm(`${customEmoji.rocket} Start the development server? (y/n)`)) {
        await startDevServer()
      }
    }
  } else {
    !vscode && (await openInVSCode())
    !install && (await installOrUpdateDependencies(yesToAll))
    !start && (await startDevServer())
  }
  releasePorts(['3000', '4200', '5173', '8000', '8080'])
}

module.exports = {
  openProject
}
