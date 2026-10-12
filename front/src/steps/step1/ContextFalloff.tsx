import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { StoryToggle } from '@/shared/motion/StoryToggle'
import { beat, glide, useStory } from '@/shared/motion/useStory'

/**
 * The finite context window making room. The window is a fixed frame that fills with turns, top to
 * bottom; when the stack reaches the dashed line near the bottom, compaction starts, every turn goes
 * and one short summary bar takes their place at the top, still inside the frame. What leaves the
 * frame is the detail, the faded tilted bars rising off the top, and the next turn lands under the
 * summary.
 *
 * That distinction is the figure. It drew the oldest turns spilling out of the frame once, which is
 * the branch `amnesia-context-fatigue.1` no longer claims: both harnesses this course targets
 * compact automatically, so the summary is what a student actually meets and the detail is what
 * they lose.
 *
 * **It plays compaction as it happens, on `useStory`'s clock** (October 2026, at the owner's asking),
 * and two things in it were corrected then and are load bearing. **The trigger line is at the
 * bottom**, where a stack that fills from the top reaches full; it sat at the top in a first draft,
 * which read as compaction living at the start of the window. **Only the summary is left** after
 * compaction, not the summary plus the newest turns: Claude Code "Replaces the conversation with a
 * structured summary" (code.claude.com/docs/en/context-window) and Copilot CLI "Replaces the old
 * conversation history with the summary" (read 12 October 2026). Reduced motion shows the last
 * frame: the summary, the one new turn under it, and the detail above the frame.
 */

/** Eight turns fill the frame; the eighth lands past the line. All times in ms on the story clock. */
const TURNS = 8
const FIRST = 300
const EVERY = 600
const FULL = FIRST + (TURNS - 1) * EVERY + 300
const TRIGGER = FULL + 300
const COLLAPSE = TRIGGER + 800
const SUMMARY = COLLAPSE + 700
const NEXT = SUMMARY + 700
const LENGTH = NEXT + 900

const slotY = (index: number) => 98 + index * 26
const LIMIT_Y = 282

export function ContextFalloff() {
  const { t } = useTranslation('step1')
  const [ref, now, story] = useStory<SVGSVGElement>(LENGTH, 3000)
  const titleId = useId()

  const triggered = now >= TRIGGER && now < COLLAPSE
  const collapse = glide(now, COLLAPSE, 900)
  const summary = beat(now, SUMMARY, 400)
  const next = beat(now, NEXT, 300)
  const landed = (index: number) => (now >= FIRST + index * EVERY ? 1 : 0)
  const newest = Math.min(TURNS - 1, Math.floor(Math.max(0, now - FIRST) / EVERY))

  return (
    <figure
      id="context-falloff"
      data-component="ContextFalloff"
      className="my-8 flex flex-col items-center gap-2"
    >
      <svg
        id="context-falloff-svg"
        data-component="ContextFalloff"
        ref={ref}
        viewBox="0 0 520 340"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-md"
      >
        <title id={titleId} data-component="ContextFalloff">
          {t('falloff.description')}
        </title>

        {/* the window: one fixed frame, the same teal outline as the step's other context frames */}
        <rect
          id="context-falloff-window"
          data-component="ContextFalloff"
          x="170"
          y="86"
          width="180"
          height="228"
          rx="18"
          strokeWidth="2"
          className="fill-primary/5 stroke-primary/40"
        />

        {/* where compaction starts: near full, so at the bottom of a stack that fills downwards */}
        <line
          id="context-falloff-limit"
          data-component="ContextFalloff"
          x1="170"
          y1={LIMIT_Y}
          x2="350"
          y2={LIMIT_Y}
          strokeWidth={triggered ? 3 : 1.5}
          strokeDasharray="5 5"
          className="stroke-primary"
        />
        <text
          id="context-falloff-limit-label-0"
          data-component="ContextFalloff"
          x="358"
          y={LIMIT_Y - 4}
          fontSize="13"
          className="fill-primary"
        >
          {t('falloff.limit.1')}
        </text>
        <text
          id="context-falloff-limit-label-1"
          data-component="ContextFalloff"
          x="358"
          y={LIMIT_Y + 13}
          fontSize="13"
          className="fill-primary"
        >
          {t('falloff.limit.2')}
        </text>

        {/* the detail that did not survive the summary: faded and tilted, on its way out of the
            frame. It is what is left in the air once the turns have gone. */}
        <g
          className="fill-primary/20 stroke-primary/30"
          strokeWidth="1.5"
          style={{ opacity: collapse }}
        >
          <rect
            id="context-falloff-gone-0"
            data-component="ContextFalloff"
            x="198"
            y="52"
            width="124"
            height="18"
            rx="5"
            opacity="0.5"
            transform="rotate(-6 260 61)"
          />
          <rect
            id="context-falloff-gone-1"
            data-component="ContextFalloff"
            x="208"
            y="20"
            width="110"
            height="18"
            rx="5"
            opacity="0.3"
            transform="rotate(-13 263 29)"
          />
        </g>

        {/* the turns, filling the window; at compaction every one of them rises out and goes */}
        {Array.from({ length: TURNS }, (_, index) => {
          const y = slotY(index)
          const solid = index === newest && collapse === 0
          const lift = collapse * (y - 40 + index * 4)
          const tilt = -collapse * (5 + index)
          return (
            <g
              key={index}
              id={`context-falloff-turn-${index}-group`}
              data-component="ContextFalloff"
              transform={`translate(0 ${-lift}) rotate(${tilt} 260 ${y + 12})`}
              style={{ opacity: landed(index) * (1 - collapse) }}
            >
              <rect
                id={`context-falloff-turn-${index}`}
                data-component="ContextFalloff"
                x="182"
                y={y}
                width="156"
                height="22"
                rx="6"
                strokeWidth="1.5"
                className={solid ? 'fill-primary stroke-primary' : 'fill-primary/20 stroke-primary/40'}
              />
              <rect
                id={`context-falloff-turn-${index}-line`}
                data-component="ContextFalloff"
                x="194"
                y={y + 9}
                width="104"
                height="5"
                rx="2.5"
                className={solid ? 'fill-primary-foreground/70' : 'fill-primary/40'}
              />
            </g>
          )
        })}

        {/* what compaction leaves: one short bar inside the frame */}
        <g id="context-falloff-summary-group" data-component="ContextFalloff" style={{ opacity: summary }}>
          <rect
            id="context-falloff-summary"
            data-component="ContextFalloff"
            x="196"
            y="98"
            width="128"
            height="18"
            rx="5"
            strokeWidth="1.5"
            className="fill-primary/15 stroke-primary/35"
          />
          <rect
            id="context-falloff-summary-line"
            data-component="ContextFalloff"
            x="208"
            y="105"
            width="76"
            height="4"
            rx="2"
            className="fill-primary/40"
          />
          <line x1="166" y1="107" x2="192" y2="107" strokeWidth="1.5" className="stroke-muted-foreground/50" />
          <text
            id="context-falloff-summarised-label"
            data-component="ContextFalloff"
            x="160"
            y="111"
            fontSize="14"
            textAnchor="end"
            className="fill-muted-foreground"
          >
            {t('falloff.summarised')}
          </text>
        </g>

        {/* and the next turn, under the summary */}
        <g id="context-falloff-next-group" data-component="ContextFalloff" style={{ opacity: next }}>
          <rect
            id="context-falloff-next"
            data-component="ContextFalloff"
            x="182"
            y="124"
            width="156"
            height="22"
            rx="6"
            strokeWidth="1.5"
            className="fill-primary stroke-primary"
          />
          <rect
            id="context-falloff-next-line"
            data-component="ContextFalloff"
            x="194"
            y="133"
            width="104"
            height="5"
            rx="2.5"
            className="fill-primary-foreground/70"
          />
          <line x1="356" y1="135" x2="342" y2="135" strokeWidth="1.5" className="stroke-muted-foreground/50" />
          <text
            id="context-falloff-newest-label"
            data-component="ContextFalloff"
            x="360"
            y="139"
            fontSize="14"
            className="fill-foreground"
          >
            {t('falloff.newest')}
          </text>
        </g>

        <g id="context-falloff-dropped" data-component="ContextFalloff" style={{ opacity: collapse }}>
          <line x1="352" y1="54" x2="328" y2="54" strokeWidth="1.5" className="stroke-muted-foreground/50" />
          <text
            id="context-falloff-dropped-label"
            data-component="ContextFalloff"
            x="356"
            y="58"
            fontSize="14"
            className="fill-muted-foreground"
          >
            {t('falloff.dropped')}
          </text>
        </g>

        <text
          id="context-falloff-window-label"
          data-component="ContextFalloff"
          x="260"
          y="334"
          fontSize="15"
          textAnchor="middle"
          className="fill-muted-foreground font-medium"
        >
          {t('falloff.window')}
        </text>
      </svg>
      <StoryToggle id="context-falloff" component="ContextFalloff" story={story} className="max-w-md" />
    </figure>
  )
}
