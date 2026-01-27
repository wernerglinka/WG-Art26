---
layout: sections.njk
bodyClasses: 'sections-page'

navigation:
  navLabel: 'Studio Notes'
  navIndex: 2

seo:
  title: Studio Notes
  description: 'Studio notes from mixed media artist Werner Glinka. Process photos, material experiments, and working thoughts from the Center for People and Craft in Minneapolis.'
  socialImage: '/assets/images/studio-notes/the-start.jpg'
  canonicalOverwrite: ''
  alternate:
    de: /de/studio-notizen/

sections:
  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Studio Notes'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        Studio notes from mixed media artist Werner Glinka. Process photos, material experiments, and working thoughts from the Center for People and Craft in Minneapolis.

  - sectionType: collection-list
    collectionName: 'studio-notes'
    domainName: 'studio-notes'
    containerTag: section # section || article || aside
    classes: ''
    id: ''
    description: 'section with all studio notes'
    isDisabled: false
    isFullScreen: false
    isReverse: false
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        isDark: true
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    hasPagingParams: true
    pagingParams:
      numberOfBlogs: '' # updated by plugin
      numberOfPages: '' # updated by plugin
      pageLength: '' # updated by plugin
      pageStart: '' # updated by plugin
      pageNumber: '' # updated by plugin
---
