const { validateYaml } = require("../src/validate");

test("valid demo-init.yml passes validation", () => {
  const result = validateYaml("./examples/demo-init.yml");
  expect(result.valid).toBe(true);
});

test("invalid schema fails validation", () => {
  const badYaml = `
cli:
  name: "demo-init"
  commands:
    - name: init
      arguments:
        - name: configFile
          type: string
          default:
            value: "config.json"
            fromConfig: "files.default"
  `;
  const result = validateYaml(badYaml, {isFile: false});
  expect(result.valid).toBe(false);
});
