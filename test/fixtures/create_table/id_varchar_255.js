const path = require("path");

module.exports = ({ name }) => ({
  config: {
    name,
  },
  description: ({ name }) =>
    `should create a table ${name} with a single column`,
  expected: ({ name }) => ({
    query: [
      // Formatting
      `CREATE TABLE ${name} (`,
      "  id VARCHAR(255)",
      ");",
    ].join("\n"),
  }),
  input: config => require(path.resolve("test/models/id_varchar_255"))(config),
});
