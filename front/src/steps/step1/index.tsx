import type { Step } from '@/shared/step'
import { ContextDiagram } from './ContextDiagram'
import { introQuiz, promptQuiz } from './quiz'
import intro from './units/intro.html?raw'
import introNl from './units/intro.nl.html?raw'
import prompt from './units/prompt.html?raw'
import promptNl from './units/prompt.nl.html?raw'
import session from './units/session.html?raw'
import sessionNl from './units/session.nl.html?raw'
import project from './units/project.html?raw'
import projectNl from './units/project.nl.html?raw'
import harness from './units/harness.html?raw'
import harnessNl from './units/harness.nl.html?raw'
import memory from './units/memory.html?raw'
import memoryNl from './units/memory.nl.html?raw'
import external from './units/external.html?raw'
import externalNl from './units/external.nl.html?raw'
import window from './units/window.html?raw'
import windowNl from './units/window.nl.html?raw'
import evaluation from './units/evaluation.html?raw'
import evaluationNl from './units/evaluation.nl.html?raw'

/**
 * Step 1, one layer of context per unit. Two units are graded: `memory` asks what survives a
 * /clear (SurvivesClearChecker) and `evaluation` closes the step (ContextLayersChecker).
 *
 * Answer labels stay English in every language: they are what the Java checkers grade.
 */
const step1: Step = {
  id: 'step1',
  // The same word in both languages, so English carries it and every locale falls back to it.
  title: { en: 'Context' },
  units: [
    {
      id: 'intro',
      title: { en: 'What context is', nl: 'Wat context is' },
      html: { en: intro, nl: introNl },
      figure: <ContextDiagram />,
      quiz: introQuiz,
    },
    {
      id: 'prompt',
      title: { en: 'Your prompt', nl: 'Je prompt' },
      html: { en: prompt, nl: promptNl },
      quiz: promptQuiz,
    },
    {
      id: 'session',
      title: { en: 'The session', nl: 'De sessie' },
      html: { en: session, nl: sessionNl },
    },
    {
      id: 'project',
      title: { en: 'The project', nl: 'Het project' },
      html: { en: project, nl: projectNl },
    },
    {
      id: 'harness',
      title: { en: 'The harness', nl: 'De harness' },
      html: { en: harness, nl: harnessNl },
    },
    {
      id: 'memory',
      title: { en: 'Memory', nl: 'Geheugen' },
      html: { en: memory, nl: memoryNl },
      exerciseId: 'survives-clear',
      exercisePlaceholder: { en: 'keep, gone, …' },
    },
    {
      id: 'external',
      title: { en: 'Material from outside', nl: 'Materiaal van buiten' },
      html: { en: external, nl: externalNl },
    },
    {
      id: 'window',
      title: { en: 'It all has to fit', nl: 'Het moet allemaal passen' },
      html: { en: window, nl: windowNl },
    },
    {
      id: 'evaluation',
      title: { en: 'Step test', nl: 'Steptest' },
      html: { en: evaluation, nl: evaluationNl },
      exerciseId: 'context-layers',
      exercisePlaceholder: { en: 'prompt, session, project, …' },
    },
  ],
}

export default step1
