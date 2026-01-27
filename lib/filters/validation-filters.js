/**
 * Validation and check filters
 */

import { existsSync } from 'fs';

/**
 * Checks if a URL is external (starts with http://, https://, or //)
 * @param {string} url - The URL to check
 * @returns {boolean} True if the URL is external, false otherwise
 */
export const isExternal = (url) => {
  if (!url || typeof url !== 'string') {
    return false;
  }
  return url.startsWith('https://') || url.startsWith('http://') || url.startsWith('//');
};

/**
 * Checks if a value is a string
 * @param {any} value - The value to check
 * @returns {boolean} True if the value is a string, false otherwise
 */
export const isString = (value) => {
  return typeof value === 'string';
};

/**
 * Checks if an image object has a valid src property
 * @param {Object} imageObj - The image object to check
 * @returns {boolean} True if the image has a valid src, false otherwise
 */
export const hasImage = (imageObj) => {
  return imageObj && imageObj.src && imageObj.src.trim() !== '';
};

/**
 * Checks if there are any valid CTAs in the CTAs array
 * @param {Array} ctasArray - The array of CTA objects to check
 * @returns {boolean} True if there is at least one valid CTA, false otherwise
 */
export const hasCtas = (ctasArray) => {
  if (!Array.isArray(ctasArray) || ctasArray.length === 0) {
    return false;
  }

  return ctasArray.some(cta =>
    cta &&
    cta.url &&
    cta.url.trim() !== '' &&
    cta.label &&
    cta.label.trim() !== ''
  );
};

/**
 * Checks if a text object has any meaningful content
 * @param {Object} textObj - The text object to check
 * @returns {boolean} True if the text has meaningful content, false otherwise
 */
export const hasText = (textObj) => {
  if (!textObj || typeof textObj !== 'object') {
    return false;
  }

  const { leadIn, title, subTitle, prose } = textObj;

  return (
    (leadIn && leadIn.trim() !== '') ||
    (title && title.trim() !== '') ||
    (subTitle && subTitle.trim() !== '') ||
    (prose && prose.trim() !== '')
  );
};

/**
 * Checks if an author value exists and has meaningful content
 * @param {string|Array} author - The author value to check
 * @returns {boolean} True if there is at least one non-empty author, false otherwise
 */
export const hasAuthor = (author) => {
  if (!author) {
    return false;
  }

  if (Array.isArray(author)) {
    return author.length > 0 && author.some(a => a && a.trim && a.trim() !== '');
  }

  if (typeof author === 'string') {
    return author.trim() !== '';
  }

  return false;
};

/**
 * Checks if a URL value exists and has meaningful content
 * @param {string} url - The URL value to check
 * @returns {boolean} True if the URL exists and is not empty, false otherwise
 */
export const hasUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  return url.trim() !== '';
};

/**
 * Checks if an array or object has items/properties
 * @param {Array|Object} items - The array or object to check
 * @returns {boolean} True if there are items/properties, false otherwise
 */
export const hasItems = (items) => {
  if (!items) {
    return false;
  }

  if (Array.isArray(items)) {
    return items.length > 0;
  }

  if (typeof items === 'object') {
    return Object.keys(items).length > 0;
  }

  return false;
};

/**
 * Checks if an object has an icon property with meaningful content
 * @param {Object} obj - The object to check for an icon property
 * @returns {boolean} True if the object has a non-empty icon property, false otherwise
 */
export const hasIcon = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  return obj.icon && typeof obj.icon === 'string' && obj.icon.trim() !== '';
};

/**
 * Checks if a section component exists on the filesystem
 * @param {string} sectionType - The section type name (maps to component folder)
 * @returns {boolean} True if the component file exists, false otherwise
 */
export const componentExists = (sectionType) => {
  if (!sectionType || typeof sectionType !== 'string') {
    return false;
  }

  const componentPath = `src/_includes/components/sections/${sectionType}/${sectionType}.njk`;
  return existsSync(componentPath);
};
