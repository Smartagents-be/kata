import { WithCode } from '@/shared/components/WithCode'
import { useStepText } from '@/shared/i18n/useStepText'

/**
 * One answer to "why is this endpoint slow?", taken apart into its 2 causes, with where the agent
 * saw each one beside it. The first comes from a file and a trace. The second came from nowhere: it
 * is a cause that sounds just as likely, and nothing the agent read or measured points at it. It is
 * the course owner's own case (October 2026), a long Redis scan at the start of every session plus
 * an unrelated cause, of which only the scan was real.
 *
 * **The left column is deliberately uniform.** Same weight, same size, same numeral, no marker of
 * any kind on the invented cause. That is the argument the unit closes on: an answer carries no
 * signal about where its parts came from, so anything that made the second cause look different
 * would be the drawing disagreeing with the prose. Everything that varies lives in the right
 * column, and the right column is the one you are never handed unless you ask for it.
 *
 * **The invented row is a hole rather than a warning.** It is the step's dashed stroke, which reads
 * "not there" everywhere else in these figures, and not `--destructive`: nothing failed, and a red
 * row would say the agent was caught. Amber is the caution colour and belongs to a cost tip and a
 * hazard aside, so it is wrong here too.
 *
 * **The source carries a real unit.** The trace line and the bar say how much of the request the
 * scan takes, so the read cause is backed by a number and not only by a filename. `SCAN_S` and
 * `TOTAL_S` draw the bar, and `answer-provenance.trace` prints the same 2 numbers in both locales,
 * so changing one means changing the other.
 *
 * It is not about `exercises/step1/java` any more, so a student cannot open the sources. That was
 * the price of an example a current model still produces: it used to be a method `Catalog` does not
 * have, and an agent with tools reads `Catalog.java` first. The filename is machine-shaped data
 * with no `nl` entry; the causes, the trace line and the heads translate.
 *
 * Not an SVG. There is no geometry in it, so it joins the step's diagram vocabulary by staying out
 * of it, on `ModelTiers`'s precedent.
 */
const SCAN_S = 1.8
const TOTAL_S = 2.1

const CAUSES = [
  { id: 'redis', source: 'SessionStore.java:42' },
  { id: 'pool', source: null },
] as const

export function AnswerProvenance() {
  const { text } = useStepText('step1')

  return (
    <div id="answer-provenance" data-component="AnswerProvenance" className="my-8">
      <p
        id="answer-provenance-eyebrow"
        data-component="AnswerProvenance"
        className="eyebrow text-muted-foreground"
      >
        {text('answer-provenance.eyebrow')}
      </p>
      <p
        id="answer-provenance-question"
        data-component="AnswerProvenance"
        className="mt-1 mb-4 font-semibold"
      >
        {text('answer-provenance.question')}
      </p>

      <div
        id="answer-provenance-head"
        data-component="AnswerProvenance"
        // Same track sizes as the rows below, so a heading always sits over its own column.
        className="border-border/70 grid grid-cols-[1.3fr_1fr] gap-x-6 border-b py-3"
      >
        <p
          id="answer-provenance-head-claim"
          data-component="AnswerProvenance"
          className="eyebrow text-muted-foreground"
        >
          {text('answer-provenance.claim')}
        </p>
        <p
          id="answer-provenance-head-source"
          data-component="AnswerProvenance"
          className="eyebrow text-primary"
        >
          {text('answer-provenance.source')}
        </p>
      </div>

      {CAUSES.map((cause, index) => (
        <div
          key={cause.id}
          id={`answer-provenance-item-${index}`}
          data-component="AnswerProvenance"
          data-state={cause.source ? 'read' : 'invented'}
          className="border-border/50 grid grid-cols-[1.3fr_1fr] items-center gap-x-6 border-b py-4 last:border-b-0"
        >
          <div
            id={`answer-provenance-item-${index}-claim`}
            data-component="AnswerProvenance"
            className="flex items-start gap-3"
          >
            <span
              id={`answer-provenance-item-${index}-number`}
              data-component="AnswerProvenance"
              className="text-primary font-mono font-medium"
            >
              {index + 1}
            </span>
            <p
              id={`answer-provenance-item-${index}-says`}
              data-component="AnswerProvenance"
              className="text-[0.95rem] leading-snug"
            >
              <WithCode
                id={`answer-provenance-item-${index}-says-text`}
                text={text(`answer-provenance.${cause.id}`)}
              />
            </p>
          </div>

          {cause.source ? (
            <div
              id={`answer-provenance-item-${index}-source`}
              data-component="AnswerProvenance"
              className="border-border bg-muted w-fit rounded-lg border px-3 py-2 text-sm"
            >
              <p
                id={`answer-provenance-item-${index}-file`}
                data-component="AnswerProvenance"
                className="font-mono break-all"
              >
                {cause.source}
              </p>
              <p
                id={`answer-provenance-item-${index}-trace`}
                data-component="AnswerProvenance"
                className="text-muted-foreground"
              >
                {text('answer-provenance.trace')}
              </p>
              <div
                id={`answer-provenance-item-${index}-bar`}
                data-component="AnswerProvenance"
                aria-hidden="true"
                className="bg-border mt-1.5 h-2 w-40 max-w-full rounded-full"
              >
                <div
                  id={`answer-provenance-item-${index}-bar-fill`}
                  data-component="AnswerProvenance"
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${Math.round((SCAN_S / TOTAL_S) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <p
              id={`answer-provenance-item-${index}-source`}
              data-component="AnswerProvenance"
              // `w-fit` rather than the full column: a dashed box the width of the cell reads as an
              // empty input waiting to be filled in. What it has to read as is a hole where a source
              // would have been.
              className="text-muted-foreground w-fit rounded-lg border border-dashed px-3 py-1.5 text-sm"
            >
              {text('answer-provenance.missing')}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
