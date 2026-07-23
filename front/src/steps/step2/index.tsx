import type { Step } from '@/shared/step'
import { DomainTree } from './DomainTree'
import { ProjectTree } from './ProjectTree'
import en from './locales/en.json'
import nl from './locales/nl.json'
import setup from './units/setup.html?raw'
import engineering from './units/engineering.html?raw'
import scoping from './units/scoping.html?raw'
import patterns from './units/patterns.html?raw'
import quality from './units/quality.html?raw'
import goals from './units/goals.html?raw'

/**
 * Step 2, agentic engineering: the six habits that decide whether working with an agent beats
 * writing the code yourself, one unit each. The step opens straight on the first of them.
 *
 * Framing prose only for now. No exercise and no quiz yet, so nothing here talks to the service.
 * `setup` and `engineering` each carry a drawing, which is why this registry is .tsx.
 */
const step2: Step = {
  id: 'step2',
  title: 'step.title',
  locales: { en, nl },
  units: [
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
  ],
}

export default step2
