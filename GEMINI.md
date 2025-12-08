# Gemini Project: cli-schema

## Project Overview

This project provides a canonical JSON schema for defining Command-Line Interfaces (CLIs) in a declarative YAML format. The goal is to establish a universal standard for CLIs, enabling automation, consistency, and a better developer experience. The core of the project is a JSON schema that defines the structure of the CLI, and a validation library to check YAML files against this schema.

The main technologies used are:

- **Node.js:** The runtime environment for the project.
- **JSON Schema:** Used to define the structure of the CLI definition files.
- **YAML:** The format for writing the declarative CLI definitions.
- **Ajv:** A fast JSON schema validator.
- **Jest:** The testing framework.
- **Commander.js:** A library for building command-line interfaces in Node.js.
- **ESLint and Prettier:** For code linting and formatting.

## Building and Running

### Installation

To install the project dependencies, run:

```bash
npm install
```

### Running the CLI

The main CLI tool can be run with the following command:

```bash
npm start
```

You can also use the `npx` command to run the CLI and validate a file:

```bash
npx cli-schema path/to/your/file.yml
```

### Running Tests

To run the test suite, use the following command:

```bash
npm test
```

### Linting

To check the code for linting errors, run:

```bash
npm run lint
```

To automatically fix linting errors, run:

```bash
npm run lint:fix
```

### Formatting

To format the code using Prettier, run:

```bash
npm run format
```

## Development Conventions

- **Code Style:** The project uses Prettier for automatic code formatting and ESLint for enforcing code style and quality.
- **Testing:** Tests are written using the Jest framework and are located in the `test` directory.
- **Contributions:** Contributions are welcome. Please refer to the `CONTRIBUTING.md` file for guidelines.
- **Project Structure:** The project follows a standard Node.js project structure:
  - `bin`: Contains the executable script for the CLI.
  - `src`: Contains the main source code for the validation library.
  - `schema`: Contains the JSON schema for the CLI definitions.
  - `test`: Contains the tests for the project.
  - `examples`: Contains example YAML definition files.
