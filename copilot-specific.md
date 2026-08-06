# Copilot-specific notes

Reference material for whoever maintains the GitHub Copilot side of the course, which is every step
but step 2. Steps 0 and 1 are nearly all of it; step 3's share is two filename pairs. It is **not
student-facing**: nothing here is rendered, and prose that belongs on a page belongs in that unit's
HTML instead. What it holds is the product detail behind the `data-assistant="copilot"` blocks, the
things the course deliberately leaves out, and the facts most likely to rot.

**Everything below was read from GitHub's own documentation on 28 July 2026.** Sources are linked at
the foot. Copilot moves faster than this repository does, so treat any number here as dated and
re-read the source before writing it into a unit.

The course's Copilot side assumes **Copilot CLI**, the terminal one. That decision is recorded in
`front/src/steps/CLAUDE.md`, and it is what makes step 1's exercises run unchanged for both
assistants.

## Billing, which is the part that moved

**This changed under us on 1 June 2026 and the old model is still all over the web.** Copilot went
to **usage-based billing**. Premium requests and per-model multipliers are **legacy**: they now apply
only to Pro and Pro+ subscribers on an existing *annual* plan, until that plan expires. Anything you
read about "premium requests" or "a multiplier of 13" is describing the old world unless it says
otherwise.

What holds now:

- A plan includes a monthly allotment of **GitHub AI Credits**, and **1 credit is $0.01**.
- Credits are consumed **by tokens**: input, output and cached, at each model's own published rates.
  So the unit of billing is the same unit step 1 spends eight pages teaching.
- The allotment is base credits (1:1 with the subscription price, fixed) plus a **flex allotment**
  on top, which GitHub says will move over time as model pricing does.
- **Unused credits are forfeited.** They do not carry into the next month.
- **Code completions and Next Edit suggestions consume no credits** on any paid plan. The agent work
  is what spends.
- The same rates apply across the IDE, github.com and the CLI.

| Plan | Price | Base | Flex | Total included | Credits |
| --- | --- | --- | --- | --- | --- |
| Pro | $10/mo | $10 | $5 | $15 | 1,500 |
| Pro+ | $39/mo | $39 | $31 | $70 | 7,000 |
| Max | $100/mo | $100 | $100 | $200 | 20,000 |

Run out and you upgrade, pay for more usage on the same plan, or wait for the reset. Organisations
and enterprises can set per-user budgets.

**Why this matters to the course rather than just to the reader's wallet.** Under the old model a
Copilot student was billed in requests, and the whole token argument in `tokens`, `context` and
`model` was true but invisible to them. Under credits-by-token it is not just true, it is the thing
on their invoice: a long window costs more, cached tokens are cheaper and still counted, and
`ModelPricing`'s per-million-token rates are the right shape of number. `model.api-vs-subscription.3`
was rewritten for this and says it without naming a figure, because that section carries no currency
by design.

## Models

One seat, many models. The picker spans vendors rather than one provider's family, which is why
`model.api-vs-subscription.2` splits: the sentence about a subscription buying you into one
program is true of the arrangement the Claude reader has and false of a Copilot seat. In the CLI the
command is `/model`. The three tiers step 1 teaches (a top, a middle and a small model) all exist in
that list under other names, which is the reason `ModelTiers` and `PickTheTier` did not need a
variant: they teach dispositions, not product names.

## Custom instructions

Copilot CLI reads, and **combines**, all of these:

```
$HOME/.copilot/copilot-instructions.md
$HOME/.copilot/instructions/**/*.instructions.md
.github/copilot-instructions.md
.github/instructions/**/*.instructions.md
AGENTS.md
CLAUDE.md          (and .claude/CLAUDE.md)
GEMINI.md
```

Two things worth knowing that the course does not say. There is **no documented precedence** between
them, they are merged. And **an edit does not take effect in the running session**: you exit and
resume (`copilot --continue`) or start a new one. That second one is a genuine gotcha for
`SurviveTheClear`, whose third move is to clear the session anyway, so the exercise happens to
survive it.

The course names `.github/copilot-instructions.md` and nothing else, on purpose. It is the
repository-wide file, it is the closest counterpart to `CLAUDE.md`, and a student who is shown seven
paths learns none of them. Note the irony worth not putting on a page: Copilot CLI reads `CLAUDE.md`
too.

## Context

`/context` is the same command in both assistants, which is why `ReadYourWindow` needed no variant
at all. The Copilot readout is grouped by origin and names: **System Prompt, Custom Instructions,
System Tools, MCP Tools, Messages, Free Space, Buffer**. That is step 1's four layers plus the
headroom, and `tools.read-your-window.1.copilot` now lists all seven **in those words and in that
order**, rather than paraphrasing them in lowercase and dropping Buffer. They are the labels on the
reader's own screen, so a rewording that tidies them costs the paragraph its whole point.

`/usage` is the other one, and the course does not mention it: it prints **AI credits used in the
current session**, the session duration, lines of code edited, and a token breakdown. See the
candidates section.

Compaction is automatic. Copilot CLI starts compacting in the background at about **80%** of the
window and pauses at about **95%**, producing a structured summary of goals, what was done, key
technical details, important files and next steps. `session`'s compaction argument holds as written
for both assistants, which is why it carries no variant.

`/clear` exists and does what the course says.

## MCP

```
copilot mcp add SERVER-NAME -- COMMAND [ARGS...]           # local, stdio
copilot mcp add --transport http SERVER-NAME URL           # remote
```

Flags include `--env`, `--header`, `--transport`, `--tools`, `--timeout`. Configuration lands in
`~/.copilot/mcp-config.json`, and `COPILOT_HOME` moves that directory. In-session management is
`/mcp` with `list`, `show`, `add`, `edit`, `delete`, `disable`, `enable`, `auth`, `reload` and
`search`; `/mcp search` browses the GitHub MCP Registry and installs from it.

Two facts the course could use and does not:

- **The GitHub MCP server is built in** and available with no configuration. So a Copilot student's
  window already carries a set of MCP tool descriptions before they connect anything. This is now
  in the course: `tools.list-itself-window.2.copilot` is that reader's version of "the list itself
  is in the window", since the Claude half tells them to connect five servers and count from zero.
  The `ReadYourWindow` task still needs no variant, because its first and last moves compare a
  reading with and without the server *they* added.
- MCP prompts are documented as reachable under a slash as `/mcp.servername.promptname`, **for
  Copilot generally**. The Copilot CLI command reference lists 40-odd slash commands and none of
  them is a prompt (re-read 30 July 2026), so `tools.mcp-servers.3.copilot` no longer claims
  it: it names `/mcp`, which the CLI does document, and says that surfacing a server's prompts is
  the harness's call. Absent from a reference is not the same as absent from the product, so if you
  see one under a slash in a real session, that sentence goes back.

## Reasoning level (checked August 2026)

Both products have the dial, and only one of them publishes a stable set of names for it.

**Claude Code** calls it the effort level. It takes `low`, `medium`, `high` or `xhigh`, is set with
`/effort` in a session, persists to `settings.json` as `effortLevel`, and is overridden for one
session by `--effort` or `CLAUDE_CODE_EFFORT_LEVEL`. Read off `code.claude.com/docs/en/settings`.

**Copilot CLI** exposes a Thinking Effort submenu on models that reason, so the levels on offer
depend on which model is picked rather than on the CLI. There is no documented CLI-wide scale to
name.

So `prompt.reasoning-level.1` scopes its clause ("In Claude Code it runs from low up to xhigh")
rather than splitting on `data-assistant`: a Copilot reader is told nothing untrue by a sentence that
names the product it is about. The step said "low up to max" before this was checked, and that was
wrong.

## Plan mode

Copilot CLI has one: `/plan`, or Shift+Tab to cycle in and out. It explores and asks clarifying
questions, is **blocked from editing files** while planning, writes the plan to `plan.md` in the
session folder, and waits for approval. `prompt`'s plan-mode section and `CutItUp`'s fourth move
therefore hold for both assistants without a variant. `CutItUp` asks for the plan in
`plan-solve.md`, which is a path the student names, so nothing about it is Claude-specific.

## Sessions, approvals, and the rest of the surface

`copilot` starts in the current folder and asks whether to trust it. `copilot --continue` resumes
the most recent local session, `/resume` picks an older one. Tool use is approved per call, or for
the rest of the session. Copilot CLI also has **skills** and **hooks**, which is step 2 territory
rather than step 1's, and step 2 has not been adapted.

**Esc and Ctrl+C are not the same key here, and step 2 assumes they are.** Read off
docs.github.com/en/copilot/concepts/agents/copilot-cli/cancel-and-roll-back, 6 August 2026: a single
Esc gives "more gradual, staged control", the running operation "is canceled only if you press Esc
again within half a second", and while prompts are queued "pressing Esc again removes the most
recently queued prompt". Ctrl+C "acts immediately, without a confirming second press". So for a
Copilot CLI reader with a prompt queued, which is exactly what `steering.mid-flight.2` has them do
one paragraph earlier, Escape removes the queued sentence rather than stopping the run.
`steering.mid-flight.1` and `steer.escape.label` are therefore step 2's first genuine
`data-assistant` candidates. **No pair has been introduced**, because step 2 is the one step not
written for two assistants (`front/src/steps/CLAUDE.md`) and splitting a block here is a step-wide
decision rather than a unit's.

Three surfaces exist and they are not interchangeable: the **CLI** (what the course assumes), **VS
Code agent mode** (MCP through `.vscode/mcp.json`, a new chat rather than `/clear`, no `/context` to
run), and the **coding agent** on github.com. If the course is ever pointed at the editor instead,
`tools`, `session` and `model` are the units that need revisiting.

## Candidates for the units, not yet written

Ranked by how much they would add against how much prose they cost:

1. **`/usage` in `ReadYourWindow` or beside it.** Step 1 teaches that a window costs money and can
   only show the student tokens. `/usage` puts credits on the screen for the session they just ran,
   which is the closest the course could get to closing the loop between the window and the bill.
   The cost is one move on a task card, or one sentence.
2. **The instructions-file reload caveat**, if `session`'s exercise ever stops clearing the session.
   Today the clear hides it.

None of these are errors. They are things a Copilot student would benefit from and can currently
only learn elsewhere.

## What is verified, and what is not

Verified against the linked pages on 28 July 2026: the billing change and every number in the table,
the credit-to-token mechanics, code completions being excluded, the instructions file list and the
reload requirement, `/context`'s field names, the compaction thresholds, `copilot mcp add` syntax and
config path, the `/mcp` subcommands, plan mode, `/usage`'s output, and the built-in GitHub MCP
server. Re-read on 30 July 2026 when `tools` was adapted: `/context`'s seven field names and their
order, and the CLI's full slash-command list.

Not verified: whether **Copilot CLI specifically** exposes MCP prompts under a slash (documented for
Copilot, absent from the CLI's own command reference, which is why the unit stopped claiming it),
and how long the flex allotments in the table hold, since GitHub says outright that they will move.

## Sources

- [Usage-based billing for individuals](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/prepare-for-your-move-to-usage-based-billing)
- [Flex allotments and the Max plan](https://github.blog/news-insights/company-news/github-copilot-individual-plans-introducing-flex-allotments-in-pro-and-pro-and-a-new-max-plan/)
- [Updates to Copilot billing and plans, 1 June 2026](https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/)
- [Request-based billing (legacy)](https://docs.github.com/en/billing/concepts/product-billing/github-copilot-premium-requests)
- [Managing context in Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/context-management)
- [Using Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview)
- [Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
- [Adding MCP servers for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers)
- [Custom instructions for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
- [Plan before you build](https://github.blog/changelog/2026-01-21-github-copilot-cli-plan-before-you-build-steer-as-you-go/)
