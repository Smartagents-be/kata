import type { SlideSpec } from '@/shared/deck/slide-spec'

/**
 * The marker slides for the moments a unit asks the room to do something (October 2026, at the
 * owner's asking): 1 slide where a unit's exercise or quiz sits, carrying a badge, the unit as its
 * eyebrow and, for an exercise, the task card's own title. The work itself happens in the unit, on
 * each student's screen, so the slide is a stop sign and not a copy of the task: the moves, hints
 * and answers stay on the page, and a card on a slide would tick the tutor's progress anyway.
 *
 * The note and the quiz title are deck chrome, so they are `ui:` keys inside the step's namespace;
 * the task's title is the step's own key, so it cannot drift from the card it names.
 */
export function taskSlide(id: string, ns: string, eyebrow: string, title: string): SlideSpec {
  return { id, kind: 'statement', ns, eyebrow, title, note: 'ui:deck.exercise.task-note', badge: 'task' }
}

export function quizSlide(id: string, ns: string, eyebrow: string): SlideSpec {
  return {
    id,
    kind: 'statement',
    ns,
    eyebrow,
    title: 'ui:quiz.title',
    note: 'ui:deck.exercise.quiz-note',
    badge: 'quiz',
  }
}
