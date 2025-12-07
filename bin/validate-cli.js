#!/usr/bin/env node
const path = require('path');
const { validateYaml } = require(path.join(__dirname, '..', 'src', 'validate'));

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage: cli-validate <file.yml>');
  process.exit(1);
}

const file = args[0];
const result = validateYaml(file);

if (result.valid) {
  console.log(`✅ ${file} is valid against cli.schema.json`);
} else {
  console.error(`❌ ${file} failed validation:`);
  result.errors.forEach((err) => {
    console.error(`- ${err.instancePath} ${err.message}`);
  });
  process.exit(1);
}
