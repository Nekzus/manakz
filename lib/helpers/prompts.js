const inquirer = require("inquirer");

async function confirm(message) {
  const { confirmation } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmation",
      message,
      default: true,
    },
  ]);
  return confirmation;
}

module.exports = {
  confirm,
};
