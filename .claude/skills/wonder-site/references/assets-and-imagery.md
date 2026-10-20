# Assets & imagery (brief §3 imagery rules, §6)

## Sources

| Folder | Contents | Rule |
|---|---|---|
| `brand-assets/source/mockups/` | Approved packaging renders on the taupe studio background (`wonder-<variety>-mockup.png` 2400×2000, `wonder-lineup-mockup.png` 3000×1700) | Use as-is. Never re-render, retouch or AI-alter. |
| `brand-assets/source/dielines/` | Flat pack artwork (`Wonder_<Variety>.png`, 1688×2212) | Source for botanical illustrations and the W monogram only. Back-panel text (ingredients, price, weight, badges) is **not** approved site copy. |
| `brand-assets/starter/` | Downloaded from the live Replit starter | `products/` superseded by mockups; `flavors/` = concept art with bare bars (OK); `lifestyle/` = client's real photos (old packaging); `campaign/` = AI-drawn packs → **never publish**. |
| Client WeTransfer | `~/Downloads/wetransfer_wonder-soap-packaging_2026-10-12_0039/Wonder_packagin_final/` (also has `.ai` vector files, the dieline `.ai`, fonts) | Copy new originals into `brand-assets/source/` and don't reference Downloads from code. |

Fonts: `Against` and `Abhaya Libre SemiBold` are in `src/fonts/`. Arial and Adobe Arabic from the client folder are not used on the web.

## Pipeline

`python3 scripts/prepare_assets.py` (Pillow with WebP) regenerates everything:
- `public/brand-assets/products/{lineup,<slug>}.webp`: hero ≤200 KB at 1800w, cards ≤80 KB at 960w
- `public/brand-assets/botanicals/<slug>.webp`: illustration cropped from the dieline, text and fold line removed, on white (display with `mix-blend-multiply`)
- `public/brand-assets/{flavors,lifestyle}/*.webp`: starter carry-overs, ≤150 KB
- `src/app/icon.png`, `apple-icon.png` (W monogram on paper), `opengraph-image.jpg` (1200×630 lineup)

Add new outputs by extending the script, so they stay reproducible. Every on-site image is WebP except the logo, favicon and OG image. `next/image` handles responsive sizes. Always pass a correct `sizes`.

Slugs everywhere: `coconut`, `aloe-vera`, `lemon`, `lavender`, `rose`. Dieline/mockup files use `Aloe`/`aloe`, and the script maps them.

Still needed from the client: logo SVG (the header uses the starter's text wordmark until then), the campaign video mp4 (`public/brand-assets/videos/wonder-bath-bubbles.mp4`, then set `home.film.src`), old-packaging photos, team photos.

## §6 AI campaign set: In the City verticals

**Goal:** 8–10 vertical campaign visuals featuring the **real** Wonder packaging, replacing or augmenting the weak London photos.

Scenes: 1 Shower, with model, foam, warm steam (page hero, also 9:16) · 2 Paris café table, Haussmann street · 3 Hotel marble vanity, towels, warm lamps · 4 Beach mat at golden hour · 5 London (red bus / Thames mood) · 6 Bathroom-shelf morning flat-lay with botanicals · 7 Spa/hammam: steam, stone, greenery · 8 Gift moment: hands, boxed bar, ribbon, no face. Assign varieties so **all 5 appear**. Repeat the bestseller (if the client names one) twice. The scene's botanical must match the featured bar.

**Packaging consistency (critical):**
1. Generate the scene with a plain unbranded box shape or empty placement space, at the final aspect ratio. **Never let the generator draw the pack.**
2. Composite the genuine mockup render into the scene in an image editor: match perspective, scale, contact shadow and reflections.
3. If an AI editor is used instead, feed the real pack as a locked reference, then compare pixel by pixel at 200%. Reject any output where "WONDER", "Beauty Bar", the variety name or the taglines differ.
4. QA each image: hands and fingers, pack text at 200%, botanical match, warm grade (no blue cast, natural skin).

**Formats:** masters at 4:5 (1600×2000) plus 9:16 for the shower hero. Web WebP ≤150 KB. Names: `/brand-assets/city/<scene>-<variety>.webp` (e.g. `paris-cafe-lemon.webp`). Keep prompts and layered source files under `brand-assets/source/city/` for reproducibility. Then add the entries to `src/content/city.ts`, replace the interim `home.city.visuals`, and confirm the disclaimer is on `/in-the-city`.

**Acceptance:** 8–10 verticals, all 5 varieties, naming followed · pack text exact at 200% · no anatomical artefacts · consistent warm grade across the set.
