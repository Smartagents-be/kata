import type { SlideSpec } from '@/shared/deck/slide-spec'

/**
 * The marker slides for the moments a unit asks the room to do something (October 2026, at the
 * owner's asking): 1 slide where a unit's exercise or quiz sits, carrying a badge, the unit as its
 * eyebrow and, for an exercise, the task card's own title. The work itself happens in the unit, on
 * each student's screen, so the slide is a stop sign and not a copy of the task: the moves, hints
 * and answers stay on the page, and a card on a slide would tick the tutor's progress anyway.
 *
 * Every marker sits on the pale teal `stop` ground, and **2 markers never follow each other**
 * (October 2026, owner's call): where a unit ends on more than 1 thing to do, `stopSlide` puts them
 * on 1 slide, a badge per kind and the things to do as its points.
 *
 * The note and the quiz title are deck chrome, so they are `ui:` keys inside the step's namespace;
 * the task's title is the step's own key, so it cannot drift from the card it names.
 */
export function taskSlide(id: string, ns: string, eyebrow: string, title: string): SlideSpec {
  return { id, kind: 'statement', ns, eyebrow, title, note: 'ui:deck.exercise.task-note', badge: 'task', stop: true }
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
    stop: true,
  }
}

/** 1 thing to do on a combined stop: a task card's title key, or the unit's quiz. */
export type StopItem = { task: string } | 'quiz'

/**
 * The stop for a unit that ends on more than 1 thing to do, in the unit's own order. The heading
 * says it is the room's turn and the points name each thing, the task by its card's title and the
 * quiz by the shared "Test your knowledge", so nothing on it copies the work.
 */
export function stopSlide(id: string, ns: string, eyebrow: string, items: StopItem[]): SlideSpec {
  const kinds = items.map((item): 'task' | 'quiz' => (item === 'quiz' ? 'quiz' : 'task'))
  return {
    id,
    kind: 'statement',
    ns,
    eyebrow,
    title: 'ui:deck.stop.title',
    note: 'ui:deck.stop.note',
    points: items.map((item) => (item === 'quiz' ? 'ui:quiz.title' : item.task)),
    badge: [...new Set(kinds)],
    stop: true,
  }
}
