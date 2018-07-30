module.exports = ({ name }) => ({
  columns: {
    id: {
      autoIncrement: true,
      name: "id",
      primaryKey: true,
      type: "INT",
      unsigned: true,
    },
    someForeignKeyId: {
      name: "someForeignKeyId",
      nullable: false,
      type: "INT",
      unsigned: true,
    },
    fkeyPart1: {
      name: "fkeyPart1",
      type: "INT",
      unsigned: true,
    },
    fkeyPart2: {
      name: "fkeyPart2",
      type: "INT",
      unsigned: true,
    },
    fkey3: {
      name: "fkey3",
      type: "INT",
      unsigned: true,
    },
  },
  foreignKeys: [
    {
      foreignFields: ["id"],
      foreignTable: "crypto",
      localFields: ["someForeignKeyId"],
    },
    {
      foreignFields: ["id1", "id2"],
      foreignTable: "fkeyTable",
      localFields: ["fkeyPart1", "fkeyPart2"],
    },
    {
      foreignFields: ["id"],
      foreignTable: "crypto",
      localFields: ["fkey3"],
      name: "named_foreign_key",
    },
  ],
  name,
});
