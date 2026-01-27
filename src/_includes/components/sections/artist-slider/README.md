# Artist-slider Section

**Version:** 0.1.0
**Content Hash:** 799def916d99b638

## Dependencies

This section requires the following partials:

- [commons](../partials/commons-v0.1.0.zip)

**Note:** Dependencies are not included in this package. Download them separately.

## Features

- Includes custom styles
- Includes interactive JavaScript

## Installation

### Automated Installation

```bash
./install.sh
```

**Prerequisite:** Create a `nunjucks-components.config.json` file in your project root:

```json
{
  "componentsBasePath": "lib/layouts/components",
  "sectionsDir": "sections",
  "partialsDir": "_partials"
}
```

The install script will:
- Read paths from your config file
- Check for existing versions
- Verify and auto-install dependencies
- Copy files to the correct locations

### Manual Installation

Copy the component files to your project:

```bash
cp artist-slider.njk your-project/lib/layouts/components/sections/artist-slider/
cp artist-slider.css your-project/lib/layouts/components/sections/artist-slider/
cp artist-slider.js your-project/lib/layouts/components/sections/artist-slider/
cp manifest.json your-project/lib/layouts/components/sections/artist-slider/
```

## Usage

Add the artist-slider section to your page frontmatter:

### Example 1

Configuration from component

```yaml
sections:
  - sectionType: artist-slider
    containerFields:
      inContainer: false
      isAnimated: false
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: true
      background:
        isDark: true
    artworks:
      source: example-artworks
      imageFolder: artworks
    cycleTime: 5000
    showDots: true
    scrollTarget: '#first-section'
```

## More Information

For complete documentation and live examples, visit:
https://nunjucks-components.netlify.app/library/artist-slider/

