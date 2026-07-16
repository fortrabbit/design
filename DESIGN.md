# fortrabbit Design System

Source of truth for fortrabbit's brand and design tokens. This file is the entry point —
start here, then follow the map. It also inlines the load-bearing color decisions, so an
agent that reads only this file still gets them right.

## Map

- **[Brand & corporate identity](docs/brand.md)** — logo, wordmark, square marks, naming,
  tone of voice, do/don't. The stable identity, applies to every fortrabbit surface.
- **[Color tokens & themes](docs/tokens.md)** — the role system, dark mode, alternate
  palettes, focus.
- **[Application & website rules](docs/web.md)** — typography, sizing, spacing, corners,
  and how a separate build matches the look.
- **[`fortrabbit-theme.css`](assets/fortrabbit-theme.css)** — drop-in Tailwind v4 theme with the
  exact values for all four roles (`50`…`950`), the alternate palettes, and dark mode.

## Essentials

If you read nothing else, get these two right.

### Color roles, not raw colors

fortrabbit works in **roles**, each a full Tailwind scale (`50`…`950`) mapped onto a source
palette. Refer to the role — `bg-main-100`, `text-link-600` — never the underlying scale.
Always pair light with dark (`bg-main-100 dark:bg-main-900`).

| Role     | Default scale | Use for                                        | Brand anchor                             |
| -------- | ------------- | ---------------------------------------------- | ---------------------------------------- |
| `main`   | slate         | Neutral surfaces, body text, borders           | `#000` / `#fff` neutrals                 |
| `link`   | fuchsia       | Real navigation, primary action, focus states  | `#d946ef` · `oklch(0.667 0.295 322.15)`  |
| `accent` | cyan          | Highlights, secondary emphasis, focus outlines | `#22d3ee` · `oklch(0.789 0.154 211.53)`  |
| `move`   | indigo        | On-page interactivity, alternate accent        | `#6366f1` · `oklch(0.585 0.233 277.117)` |

`yellow` (`#fde047`) is a standalone alert color — not a role. Full values and themes:
[`fortrabbit-theme.css`](assets/fortrabbit-theme.css) · details in [tokens.md](docs/tokens.md).

### Link vs move

- **`link`** — links that navigate to another page.
- **`move`** — on-page interactivity: sorting, toggles, expanders, filters, in-place actions.

Keeping these apart matters more than any exact shade.
