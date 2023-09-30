const prompts = require('prompts')
const { logMessage } = require('./message')

async function confirm(message) {
  const { confirmation } = await prompts(
    [
      {
        type: 'toggle',
        name: 'confirmation',
        message,
        initial: true,
        active: 'yes',
        inactive: 'no'
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
  return confirmation
}

module.exports = {
  confirm
}
