# Canonical CLI Schema

[![NPM Version](https://img.shields.io/npm/v/cli-schema.svg)](https://www.npmjs.com/package/cli-schema)
[![Build Status](https://github.com/ioncakephper/cli-schema/actions/workflows/validate.yml/badge.svg)](https://github.com/ioncakephper/cli-schema/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Open Issues](https://img.shields.io/github/issues/ioncakephper/cli-schema.svg)](https://github.com/ioncakephper/cli-schema/issues)

### The Vision: A Universal Standard for Command-Line Interfaces

This project introduces a **canonical JSON Schema** to create a universal, declarative standard for defining CLIs. The goal is to move beyond inconsistent, code-first frameworks and enable a future where command-line tools are self-describing, interoperable, and supported by a rich ecosystem of automated tooling.

By defining the structure of a CLI in a simple, standardized YAML file, we can unlock massive productivity gains and create more robust, consistent, and user-friendly tools.

### Why a Schema-First Approach? The Developer ROI

Adopting a schema-first, declarative approach for your CLI offers a significant return on investment by:

- **Drastically Reducing Boilerplate:** Define your commands, arguments, and options in YAML. Let the ecosystem handle the parsing, validation, and help text generation.
- **Enforcing Consistency:** A single source of truth ensures that your CLI's behavior is consistent and predictable, reducing bugs and user confusion.
- **Enabling Automation:** Once your CLI is defined in a machine-readable format, you can automate documentation generation, create client libraries, and even build GUIs on top of your existing CLI logic.
- **Decoupling Logic from Definition:** Your core application logic remains separate from the CLI definition, making your code cleaner, easier to test, and simpler to refactor.

## Installation

To get started with `cli-schema`, you have several options:

### Install via npm (Recommended)

To install the package for use in your project:

```bash
npm install cli-schema
```

To install it globally, making the `cli-schema` command available everywhere on your system:

```bash
npm install -g cli-schema
```

### Install via Yarn

If you prefer Yarn, you can install the package for use in your project:

```bash
yarn add cli-schema
```

To install it globally:

```bash
yarn global add cli-schema
```

### Clone the Repository

If you want to contribute to the project or need the source code directly:

```bash
git clone https://github.com/ioncakephper/cli-schema.git
cd cli-schema
npm install # Or yarn install
```

## Usage

This package can be used both as a command-line tool for quick validation and as a library in your own projects.

### CLI Validation

The package includes a `cli-schema` executable for instantly validating one or more YAML definition files.

```bash
# Validate a single file
npx cli-schema path/to/your/file.yml

# Validate multiple files
npx cli-schema file1.yml file2.yml
```

Run the command with no arguments or with the `--help` flag to see the full list of options and examples.

On success, you will see output similar to this:

```plaintext
✅ path/to/your/file.yml is valid against cli.schema.json
```

### Programmatic Validation

Integrate validation directly into your build process or application.

```javascript
const { validateYaml } = require('cli-schema');

const result = validateYaml('./examples/demo-init.yml');

if (result.valid) {
  console.log('CLI definition is valid!');
} else {
  console.error('Validation failed:', result.errors);
}
```

### Scaling with Complexity

While the examples show a simple command, the schema is designed to handle enterprise-grade CLIs with dozens of nested commands, complex options, and varied argument structures. Advanced features like command hierarchies, option dependencies, and reusable type definitions are modeled directly in the schema, ensuring that it scales with your project's needs without sacrificing clarity.

## API Reference

### `validateYaml(input, [options])`

- **Description:** Validates a YAML document against the canonical CLI schema.
- **Parameters:**
  - `input` (`string`): The YAML document as a string or a path to a file.
  - `options` (`object`, optional):
    - `isFile` (`boolean`): Set to `true` if `input` is a file path. Defaults to `true`.
- **Returns:** `object` - An object containing a `valid` boolean and an `errors` array.

## Schema Reference

All CLI definitions must be nested under a top-level `cli` object. This root object contains all the commands, arguments, and options that define your command-line interface.

The `cli-schema` defines the structure for your CLI definition file. Here are the main building blocks:

### The `command` Object

| Property      | Type     | Description                                                                  |
| ------------- | -------- | ---------------------------------------------------------------------------- |
| `name`        | `string` | The name of the command. Must be `^[a-zA-Z](?:-?[a-zA-Z])*$`. **(Required)** |
| `alias`       | `string` | An alternative name for the command. Follows the same pattern as `name`.     |
| `description` | `string` | A brief description of what the command does.                                |
| `arguments`   | `array`  | An array of `argument` objects for this command.                             |
| `options`     | `array`  | An array of `option` objects for this command.                               |
| `commands`    | `array`  | An array of nested `command` objects (subcommands).                          |

### The `argument` Object

| Property      | Type      | Description                                                                   |
| ------------- | --------- | ----------------------------------------------------------------------------- |
| `name`        | `string`  | The name of the argument. Must be `^[a-zA-Z](?:-?[a-zA-Z])*$`. **(Required)** |
| `description` | `string`  | A brief description of the argument.                                          |
| `type`        | `string`  | The data type. Can be `string`, `number`, `boolean`. Defaults to `string`.    |
| `required`    | `boolean` | Whether the argument is required. Defaults to `false`.                        |
| `variadic`    | `boolean` | Whether the argument can accept multiple values. Defaults to `false`.         |

### The `option` Object

| Property      | Type     | Description                                                      |
| ------------- | -------- | ---------------------------------------------------------------- |
| `name`        | `string` | The long name of the option (e.g., `port`). **(Required)**       |
| `short`       | `string` | The single-letter short alias (e.g., `p`). Must be `^[a-zA-Z]$`. |
| `description` | `string` | A brief description of the option.                               |
| `type`        | `string` | The data type. Can be `string`, `number`, `boolean`.             |

## Examples

Explore various CLI definition examples adhering to the `cli.schema.json` in the [EXAMPLES.md](EXAMPLES.md) file. These practical demonstrations showcase how to structure your CLI metadata declaratively, covering different scenarios from simple tools to complex command structures.

## Vision & Roadmap: Building the Ecosystem

A schema is just the foundation. The true power will come from the ecosystem built around it. This is where we are headed:

- **Code Generators:** Create CLI boilerplate in multiple languages (Node.js, Python, Go) directly from the schema.
- **Documentation Generators:** Automatically generate professional, versioned web documentation and man pages.
- **IDE Integration:** Provide real-time validation, autocompletion, and tooltips for CLI definition files in editors like VS Code.
- **Dynamic GUI Generation:** Create simple graphical interfaces for your CLI on the fly.
- **CLI Discovery & Interoperability:** Enable tools to programmatically understand and interact with each other.

We are actively seeking contributors to help build this ecosystem.

## Contributing

This is an ambitious project, and contributions are essential to its success. Please read our [Contributing Guidelines](CONTRIBUTING.md) to learn how you can help shape the future of CLIs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
