import { useId } from 'react'

/**
 * The SmartAgents mark, the same inline rebuild of `smartagents.be/assets/logo.svg` the video
 * project carries in `video/src/components/Logo.tsx`, with the animation left behind: a slide is
 * a still. The geometry is data so the two copies can be diffed if the mark ever changes.
 *
 * It sits in `components` rather than in `deck` because both readings of the course carry it: the
 * footer of every slide, and the foot of the app shell.
 *
 * The gradient is the brand's own cyan to blue and deliberately not a token: it belongs to the
 * logo and is not ours to restyle, so it lives here rather than in `index.css` where something
 * else might reach for it.
 */
const NODES = [
  { cx: 24, cy: 8, r: 4 },
  { cx: 12, cy: 20, r: 3 },
  { cx: 36, cy: 20, r: 3 },
  { cx: 24, cy: 24, r: 3.5 },
  { cx: 12, cy: 32, r: 2.5 },
  { cx: 36, cy: 32, r: 2.5 },
  { cx: 24, cy: 40, r: 3 },
] as const

const EDGES = [
  [24, 8, 12, 20],
  [24, 8, 36, 20],
  [12, 20, 24, 24],
  [36, 20, 24, 24],
  [12, 20, 12, 32],
  [36, 20, 36, 32],
  [24, 24, 24, 40],
  [12, 32, 24, 40],
  [36, 32, 24, 40],
] as const

export function SmartAgentsMark({ size }: { size: number }) {
  // Two gradients with the same id on one page resolve to the first, and this mark is on every
  // slide, so the id has to be per instance.
  const gradientId = useId()

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d8ff" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#4f6cf7" />
        </linearGradient>
      </defs>

      <g stroke={`url(#${gradientId})`} strokeWidth={1.5} fill="none" opacity={0.6}>
        {EDGES.map(([x1, y1, x2, y2]) => (
          <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>

      <g fill={`url(#${gradientId})`}>
        {NODES.map((node) => (
          <circle key={`${node.cx}-${node.cy}`} cx={node.cx} cy={node.cy} r={node.r} />
        ))}
      </g>
    </svg>
  )
}
