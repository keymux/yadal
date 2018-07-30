const _getBeginCreateTableLine = ({ name }) => `CREATE TABLE ${name} (`;

const _getEndCreateTableLine = ({ comment }) =>
  comment ? `) COMMENT='${comment}';` : ");";

const objectValues = obj => Object.keys(obj).map(x => obj[x]);

const _getCreateColumnLine = ({
  autoIncrement,
  defaultValue,
  name,
  nullable,
  primaryKey,
  type,
  unsigned,
}) =>
  `${name} ${type}${unsigned === true ? " UNSIGNED" : ""}${
    autoIncrement === true ? " AUTO_INCREMENT" : ""
  }${primaryKey === true ? " PRIMARY KEY" : ""}${
    nullable === false ? " NOT NULL" : ""
  }${defaultValue !== undefined ? " DEFAULT " + defaultValue : ""}`;

const _getCreateColumnLines = ({ columns }) =>
  objectValues(columns).map(_getCreateColumnLine);

const _primaryKeyFnMap = {
  string: x => `PRIMARY KEY (${x})`,
  array: x => `PRIMARY KEY (${x.join(", ")})`,
  undefined: () => "",
};

const typeCheck = x => (Array.isArray(x) ? "array" : typeof x);

const _getPrimaryKeyLine = ({ primaryKey }) => {
  const t = typeCheck(primaryKey);
  const fn = _primaryKeyFnMap[t];

  if (fn === undefined) {
    throw new Error(`Unsupported type \`${t}\` for primary key`);
  }

  return fn(primaryKey);
};

const blankStrings = x => x !== "";

const _getForeignKeyLine = ({
  foreignFields,
  foreignTable,
  localFields,
  name,
}) =>
  `FOREIGN KEY ${name ? name + " " : ""}(${localFields.join(
    ", "
  )}) REFERENCES ${foreignTable} (${foreignFields.join(", ")})`;

const _getForeignKeyLines = ({ foreignKeys }) =>
  foreignKeys ? foreignKeys.map(_getForeignKeyLine) : [];

const _getInnerCreateTableLines = ({ columns, foreignKeys, primaryKey }) =>
  "  " +
  [
    `${_getCreateColumnLines({ columns }).join(",\n  ")}`,
    `${_getForeignKeyLines({ foreignKeys }).join(",\n  ")}`,
    `${_getPrimaryKeyLine({ primaryKey })}`,
  ]
    .filter(blankStrings)
    .join(",\n  ");

const createTable = ({ comment, columns, foreignKeys, name, primaryKey }) => ({
  query: [
    _getBeginCreateTableLine({ name }),
    _getInnerCreateTableLines({ columns, foreignKeys, primaryKey }),
    _getEndCreateTableLine({ comment }),
  ].join("\n"),
});

module.exports = {
  createTable,
};
