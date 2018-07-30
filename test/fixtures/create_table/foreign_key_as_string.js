const path = require("path");

module.exports = ({ name }) => ({
  config: {
    name,
  },
  description: ({ name }) =>
    `should create a table ${name} allowing a primary key as a string`,
  expected: ({ name }) => ({
    query: [
      `CREATE TABLE ${name} (`,
      "  id INT,",
      "  PRIMARY KEY (id)",
      ");",
    ].join("\n"),
  }),
  input: config =>
    require(path.resolve("test/models/foreign_key_as_string"))(config),
});
