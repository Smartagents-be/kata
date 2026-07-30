import type { Step } from '@/shared/step'
import en from './locales/en.json'
import nl from './locales/nl.json'
import change from './units/change.html?raw'
import expectations from './units/expectations.html?raw'
import impostor from './units/impostor.html?raw'

/**
 * Step 3, soft skills: the part of working this way that is not about the agent at all. Step 2
 * argues what you hand over; this one argues what happens around it, and the order runs from the
 * team inwards. `change` is the habits a team has to pick up, `expectations` is what the people
 * around you now believe about your speed, and `impostor` is what the change does to you.
 *
 * No figure, no quiz and no exercise anywhere in it, which is why this registry holds nothing but
 * prose. Every unit here is a conversation rather than a command, so there is nothing a checker
 * could grade and nothing a drawing would carry that the prose does not. The step needs no Java
 * either: none of it is worked against a project.
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
