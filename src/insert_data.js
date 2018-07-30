const { dedupMerge, twoDimensionalFlatten } = require("./utils/array/reducers");
const { toSupersetGiven } = require("./utils/array/mappers");

/*
const _toUniqueFields = (accumulator, obj) =>
  accumulator.concat(Object.keys(obj)).filter(outDuplicates);
  */

const _getUniqueFields = arrayOfObjects =>
  arrayOfObjects.map(x => Object.keys(x)).reduce(dedupMerge, []);

const _getBeginInsertLine = ({ model: { name } }) => `INSERT INTO ${name}`;

const _getFieldsInsertLine = ({ fields }) => `(${fields.join(", ")})`;

const _getDataRowInsertLine = ({ fields }) =>
  `( ${fields.map(() => "?").join(" , ")} )`;

const _getDataRowInsertLines = ({ dataRows, fields }) =>
  dataRows.map(() => _getDataRowInsertLine({ fields }));

const insertData = ({ dataRows, model, uniqueFieldsInData }) => {
  if (!dataRows || dataRows.length <= 0) {
    throw new Error("cannot insert an empty set");
  }

  const fields = _getUniqueFields(dataRows);

  return {
    query: [
      _getBeginInsertLine({ model }),
      _getFieldsInsertLine({ fields }),
      "VALUES",
      _getDataRowInsertLines({ dataRows, fields }).join(",\n"),
    ].join("\n"),
    data: dataRows
      .map(toSupersetGiven(fields))
      .reduce(twoDimensionalFlatten, []),
  };
};

module.exports = {
  insertData,
};
