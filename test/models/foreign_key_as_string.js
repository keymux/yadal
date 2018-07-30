module.exports = ({ name }) => ({
  columns: {
    id: {
      name: "id",
      type: "INT",
    },
  },
  name,
  primaryKey: "id",
});
