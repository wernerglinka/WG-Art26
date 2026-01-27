# Image-grid Section

**Version:** 0.1.0
**Content Hash:** e5a96f081f3b69b1

## Dependencies

This section requires the following partials:

- [commons](../partials/commons-v0.1.0.zip)
- [text](../partials/text-v0.1.0.zip)
- [icon](../partials/icon-v0.1.0.zip)

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
cp image-grid.njk your-project/lib/layouts/components/sections/image-grid/
cp image-grid.css your-project/lib/layouts/components/sections/image-grid/
cp image-grid.js your-project/lib/layouts/components/sections/image-grid/
cp manifest.json your-project/lib/layouts/components/sections/image-grid/
```

## Usage

Add the image-grid section to your page frontmatter:

### Example 1

Configuration from component

```yaml
sections:
  - sectionType: image-grid
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
        imageScreen: none
    dataSource: sample-artworks
    text:
      title: Sample Gallery
      titleTag: h3
    settings:
      gap: '6'
      targetRowHeight: '180'
```

## More Information

For complete documentation and live examples, visit:
https://nunjucks-components.netlify.app/library/image-grid/

