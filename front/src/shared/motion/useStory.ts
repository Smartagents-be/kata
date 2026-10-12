import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/** What a story figure hands its pause button. */
export interface StoryControl {
  playing: boolean
  toggle: () => void
}

/**
 * The clock a story figure is drawn from: `t`, in milliseconds, running from 0 to `length`, held
 * there for `hold`, and then round again.
 *
 * A story figure is one whose point is an order of events (a tool call going out and its result
 * coming back, a gate going red twice and then green), so it renders as a pure function of `t`
 * rather than chaining transitions. That keeps every frame reproducible, which is what lets the
 * reduced-motion state be simply the last frame: **under `prefers-reduced-motion` the story starts
 * paused on its last frame**, the finished drawing, the way `AgentLoop` goes fully static, and only
 * plays if the reader presses play.
 *
 * The story only plays while somebody can see it, and starts from the beginning each time they can:
 *
 * - **On a slide** it follows the deck. `deck-stage` keeps every slide mounted and hides the
 *   inactive ones with `visibility`, which an `IntersectionObserver` cannot see, so the hook finds
 *   its slide (a direct child of `<deck-stage>`) and listens for the engine's `slidechange`: the
 *   story restarts when its slide becomes active and stops when it leaves. This is the outside hook
 *   the vendored engine offers, so `deck-stage.js` stays untouched.
 * - **On a unit page** it starts when a third of the figure is on screen and stops when it scrolls
 *   away, so a reader arriving at the figure sees it from its first step.
 *
 * **Every story can be paused**, through the third value and `StoryToggle` (October 2026, at the
 * owner's asking): a pause holds the frame it is on, and play carries on from there, or from the
 * start if the story had finished.
 */
export function useStory<T extends Element>(length: number, hold = 2500) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion() ?? false
  const [paused, setPaused] = useState(reduced)
  const [t, setT] = useState(reduced ? length : 0)
  const elapsed = useRef(reduced ? length : 0)
  const seen = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    let raf = 0
    let base = -1
    const tick = (now: number) => {
      if (base < 0) base = now - elapsed.current
      elapsed.current = (now - base) % (length + hold)
      setT(Math.min(elapsed.current, length))
      raf = requestAnimationFrame(tick)
    }
    const run = () => {
      cancelAnimationFrame(raf)
      base = -1
      if (!paused) raf = requestAnimationFrame(tick)
    }
    const show = (visible: boolean) => {
      if (visible === seen.current) return
      seen.current = visible
      if (!visible) {
        cancelAnimationFrame(raf)
        return
      }
      if (!paused) {
        elapsed.current = 0
        setT(0)
      }
      run()
    }
    if (seen.current) run()

    const slide = node.closest('deck-stage > *')
    if (slide) {
      const deck = slide.parentElement
      const sync = () => show(slide.hasAttribute('data-deck-active'))
      sync()
      deck?.addEventListener('slidechange', sync)
      return () => {
        deck?.removeEventListener('slidechange', sync)
        cancelAnimationFrame(raf)
      }
    }

    const watch = new IntersectionObserver(([entry]) => show(entry.isIntersecting), {
      threshold: 0.35,
    })
    watch.observe(node)
    return () => {
      watch.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [length, hold, paused])

  const control: StoryControl = {
    playing: !paused,
    toggle: () => {
      if (paused && elapsed.current >= length) elapsed.current = 0
      setPaused(!paused)
    },
  }

  return [ref, t, control] as const
}

/** How far `t` is through a beat that starts at `from` and lasts `dur`, from 0 to 1. */
export function beat(t: number, from: number, dur: number) {
  if (dur <= 0) return t >= from ? 1 : 0
  return Math.min(1, Math.max(0, (t - from) / dur))
}

/**
 * The same, eased out: leaves fast and settles, the register of `EASE_QUIET`. For things that
 * travel; a clock or a fill that has to read as constant speed takes `beat` as it is.
 */
export function glide(t: number, from: number, dur: number) {
  const k = beat(t, from, dur)
  return 1 - Math.pow(1 - k, 3)
}

/** A point between two points, `k` of the way. */
export function between(a: readonly [number, number], b: readonly [number, number], k: number) {
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k] as const
}

type Point = readonly [number, number]

/** A point `k` of the way along a cubic Bézier, so a dot can travel a curve the figure draws. */
export function cubic(p0: Point, p1: Point, p2: Point, p3: Point, k: number) {
  const m = 1 - k
  const w = [m * m * m, 3 * m * m * k, 3 * m * k * k, k * k * k]
  const ps = [p0, p1, p2, p3]
  return [0, 1].map((i) => ps.reduce((sum, p, j) => sum + p[i] * w[j], 0)) as unknown as Point
}
