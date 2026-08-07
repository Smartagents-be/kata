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
renumbering of everything after an insertion. `kind` is `title`, `divider`, `figure` or
`statement`, and it decides how loud the heading is, what sits under it, and which ground the
slide takes.

**Only a module gets the dark card.** A `title` slide is a step's own card, one per step at the
head of its deck, and it is the only slide on the deep-teal `--header` surface: four dark cards
across the whole deck is what makes them read as module boundaries, and that number was chosen by
the tutor, so a unit `divider` stays on the light ground and must not be promoted back. The dark
surface is a per-slide `surface` prop on `Slide`, not dark mode; the removed dark-mode wrapper
stays removed. On the dark card the emphasis vocabulary lightens (`chart-3` where light slides use
`primary`, white ink set back where they use `muted-foreground`), mapped in `SlideTemplate` like
the rest of it.

**Every slide carries the SmartAgents watermark**, in the footer beside the page number: the mark,
the name, `© 2026`, above a hairline that spans the frame. The mark is
`shared/components/SmartAgentsMark.tsx`, a static port of the geometry
`video/src/components/Logo.tsx` rebuilt from `smartagents.be/assets/logo.svg`, and its cyan-to-blue
gradient is deliberately not a token: it is the brand's own and not ours to restyle, so it lives
inside that component and nowhere else. The gradient id is per instance (`useId`), because the mark
is on every slide and two SVG gradients with one id resolve to the first. It sits in `components`
rather than in `deck` because the page carries the same watermark: `AppShell` signs the course with
it (`#app-watermark`), so the projector and the browser are signed the same way. Both are
untranslated, the way a name is.

**The page's copy is pinned to the window**, bottom right, at the tutor's own asking: it is a
watermark rather than a colophon, so it stays on screen wherever the student has scrolled to, and
it is a sibling of `#app-body` rather than a child, since that body is a `z-10` stacking context a
fixed element could not be layered out of. It is `pointer-events-none` and set back to 70%, which
is what keeps it a mark and not a widget: on a narrow window it lands on top of a line of prose,
and it must lose that argument rather than win it. Do not give it a panel or a border to fix that;
the flatness rule below is the reason, and a chip in the corner reads as a control.

**`points` is the third shape**, a short list under the heading, in the same `<hi>`/`<mute>`
markup as the title, at three to five entries of a few words each: a longer list is the tutor's
script, which is what `note`'s rule already forbids. A slide carries `note` or `points`, not both.
**Every unit divider carries the unit's essence as points**, deck-wide and at the tutor's own
asking: a bare title on a slide gave a room nothing to hold on to, so the divider states the
unit's two or three claims and the slides after it are the proof. Only the four module `title`
cards stay bare, which is part of what makes them read as a different kind of slide. On a
`statement`, points stay for the slide that is genuinely a list (the house rules, a goal's three
names).

**Slide ids are unique across the whole deck**, because the deck is one list. Step 1 owns the bare
`deck-<unit>` names from before the other steps had decks, so every other step prefixes with its
step id (`deck-step2-workflows`); both steps have a `workshop`, which is the collision the prefix
exists for. A raster figure (`UnitShot`) rides at `scale` 1 with a large `figureWidth`, since
magnifying a PNG past its layout width only softens it on the projector.

**Placement is two values, not three, and the split is what the slide is competing for.** A
`title`, a `divider` and a `statement` are only their text, so they take `golden` and land exactly
where the opening question does, eyebrow on 180px and the h1's top edge on the division at 255px;
a `title` carries no eyebrow (there is nothing above a module to name), so it sits the documented
75px higher. A `figure` slide is competing for room, so its heading takes `top` at 80px higher and
every one of those pixels goes to the drawing. The masthead still holds still *within* a run of
figure slides, which is what `top` is for; it steps once when the deck turns from talking to
showing.

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
  active unit, the current language, the focus ring and a prose list's bullets. That last one is
  `--tw-prose-bullets`, which was `--border` and is now the brand colour, so it is one line in
  `index.css` rather than a class on any `<ul>`: a marker in front of an item is structure, and
  structure is what the teal already marks. It reaches every unordered list in the curriculum, and
  ordered lists are untouched, since `--tw-prose-counters` stays muted and a numeral is read as
  content rather than seen as a mark. Neutrals carry a faint teal undertone, so
  surfaces read warm rather than clinical grey. `--success` means passed and `--destructive` means
  failed; nothing else borrows them. `--success` tints a panel and `--success-foreground` is the
  darker ink that stays readable on that tint, which is why there are two. The one exception to the
  light UI is `--header`, the deep teal, with `--header-foreground` white ink. It is the header's own
  colour first: a band, not a bar, with the app riding in one white card that overlaps it. **On a
  unit page it is the band and nothing else**, and one dark surface per page is what makes the band
  read as the band; the deck's four module cards take it on their own canvas, and `OneShotCompare`
  takes it at 85% for a corner badge the size of a word. The unit pager's forward half took it for a
  while, on the argument that a unit should be bookended by the surface it opened on, and it came
  back off: a near-black cell at the foot of a white page reads as a hole rather than as the way on.
  Anything else reaching for this token is asking for `--primary`. A finished
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
- **Nothing a student works in is a card, and that is the decision rather than an omission.** The
  boards, the tasks, the quizzes, the graded exercises, the connect boards and the catalogue page all
  sit inside the app's one white card already, so a bordered panel around any of them is a card
  inside a card, and the rows inside that a third. The old drawing had all three, which is what made
  a five-flag board read as a stack of boxes and a unit read as a column of tiles. Structure comes
  from a hairline that opens each block, a numeral gutter with a continuous rail running down it, and
  type hierarchy. That is the flatness rule above taken one step further: on a surface that is
  already white, even the border goes. **Do not wrap any of it back in `Card`.**
  The vocabulary is `shared/components/Panel.tsx` (`Panel`, `PanelRow`, `PanelChip`, `PanelNote`,
  `ChoiceMark`, `HintDialog`, `AnswerLine`, plus `Board` and `BoardRow` arranged the way a flag board
  wants them) and `shared/lib/choice.ts` (`choiceRowClass` and its two companions, which are
  functions rather than components because the element differs: the quiz needs a `<label>` around a
  radio, `SpotInjection` a `<button>`). The split it enforces is **behaviour per step, appearance
  shared**: a step keeps its own flags, salt, storage key and grading, because a step owns what
  grades it, and takes the drawing from here so nothing in the course can drift apart visually. It is
  the move `TaskCard`, `ConnectBoard` and `UnitShot` made before it.

  Six things inside it are load bearing. **Every panel opens on a hairline**, which is what marks the
  seam between reading and working now that no box does; a block with a counter puts the counter on
  that rule as its eyebrow (a flag board's five-of-five, a quiz's question number, a connect board's
  running count), and a block with nothing to say there lets the rule run the full width. That
  eyebrow is also why there is no longer a separator between quiz questions: the labelled rule is
  that seam. The **rail is drawn on the last row too**, because a spine that stops short reads as a
  rendering fault rather than as an end. **A task's moves take the spine and no rail** (`dense`),
  because on a row that short there is nothing for a rail to span. They *do* take rules, and that is
  newer than it looks: `dense` forced them off while a move was a line to read, on the argument that
  a hairline between four one-liners is heavier than what it separates, and a move is a target now,
  so a column of them has to say where one ends and the next begins. `dense` and `rule` are two
  questions in `PanelRow` for that reason, and a dense list that is only read still passes
  `rule={false}`. A dense row also carries horizontal padding, since it is the one kind that tints
  and a fill stopping where the words stop reads as a highlighter stroke; the caller pulls the
  column back out by the same amount so the numerals stay on the title's edge. **Hint is a text
  button** everywhere a student meets one, `CodeCheck` in the intro included, because two bordered
  controls side by side read as two offers of equal weight and a graded box has exactly one action;
  the lightbulb is what keeps it findable. **No pickable option has a border**: the hairlines carry
  the structure, the quiz's A-D key is **decoration only** and `aria-hidden` (the radio is still
  there, `sr-only`, and the row carries the focus ring on its behalf), and a `ChoiceMark` repeats the
  verdict as a glyph so it never rests on one colour against another. **A correct option is the brand
  teal rather than `--success`**, and it is the whole row that takes it: the tint, the lettered key,
  the words and the tick. `right` and `answer` are the same claim about the same option, the one you
  took and the one you missed, so they are one colour and only the weight separates them; that leaves
  red as the single verdict colour on a choice row. `--success` still means passed on the two boards,
  where a solved row is a thing you finished rather than an option that was correct. A choice row also
  carries the horizontal padding a dense row does and for the same reason, on the content only, so the
  hairlines still run the panel's full width and still meet the rule above them. **`ConnectBoard` is the one
  exception and keeps its two columns bordered**, because a line is drawn between them and each end
  has to be an edge the eye can see a line arrive at; what it takes from the shared vocabulary is the
  tint and the radius, so a picked row there and a picked row in the quiz are the same colour.
  `FlowDiagram`, `RunSheet`, `AuditExample` and `ExactAsk` keep theirs for the reasons their own step
  files give: there a border means containment, and that is content rather than chrome.
- **The pager at the foot of a unit is a footer strip.** `shared/components/UnitPager.tsx` draws it
  and nothing else may: two halves butted against each other, back on the quiet ground behind a
  hairline, forward filled with `--primary` and its own white ink. The shape comes from the design
  system's own `Step Pager` file, and so does the hue. What differs is the strength: that file
  *tints* forward with the accent, and a tint at the foot of the page reads as a weaker version of
  the buttons inside the unit, so forward takes the teal at full. It spent a while on `--header`
  instead, so that a unit opened and closed on the same surface, and that came back off for being
  too heavy: at the foot of a white page a near-black cell reads as a hole rather than as the way
  on. Do not put the dark fill back. The design's other move is kept, that **neither half carries a
  "Previous"/"Next" label**, since the arrow says the direction, so the label is rendered `sr-only`
  instead of above the title.

  Two things follow from forward being a filled cell rather than a tinted one, and each replaced
  something that was there first. **The border and the radius belong to the halves**, not to a box
  around them: a border on the strip runs behind the filled half and traces it with a pale hairline,
  and a square-cornered border clipped by a rounded parent frays at the arc, so the light half
  carries the border and rounds its own outer end while the filled half carries neither. **There is
  no divider**, because the edge of the filled cell is the seam. Its focus ring is the last thing
  here naming white directly, which is the same licence the header's own control has and for the
  same reason: `--ring` is the teal it would have
  to be seen against. At either end of the curriculum the surviving half **stays a half** and is
  pinned to the side it leads to, forward on the right and back on the left, so the arrow still
  points off the edge it takes you to; stretched across the strip it stops reading as one of two.
  Do not put an empty cell back to keep the halves even, which reads as a fault.
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

One thing composes across that cut. A unit holding both a task and a registry quiz writes the shared
`<h2 data-i18n="ui:quiz.title">` above its task itself, and `QuizPanel` would then print the same
heading again a few inches down. So `showsExerciseHeading` in `content.ts` runs the same pass the
page runs and answers whether the heading is already there, and `UnitPage` hands `QuizPanel`
`heading={false}` when it is: one "Test yourself", the task under it, the separator, then the
questions. It is asked of the *prepared* page rather than of the registry, because guided mode drops
every run of prose and takes that heading with it, so in class the quiz owns the heading again. The
separator stays either way, since inside a shared section it is what divides the task from the
questions.

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
`front/src/steps/CLAUDE.md`. The short version: step 0 tells the student to set it and varies one
block of its own, and step 1 varies eleven. Everything else is shared on purpose.

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
