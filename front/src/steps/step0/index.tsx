import type { Step } from '@/shared/step'
import { CodeCheck } from './CodeCheck'
import { FlagBoard } from './FlagBoard'
import { IntroLoop } from './IntroLoop'
import { Legend } from './Legend'
import { SetYourAssistant } from './SetYourAssistant'
import { hintCode, introCode } from './code'
import deck from './deck'
import en from './locales/en.json'
import nl from './locales/nl.json'
import { understoodQuiz } from './quiz'
import backend from './units/backend.html?raw'
import welcome from './units/welcome.html?raw'
import workshop from './units/workshop.html?raw'

/**
 * Step 0, the intro: how the kata is used before it teaches anything. Three units. `welcome` names
 * the three ways to work through it, has the student set their assistant, and clears two printed
 * codes plus one question. `backend` teaches the other half: the kata has Java behind it, one
 * project per step, and a code block is something you hand to your agent rather than paste into a
 * terminal. `workshop` is the board those two pages have been pointing at.
 *
 * **The three units are one loop taught once and then run three times.** `IntroLoop` under
 * `backend`'s block draws it (your agent runs the build, the build prints a line, you read it, you
 * paste it), and each row of the board is that loop with a different profile behind it. So the
 * board's rows carry the commands and the unit's prose carries none: `workshop.html` says what is on
 * the board and nothing about how to reach any of it, the way step 1's capstone does.
 *
 * `welcome`'s two answer boxes are `CodeCheck` and the board's three rows are `FlagBoard`, which is
 * why this registry is .tsx. Both grade in the browser against a salted SHA-256, so the whole intro
 * works with nothing else running; the Maven runs only print the codes to paste.
 *
 * **`backend` used to carry a third answer box and no longer does.** Its code was the `intro`
 * profile's, which is now the board's first row, so `finishCode` and its `flag.panel.*` keys went
 * rather than being kept beside a digest that is in `flags.ts` as well. A page ending on a box the
 * next page grades again was the intro asking for the same paste twice.
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
        'set-your-assistant': <SetYourAssistant />,
        'code-check': <CodeCheck code={introCode} />,
        'hint-check': <CodeCheck code={hintCode} idBase="hint-check" />,
        legend: <Legend />,
      },
      quiz: understoodQuiz,
    },
    {
      id: 'backend',
      title: 'backend.title',
      html: backend,
      // The loop the board then runs three times, at the marker under the unit's one code block.
      inlineFigures: { 'intro-loop': <IntroLoop /> },
    },
    {
      id: 'workshop',
      title: 'workshop.title',
      html: workshop,
      // The step's board, and the last thing on the page. Graded in the browser against a salted
      // hash like every other board here, so the intro still needs no service.
      inlineFigures: { flags: <FlagBoard /> },
    },
  ],
  // What the tutor puts on the board for this step. Authored in `deck.tsx`, beside the reasoning
  // for what stays off it.
  deck,
}

export default step0
