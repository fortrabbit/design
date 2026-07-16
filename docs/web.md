# fortrabbit — Application & website rules

How to build a website or app that matches the fortrabbit look. Assumes Tailwind v4 with
[`../fortrabbit-theme.css`](../fortrabbit-theme.css) imported; the color roles it provides
are documented in [tokens.md](tokens.md). Brand identity (logo, wordmark, naming, tone) is
in [brand.md](brand.md).

## Typography

- **Headings** (`h1`–`h5`) — **Hubot Sans**, weights Bold (700) and Medium (500). It's
  open-source (SIL OFL) from [github/hubot-sans](https://github.com/github/hubot-sans); a
  CDN copy is on jsDelivr. Wire it up with a plain `@font-face` (two `woff2` weights,
  `font-display: swap`) and set it on your heading elements. Opt into it elsewhere via a
  utility class if you want the same "fancy" display feel.
- **Wordmark** — Georgia bold italic, for `•fortrabbit` only (see [brand.md](brand.md)).
- **Body / UI** — not mandated. The consuming build picks its own body face and type scale.

## Sizing

- One size scale runs across sizable elements: `xs | sm | md | lg | xl | 2xl | 3xl | 4xl`
  (plus `auto`). Default is `md`.
- Any component with a `size` prop should use this vocabulary — not invented names like
  `small` / `normal`.

## Spacing

- **Page padding** — top-level page padding uses a fluid clamp:
  `clamp(3rem, 4.6vw, 44rem)`. Reach for that rather than bespoke per-page values.
- Logo clear-space rules live in [brand.md](brand.md).

## Corners

The UI is **gently rounded, never sharp**. Default to a small radius (`rounded` /
`rounded-sm`) for most elements, `rounded-md` / `rounded-lg` for cards and larger surfaces,
and `rounded-full` only for circular things (avatars, pills, status dots). The square brand
mark also ships a `-rounded` variant. Don't mix wildly different radii in one composition.

## Beyond tokens

The fortrabbit product is built on a private Vue/Nuxt component library (buttons, lists,
tables, forms, prose components) that lives in a closed monorepo and can't be imported
elsewhere. This documentation captures the **visual schemes** — color, type, sizing,
spacing, corners, focus — so a separate build can match the *look*, not share the code. For
long-form content, the product uses the `@tailwindcss/typography` plugin with custom
overrides; an outside build can get close with the same plugin.
