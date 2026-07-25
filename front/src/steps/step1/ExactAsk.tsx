import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/utils'

/**
 * One broken form, asked about two ways.
 *
 * The form has two fields and both labels read "Name", so "fix the form" cannot say which one it
 * means, or what fixed would look like. The label on the top field carries an `mb-4` that pushes its
 * input away, so it hangs off on its own. The source next to it is the only place the two fields are
 * told apart, which is why the ids are the thing drawn in colour: naming one of them is what turns
 * the vague ask into an exact one.
 *
 * It sits next to the "be exact" paragraph in the `prompt` unit, so it lives in `inlineFigures` and
 * the geometry stays here in the step rather than in the unit HTML.
 */

/** A run of source, where an object is an id and gets drawn in red rather than as plain code. */
type Part = string | { id: string }

const CODE: Part[][] = [
  ['<div class="field">'],
  ['  <label class="mb-4"'],
  ['         for="', { id: 'member-name' }, '">Name</label>'],
  ['  <input id="', { id: 'member-name' }, '">'],
  ['</div>'],
  [''],
  ['<div class="field">'],
  ['  <label for="', { id: 'contact-name' }, '">Name</label>'],
  ['  <input id="', { id: 'contact-name' }, '">'],
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
                className="text-muted-foreground mb-4 text-sm"
              >
                {t('exact-ask.form.field')}
              </label>
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
