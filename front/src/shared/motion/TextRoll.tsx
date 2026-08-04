import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { EASE_QUIET } from '@/shared/motion/motion'
import { usePrevious } from '@/shared/motion/usePrevious'

/*
 * Adapted from Skiper UI's `skiper58` (https://skiper-ui.com/v1/skiper58): the two stacked layers,
 * the per-character stagger and the centre-out delay are theirs. What changed is the trigger. Their
 * version rolls on hover and both layers hold the same word, which is a flourish on a nav link; a
 * readout that has actually changed wants the old value leaving and the new one arriving, so the
 * top layer here holds the previous string and the roll plays when the value changes.
 * Skiper UI, free tier, attribution required. Author: @gurvinder-singh02, https://gxuri.me
 */

/** Per-character delay. Small enough that a short string reads as one movement, not a wave. */
const STAGGER = 0.035

/**
 * The most the stagger may add across the whole string. A count is a short label most of the time,
 * but "1 of 3 collected" is sixteen characters and at a flat 35ms each the last one starts half a
 * second after the first, which turns a readout into a wave crossing the panel. Past that length
 * the per-character delay is squeezed to fit instead, so a long value rolls as one movement.
 */
const STAGGER_TOTAL = 0.18

/** How long one character takes to travel its own line height. */
const ROLL = 0.4

export interface TextRollProps {
  /** BEM id for the wrapper, from the caller. */
  id: string
  /** The React function rendering this, per the naming convention. */
  component: string
  /** The current value. When it changes, the previous one rolls out and this rolls in. */
  children: string
  /** Stagger outward from the middle rather than left to right. */
  center?: boolean
  className?: string
}

/**
 * A readout that rolls when its value changes: the old string travels up and out while the new one
 * arrives from below, one character at a time.
 *
 * This exists for the one thing in the app that is a machine-produced count changing under the
 * student's hands, the flag board's "2 of 5". A number that silently repaints is the same hard cut
 * this whole pass is about, and the roll is what says *that* number is the one which just moved.
 *
 * Both layers are split one element per character, which is unreadable to a screen reader, so both
 * are `aria-hidden` and the value is carried once as ordinary visually-hidden text beside them.
 * An `aria-label` on the wrapper would not do: a `span` has no role for one to attach to.
 *
 * At rest it renders the plain string and nothing else. That is not only an optimisation: three
 * copies of a value stacked on top of each other read as one thing on screen but concatenate in
 * `textContent`, so `#flags-progress` came back as "3 of 3 collected" three times over and anything
 * asserting on it would have failed. Every element in this app is meant to be nameable from a test,
 * so the split only exists for the four hundred milliseconds it is actually moving.
 */
export function TextRoll({ id, component, children, center = false, className }: TextRollProps) {
  const reduced = useReducedMotion()
  const previous = usePrevious(children)
  // Which value the roll has already finished on. Without it the split layers would stay in the DOM
  // after they stopped moving, since nothing else re-renders this component once the roll starts,
  // and the tripled `textContent` described above would be the resting state rather than a passing
  // one. This is what puts the plain string back the moment the movement is over.
  const [settled, setSettled] = useState<string | null>(null)
  const rolling = previous !== undefined && previous !== children && settled !== children

  useEffect(() => {
    if (!rolling) return
    const total = (ROLL + STAGGER_TOTAL) * 1000 + 50
    const timer = setTimeout(() => setSettled(children), total)
    return () => clearTimeout(timer)
  }, [rolling, children])

  if (reduced || !rolling) {
    return (
      <span id={id} data-component={component} className={className}>
        {children}
      </span>
    )
  }

  const delayOf = (index: number, length: number) => {
    const step = Math.min(STAGGER, STAGGER_TOTAL / Math.max(length - 1, 1))
    return step * (center ? Math.abs(index - (length - 1) / 2) : index)
  }

  const layer = (text: string, from: string, to: string) =>
    text.split('').map((character, index) => (
      <motion.span
        // The value is part of the key, so a changed string mounts fresh spans and the roll starts
        // from the top rather than picking up wherever the last one was interrupted.
        key={`${text}-${index}`}
        className="inline-block"
        initial={{ y: from }}
        animate={{ y: to }}
        transition={{
          duration: ROLL,
          ease: EASE_QUIET,
          delay: delayOf(index, text.length),
        }}
      >
        {/* A space collapses to nothing once it is its own inline-block. */}
        {character === ' ' ? ' ' : character}
      </motion.span>
    ))

  return (
    <span
      id={id}
      data-component={component}
      className={cn('relative inline-block overflow-hidden align-bottom', className)}
    >
      <span id={`${id}-value`} data-component={component} className="sr-only">
        {children}
      </span>
      {/* The value on its way out, travelling up and off. */}
      <span id={`${id}-outgoing`} data-component={component} aria-hidden className="block">
        {layer(previous as string, '0%', '-100%')}
      </span>
      {/* The value arriving, stacked exactly over it and waiting one line below. */}
      <span
        id={`${id}-incoming`}
        data-component={component}
        aria-hidden
        className="absolute inset-0 block"
      >
        {layer(children, '100%', '0%')}
      </span>
    </span>
  )
}
