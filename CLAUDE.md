# Claude Code Instructions

## Project Overview

This is an Eleventy 3.x structured content starter, ported from the Metalsmith 2025 Structured Content Starter. It uses a component-based architecture where pages are composed entirely from frontmatter-defined sections.

## Key Architecture

### Content Pattern

Pages use frontmatter-only content. The `sections` array in frontmatter defines page structure:

```yaml
---
layout: layouts/sections.njk
sections:
  - component: hero
    container: article
    data:
      title: "Welcome"
      prose: "Some intro text"
  - component: text-only
    container: section
    data:
      text: "More content here"
---
```

No markdown body content is used. All content lives in structured frontmatter.

### Plugin Architecture

The `eleventy-plugin-normalized-collections` plugin bridges Eleventy's data structures to the component library's expected format:

- Flattens frontmatter (components expect `item.card.title`, not `item.data.card.title`)
- Provides `collections.mainMenu` from pages with `navigation.navLabel`
- Provides `navigation.breadcrumbs` via computed data
- Adds previous/next navigation for collection items

### Directory Structure

```
lib/
  filters/          # Nunjucks filters
src/
  _data/            # Global data files (site.json, etc.)
  _includes/
    components/     # Nunjucks component templates
      _helpers/     # Rendering helpers
      _partials/    # Reusable partial components
      sections/     # Page section components
    icons/          # SVG icon templates
    layouts/        # Page layouts
  assets/           # Static files (CSS, images, icons)
  blog/             # Blog post markdown files
```

## Code Style

- JavaScript (no TypeScript)
- Functional programming patterns
- JSDoc type annotations
- ES modules (`"type": "module"` in package.json)
- Nunjucks for templating

## Important Files

- `eleventy.config.js` - Main Eleventy configuration (uses `eleventy-plugin-normalized-collections` from npm)
- `lib/filters/index.js` - Filter exports
- `src/_includes/components/_helpers/sections-renderer.njk` - Section rendering logic
- `src/_includes/components/_helpers/render-section.njk` - Individual section renderer

## Component Contract

Components expect:

1. **Collection items** have frontmatter at top level (not nested under `.data`)
2. **Collection items** include a `permalink` property for URL references
3. **Navigation** available as `navigation.breadcrumbs` and `collections.mainMenu`
4. **Section data** passed via context object in sections-renderer

## Common Tasks

### Adding a New Page

Create a markdown file in `src/` with the sections layout and define sections in frontmatter.

### Adding a New Component

1. Create component folder in `src/_includes/components/sections/`
2. Add the component's Nunjucks template
3. Add CSS in the component folder (bundled automatically)
4. Register in `render-section.njk` if needed

### Adding a New Collection

Add to the plugin configuration in `eleventy.config.js`:

```javascript
eleventyConfig.addPlugin(normalizedCollections, {
  collections: {
    'new-collection': {
      glob: 'src/new-collection/*.md',
      sortBy: 'card.date',
      sortOrder: 'desc'
    }
  }
});
```

### Adding a Filter

1. Create or edit filter file in `lib/filters/`
2. Export from `lib/filters/index.js`
3. Filters are auto-registered via eleventy.config.js

## Testing

Run the development server to test changes:

```bash
npm start
```

Build for production:

```bash
npm run build
```

## Documentation

See `porting-notes/` for details on how Metalsmith patterns were adapted for Eleventy:

- `navigation.md` - Menu and breadcrumbs implementation
- `collections.md` - Blog collections and previous/next navigation
