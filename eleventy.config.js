/**
 * Eleventy Configuration
 *
 * This file configures how Eleventy builds your site.
 */

import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import { I18nPlugin } from '@11ty/eleventy';
import bundledComponents from 'eleventy-plugin-components-bundler';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Import custom Nunjucks filters
import * as filters from './lib/filters/index.js';

// Import plugins
import normalizedCollections from 'eleventy-plugin-normalized-collections';

// Get Eleventy version from package.json
const __dirname = dirname(fileURLToPath(import.meta.url));
const eleventyPkgPath = join(__dirname, 'node_modules/@11ty/eleventy/package.json');
const pkg = JSON.parse(readFileSync(eleventyPkgPath, 'utf8'));

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
export default function (eleventyConfig) {
  // Add bundled components plugin
  eleventyConfig.addPlugin(bundledComponents, {
    basePath: 'src/_includes/components/_partials',
    sectionsPath: 'src/_includes/components/sections',
    layoutsPath: 'src/_includes/layouts',
    cssDest: 'assets/main.css',
    jsDest: 'assets/main.js',
    mainCSSEntry: 'src/assets/main.css',
    mainJSEntry: 'src/assets/main.js',
    minifyOutput: process.env.NODE_ENV === 'production'
  });

  // Add syntax highlighting plugin
  eleventyConfig.addPlugin(syntaxHighlight);

  // Add i18n plugin for multilingual support
  eleventyConfig.addPlugin(I18nPlugin, {
    defaultLanguage: 'en',
    errorMode: 'allow-fallback'
  });

  // Register all custom filters
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Pass through static assets (CSS/JS bundled by components plugin)
  eleventyConfig.addPassthroughCopy({ 'src/assets/icons': 'assets/icons' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'assets/images' });

  // Watch for changes in assets
  eleventyConfig.addWatchTarget('src/assets/');

  // Add normalized collections plugin
  // - Creates normalized 'blog' collection with flattened frontmatter
  // - Creates 'mainMenu' collection from pages with navigation.navLabel
  // - Provides previous/next navigation for collection items
  // - Generates breadcrumbs from URL structure
  eleventyConfig.addPlugin(normalizedCollections, {
    collections: {
      'studio-notes': {
        glob: 'src/studio-notes/*.md',
        sortBy: 'card.date',
        sortOrder: 'desc'
      },
      'studio-notizen': {
        glob: 'src/de/studio-notizen/*.md',
        sortBy: 'card.date',
        sortOrder: 'desc'
      }
    }
  });

  // Add build time data
  eleventyConfig.addGlobalData('buildTime', () => new Date());
  eleventyConfig.addGlobalData('eleventyVersion', pkg.version);
  eleventyConfig.addGlobalData('nodeVersion', process.version);

  // Add environment data for development warnings
  eleventyConfig.addGlobalData('env', {
    NODE_ENV: process.env.NODE_ENV || 'development'
  });

  // Configure server options
  eleventyConfig.setServerOptions({
    port: 3000
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_includes/layouts',
      data: '_data'
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
}
