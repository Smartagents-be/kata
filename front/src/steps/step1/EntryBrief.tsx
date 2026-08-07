import { useTranslation } from 'react-i18next'

/**
 * Everything `PlanItTwice` needs, on one sheet: what the counter asked for, the one line the student
 * types both times, and the command that scores what came out.
 *
 * **It is a figure rather than prose because guided mode drops every run of prose.** The task under
 * it is worked in class as well as alone, and a brief that vanished on the projector would leave the
 * card asking for something nobody had been told. Figures survive that cut, so the exercise's whole
 * input lives in here.
 *
 * **One wish per line, numbered, and the check prints one line per wish in the same order.** They
 * were a paragraph first, which read better and made the exercise unfair: a student comparing six
 * FAIL lines against a block of prose has to find the sentence each one came from before they can
 * argue with it. Six lines is still a person talking rather than a specification, and the numerals
 * are the design system's `data-marker`, which exists for exactly this pairing of a numbered thing
 * with the numbered thing about it. **The wishes live in three places that have to stay in step**:
 * `asked.1` to `asked.6` in both locale bundles, `WISHES` below, and the array in
 * `kata/step1/check-entry.mjs`. A seventh added to two of the three renders nowhere and is graded
 * anyway.
 *
 * **Nothing here carries `aria-labelledby`** except the `blockquote`, which has a role to hang it
 * on. A `div` and a `pre` do not, so the attribute was inert on both, and it was not needed: every
 * box is preceded in reading order by the eyebrow that names it, which is what a screen reader
 * announces anyway.
 *
 * **The brief is read rather than drawn**, which is the one thing to keep it out of: `UnderSpecified`
 * in `harness` already draws the gap between an ask and what it leaves unsaid, in the step's own
 * bars-and-dashes vocabulary. A second drawing of that argument here would be that figure four units
 * early and worse. So this one carries words the student has to work from, and the argument stays in
 * the task card's description.
 *
 * The prompt window is **muted rather than teal**, which is `ExactAsk`'s vocabulary one section up
 * held to: on this page a muted window is the vague ask and a teal one is the exact one. This ask is
 * deliberately the vague one, so it takes the muted fill even though it is the line the student is
 * told to type. The two boxes under the brief are deliberately **not** on a subgrid: they hold one
 * mono line each and are the same height on their own, and a stretched row made the taller of them
 * read as a different kind of object.
 *
 * The line itself and the command have no Dutch entry, like every other string a student types or a
 * machine printed.
 */
const WISHES = [1, 2, 3, 4, 5, 6] as const

export function EntryBrief() {
  const { t } = useTranslation('step1')

  return (
    <figure id="entry-brief" data-component="EntryBrief" className="my-8 flex flex-col gap-4">
      <div id="entry-brief-asked" data-component="EntryBrief" className="flex flex-col gap-2">
        <span
          id="entry-brief-asked-label"
          data-component="EntryBrief"
          className="eyebrow text-primary"
        >
          {t('entry-brief.asked.label')}
        </span>

        <blockquote
          id="entry-brief-asked-quote"
          data-component="EntryBrief"
          aria-labelledby="entry-brief-asked-label"
          className="border-border bg-card flex flex-col gap-2 rounded-lg border p-4 text-sm leading-relaxed"
        >
          {WISHES.map((wish, index) => (
            <p
              key={wish}
              id={`entry-brief-asked-wish-${index}`}
              data-component="EntryBrief"
              className="flex items-start gap-2"
            >
              <span
                id={`entry-brief-asked-wish-${index}-marker`}
                data-component="EntryBrief"
                data-marker
                aria-hidden="true"
                className="mt-[0.2em] shrink-0"
              >
                {wish}
              </span>
              <span id={`entry-brief-asked-wish-${index}-text`} data-component="EntryBrief">
                {t(`entry-brief.asked.${wish}`)}
              </span>
            </p>
          ))}
        </blockquote>
      </div>

      <div
        id="entry-brief-work"
        data-component="EntryBrief"
        className="grid items-start gap-4 sm:grid-cols-2"
      >
        <div id="entry-brief-type" data-component="EntryBrief" className="flex flex-col gap-2">
          <span
            id="entry-brief-type-label"
            data-component="EntryBrief"
            className="eyebrow text-primary"
          >
            {t('entry-brief.type.label')}
          </span>

          <div
            id="entry-brief-type-window"
            data-component="EntryBrief"
            className="border-border bg-muted/50 flex items-baseline gap-2 rounded-lg border px-3 py-2.5 font-mono text-sm"
          >
            <span
              id="entry-brief-type-caret"
              data-component="EntryBrief"
              aria-hidden="true"
              className="text-muted-foreground"
            >
              &gt;
            </span>
            <span
              id="entry-brief-type-prompt"
              data-component="EntryBrief"
              className="text-foreground"
            >
              {t('entry-brief.type.prompt')}
            </span>
          </div>
        </div>

        <div id="entry-brief-check" data-component="EntryBrief" className="flex flex-col gap-2">
          <span
            id="entry-brief-check-label"
            data-component="EntryBrief"
            className="eyebrow text-primary"
          >
            {t('entry-brief.check.label')}
          </span>

          <pre
            id="entry-brief-check-command"
            data-component="EntryBrief"
            className="border-border bg-muted/40 text-foreground overflow-x-auto rounded-lg border px-3 py-2.5 font-mono text-sm"
          >
            <code>{t('entry-brief.check.command')}</code>
          </pre>

          <span
            id="entry-brief-check-note"
            data-component="EntryBrief"
            className="text-muted-foreground text-xs"
          >
            {t('entry-brief.check.note')}
          </span>
        </div>
      </div>
    </figure>
  )
}
