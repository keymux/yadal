module.exports = ({ comment, name }) => ({
  comment,
  columns: {
    id: {
      name: "id",
      type: "INT",
    },
  },
  name,
});
