# manakz - Console Project Helper

[![npm version](https://badge.fury.io/js/manakz.svg)](https://badge.fury.io/js/manakz)

manakz is a command-line tool designed to simplify common project-related tasks. It helps you open your project in Visual Studio Code, install dependencies if needed, and start a development server.

## Installation

You can install manakz globally using npm:

```bash
npm install -g manakz
```

## Usage

Navigate to your project directory and run the manakz command:

```bash
manakz
```

manakz will guide you through the following steps:

1. Confirm if you want to continue.
2. Open the project in Visual Studio Code.
3. Install project dependencies if they are not already installed.
4. Start the development server using the appropriate package manager (npm, pnpm, or yarn).
5. Release common development ports if they are in use.

## Features

- Automatically detects the package manager used in the project (npm, pnpm, bun or yarn).
- Simplifies the process of opening a project in Visual Studio Code.
- Installs project dependencies if necessary.
- Releases common development ports to prevent conflicts.

## Options

There are no command-line options for manakz. It provides a guided experience based on your project's needs.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

This tool was inspired by the need to streamline common development tasks.
Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## Author

[nekzus](https://github.com/nekzus)

## Contact

If you have any questions or suggestions, please feel free to contact me at [maseortega@gmail.com](mailto:maseortega@gmail.com).
