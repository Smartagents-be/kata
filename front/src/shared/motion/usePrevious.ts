import { useEffect, useRef } from 'react'

/**
 * The value this component was rendered with last time, or `undefined` on the first render.
 *
 * Motion in this app is mostly driven by the difference between two renders rather than by an
 * event: a count that changed rolls, a board that has just filled up traces its edge, a row that
 * was locked a moment ago sweeps. All three need the same thing, which is a way to tell "this is
 * true" from "this has just become true", and all three need the first render to count as neither,
 * so a page rebuilt from localStorage shows the finished state instead of replaying how it got
 * there.
 *
 * It is written in an effect rather than during render, so a render React throws away does not move
 * it, and it deliberately does not trigger a re-render of its own: the render that sees the change
 * is the one that plays the animation, and there is nothing to do afterwards.
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}
