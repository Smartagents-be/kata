import type { Step } from '@/shared/step'
import { DomainTree } from './DomainTree'
import { IterationPaths } from './IterationPaths'
import { ProjectTree } from './ProjectTree'
import { UnitShot } from './UnitShot'
import { Workshop } from './Workshop'
import en from './locales/en.json'
import nl from './locales/nl.json'
import evolution from './units/evolution.html?raw'
import setup from './units/setup.html?raw'
import engineering from './units/engineering.html?raw'
import scoping from './units/scoping.html?raw'
import patterns from './units/patterns.html?raw'
import quality from './units/quality.html?raw'
import goals from './units/goals.html?raw'
import workshop from './units/workshop.html?raw'

/**
 * Step 2, agentic engineering: the habits that decide whether working with an agent beats writing
 * the code yourself, one unit each. `evolution` opens the step by putting the rest of them in
 * order: small steps, taken often, on something that already runs.
 *
 * `evolution`, `setup` and `engineering` each carry a drawing, and the closing `workshop` unit
 * carries the flag board, which is why this registry is .tsx. The board is browser-graded, so the
 * step still talks to the service only through the `mvn verify -Pgraded` run the student does
 * outside the app.
 */
const step2: Step = {
  id: 'step2',
  title: 'step.title',
  locales: { en, nl },
  units: [
    {
      id: 'evolution',
      title: 'evolution.title',
      html: evolution,
      // Three slots inside the prose: the drawing under the lead, then this site as the skeleton
      // it started as and as it looks with the details in.
      inlineFigures: {
        'iteration-paths': <IterationPaths />,
        'walking-skeleton': <UnitShot id="walking-skeleton" src="/walking-skeleton.png" />,
        'added-details': <UnitShot id="added-details" src="/added-details.png" />,
      },
    },
    {
      id: 'setup',
      title: 'setup.title',
      html: setup,
      // Sits inside the prose, at the <div data-figure="project-tree"> the unit's HTML leaves.
      inlineFigures: { 'project-tree': <ProjectTree /> },
    },
    {
      id: 'engineering',
      title: 'engineering.title',
      html: engineering,
      // Sits inside the prose, at the <div data-figure="domain-tree"> the unit's HTML leaves.
      inlineFigures: { 'domain-tree': <DomainTree /> },
    },
    {
      id: 'scoping',
      title: 'scoping.title',
      html: scoping,
    },
    {
      id: 'patterns',
      title: 'patterns.title',
      html: patterns,
    },
    {
      id: 'quality',
      title: 'quality.title',
      html: quality,
    },
    {
      id: 'goals',
      title: 'goals.title',
      html: goals,
    },
    {
      id: 'workshop',
      title: 'workshop.title',
      html: workshop,
      // The flag board sits under the prose. It grades in the browser, so it is a figure rather
      // than an exerciseId (which would post to the service the step deliberately does not use).
      figure: <Workshop />,
    },
  ],
}

export default step2
