const { logMessage } = require('./message')
const { execSync } = require('child_process')
function releasePorts(ports) {
  ports.forEach(port => {
    try {
      execSync(`lsof -i :${port} | awk 'NR!=1 {print $2}' | xargs kill`, {
        stdio: 'ignore'
      })
      logMessage({
        color: 'success',
        emojiLt: 'success',
        text: 'Released port',
        item: port
      })
    } catch (error) {}
  })
  logMessage({ color: 'success', text: 'Ports released.', emojiLt: 'release' })
}

module.exports = {
  releasePorts
}
