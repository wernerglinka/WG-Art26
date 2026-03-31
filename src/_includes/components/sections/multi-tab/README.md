# Multi-Tab Section Component

A dynamic tabbed interface where each pane can be any section type — image-grid, text-only, media, or anything else in the component library. Tabs and their pane configurations are declared explicitly in page frontmatter. The component delegates pane rendering entirely to the `renderSection` macro, so it has no knowledge of what it is displaying inside each panel.

This differs from the `tabs` component, which scans a data directory and always renders image-grid panels. Use `multi-tab` when you need different section types per pane, or when you want explicit control over which data each pane displays.

## Features

- **Any Section Type as a Pane**: Each tab can render a different component (image-grid, text-only, media, etc.)
- **Explicit Frontmatter Config**: Tabs and panes are fully declared in frontmatter — no directory scanning
- **Nested Data Paths**: `dataSource` supports slash-notation (`'works/2026'`) to target sub-keys within a data object
- **Accessible Tab Pattern**: Full ARIA `tablist`/`tab`/`tabpanel` roles
- **Keyboard Navigation**: Arrow keys, Home, and End move between tabs
- **Decoupled Panel Init**: Dispatches a `tab:revealed` CustomEvent when a panel becomes visible — components subscribe independently
- **SWUP Support**: Registers with PageTransitions for page transition cleanup
- **Configurable Default Tab**: Set which tab is active on page load, with auto-fallback to current year or first tab

## Frontmatter Schema

```yaml
- sectionType: multi-tab
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
  defaultTab: '2026'
  tabs:
    - key: '2026'
      label: '2026'
      pane:
        sectionType: image-grid
        dataSource: 'works/2026'
        settings:
          gap: '50'
          targetRowHeight: '300'
    - key: legacy
      label: 'Legacy'
      pane:
        sectionType: image-grid
        dataSource: 'works/legacy'
        settings:
          gap: '50'
          targetRowHeight: '300'
```

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `defaultTab` | string | Key of the tab active on page load. Omit to auto-select current year, or falls back to first tab |
| `tabs` | array | Array of tab definitions (see below) |
| `tabs[].key` | string | Unique identifier. Used for ARIA ids and default-tab matching |
| `tabs[].label` | string | Display label for the tab button. Defaults to `key` if omitted |
| `tabs[].pane` | object | A complete section definition — any valid `sectionType` and its properties |

### Default Tab Resolution

1. If `defaultTab` is set and that key exists in the tabs array → use it
2. Otherwise if the current year (as a string, e.g. `"2026"`) matches a tab key → use that
3. Otherwise → use the first tab key

## Pane Configuration

Each `pane` is a standard section definition, identical to what you would write as a top-level section. Any component that works standalone works as a pane.

### Image Grid Pane

```yaml
pane:
  sectionType: image-grid
  dataSource: 'works/2026'    # slash-notation resolves data.works["2026"]
  settings:
    gap: '50'
    targetRowHeight: '300'
```

The `dataSource` field supports slash-notation for nested data lookups. `'works/2026'` resolves to `data.works["2026"]`. Flat paths like `'works'` still work as before.

### Text Pane

```yaml
pane:
  sectionType: text-only
  text:
    title: 'Statement'
    body: 'Prose content here.'
```

### Mixed Panes

```yaml
tabs:
  - key: gallery
    label: 'Gallery'
    pane:
      sectionType: image-grid
      dataSource: 'works/2026'
      settings:
        gap: '50'
        targetRowHeight: '300'
  - key: statement
    label: 'Statement'
    pane:
      sectionType: text-only
      text:
        body: 'Artist statement here.'
```

## HTML Structure

```html
<div class="container content">
  <div class="text flow">
    <h1>Works</h1>
  </div>

  <div class="tabs-component" data-default-tab="2026">
    <!-- Tab buttons -->
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

    <!-- Tab panels — each renders the declared pane component -->
    <div class="tabs-panel" role="tabpanel" id="panel-2026" aria-labelledby="tab-2026">
      <!-- image-grid component output -->
    </div>
    <div class="tabs-panel" role="tabpanel" id="panel-legacy" aria-labelledby="tab-legacy" hidden>
      <!-- image-grid component output -->
    </div>
  </div>
</div>
```

## CSS Architecture

### Content Override

The parent `.content` container defaults to `display: flex`. The component overrides this so the title and tab bar stack vertically:

```css
section:has(.tabs-component) .content {
  display: block;
}
```

### Tab Navigation

Styling relies on CSS custom properties from the site's design tokens:

- `--font-heading`, `--font-p` for typography
- `--color-text-inactive` for inactive tabs
- `--color-primary` for the focus outline
- `--transition-base` for hover transitions

### Panel Visibility

Inactive panels use the `hidden` attribute (`display: none`). This ensures hidden pane components are not laid out until they become visible — important for components like image-grid that calculate layout based on container width.

## JavaScript Behavior

### Tab Switching

Clicking a tab or pressing arrow keys:

1. Deactivates all tabs (`aria-selected="false"`, `tabindex="-1"`)
2. Hides all panels (sets `hidden` attribute)
3. Activates the selected tab and reveals its panel
4. Moves focus to the activated tab
5. Dispatches `tab:revealed` on the revealed panel element

### Panel Reinitialization via `tab:revealed`

When a panel becomes visible, `multi-tab.js` dispatches:

```javascript
panel.dispatchEvent(new CustomEvent('tab:revealed', { bubbles: false }));
```

Components that need reinitialization when revealed listen for this event independently. For example, `image-grid.js` listens:

```javascript
document.addEventListener('tab:revealed', () => {
  initImageGrids();
});
```

This keeps multi-tab fully decoupled from image-grid and any other component type. Adding a new component type that needs reinitialization requires only adding a listener in that component's JS — no changes to multi-tab.

### Keyboard Navigation

| Key | Action |
|-----|--------|
| ArrowRight | Next tab |
| ArrowLeft | Previous tab |
| Home | First tab |
| End | Last tab |

Navigation wraps (last → first, first → last).

## The `getNestedData` Filter

The `dataSource` field in pane configurations supports slash-notation paths via the `getNestedData` Nunjucks filter:

```nunjucks
{% set imageList = data | getNestedData(section.dataSource) %}
```

- `'works'` → `data['works']`
- `'works/2026'` → `data['works']['2026']`
- `'works.2026'` → `data['works']['2026']` (dot-notation also works)

The filter is defined in `lib/filters/object-filters.js` as a plain JS function — framework-agnostic, registered as a Nunjucks filter in both Eleventy and Metalsmith.

## Bundler Considerations

The `manifest.json` declares no `requires`:

```json
{
  "name": "multi-tab",
  "styles": ["multi-tab.css"],
  "scripts": ["multi-tab.js"]
}
```

The bundler discovers pane component dependencies automatically because each `tab.pane.sectionType` in the page frontmatter is scanned directly. The pane components appear in frontmatter the same way top-level sections do — no explicit `requires` needed.

## Accessibility

- **ARIA Roles**: Proper `tablist`, `tab`, and `tabpanel` roles
- **Selection State**: `aria-selected` indicates the active tab
- **Panel Labelling**: Each panel is linked to its tab via `aria-labelledby`
- **Keyboard Support**: Full arrow key, Home, and End navigation
- **Focus Management**: Focus moves to the newly activated tab on switch
- **Hidden Panels**: Uses `hidden` attribute for proper screen reader behavior (not just `visibility: hidden`)

## Styling Hooks

Key CSS classes for customization:

- `.tabs-component`: Outer wrapper
- `.tabs-nav`: Tab button bar
- `.tabs-button`: Individual tab button
- `.tabs-button[aria-selected="true"]`: Active tab
- `.tabs-panel`: Panel wrapper
- `.tabs-panel[hidden]`: Hidden panel (set to `display: none`)

## Comparison with `tabs` Component

| | `tabs` | `multi-tab` |
|---|---|---|
| Pane type | Always image-grid | Any section type |
| Tab source | JSON files in a data directory | Explicit `tabs` array in frontmatter |
| Adding a tab | Drop a file in the data directory | Add an entry to the `tabs` array |
| Data path | Top-level key only (`'works'`) | Slash-notation supported (`'works/2026'`) |
| Panel init | Calls `window.initImageGrids()` directly | Dispatches `tab:revealed` event |
| Bundler deps | `requires: ["image-grid"]` in manifest | No `requires` needed |
