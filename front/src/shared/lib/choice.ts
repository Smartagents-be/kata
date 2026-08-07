import { cn } from '@/shared/lib/utils'

/**
 * What one pickable option on a graded exercise is doing.
 *
 * `open` and `picked` are before the check; the rest are after it. `answer` is the option the
 * student missed, and it is **teal rather than green**: red on the wrong pick would already read as
 * a failure, and marking the missed one in `--success` too would say two answers were right. `note`
 * is amber, for a row with no wrong answer, which is `ConnectBoard`'s `answer: 'any'`.
 */
export type ChoiceState = 'open' | 'picked' | 'clean' | 'right' | 'wrong' | 'answer' | 'note'

/**
 * The row every pickable option in the course is drawn as: full width, a hairline under it, and a
 * tint that carries the state. **No option has a border of its own, and that is the decision.** A
 * bordered pill per option turns four answers into four cards inside the card they already sit in,
 * which is what the quiz, the three graded exercises and both connect boards all used to do. The
 * hairlines carry the structure instead, and their ends line up with the rule that opens the panel,
 * so the whole block reads as one surface.
 *
 * It is a function rather than a component because the element differs by exercise: the quiz needs a
 * `<label>` wrapping a radio, `SpotInjection` and `BudgetWindow` need a `<button>`. What has to
 * agree is the drawing, so that is what is shared.
 */
export function choiceRowClass(state: ChoiceState, locked: boolean, className?: string): string {
  return cn(
    'border-border/50 flex w-full items-center gap-3.5 border-b px-1 py-3.5 text-left text-sm transition-colors',
    'focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none',
    'has-[:focus-visible]:ring-ring/50 has-[:focus-visible]:ring-[3px]',
    locked ? 'cursor-default' : 'cursor-pointer',
    state === 'open' && 'hover:bg-muted/60',
    state === 'picked' && 'bg-primary/7',
    // The options nobody chose stay in body colour so they still read as ordinary text.
    state === 'clean' && 'opacity-60',
    state === 'right' && 'bg-success/8',
    state === 'wrong' && 'bg-destructive/6',
    state === 'answer' && 'bg-primary/7',
    state === 'note' && 'bg-amber-500/6',
    className,
  )
}

/**
 * The small square key at the head of a row: the quiz's A, B, C, D, and anywhere else an option
 * needs a handle. Filled once the option is picked or marked, so the fill is what says which one you
 * took and which one was right, and `--primary-foreground` is the white-ink token every solid fill
 * here uses.
 */
export function choiceKeyClass(state: ChoiceState, className?: string): string {
  return cn(
    'flex size-6 shrink-0 items-center justify-center rounded-md font-mono text-xs font-semibold transition-colors',
    (state === 'open' || state === 'clean') && 'bg-muted text-muted-foreground',
    state === 'picked' && 'bg-primary text-primary-foreground',
    state === 'right' && 'bg-success text-primary-foreground',
    state === 'wrong' && 'bg-destructive text-primary-foreground',
    state === 'answer' && 'bg-primary text-primary-foreground',
    state === 'note' && 'bg-amber-500 text-primary-foreground',
    className,
  )
}

/**
 * A, B, C, D. It is **display order** rather than anything about the option itself, which is what
 * keeps it honest under the per-mount shuffle every one of these exercises does: the letter names
 * where a row is on screen, so two students side by side can be looking at different D's.
 */
export function letterFor(index: number): string {
  return String.fromCharCode(65 + index)
}

/** The ink an option's own words take once the check has marked it. */
export function choiceLabelClass(state: ChoiceState, className?: string): string {
  return cn(
    'min-w-0 flex-1 leading-snug',
    (state === 'picked' || state === 'right' || state === 'answer') && 'font-medium',
    state === 'right' && 'text-success-foreground',
    state === 'wrong' && 'text-destructive',
    className,
  )
}
