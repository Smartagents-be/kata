# step1/recap — audit dossier

**Files read:** `front/src/steps/step1/units/recap.html` (85 lines), `front/src/steps/step1/CLAUDE.md`
(lines 817-853 own this unit), `front/src/steps/step1/index.tsx:198-202`, `locales/nl.json`,
`locales/en.json`, `deck.tsx:494-532`, plus every unit the nine bullets point at, `shared/lib/icons.ts`,
`shared/lib/content.ts`, `ModelPricing.tsx`, and `audit.md` rows 12/35/46/59/73/76/77/128/151.

**Prior art acknowledged.** `audit.md` item 35 already records what this unit costs: 357 words, no
figure, nothing to do, and nothing at all on the page in guided mode. It also calls it "the
best-sequenced unit in the course". Table 1b item 4 already records the Claude-only bullet as the
course's second one-sided block. None of that is my discovery and none of it is re-litigated below
except where I have a view the audit does not state.

This is a short, disciplined, genuinely human page. Two defects survive verification, both small and
both checkable against the unit's own written charter. Everything else I went looking for came back
clean, and I say so rather than manufacturing volume.

---

## 1. AI tells

**None.** I looked hard, against the brief's list, and the prose is human.

What I checked and cleared:

- **"not X, but Y"** in `recap.where-this-goes.1` ("not what the agent knows, but how you hand it
  work") is *not* the banned "it's not just X, it's Y" escalation. It is a genuine contrast between
  two subjects, and it is the same framing the root `CLAUDE.md` uses for step 2 ("how you work with
  an agent, as opposed to what it knows"). Leave it.
- **The five-item list in `recap.lead.1`** ("what the text is measured in, what fills it, what it
  costs, who reads it and where its answers came from") is an enumeration of eight units' subjects,
  not a rhythm of tricolons. It is the only list of its kind on the page.
- **Symmetry.** Nine bullets in one shape would be a tell in prose. Here it is a table written as a
  list, defended in `CLAUDE.md` ("It ran as two lists first... Merging them is what fixed it"), and
  the bullets vary in length from one line to three. Not a machine.
- **No summary paragraph, no gesture at significance.** `where-this-goes.1` is two sentences and
  stops. "That is step 1." is a four-word sentence doing the work a paragraph would have done badly.
- **No em-dashes**, English or Dutch. Verified by grep over both.
- **No banned intensifiers.** Zero instances of crucial / essential / powerful / seamless / robust /
  leverage / utilize / delve anywhere in the unit or its Dutch.

Move on.

## 2. Truthfulness

I verified every checkable claim in the unit against the repository and against current model facts.
**Nothing is wrong.** One finding below is a consistency defect rather than a false statement.

Verified clean:

| Claim | Verified against |
| --- | --- |
| "code is dearer than prose" (bullet 1) | `tokens.not-words.2` verbatim: "Prose is the cheapest thing you can put in front of a model. Identifiers, hashes and ids are the dearest" |
| "what the model spent on thinking stays in there too" (bullet 2) | `prompt.instruction.3`. True in an agentic harness: thinking blocks are echoed back unchanged on the same model, which is why context editing ships a `clear_thinking` strategy at all |
| "A tool costs you by existing, called or not" (bullet 3) | `tools.list-itself-window.2`, both assistant halves |
| "Nothing in the window is marked stale, and the pile only grows" (bullet 4) | `context.bad-context-bad.3` ("Nothing in the window says 'stale'") + `context.entropy.1` ("the context only grows") |
| "compaction picks for you" (bullet 4) | argued in **both** `context.amnesia-context-fatigue.1` and `session.compaction-picks-moment` — so the claim under a `context` link is honest, not borrowed |
| "adding to a session is cheap and rebuilding one is not" (bullet 5) | `session.sessions-where-money.2`, near-verbatim |
| "an entry goes stale after about five minutes" (bullet 6) | `harness.caching.3`, and correct as a fact: 5 minutes is the default cache TTL, with a longer paid option. The recap drops "by default"; "about" carries it, and a one-line bullet is not the place for the 1-hour variant |
| "roughly one, three and five per token" (bullet 7) | `ModelPricing.tsx`: `$1 / $3 / $5` input across Haiku, Sonnet, Opus. Exactly 1:3:5, and those are the current published rates |
| "a test that goes red on an empty list" (bullet 8) | `truth.proof.1` + `.2`, fused correctly |
| "Your five-hour window opens on your first message" (bullet 9) | `model.five-hour-window.3` verbatim, and correctly gated `data-assistant="claude"` |
| "That is step 1. Step 2..." link target | `/steps/step2/evolution` — `step2/index.tsx:58` confirms `evolution` is step 2's first unit |
| "every unit before the hunt" = eight bullets | registry order `tokens, prompt, tools, context, session, harness, model, truth` = 8, matching `workshop.one-window.1`'s own "You have spent eight units" |
| Every anchor word carries the right link | `tokens`→tokens, `thinking`→prompt, `tool`→tools, `window`→context, `session`→session, `harness`→harness, `tier`→model, `filled the gap`→truth. **The link sits on the word the linked unit actually owns**, in all eight. This is tighter than the CLAUDE.md claims for it |

### Finding 1 — bullet 7 carries a gem the unit it points at never issued

- **Where** `recap.what-costs-do.7` (`units/recap.html:62-66`)
- **Problem** The unit's own rule, `step1/CLAUDE.md:832`: *"Every icon is lifted rather than chosen.
  The move half carries the marker the unit itself put on that advice... An icon here that is not on
  the paragraph it came from is drift, in one direction or the other."*

  Bullet 7's move is "Let the expensive model write the brief and a cheap one run it", which is
  `model.let-it-pick.1` ("the expensive model works out what has to happen, and the parts go to
  cheaper ones"). **`model.let-it-pick.1` and `.2` carry no icon at all.** I grepped every
  `data-icon` in the step: `model.html` has a coin on `cost.1`, coins on `api-vs-subscription.2`
  and `.3`, and one gem+coin on `five-hour-window.4` — which is the Claude-only section and is
  already bullet 9's marker. So the gem on bullet 7 has no source in `model`.

  The nearest gem+coin pair for that shape of advice is `prompt.meta-prompting.2` ("Spend an
  expensive model on this... the top tier is cheap here"), but that is a *different* piece of advice
  (letting a model write your prompt) and its marker is already spent on bullet 2's bundling. The
  coordinator version of the advice, `harness.coordinator.1`, carries a **coin only**.

  This is checkable by any student who follows the icon back, which is exactly what `welcome`'s
  legend invites them to do.
- **Fix** The CLAUDE.md itself names both directions. I recommend the **additive** one, because the
  advice genuinely is a saving *and* an easy-to-miss move, and because it leaves the recap untouched:
  put the pair on the paragraph that owns the advice, following the step's placement convention
  (icon where the full stop would go, next sentence straight after).

  `model.html`, `model.let-it-pick.1`, last sentence becomes:

  > The saving is the gap you priced above, five against one
  > `<svg data-icon="gem"></svg> <svg data-icon="coin"></svg>`

  and the Dutch `model.let-it-pick.1` gains the same two escaped markers at the same position.

  The alternative — dropping the gem from bullet 7 so it matches `harness.coordinator.1`'s lone coin
  — is defensible and cheaper, but it demotes the single best cost move in the step to "just a
  saving". If the reviewer prefers not to touch `model`, take that route instead; do not leave the
  mismatch.
- **Severity** Low. Nothing on screen is wrong; the trail back is broken.

## 3. Progression

The sequencing is the strongest thing about this page and I want to be explicit that I checked it
rather than deferring to `audit.md`:

- **`recap` sits after `workshop`, and that is right.** A recap before the capstone would spoil the
  hunt; the forward pointer belongs on the page that looks back. `workshop`'s deleted `Looking back`
  moved here whole (`CLAUDE.md:850`), and the seam is marked at both ends.
- **"the hunt" is not jargon on arrival.** I suspected it was, and it is not: `workshop.one-window.1`
  says "the hunt fills a window in front of you", NL "de jacht vult een venster onder je ogen". The
  recap's "every unit before the hunt" is a paid-off callback one page later.
- **Bullet order is registry order**, checked against `index.tsx:85-197`. Nothing recites the order
  anywhere else, so moving a unit is still a registry change.
- **Nothing is re-argued.** Every bullet compresses a claim its own unit already made; the page adds
  no new claim anywhere. That is the charter, and it holds.
- **The Claude-only bullet is last**, so a Copilot reader sees a clean eight and the
  one-bullet-per-unit rule stays legible for them.

### Finding 2 — bullet 5 is the one line where the move does not answer the cost

- **Where** `recap.what-costs-do.5` (`units/recap.html:51-55`)
- **Problem** The page's stated shape, `step1/CLAUDE.md:820`: *"every bullet is a cost and the move
  that answers it"*. I tested all nine against that:

  | # | cost | move | answers? |
  | --- | --- | --- | --- |
  | 1 | counted in tokens, code is dearer | ask in the language it read most of | yes |
  | 2 | follow-ups re-send, thinking stays | bundle | yes |
  | 3 | a tool costs by existing | turn off what this task does not need | yes |
  | 4 | nothing marked stale, pile grows | clear at your own seam | yes |
  | **5** | **you typed none of it, all re-sent** | **ask everything while the code is in front of you** | **no** |
  | 6 | harness caches the front | keep the cache alive | yes |
  | 7 | tier multiplies all of it | expensive writes, cheap runs | yes |
  | 8 | grounded and guessed sound the same | ask for the check | yes |
  | 9 | window opens on your first message | say hello five hours before the break | yes |

  Bullet 5 is the only outlier. Its move does not answer its cost, it **exploits** it: the cost is
  "everything in there goes out again", and the move is "put more in there". A reader who takes the
  page at its own word gets a small jolt at line 5. The connective tissue exists in `session` itself
  (`sessions-where-money.2` supplies "so the price per message is your session size" before `.3`
  gives the advice), and it is the half that got compressed away.

  This compounds with the bullet being the only one with no icon, so line 5 reads as the weakest on
  the page on two counts at once.

  I am **not** proposing to swap in session's headline lever ("you can throw the session away").
  Bullet 4 already carries clearing, and two clearing bullets one line apart would be worse than the
  current state. The fix below is one clause, keeps the existing move, and restores the pairing.
- **Fix** `recap.what-costs-do.5`, replacement for the sentence after the bold half:

  > Since what it read early is what you keep paying for, ask everything you want about a piece of
  > code while it is still in front of you.

  Dutch, `recap.what-costs-do.5`, same position:

  > Wat het vroeg gelezen heeft, is waar je blijft voor betalen, dus vraag alles wat je wilt weten
  > over een stuk code zolang het nog voor je ligt.

  Note this also drops "because adding to a session is cheap and rebuilding one is not" — that clause
  is a second sentence's worth of argument riding on a comma, and the unit's own one-line rule
  (`CLAUDE.md:822`) says a claim needing a third sentence belongs in the unit it came from. It is
  intact in `session.sessions-where-money.2`, which the bullet links to.
- **Severity** Medium. It is the only structural break on the page.

## 4. Readability

Clean, with the bullet-5 stumble above already logged. Everything else I flagged on a first pass
dissolved on checking:

- **Bullet 4's "at a seam you pick rather than the one compaction picks for you"** is 24 words with
  two subordinate clauses, and `seam` and `compaction` are both recall terms rather than defined
  ones. In a recap that is correct: the terms are cues for a reader who has met them, and both are
  one click away on the `window` link. No change.
- **Bullet 6's "start over on purpose"** reads thin next to the other eight imperatives. But
  `harness.caching.3` supplies the scenario ("Walk away for a meeting... Start a fresh session
  instead") and the bullet links there. Borderline; I am **not** raising it as a finding, because the
  fix would be a third clause the one-line rule forbids and the difference is a preference.
- **Heading "What it costs, and what to do about it"** is a plain label, sentence case, short, not a
  question, not a gerund. It says what the section is without saying what its first line says.
  Complies with `lesson-writing`.
- **Icon placement** follows the house convention throughout: icon where the full stop would go, with
  a trailing period because each ends its bullet. Consistent across all eight marked bullets.

## 5. Imagery

**No figure should be added here, and I want to be specific about why, because the audit's ◐ on this
unit's cadence is the kind of row that invites someone to answer it with a drawing.**

The bar recorded in this repo is that a figure must carry something the sentences do not. A recap has
no sentences of its own to exceed: every claim on the page is already drawn, or deliberately not
drawn, in the unit that owns it. `SessionMakeup` has share-by-volume, `BundleCompare` has the
re-send, `ModelPricing` has the ratios, `TokenSplit` has the tokeniser, `AnswerProvenance` has
provenance. Any recap figure is therefore either a repeat of a step figure (which the deck already
solves, since it reuses the step's own components) or a new claim (which the unit's charter forbids:
`CLAUDE.md:822`, "nothing here re-argues anything").

**The strongest candidate I could construct, and why I reject it.** `OneWindow` asks the student to
write down two `/context` numbers, one before the hunt and one after, and nothing on the page ever
receives them. A recap figure could take those two numbers as input and print the delta against
`ModelPricing`'s rate: two entry fields, a bar showing before/after fill, and one line of money
underneath. That genuinely measures something no prose can — it is the student's own session, not an
example.

It still fails, on three counts:

1. It would make the recap **the second place in the course that multiplies**, and `model.cost.4` is
   deliberately the only one (`CLAUDE.md:450`).
2. It would make the recap **ask for something**, which `CLAUDE.md:566` says it never will: *"`recap`
   is outside all of this and always will be: it asks for nothing."*
3. It would put a fifth thing to do immediately after a capstone the student has just finished.

So: no new figure, and no existing figure fails the bar, because there are none. The empty guided
page is a real consequence and it is answered off-page — I verified the deck block exists
(`deck.tsx:501-531`: one divider carrying three points, then `one-window`, `moves`, `next`), which is
exactly what `CLAUDE.md:848` claims for it. The pairing is undocumented in the app itself and would
break silently if the deck block were ever cut, but that is a fragility rather than a defect, and it
is already implied by audit row 12.

## 6. Supporting tasks

**None, and none should be added.** Same reasoning as the figure, plus one more: the step's five
`TaskCard`s (`CutItUp`, `ReadYourWindow`, `SurviveTheClear`, `ConnectOne`, `OneWindow`) all sit in
units that argue something first and then hand the student the doing. The recap argues nothing new,
so a card here would be an errand with no lesson behind it, arriving after a two-to-four-hour flag
hunt. The brief's mandate (h) — every module closes on a workshop the reader can test their skills at
— is met by `workshop`, which sits *before* this page. Testing after the test is not the ask.

## 7. Quiz

**No quiz, and it should not have one.**

The case for one is not nothing: `promptQuiz` and `contextQuiz` are both within-unit, and the recap is
the one page in the step where a *cross-unit* question would be honest — "which of these four
sentences describes a cost you cannot prune after the fact?" is a real question that only a reader who
finished the step can answer.

I still recommend against it, for reasons I can name rather than defer:

1. **It would be the third graded thing in three consecutive pages.** `model` ends on `PickTheTier`,
   `workshop` is a flag board plus a card, and `recap` follows immediately. That is a cadence problem,
   not a coverage one.
2. **`QuizPanel` writes progress and can mark the unit done on an ace.** A recap that can be "passed"
   changes what the page is.
3. **The unit's charter is that it asks for nothing.** A quiz is the largest possible violation of
   that, larger than a card, since it is graded.
4. In guided mode a quiz would come from the registry and therefore *survive* the prose cut — turning
   the deliberately empty class page into a page that is one quiz and nothing else, which is neither
   the deck's recap nor the student's.

If the course ever wants a cross-step assessment, `step2`'s opening is the place for it, not step 1's
close.

## 8. EN/NL parity

**Complete, and mechanically verified.** I parsed both bundles and diffed structure, not just keys:

- All **13** `data-i18n` keys in `recap.html` have Dutch entries. No orphan `recap.*` keys in
  `nl.json`.
- **Inline tag sets match key by key** (`strong`, `a`, `svg`, `code`) — no Dutch entry has lost or
  gained a link or an icon.
- **Every `href` matches in order**, including `/steps/step2/evolution`.
- `recap.title` is present in both (`Recap` / `Terugblik`).
- No em-dash or en-dash in either language.
- Icons are correctly escaped in `nl.json` (`<svg data-icon=\"gem\"></svg>`), per `lesson-writing`.
- The Claude-only bullet 9 carries **no `.claude` suffix** on its key, which is right: there is no
  Copilot sibling for a missing translation to fall back to.
- `deck.recap.*` keys (6 of them) exist in both bundles.

The Dutch is a rewrite, not a conversion, and reads like a Dutch colleague: "Daar ging elke unit vóór
de jacht over", "Je hebt bijna niets van de sessie zelf getypt", "draait de vraag om". No place where
the Dutch is truer than the English, so the repo's Dutch-leads rule does not fire here.

Two things I checked and cleared rather than flagging:

- **"verloopt" (bullet 6) against `harness.caching.3`'s "verschaalt".** Different Dutch verbs for the
  same cache fact one unit apart. Both are correct; the recap's is the plainer word, and a recap is
  the right place for the plainer word. Not drift, no change.
- **"Het harness"** in bullet 6 matches the step's dominant Dutch gender (17 instances of *het*
  against 1 of *De*). The one outlier is outside this unit and outside my scope; worth someone's grep
  in a future pass, not a recap finding.

---

## Verdict

**Strong.** This is one of the best-made pages in the course and I could not honestly find much wrong
with it. The prose is human throughout, every one of the eleven factual claims I could check against
the repository or against current model pricing came back correct, the eight anchor words each link
to the unit that genuinely owns the claim they sit on, and the Dutch is a full structural match down
to the tag sets. The decisions that look like gaps — no figure, no task, no quiz, empty in guided
mode — are all recorded, all coherent, and all correct; I constructed the strongest counter-proposal I
could for each and rejected them against constraints the repo wrote down first. The two defects are
small and local: one line where the page's own cost-and-move shape breaks, and one icon whose trail
back to the paragraph that earned it is broken.

Priority order:

1. **`recap.what-costs-do.5`** — restore the cost/move pairing with the one-clause bridge above, in
   both languages. This is the only place the page contradicts its own stated shape, and it is the
   line a careful reader stumbles on.
2. **Bullet 7's icons** — add `gem` + `coin` to `model.let-it-pick.1` (EN and NL) so the marker has a
   source, or strip the gem from the recap bullet. Either direction closes it; leaving it open means
   a student who follows the legend finds nothing.
3. **Nothing else.** Specifically: do not add a figure, do not add a task card, do not add a quiz, and
   do not split the merged list back into costs-then-advice. Each of those would answer a count in
   `audit.md` by damaging something the unit does well.
