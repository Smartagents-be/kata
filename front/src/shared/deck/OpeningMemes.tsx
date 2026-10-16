import { useTranslation } from 'react-i18next'

/**
 * The 2 memes right after the opening question (16 October 2026, at the owner's asking), and the
 * answer the day gives to it. The first is the room's picture of AI, SpongeBob's rainbow: a Flappy
 * Bird clone from 1 prompt, magic. The second is what the course wants instead, buff Doge against
 * Cheems: AI-native software engineering, with quality gates and a process, against the traditional
 * kind. The point is that it should stop feeling like magic.
 *
 * They are deck only and live in `shared` because the opening belongs to no step. Rasters on
 * purpose, the owner's choice, as `ContextZone` and `ElectedToLead` are, and licensing was raised
 * and accepted. Every word on them is SVG text over the untouched image, so it translates.
 * The SpongeBob trace keeps its own credit line, which is part of the image.
 *
 * The text is a meme's: white fill, dark outline drawn under it (`paint-order: stroke`), on the
 * card and foreground tokens rather than literal colours.
 */
const MEME_TEXT = 'fill-card stroke-foreground font-sans font-extrabold [paint-order:stroke]'

export function MagicMeme() {
  const { t } = useTranslation()

  return (
    <figure id="magic-meme" data-component="MagicMeme" className="my-8 flex justify-center">
      <div
        id="magic-meme-frame"
        data-component="MagicMeme"
        className="relative w-full max-w-md overflow-hidden rounded-lg"
      >
        <img
          id="magic-meme-image"
          data-component="MagicMeme"
          src="/opening-magic.jpg"
          alt={t('deck.slide.magic.alt')}
          width={1200}
          height={992}
          className="block h-auto w-full"
        />
        <svg
          id="magic-meme-caption"
          data-component="MagicMeme"
          viewBox="0 0 1200 992"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          <text
            id="magic-meme-caption-text"
            data-component="MagicMeme"
            x="600"
            y="150"
            fontSize="120"
            textAnchor="middle"
            strokeWidth="14"
            strokeLinejoin="round"
            className={MEME_TEXT}
          >
            {t('deck.slide.magic.caption')}
          </text>
        </svg>
      </div>
    </figure>
  )
}

/** The 2 dogs, each with its label in the white band under it: x is the centre of each dog. */
const DOGS = [
  { id: 'native', x: 179 },
  { id: 'traditional', x: 669 },
] as const

export function SteroidsMeme() {
  const { t } = useTranslation()

  return (
    <figure id="steroids-meme" data-component="SteroidsMeme" className="my-8 flex justify-center">
      <div
        id="steroids-meme-frame"
        data-component="SteroidsMeme"
        className="relative w-full max-w-xl overflow-hidden rounded-lg"
      >
        <img
          id="steroids-meme-image"
          data-component="SteroidsMeme"
          src="/opening-doge.png"
          alt={t('deck.slide.steroids.alt')}
          width={800}
          height={615}
          className="block h-auto w-full"
        />
        <svg
          id="steroids-meme-labels"
          data-component="SteroidsMeme"
          viewBox="0 0 800 615"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          {DOGS.map((dog, index) => (
            <g key={dog.id} id={`steroids-meme-label-${index}`} data-component="SteroidsMeme">
              <text
                id={`steroids-meme-label-${index}-kind`}
                data-component="SteroidsMeme"
                x={dog.x}
                y="510"
                fontSize="40"
                textAnchor="middle"
                // Plain ink rather than the outlined meme text: the band under the dogs is white.
                className="fill-foreground font-sans font-extrabold"
              >
                {t(`deck.slide.steroids.${dog.id}`)}
              </text>
              <text
                id={`steroids-meme-label-${index}-what`}
                data-component="SteroidsMeme"
                x={dog.x}
                y="552"
                fontSize="26"
                textAnchor="middle"
                className="fill-foreground font-sans font-semibold"
              >
                {t('deck.slide.steroids.what')}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </figure>
  )
}
