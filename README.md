# Figma to Flutter Design Tokens

This project converts Figma design tokens to Flutter code.

**Note**: This parser supports only folders of JSON design token files. Multi-file support assumes that the input folder contains the following files:
- JSON token files
- $metadata file
- $themes file

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Example](#example)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the dependencies, run:

```sh
npm install
```

## Usage

To run the script, use the following command:

```sh
node [index.js] [options]
```

## Options

- `--input=<path>`: Path to the input themes file (e.g. : path/to/input/$themes.json)
- `--output=<path>`: Path to the output folder (default: generated/)
- `--theme=<name>`: Filter themes by group name
- `--help`: Display this help message

### Example

To convert Figma design tokens to Flutter code, you can use the following command:

```sh
node index.js --input=path/to/input/$themes.json --output=path/to/output --theme=themeName
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

### Explanation

1. **Project Title and Description**: The title and a brief description of the project.
2. **Table of Contents**: A table of contents for easy navigation.
3. **Installation**: Instructions on how to install the dependencies.
4. **Usage**: Instructions on how to run the script.
5. **Options**: A list of available options for the script.
6. **Example**: An example command to run the script.
7. **Contributing**: Information on how to contribute to the project.
8. **License**: Information about the project's license.

This README file provides a comprehensive guide to using and contributing to the project.
