---
name: Agentic Java
description: A hands-on kata that teaches Java developers to work with coding agents, drawn as a calm technical lab notebook.
colors:
  warm-teal-paper: "oklch(0.984 0.004 190)"
  teal-black-ink: "oklch(0.24 0.014 200)"
  page-white: "oklch(1 0 0)"
  signal-teal: "oklch(0.567 0.1 184.994)"
  signal-teal-ink: "oklch(1 0 0)"
  cool-mist: "oklch(0.94 0.006 195)"
  cool-mist-ink: "oklch(0.26 0.012 200)"
  faint-paper: "oklch(0.972 0.004 190)"
  slate-muted: "oklch(0.52 0.008 200)"
  hairline: "oklch(0.9 0.006 195)"
  field-stroke: "oklch(0.86 0.006 195)"
  pass-green: "oklch(0.58 0.13 163)"
  pass-green-ink: "oklch(0.44 0.11 163)"
  fail-red: "oklch(0.577 0.245 27.325)"
typography:
  display:
    fontFamily: "Space Grotesk Variable, system-ui, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Space Grotesk Variable, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Space Grotesk Variable, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono Variable, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.12em"
  mono:
    fontFamily: "JetBrains Mono Variable, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "16px"
  pill: "26px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "2rem"
  gutter: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-teal}"
    textColor: "{colors.signal-teal-ink}"
    rounded: "{rounded.lg}"
    height: "2rem"
    padding: "0 0.875rem"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "oklch(0.5 0.09 184.994)"
    textColor: "{colors.signal-teal-ink}"
  button-outline:
    backgroundColor: "{colors.warm-teal-paper}"
    textColor: "{colors.teal-black-ink}"
    rounded: "{rounded.lg}"
    height: "2rem"
    padding: "0 0.875rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.slate-muted}"
    rounded: "{rounded.lg}"
    height: "2rem"
    padding: "0 0.875rem"
  badge-default:
    backgroundColor: "{colors.signal-teal}"
    textColor: "{colors.signal-teal-ink}"
    rounded: "{rounded.pill}"
    height: "1.5rem"
    padding: "0 0.625rem"
    typography: "{typography.label}"
  badge-success:
    backgroundColor: "oklch(0.58 0.13 163 / 0.12)"
    textColor: "{colors.pass-green-ink}"
    rounded: "{rounded.pill}"
    height: "1.5rem"
    padding: "0 0.625rem"
  card:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.teal-black-ink}"
    rounded: "{rounded.xl}"
    padding: "1rem"
  field:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.teal-black-ink}"
    rounded: "{rounded.lg}"
    padding: "0.5rem 0.75rem"
    typography: "{typography.mono}"
---

# Design System: Agentic Java

## Overview

**Creative North Star: "The Lab Notebook"**

This is the interface of a precise, quietly technical workspace: a lab notebook a
Java developer keeps open while they learn to direct a coding agent. Everything on
the page is either something the student *reads* or something the *machine produced*,
and the design's whole job is to keep that line sharp. Warm paper neutrals carry the
prose; a single muted teal marks every live signal (the next action, the active step,
where you are, the focus ring); and monospace type marks every reading the machine
gave back (a count, a flag, a catalogue title, a curl line). Nothing is decorative.
The craft is in the restraint.

The system is precise and restrained. It commits to flatness the way a printed page
does: surfaces are separated by a hairline border, never a shadow, and depth is spent
only on the few things that genuinely float (a settings sheet, a dialog). It commits
to one accent, so teal never has to compete with a second color for the eye. And it
commits to two typefaces doing one job each, so a student can tell prose from output
without reading a word. The result should feel exact, calm, and confident, closer to
a well-set technical manual than to a dashboard.

The anti-reference is the clinical SaaS dashboard: cool grey fills, drop-shadowed
cards floating on a darker grey, a rainbow of accent colors each meaning something
different, gradient buttons. This system rejects all of it. Neutrals are faintly
*warm* (a teal undertone, not grey), cards sit flat on the page, and color is
rationed to three jobs only.

**Key Characteristics:**

- One muted teal for every "live" signal; nothing else borrows it.
- Two typefaces as a semantic split: Space Grotesk for what is read, JetBrains Mono for what the machine produced.
- Flat by default: separation is a 1px hairline border, not a shadow.
- Faintly warm teal-tinted neutrals, never clinical grey.
- Green means passed and red means failed, and those two colors mean nothing else.

## Colors

A warm, paper-toned neutral field with one muted teal accent and a strict two-color
result vocabulary. Every neutral carries a faint teal undertone (hue 190–200, chroma
under 0.015) so the page reads warm rather than grey.

### Primary

- **Signal Teal** (`oklch(0.567 0.1 184.994)`): The one accent that does the heavy lifting. It marks the primary action, the active step, the active unit, the current language, and the focus ring. It is deliberately muted (chroma 0.1, not a vivid teal) so it reads as considered rather than loud. Its rarity on any given screen is the point.

### Neutral

- **Warm Teal Paper** (`oklch(0.984 0.004 190)`): The page background and sidebar. The "paper" of the notebook.
- **Page White** (`oklch(1 0 0)`): Pure white, reserved for cards and fields that sit on the paper so a raised writing surface reads as slightly brighter than the page around it.
- **Teal-Black Ink** (`oklch(0.24 0.014 200)`): Primary text. A near-black with a trace of teal, never pure `#000`.
- **Slate Muted** (`oklch(0.52 0.008 200)`): Secondary text, captions, inactive nav, eyebrow sub-labels.
- **Cool Mist** (`oklch(0.94 0.006 195)`): Secondary/accent fills — the resting background of a ghost button on hover, a secondary chip, inline-code chips.
- **Faint Paper** (`oklch(0.972 0.004 190)`): Muted panels and self-learning asides, a half-step down from the page.
- **Hairline** (`oklch(0.9 0.006 195)`): Every border and divider. The primary tool for separating surfaces.
- **Field Stroke** (`oklch(0.86 0.006 195)`): The slightly darker stroke on a typed input, so an editable field reads as editable at rest.

### Result vocabulary (do not extend)

- **Pass Green** (`oklch(0.58 0.13 163)`) / **Deep Pass Green** (`oklch(0.44 0.11 163)`): Passed, and only passed. The lighter green tints a verdict panel at ~10–12% opacity; the deep green is the ink that stays readable on that tint. Two values exist because the tint color is not the text color.
- **Fail Red** (`oklch(0.577 0.245 27.325)`): Failed, and only failed. Also the invalid-field signal.

### Named Rules

**The One Voice Rule.** Signal Teal is the only accent. If a new element needs to
signal "act here" or "you are here", it uses teal; if it needs anything else, it uses
a neutral. Never introduce a second accent hue to distinguish two kinds of importance.

**The Two-Color Verdict Rule.** Green and red mean passed and failed and nothing else.
Do not reach for green to mean "new" or red to mean "warning"; a status that is neither
a pass nor a fail is carried by a neutral panel.

**The Warm-Neutral Rule.** No pure grey. Every neutral carries the faint teal undertone
(hue ~190–200). A `#808080` anywhere in the system is a bug.

## Typography

**Display / Body Font:** Space Grotesk Variable (with `system-ui`, `-apple-system`, sans-serif)
**Label / Mono Font:** JetBrains Mono Variable (with `ui-monospace`, monospace)

**Character:** The pairing *is* the information architecture. Space Grotesk is a warm,
slightly geometric humanist sans that carries everything a person reads. JetBrains
Mono carries everything a machine produced. Both are self-hosted variable fonts; the
system loads nothing from a CDN.

### Hierarchy

- **Display** (Space Grotesk, 600, ~1.5rem, line-height 1.25): Section and unit headings inside prose (the `<h2>` a unit is built around).
- **Title** (Space Grotesk, 500–600, 1–1.125rem): The app title, card titles. Tight tracking (`-0.01em`).
- **Body** (Space Grotesk, 400, 0.875rem, line-height 1.6): All lesson prose and UI copy. Prose runs at a comfortable reading measure inside the main column.
- **Label / Eyebrow** (JetBrains Mono, 500, 0.75rem, uppercase, letter-spacing 0.12em): The small mono label above a heading — `01 · FOUNDATIONS`, `Question 2 of 3`, `THE SERVICE`. Color is left to the caller: teal for a section eyebrow, muted for a sub-label.
- **Mono** (JetBrains Mono, 400, 0.75–0.875rem, tabular-nums for figures): Every machine reading — counts, step numbers, flags, catalogue titles, code, and the text inside every typed answer field.

### Named Rules

**The Machine-Mono Rule.** If the string was produced or checked by a machine — a
count, a step number, a flag, a catalogue title, code, or what a student types as a
graded answer — it is set in JetBrains Mono. If a person wrote it to be read, it is
Space Grotesk. The typeface is the signal; never override it to "look nicer".

**The Eyebrow Rule.** A section is introduced by a mono, uppercase, letter-spaced
eyebrow above its heading, not by a larger heading. Reach for the `eyebrow` utility
rather than rebuilding the four classes.

## Layout

A single centered column, `max-width: 72rem` (`max-w-6xl`), gutter `1.5rem`
(`px-6`). Inside it, a two-part body: a sticky `14rem` (`w-56`) left sidebar holding
the step navigation and the catalogue link, and a fluid main column holding the unit.
The gap between them is `2.5rem` (`gap-10`).

The header is sticky, hairline-bordered on the bottom, with a translucent
`background/85` and a backdrop blur, so prose scrolls under it without a hard edge.
The sidebar is independently scrollable and capped at `calc(100svh - 5rem)` and
`self-start`, so a long curriculum scrolls inside the sidebar rather than pushing the
page. Spacing rhythm follows the Tailwind 4px base; card interiors use a
`--card-spacing` of `1rem` (`0.75rem` in the small variant).

At narrow widths the sidebar-plus-column layout is expected to stack, with the step
navigation collapsing above the unit; the reading column keeps its comfortable
measure rather than stretching edge to edge.

## Elevation & Depth

**Flat by default.** This system conveys separation with a 1px hairline border, not a
shadow. A card is marked out by its edge alone. Shadows exist but are rationed: there
are three real steps, built from one teal-black (`oklch(0.2 0.01 200)`) at four low
opacities, so every elevation reads as the same light.

### Shadow Vocabulary

- **Hairline** (`box-shadow: 0 1px 2px oklch(0.2 0.01 200 / 0.08)`): The faintest lift; rarely needed since a border usually does this job.
- **Raised** (`box-shadow: 0 1px 2px oklch(0.2 0.01 200 / 0.05), 0 6px 16px oklch(0.2 0.01 200 / 0.06)`): A surface that sits just above the page.
- **Overlay** (`box-shadow: 0 10px 24px oklch(0.2 0.01 200 / 0.1), 0 28px 56px oklch(0.2 0.01 200 / 0.13)`): Reserved for things that genuinely float — the settings sheet, dialogs.

### Named Rules

**The Flat-Page Rule.** Content surfaces (cards, panels, fields, nav) are flat: a
hairline border, no shadow. A shadow is a claim that the element is floating above the
page, and only an overlay (sheet, dialog) is allowed to make that claim.

## Shapes

Softly rounded, consistent, never sharp. Radius derives from one base of `0.625rem`
(10px): fields and buttons at `lg` (10px), cards and verdict panels at `xl` (16px),
inline-code chips at `sm` (6px), and badges/pills at the full `pill` (26px), which
reads as a lozenge. Borders are always the single `Hairline` weight (1px); there are
no heavy or double borders, and no decorative corner treatments. The one recurring
silhouette is the pill: badges and status chips are fully rounded, which sets them
apart from the gently-rounded rectangles of everything structural.

## Components

### Buttons

- **Shape:** Gently rounded (`10px`, `rounded-lg`), compact height (`2rem` default), horizontal padding `0.875rem`. Icon + label gap `0.5rem`.
- **Primary:** Solid Signal Teal on white ink (`bg-primary text-primary-foreground`). At most one per view — the single most important next step.
- **Hover / Focus:** Primary hover *darkens* the teal (`color-mix` toward black 12%) rather than fading it, because a fade on a light page reads as disabled. Focus paints a 3px teal ring (`ring-ring/50`) with a matching border. Active state nudges down 1px (`translate-y-px`) for a tactile press.
- **Outline / Ghost / Secondary:** Outline is a hairline-bordered paper button; ghost is transparent until hover, when it takes a `Cool Mist` fill; secondary is a `Cool Mist` fill at rest. Destructive is a tinted red (`bg-destructive/10 text-destructive`), never a solid red fill.

### Badges / Chips

- **Style:** Fully rounded pill (`26px`), height `1.5rem`, mono-weighted small text. Default is solid teal; `secondary` is Cool Mist; `success` is a Pass-Green tint (`bg-success/12`) with deep-green ink; `destructive` is a red tint; `outline` is hairline-bordered.
- **State:** Variant is carried on `data-variant`; a status chip keeps one stable `id` and moves its meaning to `data-state`, so a test can find it before knowing what it says.

### Cards / Containers

- **Corner Style:** `16px` (`rounded-xl`).
- **Background:** `Page White` on the `Warm Teal Paper` page.
- **Shadow Strategy:** None. A hairline `Hairline` border only (see Elevation).
- **Footer:** When present, a `Faint Paper` footer band with a top hairline, set in mono at `0.75rem` muted — the "machine" strip of a card.
- **Internal Padding:** `1rem` (`--card-spacing`), `0.75rem` in the small variant.

### Inputs / Fields

- **Style:** The `field` utility — monospace text (what goes in is code), `Page White` background, `Field Stroke` border, `10px` radius, `0.5rem 0.75rem` padding. Monospace because the answer is machine-graded.
- **Focus:** The border shifts to teal and a 3px teal ring appears (`ring-ring/25`). Every field in the system shares this one focus signal, so a keyboard user follows a single cue.
- **Verdict:** On submit, a result panel appears below at `16px` radius: a Pass-Green tint with deep-green ink and a check icon on pass, a Fail-Red tint with red ink and an x icon on fail. Detail lines are set in mono. The panel carries `data-state="passed" | "failed"`.

### Navigation (the Stepper)

- **Style:** Steps are drawn as a vertical stepper — a numbered mono bead (`01`, `02`, …) on a connecting rail, with the active step's units listed beneath it. The rail tells a student how far along they are without counting.
- **States:** The active step's bead is solid teal; inactive beads are `Faint Paper` with a hairline ring and muted ink. The active step title is teal and semibold; inactive titles are muted and brighten to ink on hover. An active unit link takes a soft teal wash (`bg-primary/10 text-primary`); inactive unit links are muted with a `Cool Mist` hover.
- **Signature detail:** A collapsed step shows its page count in mono directly under the title, so title and count read as one target.

### Toggles / Switch

- **Style:** A small pill track; `Field Stroke` when off, Signal Teal when on, with a white thumb. Used for the guided/self-learning and language settings behind the header cogwheel.

### Signature: The Flag Board

The step-2 capstone renders a set of flag rows graded in the browser against a salted
hash. Each row keeps a stable `id` (`flags-item-N`) and carries its status on
`data-state="solved" | "locked"`: a solved flag reveals its leetspoken
`{…}`-wrapped code in mono with a Pass-Green treatment; a locked one stays neutral.
It is the clearest expression of the whole system — machine output in mono, one
teal-or-green signal, flat rows separated by hairlines.

## Do's and Don'ts

### Do:

- **Do** keep Signal Teal as the only accent, on ≤10% of any screen — the primary action, the active step/unit, the current language, the focus ring.
- **Do** set every machine-produced string (counts, step numbers, flags, catalogue titles, code, typed answers) in JetBrains Mono, and everything a person reads in Space Grotesk.
- **Do** separate surfaces with the single 1px `Hairline` border; reserve shadows for the settings sheet and dialogs.
- **Do** give every field the shared `field` utility so focus paints the same 3px teal ring everywhere.
- **Do** keep neutrals faintly warm (teal undertone, hue ~190–200).
- **Do** introduce a section with a mono uppercase `eyebrow`, not a bigger heading.
- **Do** darken teal on hover for a solid teal button; a fade reads as disabled.
- **Do** carry a component's variant on `data-state` / `data-variant` while keeping one stable `id`, and pair every rendered element with an `id` (BEM, kebab-case) and a `data-component`.

### Don't:

- **Don't** add a second accent color to rank importance; use teal or a neutral.
- **Don't** use green or red for anything other than passed and failed.
- **Don't** put a pure grey (`#808080`, any neutral with no teal undertone) anywhere.
- **Don't** float a content card on a drop shadow; flat with a hairline is the resting state.
- **Don't** set prose in mono or machine output in the sans — the typeface is the signal.
- **Don't** load a webfont from a CDN; both faces are self-hosted variable fonts.
- **Don't** ship dark mode as a user-facing theme; the dark tokens exist only to keep the generated `dark:` variants coherent, and nothing in the UI switches to it.
