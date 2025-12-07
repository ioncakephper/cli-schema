# Examples of CLI Definitions

This document showcases various CLI definition files written in YAML, adhering to the `cli.schema.json`. These examples serve as practical demonstrations of how to structure your CLI metadata declaratively.

---

## cli-schema.definition.yml

### Summary

This file provides a self-referential example, defining the `cli-schema` command-line tool itself using the canonical CLI schema. It serves as a blueprint for its own validator.

### Specific Features

- **Self-Referential:** Demonstrates how the `cli-schema` can be defined using its own schema.
- **Command Definition:** Defines the main `cli-schema` command with its description and version.
- **Optional, Variadic Arguments:** Shows how to define an argument (`filesToValidate`) that can accept multiple values and is not strictly required.
- **Standard Options:** Includes definitions for the standard `--help` and `--version` options, utilizing the `short` and `name` properties according to schema rules.

```yaml
# This file defines the 'cli-schema' command-line tool itself,
# using the canonical schema.
command: cli-schema
description: Canonical JSON Schema for declarative CLI definitions
version: '1.0.6'

# Defines the positional arguments for the command.
arguments:
  - name: filesToValidate
    description: One or more files to validate against the schema.
    type: string
    # 'required: false' makes this argument optional, equivalent to [files...].
    # If this was 'required: true', it would be equivalent to <files...>.
    required: false
    variadic: true

# Defines the options (flags) for the command.
# These are standard options automatically provided by commander.js.
options:
  - name: help
    short: h
    description: Display help for command
    type: boolean
  - name: version
    short: V
    description: Output the version number
    type: boolean
```

---

## demo-init.yml

### Summary

A basic example demonstrating a simple CLI initializer tool. It showcases how to define global options for the main command and a nested subcommand with its own argument and dynamic default value.

### Specific Features

- **Global Options:** Defines options like `verbose`, `debug`, and `quiet` that apply to the main CLI.
- **Subcommand Structure:** Illustrates how to define a subcommand (`init`) under the main CLI.
- **Dynamic Argument Defaults:** Shows the use of a `default` value for an argument, specifically using the `fn` type to dynamically generate a default filename based on the program's name (e.g., `.demoinitorc.json`).
- **Boolean Options:** Examples of boolean options (`verbose`, `debug`, `quiet`, `force`).

```yaml
cli:
  name: 'demo-init'
  description: 'Demo CLI initializer'
  options:
    - name: verbose
      short: v
      description: enable verbose mode

      # use required: true, the verbose option must appear in command line
      required: false

    - name: debug
      # alias: d # Commented out as alias is no longer used and short is the new property
      description: enable debug mode

    - name: quiet
      # alias: q # Commented out as alias is no longer used and short is the new property
      description: enable quiet mode

  commands:
    - name: init
      alias: i
      description: 'Initialize configuration file'
      arguments:
        - name: configFile
          description: 'Configuration filename to create'
          # type: string # Defaults to string
          # required: false
          default:
            fn: 'program => `.${program.name()}rc.json`'
      options:
        - name: force
          # alias: f # Commented out as alias is no longer used and short is the new property
          description: 'Override writing configuration file'
          # type: boolean
          default:
            value: false
```

---

## npm-install.definition.yml

### Summary

A comprehensive example demonstrating the definition of the familiar `npm` command-line tool. It includes definitions for the `install`, `init`, and `version` subcommands, showcasing a realistic complex CLI structure.

### Specific Features

- **Nested Commands:** Defines multiple subcommands (`install`, `init`, `version`) under the main `npm` command.
- **Command Aliases:** Shows how to define short aliases for subcommands (e.g., `i` for `install`).
- **Variadic Arguments:** Demonstrates an argument (`packages` for `install`) that can accept multiple values.
- **Options with Short Flags:** Includes various options with their short aliases (e.g., `-S` for `--save`, `-D` for `--save-dev`).
- **Different Argument Types:** Shows how to define arguments (e.g., `newversion` for `version` subcommand) and options (e.g., `omit` for `install` subcommand) with explicit `type` definitions.

```yaml
# Defines the 'npm install', 'npm init', and 'npm version' commands using the canonical CLI schema.
# This serves as a practical example of describing a common Node.js CLI operation.
cli:
  name: npm
  description: Node Package Manager

  commands:
    - name: install
      alias: i
      description: Install a package or packages.
      arguments:
        - name: packages
          description: Optional list of packages to install.
          type: string
          required: false # This is equivalent to [pkg...]
          variadic: true # Allows multiple package names
      options:
        - name: save
          short: S
          description: Package will appear in your dependencies.
          type: boolean
        - name: save-dev
          short: D
          description: Package will appear in your devDependencies.
          type: boolean
        - name: global
          short: g
          description: Installs package globally.
          type: boolean
        - name: force
          short: f
          description: Forces fetching remote resources even if a local copy exists.
          type: boolean
        - name: omit
          description: Exclude certain dependency types (e.g., dev).
          type: string
          # Could add choices: ['dev', 'peer', 'optional'] if we wanted to be stricter.
        - name: dry-run
          description: Don't make actual changes.
          type: boolean
    - name: init
      description: Create a package.json file.
      options:
        - name: yes
          short: y
          description: Skip all prompts and use default values.
          type: boolean
        - name: scope
          description: Scope to use for new package.
          type: string
        - name: force
          short: f
          description: Force init even if a package.json already exists.
          type: boolean
    - name: version
      description: Bump package version.
      arguments:
        - name: newversion
          description: The new version (e.g., 1.0.0, major, minor, patch).
          type: string
          required: false
      options:
        - name: no-git-tag-version
          description: Prevent tagging version in git.
          type: boolean
        - name: preid
          description: Identifier for a prerelease version.
          type: string
```
