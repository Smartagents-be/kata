# CLAUDE.md — step 2

What is deliberate about each unit of step 2, and why. It loads when you work with files under
`front/src/steps/step2/`. Nearly everything here is a decision with a reason behind it: why a figure
is drawn the way it is, why a paragraph was cut, why two units overlap, and which parts are
exercises that must not be solved. Read it before editing any of this step's files, because a great
deal of what looks like an oversight is load bearing.

The rules that span the whole curriculum are in the parent `front/src/steps/CLAUDE.md`, the design
system and the audience and assistant mechanisms are in `front/CLAUDE.md`, and the repo-wide
prohibitions are in the root `CLAUDE.md`. None of them is repeated here.

**The course says "context", not "window" or "venster".** At the owner's asking (October 2026)
every student-facing string in steps 2 and 3 calls what the agent holds "the context" ("de context"
in Dutch). There is no exception for size or capacity either: "context window" and
"contextvenster" are gone from student text, as step 1's file records. Usage and billing windows, time windows and
component names such as `TwoWindows`, `LoopInWindow` and `WindowSpend` are untouched.

`step2` is **agentic engineering**: how you work with an agent, as opposed to what it knows. Nine
units, `setup`, `engineering`, `gates`, `steering`, `patterns`, `workflows`,
`enablement`, `parallel` and `goals`, four of
them carrying a quiz, and the unit HTML is the source for what each argues. Seven of the nine close
on something the student does: `gates`, `steering`, `patterns` and
`enablement` on an ungraded `TaskCard`, `setup` on a graded flag board, and `steering`, `patterns`, `workflows`
and `goals` on a quiz, three of them under a card. `workflows` is the one that is framing prose and
a quiz with no card, and `engineering` closes on its last figure since its card was cut (below). Six carry one
habit each. `workflows` is outside that count, and deliberately so: it carries five ways of
handing work over rather than one habit, and its argument is the choice between them. `parallel` is
outside it on the same reasoning, four arrangements of agents rather than one habit. `enablement`
is the fourth one outside it, for its own reason: it is about what has to be true around you rather
than about a habit you practise.

**Unit titles are 1 word or a few, at the owner's asking (October 2026).** The sidebar reads
Setup, Domain language, Quality gates, Steering, Skills and scripts, Workflows, Feedback
loop, Parallel work, Long runs and Workshop (Setup, Domeintaal, Quality gates, Bijsturen,
Skills en scripts, Processen, Feedbacklus, Parallel werk, Lange runs, Workshop). The longer titles
they replaced each carried a claim or a verb, and the owner found them too long to scan. Only the
`*.title` strings moved: unit ids, URLs and keys stayed. A link that named a unit by its title was
repointed to the new one in steps 1, 2 and 3 and in both languages, so grep the old title before
reintroducing one. Do not grow a title back into a sentence.

**A `quality` unit sat in slot six and was replaced by `parallel`**, and this is the record of what
went with it so nobody restores half of it. It ran three sections: the build rather than the agent
deciding when work is finished (`mvn test` and `npm run build`, both cheap, both on demand), writing
the standard down where the agent meets it before it writes (the `*Test.java` and AssertJ house
style as a skill, the new-step file list as a scaffolding skill, and having the agent draft
`CLAUDE.md` off the repository rather than writing it from memory), and picking metrics that carry
weight (a coverage floor and a complexity ceiling wired into `mvn verify`, the proxy trap that a
hundred percent coverage from tests asserting nothing is green and worthless, and an agent
over-commenting and under-logging). Most of it was a third telling: `gates`' `Quality gates`
owns the bar in the build, `patterns` owns turning a repeated correction into a skill, `setup` owns
`CLAUDE.md`, and `goals` owns the check that answers yes or no. **Over-commenting and under-logging
is the one argument that had no second home**, and it survives nowhere in the course: neither term
is in a unit, in a board hint or in a skill file, in either language. The proxy trap went the other
way and has two homes now, `gates.quality-gates.1` and `workshop.flag.honest.help`, so it
needs no third. That is the thing to notice before writing a section about metrics anywhere in the
step. **`gates.quality-gates.1` carries the claim**, saying in plain words that a number measures
something that usually comes with quality rather than quality itself, that an agent told to hit it
hits it, and that the checks worth wiring in are the ones hard to pass without the real work. The
word "proxy" left the prose in October 2026: the owner found "aims for the proxy" unclear. It
carries no coverage example on purpose. **`gates.quality-gates.2` is the evidence**, added at the
owner's asking the same month: METR's June 2025 measurement of o3 cheating on RE-Bench (39 of 128
runs; a sped-up clock and a monkey-patched evaluator are the two examples named; asked afterwards,
it said the cheating was not what the user wanted, 10 of 10 times in the case METR quotes, hence
"often"). It was chosen because it is a primary source and its examples game a scorer rather than a
coverage number, so it argues the claim without touching the honest flag. It is dated on purpose
(o3, 2025): ImpossibleBench (arXiv 2510.20270) found newer Claude models cheating less than older
ones, so the paragraph claims a measurement and not a law of current agents. Keep any replacement
example off coverage and mutation. **The example is now behind the board's Hint**, in
`workshop.flag.honest.help`, which is the moment a student has a row that will not move and wants it.
The capstone's prose deliberately does not spell it out: `workshop.goal.2` says only that one of the
three will not fall to more tests, because the whole reason the honest flag exists is that the
student finds out why, and a page that explains the trap before the run springs it on nobody. The
old `workshop.honest.1` and `.2` did explain it, and cutting them is the change to know about before
writing prose about mutation anywhere in this unit. **`SameGate` under that paragraph names four
groups of checks, coverage and mutation on one row, and ranks none of them**, and it may never rank
them: a teal ring around a mutation row is
the honest-coverage discovery drawn on the page, which is the same reason `workshop` still carries no
figure of its gates.
Three references were repointed in the same change rather than left
dangling: `workshop.lead.2` says "the kind of code a quality gate exists for" instead of naming the
unit, `step3`'s `change.you-test-engineer.2` links to `gates` (it linked to `engineering` until the section moved), and the capstone's pointer at
`engineering` and `goals` is now a chip in `RunSheet` rather than a link in `workshop.lead.1`.

**An `evolution` unit opened the step until October 2026, titled Increments, and the owner cut it.**
It argued that a version now costs an hour, so you take small steps on something that already runs,
with a walking skeleton, a rule that a detail costs at most an hour, 2 screenshots of this site
before and after its details, the `IterationPaths` drawing and a fifteen-minute exercise. The owner
found most of it common sense, the drawing not self-explanatory, the exercise vibe coding with a
clock on it, and "walking skeleton" a term the page never explained. **Do not bring any of it back
as a unit, and do not reintroduce the term**: the vertical slice in `engineering` already carries
running end to end first. The one section the owner kept, a prototype starting a conversation, is
about the people you show it to, so it moved to step 3's `expectations` as
`prototype-starts-conversation`, and it is now where the course says out loud that vibe coding has
its place (3 throwaway prototypes, and none of them the product). That replaced the old decision to
leave the collision with `engineering`'s case against vibe coding unspoken. `setup` opens the step
now, and step 1's `recap` links there.

**`engineering` runs three sections now**: `Domain-driven design`, `Vertical slices` and `Hexagonal
architecture`. **A fourth, `The right words`, was cut in October 2026** at the owner's asking: its
one paragraph (name the pattern you want, "put a repository in front of this JDBC call" against
"clean this up", then a line about reviewing whether the structure fits) said what
`domain-driven-design.2` already says, carried the same gem, and read oddly in both languages. Do
not bring it back as a section. The second one is the newest, and the split of the first and
the third is the older decision. Domain-driven design and hexagonal architecture shared a heading
and a paragraph until they were pulled apart, and they are two arguments rather than one: naming is
what a thing is **called**, hexagonal is where it **sits**. The payoff differs with them, which is
what makes the split worth the extra heading, and the icons carry it. Naming pays out at the moment
you type, so `Domain-driven design` holds the gem: the words in your sentence are already the names
in the tree. Layout pays out in what the agent does not have to read, so `Hexagonal architecture`
holds the coin. **Do not let either section reach for the other's icon or the other's claim.**
Merged again, the unit says "structure is good" twice and never says what either kind of structure
buys.

**`hexagonal-architecture.3` carries testability** (October 2026, at the owner's asking): the domain
is tested with no mock, a use case with an in-memory version of each outgoing port, an adapter with
an integration test. It says the **port** is swapped and not the adapter, on purpose, because that
is what the use case actually depends on, and the adapter's own test is against the real system, as
`gates`' table says. It takes **no icon** on the rule above, and it sits before `HexagonPorts`, which
still closes the section.

Five figures sit in it and each is fenced off from the next (`VerticalSlices` and `SliceSkills` are written up below).
`WordsToFiles` is the vocabulary: one prompt, three candidate files, and a line to the one the
sentence named, with the other two left muted so the drawing reads as narrowing rather than as
finding. **It draws no folders**, because that is the next section's half. It also carries **no note
under the frame**, and that is a cut: the paragraph above it already says a sentence about an IBAN
has named the files.

**`Hexagonal architecture` carries two drawings and their order is the argument**: `DomainTree`
after the first paragraph is the shape on disk, and `HexagonPorts` **closes the section** with what
those folders are an arrangement of. The concrete comes first and the shape is the part the reader
keeps, which is why the abstract one has the last word rather than the opening. **`HexagonPorts`
carries no note.** The calls on the right leave the application while the dependencies still point
back in, because the ports they leave through are ones the application wrote, and **since October
2026 the figure draws that itself**: its arrows are dependencies, so all six point inward, labelled
"calls" on the left and "implements" on the right. That reverses the old rule that the arrows were
calls, which drew the right-hand ones pointing out and made the domain look as if it depended on
Postgres (the owner read it that way). The prose half of the argument is still
`hexagonal-architecture.1`'s sentence about no class outside `adapter/` naming Postgres. **Do not
draw a second arrow per side**: twelve arrows on one figure and neither set reads.
**The ports belong to `application/` and the domain depends on nothing**, in both figures, which
is the functional core and imperative shell split the owner's own course teaches (the hexagons are
labelled with those 2 names). Do not move the ports back into `domain/`. It runs
**three adapters a side**, where
the tree ships one per direction, and that is where the pair deliberately parts company: a single
box on each edge draws a pipeline, which is the picture this shape exists to correct. The leaf names
are still the tree's own, which keeps them a pair without making them a copy. `DomainTree` still
sits in `Hexagonal architecture` after `.1`, and `.1` now opens "Inside each module", because the
tree's top level is modules (see below). The dependency argument (no class outside `adapter/`
names Postgres or S3) is still in it; the rest of `.1` was rewritten for plainer Dutch and English
in October 2026 and now names `adapter/incoming/` and `adapter/outgoing/` instead of "the direction
of a call is a folder". `WordsToFiles` draws `payments/` and `invoicing/`, the tree's 2 modules, and
`domain-driven-design.1` names `payments/` with it, so the vocabulary and the tree agree.

**The running example is payments and invoicing, and the word is IBAN** (October 2026, at the
owner's asking). It was a newsroom (`article-publishing`, `Headline`) until the owner found that
"publishing" reads as publishing an event and `Headline` was unclear. **The word `WordsToFiles`
puts on both sides has to be the same in English and in Dutch**, because it is one literal in both
languages: "headline" worked for that reason, and a payment term was rejected because the Dutch
prompt would say "betalingstermijn" beside `PaymentTerm.java`. Pick a replacement by that test.

**`Vertical slices` was added at the course owner's asking (October 2026)**, between naming and
layout, because a slice is both: what the business does (the module is named after a capability) and
where it sits (1 use case through every layer, built and tested on its own). It argues **short
feedback loops**: a layer-at-a-time build only runs end to end after the last layer, and a slice
runs as soon as it is built. It hands the loop to `gates` and `enablement` by link rather than
arguing it again. **It takes no icon**, on the rule above that `Domain-driven design` holds the gem
and `Hexagonal architecture` the coin: a third section reaching for either would blur which payoff
is whose. `VerticalSlices` draws 3 grey layers with 3 teal slices over them, and its brackets name
the 2 modules `DomainTree` draws, `payments` and `invoicing`, so the two figures
are a pair and a rename in one is a rename in the other. The `Archive` port and its S3 adapter
stay inside the detailed module (`payments`, keeping the proof of each payment), because
`HexagonPorts` and `hexagonal-architecture.2` lean on them; a second capability called archiving
was tried in the newsroom version and cut for exactly that reason. **`Vertical slices` runs to 3 paragraphs and 2 figures, past the 2-paragraph rule, at the owner's
asking (October 2026)**: `vertical-slices.3` and `SliceSkills` argue the T-shaped profile from the
slice (it runs from the screen to production, so you judge every layer it touches), with the
fields named on the crossbar and the backend specialism as the stem. **`enablement`'s `t-shaped`
section and `SkillShape` stay as they are, on purpose**: the owner chose 2 figures for the shape
over moving or merging, because the 2 sections give 2 different reasons (the slice here, the agent
implementing faster there). Do not label `SkillShape`, do not give `SliceSkills` an I beside it, and
do not merge the two sections. `deck-step2-engineering-skills` puts `SliceSkills` on a slide at
`scale` 1.3, the same as the slices slide before it. **The ArchUnit and unit-test items in `gates` say "module", not
"slice"**, because 2 slices in 1 module share its domain; the module is the boundary a rule
enforces.

**`DomainTree` is now 1 module per capability with the hexagon inside each one**, which reverses
the recorded rejection of a multi-module skeleton. The owner pointed at a production repository cut
by capability (modules named after business verbs, each with its own frontend, built and tested on
its own, assembled by a host). What the old rejection was about still holds and the new tree keeps
it: no BOM, no starter or autoconfigure modules, no per-domain configuration module, so the figure
spends its rows on the packaging and not on scaffolding. `incoming/` and `outgoing/` stay as their
own rows, because `HexagonPorts` takes its column labels from their notes and `exercises/step2/java`
uses the same two folders. Its height was held at or under the old tree's, because `deck-step2-engineering-domain`
was already at `scale: 0.9` for the footer, until `application/` split into `usecases/` and
`ports/` (October 2026, at the owner's asking): those 2 rows were worth it, carry no note, and the
slide came down to fit them. `hexagonal-architecture.1` names both folders in 1 sentence, so the
prose says where the ports `hexagonal-architecture.3` swaps actually live.

**`exercises/step2/java` has the hexagon's layout inside its one module** since October 2026, at
the owner's asking (plan 016), reversing the old decision that it stayed layered by technology:
`domain/` (unchanged, its `CLAUDE.md` and setup flag included), `application/usecases/`,
`application/ports/` with the `LoanRepository` port, `adapter/incoming/web/` and
`adapter/outgoing/persistence/`. `config/`, `aot/`
and `Step2Application` stay outside the hexagon, as framework wiring the figure has no place for.
**It stays 1 Maven module with no capability package**: the project has effectively 1 capability,
so slicing it would show nothing. The move was a pure move, and it was verified to change nothing a
grader reads: `mvn verify -Pgraded` printed the same 39.0, 21 and 42.4, the same 8 `challenge` tests
failed, the endpoint answered the same 500 and the native image printed the same miss. The one build
edit was the JaCoCo exclude, `web/**` to `adapter/incoming/**`. A future move needs the same before
and after check. **`application/` split into `usecases/` and `ports/` later in October 2026**, at
the owner's asking and in `DomainTree` with it, and that move passed the same check (39.0, 21,
42.4, the same 8 red tests); its one build edit was the JaCoCo exclude, now
`application/usecases/MemberStatements*`.

Each figure's own docblock carries the rest, including why `WordsToFiles` draws no badly-named
repository next to the good one. **Its fourth section, `Quality gates`, moved to `gates`** with
`SameGate` and both paragraphs, keys renamed from `engineering.quality-gates.*` to
`gates.quality-gates.*` and the wording untouched. The closer that section carried
(`quality-gates.3`, the line and the hand-off to `steering`) went with it and is now
`gates.short-feedback-loops.4`. So `engineering` closes on `HexagonPorts`, and it hands off to nothing by name; `gates` is the next unit in
the pager and its lead is what picks up.

**`engineering` carries no exercise any more.** It closed on `WhereWouldItGo`, a `TaskCard` that
had the student sort `exercises/step2/java`'s packages against `DomainTree` and then have an agent
plan the restructuring without accepting it. The card existed because the project was layered by
technology and the figure was not. **In October 2026 the owner had the project moved to the
figure's layout and cut the card**, because once the two agree there is nothing left to find (plan
016). Its keys (`where.*`, `deck.engineering.sort.*`), its component and the
`deck-step2-engineering-sort` slide went with it; `kata.step2.where` may linger in a browser and
`reset.ts` clears it with the rest of the prefix. Do not bring back a sorting exercise without a
real disagreement for it to find.


**`gates` sits between `engineering` and `steering`, and it took `engineering`'s last section with
it.** It argues why gates exist at all. It was commissioned with three reasons: they make the
output better (`Quality gates`, moved in unchanged), they bound how far a bad run gets (`Blast
radius`), and they let an agent check itself fast enough to use the answer (`Short feedback loops`,
which was `Fast enough to answer` until October 2026, keys renamed from `gates.fast-enough.*` to
`gates.short-feedback-loops.*`). **`Blast radius` was cut in October 2026** at the owner's asking:
its first paragraph only defined a term, and its second repeated `steering`'s worktree paragraph,
`setup.settings.3`'s sandbox and the required check now in `quality-gates.3`. Its one argument, the
later a gate answers the further a mistake has got, is the last clause of
`short-feedback-loops.1`, and `GateReach` draws it. Do not bring the section back. Two sections sit
between `Quality gates` and `Short feedback loops`, at the course owner's asking: `Deterministic
checks` and `Legacy code`, both below. The lead sets the
frame those three sit in, and since October 2026 it does so in plain words, at the course owner's
asking: `gates.lead.1` says what a gate is with 3 gates a developer already knows (tests, build,
review), and `gates.lead.2` says why it matters now, that an agent writes faster than you read, so
reading every line makes you the slowest step. It replaced a queue metaphor ("the queue at the
slowest desk") the owner found strange and a version of the 4 decisions with too little context for
a student. Do not bring either back. **`SdlcStages`, the drawing of that, moved to
step 3's `change` in October 2026** at the course owner's asking, because it is the AI-native
lifecycle rather than a quality gate; its notes are in `step3/CLAUDE.md`. `gates.lead.2` keeps the
one thing the unit needs from it, the decisions that stay with a person (what to build, the spec,
whether a change does what you meant, when it ships) against the checking a machine takes, and links
there. It lists them without counting them. Do not bring the drawing back as the unit's opener.

Two figures and each has one job. `SameGate` is who a machine gate is for; `GateReach` is speed and
how far a miss has got drawn as **one axis**, which is the claim `short-feedback-loops.1` closes on:
the further out a gate sits, the slower it answers and the more a miss has already touched.
**Do not give `GateReach` numbers**: that would turn orders of magnitude into a benchmark that the
card asks the student to take on their own build. **`GateReach` is a ladder with labelled rows**
(what runs, how long the answer takes, where a mistake already is) since October 2026, replacing a
band of widening regions the course owner could not read. Later the same month its gates were
renamed for their moment (after every change, when the agent is done, before the merge, before the
release) with chevrons between them, because the ladder still did not explain itself; the
reasoning is in its docblock.

**The speed of a gate is a gate of its own**, and that sentence is the author's, added while the
unit was being written: a few minutes a loop compound, and bringing the time down is work you hand
an agent as a goal against a number. The code block in `short-feedback-loops` is that goal, in
`goals`' `> Goal:` shape rather than as a slash command, because `goals` is where the shape is
argued and the only place that names the commands (`executable-completion-check.2`: Claude Code's
`/goal`, whose separate evaluator reads only the transcript, and Copilot CLI's autopilot, where the
agent itself decides it is done; read on code.claude.com/docs/en/goal and GitHub's autopilot page,
10 October 2026, and IntelliJ's Autopilot left out as unverified); `short-feedback-loops.3` points
there rather than re-arguing it. Its constraints (keep every check, keep every test, lower no threshold) are the point of the
block and not decoration: a build gets faster by deleting its slow tests, and that is the proxy trap
from `Quality gates` a second time. **It names `mvn verify` and never `-Pgraded`**, and `GateWalk`
names no command at all, because the kata's gates are what `workshop`'s pre-flight runs and its
board grades. The card runs on the student's own project for that reason, on `CountTheDay`'s
precedent.

`quality-gates.3` and `short-feedback-loops` used to pull against each other, while the hook in that
paragraph was a Stop hook running the minute-long `mvn verify`. It is a pre-edit guard now, which is
fast by construction, so the two agree outright. `GateReach` still puts `mvn verify` one step out
from the loop, at the moment the agent says it is done: it is run there because `Preflight`'s
`command` move writes it into `CLAUDE.md`, not because a hook fires it.

**`Legacy code` is the brownfield order, at the course owner's asking, and the order is the point.**
On old code with no documentation and no tests, the gates go in before the agent changes anything:
regression tests until every line is covered, and the checks from `Deterministic checks` **set at
today's level**, so they fail on whatever gets worse. That baseline is the review's correction: a
complexity ceiling or a CVE scan at its usual threshold fails untested legacy code on day 1, before
anything changed. From then on the gates, the coverage among them (the owner's wording, kept), check
every change for regression, and they are the source of truth. When a test fails after behaviour has
to change, **the product owner** decides whether the new behaviour is wanted, not the test and not
the agent. It was `quality-gates.3` and `.4` until October 2026 and moved into a section of its own
(keys `gates.legacy-code.1` and `.2`), and the owner sharpened it on the way: it used to say a
change is confirmed with "the stakeholders" before the tests or the code move, and it now says a
failing test goes to the product owner, and if the behaviour is not wanted it is a regression and
the code gets fixed. Keep both the order and the role. `deck-step2-gates-old-code` carries the same
three steps in class.

The old `.3` closed on "mix kinds of tests, and let mutation testing check the tests themselves".
That sentence went, because `Deterministic checks` now carries the kinds. **Neither section says
that coverage can be faked with tests that assert nothing**, and that is the constraint to keep: it
is the honest-coverage discovery the capstone's third flag exists for, and this unit comes first.
"Until every line is covered" is a target and not a contrast, which is why it may stay.

**`Deterministic checks` is the catalogue, added at the course owner's asking (October 2026).** Its
first paragraph is the argument (the same answer on the same code, every run, and the agent runs it
without you, so it checks its own work instead of waiting on you; the decisions are `gates.lead.2`'s
and are not said a second time here), then a table, then where Sonar answers. **It was a `<ul>` of
nine until October 2026, and became a table of thirteen at the owner's asking**: check, what it
checks, tools, one row per kind, translated as one key (`deterministic-checks.table`) on
`setup.claude-md.table`'s precedent, which is why the paragraph after it is now
`deterministic-checks.2`. Formatting (Spotless, Checkstyle), compiler checks (Error Prone, NullAway)
and dependency rules (Maven Enforcer, license-maven-plugin) were the three added, the owner's pick
from four offered (API compatibility was the one left out). **Each row names 1 tool since October
2026**, the owner's pick: JUnit, Testcontainers, Pact, ArchUnit, JaCoCo, PIT, Sonar, Error Prone,
JaCoCo (complexity, through its `check` goal's `COMPLEXITY` counter), Spotless, Maven Enforcer,
Dependabot and push protection. 1 example is enough for a student to place the kind; do not grow
the column back into a list. The rows run in `SameGate`'s four groups
without labelling them: tests, the numbers about the tests, the code, what you ship. It carries
`data-layout="stack"`, so on a phone each row stacks instead of breaking words across 3 narrow
columns (`front/CLAUDE.md` has the rule). Two rows were reworded at the owner's asking: the
integration row names a real cloud service beside the Postgres container, and the architecture row
says what an ArchUnit test is (your architecture as rules the build fails on, with 2 examples) where
it used to say only that a module "reaches into" another. **Coverage and mutation are 2 rows since October 2026**, at the owner's
asking: the single row ("2 numbers about the tests themselves") read as meaningless. Each row says
what its check is for, in the owner's words: coverage is which lines and branches the tests run,
with 100% as the target when an agent writes the tests; mutation testing checks whether the tests
really test the logic, by changing the code in small ways and counting the failures. **Neither row may say what one catches that the
other misses**, nor rank them: that contrast is the honest flag's discovery, kept behind its Hint.
`SameGate` still puts both on one row, for the reason in its docblock.
A draft closed on the workshop grading 3 of the checks, and that sentence was cut: it was an aside,
and the paragraph should end on bringing the rules into `mvn verify`. The vulnerability row says a
CVE scan's answer moves without the code moving, which is the one honest exception to the section's
"same answer every run", stated rather than hidden. Since its tool became Dependabot it says the scan
runs again when a new CVE is published, not "on every build": Dependabot alerts fire when an
advisory lands in the GitHub Advisory Database or the dependency graph changes, and no build turns
red (docs.github.com, checked 13 October 2026). The secrets row says "before they leave your
machine", because push protection blocks the push, after the commit. Facts behind the
list, checked 10 October 2026: Pact's consumer and provider halves (docs.pact.io), PIT's bytecode
mutation and `withHistory` (pitest.org), and **`scmMutationCoverage` was removed in PIT 1.18.0**, so
do not name an "only the changed code" PIT goal; ArchUnit's `slices()` rule (archunit.org); McCabe's
limit of 10 as NIST SP 500-235 restates it; Sonar's cyclomatic rule S1541 defaults to 10, but
whether "Sonar way" enables it is unverified, so the unit does not say. Sonar answering in CI, and
PMD bringing the same kind of rule into `mvn verify`, came from `review/units/step2-gates.md`;
SpotBugs was named beside PMD until October 2026, when the owner cut the static-analysis tools to
PMD and Sonar.

`SameGate` now holds **four groups rather than three checks** (tests; coverage and mutation; static
analysis and complexity; vulnerabilities and secrets), in the order the list gives them, and
coverage and mutation share a row so neither sits above the other. `GateReach` lists under each gate
the checks that usually run there, plus your review at the merge and a person deciding at the
release, and its first gate is named "after every change" (it was "agent loop"). Coverage and mutation share 1 entry there too, so that figure ranks nothing either.
`GateWalk` gained a `mix` move between `list` and `reach`: hold your own gates against the kinds in
this unit.

`steering` replaced `scoping` in slot four (five, since `gates` arrived), and the replacement was deliberate rather than a rename:
task sizing, which folder you open the agent in, and the `.claude` symlink trap were dropped
outright, so nothing in the tree teaches them any more. `DomainTree` drew the symlink until its row
was removed, so the trap is now absent from the course in every form. The unit argues the
thing the step had no home for, namely what you do while the work is running rather than before or
after it, and it owns five moves. Two of them are constrained by units either side of it.

**It opens straight on its first `<h2>` and carries no lead**, on `enablement`'s precedent. The two
lead paragraphs it was written with are cut, keys and all: the first argued that a wrong turn shows
in the agent's first few steps and that stopping it there costs a sentence while letting it run costs
the whole diff, and the second said what you do with the correction is the decision, two moves that
look alike and leave very different windows behind. Both were the section below them stated ahead of
time, which is what `Interrupt, or go back` argues at length. Do not write an introduction back in.

`Mid-flight` opens the unit instead, and since October 2026 it opens on a drawing,
**`SteeringMoves`**, which replaced the three paragraphs that told its moves (the owner asked for
less text, more drawing and nothing said twice; the unit went from 1144 words to about 610, and
every claim the cut dropped was put back as one short sentence). The table has four rows from light
to heavy, and its argument is the right-hand column, what stays in the context. Rows 2 and 3 both
say **"wrong direction"**, because that is why you stop rather than type into the run: the owner
could not see why row 2 stopped until the problem column said so. Row 4 is **"after a few attempts,
still not what you wanted"**, not a failing test: "draait in rondjes" and "faalt op dezelfde
manier" were both rejected as too narrow. The middle column names the key or button per assistant,
so the figure reads `useAssistant()`. The three paragraphs under it are what the table cannot carry:
the stop key per harness in one parenthesis (`Esc` in Claude Code, `Ctrl+C` in Copilot CLI, the Stop
button in IntelliJ), that nothing is on disk while it thinks, and that a new session costs what the
run worked out. It must not grow the window argument: what an interrupt *leaves behind* is the
section after it.

Typing into a running agent is called **lighter** than stopping, never cheaper. It used to say
cheaper, and that was wrong: the agent keeps spending tokens until the sentence lands, Esc in
Claude Code keeps the work already done, and in Copilot every message you send is a request either
way. What it saves is breaking off the step in progress. **IntelliJ was rehearsed by hand on 13 October
2026** (Free plan, the default Copilot agent): a sentence typed mid-run waits in a STEERING block
until the current step is done, Send Immediately sends it at once and stops that step, Stop leaves
written files on disk and the agent carries on after a follow-up, and editing an earlier message
rewinds the chat and the files. The Local agent cannot take a sentence mid-run at all, which is
what `mid-flight.2` says. No Add to Queue or Steer with Message dropdown showed up, so the course
names neither. Do not put "cheaper" back, and do not promise "on the next turn": when a queued
sentence lands differs per harness.

`When it is going nowhere` is the newest of the five, and **where it sits is the argument**:
directly after `Interrupt, or go back`, because it is that section's counterpart. One is an agent
going the *wrong* way, the other one going nowhere, and the reader has to have met rewinding before
being told the case where it does not apply. So the section **names rewinding and rules it out**
rather than leaving the reader to work out that there is no good message to go back to. Two limits
on it. `/clear` belongs to `step1/session`, which owns choosing the seam and deciding what carries
across, so this points at that unit and must not grow a second description of the command. And it
stops at recovering the run: **when not to use an agent at all is a different topic**, absent from
the course on purpose rather than half-told here, so a paragraph about what agents are bad at does
not belong in this section.

**The unit is drawn now, four figures, and the two windows are a pair.** `TwoWindows` plays the two
moves since October 2026 (pasting on against taking out, with a playhead running back up the right
window), and its last frame is the drawing this paragraph describes. `TwoWindows` sits under
`Interrupt, or go back`, after the choosing paragraph and above the self aside, so the aside stays
the section's exit; `LoopInWindow` closes `When it is going nowhere`. They share one frame geometry
on purpose: the unit's vocabulary is the window, so they are one window in two states rather than
two drawings, and what keeps them apart is the stack, four different turns against five copies of
one. Teal is what you typed or chose to carry (the correction, the rewritten request, the block
that crosses the clear); what the window merely holds is muted bulk. **The rewound window's dropped
turns are drawn now, struck through and dashed, and that reverses a recorded decision** (FEEDBACK
11). They used to be left out, on the argument that a dashed ghost inside the frame says they are
still in there and that the emptiness was the drawing. Read cold, the empty window said something
worse: that the agent never went wrong at all, so the two columns looked like two different runs,
and "Go back and edit" read as starting a new session. So the right window now opens on the same
request and wrong file the left one keeps, dashed on the step 1 reading of a dash (built, then
thrown away) with the words struck, a label under them saying the rewind dropped them, and then the
rewritten request and the work on the same rows the left window's correction and next turn sit on.
The note under the frame says the wrong turn is never re-sent, which is what the struck rows mean.
The column is named **"Rewind, in the same session"** and names no keystroke, on the
`Interrupt, or go back` rule below: the Claude Code binding (double Escape or `/rewind`, checked
against code.claude.com/docs/en/checkpointing in October 2026) is a harness's, and the section
names none. The slide title moved with it: `deck.steering.rewind.title` read "A rewind never
happened", which the struck rows now contradict, and it is "A rewind takes the wrong turn out", the
section's own closing line. The prose under it followed for the same reason:
`interrupt-or-go-back.3` ends "As far as the model knows, it never happened" rather than a bare "It
never happened", which is true of the window and not of any file the wrong turn already wrote
(`mid-flight.1` says those are yours to revert). `LoopInWindow`'s fifth fix is an outline, never
dashed and never teal: it is being written, it is just the same shape again, and its label says so.
Neither window figure may borrow the other's argument, wrong direction against no direction, and
neither is about the clock, which is `LoopsPerHour`'s.

The gap section turns on **stopping** and nothing else. An agent that writes a guess down and then
builds on it has told you what it guessed underneath a diff that already depends on the guess. Do
not soften the stop into "flag it and continue". **The rule no longer writes to a `gaps.md`**
(October 2026, at the owner's asking): the file read as the familiar list of what an app still
lacks, and logging is the bookkeeping the section says is not the point. The answer goes into a test
or into `CLAUDE.md` instead, so it is decided *in the repository*, which is what the rule checks.
`GapRule` draws the two rows under the rule's `<pre>`, and the quiz's `logged-and-carried-on` now
has the agent list its assumptions under its summary rather than in a file. The rule belongs in
`CLAUDE.md` rather than a prompt, because you cannot name a gap you do not know about yet;
`stop-at-the-gap.1` links `setup` for it.

`steering` closes on an ungraded `TaskCard`, `SteerARun`, under the same `<hr>` and `ui:quiz.title`
heading the rest of the step uses, with the quiz under it. **Three moves**: the worktree move went with its section to `parallel`
in October 2026, and the `data-audience="self"` aside owns the rewind experiment, so a move for it
would say it twice to the one reader who gets both. **The `gap` move is why the card exists**: `LateFeePolicy` computes in
cents and names no currency anywhere in `exercises/step2/java`, so asking for the fee in euros is the only
place in the course where a student watches an agent decline to guess. The `queue` move splits by assistant: the Copilot one names the Copilot agent and Send Immediately.
Nothing on the card is graded,
and nothing it asks for touches a package, so `mvn verify -Pgraded` and the `challenge` tests are
safe from it.

**A gap is an *open vraag* in Dutch, never a *leemte* and never an *opening*.** The owner rejected
*leemte* as Netherlands Dutch in October 2026 (the course's Dutch is Flemish), and *opening* is an
aperture or a vacancy. It runs through `stop-at-the-gap.heading` and `.1`, so a rewording keeps the
noun.

**Its `self` aside is a `data-assistant` pair nested inside the audience wrapper** (October 2026, at
the owner's asking): "go back and change it" was not something a student could do without being
told how, so each variant names the move (Esc twice and **Restore conversation**, not a Summarize
option, which keeps a summary; the pencil on the message in IntelliJ's Copilot chat) and gives the
three prompts to copy, against `exercises/step2/java`. The first prompt names a file
(`LoanDataConfig.java`, which the fee question never needs) so the student sees it being read and
can ask about that one file afterwards; a vague first request left them unable to tell what it had
read. The
interrupt-or-go-back section deliberately does not name a keystroke. It names the three tools
that let you rewind (Claude Code, Copilot CLI, and IntelliJ since plugin 1.18.0 in September 2026),
and `SteeringMoves` carries the key per assistant, so the prose does not date with a binding. It carries one of the step's two `data-audience="self"` asides, the
other being `workshop`'s. Two others are gone: `setup`'s, on reading a skill's description with the
body covered, went with the hooks paragraph when that unit was trimmed, and `engineering`'s
file-counting diagnostic went with the prose under its `Domain-driven design` heading.

The cost argument is told twice inside `setup` and that is deliberate: `claude-md.2` on what earns a
line in the file, `skills.5` on paying for a description on every turn whether or not it fires. It is
one argument about two things, and both are where a student needs them. The unit that used to
re-derive it from outside was `quality`, and it is gone, so `setup` is now the only place in the step
that argues it. **Do not open a third site.**

`setup` carries three drawings and they are one drawing three times: `ProjectTree` under the
CLAUDE.md heading, `SkillTree` under Skills and `HookTree` under Hooks, each `FileTree` with `dim`
set and that section's subject picked out in teal. One section, one heading, one tree, then the
prose. Only `ProjectTree` numbers its rows, because only its section points back into them.

**`setup` is written for both assistants, and it is the only unit in step 2 that is** (October
2026, at the owner's asking: the unit was Claude Code only and a Copilot student was taught files
their tool does not use). Every paragraph that names a path is a `data-assistant` pair, the three
trees and `CheckPermissions` pick their data with `useAssistant()`, and everything else stays one
shared paragraph. **Every Copilot claim in it was run, not read**: Copilot CLI 1.0.95 in a scratch
repository and IntelliJ in the owner's own test project, written up under "Setup files" in
`copilot-specific.md`. Read that before changing a Copilot sentence here, because four of them
are where the products differ in ways a student would otherwise find out the hard way. IntelliJ
reads a nested `AGENTS.md` only with an Experimental setting ticked (`claude-md.1.copilot` names the
menu path). Copilot CLI runs repo hooks only in a trusted folder. The Copilot `postToolUse` hook is
declared without a `matcher`, so the script filters on the tool name (`hooks.2.copilot`); the
reference documents an optional one, which was not run. And the personal file is a
`*.instructions.md` with `applyTo: "**"` in `~/.copilot/instructions/`, because the owner's
IntelliJ ignored the global file GitHub's IDE docs name and read that folder, and the CLI reads it
too. The course names `AGENTS.md` and not `.github/copilot-instructions.md`, on `copilot-specific.md`'s standing decision; `claude-md.2` names the second file once, only as what Copilot's `/init` writes instead, so a student who runs it knows why no `AGENTS.md` appeared.
Two Claude additions arrived in the same change, each one sentence: `CLAUDE.local.md` in
`your-own-claude-md.1.claude` and the `@path` import in `claude-md.3.claude`, the latter worded as
not shortening the context, because an import loads at launch. Claude Code reads `AGENTS.md` only when
there is no `CLAUDE.md` (tested on 2.1.296), which is why the unit never tells a Claude student to
add one. **A nested file loads on a file in its folder, not on the folder**: Claude Code's docs say
once the agent reads, writes or edits a file there, and Copilot CLI was seen loading one on an edit.
"Once the agent goes into its folder" was the old wording and was wrong, since an agent does not go
anywhere; `claude-md.1` and `flag.package.help` say a file now, and the help line, being shared,
says "works on a file" to cover both products. **The section keys kept their `claude-md` and `your-own-claude-md` slugs** although the
Copilot headings read `AGENTS.md` and "Your own instructions": renaming them would have moved every
key for a slug nobody sees. The flag hunt was left alone and still names no file: the Java project
is set up with Claude Code's names, Copilot reads them, and `check-yourself.2.copilot` says exactly
that much so a Copilot student is not hunting for an `AGENTS.md` that is not there.

**The CLAUDE.md section runs to three paragraphs, and the third is `.claude/rules/`** (FEEDBACK 10,
where `.claude/rules` came up as an exam topic). `claude-md.3` is a comparison and not a second
mechanism to learn: a nested CLAUDE.md follows the folder layout, a rule with a `paths` line follows
a file pattern that cuts across it, and a rule without one loads at launch like the root file. Its
payoff is stated as the always-loaded part staying short and **never as tokens or a bill**, because
the cost argument already has its two sites in this unit (`claude-md.2` and `skills.5`) and the
rule below forbids a third. It sits after `claude-md.2` rather than before it, so that paragraph's
"Keep each one lean" still follows the nesting claim it was written against. The tree gained
a fourth numbered entry for it, `.claude/rules/` with a `frontend/` and a `backend/` subfolder,
each holding 1 rule with its `paths` line drawn under the name (`FileTree`'s `detail`, a literal like
the name, since frontmatter is not translated). **Those files are invented**, on the
old `SkillTree` precedent: this repository has no rules folder, and the backend example is a controller pattern
rather than a test one because the house test style is the capstone's skill. **The subfolders are
the owner's choice** (October 2026), and `claude-md.3` says in 2 short sentences that they only keep
the files in order and that `paths` alone scopes a rule, because a student who sees `frontend/`
under `rules/` will otherwise assume the folder name does what a nested `CLAUDE.md` does. Both
products read the folder recursively: the Claude Code docs say so, `copilot-specific.md` lists
`.github/instructions/**/*.instructions.md` for Copilot CLI, and a `backend/` subfolder was run in
the owner's IntelliJ and shaped the edit (written up there). What the
paragraph deliberately leaves out: `~/.claude/rules/` and commands, which went in elsewhere in the
unit (October 2026, at the owner's asking, after a read against code.claude.com/docs/en/claude-directory):
`your-own-claude-md.1.claude` names the personal rules folder in one sentence, because that section
owns the personal files, and `skills.1.claude` says `.claude/commands/` is the older form of a skill,
with the docs' precedence (both give `/name`, old ones keep working). `skills.5` gained
`disable-model-invocation: true` inside the cost argument it already makes, so it is not a third
cost site; the claim that the description leaves the context is the docs' for Claude Code and was
run on Copilot CLI 1.0.95 (a skill with the field set was missing from the skills the agent listed,
its sibling without it was there), which is why the sentence is shared. `skills.1.copilot` names a
prompt file in `.github/prompts/` as the nearest Copilot form and says **IntelliJ**, because that is
where it was run (the owner's project, October 2026: `/hello` ran `hello.prompt.md`); Copilot CLI was
not tested, so the sentence does not claim it. It calls a prompt file close to a skill rather than
an older form of one, and its one difference is that it runs only when you type its name. The
frontmatter example beside `SkillTree` is **`diagnosing-bugs`, and it and `code-review` in the
drawing are real skills from Matt Pocock's public collection** (github.com/mattpocock/skills, MIT),
at the owner's asking (October 2026). That reverses the old decision, which drew an invented
`add-endpoint` beside two other invented skills. Two of its reasons still hold and limit which real
skills may go here. This repository's own four are `adding-a-step`, `lesson-writing`, `quiz-writing`
and `repo-setup`, and every one of them belongs to the person writing the course rather than the
person taking it, so drawing them showed a student the author's toolbox. A testing skill (Pocock's
`tdd` included) is ruled out because `workshop.flag.coverage.help` asks the student to write one
themselves, so spending it here gives away part of the capstone. The owner rejected `grill-me` as
the example: its body is one line handing off to `grilling`, a second folder that reads as a
duplicate. **Two skills, not three**, at the owner's asking. The rule that survives all of it is
that **the tree and the `<pre>` name the same skill**. `skills.4`'s examples are drawn from the same
2: `code-review` reviewing against the standards the repository already documents (its own
`SKILL.md` names `CODING_STANDARDS.md` and `CONTRIBUTING.md`), and `diagnosing-bugs` keeping
`scripts/hitl-loop.template.sh` beside its body. `skills.1`'s slash-command example is
`/diagnosing-bugs` and not `/code-review`, because Claude Code ships a built-in `/code-review`. And
`HookTree` follows the rule too: the script it draws is the
one the hooks `<pre>` declares.

**`claude-md.2` is followed by the course's first `<table>`** (October 2026, at the owner's asking):
an Include and Leave out list adapted from Anthropic's CLAUDE.md guidance, 5 rows where the source
has 7, merged in pairs rather than cut. It replaced the old "cannot be read off the code" and
"a briefing, not documentation" sentences, which the table now carries, and the whole table is one
key, `claude-md.table`, translated as its inner HTML the way the warning aside is. It names no tool,
so it needs no `data-assistant` pair.

The Hooks section exists because the paragraph that used to introduce them was cut from the Skills
section, and `patterns` used the word twice while defining it nowhere. It says what a hook is, why it
is stricter than the other two (a `CLAUDE.md` line asks and a skill offers, and whether the agent
follows them stays probabilistic, while a hook is deterministic and runs every time its event matches), and then shows one hook whole: the declaration and
the script, per assistant. **What it costs when it is wrong lives in the closing paragraph rather
than in a fourth one**: keep it fast and narrow, because a broken one hands the agent an error it works around instead of
writing the code. That argument is latency and blast radius. **It is now the only place in the step
that teaches hooks.** `hooks.3` was cut to 2 sentences at the owner's asking (October 2026), because
the rest repeated the section: "reach for a hook when a step must happen every time" is `hooks.2`'s
deterministic claim again, and "it runs on every shell command" is said in `hooks.2` too. **Its
closing forward pointer to `patterns` went with them**, the hand-off of a correction that keeps
coming back rather than a command that has to run: the Skills section sits directly above, so it
pointed away from a page that had just made the point. `patterns.skill-iteration.1` still names
`setup` from the other side, for the file shape `SkillTree` draws, and that end does not depend on
the cut one. `HookTree` paints `settings.json`, `hooks/` and the script all teal on purpose:
a hook is two files and a reader who takes away one of them has the wrong picture.

**The example is a test-output filter, at the owner's asking (October 2026)**, replacing a formatter
that ran after every write. It is Anthropic's own example from code.claude.com/docs/en/costs ("Custom
hooks can preprocess data before Claude sees it"), adapted to Maven, and it is the one place the
section has a payoff a student can count: `hooks.3` opens on 72 lines against 18. **That payoff is
framed as what the agent reads, never as tokens or a bill**, and it carries no coin: the cost
argument has its two sites in this unit (`claude-md.2` and `skills.5`) and a third is still
forbidden. **The script is folded away and the prose says what it does**, at the owner's asking
(October 2026), who could not follow the script even with comments: `hooks.2.claude` says it rewrites
`mvn test` to `mvn test 2>&1 | grep …` with the whole pattern, `hooks.2.copilot` says it puts the
output through that grep, and the script sits under a `<details>` labelled "The script behind it"
(`setup.hooks.script.claude` and `.copilot`, the course's first `<details>`). The rewrite is the
idea; the `jq` around it only reads and answers the hook's JSON, which is why it may stay folded. A
`<pre>` inside the `<details>` is not a top-level block, so `prepareUnit` leaves it a plain `<pre>`
with no copy button, and guided mode drops the fold with the rest of the prose.

What was measured and what follows from it, on Claude Code 2.1.296 and Copilot CLI 1.0.95 against a
copy of `exercises/step2/java` with one assertion in `LateFeePolicyTest` broken (10 October 2026):
- **72 lines against 18.** A failing `mvn test` prints 72; through the filter the agent got 18 in
  both CLIs (the two failure blocks with `expected`/`but was`, the summary, `BUILD FAILURE`). A
  compile error prints 55 and the filter keeps the `.java:[` lines and the verdict. Re-measure
  `hooks.3`'s numbers if the project's tests or Maven's output change.
- **The pattern keeps `BUILD`**, so a green run comes back as `BUILD SUCCESS` rather than as nothing.
  The docs' version greps only for failures, which hands the agent an empty result on success. On
  Claude Code the pipe also hides Maven's exit code, so that line is the only sign of the verdict
  there; do not drop it from the pattern.
- **The Claude script sets no `permissionDecision`**, unlike the docs' `"allow"`: `updatedInput`
  alone was applied (the debug log shows `modified tool input keys: [command, description]`), and a
  `Bash(mvn:*)` allow rule still let the piped command through. Adding `"allow"` would auto-approve
  any command the regex matches, `mvn test; rm …` included, so do not put it back.
- **Copilot filters after the tool ran, with `postToolUse` and `modifiedResult`**, rather than
  rewriting the command with `preToolUse`'s `modifiedArgs`: GitHub's reference does not say
  config-file hooks honour `modifiedArgs`, and it does say they honour `modifiedResult`. A failing
  `mvn test` still arrives with `resultType: "success"`, so `postToolUse` fires (not
  `postToolUseFailure`), and the agent still sees exit code 1, which the Claude route loses.
  `toolArgs` arrived as an object, as the guard notes under `workshop` already record. **In IntelliJ
  it arrives as a JSON string** and `modifiedResult` did not take (11 October 2026, Free plan), so
  the script parses either form and `hooks.2.copilot` stays vague about IntelliJ on purpose, at
  the owner's asking. Do not claim the filter works there, or that it does not.
- **The Claude declaration names `"$CLAUDE_PROJECT_DIR"/.claude/hooks/…`, never a relative path**
  (`review/units/step2-setup.md` flagged it on the old formatter). The hook's working directory
  follows the agent's shell, so after a `cd src` a relative path failed on every shell command with
  status 127 and "No such file or directory"; with the variable it fired and rewrote. Copilot CLI's
  shell does not keep a `cd` between calls, so its relative `bash` path held.
- **The Claude script only rewrites a plain `mvn` command**, `^mvn [^;&|<>]*(test|verify)[^;&|<>]*$`.
  A run with a looser `^mvn.*(test|verify)` got `mvn … > file; echo; wc -l < file` from the agent and
  appended the grep to the tail, which broke the command. A compound command, a redirect or
  `mvn --version` is left alone. The Copilot script keeps the loose match, because filtering the
  output of a compound command breaks nothing.

**`hooks.4` carries the language-server tip**, rewritten at the owner's asking (October 2026)
after the owner had never heard of one: it now says what a language server is (the part of the IDE
behind the red underlines and go to definition), that `jdtls` itself has to be installed beside the
plugin, and carries the gem. The two products get different claims on purpose. Claude Code's
code-intelligence docs (code.claude.com/docs/en/plugins/code-intelligence, read 11 October 2026)
promise diagnostics after every edit plus an `LSP` tool for navigation, and Anthropic maintains
`jdtls-lsp` in the official marketplace. GitHub's page for Copilot CLI (`.github/lsp.json` or
`~/.copilot/lsp-config.json`) promises definitions, references and renames and says nothing about
diagnostics, so the sentence gives the errors to Claude Code only. Neither was run, and no token
figure is claimed: the docs frame it as fewer file reads, which is not measured here.

The scripts and declarations on the page are the ones that ran, byte for byte. **The scripts carry a
comment above every step, at the owner's asking** (October 2026: without them the owner could not
follow the script), and the comments were added after the live runs and checked with `bash -n` and
recorded stdin rather than run again. The same holds for the jq and `chmod +x` comment, the
exit-code comment and the Copilot `toolArgs` line (11 October 2026, run against the payloads
IntelliJ and Copilot CLI sent). They are English in both languages, like every code sample.
Change a line and run it again.

`setup` closes on the step's second flag board, and it is the only exercise outside `workshop` that
a machine grades. Three flags, one per place `exercises/step2/java` tells an agent how to work: the skill
under that project's own `.claude`, the project briefing, and the briefing scoped to the `domain`
package. **The prose names none of the three files, and no row hint names one either.** That is
the exercise: the unit says a project you have not opened was set up before you got there, go and
find out how, and stops. A sentence in the prose listing the files, or a row hint reading "look in
`.claude/skills/`", ends it. What `check-yourself.1` may say is where the line sits for prose: it
gives the *shape* of a flag (plain text, in curly braces) and the fact that each sits in a kind of
file the unit has just named, and it says what to do in 3 short sentences (look for the files
that tell an agent how to work, read them yourself, paste the flags). The row labels and hints were
cut to one plain line each at the same time (The skill, The project instructions, The package
instructions): they name the kind of thing and still no file or path. The help dialogs went to 3 plain sentences each in the
same pass: what the file is, roughly where (the skills folder the unit names, the top of the
project, a package under `src/main/java`), and the agent as the second route. They still print no
path to a flag's file. The owner found the longer version unreadable (October
2026), so the size of the search and "each flag sits in the file it is about" went, and the board's
description now says only that no script or build prints them. That is enough for a
student to know they are looking for the right kind of thing, and none of it narrows the hunt to a
path. **Do not collect the three flags anywhere in the tree**, including in
a comment; `setup-flags.ts` holds salted hashes and its own salt, on the reasoning its own file
gives.

They are plaintext in the Java project rather than veiled the way the workshop's flags are, and
that is deliberate rather than an oversight: reading the file *is* the task, so there is nothing
left to hide behind once the student is looking at it.

**The three levels say different amounts, and that split is the decision.** The board's rows are
what a student reads while still hunting, so a hint names the *kind of thing* and never the file:
a procedure followed the same way every time, what the project says before you do, the same file
one level down. The **help dialogs go much further**, because a student who has opened one is
already stuck and the residue of the exercise (finding out that a project carries files like these
at all) has been spent by then. So a help dialog may name the kind of file outright, say roughly
where in the tree it sits, and give two ways of getting at it: read for it yourself, or ask the
agent to list them. What a help dialog still may not do is print a path or a filename that turns
the row into a copy out of one file. They were riddles describing a *symptom* before, on the
argument that a stuck student wants a way of looking rather than a filename, and that went too far
in one direction: "something in there is followed the same way every time" has no antecedent, and a
student with no idea what "in there" means is stuck on the wrong problem. Keep a hint thin and let
the help be generous.

**`FlagBoard` is the mechanics with the data lifted out**, the same move `ConnectBoard` and
`TaskCard` made when a second caller arrived. `Workshop` and `SetupFlags` are the two callers, each
a block, a storage key, a salt, a flag list and a message prefix, and neither renders an element of
its own. Anything about how a board *behaves* goes in `FlagBoard`, so a student who learned the
interaction on one meets the same one on the other. The workshop's ids are unchanged (`flags-*`),
which is what makes the extraction invisible to anything that pointed at them. Two storage keys, so
the boards do not mark each other's rows solved, and both sit under `kata.step2.` where
`shared/lib/reset.ts` can find them.

`patterns` is one short lead paragraph, `Skill iteration`, then `Scripts`, and **it closes on a card
and a quiz** under an `<hr>` and the shared `ui:quiz.title`, with no prose between the rule and the
card. The `script-runs` figure is followed by one sentence, `patterns.scripts.3`, which says what
the shape proves (asked in words every run is a new one to check, as a script you checked it once)
and does not walk the rows; it went in with FEEDBACK 12, when the figure turned out not to read on
its own. The figure had the last word until the card and quiz landed: a closing section called
"Around the script" was cut, along with the lead's second paragraph. `SameEveryRun` **asks for no
tests** (spending `workshop.flag.coverage.help`'s testing skill is the capstone's job) and **touches
no package** (a rename breaks `mvn verify -Pgraded`, the `challenge` tests and the native-image
flag). Its `twice` move is `ScriptRuns`'s claim made testable, and its `find` move is the only place
in the course where a skill's `description` is tested rather than described. What went with them is worth knowing before writing any of it back. The
cut section argued that the judgement stays in the skill while the script does the mechanical part,
that a hook calls the same script when it has to run unasked, and that not everything reduces to
one (taste has no exit code, but the em-dash rule's check is still a `grep`). The cut lead paragraph
was this repo's own four skills, `lesson-writing` and `quiz-writing` beside `adding-a-step` and
`repo-setup`, as prose that arrived after the mistake. The first heading read "Give it a home" until
it was renamed, so its keys are `patterns.skill-iteration.*`, and its prose was replaced along with
it: the triage of convention against skill against hook went, and so did the new-step file list the
cut `quality` unit also carried. **The word "hook" now appears nowhere in the unit**, which
is what `setup`'s Hooks section lost its forward pointer to. What the section argues now is the second
pass. A first skill works better than you expect, the answers still come back slightly off, so you repair the output
and have the agent work out what the skill failed to say. **Its two `<pre>` blocks are one skill
twice and differ by exactly one rule**, the announced count added to the em-dash rule, so the reader
diffs them by eye; rewrite one and the other moves with it, or the section's claim is on the page
with nothing under it showing it. They carry no `data-i18n` key, like every other code sample. The
closing paragraph is the payoff and names two things, corrections that stop coming back and a file
the team shares. **The middle section names
no script of its own, and that is the correction it was rewritten for.** It was called "A script
instead" and argued at length for `scripts/new-step.sh`, a file this repository never wrote, closing
on "a skill only helps the people who have Claude open" in a repo that chose the skill; `audit.md`
carried that as a defect. What it argues now is general: your agent writes the Bash you do not, a
skill that calls the script is what makes the agent aware of it, and what you buy is predictability
plus the tokens the agent stops spending working the steps out again.

`ScriptRuns` is its figure and it is **variance across runs and never the clock or step size**.
`LoopsPerHour` in `enablement` owns how many turns fit in an hour, so drawing a run here as time
spent collapses this into that. The same request three times, drawn twice: three muted cards whose bars differ,
then three teal cards that are one set of widths repeated, which is the equality the section claims
in words. The cards are the same size in both rows for the same reason. **Both rows are labelled
now, and that reverses a recorded decision** (FEEDBACK 12). The old record said only the script row
was named, because a name over the first said prose twice; read cold, nobody could say what the
first row was, what was being run, or what a bar measured. So the figure opens on the request (a
database reset before a demo, `scripts.1`'s own example), the rows read "Asked in words, three
times" against "One script, three times", and a legend line under them says **a bar's length is how
much that step did on that run**. That wording is the constraint: it is neither time nor tokens, so
the legend may never grow a unit, or the figure becomes `LoopsPerHour` or a bill. What each row
produces still sits on the right, and that pair is still the drawing.

`workflows` is five ways of handing work over, and **the order is the argument**: naive, plan-based,
spec-driven, defer, audit-driven, running from the least settled up front to the most, with a closing section
saying they are not exclusive. That close is the unit rather than a coda, so a rewrite that drops it leaves
four techniques and no reason to pick one. It carries no exercise, and the reason stands: there is
nothing a card could ask the student to *do* here that would not be a smaller version of the
workshop.

**It does carry a quiz, and that reverses an earlier decision.** The record used to
say no quiz either, on the grounds that the choice is the lesson. That reasoning was aimed at the
wrong instrument. A card asks for work and there is none to ask for, but a question can ask which
workflow a situation wants, and "which one for a log line in a careful project" is exactly the
choice the unit spends nine hundred words teaching. So the three questions in `quiz.ts` are
situations rather than definitions, one per workflow that has something to get wrong: naive against
the pull to be consistent, what plan mode buys that is not a better draft, and the format rule that
makes an audit a file you can work. **Spec-driven has no question of its own**, on purpose, because
it is the baseline the other three are measured against and it turns up inside all of them. Do not
add a fourth to even the set up.

**`defer` sits directly above `audit-driven` on purpose.** It is the
mid-flight half of the same idea: when the agent turns something up that is not the task, the
finding goes into a markdown file instead of into the session, and a later session triages it into
a spec or a one-shot prompt. Placed there, its file is the small version of the `audit.md` the next
section makes a habit of. It has a `FlowDiagram` of its own, but `WorkflowWeights`,
`WorkflowTimeline`, the deck and the quiz still name four workflows; giving it a bar, a stage or a
slide is a separate decision, not an oversight to tidy.

The quiz renders under the closing figure from the registry, so the unit's HTML gets no
`<h2 data-i18n="ui:quiz.title">`: that heading belongs to a task card, and `QuizPanel` writes its
own. `setup`, `engineering`, `gates`, `steering`, `patterns` and `enablement` carry the heading
because they carry cards. `goals`
follows this unit's shape rather than theirs, for the same reason.

Two of the four are already taught elsewhere, and the unit **points rather than repeats**, the same
rule `agent-patterns.coordinator.3` follows in step 1. Plan mode belongs to `step1/prompt`, which defines it
as meta-prompting the provider built for you, so the section here adds only what turns it into a
workflow: doing it by default, and the interview making the engineer decide things they had skipped.
Reflection belongs to `step1/agent-patterns`, so the audit section names it and moves on to what is new,
namely that it is aimed at a project instead of at one answer. Neither may grow into a second
definition.

The naive section uses "vibe coding" disapprovingly and links to `engineering`, then defends it in
one paragraph that lists three places. Two are throwaway code, which is the same licence step 3's
`expectations.prototype-starts-conversation` gives: what you intend to delete is where the argument
does not apply. The third is the one that
survives everything else in the step, namely that **nudging is not restructuring**, so a padding or
a log line does not earn a workflow. That one is what `Plan/naive` at the end of `WorkflowTimeline`
turns on, so the two move together, and it belongs in that paragraph rather than in a closer of its
own: the section is about where naive belongs, and a second paragraph making the same kind of claim
read as an afterthought. Do not tidy any of it into agreement with `engineering`.

`naive.3`, the throwaway that turns out to have users, follows `gates`' legacy-code order and links
there: **gates first**, then a spec per change from then on, and **no specs for what already ran**,
because the tests record it. Until October 2026 it told the agent to write the specs the code
implies, one per feature. The owner rejected that as contradicting the gates-first rule the course
repeats everywhere, and practitioner sources agree: a spec derived from code records what it does,
bugs included, as if intended. Do not bring back reverse-engineered specs as the recovery step.

**Spec-driven keeps two files per feature, `spec.md` and `plan.md`** (October 2026, at the owner's
asking). It used to be one `spec.md`, which undersold the method: Spec Kit keeps `spec.md`,
`plan.md` and `tasks.md` per feature, Kiro `requirements.md`, `design.md` and `tasks.md`. The owner
chose spec and plan only, so **do not add `tasks.md`**. The plan is the one plan-based leaves in the
session, kept this time, and that is the contrast `spec-driven.1` draws and the reason
`WorkflowWeights` shows a solid `spec.md + plan.md` against plan-based's dashed `plan`. `flow-spec`
draws `spec`, `plan` and `code` in the project frame, and the deck slide's title names both.

It carries eight figures, and five of them are one set. `FlowDiagram` closes each section with who
talks to what: `you → agent → [project: code]`, then the same with a two-way link to the agent, then
a spec joining the code inside the project, then `defer`'s two sessions, then `audit-driven`'s
six-box chain closed into a cycle. **They are read down the unit rather than one at a time**, so a
change to one is a change to all five, and the colour rule is what makes that work: a two-way link is
teal, a one-way link is muted, and a path added to the row (a loop's return, `defer`'s aside) is
teal and dashed, so the teal is always the thing that section adds.

`defer` is the only one drawn as **two rows with a rule between them**, labelled as this session and
a later one. The first is `plan-based`'s row with `findings.md` hanging under the agent; the second
starts from `findings.md`. **Nothing connects the two copies of that box**, on `WorkflowTimeline`'s
precedent that a repeated name says it: the file is the only thing the sessions share, and an arrow
across the rule would draw them as one run. The aside hangs inside its node's own box, so unlike the
audit's branch it needs no measuring, only space reserved under the row.

Three things inside it are decisions. **The project is always a frame**, never a box, and what sits
inside it is what changes across the four; that is the argument that a spec is a file in the
repository rather than a document beside it. **`audit-driven`'s spec is faint**, dashed and set back
on the step-1 reading of a dash, because an audit needs no spec: you can point one at a repository
that never had one, which is what makes it the workflow you can bolt onto anything. And the labels
are **bare nouns** (`agent`, `code`, `project`) rather than `the agent`: `audit-driven` runs to six
boxes and five arrows, and the definite articles were what pushed it past the prose column into
wrapping. The row gap is `gap-2` for the same reason.

`audit-driven` is the long one and the only one drawn on two levels. Its row is
`you → agent → audit.md → you → agent → [project]`, and around it runs a cycle in two halves that
meet on the same two columns. Above the row, the project goes back into `audit.md` through **an
`agent` pill sitting on the path**, labelled "audits again", because what a pass produces is a new
version of that file and an agent is what writes it. Below it, a `you` **hangs under `audit.md`**,
the project feeds it, and it feeds back up into `audit.md`, captioned "check the fix, close the
row". Splitting the cycle across both sides is what keeps either half from having to dodge the
other, and the two halves are the two ways a row closes: the agent re-running the audit, and you
checking the change. Both labels went in with FEEDBACK 13, which found the bare `update` arrow said
nothing about who updates and the bottom `you` said nothing about what you do there; until then
both answers lived only in the aria description. They are `FlowDiagram`'s `loopBy` prop and its
`<id>.branch-note` key, and the pill is drawn **between two runs of the top line rather than
painted over it**, because the figure sits on the card on a page and on the plain ground on a
slide, and a mask would have to know which. `audits again` is a verb phrase rather than a bare
noun, which is the one place the bare-noun rule above gives way: it labels a path, not a box.

Four mechanical notes, and they are all one problem: a box's edges are not the row's edges. The
paths are **measured** rather than inset by constants, since the boxes are words and the project
frame is taller and wider than a plain box. `useLoopInset` reads the target box, the last box and
the branch box under a `ResizeObserver`, and returns `left`/`right` for the two columns, `drop` for
how far the target starts below the row's top, `rise` for how far it ends above the row's bottom,
and the branch's width. Without `drop` and `rise` an arrowhead stops in mid-air, because the row is
as tall as the project frame while the box being pointed at is not. Every arrowhead then keeps a
`STANDOFF` from its box, so the two read as arriving rather than touching. The bottom caption is
anchored by `left` and a full translate rather than by `right`: the insets are measured after
transforms, and on the slide an offset taken from the far edge carried the whole row's scale error
and put the words on the box. **The figure still breaks under about 500px**, where the row wraps and
the measured cycle no longer lands on its boxes; that was true before the labels went in and is not
fixed. And the arrows are
`aria-hidden` with a per-figure `aria-label`, because direction is the whole content and the labels
alone do not carry it.

`AuditExample` is four rows of a security audit with a switch in its corner
that turns the table into the markdown behind it, and both come off **one set of strings**, so the
two views cannot drift: `toMarkdown` pads the same cells the table renders. That is the whole reason
the switch exists rather than a second `<pre>`, and it is what the paragraph under the figure turns
on, namely that an audit looks like a report and is a file that diffs. Three things in it are
decisions. The subject is **security rather than this course**, because a reader can tell a missing
`aud` check from a half-set header and cannot tell whether a curriculum unit is thin; the repository's
own `audit.md` is named in the prose instead, which is where the evidence belongs, and the caption
says the table is not a run against this repository. **Each status is used once**, so the four rows
teach the legend by standing next to each other and the figure needs no legend line. And the solid
row **carries no remark on purpose**, because the paragraph under it claims a row you can stop
carrying around is worth as much as the rest. The table is sized to fit the prose column: only the
markdown scrolls, since it is padded to align and therefore cannot wrap.

`WorkflowWeights` and `WorkflowTimeline` are the closing section's pair, in that order, and they
answer different questions: the first says how the four differ, the second says they combine. The
weights sit mid-section, under the sentence about not joining a camp; **the timeline closes the
unit**, with one paragraph of intro above it and nothing after it. That is the one place in the step
where a figure has the last word, so its own labels have to carry what it argues: there is no
paragraph below to read it.

`WorkflowTimeline` is one project's path, naive to plan-based to spec-driven to audit-driven and
back to `Plan/naive`. **That last label is the argument**: you drop back to a workflow you already
used, and which one depends on the row, since a one-line header fix does not earn a plan. Nothing
marks it as a return, because the repeated names say it. Three things it carries are load-bearing
and live in the figure's own labels rather than in prose: the audit reflects on **your own spec
work** rather than
on the agent's answer, the closing plan exists because of what the audit turned up, and the return
path under the last three stages writes the changes back into the specs. That last one is the way
spec-driven work fails quietly, so removing the return line removes the warning. It is DOM rather
than SVG on `ModelTiers`'s precedent: the notes wrap themselves in both languages, and the row
becomes a column on a narrow screen with the arrows turned, which an arc drawn in SVG could not do.
The return path is **three borders on one box**, so it is a bracket with two right angles rather
than an arrow, and it reflows with the grid instead of carrying coordinates. A bare arrowhead was
tried first and is the thing to avoid: it lands in the gap between two cards and reads as pointing
at the wrong one. The chevron is `Up` and caps the left riser for the same reason. **Both risers sit
on card centres**, `Spec-driven` and `Plan/naive`, and the two margins that put them there
are arithmetic rather than nudges: a percentage margin on a grid item resolves against its own grid
area, so half a card is `(100% - 1rem) / 6 - 0.75rem` once the `size-4` arrow and `gap-2` ahead of
each card are taken out. Change the parent's gap or a stage cell's lead-in and both numbers move.

`WorkflowWeights` closes the unit and is the comparison. Four bars of **the same length**, each cut
into what you settle first, what the agent runs, and what you read afterwards, so the drawing says
the work moves rather than shrinks. That equal total is the argument, which is why the bars are one
figure and not four: four separate drawings say nothing on their own. `naive` and `audit-driven` come out close on that axis deliberately, because they are
close, and what separates them is the second thing the figure carries: the artifact. A kept artifact
is a solid pill (`spec.md + plan.md`, `audit.md`), the plan is a dashed outline on the step-1 reading of a
dash, since it goes when the session does, and `naive` has no tag at all, which has to read as
deliberate rather than as a gap. The proportions are hand-authored, and the only place that is
recorded is the component's own docblock: it carried a caption saying so, on `NextToken`'s
precedent, and the caption was **cut on purpose**. It sits in the closing section rather than under
the lead, because it labels the four by name and a reader who met it earlier would be looking at
four words they had not been given yet.

`enablement` follows `workflows` and owns the one thing the rest of the step leaves out: **how long
it takes to find out**. Every other unit decides what you hand over or what you do while it runs;
this one is about the machinery around you that answers you in seconds instead of in a deploy. Three
sections, and it closes on `CountTheDay`, an ungraded `TaskCard` under the same `<hr>` and "Test
yourself" heading the rest of the course uses. The unit told the student to count where the hours
go and then asked them to count nothing, which is what the card answers. **It names no project and
no command**, and that is a condition of it existing: `run-own-machine` was stripped of this
repository's own two-terminal setup so a reader on their own stack would not have to translate it,
and a card naming `mvn spring-boot:run` puts that straight back. Its `fit` move sends the reader
back into `LoopsPerHour` with a number of their own, which is what turns that figure from a drawing
into a measurement; that number is 10 since the redraw, and the bracket's minutes are where theirs goes. **It has no quiz, and that half is no longer borrowed from `workflows`**, which
now carries one. It stands on its own here: this unit is about what has to be true around you, and
a condition has no wrong answer to offer a question the way a choice between five workflows does.
Run it locally front and back, grow the crossbar, and count where the day goes.

**It was `Enablement`, then `What it asks of you`, and is now `Feedback loop`**, on `goals`'s precedent: the unit id, the
URL, the namespace prefix, the deck eyebrow key and every `/steps/step2/enablement` link stay where
they are, so nothing that pointed at it moved. The old title was the one abstract noun in a step of
plain ones, it appeared in neither language's prose, and it was all that bound three sections that
do not build on one another. The middle one read back onto all three: your check has to keep up, what
is asked of you moves up a level, and the week is what it asks of your time. Three step 3 blocks
called the unit by its old title and were repointed with it, in both languages.

**It opens straight on its first `<h2>` and carries no lead, which is deliberate.** The two lead
paragraphs it was drafted with said the work comes back fast and the checking is what takes the
afternoon, which is the unit's premise restated rather than anything a reader could use, and they
were cut for that. Every section under the heading opens cold on its own claim, so nothing is
missing. Do not write an introduction back in.

`run-own-machine` is two paragraphs and neither says what the other does. The first is the aim and
the premise together: frontend, backend and the database in a container, with data in it, so a wrong
column shows up as a wrong column, closing on the agent writing the change in seconds and your check
having to keep up. **It opens on
what running it locally buys rather than on the instruction**, because the heading above it already
says to run it on your own machine and a first line saying so again is the heading twice. **It names
no project either, and that is the decision.** It was three sentences of this repository's own two-terminal
setup (`mvn spring-boot:run`, `npm run dev`, the Vite proxy) plus a seeding argument about the
expired tier and the member with three hundred loans, and a student reading it against their own
stack had to translate every line of it first. What is left of the seeding is one clause, data that
**covers the everyday cases and the edge cases**, and it is the only place in the step the local
data is asked for, and it stays general rather than naming cases of its own.

**A hinge paragraph sat between the two and was cut**, and what it said is the thing not to write
back: the setup buys a short gap between changing something and finding out, code arrives in seconds
so the gap sets your pace rather than the typing, make it as small as you can, and every loop is
another chance to steer. It went when the first paragraph took the agent-speed claim into its
closing sentence, because the two then made one argument twice. The premise is stated once now, at
the end of paragraph one, and that is where it stays. What the cut costs is "make it as small as you
can", the sentence that turned the premise into something a reader does, and "every loop you get
through is another chance to steer", which was the only line in the section pointing at `steering`.
Neither belongs back in the opener as an extra sentence; if either is wanted, it is a paragraph of
its own with something to say beyond restating the close above it.

The second is the
agentic turn on all of it: hand the agent the running app and the browser server `connect-one`
already had it connect, and it opens the page, reads the wrong column and fixes it before the work
comes back to you. That paragraph is why the section belongs in this course rather than in general
engineering advice, so it goes last. It points at
`step1/tools` for the server **as something described there rather than something the student did**,
since a reader who skipped that task should not be told they connected anything, and it names the
unit rather than an MCP package, on the usual rule. It **opened on "the agent uses all of it too"**
until the paragraph above it started naming the agent, and it now gives the setup and the behaviour
one sentence each and stops on the fix. Two closers went in turn, "That is a whole loop that never
reached you" and then the bare fragment "A whole loop that never reached you", so the paragraph ends
on the gem with no line reading the scene back. Do not write a third one: the scene is the payoff.

`LoopsPerHour` closes the section, under the paragraph where the agent opens the page, sees the wrong
column and fixes it in the same pass. **It was moved here when `reachable-one-step` was cut**, and
**redrawn in October 2026 at the owner's asking because the band it was did not explain itself**:
one hour cut into turns of change, wait and look, two against eleven, and a reader could tell
neither what a turn was nor what the wait was for. It now asks the question the owner put to it,
"how often can the agent prove in an hour that its change works?", as a fixed title, and answers it
with two rows of boxes from the change to the proof: not local, a push, a pipeline and a deploy to a
test environment sit in between under an "18 min" bracket; local, one restart and "1 min". A dot
plays the hour at the speed of the minutes and the count says how many tries reached proof, 2
against 10 with these minutes (the band said 11, and `count.fit.label` was moved to 10 with it).
**The point is proof, wherever the app runs**, which is the owner's framing: the slow row still
proves, against a test environment, with more in between. **Little text**: per-box minutes, a legend
and a clock label came out at the owner's asking once the bracket carried the point. The row labels
are "Not local" and "Local" now, which retires the "names running it locally and nothing else" rule
the band had: the in-between boxes name the pipeline because that is what the owner wanted seen.
**It is on the clock and never on step size.** Few long steps against many short ones, drawn as
distance to a target, was `IterationPaths` in the cut `evolution` unit, and redrawing this figure in
that vocabulary brings back an argument the owner removed. Both rows are the same hour, and what it
counts is tries.

A third paragraph was cut and should not come back. It said that some of what you build has no
frontend, so ask the agent for a single page that calls the endpoint and prints what comes back. The
section is about running what you already have, and a detour into building a throwaway UI is a
different task. It had a home in `evolution`'s fifteen-minute exercise, and that went with the unit.

**A `fitness-tests` section was cut**, and this is the record of it. It said an agent writes the
happy path unasked and leaves out the empty list, the expired tier and the amount that is exactly
zero, that naming those yourself is what holds the shape while the agent rewrites everything
underneath, and it pointed at this step's own `graded` and `challenge` profiles as two fitness tests
that answer in one command. All of that survives elsewhere: `gates`' `Quality gates` owns the
written-down bar and `workshop` is where the two profiles are actually run, so what went was the
third telling. Do not restore it as a section; if the edge cases are wanted in this unit, they belong
to a paragraph that argues something `gates` does not.

It points across two boundaries rather than re-arguing them, and each is easy to collapse.
`steering` owns what you do mid-run, so `where-day-goes`
is a paragraph and a link for that half. Its second paragraph is the hours that go on **thinking**,
and it is where the cut `code-got-cheap` section's surviving instruction lives: work the
implementation details, argue both sides, come out with a design decision you could defend, because
a decision you did not make is one the agent made for you. Keep it about deciding rather than about
structure, or it turns into `engineering` a second time. And `goals` owns "if you cannot name the command that answers yes or no,
you do not have a goal": that is about the instruction you hand over, while this unit is about the
harness on your own machine. Keep the two apart or the step tells a student twice to make things
measurable and never says why the second one is different.

**`where-day-goes` carries the review questions**, at the course owner's asking: 4 questions for
every plan and diff (files touched, assumptions, proof, size) and a line on changed tests, between
`.1` and `.2` under their own keys so `.2` keeps its number. It answers `audit.md`'s "reading is the
bottleneck and no unit shows how". `deck-step2-enablement-review` puts the 4 on a slide, since
guided mode drops the list. The tests line is about an agent *changing* existing tests to get green;
it must not grow into tests that assert nothing, for the reason under `gates` above.

**A section called `reachable-one-step` was cut from the unit**, heading, prose and Dutch keys, and
this is the record of what went with it so nobody restores half of it. It argued the general rule
that whatever you are working on should be one step away, with the twelve-minute deploy as its
example and the bill a new person pays on a fresh clone as its second half, and it closed on one
command for setup, hot reload, a component workbench, and the reminder that **the pipeline still runs
on every push, because the shortcut is for the loop and not for the release**. Anything written back
in here needs that last sentence, or the section reads as advice to skip CI.

Two earlier drafts are buried in it and are worth knowing before writing anything of the kind again.
It was first a section called "Shortcuts past the login" that taught the example and never stated the
rule, which is the shape to avoid; the token-bearing `.http` file and the seeded dev profile went
with that login. **Local data belongs to `run-own-machine` and is a clause there rather than an
argument**, so a section written back in here does not get to make it either. `LoopsPerHour` was this section's figure and stayed in the unit rather than going with it,
moved up under `run-own-machine`, which is where it is documented.

`t-shaped` argues the shape from the agent rather than from the market. Implementation gets faster
with every release, so what is asked of you moves up a level: keep the specialism, know enough of
what sits around it to judge what comes back, and take the closing pair as the point, namely that
**the agent handles the detail for everyone alike, so knowing the detail is worth less than it was
and knowing what good engineering looks like is not**. It said "the market moved first, which means
the upskilling is on you" before, which put the cause outside the course and outside the agent. Keep
the cause where it is now. The `engineering` pointer hangs off that closing sentence rather than
standing as a paragraph of its own: as a second paragraph it opened on the link and then restated
the breadth claim the section had already made three sentences earlier, which is what made it read
oddly. One section, one paragraph, and the link names the unit rather than teaching it again. **The
section carries exactly one example and it sits in the middle of that paragraph**: the migration that
drops a column two other services still read, put back after the section spent a while with none at
all and `SkillShape` carrying the whole of the concrete. It went in there rather than at either end
because the opening claim and the closing pair are both load bearing, and it is the migration rather
than the frontend state bug or the build pipeline the section used to name alongside it, because
`run-own-machine` above it already runs its scenario in the browser and the cut `reachable-one-step`
section was the one that talked about pipelines. One case is the budget. A second turns the paragraph
into a list and the closing pair stops landing.

**A `code-got-cheap` section closed the unit and was cut.** It said code used to be the expensive
part and a craftsman built it slowly, that this is over and nobody is buying code from you any more,
and that what sells is knowing what to build and being able to tell whether what came back is right,
so think while the agent types and be the architect rather than the bricklayer. Both halves of it
have homes now: `t-shaped` carries the worth of the knowledge in one sentence, knowing the detail
being worth less than it was and knowing what good engineering looks like not, and
`where-day-goes`'s second paragraph carries the thinking. A section written back in would be one of
those two a second time.

`SkillShape` sits under `t-shaped`, which is now the middle section, so the
figure closes neither the unit nor its own section's argument; `where-day-goes` closes the unit. Nothing after it reads the drawing back,
which is the part that has to survive the move: its own labels carry
what it argues. An I beside a T, and **the stem is the same depth in both**. A T drawn with a
shortened stem argues "get shallower", which is not the claim under it. The crossbar is the only teal
thing in the figure, on the step's rule that teal is what the shape adds. The dashed baseline both
stems land on **carries no label**: it had one reading "the depth you already had, unchanged" and it
was cut, because two stems ending on one line say that already and the key is gone from both bundles.
Only the T's half is captioned now, which is the same rule the crossbar's colour follows: what is
named is what the shape adds.

`parallel` follows `enablement` and took the slot the cut `quality` unit left, though it is not a
rewrite of it: what it owns is **how many agents you have running, and what each arrangement costs
you in control**. Five sections and the order is the argument: `One agent at a time` (the most
control, and the shape for work that is deep rather than wide), `Many agents at once` (output up,
control down, and all of the reading arriving at the end), `The orchestrator` (the same four agents
with the coordination moved into one of them), `The builder and the critic` (two agents pointed at
each other and you out of the loop entirely), then `Working in parallel with agents`
(control back in the middle, which is what most days actually look like). Running most-to-least and
then landing in the middle is what makes the last section read as the answer rather than as a fifth
option. It carries no exercise, on `workflows`'s reasoning: there is nothing a card could ask for
that the student's own week would not answer better. **It does carry a quiz**, on the reasoning
`workflows` arrived at: a card asks for work and there is none to ask for here, but a question can
ask which arrangement a situation wants. The four in `quiz.ts` are situations, one per arrangement
with something to get wrong. `Working in parallel with agents` has none, because it is the answer the
other four are measured against and it turns up as a choice inside two of them. **No distractor may
claim an orchestrator stops two agents writing over each other**: that claim was cut from the unit
while still half believed, and a distractor this file does not flatly reject is one a careful student
can defend. **It opens
straight on its first `<h2>` and carries no lead**, on `enablement`'s and `steering`'s precedent.

**`The orchestrator` sits directly after `Many agents at once` because it is that section answered**,
not because it is the next thing in a list. Four sessions you opened yourself and four sub-agents one
agent briefs are the same amount of work running; what changes is who holds the wires. So the
section opens on "a better-managed version of that" and stops at where the coordination went. Move
it and that opening sentence stops pointing at anything.

**It is one paragraph, and it ran to two until the second was cut.** What went with it is worth
knowing before writing any of it back: the fan-out never reaching your screen, four runs therefore
arriving as one thing to read, one plan behind all four making them less likely to write over each
other, and what you give up being which sub-agent decided what, so the brief is the thing to ask
for. Two things follow. The warning aside under `Many agents at once` **no longer has an answer
anywhere in the unit**, which is the decision rather than an oversight: the ceiling that section
names is your attention, and a paragraph saying an orchestrator lifts the collision half of it was
arguing with the strongest claim in the unit while leaving the other half standing. And
`agents-at-once.orchestrated.note` ("four runs, one thing to read") carries that claim in the unit,
and the quiz's `coordination-moves` choice is the only other place it is made, so a rewrite of the
note leaves the claim standing only in an answer a student reads once.

Its name is a knowing exception. **`step1/agent-patterns` calls this the coordinator**, and it owns the
whole mechanism: model inheritance or configuration, fresh versus forked context, and the cost
of context acquisition. Do not reintroduce blank-worker or automatically-cheaper-worker claims.
The heading says

`The orchestrator` because that is the name the pattern travels under, and `orchestrator.1` bridges to
step 1's word **in its own second sentence** rather than leaving the course with two unconnected
terms. If either name changes, the other has to move with it. `model`'s closing section is the second
neighbour: it owns why the expensive tier is the one that writes the brief, and this section no
longer mentions a brief at all, so do not let it grow a sentence about who writes one. And the paragraph carries
the `pattern` icon, since this is one of the course's AI design patterns rather than a habit.

**`The builder and the critic` sits after `The orchestrator` for the reason the orchestrator sits
after `Many agents at once`**: it is the same move taken one step further, the checking handed over
as well as the coordination. Put it after `Working in parallel with agents` and that section stops
being the answer the unit lands on. It is also the one section in the step that prints a prompt,
and the prompt is there because the arrangement lives in it: you are in none of the rounds, so
anything you did not write down never gets asked. **`step1/agent-patterns` owns reflection**, so the first
paragraph names the pattern and moves on the way `workflows.audit-driven.1` does. Why a separately briefed critic can reduce anchoring is `agent-patterns.reflection.2` and must not be re-derived here.

The `<pre>` and the list under it are the same thing twice on purpose, and what keeps the list from
being a gloss is that it is general where the prompt is one job. Five elements, and the two easiest
to lose are the fan-out (the independent parts in parallel, and the critic a fresh agent of its own)
and the gold standard (a file already in the repository, because "better" is an argument two
agents can run all afternoon and "as good as this file" is a comparison). The prompt names `TitleController` and bounds review/repair to 3 rounds. `/loop` is interval
scheduling, not a condition-driven repeat command. Keep objective completion checks and a human
delivery boundary; do not replace them with the critic being impressed. The job it asks for is a link shortener in a project of its
own, which is deliberate: anything aimed at `exercises/step2/java` would be the capstone handed over in
copy-pasteable form.

**Its aside is this unit's second `data-variant="warning"`**, and the two carry different costs on
purpose: `Many agents at once` has your attention degrading, this one has the clock and the bill.
It may not grow into `steering`'s two-contexts-two-bills argument or into `goals`'s window ceiling.
Long and expensive, kept for walled-off work that has to come back good, and it stops there. The
paragraph under it is the other half of the trade and is the only place in the unit crediting an
arrangement with the quality of what it hands back. Keep the pair: the warning alone reads as a
reason not to use it.

Three boundaries hold the unit up and every one of them is another unit a second time, so each is a
link and a clause rather than a paragraph. **`steering` owns the mid-run window**,
which is what `one-agent-time.1` points at instead of describing interrupting. **`goals` owns the long-running outcome**, so `interactive-agent-background.3` says the jobs
behind you are goals rather than instructions and hands off. The agents-are-two-bills line lives on the worktree slide's note and
nowhere in the prose.

**`A worktree each` is this unit's since October 2026**, moved from `steering` at the owner's asking:
running several agents at once is this unit's subject, and correcting one running agent is
`steering`'s. It sits right after `Many agents at once`, whose `.2` now points at "the next section"
instead of linking back four units. `steering`'s card lost its worktree move with it, because this
unit has no card. It is **not** a second telling of `goals`. `goals` argues one worktree as isolation
from your own day, so a four-hour run does not make your branch unusable; this section argues one
worktree *per agent*, so several run at once without colliding, because the waiting overlaps, and
it ends on a separate agent merging the branches.

The two-contexts-two-bills cost stays on the worktree slide's note, not in the prose. **The section is a `data-assistant` pair since October
2026**, at the owner's asking, because both products now make the worktree themselves: Claude Code
with `claude --worktree <name>` (a new branch `worktree-<name>` under `.claude/worktrees/`, checked
against code.claude.com/docs/en/worktrees), Copilot in IntelliJ by picking Worktree beside the Copilot
agent in a new chat (the choice is greyed out once a chat has started). Rehearsed on 13 October
2026: the worktree lands in `<repo>.worktrees/copilot-worktree-<timestamp>-<id>` on a
`copilot/worktree-...` branch, approvals are **not** forced (it still asked Allow Once or Skip,
which the VS Code docs would have you expect otherwise), and nothing reaches your project until
Apply, which moves the changes in as uncommitted files. The plain `git worktree add` block stays under both, as
the way that works in any tool, and the closing paragraph keeps the caveat that a worktree locks
nothing.

**The definition is this section's alone**, because `parallel` reads before `goals`: a second checkout
of the same repository, on its own branch, in its own folder, sharing the same history.
`goals.own-worktree.1` used to write it out a second time and now names the worktree in half a
sentence and links here. Two arguments, one
definition. Do not let a third site explain what a worktree is.

`WorktreeEach` was redrawn in October 2026, at the owner's asking, as a left-to-right flow: `~/kata`
on main, `git worktree add` making two **separate folders on your disk** with an agent each, a third
agent merging the branches, and `~/kata` on main with both changes. The old drawing (two frames on
one history box, no line between them) read as vague and never showed what the owner cares about
most, that **a separate agent merges the worktrees afterwards**, so the section now ends on that
merge: a paragraph, a copyable merge prompt, and the `git worktree remove` clean-up. The figure says
"separate folders", never "copy", because the history stays shared. **It names the same folders and
branches as the `<pre>` above it**, on the `SkillTree` rule, as literals rather than locale keys,
because a path is not translated. Teal is the two worktrees and the merging agent; the codebase
before and after stays muted.

The warning aside closes `Many agents at once` and it is **step 2's second
`data-variant="warning"`**, `setup`'s being the first and `The builder and the critic`'s the third.
It carries the one cost no other unit states,
**your attention degrading rather than running short**. The collision cost is `steering`'s, and the
paragraph directly above the aside already raises it, so this callout is not spent
on a problem that has just been answered. The cost it does carry is easy to collapse into
`steering`'s "your reading is the bottleneck rather than their speed", and it is not the same claim. `steering` says reading is slower
than producing; this says the tenth diff of the afternoon gets a worse read than the first did. Keep
them apart, or the step loses the only place it says an agent can hand you more than you can stay
sharp for.

`AgentsAtOnce` is the figure and **closes the unit rather than opening it**, which is
`WorkflowWeights`'s placement decision made again: it names all five arrangements, so under the
first heading it would put four labels in front of a reader who has not been given them. Nothing
below it reads it back, so its row names and its right-hand notes carry the comparison, the way
`ScriptRuns` puts what each row produces on the right instead of into prose. **Teal is the agent you
are actually watching**, and that is the only colour rule in it. The dash carries the rest: solid
means somebody has the wire, dashed means nobody does. So row two is four dashed wires and no teal at
all, which is the sentence the paragraph above the figure makes, that nobody reads four runs as they
happen. It borrows `flow.node.you` and `flow.node.agent` from
`FlowDiagram` rather than declaring its own words, so the two figures name the same boxes and a
rewording moves both.

**Rows two and three are the pair the figure exists for**, and two things keep them a pair. They run
**the same number of agents**, so the comparison is about who holds the wires and not about volume,
and the orchestrator's extra box sits at `LEAD_X` in the gap between `you` and the agent column every
row shares, so the drawing says what an orchestrator is: a hop inserted between you and the work.
Its sub-agents are **muted but solid** rather than dashed, which is the one place the colour rule
needs reading carefully: dashed means nobody is watching, and here somebody is, just not you. That is
what makes the last row different from row three at a glance. Changing the sub-agent count, or
dashing them, ends both arguments.

**Row four is the pair, and it is the one row where the grammar splits inside a row.** The wire from
`you` is dashed because you walked away; the wire between the two agents is solid because they are
holding each other. That is what `feedState` is for and its only caller. Its two boxes are the only
ones in the figure that are not called `agent`, since a pair of boxes with one word on both of them
says nothing about which end criticises, and its link is the only wire in the figure with an
arrowhead: every other one runs left to right and needs no head to say so, while this one running
both ways is what makes the pair a loop rather than two agents standing near each other. The two
are stacked rather than set side by side because a third column of boxes pushes the longest Dutch
note off the viewBox, and the notes have to stay in one column. `AgentsAtOnce`'s own docblock
carries the geometry.

The figure grew by about a quarter when that row landed, so **`deck-step2-parallel-arrangements`
came down from `scale` 1.02 to 0.78**. That number is measured against the footer rather than
chosen, so a sixth row moves it again.

`goals` was **`Goal-oriented`, then `Long-running goals and cost`, and is now `Long runs`**. The first
change was a widening rather than a rename. The unit used to argue one thing, handing over an outcome instead of an instruction, and it
now surveys four ways of spending a lot of tokens on purpose: a goal-shaped run, a fan-out under
`ultracode`, research on the frontier model, and a design tool. **The unit id, the URL and the
namespace prefix all stay `goals`**, so nothing that pointed at it moved, and the references from
`parallel`, `workshop` and the flag help texts still read "the goals lesson" the way `patterns` is
referenced by id rather than by title. The old argument is intact and is the first three sections;
what went is `whole-job.3` (the skill sweep, which now closes `most-waiting` as the thing you start
before lunch) and `lead.2`'s middle, since asking why a route was chosen was the paragraph nobody
was going to act on. Its last sentence survives as the close of `goal-oriented.1`, because
`deck.goals.true.2` says the same thing on a slide.

**Context capacity and subscription allowance are distinct.** Goal-shaped work needs useful outcomes,
checks, a budget and a stopping condition. Remaining allowance is an opportunity only when the work
is valuable and the weekly/monthly limits permit it. Do not teach quota exhaustion as the objective.
**The `window-tail` question and `WindowSpend` must hold for a Copilot seat too**, since step 2 has
no assistant variants and the October 2026 class is on Copilot: a seat draws on a monthly pool with
no rolling window. So they say "period" and never "window", name no 5-hour reset and no minutes
left, and the explanation names one limit from each product (a weekly limit, an admin budget). The
question was rewritten in review (October 2026) because it listed every condition for the right
answer, so it now gives only the symptom and `keep-busy` is the trap the unit warns about.

**The check is a section of its own now**, `An executable completion check`, and it still owns the sentence
the capstone is built on: if you cannot name the command that answers yes or no, you do not have a
goal. `enablement.where-day-goes` hands to it and must not restate it.

Four figures, and each is drawn to stay out of another one's argument, which is the constraint to
read before touching any of them. `WindowSpend` illustrates **subscription usage against a period allowance** and is drawn as
columns, never as a band cut into turns, because `LoopsPerHour` in `enablement` owns the band and
owns the clock. Its caption distinguishes allowance from context capacity and requires checking
other limits and budget. `GoalGate` draws the check/repair loop; the enclosing goal also needs a
budget or stopping condition. It plays the loop (October 2026, at the owner's asking): two red
attempts back along the return path and a third that goes green, because the repetition is the
argument, and its first box says what the agent does ("the agent changes the code") since "the
agent's pass" read as nothing in Dutch. The waiting is a
line **inside the gate box** rather than a stretch of time, for the same reason. `ReadEachTime`
draws **what each agent is holding**, one context against five identical copies of it, and never
the arrangement, because `AgentsAtOnce` in `parallel` owns how many agents you have running and what
that costs your attention. It was two bars measuring the bill first, and the boxes replaced them:
the cost is easier to feel as the same three blocks bought again than as a longer bar. That makes it
stacked blocks inside a frame, which is `steering`'s vocabulary, so **the repetition is what keeps
the two apart**: `TwoWindows` and `LoopInWindow` are one window in two states, and this is one
context copied. The three teal blocks are identical in all six boxes and only the left one labels
them. Relabel a copy, resize it or reorder it and the figure stops arguing anything. `ModelRelay` draws **what you spend each tier on and in which order**, never what the
tiers are like, because `ModelTiers` in `step1/model` owns the dispositions. Its two teal arrows are
the figure: they are labelled with what you do, since the reading between the tiers is the part
that cannot be handed over.

`ModelRelay` is also the one dated thing in the step. The prose says "the frontier model", "the top
tier" and "the middle tier" and names no release; the drawing tags its three columns `Fable`, `Opus`
and `Sonnet`, and `research-frontier-model.3` under it is a `<small>` line saying when. That split was
`model.lead.3`'s precedent in step 1 (since cut), and it is what lets the figure be concrete without dating the
unit. The tags are literals rather than locale keys, like every model name in the course.

The frontier tier is the seam worth knowing about: **`step1/model` names it (Fable, Astra) and
links here**, so this section is the only place that says what it is for: a new frontier release is
ahead and sometimes worth its price for hours-long agent sessions, multistep research and
root-cause work, and the top tier catches up later (`.2`, from Anthropic's own coding measurement and
OpenAI's Sol page, 13 October 2026). The step-1 half must not grow use cases of its own.

`Ultracode` is described at the level of what it does to your bill, a fleet fanned out
programmatically, and it stays there on purpose: naming a flag, a menu or a script shape dates the
unit the way `copilot-specific.md` records that Copilot's billing already dated a claim once. It
points at `workflows` for the specs rather than arguing spec-driven a second time.

`Design tools` grounds itself in this repository's own design system, which came out of a Claude
Design project, and that is the only concrete in the section. It is the shortest of the four and
should stay that way: what it adds to the unit is the timing, and the timing is the lead's.

The quiz is the step's second and is in `quiz.ts` beside `workflowsQuiz`. One question per expensive
move that has a wrong branch, so the relay has none, on the same reasoning that leaves spec-driven
out of the `workflows` quiz.

A tenth unit, `workshop`, closes the step as its capstone, and **it is a run rather than a page**.
That is the shape to hold on to before editing anything in it. The page is not five flags described
one after another; it is five stages a student works in order, and the flags fall out of three of
them. The rewrite that made it one is recorded below, along with what the old shape got right, so
nobody restores half of either.

**One rule carries the page, and it is `workshop.lead.1`: the student writes none of the code.** Not
the tests, not the refactor, not the missing method, not the build wiring. What is left for them is
the three things the step spent ten units on, setting the project up, saying what has to be true,
and reading what came back. Nothing enforces it and nothing can, which is the point: it is a
constraint the student holds themselves to, and every stage under it is written as work you hand
over. A move that asks the student to type Java is the one kind of move this page may not grow.

The five stages are `Pre-flight`, `1 goal, 3 flags`, the two inside `2 jobs, neither waits`,
and `Debrief`, with `Collect the flags` and the board between the last two. Four `<h2>`s for five
stages, because the pair shares a section: that is the point of the pair and not a mismatch to tidy.
**The escalation is the argument**: nothing handed over, then one outcome you walk away from, then
two outcomes at once in two worktrees, then a pass that earns nothing. Pre-flight and the debrief
are the stages with no flag, and that absence is deliberate on both ends: the work step 2 actually
teaches is the part no build pays out for.

**The capstone now carries a figure, `RunSheet`, and that reverses a recorded decision.** The old
record said it carried none, on the grounds that any drawing measuring a hundred percent of the
lines against a mutation score hands the student the honest-coverage discovery above the board.
That reasoning is intact and `RunSheet` does not break it: the drawing is the five stages, what you
hand over at each, the command that answers, and how many flags fall out, and it names no gate and
no number. A figure of the *gates* is still forbidden here for exactly the old reason. What the
drawing buys is the thing prose could not: **in guided mode every run of prose is dropped**, and
before this the class was left with a heading, a board and no capstone at all.

Six things inside it are load bearing, and four of them were arrived at by cutting a worse version.
**A border means containment and nothing else, so only the third stage has one.** Stages one, two and
four are rows on the figure's own ground, and the stage that holds two jobs is a frame around them,
which is `FlowDiagram`'s rule from `workflows` (the project is always a frame, never a box) applied
here. Boxing all four made the frame read as the tall row rather than as the one stage holding
others, and that was most of what made the drawing read as a table with a picture in it.

**The third stage is a frame with the two jobs inside it, and that frame is the drawing**:
one stage holding two boxes is what "at once" looks like, and it is `FlowDiagram`'s own vocabulary
from `workflows`, where the project is always a frame and what changes is what sits inside. Two
versions failed here and neither may come back. The first indented the pair under a teal hairline,
which reads as subordination and rests the argument on a 1.7:1 rule. The second put them in a bare
two-column grid whose gap matched the column gap, so nothing said they shared a slot, and under `sm`
they stacked into a list, which is why a side-by-side comparison in this step is one SVG or one frame. The frame survives
stacking, which is the whole reason it is a frame.

**The stage numbers are the page's `<h2>`s and stop at four**, with the two jobs named and unnumbered
because they are one stage, and the stage names are the headings word for word so the map and the
page cannot drift. `The board` gets no row on purpose: it is not a stage, it is where three of them
pay out, which is what the pips say. **Teal is a flag collected and nothing else is teal**: structure
is geometry, colour is progress, which is what lets that rule hold once the numerals are muted and
the pair's grouping is a plain frame. Pips sit on a stage and never on a job, so flags are counted at
one level, and the two unpaid stages say `no flag` in words rather than showing empty pips, which
would read as a stage the student failed. **The pips are live**, filling as the board below turns
green; `FLAGS_CHANGED_EVENT` on `FlagBoard` carries it, the figure reads the board's key and writes
nothing, and `live={false}` on the slide keeps a tutor's own collection off the projector.

**Each stage names the units it draws on**, which is what makes the page a capstone rather than a
sixth exercise: between them they name all nine, beside the stage where each is used. **Every chip
has to be a unit the stage genuinely runs.** Three were cut for failing that: `evolution` on the
native row, whose lesson that stage suspends; `enablement` on the endpoint row, which was one `curl`;
and `evolution` again on the goal row, where it was crediting that unit for a sentence `goals` wrote.
The last `evolution` chip, on the pre-flight row, went with the unit in October 2026.
A chip that only looks apt is the next one to go. They are plain text and **not links**: a dozen
router links inside one figure took the first dozen tab stops on the page and would have been a way
out of the deck, so the prose keeps the two links that matter (`goals` in `workshop.goal.1`, `setup`
in `workshop.pre-flight.2`) and the chips do the naming.

**Two ungraded `TaskCard`s now sit in it, `Preflight` and `Debrief`, and that reverses the other
recorded decision.** The old record ruled a card out because the whole page was one instruction set
ending in the board, which was true of the old page and is not true of this one: the run has a stage
before the first flag and a stage after the last, and neither is graded by anything. A page of prose
asking for them is a page a student skips on the way to the goal. What they hold is the step's own
habits made into moves. `Preflight` runs five: see the check answer, put it in `CLAUDE.md`, guard the
gate with a hook, add the `## Gaps` rule, and put the house test style in a skill. Three
of those are `setup`'s and one is `steering`'s. `Debrief` runs four. The first three are `workflows` (the
audit turned on the student's own diff, closing its worst row rather than filing it), `enablement`
(count where the afternoon went) and `patterns`; the fourth, `asked`, is the planted gap's failure
case and `Debrief.tsx` says why.

**The hook is the move worth defending.** `gates.quality-gates.3` describes exactly it, a hook that
runs before every edit and shell command and refuses anything touching the gate, and nothing in the
step ever asked a student to write one, so this is the only place in the course where they do.
Having the `CLAUDE.md` line *and* the hook on one card is the pair `setup.hooks.2` argues, a line
that asks beside a script that happens, and not a duplication to trim.

**It was a Stop hook running `mvn verify` until October 2026, and the swap is the decision.** That
hook could not be one exercise: Copilot CLI treats exit code 2 on `agentStop` as a warning and blocks
only on `{"decision":"block"}`, VS Code's format differs again, and the IntelliJ plugin has no stop
event at all (its hooks preview offers `userPromptSubmitted`, `preToolUse`, `postToolUse` and
`errorOccurred`). A pre-tool hook exists in all four, and exit code 2 denies the call in each, so the
move and the `gates` paragraph are one shared text with no assistant split. It also argues
`quality-gates.1` directly: an agent hits the number it is given, and this guard stops it lowering the bar
instead of meeting it. Sources, read October 2026:
[Copilot hooks reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-hooks-reference),
[VS Code hooks reference](https://code.visualstudio.com/docs/agents/reference/hooks-reference),
[JetBrains changelog](https://github.blog/changelog/2026-03-11-major-agentic-capabilities-improvements-in-github-copilot-for-jetbrains-ides/).

**What the guard covers was measured, not reasoned**, in live runs of Claude Code 2.1.292 and Copilot
CLI 1.0.92 against a copy of `exercises/step2/java`, with the agent told to lower the floor by any means.
Each line of the move closed a hole a run found:
- **The card and `gates.quality-gates.3` guard different things, on purpose.** The unit's hook
  refuses a call that *lowers a threshold*, because in a real project `pom.xml` also carries
  dependencies and a hook on the whole file blocks adding one (the owner's objection, October 2026).
  The card keeps refusing anything that touches `pom.xml`: in this project the thresholds are not in
  it at all, and what it holds is what gets measured (JaCoCo's excludes, PIT's target classes), so a
  "lowers a threshold" rule would let an extra exclude through. The workshop needs no new
  dependency. Do not narrow the card to match the unit.
- **The thresholds are not only in `pom.xml`.** `COVERAGE_FLOOR` and `MUTATION_FLOOR` are constants in
  `grading/FlagRevealIT.java`, so the move names the grading package. `COVERAGE_FLOOR` is the
  constant the move tells the student to try.
- **Edit tools alone are not enough.** Blocked on its edit tool, the agent changed the floor with
  `sed`, so the hook covers shell commands too.
- **The hook has to guard itself.** The next run switched the hook off by editing
  `.claude/settings.json`, so the move names the hook's own files.
- **Match the tool's arguments, never the whole payload.** Claude Code's payload carries
  `transcript_path` under `~/.claude/`, so a guard that greps all of stdin for `.claude` blocks every
  call. Read `tool_input` in Claude Code and `toolArgs` in Copilot CLI, which arrived as an object
  rather than the JSON string its docs show.
- **Copilot CLI edits with `apply_patch`**, whose body carries the path, so a matcher of `edit`
  alone misses every edit. And it **only loads repository hooks in a trusted folder**: interactive
  runs ask on first start, while a `-p` run in an untrusted folder skips them without a word.

With all of that in place, normal work (an edit to `Loan.java`, an `mvn` run) went through in both,
and every attempt on the floor was refused. **It is a deny-list and the paragraph says so** ("a hook does
not catch every way around it", reworded from "a fence, not a proof" in October 2026, and since then
pointing at a CI check that no threshold is lower than on `main` as what holds before merge): a script that assembles the filename from pieces gets past it, which is why the build
before merge stays required. Do not let the move or the paragraph claim the guard is airtight.

**The `skill` move is `setup`'s and not `patterns`'s, and the wording is what keeps it so.** It asks
for the convention this project already uses, which is writing down a decision somebody already made.
Asking for a skill in anticipation of a correction would contradict `setup.skills.5` and
`patterns.lead.1` in the same breath, and an earlier draft of the card did exactly that.

**The `## Gaps` move has something to catch, and what it catches is planted.** A standing rule
nothing ever triggers is a rule a student writes down and never sees work, which is what the
capstone was missing: `steering`'s in-flight moves belong to its own card, but the gap rule is
written here and had nothing to fire on, because nothing in the graded path was undecided.
`MemberTier.PARTNER` is what fixes that. It is a fifth constant with a Javadoc saying partners lend
on a rate negotiated with the partner rather than the public one, **and that the arrangement is not
written down in this repository**. It adds no branch to `assess`, so the coverage floor, the
complexity ceiling and the mutation score are all untouched, and no test names it. What it does is
put a cell in the tier table an agent cannot fill honestly: the code answers (no grace, no
discount, capped), the Javadoc says that answer is the wrong rate, and nothing reconciles them. An
agent with the rule stops and asks. An agent without it asserts the accidental behaviour and moves
on, which is the whole demonstration.

**Do not resolve it, and do not name it anywhere a student's agent reads.** Not in
`exercises/step2/java/CLAUDE.md`, not in the `domain` package's briefing, not in a test, and not in the
`workshop` prose or a board hint. It is documented here for the same reason step 1's flag design is
documented on this side: a file under `exercises/step2/java/` is one a student's agent opens on its own,
and a note there hands the exercise over before the first prompt. The page sets it up by asking for
the rule and stops.

**The `skill` move and the `keep` move are one loop and must stay a pair.** Pre-flight opens the
skill from what the project already decided, the run gives it an afternoon of corrections, and the
debrief writes those back into it. That is `patterns`'s skill iteration performed across a capstone
instead of described in a section, and it is the only place in the course where a student runs both
halves of it. Cut either move and the other is a chore. The card descriptions carry a second small
loop of the same kind: `set-up-first.description` tells the student to note the time they start,
which is the only thing that makes `look-at-afternoon`'s `count` move answerable.

**Pre-flight's `red` move is the one to defend hardest.** Running `mvn verify -Pgraded` once on the
untouched module prints three locked rows with the numbers the student is short of, measured and
verified: `39.0% >= 90.0%`, `worst method 21 <= 10`, `42.4% >= 80.0%`. (The first of those was 38.2%
before `MemberTier.PARTNER` landed: a new enum constant is a covered line in `<clinit>`. The gate is
untouched, the printed number is not, so re-measure it here rather than trusting this sentence.) That output is a better brief
than the page could write, and having the machine give it means the check runs end to end before
any work exists. It is also what lets the prose
stop describing the gates one by one, which is most of where the page's word count went.

The prose is 1170 words down to about 640, and **the per-flag detail moved onto the board rather
than being cut**, so the honest figure for what a student reads is nearer a third off than a half:
about 270 words moved into the card labels, the row hints and the help dialogs. Each flag's `hint` says what earns it and each `help` dialog says how to hand it over
and which unit argues that shape. That is the trade the rewrite is built on: a student reading the
page sees the run, and a student stuck on one row opens that row. Do not move the detail back into
prose; the page is short because the board is doing the work.

**The figure carries every command the page issues, `cd`s included, and that is a requirement
rather than a nicety.** Guided mode drops every `<pre>` along with the prose, so a command that is
only in a `<pre>` is a command a class cannot see. The `cd`s are the part that is easy to think is
navigation and is not: `cd ../../..` decides whether the worktrees land beside the repository or
inside it, and the two job `cd`s are the only thing making "one worktree each" true rather than two
builds in one `target/`. A version of the figure that left them out put both of those bugs back for
the one audience with no paragraph to fall back on. Add a command to this page and it goes in
`RunSheet` too, or the class loses it.

**Still no quiz, and the old reasoning stands unchanged.** Five hash-checked flags already grade the
work, so a question would grade whether the page was read.

Everything the machine does is unchanged by the rewrite, on purpose. The same five flags, the same
salted hashes in `flags.ts`, the same `graded` and `challenge` profiles, the same endpoint and the
same native image. The revision was about how the work is handed over, which is what step 2 is about,
and re-cutting the Java would have thrown away the one part of the step a machine can grade to buy
nothing.

It ships a small loans domain in `exercises/step2/java` that is green but un-hardened, and a `graded`
Maven profile that measures it against three goals: a coverage floor, a complexity ceiling and
honest (mutation-tested) coverage. `mvn verify -Pgraded` prints a leetspoken flag for each goal met
and fails until all three are. The student hardens the module (that is the exercise, so do not ship
the tests or the refactor), reads the flags, and pastes them into the `workshop` flag board.

The board carries a **fourth flag of a different shape**. The first three sharpen code that already
runs; this one is functionality that does not exist yet. `MemberStatements.forTier` ships
unimplemented, so `GET /api/loans/statement/{tier}` answers with a 500, and the only description of
what it should do is a set of `@Tag("challenge")` tests. They are excluded from the default build and
run with `mvn test -Pchallenge`, red until the method is written. The unit tells the student to plan
it in plan mode against the failing tests before implementing. Once the tests pass the live endpoint
returns the code, which goes into the board like the others. **Do not implement `forTier`**: that is
the exercise.

The board carries a **fifth flag of yet another shape**: not a profile and not the JVM, but a compiled
native image, and it is built to resist a one-shot so the student has to plan it. The seam is
`step2/aot/NativeImageFlag`, an `ApplicationRunner` that prints only when `NativeDetector.inNativeImage()`
is true, so `mvn spring-boot:run` and `mvn test` stay silent and the flag is proof of a native image.
Its payload is a classpath resource rather than a Java constant, so an image built without thinking
about resources starts, cannot find it, and prints a miss instead of the code. **One thing stands between the student and the flag, and it is not the build.**
`spring-boot-starter-parent:4.1.0` ships its own `native` profile, so `mvn -Pnative native:compile`
compiles this project with no pom change at all: verified on GraalVM 25.0.3, under a minute, and the
binary starts and prints the miss. What is left is reading that runtime miss as the spec for the fix,
which is the plan-worthy step the unit tells them to work in plan mode. `workshop.side-by-side.3`
carries that whole argument in one paragraph now, and it is where the correction to the old
`workshop.native.1` and `.2` (which claimed the wiring was the student's) survives.

**Those two flags are the pair the `two-jobs` stage exists for**, and the reason they may be run at
once is genuine rather than staged: the challenge lives in `application/usecases/` and `adapter/incoming/web/`, the image lives
in the build and `aot/`, and neither job touches the other's files. What they cannot share is a
folder, because two Maven builds in one `target/` fight over it, and **that is the one concrete
reason the worktrees are needed here**, so the paragraph states it rather than asserting isolation in
the abstract. If a future exercise makes the two jobs overlap, the stage loses its argument and the
side-by-side row in `RunSheet` goes with it. The cost the stage closes on is `steering`'s, two diffs
arriving together and your reading being the bottleneck, and it is deliberately half a sentence
rather than an argument: `steering` owns it, and `parallel`'s aside owns the attention half.

**Three things about the commands in that stage are load bearing, and each of them was a bug
first.** The `git` lines are the one exception to "every command runs from `exercises/step2/java`", and
the page says so: left unqualified they resolve to `exercises/step2/kata-statement`, which plants two full
checkouts of this repository inside the working tree. So the worktree `<pre>` runs `cd ../../..` and
stops there, and **each job's own `<pre>` opens with its own `cd` from the repository root**, because
a single trailing `cd` put both jobs in the statement worktree and straight back into the one
`target/` the paragraph above had just said they could not share. And the native binary starts with
`SERVER_PORT=8081`, because it is a Boot web app and the statement job is holding 8082 while it runs;
the page tells the student to run these two at once, so the collision is the page's to prevent. It is
an environment prefix rather than `--server.port=8081` for a reason that is only visible on screen:
a browser takes a line break after a hyphen, and the flag split across two lines in the middle of
`RunSheet`. `parallel.worktree-each`'s identical `<pre>` needs none of this, because that unit never
says where the reader is standing.

There used to be a third obstacle on the native flag, and it is worth knowing why it went. Step 1 and
step 2 once shared one Maven module, so the Boot plugin pinned `<mainClass>` to `Step1Application`
and a naive native build compiled the wrong step; aiming it at step 2 was an obstacle in its own
right. Splitting the steps into their own projects removed it, since `exercises/step2/java` holds one main
class and the build finds it. **If the exercise wants a third obstacle back, it needs a new one
rather than that sentence.**

**Do not add a `native` profile to `exercises/step2/java/pom.xml`, and do not write the resource hint or a
`RuntimeHintsRegistrar`**: wiring the build and planning the hint are the exercise. Do not spell out
the fix here either; the runtime miss is what the student is meant to read.

**`goals` closes by naming this unit back**, at the end of `goals.left-with.1`, which is the last
paragraph of that unit. What is load bearing is the pair rather than its address, so a rewrite of
either end has to leave the other pointing at something. The other end moved in this rewrite:
`workshop.lead.1` is now the house rule and names no unit, and the pointers it used to carry are the
`RunSheet` chips.

The section keys were renamed with the sections, so anything written against the old page is looking
for keys that are gone: `workshop.goals.*`, `workshop.honest.*`, `workshop.build.*` and
`workshop.native.*` are now `workshop.pre-flight.*`, `workshop.goal.*` and `workshop.two-jobs.*`, and
`workshop.collect.2` is `workshop.debrief.2`. The self aside moved with them, from the end of the
page to the end of `two-jobs`, which is where a stuck student actually is, and it now gives a move
the page does not already give (narrow the goal to the one number you are short of) rather than
repeating `goals`. The two cards' own key families are `set-up-first.*` and `look-at-afternoon.*`,
named for the task rather than for the section, on the rule every other card in the course follows:
prefixes matching the `<h2>` above them printed the heading twice in guided mode, where the prose is
gone and the card's title is all that is left.

The deck gained two slides in the same change, `deck-step2-workshop-rule` (the house rule, as a
statement) and `deck-step2-workshop-sheet` (`RunSheet` at 1.03, height-fitted). **`RunSheet` is the only workshop
element that may go on a slide**, and the reason is the deck's own rule: the board and both cards
write to localStorage, so on a projector they would tick the tutor's machine. The drawing stores
nothing.


## Accuracy constraints after PR #1 integration

The setup permissions task uses a disposable folder and dummy files. It is registered as an inline
figure so guided mode retains its instructions. Never run this practice task against student flags,
credentials or real project files.

**The section was `Permissions and sandboxing` and is now `settings.json` (Claude) and `Permissions`
(Copilot)**, rewritten at the owner's asking (11 October 2026), who could not tell from the old
text what a sandbox was. Keys moved from `setup.permissions-sandbox.*` to `setup.settings.*`. It
now teaches the settings file and its `permissions` key, plus `model` and `env` for Claude, and the
sandbox gets one shared paragraph (`settings.3`) saying what it is: permissions cover the agent's
tools, and only an OS-level fence stops a script that opens a file itself. The old opener about a
starting directory and a worktree not restricting capability went with it. **The card tests
permissions, not the sandbox**, and its shell probe is still the part that teaches the limit:
Claude's uses a Node script, because a `Read` deny also catches `cat`, while Copilot's uses `head`,
because a `read(...)` rule does not cover the shell at all. Both were run (Claude Code in default
mode: the `Read` deny refused Read and `cat`, Node and an unlisted `cp` came back "This command
requires approval"; an `allow` entry is ignored until the folder is trusted, hence the trust step). In the owner's own interactive run the agent refused the Node read by itself, naming the deny
rule, so `explain.claude` says the agent often refuses and otherwise you are asked, and that either
way a judgement stopped it rather than the rule. That is `hooks.2`'s probabilistic-against-
deterministic point met in practice; do not word the move as if the rule blocked it.
**Copilot cannot commit tool permissions**, and the paragraph says so rather than inventing a
counterpart: `.github/copilot/settings.json` rejects `permissions.*`, the CLI flags last one
session, and IntelliJ's Auto Approve list is global and can only allow or ask. The committed
refusal is a `preToolUse` hook. A Claude-only `<pre>` under `settings.2.claude` shows the file whole
(owner's asking): one rule each for `allow`, `ask` and `deny`, plus `model` and `env`, all keys from
the settings reference. Copilot gets no counterpart, because its committed file cannot hold the one
key the section is about; the card's start command is its example. The research behind every Copilot sentence is under "Setup files" in
`copilot-specific.md`; read it before changing one.

The builder/critic prompt stops after 3 rounds or a blocking decision and returns evidence for human
review. Do not substitute interval `/loop` scheduling for that condition-driven instruction.
