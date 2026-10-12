import { useId, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The map at the head of `agent-patterns`: one question, "who decides what runs next?", and the
 * unit's five patterns placed on it. On the left the code decides (fixed steps, predictable and
 * cheap): the sequential workflow and reflection. On the right a model decides (flexible, more
 * calls): routing, the coordinator and decomposition. Each glyph is the pattern's own shape.
 *
 * It is a simpler version of Google Cloud's overview (October 2026, at the owner's asking), which
 * sorts its patterns into "Workflows that are deterministic" against "Workflows that require dynamic
 * orchestration" (docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system). Two of
 * the placements are Google's own words: review and critique, which is this unit's reflection, is
 * "an implementation of the loop agent pattern", a loop code runs; hierarchical task decomposition
 * is "an implementation of the coordinator pattern". Routing is Anthropic's ("classifies an input
 * and directs it to a specialized followup task"), and a model picks the route, so its glyph lights
 * one branch and leaves the other dashed. **Only the unit's five**: Google lists twelve, and the
 * owner wanted the map to be the unit's own. Still, on purpose: it is a map read at a glance.
 *
 * Dark teal is where a model decides, the soft teal is what it decides between, and there is no
 * context frame, because nothing here has been handed to anybody yet.
 */
export function PatternMap() {
  const { t } = useTranslation('step1')
  const titleId = useId()

  const name = (id: string, x: number, y: number, key: string) => (
    <text id={id} data-component="PatternMap" x={x} y={y} fontSize="14" className="fill-foreground">
      {t(key)}
    </text>
  )
  const glyph = (id: string, x: number, y: number, children: ReactNode) => (
    <g id={id} data-component="PatternMap" transform={`translate(${x} ${y})`}>
      {children}
    </g>
  )
  const line = 'stroke-primary fill-none'
  const soft = 'fill-primary/40'
  const hard = 'fill-primary'

  return (
    <figure id="pattern-map" data-component="PatternMap" className="my-8 flex justify-center">
      <svg
        id="pattern-map-svg"
        data-component="PatternMap"
        viewBox="0 0 640 300"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        <title id={titleId} data-component="PatternMap">
          {t('pattern-map.description')}
        </title>

        <text
          id="pattern-map-question"
          data-component="PatternMap"
          x="320"
          y="20"
          fontSize="16"
          textAnchor="middle"
          className="fill-foreground font-semibold"
        >
          {t('pattern-map.question')}
        </text>
        <path id="pattern-map-axis" data-component="PatternMap" d="M 40 38 H 598" strokeWidth="1.5" className="stroke-foreground" />
        <path id="pattern-map-axis-head" data-component="PatternMap" d="M 590 33 L 600 38 L 590 43" strokeWidth="1.5" className="stroke-foreground fill-none" />
        <text id="pattern-map-fixed" data-component="PatternMap" x="40" y="57" fontSize="12" className="fill-muted-foreground">
          {t('pattern-map.fixed')}
        </text>
        <text id="pattern-map-flexible" data-component="PatternMap" x="600" y="57" fontSize="12" textAnchor="end" className="fill-muted-foreground">
          {t('pattern-map.flexible')}
        </text>
        <path id="pattern-map-divider" data-component="PatternMap" d="M 320 80 V 292" strokeWidth="1" strokeDasharray="4 4" className="stroke-border" />

        {/* the code decides */}
        {glyph(
          'pattern-map-sequential',
          40,
          112,
          <>
            <circle cx="8" cy="10" r="7" className={soft} />
            <path d="M 17 10 H 37" strokeWidth="1.8" className={line} />
            <circle cx="46" cy="10" r="7" className={soft} />
            <path d="M 55 10 H 75" strokeWidth="1.8" className={line} />
            <circle cx="84" cy="10" r="7" className={soft} />
          </>,
        )}
        {name('pattern-map-sequential-name', 150, 127, 'pattern-map.sequential')}
        {glyph(
          'pattern-map-reflection',
          40,
          170,
          <>
            <circle cx="8" cy="10" r="7" className={soft} />
            <path d="M 17 10 H 48" strokeWidth="1.8" className={line} />
            <rect x="50" y="2" width="16" height="16" rx="3" transform="rotate(45 58 10)" className={hard} />
            <path d="M 58 22 V 32 H 8 V 19" strokeWidth="1.8" className={line} />
          </>,
        )}
        {name('pattern-map-reflection-name', 150, 185, 'pattern-map.reflection')}

        {/* a model decides */}
        {glyph(
          'pattern-map-routing',
          340,
          104,
          <>
            <circle cx="10" cy="18" r="9" className={hard} />
            <path d="M 20 14 L 52 4" strokeWidth="1.8" className={line} />
            <path d="M 20 22 L 52 32" strokeWidth="1.5" strokeDasharray="3 3" className="stroke-primary/50 fill-none" />
            <circle cx="60" cy="4" r="6" className={hard} />
            <circle cx="60" cy="32" r="6" strokeWidth="1.5" strokeDasharray="3 2" className="stroke-primary/50 fill-none" />
          </>,
        )}
        {name('pattern-map-routing-name', 450, 127, 'pattern-map.routing')}
        {glyph(
          'pattern-map-coordinator',
          340,
          160,
          <>
            <circle cx="10" cy="18" r="9" className={hard} />
            <path d="M 20 14 L 52 2 M 20 18 H 52 M 20 22 L 52 34" strokeWidth="1.8" className={line} />
            <circle cx="60" cy="2" r="6" className={soft} />
            <circle cx="60" cy="18" r="6" className={soft} />
            <circle cx="60" cy="34" r="6" className={soft} />
          </>,
        )}
        {name('pattern-map-coordinator-name', 450, 183, 'pattern-map.coordinator')}
        {glyph(
          'pattern-map-decomposition',
          340,
          222,
          <>
            <circle cx="36" cy="6" r="7" className={hard} />
            <path
              d="M 36 13 L 18 30 M 36 13 L 54 30 M 18 36 L 8 52 M 18 36 L 28 52 M 54 36 L 44 52 M 54 36 L 64 52"
              strokeWidth="1.5"
              className={line}
            />
            <circle cx="18" cy="33" r="5" className={hard} />
            <circle cx="54" cy="33" r="5" className={hard} />
            <circle cx="8" cy="56" r="4" className={soft} />
            <circle cx="28" cy="56" r="4" className={soft} />
            <circle cx="44" cy="56" r="4" className={soft} />
            <circle cx="64" cy="56" r="4" className={soft} />
          </>,
        )}
        {name('pattern-map-decomposition-name', 450, 260, 'pattern-map.decomposition')}
      </svg>
    </figure>
  )
}
