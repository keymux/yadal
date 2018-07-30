module.exports = ({ name }) => ({
  columns: {
    Make_ID: {
      autoIncrement: true,
      name: "Make_ID",
      primaryKey: true,
      type: "INT",
      unsigned: true,
    },
    Make_Name: {
      name: "Make_Name",
      nullable: false,
      type: "VARCHAR(255)",
    },
    Model_ID: {
      name: "Model_ID",
      type: "INT",
      unsigned: true,
    },
    Model_Name: {
      name: "Model_Name",
      nullable: false,
      type: "VARCHAR(255)",
    },
    Description: {
      name: "Description",
      type: "VARCHAR(255)",
    },
  },
  name,
});
