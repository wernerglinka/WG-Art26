# Eleventy Structured Content Starter

A component-based, structured content starter for Eleventy 3.x. Build pages by composing reusable sections defined in frontmatter rather than writing markdown body content.

> **New Release** — This starter is freshly published. If you encounter issues or have suggestions, please [open an issue](https://github.com/wernerglinka/eleventy-structured-content-starter/issues). This project uses components from the [Nunjucks component library](https://github.com/wernerglinka/nunjucks-components).

## Features

- **Component-based architecture** - Pages are composed from reusable section components
- **Structured content** - All content defined in frontmatter, enabling CMS integration
- **Normalized collections** - Blog posts with automatic prev/next navigation
- **Main menu** - Auto-generated from pages with `navigation.navLabel`
- **Breadcrumbs** - Automatic breadcrumb generation from URL structure
- **CSS bundling** - Component styles automatically bundled via plugin
- **Icon library** - 290+ SVG icons as Nunjucks templates

See the [demo](https://eleventy-structured-content-starter.netlify.app/)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/wernerglinka/eleventy-structured-content-starter.git
cd eleventy-structured-content-starter

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:3000` to see the site.

## Commands

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm start`     | Start development server with hot reload |
| `npm run build` | Production build to `_site/`             |
| `npm run dev`   | Run Eleventy without server              |
| `npm run clean` | Remove `_site/` directory                |
| `npm run debug` | Run with Eleventy debug output           |

## Project Structure

```
eleventy-structured-content-starter/
├── eleventy.config.js      # Eleventy configuration
├── lib/
│   └── filters/            # Nunjucks filters
├── src/
│   ├── _data/              # Global data files
│   ├── _includes/
│   │   ├── components/     # Section and partial components
│   │   ├── icons/          # SVG icon templates
│   │   └── layouts/        # Page layouts
│   ├── assets/             # Static assets (CSS, images)
│   ├── blog/               # Blog posts
│   └── *.md                # Page content files
└── porting-notes/          # Implementation documentation
```

## Creating Pages

Pages use the sections layout and define content as an array of sections:

```yaml
---
layout: layouts/sections.njk
bodyClasses: 'home'

navigation:
  navLabel: 'Home'
  navIndex: 1

sections:
  - component: hero
    container: article
    data:
      title: 'Welcome to the Site'
      prose: 'A brief introduction to what we do.'
      ctas:
        - url: '/about/'
          label: 'Learn More'

  - component: text-only
    container: section
    data:
      text: |
        ## Our Story

        More content here using markdown...
---
```

### Section Structure

Each section has three parts:

- **component** - The component template to render (maps to `src/_includes/components/sections/`)
- **container** - HTML element wrapping the section (`article`, `section`, `div`, etc.)
- **data** - Content and configuration passed to the component

## Available Components

### Sections

| Component          | Description                       |
| ------------------ | --------------------------------- |
| `banner`           | Full-width banner with background |
| `collection-links` | Previous/next item links          |
| `collection-list`  | Paginated collection listing      |
| `composed`         | Flexible multi-column layout      |
| `featured-posts`   | Highlighted blog posts            |
| `flip-cards`       | Interactive flip card grid        |
| `footer`           | Site footer                       |
| `header`           | Site header with navigation       |
| `hero`             | Hero section with title and CTA   |
| `logos-list`       | Logo showcase                     |
| `media-image`      | Image with optional caption       |
| `slider`           | Image/content carousel            |
| `testimonial`      | Quote/testimonial display         |
| `text-only`        | Markdown text content             |

### Partials

Reusable components used within sections: `button`, `card`, `ctas`, `icon`, `image`, `navigation`, `text`, etc.

## Navigation

### Main Menu

Pages appear in the main menu when they have `navigation.navLabel` in frontmatter:

```yaml
navigation:
  navLabel: 'About Us'
  navIndex: 2
```

The menu is sorted by `navIndex`.

### Breadcrumbs

Breadcrumbs are generated automatically from the page URL. Titles come from the main menu when available, otherwise derived from the URL segment.

## Blog Posts

Blog posts live in `src/blog/` and use card frontmatter for listing display:

```yaml
---
layout: layouts/sections.njk

card:
  title: 'My Blog Post'
  excerpt: 'A brief summary of the post.'
  date: 2024-01-15
  author: 'Jane Doe'
  image:
    src: '/assets/images/post-thumbnail.jpg'
    alt: 'Post thumbnail'

sections:
  - component: text-only
    container: article
    data:
      text: |
        The full blog post content...

  - component: collection-links
    container: nav
    data:
      collectionName: blog
---
```

Previous and next navigation is automatically provided for collection items.

## Adding Collections

Configure additional collections in `eleventy.config.js`:

```javascript
eleventyConfig.addPlugin(normalizedCollections, {
  collections: {
    blog: {
      glob: 'src/blog/*.md',
      sortBy: 'card.date',
      sortOrder: 'desc',
    },
    'studio-notes': {
      glob: 'src/studio-notes/*.md',
      sortBy: 'card.date',
      sortOrder: 'desc',
    },
  },
});
```

## Customization

### Adding Filters

Create filter files in `lib/filters/` and export from `lib/filters/index.js`. Filters are automatically registered.

### Adding Icons

Add SVG icon templates to `src/_includes/icons/`. Use in templates:

```nunjucks
{% include "icons/arrow-right.njk" %}
```

### Styling

Component styles live alongside their templates. The components bundler plugin automatically combines CSS files. Global styles are in `src/assets/styles/`.

## Requirements

- Node.js 18.0.0 or higher

## License

MIT

## Credits

Ported from the [Metalsmith Structured Content Starter](https://github.com/wernerglinka/metalsmith-structured-content-starter).
