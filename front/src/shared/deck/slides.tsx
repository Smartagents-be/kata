import { Trans, useTranslation } from 'react-i18next'
import { Slide } from '@/shared/deck/Slide'

/** The deck, in order. Adding a slide is adding a <Slide> here; the numbering follows. */
const TOTAL = 1

/**
 * What the tutor puts on the board. These slides are written for the room, not lifted from the
 * units: a student can read a unit themselves, so a deck that repeated one would be a worse copy of
 * a page they already have. What belongs here is what only works out loud, starting with a question
 * to open on.
 *
 * A fragment, not a wrapper element. The engine treats every direct element child of <deck-stage>
 * as a slide, and a fragment renders no DOM of its own, so the sections land as its own children.
 */
export function DeckSlides() {
  const { t } = useTranslation()

  return (
    <>
      <Slide index={0} total={TOTAL} label="Opening question" align="golden">
        <p
          id="deck-opening-eyebrow"
          data-component="DeckSlides"
          className="eyebrow text-primary mb-10 text-[26px]"
        >
          {t('deck.slide.opening.eyebrow')}
        </p>
        <h1
          id="deck-opening-question"
          data-component="DeckSlides"
          className="font-heading max-w-[26ch] text-[84px] leading-[1.08] font-semibold tracking-tight"
        >
          {/* The two terms are the whole slide, so they carry the colour: the one the room arrived
              with set back, the one the day is about in teal. Marked up in the message rather than
              spliced here, so Dutch can put them wherever its word order wants them. */}
          <Trans
            i18nKey="deck.slide.opening.question"
            components={{
              vibe: <span className="text-muted-foreground" />,
              agentic: <span className="text-primary" />,
            }}
          />
        </h1>
      </Slide>
    </>
  )
}
