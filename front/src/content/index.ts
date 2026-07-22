import stepOneHtml from './step-01-fizzbuzz.html?raw'

export interface Step {
  /** Path segment for this step, e.g. /steps/fizzbuzz. */
  id: string
  title: string
  /** Raw HTML body; see renderForMode() for the data-audience convention. */
  html: string
  /** Exercise id the answer is graded against, if this step asks for one. */
  exerciseId?: string
}

/**
 * The curriculum, in order. Add a step by dropping a `.html` file next to this one and
 * appending an entry — the sidebar, routing and progression all read from this list.
 */
export const steps: Step[] = [
  {
    id: 'fizzbuzz',
    title: 'Warm-up: FizzBuzz',
    html: stepOneHtml,
    exerciseId: 'fizzbuzz',
  },
]

export function findStep(id: string | undefined): Step | undefined {
  return steps.find((step) => step.id === id)
}
