import { CheckIcon, LightbulbIcon, XIcon } from 'lucide-react'
import type { ClipboardEvent, FormEvent, ReactNode } from 'react'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { choiceKeyClass, letterFor, type ChoiceState } from '@/shared/lib/choice'
import { cn } from '@/shared/lib/utils'

/**
 * The shape every block a student *works in* is drawn in: the flag boards, the task cards, the two
 * drag-to-connect boards, the graded exercises, the catalogue page, and the figures that are lists
 * rather than drawings.
 *
 * **None of them is a card, and that is the decision rather than an omission.** They all sit inside
 * the app's one white card already, so a bordered panel around any of them is a card inside a card,
 * and the rows inside that a third. That is what made a five-flag board read as a stack of boxes and
 * a unit read as a column of tiles. Structure comes from a hairline that opens each block, a numeral
 * gutter with a continuous rail down it, and type hierarchy. It is the design system's flatness rule
 * (separation is a 1px border, never a shadow) taken one step further: on a surface that is already
 * white, even the border goes. **Do not wrap any of this back in `Card`.**
 *
 * **It is presentation and nothing else.** A block's data, its grading, its storage key and its
 * salt all stay with the step or the component that owns them, which is why `shared` can hold this
 * without ever importing a step: everything variable arrives as a prop or as children.
 *
 * The pieces are meant to be composed:
 *
 * - `Panel` is the surface: a hairline the eyebrow sits on, a title, an intro, the content.
 * - `PanelRow` is one row of a list, numeral gutter and rail included.
 * - `PanelChip` is the small mono badge a finished row or a tag wears.
 * - `PanelNote` is the left-rule callout a verdict, an error and a closing line are all drawn as.
 * - `ChoiceKey` is the lettered key at the head of a pickable row, and `ChoiceMark` the tick or
 *   cross at the end of it; the row itself is drawn by
 *   `choiceRowClass` in `shared/lib/choice.ts`, which is a function because the element it lands on
 *   differs by exercise (a `<label>` around a radio, a `<button>`).
 * - `HintDialog` is the offer of help and the dialog behind it.
 * - `AnswerLine` is a typed answer: the field, Check, and a `HintDialog` beside them.
 * - `Board` and `BoardRow` are `Panel` and `PanelRow` arranged the way a flag board wants them.
 *
 * Ids come from the caller, as a `block`, an `idBase` or a row's own `id`, so a caller keeps the ids
 * anything already pointed at (`#flags-item-2-input`, `#cut-it-up-move-0-label`, `#catalog-items`)
 * while the component carries its own name in `data-component`.
 */
export function Panel({
  block,
  state,
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName,
}: {
  /** BEM block for every id inside the drawing, e.g. `flags` or `price-one-turn`. */
  block: string
  /** Where the block stands as a whole, e.g. `complete` / `partial`, or `done` / `open`. */
  state?: string
  /**
   * The small mono label sitting on the opening hairline. A block with a counter puts the counter
   * here; a block with nothing to say there leaves the rule to run the full width, which is the
   * same gesture with nothing on it.
   */
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
  /** Laid on the content wrapper, for a block whose body is a column with its own rhythm. */
  contentClassName?: string
}) {
  return (
    <section
      id={block}
      data-component="Panel"
      data-state={state}
      // These are inline figures, so they are spaced like every other marker rather than by the gap
      // `UnitView` puts between the article and what follows it.
      className={cn('my-8', className)}
    >
      {/*
        Every panel opens on a hairline, which is what marks the seam between reading and working
        without drawing a box around the working. The eyebrow rides on it where there is one, so the
        label and the rule are one gesture rather than a chip above a line.
      */}
      <div id={`${block}-eyebrow`} data-component="Panel" className="flex items-baseline gap-3">
        {eyebrow !== undefined && (
          <p
            id={`${block}-progress`}
            data-component="Panel"
            className="eyebrow text-primary tabular-nums"
          >
            {eyebrow}
          </p>
        )}
        <span
          id={`${block}-eyebrow-rule`}
          data-component="Panel"
          aria-hidden
          className="bg-border/70 h-px flex-1"
        />
      </div>

      <h3
        id={`${block}-title`}
        data-component="Panel"
        className="font-heading mt-4 text-xl font-bold tracking-[-0.02em]"
      >
        {title}
      </h3>
      {description !== undefined && (
        <p
          id={`${block}-description`}
          data-component="Panel"
          className="text-muted-foreground mt-2 max-w-[58ch] text-[0.9375rem] leading-relaxed"
        >
          {description}
        </p>
      )}

      <div
        id={`${block}-content`}
        data-component="Panel"
        className={cn('mt-6', contentClassName)}
      >
        {children}
      </div>
    </section>
  )
}

/**
 * One row of a numbered list. The numeral gutter is the whole reason these rows need no boxes: a
 * mono numeral over a hairline rail, repeated down the column, reads as a spine holding the rows
 * together, so the only other separation a row needs is the rule above it. The rail is drawn on the
 * last row too, because a spine that stops short reads as a rendering fault rather than as an end.
 *
 * **The rail is for rows that are tall enough to need one, which is what `dense` turns off.** On a
 * flag row, which runs to a paragraph and a form, the rail spans most of the row and the numerals
 * read as beads on one line. On a list of one-line moves there is almost no row left for it to span,
 * so it came out as a stub between each pair of numerals and read as a dashed line somebody drew
 * badly rather than as a spine. A dense list is numerals and tighter padding: five of them down a
 * column already say "in this order", which is the only thing the rail was there to say. Its numerals
 * are teal for the same reason, since with no rail they are the only mark on the list.
 *
 * **`dense` and `rule` are separate questions, and they were one until a task's moves became
 * pressable.** A hairline between four one-liners genuinely was heavier than what it separated, so
 * `dense` used to force `rule` off. A move that toggles is a target rather than a line, and a
 * column of targets needs to say where one ends and the next begins, so the rule is the caller's
 * call again: pass `rule={false}` for a dense list that is only read.
 */
export function PanelRow({
  id,
  index,
  state,
  tinted = false,
  rule = true,
  dense = false,
  children,
}: {
  /**
   * The row's own id, which everything inside it hangs off. A board row is `flags-item-2` and a
   * task's move is `cut-it-up-move-2`, so the caller names the row rather than this component
   * assuming every list numbers itself the same way.
   */
  id: string
  /** Zero-based position, which gives the numeral the student reads and rules off all but the first. */
  index: number
  /** The row's own state, e.g. `solved` / `locked`, put on `data-state` for tests to find. */
  state?: string
  /** Whether the row is finished, which is what tints it and turns its numeral. */
  tinted?: boolean
  /** A hairline above every row but the first. */
  rule?: boolean
  /** Tighter padding and no rail, for a list of one-line moves. */
  dense?: boolean
  children: ReactNode
}) {
  return (
    <li
      id={id}
      data-component="PanelRow"
      data-state={state}
      className={cn(
        'flex transition-colors',
        // Dense rows sit on a shared baseline, so a 12px mono numeral and a 14px label line up on
        // the line they are both on rather than on the top of their boxes. They carry horizontal
        // padding as well, because a dense row is the one kind that tints: without it the fill and
        // the rule stop exactly where the words do, and the row reads as a highlighter stroke
        // rather than as a band. The caller pulls the column back out by the same amount, so the
        // numerals still start on the title's edge.
        dense ? 'items-baseline gap-3 px-3 py-1.5' : 'gap-4 py-5',
        rule && index > 0 && 'border-border/50 border-t',
        tinted && 'bg-success/4',
      )}
    >
      <div
        id={`${id}-gutter`}
        data-component="PanelRow"
        // A numeral over a rail has to be centred on it; a numeral on its own is flush left, so the
        // column of them starts on the same edge as the title and the intro above it.
        className={cn(
          'flex flex-none flex-col',
          dense ? 'w-5 items-start' : 'w-6 items-center gap-2 pt-0.5',
        )}
      >
        <span
          id={`${id}-number`}
          data-component="PanelRow"
          aria-hidden
          className={cn(
            'font-mono text-xs font-semibold tracking-[0.04em] tabular-nums',

            tinted
              ? 'text-success-foreground'
              : dense
                ? 'text-primary'
                : 'text-muted-foreground',
          )}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        {!dense && (
          <span
            id={`${id}-rail`}
            data-component="PanelRow"
            aria-hidden
            className="bg-border/70 min-h-4 w-px flex-1"
          />
        )}
      </div>

      <div
        id={`${id}-body`}
        data-component="PanelRow"
        className="min-w-0 flex-1"
      >
        {children}
      </div>
    </li>
  )
}

/**
 * The small mono badge: what a finished row wears beside its title, and what a tag under a figure
 * is drawn as. Mono, uppercase and tracked out, because it is a state or a label rather than a
 * sentence the course wrote.
 */
export function PanelChip({
  id,
  tone = 'success',
  children,
}: {
  id: string
  tone?: 'success' | 'muted'
  children: ReactNode
}) {
  return (
    <Badge
      id={id}
      data-component="PanelChip"
      variant={tone === 'success' ? 'success' : 'outline'}
      className={cn(
        'h-5 rounded-full px-2 font-mono text-[0.6875rem] font-semibold tracking-[0.06em] uppercase',
        tone === 'muted' && 'border-border/70 text-muted-foreground',
      )}
    >
      {children}
    </Badge>
  )
}

/**
 * The lettered key at the head of a pickable row: A, B, C, D. Filled once the option is picked or
 * marked, so the fill is what says which one you took and which one was right.
 *
 * **It is decoration and is `aria-hidden`.** The option's own words are the answer, and the letter is
 * only how it is pointed at on screen, so a screen reader hears the sentence and not "A". Where the
 * row wraps a real radio, that radio is still what the label is bound to.
 */
export function ChoiceKey({
  id,
  state,
  index,
  className,
}: {
  id: string
  state: ChoiceState
  /** Zero-based position on screen, which is what the letter names. */
  index: number
  className?: string
}) {
  return (
    <span
      id={id}
      data-component="ChoiceKey"
      data-state={state}
      aria-hidden
      className={choiceKeyClass(state, className)}
    >
      {letterFor(index)}
    </span>
  )
}

/**
 * The fixed column at the end of a pickable row, so every option's words end on one edge whether or
 * not the row is marked. The glyph repeats what the tint already says, which is what keeps a verdict
 * readable without relying on green against red.
 */
export function ChoiceMark({ idBase, state }: { idBase: string; state: ChoiceState }) {
  return (
    <span
      id={`${idBase}-mark`}
      data-component="ChoiceMark"
      data-state={state}
      aria-hidden
      className="flex w-3.5 shrink-0 justify-center"
    >
      {state === 'right' && (
        <CheckIcon
          id={`${idBase}-mark-glyph`}
          data-component="ChoiceMark"
          className="text-success-foreground size-3.5"
        />
      )}
      {state === 'answer' && (
        <CheckIcon
          id={`${idBase}-mark-glyph`}
          data-component="ChoiceMark"
          className="text-primary size-3.5"
        />
      )}
      {state === 'wrong' && (
        <XIcon
          id={`${idBase}-mark-glyph`}
          data-component="ChoiceMark"
          className="text-destructive size-3.5"
        />
      )}
    </span>
  )
}

/**
 * A line set off by a 2px left rule and a faint tint, and nothing else: what a row says when a paste
 * was wrong, what a board says once every row is in, and what an exercise says when it has marked
 * an answer. It is the shape `.prose aside[data-audience="self"]` already uses for a note beside the
 * argument, so a verdict and an aside read as the same kind of thing, and it carries no panel that
 * floats, on the flatness rule.
 *
 * Amber is the third tone because the design system already spends it that way: it is the caution
 * colour on a warning aside and on a cost tip, and `ConnectBoard`'s row with no wrong answer needs a
 * verdict that is neither `--success` nor `--destructive`.
 */
export function PanelNote({
  id,
  tone,
  children,
  className,
}: {
  id: string
  tone: 'success' | 'destructive' | 'note'
  children: ReactNode
  className?: string
}) {
  return (
    <p
      id={id}
      data-component="PanelNote"
      data-state={tone}
      role="status"
      className={cn(
        'max-w-[56ch] rounded-r-lg border-l-2 py-1.5 pr-3 pl-3.5 text-sm leading-relaxed',
        tone === 'success' && 'border-success/60 bg-success/6 text-success-foreground',
        tone === 'destructive' && 'border-destructive/50 bg-destructive/5 text-destructive',
        tone === 'note' && 'border-amber-500/50 bg-amber-500/5 text-foreground/85',
        className,
      )}
    >
      {children}
    </p>
  )
}

/**
 * The offer of help beside an answer box, and the dialog behind it. Every graded box in the course
 * has one, on the boards and on the intro's two answer boxes, so it is one component rather than
 * four copies of a trigger and a dialog.
 *
 * **It is a text button rather than a bordered one**, which is the one interaction detail this shape
 * changed. Two bordered controls side by side read as two offers of equal weight, and on a block
 * with no panel around it that is most of what made the old rows look like cards. A box has exactly
 * one action, so Check is the only thing drawn as a button and the hint is a quiet label beside it.
 * The lightbulb stays, because it is what makes the offer findable without reading it.
 *
 * `idBase` is what the ids hang off, so the workshop's third row passes `flags-item-2` and the
 * intro's box passes `code-check-item-0`, both of them the row the hint belongs to.
 */
export function HintDialog({
  idBase,
  label,
  title,
  body,
  className,
}: {
  idBase: string
  /** The word on the button, from the caller's own bundle. */
  label: ReactNode
  title: ReactNode
  body: ReactNode
  className?: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          id={`${idBase}-help`}
          data-component="HintDialog"
          type="button"
          className={cn(
            'text-muted-foreground hover:text-primary focus-visible:ring-ring/50 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium transition-colors outline-none focus-visible:ring-[3px]',
            className,
          )}
        >
          <LightbulbIcon
            id={`${idBase}-help-icon`}
            data-component="HintDialog"
            aria-hidden
            className="size-3.5 text-yellow-500"
          />
          <span
            id={`${idBase}-help-label`}
            data-component="HintDialog"
            className="decoration-border underline underline-offset-[3px]"
          >
            {label}
          </span>
        </button>
      </DialogTrigger>
      <DialogContent id={`${idBase}-help-dialog`} data-component="HintDialog">
        <DialogHeader id={`${idBase}-help-dialog-header`} data-component="HintDialog">
          <DialogTitle id={`${idBase}-help-dialog-title`} data-component="HintDialog">
            {title}
          </DialogTitle>
          <DialogDescription id={`${idBase}-help-dialog-body`} data-component="HintDialog">
            {body}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

/**
 * A typed answer: a monospace field that takes the whole remaining width, the Check button beside
 * it, and {@link HintDialog} behind that.
 *
 * The field is `--muted` rather than white for the same reason the panels lost their border: on a
 * white surface, a white box with a hairline is invisible until you look for it. It wraps under the
 * buttons on a narrow column rather than shrinking past the width of a flag.
 */
export function AnswerLine({
  idBase,
  value,
  onValueChange,
  onPaste,
  onSubmit,
  busy,
  label,
  placeholder,
  checkLabel,
  hintLabel,
  helpTitle,
  helpBody,
  className,
}: {
  /** What the ids hang off, e.g. `flags-item-2`. */
  idBase: string
  value: string
  onValueChange: (value: string) => void
  onPaste?: (event: ClipboardEvent<HTMLInputElement>) => void
  onSubmit: (event: FormEvent) => void
  /** True while a check is in flight, which is the only thing that disables the button by itself. */
  busy?: boolean
  /** The row's own name, used as the field's accessible label. */
  label: string
  placeholder: string
  checkLabel: ReactNode
  /**
   * The hint's three words. Left out where the caller offers help somewhere else, or offers none:
   * every graded box in the course happens to want one, so the three help props travel together
   * and passing one without the others draws a button onto an empty dialog.
   */
  hintLabel?: ReactNode
  helpTitle?: ReactNode
  helpBody?: ReactNode
  className?: string
}) {
  return (
    <form
      id={`${idBase}-form`}
      data-component="AnswerLine"
      onSubmit={onSubmit}
      className={cn('mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-3', className)}
    >
      <input
        id={`${idBase}-input`}
        data-component="AnswerLine"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onPaste={onPaste}
        spellCheck={false}
        placeholder={placeholder}
        aria-label={label}
        className="field bg-muted h-9.5 min-w-40 flex-1"
      />
      <div id={`${idBase}-actions`} data-component="AnswerLine" className="flex items-center gap-4">
        <Button
          id={`${idBase}-submit`}
          data-component="AnswerLine"
          type="submit"
          size="lg"
          disabled={busy || value.trim() === ''}
          className="h-9.5 px-4.5"
        >
          {checkLabel}
        </Button>
        {hintLabel !== undefined && (
          <HintDialog idBase={idBase} label={hintLabel} title={helpTitle} body={helpBody} />
        )}
      </div>
    </form>
  )
}

/**
 * A flag board: `Panel` with its rows in an `<ol>` and an optional closing line under them. Every
 * board in the course is this with different data, so a student who learned to read one reads all of
 * them the same way, while each step keeps its own flags, salt, storage key and grading, because a
 * step owns what grades it. That is the split to hold when anything here grows: **behaviour per
 * step, appearance shared.**
 */
export function Board({
  block,
  state,
  eyebrow,
  title,
  description,
  children,
  note,
}: {
  block: string
  state: string
  eyebrow?: ReactNode
  title: ReactNode
  /** Left out by a board with one row, where an intro line would only say the row again. */
  description?: ReactNode
  /** The rows, as `BoardRow`s. */
  children: ReactNode
  /** An optional closing line under the rows, usually a `PanelNote`. */
  note?: ReactNode
}) {
  return (
    <Panel
      block={block}
      state={state}
      eyebrow={eyebrow}
      title={title}
      description={description}
    >
      <ol id={`${block}-items`} data-component="Board">
        {children}
      </ol>
      {note}
    </Panel>
  )
}

/** One flag row: the numeral gutter, then a title with an optional chip, a line, and the answer. */
export function BoardRow({
  block,
  index,
  state,
  solved,
  eyebrow,
  title,
  chip,
  body,
  children,
}: {
  block: string
  index: number
  state: string
  solved: boolean
  /** An optional small label above the title, e.g. where this row's answer comes from. */
  eyebrow?: ReactNode
  title: ReactNode
  /** An optional chip beside the title, e.g. the badge a finished row wears. */
  chip?: ReactNode
  /** The line under the title saying what the row wants. */
  body: ReactNode
  /** Everything under that line: the answer line, an error, whatever the caller adds. */
  children?: ReactNode
}) {
  return (
    <PanelRow id={`${block}-item-${index}`} index={index} state={state} tinted={solved}>
      {eyebrow !== undefined && (
        <p
          id={`${block}-item-${index}-place`}
          data-component="BoardRow"
          className="eyebrow text-muted-foreground mb-1"
        >
          {eyebrow}
        </p>
      )}
      <div
        id={`${block}-item-${index}-heading`}
        data-component="BoardRow"
        className="flex flex-wrap items-center gap-2.5"
      >
        <span
          id={`${block}-item-${index}-label`}
          data-component="BoardRow"
          className="font-medium"
        >
          {title}
        </span>
        {chip}
      </div>
      <p
        id={`${block}-item-${index}-hint`}
        data-component="BoardRow"
        className="text-muted-foreground mt-1.5 max-w-[56ch] text-sm leading-relaxed"
      >
        {body}
      </p>
      {children}
    </PanelRow>
  )
}
