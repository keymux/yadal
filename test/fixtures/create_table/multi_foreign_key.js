const path = require("path");

module.exports = ({ name }) => ({
  config: {
    name,
  },
  description: ({ name }) => `should create a table ${name} with foreign keys`,
  expected: ({ name }) => ({
    query: [
      `CREATE TABLE ${name} (`,
      "  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,",
      "  someForeignKeyId INT UNSIGNED NOT NULL,",
      "  fkeyPart1 INT UNSIGNED,",
      "  fkeyPart2 INT UNSIGNED,",
      "  fkey3 INT UNSIGNED,",
      "  FOREIGN KEY (someForeignKeyId) REFERENCES crypto (id),",
      "  FOREIGN KEY (fkeyPart1, fkeyPart2) REFERENCES fkeyTable (id1, id2),",
      "  FOREIGN KEY named_foreign_key (fkey3) REFERENCES crypto (id)",
      ");",
    ].join("\n"),
  }),
  input: config =>
    require(path.resolve("test/models/multi_foreign_key"))(config),
});
