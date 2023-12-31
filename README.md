# manakz - Console Project Helper

> _Simplifying Your Development Tasks with Manakz: Open, Install, and Develop_


[![Github Workflow](https://github.com/nekzus/manakz/actions/workflows/publish.yml/badge.svg?style=flat&&event=push)](https://github.com/Nekzus/manakz/actions/workflows/publish.yml)
[![npm-version](https://img.shields.io/npm/v/@nekzus/manakz.svg?style=flat)](https://www.npmjs.com/package/@nekzus/manakz)
[![npm-month](https://img.shields.io/npm/dm/@nekzus/manakz.svg?style=flat)](https://www.npmjs.com/package/@nekzus/manakz)
[![npm-total](https://img.shields.io/npm/dt/@nekzus/manakz.svg?style=flat)](https://www.npmjs.com/package/@nekzus/manakz)

<div align="center">
<img width="500" alt="manakz" src="https://res.cloudinary.com/dsvsl0b0b/image/upload/v1695847516/npm-package/f1vbrsucnuwyhdlo0tjo.png">
</div>

## Installation

You can install manakz globally using npm:

```
npm install -g @nekzus/manakz
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
5. Start the development server using the appropriate package manager (npm, pnpm, yarn or bun).
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

If you have any questions or suggestions, please feel free to contact me at [nekzus.dev@gmail.com](mailto:nekzus.dev@gmail.com).
