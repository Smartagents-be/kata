import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Seven moves, and the last two are the exercise. The five before them only fill the window by three
 * routes; what the student is here to do is read what each one left behind and decide which they
 * would want re-sent on every turn.
 *
 * **`reveal` and `shoot` sit in the middle rather than at the end**, so `choose` stays the closer.
 * They are the third route: a page with no service behind it, driven through the same server, and a
 * screenshot that leaves the window entirely and lands in the student's own project. That third
 * route is what `ShutterFlag` grades underneath this card, and it is the only thing on the page that
 * proves a browser was actually driven.
 *
 * The moves name no command, so the card reads the same in class, where the `<pre>` above it is cut
 * with the rest of the prose. The two lines a student copies stay in the unit HTML, per assistant,
 * because a command is machine output rather than a move. A file path is not a command, which is why
 * `kata/step1/front/index.html` is allowed to sit in a move.
 */
const MOVES = ['start', 'curl', 'browser', 'reveal', 'shoot', 'compare', 'choose'] as const

/**
 * The unit's first hands-on task, on the shared {@link TaskCard}: connect an MCP server, then fill
 * the window three ways and weigh what each route cost.
 *
 * **The question in the last move is not answered anywhere**, in the card or in the prose above it.
 * Which route comes back bulkier is the thing the student is measuring, so a sentence naming it ends
 * the exercise. Nothing is graded; the tick is a bookmark, and `TaskCard` says why.
 */
export function ConnectOne() {
  return (
    <TaskCard
      block="connect-one"
      namespace="step1"
      prefix="connect"
      storageKey="kata.step1.connect"
      moves={MOVES}
      className="my-8"
    />
  )
}
