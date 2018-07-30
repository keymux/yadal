const path = require("path");

const { expect } = require("chai");

const {
  createTable,
  insertData,
  selectData,
  queryPromiseCreator,
} = require("../../src/mysql");

const { alphaGen } = require("../tools/alpha_gen");
const { mysqlcPromise } = require("../tools/mysqlc");

const { getSpyLogger, printSpiedLogs } = require(path.resolve(
  "test/tools/spies/logger"
));

describe("mysql.js", () => {
  let logger;
  let mysqlc;
  let queryPromise;

  beforeEach(() => {
    logger = getSpyLogger();
    queryPromise = queryPromiseCreator({ logger, mysqlc });
  });

  before(() =>
    mysqlcPromise(process.env).then(result => {
      mysqlc = result;
    })
  );

  describe("connect()", () => {
    //
  });

  describe("database abstractions", () => {
    const exampleTable = {
      name: alphaGen(),
      columns: {
        a: {
          name: "a",
          normalize: value => parseInt(value),
          type: "INT",
          unsigned: false,
        },
        b: {
          name: "b",
          normalize: value => `"${value}"`,
          type: "VARCHAR(255)",
          unsigned: false,
        },
      },
    };

    before(() => {
      logger = require(path.resolve("test/tools/spies/logger")).getSpyLogger();
      queryPromise = queryPromiseCreator({ logger, mysqlc });
      return queryPromise(createTable(exampleTable));
    });

    it("should be able to be used to insert into a database", () => {
      const dataRows = [
        {
          a: 4,
          b: "Sam",
        },
        {
          a: 5,
          b: "Fred",
        },
      ];

      return Promise.resolve()
        .then(() =>
          insertData({
            dataRows,
            model: exampleTable,
          })
        )
        .then(queryPromise)
        .then(({ results }) => {
          return results;
        })
        .then(() => {
          return queryPromise(
            selectData(
              Object.assign(
                {
                  fields: ["a", "b"],
                },
                exampleTable
              )
            )
          );
        })
        .then(({ results }) => {
          expect(results).to.deep.equal(dataRows);
        });
    });
  });

  function printLogsIfFailed() {
    if (this.currentTest.state === "failed") {
      printSpiedLogs(logger);
    }
  }

  afterEach(printLogsIfFailed);
});
