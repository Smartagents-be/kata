# Dossier: step1 / `harness`

Measured against the working tree at the time of reading. 976 words (matches audit.md Table 2 row 8),
five inline figures (`UnderSpecified`, `CoordinatorFanout`, `SequentialSteps`, `ReflectionLoop`,
`CutItUp`), one registry figure (`PatternMatch`), no registry quiz, one `TaskCard`, seven deck slides.
No em-dashes in the HTML or in any of its Dutch keys. All 26 prose keys have a Dutch entry.

**Read first, and it matters here:** `.claude/skills/lesson-writing/SKILL.md` names this file as one of
the two reference units for house voice ("`step1/context.html` and `step1/harness.html` are the
reference: when in doubt, read a section of one out loud and match its rhythm"). Anything I propose
against the prose has to clear a higher bar than usual, and most of what I looked at cleared nothing.
The prose is human, level and well cut. My findings are concentrated in one dead element, one
incomplete price claim, one thin figure and one weak quiz item.

**Prior art from `audit.md` (not my discoveries):** item 31 says the unit "Opens cold, closes with no
pointer to `model` even though `model` points back here." I think item 31 is wrong on both halves and
should be closed rather than fixed. Opening cold is what the writing skill explicitly asks for and it
names `harness.lead.1` as the example of it ("Open cold on the claim. ... 'The harness is the software
you use to work with a model.'"). And the unit closes on a task and a drag board, which is where a
unit should close; a forward pointer tacked after an exercise is a tail. `front/src/steps/step1/CLAUDE.md`
is also explicit that the pointer runs one way on purpose (`model` points back at `harness`'s
coordinator "rather than redefining it"), so adding the reverse pointer would create the mutual
cross-reference the step spent effort avoiding. Recommend: mark item 31 resolved-as-wontfix with that
reasoning, do not act on it.

---

## AI tells

The prose is genuinely human. Short declaratives, uneven paragraph lengths, a willingness to state a
view ("Vague does not survive the exercise", "you find guesses in the diff"), concrete nouns
throughout. No announcing openers, no "it's not just X", no summary paragraphs, no closing gesture at
significance. I found one candidate and it is arguable.

1. **Where:** `harness.reflection.1`
   **Problem:** "The shape is the same as a GAN's, where one network produces something and another
   one tries to tear it down." This is the brief's "analogy that is decorative rather than load
   bearing". The sentence immediately before it already states the shape in full ("The sub-agent is
   told to attack the result rather than help with it: find what is wrong, say so, report back"), so
   the GAN clause adds no claim. It also explains the familiar by the less familiar for this
   audience: a Java engineer meeting agent patterns is likelier to know "critic" than "generator and
   discriminator". The writing skill's rule 7 ("Which sentence only says the previous one again? Cut
   that one") points at it.
   **Fix:** cut the sentence. `harness.reflection.1` ends: "The sub-agent is told to attack the result
   rather than help with it: find what is wrong, say so, report back." Dutch loses its final sentence
   the same way. If the reference is wanted, it has to earn its place by predicting something the
   paragraph does not already say, e.g. "The shape is a GAN's, and so is the catch: a critic that is
   only asked to help finds nothing." I would cut.
   **Counter-argument I accept:** this is exactly the kind of specific technical aside a human with an
   ML background writes, and it dates nothing. If the author defends it out loud, leave it. Lowest
   priority finding in this dossier.

2. **Observation, not a finding.** The unit runs five triads (`which-one-you-run.1`'s
   reads/drives/holds, `caching.2`'s three ways to break a prefix, `decomposition.1`'s three
   questions, `decomposition.3`'s three hidden requirements, `reflection.1`'s find/say/report). Two of
   them are load-bearing and protected (`decomposition.1`'s three are `UnderSpecified`'s own labels;
   `reflection.1`'s is a quoted instruction). That is not a machine rhythm and I am not asking for a
   change. Recorded so a later pass does not "discover" it and flatten a good paragraph.

---

## Truthfulness

Verified: `kata/step1/java/problem.md` exists, is 19 lines, and is a library request about shelves
("short, reasonable, and full of holes" is fair). The GitHub MCP server claim in
`harness.which-one-you-run.2` matches `copilot-specific.md` line 122 ("The GitHub MCP server is built
in and available with no configuration") and is on that file's verified list. `Copilot CLI` is named in
full, which the step's own assistant rule asks of any block that names the product. The five-minute
default cache TTL matches the provider's published default and matches `deck.harness.cache.note`.
`CutItUp`'s three filenames match the card's five moves and the step CLAUDE.md's account of them.

1. **Where:** `harness.caching.1`
   **Problem:** The section teaches caching as pure saving. "Re-sending the whole window every turn
   would be ruinous at full price, and you do not pay full price ... everything up to that mark is
   recognised and billed at roughly a tenth." One unit later, `ModelPricing` shows six columns, two of
   which are `Cache write, 5 min` and `Cache write, 1 hr`, priced at 1.25x and 2x input in every row.
   **Nothing anywhere in the course accounts for those two columns.** The step's own CLAUDE.md lists
   four claims a reader can check against that table and the cache write is not one of them, which is
   the gap made visible: a student who reads the table finds that establishing a cache costs *more*
   than not caching, after a section that said caching only saves. This is the unit that owns caching,
   so it is the unit that has to say it.
   **Fix:** add two sentences to the end of `harness.caching.1`:
   > Writing that mark is not free. The first turn costs a quarter more than plain input, so a cache
   > pays for itself on the second turn and not before.

   Dutch: "Die markering zetten is niet gratis. Die eerste beurt kost een kwart meer dan gewone input,
   dus een cache verdient zichzelf pas terug vanaf de tweede beurt."
   Both numbers are checkable by eye against `ModelPricing` (input $1, write5m $1.25 on Haiku), which
   is the standard the step already holds that table to.

2. **Where:** `harness.caching.3`
   **Problem:** "An entry goes stale after about five minutes by default, and you can pay for longer."
   "Pay for longer" is the only reference in the course to the `Cache write, 1 hr` column, and it
   leaves the reader with no idea of the size of it. It is double the input rate, which is a real
   decision rather than a footnote, and the number is sitting in a table the student sees on the next
   page.
   **Fix:** "An entry goes stale after about five minutes by default, and double the input rate holds
   it for an hour." Dutch: "Een entry verschaalt standaard na een minuut of vijf, en voor het dubbele
   van het inputtarief houd je hem een uur vast." (Keep `verschaalt`. It is a good verb and the right
   register.)

3. **Where:** `harness.caching.1`, "The harness puts a mark in the request"
   **Problem:** flagged rather than asserted wrong. This is an accurate description of an explicit
   cache breakpoint, which is Anthropic's mechanism. Several providers cache prefixes automatically
   with no mark from the client, so for a Copilot CLI reader on a non-Anthropic model the sentence
   describes machinery that is not there. The block carries no `data-assistant`, correctly, because
   everything else in the paragraph is true either way.
   **Fix:** if you want it airtight, "Your harness and the provider agree on a mark in the request"
   over-hedges and I would not. The cheaper fix is one word: "The harness marks the request, and on
   the next turn everything up to that mark is recognised and billed at roughly a tenth." I am
   recording this as an unverified-for-one-reader claim rather than an error, per the brief's
   instruction to flag rather than smooth over. Low priority.

4. **`harness.sequential.1`'s "every step is validated before the next one starts"** is a claim about
   what harnesses do, and it is the one product claim in the unit with no source behind it in
   `copilot-specific.md` and no repo artifact to check. It is true of plan-mode-style execution in
   both products, so I am not flagging it as wrong. Recorded so the next pass does not have to
   re-derive that it was looked at.

---

## Progression

The unit builds well, and better than most of the step. The lead defines the harness, "Which harness
you run" makes the harness the only channel and then shows two products starting from different
places, caching prices the re-send that `context` and `tokens` both promised would be priced here
(`tokens.reads-all.4`: "The `harness` unit prices it"), and the four patterns each turn on the empty
context the coordinator section establishes. `coordinator.3` correctly points back at the
decomposition section rather than redefining it, which is the rule the step CLAUDE.md records. Nothing
is assumed that an earlier unit has not introduced. Nothing is re-argued.

One mild item:

1. **Where:** `harness.splitting-work.1`
   **Problem:** "each one is a design pattern worth recognising, because it decides where your context
   ends up." Three of the four sections pay that off (`coordinator.2`'s empty context,
   `sequential.2`'s one session carrying the whole run, `reflection.2`'s critic arriving with
   nothing). Decomposition, the section directly underneath the promise, never mentions context at
   all, and its figure carries no context frame on purpose. The reader meets the promise and then a
   section that does not honour it, and the honouring arrives one section later in `coordinator.3`.
   **Fix:** one clause on `harness.decomposition.2`'s second sentence, which already has the hook:
   > Each part gets its own prompt, and a prompt has to say what that part does, because nothing else
   > will be in the window with it.

   Dutch: "Elk stuk krijgt zijn eigen prompt, en een prompt moet zeggen wat dat stuk doet, want er zit
   verder niets bij in het venster." That pays the promise where the reader meets it and costs no
   paragraph. It also does not turn the section into the mechanism section, which the step CLAUDE.md
   is explicit about protecting ("It argues the gap rather than the mechanism").
   **Do not** instead soften the promise sentence. It is the sentence that makes four pattern
   descriptions belong in a step about the window.

---

## Readability

Sentence by sentence this is the cleanest prose in step 1. Three items.

1. **Where:** `harness.which-one-you-run.heading` + `.1`
   **Problem:** the heading does not describe the section's first paragraph. "Which harness you run"
   promises a comparison; `.1` ("Everything the model ever learns about your work, it learns because
   the harness put it in the request: it reads your files, drives your terminal and holds the
   connection to your provider's API") is not about which one you run, it is the lead's claim
   restated one notch harder. Only `.2` is the heading's subject. The writing skill's own test applies
   directly: "Test it by reading the heading and the first sentence together."
   **Fix:** move `harness.which-one-you-run.1` up to become `harness.lead.3`, where it belongs (it is
   the consequence of `lead.2`, and it renames to `harness.lead.3` in the HTML and in `nl.json`,
   because a key is a location). The section then opens on `.2` and is exactly what its heading says.
   No prose is rewritten and the argument is unchanged. Note the ripple: the section drops to one
   paragraph, which is fine, and the lead grows to three, which is also fine.
   **Alternative if the move is unwelcome:** keep the order and rename the heading to a claim, e.g.
   "Harnesses do not start you in the same place". I prefer the move: that claim is `.2`'s and a
   heading that states it makes `.2` say it twice, which is the failure the skill names.

2. **Where:** `harness.decomposition.3`
   **Problem:** the section runs three paragraphs and the third opens on a restatement. "So the
   questions come back at you before the code does. Cutting is where the hidden requirements surface:
   ..." The second sentence is the first one again in other words. The paragraph's real claim is its
   last sentence.
   **Fix:** merge the two openers into one:
   > So the questions come back at you before the code does: the case nobody thought about, the
   > endpoint two parts both want to own, the decision that was never made. An agent that starts
   > typing instead would have guessed at every one of them, and you find guesses in the diff.

   Dutch: "De vragen komen dus naar jou terug voor de code dat doet: het geval waar niemand aan gedacht
   had, het endpoint dat twee stukken allebei willen, de beslissing die nooit genomen is. Een agent die
   in plaats daarvan meteen begint te typen, had ze stuk voor stuk geraden. En gissingen vind je terug
   in de diff." This is my weakest prose finding and I say so; the paragraph is good as it stands.

3. **Where:** `harness.caching.3`
   **Problem:** the paragraph states a cost and then jumps to an instruction with the reason missing.
   "Walk away for a meeting and you come back to a window priced from scratch, so picking up where you
   left off costs you the whole thing again. Start a fresh session instead." A reader who has just been
   told that keeping a cache alive is worth real money reads "start fresh" as the opposite advice, and
   nothing on the page closes the gap (the reason is that you are paying to rebuild the window either
   way, so you may as well rebuild only what you need).
   **Fix:** "... so picking up where you left off costs you the whole thing again. You are paying to
   rebuild the window either way. Rebuild the one you need." Dutch: "... dus verdergaan waar je gebleven
   was kost je het hele ding opnieuw. Je betaalt sowieso om het venster opnieuw op te bouwen. Bouw dan
   het venster op dat je nodig hebt." That also lands the paragraph on a five-word sentence, which is
   the shape the skill asks for.

---

## Imagery

Four pattern diagrams sharing one vocabulary (teal frame is a context, a bar is something in it,
dashes are what is not). `UnderSpecified` earns its place: the thin ask bar against the large dashed
field is the "thinner than what you want" claim measured as area, which prose asserts and cannot show,
and the right-hand column turns the same three questions into three prompts. `CoordinatorFanout` earns
it on proportion: three bars in the coordinator against one bar plus an empty box in each sub-agent is
the refetch cost drawn rather than asserted. `ReflectionLoop` earns it on asymmetry: five bars against
one bar, side by side, is the whole argument and the prose cannot put two windows next to each other.

1. **Where:** `SequentialSteps.tsx`, wired at `harness.html:129`
   **Problem:** this is the one figure in the unit that draws only what the paragraph above it already
   says. `harness.sequential.1` and `.2` state: the agent plans, works one step at a time, validates
   each before the next, you can stop and pick it up later, one session carries the whole run. The
   drawing has three step cards, three green checks, a pause glyph on a dashed seam, and a session band
   behind all three. That is a one-to-one transcription. It fails the repo's own bar ("a picture of a
   claim the paragraph already makes is the thing to cut") on everything except the band, whose
   containment is genuinely spatial.
   **Fix, and I would upgrade rather than cut:** make the band carry the cost the prose only asserts.
   Draw the session band as a fill that grows left to right, from a thin bar of content under step 1 to
   a band that is nearly full under step 3, with the free space above it shrinking. Keep the three step
   cards, the three checks and the pause exactly as they are. Add one label on the right edge in the
   step's own muted style, `sequential-steps.filling`, reading "no room left for step four" (Dutch:
   "geen plaats meer voor stap vier"). What the reader then takes from it is the thing `sequential.2`
   asserts and nothing on the page shows: the sequential workflow's price is paid in window, and it is
   paid monotonically, so the pause is not free either. That also gives the pause glyph a second job
   (stopping here costs you the fill when you come back, which is `caching.3` met in a picture) and it
   joins the shared vocabulary rather than inventing a new one.
   **What not to do:** do not add a fourth step card, and do not colour the fill anything but the
   existing primary tints. A red or amber fill would read as failure, which is the mistake
   `AnswerProvenance` and `PickTheTier` both already avoid on the record.

2. **Nothing else here needs a drawing.** In particular the caching section should stay undrawn. A
   prefix-match diagram would draw the sentence "read from the first byte" and nothing more, which is
   the figure this repo cuts. The deck already handles that section with a `statement` slide
   (`deck-harness-cache`), which is the right shape.

---

## Supporting tasks

`CutItUp` is a strong card: five moves over a real under-specified file in this repository, one tick,
three filenames whose separation is the exercise. `PatternMatch` follows it from the registry. The unit
asks for real work and the work is the right work.

One gap:

1. **Where:** the `Caching` section (`harness.caching.1` to `.3`)
   **Problem:** this is the only section in the unit that is pure telling, in a step whose whole method
   is "read the number yourself" (`ReadYourWindow` in `context`, `OneWindow` in `workshop`, the
   `/context` reading either side of the flag hunt). The section makes three checkable claims (the
   prefix is matched from the first byte, connecting a server mid-session reprices the whole window,
   an entry dies in about five minutes) and asks the student to believe all three. The middle one is
   the most surprising claim in the unit and the one most likely to change how they work, and it is
   observable.
   **Fix, with a caveat I want on the record:** a `TaskCard` on the caching section, three moves,
   ticked once to `kata.step1.cache`, worked against `kata/step1/java` in the session the student
   already has open from `tools`:
   - "Ask your agent something small and read what the last turn cost."
   - "Connect a second MCP server without clearing, then ask something small again. Read the cost."
   - "Clear, reconnect, and read it a third time."

   **The caveat:** which command prints a per-turn cost is a product fact and it differs by assistant,
   so the moves as written deliberately say "read what it cost" rather than naming a command, the same
   way `ConnectOne`'s moves name no command. Whoever writes this card must verify the readout against
   both CLIs first (`model`'s `usage-readout` shot is the existing precedent for what one looks like)
   and put the command in a `<pre>` above the card with a `data-assistant` split, not in a move. If the
   per-turn cache figure turns out not to be reachable in one of the two products, **do not ship a
   half-card**: accept the section as told-only and say so in the step CLAUDE.md, because a task whose
   measurement one reader cannot take is worse than no task.
   **Second caveat:** the unit already carries a card and a board under one "Test yourself". A third
   thing to do makes this the heaviest closing section in the step. If it lands, it belongs under the
   `Caching` heading as an inline card, not down in the exercise block, because the reading has to
   happen in the session the section is about.

---

## Quiz

The unit has no registry quiz and should not. Every quiz in the course sits in the opening units
(`promptQuiz`, `contextQuiz`) and this unit's check is `PatternMatch`, which is a better instrument
here: pattern recognition is a matching task, not a multiple-choice one. Decomposition sitting on the
board with no situation pointing at it is right, and it is right for the recorded reason (the task
above the board is the decomposition exercise), so the fourth target is not free by elimination.

Two items on the board itself.

1. **Where:** `match.scenario.critic` / `match.explanation.critic`
   **Problem:** the item is answerable by word-matching without understanding the pattern. The
   scenario reads "You have been shaping the same design all afternoon and you want to know what is
   wrong with it"; `harness.reflection.2` reads "An agent reviewing its own transcript has spent the
   last hour arguing for this design". Same situation, near-same words, one screen apart. It is also
   the only one of the three whose surface features point at no other pattern, so a reader who skimmed
   scores it. The other two items are good and do real work: `upgrade` requires seeing a dependency
   chain, `delegate` requires seeing that the work is wide and routine.
   **Fix:** rewrite the scenario so its surface points at the coordinator and only its purpose points
   at reflection.
   > EN `match.scenario.critic`: "The refactor is finished and you want a second agent on it before
   > you merge. It should come back with objections, not with more code."
   > NL: "De refactor is klaar en je wil er een tweede agent op zetten voor je merget. Die moet
   > terugkomen met bezwaren, niet met meer code."
   > EN `match.explanation.critic`: "A second agent is the coordinator's move too. What makes this one
   > different is what you ask it for: objections rather than code, from something that was not in the
   > room while you decided. That is reflection."
   > NL: "Een tweede agent inzetten is ook de zet van de coördinator. Wat dit anders maakt is wat je
   > hem vraagt: bezwaren in plaats van code, van iets dat er niet bij was toen jij besliste. Dat is
   > reflectie."

2. **Where:** `match.scenario.delegate`
   **Problem:** "You want to run a migration across a range of files." "A range of files" is not
   English anyone writes and it is vague where the item needs to be concrete: the explanation
   underneath calls it "a lot of files at once, and most of the work is routine", which is the
   information that makes the answer the coordinator, and none of it is in the question. The Dutch is
   equally vague ("een migratie doen van diverse files"), so this is not a case of the Dutch leading.
   **Fix:**
   > EN: "The same API migration has to land in forty files, and each one needs a small judgement
   > call."
   > NL: "Dezelfde API-migratie moet in veertig bestanden landen, en elk bestand vraagt een kleine
   > afweging."
   The "small judgement call" is what keeps the answer the coordinator rather than a shell script, and
   it keeps the item from collapsing into the sequential one.

---

## EN/NL parity

All 26 prose keys in `harness.html` have a Dutch entry. No em-dashes in either language. The
`<svg data-icon>` markers are correctly escaped in `nl.json`. `harness.lead.1` carries Copilot in both
languages, which the step CLAUDE.md records as having drifted once and been fixed. The translations are
rewrites rather than conversions and read like Dutch: `verschaalt` for a stale cache entry,
`onderbepaald` for under-specified, "Vaag overleeft die oefening niet" is better than a literal would
have been. No place where the Dutch is the truer version.

1. **Where:** `harness.caching.1` (nl.json)
   **Problem:** two gender slips in one sentence, both against the unit's own usage. "**De** harness
   zet een markering in **het** request." Everywhere else in this unit the Dutch says *het* harness
   (`harness.title` = "Het harness", `lead.1`, `lead.2`, `which-one-you-run.1`, `decomposition.2`, and
   the heading "**Welk** harness je draait" which only agrees with *het*), and *de* request (`lead.2`
   "In die request", `which-one-you-run.1` "in **de** request gezet heeft", `.2` "in elke request").
   This one sentence inverts both.
   **Fix:** "Het harness zet een markering in de request, en bij de volgende beurt wordt alles tot aan
   die markering herkend en aan ongeveer een tiende aangerekend."

2. **Where:** `harness.check-yourself.1` (the key itself, both bundles)
   **Problem:** the slug names a heading that no longer exists. Prose keys are `<unit>.<section>.<n>`
   where the section is slugified from the `<h2>` above the block, and the `<h2>` above this block is
   the shared `ui:quiz.title`, which renders "Test yourself". The step's own CLAUDE.md still calls it
   the "Check yourself" heading in two places, which is where this slug came from. Under the repo's
   own "a key is a location, not a summary" rule the key is stale in both bundles.
   **Fix:** this resolves itself if finding 1 under Restructure is taken (the block is deleted). If the
   block survives in any form, the section that owns it has to be an `<h3>` with its own key, the way
   `tools.connect-one.heading` is, and the aside becomes `harness.<that-slug>.1`. Also worth one edit
   in `front/src/steps/step1/CLAUDE.md`, which says "Check yourself" where the page says "Test
   yourself" (twice, in the `model` and `tools` paragraphs).

---

## Restructure

1. **Where:** `harness.html:159-161`, `<aside data-audience="guided" data-i18n="harness.check-yourself.1">`
   **Problem:** **this element renders for nobody, in either mode, in either language.** Verified
   against `prepareUnit` in `front/src/shared/lib/content.ts`. In self mode the audience filter at
   line 128 removes every `[data-audience]` whose value is not the current mode, so a `guided` aside
   goes. In guided mode the guided cut at line 185 drops every top-level node that is not a figure
   marker or an adopted heading, and the code comment says so in as many words: "The guided cut:
   everything that is not a figure or its adopted title goes, the `data-audience="guided"` blocks
   included." The aside is a direct child of `<body>`, so it is dropped both ways. This is precisely
   the bug the step's own CLAUDE.md records as the reason `workshop.the-board.1` was deleted: "It was a
   `data-audience="guided"` paragraph, and guided mode drops every run of prose whatever its attribute
   says, so it rendered for nobody." The same reasoning applies here and was not applied.
   **Fix:** delete the aside from `harness.html` and delete `harness.check-yourself.1` from `nl.json`.
   The line itself is good and belongs on the deck, which is where the step CLAUDE.md already says a
   teacher's line goes ("Anything a teacher needs to say out loud here belongs in the deck"). Proposed:
   add it as a `note` on a slide in the harness block. `deck-harness-decomposition` is the natural home
   because the line is about cutting, though that slide's comment records that its note was removed
   when the figure arrived, so the deck author should choose. EN note: "Cuts go on the board before
   anyone opens an agent. Three people, three different cuts." NL: "De knipbeurten gaan op het bord
   voor iemand een agent opent. Drie mensen, drie verschillende knipbeurten."
   **Ripple, and this is the part worth escalating:** the same dead-element pattern exists in four
   other places in the course, all verified by the same code path.
   `front/src/steps/step0/units/welcome.html:59` (`welcome.hints.2`),
   `front/src/steps/step1/units/session.html:21` (`session.lead.4`),
   `front/src/steps/step1/units/session.html:54` (`session.sessions-where-money.1`),
   `front/src/steps/step1/units/prompt.html:93` (`prompt.plan-mode.5`).
   The two in `session` matter most, because `front/src/steps/step1/CLAUDE.md` justifies them at
   length: "The paragraphs that do restate `context` are `data-audience="guided"` rather than deleted,
   because `context`'s whole prose is self-only ... so `session` is where a guided student first meets
   the re-send and the bridge has to be there." **That bridge does not exist.** A guided student never
   sees those paragraphs, so `session`'s recorded reason for keeping them is false and the gap it was
   meant to close is open. That is a step-1-wide finding, out of scope for this unit's fix but it
   should not be lost: either `data-audience="guided"` should stop being used on prose entirely (and
   `content.ts` should warn or the lint should catch it), or the guided cut has to make an exception
   for it. Right now the attribute is a trap that four authors have fallen into.

2. **Where:** `harness.which-one-you-run.1`
   **Problem and fix:** see Readability finding 1. Recorded here too because the fix is a key rename
   (`harness.which-one-you-run.1` becomes `harness.lead.3`) in the HTML and `nl.json`, which is a
   structural edit rather than a prose one.

3. **Not a finding, recorded so it is not "fixed" later.** The unit's `Caching` section sits between
   the harness-as-layer material and the patterns, and reads at first pass like a third subject
   wedged in. It is not: `tokens.reads-all.4` explicitly defers to it ("That is what a cache is here.
   The `harness` unit prices it"), and the prefix argument only makes sense once the reader knows the
   harness loads material at the top of every request, which `lead.2` has just established. Moving it
   would break a forward pointer from two units earlier. Leave the order alone.

---

## Verdict

This is a strong unit and it deserves the writing skill's designation as one of the two reference
files for house voice. The argument builds in one line from "the harness is the software you use" to
"here is what it loads that you never wrote" to "here is what that costs and how the cost is softened"
to "here are the four ways it can cut your work up, and each one decides where your context ends up",
and it closes on a real problem in this repository plus a board that makes the reader sort situations
rather than recite definitions. Nothing is re-argued, the two back-pointers (`coordinator.3` to
decomposition, and `tokens`/`model` inward to caching) are exact, and the Dutch is a rewrite rather
than a conversion. It would sit comfortably beside the best technical courseware I know of. The
defects are four real ones and a handful of small ones: one element that renders for nobody, one
price claim that leaves two columns of the course's only price table unexplained, one figure that
transcribes its paragraph, and one quiz item answerable by phrase-matching. None of them is a defect of
voice, and the pass on this unit should be surgical.

Priority order:

1. **Delete the dead `harness.check-yourself.1` aside** and move its line to the deck (Restructure 1).
   Then escalate the four sibling cases, especially `session`'s two, whose absence falsifies a recorded
   design decision.
2. **Add the cache-write premium to `harness.caching.1` and the hour rate to `.3`** (Truthfulness 1
   and 2). Two sentences, both checkable against `ModelPricing` by eye, and they close the only place
   in the course where the price table has columns nothing explains.
3. **Rewrite `match.scenario.critic` and its explanation**, and tighten `match.scenario.delegate`
   (Quiz 1 and 2). One of three items on the unit's only graded check is currently free.
4. **Upgrade `SequentialSteps` so the session band fills across the three steps** (Imagery 1). It is
   the one figure here that shows nothing the prose does not, and the fix makes it measure the cost
   `sequential.2` only asserts.
5. **Move `harness.which-one-you-run.1` up to `harness.lead.3`** so the section matches its heading
   (Readability 1 / Restructure 2). Key rename in both bundles, no prose rewritten.
6. **Fix the Dutch gender in `harness.caching.1`** (Parity 1), and tighten `caching.3`'s closing
   instruction (Readability 3).
7. **Consider a caching task**, but only if the per-turn cost readout verifies on both CLIs
   (Tasks 1). Ship nothing half-verified here.
8. **Cut the GAN sentence from `harness.reflection.1`** (AI tells 1), unless the author defends it.
9. **Close audit item 31 as wontfix** with the reasoning at the top of this dossier.
