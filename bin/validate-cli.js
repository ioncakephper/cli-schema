#!/usr/bin/env node
const path = require('path');
const { validateYaml } = require(path.join(__dirname, '..', 'src', 'validate'));

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage: cli-validate <file.yml>');
  process.exit(1);
}

const originalPath = args[0];
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
    console.error(`Error: Cannot find or read the file at '${originalPath}'.`);
    console.error(`Attempted to resolve to: ${absolutePath}`);
  } else {
    console.error('An unexpected error occurred:');
    console.error(error.message);
  }
  process.exit(1);
}
