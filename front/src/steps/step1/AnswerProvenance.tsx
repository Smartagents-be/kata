import { useStepText } from '@/shared/i18n/useStepText'

/**
 * One answer about the step 1 backend, taken apart into the claims it makes, with what each claim
 * was read from beside it. Two were read. The middle one was not, and it is a method `Catalog` does
 * not have.
 *
 * **The left column is deliberately uniform.** Same weight, same mono, same two lines, no marker of
 * any kind on the invented row. That is the argument the unit closes on: an answer carries no signal
 * about where its parts came from, so anything that made the middle claim look different would be
 * the drawing disagreeing with the prose above it. Everything that varies lives in the second
 * column, and the second column is the one you are never handed.
 *
 * **The invented row is a hole rather than a warning.** It is the step's dashed stroke, which reads
 * "not there" everywhere else in these figures, and not `--destructive`: nothing failed, and a red
 * row would say the agent was caught. Amber is the caution colour and belongs to a cost tip and a
 * hazard aside, so it is wrong here too.
 *
 * The claims are true of `kata/step1/java` apart from the invented one, and that matters: a student
 * can open `Catalog.java` and `TitleController.java` and check the two sources, which is the move
 * the unit is asking for. Symbols and filenames are machine-shaped, so they are data in this file
 * with no key and no `nl` entry, the same way `ModelPricing`'s numbers are. Only the predicate under
 * each symbol and the two column heads translate.
 *
 * Not an SVG. There is no geometry in it, so it joins the step's diagram vocabulary by staying out
 * of it, on `ModelTiers`'s precedent.
 */
const CLAIMS = [
  { id: 'titles', symbol: 'Catalog.titles()', source: 'Catalog.java' },
  { id: 'filter', symbol: 'findAllByAuthorOrdered', source: null },
  { id: 'endpoint', symbol: 'GET /api/titles', source: 'TitleController.java' },
] as const

export function AnswerProvenance() {
  const { text } = useStepText('step1')

  return (
    <div id="answer-provenance" data-component="AnswerProvenance" className="my-8 rounded-xl border">
      <div
        id="answer-provenance-head"
        data-component="AnswerProvenance"
        // Same track sizes as the rows below, so a heading always sits over its own column. The
        // claims are longer than the filenames and they are the part that must not break mid-symbol
        // on a phone, which is what the wider first track buys.
        className="grid grid-cols-[1.4fr_1fr] gap-x-4 border-b px-4 py-3"
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

      {CLAIMS.map((claim, index) => (
        <div
          key={claim.id}
          id={`answer-provenance-item-${index}`}
          data-component="AnswerProvenance"
          data-state={claim.source ? 'read' : 'invented'}
          className="grid grid-cols-[1.4fr_1fr] items-center gap-x-4 border-b px-4 py-3 last:border-b-0"
        >
          <div id={`answer-provenance-item-${index}-claim`} data-component="AnswerProvenance">
            <p
              id={`answer-provenance-item-${index}-symbol`}
              data-component="AnswerProvenance"
              className="font-mono text-sm break-all"
            >
              {claim.symbol}
            </p>
            <p
              id={`answer-provenance-item-${index}-says`}
              data-component="AnswerProvenance"
              className="text-muted-foreground mt-1 text-sm"
            >
              {text(`answer-provenance.${claim.id}`)}
            </p>
          </div>

          {claim.source ? (
            <p
              id={`answer-provenance-item-${index}-source`}
              data-component="AnswerProvenance"
              className="text-muted-foreground font-mono text-sm break-all"
            >
              {claim.source}
            </p>
          ) : (
            <p
              id={`answer-provenance-item-${index}-source`}
              data-component="AnswerProvenance"
              // `w-fit` rather than the full column: a dashed box the width of the cell reads as an
              // empty input waiting to be filled in. What it has to read as is a hole where a source
              // would have been, so it takes about as much room as the filenames above and below it.
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
