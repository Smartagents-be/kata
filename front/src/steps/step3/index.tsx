import type { Step } from '@/shared/step'
import deck from './deck'
import { PipelineShift } from './PipelineShift'
import { WhatYouTakeBack } from './WhatYouTakeBack'
import en from './locales/en.json'
import nl from './locales/nl.json'
import { expectationsQuiz } from './quiz'
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
 * Nothing here is graded against a service and the step needs no Java. What it carries instead is
 * one browser-graded quiz, on `expectations`, and one ungraded card at the foot of `impostor` whose
 * tick is a bookmark. One drawing, in `change`, and it earns the exception by being a measurement of
 * two pipelines against each other rather than a picture of a sentence.
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
      // The step's one quiz. Three situations rather than three definitions, browser-graded, and it
      // is also what this unit renders in guided mode once the prose is dropped.
      quiz: expectationsQuiz,
    },
    {
      id: 'impostor',
      title: 'impostor.title',
      html: impostor,
      // The course's closing exercise, and the one thing in step 3 the student does. Ungraded: the
      // tick is a bookmark. Registered as `figure` rather than an inline one so it survives the
      // guided cut, which is also what stops the last page of the course rendering empty in class.
      figure: <WhatYouTakeBack />,
    },
  ],
  // What the tutor puts on the board for this step. Authored in `deck.tsx`; mostly statements,
  // because this step is argued out loud by design.
  deck,
}

export default step3
