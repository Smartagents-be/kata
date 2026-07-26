import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Two ways of getting from where you are to what you wanted, drawn side by side. Both halves have
 * the same start corner and the same target, so the only difference on screen is the step size:
 * three long moves that stop beside the target against twelve short ones that land in it.
 *
 * It sits inside the prose of the `evolution` unit, at the `data-figure="iteration-paths"` slot,
 * because the paragraph under it reads the halves left to right. Both halves live in one SVG for
 * that reason: a two-element layout would stack on a narrow screen and "the one on the left" would
 * stop being true.
 *
 * The dashed tail on the left half is the distance nobody got to cover, drawn dashed the way the
 * step 1 diagrams draw what is not there.
 */
const FEW = '60,250 170,190 110,120 205,105'
const MANY =
  '60,250 86,246 83,211 115,213 117,183 145,181 151,156 174,149 184,127 205,117 217,99 235,86 250,70'

const toPoints = (path: string) =>
  path.split(' ').map((pair) => pair.split(',').map(Number) as [number, number])

export function IterationPaths() {
  const { t } = useTranslation('step2')
  const titleId = useId()

  return (
    <figure
      id="iteration-paths"
      data-component="IterationPaths"
      className="my-8 flex justify-center"
    >
      <svg
        id="iteration-paths-svg"
        data-component="IterationPaths"
        viewBox="0 0 640 320"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-2xl"
      >
        {/* useId, not a BEM id: aria-labelledby has to be unique per instance, not per component. */}
        <title id={titleId} data-component="IterationPaths">
          {t('iteration-paths.description')}
        </title>

        {/* the old shape: three long moves, and it stops beside the target */}
        <g id="iteration-paths-few" data-component="IterationPaths">
          <text
            id="iteration-paths-few-label"
            data-component="IterationPaths"
            x="20"
            y="26"
            fontSize="14"
            className="fill-foreground font-medium"
          >
            {t('iteration-paths.few')}
          </text>

          <circle cx="250" cy="70" r="20" strokeWidth="2" className="fill-none stroke-primary/35" />
          <circle cx="250" cy="70" r="5" className="fill-primary/40" />
          {/* nudged left of the ring's centre so the longest label still clears the viewBox edge */}
          <text
            x="238"
            y="42"
            fontSize="13"
            textAnchor="middle"
            className="fill-muted-foreground"
            data-component="IterationPaths"
          >
            {t('iteration-paths.target')}
          </text>

          <polyline
            id="iteration-paths-few-line"
            data-component="IterationPaths"
            points={FEW}
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="fill-none stroke-muted-foreground/60"
          />
          {/* the distance nobody got to cover */}
          <line
            id="iteration-paths-few-gap"
            data-component="IterationPaths"
            x1="205"
            y1="105"
            x2="234"
            y2="86"
            strokeWidth="2"
            strokeDasharray="5 5"
            className="stroke-muted-foreground/50"
          />

          {toPoints(FEW).map(([x, y], index) => (
            <circle
              key={`${x},${y}`}
              id={`iteration-paths-few-step-${index}`}
              data-component="IterationPaths"
              cx={x}
              cy={y}
              r={index === 0 ? 7 : 6}
              className="fill-muted-foreground/60"
            />
          ))}

          <text
            x="60"
            y="278"
            fontSize="13"
            textAnchor="middle"
            className="fill-muted-foreground"
            data-component="IterationPaths"
          >
            {t('iteration-paths.start')}
          </text>
        </g>

        <line x1="320" y1="30" x2="320" y2="290" strokeWidth="1" className="stroke-border" />

        {/* the shape a cheap version buys: twelve short moves, correcting the whole way in */}
        <g id="iteration-paths-many" data-component="IterationPaths" transform="translate(340 0)">
          <text
            id="iteration-paths-many-label"
            data-component="IterationPaths"
            x="20"
            y="26"
            fontSize="14"
            className="fill-foreground font-medium"
          >
            {t('iteration-paths.many')}
          </text>

          <circle cx="250" cy="70" r="20" strokeWidth="2" className="fill-none stroke-primary/35" />
          <circle cx="250" cy="70" r="5" className="fill-primary/40" />
          {/* nudged left of the ring's centre so the longest label still clears the viewBox edge */}
          <text
            x="238"
            y="42"
            fontSize="13"
            textAnchor="middle"
            className="fill-muted-foreground"
            data-component="IterationPaths"
          >
            {t('iteration-paths.target')}
          </text>

          <polyline
            id="iteration-paths-many-line"
            data-component="IterationPaths"
            points={MANY}
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="stroke-primary fill-none"
          />

          {toPoints(MANY).map(([x, y], index) => (
            <circle
              key={`${x},${y}`}
              id={`iteration-paths-many-step-${index}`}
              data-component="IterationPaths"
              cx={x}
              cy={y}
              r={index === 0 ? 7 : 4}
              className="fill-primary"
            />
          ))}

          <text
            x="60"
            y="278"
            fontSize="13"
            textAnchor="middle"
            className="fill-muted-foreground"
            data-component="IterationPaths"
          >
            {t('iteration-paths.start')}
          </text>
        </g>
      </svg>
    </figure>
  )
}
