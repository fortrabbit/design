# fortrabbit Design System

Brand identity and design tokens for fortrabbit. This repository is the source of truth for logos, colors, and naming.

## Colors

fortrabbit works in **roles**, not raw colors. Each role is a full Tailwind scale
(`50`…`950`) mapped onto a source palette. Refer to the role — `bg-main-100`,
`text-link-600` — never the underlying scale. That indirection is what lets the alternate
palettes and dark mode swap cleanly.

| Role | Default scale | Use for | Brand anchor |
|---|---|---|---|
| `main` | slate | Neutral surfaces, body text, borders | `#000` / `#fff` neutrals |
| `link` | fuchsia | Real navigation, primary action, focus states | `#d946ef` · `oklch(0.667 0.295 322.15)` |
| `accent` | cyan | Highlights, secondary emphasis, focus outlines | `#22d3ee` · `oklch(0.789 0.154 211.53)` |
| `move` | indigo | On-page interactivity, alternate accent | `#6366f1` · `oklch(0.585 0.233 277.117)` |

`yellow` (e.g. `yellow-300` · `#fde047`) stays a standalone alert / attention color — it is
not a role.

The exact values for all four roles, plus the alternate palettes and dark mode, ship as a
drop-in Tailwind v4 file: [`fortrabbit-theme.css`](fortrabbit-theme.css). Import it after
Tailwind and you get the role tokens directly. A non-Tailwind build can read the same file
as a reference table.

### Link vs move — the one rule to get right

Two roles carry interactivity, and keeping them apart matters more than any exact shade:

- **`link`** — links that navigate to another page.
- **`move`** — on-page interactivity: sorting, toggles, expanders, filters, in-place actions.

Use the tokens directly (`text-link-600`, `text-move-700`, hover a step or two darker).
Don't reach for a shared `.f-link` helper — the product may drop it in favour of plain
Tailwind.

### Dark mode & themes

- Assumes `darkMode: 'class'`. Pair every color with a dark counterpart:
  `bg-main-100 dark:bg-main-900`, `text-main-900 dark:text-main-100`.
- Three alternate palettes — `dry` (desaturated warm), `fancy` (warm/olive), `contrast`
  (high-contrast, blue-forward) — are full role swaps toggled by a class on the root
  element. Optional; only wire them up if the build wants theme switching.

## Typography

- **Headings** (`h1`–`h5`) — **Hubot Sans**, weights Bold (700) and Medium (500). It's
  open-source (SIL OFL) from [github/hubot-sans](https://github.com/github/hubot-sans); a
  CDN copy is on jsDelivr. Wire it up with a plain `@font-face` (two `woff2` weights,
  `font-display: swap`) and set it on your heading elements. Opt into it elsewhere via a
  utility class if you want the same "fancy" display feel.
- **Wordmark font** — Georgia, **bold italic** — used only for the HTML wordmark
  `•fortrabbit`. Never used for body text.
- **Body / UI** — not mandated. The consuming build picks its own body face and type scale.

## Sizing

- One size scale runs across sizable elements: `xs | sm | md | lg | xl | 2xl | 3xl | 4xl`
  (plus `auto`). Default is `md`.
- Any component with a `size` prop should use this vocabulary — not invented names like
  `small` / `normal`.

## Spacing

- **Page padding** — top-level page padding uses a fluid clamp:
  `clamp(3rem, 4.6vw, 44rem)`. Reach for that rather than bespoke per-page values.
- **Logo clear space** — generous whitespace on all sides of the wordmark and square mark.
  No exact ratio is mandated; err toward more rather than less.
- **Adjacency rule** — no other text or graphic element should sit inside the logo's
  clear-space buffer.

## Corners

The UI is **gently rounded, never sharp**. Default to a small radius (`rounded` /
`rounded-sm`) for most elements, `rounded-md` / `rounded-lg` for cards and larger surfaces,
and `rounded-full` only for circular things (avatars, pills, status dots). The square brand
mark also ships a `-rounded` variant. Don't mix wildly different radii in one composition.

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

## Focus

Focus states are **accent-based** — an accent outline with a small offset, e.g.
`focus:outline-accent-400/30 dark:focus:outline-accent-600/30 outline-offset-1
focus:outline-2`. Treat it as a pattern to reproduce, not a fixed class to import.

## Elevation

The brand is flat by default — no drop shadows, glows, or depth effects on the logo or marks. When embedded in a UI, the logo should sit on its own layer without elevation styling.

## Beyond tokens

The fortrabbit product is built on a private Vue/Nuxt component library (buttons, lists,
tables, forms, prose components) that lives in a closed monorepo and can't be imported
elsewhere. This document captures the **visual schemes** — color, type, sizing, spacing,
corners, focus — so a separate build can match the *look*, not share the code. For
long-form content, the product uses the `@tailwindcss/typography` plugin with custom
overrides; an outside build can get close with the same plugin.

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
