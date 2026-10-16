import { useTranslation } from 'react-i18next'

/**
 * The Simpsons' President Schwarzenegger, "I was elected to lead, not to read", on the deck only
 * (16 October 2026, at the owner's asking). It sits right after `gates`'s divider and is
 * `gates.lead.2` said as a joke: an agent writes faster than you can read, so the gates verify the
 * code and its behaviour. The slide's note carries that half, which is what turns the joke into the
 * point rather than an excuse not to read.
 *
 * It is a raster on purpose, the owner's choice, made knowingly against the rule that a raster is
 * only ever a screenshot, as `ContextZone` in step 1 is. The subtitle is burnt into the image, so
 * only the alt text translates. It is not on the unit page: the prose there already says it.
 *
 * **"lead" is struck through and corrected to "code"** (owner's call, same day), so the quote reads
 * "elected to code, not to read". The correction is an SVG layer over the PNG rather than an edit
 * to it, so the image stays the original and the word stays text. It is English in every language,
 * like the subtitle it corrects. The coordinates are the PNG's own pixels (500x263): "lead" runs
 * from x 250 to 303 with its x-height between y 237 and 254, measured off the file. Teal and not
 * red, because `--destructive` means a failed answer everywhere else.
 */
const W = 500
const H = 263

export function ElectedToLead() {
  const { t } = useTranslation('step2')

  return (
    <figure id="elected-to-lead" data-component="ElectedToLead" className="my-8 flex justify-center">
      <div
        id="elected-to-lead-frame"
        data-component="ElectedToLead"
        className="relative w-full max-w-xl overflow-hidden rounded-lg"
      >
        <img
          id="elected-to-lead-image"
          data-component="ElectedToLead"
          src="/elected-to-lead.png"
          alt={t('elected-to-lead.alt')}
          width={W}
          height={H}
          className="block h-auto w-full"
        />
        <svg
          id="elected-to-lead-correction"
          data-component="ElectedToLead"
          viewBox={`0 0 ${W} ${H}`}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          <line
            id="elected-to-lead-strike"
            data-component="ElectedToLead"
            x1="244"
            y1="246"
            x2="303"
            y2="243"
            strokeWidth="5"
            strokeLinecap="round"
            className="stroke-primary"
          />
          <text
            id="elected-to-lead-code"
            data-component="ElectedToLead"
            x="277"
            y="224"
            fontSize="30"
            fontWeight="800"
            textAnchor="middle"
            strokeWidth="5"
            strokeLinejoin="round"
            className="fill-primary stroke-card font-sans [paint-order:stroke]"
          >
            code
          </text>
        </svg>
      </div>
    </figure>
  )
}
