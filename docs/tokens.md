# fortrabbit — Color tokens & themes

The color system for building fortrabbit-styled UI. Brand-level color anchors are in
[brand.md](brand.md); the exact values (all scales + themes) ship as a drop-in Tailwind v4
stylesheet, [`../fortrabbit-theme.css`](../fortrabbit-theme.css).

## Roles, not raw colors

fortrabbit works in **roles**, each a full Tailwind scale (`50`…`950`) mapped onto a source
palette. Refer to the role — `bg-main-100`, `text-link-600` — never the underlying scale.
That indirection is what lets the alternate palettes and dark mode swap cleanly.

| Role     | Default scale | Use for                                        |
| -------- | ------------- | ---------------------------------------------- |
| `main`   | slate         | Neutral surfaces, body text, borders           |
| `link`   | fuchsia       | Real navigation, primary action, focus states  |
| `accent` | cyan          | Highlights, secondary emphasis, focus outlines |
| `move`   | indigo        | On-page interactivity, alternate accent        |

`yellow` (e.g. `yellow-300` · `#fde047`) stays a standalone alert / attention color — it is
not a role.

Import [`../fortrabbit-theme.css`](../fortrabbit-theme.css) after Tailwind and you get the
role tokens directly. A non-Tailwind build can read the same file as a reference table.

## Link vs move — the one rule to get right

Two roles carry interactivity, and keeping them apart matters more than any exact shade:

- **`link`** — links that navigate to another page.
- **`move`** — on-page interactivity: sorting, toggles, expanders, filters, in-place actions.

Use the tokens directly (`text-link-600`, `text-move-700`, hover a step or two darker).
Don't reach for a shared `.f-link` helper — the product may drop it in favour of plain
Tailwind.

## Dark mode & themes

- Assumes `darkMode: 'class'`. Pair every color with a dark counterpart:
  `bg-main-100 dark:bg-main-900`, `text-main-900 dark:text-main-100`.
- Three alternate palettes — `dry` (desaturated warm), `fancy` (warm/olive), `contrast`
  (high-contrast, blue-forward) — are full role swaps toggled by a class on the root
  element. Optional; only wire them up if the build wants theme switching. Exact per-step
  values are in [`../fortrabbit-theme.css`](../fortrabbit-theme.css).

## Focus

Focus states are **accent-based** — an accent outline with a small offset, e.g.
`focus:outline-accent-400/30 dark:focus:outline-accent-600/30 outline-offset-1
focus:outline-2`. Treat it as a pattern to reproduce, not a fixed class to import.
