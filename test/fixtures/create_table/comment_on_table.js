const path = require("path");

const { alphaGen } = require(path.resolve("test/tools/alpha_gen"));

module.exports = ({ name }) => ({
  config: {
    comment: alphaGen(),
    name,
  },
  description: ({ name }) =>
    `should create a table ${name} allowing a table level comment`,
  expected: ({ comment, name }) => ({
    query: [
      // Formatting
      `CREATE TABLE ${name} (`,
      "  id INT",
      `) COMMENT='${comment}';`,
    ].join("\n"),
  }),
  input: config =>
    require(path.resolve("test/models/comment_on_table"))(config),
});
