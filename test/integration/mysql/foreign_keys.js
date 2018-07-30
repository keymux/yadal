const path = require("path");

const { expect } = require("chai");

const { mysqlcPromise } = require("../../tools/mysqlc");

const {
  createTable,
  insertData,
  selectData,
  queryPromiseCreator,
} = require("../../../src/mysql");

describe("foreign_keys.js", () => {
  let logger;
  let mysqlc;
  let queryPromise;

  before(() =>
    mysqlcPromise(process.env).then(result => {
      mysqlc = result;

      queryPromise = queryPromiseCreator({ logger, mysqlc });
    })
  );

  beforeEach(() => {
    logger = require(path.resolve("test/tools/spies/logger")).getSpyLogger();
    queryPromise = queryPromiseCreator({ logger, mysqlc });
  });

  const fixtures = [
    // Force formatting
    require(path.resolve("test/fixtures/crypto_fibonacci"))(),
  ];

  fixtures.forEach(({ description, tables }) => {
    describe(description, () => {
      const mappedTables = tables.map(table => {
        const {
          columns,
          description,
          expectedCreateStatement,
          name,
          primaryKey,
        } = table;

        return Object.assign(
          {
            actualCreateStatement: createTable(table).query,
          },
          table
        );
      });

      describe("validate mappedTables", () => {
        mappedTables.forEach(table => {
          const {
            actualCreateStatement,
            columns,
            comment,
            expectedCreateStatement,
            name,
            primaryKey,
          } = table;

          describe(comment, () => {
            it("should produce an expected create statement", () => {
              expect(actualCreateStatement).to.equal(expectedCreateStatement);
            });
          });
        });
      });

      describe("create mappedTables", () => {
        mappedTables.forEach(table => {
          const { actualCreateStatement, name } = table;

          it(`should create the table ${name}`, () =>
            queryPromise({ query: actualCreateStatement }));
        });
      });
    });
  });
});
