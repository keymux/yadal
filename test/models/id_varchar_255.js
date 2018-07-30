module.exports = ({ name }) => ({
  columns: {
    id: {
      name: "id",
      type: "VARCHAR(255)",
    },
  },
  name,
});
