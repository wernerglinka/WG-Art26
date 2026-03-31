---
name: update-related-links
description: Update the related-studio-notes and related-artworks cross-link sections on WG Art26 work pages and studio notes. Use when adding a new artwork or studio note, or when the connections between works and notes change. Triggers on "update related links", "update cross-links", "update studio note links", "update artwork links".
---

# Update Related Links

Use this skill to add or update the `related-studio-notes` section on artwork pages and the `related-artworks` section on studio note pages. Both directions must be kept in sync.

## Connection Map

This is the authoritative mapping of which studio notes relate to which artworks. Update this table whenever a new connection is established.

| Artwork (EN path) | Related studio notes (EN slugs) |
|---|---|
| `/works/boats/` | `boat-form` |
| `/works/2005.01.006/` | `boat-form` |
| `/works/2026.003.01/` | `found-a-home`, `paper-mache`, `cardboard` |
| `/works/2026.003.02/` | `first-piece`, `cardboard`, `paper-mache` |
| `/works/2026.003.03/` | `cardboard` |
| `/works/2007.01.001/` | `recurring-forms` |
| `/works/2003.12.001/` | `recurring-forms` |

German pages mirror each row exactly, with `/de/werke/` and `/de/studio-notizen/` paths.

## Studio Note URL Reference

| English slug | English URL | German slug | German URL |
|---|---|---|---|
| `boat-form` | `/studio-notes/boat-form/` | `die-bootsform` | `/de/studio-notizen/die-bootsform/` |
| `found-a-home` | `/studio-notes/found-a-home/` | `ein-zuhause-gefunden` | `/de/studio-notizen/ein-zuhause-gefunden/` |
| `first-piece` | `/studio-notes/first-piece/` | `erstes-stueck` | `/de/studio-notizen/erstes-stueck/` |
| `cardboard` | `/studio-notes/cardboard/` | `karton` | `/de/studio-notizen/karton/` |
| `paper-mache` | `/studio-notes/paper-mache/` | `pappmache` | `/de/studio-notizen/pappmache/` |
| `recurring-forms` | `/studio-notes/recurring-forms/` | `formen-die-sich-wiederholen` | `/de/studio-notizen/formen-die-sich-wiederholen/` |

## Link Text Reference

Use these descriptions consistently. Update when titles change.

**For artwork pages** (`leadIn: 'Studio Notes'`):
- `boat-form` → `[The Boat Form](/studio-notes/boat-form/) — On the vessel forms that shaped this work.`
- `found-a-home` → `[Found a Home](/studio-notes/found-a-home/) — The studio note on how this piece was completed.`
- `first-piece` → `[First Piece](/studio-notes/first-piece/) — On making the first cardboard and paper mâché assembly.`
- `cardboard` → `[Cardboard](/studio-notes/cardboard/) — On building volume from stacked cardboard.`
- `paper-mache` → `[Paper Mache](/studio-notes/paper-mache/) — On making paper mâché clay for sculpture.`
- `recurring-forms` → `[Recurring Forms](/studio-notes/recurring-forms/) — On the circle and stadium shapes that keep returning.`

**For studio notes** (`leadIn: 'Works'`):
- `/works/boats/` → `[Boats](/works/boats/) — The triptych discussed in this note.`
- `/works/2005.01.006/` → `[Object 2005.01.006](/works/2005.01.006/) — A related boat hull in pine sticks and wire.`
- `/works/2026.003.01/` → `[Object 2026.003.01](/works/2026.003.01/) — The piece completed in this note.` *(found-a-home)* or `[Object 2026.003.01](/works/2026.003.01/) — Cardboard with paper mâché clay and paper tubes.` *(cardboard/paper-mache)*
- `/works/2026.003.02/` → `[Object 2026.003.02](/works/2026.003.02/) — The first cardboard and paper mâché assembly.` *(first-piece)* or `[Object 2026.003.02](/works/2026.003.02/) — Laminated cardboard strips with paper mâché clay spine.` *(cardboard/paper-mache)*
- `/works/2026.003.03/` → `[Object 2026.003.03](/works/2026.003.03/) — Laminated cardboard panels with driftwood.`
- `/works/2007.01.001/` → `[Object 2007.01.001](/works/2007.01.001/) — A circular, wreath-like form from interlocking metal strips.`
- `/works/2003.12.001/` → `[Object 2003.12.001](/works/2003.12.001/) — German flag colors from a Ruhr Valley childhood.`

German link text mirrors the above, translated.

## Section Templates

### related-studio-notes (goes at the END of artwork page sections)

```yaml
  - sectionType: text-only
    containerTag: aside
    classes: 'related-studio-notes'
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
        imageScreen: 'none'
    text:
      leadIn: 'Studio Notes'
      title: ''
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        [LINK 1]

        [LINK 2]
```

German artwork pages use `leadIn: 'Atelier-Notizen'` and German URLs.

### related-artworks (goes BEFORE the collection-links section in studio notes)

```yaml
  - sectionType: text-only
    containerTag: aside
    classes: 'related-artworks'
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
        imageScreen: 'none'
    text:
      leadIn: 'Works'
      title: ''
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        [LINK 1]

        [LINK 2]
```

German studio notes use `leadIn: 'Werke'` and German `/de/werke/` URLs.

## Procedure

### When adding a new artwork

1. Determine which studio notes relate to the new artwork (check the connection map above; update it if needed).
2. Add the `related-studio-notes` section at the end of the English artwork page.
3. Add the matching `related-studio-notes` section (with `leadIn: 'Atelier-Notizen'`) at the end of the German artwork page.
4. For each related studio note, open the English note and insert a `related-artworks` section just before the `collection-links` section. Do the same for the German note.
5. Update the connection map in this skill file.

### When adding a new studio note

1. Determine which artworks the note touches (check the connection map above; update it if needed).
2. Add a `related-artworks` section just before the `collection-links` section in the English note.
3. Add the matching `related-artworks` section (`leadIn: 'Werke'`) in the German note.
4. For each related artwork, open the English work page and add or update its `related-studio-notes` section. Do the same for the German work page.
5. Update the connection map in this skill file.

### When updating an existing connection

1. Find the `related-studio-notes` section in the artwork page (identified by `classes: 'related-studio-notes'`) and replace its `prose` field with the updated links.
2. Find the `related-artworks` section in the studio note (identified by `classes: 'related-artworks'`) and replace its `prose` field with the updated links.
3. Mirror the change to the German counterpart.
4. Update the connection map in this skill file.

## File Locations

- English artworks: `src/works/{catalog-number}.md` or `src/works/{slug}.md`
- German artworks: `src/de/werke/{catalog-number}.md` or `src/de/werke/{slug}.md`
- English studio notes: `src/studio-notes/{slug}.md`
- German studio notes: `src/de/studio-notizen/{slug}.md`

## Verification

After any update:

1. Confirm every link in `related-studio-notes` resolves to an actual file in `src/studio-notes/`.
2. Confirm every link in `related-artworks` resolves to an actual file in `src/works/`.
3. Confirm the German counterpart of every changed file was also updated.
4. Run `npm start` and visit the affected pages to verify the sections render.
