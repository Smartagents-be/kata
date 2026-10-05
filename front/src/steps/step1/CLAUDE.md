# CLAUDE.md — step 1

What is deliberate about each unit of step 1, and why. It loads when you work with files under
`front/src/steps/step1/`. Nearly everything here is a decision with a reason behind it: why a figure
is drawn the way it is, why a paragraph was cut, why two units overlap, and which parts are
exercises that must not be solved. Read it before editing any of this step's files, because a great
deal of what looks like an oversight is load bearing.

The rules that span the whole curriculum are in the parent `front/src/steps/CLAUDE.md`, the design
system and the audience and assistant mechanisms are in `front/CLAUDE.md`, and the repo-wide
prohibitions are in the root `CLAUDE.md`. None of them is repeated here.

`step1` is **context**: the layers an agent's context is assembled from (prompt, session, harness,
tools) and the fact that they share one finite window. It is *titled* "Context, model, mechanisms"
(NL "Context, model, mechanismen"), and the longer title is the decision: the step outgrew the
one-word name once `model` and the machinery around the window joined it, so the sidebar says what
is in there rather than naming one of the three. The topic is still context, which is why the
sentence above still opens that way. `FLAG_SALT` in `flags.ts` still reads `kata-step1-context-v1`
and must not follow the title: it is a hash input, so renaming it invalidates every flag on the
board. Ten units — `tokens`, `prompt`, `tools`, `context`, `session`,
`harness`, `model`, `truth`, `workshop`, `recap` — and the unit HTML is the source for what each one teaches. The
fourth was called `intro` until it was renamed, id and all, so its URL is `/steps/step1/context` and
its prose keys read `context.<section>.<n>`. Old links to `/steps/step1/intro` are dead and there is
no redirect, which is the decision: the app has no route aliases anywhere and one unit is not the
place to start. A student mid-run loses that one unit's tick out of `kata.completed`, since progress
is keyed by `step/unit`.
That order is the registry's, and nothing recites it any more: `workshop`'s opening list went with
its capstone rewrite, so moving a unit is a registry change and nothing else. **The two layers a student writes and reads for
themselves come before the theory**, which is why `prompt` and `tools` sit ahead of `context` rather
than after it. Two things follow from that and are load-bearing. **No unit defines the word
*context* any more**: `prompt` carried the definition as its opening paragraph, on the reasoning that
the word is needed before `context` arrives, and it was cut because a definition of the window is
the wrong thing to open a page about the prompt with. The word is used as an ordinary one from
`prompt.lead.1` onward and `context` is where the window is taken apart. Do not write a definition
back into `prompt`, and if one is ever wanted again, `context` is the unit that owns it. The other is
that the three oval figures run as a sequence rather than an empty frame followed by fillings of it.
`PromptParts` draws the prompt and what it can carry, with nothing around it, `ToolsInContext` draws the frame with a
tool across its border, and `ContextDiagram` in `context` is the populated window at the end,
holding `prompt`, `resources` and `tools`. **`ContextDiagram` was drawn empty when `context` opened
the step and is not any more**, so nothing may describe it as the empty one. **The prompt's oval
lost its frame on purpose and must not get it back**: a student meets that figure before they have
met the window, so a frame there spent the vocabulary a unit early and left `ContextDiagram` re-showing
a picture they had already seen. The first teal frame in the step is now `ToolsInContext` in `tools`,
which is what the "draws no context frame" comments in `TokenSplit` and `TokenAttention` point at.
`AgentLoop` sits above it in the same unit and does not break that, because its ring is a path with
nothing inside it rather than a frame; the reasoning is under `tools` below. Its
oval instead carries `ContextDiagram`'s prompt region geometry and fills, so the two read as one
shape seen twice. **`PromptParts` replaced `PromptInContext`, the oval on its own**, after the
course owner read that figure as being about nothing: it said "this is a shape" and stopped. The
oval stays, joined by a stem to the 5 things a prompt can carry (goal, example, limit and why, output
format, done when), each a sentence of one ask, so the sequence above is intact and the first
figure now teaches something. **The ask is deliberately not this repo's** (a 404 for a user that does
not exist, `UserRepository`, `OrderController`): it was `TitleController`'s first, and its limit
leaned on the Catalogue page, which a reader at the top of the unit has not met, so the course owner
could not follow it. A limit only reads when its reason does; `be-exact.2` and `few-shot.1` share
the ask. Neither is to scale, and the share-by-volume figure is still `SessionMakeup` in `session`.
One term is knowingly loose: `ContextDiagram`'s `resources` is the broad word for what the agent
read, while `tools` defines `resource` narrowly as content an MCP server hands over uncalled.
**Three of them are deliberately not in that
list**: four layers fill the window, `tokens` is the unit it is counted in, `model` is the reader
on the other end of it and `truth` is where that reader's answers come from. `tokens` and `model`
each open by saying so; `truth` does not, because it arrives after
`model` has already put the reader outside the four. **`workshop` does not name a layer anywhere**,
which is newer than it looks: three of the board's `flag.*.help` keys each opened on one until the
mapping was found to be a pun, and every one of the four opens on the answer's provenance now. Promoting any of the
three units to a layer means visiting `context` and every "four layers" sentence in the step, which
is a larger change than it looks.
Three editorial constraints the HTML does not state on its own: every layer unit goes past merely
naming its layer, and none of the four is allowed to read as a stub (they sat within about a hundred
words of each other until `tools` grew the MCP material, and that floor is the part that matters); the sub-agent starting blank is the point the three sub-agent `harness` patterns turn on; and
the pattern diagrams share one vocabulary (a teal frame is a context, a bar is something in it,
dashes are what is not) that any new diagram should join. `prompt` and `truth` each carry a
three-question registry quiz and `context` a four-question one, which is the one place the course
goes past three. `context`'s first three questions all answer with something absent from the window
or too much in it; `pasted-old-file` is the only one about something *wrong* in it, which is
`bad-context-bad.3`, that unit's least intuitive and most expensive claim. Swapping a question out
instead was rejected, because amnesia and entropy are opposite failure modes and both earn one. `harness` closes on `PatternMatch`, a drag-to-connect exercise whose three
situations against four patterns leave decomposition on the board with nothing pointing at it. It is
the shared `ConnectBoard`, which `model`'s `PickTheTier` is too; the reasoning for that is under
`model` below.

`tokens` opens the step, ahead of `context`, and gives the step's unit of measurement a page before
anything is measured in it. It is prose, seven figures and one exercise. **It still carries no quiz**,
and that half of the old decision holds: `contextQuiz` and `promptQuiz` are two pages away on either side, and the step's
third quiz sits under `truth` near the end. What it does carry is
`PickTheNext` under the usual "Test your knowledge" heading, and the reasoning for it is under that
component below. **Its prose is self-only**, the same wrapper shape `context` uses: in class the
teacher talks it through at the board, so a guided student gets the seven figures and the exercise
and nothing else. The figure markers stay top-level and carry no attribute, which is what keeps them on
both audiences' pages, and the wrapper closes before each one and reopens after it. `TokenizerView`
is the only marker in the unit with no heading above it, under `lead.1`, so a guided page opens on it
untitled; every other figure gets the heading of its own section.
One number in it carries a currency, `TokenKinds`' dollar total, and it is the one exception to
`ModelPricing` holding the only ones in the course; why it is allowed is under `TokenKinds` below. Its
prose has been cut hard and deliberately: it opens cold, closes on `expensive-part` with no
summary or handoff, and the figures are left to be read rather than narrated. Sentences that
told the student to click something, or that recapped what the figure had just shown, were taken out
one at a time. Do not write that layer back in. **Every number in its prose, its figure labels and
its deck text is a digit, in both languages** (`1 token door het netwerk`, `7 tokens`, `21 paren`,
`3 keer`), the lesson-writing rule the course owner asked for in this unit's review; ordinal words
(`eerste`, `the fifth`) and the pronoun *one* (`picks one according to them`, `kiest er één`) are
not counts and stay words.

**The unit is an intro and then two explicit parts, `Reading` and `Writing` (`Lezen`, `Schrijven`),
each an `<h2>` with `<h3>` sections under it, and each section answers the one before it.** The
intro has no heading: `lead.1`, `TokenizerView` (text in, numbers out), `lead.2` (what a token is
the unit of: how much fits, what it costs, what the model reads again) and `lead.3`. Reading holds
`not-words` with `TokenSplit` (where the cuts fall and what that costs) and `attention` with
`TokenAttention` (how the model weighs every token against the ones before it, and what a cache
does and does not save). Writing holds `one-at-a-time` with `NextToken` (the loop, the scores,
picking by probability) and `SamplingKnobs` (how widely the model picks), `inside` with `TokenNetwork`
(where those scores come from) and `expensive-part` with `TokenKinds` (what writing costs against
reading), and then the exercise. The parts were implicit once, a run of five `<h2>`s, and the review
asked for them to be visible. **Keys take their section from the `<h3>`, not the `<h2>`**, the
scheme `harness`'s pattern sections already use: `tokens.attention.3`, `tokens.expensive-part.1`.
The two part headings own nothing but their own `tokens.reading.heading` and
`tokens.writing.heading`, since no paragraph sits directly under either, and a key carrying both
levels (`tokens.reading.attention.3`) would rename every key the day a section moves between parts.
A reworded `<h3>` renames its section's keys as usual; `one-at-a-time` survived its heading turning
into `It writes 1 token at a time` because a slug is an identifier rather than prose, so the digit
rule does not reach it. **Guided mode still titles every figure**, because `prepareUnit` adopts the
nearest `h2` or `h3` before a marker, which is now the `<h3>`; the two part headings are dropped in
class with the rest of the prose. **Reading before writing is the approved order**:
`TokenAttention` explains how context contributes before `NextToken` shows the writing loop.
**`TokenNetwork` follows `NextToken` on purpose**: it opened the unit once, right after the tokenizer,
and a reader met a network producing probabilities before anything had told them why a model would
want any. Under its own heading after the loop it is the answer to a question the reader already
has, and its footer names attention (no longer as *above*, since the author's own rewording);
moving either of them still means rereading that footer in both languages. `inside.1` is one sentence and must stay one, because the
drawing carries the rest. **The cost talk sits where its mechanism is.** The cache is the last
paragraph of `attention` (`attention.4`), because what it saves and what it cannot save are both
about the weighing `TokenAttention` has just drawn; output priced above input and reasoning billed
as output are `expensive-part`, with `TokenKinds` putting a turn's reading and writing side by side.
They were once gathered into one `costs-same` section, and splitting them by part is what the
reading-then-writing order bought. **No sentence in the unit says a token "looks" at anything,
backwards or otherwise**: a token does nothing, the model weighs each token against what precedes it,
and the prose says it that way in both languages. `TokenAttention`'s figure strings follow the same
rule (`attention: what each token leans on`, `attention: waar elk token op leunt`): they kept the
looking image for a while as labels on a drawing of arcs, and a label is read as a claim all the
same. **`lead.1` is deliberately short**: it says text is cut and each chunk becomes a number, and
which words survive whole and which break is `not-words.1`'s alone, so the splitting rule is
explained once. `not-words.1` no longer mentions the space in front of a word: the review cut it from
the prose, and `TokenSplit`'s dot still shows it to anyone who looks.

**The attention section, and the facts it rests on** (checked October 2026). The heading is the
name of the thing, and `attention.1` names it last after the bank example. English contrasts a river
bank with a financial institution; Dutch contrasts a seat with a financial institution. `.2`
explains the different roles of query, key and value. `.5` explains the dot product (Dutch:
inwendig product), `.6` distinguishes scoring keys from combining values, and `.7` distinguishes
learning the calculations during training from using them during inference. There is no numerical
example: the course owner found it distracting. `.3` is the count: every token against every token before it is
n(n-1)/2 pairs, so 7 tokens make 21 and 14 make 91, and the model does it again every turn over the
whole window. `.4` is what a cache changes. With prompt caching (and the KV cache under it) the work
already done for the earlier tokens is reused rather than redone, so that part of the window is
billed at the cache-read rate, a tenth of input on Sonnet 5.5, 0.05x on Opus 5.5 and 0.025x on Fable
5.1, which is what "a tenth of the input price or less" covers. But that rate is paid on every turn
for the whole cached prefix, and every new token is still attended against the whole context, so
generation gets slower as the window grows. Claude 4.6 and later models carry **no long-context
surcharge** (a 900K-token request is billed at the same per-token rate as a 9K one), so "dearer"
comes from paying for the whole window every turn, never from a higher rate, and no sentence may say
a long window costs more per token. The paragraph keeps the coin on "the cheapest token is the one
that never goes in", which is where `recap.what-costs-do.1` lifts it from, and its link to `harness`.
**`attention.3` explains repeated attention without naming heads or layers**: the course owner
found the unexplained term unhelpful. It stays with the weighing just explained, says several
weighings run side by side and are repeated, and identifies the figure as 1 illustrative weighing.
It introduces no new categories of language relationships. The explanation includes
self-attention; the figure omits it to focus on links between tokens, and `.3` says so.

Four things about it are decisions. **Nothing in the unit draws the teal context frame**, not one of
the seven figures and not the exercise, and that is what protects `tools`: `ToolsInContext` is the first frame a student
meets, so every unit above it stays out of that vocabulary rather than spending it early, the way
`ModelTiers` does and the way `PromptParts` does with its oval. The word *context* is likewise used as an ordinary one throughout, since no unit
defines it before `context` does. **Attention and writing use different examples.** `TokenAttention`
uses `He deposits his money at the bank` or `Hij stort zijn geld op de bank`, selected by the active
language. Both have 7 word-sized illustrative tokens. Its invented weights make `bank` lean hardest
on `money`/`geld`, with `deposits`/`stort` also contributing. These are explanatory splits, not
claimed output from a particular tokenizer. `NextToken` keeps its build sentence and its
`timed` -> `out` -> `.` favourite chain. **These are exceptions to the shared example sentence.**
Every other place the unit shows a
sentence uses `example-sentence.ts`'s, in the reader's language (`The agent swears up and down that
the tests passed locally.`, `De agent beweert bij hoog en bij laag dat de tests lokaal zijn geslaagd.`): `TokenizerView` draws
it, `TokenSplit` takes it as its text row, and `TokenNetwork` and `SamplingKnobs` take `swears`
(`beweert`) out of it. The review asked for that so a reader meets one sentence rather than four;
`PickTheNext`'s `the pull request was` is an exercise prompt rather than an example, and stays.
**`TokenSplit`'s text row is the example sentence, and that reverses an older decision.** The row was
`TokenSplit`'s own once (a sentence about the catalogue, 16 tokens per 100 characters), kept apart from the lead sentence because the figure's rows were ordered cheapest first
and text cheapest was what the prose argued. With the example sentence the text row is 22 per 100
in English (13 tokens over 59 characters) and 24 in Dutch (17 over 72), against the line of Java at
22, the class name at 23 and the id at 61. So **the rows are no longer cheapest first in every
locale**, the order stays text, Java, class name, id, and the claim moved to match: `not-words.2`
says text and code cost about the same per character and ids and hashes nearly 3 times as much
(61 over 22 is 2.8), which is true in both languages, and `deck.tokens.split.note` and
`deck.tokens.divider.2` say the same. No sentence may call text the cheapest any more. The row still
**contains a word that breaks**, which the figure needs and no prose points out: `sw|ears` and
`bewe|ert` break where no reader would cut. Its rates are worked out per render from the active
locale's split, so a new example sentence moves the strip and has to be checked against
`not-words.2`. There is still no second sentence beside it: a reader only ever sees their own
language's row, and an English row against a Dutch one made the figure an argument about languages
instead of about tokens.
**The unit does make that argument, in `not-words.3`, and it is prose on purpose.** That paragraph
draws the line from the tokeniser to the training pile, since a vocabulary built from what the model
read makes rare-in-the-split and rare-in-training the same thing. It states the link **in one clause
and stops**, because `context` owns what a model being an average means and this unit must not argue
it four pages early. **The language claim is kept honest, and it no longer tells anyone to ask in
English.** It used to close on asking in the language the model has read most of, with a gem and a
coin, and that overstated the gap for a big language: the lead sentence is 11 tokens in English and
14 in Dutch, and Anthropic's multilingual-support page puts German and French at about 97% of
English. Dutch is not in that table, so **no Dutch percentage may be stated**; the paragraph names
German and French and says the gap is small for a big language, wider for one with little text
online, and wider again for a codebase's own names. Both icons went with the advice, since no move
is left for them to mark, and `recap.what-costs-do.1` and `deck.recap.moves.note` dropped it too:
the recap bullet's move is now pasting the part of the log that matters, under the coin it lifts from
`attention.4`. That bullet still opens "code is dearer than text", which the rate strip no longer
bears out now that text and code sit level; it belongs to `recap` and was left for its own pass.
So the claim belongs there rather than in `TokenSplit`: a Dutch row added now would look like the
figure catching up with the prose, and it would cost the figure the same way it did the first time. **The rate strip under the chips is
a rate readout rather than a second sample.** Four rows, tokens per hundred characters, all four
always up on one scale with only the emphasis following the selection: the section's claim is
comparative and a panel showing one sample at a time left the reader to click, remember and
subtract. The numbers are worked out from the same pieces the chips are drawn from, the text row's
from the active locale's split, so the strip cannot drift from the panel above it. `lead.3`'s band
(roughly 4 to 6 characters per token) is about English and holds the 4.5 the English row prints;
the Dutch row prints 3.9, which is the gap `not-words.3` is about rather than a contradiction.
**Picking a sample restages the panel, and only the arrival is drawn.** The source line and the count
come back together and the chips come back one after another from the left, on the shared
`DURATION.state` and `EASE_QUIET`, which is the cut being made rather than a card being swapped;
the rate strip is untouched, because all four rows are always up and only the emphasis follows. The
outgoing sample is never animated, since the text changes in the same commit that hides it and a
fade there would be the *new* sample fading away before it arrived. The stagger is deliberately
uncapped, so the uuid takes longer to enumerate than the prose does, which is the figure's own
argument rather than an accident of the timing.
And **the figures are not equally trustworthy, which their captions no longer say.** `TokenSplit`'s
splits are real output from `o200k_base`, stored as data with no `nl` entry, `TokenizerView`'s ids
are real output from the same tokeniser, and `TokenNetwork`'s token, its context and its winning
output are lifted from that sentence; its numbers are invented and its footer opens on
`Simplified.` and says so, along with what a real model does instead (under `TokenNetwork`
below). `NextToken`'s scores are
hand-authored and its caption admits it. `TokenAttention`'s weights are hand-authored too and its
caption was removed, so the only warning left is the comment in the component: if that figure ever
grows a caption again, that is what belongs in it. **Holding a token now prints its weights under the
boxes as shares, and every row adds to 100.** That is the row of a real attention head, which is a
softmax over what came before, so the figure is honest about the thing that has a shape (a token
spreads a fixed weighing backwards and cannot lean hard on everything) while the 21 numbers
making up those rows stay picked so one sentence reads the way a reader expects. They are whole
percent rather than a fraction so a row edited to 99 is a bug rather than a rounding. The one thing
the hundred leaves out is the token weighing itself, which a real row includes: this figure is about
what a token leans on behind it, and every locale key says that in plain words and digits (`{{token}}
leans on the {{links}} tokens before it, hardest on {{heaviest}} ({{weight}})`). A token with only 1
token in front of it gets its own sentence, `token-attention.only`, since "the 1 tokens before it"
is not a sentence in either language.

**`TokenizerView` is the lead figure, and it exists so the word, token, number step is visible
before the network.** `lead.1` says text is cut into chunks and every chunk is swapped for a number,
and the network further down starts from numbers, so the step in between was told and never shown. The
figure is the shape of a public tokenizer page, at the author's asking: a Tokens and a Characters
counter, the sentence with each token on its own background, and a segmented Text / Token IDs toggle
that swaps the text for the id list. Six things in it are decisions. **The ids are real, and that
reverses an older decision.** `WordsIntoTokens` avoided ids because a token id is the one number in
the unit a student can check and there was no tokeniser in this repository to make real ones with;
these were produced with tiktoken's `o200k_base` outside the repo and verified id by id, and
`example-sentence.ts` carries them beside the split with a comment saying they must be regenerated
if the sentence changes. Never hand-edit one. **The sentence is `The agent swears up and down that the
tests passed locally.`, and in Dutch `De agent beweert bij hoog en bij laag dat de tests lokaal zijn geslaagd.`** It replaced
`TokenSplit`'s old catalogue row, which the author found dull as the first thing the step shows: this one
is the works-on-my-machine joke, and it still breaks mid-word where no reader would cut it,
`sw|ears` and `bewe|ert`, which is what `not-words.1` claims happens to a word. English is 13 tokens over 59
characters, Dutch 17 over 72, and the counters work both out from the data. **There is one sentence
per language, and that does not reopen the argument `TokenSplit` closed.** The objection there was
an English row against a Dutch one, side by side, which turns a figure into a comparison of
languages. Here a reader only ever sees the sentence of the language they read in, never the two
together, so there is nothing to compare. A locale with no sentence of its own gets the English one,
through `exampleSentence` in the same module. **It is also `TokenSplit`'s text row**, the same split
drawn twice for two jobs: `TokenSplit` is where kinds of text are compared and where the leading
space is pointed at with a dot, while this figure shows one sentence whole, its spaces inside the
coloured token the way the reference page draws them. The two sentences parted once and came back
together in review; why is under `TokenSplit` above. **The tints are one hue at three strengths**, `--primary` at 15, 28 and 40 percent and
lifted in dark mode, cycled so neighbours never match: several hues would match the reference and
would be the only rainbow in the course, and `--success` and `--destructive` are not ours to borrow.
**No token is underlined any more.** The network's token (`ears`, `ert`) once carried a dotted
underline to tie the two figures together, but since the Read/Write split the network sits several
sections down, and the course owner read the lone underline as a mistake. The counters are mono and computed from the data, each view
is one `role="img"` with a sentence interpolating the pieces or the ids, and the tokens are one
flex item each so a phone wraps between tokens and never inside one. On the deck it is
`deck-tokens-tokenizer`, leading the block the way it leads the unit.

`TokenNetwork` is the sixth figure, under the `inside` heading after `NextToken` and `SamplingKnobs`:
one token through a network small enough to check by hand, 4 inputs, two hidden layers of 5, 4
outputs. `TokenizerView` swaps each token for a number, and this is what happens to the numbers
next, which is where the scores `NextToken` has just shown come from. On the deck it is
`deck-tokens-network`, after `deck-tokens-next` and `deck-tokens-sampling` the way the unit places it. It replaced `WordsIntoTokens`, a six-stage chain from a
word to a token, which said "numbers in between" and never showed a number doing anything.

**It is a deliberate simplification, and each cut has a reason.** A real language model is a
transformer, and the mixing of a token with the ones before it is drawn by `TokenAttention` higher
up the unit rather than here, so this figure is one token's feed-forward pass and nothing else.
Real models use smoother activations (GELU, SwiGLU); the figure draws ReLU because "below zero
becomes 0" is a sentence a student can check against the number on screen. Many modern models drop
biases altogether; the figure keeps one per node because the bias is the concept being taught, and
a network without one would leave the calculation panel a row short of the idea. **Only the last
token goes in**, while a real model takes every token so far, and the footer admits that in words.

**The footer is a fact-checked simplification note in 2 short lines, and the review wrote it.** The
first line opens on `Simplified.` and says what is made up and what is cut: the token id points to a
fixed row of numbers the model has learned (the embedding, looked up by the id), thousands of numbers
long in a real model, 4 here and invented, and in reality every token so far goes in, not only the
last. The second says what a real model is around this: language models like GPT and Llama are
decoder-only transformers, dozens of layers each with attention (`hierboven`, pointing back at
`TokenAttention`) and a network like this one, and it counts this network's parameters against a
large model's hundreds of billions, which come out of training and are fixed after it. The facts,
checked October 2026: the embedding row is learned and looked up by id (Llama 3 8B carries 4,096
numbers per token, GPT-3 12,288, from their published configurations); GPT and Llama are
decoder-only, while the original 2017 transformer (Vaswani et al., "Attention Is All You Need") had
an encoder and a decoder, for translation, which is why the line says decoder-only; Llama 3 8B has 32
layers and GPT-3 96, so "dozens" holds. **Claude is not named in that sentence on purpose**: Anthropic
does not publish Claude's architecture, so the course does not claim one. The old line about one
output node per known token went with the rewrite. It is 2 lines rather than 1 paragraph so it fits
under the drawing on `deck-tokens-network`, whose scale went from 1.1 to 0.98 for it: the worst case
is Dutch with a node's calculation open, which at 1.1 pushed the eyebrow under the heading and
clipped the last line. If it outgrows the slide again, lower the scale rather than dropping a fact. Its 4 and its 79 are interpolated from `X_IN` and `PARAMETERS`.

**The weights, biases and input numbers are invented, and the arithmetic is not.** `W`, `B` and
`X_IN` are the approved mockup's matrices, and they and the forward pass live in `network-pass.ts`
rather than in the component, so `SamplingKnobs` reads the very same output scores; the pass is
computed once at load, so editing one weight moves every sum, line width and percentage with it. **Each
layer's output is rounded to the two decimals it prints before it is passed on**, which is the one
departure from the mockup's numbers: computed at full precision, two output rows printed a total
their own printed terms do not add up to (2.45 for terms that make 2.44), and the calculation row is
the one thing on the page a student will check with a calculator. The output scores are therefore
2.54, 0.96, −0.15, −0.25, and the percentages (75, 15, 5, 5) are unchanged. The footer's parameter
count is computed from the matrices as well (65 weights and 14 biases, 79), so it cannot go stale.

**The token is the lead sentence's, in the reader's language, fed with its context.** It is `ears`
with `The agent sw` muted in front of it, or `ert` after `De agent bewe`, with no ellipsis because the
sentence starts there, and the four outputs are
` up`, ` that`, ` the`, ` it` and ` bij`, ` dat`, ` het`, ` op`, drawn without their leading space.
**The first of the four is the token that really comes next in the sentence, and it has to stay
first**: the weights are the same in every language, so the first output always wins at 75% and the
percentages never move. Only the words change. Context, token and outputs are real tokens, mono, and
sit in `example-sentence.ts` beside the split (`networkToken`, `outputs`) rather than in a locale
file; the screen-reader title interpolates them. **The empty state names the token and its real
id** (`ears (token id 36108) points to a row of 4 numbers`, `ert (token-id 805)`), both read off the
same data, so the step from `TokenizerView`'s id to a row of numbers is said before the first click.
A 14-character context reaches the vector's
bracket at the old layout, so the columns sit 16 units further right than the mockup's; a longer
context needs the same check.

**The stepper is the reason it is interactive.** All four layers lit at once is a picture of a
network; one layer per click is the signal visibly moving through it, with each edge as thick as the
signal it carries, teal when it pushes the sum up and grey when it pulls it down. Each click selects
the first node of the layer it lit, so the calculation under the drawing is already open on a sum
that just happened. Any lit node can then be clicked or reached by keyboard. The calculation panel
names the three things in one sum (weight, bias, activation function, or softmax on the output
row), each tagged with the shape the drawing uses for it, which is what lets the drawing carry no
caption of its own.

**The footer names the parameters on purpose.** It counts this network's weights and biases and
then puts a large model's hundreds of billions beside them, which is what a model size quoted in
parameters actually counts. It is the one place the course says what that number is, so a later
unit that quotes a model's size can lean on it rather than defining it again. That is why the
review's wording gained 3 words, `Samen vormen deze de parameters` (`Together these form the parameters`): the text as
handed over counted the weights and biases without naming them, and this paragraph is the reason
the name is there.

The eyebrow names the process (`1 token through the network`, `1 token door het netwerk`) rather than arguing the picture,
which is the rule the old figure's eyebrow settled after three rewordings. The SVG's title is the
screen-reader description and walks the whole pass with the real numbers interpolated, since none
of the drawing's vocabulary reaches a reader who cannot see it.

`SamplingKnobs` is the fifth figure, under `one-at-a-time` after `NextToken` and `.3`: the four words
that could follow `swears` (`beweert`), and how likely each one is under the standard setting,
temperature 0.5 and 2, top-k 2 and top-p 0.9. It took over what `one-at-a-time.4` used to explain in
a paragraph (what temperature, top-k and top-p each do), and that paragraph is now one sentence
saying the student never sets them. On the deck it is `deck-tokens-sampling`, between the loop and
the network, with that sentence as its note. Five things in it are decisions. **It shows the
mechanism, not a setting the student can turn**: the Messages API rejects any temperature, top_p or
top_k but the default on Claude models released after Opus 4.6, and neither Claude Code nor Copilot
exposes them, which is why it is a still table and never a slider; a control would suggest a knob the
student has. **Its scores are `TokenNetwork`'s own**, imported from `network-pass.ts`, and its words
and context are `example-sentence.ts`'s (`networkToken` and `outputs`), so it is the same choice the
network makes further down, seen from the other side, and the standard row is that figure's 75 / 15 /
5 / 5. **Every percentage is computed**, softmax of score over temperature, with top-k and top-p
renormalising what they keep (top-p keeps the smallest set of best words reaching p, which is two
here at 0.903), so the rows come out 95 / 4 / 0 / 0, 51 / 23 / 13 / 13 and 83 / 17 twice; nothing is
typed. **A removed word prints `gone`/`weg` rather than 0%**, because 0% at temperature 0.5 is a
rounding and gone is a rule. And **the standard row is ruled off** from the four below it, since it is
the one they are read against. The eyebrow is `how widely the model picks`, the same verb `one-at-a-time.3`
and `pick-next.right` use (`picks one according to them`, `kiest er één volgens die kansen`): the
old Dutch said the model *trekt* from a *verdeling*, which reads translated. The grid is one
`role="img"` whose description reads every cell, and on a phone each row's label stacks above its
bars. The interpolation for the words in front is `preceding`, not `context`, because `context` is
an i18next option of its own. **The words in front carry no ellipsis** (`The agent swears`, `De agent
beweert`), because the sentence starts there and `… The agent swears` claimed text that is not, and the
open slot after them is `PickTheNext`'s dashed `?` chip, so an open token looks the same wherever the
unit leaves one.

`PickTheNext` closes the unit and is its one exercise: three roads out of `the pull request was`, and
the answer is any of the three. It asks in an answerable form what `NextToken` above it lets the student do
but never grades, which is that the top-scored token is not a rule, so a student who read that figure
as a lookup table finds out here rather than four units later. **That overlap is closer than it used
to be** and the exercise still earns its place: the figure now lets a reader take a runner-up, but
taking one is not the same as being asked whether they could have, and nothing up there tells them
whether they understood what they were doing. If either side is ever rewritten, this is the seam to
check. Five things in it are decisions. **The question asks what *could* come next, not what *will***: the card once carried only the title "Pick what comes next" and no question, which reads as "which word will appear", and one word appears, so the catch-all looked like a trick. The description now states the question outright, and the wrong-pick verdict says "not only that one" rather than "not that one", since the picked word could come next. **The catch-all stays short ("All 3 are possible") and the sampling knobs live in the verdict**: an option that carries its own explanation is the longest one on the card, and the longest option being right gives the answer away. The verdict names temperature, top-k and top-p, `SamplingKnobs` above shows what each does, and `tokens.one-at-a-time.4` says in one sentence that the student never sets them: models released after Claude Opus 4.6 reject anything but the defaults, and neither harness exposes a setting. **The sentence is not the pair's**
(`the build failed because it timed out`), because a question answered by the figure above it is not
a question. **The fan is drawn flat until it is checked** and then lights whole: marking a road
before the answer is in gives it away, and marking one after says the model has a right answer here.
**The scores are shown, and they are what make the question worth asking**: a fan of three roads with
no weights on it can be answered by shrugging, while `merged` at 46% against `approved` at 23% makes
picking the favourite the reasonable thing to do and still not the answer. That is the misreading the
exercise exists to catch. They are hand-authored like `NextToken`'s, and the admission stays in that
figure's caption further up the same page rather than being repeated in a caption here. **They
add to 100, unlike `NextToken`'s**, and what separates the two is the caption: that figure draws five
of a distribution whose tail is too long to draw and says so underneath, while three numbers on a
card with nothing under them are three numbers a student adds up, and a missing seventeen points
reads as an error rather than as a tail. It also keeps the right answer exactly true, since the roads
on screen are then all the roads there are. They stay muted when the fan lights, since the answer is
the three words rather than the numbers beside them. And
the catch-all choice is **pinned last rather than shuffled**, unlike `SpotInjection`'s four results:
a catch-all that turns up second reads as a bug. It is graded in the browser like everything else
here and writes no progress key, because one question is not a sitting.

**`NextToken` is stepped by the reader rather than watched, and that is the change that matters in
it.** It took the favourite on every pass once, with a static tree underneath drawing what the other
candidates would have led to. The claim both halves were there to hold up is the one the prose makes
and the scores alone cannot, that **the top-scored token is not always the one taken**, and a figure
that only ever walked the top row was making that claim on the reader's behalf. Now every candidate
is a control: have it pick `was` instead of `timed` and a different sentence comes out of the same
machine and the same numbers. Without that the figure teaches that a model is a lookup table with
extra steps. **The model picks, never the reader, and every string says so**, which the review asked
for: the reader "took" a token once, which put them in the model's seat. The eyebrow is `what the
model can pick, and how likely each one is` (`wat het model kan kiezen, en hoe waarschijnlijk elk
is`), the button `Let it pick the favourite` (`Laat het de favoriet kiezen`), each candidate `Let it
pick {{token}}` (`Laat het {{token}} kiezen`), the fan's description says to pick one *for the
model*, and the likelihood line is about `the sentence so far` rather than the reader's road. The
behaviour did not change. **The recap draws each token of the chain as a chip** in `TokenizerView`'s
tint (`timed 34% × out 89% × . 62% = 19%`), because a bare `.` in that line read as punctuation in
the arithmetic rather than as the full-stop token; the third pass stays.

Eight things in it are decisions. **The fan is replaced on every pass rather than accumulated**, so
what is on screen is one pass of the model and not a picture of the reader's clicks; a road not taken
is drawn for exactly as long as it is a road. **The favourite chain is pinned to
`timed` -> `out` -> `.`**: the first entry of every candidate list at every depth is the favourite,
so a reader who only ever lets it pick the top one lands on `the build failed because it timed out`.
That invariant replaces the old
`then`-first-entry one and breaks the same way, by reordering one list and not the others.
**Nothing marks a winner**: each candidate's score is drawn as the length of its own bar, as long a
share of the column as the score is of the strongest score in the fan, and the favourite is simply
the longest bar rather than a highlighted row. **Nothing in the drawing is a line from one thing to
another, and putting one back is the edit to refuse.** It was a bouquet of beziers from the root to
each word first, then a spine with parallel arms hanging off it, and both were the same mistake: a
leader line to a label says *these two belong together* and nothing else, which a row already says by
being a row. What the arms carried as weight of stroke is carried as length now, which is the thing a
reader can actually compare down a column. **The word comes first and the bar last**, and that
ordering is what keeps the connector gone rather than merely undrawn: the bar is the one element
whose right-hand end moves, so any fixed column placed after it opens a channel in front of itself
wherever the score is small, which is precisely the gap a leader line is invented to close. It also
reads in the order the figure's own label promises. **The root sits in its own column on the
favourite's line**, not on a header line above the fan, so `after it` and the top candidate read as
one line and the rest of the fan indents under that first word; a taken candidate flies into that
slot. That is what forces **the fan to be top-aligned rather than centred**, since the root needs one
fixed y or it moves under the pointer between passes, and a fan of three leaves its slack at the
foot. **The drawing is still sized once to the widest fan in the tree**, so nothing resizes either
way.

Three smaller ones. The **advance button has the model pick the favourite** rather than advancing
blindly, which is what keeps the deck usable (a presenter reaches the paired sentence in 3 clicks)
and gives a reader who does not want to choose for the model a way through. The **likelihood line is the second thing the
figure teaches**: 3 scores multiplied, so even the favourite 3 times over comes out at 19%, which
the closing line says as `under 20%` (it said `under a fifth` before the digit rule).
It is floored at `<1%`, because a road the reader just walked printed as `0%` says the thing on
screen never happened. And **the status line says nothing once the run is over**: it counted what
went into each pass, so it has no third state to report, and the recap and the likelihood line under
it are what close the run. `next-token.done` is gone from both bundles rather than left unused.

The unit carries two forward pointers and must not grow a third telling of either. Output being
priced above input goes to `model` (`expensive-part.1`), and the prefix cache goes to
`harness` (`attention.4`), each in one paragraph carrying an anchor to the unit that owns it.
`expensive-part.3` does not link them a second time (the user cut that repeat), and it names
no rate and says nothing about how the cache matches, and it must stay that way. `TokenKinds` prints
a cost column (tokens times rate, per row) so every share on the cost bar can be redone by hand: a
reader asked how 3,000 reasoning tokens could be 56% of the bill, and the column is the answer. They
were set in mono once, which said a machine had produced the name. That is the same rule
`harness.coordinator.3` follows for decomposition. `TokenAttention`'s arcs running backwards only is
what a cache runs on, so it is load-bearing rather than a simplification: the model works each
token out only from what comes before it, so appending leaves every earlier calculation intact. That
is why the cache is `attention`'s last paragraph, straight after the figure, and not part of the
cost section. Since the review it also says what the cache does *not* save (the whole window paid
every turn, every new token still weighed against all of it), and it no longer calls rereading the
cheap part.

**`expensive-part` is the last prose section, and `TokenKinds` is its figure.** Its heading is
`The expensive part` (`Het dure deel`), and it reads as a claim because it sits under the `Writing`
part heading: it was `Writing is the expensive part` while the parts were implicit, and the part
heading now carries the first half. `.1` opens straight on `Output is priced above input`, which
still reads well under `Writing`. Then reasoning billed as output even when only a summary reaches
the screen, then the figure putting one turn's reading and writing side by side (`.2` ends on the
sentence that says so), ahead of the exercise. The prose states the shape and sends prices to
`model` rather than repeating them. "A tenth of the input price or less" in `attention.4` is the
phrase this unit has always used for `harness.caching.1`'s rate, kept word for word.
**`expensive-part.3`'s last sentence leans on the figure's numbers**: reasoning has to stay above
half the cost bar, so a count edited in `TokenKinds` means rereading that sentence in both
languages. On the deck the slide title keeps the whole claim (`Writing is the expensive part`),
since a slide has no part heading above it.

Five things in the figure are decisions. **The four kinds are the four a turn deep in a Claude Code
session is actually billed for**, and there is **no uncached-input row** on purpose: in Claude Code
almost all new input arrives as a cache write, so plain input in such a turn is a rounding error and
a row for it would be empty in practice. Copilot also bills by token at each model's published rates
(`copilot-specific.md`), so the figure carries no assistant variant; that Copilot's harness writes
the cache the same way is not verified, which is one reason the caption names the rates it was
priced at and nothing else. **It is priced at Claude Sonnet 5.5**, the middle tier, because its cache
read is exactly a tenth of input and every multiplier comes out round; Opus 5.5 reads at 0.05x and
Fable 5.1 at 0.025x, which is what "or less" covers. The facts behind the rows (output 5x input in
every tier, 5-minute write 1.25x, 1-hour 2x, reasoning billed as output tokens whether or not they
are returned) were checked against Anthropic's pricing and extended-thinking docs in October 2026.
**Every number is computed, none typed**: the rates come off `pricing.ts`'s Sonnet row, the same data
`ModelPricing` prints, and multiplier, cost, share and both totals are worked out on every render, so
the figure cannot drift from the table. The counts (40,000 / 3,000 / 3,000 / 800) are the only
authored numbers, and the prose says the turn is made up and its ratios are not. **The dollar total
is the course's one currency outside `ModelPricing`** and it is allowed because it is a sum, not a
rate: the table under the bars prints multipliers against input rather than prices, so it is not a
second price list, and it must not become one. The total prints to four places, `$0.0535`, because
three rounds to `$0.054` and a student redoing the sum by hand gets 0.0535. **Reading your own
breakdown is deliberately not here**: `/usage` and what it prints against these four kinds is left to
a later item, so do not add a task card or a move to this section for it.

Shares of 7% or more print inside their segment and smaller ones stay bare, since the table carries
every count as text. The fills are `chart-3`, `chart-2`, `chart-4`, `chart-5`, which run pale to dark
in the light theme; the dark theme orders those tokens differently, so each segment names the ink
that reads on its own fill in both. The bars are one `role="img"` with a sentence interpolating the
shares that carry the claim, and on a phone the table drops its description column. On the deck it is
`deck-tokens-kinds`, ahead of the exercise the way the unit places it, with the made-up turn as its
note.

Decomposition is the first of the four pattern sections, ahead of the coordinator. It argues the gap
rather than the mechanism: a request arrives thinner than the thing it asks for, the same way a
requirement always has, and cutting it into parts that each need a prompt is what forces the unstated
decisions out where you can answer them. `harness.coordinator.3`
used to introduce decomposition and now points back at that section instead, so do not let it grow
back into a second definition.

`UnderSpecified` is its figure, and four things in it are decisions. **It carries no context
frame**, which is the one place it departs from the other three pattern diagrams: nothing has been
handed to anybody yet, so this is the task being cut up rather than the windows it ends up in, and a
frame here would draw the coordinator one section early. What it does share is the vocabulary,
solid is what you have and dashes are what you do not, so the dashed space under the ask on the left
comes back as three solid pieces on the right. **The three questions are `harness.decomposition.1`'s
own three** (empty query, title only, nothing found), which is what keeps the drawing and the
paragraph on one example; rewording the example means moving the figure with it, in both languages.
And **the pieces are stacked rather than laid out side by side**, so each one has the width to read
as a row: three columns would need the questions wrapped by hand, and the Dutch is longer than the
English every time. On the deck it replaced a statement slide, and the note went with it, since the
note said what the right-hand column now draws.

**Each piece is a row of three parts, and the labels are what make it read** (FEEDBACK 9). It drew
every piece as an abstract teal bar standing for its prompt, with the question under it and
`één prompt per stuk` over the column, and a reader could not tell what was happening: nothing said
the bar was a prompt, who was asking, or who answered. So the bars went and each row now says it in
words: what the piece does (`lege zoekterm`, `waarop matchen`, `geen resultaat`), what *the agent
asks* while writing that piece's prompt, and what *you decide*. The column header shrank to `drie
stukken` / `three pieces`, because the who-asks and who-decides labels do the explaining that the
long header was trying to. That is `decomposition.3` drawn, questions coming back before code, and
the paragraph needed no change for it. **The decisions are illustrations, not a spec**: they only
touch how search behaves (`geef alle titels terug`, `op titel, ongeacht hoofdletters`, `een lege
lijst, geen fout`), and they must never name catalogue data the service does not have (nine titles,
no authors, so "match on author" is not a decision to draw) or lean on any of step 1's exercises.
The figure became DOM rather than SVG for this, so the rows can reflow: side by side from `md`, and
on a phone the ask, the arrow (turned to point down) and the pieces stack, with each piece's two
labelled lines stacking under `sm` too. The `figure` carries the description as its `aria-label`
and every word inside is real text, read in order.

**`harness.check-yourself.1` was deleted rather than gated differently**, on `workshop.the-board.1`'s
reasoning: it was a `data-audience="guided"` aside, and guided mode drops every run of prose whatever
its attribute says, so it rendered for nobody in either language. Its key slug was stale on its own
terms too, since the `<h2>` above it is the shared `ui:quiz.title`. The line is on the deck now, as
`deck-harness-decomposition`'s note, which is where a line a teacher says out loud belongs. Its old
Dutch called a cut a `knipbeurt`, which is a haircut appointment; the deck note does not.

**`Caching` is told and never worked, and that is a decision rather than a gap.** A task card was
written for it, three moves reading the per-turn cost with and without a second MCP server, and it
cannot ship honestly: which command prints a per-turn cost differs by assistant and is unverified, so
one reader could not take the measurement the card asks for. The section is drawn nowhere for a
related reason, since a prefix-match diagram would draw "read from the first byte" and stop; the
deck's statement slide is the right shape for it. It also stays where it is. It reads at first pass
like a third subject wedged between the harness-as-layer material and the patterns, and
`tokens.attention.4` defers to it by name, so moving it costs that pointer its target.
`caching.2` states the prefix rule with the tool list and the instructions at the top as what sits
early, and no longer uses connecting an MCP server mid-session as its example; why is under the
assistant variants at the end of this file.

**`SequentialSteps` draws the cost of the run, not just its shape.** It was three step cards, three
checks and a pause on a session band, which is `sequential.1` and `.2` transcribed. The band now
carries a fill that rises a tread per step, from thin under step one to nearly full under step three,
with `sequential-steps.filling` on the free space that is left. That gives the pause glyph a second
job: it hangs on the seam where the fill jumps, so stopping there is visibly what you pay to rebuild,
which is `caching.3` met in a picture. The fill stays in the primary tints the other diagrams use for
content, and there is no fourth step card because the label says there is no room for one.

Decomposition is answered by the task above that board rather than by a fourth situation, and that
is the decision. `CutItUp` is that task, and it is one card and nothing else: no prose between the
rule and the figure, because six paragraphs said this once and the card replaced all of them. The
problem is `kata/step1/java/problem.md`, a deliberately under-specified library request, and the
five numbered moves are cut it up yourself, cut it up with the agent (which writes its own
`solve.md`), compare the two, plan it in plan mode into `plan-solve.md`, build it. Each move is one
line, so anything a second line would have explained belongs in the prose above the card rather than
back inside it. The three filenames are the shape of the exercise: the student's write-up and the
agent's `solve.md` exist separately so the comparison has two things to compare, and merging them
into one file ends the exercise.

Every move carries its own tick and the card keeps one of its own underneath, with the count of the
first on the opening rule. **This card is where that shape was designed**, so `TaskCard` is the
readable source for why there are two kinds of tick and this file does not re-argue it. What is
step 1's here is that the five moves are a long sitting: cutting a real under-specified file up
twice and then building it is not an evening, and the ticks are what let a student put it down after
the comparison and pick it up at the plan. The card ran on one tick until then, on the argument that
five boxes turn a run at a problem into an errand list, and that argument lost to the one above it.
Nothing is graded either way, so both kinds of tick are a bookmark: they are written to
`kata.step1.cut` and `kata.step1.cut.moves`, under the prefix `shared/lib/reset.ts` clears, because
a tick that vanished on the next navigation would read as broken progress. And **`problem.md` has no answer key anywhere in the tree**: its gaps are unlisted
on purpose, since a file that names them does the analysis for the student. Do not add a worked cut,
a `solve.md`, a `plan-solve.md`, or an implementation.

`context.without-context.4` closes that unit's section on the average and is `OneShotCompare`'s payoff turned on the
student's own repository: the codebase is the reference image they hand over every turn, so a
project that drifted is the drift being copied rather than worked around. It reads the figure from
the other side, which is why it sits under it rather than opening a section of its own, and it is
the section's fourth paragraph knowingly. **It stays descriptive and must not grow an instruction**:
arranging a repository so an agent works well in it is step 2's `setup`, and this paragraph only
says why what is already in the codebase counts as context. It is `data-audience="self"` like the
figure and the paragraph above it, so in class it is walked at the board with the rest.

`context.you-choose-most` is the unit's one practical section, and it answers FEEDBACK's "context
actief sturen" on the focus side only. **Its four moves are the ones Anthropic's own material backs**
(the Claude Code best practices, common workflows and large-codebases pages, and the explore-first
lesson in Claude Code 101): the failing assertion and its stack trace rather than the whole run, an
existing class to copy, have it find the place before it edits, and the folder you open it in as the
first cut. Naming the class and the case is `prompt.be-exact`'s and is a link here, so do not
restate it. **"Tell it where not to look" was left out on purpose**: Anthropic does that with
settings (`permissions.deny`, `claudeMdExcludes`) rather than in the prompt, and settings are step
2's guardrails, so the access half of the same FEEDBACK item lands there and not here. The folder
claim is worded for both products (both start in the current folder and scope to it) and says
nothing about which instruction files load, because that half differs between them and only
narrows downward.

`ContextFalloff` draws compaction rather than overflow, and the redraw is the decision. It showed
the two oldest turns tilting off the top of a fixed frame once, which is a window neither harness
this course targets actually has: both compact automatically, so `amnesia-context-fatigue.1` says
older material is summarised and the summary is what stays. Those two bars now collapse into **one
short bar that stays inside the frame**, in the step's faint fill, and the tilted ghosts rise off
that bar rather than off the window, so what leaves is the detail and not the turn. Two labels carry
it, `falloff.summarised` on the short bar and `falloff.dropped` on the ghosts, where there was one
before. The figure and that paragraph were changed as one thing and have to move as one thing.

**Lost in the middle is stated in prose and deliberately not drawn.** `entropy.3` names the term and
says where the line sits, because a gloss that leaves out the position leaves a reader unable to say
why it is called *middle*. A small U-shaped position curve with a Liu et al. caption was proposed
for it and rejected: this is the heaviest unit in the step, the step's diagram vocabulary is frames,
bars and dashes, and a plotted curve with axes would be the only one of its kind in the course.
Revisit only if the unit is ever split.

`context` closes on `ReadYourWindow`, ticked to `kata.step1.window`, and **`/context` is used
here and described nowhere**. The command had two paragraphs above the card, one per assistant, plus
a third on the count starting above zero, and all three were cut: a page that explains what the
readout carries has answered the question the card exists to make the student answer for themselves.
So the card is the whole instruction now, and nothing above it may grow a description of the command
back. What went with them is the "read what the tool descriptions cost you" move, since a reading
taken before anything is asked is what move two already does.
The unit is the one in the step carrying a task *and*
a registry quiz, so the two share one "Test your knowledge", which is written up under the exercise
shape below. Three things about the card. **The first move opens `kata/step1/java` with an agent in
it**, which nothing did while the prose was there, and it is the only move that names a command, so
it is the only one that splits by assistant (`window.open.claude.label` against
`window.open.copilot.label`). **The second and last moves are one reading with the MCP server
`connect-one` connected and one with it gone**, which is the
only place the course puts a figure on "a tool costs you by existing", so dropping either leaves a
count with nothing to compare it to; the server is a unit back rather than up the page now, and
`window.remove.label` names `tools` rather than saying "above", in both languages. And it is the one
task card with **no description line**, the key absent rather than empty: with the prose gone the
moves are what says where the work happens, and a description would be the cut paragraphs coming
back one sentence at a time. `TaskCard`
looks that key up instead of assuming it, which is what any card may leave out.

`context` and `session` overlap by design, and how the overlap is handled is the decision. `context`
already argues the re-send, the cost per message and the dead bug hunt, so `session` does not
re-argue them: it owns what `context` cannot, namely that this is the only layer with a time axis (the
other three are one turn's worth, and they *settle* here, so a fetched page is a tool result for one
turn and session content forever), that the student authored almost none of it by volume, and that it is
therefore the only layer they can prune after the fact. **The two paragraphs that restated `context`
were `data-audience="guided"`, and that rendered for nobody**: guided mode drops every top-level run
of prose whatever the attribute says, and self mode drops them by audience, so a bridge written for a
guided student reached neither reader. It is the same bug `workshop.the-board.1` was deleted for.
`lead.4` went the same way, since it restates `context.model-stateless.1` almost word for word.
`sessions-where-money.1` stayed, un-tagged and rewritten as a pointer: it names what `context`
priced, in half a sentence and a link, and spends the rest of itself on the price per message. That
gives the section named after the unit's most important claim a topic sentence again. Do not tag
prose here `guided`, and do not let the unit grow back into a second `context`. Anything a teacher
needs to bridge with belongs on the deck. Its figure, `SessionMakeup`, argues the *share* (two teal
slivers against the files and test output around them) and deliberately says nothing about growth or
re-sending, which is `BundleCompare`'s job in `prompt`. Its two student turns are the workshop's
second flag asked five units early ("Why does /api/titles return nine titles?" and "And what happens
to the tenth?"), which is a good plant and an undeclared dependency: a change to the catalogue's
count, or to what the pipeline does with the tenth entry, visits `session-makeup.block.1` and `.6` in
both languages.

`WindowFill` is the unit's second figure, under `automatic-manual-compaction.1`, and it draws **how full
the window is over one session**, twice: once emptied by compaction and once by a `/clear`, over the
same three tasks (`de pipeline lezen`, `de bug zoeken`, `de test schrijven`). Compaction fires on its
own, just under full, in the middle of the second task, and drops to a summary rather than to empty;
the clear drops to nearly nothing on the boundary between the second and third task. A compact table
under the charts says the same in words: when, what stays, what it costs.

**It replaced `WhereTheSeamFalls`, and the reason is that the old one argued something untrue.** That
figure held that both cuts lose roughly the same amount, so position was the whole argument, and it
kept cost out on purpose. Neither product works that way. Compaction is a separate request that
sends the whole conversation with a summarisation instruction: with a warm cache it reads the prefix
from cache, but it is still a large request, and the summary is output. A `/clear` costs nothing.
So the cost is now drawn in, as the **shaded strip at compaction's drop** (`window-fill.reads` and
`.writes`), and `automatic-manual-compaction.2` says it in prose. **Do not put the "same loss, on your
terms" claim back**, in the prose, in the figure or in `deck.session.clear.note`. The section's point
survives the change: you choose the seam, and only a clear lets you say what stays.

Three more decisions in it. **The two drops are not the same depth**, because a summary is something
and a clear hands over only what the student gives it plus what is on disk. **The chart is one drawing
for both products and only the table's "when" cell splits**, typed `Record<Assistant, …>` the way
`SurviveTheClear`'s moves are: Claude Code compacts when the conversation reaches the model's context
limit (a native 1M window a little before, at about 967K), and Copilot CLI starts in the background
at about 80% and pauses briefly if it reaches about 95% before it is done. A peak just under full is
true of both, so the curves did not split. **`/clear` is mono everywhere in it and `compaction` is
not**, since one is a command and the other a word. The table stacks under `sm`, each answer
carrying its column's name, rather than squeezing three columns into a phone. It keeps the step's
diagram vocabulary (teal is the window's contents, muted is what is not), and it is not a context
frame, so it does not compete with `ContextFalloff`'s.

`automatic-manual-compaction.1` opens on "before the pile stops fitting" rather than "when", because
neither product waits for 100% and Copilot CLI starts at about 80%. `.3` is a `data-assistant` pair:
`.3.claude` names `/autocompact`, which lowers the threshold (100K to 1M tokens) so compaction comes
earlier, and `.3.copilot` says Copilot CLI already starts at about 80%, in the background, and that
the threshold is not configurable. Sources, read October 2026:
code.claude.com/docs/en/model-config#default-auto-compact-thresholds, code.claude.com/docs/en/costs,
code.claude.com/docs/en/prompt-caching#compacting-the-conversation, and
docs.github.com/en/copilot/concepts/agents/copilot-cli/context-management. All three numbers are
dated and are the first thing to check when this section is next touched.

On the deck it sits on `deck-session-clear`, whose note now says the difference out loud (compaction
picks the moment and costs a request, a clear costs nothing). **The figure is a container
(`@container`), and that is for the slide.** Under its charts the table made it too tall to magnify,
so when its own box is `@5xl` or wider the table moves beside the charts, and only the deck's
`figureWidth: 1400` gives it that much room; the page column and a phone never do. The table's
stacking is `@md` on the same container for the same reason: the viewport says nothing about the
column the figure is in. Its `scale` is fitted to the box `SlideFigure` clips at.

It closes on `SurviveTheClear`, under the same `<hr>` and "Test your knowledge" heading the other units
use, with no prose between the rule and the card. Four moves: find a thing you would have to say
again next time, write it into `CLAUDE.md` as one standing instruction, clear the session, ask for
the work again without repeating yourself. The third move is the exercise. Writing the line down
proves nothing, and a card that stopped there would be a note rather than a task, so do not drop the
clear. It is worked **in the student's own project** rather than in this repo, and the card names no
example instruction on purpose: the line has to be one they were tired of repeating, and only they
know which one that is. Ticked to `kata.step1.survive`, on the same reasoning `CutItUp` is ticked.

All seven tasks are `shared/components/TaskCard.tsx`, which is the tick-card mechanics with the data
lifted out, the same move `ConnectBoard` made when a second drag board arrived. Keep additions there
rather than in a caller. **Two kinds of tick, and what each is for is `TaskCard`'s to say**: a move's
tick is where you are in the sitting and the card's is whether the sitting is behind you, so a caller
choosing between them is a caller with a decision that does not belong to it. The card's tick is
never derived from the moves, since a run at a problem can be finished with a move skipped on
purpose. Every move stays one line, so whatever a second line would have explained belongs in the
prose above the card.

`prompt` ran six sections where it once ran four, and both of those splits were forced by something
outside the unit. **`Reasoning level` is a heading rather than a paragraph inside `Instruction`** because
`model.reasoning-level.1` links here by name, and a student following that link has to land on a
heading that matches it; `Instruction` keeps one paragraph, on the cascade, and the term still
arrives last. **`One ask, not three` and `Be exact` replaced `What you steer after that`**, whose
"that" pointed at plan mode rather than at its own subject, and the split is what puts each figure
under the sentence that earns it. The first was headed `Bundling` until the gerund went, which moved
its keys from `prompt.bundling.*` to `prompt.one-ask.*` in the HTML and in `nl.json`; the practice is
still called bundling everywhere else, `recap` included. **That section no longer opens on
`/clear`**, and the removal is the decision: the paragraph told a student to clear when they change
subject, which is `session`'s to teach (it owns the seam, the loss and `SurviveTheClear`), and a
section that argued both bundling and clearing was carrying the two jobs it warns about.
`one-ask.2` opens it now, so the section argues one thing, that a window should hold one job, and
the figure under it draws that. The key numbering keeps its gap rather than shifting `.2` down, the
way `session.window-not-memory` and `change.environment-beats-project` do: a key is a location, and
renumbering moves a paragraph that did not move.
`BundleCompare` describes completed results rather than ongoing tool actions. Messages inside
resent bundles are labelled as earlier questions or earlier results, and the bundle says they
are sent again as context. Reusing a result must not look like executing its tools again.

**Four sections were added after `Be exact`, on a review asking for prompting tips a developer can
use tomorrow**: `Few-shot prompting`, `Output format`, `Paste the real error` and `What no longer
works`, plus `be-exact.2` on scope and its reason and `instruction.2` under `PromptParts`. They were
picked from a sweep of Anthropic's, OpenAI's and GitHub's prompting guides (October 2026), and what
the sweep turned up that another unit already owns was left out on purpose: a check the agent can
run is step 2's `goals` (`instruction.2` names it as the 5th part and links there), asking for proof
is `truth`'s, starting over when a session goes nowhere is step 2's `steering`, and being interviewed
is plan mode, above. "Tests first, and the tests are the spec" was also left out, since step 2's
`gates` is the more natural home and that was not decided. **Few-shot and one-shot share 1 paragraph**
(`few-shot.1`), and the terms refer only to how many examples the prompt contains. The course owner
removed the explanation of 2 meanings and the separate `few-shot.2` paragraph; `plan-mode.2` now
describes a model with or without a plan directly. **`What no longer works` is not a myth list for its
own sake**: each of its 3 habits (typing "think hard", role prompts, shouting in capitals) is either
documented as ignored (Claude Code passes "think hard" through as ordinary text,
code.claude.com/docs/en/model-config) or measured as not helping, and that is the bar for adding a 4th.

Four things in it are boundaries with other units. **The word *entropy* is not used here**:
`context` owns it, with an anchor, a heading, a deck slide and a quiz question, so `one-ask.2`
states the mechanism and stops. **Tiers are `model`'s**, so `meta-prompting.2` names the expensive
model and points at that unit rather than pricing it. And **the reasoning level's scale is Claude
Code's**, named in a scoped clause (`low` up to `max`, its `/effort` command, verified October 2026
against `model-config`; the settings page lists only 4 because `max` is session-only, which is how an
August check wrongly cut it to `xhigh`, and `copilot-specific.md` has the detail); it is not a `data-assistant` pair, because the dial exists in both products and only one of
them publishes a stable set of names. And **fixing an inaccuracy after the fact is step 2's
`steering`**, so `instruction.1` closes on a link to it in half a clause rather than describing the
move: the cascade is what this unit argues, and a paragraph that also said how to catch one mid-run
would answer the problem in the same breath as posing it. It links into a unit the student has not
met, which the step does elsewhere (`PickTheTier`'s amber verdict, `recap`'s closing section) and
which is only allowed where the target owns the answer outright.

`ReasoningCost` is the figure under `reasoning-level.2`, and it draws the two quantities that
paragraph asks the reader to weigh. **The answer segment is identical in all 5 rows and only the
dashed thinking segment grows**, which is the whole reading and the misconception `promptQuiz`'s
`reasoning-level` question tests. Its counts are invented and the caption says so, the way
`NextToken`'s does; the level names are mono and untranslated, like `ModelPricing`'s model names. It
carries **no context frame**, on the rule that protects `ToolsInContext`, and no currency.

**The reasoning level is never sold as a cure for a vague ask.** `reasoning-level.1` and `.2` used
to say a higher level absorbs the imprecision and the missing information, and to advise turning it
up for a vague ask. That overclaimed: more thinking works an ask over more carefully, but a decision
the student never made and context they never gave are not in the window to reason about, and
`be-exact` is this unit's own advice. So `.1` says what it buys and closes on what it cannot know,
and `.2` says to raise it for a hard or many-step task and that the thinking is billed as output.
`deck.prompt.divider.2`, `deck.prompt.reasoning.note` and the `reasoning-level` quiz question's
correct option and explanation moved with them. Do not put the absorbing claim back in any of them.

`EntryBrief` and `PlanItTwice` close the unit under the usual `<hr>` and "Test your knowledge", with
`promptQuiz` arriving under the same heading. The card replaced the self-only aside that told the
student to try plan mode once, which was a task card written as reading, and the pair replaced the
version of the card that came after that. Ticked to `kata.step1.plan`, like the rest.

**The task was worked in the student's own project once, and moving it into this repository is the
decision.** Four moves, a task of their own choosing, and a last move asking which of the two runs
they would ship. That left `plan-mode.2` a claim a student was invited to agree with rather than one
they watched land: no two students did the same thing, nothing in the course held the task, and the
verdict was an opinion about work nobody else could see. The exercise is now one ask against step 1's
own service, the same for everybody, scored by a check that is not anybody's judgement. Six moves:
start the service with the Catalogue page open, type the one line on the dearest model, restart and
score it, throw the attempt away, type the same line in plan mode on the cheapest model in a fresh
agent and correct the plan before approving it, restart and score it again. The sixth is still the
exercise, since a score settles which run was better and naming the wish you never said out loud is
the part that is worth anything tomorrow.

**The two tiers came back after they were dropped, and dropping them was the mistake.** The card
these six moves replaced said "on the cheap tier" and the first draft of this one held the model
constant, which quietly made the exercise a smaller experiment than the one it replaced:
`plan-mode.2` is a claim about a cheaper model *with* a plan against an expensive one without, and a
version that varies only the prompting cannot reach it. So the straight run takes the dearest model
the student has and the planned run takes the cheapest. The tier runs *against* the plan, which is
what makes a win unambiguous.

**Three of the six moves exist only to keep the two runs independent**, and every one of them was a
way to come back with a wrong number. There is no live reload in that project, so a score taken
without a restart is a reading of the previous build, and the check says so when every position
answers empty. The undo names `git restore kata/step1/java` and tells the student to delete what
`git status` still shows, because an agent leaves untracked files that a restore does not touch and
the second run would start pre-armed. And **the second run starts a fresh agent**, which is the
subtlest of the three: the check's own output names all six wishes, so an agent that watched the
first score go by has been handed the brief, and the second run would then measure the leak rather
than the plan. That is also why `plan.score.label` says to run the check *yourself, in your own
terminal*. It lands four units before `session` teaches `/clear`, so the move says it in words rather
than naming a command, and that sequencing is the reason rather than an oversight.

**Everything the task needs is in `EntryBrief`, and it is a figure because guided mode drops every
run of prose.** The unit carries no `<h3>` and no setting paragraph over the card, unlike `tools` and
`context`: a paragraph here would leave a classroom with a card whose ask nobody had been given, and
that is the bug `workshop.the-board.1` and `harness.check-yourself.1` were both deleted for. So the
figure carries the situation, the counter's 6 wishes, the one line the student types, and the
command that scores it, and `plan.description` carries the sentence the prose would have said. **The
situation block was added after a review**: the sheet used to open on "What the counter asked for"
with nobody having said who the counter was, what endpoint the wishes were about, or that the agent
never sees them, and the course owner could not tell what the exercise was. It names the endpoint
and the empty `EntryController` and says the agent sees only the one line; it says nothing about how
to implement any wish, which stays the rule. The wishes' numbers are digits now, and
`check-entry.mjs`'s `minus 1` label moved with them. Four things in it are
decisions. **The brief is read rather than drawn**: `UnderSpecified` in `harness` already draws the
gap between an ask and what it leaves unsaid, in the step's solid-and-dashed vocabulary, so drawing it
here would be that figure four units early and worse. **It is one wish per line**, which reads worse
than the paragraph it was and is the fairer shape: a student holding six FAIL lines against a block
of prose has to find the sentence each one came from before they can argue with it, and six lines
keeps every failure traceable to something they were told. **The prompt window is muted rather than
teal**, which holds `ExactAsk`'s vocabulary a section up, where a muted window is the vague ask and a
teal one is the exact one: this line is deliberately the vague one even though it is the line the
student is told to type. And **the line and the command have no `nl` entry**, like every other string
a student types or a machine printed.

**The six wishes and the check are one design and have to move together.** `kata/step1/check-entry.mjs`
scores exactly the six the brief says, in the brief's order and one line each, and its labels are the
wishes rather than the mechanism, so a failing line reads as something the student knew and did not
pass on. Rewording or renumbering a wish means visiting that file, in both languages.

**The six sit on five independent decisions, and counting the decisions rather than the wishes is
what this design has to be checked against.** The first cut asked for a bounds check, a 404 and a
stable answer, all of which an ordinary agent writes without being told: measured, a one-shot scored
five of six and the student watched nothing happen. The second cut was better and still wrong,
because three of its wishes were one error branch, so an agent that took the path variable as a
`String` and funnelled every unservable case through one informative refusal collected all three by
being tidy. What is graded now is where the counter's numbering starts (`CatalogPanel`'s, which an
agent inside the Maven project never sees), what the answer carries besides the title, how many there
are, that the shelf is counted from the far end, and what happens to everything unservable. The last
of those is the one tidiness can walk into, and it is kept, because a board where every line fails on
a first run reads as rigged.

Measured, and every row of this was run rather than reasoned:

| implementation | score |
| --- | --- |
| the shipped stub | 0 of 6 |
| one-shot, 0-based, bounds checked | 0 of 6 |
| one-shot, 1-based, bounds checked, returns the title | 1 of 6 |
| one-shot, 1-based, refusing with an informative reason | 2 of 6 |
| one-shot, `int` path variable, record DTO, informative 404 | 3 of 6 |
| one-shot answering in navigation links, one refusal helper | 3 of 6 |
| one-shot whose every refusal is a stack trace | 3 of 6 |
| one-shot, `String` path variable, one refusal helper, record DTO | 4 of 6 |
| the same, volunteering a `total` field as well | 5 of 6 |
| plan corrected, refusing with `ResponseEntity` | 6 of 6 |
| plan corrected, refusing with `ResponseStatusException` | 6 of 6 |
| plan corrected, refusing with `ProblemDetail` | 6 of 6 |
| plan corrected, and naming its neighbours as well | 6 of 6 |

**Wish 4 is what caps the table, and that is the guarantee worth stating: nothing that has not been
told about counting backwards gets past five.** Nothing in `kata/step1/java` and nothing in ordinary
REST practice suggests that minus one is the last one, so it is the floor under the whole exercise
and the first thing to protect if a wish is ever rewritten. Above that floor the honest figure is a
band rather than a number: an unprompted one-shot lands at 0 to 4, most often 0 to 3. The row at 5
volunteers a `total` field on a single-entry lookup, which is a construction rather than what an
agent writes, and it is in the table because the ceiling is the number worth arguing about. Falsify
this by producing one without asking for it.

Three rows in there are counterexamples kept as regression cases, and each of them broke a different
part of the check. **Navigation links** scored 5 while stating neither the position nor the count,
because the numbers were only ever inside its own `/api/titles/…` strings: `numbersIn` strips paths,
URLs and dates for that reason, and stripping alone is what closed it. **A stack trace as every
refusal** scored 6, because the crash guard tested the raw HTTP text where a trace inside JSON has
its newlines escaped, and the `length 9` in `Index 9 out of bounds for length 9` read as the count.
What that guard bounds is wishes 5 and 6, whatever the success path does, so the row's 3 is one
construction of it rather than a ceiling. And **naming its neighbours** is the one that failed the
other way: a plan-corrected endpoint answering `"previous": 1, "next": 3` was told its answer "is not
saying which one you asked for" when it plainly was, because wish 2 had grown a clause objecting to a
body that mentioned the *other* probed position. The two probed positions are adjacent here, so it
collided in both directions at once, and it failed the one run this exercise exists to reward. The
clause is gone. **Grading what an answer carries beyond what was asked for is this check inventing a
seventh wish**, and that is the rule to hold it to.

**All three ways of refusing had to reach six, and one line of configuration is what makes that
true.** `kata/step1/java/src/main/resources/application.properties` sets
`spring.mvc.problemdetails.enabled=true`. Without it a reason handed to `ResponseStatusException` or
`ProblemDetail` never reaches the caller on Boot 4, the body is a timestamp and a status, and a
student whose plan *did* carry "tell them how many we do have" came back 4 of 6, level with the
tidiest one-shot. That is the exercise collapsing on a framework default. `server.error.include-message`
is the property everybody reaches for and it was measured to change nothing here. It is not free: it
also buys a one-shot that refuses with an informative reason its one point, which is the 2 of 6 row.
That is the right trade, since the alternative penalises a correct answer rather than crediting an
adequate one. **The reasoning stays here and not in that project.** `kata/step1/java/CLAUDE.md` says
the property is on and points here, and `application.properties` says what the property does and
stops: a paragraph in either about refusals carrying a message is a nudge toward the gradeable half
of wish 5, planted in the one place the black-box argument needs to be empty.

**The check is a black box and lives outside `kata/step1/java`, and that is the load-bearing part.**
It talks HTTP to the running service, derives everything from `/api/titles`, and names no title, so
it holds if the catalogue is ever rewritten and it carries no second copy of a list the acrostic
depends on. It also takes no view on the shape of an answer beyond what the brief asks for: a title
on its own, an object carrying both under any field names, or a line with both written into it all
read the same, so nothing is graded that nobody asked for. Where it sits is the point: an agent asked
to write the endpoint works inside that Maven project, and a file in there setting out what to build
would hand the student's own knowledge to the model for free, which is the one thing this task
measures. The same reasoning is why `kata/step1/java/CLAUDE.md` says the endpoint is a stub and says
nothing about what it should do, and why `EntryController`'s own comment says the same and stops.
**Do not move the check into that project, do not write the six wishes into any file under it, and do
not implement `EntryController`**: an agent that writes it *because a student asked* is doing the
exercise, and an implementation committed here is that exercise done for everybody after them.

The one spoiling route left is pointing an agent at the check before both runs are in, which is the
same trade the repository already takes for `flags.ts` and for `front/` as a whole. **The root
`CLAUDE.md` names the file and deliberately does not say it holds the answers**, because that file
loads for any agent started at the repository root and a prohibition that advertises the answer key
is the leak it was written to prevent. Keep it that way if the prohibition is ever reworded.

**The feature is a position lookup rather than search on purpose.** `UnderSpecified` in `harness`
owns "Add search to the catalogue" as the course's canonical under-specified ask, with three open
questions pinned to `harness.decomposition.1`, and building search here would spend that figure four
units before it is drawn. The two units also answer under-specification differently and must be
allowed to: `prompt` says be exact and let the plan carry what you know, `harness` says cut it into
parts. Neither is the other's example.

`EntryBrief` is deliberately **not on the deck**. Every `TaskCard` is kept off it because a slide
would tick the tutor's own machine, and a brief on its own is the card's input rather than a drawing
the room reads, so the block would put an exercise sheet on the projector with nothing to do with it.

`PromptParts` is written up above and the prohibition on it holds here: no frame, no other
layers, no to-scale sliver.

`tools` is the second of the four layer units, and it used to be `external` ("material from outside").
It once ran after `harness`, then after `session`, and now runs before `context`. The rename is
the decision: naming the mechanism (the model asks, your system runs it, the output is appended)
beats naming the origin, because the origin was never the thing a student can act on. What survived
the rename is the part that still holds for a tool result, namely that the marking it arrives with
does not hold, and that a result is usually the bulkiest thing in there. `stay-critical.3` states
that the marking is real (its own content block, its own role, an instruction hierarchy trained on
top) and that it does not survive contact with the model, which is the claim `SpotInjection` grades.
**Do not let it fall back to "nothing marks it"**, on the page, on the deck or here. The layer is named in two
other places (`session`'s time-axis paragraph and the board's `flag.decode.help`, which opens on
it), so a further rename has to visit them. Its second figure (the first, `AgentLoop`, is written up at the end of these notes), `ToolsInContext`, argues one thing only:
the tool straddles the frame, so the half that runs is outside the window and only the result crosses
back in. `McpServer` is the third figure and is deliberately *not* independent: it is the same
frame, the same prompt bar and the same fills, so read on its own it says nothing. What it adds is
the wire, and the wire is its whole argument: one line leaves the named box outside, crosses the
border exactly once, and fans out into four description bars that then sit in the window like
anything else. It drew four straddling tools once instead, which said only "there are four now" and
left a large empty box beside them with nothing pointing into it. The crossing is the load-bearing
part: dashed while the line is outside, solid once it is in, so the border keeps meaning what it
means in every other diagram here. Redrawing either figure on its own geometry breaks the pair.
`McpParts` is the fourth figure: three cards naming what a server offers, and
**nothing drawn between them**, which is the decision. None of the three has crossed into a context
yet, so it carries no frame and no arrows, and the cards take `McpServer`'s dashed
outside-the-window stroke while each glyph is borrowed from the step's own vocabulary (the solid
prompt bar, the faint stack a tool result comes back as, the rounded tool outline). Wiring them
together ends the argument. It is also where the word *resource* is defined, and the definition is by
**who decides** rather than by where the content came from: you pick a prompt, your harness attaches
a resource, the model asks for a tool. That is the sorting the figure exists for, so a card gaining a
second line about cost or trust belongs in the prose instead. `McpOvals` is the fifth figure and
the one that closes that section, and it is a pair with `McpParts` rather than a repetition of it:
the cards sort the three by who decides, the ovals say the same three are one kind of thing, on the
cards' own columns (110, 320, 530) so the eye tracks straight down. Its radii and fills are
`ContextDiagram`'s per thing, which is what makes it the bridge into that figure: a student meets
these objects again inside the window rather than meeting a new set of shapes. Both alignments are
easy to lose, so moving one figure's columns means moving the other's. The labels are shared
`mcp-parts.*.name` keys, so a rewording moves both or neither. And **it carries no frame on
purpose**, the same decision `PromptParts` makes: the three have not crossed into a context yet,
so a frame here would be the window told a third time before `context` tells it properly. Do not add
one. The unit's order is
the argument too, so keep it: the loop, what a tool is, what each product ships with, where extra ones come from (MCP, and the three things
one offers), what holding many of them costs, why the results are the least trustworthy layer, what
they cost by volume.
**Three of its headings were argued with their own sections and renamed.** `Extra tools` became
`MCP servers`, because the section's second paragraph opens on tools not being all a server offers
and half of it is about the two things that are explicitly not tools. `It costs the same as
everything else` became `You pay for it on every turn after`, because the paragraph under it argues
volume rather than rate; the Dutch heading had already drifted to the truer claim, and the English
was taken to the Dutch. `The list itself is in the window` became `What MCP costs you`, because the
old one named the mechanism the first paragraph states and left the section's actual claim, that
you pay for a tool by holding it, to be found; the keys are `tools.what-mcp-costs-you.*` now, and
`copilot-specific.md` quoted the old wording. All three renames moved every key in their sections,
in the HTML and in `nl.json`.
**Prompts lost their paragraph.** `tools.mcp-servers.3` was the section's third offering written
out, one assistant-varied block naming where each product surfaces a server's prompts, and it was
cut: `McpParts` draws the prompt card, `McpOvals` repeats it and `mcp-servers.4` sorts it by who
decides, so the prose was the fourth telling and the only one that dated. The third offering is
carried by the two figures and that sorting paragraph now, so a prompts paragraph written back in
has to answer what it adds to them.
**The who-decides sorting is taught, drawn twice and never checked, and that is a knowing gap.** A
one-question registry quiz was proposed for it and rejected: four graded or ticked things already
sit under this unit's one "Test your knowledge", `promptQuiz` is one page back and `contextQuiz` one page
forward, and a fifth thing to do makes the busiest page in the course busier. If the unit ever loses
an exercise, this is the question to add.
`what-mcp-costs-you.4` is the section's closing aside and **the only number the course puts on how
many servers to hold**: four or five *added* ones in a context, and past that the job gets its own
specialised agent. It counts what the student connects rather than what they hold, and that scope is
load bearing: both harnesses start a reader well past four, Copilot CLI with the GitHub server the
same section names two blocks above, so an unscoped ceiling had the page telling that reader they
were over it. A student who runs `/context` a unit later sees the list. It
carries no `data-audience`, because a rule of thumb is as useful to a student in class as to one
alone, unlike the "try it once yourself" aside in `session`. Two things keep it
from being a duplicate of something else. It is the only place the unit escalates past "turn off
what this task does not need", which is what earns it a shape of its own rather than a fourth
paragraph in a section that already runs three. And it stops at the tool list: **`harness` owns
what a sub-agent costs** (an empty context, and refetching whatever it was not told), so a sentence
about the coordinator, the fresh session or the refetch does not belong here. That is the same rule
that took the sub-agent paragraph out of `model`.

`tools` **is titled "The agentic loop"** (NL "De agentic loop") while its id, its URL and its key prefix
stay `tools`, and that split is the decision: the page now opens on the loop that makes a model an
agent, and a tool call is one turn of it, so the title names the larger idea and the id keeps every
link and every `tools.*` key where it was. The layer is still tool results, so the layer names in
`session` and on the board did not move. The link texts that named the unit moved with the title:
`truth.grounding.2` ("the unit on the agentic loop") and step 2's `enablement.run-own-machine.2`
("step 1's unit on the agentic loop"), in both languages; the other anchors pointing here hang on the
word *tool* or on a phrase of their own, so they name no unit and stayed. A third rename means
visiting those two again.
**The lead is the loop first and the tool second.** `lead.1` says it in plain words (you give it a
goal, the model picks the next step, a tool call is run by the harness and lands in the window, the
model decides again, it stops when it asks for no more tools) and names *the agentic loop* last, and
it carries the unit's `harness` link at its first use, which moved up from the old `lead.2`.
`lead.2` is what the loop looks like on the wire, from Anthropic's tool-use docs (how tool use works,
and handling stop reasons, read October 2026): `stop_reason: "tool_use"` with one `tool_use` block
per call, several per turn possible, the outputs sent back as `tool_result`, round again, `end_turn`
as the normal end, and a failed tool coming back as a result marked as an error so the model can try
something else. **The other stop reasons (`max_tokens`, `refusal` and the rest) are left out on
purpose**: they matter to someone building against the API and not to someone driving a harness, so
a sentence listing them belongs in a different course. `lead.3` is the old first three paragraphs cut
to one (a tool is a request, the model cannot open a file itself, `grep`, an edit tool and `curl` as
examples, the harness puts tool results in the window, the tool runs outside the window).
It names tool results directly rather than saying "this layer", since no layer has been introduced
here. The same rule applies to `connect-one`: results enter the window, and adding a server makes
extra tools available. `lead.4` under `ToolsInContext` explains shortened tool output with a concrete
file example rather than an unexplained reference to the dashed half of the figure. The unit has no `data-audience` wrapper, so
neither does the technical paragraph: in class it goes with the rest of the prose, and the figure's
caption carries the three API names into the room on its own.
`AgentLoop` is the unit's first figure, a port of the agents slide in the ontbijtsessie deck
(`smartagents-website`, `secured/presentations/ontbijtsessie/slides/15-bouwsteen-agents.njk` and the
`ag-*` rules in its `deck.css`) on this course's tokens and its one teal: a dashed ring that flows
clockwise, a comet orbiting it on a 6.4s period, and the two nodes pulsing as it passes (the model
deciding on the left, the harness running the tool on the right), with your goal coming in on a chip
at the top and the answer leaving on a card at the bottom. Its keyframes live in `index.css` beside
`rollout`, since that file holds every colour, and the pulse animates `scale` rather than
`transform` so it never fights the translate that centres a node. Four things about it are
decisions. **The ring is a path, not a frame**: nothing sits inside it and no window is drawn, so
`ToolsInContext` is still the first context frame a student meets and the "first teal frame" rule
above stands; the moving dashes are motion, not the step's dashed outside-the-window stroke. Do not
put a window or a bar inside the ring. **The mono labels are the Claude API's names** (`tool_use` on
the top arc, `tool_result` under the bottom one, `end_turn` beside the exit arrow), and the caption
under the figure says so in both languages: they are the words a student meets the moment they read
a transcript or the API docs, and naming them on the drawing is what lets `lead.2` be short. The
approved mockup had `tool_result` on top of the bottom chevron and `end_turn` against the exit card,
so each label now has clear space around it, `end_turn` sits on the far side of the exit arrow, and
on a phone `tool_use` and `tool_result` move out past the right of the ring, because the label floor
makes them big enough there to reach the entry chip and the exit card. **Under
`prefers-reduced-motion` it is fully static**: no flow, no pulse, and no comet, since a dot frozen on
the ring would point at a moment that is not happening. And **it scales as one drawing**: every
length is in container units of the frame around it, the labels have a floor, and below 28rem the
two lines under the node names go (they are `lead.1` again) and the nodes widen. The entry chip is
the one small dark surface in it, on `--foreground` rather than `--header`, as the mockup drew it.
The Dutch node reads "Het harness voert uit", on the step's own article (`harness.title` is "Het
harness"), where the mockup had *de*. It is on the deck as `deck-tools-loop`, animated, ahead of
`deck-tools-in-context`.
**`What the agent can call` names each product's own tools**, one `data-assistant` paragraph per product,
because the names genuinely differ and a list in the other product's names is untrue for that
reader. Both were read off the vendors' references in October 2026: Claude Code's
(code.claude.com/docs/en/tools-reference: `Read`, `Write`, `Edit`, `Bash`, `WebFetch`, `WebSearch`,
`Agent`) and GitHub's Copilot CLI command reference (`view`, `create`, `edit` or `apply_patch`
depending on the model, `bash` or `powershell`, `glob`, `grep`, `web_fetch`, `task`). **Claude Code
has no `Glob` or `Grep` tool on macOS, Linux or WSL**: it searches with `find` and `grep` through
`Bash`, and only the Windows default set carries the two as tools, which is why the Claude paragraph
says so out loud. Re-read both references before naming another tool; the dated record is in
`copilot-specific.md` for the Copilot half. The old `lead.2` carried a product-neutral version of
this list ("find files by name, search their contents, read, write and edit a file, and a shell") and
lost it to this section rather than say it twice. `MCP servers` now opens on "when those are not
enough", so the section reads as the way past this list rather than as a fresh topic.
**The least trustworthy layer is tied to the loop by one sentence** in `stay-critical.3`: every result
feeds the model's next decision, so an injected line gets to steer the next step. It sits between
"the marking does not hold" and the closing line, whose subject became "The model" so the pronoun
cannot be read as the injected line. That sentence is what connects `SpotInjection` to the unit: a
review (FEEDBACK point 5) found the exercise read as unconnected to tools, because nothing on the page
said why a poisoned result is worse than a wrong one. The card's description now says the same thing
from the other side, and the reasoning for how far it goes is beside the card below.

`model` sits after `harness`: prose, five figures, and a card and a board under the same `<hr>` and
"Test your knowledge" heading `tools` and `harness` use. **It carries no version numbers anywhere, and that is
the decision.** Tiers
outlive releases, so the unit teaches Opus, Sonnet and Haiku as dispositions; a card naming this
quarter's release is wrong by the next one. **The lead no longer says that out loud**: the paragraph
naming the three tiers and telling the student the names change and the shape does not was cut, so
the figure now opens the unit and the only thing dating it is the small `(October 2026)` line moved
under it. What survives of the claim is `model.cost.3`, which says the ratios outlast the prices, and
that is now the only place it is made. Price and speed follow from that: they are ratios (roughly one, two and four per token,
output about five times input, the small tier two to three times faster) rather than figures, and
the prose says the ratios outlast the numbers. Do not put a price list or a version back in.
Two boundaries with units either side of it hold the unit up. `prompt` owns the **reasoning level**
and `model` owns the **tier**, and the section titled "Reasoning level" exists only to keep them
apart, because a `promptQuiz` distractor is precisely that confusion. So it **opens by pointing at
`prompt` rather than by defining the level again**: it names what that unit established, in half a
sentence and a link, and spends the rest of the paragraph on the tier and on the claim the section
is for. It read as a second explanation until then, which is what the pointer fixes, so a first
sentence that grows back into "the reasoning level decides how long a model thinks" undoes it.
A section called "Which one
you run" once argued how to match a tier to a task, and it went: the prose now states what the
tiers cost, how fast they are and how they differ from the reasoning level, and **choosing between
them is left to `PickTheTier` at the foot of the unit** rather than argued first and then
exercised. What went with it is worth knowing before writing any of it back. It carried the
sentence deferring to `prompt` on precision beating model size, and the one pricing a mid-task
switch (the cache does not travel, so the window is billed again on the tier you moved to).
Its closing section points back at `harness`'s coordinator instead of
redefining it, the same rule `harness.coordinator.3` follows. It adds two things and no more: that
the tier choice is one of the things that pattern automates, and **why the expensive model is good
at writing the brief, namely that providers fine-tune the smaller tiers on output from the larger
ones**, so it is writing for something trained on its own answers. It closes by **naming the saving
in this unit's own ratio** (the gap priced above, four against one) rather than in `harness`'s words:
it carried "top rate for deciding, a fraction of it for doing" near-verbatim from
`harness.coordinator.1`, and a back-pointer that repeats the sentence it points at is the pointer
failing. Do not let that phrasing come back. The paragraph that used to sit
there re-argued `harness`'s sub-agent refetch cost and was cut for that reason; do not put it back.
`ModelTiers` is the figure and argues one thing only: three tiers, three dispositions, three kinds
of task. Cost and speed stay in the prose because each needs a qualifying sentence that will not fit
on a chip, and it is not an SVG, so it joins the step's diagram vocabulary by staying out of it
rather than borrowing a frame that would mean nothing here. The three tier names have no `nl` entry
on purpose, the way flags and machine output do.

`ModelPricing` is the second figure and is the **one price list in the course, and the one place a
rate carries a currency**, which is why it exists (the only other dollar figure is the single total
`TokenKinds` in `tokens` works out from its Sonnet row, and it is a sum rather than a rate): the cost goal was argued everywhere and demonstrated nowhere.
It is also the one thing in the unit that names versions, and that is a knowing exception rather than
drift. `ModelTiers` beside it stays version-free on the reasoning its own component comment gives
(tier names outlive releases), so the table is placed to be read as *evidence for a claim* and never
as a reference: it sits under the paragraph stating the one-two-four ratio, and the paragraphs
after it sort the rows, say the ratios outlive the numbers, and close on `cost.4` putting the
student's own count against them. Keep that order. Moved anywhere else it becomes a price list,
which is exactly what the paragraph under it tells the student not to learn.

**Three things on this page sort the same three tiers, and all three now run cheapest first**:
`ModelTiers`, this table and `PickTheTier`'s column. The cards ran most-expensive-first until they
were flipped to match, which had the unit sorting one scale in two directions twelve lines apart
while each component's comment defended its own. The direction is the table's because the prose reads
in it: `model.cost.1` calls the small one a unit and counts up to two and four, and `model.speed.1`
opens on the small tier and closes on the top being slowest. So reordering any one of the three means
reordering all three, and reversing them means rewriting both of those paragraphs first.

**The table has four rows, the step teaches three tiers, and both stay.** Dropping the frontier row
was considered and rejected: the numbers are what a student would actually be billed, so the row is
named rather than hidden. `model.cost.2` is that naming, and three things about it are the decision.
It sits **after** the figure, because the row is the surprise and a warning ahead of the table spends
it early. It sorts and stops: what the frontier tier is good at is not taught here, since this step
is about the window rather than about the family. And it calls the row a ceiling rather than a fourth
tier, which is what keeps `ModelTiers` at three cards, `model.cost.1` at one-two-four, `model.speed.1`
at "the slowest of the three" and `PickTheTier` at three targets. Promoting it to a tier means
visiting all four.
Four claims the prose already makes can be checked against it by eye, and a row edited without them
in mind breaks the unit: the small tier as one unit against two and four, output at five times
input in every row, and a cache read at a tenth of input or less, which is what `harness`'s caching
section says (`harness.caching.1` read "roughly a tenth" until the top two tiers started reading
their cache at a twentieth and a fortieth).

**The ratio was one-three-five until October 2026, and it moved because the prices did.** Opus 5.5
came in at $4 and Sonnet 5.5 at $2, so the table, `model.cost.1`, `model.let-it-pick.1`, `recap`'s
tier bullet and the deck's two pricing slides were all rewritten together. The next re-read of the
pricing page has to visit the same five, and `harness.caching.1`, in both languages. The speed claim
("two to three times faster") could not be re-checked against anything published, since the docs
rank latency without numbers, so it was left alone. Prices and model names have no `nl` entry, like every other machine-shaped string
here; only the unit label, the column heads and the caption translate. The unit (`$ per million
tokens`) sits **above** the table rather than only in the caption, and outside the scrolling box, so
a reader who scans straight to the numbers knows what they count and the label does not slide away
when the table is dragged sideways on a phone. It is said once: the caption underneath carries the
month and nothing else. A row is always the **standing** rate and never an introductory one, and the
caption does not footnote a temporary price: the figure argues the shape of the pricing, and a
footnote about one row's temporary rate is exactly the price-list reading the paragraph beneath it
warns against. What the caption does carry is the month the prices were read,
which is the thing that makes the table's staleness visible; a rewrite that drops it leaves the
figure ageing silently.

The section closes on `model.cost.4`, the one place in the course that multiplies: the count
`/context` printed in `tools` against the table's rate is one turn in money. It reaches back across
the step on purpose, because the two halves of the multiplication live a unit apart, and it carries
no currency of its own, so `ModelPricing` stays the only rate with one. Step 0's last house rule
tells the student a hunt was not free and says step 1 hands them the numbers, which is a forward
pointer with no command and no arithmetic in it, so this stays the only paragraph that multiplies. A different paragraph once
closed the section and went: it argued that you pay the tier's rate on the whole window every turn
and that the tier is therefore a multiplier on the four layer units. That removal stands, because
the four layers already argue the re-send, `harness`'s caching section already prices it, and the
tier is a choice about the reader rather than about what fills the window. `cost.4` measures and
argues none of that, so do not let it grow back into the argument.

`PriceOneTurn` is that sum asked for, at the foot of the unit above `PickTheTier`. It exists because
`cost.4` was an instruction delivered as prose with nothing collecting the result, and because
`ReadYourWindow`'s `/context` count was a measurement the course took two units earlier and never
spent. Three moves, ticked to `kata.step1.price`, and **no description line**, the way
`ReadYourWindow` carries none: the paragraph above it is what says where the work happens. It grades
nothing, and it cannot: the window is the student's own. It carries **no assistant variant**, since
`/context` is the same command in both, which is what the rest of the step already relies on. The
card states the method and names no currency, so `ModelPricing` stays the only rate with one and
`cost.4` stays the one place the course multiplies.

`SpeedAtScale` is the section's figure and it settles a **threshold**, not a ratio: three counts of
calls on one axis, the small tier against the top tier, and a guide line at the couple of minutes
past which nobody sits and watches. `model.speed.1` claims exactly that threshold and can price
neither side of it in a sentence, and `lead.2` gives cost and speed equal billing while the section
had a table for one and nothing for the other. The reading is the crossing rather than the lengths.
It takes the step's vocabulary (a bar is something you have, a guide line is what you measure
against, the way `SessionWindows` draws the hour you go home) and it **carries no context frame**, on
the rule the whole step follows. Its seconds are hand-authored and the caption says so, the way
`NextToken`'s does; they are picked to sit inside the two-to-three-times gap the prose states, so
rewriting `speed.1`'s ratio means re-picking them.

**`The five-hour window` is the step's only Claude-only section**, and the gating is on every element
of it, both `data-figure` markers included. That is what the marker rule in `front/CLAUDE.md` is for:
a wrapped marker is not cut into a segment, so the figure would silently vanish for everybody. There
is no Copilot sibling anywhere in it, and the absence is the decision rather than an unwritten half.
A seat meters premium requests over a calendar month, so there is no rolling window to place and
none of it would be true for that reader, and the alternative was a paragraph telling them at length
about a product they do not have. Because there is no sibling, the keys carry no `.claude` suffix:
the suffix exists so a missing Dutch half of a *pair* falls back to the right language, and a block
with no pair cannot do that.

It is **one section over four paragraphs and two figures**, which is longer than the rule the rest of
the course keeps to, and it was written as two headings before they were merged. Placing the window
is not a second subject: it is what the first two paragraphs are for, and a heading between them made
the mechanic read as background to a tip. So `five-hour-window.3` and `.4` sit under the same heading
as `.1` and `.2`, and a rewrite that splits them again has to answer why the first half is worth
knowing on its own.

Three things in there are easy to break. The section **hedges on purpose**: *some* providers give
you a session limit and it is *usually* five hours, because this is one vendor's arrangement rather
than how models are billed, and a flat claim here dates faster than anything else in the unit. The
hedge is a frequency rather than a modal, which is the `lesson-writing` rule and is why it does not
read as the course being unsure. The
word *session* is that arrangement's word and not this step's, so `.1` says so in a clause and links
to `session`; drop it and the unit has two meanings for one word one page apart. And the five minutes
in `harness`'s caching section are a different clock entirely, so neither may be rewritten in terms
of the other.

`usage-readout` is the shot of what the harness prints, and it is `UnitShot` from `shared`, which
moved out of step 2 when this became its second caller. Its caption names the tool and the month and
says nothing about what is in the picture, because `five-hour-window.2` already says what the
readout carries. The image is **uncropped**, promo line and all: it is machine output, and tidying
one is the same move as inventing one. What makes it age visibly is the month in the caption, the
same job `ModelPricing`'s caption does.

`SessionWindows` is the second figure and argues one thing: the two rows carry the *same* two
five-hour windows, so the only thing that changed is the hour the first one opened. Both rows are
measured against the break and the hour you go home, which is what the two guide lines are for, and
they are drawn last so a bar cannot hide the alignment that is the whole reading. The dashed tail on
the top row is the step-1 reading of a dash, namely window nobody is there to spend. The `hi` beside
each opening dot is hard-coded rather than translated, like the model names in `ModelPricing`: it is
a word the student types. Move the worked day (08:00, the break at 13:00, home at 17:00) and every
number in both rows moves with it.

"API vs subscription" is the section under `Cost`, and it is the billing model: an API key billed per token
against a subscription drawn off a plan. It was one sentence in `harness` and was **moved here whole
rather than copied**, so `harness`'s "Which harness you run" must not grow a billing line back. Where
it sits is the decision. Directly under `ModelPricing` it reads as how the rates above reach you,
which is also why it carries **no prices, no plan names and no currency of its own**: the one table
in the course with a currency is a few inches up the page, and a second set of numbers here turns
both into the price list `model.cost.3` tells the student not to learn. What it argues is the thing
the table cannot: the tokens are the same either way, but a key shows you the number while a plan
hides it until you hit the limit, and then the cost arrives as waiting. It closes on who holds the
key in a company, which is **the only place in step 1 the team question appears**. That paragraph
stops at what the arrangement makes visible to the student and is not a section on procurement.

`PickTheTier` closes the unit, and it is `PatternMatch` with other data rather than a board that
merely resembles it: both are `shared/components/ConnectBoard.tsx`, and a caller is a list of
situations, a list of choices and a key prefix. That is the decision, and it was made after the two
copies drifted, with an arrowhead you could re-aim on one board and not on the other. **Anything
about how the board behaves goes in `ConnectBoard`**, so a student who learned the interaction in
`harness` meets the same one in `model`. What a caller may still choose is small and each choice has
a reason: whether the right-hand column shuffles, whether its labels are mono, and the block the ids
are built from. Five situations against three tiers here, so more than one lands on the same tier and
nothing falls out by elimination. Three decisions in it are worth keeping. **The tier column does not
shuffle**, which is the one place it departs from `PatternMatch`: an ordered scale scrambled reads as
noise, and only the situations shuffle. **The tier names are mono**, because they are names the
machine answers to. And **`redact` cannot be got wrong**: every tier will strip those log
lines and only the amount that gets past the strip changes, so it comes back **amber** (the design
system's caution colour, neither `--success` nor `--destructive`) with an explanation that prints
whatever you picked, and it closes by pointing at step 2, because repeating work is that step's
problem rather than this one's. Marking it right or wrong would teach that a lookup table exists
here. That amber verdict is `ConnectBoard`'s `answer: 'any'`, so any board can have a row with no
wrong answer; `PatternMatch` has none.

Three things inside `ConnectBoard` are load-bearing and easy to break. An arrowhead can be
**re-aimed by dragging it**, and the grip that does it is invisible on purpose: a dot on the arrow
point reads as a third kind of marker on a board that already has handles and targets, so it is a
bare hit area and the cursor is what advertises it. The grips layer needs its `z-10` or the target
button covers it. And the grip must **stay mounted while it is dragged**, since it holds the pointer
capture and unmounting it swallows the `pointerup` that ends the drag. While a situation is held,
every other line dims, because five lines onto three targets is otherwise hard to read.

Everything the student *does* sits below an `<hr>` at the foot of the unit, under one `<h2>` reading
"Test your knowledge". **That heading is the one place in the course where unit prose carries a shared key
rather than its own**, and the exception is deliberate: every unit with something to do writes
`data-i18n="ui:quiz.title"`, which is the same string `QuizPanel` puts over a quiz, so the wording
above a task and the wording above a quiz cannot drift apart. The `ui:` prefix works because
`nsSeparator` is left at its default while only `keySeparator` is disabled, so i18next reads the
namespace off the key and `useStepText`'s pinned `ns` gives way to it. Two things follow. A unit's
"Test your knowledge" section has **no `<unit>.<section>.heading` key** in either bundle, which is the one
break in "a key is a location", and changing the wording is one edit in `shared/i18n/locales`
rather than one per unit. Reach for a `ui:` key nowhere else: prose belongs to its step. That is the
shape: prose first, then one rule, then the doing, in the order `connect-one`, `ShutterFlag`,
`SpotInjection`, `BudgetWindow`. Do not scatter the exercises back up into the sections they belong
to. The `<h3>` over `connect-one` is the exception the rest of the step does not get: it is a
hands-on task that needs a sentence of setting, and the three graded exercises after it carry
none. `context` gets the same exception for `read-your-window`. **Two units in the step carry a
task and a registry quiz**, `context` and `prompt`, so in both of them the two share the heading the
prose wrote: `UnitPage` asks `showsExerciseHeading` whether the prepared page already carries the
`ui:quiz.title` block and hands `QuizPanel` `heading={false}` when it does, leaving the questions
under the task with the separator between them. It printed the heading twice before that, which was
a knowing price and is not one any more; the fix went into the shared components rather than into
this unit, so do not give the task a heading of its own or lift the rule off it. In guided mode the
prose goes and the authored heading with it, and the quiz prints its own again, which is why the
question is asked of the prepared page and not of the registry. `harness` follows the same shape now, with the `CutItUp` card
under the rule and `PatternMatch` arriving after it from the registry, and so does `model`, which
puts `PriceOneTurn` under its rule and `PickTheTier` after it. `workshop` was the last one outside the family
and is in it now, with `OneWindow` and the board under the same `<hr>` and heading, and nothing after
them. `recap` is outside all of this and always will be: it asks for nothing, so it has no rule, no
`<hr>` and no "Test your knowledge".

`tools` carries one of the step's seven hands-on tasks and all three of its graded exercises, and between them they
hold advice the prose used to state and no longer does. `ConnectOne` is that task and is a
`TaskCard` like the other six, on seven moves: add an MCP server to your own agent, fetch the
catalogue twice, once with `curl` and once by driving `/catalog` through the server, drive the
browser once more at a page with no service behind it and screenshot what it finds, then compare and
choose. It was two paragraphs of prose before that, and the change is the decision: a unit whose
closing section is a card, a card and a card had one instruction in the middle written as reading,
and a student skims a paragraph they would have worked through as a list. What stayed in the prose is
the pair of `<pre>` blocks, because a command is machine output rather than a move, and the sentence
above them naming Claude Code's `claude mcp add <name> -- <command>` (verified against the CLI) and
`npx @playwright/mcp@latest`, which is a server this repo already runs, so a copied line works. **The
moves name no command for that reason**, which also keeps the card readable in class, where the
`<pre>` is cut with the rest of the prose. **The last move asks which result you would want back on
every turn and nothing answers it**: the comparison is the exercise, so do not add the sentence
saying which route is bulkier, in the card, the description or the prose. Ticked to
`kata.step1.connect`.

**The third route is `kata/step1/front/index.html`, and the two moves that work it sit in the middle
of the card rather than at the end**, so `choose` stays the closer. It is one standalone page with no
build, no dependencies and no service behind it, which is what keeps a third server off a student who
is already running two: the agent opens the file off disk through the same MCP server. What it hides
is **step 1's sixth flag**, the one that is not on the `workshop` board, and the way it hides it is
the exercise. The string is XORed and base64'd
in the source and assembled in the browser when a button is pressed, so reading the file, grepping it
or asking the agent what it says all come back empty. `shutterFlag` in `flags.ts` holds the salted
hash and nothing else, and `kata/step1/front/CLAUDE.md` carries the prohibitions beside the page:
**do not decode it, do not reveal it, and do not let the plaintext reach any file in this repo.**
Two decisions in the page itself are load-bearing and are written up there rather than here: it
addresses the agent nowhere, because the same unit teaches prompt injection two sections later, and
the flag stays readable under `prefers-reduced-motion`, because a screenshot with the animation off
has to work too.

`ShutterFlag` grades it, and it sits directly under the card whose moves earn it. It is **one row and
no progress counter**: `FlagBoard`'s "n of five collected" is a collection, and one row printing
"0 of 1" is arithmetic nobody asked for, which is the whole reason it is a caller rather than
`FlagBoard` with a shorter array. The row itself is `FlagRow`, lifted out of `FlagBoard.tsx` into its
own module when this second caller arrived, the same move `TaskCard` and `ConnectBoard` made, with
the localStorage helpers going a step further into `solved.ts` so `FlagRow.tsx` stays a file that
exports only a component and Fast Refresh keeps working on it. It
takes the BEM `block` as a prop, so the workshop's rows are still `#flags-item-N` and nothing that
pointed at them moved. What a row *says* comes off the `FlagSpec` instead, `wrongKey` included: "go
back to the pipeline and read what it was hiding" is the wrong sentence on a board about a browser,
and it was a `FlagRow` prop until the workshop's rows each wanted their own, at which point one
place to choose it from beat two. `shutterFlag` carries **no `placeKey`** for the same reason it
stays out of `flags`, so its row renders no provenance eyebrow at all. **Anything about how a row behaves goes in
`FlagRow`.** The flag stays **out of the `flags` array** on purpose: that array is what `workshop`
closes the step with, one row per place an answer can come from, and a browser is
none of the five. It shares `FLAG_SALT`, which the file already says is not a secret. Nothing checks
the screenshot, and that is deliberate: the PNG in `.playwright-mcp/` is proof for the student rather
than for the app, and a grader that reached into their working copy would be the one thing on this
page that needs a backend. `SpotInjection`
is four tool results with one instruction aimed at the agent, and two of the clean three exist to be
mistaken for it (one gives orders to a human reader, one contains the word token twice), so a rewrite
that makes them look harmless removes the exercise. Its card asks for **the odd one out and does not
say what makes it odd**: naming the instruction aimed at the agent turns four results into a search
for one sentence, and the unit's warning aside is where a student who needs the term finds it. Do not
put the giveaway back in the title. **It has a description again**, and the reason it changed is
FEEDBACK point 5: with no line under the title, the exercise read as unconnected to tools. The
description it lost said four results had come back, which the four rows say by being there, and
that the check happens in the browser, which is true of everything in the course; the one it has now
(`spot.description`) ties the card to the unit's loop instead: one turn brought these four back into
the window, and the model picks its next step from them. **It stops there on purpose.** The wording
proposed with it ended "One of them tries to take the loop over. Which?", and that is the giveaway in
other words: a result taking the loop over is the instruction aimed at the agent, which turns four
results into a search for one sentence. Do not extend the line to say what makes the odd one odd.
`BudgetWindow`'s description lost the second sentence the old `spot` description lost. It now says that each row shows what it leaves in the window, because a reviewer read the
card as asking which call costs most without seeing the counts, and it keeps the one instruction that
more than one call is wanted, since the exact set is what it grades. The counts went from `text-xs`
to `text-sm` for the same reason. `BudgetWindow` is six calls against one small
change and grades the **exact set**, not the total, or filling the window and then adding the two
right calls would pass; its line counts are data rather than prose and its two right calls come to 25
lines. Those counts are **measured off `kata/step1/java`** rather than invented, because the task is
framed against this repository and a student who checks will check them: the controller is 24 lines,
the grep for `"/titles"` returns its one `@GetMapping` line, a glob of `src/**` lists 71 files, and
everything under `services/` is 1250 lines over 55 files, with 50 concrete stage classes (52 `*Stage.java`
files, two of which are the `CatalogStage` and `AuxiliaryStage` interfaces). Three message keys carry
numbers derived from them (`budget.explanation.services` says fifty, `budget.explanation.tree`
says ten times the controller, `budget.explanation.listing` says seventy-one), and
`budget.call.services` prints the file count, so a re-measure has to visit all four, in both languages, plus the
comment above the figure in `tools.html`. **The right verdict no longer prints the count**, so 25 is
a number the student adds up off the rows rather than one the panel hands back; the wrong verdict
still prints what they spent against what it would have taken, because that comparison is the whole
correction. Both mark a wrong pick in `--destructive` and the answer the student missed in teal, because
red here would read as the result having failed rather than the answer. Both shuffle once per mount
through `shared/lib/shuffle.ts`, which `PatternMatch` also uses now. Both verdicts are a plain
`PanelNote`, and so is every other note in the course now: they took a `rule={false}` once, because a
coloured bar down the side of a sentence explaining rows marked in the same two colours was the
verdict said twice, and the bar has since gone from `PanelNote` altogether.

Machine output inside an exercise stays English in every language: `SpotInjection`'s four result
bodies and sources and `BudgetWindow`'s six commands have no `nl` entry, on purpose, the same way
flags and grading messages do. Everything framing them is translated. **`BudgetWindow`'s rows each
lead with what the call does, not with the tool that makes it** (`budget.kind.*`: files by name,
search contents, read a file, shell), so a student can still see why the search is the cheap one. They
led with tool names once (`Grep`, `Glob`, `Read`, `Bash`), and that was untrue for most readers:
Claude Code has no `Glob` or `Grep` tool on macOS, Linux or WSL and searches with `find` and `grep`
through `Bash` (code.claude.com/docs/en/tools-reference), and Copilot CLI spells its tools `glob`,
`grep`, `view` and `bash` (docs.github.com/en/copilot/reference/cli-command-reference), both checked
October 2026. A function label is true in both harnesses and on every platform, and it reuses
`what-it-can-call`'s own words, so the card and the prose above it describe the same tools. **The
labels are prose and translated**, unlike the call text after them, which stays English as machine
output. Do not put a tool name back, and do not split the labels per assistant either: no single
assistant's names are right on every platform. The three counted strings (`budget.lines`,
`budget.running`, `budget.wrong`) are i18next plurals on `count`, `_one` and `_other`, because one
grep is one line and the card printed "1 lines". The grep is `"/titles"`
and not `"api/titles"` on purpose: the controller splits its path over `@RequestMapping("/api")`
and `@GetMapping("/titles")`, so the longer string misses it and finds a line in `Desk.java`.

`truth` sits between `model` and `workshop` and owns **where an answer came from**. Four sections,
in the order they have to be read: `The cutoff` (training stopped on a date), `Grounding` (put the
evidence in the window), `Proof` (run the thing) and `Hallucinations` (the failure that survives all
three). It carries a registry quiz and no exercise. The card was proposed and rejected on the constraint
that still holds: `model` closes on `PickTheTier` and `workshop` is a whole board, so a card here
would sit between two exercises with nothing new to ask for. The quiz is there for the other half of
the problem, which the rejection did not cover: this unit has no `data-audience` wrapper, no task and
no board, so guided mode filtered it down to two figures and nothing else. `truthQuiz` is the one
thing on the page that survives into the classroom, and the unit writes no heading of its own, so
`QuizPanel` prints it the way it does under `prompt`. Its three questions ask where an answer came
from, and none of them re-argues the average: `contextQuiz`'s `invented-userservice` still owns the
missing-context case.

**The lead poses the question and does not answer it**, which is what the four sections are for. It
names three sources for one answer, discovered, instructed and trained, and closes on which of them
is the truth. The question is rhetorical on purpose: the unit's answer is that you cannot tell from
the answer, so a lead that picked a winner would spend `Hallucinations` five paragraphs early.
Three things in it are load bearing. It states the cutoff **in a clause** and leaves the argument to
`The cutoff`, so that section keeps its opening. It says the model was never trained on your company
at all, which is the half a cutoff date does not cover and which nothing else in the step says. And
`lead.2` carries the unit's **second link to `tools`**, half a sentence like `grounding.2`'s: this
one is where discovery is first named, that one is how the file gets in. Two anchors on one page is
the decision, since a reader landing mid-unit meets whichever comes first.

Three figures, `TheCutoff` under `The cutoff`, `TrainedOrGrounded` under `Grounding` and
`AnswerProvenance` under `Hallucinations`, and **they take different cuts of one argument rather than
drawing it three times**. The first is the time axis, the second is two *whole* answers a window
apart, the third is one answer whose parts did not all come from the same place. Collapse any of them
into another's shape and the unit makes its point twice. `Proof` is still deliberately undrawn:
running a command is something the student does rather than something to look at.

`The cutoff` was undrawn too, on the argument that a date has no shape, and it now has a figure at
the foot of the section because **the thing worth drawing there is not the date**. It is the far
side of it, and one line across a release line says in a glance what the paragraph needs two
sentences for. Three things in `TheCutoff` are load bearing. The far side is **dashed rather than
faded**: a gradient or a lighter fill would say the recent versions are known less well, which is the
exact reading `truth.cutoff.1` exists to kill, and dashed is already this step's stroke for "nothing
behind this" on `AnswerProvenance`'s invented row. It carries **no date**, because every model has a
different one and any number printed there is wrong for somebody in the room. And its versions are
`TrainedOrGrounded`'s, `3.5.0` on the near side and `4.1.0` on the far one, so the two figures are one
story: this is where that trained answer comes from. That ties the pom to **two** files now, so a Boot
upgrade in `kata/step1/java` means moving the number in both.

It also changes what guided mode gets. `The cutoff` had no figure, so its heading was dropped with
the prose and the section did not exist in class; the marker gives that heading something to sit
above, and the classroom page is now three sections rather than two.

**`TrainedOrGrounded`'s two answer chips are identical in size, fill and position**, and that is the
figure. What differs is the window above them, which is the part an answer never tells you about, so
a tick, a cross, a colour or a heavier weight on either chip is the drawing contradicting the prose.
Their strings differ (`3.5.0` against `4.1.0`) because the trained answer is not a wrong-*looking*
answer, it is the previous version line stated as levelly as the current one. **`4.1.0` is what
`kata/step1/java/pom.xml` actually declares**, so a student who checks finds the figure honest; a
Boot upgrade in that project means moving the number here. Nothing else in it is new: the teal frame,
the solid prompt bar and the faint stack are the step's own vocabulary, which is what lets it be read
without a legend.

**`AnswerProvenance`'s left column is uniform on purpose** and the second column is where everything
varies, because the second column is the one a student is never handed. The three claims are true of
`kata/step1/java` apart from the middle one, which is a method `Catalog` does not have, so both
sources can be opened and checked. The invented row is **the step's dashed stroke rather than
`--destructive`**: nothing failed, and a red row would say the agent was caught. Amber is wrong for
the same reason, since it belongs to a cost tip and a hazard aside. It is DOM rather than SVG on
`ModelTiers`'s precedent, since there is no geometry in it. Its symbols and filenames are
machine-shaped, so they are data in the component with no key and no `nl` entry, the way
`ModelPricing`'s numbers are.

None of the three carries a caption, on the rule that a caption states provenance and the prose does
the explaining. `TrainedOrGrounded` and `AnswerProvenance` are read by the paragraph under them:
`truth.grounding.2` opens on "Only the window changed" and `truth.hallucinations.2` on two of the
three having been read, so **rewriting either figure means visiting that opening sentence**, in both
languages. `TheCutoff` is the one that closes its section rather than opening one, so it is read by
the two paragraphs above it and there is no sentence under it to keep in step.

`TrainedOrGrounded` and `AnswerProvenance` are on the deck and `TheCutoff` is not, which is a
decision rather than a gap: the block leads with **the statement slide rather than a figure**, on
`harness`'s precedent, because the two drawings are one claim measured and the room needs the claim
before either means anything. A third slide before them would spend that opening on the setup.
`AnswerProvenance` is laid out at
1100 and magnified less than the drawing above it, because `SlideFigure` clips rather than shrinks:
`width * scale` past the frame takes the left edge off the symbols, which is where the claims are.

Three boundaries hold it up, and each of them is a unit away. **`context` owns the average**, so
this unit must never re-argue that a model is a statistic, that frequency beats quality, or that
there is more bad code on the internet than good. What `context` never says is that training has a
*date*, and the cutoff is that gap filled. `contextQuiz`'s `invented-userservice` question is the
one place the two genuinely meet: it is this unit's scenario asked four units early, and it never
names the term. Leave it where it is. A quiz sitting on the page that owns the word would be graded
before the word had been given. `truth.hallucinations.1` names that quiz early on as the place the
student already met the case, so the early ask is a paid-off callback rather than a silent
duplicate, and it sits ahead of the `Catalog` example rather than after the term, so the paragraph
still closes on the word arriving, and rewording either side means visiting the other, in both languages. **`tools` owns how evidence gets into the window**, so
`truth.lead.2` and `truth.grounding.2` each link to it in half a sentence rather than describing a
fetch; `tools` also owns
"a tool result is the least trustworthy layer", which is why grounding here stops at *reading rather
than remembering* and does not grow a paragraph about the source being stale.
`truth.grounding.3` is the one move it adds for facts outside the project: ask the agent to search for
the vendor's own documentation and read it before answering. It was added at the author's asking, and
it names the move and stops, since how the page gets fetched is `tools`'s to say. And **step 0's `welcome.house-rules.4`, with
`flag.decode.help` behind the workshop board's Hint, is this unit's proof section applied**: both
tell the student to make the agent run the decode rather than reason about it, in the words of that
exercise. The general rule belongs
here and the applied one belongs there, so do not let either grow into the other. Step 2's `goals`
is the third neighbour worth knowing about: it owns "if you cannot name the command that answers yes
or no, you do not have a goal", which is about the instruction you hand over. `Proof` is about
checking an answer you already have. Keep them apart.

Two smaller decisions. **`Hallucinations` comes last rather than first**, because the term is only
worth having once the reader knows what grounding and proof would have caught, and the section
names it in its closing clause on the step's name-the-term-last rule. And **every example in it is
this repository**: the version number out of `kata/step1/java`'s `pom.xml` across the first three
sections, then a method that does not exist on `Catalog` in the fourth. The version is deliberately
one question asked three ways (guessed, grounded, proved), which is what lets those sections read as
one argument instead of three topics; `Catalog` is picked because the student has already called it
from `/catalog`, so the invented method is measured against a class they have met.

`workshop` is the step's capstone, a flag board: five flags, **one per place an answer can come
from**. In board order, the student finds the first in a file on their own machine that has been in
every session they have opened since they set the course up, reads
the `GET /api/titles` response itself for the second, turns the log level up for the third (a line
printed only at DEBUG), reads the source for the fourth (a literal in a branch that never runs), and
traces the running pipeline for the fifth (the hidden tenth entry it computes and drops). **Do not
commit an implementation, a decode or a reveal of any of them.** How each one is carried is under
`## How the five flags are carried` below, which is this file's job and deliberately not
`kata/step1/java/CLAUDE.md`'s.

**`machine` is the newest row and it is first, and it exists because everything else on the board
comes out of a project.** The step teaches four layers, and `harness` is the one a student never
meets as a thing they can open: the four older rows all sit inside `kata/step1/java`, so a capstone
about provenance was silent on the level *above* any project. A user-level instructions file is that
level. It is on their machine, it is merged into every session in every project they open, they
never wrote it into a prompt, and until this row nothing in the course said so. What makes it a flag
rather than a paragraph is that the student watches it arrive in a window they did not put it in.

**The line is planted at install time, and by the student's agent rather than by the student.**
`install.txt` at the repo root is what does it: the README tells a student to open the folder with
their assistant and ask it to execute that file, and the file runs
`.claude/skills/repo-setup/check.sh` and then `node kata/step1/machine-context.mjs setup <assistant>`.
**The indirection is the exercise, and it is the whole justification for the design.** A student who
plants the line themselves on this page is not hunting for anything: they know what was written, they
know where, and the row collapses into plant it, then read it back. Planted at install time it has
been in every session they have opened, for hours, and they never looked. What the row asks then is
the question the step is actually about: something is in every session you start that did not come
from this project, find it. That is also the first house rule kept rather than broken, since only
their agent touches anything, and it is what the setup `<pre>` on the workshop page was quietly
undoing. Do not put a plant command back on that page.

**The course still does not plant anything silently**, and the consent moved with the command rather
than being dropped. `tools` teaches prompt injection two sections earlier and the step teaches that
unsourced context is the least trustworthy layer, so a course that quietly wrote instructions into a
student's global agent config would be running the attack it warns about, on their laptop, outside
anything the app can undo (`shared/lib/reset.ts` only clears `localStorage` keys under
`kata.step<N>.`). So **`install.txt` is honest at the top, before it names a single step**: it says
it writes one line into a file outside this repository, names that file for both assistants, and
carries the removal command. It says nothing about a flag, a board or a workshop, because a student
who skims must not be handed the row and a student who reads the file closely has taken the same
spoiling route as reading the script. `README.md` names `install.txt` and nothing more, so the
instruction and the disclosure are one click apart rather than one file apart.

Everything else about the mechanism sits on the row, where it survives guided mode:
`flag.machine.help.claude` and `.copilot` carry the path, what merges those files into a session,
the removal command, and one sentence for the student who never ran `install.txt` at all. That last
one is not optional. A student who cloned fresh, or whose agent ignored the request, has nothing
planted and no diagnostic, and an unsolvable row with no explanation is the worst failure this board
can have.

**The flag sits in the planted line in plaintext, and nothing depends on the model obeying
anything.** `cat` the file and it is there; ask the agent what it was told and it is there. An
exercise that needed the agent to comply with an instruction would be graded by the model's mood.
The line itself asks the agent for nothing, which is also what keeps a course exercise from being a
live injection.

Three constraints on the script that are rules rather than description, and every one of them exists
because it writes to a file outside this repository that the app cannot undo. They matter more now
that an agent runs it unattended than they did when a student typed it. **Append only, between
the two sentinel lines, and nothing outside them is ever rewritten.** **`setup` is idempotent and
`remove` leaves the rest of the file byte-identical**, trailing newline included, which is why setup
appends exactly one newline before the block and one after it and removal takes exactly those away;
it also backs the file up beside itself once, writes through a temporary file and renames, and
treats a missing file and a missing directory as the normal case. **`setup` prints the block it
wrote, the absolute path and the removal command**, because that is the primary place a student
learns how to clean up. It prints the block with the flag masked, since the terminal is not where
the answer is meant to arrive.

**The flag is not in the script as text.** `CIPHER` is the string XORed against a rolling key and
base64'd, the same move `kata/step1/front/index.html` makes, so the repo-wide rule that no flag's
plaintext reaches any file here still holds. That is obfuscation and not secrecy: reading the script,
or reading `install.txt` closely, is a spoiling route a student takes knowingly, and both are
allowed. Nothing says so on the page any more, because the page no longer sends anybody to either
file. The plaintext exists in exactly one place, the student's own instructions file, which is
outside the repository.

**Copilot CLI needs one extra beat**: an edit to an instructions file does not reach a session that
is already running, so you exit and resume. That used to constrain the order of two `<pre>` pairs on
the page and does not any more, since the line is planted at install time and no session the student
cares about is running yet. It survives in two places instead, `install.txt`'s closing note and
`flag.machine.help.copilot`, which says a session that was already running when the file changed
never saw it. The hint line says "ask a fresh agent" for both readers, which is true either way and
is what keeps `flag.machine.hint` out of the assistant split.

**The row is the board's first assistant-varied anything.** The path and the command differ, so
`FlagSpec.helpKey` takes either a plain key or a `Record<Assistant, string>`, `FlagRow` reads
`useAssistant()` itself and resolves it through `keyFor`, and both siblings are suffixed
(`flag.machine.help.claude`, `flag.machine.help.copilot`) with no bare key meaning Claude. The
`Record` typing is the point: a third assistant is a compile error naming the keys that have to be
written rather than a Cursor student being pointed at `~/.claude/CLAUDE.md`. Put any further
branching in `FlagRow` or in `flags.ts`, never in `FlagBoard`.

**`system` is the second row, and it exists because the capstone was a
backend-only string hunt.** The three below it come out of one Spring Boot project, nothing in
the step crossed to the frontend, and `/catalog` was named in the lead and then never used for
anything. Step 0's `welcome.how-workshops-work.1` already promises two kinds of flag, some hidden in
the code and some printed by a build once the project is where the step wants it; step 1 was only
using the first kind. This one is the second: no file holds it, so no grep returns it, and it comes
out of the running system or not at all. That is also why **`/catalog` is an instrument on this page
now rather than a mention**, and why `CatalogPanel`'s dumbness and `catalog.description`'s "in the
same order" are load bearing rather than incidental. Neither may be softened. A page that cached,
filtered or re-sorted would be an unreliable readout of the thing the student is being asked to read.

**It goes ahead of the three project rows, and the position is the argument.** Standing
both halves up is what two of the remaining rows need anyway, so reaching it early means the service
is already running when the student gets to them, and it pays off in the first minutes rather than
after an instrumented rebuild. What it buys the step is `truth`'s Proof section met rather than argued:
there are two honest routes to this flag, reading nine `@Order` annotations spread across fifty-five
files and sorting them, or starting the thing and reading a page, and one of them is enormously
cheaper. The course makes that claim in prose in `truth` and had never let a student feel it. The
board still runs easiest first and **the trace still closes it**, because ending on the judgement is
step 0's fourth house rule paid off.

**The three older rows were labelled tools, session and harness once, and that mapping is gone.**
Each of those three `flag.*.help` keys opened by naming a layer, and in all three cases the noun meant
something other than the unit that owns it: `tools` is tool calls rather than code on disk, a Spring
request is not the student's session, and this project's log config is not the harness. So the board
wore the step's vocabulary while exercising none of it. What actually separates the rows is
provenance, which is `truth`, the unit directly above this one. The help keys carried that for a
while and do not any more, because **the provenance is on the row face now**: `flag.*.place` is an
eyebrow above each label (`From your machine`, `From the system`, `From a setting`, `From the
source`, `From the run`), so
the board's whole argument is readable without opening a dialog. It was only ever inside the Hint
dialogs before, while the deck had been making it out loud in class for as long as
`deck.workshop.flags.title` has read "Five flags, five places an answer can come from"; the eyebrows
are kept close to that slide's wording on purpose. **So a help key may not open by saying its eyebrow
again.** All three of the older ones did, and
all three lost that opener: `flag.decode.help` and `flag.trace.help` opened on pure location and now
open on the technique, and `flag.debug.help` kept "not hidden in the code at all", which is an
argument rather than a place, and lost only the sentence about the default setting. That took three
dialogs of 60 to 90 words down to 40 to 70, and `flag.system.help` was written into that band.
`flag.machine.help` runs longer than the band in both variants and is the one row allowed to,
because it is the only one that has to carry a path, a removal command and the fallback for a
student who never ran `install.txt`, and a student who has to retype a command out of a dialog
cannot be sent hunting for it. It carried a setup command and a spoiler note as well while the
student planted the line themselves, and both went when the plant moved to install time: there is no
command to run any more, and no script they are about to open that a warning would save. Do not write a layer name back into any of the five, do
not let a help key open on what the eyebrow already says, and do not let one close on what its own
first sentence already said (`flag.decode.help` lost "no trace will show it" and `flag.debug.help`
"at the default log level it never prints" for that reason). The two ends of the seam are marked
now: `truth.hallucinations.2` closes on the workshop and `workshop.lead.1` links back, so rewording
either means visiting the other, in both languages.

**The board runs easiest first, and the order is `machine`, `system`, `debug-config`,
`decode-source`, `trace-runtime`.** It ran hardest first once, which was a fossil of the abandoned
layer mapping rather than a decision. That order is also the provenance ladder read outside in, from
the student's own machine to the run inside one project, and the two orderings agreeing is what lets
the board be sorted once. What it escalates by is machinery: one script needs no reading at all,
reading the response needs none either, a setting
needs a flag on the launcher, the source needs a read and a scratch decode, the run needs
instrumenting, rebuilding, running, and then a judgement about which of the lines that came back is
the flag. **Opening outside the project and ending on the judgement are both the point**: the first
puts the layer nothing else on the board covers where it cannot be skipped, and the last is step 0's
fourth house rule paid off. So a reorder that moves `machine` off
the front or the trace off the back costs the board one of its two ends. Reordering is otherwise
cheap, because `solved` is keyed by `flag.id` rather than by
index, but two things recite the order and go stale with it: `deck.workshop.flags.note`, in both
languages, and every doc comment that lists the rows (`flags.ts`, `FlagRow.tsx`, `index.tsx`).
`flags.panel.description` is where the student is told about it, in one clause, and the clause about
the check happening in the browser was dropped to make room: knowing where to start matters more to
someone opening the board than knowing where it is graded, and the `Check` button says that for
itself.

**Each row carries its own wrong message**, on `flag.*.wrong`, because `flags.panel.wrong` sent the
student back to the pipeline and that is true of one row out of six across the two boards.
`decode-source` sits in a branch that never runs, so there is no pipeline to go back to,
`debug-config` is not hidden by the pipeline at all, `system` sends the student back to the page
instead, and `machine` never touched the service. A wrong message says "not that one" and points
back at work the student already did. **It never carries a hint the Hint dialog does not**, which is
the rule that keeps a stuck student going to the dialog rather than farming the error line. The key
moved onto `FlagSpec` rather than staying a `FlagRow` prop, and `shutterFlag` moved with it, so there
is one place a row's message is chosen from instead of two.

**A wrong paste is retried against a few cosmetic repairs**, and the reason is that a student who
found the right flag and typed it without its braces was being sent back to redo correct work. The
list is in `candidates()` in `FlagRow.tsx` and every entry is a typing slip: surrounding whitespace,
quotes or backticks the value was pasted inside, the braces left off, one trailing sentence mark, the
case it was read in. **The lowercasing is the newest and it arrived with `system`**, whose answer is
read off Title Case book titles while every flag in the course is lowercase. It sits ahead of the
brace step so the two compose, which is the whole point of it: the letters typed bare and uppercase
still land. **None of it may become a search, and the constraint is load bearing.** Nothing extracts a flag out
of a larger paste, and nothing runs at all once the trimmed value still holds whitespace inside it,
so a pasted trace dump is checked exactly as typed and fails. `flag.trace.help` says five leetspoken
lines come out of the trace, only one is the answer, and "your agent cannot pick; you can". A board
that found the winning `{...}` inside that dump would make the pick for the student, and that pick is
the best moment in the step. The comment in `FlagRow` says so, and a substring match, a regex over
the whole value or a split on newlines all break it.

**A paste that is one whole flag is graded on arrival**, without the student reaching for Check, and
it is the same interaction `CodeCheck` gives them in the intro. What counts as one is
`isWholeFlag` in `shared/lib/flag-paste.ts`, a pair of braces with no brace between them, tested
against the **whole trimmed paste**: that is the constraint above enforced a second time and for the
same reason, so a dump carrying the winning `{...}` among five is not a flag being handed over and
nothing fires. Loosening that test to look inside a paste ends the trace row, so it is the same edit
the paragraph above forbids. Anything that is not one whole flag pastes the ordinary way and waits
for the button, which is what leaves `candidates()`'s repairs their job.

**The board says what the five proved once all five are in**, on `flags.panel.complete`. It ended
on a bare count collected and nothing else, which is a counter rather than a close on the step's most
important exercise, and the `data-state="complete"` the card already computed went unused. The line
is `truth`'s lesson landed by having done it: five answers, five places they came
from, one of them never in the service at all, and nothing about the answers themselves saying which
was which. That reads directly off the five eyebrows the student has just filled in. It takes the `--success` tint a solved row already
wears and nothing more, on the flatness rule, and it **states what was proved and stops**: no pointer
at `recap` and none at step 2, because the unit's closing section was deliberately deleted and a
forward pointer here puts it back.

**`OneWindow` is what makes this a capstone rather than a puzzle**, and it is the answer to the
complaint that the board grades nothing the step taught. Five flags can be collected without ever
looking at a window, counting a token or asking what a turn cost, which left a step about the window
ending on a page that never mentions one. The card frames the whole hunt as **one session with a
`/context` reading at either end**: read the number, work all five flags without clearing, read it
again, then say which flag you could hand over whole. It is `TaskCard` like the step's other six,
ticked to `kata.step1.hunt`, and it grades nothing. The first and third moves are a pair on
`ReadYourWindow`'s reasoning, so dropping either leaves a number with nothing to compare it to, and
the fourth move is the debrief that used to sit over the board as prose: it belongs after the work,
because which flag you could hand over whole is something you find out by handing it over. It also
means this page is where the student watches the window fill with the bulkiest thing in the course,
a trace and a console dump, which is `tools`'s claim about volume met in their own session.

**The board is an inline figure rather than the registry's trailing `figure`**, which it was until a
closing section arrived under it. That section is gone again and the board is the last thing on the
page, so the two slots would now render identically; it stays inline because the card and the board
are one shape and both being markers is what says so. The board deliberately carries **no heading**:
in guided mode a heading is adopted by the *next* top-level marker, so one written for the board
would be pulled up over the task card instead.

The unit follows the step's exercise shape at last, which is audit item 46 closed: an `<hr>`, the
shared `<h2 data-i18n="ui:quiz.title">`, and one `<h3>` under it. That is the same exception `tools`
gets and for the same reason, that a hands-on task needs a sentence of setting. **The step no longer
ends here.** `Looking back`, two sentences saying step 1 was over and naming step 2, sat under the
board until `recap` arrived, and it went whole: a page that closes on the hunt closes better than one
that steps away from it to summarise, and the forward pointer belongs on the page that looks back.

**`workshop.the-board.1` was deleted rather than moved.** It was a `data-audience="guided"`
paragraph, and guided mode drops every run of prose whatever its attribute says, so it rendered for
nobody: not for a self-learner, who is not its audience, and not in class, where the prose is cut
wholesale. It also recited every technique on the board, which is the thing the board's own hint lines
already do. Anything a teacher needs to say out loud here belongs in the deck.

The unit is a capstone and deliberately the leanest page in the step. It once walked each flag
through its own section, and the board now carries all of that itself: a row's hint line and its
Hint dialog (the `flag.*` keys) hold the per-flag technique, so the prose must not grow a second
telling of any of it. **A hint line is two halves, what the flag is and what to do about it**, and
all five carry both: instrument the run and read it back, raise the log level and hit the endpoint,
find it in the source and run the decode rather than reason it out, leave the service up and read the
Catalogue page from the top, and, for `machine`, that something reaching every session did not come
from this project and that you put your machine back afterwards. That second half is the one that
has to name the cleanup, because a student who never opens the Hint dialog still has to be told to
undo it. Its first half is the only one on the board that names **no place at all**, and that is the
row working as intended: the four others say where to look because the student has to go there, and
this one is the hunt. **The page carries the game and the board carries every technique**, which is
the rule the lead is ordered around: `lead.1` is what is on the board, `lead.2` is how the hunt is
played, and the launcher follows it. The prose ran the other way round for a while, with 85 words of
one flag's technique standing between the endpoint and the point of the step, and that is what the
order now prevents. `flag.system.hint` is the one that has to say what the flag is without
saying what the rule is, so it says the answer is in the nine titles together rather than in any one
of them and stops there; naming the rule is the help dialog's job. `flag.decode.hint` ended on
"point your agent at it" until it was rewritten, which named no work at all, and the half it gained
is the trap the help dialog spends three sentences on: an agent doing character arithmetic in prose
sounds exactly as sure when it is wrong. **The house rules moved to step 0's `welcome`**, where they are the rules
of every board in the course rather than of this one, so `lead.2` links to them in half a sentence
and the unit keeps only the game (two lead paragraphs, the launcher, the rule
over the task card and the two sentences that close the step). Do not
write a rule back onto this page: a rule that is true here and nowhere else is the sign the rule is
wrong rather than misplaced. What went with the move is worth knowing. The old `house-rules.5` was
the course's second pointer at `model.cost.4`, and `hunt.count.label` is what replaced it: the card
sends the student's two `/context` readings to the rates rather than working them out here, so
`cost.4` is still the one place the course multiplies. The intro's version of that rule has since
been cut as well (step 0's own file says why), so `hunt.count.label` is now the only thing anywhere
near a board that points at what a hunt cost. It names no command and does no arithmetic, and it may
not grow either. The old `house-rules.4` carried the five same-shape
lines the trace prints, a measured fact of the backend; **`flag.trace.help` is now the only place
that number appears**, so a change under `kata/step1/java` visits that key alone, in both languages.
The `Stuck?` aside carried two deep hints and went because the Hint dialog is where a
stuck student is meant to look: its second hint was already `flag.trace.help` almost verbatim, and
its first is now folded into `flag.decode.help` as the shape of the impossible condition (a value
folded into a small range, compared against a bound it can never cross), in both languages. So a
board hint is the only place a technique is written down, which is what the paragraph above says.
The debrief went with it: it opened on the board grading in the browser, which
`flags.panel.description` says for itself one element lower, and closed by asking which flag the
student could hand over whole and which needed their judgement. **That question is back, as
`OneWindow`'s fourth move rather than as prose**, which is where it wanted to be: it is a look-back,
so it sits after the work instead of ahead of it. Nothing else from the debrief came with it.

Two more cuts hold the lead to its own job. **`lead.1` stops at what the flags look like**: it closed
on three sentences, one per flag, saying that one sits in unreachable source, one exists only while
the pipeline runs and one prints only at DEBUG, and those are the board's three `flag.*.hint` lines
said again a screen earlier. It is also **one set of five under one provenance rule**, which is
newer: it counted four flags and then announced a fifth, so a reader held two counts before they had
seen the board. The machine flag is named inside the same sentence as the four that come out of the
service, as the one that comes off the student's own machine, and it is not an exception added
afterwards. And **the `<pre>` starts the agent and nothing else.** It ran
`mvn spring-boot:run` and a `curl` at the endpoint, which is the student doing by hand the two things
the first house rule hands over, so a page that opens on the rules of the hunt was demonstrating the
one move the rules forbid. What is left is `cd kata/step1/java` and the launcher, so the working
folder is still named and everything after it is asked for rather than typed; `lead.2` says so in a
clause. It is the step's only assistant-varied block outside `tools`, `session`, `context` and
`model`, and it varies for the ordinary reason: the launcher is a command.

`recap` closes the step, and it is **the one unit allowed to say what another unit already said**.
Everything else in the course points at the page that owns a claim rather than restating it. This one
is **a single list and nothing else**: one bullet per unit ahead of `workshop`, in the order the
student met them, and **every bullet is a cost and the move that answers it**, on one line. The bold
half states what it costs you and carries the link back to the unit that argued it; the half after it
is what to do about it. What keeps the page from being a second course is that line. **A claim
needing a third sentence belongs in the unit it came from**, and nothing here re-argues anything,
which cuts both ways: rewriting a unit's argument means visiting its bullet, in both languages.

**It ran as two lists first, the costs and then the advice, and that is the shape to keep it out
of.** The halves did not line up. Eight units do not have one money-saver each, so the reader was
left pairing a bullet in one list against a bullet in the other by eye, and the two most useful
things on the page sat a screen apart. Merging them is what fixed it, and splitting them again puts
it back.

**Every icon is lifted rather than chosen.** The move half carries the marker the unit itself put on
that advice (the token you never put in, bundling, clearing at your own seam, turning tools off, asking
while the code is still in front of you, keeping a cache warm, the expensive model writing the brief,
the five-hour window, asking for the check), so `welcome`'s legend still means what it says. An icon
here that is not on the paragraph it came from is drift, in one direction or the other. **The session
bullet carries a coin because `session.sessions-where-money.3` carries one**, which is the rule
working rather than the list being evened up. Never choose a marker here.

Four more decisions. **`workshop` is not in the list**, because a capstone is not a claim and the
student has just worked it. **The five-hour bullet is last, Claude-only, and has no Copilot
sibling**, the same shape and the same reasoning as `model`'s section, so its key carries no
`.claude` suffix: there is no pair for a missing translation to fall back to. It sits after the eight
rather than inside them because it is an extra rather than a unit's line, which is also what keeps
the one-bullet-per-unit rule readable when a Copilot reader is shown eight. **There is no figure,
card or quiz**, which leaves
the page **empty in guided mode**, since prose is dropped wholesale there. That is a supported state
rather than an oversight (`StepContent` renders `null` and the article takes no gap): in class the
recap happens out loud off the deck, where the step's last block is a divider and three statements,
the window, the one move all eight bullets are, and step 2. The empty page and that block are one
decision, so a room that loses the block loses the recap altogether. And **`Where this goes` is the step's only forward pointer and
the only place the course says a step has ended**, which came over from `workshop`'s deleted
`Looking back`; the sentence naming step 2 is that paragraph's, near enough, and it is the one thing
from it worth keeping.

## How the five flags are carried

**This file is the readable source for the step 1 puzzle**, and that is a move rather than an
accident. The notes used to sit in `kata/step1/java/CLAUDE.md`, beside the code they describe, which
is where a maintainer would look for them and exactly the wrong place for them to be.
`workshop`'s launcher tells the student to `cd kata/step1/java` and start their agent there, and the
agent loads that file before their first prompt. Design notes in it handed the answers over
unasked. The prohibitions in it ("do not add tracing", "do not solve it for them") forbade the work
the units ask the student to hand over, so the same agent could equally refuse the exercise. Neither
sentence had a correct reader in that file. This one loads only under `front/src/steps/step1/`, so a
student's agent never picks it up on its own.

The repository is not pretending to hide any of this: anything with filesystem access can read
`front/`. Not hiding it is a different thing from handing it over, and a student who sends their
agent rummaging in the curriculum app is spending their own exercise the way reading `flags.ts` would
be. Two rules keep that trade honest and both are absolute. **No flag's plaintext goes in any file in
this repo**, which is what `kata/step1/front/CLAUDE.md` already says for the browser flag, so the five
below are named by their `flags.ts` id and never by their text. `machine` is the one whose plaintext
lives anywhere at all, and where it lives is the student's own instructions file, outside this
repository; in `kata/step1/machine-context.mjs` it is XORed and base64'd, on the browser page's
precedent. And **the board's hashes never go
anywhere under `kata/step1/java/`**: an agent sitting in that project can unveil all 41 stored
strings, and with the hashes beside them it matches three of the five in one pass.

`machine` is the one flag this repository does not carry at all, which is the other half of why the
heading says carried rather than hidden. `kata/step1/machine-context.mjs` writes it into the
student's user-level instructions file (`$CLAUDE_CONFIG_DIR` or `~/.claude/CLAUDE.md`, `$COPILOT_HOME`
or `~/.copilot/copilot-instructions.md`), between two sentinel lines, and `remove` takes it out and
leaves the rest byte-identical. `install.txt` at the repo root is what runs it, at setup time and
through the student's own agent, so the plant happens before the student has met step 1 at all.
Nothing under `kata/step1/java/` knows about it, and nothing should:
that project is the subject of the four rows below and this one is deliberately outside every
project. The safety rules the script keeps, and why the plant sits at install time rather than on the
workshop page, are with the row, under `workshop` above.

`system` is the one flag that is **in no file at all**, on either side. It is the acrostic of the
nine published titles, first character of each, read in
`@Order`: `MarginNotesStage` at 7, `AtlasBindingStage` at 12, `QuillEngravingStage` at 24,
`SecretShelfStage` at 30, `FoliantDustStage` at 33, `HiddenGalleryStage` at 41, `NightBellStage` at
45, `TokenRibbonStage` at 51, `VaultIndexStage` at 54. Two of the nine open on a numeral, which is
ordinary for a book title and is what keeps the list from looking encoded. **So the nine titles'
initials are load bearing: rewriting any published title means re-checking the acrostic**, and the
cheap check is the one the verification uses,
`curl -s localhost:8080/api/titles | jq -r '.[]' | cut -c1 | tr -d '\n'`. What holds it steady is
machinery that was already there for `trace-runtime`: the auxiliaries all publish `(draft)` lines and
`CatalogRun` drops them, so the random draw changes the path through the code and never the response,
and what comes back is exactly the nine publishers in `@Order`. Two things would break it silently.
An auxiliary that published a line without the marker would land in the middle of the acrostic, and
uncommenting one of the eleven commented publishes inserts an entry the same way. Neither is a
concern for a shipped run and both are worth knowing before editing `CatalogRun` or `Catalog`.

`decode-source` is a `Scramble.unveil` call in a branch of `VaultDoorStage` that can never run
(`tally` is folded modulo 9973 and then compared `>= 9973`), so a trace never surfaces it and only
reading the source plus reproducing `unveil` reaches it. That branch carries **no comment, on
purpose**: it used to say "this never runs", which ended the exercise in one grep, and the whole
`services` package has no other line comment besides the eleven commented publishes. `trace-runtime`
is the tenth entry `Catalog` computes on every request and never publishes, because its
`run.publish(...)` call is commented out. It is `ManuscriptTallyStage`'s, at `@Order(21)`, and its
text rewards tracing, which is what makes it the real one among the five candidates. `debug-config`
is emitted by `AtlasBindingStage` at `log.debug`, decoded by a small inline shift rather than
`Scramble.unveil` so it stays out of the unveil stream a trace would catch, and it prints only when
`logging.level.be.smartagents.kata.java.step1=DEBUG` is set. `AtlasBindingStage` is the one
deliberate exception to the rule that the `log.debug("I was here…")` breadcrumbs are inert.

Five things keep `trace-runtime` from falling out of a search, and a new stored string has to respect
all of them. **Nothing is stored in plaintext**: all 41 non-publisher stages restore through
`Scramble.unveil` and look alike doing it, and only the nine publishers hold a literal. **Almost
everything published is thrown away**, since `CatalogRun` drops any line containing `(draft)` and 36
of the 41 restored strings carry it, so publishing is not the tell either. **The commented-out
publish is not unique**: eleven stages have one, uncommenting all eleven surfaces five lines and all
five are flags in the same shape, six of the decoys carry the marker and four deliberately do not.
**Stored lengths sit in one band**, 22 to 25 characters, every one of them shared with a marked
string, so sorting the 41 ciphertexts by length must not separate them. **The always-run set is
padded to twenty**, nine publishers plus those eleven, because a runner that always walked exactly the
ten title-bearing stages would leave the tenth as the answer by elimination. Words a naive search
reaches for (key, secret, hidden, vault, cipher, token, draft) appear in class names across all three
groups, and four of the nine published titles carry one too, so grepping any of them proves nothing. The tests assert the nine known titles as a
*subsequence* and the size as `>= 9` rather than `== 9`, so a student who enables the tenth line does
not land in a red build.

Two things must not be committed into `kata/step1/java/src/`, and both are about the next student
rather than this one. **No tracing seam**: no hook, no callback, no candidate-logging method. A
`Tracer` that logged every restored string at INFO was committed once and removed for exactly this
reason, since with it in place a plain run printed `trace-runtime` for free. And **no explanation of
the dead branch in a comment**. An agent that instruments the pipeline *because a student asked it
to* is performing the exercise rather than breaking it, which is the distinction the root
`CLAUDE.md` now draws in its prohibition block; what these two forbid is leaving the result in the
tree for everybody after them.

`problem.md` is the other thing in that project a student is sent at, and the same split applies. Its
gaps (what identifies a shelf, whether names are unique, how a title is matched, what the limit is,
what a missing shelf answers) are unlisted on purpose and the brief carries **no constraints
section**, because noticing what is missing is the analysis `CutItUp` asks for. Do not add a
constraints list, and do not commit a cut of it, a `solve.md`, a `plan-solve.md` or a shelves
package. A student's own `solve.md` or shelves package turning up in the tree is their work: leave it
alone unless they ask. Nothing in the brief keeps their shelves out of `services/`, so if one lands
in there, that is their build to unpick and the flags above are what they have disturbed.

## The assistant variants

Thirteen blocks in step 1 vary and nearly all of them are the same kind of thing, a filename or a
command: the launcher `<pre>` pair under `workshop`'s lead (`claude` against `copilot`, each after
the same `cd`), which is the only pair left there now that the setup command has moved to
`install.txt`,
the `<pre>` under `tools.connect-one.1` and `tools.connect-one.2`
(`claude mcp add` against `copilot mcp add`, which lands in `~/.copilot/mcp-config.json`),
`tools.what-it-can-call.1` (each product's own built-in tools, under their own names),
`tools.what-mcp-costs-you.1` and `.2`, `session.window-not-memory.1`,
`session.automatic-manual-compaction.3` (when compaction starts, and whether you can move it),
`context.amnesia-context-fatigue.3`
(nested inside the audience wrapper, never both attributes on one element),
`model.api-vs-subscription.2` and `.3`, plus `survive.write.*.label` and `window.open.*.label` on
the task cards. The last of those replaced `context.read-your-window.1`, which was the Claude and
Copilot descriptions of `/context`: the paragraphs went and the variant moved onto the move that
starts the agent. `flag.machine.help.*` is the fourteenth variant set and the only one on a flag
board; it is counted apart because it is not a block of prose in a unit file, and the mechanism it
needed is written up under `workshop`.
`harness.lead.1` names Copilot for **every** reader instead of splitting, because that sentence is a
list of example harnesses and a list is where a second product belongs. **Both languages carry the
list, and the Dutch had dropped Copilot out of it**, which is what an ungated block looks like when
it drifts: nothing filters it, nothing warns, and the second product is simply missing for one
language. So a rewording of either half visits `nl.json`. `harness.which-one-you-run.2`
is the second ungated naming and it is there on the same reasoning: it is a **comparison**, so both
halves have to reach both readers, and gating it would hand each of them one side of a sentence about
a difference. It is also the only ungated block that names `Copilot CLI` in full, which the paragraph
below asks of a variant block and which holds here too, since the built-in server is the CLI's.

Three things in the step are not a filename or a command, so do not read that sentence as saying
everything that varies is a word. The newest is `session.automatic-manual-compaction.3`, a product fact
about when compaction starts, and its reasoning is under `session`; the other two follow. `model`'s window section is the larger one and it is **not one of
the fourteen at all**: it is Claude-only whole, with no Copilot half to pair with, and the reasoning is
under `model`. `tools.what-mcp-costs-you.1` and `.2` are the smaller, they are two of the thirteen, and
each is a **product fact**. Copilot CLI holds the GitHub MCP server with no configuration,
so that reader is already paying for MCP tool descriptions when the section claims a tool costs you
by existing, and a Claude half that counted from the servers you connect would have them counting
from zero. `what-mcp-costs-you.1` above it was made assistant-neutral in that change ("every tool"
rather than "every tool you connect"), and `ReadYourWindow`'s readings need no variant either way:
its second and last moves compare a window with and without the server the student added
themselves, whatever the harness starts them with. **That product fact is now spent twice, and what
keeps the two from being one duplicate is the argument each makes of it.** `tools` owns the cost
(the coin, "you pay for them whether or not the agent touches one") and is gated to the reader it is
true of; `harness.which-one-you-run.2` owns the difference, namely that two harnesses do not start
you in the same place, and reaches everybody because a comparison has two halves. So a coin or a
"you pay" line must not follow the fact into `harness`, which is also what keeps that section clear
of the billing line `model` took off it, and `tools` must not grow the comparison.

**`what-mcp-costs-you.1` was split later for the second product fact, Claude Code's MCP tool
search.** It is on by default: only tool names and each server's instructions load at the start,
and a tool's full definition is fetched when the model needs it
(code.claude.com/docs/en/mcp#scale-with-mcp-tool-search, read October 2026). Everything loads up
front again with `alwaysLoad: true` on a server, with `ENABLE_TOOL_SEARCH=false`, or when
`ANTHROPIC_BASE_URL` points at a host that is not Anthropic's. So `.1.claude` says the names go in
and the descriptions follow on demand, `.1.copilot` keeps the old "all of that goes into the window"
sentence, and `.2.claude` prices what is left: every connected server's names and instructions on
every turn, a fraction of the full descriptions, until `alwaysLoad` or tool search being off puts
them all back. The prose names `alwaysLoad` and folds the other two into "tool search is off", and
the HTML comment names all three. Tool search is Claude Code's, so the Copilot halves did not move.
`.3` is shared and still stands for both: for a Claude Code reader the section's weight now falls on
choice noise and the risk of picking the wrong tool, with the per-turn cost of the names behind it.
`harness.caching.2` lost its MCP example for the same reason (a server connected mid-session now adds
names rather than definitions) and states the rule instead: whatever changes early in the window,
the tool list or the instructions at the top, makes everything behind it new. And
`recap.what-costs-do.3` ("a tool costs you by existing, called or not") is left as written, since
names and instructions still cost on every turn.

**Where a variant block names the product, `tools` and `window.open.copilot.label` say `Copilot CLI`
rather than `Copilot`**, because the CLI is the surface the course assumes and a command, a config
path or a `/context` readout is untrue of the editor. Two places stay on the bare name and both are right to:
`model.api-vs-subscription` is about a seat rather than about a client, and `harness.lead.1` says
"Copilot in your terminal", which names the surface in words.

**What is deliberately shared is the more useful half of this, so do not "fix" it later.**
`/clear` and `/context` are the same command in both, so
`session.automatic-manual-compaction.2` and every move of `ReadYourWindow` after the first carry no
variant: the readings run verbatim either way, and Copilot CLI's readout (system prompt, custom
instructions, system tools, MCP tools, messages, free space, buffer) is this step's four layers
under other names, so a student on either product reads the same shape off the screen. The paragraph
that used to list those seven groups is gone with the rest of the section's prose. Plan mode exists in both, so `prompt`'s plan-mode section
and `CutItUp` are untouched. Compaction is automatic in both, so
`session`'s compaction argument holds for both; only when it starts differs (at the context limit
in Claude Code, from about 80% in Copilot CLI), and that is `automatic-manual-compaction.3`'s pair plus
the one string `WindowFill` swaps, not a reason to split anything else. And `ModelTiers`, `ModelPricing` and
`PickTheTier` stay exactly as they are: the tiers are taught as dispositions, Copilot's own picker
offers Claude models among others, and the table is evidence for the one-two-four ratio rather
than a price list. What a Copilot reader needs instead is in `model.api-vs-subscription.3`, and it
**names no numbers and carries no currency**, for the same reason the rest of that section does not:
the one table in the course with a currency is a few inches up the page, and a second set of figures
turns both into the price list `model.cost.3` tells the student not to learn.
