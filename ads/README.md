# Ads

Display ad artwork for Google Ads, first used by the remarketing campaign `display-remarketing` (MR-370). The PNGs in [`display/`](display/) are generated; edit the template or the claims and re-render.

## Design

Each image pairs a claim headline with a terminal running a deploy and the wordmark.

| Element | Rule |
| -- | -- |
| Background | `main-800` (`#1e293b`) |
| Headline | Hubot Sans Bold, white, top left |
| Terminal | `main-950` box, `$ git push` → `composer install` → `npm run build` → `deployed`. It bleeds off the right edge so the text stays large. Checks in `accent`, the final line in `link`. |
| Wordmark | White, bottom left, at least 380px wide on 1200×628 and 560px on the portrait and square formats |

Keep the command short. `git push fortrabbit main` was too long to read at small ad sizes.

The first round also tried brand circles and colored framework pills. Both were dropped.

## Claims

The headlines come from [`claims.json`](claims.json), picked from the rotating claims in the frontend (`packages/shared-nuxt/components/global/ClaimRotate.vue`).

- A different kind of web hosting
- PHP as a service
- You code, we deliver
- Focus on PHP, not PHP hosting
- Go ahead, ditch your VPS

A claim has to fit in three lines on 1200×628, so roughly 35 characters at most. Add more from `ClaimRotate.vue` to test them: one responsive display ad rotates up to 15 images, and Google reports which ones perform.

## Formats

| File | Size | Google Ads slot |
| -- | -- | -- |
| `terminal-1200x628-*.png` | 1.91:1 | Landscape image |
| `terminal-1200x1200-*.png` | 1:1 | Square image |
| `terminal-960x1200-*.png` | 4:5 | Portrait image |
| `logo-1200x1200.png` | 1:1 | Square logo (colorful square mark) |
| `logo-1200x300.png` | 4:1 | Landscape logo (wordmark) |

Google may reject or limit images where text covers more than about 20% of the area. If that happens, shorten the terminal to `git push` and `deployed`.

## Render

Needs Node and the Playwright Chromium build.

```sh
cd ads
npm install
npx playwright install chromium   # once
npm run render
```

`render.mjs` opens [`template.html`](template.html) once per claim and size and writes the PNGs to `display/`, replacing what was there. To preview one by hand, open `template.html#terminal-1200x628-PHP as a service` in a browser.

## Upload

Google Ads → Campaigns → `display-remarketing` → Ads → responsive display ad → Images and Logos. Upload the landscape, square and portrait images of each claim plus both logos. Headlines and descriptions are text fields in the ad itself, not part of the images.
