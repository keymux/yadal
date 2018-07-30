module.exports = ({ name }) => ({
  columns: {
    id: {
      autoIncrement: true,
      name: "id",
      primaryKey: true,
      type: "BIGINT",
      unsigned: true,
    },
    name: {
      defaultValue: "Fred",
      name: "name",
      nullable: false,
      type: "VARCHAR(255)",
    },
  },
  name,
});
