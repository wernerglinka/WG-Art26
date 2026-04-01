---
layout: sections.njk
bodyClasses: 'sections-page'
hasHero: true

topMessage:
  disable: true
  text: ''
  link:
    url: ''
    label: ''
  dismissible: true

navigation:
  navLabel: 'Werke'
  navIndex: 0

seo:
  title: 'Werner Glinka - Mixed Media Werke'
  description: 'Assemblagen von Werner Glinka aus gefundenen und weggeworfenen Materialien.'
  socialImage: '/assets/images/artworks/2004.04.003.jpg'
  canonicalURL: ''
  alternate:
    en: /works/

sections:
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
      title: 'Werke'
      titleTag: 'h1'
    defaultTab: ''
    tabs:
      - key: '2026'
        label: '2026'
        pane:
          sectionType: image-grid
          dataSource: 'werke/2026'
          settings:
            gap: '50'
            targetRowHeight: '300'
      - key: legacy
        label: 'Legacy'
        pane:
          sectionType: image-grid
          dataSource: 'werke/legacy'
          settings:
            gap: '50'
            targetRowHeight: '300'
---
