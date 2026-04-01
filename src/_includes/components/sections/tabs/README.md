# Tabs Section Component

A tabbed interface that dynamically generates tabs from a data source directory. Each key in the data object becomes a tab, with its array rendered as an image grid panel. Adding a new JSON file to the data directory automatically creates a new tab — no frontmatter changes needed.

## Features

- **Dynamic Tab Generation**: Tabs are created from the keys of a data directory object
- **Auto-Sorted Tabs**: Numeric keys (years) appear first in descending order, non-numeric keys (e.g., "legacy") last
- **Translatable Labels**: Override any tab label via a `labels` map in frontmatter
- **Accessible Tab Pattern**: Full ARIA `tablist`/`tab`/`tabpanel` roles
- **Keyboard Navigation**: Arrow keys, Home, and End move between tabs
- **Lazy Grid Init**: Triggers image-grid reinitialization when a hidden panel becomes visible
- **SWUP Support**: Registers with PageTransitions for page transition cleanup
- **Configurable Default Tab**: Set which tab is active on page load via frontmatter

## Data Structure

### Data Directory

The data source is a directory of JSON files under `src/_data/data/`. Each file becomes a tab:

```
src/_data/data/works/
  2026.json     → tab "2026"
  legacy.json   → tab "legacy"
```

Each JSON file contains an array of image grid items:

```json
[
  {
    "image": "/assets/images/artworks/2026/2026.03.001.jpg",
    "title": "Object 2026.03.001",
    "details": "Wall sculpture, paper mâché clay on cardboard",
    "date": "2026",
    "link": "/works/2026.03.001"
  }
]
```

### Frontmatter

```yaml
- sectionType: tabs
  containerTag: section
  classes: ''
  id: ''
  isDisabled: false
  isAnimated: true
  containerFields:
    inContainer: true
    noMargin:
      top: true
      bottom: true
    noPadding:
      top: false
      bottom: false
    background:
      color: ''
      image: ''
      imageScreen: 'none'
  text:
    title: 'Works'
    titleTag: 'h1'
  dataSource: 'works'
  defaultTab: '2026'
  labels:
    legacy: 'Legacy'
  settings:
    gap: '50'
    targetRowHeight: '300'
```

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `dataSource` | string | Name of the data directory (e.g., `'works'` reads from `data.works`) |
| `defaultTab` | string | Key of the tab active on page load (defaults to first sorted key) |
| `labels` | object | Optional label overrides — keys not listed use their key as the label |
| `settings.gap` | string | Pixel gap between grid images |
| `settings.targetRowHeight` | string | Target row height for the justified grid layout |

## HTML Structure

```html
<div class="container content">
  <div class="text flow">
    <h1>Works</h1>
  </div>

  <div class="tabs-component" data-default-tab="2026">
    <!-- Tab buttons — generated from data directory keys -->
    <div class="tabs-nav" role="tablist" aria-label="Works">
      <button class="tabs-button" role="tab" id="tab-2026"
              aria-controls="panel-2026" aria-selected="true" tabindex="0">
        2026
      </button>
      <button class="tabs-button" role="tab" id="tab-legacy"
              aria-controls="panel-legacy" aria-selected="false" tabindex="-1">
        Legacy
      </button>
    </div>

    <!-- Tab panels — each contains an image grid -->
    <div class="tabs-panel" role="tabpanel" id="panel-2026" aria-labelledby="tab-2026">
      <div class="image-grid js-image-grid" data-gap="50" data-target-row-height="300">
        <!-- image grid items -->
      </div>
    </div>
    <div class="tabs-panel" role="tabpanel" id="panel-legacy" aria-labelledby="tab-legacy" hidden>
      <div class="image-grid js-image-grid" data-gap="50" data-target-row-height="300">
        <!-- image grid items -->
      </div>
    </div>
  </div>
</div>
```

## CSS Architecture

### Content Override

The parent `.content` container defaults to `display: flex`, which would place the title and tabs side by side. The tabs component overrides this:

```css
section:has(.tabs-component) .content {
  display: block;
}
```

### Tab Navigation

Tab buttons use an underline indicator for the active state. Styling relies on CSS custom properties from the site's design tokens:

- `--font-heading`, `--font-h5` for typography
- `--color-text-inactive` for inactive tabs
- `--color-primary` for the active underline
- `--transition-base` for hover/focus transitions

### Panel Visibility

Inactive panels use the `hidden` attribute (`display: none`). This means image grids in hidden panels are not laid out until the panel is revealed.

## JavaScript Behavior

### Tab Switching

Clicking a tab or pressing arrow keys:

1. Deactivates all tabs (sets `aria-selected="false"`, `tabindex="-1"`)
2. Hides all panels (sets `hidden` attribute)
3. Activates the selected tab and reveals its panel
4. Moves focus to the activated tab

### Grid Reinitialization

Image grids hidden at page load have zero width, so their justified layout can't be calculated. When a panel becomes visible for the first time, tabs.js removes the grid's `data-initialized` flag and calls `window.initImageGrids()` to trigger a fresh layout pass.

### Keyboard Navigation

| Key | Action |
|-----|--------|
| ArrowRight | Next tab |
| ArrowLeft | Previous tab |
| Home | First tab |
| End | Last tab |

Navigation wraps around (last tab → first, first tab → last).

## Usage Patterns

### Works Page (Image Grids)

The primary use case — organizing artworks by era:

```yaml
dataSource: 'works'
defaultTab: '2026'
labels:
  legacy: 'Legacy'
settings:
  gap: '50'
  targetRowHeight: '300'
```

### Multilingual Labels

Tab labels default to the data key (year numbers need no translation). Only non-obvious keys need a label override:

**English** (`works.md`):
```yaml
labels:
  legacy: 'Legacy'
```

**German** (`werke.md`):
```yaml
labels:
  legacy: 'Frühere Werke'
```

### Adding a New Year

Just drop a JSON file in the data directory:

1. Create `src/_data/data/works/2027.json` with artwork entries

That's it. The `sortedKeys` filter automatically places it before "2026" and before "legacy". No frontmatter changes needed.

## Filter Dependency

The component uses the `sortedKeys` Nunjucks filter (defined in `lib/filters/object-filters.js`) to sort the data object keys. Numeric keys sort descending, non-numeric keys sort alphabetically after all numeric keys.

## Dependencies

- **image-grid**: Declared in `manifest.json` via `requires` so the bundler includes image-grid CSS and JS when the tabs component is used
- **commons**: Provides base container and content layout utilities
- **sortedKeys filter**: Sorts data object keys for tab ordering

### Manifest

```json
{
  "name": "tabs",
  "styles": ["tabs.css"],
  "scripts": ["tabs.js"],
  "requires": ["image-grid"]
}
```

**Note**: The `requires` declaration exists because the tabs template renders image-grid markup directly (using image-grid CSS classes and JS initialization), but the bundler's static analysis only detects components referenced via `sectionType` in frontmatter. If tabs is used with other component types in the future, add those to the `requires` array.

## Accessibility

- **ARIA Roles**: Proper `tablist`, `tab`, and `tabpanel` roles
- **Selection State**: `aria-selected` indicates the active tab
- **Panel Labelling**: Each panel is linked to its tab via `aria-labelledby`
- **Keyboard Support**: Full arrow key, Home, and End navigation
- **Focus Management**: Focus moves to the newly activated tab on switch
- **Hidden Panels**: Uses `hidden` attribute for proper screen reader behavior

## Styling Hooks

Key CSS classes for customization:

- `.tabs-component`: Outer wrapper
- `.tabs-nav`: Tab button bar
- `.tabs-button`: Individual tab button
- `.tabs-button[aria-selected="true"]`: Active tab
- `.tabs-panel`: Panel wrapper
- `.tabs-panel[hidden]`: Hidden panel
