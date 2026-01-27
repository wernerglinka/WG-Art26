/**
 * Object manipulation filters
 */

/**
 * Normalizes icon input to always return a valid icon object
 * @param {string|Object} input - The icon input (string name or object)
 * @returns {Object} A valid icon object with icon, url, and title properties
 */
export const normalizeIcon = (input) => {
  if (typeof input === 'string') {
    return {
      icon: input,
      url: null,
      title: null
    };
  }

  if (input && typeof input === 'object' && input.icon) {
    return {
      icon: input.icon,
      url: input.url || null,
      title: input.title || null
    };
  }

  return {
    icon: null,
    url: null,
    title: null
  };
};

/**
 * Merges properties into each object in an array
 * @param {Array} items - The array of objects to transform
 * @param {Object} propsToMerge - Object containing properties to merge into each item
 * @returns {Array} The transformed array with merged properties
 */
export const mergeProps = (items, propsToMerge) => {
  if (!Array.isArray(items) || !propsToMerge || typeof propsToMerge !== 'object') {
    return items;
  }

  return items.map(item => ({
    ...item,
    ...propsToMerge
  }));
};

/**
 * Merges properties into a single object
 * @param {Object} obj - The object to merge properties into
 * @param {Object} propsToMerge - Object containing properties to merge
 * @returns {Object} The object with merged properties
 */
export const merge = (obj, propsToMerge) => {
  if (!obj || typeof obj !== 'object' || !propsToMerge || typeof propsToMerge !== 'object') {
    return obj;
  }

  return {
    ...obj,
    ...propsToMerge
  };
};

/**
 * Gets the download URL for a component package
 * @param {Object} componentPackages - The componentPackages metadata object
 * @param {string} componentName - Name of the component
 * @returns {string|null} The download URL or null if not found
 */
export const getDownloadUrl = (componentPackages, componentName) => {
  if (!componentPackages || !componentName) {
    return null;
  }

  if (componentPackages.sections) {
    const section = componentPackages.sections.find(pkg => pkg.name === componentName);
    if (section) {
      return section.downloadUrl;
    }
  }

  if (componentPackages.partials) {
    const partial = componentPackages.partials.find(pkg => pkg.name === componentName);
    if (partial) {
      return partial.downloadUrl;
    }
  }

  return null;
};
