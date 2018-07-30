const path = require("path");

module.exports = config => ({
  config,
  input: config => ({
    dataRows: require(path.resolve(config.dataFile))(config),
    model: require(path.resolve("test/models/automobile"))(config),
    uniqueFieldsInData: config.uniqueFieldsInData,
  }),
});
