import type { ReactNode } from 'react'
import type { SlideSpec } from '@/shared/deck/slide-spec'
import type { Locale } from '@/shared/i18n/locale'

/**
 * Everything a student reads is a **message key**, looked up in the step's own i18next namespace
 * (`step1`, `step2`, …). The step ships the text for every language in `Step.locales`, and
 * `steps/index.ts` registers those bundles at module load.
 *
 * Unit prose is the exception, and only half an exception: the English is the HTML file itself,
 * and its top-level elements carry `data-i18n` keys that look up their translations in the same
 * namespace. See `shared/lib/content.ts`.
 */

/** One option in a {@link QuizQuestion}. Exactly one choice per question carries `correct: true`. */
export interface QuizChoice {
  /** Unique within its question; used as the radio value, never shown. */
  id: string
  /** Message key, e.g. 'quiz.reasoning-level.bigger-model'. */
  label: string
  correct?: boolean
}

/**
 * A multiple-choice question graded in the browser, unlike the exercises the Java service checks.
 * There is nothing to grade on the server here: the answer is one of the options on screen, and
 * the point is the explanation the student reads straight after picking.
 */
export interface QuizQuestion {
  id: string
  /** Message key. */
  question: string
  choices: QuizChoice[]
  /**
   * Message key for the text shown under the question only when the student got it wrong. A right
   * answer is already marked as right and needs no words, so keep this to a sentence or two saying
   * what actually happened.
   */
  explanation: string
}

/**
 * One page of the kata. A unit covers a single idea: some prose, optionally an exercise under it.
 * Either half may be left out, so a unit can be prose with nothing to submit, or an exercise with
 * no lesson in front of it (the workshop at the end of a step).
 */
export interface Unit {
  /** Path segment for this unit, e.g. /steps/step1/prompt. Never translated: it is a URL. */
  id: string
  /** Message key, e.g. 'prompt.title'. */
  title: string
  /**
   * The unit's prose, in English, as raw HTML. Top-level elements carry `data-i18n` keys for the
   * other languages and `data-audience` for the mode; see `shared/lib/content.ts`.
   */
  html?: string
  /**
   * A drawing shown under the prose. Anything a diagram needs (geometry, labels, how it grows from
   * one unit to the next) belongs to the step, so the step passes the element in and `shared` only
   * gives it a place to sit. That keeps the dependency pointing one way.
   */
  figure?: ReactNode
  /**
   * Drawings that belong *inside* the prose, keyed by name. The unit's HTML leaves an empty
   * `<div data-figure="the-key"></div>` where each one goes, and StepContent fills it. Use this
   * over {@link figure} when the drawing only reads correctly next to the paragraph that explains
   * it.
   */
  inlineFigures?: Record<string, ReactNode>
  /** Multiple-choice questions shown under the prose, graded in the browser. */
  quiz?: QuizQuestion[]
  /** Exercise id the answer is graded against, if this unit asks for one. */
  exerciseId?: string
  /** Message key for the example answer shown in the empty answer box. */
  exercisePlaceholder?: string
}

/**
 * One step of the kata, made of units read in order. Each step folder under src/steps/
 * default-exports one of these; the registry in src/steps/index.ts puts the steps in order.
 */
export interface Step {
  /** Path segment for this step, e.g. /steps/step1. Never translated: it is a URL. */
  id: string
  /** Message key, e.g. 'step.title'. */
  title: string
  /**
   * This step's messages, one bundle per language, registered under a namespace named after `id`.
   * English is the source; a key missing from another language falls back to it.
   */
  locales: Partial<Record<Locale, Record<string, string>>>
  /** At least one; the first is where the step opens. */
  units: Unit[]
  /**
   * What the tutor puts on the board for this step, in order, appended to the deck at `/present`.
   *
   * This is authored slide content, not a second rendering of the units: no unit prose is painted
   * onto a slide and nothing here iterates {@link units}. What it does reuse is the step's
   * *figures*, so the drawing on the board is the same component the student has on their screen
   * rather than a copy of it that can drift. `shared` never reaches into a step, so a step passes
   * its slides in the same way it passes {@link Unit.figure}.
   */
  deck?: SlideSpec[]
}
