import { useTranslation } from 'react-i18next'

/**
 * The RAM meme, on the slide after `KvCache` and nowhere else (October 2026, at the owner's asking):
 * the unit says it in 1 sentence (`tokens.kv-cache.1`), the board gets the joke. RAM sticks against
 * a Ram pickup, and the joke survives in Dutch because the truck's badge says RAM either way.
 *
 * A raster on purpose, the owner's choice, as `OpeningMemes` and `ContextZone` are; licensing was
 * raised for those and accepted. The meme's own English captions were painted out of the image
 * and are SVG text over it, so they translate. Plain dark text on the white band, the way the
 * original sets it, rather than `OpeningMemes`' outlined caption, which is for text over a picture.
 */
const W = 437
const H = 420

const LINES = [
  { key: 'want', y: 121 },
  { key: 'afford', y: 297 },
] as const

export function RamMeme() {
  const { t } = useTranslation('step1')

  return (
    <figure id="ram-meme" data-component="RamMeme" className="my-8 flex justify-center">
      <div
        id="ram-meme-frame"
        data-component="RamMeme"
        className="relative w-full max-w-md overflow-hidden rounded-lg"
      >
        <img
          id="ram-meme-image"
          data-component="RamMeme"
          src="/ram-meme.png"
          alt={t('deck.tokens.ram.alt')}
          width={W}
          height={H}
          className="block h-auto w-full"
        />
        <svg
          id="ram-meme-captions"
          data-component="RamMeme"
          viewBox={`0 0 ${W} ${H}`}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          {LINES.map((line) => (
            <text
              key={line.key}
              id={`ram-meme-${line.key}`}
              data-component="RamMeme"
              x="10"
              y={line.y}
              fontSize="16"
              className="fill-foreground font-sans"
            >
              {t(`deck.tokens.ram.${line.key}`)}
            </text>
          ))}
        </svg>
      </div>
    </figure>
  )
}
