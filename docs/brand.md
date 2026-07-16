# fortrabbit — Brand & corporate identity

The stable identity that applies to **every** fortrabbit surface — product, docs,
marketing, print. It changes rarely. For how to *build* a website in the fortrabbit style,
see the [application rules](web.md); for the color system, see [color tokens](tokens.md).

## Brand colors

The brand is expressed through four color roles. These are their canonical **anchor**
values — the full scales, dark mode, and alternate themes live in [tokens.md](tokens.md)
and ship as exact values in [`fortrabbit-theme.css`](../assets/fortrabbit-theme.css).

- **link** — fuchsia · `#d946ef` · `oklch(0.667 0.295 322.15)`
- **accent** — cyan · `#22d3ee` · `oklch(0.789 0.154 211.53)`
- **move** (alternate accent) — indigo · `#6366f1` · `oklch(0.585 0.233 277.117)`
- **alert** — yellow · `#fde047` — standalone attention color, not a role.
- **Neutrals** — pure black `#000` and white `#fff` (see `../fortrabbit-logo-bw.svg`).

Don't introduce colors outside these for brand-level usage.

## Wordmark

- **HTML form** — type a bullet, a regular space, then the company name: `•fortrabbit`.
- **Typography** — Georgia, **bold italic**. Never recreated in another typeface, weight,
  or style; never used for body text.
- **File** — `../fortrabbit-logo-bw.svg` (black & white master).
- **Clear space** — generous whitespace on all sides. No exact ratio is mandated; err
  toward more. No other text or graphic sits inside the clear-space buffer.

## Square mark

Square app/social marks for avatars, favicons, and tiles.

- **Variants** — `accent` (cyan), `alert` (yellow), `alternate` (indigo), `colorful`, `link` (fuchsia).
- **Shapes** — square (default) and `-rounded` (with rounded corners).
- **Formats** — SVG (`../square-icon/svg/`) and PNG (`../square-icon/png/`).
- **Filename pattern** — `fortrabbit-square-mark-{variant}[-rounded].{svg|png}`.

## Elevation

The brand is flat by default — no drop shadows, glows, or depth effects on the logo or
marks. When embedded in a UI, the logo sits on its own layer without elevation styling.

## Naming

- Write `fortrabbit` with a lowercase `f` in running text — even at the start of a sentence.
- Don't append `GmbH` to the brand name except in billing or official-entity contexts.

## Tone of voice

Lowercase, friendly, technical-but-approachable. The lowercase `f` carries the tone —
preserve it.

## Do / Don't

**Do**

- Surround the logo with plenty of whitespace.
- Write `fortrabbit` lowercase in running text, even at the start of a sentence.
- Use one of the defined color variants for the square mark; pick the one that fits context.

**Don't**

- Place text or graphics close to the logo.
- Recreate the wordmark in another typeface, weight, or style.
- Substitute the bullet for another character, or omit the space between bullet and name.
- Append `GmbH` outside billing / official-entity contexts.
- Introduce colors outside the four defined roles for brand-level usage.
