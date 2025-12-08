#!/usr/bin/env node
/**
 * @file This script provides a command-line interface (CLI) for validating YAML definition files
 * against the canonical CLI schema. It uses `commander.js` for argument parsing,
 * help generation, and command dispatching.
 *
 * It supports validating one or more files and provides user-friendly output
 * indicating success or detailing validation errors.
 */
const path = require('path');
const { validateYaml } = require(path.join(__dirname, '..', 'src', 'validate'));
const { Command } = require('commander');

// Dynamically load package.json content for metadata
const packageJson = require(path.join(__dirname, '..', 'package.json'));

const program = new Command();

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

program
  .option('-v, --verbose', 'Enable verbose output')
  .option('-d, --debug', 'Enable debug output');

program.configureHelp({
  sortSubcommands: true,
  sortOptions: true,
  showGlobalOptions: true,
});

program.argument('[filesToValidate...]', 'files to validate');

program.addHelpText(
  'after',
  `
Examples:
  # Validate a single file
  $ cli-schema examples/demo-init.yml

  # Validate multiple files
  $ cli-schema examples/demo-init.yml another-file.yml
  
  # Validate a file from a different directory using npx
  $ npx cli-schema path/to/another/project/config.yml
  
  # Display the CLI version
  $ cli-schema --version
  
  # Display the help message
  $ cli-schema --help
`
);

/**
 * Defines the action to be taken when the CLI is executed.
 * It validates the provided files or displays help if no files are specified.
 * @param {string[]} filesToValidate - An array of file paths to be validated.
 */
program.action((filesToValidate) => {
  if (filesToValidate.length === 0) {
    program.outputHelp();
    process.exit(0); // Exit gracefully after showing help
  }

  for (const fileName of filesToValidate) {
    const originalPath = fileName;
    const absolutePath = path.resolve(originalPath);

    try {
      const result = validateYaml(absolutePath);

      if (result.valid) {
        console.log(`✅ ${originalPath} is valid against cli.schema.json`);
      } else {
        console.error(`❌ ${originalPath} failed validation:`);
        result.errors.forEach((err) => {
          console.error(`- ${err.instancePath || 'Schema'} ${err.message}`);
        });
        process.exit(1);
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error(
          `Error: Cannot find or read the file at '${originalPath}'.`
        );
        console.error(`Attempted to resolve to: ${absolutePath}`);
      } else {
        console.error('An unexpected error occurred:');
        console.error(error.message);
      }
      process.exit(1);
    }
  }
});

program.parse();
