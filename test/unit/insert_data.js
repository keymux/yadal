const path = require("path");

const { alphaGen } = require(path.resolve("test/tools/alpha_gen"));
const { expect } = require("chai");

const {
  _fieldsFromMappedDataRows,
  createTable,
  insertData,
} = require("../../src/mysql");

describe("mysql.js", () => {
  let logger;

  beforeEach(() => {
    logger = require(path.resolve("test/tools/spies/logger")).getSpyLogger();
  });

  describe("insertData()", () => {
    const getFixture = config =>
      require(path.resolve(`test/fixtures/insert_data/${config.fixture}`))(
        config
      );
    const mkConfig = fixture => config => Object.assign({ fixture }, config);

    const mkAutoConfig = mkConfig("automobile");

    const configs = [
      mkAutoConfig({
        dataFile: "test/data/automobile/empty",
        description: "should throw on an empty set",
        name: `empty_${alphaGen()}`,
        testFn: input => {
          expect(() => insertData(input)).to.throw();
        },
      }),
      mkAutoConfig({
        dataFile: "test/data/automobile/aston_martin",
        description: ({ name }) =>
          `should insert aston martins into an automobiles table ${name}`,
        name: `automobiles_${alphaGen()}`,
        testFn: input => {
          const actual = insertData(input);

          const { data, query } = actual;
          const expectedFieldCount =
            input.dataRows.length * input.uniqueFieldsInData;

          expect(data.length).to.equal(expectedFieldCount);

          const matches = query.match(/[?]/g);

          expect(matches.length).to.equal(expectedFieldCount);
        },
        uniqueFieldsInData: 5,
      }),
    ];

    const fixtures = configs.map(config => getFixture(config));

    const getDescription = config => {
      const { description } = config;

      return {
        string: () => description,
        function: () => description(config),
      }[typeof description]();
    };

    fixtures.forEach(({ config, input }) =>
      it(getDescription(config), () => {
        config.testFn(input(config));
      })
    );
  });
});
