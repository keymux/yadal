const selectData = ({ fields, name }) => ({
  query: ["SELECT", `  ${fields.join(", ")}`, `FROM ${name}`].join("\n"),
});

module.exports = {
  selectData,
};
