import { ChevronDown, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/**
 * `gates`' `Legacy code` order as 2 flows (16 October 2026, at the owner's asking). It closes the
 * section, at the `data-figure="legacy-flow"` slot, and replaced the 3 points
 * `deck-step2-gates-old-code` carried.
 *
 * **2 flows, and the split is the owner's.** The first is the hard work up front, done once: old
 * code, regression tests, the checks at today's level, and an environment the agent can run it all
 * in. The second is every change after that: the gates answer green or red, and red goes to the
 * product owner, whose answer sends you to the test (wanted) or to the code (regression). A first
 * version drew it as 1 flow, and the up-front work read as a step of every change.
 *
 * **The gates box spans 2 rows so both paths visibly leave it**, green on the first and red on the
 * second. **Green and red are `--success` and `--destructive`, at the owner's asking**: that is
 * passed and failed, which is what those 2 tokens are reserved for, here said of a gate rather
 * than of a student's answer. Teal is the gates and nothing else. The 2 outcomes stay muted, because
 * neither is the right answer: the product owner's is.
 *
 * DOM rather than SVG, on `ProofLoop`'s precedent: each row becomes a column on a narrow screen with
 * the arrows turned. Both flows share 1 4-column grid on a wide screen, so their boxes line up; the
 * second places its boxes with explicit rows and columns, so the stacked order is the reading order.
 */
type Tone = 'plain' | 'gate' | 'pass' | 'fail'

const UPFRONT: readonly { id: string; tone: Tone }[] = [
  { id: 'old', tone: 'plain' },
  { id: 'regression', tone: 'gate' },
  { id: 'checks', tone: 'gate' },
  { id: 'environment', tone: 'plain' },
]

const OUTCOMES = ['test', 'code'] as const

const BOX = 'flex-1 rounded-lg border px-3 py-2 text-center text-sm font-medium text-foreground'
const TONE: Record<Tone, { box: string; note: string }> = {
  plain: { box: 'border-border', note: 'text-muted-foreground' },
  gate: { box: 'border-primary/40 bg-primary/5', note: 'text-muted-foreground' },
  pass: { box: 'border-success/40 bg-success/10', note: 'text-success-foreground font-semibold' },
  fail: { box: 'border-destructive/40 bg-destructive/10', note: 'text-destructive font-semibold' },
}
const LABEL = 'text-primary mb-2 font-mono text-xs font-semibold tracking-wider uppercase'
const ARROW = 'text-muted-foreground/60 mt-3 size-4 shrink-0 rotate-90 sm:rotate-0'

export function LegacyFlow() {
  const { t } = useTranslation('step2')

  const box = (id: string, key: string, tone: Tone, note = true) => (
    <div
      id={`legacy-flow-${id}-box`}
      data-component="LegacyFlow"
      className={`${BOX} ${TONE[tone].box}`}
    >
      {t(`legacy-flow.${key}.name`)}
      {note && (
        <span
          id={`legacy-flow-${id}-note`}
          data-component="LegacyFlow"
          className={`mt-1 block font-mono text-xs font-normal ${TONE[tone].note}`}
        >
          {t(`legacy-flow.${key}.note`)}
        </span>
      )}
    </div>
  )

  const arrow = (id: string, down = false) =>
    down ? (
      <ChevronDown
        id={`legacy-flow-${id}-arrow`}
        data-component="LegacyFlow"
        aria-hidden="true"
        className="text-muted-foreground/60 mx-auto size-4"
      />
    ) : (
      <ChevronRight
        id={`legacy-flow-${id}-arrow`}
        data-component="LegacyFlow"
        aria-hidden="true"
        className={ARROW}
      />
    )

  return (
    <figure id="legacy-flow" data-component="LegacyFlow" className="not-prose my-8">
      <p id="legacy-flow-upfront-label" data-component="LegacyFlow" className={LABEL}>
        {t('legacy-flow.upfront')}
      </p>
      <div id="legacy-flow-upfront" data-component="LegacyFlow" className="grid gap-2 sm:grid-cols-4">
        {UPFRONT.map((step, index) => (
          <div
            key={step.id}
            id={`legacy-flow-upfront-${index}`}
            data-component="LegacyFlow"
            className="flex items-start gap-2"
          >
            {index > 0 && arrow(`upfront-${index}`)}
            {box(`upfront-${index}`, step.id, step.tone)}
          </div>
        ))}
      </div>

      <p id="legacy-flow-each-label" data-component="LegacyFlow" className={`${LABEL} mt-8`}>
        {t('legacy-flow.each')}
      </p>
      <div id="legacy-flow-each" data-component="LegacyFlow" className="grid gap-2 sm:grid-cols-4">
        <div
          id="legacy-flow-change"
          data-component="LegacyFlow"
          className="flex items-start gap-2 sm:col-start-1 sm:row-start-1"
        >
          {box('change', 'change', 'plain')}
        </div>

        <div
          id="legacy-flow-gates"
          data-component="LegacyFlow"
          className="flex items-stretch gap-2 sm:col-start-2 sm:row-span-2 sm:row-start-1"
        >
          {arrow('gates')}
          <div
            id="legacy-flow-gates-box"
            data-component="LegacyFlow"
            className={`${BOX} ${TONE.gate.box} flex items-center justify-center`}
          >
            {t('legacy-flow.gates.name')}
          </div>
        </div>

        <div
          id="legacy-flow-pass"
          data-component="LegacyFlow"
          className="flex items-start gap-2 sm:col-start-3 sm:row-start-1"
        >
          {arrow('pass')}
          {box('pass', 'pass', 'pass')}
        </div>

        <div
          id="legacy-flow-fail"
          data-component="LegacyFlow"
          className="flex items-start gap-2 sm:col-start-3 sm:row-start-2"
        >
          {arrow('fail')}
          {box('fail', 'fail', 'fail')}
        </div>

        <div
          id="legacy-flow-owner"
          data-component="LegacyFlow"
          className="flex flex-col gap-2 pl-6 sm:col-start-3 sm:row-start-3 sm:self-start"
        >
          {arrow('owner', true)}
          {box('owner', 'owner', 'plain')}
        </div>

        <div
          id="legacy-flow-outcomes"
          data-component="LegacyFlow"
          // Beside the product owner: the top pad is the down arrow above that box.
          className="flex flex-col gap-2 sm:col-start-4 sm:row-start-3 sm:pt-6"
        >
          {OUTCOMES.map((outcome, index) => (
            <div
              key={outcome}
              id={`legacy-flow-outcome-${index}`}
              data-component="LegacyFlow"
              className="flex items-start gap-2"
            >
              {arrow(`outcome-${index}`)}
              {box(`outcome-${index}`, outcome, 'plain')}
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}
