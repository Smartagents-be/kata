/**
 * One step of the kata. Each step folder under src/steps/ default-exports one of these; the
 * registry in src/steps/index.ts puts them in order.
 */
export interface Step {
  /** Path segment for this step, e.g. /steps/step1. */
  id: string
  title: string
  /** Raw HTML body; see renderForMode() for the data-audience convention. */
  html: string
  /** Exercise id the answer is graded against, if this step asks for one. */
  exerciseId?: string
}
