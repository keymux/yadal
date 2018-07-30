const { outDuplicates } = require("./filters");

/**
 * Acts as a reducer callback, errors if the accumulator or the item are not
 * arrays.
 */
const twoDimensionalFlatten = (accumulator, item) => {
  if (accumulator === undefined) accumulator = [];

  if (!Array.isArray(accumulator)) {
    throw new Error(`Invalid type ${typeof accumulator} for accumulator`);
  }

  if (!Array.isArray(item)) {
    throw new Error(`Invalid type ${typeof item} for item`);
  }

  return accumulator.concat(item);
};

/**
 * Acts as an Array.reduce callback to merge a collection of arrays
 * and deduplicate the contained values (retaining the left most duplicate).
 *
 * TODO: Generalize into a Reducers library
 *
 * @param {array} accumulator - An accumulator (see Array.reduce)
 * @param {array} array - An array from the collection of arrays
 */
const dedupMerge = (acc, array) => acc.concat(array).filter(outDuplicates);

module.exports = {
  dedupMerge,
  twoDimensionalFlatten,
};
