# Plan 011: Resize the oversized unit screenshots and stop the layout shift

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **CONTENT RULE FOR THIS PLAN**: these screenshots are treated by the course
> as machine output. `front/src/steps/step1/CLAUDE.md` records that the usage
> readout image is deliberately **uncropped, promo line and all**: "tidying one
> is the same move as inventing one". Resizing (same frame, fewer pixels) is
> allowed; **cropping, annotating, retouching or reframing is not**.
>
> **Drift check (run first)**: `git diff --stat be5a6b2..HEAD -- front/public front/src/shared/components/UnitShot.tsx front/src/steps/step1/OneShotCompare.tsx`
> On changes, re-measure the images and re-read the two components before
> proceeding.

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: perf
- **Planned at**: commit `be5a6b2`, 2026-08-02

## Why this matters

Four PNGs in `front/public/` total ~1.45 MB and are decoded at roughly three
times the ~700 px prose column they render into. `UnitShot` renders a bare
`<img>` with no `width`/`height` and no `loading` attribute, so each image also
shifts the article as it lands, and everything is fetched eagerly.
`OneShotCompare` stacks the two largest (812 KB together) in one figure. On a
classroom network this is the slowest thing on the page.

## Current state

- Measured sizes at the planned-at commit (`ls -la front/public/*.png`):

  | File | Bytes | Pixels |
  |---|---|---|
  | `prompted-with-dribbble.png` | 625,928 | 2642x1610 |
  | `added-details.png` | 389,002 | 2000x1143 |
  | `walking-skeleton.png` | 232,868 | 2000x1140 |
  | `oneshot-prompt.png` | 203,107 | 2614x1292 |
  | `session-usage.png` | 87,196 | (leave as is — under threshold) |

- `front/src/shared/components/UnitShot.tsx:32-39` — the `<img>`:

  ```tsx
  <img
    id={`${id}-image`}
    data-component="UnitShot"
    src={src}
    alt={text(`${id}.alt`)}
    className="border-border w-full rounded-lg border"
  />
  ```

  Props are `{ id, src, namespace }`; callers pass them from step registries
  (two callers; find them with `grep -rn "UnitShot" front/src/steps`).
- `front/src/steps/step1/OneShotCompare.tsx` renders the two largest PNGs in a
  before/after figure (read the file before editing; the images are layered
  with a slider).
- Rendered width: the prose column is ~700 px; 1600 px assets cover 2x displays
  with margin.
- Platform: macOS — `sips` is available for lossless-pipeline resizing
  (`sips --resampleWidth 1600 <file>` resizes in place, preserving PNG format).
- Conventions: every rendered element keeps its `id` + `data-component`; captions
  and alt text come from locale keys and are not touched by this plan.

## Commands you will need

Run from the repo root unless noted.

| Purpose | Command | Expected on success |
|---|---|---|
| Measure | `sips -g pixelWidth -g pixelHeight front/public/<f>.png` | prints dims |
| Resize | `sips --resampleWidth 1600 front/public/<f>.png` | exit 0, file smaller |
| Build + lint | `cd front && npm run build && npm run lint` | exit 0 |

## Scope

**In scope**:
- The four PNGs listed above (resize in place; git history keeps the originals)
- `front/src/shared/components/UnitShot.tsx` (add `width`, `height`,
  `loading="lazy"`, `decoding="async"`)
- The `UnitShot` call sites (pass the new width/height values)
- `front/src/steps/step1/OneShotCompare.tsx` (same attributes on its imgs)

**Out of scope** (do NOT touch):
- `session-usage.png` and `favicon.svg`
- Any cropping, color, or content change to any image
- Locale files (alt/caption keys unchanged)
- `front/src/steps/step1/CLAUDE.md` and the captions' month lines

## Git workflow

- Branch: `advisor/011-optimize-unit-screenshots`.
- One commit: `perf: resize the unit screenshots and reserve their layout box`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Resize the four PNGs

For each of the four files: record the original dimensions, run
`sips --resampleWidth 1600`, record the new dimensions and byte size.

**Verify**: each file's `pixelWidth` → 1600; total bytes for the four under
~600 KB (expect roughly 50-70% reduction; PNGs of UI screenshots compress
well). **Visually open each image** and confirm text in the screenshots is
still legible at 100%: these are screenshots *of text*, and that is the quality
bar.

### Step 2: Reserve the layout box in `UnitShot`

Extend the props with `width: number` and `height: number` (required, not
optional — an optional dimension quietly reverts to layout shift), pass them
onto the `<img>` along with `loading="lazy"` and `decoding="async"`. The CSS
`w-full` still controls display size; the attributes set the aspect ratio.
Update both call sites with each image's new post-resize dimensions.

**Verify**: `cd front && npm run build` → exit 0 (the required props make any
missed caller a compile error — that is the point).

### Step 3: Same treatment in `OneShotCompare`

Add `width`/`height`/`decoding="async"` to both imgs. Keep the **base** layer
eager (`loading` unset) and set `loading="lazy"` only on the clipped overlay
image if the component's structure makes the overlay non-initial; if both load
together by design, lazy both and note it — read the component and decide from
its actual structure, recording the choice in the commit message.

**Verify**: `npm run build && npm run lint` → exit 0. `npm run dev`, open step
2's `evolution` unit and step 1's `context` unit: images render sharp, no
visible jank while scrolling to them.

## Test plan

No unit tests for asset sizing. Verification = the sips measurements, the
compile-time exhaustiveness of the new required props, and the two-page visual
check in Step 3.

## Done criteria

- [ ] All four PNGs at 1600 px wide; combined size ≤ ~600 KB; text legible
- [ ] `UnitShot` requires and renders `width`/`height`; both callers updated
- [ ] `loading`/`decoding` attributes present per Steps 2-3
- [ ] No image cropped or content-altered (same frame, fewer pixels)
- [ ] `npm run build`, `npm run lint` exit 0
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- Downscaled text in any screenshot becomes hard to read at the rendered size
  (then try 2000 px for that image; if still poor, leave that file at original
  resolution and say so).
- `sips` is unavailable (non-macOS executor) — report; do not `npm install` an
  image library into the app to compensate.
- A caller of `UnitShot` turns out to live somewhere unexpected (outside a step
  registry) — update it too, but name it in the report.

## Maintenance notes

- New screenshots should be added pre-sized to ≤ 1600 px wide; `UnitShot`'s
  required `width`/`height` props will remind whoever adds one.
- If the repo ever adopts AVIF/WebP variants, `UnitShot` is the single place a
  `<picture>` element would go; deliberately not done now (four images, PNG is
  fine at these sizes).
- The uncropped rule is recorded in `front/src/steps/step1/CLAUDE.md` and
  restated at the top of this plan; it survives this change and must survive
  the next one too.
