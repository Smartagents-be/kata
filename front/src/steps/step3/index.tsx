import type { Step } from '@/shared/step'
import { PipelineShift } from './PipelineShift'
import en from './locales/en.json'
import nl from './locales/nl.json'
import change from './units/change.html?raw'
import expectations from './units/expectations.html?raw'
import impostor from './units/impostor.html?raw'

/**
 * Step 3, soft skills: the part of working this way that is not about the agent at all. Step 2
 * argues what you hand over; this one argues what happens around it, and the order runs from the
 * team inwards. `change` is the job moving off production and everybody who has to move with it,
 * `expectations` is what the people around you now believe about your speed, and `impostor` is what
 * the change does to you.
 *
 * No quiz and no exercise anywhere in it: every unit here is a conversation rather than a command,
 * so there is nothing a checker could grade, and the step needs no Java either. One drawing, in
 * `change`, and it earns the exception by being a measurement of two pipelines against each other
 * rather than a picture of a sentence.
 */
const step3: Step = {
  id: 'step3',
  title: 'step.title',
  locales: { en, nl },
  units: [
    {
      id: 'change',
      title: 'change.title',
      html: change,
      // The step's one drawing, at the <div data-figure="pipeline-shift"> the unit leaves inside
      // the section on the process. It is the only thing here a room can look at together, which is
      // also what `change` renders in guided mode when the prose is dropped.
      inlineFigures: { 'pipeline-shift': <PipelineShift /> },
    },
    {
      id: 'expectations',
      title: 'expectations.title',
      html: expectations,
    },
    {
      id: 'impostor',
      title: 'impostor.title',
      html: impostor,
    },
  ],
}

export default step3
