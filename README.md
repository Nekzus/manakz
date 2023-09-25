# manakz - Console Project Helper

[![GitHub version](https://badge.fury.io/gh/Nekzus%2Fmanakz.svg)](https://badge.fury.io/gh/Nekzus%2Fmanakz)
[![npm](https://img.shields.io/npm/dm/manakz.svg?maxAge=2592000)]()

manakz is a command-line tool designed to simplify common project-related tasks. It helps you open your project in Visual Studio Code, install dependencies if needed, and start a development server.

## Installation

You can install manakz globally using npm:

```
npm install -g manakz
```

## Usage

### Interactive Mode

To harness the power of **Manakz**, navigate to your project directory and run the command:

```
manakz   |>  Activate Interactive Mode Console
```

manakz will guide you through the following steps:

1. Confirm if you want to continue.
2. Option accept all prompts.
3. Open the project in Visual Studio Code.
4. Install project dependencies if they are not already installed.
5. Start the development server using the appropriate package manager (npm, pnpm, or yarn).
6. Release common development ports if they are in use.

### Automatic Mode

```
manakz [flags]
```

### Available Flags

```
-h, --help |> Displays this help message.
-v, --version |> Displays the version of manakz.
-y, --yes |> Executes actions without user prompts, answering 'yes' to all questions.

-y -i, --yes --install |> Bypass installation of dependencies if not already present.
-y -s, --yes --start |> Bypass initialization of the development server.
-y -c, --yes --vscode |> Bypass opening the project in Visual Studio Code.
```

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
