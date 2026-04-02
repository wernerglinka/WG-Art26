# Artwork Section Component

Displays a single artwork with its image, optional title text, and a structured property list. Used on all individual work pages (`src/works/*.md` and `src/de/werke/*.md`).

## Template

`artwork.njk` — renders into a `.section-wrapper.artwork` container (applied by the section renderer).

## Partials Used

- `components/_partials/text/text.njk` — renders `text.leadIn`, `text.title`, `text.subTitle`
- `components/_partials/image/image.njk` — renders the artwork image with optional caption

## Frontmatter Schema

```yaml
- sectionType: artwork          # required
  containerTag: article         # HTML tag for the outer section wrapper
  classes: ''
  id: ''
  isDisabled: false
  isReverse: false
  containerFields:
    inContainer: false
    isAnimated: true
    noMargin:
      top: false
      bottom: true
    noPadding:
      top: false
      bottom: true
    background:
      color: ''
      image: ''
      imageScreen: 'none'       # light | dark | none
  text:                         # optional — omit block to suppress the header
    leadIn: ''
    title: 'Object 2026.03.005'
    titleTag: 'h1'
    subTitle: ''
  image:                        # required
    src: '/assets/images/artworks/2026/2026.03.005.JPG'
    alt: ''
    caption: ''                 # optional — rendered below the image
  artworkProperties:            # optional — omit block to suppress the property list
    type: 'Assemblage'
    year: 2026
    materials: 'Wire mesh, wood panel, ash, urethane, shredded paper'
    status: 'available'         # available | sold | not-for-sale
    dimensions:
      width: 9
      height: 24
      depth: 1                  # optional
      unit: 'inches'            # stored in inches; converted to cm for German pages
```

## Bilingual Behaviour

The component reads the page-level `lang` variable to switch between English and German:

- Property labels (`Type`, `Year`, `Materials`, `Dimensions`, `Status`) are rendered in the active language.
- Dimensions are stored in inches. When `lang == 'de'` the component converts width, height, and depth to centimetres (× 2.54, rounded) and displays the `cm` unit automatically.
- The `status` field only displays when the value is `available` / `Verfügbar`. Sold or not-for-sale works omit the status row entirely.

## CSS

`artwork.css` — scoped under `.section-wrapper.artwork .artwork`. Key layout decisions:

- The `.content` container overrides the default flex layout with `display: block` so the image, text, and property list stack vertically.
- All three blocks (`.artwork-header`, `.media`, `.props-list`) share the same fluid max-width: `clamp(45ch, 65ch, 80ch)`, centred with `margin-inline: auto`.
- The image is constrained to `max-width: 500px` / `max-height: 600px` and centred within `.media` via `justify-self: center`.
- The property list uses a two-column definition list grid (`8rem` label column, fluid value column) with hairline borders between rows.

## Design Tokens Used

`--glass-border-radius`, `--space-xs`, `--space-s`, `--space-m`, `--color-text-muted`, `--color-border-light`, `--color-text`, `--color-primary`, `--step--1`, `--font-p`, `--font-s`
