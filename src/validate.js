const fs = require("fs");
const yaml = require("js-yaml");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const schema = require("../schema/cli.schema.json");

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

/**
 * Validates a YAML document against the CLI schema.
 *
 * The YAML document can be provided as a string or a file path.
 *
 * @param {string} input - The YAML document as a string or a path to a YAML file.
 * @param {object} [options={ isFile: true }] - An options object.
 * @param {boolean} [options.isFile=true] - Set to `true` if `input` is a file path, `false` if it is a YAML string.
 * @returns {{valid: boolean, errors: import("ajv").ErrorObject[]}} An object containing a `valid` boolean and an `errors` array.
 */
function validateYaml(input, options = { isFile: true }) {
  const {isFile} = options;
  const data = isFile
    ? yaml.load(fs.readFileSync(input, "utf8"))
    : yaml.load(input);
  const valid = validate(data);
  return { valid, errors: validate.errors || [] };
}

module.exports = { validateYaml };
