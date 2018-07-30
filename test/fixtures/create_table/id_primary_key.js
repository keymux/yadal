const path = require("path");

module.exports = ({ name }) => ({
  config: {
    name,
  },
  description: ({ name }) =>
    `should create a table ${name} with a primary key array`,
  expected: ({ name }) => ({
    query: [
      // Formatting
      `CREATE TABLE ${name} (`,
      "  id INT,",
      "  PRIMARY KEY (id)",
      ");",
    ].join("\n"),
  }),
  input: config => require(path.resolve("test/models/id_primary_key"))(config),
});
