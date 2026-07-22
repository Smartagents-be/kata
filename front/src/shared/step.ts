import type { ReactNode } from 'react'
import type { Localised } from '@/shared/i18n/locale'

/**
 * One option in a {@link QuizQuestion}. Exactly one choice per question carries `correct: true`.
 */
export interface QuizChoice {
  /** Unique within its question; used as the radio value, never shown. */
  id: string
  label: Localised<string>
  correct?: boolean
}

/**
 * A multiple-choice question graded in the browser, unlike the exercises the Java service checks.
 * There is nothing to grade on the server here: the answer is one of the options on screen, and
 * the point is the explanation the student reads straight after picking.
 */
export interface QuizQuestion {
  id: string
  question: Localised<string>
  choices: QuizChoice[]
  /**
   * Shown under the question only when the student got it wrong. A right answer is already marked
   * as right and needs no words, so keep this to a sentence or two saying what actually happened.
   */
  explanation: Localised<string>
}

/**
 * One page of the kata. A unit covers a single idea: some prose, optionally an exercise under it.
 * Either half may be left out, so a unit can be prose with nothing to submit, or an exercise with
 * no lesson in front of it (the evaluation at the end of a step).
 *
 * Everything the student reads is {@link Localised}: English is required, other languages are
 * optional, and a unit with no translation yet simply shows its English text.
 */
export interface Unit {
  /** Path segment for this unit, e.g. /steps/step1/prompt. Never translated — it is a URL. */
  id: string
  title: Localised<string>
  /** Raw HTML body per language; see renderForMode() for the data-audience convention. */
  html?: Localised<string>
  /**
   * A drawing shown under the prose. Anything a diagram needs (geometry, labels, how it grows from
   * one unit to the next) belongs to the step, so the step passes the element in and `shared` only
   * gives it a place to sit. That keeps the dependency pointing one way.
   */
  figure?: ReactNode
  /** Multiple-choice questions shown under the prose, graded in the browser. */
  quiz?: QuizQuestion[]
  /** Exercise id the answer is graded against, if this unit asks for one. */
  exerciseId?: string
  /** Example answer shown in the empty answer box; the shape is the unit's business, not shared's. */
  exercisePlaceholder?: Localised<string>
}

/**
 * One step of the kata, made of units read in order. Each step folder under src/steps/
 * default-exports one of these; the registry in src/steps/index.ts puts the steps in order.
 */
export interface Step {
  /** Path segment for this step, e.g. /steps/step1. Never translated — it is a URL. */
  id: string
  title: Localised<string>
  /** At least one; the first is where the step opens. */
  units: Unit[]
}
