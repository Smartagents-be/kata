# CLAUDE.md — the frontend

Guidance for `front/`, the React + Vite app that owns the curriculum and renders it. It loads when
you work with files under this directory; the root `CLAUDE.md` carries what applies to the whole
repo, including the prohibitions that protect the student exercises.

The layout is in the root file's `## Layout`, so it is not repeated here.

## The presentation deck

`shared/deck/` plus `shared/routes/PresentationPage.tsx` are what the tutor puts on the board.
Reached from the cogwheel, left with Escape, at `/present`.

**The slides are presenter material, and deliberately not a second rendering of the curriculum.**
They do not iterate `reading` from `@/steps` and paint unit prose onto a slide, and they should not
start. A student can read a unit themselves, so a deck that mirrored one would be a worse copy of a
page they already have. What belongs here is what only works out loud.

**The figures are the one exception, and it is deliberate.** A slide's drawing is the step's own
figure component, rendered exactly as the unit renders it, so a room looking up at the projector and
down at their own screens sees one drawing rather than two that have drifted. That is reuse of a
figure, not of prose, and the rule above is unchanged. Some figures are kept off the slides for a
reason worth remembering: every `TaskCard` and `FlagBoard` writes progress to localStorage, so on a
slide they would tick the *tutor's* machine. That is a rule rather than a list, since a step gains a
card more often than the deck gains a slide.

**A slide is data, not JSX.** `SlideSpec` in `shared/deck/slide-spec.ts` is the shape, a step
authors a list of them, and `SlideTemplate` renders every one. Adding a slide is adding an entry:
`index` and `total` fall out of the array position, so there is no `TOTAL` to keep in step and no
renumbering of everything after an insertion. `kind` is `divider`, `figure` or `statement`, and all
it decides is how loud the heading is and what sits under it.

**Placement is two values, not three, and the split is what the slide is competing for.** A
`divider` and a `statement` are only their text, so they take `golden` and land exactly where the
opening question does, eyebrow on 180px and the h1's top edge on the division at 255px. A `figure`
slide is competing for room, so its heading takes `top` at 80px higher and every one of those pixels
goes to the drawing. The masthead still holds still *within* a run of figure slides, which is what
`top` is for; it steps once when the deck turns from talking to showing.

Two smaller decisions in the same area. Emphasis inside a heading is marked up **in the message**
and mapped in `SlideTemplate`, and the whole vocabulary is two tags, `<hi>` for teal and `<mute>` for
a term set back; a tag the template does not know renders as literal text on the slide, which is how
`<vibe>`/`<agentic>` on the opening question got normalised onto these two. And a step's slide text
lives in **that step's** namespace rather than `ui`, because `i18n.ts` types Dutch as
`Record<MessageKey, string>` and a `ui` key with no Dutch is a build failure; only the deck chrome
and the cross-step opening slide stay in `ui`.

`SlideFigure` is what makes the reuse work. A page figure is built for a prose column (the SVG ones
cap at `max-w-xl`, the DOM ones are sized in rem, which the fixed canvas knows nothing about), so it
is **magnified with a transform** rather than restyled, which handles both kinds identically and
touches no figure. That is also the engine's own move: it scales the whole 1920x1080 canvas as one
unit. `scale` is per slide, fitted so the figure fills about 95% of the room left under the heading.
The two arbitrary variants in there earn their place: `[&_figure]:my-0` drops the `my-8` a figure
carries for prose flow, and `[&_svg]:max-w-none` lifts the cap so the drawing fills its box before
being magnified.

One bug that transform exposed, fixed in `shared/components/ConnectBoard.tsx` rather than in the
deck: the board measures anchors with `getBoundingClientRect` (post-transform) and draws them into
an overlay `<svg>` that has no `viewBox` and is therefore addressed in layout pixels
(pre-transform). On a unit page those are the same number. Under a scaled ancestor every line
overshot its target by exactly the scale factor. `scaleOf()` divides it back out, and is a no-op
wherever there is no transform, which is why the correction belongs in the board and not in the
caller that happens to magnify it.

`shared/deck/deck-stage.js` is **vendored verbatim** from the smartagents-website repo
(`secured/presentations/shared/deck-stage.js`, commit dbdce4ae), and is the same engine every other
deck of theirs runs on. What was not wanted from there is the Eleventy and Nunjucks templating, so
the slides are React and the engine is not. **Do not edit the copy**: it is byte for byte identical
so it can be re-synced, and everything we want different is done from the outside. It carries its
own provenance note and its types in `deck-stage.d.ts`, which is also what lets `tsc -b` resolve the
import (the app tsconfig has no `allowJs`), and which declares the element in JSX. `.oxlintrc.json`
ignores it rather than have it reformatted.

Four things about driving it from React are not obvious:

- **Every direct element child of `<deck-stage>` is a slide.** The exit control is a sibling of the
  element, never a child. `DeckSlides` returns a fragment for the same reason: a fragment renders no
  DOM, so the sections land as the element's own children.
- **`no-rail` is load-bearing.** The rail is a thumbnail sidebar whose right-click menu deletes and
  reorders slides by mutating the DOM directly, and that DOM is React's. Enabling it also walks
  every rule of `document.styleSheets` to clone author CSS into each thumbnail's shadow root, which
  against Tailwind's output is not cheap. The attribute makes `_enableRail()` return early, so none
  of it is ever built.
- **The engine sets `color` and `font-family` on its own shadow host**, and a value set on the host
  beats one inherited into it, so a slide gets white system-font text unless the host is given
  `text-foreground font-sans`. Its canvas is also hard white and lives in the shadow root where
  document CSS cannot reach it, so the ground colour is painted on the slide, which covers the
  canvas edge to edge.
- **It leaves two things in the document that this app outlives.** It appends a print rule pinning
  every page to 1920x1080 and never removes it, and it rewrites the URL on every slide with a null
  history state, which drops React Router's bookkeeping. `PresentationPage` puts both back. Both
  are guarded so StrictMode's remount, which leaves the element in place and does not re-run
  `connectedCallback`, does not undo them for good.

Slide type is written in px, not Tailwind's rem scale: the canvas is a fixed 1920x1080 scaled as one
unit, so an 84px heading is 84px, and rem would track a browser font-size the canvas does not. The
sizes follow the scale the tutor's other decks use, documented in that repo's
`.claude/commands/new-presentation.md`, which is also where the footer-clearance rule comes from.
`Slide` reserves 88px at the foot for the footer and nothing else may sit in it.

Vertical placement is `align`, and the third value is the one with an argument behind it. `top` pins
a heading so it does not move across a run of content slides, `center` is for a divider with no
title, and `golden` sits a single statement high, because dead centre reads as a placeholder.
**What lands on the golden division is the title itself**, not the block around it: the h1's top
edge sits on 1080/phi^3, 255px, and the frame's 180px is that number less the eyebrow above it (a
35px mono line plus its 40px gap). So the padding assumes the shape these slides have, an eyebrow
and then the title, and a `golden` slide without an eyebrow starts 75px higher than intended. It is
a number rather than a nudge precisely so the next slide of that kind lands in the same place. The
opening question uses it, and it is one sentence and nothing else: the line under it telling the
room to answer in one sentence was removed, because a tutor says that out loud and a slide that
scripts them is a slide they read from.

The deck asks for `golden` and `top`; `center` is capability rather than current practice, since
every divider here carries a title and a centred one drifts with its own line count. It is kept
because the arithmetic behind all three belongs in one place.

## The design system

The look comes from a design system authored outside this repo (a Claude Design project, file
`Educational Design System v3.dc.html`) and lives here as tokens in `front/src/index.css`. Nothing
else holds a colour: components name tokens, so a change to the palette is a change to one file.

- **One teal does the heavy lifting.** `--primary` marks the primary action, the active step, the
  active unit, the current language and the focus ring. Neutrals carry a faint teal undertone, so
  surfaces read warm rather than clinical grey. `--success` means passed and `--destructive` means
  failed; nothing else borrows them. `--success` tints a panel and `--success-foreground` is the
  darker ink that stays readable on that tint, which is why there are two. The one exception to the
  light UI is the header: `--header` is the single dark surface, with `--header-foreground` white
  ink. It is a band, not a bar, and the app rides in one white card that overlaps it. A finished
  unit's self-learning note is a teal left-rule callout (`aside[data-audience="self"]`); every other
  aside is a muted panel, whether it is a teacher note or carries no audience at all, so an aside
  meant for everybody needs no attribute and still reads as an aside. One aside is louder than that:
  `aside[data-variant="warning"]` is the hazard shape, an amber panel with a triangle in the gutter,
  and there are three: `step1/tools`'s prompt-injection note, `step2/setup`'s, and the one in
  `step2/parallel` on running too many agents at once. Amber is the caution colour and it was
  already the coin's, so a warning panel and a cost tip share a hue on purpose; `--success` and
  `--destructive` stay reserved for passed and failed. The triangle is drawn by `index.css` from the
  `--warning-triangle` mask rather than written into the prose, because it is the callout's shape
  rather than part of the sentence, and a translation that dropped it would drop the warning.
- **Every route change starts at the top.** The window keeps its scroll position across a
  navigation, so `AppShell` sends it back to 0 whenever the pathname changes; without it the pager
  at the foot of a long unit drops you into the middle of the next one. A location carrying a hash
  is exempt, or the browser's anchor jump would be undone the moment it landed (`context` links to
  `#entropy`).
- **The two-column shell is an `lg` thing, and below that the sidebar is not a sidebar.** The card's
  `248px` nav column, its wide gap and its wide padding all start at `lg`; under it the card is one
  column, the nav stacks above the article, and it collapses behind a chevron because the whole
  curriculum otherwise pushes the unit off the screen. Following a link closes it again. Two things
  there are load-bearing: the nav's `sticky`, `max-h` and `overflow-y` are `lg:`-prefixed, or
  stacked it would pin itself over what you navigated to; and the column is `grid-cols-1` by
  default rather than a fixed track, or `#app-main` collapses to zero width and every unit
  disappears. Long inline `<code>` breaks anywhere and a `<pre>` scrolls in its own box (both in
  `index.css`), since a fully qualified property name has nothing to wrap at.
- **Two typefaces, and the switch between them is the signal.** Figtree for everything a
  student reads, JetBrains Mono for anything the machine produced: code, counts, flags, catalogue
  titles, step numbers. Both are variable fonts imported in `index.css`; nothing loads from a CDN.
- **The interface stays nearly flat.** Separation is a 1px border, not a shadow. `--shadow-*` has
  three real steps (hairline, raised, overlay) drawn from one teal-black at four opacities, and
  depth is reserved for things that genuinely float: the settings popover, dialogs, tooltips. The
  first two take the overlay step and the tooltip takes the raised one, because it is a label rather
  than a surface you work in. The tooltip's edge is an `outline` and not a `border`, and that is
  load bearing rather than a preference: its arrow overlaps the panel edge and paints out the line
  behind itself, which only works if there is an outline for it to sit on top of. Turning it into a
  border draws a seam across the base of the point. The reasoning is repeated in `ui/tooltip.tsx`,
  which is also where the component's Skiper UI provenance is recorded.
- **Two utilities carry the repeated shapes.** `eyebrow` is the small mono uppercase label above a
  heading, colour left to the caller (teal for a section, muted for a sub-label). `field` is a
  typed answer box: mono, hairline border, and the same 3px teal focus ring on every field, so a
  keyboard user has one signal to follow. Reach for these instead of copying the class list.
- **A numbered figure and the prose about it share one span.** `<span data-marker>2</span>` is a
  teal numeral, styled by one unlayered rule in `index.css` so it looks the same inside `.prose` and
  inside a `not-prose` figure. That is the point of it: the numeral beside a row in `ProjectTree`
  and the numeral in the paragraph are one label rather than two decorations. A figure that numbers
  its rows carries the data (`marker` on a `TreeNode`), and the prose points back with the span.
- **Typography's own grey ramp is overridden**, not used: `.prose` in `index.css` points
  `--tw-prose-*` at the tokens, which is why `StepContent` renders `prose` without `prose-neutral`.

Dark mode is defined for coherence, since `dark:` variants are scattered through the generated
`ui/` primitives, but **nothing in the app switches to it**. The presentation deck did, scoped to a
wrapper, and that was removed: one palette on the projector and on the page is the decision, so the
slides cannot drift out of step with the design system. Do not put it back. Two things to know if
you ever do reach for the `.dark` block. `--header` and `--header-foreground` are absent from it, so
a dark surface has to be built on `--background`; and `@custom-variant dark` resolves to
`&:is(.dark *)`, so `dark:` variants match *descendants* of the element carrying the class and never
the element itself.

## Naming what is on the page

Every element a component renders carries two attributes: an `id` naming the thing, and a
`data-component` naming the React function that rendered it. Between them, anything visible on
screen can be pointed at from a test, a screenshot review, or a message in class, without anybody
counting divs.

```tsx
<label
  id={`quiz-question-${index}-answer-${answerIndex}-label`}
  data-component="Question"
>
```

**The id is BEM, written in kebab-case.** Block first, then the element inside it, then the part:
`quiz`, `quiz-title`, `quiz-question-0-legend`. The block is the component's own name for itself
(`quiz`), not its React class name, so an id stays put when the component is renamed or split.
Modifiers, when a variant genuinely needs its own hook, are appended the same way:
`quiz-submit-disabled`.

**Anything rendered in a loop carries its index**, zero-based, straight after the element it
repeats: `quiz-question-2`, `quiz-question-2-answer-0-label`. Nested loops each add their own
index in order, which is what keeps `answer-0` of one question distinct from `answer-0` of the
next. Never index by array position of something that gets reordered without remounting; the
quiz shuffles once per mount, so display order is stable and the index is honest.

**`data-component` is the exact component**, including private subcomponents inside the same
file. `QuizPanel` renders the section and the submit button, so those read `QuizPanel`; the
`Question` function below it renders the fieldset and its labels, so those read `Question`. When
a shadcn primitive from `ui/` is used, the attribute names the caller, since that is the
component whose behaviour you are looking for.

**A shared component that a step renders more than once takes its block from the caller.**
`TaskCard`, `ConnectBoard` and step 2's `FlagBoard` all have a `block` prop, so `harness`'s task is
`#cut-it-up-*`, `model`'s board is `#pick-the-tier-*` and `setup`'s is `#setup-flags-*` while each
carries the shared component's name in `data-component`. That is the two attributes doing what they are for: the id says which thing on
which page, and `data-component` says whose code to open when it misbehaves. The step-side wrapper
holds the data and the reasons for it, so it renders no elements of its own and never appears in the
DOM. `UnitShot` is the same shape with the prop called `id`, since a screenshot has no wrapper to
hold its data: the registry passes the block, the image path and the namespace straight in, so
`evolution`'s shots are `#walking-skeleton-*` and `model`'s is `#usage-readout-*`.

Every component in `front/src/` follows this, `QuizPanel.tsx` included. Only three things are
exempt: the generated primitives in `shared/components/ui/`, which are styled wrappers rather than
components in their own right; `App.tsx`, which renders routes and no elements; and an id that has
to be unique per *instance* rather than per component, such as the `aria-labelledby` target in
`ContextDiagram` that comes from `useId()`.

A component that renders one of several variants keeps one id and puts the variant on
`data-state`: a `FlagRow` is always `#flags-item-N` with `data-state="solved" | "locked"`, and
`CatalogPanel` is always `#catalog` with the fetch's phase on it, so a test can find the thing
before knowing what it will say.

## The audience rule

Any element in step HTML may carry `data-audience`:

```html
<aside data-audience="self">Hint: ask whether it would survive a /clear.</aside>
<p data-audience="guided">Your teacher will walk through this on the board.</p>
```

`"self"` shows only in self-learning mode, `"guided"` only in class, and **no attribute
means always visible** — that is the common case, so reach for the attribute only when
material genuinely belongs to one audience.

**Guided mode goes further: it drops every run of prose, whatever its audience attribute says.**
In class the teacher does the telling, so a unit page keeps only its figures, its quiz and its
board, and above each figure the nearest heading before it, so a page of drawings stays organised.
That heading usually lives inside the self-audience wrapper, so `prepareUnit` moves it out to sit
directly above the figure marker before the audience pass runs; a heading titles at most one
figure, and a figure with no heading before it (a lead figure) gets none. Quizzes and boards come
from the registry and were never in the HTML to begin with. The per-element filter above still
matters for self mode, and a `data-audience="guided"` paragraph is now prose that nobody sees.

`prepareUnit` in `front/src/shared/lib/content.ts` *removes* non-matching elements from the
parsed document rather than hiding them. Keep it that way: text that is merely
`display: none` is one devtools panel away during a lesson. The same pass then applies the
`data-i18n` translations and cuts the result at the `data-figure` markers. What comes out is
rendered with
`dangerouslySetInnerHTML`, which is safe only because the HTML is first-party and committed
here — sanitise first if content ever arrives from an API, a user, or an LLM.

A unit whose *whole* prose belongs to one audience wraps it in a single
`<div data-audience="…">` rather than tagging every paragraph. `step1/context` does this: in class
the teacher works through it at the board, so the page keeps only the diagram and the quiz, both
of which come from the registry and are outside the HTML. Two consequences worth knowing.
`StepContent` renders `null` when nothing survives filtering, so an empty article does not take a
gap in the page. And the wrapper becomes Typography's first child, which is why the unlayered
`.prose > div[data-audience] > :first-child` rule at the bottom of `index.css` exists; inside
`@layer base` the plugin's own layer would beat it whatever its specificity.

Mode lives in `front/src/shared/mode/`, defaults to guided, and persists under the
`kata.mode` localStorage key.

## The assistant rule

The same shape a second time, on `data-assistant`, for the places where the instruction genuinely
differs between the two products a student might be sitting in front of:

```html
<p data-assistant="claude">Put it in <code>CLAUDE.md</code>.</p>
<p data-assistant="copilot">Put it in <code>.github/copilot-instructions.md</code>.</p>
```

`"claude"` is Claude Code, `"copilot"` is GitHub Copilot, and **no attribute means both**, which is
almost everything: context windows, tokens, decomposition and the rest of the curriculum are about
working with an agent rather than about a vendor. Reach for the attribute only where a student on
the other product would be told something untrue, typically a filename, a command or a menu. It is
filtered in the same pass and the same way as the audience, non-matching elements removed rather
than hidden.

**Every element of a variant set carries the attribute and a `data-i18n` key whose last segment is
the same word.** Both siblings are suffixed; there is no "bare means Claude". A set occupies one
position in the numbering, so `…1.claude` and `…1.copilot` are both paragraph 1 and adding a variant
later renumbers nothing after it:

```html
<p data-assistant="claude" data-i18n="session.window-not-memory.1.claude">…<code>CLAUDE.md</code>…</p>
<p data-assistant="copilot" data-i18n="session.window-not-memory.1.copilot">…<code>.github/copilot-instructions.md</code>…</p>
```

That is greppable, and more importantly it fails safe. A missing Dutch translation of a Copilot
block leaves the **English Copilot** text on the page and names the key in the console, the way any
untranslated paragraph does. The rejected alternative, one shared key resolved per assistant inside
`useStepText`, can put the **Dutch Claude** paragraph under a Copilot heading and never warn, because
`i18n.exists` is true for the base key. Do not build it.

Three rules keep the two filters from breaking each other, and each of them fails silently if you
get it wrong:

- **Never put `data-audience` and `data-assistant` on the same element.** It would render for one
  reader in four, with nothing warning about the other three. Nest the assistant variants inside the
  existing `div[data-audience]` wrapper instead, which is what `step1/context` does. There is also
  no `.prose > div[data-assistant]` first-child rule in `index.css`, so a whole-unit assistant
  wrapper would ship a stray top margin; per-paragraph is the shape.
- **A `data-figure` marker is always a direct child of the body and is never wrapped.** Only
  top-level markers are cut into segments, so a wrapped one silently renders as an empty div and the
  figure vanishes for that reader only. If a figure ever has to be assistant-specific, put the
  attribute *on the marker itself*.
- **The console only audits the page you are looking at**, since both filters run before the
  translation pass. Auditing a unit's Dutch now means four passes, two modes by two assistants.

Assistant lives in `front/src/shared/assistant/`, defaults to Claude Code and persists under the
`kata.assistant` localStorage key. Two decisions in there are worth keeping. It is **its own
setting rather than a third locale**, because which assistant you use and which language you read
in are unrelated, and a Dutch student on Copilot should not have to give one up to get the other.
And the two product names are **written in the module, not in the locales**, for the same reason
`English` and `Nederlands` are: a product name is not translated, so only the section heading above
the list is.

**A label inside a figure or a task card is not reachable from the HTML**, because it comes from the
step's locale bundle. The step-side wrapper picks the data instead, which is what those wrappers are
for: `SurviveTheClear` types its moves as `Record<Assistant, readonly string[]>` and swaps one slug
(`write.claude` against `write.copilot`), so `TaskCard` and `useStepText` stay untouched. Type it
that way rather than defaulting: adding a third assistant is then a compile error naming every
wrapper whose words have to be written, instead of silence and a Cursor student being told to edit
`CLAUDE.md`. Ids are built from the move index, so swapping a slug moves no id. The same rule holds
for a figure: it reads `useAssistant()` itself, and the `data-figure` marker never branches.

Which units this is actually used in, and the places it deliberately is not, are in
`front/src/steps/step0/CLAUDE.md` and `front/src/steps/step1/CLAUDE.md`, with the cross-step scope in
`front/src/steps/CLAUDE.md`. The short version: step 0 tells the student to set it, and step 1
varies eleven blocks. Everything else is shared on purpose.

## Languages

English and Dutch, on i18next; `shared/i18n/i18n.ts` has the wiring. Everything is one mechanism: a
key, looked up in a namespace — `ui` for the chrome, one namespace per step for everything else,
pushed in from `steps/index.ts` because `shared` never imports a step.

Three things about it are decisions rather than mechanics. **Unit prose is one English HTML file**,
and its blocks carry `data-i18n` keys into the step's namespace, so a half-translated unit degrades
one paragraph at a time rather than falling back wholesale. A missing UI key is a compile error; a
missing prose translation only warns in the dev console, which is the closest prose gets to the same
safety. And the English HTML is the English: there is no `en` entry for prose.

Prose keys read `<unit>.<section>.<n>`, where the section is slugified from the `<h2>` above the
block (`lead` before the first one) and the heading itself is `<unit>.<section>.heading`. That
makes a key a location rather than a summary: moving a paragraph into another section means
renaming its key, and the console will tell you if you forget.

Grading messages come from the Java service and are **English in every language**. The Dutch
`exercise.description` says so rather than letting it surprise anyone. The words a student
types as an answer (`prompt`, `session`, `keep`, `gone`) also stay English in every language:
they are what the checkers grade, and the Dutch content says so where it asks for them.

All three settings live behind the cogwheel in the header, alongside the way into the deck and the
way to throw a student's progress away. Language and assistant are the same shape, a list of radios
with the current choice in teal, because they are the same kind of choice; the mode is a switch
because it is on or off. **Every row in that panel is its label and nothing else**, and the
whole row is the target where the row does something: the explanatory line under a label was
removed, and so was the small Start button beside the presentation label. The rows do not need
explaining, a switch already says which way it is set, and a label next to a small button is a large
piece of chrome pointing at a tiny one. Do not add the subtext back.

The reset row is the one thing in the app that destroys something, and three things about it are
decisions. Its confirm dialog is a **sibling** of the popover rather than a child, because closing
the popover unmounts its subtree and a confirm that leaves with the panel that opened it is not a
confirm; that is why the popover is controlled. It is deliberately **not tinted red**: `--destructive`
means an answer failed everywhere else here, so the dialog carries the weight instead of the row.
And it reloads the page after clearing, because every board reads its storage once at mount and
would otherwise go on showing flags that are gone.

The line it cuts along is **progress against preference**, and `shared/lib/reset.ts` is where that
line is drawn. Progress is what you did, so the captured flags and the finished pages both go;
preference is how you read, so the language and the mode both stay, and a room of machines can be
handed to the next group without anyone setting the language again. The flags are cleared by **key
shape, not by a list**: `shared` may not import a step, so it removes every `localStorage` key
matching `kata.step<N>.`, plus `kata.completed`. Step 0 writes one key per answer box, step 1's
board and step 2's workshop one key each. A step storing something under that prefix is opting into
being cleared; anything that must survive a reset needs a key outside it, the way `kata.mode` does.

Progress is browser-only
(`shared/progress/`): a unit is marked done when the student pages past it or aces its quiz. It is a
convenience, not a grade, and it degrades to "nothing done" if localStorage is unavailable.

When writing or translating lesson text, use the `lesson-writing` skill in
`.claude/skills/lesson-writing/`. Its main rule: no em-dashes anywhere in student-facing prose.
