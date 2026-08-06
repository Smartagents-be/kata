import type { Step } from '@/shared/step'
import { CodeCheck } from './CodeCheck'
import { Legend } from './Legend'
import { finishCode, hintCode, introCode } from './code'
import deck from './deck'
import en from './locales/en.json'
import nl from './locales/nl.json'
import { understoodQuiz } from './quiz'
import backend from './units/backend.html?raw'
import welcome from './units/welcome.html?raw'

/**
 * Step 0, the intro: how the kata is used before it teaches anything. Two units. `welcome` names the
 * three ways to work through it and clears one printed code plus one question. `backend` teaches the
 * other half: the kata has a Java backend you run with Maven, and some codes are earned by running
 * it rather than read off the page.
 *
 * Each unit carries its answer box inline, at the <div data-figure="code-check"> its HTML leaves,
 * which is why this registry is .tsx. Both boxes are browser-graded, like every exercise here, so
 * the intro works with the backend down; the Maven run only prints the code to paste.
 */
const step0: Step = {
  id: 'step0',
  title: 'step.title',
  locales: { en, nl },
  units: [
    {
      id: 'welcome',
      title: 'welcome.title',
      html: welcome,
      inlineFigures: {
        // Keyed by code id so React remounts rather than reusing this box's state when the page
        // switches to the backend unit, whose figure sits in the same slot.
        'code-check': <CodeCheck key={introCode.id} code={introCode} />,
        'hint-check': <CodeCheck key={hintCode.id} code={hintCode} idBase="hint-check" />,
        legend: <Legend />,
      },
      quiz: understoodQuiz,
    },
    {
      id: 'backend',
      title: 'backend.title',
      html: backend,
      inlineFigures: { 'code-check': <CodeCheck key={finishCode.id} code={finishCode} /> },
    },
  ],
  // What the tutor puts on the board for this step. Authored in `deck.tsx`, beside the reasoning
  // for what stays off it.
  deck,
}

export default step0
