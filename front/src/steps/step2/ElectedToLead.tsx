import { useTranslation } from 'react-i18next'

/**
 * The Simpsons' President Schwarzenegger, "I was elected to lead, not to read", on the deck only
 * (16 October 2026, at the owner's asking). It sits right after `gates`'s divider and is
 * `gates.lead.2` said as a joke: an agent writes faster than you can read, so the gates read the
 * code and you read the decisions. The slide's note carries that second half, which is what turns
 * the joke into the point rather than an excuse not to read.
 *
 * It is a raster on purpose, the owner's choice, made knowingly against the rule that a raster is
 * only ever a screenshot, as `ContextZone` in step 1 is. The subtitle is burnt into the image, so
 * only the alt text translates. It is not on the unit page: the prose there already says it.
 */
export function ElectedToLead() {
  const { t } = useTranslation('step2')

  return (
    <figure id="elected-to-lead" data-component="ElectedToLead" className="my-8 flex justify-center">
      <img
        id="elected-to-lead-image"
        data-component="ElectedToLead"
        src="/elected-to-lead.png"
        alt={t('elected-to-lead.alt')}
        width={500}
        height={263}
        className="h-auto w-full max-w-xl rounded-lg"
      />
    </figure>
  )
}
