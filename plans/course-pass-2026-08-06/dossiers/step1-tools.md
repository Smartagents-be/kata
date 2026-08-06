# Dossier: step1 / `tools`

Files read: `front/src/steps/step1/CLAUDE.md` (all 917 lines), `units/tools.html`, `index.tsx`,
`locales/en.json` + `nl.json` (all `tools.*`, `mcp-*`, `connect.*`, `shutter.*`, `spot.*`,
`budget.*` keys), `ToolsInContext.tsx`, `McpServer.tsx` (via its notes), `McpParts.tsx`,
`McpOvals.tsx`, `ConnectOne.tsx`, `BudgetWindow.tsx`, `SpotInjection.tsx`, `deck.tsx` (tools block),
`audit.md` items 3, 5, 28, 48, `copilot-specific.md`, `.claude/skills/lesson-writing/SKILL.md`, and
the step 1 Java project for the numbers.

**Prior art, not my discoveries.** Audit item 28 records that `tools` is the fourth-longest unit and
that splitting the MCP half from the tool-loop half is a live judgement call. Audit item 3 records
that no unit defines the word *context* and cites `tools.list-itself-window.4` as one of the places
that uses it cold. Audit item 48 records `McpOvals` having no slide as deliberate. I do not re-file
any of those.

The unit is genuinely strong. It is the best-instrumented page in the course: eight figures, four
things to do, and every number in it that I could check against the repository checks out. What
follows is what is actually wrong with it.

---

## 1. AI tells

The prose is human and mostly very good. Cold opens, fragments where the rhythm needs one, concrete
nouns everywhere, no hype, no announced counts, no summary paragraph, no closing gesture at
significance. Two things are genuinely wrong, and the first is countable rather than a matter of
taste.

### 1. The three-item list is the unit's default sentence shape, and it fires nine times in ten paragraphs

**Where** `tools.lead.3`, `extra-tools.1` (twice in one paragraph), `extra-tools.2`,
`extra-tools.4`, `list-itself-window.1`, `list-itself-window.3`, `stay-critical.1`, `stay-critical.3`

**Problem** The brief names this first: "One list is fine; a rhythm of them is a machine." Counted
off the file:

| Key | The tricolon |
| --- | --- |
| `lead.3` | "on your machine, against your files, at somebody else's API" |
| `extra-tools.1` | "your issue tracker, one for your database, one that drives a browser" |
| `extra-tools.1` | "Somebody wrote it, you connected it, and now the model can call it" |
| `extra-tools.2` | "a page out of a wiki, a design document, a row from your database" |
| `extra-tools.4` | "You pick the prompt, your harness attaches the resource, the model asks for the tool" |
| `list-itself-window.1` | "The name, what it does, every parameter it takes" |
| `list-itself-window.3` | "`grep`, `sed` and a test runner" |
| `stay-critical.1` | blog post / MCP server / `curl`ed spec |
| `stay-critical.3` | "your prompt, the agent's own notes, and a paragraph off a page" |

Three of these are load bearing and must stay: `extra-tools.4` is the figure's whole argument and
there are literally three MCP primitives; `stay-critical.1` and `stay-critical.3` each need three
because the point is that three unlike things arrive looking alike. The damage is done by the run of
three *consecutive* paragraphs (`lead.3`, `extra-tools.1`, `extra-tools.2`) that each land on a
three-item list, plus the paragraph that manages two of them on its own.

**Fix** Break it in two places and leave the load-bearing ones alone.

`tools.extra-tools.1`, replacing the second sentence's structure rather than its content:

> An MCP server can be anything. A server for your issue tracker, one for your database, one that
> drives a browser. Somebody else wrote it. You connected it, and now the model can call it. Your
> harness runs the call and appends what came back, exactly as it does for `grep`.

`tools.extra-tools.2`, first sentence onward:

> Tools are not all a server offers. It can also hand over material it collected on its own: a page
> out of a wiki, or last quarter's design document. Nobody called anything to get it. Your harness
> took it and put it in the window, and the model reads it there next to your prompt. Content that
> arrives that way has a name of its own. A resource.

Both Dutch entries move with these.

### 2. The sentence either side of the first figure is the same sentence

**Where** `tools.lead.3` last clause and `tools.lead.4` second sentence

**Problem** `lead.3` closes "Only what it returns comes back in, and it comes back as plain text
next to your prompt." `lead.4` then says "It gets the result and nothing else". That is the claim
restated across the drawing, which is skill question 7 ("Which sentence only says the previous one
again? Cut that one"). It also buries `lead.4`'s actual payoff, the truncation line, in the middle
of the paragraph instead of at the end where the skill wants the best sentence.

**Fix** `tools.lead.4`:

> That dashed half is the part the model never sees. A file that was truncated on the way in and a
> file that is genuinely short read exactly the same from in there.

Dutch:

> Die gestreepte helft is het stuk dat het model nooit ziet. Een bestand dat onderweg afgekapt is en
> een bestand dat echt kort is, lezen daarbinnen precies hetzelfde.

---

## 2. Truthfulness

Everything I could check against the repository or against `copilot-specific.md` is correct, and
that is worth stating because it is unusual. Verified: `claude mcp add <name> -- <command>`;
`copilot mcp add SERVER-NAME -- COMMAND` and `~/.copilot/mcp-config.json`
(`copilot-specific.md:111-116`); the GitHub MCP server being built in with no configuration
(`:122`); Copilot CLI documenting `/mcp` and naming nothing for server prompts (`:128-131`); MCP
prompts under a slash in Claude Code; `.playwright-mcp/` being the screenshot destination
(it is in the repo's own `.gitignore:8`); and every number behind `BudgetWindow` measured off
`kata/step1/java` — `TitleController.java` is exactly 24 lines, everything under `services/` is
exactly 1250, there are 52 `*Stage.java` files of which two are the `CatalogStage` and
`AuxiliaryStage` interfaces, so "fifty stage classes" is right; `mvn dependency:tree` at 260 lines
against the controller's 24 makes "ten times longer than the controller" right; the listing at 190
against the grep's 3 makes "one sixtieth of the room" right.

Four things are wrong.

### 3. "Four or five tools is the most one context holds well" is disproved by the harness the reader is running

**Where** `tools.list-itself-window.4`

**Problem** This is the only number the course puts on a tool count, it is stated flat with no
hedge, and the student's own agent contradicts it before they finish the sentence. Claude Code ships
on the order of fourteen built-in tools (Bash, Read, Write, Edit, Glob, Grep, Task, WebFetch,
WebSearch, TodoWrite, NotebookEdit, BashOutput, KillShell, SlashCommand) and works. Copilot CLI
ships its own set plus the whole GitHub MCP server, which the paragraph two blocks up
(`list-itself-window.2.copilot`) says out loud. So the page tells a Copilot reader they are already
past the ceiling in the same section where it tells them the ceiling exists. A student who runs
`/context` one unit later in `ReadYourWindow` will see the list and see the number is wrong.

The escalation the paragraph exists for (past some point, give the job its own specialised agent) is
sound and worth keeping. The number attached to it is not defensible as written, and the course's own
rule is to hedge with frequency rather than to state a bare threshold.

**Fix** Scope the count to what the student controls, which is also what the surrounding section is
about:

> Four or five *added* servers' worth of tools is about the most one context holds well, on top of
> whatever your harness already starts you with. Past that the agent spends its attention picking
> between them, and a longer list is rarely the answer. Give that job its own specialised agent,
> with the tools it needs and nothing else.

Dutch:

> Vier of vijf aangesloten servers is ongeveer het meeste dat één context goed draagt, bovenop wat
> je harness je sowieso al meegeeft. Daarboven gaat de aandacht van de agent naar het kiezen tussen
> die tools, en een langere lijst is zelden het antwoord. Geef dat werk zijn eigen gespecialiseerde
> agent, met de tools die het nodig heeft en verder niets.

`front/src/steps/step1/CLAUDE.md` calls this "the only number the course puts on a tool count", so
that sentence has to move with the edit.

### 4. "The model has no way to mark one as yours and one as a stranger's" is false at the mechanism level

**Where** `tools.stay-critical.3`

**Problem** Tool results do not arrive as undifferentiated text. They arrive in their own content
blocks with their own role, the harness knows which is which, and providers train an instruction
hierarchy that weights a system and user turn above tool output. The marking exists. What it does
not do is hold, which is the far more interesting and far more useful claim, and it is the claim
`SpotInjection` underneath actually grades: the student is asked to find the poisoned result
*because a human can and the model reliably does not*. As written the paragraph teaches a mechanism
that is not there, and it undercuts the unit's own truthfulness standard.

Note that `tools.lead.3` ("it comes back as plain text next to your prompt") leans the same way but
is defensible, because from inside the window the content genuinely is text. It is the flat "no way
to mark" that is wrong.

**Fix** `tools.stay-critical.3`:

> None of that shows once it is in the window. Your prompt, the agent's own notes and a paragraph off
> a page it opened thirty seconds ago all arrive marked, and the marking does not hold: the model was
> trained to trust you over a tool result, not built to. It reads the stranger's line and builds on
> it anyway.

Dutch:

> Daar zie je niets meer van zodra het in het venster zit. Jouw prompt, de notities van de agent zelf
> en een alinea van een pagina die hij dertig seconden geleden opende komen allemaal gemarkeerd
> binnen, en die markering houdt niet: het model is getraind om jou meer te vertrouwen dan een tool
> result, niet gebouwd om dat te doen. Het leest de regel van de vreemde en bouwt er toch op verder.

### 5. `sed` is named twice as the agent's way of changing a file, and no agent in this course does that

**Where** `tools.lead.2`, `tools.list-itself-window.3`

**Problem** Both Claude Code and Copilot CLI edit through a dedicated edit tool, not through `sed`.
The reader is one unit away from being told to run `/context` and read their real tool list, where
they will find `Edit` and `Write` and no `sed`. This is the unit that teaches what a tool list looks
like, so getting the example wrong costs more here than it would anywhere else. `grep` and `curl`
are both fine, because agents genuinely run those through a shell.

**Fix** In `lead.2`, `sed` becomes an edit: "`grep` to search your codebase, an edit tool to change
a file, `curl` to call an API". In `list-itself-window.3`: "An agent holding `grep`, an edit tool
and a test runner is choosing between three." Dutch follows. Low cost, and it removes the one place
the unit would be caught out by its own next exercise.

### 6. The truncation example assumes a harness that hides truncation, and neither of this course's does

**Where** `tools.lead.4`

**Problem** "A file that was truncated on the way in and a file that is genuinely short read exactly
the same from in there" is the paragraph's sharpest line, and it is only true of a harness that
truncates silently. Claude Code's file read caps at a line count and says so in the result. The
claim the figure actually supports is that the model knows only what the harness chose to hand back,
which is true unconditionally.

**Fix** Lowest priority of the four, and I would leave the sentence if nothing else in the paragraph
is being touched. If it is being touched anyway (see finding 2), the honest version keeps the shape:
"A file the harness decided to cut short and a file that is genuinely short are the same file from in
there, unless something in the result says otherwise."

---

## 3. Progression

The unit builds. Mechanism, then where extra tools come from, then what holding them costs, then why
the results cannot be trusted, then what they cost by volume — the order in the step's `CLAUDE.md`
is the right one and the page follows it. Two things arrive undefined.

### 7. "harness" is the load-bearing noun of this unit and is defined three units later

**Where** `tools.lead.1`, `lead.2`, `extra-tools.1`, `extra-tools.2`, `extra-tools.3.*`,
`extra-tools.4`, `connect-one.2.*` — nine uses

**Problem** The unit's opening mechanism sentence is "It asks for one, your harness runs it, and the
output is appended to the context as text." That is the third paragraph the student has read in this
unit and the word has never been introduced. I checked: `step0/welcome.html`, `step0/backend.html`,
`step1/tokens.html` and `step1/prompt.html` contain no prose definition. The only earlier appearance
is `tokens.html`'s "The `harness` unit prices it", which names a page rather than a thing. The
definition lives in `harness.lead.1` ("The harness is the software you use to work with a model"),
which is unit 6 of 10; `tools` is unit 3.

This matters more than the equivalent gap for *context* (audit item 3), because *context* is at least
a word with an everyday meaning that a reader can carry, and *harness* is not. It is also
inconsistent with a step whose notes are explicit that the word *context* must not be used before it
is introduced. Nothing in `front/src/steps/step1/CLAUDE.md` records a decision about *harness*, so
this reads as an oversight rather than a constraint.

**Fix** The repo's own move: point at the unit rather than teaching it twice. One anchor in
`tools.lead.2`, no new prose:

> This is where an agent's abilities come from. `grep` to search your codebase, an edit tool to
> change a file, `curl` to call an API, an MCP server for whatever your harness does not ship on its
> own. The <a href="/steps/step1/harness">harness</a> decides which tools exist. What they hand back
> is this layer.

Dutch link text `de unit over het harness`, path unchanged, per the skill's linking rule. If the
author wants the word grounded at first use instead, the cheapest place is three words in `lead.1`
("the harness you are typing into runs it"), but that spends `harness.lead.1`'s cold open, so the
anchor is the safer of the two.

### 8. MCP is never expanded, here or anywhere in the course

**Where** `tools.lead.2` (first use), `tools.extra-tools.heading` and section

**Problem** `grep -rin "model context protocol"` over the whole repository returns nothing. MCP
first appears as a bare acronym in `lead.2`, and a section of four paragraphs and three figures is
built on it. `extra-tools.1` says what a server *does* ("Somebody wrote it, you connected it, and now
the model can call it") but never what the letters are. This is the one place the unit breaks the
skill's "name the term last" move in reverse: the label arrives with nothing described under it.

For a course that otherwise names concrete things obsessively, three words missing is cheap and
conspicuous. A student who has met MCP already loses nothing; one who has not is reading an acronym
for a page and a half.

**Fix** Expand it once, at first use, in the position where the thing is being described anyway.
`tools.extra-tools.1` first sentence:

> An MCP server can be anything. Model Context Protocol is the standard your harness speaks to
> reach one, and what is on the other end is up to whoever wrote it: a server for your issue
> tracker, one for your database, one that drives a browser.

Note this collides with the tricolon fix in finding 1; take one shape or the other, not both. My
preference is this one, because it solves two findings with one sentence and the added clause breaks
the rhythm on its own.

---

## 4. Readability

### 9. `Extra tools` is the wrong name for a section whose second paragraph opens "Tools are not all a server offers"

**Where** `tools.extra-tools.heading`

**Problem** The heading and the section disagree, in the section's own words. Roughly half of it
(`extra-tools.2`, `.3.*`, `.4`, plus `McpParts` and `McpOvals`) is about the two things a server
offers that are explicitly *not* tools. The skill has a rule for exactly this: "When the section is
about a named thing, the heading is the name. A claim heading over a section that teaches a practice
reads as a slogan for it. Test it by reading the heading and the first sentence together." Read
together here they contradict: "Extra tools" / "Tools are not all a server offers."

**Fix** `MCP servers`. Plain label, names the thing, and it survives the section growing or
shrinking.

**Cost, stated honestly.** The slug is the key prefix, so this renames `tools.extra-tools.heading`
and `.1` through `.4` (including both `.3` assistant halves) to `tools.mcp-servers.*` in
`units/tools.html` and in `nl.json`, and it is named in `front/src/steps/step1/CLAUDE.md`'s
assistant-variants list (`tools.extra-tools.3`). Grep the old slug afterwards. `●●○`.

### 10. `It costs the same as everything else` says the opposite of its own first sentence

**Where** `tools.costs-same-everything.heading` and `.1`

**Problem** Heading: it costs the same. First sentence: "A tool result is usually the bulkiest thing
in the window." The heading is making a point about pricing (a token is a token, this layer gets no
discount) and the paragraph is making a point about volume, and the reader has to reconcile them
unaided. The paragraph is right and the heading is fighting it. Same test as finding 9, failed from
the other direction.

**Fix** `It is the bulkiest layer you have`, or on the claim-heading shape the section is really
arguing, `You pay for it on every turn after`. I prefer the second: it is the sentence the paragraph
actually ends on and it is the thing a reader would otherwise get wrong. Same key-rename cost as
finding 9 but smaller, one key plus the heading.

Note the Dutch heading already reads closer to the truth — see finding 14.

### 11. `your database` is the example twice, two paragraphs apart, for two different things

**Where** `tools.extra-tools.1` ("one for your database") and `tools.extra-tools.2` ("a row from
your database")

**Problem** The database is the illustration of an MCP *server* and then, one paragraph later, the
illustration of a *resource*. The section's whole job at that moment is to hold those two apart. Re-
using one concrete noun across the boundary is the small friction that makes a reader re-read.

**Fix** Covered by the `extra-tools.2` rewrite in finding 1, which drops "a row from your database".

---

## 5. Imagery

The unit is the most heavily drawn page in the course and mostly deserves it. `ToolsInContext` is
excellent: the tool cut in half by the frame at exactly `x=430` is a claim no paragraph can make, and
the three result bars against the one prompt bar carry the volume argument that `costs-same-everything`
only asserts. `McpServer` earns its place on the wire crossing the border once, dashed outside and
solid in. `McpParts` earns its place by sorting three things by who decides, which is genuinely new
information laid out spatially. One figure does not.

### 12. `McpOvals` fails the repo's own bar in the unit it sits in

**Where** `front/src/steps/step1/McpOvals.tsx`, marker after `tools.extra-tools.4`

**Problem** Everything `McpOvals` shows that `McpParts` did not is carried by the radii and the
fills: prompt small and heavy at `rx 74 / fill-primary/20 stroke-primary/70`, resource large and
faint at `rx 88 / fill-primary/10`, tool middling and faint at `rx 80`. Nothing on the page says what
size means or what fill means. There is no caption, no legend and no prose after it. The component's
own comment is honest about why: those values are `ContextDiagram`'s, and `ContextDiagram` is in
`context`, the *next* unit.

So in this unit the figure is three labelled ovals of near-identical size in the same three columns
the cards above them stand in, restating a sentence the reader has just read ("all three end up in
the same window") minus the window, which the step's notes forbid drawing here. The reader takes
nothing from it. The payoff is real but it is a payoff for a page they have not reached.

I have read the constraint (`step1/CLAUDE.md`: "it is a pair with `McpParts` rather than a repetition
of it: the cards sort the three by who decides, the ovals say the same three are one kind of thing")
and I am saying plainly that it should be revisited. "The same three are one kind of thing" is not a
claim a drawing is needed for, and it is not a claim the ovals make legible without the vocabulary
the next unit supplies. Audit item 48 already notes it is kept off the deck, which is the same
judgement reached from the other side: a tutor cannot say anything about it out loud either.

**Fix** Two options, in order of preference.

1. **Move it to open `context`, directly above `ContextDiagram`.** There it is the bridge it was
   designed to be, the sizes and fills mean something two inches later, and it costs `tools` a figure
   it was not using. The columns tie to `McpParts`, so `McpParts` keeps its own geometry and the
   comment in both components has to stop claiming the pairing.
2. **Keep it and make the sizes mean something here**, with one clause added to
   `tools.extra-tools.4`: "Three different hands, and all three end up in the same window, taking up
   very different amounts of it." That is the one thing the drawing shows and the prose does not,
   and it costs one clause in two languages.

**No missing figure.** I looked for a claim here that wants a drawing and has none, and found that
each candidate is owned elsewhere: the re-send cost is `session`'s (`SessionMakeup` measures the
share) and `prompt`'s (`BundleCompare` measures the growth); the cost of merely *having* a tool is
measured by doing, in `context`'s `ReadYourWindow`, which is the only place in the course a figure is
put on it. The one claim in the unit a reader must take purely on trust is the four-or-five ceiling
in finding 3, and drawing it would be drawing a number I am asking to be rewritten.

---

## 6. Supporting tasks

Four things to do under one rule, which is more than any other unit in the course: `ConnectOne`
(TaskCard, 7 moves), `ShutterFlag` (hash-checked, one row), `SpotInjection` (graded in browser) and
`BudgetWindow` (graded on the exact set). The reader is not told anything here they are never asked
to do. One move does not work as written.

### 13. `connect.browser.label` gives a bare `/catalog` with no host, and the course never says where the frontend runs

**Where** `connect.browser.label` in `locales/en.json` and `nl.json`

**Problem** The move reads "Ask it for the same nine titles again through the server: open
`/catalog`, press the button, read them off the page." The sibling move one line up gives a full
address, `localhost:8080/api/titles`. The agent driving the browser needs a host and a port, and:

- `grep -rn "5173\|npm run dev\|/catalog"` across all of `step0/units/`, `step1/units/` and both
  step locale bundles returns exactly one hit, this label.
- `step0/backend.html` tells the student the *Java* projects boot on 8080 and says nothing about the
  frontend.
- The `<pre>` above the card starts only `mvn spring-boot:run`.

So the one route in the task that exercises the MCP server against the catalogue is the one route
whose target the course never states. The student is reading the page at `:5173` so they will
probably work it out, but they have to supply a fact the curriculum never gave them, in the middle of
a card whose other moves are exact.

**Fix** English:

> Ask it for the same nine titles again through the server: open `localhost:5173/catalog` in the
> browser it drives, press the button, read them off the page.

Dutch:

> Vraag dezelfde negen titels opnieuw via de server: open `localhost:5173/catalog` in de browser die
> hij bestuurt, druk op de knop, lees ze van de pagina.

If naming the port in a task label is unwanted, the alternative is one clause on
`tools.connect-one.1` naming the two servers the exercise assumes. The label is cheaper and lands
where the student is looking.

---

## 7. Quiz

**The unit has no quiz and should not grow a three-question one.** Four graded or ticked things
already sit under its one "Test yourself", `promptQuiz` is one page back and `contextQuiz` one page
forward, and the step's notes are explicit that the course's quizzes cluster in the opening units.
Adding a fifth thing to do here would make the busiest page in the course busier.

But there is one claim in this unit that is taught, drawn twice, and never asked.

### 14. The who-decides sorting is the unit's only taught-but-never-checked claim

`tools.extra-tools.4` states it, `McpParts` draws it, `McpOvals` draws it again, and none of the four
exercises touches it. `SpotInjection` grades trust, `BudgetWindow` grades call cost, `ConnectOne`
grades nothing, `ShutterFlag` grades a flag. A reader can finish the unit believing a resource is
something the model fetched.

**Proposal: one question, not a quiz.** `QuizPanel` handles a single-question array, and `context`
already proves a unit can carry a task and a registry quiz under one heading
(`showsExerciseHeading`). Situation-shaped, per the quiz-writing rule:

> An MCP server for your team wiki is connected. A page from it is sitting in your window, and
> nothing in the turn shows a tool call. Which of the three is it?

- **A resource. Your harness attached it, and nobody asked for it.** ✓
- A tool result. Something had to fetch that page, so a tool ran and the turn just does not show it.
- A prompt. Anything a server ships with it that you did not type is one of those.

Both distractors are things a reader might genuinely hold after this page: the first is the
reasonable inference that content implies a fetch, which is exactly what `extra-tools.2`'s "Nobody
called anything to get it" exists to correct; the second is the plausible over-reading of
`extra-tools.3`, that "prompt" is the catch-all for whatever the server brought along.

If the author would rather not add a fifth thing, the honest alternative is to accept the gap and
say so in the step's notes, because right now it is not recorded as a decision.

---

## 8. EN/NL parity

**Parity is complete and I could not fault it mechanically.** Every `data-i18n` key in
`units/tools.html` has an entry in `nl.json` (checked programmatically, zero missing), no `tools.*`
entry in `nl.json` is orphaned by a block that no longer exists, both assistant halves of
`extra-tools.3` and `list-itself-window.2` and `connect-one.2` are translated, the `<p>` wrapper
inside the `list-itself-window.4` aside is preserved in the Dutch, the `<svg data-icon="coin">`
marker is correctly escaped in both `list-itself-window.2` halves, and `grep '—\|–'` returns zero on
both the HTML and the whole Dutch bundle. The machine-shaped strings that must stay English are
correctly absent from `nl.json`: `spot.source.*`, `spot.body.*`, `budget.call.*`,
`mcp-server.tool.1-4`, `budget.task`'s endpoint. That is a well-maintained pair of files.

### 15. The Dutch heading of the closing section is truer than the English

**Where** `tools.costs-same-everything.heading`

**Problem** English: "It costs the same as everything else." Dutch: "Het kost evenveel als al de
rest", which a Dutch reader takes most naturally as "it costs as much as all the rest [put
together]". That is a different claim, and it is the one the paragraph underneath actually makes:
the tool result is the bulkiest thing in the window. The repo's standing policy is that when the two
languages disagree the Dutch is usually the version that was thought through, and the English is what
gets rewritten. This is a small instance of it, and it is independent corroboration for finding 10.

**Fix** Take the English heading to the Dutch claim rather than the other way round. `You pay for it
on every turn after` / `Je betaalt ervoor bij elke beurt daarna`, which is the sentence both
paragraphs already end on in both languages.

### One observation outside this unit

`het harness` is used 17 times across `nl.json` and `de harness` once, in `harness.caching.1`
("... betaal je niet [coin] De harness zet een markering in het request ..."). `tools`'s four uses
are all on the settled neuter form, so the unit is consistent and the stray belongs to whoever
audits `harness`. Flagging it here only so it does not fall between two dossiers.

---

## Verdict

This is a very good unit and it would not embarrass itself beside the best technical courseware
anywhere. The mechanism is stated in four sentences and never restated, the figures are drawn against
a vocabulary the step actually keeps, every number in it is measured off the repository rather than
invented, and it asks the reader to do four different things rather than telling them four things. It
is not excellent yet, and what stops it is not style: it is three claims that do not survive contact
with the reader's own machine. The tool-count ceiling is disproved by the harness they are typing
into and by the paragraph two blocks above it. The prompt-injection paragraph teaches a mechanism
that does not exist, in the unit whose neighbour owns truthfulness. And the one task move that drives
the MCP server at the catalogue points at a URL the course has never given them. Underneath those,
two headings argue with their own first sentences, the load-bearing noun *harness* is used nine times
three units before it is defined, MCP is never expanded anywhere in the course, and one of the eight
figures is doing its work for the next page rather than this one. The tricolon rhythm is real and
countable, but it is the least of it.

Priority order:

1. **Finding 3** — rescope the four-or-five tool ceiling. It is the one flatly wrong number in a
   unit that is otherwise scrupulous about numbers, and a Copilot reader is told they are over it in
   the same section. Visit `step1/CLAUDE.md`'s sentence about it in the same change. `●○○`
2. **Finding 13** — put the host on `/catalog`. A task move that cannot be followed as written, in
   the course's best hands-on card. `●○○`
3. **Finding 4** — rewrite `stay-critical.3` so the marking exists and fails, rather than not
   existing. It is a truthfulness defect one unit above the unit about truthfulness. `●○○`
4. **Finding 7** — anchor `harness` in `lead.2`. One `<a>`, two languages. `●○○`
5. **Finding 8** — expand MCP once, at first use, and take the tricolon fix (finding 1) with it.
   `●○○`
6. **Finding 9** — rename `Extra tools` to `MCP servers`. The most correct change on this list and
   the most expensive, because the slug is the key prefix. `●●○`
7. **Finding 10 + 15** — rewrite the closing heading to what the Dutch already says. `●○○`
8. **Finding 12** — decide `McpOvals`: move it to open `context`, or buy it a clause. A decision
   rather than an edit. `●●○`
9. **Finding 1 + 2** — the tricolon run and the sentence said twice across the first figure. `●○○`
10. **Finding 5, 11, 14, 6** — `sed`, the doubled database, the unasked sorting question, the
    truncation example. Cheap, and none of them is urgent. `●○○` each, `●●○` for the question.
