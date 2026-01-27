/**
 * Array manipulation filters
 */

/**
 * Filters a list based on selected titles
 * @param {Array} list - The full list of items with title property
 * @param {Array} selections - The selected item titles
 * @returns {Array} The filtered list containing only selected items
 */
export const getSelections = (list, selections) => {
  const filteredList = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < selections.length; j++) {
      if (list[i].title.toLowerCase() === selections[j].toLowerCase()) {
        filteredList.push(list[i]);
      }
    }
  }
  return filteredList;
};

/**
 * Converts a space-separated string into a unique sorted array of words
 * @param {string} string - The input string to convert
 * @returns {Array} A unique sorted array of words
 */
export const toArray = (string) => {
  return [...new Set(string.trim().split(' '))].sort();
};

/**
 * Gets the length of an array
 * @param {Array} array - The array to check
 * @returns {number} The length of the array
 */
export const getArrayLength = (array) => {
  return array.length;
};

/**
 * Checks if a value is an array
 * @param {any} value - The value to check
 * @returns {boolean} True if the value is an array, false otherwise
 */
export const isArray = (value) => {
  return Array.isArray(value);
};

/**
 * Checks if a post is related to a selection of items
 * @param {Object} post - The post to check
 * @param {Array} selections - The array of selected items
 * @returns {boolean} True if the post is related to any of the selections
 */
export const isRelated = (post, selections) => {
  const simpleArray = selections.map((obj) => obj.item);
  if (simpleArray.includes(post.item)) {
    return true;
  }
  return false;
};
