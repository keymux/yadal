/**
 * Acts as an Array.filter callback to de-duplicate an array (dedup left)
 *
 * TODO: Generalize into a Filters library
 *
 * @param {varies} element - The array element
 * @param {number} index - The array index
 * @param {array} array - The source array
 *
 * @return {boolean} - Returns whether or not the given element is present elsewhere in the array
 */
const outDuplicates = (element, index, array) => {
  return !array.slice(0, index).includes(element);
};

const outUndefined = element => element !== undefined;

module.exports = {
  outDuplicates,
  outUndefined,
};
