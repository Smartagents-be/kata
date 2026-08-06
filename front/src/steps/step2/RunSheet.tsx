import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/utils'
import { FLAGS_CHANGED_EVENT } from './FlagBoard'
import { FLAGS_STORAGE_KEY, flags } from './flags'

/**
 * The capstone as one drawing: four stages down the page, what you hand over at each, the commands
 * that answer, and the flags each one pays out. It opens the `workshop` unit and is read forwards,
 * because the page under it works these stages in order.
 *
 * **A border means containment and nothing else, so only the third stage has one.** Stages one, two
 * and four are rows on the figure's own ground; the stage that holds two jobs is a frame around
 * them. That is `FlowDiagram`'s rule from `workflows` applied here (the project is always a frame,
 * never a box), and it lets the drawing say "three steps and one container" without a word. Boxing
 * all four made the frame read as the tall row rather than as the one stage holding others, which is
 * most of what made the whole thing read as a table.
 *
 * **The third stage is a frame with two jobs inside it, and that frame is the drawing.** One stage
 * holding two boxes is what "at once" looks like; a list cannot say it and neither can a paragraph.
 * It is the same vocabulary `FlowDiagram` uses in `workflows`, where the project is always a frame
 * and what changes is what sits inside it. Two earlier versions failed here and neither may come
 * back: the first indented the pair under a teal hairline, which reads as subordination and rests
 * the argument on a 1.7:1 rule, and the second put them in a bare two-column grid whose gap matched
 * the column gap, so nothing said they shared a slot and below `sm` they stacked into a plain list.
 * The frame survives stacking, which is the whole reason it is a frame.
 *
 * **The stage numbers are the page's `<h2>`s and stop at four.** The two jobs carry names and no
 * numbers, because they are one stage, and the stage names are the headings word for word so the map
 * and the page cannot drift. `The board` gets no row on purpose: it is not a stage, it is where three
 * of these stages pay out, which is what the pips already say.
 *
 * **Teal is a flag collected, and nothing else is teal.** Structure is geometry and colour is
 * progress. Pips sit on the stage and never on a job, so flags are counted at one level; the two
 * stages that pay none say `no flag` in words rather than showing empty pips, which would read as a
 * row the student failed. That absence is the second argument: the work step 2 actually teaches is
 * the part no build pays out for.
 *
 * **The pips are live.** Each is a row of the board further down the page, and it fills the moment
 * that row goes green, so the drawing is where the afternoon stands rather than a table of what it
 * will hold. It reads the board's own key and listens for `FLAGS_CHANGED_EVENT`, so it owns no
 * progress and writes none.
 *
 * **Each stage names the units it draws on**, and between them they name all nine. Every chip has to
 * be a unit the stage genuinely runs, which is a rule rather than a decoration: three were cut for
 * failing it. They are plain text and not links, because the sidebar is this app's navigation, a
 * dozen router links here would take the first dozen tab stops on the page, and on a slide they
 * would be a way out of the deck. The prose keeps the two links that matter.
 *
 * **The commands are every command the page issues, `cd`s included.** That is a requirement rather
 * than a nicety: guided mode drops every `<pre>` along with the prose, and the `cd`s are not
 * navigation here. `cd ../../..` is what decides whether the worktrees land beside the repository or
 * inside it, and the two job `cd`s are the only thing making "one worktree each" true rather than
 * two builds in one `target/`. Leaving them out of this drawing put that bug back for the one
 * audience with no paragraph to fall back on. A command added to the page is added here.
 *
 * DOM rather than SVG, on `WorkflowTimeline`'s precedent: the lines wrap themselves in both
 * languages and the frame reflows, which an SVG could not do.
 */
interface Job {
  key: string
  /** Unit ids, read as `<id>.title` from this step's bundle. Named, not linked. */
  units: readonly string[]
  /** The commands that answer, in order. Literals: a command is not translated. */
  checks: readonly string[]
}

interface Stage extends Job {
  /** The board rows this stage pays out, by `flags.ts` id. Empty means it pays none. */
  pays: readonly string[]
  /** The two jobs inside it, when the stage is the frame. */
  jobs?: readonly Job[]
}

const STAGES: readonly Stage[] = [
  {
    key: 'preflight',
    // The briefing, the skill and the hook are `setup`, the `## Gaps` rule is `steering`, and
    // running the check once before anything depends on it is `evolution`: take the step, read what
    // came out, and aim from there rather than from the plan.
    units: ['setup', 'steering', 'evolution'],
    checks: ['cd kata/step2/java', 'mvn verify -Pgraded'],
    pays: [],
  },
  {
    key: 'goal',
    // The outcome and its exit are `goals`; the shape of the fix, small methods behind a gate in the
    // build, is `engineering`.
    units: ['goals', 'engineering'],
    checks: ['mvn verify -Pgraded'],
    pays: ['coverage-floor', 'complexity-ceiling', 'honest-coverage'],
  },
  {
    key: 'pair',
    // The arrangement is `parallel`'s and only `parallel`'s. The label read "At once, one worktree
    // each" for a while, which is `steering`'s claim wearing this unit's chip; the `git` lines under
    // it say the worktree part themselves and need no sentence.
    units: ['parallel'],
    checks: [
      'cd ../../..',
      'git worktree add -b feat/statement ../kata-statement',
      'git worktree add -b feat/native ../kata-native',
    ],
    pays: ['statement-endpoint', 'native-image'],
    jobs: [
      {
        key: 'build',
        units: ['workflows'],
        checks: [
          'cd ../kata-statement/kata/step2/java',
          'mvn test -Pchallenge',
          'mvn spring-boot:run',
          'curl localhost:8080/api/loans/statement/STUDENT',
        ],
      },
      {
        key: 'compile',
        // Planning a build you cannot afford to repeat is `workflows`; minutes a try, spent on
        // purpose, is what `goals` is about from its title down.
        units: ['goals', 'workflows'],
        checks: [
          'cd ../kata-native/kata/step2/java',
          'mvn -Pnative native:compile',
          // Not `--server.port=8081`: a browser takes a line break after a hyphen and split that
          // flag in two inside the drawing. The port itself is load bearing, since the job in the
          // other worktree is holding 8080 while this one starts.
          'SERVER_PORT=8081 ./target/kata-agentic-java-step2',
        ],
      },
    ],
  },
  {
    key: 'debrief',
    units: ['workflows', 'patterns', 'enablement'],
    checks: [],
    pays: [],
  },
]

function readSolved(): Set<string> {
  try {
    const raw = localStorage.getItem(FLAGS_STORAGE_KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

/**
 * `live` is the one prop and it exists for the deck. The pips read a student's own collection, so on
 * a slide a tutor who has done the workshop in that browser would project a half-filled map to the
 * room. It is not the progress-*writing* hazard the deck's rule is about, since this figure writes
 * nothing, but it is the reading half of the same problem.
 */
export function RunSheet({ live = true }: { live?: boolean } = {}) {
  const { t } = useTranslation('step2')
  const [solved, setSolved] = useState<Set<string>>(() => (live ? readSolved() : new Set()))

  // The board is further down the same page, so its own event is what keeps the pips in step; the
  // `storage` event fires in other tabs only and would leave this drawing a reload behind. The
  // `detail` filter is what keeps `setup`'s board, which fires the same event, out of this one.
  useEffect(() => {
    if (!live) {
      return
    }
    function refresh(event: Event) {
      if (event instanceof CustomEvent && event.detail !== FLAGS_STORAGE_KEY) {
        return
      }
      setSolved(readSolved())
    }
    window.addEventListener(FLAGS_CHANGED_EVENT, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(FLAGS_CHANGED_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [live])

  return (
    <figure
      id="run-sheet"
      data-component="RunSheet"
      aria-label={t('run-sheet.description')}
      className="not-prose my-8"
    >
      {/* One list, so the sequence is announced rather than only drawn, and the numbering a reader
          sees is the numbering an assistive technology counts. */}
      <ol id="run-sheet-stages" data-component="RunSheet" className="flex flex-col gap-3">
        {STAGES.map((stage, index) => (
          <li key={stage.key} id={`run-sheet-item-${index}`} data-component="RunSheet">
            <StageBox stage={stage} index={index} solved={solved} />
          </li>
        ))}
      </ol>
    </figure>
  )
}

function StageBox({ stage, index, solved }: { stage: Stage; index: number; solved: Set<string> }) {
  const { t } = useTranslation('step2')
  const collected = stage.pays.filter((id) => solved.has(id)).length
  const state =
    stage.pays.length === 0
      ? 'unpaid'
      : collected === 0
        ? 'open'
        : collected === stage.pays.length
          ? 'complete'
          : 'partial'

  return (
    <div
      id={`run-sheet-stage-${index}`}
      data-component="StageBox"
      data-state={state}
      className={cn('px-4 py-2', stage.jobs && 'bg-muted/30 rounded-xl border py-3')}
    >
      <div
        id={`run-sheet-stage-${index}-heading`}
        data-component="StageBox"
        className="flex items-baseline justify-between gap-3"
      >
        <span
          id={`run-sheet-stage-${index}-name`}
          data-component="StageBox"
          className="flex items-baseline gap-3"
        >
          <span
            id={`run-sheet-stage-${index}-number`}
            data-component="StageBox"
            aria-hidden="true"
            className="text-muted-foreground font-mono text-sm tabular-nums"
          >
            {index + 1}
          </span>
          <span
            id={`run-sheet-stage-${index}-label`}
            data-component="StageBox"
            className="text-sm font-medium"
          >
            {t(`run-sheet.${stage.key}.name`)}
          </span>
        </span>
        <Pips block={`run-sheet-stage-${index}`} pays={stage.pays} solved={solved} />
      </div>

      {!stage.jobs && (
        <p
          id={`run-sheet-stage-${index}-hand`}
          data-component="StageBox"
          className="text-muted-foreground mt-1 text-sm"
        >
          {t(`run-sheet.${stage.key}.hand`)}
        </p>
      )}

      <Commands block={`run-sheet-stage-${index}`} checks={stage.checks} />
      <Units block={`run-sheet-stage-${index}`} units={stage.units} />

      {stage.jobs && (
        // The frame's contents. Two boxes inside one stage is the figure's whole geometric claim, so
        // the cards keep a smaller radius and their own ground, or the nesting stops reading as
        // nesting.
        <ol
          id={`run-sheet-stage-${index}-jobs`}
          data-component="StageBox"
          className="mt-3 grid gap-3 sm:grid-cols-2"
        >
          {stage.jobs.map((job, position) => (
            <li
              key={job.key}
              id={`run-sheet-stage-${index}-job-${position}-item`}
              data-component="StageBox"
              className="flex"
            >
              <JobBox job={job} block={`run-sheet-stage-${index}-job-${position}`} />
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

function JobBox({ job, block }: { job: Job; block: string }) {
  const { t } = useTranslation('step2')

  return (
    <div id={block} data-component="JobBox" className="bg-background w-full rounded-lg border p-3">
      <p id={`${block}-name`} data-component="JobBox" className="text-sm font-medium">
        {t(`run-sheet.${job.key}.name`)}
      </p>
      <p id={`${block}-hand`} data-component="JobBox" className="text-muted-foreground mt-1 text-sm">
        {t(`run-sheet.${job.key}.hand`)}
      </p>
      <Commands block={block} checks={job.checks} />
      <Units block={block} units={job.units} />
    </div>
  )
}

/**
 * `overflow-wrap: anywhere` rather than `break-word`: only `anywhere` contributes to min-content
 * sizing, and without it the endpoint URL pushed the framed cards 28px past the article on a phone.
 */
function Commands({ block, checks }: { block: string; checks: readonly string[] }) {
  const { t } = useTranslation('step2')
  if (checks.length === 0) {
    return null
  }

  return (
    <ul
      id={`${block}-checks`}
      data-component="Commands"
      aria-label={t('run-sheet.commands')}
      className="text-muted-foreground mt-2 flex flex-col gap-0.5 font-mono text-xs"
    >
      {checks.map((check, position) => (
        <li
          key={check}
          id={`${block}-check-${position}`}
          data-component="Commands"
          className="[overflow-wrap:anywhere]"
        >
          {check}
        </li>
      ))}
    </ul>
  )
}

function Units({ block, units }: { block: string; units: readonly string[] }) {
  const { t } = useTranslation('step2')

  return (
    <ul
      id={`${block}-units`}
      data-component="Units"
      aria-label={t('run-sheet.units')}
      className="mt-3 flex flex-wrap gap-1.5"
    >
      {units.map((unit, position) => (
        <li
          key={unit}
          id={`${block}-unit-${position}`}
          data-component="Units"
          className="border-border text-muted-foreground rounded-full border px-2 py-0.5 text-xs"
        >
          {t(`${unit}.title`)}
        </li>
      ))}
    </ul>
  )
}

/**
 * A stage's flags. An uncollected pip is filled and ringed rather than left as a hairline: at
 * `--muted-foreground/50` on a 10px dot it measured 2.09:1 against the card, under the 3:1 a graphic
 * carrying meaning needs, and a visible change is the whole point of the pips.
 */
function Pips({
  block,
  pays,
  solved,
}: {
  block: string
  pays: readonly string[]
  solved: Set<string>
}) {
  const { t } = useTranslation('step2')
  const collected = pays.filter((id) => solved.has(id)).length

  if (pays.length === 0) {
    return (
      <span
        id={`${block}-flags`}
        data-component="Pips"
        data-state="unpaid"
        className="text-muted-foreground shrink-0 text-xs"
      >
        {t('run-sheet.none')}
      </span>
    )
  }

  return (
    <span
      id={`${block}-flags`}
      data-component="Pips"
      data-state={collected === pays.length ? 'complete' : collected === 0 ? 'open' : 'partial'}
      role="img"
      aria-label={t('run-sheet.flags', { collected, count: pays.length })}
      className="flex shrink-0 items-center gap-1"
    >
      {pays.map((id, position) => (
        <span
          key={id}
          id={`${block}-flag-${position}`}
          data-component="Pips"
          data-state={solved.has(id) ? 'collected' : 'open'}
          className={cn(
            'size-2.5 rounded-full border transition-colors',
            solved.has(id)
              ? 'bg-primary border-primary'
              : 'border-muted-foreground bg-muted-foreground/25',
          )}
        />
      ))}
    </span>
  )
}

/**
 * The stages have to name every flag the board grades, by id, or a stage quietly stops paying out on
 * screen while the board still turns green. Compared by id rather than by count, because a renamed
 * flag keeps the count and breaks the pips. It warns rather than throws, and only in dev: this
 * module is imported by the registry and by the deck, so throwing here would blank the whole app
 * over one drawing.
 */
if (import.meta.env.DEV) {
  const mapped = new Set(STAGES.flatMap((stage) => stage.pays))
  const missing = flags.map((flag) => flag.id).filter((id) => !mapped.has(id))
  if (missing.length > 0 || mapped.size !== flags.length) {
    console.error('RunSheet: the stages are out of step with flags.ts', { missing })
  }
}
