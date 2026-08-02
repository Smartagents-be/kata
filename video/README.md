# SmartAgents Agentic Engineering, on video

Two Remotion pieces for the course, both 1920x1080 at 30fps, both on the kata's own design system.
`src/theme.ts` is a copy of the tokens in `front/src/index.css`, and both typefaces are the same
self-hosted variable files the app ships (`public/fonts/`), so nothing here loads from a CDN and the
videos and the product match.

- **`Promo`**, 45 seconds. What agentic engineering is, what a student learns, what a working
  session looks like from the inside, and where to go next. It is aimed at someone deciding whether
  to take the course or pay for it, so nothing in it assumes prior AI knowledge.
- **`KataAgenticJava`**, 80 seconds. The tour: what the repository is, what a unit reads like, what
  it draws, what it asks, what it builds against, and the whole path through it. It is aimed at
  somebody who has already decided to look, so it explains rather than sells.

They share a design system, a mark and a progress bar, and almost no other decisions. The promo cuts
on wipes and scale-pushes and generates every pixel in code; the tour crossfades and shows real
screenshots. Neither is a draft of the other.

## Commands

```bash
npm run dev                                                 # Remotion Studio
npm run lint                                                # eslint + tsc
npx remotion render Promo out/promo.mp4                     # 45s
npx remotion render KataAgenticJava out/kata-agentic-java.mp4   # 80s
npx remotion still Promo --frame=860 out/x.png
```

`out/` is gitignored.

## Structure

`src/Promo.tsx` and `src/course/Course.tsx` are the two pieces, each a list of scenes with every
duration inlined so it can be dragged in the Studio timeline. `src/Root.tsx` registers both
compositions plus every scene of both on its own, under `Scenes/` and `Course/`, so a scene can be
previewed and timed in isolation and double-clicking a sequence in a main timeline jumps to it.

| `Promo` scene | What it says |
| --- | --- |
| `Hook` | Software is learning to work |
| `Problem` | Answering is everywhere, doing is rare |
| `Learn` | Architectures, then tools and memory, then shipping |
| `Session` | An agent working a task list, start to finish |
| `Proof` | What a student comes out as |
| `Cta` | The mark, the line, the address |

| `KataAgenticJava` scene | What it shows |
| --- | --- |
| `Title` | The mark drawing itself, and the name |
| `Overview` | The curriculum and the service, side by side |
| `Lesson` | A real unit scrolling in a browser frame |
| `Training` | A trainer presenting the deck the units generate |
| `Figures` | Four of the figures the units are built around |
| `Indicators` | The three markers the prose drops inline |
| `Exercises` | One question, answered on screen |
| `Backend` | Three quality gates, red and then green |
| `Steps` | The whole syllabus, units and all |
| `Outcome` | What the course leaves you with |
| `Outro` | Learn it by building |

`src/layout.ts` holds the twelve-column grid every scene lays out against and the spring every
entrance uses, so a scene asks for `span(5)` rather than for a number of pixels.
`src/components/Motion.tsx` is the motion vocabulary: words arriving, blocks landing, the cursor,
the drifting grid, and the path helper that draws every connector, check and arc.
`src/components/ScalePush.tsx` is the custom transition, since Remotion ships no such presentation.
`src/components/Logo.tsx` is the SmartAgents mark from `smartagents.be/assets/logo.svg`, rebuilt
inline so it can draw itself; the original download sits at `public/smartagents-logo.svg`. Its
cyan-to-blue gradient is the brand's own and is the one thing here not restyled to the kata's teal.

`src/components/Chrome.tsx` is the tour's kit: the stage both pieces sit on, the browser frame, the
terminal, the flat card and the small mono eyebrow. `src/components/Icons.tsx` is the three legend
markers, path data taken verbatim from `front/src/shared/lib/icons.ts`. The promo calls only `Stage`
out of either file; everything else in them belongs to `KataAgenticJava`.

`src/components/ProgressBar.tsx` and `src/components/Watermark.tsx` are the two things that ride
over every frame of both pieces. The watermark is the copyright, bottom right, in a mid-grey that
holds up over the light scenes and the deep teal ones alike; it lives at the composition level, so a
scene previewed on its own does not carry one.

## The rules the promo is built to

They came in with the brief, and each one shows immediately when it is broken. **They are the
promo's rules, not the tour's**: `KataAgenticJava` crossfades, holds still, and puts real captures
on screen, and that is deliberate rather than a backlog of fixes. Do not apply this list to it.

- **Every asset is generated in code.** No emoji, no clip art, no stock icon, no screenshot. Every
  diagram is an SVG or a styled div that animates.
- **Every entrance is a spring**, at damping 13 and mass 0.6, from `SPRING` in `src/layout.ts`.
  Nothing fades linearly and nothing eases in and out.
- **No crossfade.** A cut is a horizontal wipe or a scale-push, nine frames. The scale-push brings
  the incoming scene to full opacity within three of those frames for exactly this reason.
- **Nothing below 28px.** Headlines start at 64px, body text at 36px.
- **Eighty pixel margins**, twelve columns, and nothing touching the frame edge.
- **No scene sits still.** The dot grid drifts under everything, the cursor blinks, the connectors
  pulse, the chips breathe.
- The bar along the bottom fills once across the whole video and reaches the end as the closing card
  lands. Both pieces carry one, from `src/components/ProgressBar.tsx`.

The tour keeps two of these and drops the rest. Every entrance there is the same spring, and no
scene sits completely still. Its cuts are half-second crossfades, its screenshots are real, and its
type runs below 28px where a terminal or a file path is meant to read as one.

## Writing

Titles and prose follow `.claude/skills/lesson-writing`, so two rules bite. **No em-dashes
anywhere**, and **do not announce the count**: no "three things you learn", no "two panels". Say the
things and let there be three of them. Headings are claims or plain labels, sentence case, short.

```bash
grep -rn '—\|–' src/     # must return nothing
```

## What these videos deliberately do not claim

**There is not a figure on screen anywhere in the promo.** No duration in weeks, no project count,
no pass rate. The course is still being written, and a number on a promo is a promise somebody then
has to keep. `Proof` says what a student comes out as and names what they get in kind, which stays
true whatever the syllabus settles at.

That rule holds for any scene added later. One that grows a hard commitment, a duration, a price, a
guaranteed unit list, either goes or carries a line saying it may change.

The tour does list every unit, which is exactly such a commitment, so `Steps` carries the line
saying so: "Steps, units and exercises are subject to change." If that list is edited, the line
stays.

**Neither piece shows a flag.** `Backend` prints the graded profile passing and the flags it earns
come out as `{••••••••}`, because what they say is the student's to find.

## The captures

`public/shots/` is real captures of the running frontend, taken with Playwright. `Lesson` scrolls
`patterns-full.png`, the whole unit page in one 2880x4458 image, inside a browser frame; `Figures`
shows four of the `fig-*.png` diagrams. The rest are unused and kept because recapturing means
starting the frontend and running a capture pass again.

Recapturing is also the only way those two scenes go stale: if `front/src/steps/step2/units/
patterns.html` is rewritten, the screenshot in the video is of the old one, and nothing in the build
will say so.
