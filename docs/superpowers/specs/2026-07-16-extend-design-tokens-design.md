# Extend fortrabbit/design with portable design tokens

**Issue:** [FR-6236](https://linear.app/fortrabbit/issue/FR-6236/extend-fortrabbitdesign) · **Date:** 2026-07-16

## Goal

Make `fortrabbit/design` (this public source-of-truth repo) self-sufficient enough that
someone with **no access** to the closed `frbit-frontend` monorepo can roughly reproduce
fortrabbit's design schemes. The immediate motivation: Igor restyling the API docs by
pointing an agent at this repo's `DESIGN.md`.

The real tokens today live in `frbit-frontend/packages/config-tailwind/src/imports/*.css`
and are described for insiders in that repo's `DESIGN.md`. This spec ports the **portable**
subset here — colors, themes, typography, sizing, spacing, focus — as prose plus a drop-in
Tailwind v4 snippet.

## Scope

**In:**
- Expand this repo's `DESIGN.md` with token documentation (see sections below).
- Add `fortrabbit-theme.css` — a standalone Tailwind v4 `@theme` snippet with all four
  color roles (default palette) plus the three alternate runtime palettes and dark mode.

**Out (non-portable, explicitly excluded):**
- The Vue component inventory (`Button`, `DataTable`, `List*`, etc.) — those are monorepo
  components an outside build cannot import. Document *conventions*, not components.
- Opt-in CSS files, WIP directives, `@nuxt/icon` whitelisting, auto-import machinery.
- Vendoring font binaries — reference Hubot Sans upstream instead.

## Deliverables

### 1. `fortrabbit-theme.css` (new file, repo root)

A self-contained Tailwind v4 stylesheet. No monorepo imports, no `@import` of other
`f-*.css` files. A Tailwind v4 build drops it in and gets the fortrabbit role tokens.

Contents, ported verbatim (values already verified against
`frbit-frontend/.../imports/f-themes.css`):

- **`@theme` block:**
  - Unset the Tailwind scales fortrabbit doesn't use (`lime`, `purple`, `pink`, `violet`,
    `sky`, `teal`, `emerald`, `amber`, `rose`, `zinc`, `neutral`, `stone` → `initial`).
  - Map the four roles onto their default source scales, all steps `50…950`:
    - `main-*` → `slate-*` (neutral surfaces, body text, borders)
    - `link-*` → `fuchsia-*` (real navigation, primary action, focus states)
    - `accent-*` → `cyan-*` (highlights, secondary emphasis, focus outlines)
    - `move-*` → `indigo-*` (alternate accent, on-page interaction, ghost hover)
- **`.theme-dry`, `.theme-fancy`, `.theme-contrast`** — each overrides `main`, `link`,
  `move`, `accent` at all `50…950` steps with the exact oklch values from `f-themes.css`.
  Add a comment: these are toggled at runtime by a root-level class (in the product,
  `ColorThemeSwitcher.vue`); an outside build sets the class itself.
- **`@variant theme-contrast`** — the `theme-contrast:` variant helper, ported as-is.
- Note in a header comment: assumes `darkMode: 'class'`; every color choice ships a
  `dark:` counterpart (guidance lives in `DESIGN.md`).

The exact per-step oklch values for the three alt palettes are transcribed from
`f-themes.css` — the implementation plan copies them exactly rather than re-deriving.

### 2. `DESIGN.md` (expand existing)

Keep the current sections (brand intro, wordmark, square marks, elevation, do/don't).
Add or expand:

#### Colors → replace the current flat 4-color list with **role-based tokens**

- Table of the four roles → default scale → "use for", matching the `frbit-frontend`
  table (`main`/slate, `link`/fuchsia, `accent`/cyan, `move`/indigo).
- Keep the canonical brand hex/oklch anchors already in the doc (link `#d946ef`,
  accent `#22d3ee`, alert `yellow-300 #fde047`, alternate/move `indigo-500 #6366f1`) and
  tie each to its role.
- Rule: **use role names, never the raw Tailwind scale** (`bg-main-100`, not `bg-slate-100`)
  so themes and dark mode work.
- `yellow` stays a standalone alert/"crazy" color (not a role).

#### Themes (new)

- **Dark mode:** always pair light + dark — `bg-main-100 dark:bg-main-900`,
  `text-main-900 dark:text-main-100`. Assumes `darkMode: 'class'`.
- **Alt palettes:** `dry`, `fancy`, `contrast` are full palette swaps applied by putting
  `.theme-dry` / `.theme-fancy` / `.theme-contrast` on the root element. Exact values live
  in `fortrabbit-theme.css`; describe each in a sentence (dry = desaturated warm; fancy =
  warm/olive-leaning; contrast = high-contrast blue-forward accessibility theme).

#### Semantic color rule (new)

- `link` (and a `.f-link` class, if the build defines one) is **only** for links that
  navigate to another page.
- On-page interactions — sorting, toggles, expanders, filters — use `move`:
  `text-move-700 dark:text-move-300`, hover `text-move-900 dark:text-move-100`.

#### Typography (expand)

- **Headings** (`h1`–`h5`) use **Hubot Sans**, weights Bold 700 and Medium 500.
  Open-source (SIL OFL). Reference upstream `github/hubot-sans`; give an `@font-face`
  template (two `woff2` weights, `font-display: swap`) and mention a CDN option. No font
  files committed to this repo.
- `.f-fancy` = opt into Hubot Sans outside headings.
- **Wordmark** = Georgia bold italic (existing `•fortrabbit` guidance; `.f-brand` style:
  `font-family: Georgia; font-style: italic; font-weight: 700; letter-spacing: 0.2px`,
  bullet via `::before`). Never used for body text.
- **Body / UI font** — not mandated; the consuming build chooses.

#### Sizing (new)

- Canonical size union: `xs | sm | md | lg | xl | 2xl | 3xl | 4xl | auto`. Default `md`.
- Any component with a `size` prop uses this union (or a sensible subset), never invented
  names like `small`/`normal`.

#### Spacing (expand)

- Page padding uses a clamp token: `--main-padding: clamp(3rem, 4.6vw, 44rem)`, applied as
  `.f-main { padding: var(--main-padding) }`. Use it for top-level page padding rather than
  bespoke values.
- Keep the existing logo clear-space / adjacency guidance.

#### Focus & elevation (expand)

- **Focus** is accent-based. Give the portable recipe:
  `focus:outline-accent-400/30 dark:focus:outline-accent-600/30 outline-offset-1 focus:outline-2`
  (and note the `f-focus`, `f-focus-border`, `f-focus-input`, `f-focus-text` utility
  patterns from `f-focus.css` as reference recipes an outside build can recreate).
- **Elevation:** brand is flat — no shadows/glows on logo or marks (existing).

#### Conventions note (new, short)

State plainly that the fortrabbit product is built on a private Vue/Nuxt component library
(buttons, lists, tables, forms, prose components) that outside builds cannot import — this
doc captures the **visual schemes** (color, type, sizing, spacing, focus) so a separate
build can *match the look*, not share the code. Long-form content in the product uses
`@tailwindcss/typography` with custom overrides; an outside build can approximate with the
same plugin.

## Verification

- `fortrabbit-theme.css` is valid Tailwind v4: dropping it into a bare Tailwind v4 project
  and using `bg-main-500`, `text-link-600`, `dark:bg-main-900`, and a `.theme-contrast`
  wrapper produces the expected colors.
- Every oklch value in the three alt palettes matches `f-themes.css` exactly (diff check).
- `DESIGN.md` has no dangling references to monorepo-only files/components as if they were
  available here.
- Markdown lints clean (repo already uses a markdown linter).

## Open questions

None blocking. Filename `fortrabbit-theme.css` and root placement are proposed; adjust in
review if a `tokens/` subfolder is preferred.
