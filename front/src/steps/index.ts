import type { Step, Unit } from '@/shared/step'
import step1 from './step1'

/**
 * The curriculum, in order. Adding a step means creating src/steps/stepN/ with an index.ts and
 * its unit content, then appending it here — the sidebar and the routes both read this list.
 */
export const steps: Step[] = [step1]

export function findStep(id: string | undefined): Step | undefined {
  return steps.find((step) => step.id === id)
}

export function findUnit(step: Step, unitId: string | undefined): Unit | undefined {
  return step.units.find((unit) => unit.id === unitId)
}

export function unitPath(stepId: string, unitId: string): string {
  return `/steps/${stepId}/${unitId}`
}

/** Where the kata opens, and where a bare /steps/stepN sends you. */
export function firstUnitPath(step: Step): string {
  return unitPath(step.id, step.units[0].id)
}

/** One unit together with the step it belongs to. */
export interface UnitLocation {
  step: Step
  unit: Unit
}

/**
 * Every unit of every step, in reading order. Flattening the curriculum this way is what lets the
 * previous/next buttons walk off the end of one step and into the next without special cases.
 */
export const reading: UnitLocation[] = steps.flatMap((step) =>
  step.units.map((unit) => ({ step, unit })),
)

export function neighbours(
  stepId: string,
  unitId: string,
): { previous?: UnitLocation; next?: UnitLocation } {
  const index = reading.findIndex(
    (location) => location.step.id === stepId && location.unit.id === unitId,
  )
  if (index === -1) {
    return {}
  }
  return { previous: reading[index - 1], next: reading[index + 1] }
}
