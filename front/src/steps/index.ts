import type { Step } from '@/shared/step'
import step1 from './step1'

/**
 * The curriculum, in order. Adding a step means creating src/steps/stepN/ with a content.html
 * and an index.ts, then appending it here — the sidebar and the routes both read this list.
 */
export const steps: Step[] = [step1]

export function findStep(id: string | undefined): Step | undefined {
  return steps.find((step) => step.id === id)
}
