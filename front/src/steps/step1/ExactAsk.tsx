import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/utils'

/**
 * One broken form, asked about two ways.
 *
 * The form has two fields and both labels read "Name", so "fix the form" cannot say which one it
 * means, or what fixed would look like. The label on the top field carries an `mb-8` that pushes its
 * input away, so it hangs off on its own.
 *
 * The fault is drawn rather than left to be spotted: the margin is a dashed band carrying its own
 * size, and the label above it goes red. That is the only thing on the card in colour, so a reader
 * knows where to look before reading a word of it, and the same red on `member-name` in the source
 * is what carries them from the fault to the name for it. `contact-name` is deliberately left plain:
 * a second red beside the first competes with the fault, and the two ids differ in the text anyway,
 * which is all the reader needs to see that the source is the only place the fields are told apart.
 *
 * It sits next to the "be exact" paragraph in the `prompt` unit, so it lives in `inlineFigures` and
 * the geometry stays here in the step rather than in the unit HTML.
 */

/** A run of source, where an object is the id of the broken field and gets drawn in red. */
type Part = string | { id: string }

const CODE: Part[][] = [
  ['<div class="field">'],
  ['  <label class="mb-8"'],
  ['         for="', { id: 'member-name' }, '">Name</label>'],
  ['  <input id="', { id: 'member-name' }, '">'],
  ['</div>'],
  [''],
  ['<div class="field">'],
  ['  <label for="contact-name">Name</label>'],
  ['  <input id="contact-name">'],
  ['</div>'],
]

export function ExactAsk() {
  const { t } = useTranslation('step1')

  return (
    <figure id="exact-ask" data-component="ExactAsk" className="my-8 flex flex-col gap-4">
      {/* the form on the left, the source that names its two fields on the right */}
      <div
        id="exact-ask-example"
        data-component="ExactAsk"
        className="grid gap-4 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:grid-rows-[auto_1fr]"
      >
        <div
          id="exact-ask-form"
          data-component="ExactAsk"
          className="grid gap-2 sm:row-span-2 sm:grid-rows-subgrid"
        >
          <span id="exact-ask-form-label" data-component="ExactAsk" className="eyebrow text-primary">
            {t('exact-ask.form.label')}
          </span>

          <div
            id="exact-ask-form-card"
            data-component="ExactAsk"
            className="border-border bg-card rounded-lg border p-4"
          >
            {/* the top field, whose label pushes its own input away and hangs off on its own */}
            <div
              id="exact-ask-form-field-0"
              data-component="ExactAsk"
              data-state="displaced"
              className="mb-4 flex flex-col gap-1.5"
            >
              <label
                id="exact-ask-form-field-0-label"
                data-component="ExactAsk"
                htmlFor="exact-ask-form-field-0-input"
                className="text-destructive text-sm font-medium"
              >
                {t('exact-ask.form.field')}
              </label>
              {/* The margin itself, drawn. 26px plus the 6px gap on either side of it is the 32px the
                  source shows, so the band measures what it says it does. It is dashed and shallow so
                  it cannot be mistaken for a third input, and the size is machine-shaped, so it is
                  mono and stays the same in every language. */}
              <div
                id="exact-ask-form-field-0-gap"
                data-component="ExactAsk"
                aria-hidden="true"
                className="border-destructive/40 bg-destructive/5 text-destructive/80 flex h-[26px] items-center justify-center rounded-md border border-dashed font-mono text-xs"
              >
                32px
              </div>
              <input
                id="exact-ask-form-field-0-input"
                data-component="ExactAsk"
                type="text"
                readOnly
                className="field w-full"
              />
            </div>

            <div
              id="exact-ask-form-field-1"
              data-component="ExactAsk"
              data-state="fine"
              className="flex flex-col gap-1.5"
            >
              <label
                id="exact-ask-form-field-1-label"
                data-component="ExactAsk"
                htmlFor="exact-ask-form-field-1-input"
                className="text-muted-foreground text-sm"
              >
                {t('exact-ask.form.field')}
              </label>
              <input
                id="exact-ask-form-field-1-input"
                data-component="ExactAsk"
                type="text"
                readOnly
                className="field w-full"
              />
            </div>
          </div>
        </div>

        <div
          id="exact-ask-code"
          data-component="ExactAsk"
          className="grid gap-2 sm:row-span-2 sm:grid-rows-subgrid"
        >
          <span id="exact-ask-code-label" data-component="ExactAsk" className="eyebrow text-primary">
            {t('exact-ask.code.label')}
          </span>

          <pre
            id="exact-ask-code-block"
            data-component="ExactAsk"
            className="border-border bg-muted/40 text-muted-foreground overflow-x-auto rounded-lg border p-4 font-mono text-xs leading-relaxed"
          >
            <code>
              {CODE.map((line, index) => (
                <Fragment key={index}>
                  {line.map((part, partIndex) =>
                    typeof part === 'string' ? (
                      <Fragment key={partIndex}>{part}</Fragment>
                    ) : (
                      <span key={partIndex} className="text-destructive font-medium">
                        {part.id}
                      </span>
                    ),
                  )}
                  {'\n'}
                </Fragment>
              ))}
            </code>
          </pre>
        </div>
      </div>

      {/* the same fix, asked for twice */}
      <div
        id="exact-ask-prompts"
        data-component="ExactAsk"
        className="grid gap-4 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:grid-rows-[auto_1fr]"
      >
        <Ask slug="vague" />
        <Ask slug="exact" />
      </div>
    </figure>
  )
}

/**
 * One prompt window: the ask, as you would type it. The teal one is the exact version, since teal is
 * what the rest of the app uses for the thing to follow.
 */
function Ask({ slug }: { slug: 'vague' | 'exact' }) {
  const { t } = useTranslation('step1')
  const exact = slug === 'exact'

  return (
    <div
      id={`exact-ask-${slug}`}
      data-component="Ask"
      className="grid gap-2 sm:row-span-2 sm:grid-rows-subgrid"
    >
      <span
        id={`exact-ask-${slug}-label`}
        data-component="Ask"
        className={cn('eyebrow', exact ? 'text-primary' : 'text-muted-foreground')}
      >
        {t(`exact-ask.${slug}.label`)}
      </span>

      <div
        id={`exact-ask-${slug}-window`}
        data-component="Ask"
        className={cn(
          'flex items-baseline gap-2 rounded-lg border px-3 py-2.5 font-mono text-sm',
          exact ? 'border-primary/60 bg-primary/10' : 'border-border bg-muted/50',
        )}
      >
        <span className={cn(exact ? 'text-primary' : 'text-muted-foreground')} aria-hidden="true">
          &gt;
        </span>
        <span id={`exact-ask-${slug}-prompt`} data-component="Ask" className="text-foreground">
          {t(`exact-ask.${slug}.prompt`)}
        </span>
      </div>
    </div>
  )
}
