import { useTranslation } from 'react-i18next'

/**
 * Decomposition: the ask on the left, one short line over the dashed space it does not fill, and on
 * the right the three pieces it cuts into. Each piece is one row read in order: what the piece does,
 * the question the agent sends back while writing that piece's prompt, and the decision you give it.
 * The three questions are `harness.decomposition.1`'s own three, so the figure and the paragraph name
 * the same gaps; changing one means changing the other, in both languages.
 *
 * It used to draw each piece as an abstract teal bar standing for its prompt, with the question
 * under it, and that did not read (FEEDBACK 9): nothing on the drawing said who asks, who answers, or
 * that the bar was a prompt. So the bars went, and the labels on every row do the explaining. The
 * decisions are illustrations of an answer, not a spec: they only touch how search behaves, and they
 * must not name catalogue data the service does not have (nine titles, no authors) or lean on any of
 * step 1's exercises.
 *
 * It carries no context frame, unlike the other three pattern diagrams, and that is the argument.
 * Nothing has been handed to anybody yet: this is the task being cut up, not the windows it ends up
 * in. What it keeps from the step's vocabulary is solid for what you have and dashes for what you do
 * not, so the dashed space on the left comes back as three solid rows on the right.
 *
 * It is DOM rather than SVG so the layout can reflow: side by side from `md`, and on a phone the ask,
 * the arrow (turned to point down) and the pieces stack, with each piece's two labelled lines
 * stacking under `sm` too. The figure's `aria-label` says what the drawing adds up to; every word on
 * it is real text and is read in order.
 */
const PIECES = [0, 1, 2] as const

export function UnderSpecified() {
  const { t } = useTranslation('step1')

  return (
    <figure
      id="under-specified"
      data-component="UnderSpecified"
      aria-label={t('under-specified.description')}
      className="mx-auto my-8 grid w-full max-w-3xl gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,2fr)] md:gap-5"
    >
      {/* the ask: what was actually said, and the room under it that nobody filled in */}
      <div id="under-specified-ask" data-component="UnderSpecified" className="flex flex-col gap-2">
        <span
          id="under-specified-ask-label"
          data-component="UnderSpecified"
          className="eyebrow text-muted-foreground"
        >
          {t('under-specified.ask')}
        </span>
        <p
          id="under-specified-request"
          data-component="UnderSpecified"
          className="text-foreground text-lg leading-snug font-medium"
        >
          {t('under-specified.request')}
        </p>
        <div
          id="under-specified-unsaid"
          data-component="UnderSpecified"
          className="border-primary/30 text-muted-foreground flex min-h-20 flex-1 items-center justify-center rounded-xl border-[1.5px] border-dashed p-4 text-center text-sm"
        >
          {t('under-specified.unsaid')}
        </div>
      </div>

      {/* the cut: points right beside the pieces, and down when they stack under the ask */}
      <div
        id="under-specified-cut"
        data-component="UnderSpecified"
        className="flex items-center justify-center gap-2 md:flex-col"
      >
        <span
          id="under-specified-cut-label"
          data-component="UnderSpecified"
          className="text-muted-foreground text-sm whitespace-nowrap"
        >
          {t('under-specified.cut')}
        </span>
        <svg
          id="under-specified-cut-arrow"
          data-component="UnderSpecified"
          viewBox="0 0 56 12"
          aria-hidden="true"
          className="text-primary/50 h-3 w-10 shrink-0 rotate-90 md:w-14 md:rotate-0"
        >
          <path
            id="under-specified-cut-arrow-line"
            data-component="UnderSpecified"
            d="M 0 6 L 48 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            id="under-specified-cut-arrow-head"
            data-component="UnderSpecified"
            d="M 46 1 L 56 6 L 46 11 z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* the pieces: what each one does, what writing its prompt makes the agent ask, and your answer */}
      <div id="under-specified-pieces" data-component="UnderSpecified" className="flex flex-col gap-2">
        <span
          id="under-specified-pieces-label"
          data-component="UnderSpecified"
          className="eyebrow text-muted-foreground"
        >
          {t('under-specified.parts')}
        </span>
        <ol
          id="under-specified-pieces-list"
          data-component="UnderSpecified"
          className="flex flex-col gap-2"
        >
          {PIECES.map((index) => (
            <li
              key={index}
              id={`under-specified-piece-${index}`}
              data-component="UnderSpecified"
              className="border-primary/30 bg-card flex flex-col gap-1.5 rounded-lg border-[1.5px] px-4 py-3"
            >
              <span
                id={`under-specified-piece-${index}-name`}
                data-component="UnderSpecified"
                className="text-foreground text-sm font-semibold"
              >
                {t(`under-specified.piece-${index}`)}
              </span>
              <dl
                id={`under-specified-piece-${index}-exchange`}
                data-component="UnderSpecified"
                className="grid gap-x-3 gap-y-0.5 text-sm sm:grid-cols-[auto_minmax(0,1fr)] sm:items-baseline sm:gap-y-1"
              >
                <dt
                  id={`under-specified-piece-${index}-asks`}
                  data-component="UnderSpecified"
                  className="text-muted-foreground text-xs"
                >
                  {t('under-specified.asks')}
                </dt>
                <dd
                  id={`under-specified-piece-${index}-question`}
                  data-component="UnderSpecified"
                  className="text-foreground mb-1 sm:mb-0"
                >
                  {t(`under-specified.question-${index}`)}
                </dd>
                <dt
                  id={`under-specified-piece-${index}-decides`}
                  data-component="UnderSpecified"
                  className="text-muted-foreground text-xs"
                >
                  {t('under-specified.decides')}
                </dt>
                <dd
                  id={`under-specified-piece-${index}-decision`}
                  data-component="UnderSpecified"
                  className="text-primary font-medium"
                >
                  {t(`under-specified.decision-${index}`)}
                </dd>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  )
}
