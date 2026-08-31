import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The shape the `Hexagonal architecture` section is named after, drawn as the shape rather than as
 * folders: the domain inside the application, three ways in on the left and three ways out on the
 * right, and a port on the boundary each of them crosses.
 *
 * **It closes the section**, at the `data-figure="hexagon-ports"` slot under the last paragraph,
 * with `DomainTree` above it. That order is the argument. The tree is what the shape looks like on
 * disk, one folder per thing; this is what the folders are an arrangement of, and it is the last
 * word because it is the part a reader keeps. Nothing after it reads it back, so its own labels and
 * its note carry it.
 *
 * **Three adapters a side rather than one, and the count is the point.** A single box on each edge
 * draws a pipeline, which is the picture this shape exists to correct: the inside does not know how
 * many ways in there are, and adding a fourth is a box on the outside and nothing else. It is also
 * where this drawing and `DomainTree` deliberately part company. The tree is one example project so
 * it ships one adapter per direction; this is the shape, so it shows the fan. The leaf names are
 * still the tree's own (`web/rest`, `persistence/postgres`, `archive/s3`), which is what keeps them
 * a pair without making them a copy.
 *
 * **It carries no note under the frame**, and what that costs is worth knowing before anything is
 * written back. The note said the calls go out while the dependencies still come in, which is the
 * twist a folder listing cannot show and the whole of what "hexagonal" buys. That claim now lives
 * only in `hexagonal-architecture.1`, in the sentence about no class outside `adapter/` naming
 * Postgres. The ports are still teal because they still belong to the inside, and a reader who
 * knows the shape reads that off them; a reader who does not gets the shape and the fan.
 *
 * **The arrows are calls, never dependencies.** Drawing the dependency arrows as well puts twelve
 * arrows on one figure and neither set reads. Only the two ports on the vertices are labelled,
 * because six labels is the noise the ports were meant to replace, and naming the marker once names
 * all six.
 *
 * The two column labels are `DomainTree`'s own `incoming` and `outgoing` notes rather than strings
 * of this figure's own, so a rewording of that tree's vocabulary moves this drawing with it. The
 * package names are literals, like every path in the course.
 */

const CX = 320
const CY = 130
const R = 100
/** Half-height of the hexagon: where the upper-left and lower-left vertices sit. */
const HALF_H = R * Math.sin(Math.PI / 3)

const BOX_W = 150
const BOX_H = 34
const LEFT_X = 6
const RIGHT_X = 484

/** How far above and below the middle the outer two adapters sit. */
const ROW_DY = 52
const ROWS = [-ROW_DY, 0, ROW_DY]

const INCOMING = ['web/rest', 'messaging/kafka', 'scheduler']
const OUTGOING = ['persistence/postgres', 'archive/s3', 'mail/smtp']

/** So an arrowhead reads as arriving rather than touching. */
const STANDOFF = 8

/** Flat-top hexagon: the left and right vertices are points, and the sides slope away from them. */
function hexagon(r: number) {
  return Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI / 3) * index
    return `${CX + r * Math.cos(angle)},${CY + r * Math.sin(angle)}`
  }).join(' ')
}

/** Where the outer hexagon's edge sits at a given height, which is where that row's port goes. */
function edgeX(dy: number, side: -1 | 1) {
  return CX + side * (R - (Math.abs(dy) / HALF_H) * (R / 2))
}

export function HexagonPorts() {
  const { t } = useTranslation('step2')
  const titleId = useId()
  const arrowId = `hexagon-ports-arrow-${useId().replace(/:/g, '')}`

  return (
    <figure id="hexagon-ports" data-component="HexagonPorts" className="my-8 flex justify-center">
      <svg
        id="hexagon-ports-svg"
        data-component="HexagonPorts"
        viewBox="0 0 640 226"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="HexagonPorts">
          {t('hexagon-ports.description')}
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
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-muted-foreground/70" />
          </marker>
        </defs>

        <polygon
          id="hexagon-ports-application"
          data-component="HexagonPorts"
          points={hexagon(R)}
          strokeWidth="1.5"
          className="fill-background stroke-muted-foreground/60"
        />
        <text
          id="hexagon-ports-application-label"
          data-component="HexagonPorts"
          x={CX}
          y={CY - R + 30}
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground font-mono"
        >
          application/
        </text>

        <polygon
          id="hexagon-ports-domain"
          data-component="HexagonPorts"
          points={hexagon(58)}
          strokeWidth="2"
          className="fill-primary/10 stroke-primary"
        />
        <text
          id="hexagon-ports-domain-label"
          data-component="HexagonPorts"
          x={CX}
          y={CY + 5}
          fontSize="14"
          textAnchor="middle"
          className="fill-foreground font-mono"
        >
          domain/
        </text>

        <text
          id="hexagon-ports-incoming-label"
          data-component="HexagonPorts"
          x={LEFT_X}
          y={CY - ROW_DY - BOX_H / 2 - 12}
          fontSize="12"
          className="fill-muted-foreground"
        >
          {t('domain-tree.incoming.note')}
        </text>
        <text
          id="hexagon-ports-outgoing-label"
          data-component="HexagonPorts"
          x={RIGHT_X + BOX_W}
          y={CY - ROW_DY - BOX_H / 2 - 12}
          fontSize="12"
          textAnchor="end"
          className="fill-muted-foreground"
        >
          {t('domain-tree.outgoing.note')}
        </text>

        {ROWS.map((dy, index) => {
          const y = CY + dy
          const portLeft = edgeX(dy, -1)
          const portRight = edgeX(dy, 1)

          return (
            <g key={dy} id={`hexagon-ports-row-${index}`} data-component="HexagonPorts">
              <rect
                id={`hexagon-ports-incoming-${index}`}
                data-component="HexagonPorts"
                x={LEFT_X}
                y={y - BOX_H / 2}
                width={BOX_W}
                height={BOX_H}
                rx="8"
                strokeWidth="1.5"
                className="fill-background stroke-muted-foreground/60"
              />
              <text
                id={`hexagon-ports-incoming-${index}-name`}
                data-component="HexagonPorts"
                x={LEFT_X + BOX_W / 2}
                y={y + 4}
                fontSize="11.5"
                textAnchor="middle"
                className="fill-foreground font-mono"
              >
                {INCOMING[index]}
              </text>
              <path
                id={`hexagon-ports-call-in-${index}`}
                data-component="HexagonPorts"
                d={`M ${LEFT_X + BOX_W + STANDOFF} ${y} H ${portLeft - STANDOFF - 4}`}
                fill="none"
                strokeWidth="1.5"
                markerEnd={`url(#${arrowId})`}
                className="stroke-muted-foreground/70"
              />

              <rect
                id={`hexagon-ports-outgoing-${index}`}
                data-component="HexagonPorts"
                x={RIGHT_X}
                y={y - BOX_H / 2}
                width={BOX_W}
                height={BOX_H}
                rx="8"
                strokeWidth="1.5"
                className="fill-background stroke-muted-foreground/60"
              />
              <text
                id={`hexagon-ports-outgoing-${index}-name`}
                data-component="HexagonPorts"
                x={RIGHT_X + BOX_W / 2}
                y={y + 4}
                fontSize="11.5"
                textAnchor="middle"
                className="fill-foreground font-mono"
              >
                {OUTGOING[index]}
              </text>
              <path
                id={`hexagon-ports-call-out-${index}`}
                data-component="HexagonPorts"
                d={`M ${portRight + STANDOFF} ${y} H ${RIGHT_X - STANDOFF}`}
                fill="none"
                strokeWidth="1.5"
                markerEnd={`url(#${arrowId})`}
                className="stroke-muted-foreground/70"
              />

              {/* One port per crossing, sitting on the boundary because the interface is the
                  inside's. Only the middle pair is named: six labels is the clutter the marker
                  exists to avoid, and naming it once names all six. */}
              {[portLeft, portRight].map((x, side) => (
                <g key={x} id={`hexagon-ports-port-${index}-${side}`} data-component="HexagonPorts">
                  <rect
                    id={`hexagon-ports-port-${index}-${side}-mark`}
                    data-component="HexagonPorts"
                    x={x - 7}
                    y={y - 7}
                    width="14"
                    height="14"
                    rx="3"
                    className="fill-primary"
                  />
                  {dy === 0 && (
                    <text
                      id={`hexagon-ports-port-${index}-${side}-label`}
                      data-component="HexagonPorts"
                      x={x}
                      y={y + 30}
                      fontSize="11"
                      textAnchor="middle"
                      className="fill-primary"
                    >
                      {t('hexagon-ports.port')}
                    </text>
                  )}
                </g>
              ))}
            </g>
          )
        })}
      </svg>
    </figure>
  )
}
