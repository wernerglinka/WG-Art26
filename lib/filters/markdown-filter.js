import { marked } from 'marked';

/**
 * Converts markdown string to HTML
 * @param {string} mdString - The markdown string to convert
 * @returns {string} The HTML output
 */
export const mdToHTML = (mdString) => {
  if (!mdString) {
    return '';
  }
  try {
    return marked.parse(mdString, {
      mangle: false,
      headerIds: false
    });
  } catch (e) {
    console.error('Error parsing markdown:', e);
    return mdString;
  }
};
