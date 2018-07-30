const path = require("path");

module.exports = ({ name }) => ({
  config: {
    name,
  },
  description: ({ name }) =>
    `should create a table ${name} with a primary id key and non nullable field with a default`,
  expected: ({ name }) => ({
    query: [
      `CREATE TABLE ${name} (`,
      "  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,",
      "  name VARCHAR(255) NOT NULL DEFAULT Fred",
      ");",
    ].join("\n"),
  }),
  input: config =>
    require(path.resolve("test/models/id_bigint_name_varchar_255"))(config),
});
