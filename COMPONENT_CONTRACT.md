# Component Contract

This document defines the data interface that components in the nunjucks-components library expect. Following this contract ensures components work correctly across different static site generators (Eleventy, Metalsmith, etc.).

## Context Object

Section components are rendered via the `renderSection` macro, which provides a `context` object containing:

| Property | Type | Description |
|----------|------|-------------|
| `data` | Object | Global data from the `_data/data/` folder (e.g., `data.artMuseums`, `data.author`) |
| `collections` | Object | All collections keyed by name (e.g., `collections.blog`, `collections.mainMenu`) |
| `mainMenu` | Array | Navigation menu items with `{ title, path }` shape |
| `urlPath` | String | Current page URL path |
| `collection` | Object | Collection navigation data for the current page |

## Site Configuration

Components expect certain global site configuration in `site.json`:

```json
{
  "title": "Site Title",
  "description": "Site description",
  "url": "https://example.com",
  "branding": {
    "logo": {
      "src": "/assets/images/logo.png",
      "alt": "Site Logo"
    },
    "link": "/"
  }
}
```

The header component specifically requires `site.branding` to be configured.

## Section Data Shape

Each section in page frontmatter must include:

| Property | Required | Description |
|----------|----------|-------------|
| `sectionType` | Yes | Maps to component folder name (e.g., `hero` loads `components/sections/hero/hero.njk`) |
| `containerTag` | No | HTML wrapper element (`section`, `article`, `aside`, `div`) |
| `id` | No | HTML id attribute for the section |
| `classes` | No | Additional CSS classes |
| `isDisabled` | No | If `true`, section is not rendered |
| `containerFields` | No | Layout and styling options |

### containerFields Shape

```yaml
containerFields:
  inContainer: true          # Wrap content in .container
  isAnimated: false          # Enable animations
  noMargin:
    top: false
    bottom: false
  noPadding:
    top: false
    bottom: false
  background:
    color: ''
    image: '/path/to/image.jpg'
    imageScreen: 'none'      # 'light', 'dark', or 'none'
    isDark: false            # True for dark backgrounds (affects text color)
```

## Collection Item Shape

The `normalized-collections` plugin flattens Eleventy's collection items so frontmatter properties are at the top level:

```javascript
// Original Eleventy item
{
  data: { card: { title: 'Post Title' }, ... },
  url: '/blog/my-post/',
  inputPath: './src/blog/my-post.md',
  fileSlug: 'my-post'
}

// Normalized item (what components receive)
{
  card: { title: 'Post Title' },   // Frontmatter at top level
  permalink: 'blog/my-post',        // URL without leading/trailing slashes
  url: '/blog/my-post/',            // Full URL with slashes
  inputPath: './src/blog/my-post.md',
  fileSlug: 'my-post'
}
```

## Navigation: Previous/Next

For collection items (like blog posts), navigation to adjacent items is available via:

```nunjucks
{% set previousPost = collection['blog'].previous[0] %}
{% set nextPost = collection['blog'].next[0] %}
```

Naming convention:
- `previous`: The post published before this one (earlier date)
- `next`: The post published after this one (later date)

Both are arrays (may be empty if at the start/end of the collection).

## Main Menu

Pages with navigation configuration in frontmatter are included in `collections.mainMenu`:

```yaml
# Page frontmatter
navigation:
  navLabel: 'About'    # Display text in menu
  navIndex: 2          # Sort order (lower = earlier)
```

Menu items have the shape `{ title: string, path: string }`.

## Breadcrumbs

Breadcrumbs are automatically generated and available at `navigation.breadcrumbs`:

```javascript
[
  { title: 'Home', path: '/' },
  { title: 'Blog', path: '/blog/' },
  { title: 'My Post', path: '/blog/my-post/' }
]
```

Titles are derived from `mainMenu` when available, otherwise from URL segments.

## Adding New Components

1. Create folder: `components/sections/{name}/`
2. Add `{name}.njk` template
3. Optional: `{name}.css` for styles
4. Optional: `{name}.js` for JavaScript

Components have access to:
- `section` - The section's frontmatter data
- `crumbs` - Breadcrumbs array
- All context properties extracted in `render-section.njk`

## Development Warnings

In development mode (`NODE_ENV !== 'production'`), a warning is displayed when a section references a non-existent component. This helps catch typos in `sectionType` values.
