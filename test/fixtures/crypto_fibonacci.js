const { alphaGen } = require("../tools/alpha_gen");

// Generate a new set every time (so multiple tests can use this without
// stepping on each other
module.exports = () => {
  const tables = [
    `cryptos_${alphaGen()}`,
    `fib_${alphaGen()}`,
    `fibsol_${alphaGen()}`,
    `fib_cry_${alphaGen()}`,
  ];

  const comments = [
    "Cryptos",
    "Fibonacci",
    "Fibonacci Solutions",
    "Crypto and fibonacci because why not",
  ];

  return {
    description: comments[3],
    tables: [
      {
        columns: {
          id: {
            name: "id",
            type: "INT",
          },
        },
        comment: comments[0],
        expectedCreateStatement: [
          `CREATE TABLE ${tables[0]} (`,
          "  id INT,",
          "  PRIMARY KEY (id)",
          ") COMMENT='" + comments[0] + "';",
        ].join("\n"),
        name: tables[0],
        primaryKey: ["id"],
      },
      {
        columns: {
          id1: {
            name: "id1",
            type: "INT",
          },
          id2: {
            name: "id2",
            type: "INT",
          },
        },
        comment: comments[1],
        expectedCreateStatement: [
          `CREATE TABLE ${tables[1]} (`,
          "  id1 INT,",
          "  id2 INT,",
          "  PRIMARY KEY (id1, id2)",
          ") COMMENT='" + comments[1] + "';",
        ].join("\n"),
        name: tables[1],
        primaryKey: ["id1", "id2"],
      },
      {
        columns: {
          pkey1: {
            name: "pkey1",
            type: "INT",
          },
          pkey2: {
            name: "pkey2",
            type: "INT",
          },
          sol: {
            name: "sol",
            type: "INT",
          },
        },
        comment: comments[2],
        expectedCreateStatement: [
          `CREATE TABLE ${tables[2]} (`,
          "  pkey1 INT,",
          "  pkey2 INT,",
          "  sol INT,",
          `  FOREIGN KEY (pkey1, pkey2) REFERENCES ${tables[1]} (id1, id2)`,
          ") COMMENT='" + comments[2] + "';",
        ].join("\n"),
        foreignKeys: [
          {
            foreignFields: ["id1", "id2"],
            foreignTable: tables[1],
            localFields: ["pkey1", "pkey2"],
          },
        ],
        name: tables[2],
      },
      {
        columns: {
          id: {
            name: "id",
            type: "INT",
          },
          pkey1: {
            name: "pkey1",
            type: "INT",
          },
          pkey2: {
            name: "pkey2",
            type: "INT",
          },
          cryptoId: {
            name: "cryptoId",
            type: "INT",
          },
        },
        comment: comments[3],
        expectedCreateStatement: [
          `CREATE TABLE ${tables[3]} (`,
          "  id INT,",
          "  pkey1 INT,",
          "  pkey2 INT,",
          "  cryptoId INT,",
          `  FOREIGN KEY (pkey1, pkey2) REFERENCES ${tables[1]} (id1, id2),`,
          `  FOREIGN KEY (cryptoId) REFERENCES ${tables[0]} (id),`,
          "  PRIMARY KEY (id)",
          ") COMMENT='" + comments[3] + "';",
        ].join("\n"),
        foreignKeys: [
          {
            foreignFields: ["id1", "id2"],
            foreignTable: tables[1],
            localFields: ["pkey1", "pkey2"],
          },
          {
            foreignFields: ["id"],
            foreignTable: tables[0],
            localFields: ["cryptoId"],
          },
        ],
        primaryKey: ["id"],
        name: tables[3],
      },
    ],
  };
};
