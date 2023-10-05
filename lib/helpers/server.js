const { detectPackageManager } = require('./package')
const { logMessage } = require('./message')
const spawn = require('cross-spawn')

async function startDevServer() {
  let childProcess
  let isTerminating = false

  function terminateServer() {
    if (!isTerminating) {
      isTerminating = true
      if (childProcess) {
        childProcess.kill('SIGINT')
      }
      logMessage({
        color: 'info',
        text: 'Terminating development server...',
        emojiLt: 'thumbsDown'
      })
    }
  }

  process.on('SIGINT', () => {
    logMessage({
      color: 'info',
      text: 'Ctrl+C pressed.',
      emojiLt: 'info'
    })

    setTimeout(() => {
      terminateServer()
    }, 2000)
  })

  try {
    logMessage({
      color: 'info',
      text: 'Starting development server...',
      emojiRt: 'lucky'
    })

    const packageManager = await detectPackageManager()
    const command = `${packageManager} run dev`

    childProcess = spawn(command, [], {
      stdio: 'inherit',
      shell: true
    })

    childProcess.on('exit', (code, signal) => {
      terminateServer()
    })

    childProcess.on('error', err => {
      logMessage({
        color: 'error',
        text: 'Error starting development server:',
        item: err
      })

      terminateServer()
    })
  } catch (error) {
    logMessage({
      color: 'error',
      emojiLt: 'thumbsDown',
      text: 'Error starting development server:',
      item: error
    })

    terminateServer()
  }
}

module.exports = {
  startDevServer
}
