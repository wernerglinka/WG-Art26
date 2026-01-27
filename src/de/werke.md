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
  description: 'Mixed Media Assemblagen von Werner Glinka aus gefundenen und weggeworfenen Materialien.'
  socialImage: '/assets/images/artworks/2004.04.003.jpg'
  canonicalURL: ''
  alternate:
    en: /works/

sections:
  - sectionType: image-grid
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    dataSource: 'works'
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
    artworks:
      source: 'works'
      imageFolder: artworks/thumbnails
    text:
      title: 'Werke'
      titleTag: 'h1'
    settings:
      gap: '50'
      targetRowHeight: '300'
---
