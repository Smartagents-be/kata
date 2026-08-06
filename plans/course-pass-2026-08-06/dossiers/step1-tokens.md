# step1 / tokens — audit dossier

**Files read:** `front/src/steps/step1/CLAUDE.md` (the `tokens` section, lines 68–212),
`front/src/steps/step1/units/tokens.html`, `index.tsx`, `locales/en.json`, `locales/nl.json`,
`WordsIntoTokens.tsx`, `TokenSplit.tsx`, `NextToken.tsx`, `TokenAttention.tsx`, `PickTheNext.tsx`,
`deck.tsx` + `deck.tokens.*`, `audit.md`, `.claude/skills/lesson-writing/SKILL.md`.

**Prior art:** `audit.md` Table 1b lists `tokens` with an empty row (no gaps), and Table 2 row 3
marks it `● ●` for cadence and sequence with an empty effort cell. So everything below is a
discovery rather than a known gap, and the bar on being right is correspondingly high. Measured
word count 701, matching the audit; five figure markers, four figures plus `PickTheNext`.

**Constraints I checked my findings against, and did not propose breaking:** no context frame in
any figure here; `unscrambled` as the word that breaks; the `NextToken` → `TokenAttention` pair on
`the build failed because it timed out`; the favourite chain `timed → out → .`; no quiz; no
currency; two forward pointers and no third telling; `TokenSplit` staying single-language; the
cut-hard prose with no summary and no handoff.

---

## AI tells

The prose is human and it is good. Short declaratives, uneven paragraph lengths, fragments used on
purpose ("Again."), concrete nouns throughout, a stated view rather than a balanced survey. I found
no "let's dive in", no "crucial/powerful/seamless", no gestural closer, no on-the-one-hand.
I looked hard and there is one.

**1. `tokens.one-at-a-time.2` is a summary paragraph that restates the figure above it and adds no
claim.**

- **Where** `tokens.one-at-a-time.2`, `units/tokens.html:80-83`
- **Problem** Both of its sentences are already on screen inside `NextToken`, in the component's own
  strings. "on the third one the model reads all seven tokens to produce one" is
  `next-token.pass` ("Pass {{pass}}. The model reads all {{read}} tokens to produce one.") written
  out in words. "No sentence is being written out here" is `next-token.done` ("No pass knew what the
  one after it would pick.") from the other side. This is precisely the layer the step's own
  `CLAUDE.md` records as having been removed from this unit: "Sentences that told the student to
  click something, or that recapped what the figure had just shown, were taken out one at a time."
  This one survived, and it is the paragraph standing between the figure and `.3`, which is the
  section's real payoff line.
- **Fix** Cut `tokens.one-at-a-time.2` entirely and renumber `.3 → .2`, `.4 → .3`, `.5 → .4` in
  `units/tokens.html` and `locales/nl.json`. The renumbering has two known referrers that must move
  in the same commit: `NextToken.tsx:15` and `PickTheNext.tsx:16` both cite
  `tokens.one-at-a-time.4` by key in their doc comments. After the cut, `On its own, <code>it</code>
  predicts nothing at all.` follows the figure directly, which is the "figure, then one paragraph
  saying what it buys" shape the lesson-writing skill names.

**Watched and cleared, so it is on the record rather than a finding:** three three-item lists inside
four paragraphs (`lead.1` "survive whole / break into pieces / swapped for a number", `lead.2`
"limited, priced and re-read", `not-words.2` "Identifiers, hashes and ids"). That is a rhythm, and
in generic prose it would be a tell. Here each list is concrete nouns doing work, and `lead.2`'s
three map onto three later destinations in the step (`context`, `model`, `reads-all`). Leave them.

---

## Truthfulness

**2. The unit contradicts itself on its own central mechanism, four sentences apart.**

- **Where** `tokens.reads-all.1` (`units/tokens.html:113-117`) against `tokens.reads-all.4`
  (`units/tokens.html:138-142`)
- **Problem** `.1` closes: "that whole weighing is thrown away and redone on the next pass. There is
  no index, and **no shortcut for the parts that did not change**." `.4` then says: "Adding to the
  end leaves every earlier weighing exactly as it was, so the front of the pile can be kept and
  charged at a fraction next turn. That is what a cache is here." A cache on the unchanged prefix is
  exactly a shortcut for the parts that did not change, and it is exactly the earlier weighings `.1`
  said were thrown away. A reader who is following closely, which is the reader this unit is written
  for, cannot tell which of the two is true. The step's `CLAUDE.md` treats the caching pointer as
  load-bearing ("appending leaves every earlier weighing intact") and nowhere records that `.1` is
  meant to state the uncached model first. This is the sharpest defect in the unit, and it sits in
  the paragraph that motivates the cache in `harness`, the pruning in `context` and the money in
  `model`.
- **Fix** Make `.1` a claim about lookup, not about persistence, and let `.4` own what survives.
  EN: `Inside every one of those passes, the model does not look anything up. Each token is weighed
  against every token in front of it, and every one of those weighings is worked out rather than
  fetched. There is no index, and nothing to search.`
  NL: `In elk van die beurten zoekt het model niets op. Elk token wordt afgewogen tegen elk token
  dat ervoor staat, en elke afweging wordt uitgerekend in plaats van opgehaald. Er is geen index, en
  niets om te doorzoeken.`
  Nothing else depends on the cut clause: the "reads all of it, every turn" heading is carried by
  `.3`'s pair arithmetic and by `next-token.pass`.

**3. `tokens.reads-all.2` asserts something that is false for most readers, and the figure above it
is what made it false.**

- **Where** `tokens.reads-all.2`, `units/tokens.html:123-127`
- **Problem** "This is the sentence you just watched it write, finished." `NextToken` was
  deliberately rebuilt so the reader takes the token on every pass (the step's `CLAUDE.md`: "take
  `was` instead of `timed` and a different sentence comes out of the same machine"). A reader who
  takes `was → not → ready` did not watch anything write `the build failed because it timed out`,
  and `TokenAttention` then shows them a sentence they never produced. The invariant the notes rely
  on is the *favourite chain*, so the prose has to name the favourite chain rather than assert what
  the reader did. (The same sentence also calls seven tokens "finished" while the favourite chain
  ends on a `.`, an eighth token; that is a footnote next to the main problem and is fixed by the
  same rewrite.)
- **Fix** EN first sentence: `Take the favourite three times above and this is the sentence you get,
  with the full stop left off.` NL: `Neem hierboven drie keer de favoriet en dit is de zin die je
  krijgt, zonder de punt.` The rest of the paragraph ("Hold `it` and the heaviest line runs back to
  `build`…") is correct and earns its place: each clause carries a claim (the heaviest link is the
  one a human would name, the first token has nothing behind it), so it is reading the figure rather
  than narrating it.

**4. `words-into-tokens.label` misnames the drawing it labels.**

- **Where** `words-into-tokens.label` in `locales/en.json` ("tokenization process") and `nl.json`
  ("tokenisatieproces")
- **Problem** The figure has six stages: word, tokens, a vector, the model as a field of numbers,
  a vector back, a token. Tokenization is stages one and two. Stages three to six are the forward
  pass, which is not tokenization by any definition, and they are the majority of the drawing and
  the whole of its payoff. The step's `CLAUDE.md` records why the eyebrow was changed away from
  "text at both ends, numbers in between" (a label that argues the picture is one more thing to read
  first), and that reasoning is sound, but the replacement bought brevity with a false name. The
  deck's own title for the same component is accurate: `deck.tokens.words.title` reads "Follow one
  word in, <hi>one token</hi> back out". So the page and the projector disagree about what the
  drawing is.
- **Fix** A name, not a claim, that is true of all six stages.
  EN `words-into-tokens.label`: `one word through the model`
  NL: `één woord door het model`
  The `words-into-tokens.description` screen-reader string is already accurate and needs no change.

**5. `tokens.lead.3`'s ratio disagrees with the figure two paragraphs below it.**

- **Where** `tokens.lead.3` (`units/tokens.html:31-34`) against `TokenSplit`'s `token-split.count`
  readout
- **Problem** The prose says "For ordinary English, four or five characters go into one token".
  `TokenSplit`'s prose sample is `The catalogue endpoint returns nine unscrambled titles.`: 55
  characters, 9 tokens, and the figure prints **6.1 characters per token** on screen. The reader can
  see the disagreement without leaving the page. It gets worse across the picker: `A class name`
  (`be.smartagents.kata.java.step1.CatalogController`) comes out at **4.4**, which is inside the
  band the lead just gave to ordinary English, while `not-words.2` calls identifiers "the dearest".
  Only the id row (1.6) is "several times" anything. So the unit's rule of thumb, its cost claim and
  its own measured figure point in three slightly different directions.
- **Fix** One clause, widened in the direction the figure will show, so the figure becomes the
  evidence rather than the counterexample.
  EN: `For ordinary English, four to six characters go into one token, so a page of prose runs to a
  few hundred.`
  NL: `Voor gewoon Engels gaan er vier à zes tekens in één token, dus een bladzijde proza komt op een
  paar honderd uit.`
  `not-words.2` then needs no edit: with the band widened, 6.1 against 4.4 against 1.6 reads as the
  ramp the paragraph describes. If finding 9 below is taken, the ratios are on screen together and
  the reconciliation is visible rather than asserted.

**6. Nothing on the page says the counts come from a tokeniser the student's agent does not use.**

- **Where** `token-split.caption` ("Split with o200k_base, a public tokeniser.") and
  `tokens.not-words.1`
- **Problem** `o200k_base` is OpenAI's GPT-4o tokeniser. This course is written for Claude Code and
  Copilot CLI, and every number in this unit, the 9 tokens, the 6.1, the four samples, comes from a
  vocabulary neither product uses. `TokenSplit.tsx:12-14` knows this and says so ("Every provider
  ships its own tokeniser and the boundaries differ in detail; what does not differ is the shape"),
  but that sentence lives in a source comment and never reaches a student. The caption cannot carry
  it: repo policy is that a caption names the source and the prose does the explaining. In a step
  that is otherwise careful about exactly this (no version numbers in `model`, a month on
  `ModelPricing`'s caption, a whole unit on where an answer came from), the omission is out of
  character.
- **Fix** One sentence at the end of `tokens.not-words.1`.
  EN: `Every provider ships its own vocabulary, so the boundaries differ in detail. The shape does
  not.`
  NL: `Elke aanbieder heeft zijn eigen woordenlijst, dus de grenzen verschillen in detail. De vorm
  niet.`

**7. Two stale HTML comments in `units/tokens.html` describe a unit that no longer exists.**

- **Where** `units/tokens.html:1-5` and `units/tokens.html:14-16`
- **Problem** The first says "the page keeps only the **three** figures". There are five figure
  markers and the step's `CLAUDE.md` says "four figures and one exercise", so the number is wrong
  under either counting. The second says of `WordsIntoTokens`: "It draws the paragraph above it and
  nothing else: the sentence, then the chunks, grouped by the word each came out of." That describes
  a figure that was replaced: the component now follows one word through six stages and, per
  `CLAUDE.md`, "the prose above says none of it". The two comments actively mislead the next person
  to open the file, and the second one contradicts the step notes directly.
- **Fix** `:1-5` → "…so the page keeps only the four figures and the exercise". `:14-16` → "The lead
  figure, and the one figure in the unit with no heading above it, so a guided room opens on the
  drawing rather than on a title. It follows one word all the way in and one token back out, and the
  paragraph above it says none of that."

**Checked and standing, recorded so the next pass does not re-derive it:** `reads-all.3`'s
arithmetic is right (7 → 21, 14 → 91, and 91 ≠ 42). `TokenAttention`'s seven rows each sum to
exactly 100 and total 21 links, matching the prose. Row 4 (`it`) peaks at 55 on index 1 (`build`),
so `reads-all.2`'s claim about the heaviest line is true of the data. Row 0 is empty, so "hold the
first token and nothing is drawn" is true. `NextToken`'s favourite chain is `timed(.34) → out(.89)
→ .(.62)`, product 0.1876, and `next-token.likelihood-done` says "under a fifth". `PickTheNext`'s
prompt is 4 tokens and `pick-next.description` says four. `PickTheNext`'s three scores sum to 100.
`one-at-a-time.2`'s "all seven tokens" is right for pass three. The uuid sample is a well-formed
8-4-4-4-12. `not-words.1`'s "longest pieces that vocabulary already knows" is a simplification (BPE
applies merges by rank rather than matching longest, and the two only usually agree), and it is a
defensible one for this audience: I am not asking for an edit. The `o200k_base` splits themselves
could not be re-derived here (no `tiktoken` in the environment) and are documented as real output;
they are the one set of numbers in this unit I could not independently verify.

---

## Progression

The unit builds well. Four sections in a defensible order: what a token is, why the cut is not
words, how generation runs, what each pass costs. Each section arrives at a figure, and the figures
escalate (static chain → picker → reader-driven tree → 21-arc mass). It genuinely opens cold and
genuinely stops without a summary, and both are right. A reader who finishes knows what a token is,
why code is dear, that the favourite is not a rule, and why long sessions cost more than their
length. The three things it does not settle are the three it hands off by name. That part is
excellent.

**8. Two consecutive sections take a bare "It" as their subject, and the two "It"s are different
things.**

- **Where** `tokens.not-words.1` → `tokens.one-at-a-time.heading` → `tokens.one-at-a-time.1`
- **Problem** `not-words.1` establishes the tokeniser as the actor and refers to it three times as
  "It" / "it" ("It cuts your input…", "Anything it has not seen often enough…"). The next heading is
  "It writes one token at a time", where "It" is the model, and `one-at-a-time.1` opens "Given
  everything **it** has been handed so far, **it** scores the tokens…" without ever naming the new
  subject. Nothing marks the handover. A reader coming straight off the tokeniser paragraph has no
  signal that the actor changed, and a tokeniser that scores what comes next is a genuinely
  available misreading of what this unit teaches. The Dutch is worse: `not-words.1` NL has "Hij
  knipt je invoer" (de tokenizer, masculine, correct) and the very next heading is "**Hij** schrijft
  één token per keer", so the pronoun does not even change form. See finding 13.
- **Fix** Name the subject once in the first sentence of the new section, which costs nothing and
  keeps the heading's run-on quality.
  EN `one-at-a-time.1`: `Given everything it has been handed so far, the model scores the tokens that
  could come next, and one of them is taken.`
  NL: `Op basis van alles wat het tot dan toe gekregen heeft, geeft het model de tokens die zouden
  kunnen volgen een score, en één daarvan wordt genomen.`

**9. The unit's two forward pointers are the only cross-unit references in step 1 that are not
links, and they are set in mono.**

- **Where** `tokens.one-at-a-time.5` ("The <code>model</code> unit puts numbers on that gap.") and
  `tokens.reads-all.4` ("The <code>harness</code> unit prices it."), `units/tokens.html:108` and
  `:141`
- **Problem** Grepped across all ten units of the step: every other cross-unit pointer is an anchor
  (`model.html:56,129,178`, `truth.html:10,52,80,94`, `workshop.html:31,37`, eight in `recap.html`).
  These two are the only ones written as `<code>`. Two consequences, and both are real. The reader
  cannot follow them, so the step's opening unit is the one place the pointer convention is not
  taught by example. And `front/CLAUDE.md` reserves JetBrains Mono for "anything the machine
  produced: code, counts, flags, catalogue titles". A unit name is none of those, so the typeface is
  saying these are identifiers when they are page titles. The lesson-writing skill states the shape
  explicitly: "Point at another unit rather than teaching it twice. A plain anchor on its path does
  it."
- **Fix** EN `one-at-a-time.5` closing sentence: `The <a href="/steps/step1/model">model unit</a>
  puts numbers on that gap.` EN `reads-all.4` closing sentence: `The
  <a href="/steps/step1/harness">harness unit</a> prices it.`
  NL, matching the phrasing `model.reasoning-level.1` already uses ("de unit over de prompt"):
  `De <a href="/steps/step1/model">unit over het model</a> zet daar cijfers op.` and
  `De <a href="/steps/step1/harness">unit over het harness</a> rekent het door.`

**10. `reads-all.3`'s coin marks a maxim where every other coin in the step marks a move.**

- **Where** `tokens.reads-all.3`, `units/tokens.html:129-134`
- **Problem** Step 0's legend defines the coin as "a way to spend fewer tokens", and the unit's
  other coin obeys it exactly (`not-words.3`: "Ask in the language the model has read most of").
  Here the coin sits on "the cheapest token is the one you never put in", which is an aphorism the
  reader cannot act on at this point in the course: nothing yet has told them what they could leave
  out or how. Low severity, and I would not rewrite the sentence, which is a good closer.
- **Fix** Either drop the coin from this sentence and let it stay a maxim, or keep it and add the
  move the step already owns elsewhere in one clause. The first is cheaper and I would take it.

---

## Readability

Nothing here rises to a numbered finding beyond what is already recorded above. Sentence lengths are
varied, no paragraph carries two arguments, every heading describes its section, and the one piece of
jargon that could bite ("distribution", `one-at-a-time.4`) arrives after the figure has drawn one.
The word *context* is used nowhere in the prose, which the step notes require and which I verified.
No em-dashes in the HTML or in any Dutch value for this unit.

One phrase to note without asking for an edit: `lead.2`'s "So what follows is not about what goes
into an agent, but about what you measure it in" has a vaguer subject than the Dutch. That is handled
as an EN/NL item (finding 12) rather than a readability one, because the Dutch already has the
better sentence.

---

## Imagery

Four figures, and three of them clear the bar without argument. `NextToken` measures something prose
cannot state: that a road not taken was never impossible, and that three near-certainties multiply
to 19%. `TokenAttention` measures the mass of 21 arcs and the shape of a softmax row, neither of
which survives being written down. `WordsIntoTokens` carries the one claim no sentence in the unit
makes, that past stage two there is no text anywhere. `PickTheNext` is an exercise and is judged
below. None of them is a picture of a claim the paragraph already made. This is the best figure work
in the course and I am not proposing to touch any of the four drawings.

**11. `TokenSplit` hides the comparison the section it sits in is arguing.**

- **Where** `TokenSplit.tsx`, under `tokens.not-words.heading`
- **Problem** The section's whole claim is comparative: prose is the cheapest thing you can hand a
  model, ids are the dearest, and the gap is "several times". The figure holds the four measurements
  that would settle it, and shows exactly one at a time. To compare prose (6.1) against an id (1.6)
  the reader must click, read a number, remember it, click again and subtract. So the one claim in
  the unit that a drawing could genuinely settle is the one the drawing makes the reader do in their
  head, and finding 5's disagreement between the lead and the figure is invisible for the same
  reason. The picker itself is right and defended in the notes (four samples, real data, no free
  text field); what is missing is a persistent reading.
- **Fix** Add a fixed four-row strip immediately under the sample chips and above the panel, always
  showing all four, unaffected by the selection except for emphasis. Rows in the picker's own order
  (prose, Java, class name, id). Each row: the sample name on the left in the reading face, a
  horizontal bar whose length is **tokens per 100 characters** (prose 16, Java 22, class name 23, id
  61), and the number at the right end in mono. The selected sample's bar in solid `--primary`, the
  other three in the muted fill the step gives to given text. Axis: one scale, 0 to the widest row,
  no ticks, no gridlines. What the reader takes from it in one look: the id is nearly four times the
  prose, and a class name is only slightly worse than a line of Java. That is the ramp `not-words.2`
  asserts and currently cannot show. Two new locale keys (`token-split.rate.label`,
  `token-split.rate.unit`) in both bundles; the per-sample names already exist. This does not touch
  the chips, the source line, the count line or the caption, so no recorded constraint moves.
  See also finding 4: the label on the *other* figure is a separate, cheaper defect.

---

## Supporting tasks

**No finding, and this is a deliberate no.** The unit already asks the reader to do four things:
switch samples in `TokenSplit`, take a token three times in `NextToken`, hold a token in
`TokenAttention` and answer `PickTheNext`. That is more doing than any other prose unit in step 1,
and `PickTheNext` is graded. Adding a `TaskCard` here would mean a sixth card in a step whose notes
count five in three places, and there is no honest move to put on it: the unit's subject is a unit
of measurement, the student has no tokeniser to run, the step's own `/context` reading is `context`'s
task and is the right place for it, and sending a student to an external tokeniser website is a shape
this repo uses nowhere. The step's `CLAUDE.md` also records that instructions to click were removed
from this unit one at a time; a card would be that layer coming back with a border around it. Leave
it.

---

## Quiz

**No finding.** The unit correctly carries none. Three reasons, and all three hold. `promptQuiz` is
on the next page and `contextQuiz` three pages on, so a quiz here would put three quizzes in the
step's first four units. `PickTheNext` already asks this unit's one genuinely misbelievable
question, and asks it better than a multiple-choice item could, because the distractors are drawn
with their scores on screen: `merged` at 46% against `approved` at 23% makes picking the favourite
the reasonable move and still the wrong answer. And the unit writes no progress key, which is right
for one question.

For the record, if a quiz is ever wanted here, `one-at-a-time` is the wrong section to take it from,
because `PickTheNext` owns it. The section with a genuinely believable wrong answer is `reads-all`:
"why does a long session get slower as well as dearer", with distractors "the model has more to
remember", "the harness sends a larger request each turn" and "each token is weighed against every
token before it, and the count of pairs grows faster than the count of tokens". All three are things
a working developer might say out loud. I am not proposing it; I am recording where it would go.

---

## EN/NL parity

Parity is clean at the mechanical level. All twelve prose keys have Dutch entries, as do all
`words-into-tokens.*`, `token-split.*`, `next-token.*`, `token-attention.*` and `pick-next.*` keys.
The English-only strings are the right ones: `TokenSplit`'s four sample splits, `NextToken`'s
`PROMPT` and `TREE`, `TokenAttention`'s `TOKENS`, `PickTheNext`'s `PROMPT` and `CANDIDATES`, all
machine-shaped and all correctly carrying no `nl`. No em-dashes in any Dutch value. Three places the
two languages say different things.

**12. `tokens.lead.2`: the Dutch names the subject and the English does not.**

- **Where** `tokens.lead.2`, `units/tokens.html:24-29` against `nl.json`
- **Problem** NL: "**Deze unit** gaat dus niet over wat er in de agent belandt, maar over hoe je het
  afmeet." EN: "So **what follows** is not about what goes into an agent, but about what you measure
  it in." "What follows" is vague where the Dutch is concrete, and it is the sentence carrying the
  unit's whole framing. Per repo policy the Dutch is the truer version and the English is what gets
  rewritten. (The other half of the same key runs the other way: EN "a language model" is better
  than NL "een LLM", which uses an acronym the course has not introduced. Worth fixing in the Dutch
  in the same pass.)
- **Fix** EN: `So this unit is not about what goes into an agent, but about what you measure it in.`
  NL: `Een token is de eenheid waarmee een taalmodel werkt.` for the opening sentence, leaving the
  rest of the Dutch value as it stands.

**13. The Dutch headings use "Hij" for the model, the Dutch deck uses "Het", and the preceding Dutch
paragraph uses "Hij" for the tokeniser.**

- **Where** `tokens.one-at-a-time.heading` ("Hij schrijft één token per keer"),
  `tokens.reads-all.heading` ("Hij leest alles, elke beurt opnieuw"), against
  `deck.tokens.next.title` ("Het schrijft één token per keer") and `deck.tokens.attention.title`
  ("En het leest alles, elke beurt")
- **Problem** Two separate things, and they compound. *Het model* is neuter, so "Hij schrijft" is
  wrong on its own terms. And it lands directly after `not-words.1` NL, where "Hij knipt je invoer"
  correctly refers to *de tokenizer*, so the Dutch reader gets the same pronoun for two different
  actors with nothing between them. The projector and the page then disagree, in a room where both
  are on screen at once. This is the Dutch half of finding 8 and it is sharper than the English.
- **Fix** Page headings to match the deck: `tokens.one-at-a-time.heading` → `Het schrijft één token
  per keer`; `tokens.reads-all.heading` → `Het leest alles, elke beurt opnieuw`. With finding 8's
  "geeft **het model** de tokens … een score" naming the subject in the first sentence beneath, the
  "het" then resolves.

**14. `tokens.not-words.3`: the English closing clause is looser than the Dutch.**

- **Where** `tokens.not-words.3`, `units/tokens.html:61-67`
- **Problem** NL: "en daarover antwoordt het navenant zwakker" (and it answers correspondingly more
  weakly *about that*). EN: "and the answers are shakier for it", where "for it" can be read as
  "because of it" or "about it" and the sentence works either way. The Dutch is unambiguous about
  what is shaky and about what subject. Small, but this is the sentence carrying the unit's one
  cross-language claim, and it is the one the step's notes say must state the link "in one clause
  and stop", so the clause has to be exact.
- **Fix** EN: `Your class names and a language with little text online it has not, and it answers
  worse on both.`

---

## Verdict

This is a strong unit and it is not an excellent one yet. The figure work is the best in the course:
four drawings that escalate, none of which restates its paragraph, and `NextToken` in particular
does something almost no courseware does, which is hand the reader the control that makes the
lesson's claim falsifiable. The prose is cut hard, opens cold, stops without a summary, and reads
like a person. `audit.md` marks the unit clean and I understand why. But it carries a
self-contradiction on the mechanism the whole step is built on: `reads-all.1` closes the door that
`reads-all.4` then opens, and neither acknowledges the other. Next to that sit three smaller
untruths a student can catch on the page itself: a figure label that names two of six stages, a
character-per-token figure that disagrees with the readout underneath it, and a sentence claiming
the reader watched a sentence being written that the redesigned figure invites them not to watch.
Add two forward pointers nobody can click and a pronoun that changes referent without warning in
both languages, and the unit is a handful of one-clause edits away from being genuinely excellent.
None of the fixes below touches a recorded constraint. The one addition I am proposing, the
persistent ratio strip on `TokenSplit`, is the only item costing more than a sentence.

**Priority order:**

1. **Finding 2** — `reads-all.1` vs `.4`. One sentence in both languages. This is the one that
   leaves a careful reader not knowing what is true.
2. **Finding 3** — `reads-all.2`'s false opening. One sentence in both languages.
3. **Finding 4** — `words-into-tokens.label`. Two locale values.
4. **Finding 5** — `lead.3`'s four-or-five against the figure's 6.1. One clause in both languages.
5. **Finding 8 + 13 together** — the "It"/"Hij" referent, English body and Dutch headings, in one
   edit. Fixes the page/deck disagreement at the same time.
6. **Finding 9** — the two `<code>` pointers become anchors. Four values.
7. **Finding 1** — cut `one-at-a-time.2`, renumber, and update the two component doc comments that
   cite `one-at-a-time.4`.
8. **Finding 6** — the tokeniser-provenance sentence in `not-words.1`.
9. **Finding 11** — the persistent ratio strip on `TokenSplit`. The only item with real cost, and
   it is what makes finding 5's reconciliation visible instead of asserted.
10. **Finding 12** — `lead.2`, English rewritten off the Dutch, plus "taalmodel" for "LLM".
11. **Finding 7** — the two stale HTML comments.
12. **Finding 14** — `not-words.3`'s closing clause.
13. **Finding 10** — the coin on `reads-all.3`. Take it or leave it.
