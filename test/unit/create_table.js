const path = require("path");

const { alphaGen } = require(path.resolve("test/tools/alpha_gen"));
const { expect } = require("chai");

const { createTable, insertData } = require("../../src/mysql");

describe("mysql.js", () => {
  let logger;

  beforeEach(() => {
    logger = require(path.resolve("test/tools/spies/logger")).getSpyLogger();
  });

  describe("createTable() happy path", () => {
    const getFixture = name =>
      require(path.resolve(`test/fixtures/create_table/${name}`))({
        name: `${name}_${alphaGen()}`,
      });

    const fixtures = [
      "comment_on_table",
      "foreign_key_as_string",
      "id_bigint_name_varchar_255",
      "id_primary_key",
      "id_varchar_255",
      "multi_foreign_key",
    ].map(x => getFixture(x));

    fixtures.forEach(({ config, description, expected, input }) =>
      it(description(config), () => {
        const actual = createTable(input(config));

        expect(actual).to.deep.equal(expected(config));
      })
    );
  });

  describe("createTable() sad path", () => {
    const fixtures = [
      {
        description:
          "should throw when the primary key is not a string or an array",
        expectations: actualFn => [
          () => {
            expect(actualFn).to.throw;

            try {
              actualFn();
            } catch (ex) {
              expect(ex.message).to.equal(
                "Unsupported type `number` for primary key"
              );
            }
          },
        ],
        input: {
          columns: {
            id: {
              name: "id",
              type: "INT",
            },
          },
          name: alphaGen(),
          primaryKey: 1,
        },
      },
    ];

    fixtures.forEach(({ description, expectations, input }) =>
      it(description, () =>
        expectations(() => createTable(input)).forEach(expectation =>
          expectation()
        )
      )
    );
  });
});
