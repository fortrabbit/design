# fortrabbit Design System

Brand identity and design tokens for fortrabbit. This repository is the source of truth for logos, colors, and naming.

## Colors

The palette is drawn from the Tailwind CSS color scale. Each role has a single canonical value — use it across web, print, and product UI.

- **Link** — fuchsia-500 · `#d946ef` · `oklch(0.667 0.295 322.15)` — primary interactive color, used for hyperlinks and primary calls to action.
- **Accent** — cyan-400 · `#22d3ee` · `oklch(0.789 0.154 211.53)` — supporting brand accent, used for highlights and secondary emphasis.
- **Alert** — yellow-300 · `#fde047` · `oklch(0.905 0.182 98.111)` — warnings, notices, and attention states.
- **Alternate accent** — indigo-500 · `#6366f1` · `oklch(0.585 0.233 277.117)` — alternate emphasis when the primary accent is unsuitable.

Neutrals: pure black (`#000`) and white (`#fff`) — see the black-and-white wordmark in `fortrabbit-logo-bw.svg`.

## Typography

- **Wordmark font** — Georgia, **bold italic** — used only for the HTML wordmark `•fortrabbit`.
- **Body / UI** — not specified by this repository. Inheriting product surfaces should use their own type scale; the wordmark is the only typographic asset defined here.

## Spacing

- **Logo clear space** — generous whitespace on all sides of the wordmark and square mark. No exact ratio is mandated; err toward more rather than less.
- **Adjacency rule** — no other text or graphic element should sit inside the logo's clear-space buffer.

## Components

### Wordmark

- **HTML form** — type a bullet, a regular space, then the company name: `•fortrabbit`.
- **Typography** — Georgia, bold italic.
- **File** — `fortrabbit-logo-bw.svg` (black & white master).

### Square mark

Square app/social marks for avatars, favicons, and tiles.

- **Variants** — `accent` (cyan), `alert` (yellow), `alternate` (indigo), `colorful`, `link` (fuchsia).
- **Shapes** — square (default) and `-rounded` (with rounded corners).
- **Formats** — SVG (`square-icon/svg/`) and PNG (`square-icon/png/`).
- **Filename pattern** — `fortrabbit-square-mark-{variant}[-rounded].{svg|png}`.

## Elevation

The brand is flat by default — no drop shadows, glows, or depth effects on the logo or marks. When embedded in a UI, the logo should sit on its own layer without elevation styling.

## Guidelines

### Do

- Surround the logo with plenty of whitespace.
- Write `fortrabbit` with a lowercase `f` in running text — even at the start of a sentence.
- Use one of the defined color variants for the square mark; pick the variant that fits the surrounding context.

### Don't

- Don't place text or graphics close to the logo.
- Don't recreate the wordmark in another typeface, weight, or style.
- Don't substitute the bullet for another character, or omit the space between bullet and name.
- Don't append `GmbH` to the brand name except in billing or official-entity contexts.
- Don't introduce colors outside the four defined roles for brand-level usage.

### Tone of voice

- Lowercase, friendly, technical-but-approachable. The lowercase `f` carries the tone — preserve it.
