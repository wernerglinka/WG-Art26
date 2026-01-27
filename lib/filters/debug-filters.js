/**
 * Debug and JSON formatting filters
 */

/**
 * Converts a JavaScript object to a JSON string
 * @param {Object} obj - The object to stringify
 * @returns {string} The JSON string representation of the object
 */
export const objToString = (obj) => {
  return JSON.stringify(obj);
};

/**
 * Creates a formatted JSON string representation of an object, handling circular references
 * @param {Object} obj - The object to stringify
 * @returns {string} The formatted JSON string with 4-space indentation
 */
export const myDump = (obj) => {
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  return JSON.stringify(obj, getCircularReplacer(), 4);
};

/**
 * Safe version of dump that handles circular references
 * @param {Object} obj - The object to stringify
 * @returns {string} The formatted JSON string with 4-space indentation
 */
export const safeDump = (obj) => {
  try {
    const seen = [];
    return JSON.stringify(obj, (key, val) => {
      if (val !== null && typeof val === 'object') {
        if (seen.indexOf(val) >= 0) {
          return '[Circular Reference]';
        }
        seen.push(val);
      }
      return val;
    }, 4);
  } catch (error) {
    return `[Error: ${error.message}]`;
  }
};

/**
 * Debug collections by extracting only essential metadata
 * @param {Object} collections - The collections object
 * @returns {string} A JSON string of just the essential collection metadata
 */
export const debugCollections = (collections) => {
  try {
    const safeCollections = {};

    Object.keys(collections).forEach(name => {
      if (Array.isArray(collections[name])) {
        safeCollections[name] = collections[name].map(item => ({
          title: item.data?.card?.title || item.data?.title || 'No title',
          url: item.url,
          date: item.data?.card?.date
        }));
      } else {
        safeCollections[name] = `[${typeof collections[name]}]`;
      }
    });

    return JSON.stringify(safeCollections, null, 2);
  } catch (error) {
    return `[Error extracting collections: ${error.message}]`;
  }
};
