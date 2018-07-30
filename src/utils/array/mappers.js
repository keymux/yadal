/**
 * Given a set of fields, returns a function which serves as an Array.map callback.
 *
 * The function will map the array item (which must be an object) to an array containing
 * the ordered fields given by the `fields` input and then return the .
 *
 * Example:
 *    Given fields and items with these values:
 *    fields:   ["c",   "x",  "b",  "g",  "d",  "a"]
 *    items[0]: { c: 1, g: 2, b: 3 }
 *    items[1]: { x: 1, d: 3, a: 9 }
 *
 * And usage:
 *    items.map(toSupersetGiven(fields))
 *
 * The function would return:
 *              [
 *                1,     null, 3,    2,    null, null,
 *                null,  1,    null, null, 3,    9
 *              ]
 */
const toSupersetGiven = fields => item =>
  fields.map(field => item[field] || null);

module.exports = {
  toSupersetGiven,
};
