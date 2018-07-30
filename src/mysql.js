const { createTable } = require("./create_table");
const { insertData } = require("./insert_data");
const { selectData } = require("./select_data");

const queryCallbackCreator = ({ logger, reject, resolve }) => (
  error,
  results
) => {
  if (error) {
    logger.error(error);

    return reject(error);
  }

  return resolve({ results });
};

const queryPromiseCreator = ({ logger, mysqlc }) => ({ data, query }) =>
  new Promise((resolve, reject) => {
    logger.debug(query);

    return mysqlc.query(
      query,
      data,
      queryCallbackCreator({ logger, reject, resolve })
    );
  });

module.exports = {
  createTable,
  insertData,
  queryPromiseCreator,
  selectData,
};
