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
 *
 * `ABANDONED` is the same reading of a dash a second time: nodes on the right-hand path throw off
 * versions that were built and dropped. Every one of them **is aimed at the same target and none of
 * them arrives**, which is what makes it a version of the work rather than a detour, and **most are
 * a single step**, since a version you throw away is usually one swing. They start **early as well as
 * late**, so branching is not something that only happens near the finish, and one node carries two of
 * them because taking the same step three ways is the point. Only the right half has any, and that is
 * the argument: a step you can take again is a step you can afford to take twice, which the left half
 * at weeks a version cannot, so the left half never branches.
 *
 * Three geometric constraints, all easy to break and none of them visible in a diff. The spurs live
 * in the empty wedge below the main path, no two of them overlap in x unless they leave the same node
 * (which is what keeps them from crossing each other), and none comes within the target ring's radius
 * of its centre, or a dropped version reads as arriving. Moving a point on `MANY` means re-checking
 * all four by eye.
 */
const FEW = '60,250 170,190 110,120 205,105'
const MANY =
  '60,250 86,246 83,211 115,213 117,183 145,181 151,156 174,149 184,127 205,117 217,99 235,86 250,70'
const ABANDONED = [
  '86,246 114,231',
  '115,213 145,197',
  '205,117 259,101',
  '205,117 232,127 256,120',
]

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

          {/* the versions that did not survive, drawn under the path that did */}
          {ABANDONED.map((branch, index) => (
            <g key={branch} id={`iteration-paths-many-branch-${index}`} data-component="IterationPaths">
              <polyline
                points={branch}
                strokeWidth="2"
                strokeLinejoin="round"
                strokeDasharray="4 4"
                className="fill-none stroke-primary/50"
                data-component="IterationPaths"
              />
              {toPoints(branch)
                .slice(1)
                .map(([x, y]) => (
                  <circle
                    key={`${x},${y}`}
                    cx={x}
                    cy={y}
                    r="3"
                    className="fill-primary/50"
                    data-component="IterationPaths"
                  />
                ))}
            </g>
          ))}

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
