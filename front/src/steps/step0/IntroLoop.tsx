import { useId } from 'react'
import { useStepText } from '@/shared/i18n/useStepText'

/**
 * The intro loop, drawn once so the rest of the course can stop asserting it: your agent runs the
 * build, the build prints a line, you read the string off that line, and you type it into the box on
 * the board. Four nodes, and the band under them says who is holding the work at each point.
 *
 * It sits under the `<pre>` in `backend`, which is the one run it draws. **The two nodes that act
 * are teal**, your agent and you, and the two that only produce or receive are muted; that is the
 * whole colour rule, and it is what the drawing adds to the paragraph above it.
 *
 * **Node 2's braces are empty and must stay empty.** The build prints the intro flag and this figure
 * prints no part of it: not the flag, not its shape past the braces, not a character of it. Naming
 * the `intro` profile in the command line is allowed here and nowhere else, because the root
 * `CLAUDE.md` reserves that profile for the unit that sets it, and this is that unit.
 *
 * The commands and the build's line are literals rather than locale keys, like every other piece of
 * machine output in the course. What translates is who each node is and what you do with it.
 */
const CARD_W = 130
const CARD_H = 44
const CARD_Y = 22
const PITCH = 164
const X0 = 13
/** So an arrowhead reads as arriving at a card rather than touching it. */
const STANDOFF = 7

interface LoopNode {
  key: 'agent' | 'build' | 'you' | 'box'
  /** The two that do something. Teal, against the two that are produced or filled in. */
  acts: boolean
  /** Machine-shaped lines, printed under the card. Never translated. */
  mono?: readonly string[]
  /** The empty braces. Set back, and empty on purpose: see the note above. */
  faint?: string
}

const NODES: readonly LoopNode[] = [
  { key: 'agent', acts: true, mono: ['cd kata/step0/java', 'mvn verify -Pintro'] },
  { key: 'build', acts: false, mono: ['[x] intro complete'], faint: '{……}' },
  { key: 'you', acts: true },
  { key: 'box', acts: false },
]

/** Two nodes each, so the band is where the work changes hands. */
const BANDS = [
  { key: 'machine', from: 0, span: 2 },
  { key: 'you', from: 2, span: 2 },
] as const

const cardX = (index: number) => X0 + index * PITCH
const centreX = (index: number) => cardX(index) + CARD_W / 2

export function IntroLoop() {
  const { text } = useStepText('step0')
  const titleId = useId()
  const arrowId = `intro-loop-arrow-${useId().replace(/:/g, '')}`

  return (
    <figure id="intro-loop" data-component="IntroLoop" className="my-8 flex flex-col gap-3">
      <span id="intro-loop-label" data-component="IntroLoop" className="eyebrow text-primary">
        {text('loop.title')}
      </span>

      <svg
        id="intro-loop-svg"
        data-component="IntroLoop"
        viewBox="0 0 640 160"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        <title id={titleId} data-component="IntroLoop">
          {text('loop.description')}
        </title>

        <defs>
          <marker
            id={arrowId}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary/50" />
          </marker>
        </defs>

        {/* Who is holding the work. Drawn first so the cards sit on top of it. */}
        {BANDS.map((band, index) => (
          <g key={band.key} id={`intro-loop-band-${index}`} data-component="IntroLoop">
            <rect
              x={cardX(band.from)}
              y="122"
              width={(band.span - 1) * PITCH + CARD_W}
              height="26"
              rx="6"
              className="fill-muted"
            />
            <text
              id={`intro-loop-band-${index}-label`}
              data-component="IntroLoop"
              x={cardX(band.from) + ((band.span - 1) * PITCH + CARD_W) / 2}
              y="139"
              fontSize="12"
              textAnchor="middle"
              className="fill-muted-foreground"
            >
              {text(`loop.band.${band.key}`)}
            </text>
          </g>
        ))}

        {NODES.slice(0, -1).map((node, index) => (
          <path
            key={node.key}
            id={`intro-loop-arrow-${index}`}
            data-component="IntroLoop"
            d={`M ${cardX(index) + CARD_W + STANDOFF} ${CARD_Y + CARD_H / 2} H ${cardX(index + 1) - STANDOFF}`}
            fill="none"
            strokeWidth="2"
            markerEnd={`url(#${arrowId})`}
            className="stroke-primary/50"
          />
        ))}

        {NODES.map((node, index) => (
          <g key={node.key} id={`intro-loop-node-${index}`} data-component="IntroLoop">
            <rect
              id={`intro-loop-node-${index}-card`}
              data-component="IntroLoop"
              x={cardX(index)}
              y={CARD_Y}
              width={CARD_W}
              height={CARD_H}
              rx="10"
              strokeWidth="1.5"
              className={
                node.acts ? 'fill-primary/5 stroke-primary/40' : 'fill-card stroke-border'
              }
            />
            <text
              id={`intro-loop-node-${index}-label`}
              data-component="IntroLoop"
              x={centreX(index)}
              y={CARD_Y + CARD_H / 2 + 5}
              fontSize="13"
              textAnchor="middle"
              className={node.acts ? 'fill-primary font-medium' : 'fill-muted-foreground'}
            >
              {text(`loop.${node.key}.label`)}
            </text>

            {node.mono ? (
              node.mono.map((line, lineIndex) => (
                <text
                  key={line}
                  id={`intro-loop-node-${index}-mono-${lineIndex}`}
                  data-component="IntroLoop"
                  x={centreX(index)}
                  y={88 + lineIndex * 16}
                  fontSize="10.5"
                  textAnchor="middle"
                  className="fill-muted-foreground font-mono"
                >
                  {line}
                </text>
              ))
            ) : (
              <text
                id={`intro-loop-node-${index}-body`}
                data-component="IntroLoop"
                x={centreX(index)}
                y="88"
                fontSize="11"
                textAnchor="middle"
                className="fill-muted-foreground"
              >
                {text(`loop.${node.key}.body`)}
              </text>
            )}

            {node.faint ? (
              <text
                id={`intro-loop-node-${index}-faint`}
                data-component="IntroLoop"
                x={centreX(index)}
                y={88 + (node.mono?.length ?? 0) * 16}
                fontSize="10.5"
                textAnchor="middle"
                className="fill-muted-foreground/50 font-mono"
              >
                {node.faint}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </figure>
  )
}
