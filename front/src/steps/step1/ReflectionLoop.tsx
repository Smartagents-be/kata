import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { StoryToggle } from '@/shared/motion/StoryToggle'
import { beat, cubic, glide, useStory } from '@/shared/motion/useStory'

/**
 * Reflection: a critic reviews the result against requirements and checks in its configured
 * context. A fresh review can reduce anchoring on the builder's conversation. Forked reviewers
 * can inherit that conversation, and a separate review does not guarantee correctness.
 *
 * **It plays three rounds on `useStory`'s clock** (October 2026, at the owner's asking), and three
 * things in it were corrected then and are load bearing. **The critic reads the result**: it gets
 * its own brief and the newest code, reads it, and sends findings back, which land in the builder's
 * context; a first draft showed it with nothing in it. **The builder's context only grows**: v1, its
 * findings, v2, its findings, v3 and the approval all stay, because the builder is one session and
 * "Claude Code sends your full conversation with every request" (code.claude.com/docs/en/costs). The
 * newest version is the solid one. **Every round is a new critic**, emptied before it is briefed,
 * because "Each subagent invocation creates a new instance rather than continuing an earlier one"
 * (code.claude.com/docs/en/sub-agents) and a Local subagent in VS Code "doesn't inherit the main
 * conversation history"; a resumed or forked critic would keep more, which the prose leaves to the
 * agent-patterns unit. The approval goes back to the builder too, and the last frame, which reduced
 * motion shows, is round 3 with every row in place.
 */

/** One round's beats, in ms from the start of the round. */
const WRITE = 1100
const EMPTY_TEXT = 1300
const BRIEF = 2500
const CODE_OUT = 2800
const TRAVEL = 1100
const SCAN = 4200
const SCAN_FOR = 1500
const VERDICT = SCAN + SCAN_FOR
const FINDINGS_OUT = VERDICT + 600
const ROUND = FINDINGS_OUT + TRAVEL + 1000
const FIRST = 300
const LENGTH = FIRST + 2 * ROUND + FINDINGS_OUT + TRAVEL + 400

/** Rows in the builder's context, top to bottom; every version and every review stays. */
const ROW_H = 20
const rowY = (index: number) => 84 + index * 24
const codeRow = (round: number) => 2 + (round - 1) * 2
const findingsRow = (round: number) => 3 + (round - 1) * 2
const BX = 36
const CX = 390
const SLOT_Y = 108

export function ReflectionLoop() {
  const { t } = useTranslation('step1')
  const [ref, now, story] = useStory<SVGSVGElement>(LENGTH, 3000)
  const titleId = useId()
  const arrowId = `reflection-loop-arrow-${useId().replace(/:/g, '')}`

  const round = Math.min(3, Math.max(1, Math.floor((now - FIRST) / ROUND) + 1))
  const start = FIRST + (round - 1) * ROUND
  const lt = now - start
  /* Until the new critic starts, the critic box still shows the last round's review. */
  const shown = lt < WRITE && round > 1 ? round - 1 : round
  const shownLt = shown === round ? lt : ROUND
  const briefed = shownLt >= BRIEF
  const slotted = shownLt >= CODE_OUT + TRAVEL
  const scanning = shownLt >= SCAN && shownLt < VERDICT
  const decided = shownLt >= VERDICT
  const emptyText = shown === round && lt >= EMPTY_TEXT && lt < BRIEF
  const findingsLabel = (r: number) => t(r === 3 ? 'reflection-loop.approved' : `reflection-loop.found.${r}`)

  const codeShown = (r: number) => (now >= FIRST + (r - 1) * ROUND ? 1 : 0)
  const codeFade = (r: number) => beat(now, FIRST + (r - 1) * ROUND, 350)
  const findingsShown = (r: number) => now >= FIRST + (r - 1) * ROUND + FINDINGS_OUT + TRAVEL

  const out = beat(lt, CODE_OUT, TRAVEL)
  const back = beat(lt, FINDINGS_OUT, TRAVEL)
  const outAt = cubic([BX, rowY(codeRow(round)) + 10], [200, rowY(codeRow(round)) + 10], [220, SLOT_Y + 10], [CX, SLOT_Y + 10], glide(lt, CODE_OUT, TRAVEL))
  const fy = rowY(findingsRow(round)) + 10
  const backAt = cubic([CX, 176], [240, 176], [190, fy], [BX, fy], glide(lt, FINDINGS_OUT, TRAVEL))

  const row = (
    id: string,
    x: number,
    y: number,
    width: number,
    tone: 'bar' | 'solid' | 'outline',
    label: string,
    opacity = 1,
  ) => (
    <g id={`${id}-group`} data-component="ReflectionLoop" style={{ opacity }}>
      <rect
        id={id}
        data-component="ReflectionLoop"
        x={x}
        y={y}
        width={width}
        height={ROW_H}
        rx="5"
        strokeWidth="1.5"
        className={
          tone === 'solid'
            ? 'fill-primary'
            : tone === 'outline'
              ? 'fill-primary/10 stroke-primary'
              : 'fill-primary/35'
        }
      />
      <text
        id={`${id}-label`}
        data-component="ReflectionLoop"
        x={x + 8}
        y={y + 14}
        fontSize="11"
        className={tone === 'solid' ? 'fill-primary-foreground font-mono' : 'fill-foreground font-mono'}
      >
        {label}
      </text>
    </g>
  )

  return (
    <figure id="reflection-loop" data-component="ReflectionLoop" className="my-8 flex flex-col items-center gap-2">
      <svg
        id="reflection-loop-svg"
        data-component="ReflectionLoop"
        ref={ref}
        viewBox="0 32 640 284"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        <title id={titleId} data-component="ReflectionLoop">
          {t('reflection-loop.description')}
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

        {/* the builder: one session, and its context keeps every round */}
        <rect
          id="reflection-loop-agent"
          data-component="ReflectionLoop"
          x="16"
          y="40"
          width="250"
          height="242"
          rx="16"
          strokeWidth="2"
          className="fill-primary/10 stroke-primary/50"
        />
        <text
          id="reflection-loop-agent-label"
          data-component="ReflectionLoop"
          x="36"
          y="68"
          fontSize="17"
          className="fill-foreground font-medium"
        >
          {t('reflection-loop.agent')}
        </text>
        <text
          id="reflection-loop-agent-session"
          data-component="ReflectionLoop"
          x="250"
          y="68"
          fontSize="12"
          textAnchor="end"
          className="fill-muted-foreground"
        >
          {t('reflection-loop.session')}
        </text>
        {row('reflection-loop-agent-ask', BX, rowY(0), 120, 'bar', t('reflection-loop.ask'))}
        {row('reflection-loop-agent-reasoning', BX, rowY(1), 198, 'bar', t('reflection-loop.reasoning'))}
        {[1, 2, 3].map((r) => (
          <g key={r} id={`reflection-loop-agent-round-${r}`} data-component="ReflectionLoop">
            {row(
              `reflection-loop-agent-code-${r}`,
              BX,
              rowY(codeRow(r)),
              150,
              r === round && codeShown(r) ? 'solid' : 'bar',
              t('reflection-loop.code', { n: r }),
              codeShown(r) * (r === round ? 0.25 + 0.75 * codeFade(r) : 1),
            )}
            {row(
              `reflection-loop-agent-findings-${r}`,
              BX,
              rowY(findingsRow(r)),
              r === 3 ? 204 : 178,
              'outline',
              t('reflection-loop.round-findings', { n: r, findings: findingsLabel(r) }),
              findingsShown(r) ? 1 : 0,
            )}
          </g>
        ))}

        {/* the critic: a new sub-agent every round, with its brief and the newest code */}
        <rect
          id="reflection-loop-critic"
          data-component="ReflectionLoop"
          x="374"
          y="40"
          width="250"
          height="242"
          rx="16"
          strokeWidth="2"
          className="fill-primary/5 stroke-primary/40"
        />
        <text
          id="reflection-loop-critic-label"
          data-component="ReflectionLoop"
          x="390"
          y="68"
          fontSize="17"
          className="fill-foreground font-medium"
        >
          {t('reflection-loop.critic')}
        </text>
        <text
          id="reflection-loop-critic-instance"
          data-component="ReflectionLoop"
          x="608"
          y="68"
          fontSize="12"
          textAnchor="end"
          className="fill-muted-foreground"
        >
          {round === 1 && lt < EMPTY_TEXT ? '' : t('reflection-loop.instance', { n: emptyText || shown === round ? round : shown })}
        </text>
        <text
          id="reflection-loop-critic-empty-label"
          data-component="ReflectionLoop"
          x="499"
          y="124"
          fontSize="12"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ opacity: emptyText ? 1 : 0 }}
        >
          {t('reflection-loop.empty')}
        </text>
        {row('reflection-loop-critic-brief', CX, rowY(0), 160, 'bar', t('reflection-loop.brief'), briefed && !emptyText ? 1 : 0)}
        {row(
          'reflection-loop-critic-result',
          CX,
          SLOT_Y,
          150,
          'solid',
          t('reflection-loop.code', { n: shown }),
          slotted && !emptyText ? 1 : 0,
        )}
        <rect
          id="reflection-loop-critic-scan"
          data-component="ReflectionLoop"
          x={CX + beat(lt, SCAN, SCAN_FOR) * 147}
          y={SLOT_Y - 3}
          width="3"
          height="26"
          className="fill-foreground"
          style={{ opacity: scanning && shown === round ? 1 : 0 }}
        />
        <text
          id="reflection-loop-critic-verdict"
          data-component="ReflectionLoop"
          x={CX}
          y="154"
          fontSize="13"
          fontWeight="600"
          className={shown === 3 ? 'fill-primary' : 'fill-foreground'}
          style={{ opacity: decided && !emptyText ? 1 : 0 }}
        >
          {findingsLabel(shown)}
        </text>

        {/* out with the result, back with the findings */}
        <path
          id="reflection-loop-handoff"
          data-component="ReflectionLoop"
          d="M 268 118 L 370 118"
          fill="none"
          strokeWidth="2"
          markerEnd={`url(#${arrowId})`}
          className="stroke-primary/50"
        />
        <text
          id="reflection-loop-handoff-label"
          data-component="ReflectionLoop"
          x="319"
          y="108"
          fontSize="12"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('reflection-loop.hands-over')}
        </text>
        <path
          id="reflection-loop-verdict"
          data-component="ReflectionLoop"
          d="M 372 176 L 270 176"
          fill="none"
          strokeWidth="2"
          markerEnd={`url(#${arrowId})`}
          className="stroke-primary/50"
        />
        <text
          id="reflection-loop-verdict-label"
          data-component="ReflectionLoop"
          x="319"
          y="196"
          fontSize="12"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('reflection-loop.back')}
        </text>

        {/* what travels: a copy of the newest code going out, the findings coming back */}
        <g
          id="reflection-loop-code-chip"
          data-component="ReflectionLoop"
          transform={`translate(${outAt[0]} ${outAt[1] - 10})`}
          style={{ opacity: out > 0 && out < 1 ? 1 : 0 }}
        >
          {row('reflection-loop-code-chip-box', 0, 0, 150, 'solid', t('reflection-loop.code', { n: round }))}
        </g>
        <g
          id="reflection-loop-findings-chip"
          data-component="ReflectionLoop"
          transform={`translate(${backAt[0]} ${backAt[1] - 10})`}
          style={{ opacity: back > 0 && back < 1 ? 1 : 0 }}
        >
          {row('reflection-loop-findings-chip-box', 0, 0, 178, 'outline', findingsLabel(round))}
        </g>

        <text
          id="reflection-loop-round"
          data-component="ReflectionLoop"
          x="16"
          y="306"
          fontSize="12"
          className="fill-muted-foreground font-mono"
        >
          {now >= LENGTH ? t('reflection-loop.round-end') : t('reflection-loop.round', { n: round })}
        </text>
      </svg>
      <StoryToggle id="reflection-loop" component="ReflectionLoop" story={story} className="max-w-xl" />
    </figure>
  )
}
