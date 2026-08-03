import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/utils'

/**
 * The lead figure: one word, left to right, all the way in and one token back out. It draws
 * `tokens.lead.1`, which is the only paragraph in the step that follows text the whole way, from
 * what you typed to the numbers the model actually works in.
 *
 * **One word rather than the sentence.** A whole sentence drawn this way is eight columns of the
 * same move repeated, and the move is what the figure is about. `unscrambled` is the word because it
 * is the one that does not survive whole: it comes apart at `unscr` and `ambled`, at a point that is
 * neither a syllable nor a stem, so one word arriving as two tokens is drawn rather than asserted.
 *
 * **Nothing in it is captioned.** The stages carried a line of prose each and it was taken out: six
 * captions under six boxes is a paragraph laid out sideways, and it made a drawing that reads in one
 * second into one that has to be worked through. What names them instead is the step's own
 * vocabulary, given text in the muted fill, a token in teal, numbers in mono, under an eyebrow that
 * names the process rather than arguing about the picture under it.
 * The screen-reader description on the panel still walks the whole chain, since none of that reaches
 * a reader who cannot see the shapes.
 *
 * **The word, the tokens and the next token are real**, taken from `TokenSplit`'s prose row (`The
 * catalogue endpoint returns nine unscrambled titles.`), which is real `o200k_base` output. So the
 * two figures are a pair the way `NextToken` and `TokenAttention` are, and a tidier sentence there
 * ends the exercise here too.
 *
 * **Every number in it is invented, and the kind of number is the reason that is fine.** A vector and
 * a weight are not claims a student can check; a token id is, and this repository has no tokeniser to
 * produce real ids with. So the numeric stages are a token's representation and the model's weights
 * rather than ids, which keeps the figure's whole claim (past the second stage there is no text left
 * anywhere) true at a resolution nobody can catch it out at.
 *
 * **It follows one token**, so `unscr` goes on and `ambled` is dimmed rather than deleted. That
 * matters because `reads-all` argues the opposite-looking thing four paragraphs later, namely that
 * every token in front of one goes in with it. This is one token's path through, not a claim that
 * the model is handed one token, and with the stage captions gone the dimmed chip is the only thing
 * left carrying it.
 *
 * It stops before the scores. `NextToken` owns the distribution over candidates, the bars and the
 * tail too long to draw, so the last stage here is the token the numbers stand for and nothing about
 * how it beat the others.
 *
 * It draws no context frame, on the same reasoning as every other figure above `tools`:
 * `ToolsInContext` is the first teal frame a student meets. The model box is a rectangle for the same
 * reason, since the frame that means context is an oval.
 */

/** Real `o200k_base` output, so English in every language and no `nl` entry, like `TokenSplit`'s. */
const WORD = 'unscrambled'
const TOKENS = [' unscr', 'ambled']
/** The one the figure follows. The other is drawn and then dropped, which is the point of stage two. */
const FOLLOWED = 0
const NEXT = ' titles'

/**
 * The invented data, and all of it is invented on purpose. A vector and a weight are not facts a
 * student can check, unlike a token id, which is why the numbers here are these and not ids: this
 * repository has no tokeniser to produce real ids with, and a number that can be checked has to be
 * right. Three components each, drawn as a column, because a real one runs to thousands and a row of
 * three reads as a list of values rather than as one object.
 */
const VECTOR_IN = ['0.31', '-0.08', '1.27']
const VECTOR_OUT = ['0.62', '0.11', '-0.35']
const WEIGHTS = [
  ['0.4', '-0.9', '0.2'],
  ['-1.1', '0.7', '0.5'],
  ['0.8', '0.1', '-0.6'],
]

/** A leading space belongs to the token in front of it, drawn rather than left invisible. */
function Piece({ text }: { text: string }) {
  if (!text.startsWith(' ')) {
    return <>{text}</>
  }

  return (
    <>
      <span className="text-primary/50" aria-hidden="true">
        ·
      </span>
      {text.slice(1)}
    </>
  )
}

/**
 * A numeric representation, drawn as a column so it reads as one object rather than as three loose
 * values. The square bracket down each side is the notation a reader already knows a vector by, and
 * it is drawn with borders rather than typed, so it grows with the box.
 */
function Vector({ id, values }: { id: string; values: string[] }) {
  return (
    <div
      id={`words-into-tokens-${id}-vector`}
      data-component="WordsIntoTokens"
      className="border-primary/40 flex flex-col gap-0.5 border-y-0 border-x-2 px-1.5 py-1"
    >
      {values.map((value, index) => (
        <span
          key={index}
          id={`words-into-tokens-${id}-vector-${index}`}
          data-component="WordsIntoTokens"
          className="text-foreground w-10 text-right font-mono text-xs tabular-nums"
        >
          {value}
        </span>
      ))}
    </div>
  )
}

/**
 * One step of the chain. It carries no caption of its own: the shapes are the step's own vocabulary
 * (given text muted, a token teal, numbers in mono) and a line of prose under each box turned the
 * drawing into a paragraph laid out sideways.
 */
function Stage({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div
      id={`words-into-tokens-${id}`}
      data-component="WordsIntoTokens"
      className="flex min-h-9 items-center gap-px"
    >
      {children}
    </div>
  )
}

/**
 * Between two stages, and never at either end. It turns with the chain: the whole thing is a column
 * until there is room for a row, so the arrow points down at a narrow width rather than sideways
 * into the stage below it.
 */
function Arrow({ index }: { index: number }) {
  return (
    <span
      id={`words-into-tokens-arrow-${index}`}
      data-component="WordsIntoTokens"
      aria-hidden="true"
      className="text-muted-foreground/60 rotate-90 font-mono text-sm md:rotate-0"
    >
      →
    </span>
  )
}

export function WordsIntoTokens() {
  const { t } = useTranslation('step1')

  return (
    <figure
      id="words-into-tokens"
      data-component="WordsIntoTokens"
      className="my-8 flex flex-col gap-3"
    >
      <span
        id="words-into-tokens-label"
        data-component="WordsIntoTokens"
        className="eyebrow text-primary"
      >
        {t('words-into-tokens.label')}
      </span>

      <div
        id="words-into-tokens-panel"
        data-component="WordsIntoTokens"
        role="img"
        aria-label={t('words-into-tokens.description')}
        // A column that becomes a row when there is room for one, rather than a row that wraps: the
        // four stages are a sequence, and a wrapped sequence puts stage three under stage one.
        className="border-border bg-card flex flex-col items-center justify-center gap-3 rounded-lg border p-4 md:flex-row"
      >
        {/* What you typed, in the muted fill the step gives to text that was given rather than
            produced. No middot: a leading space is only a token's business. */}
        <Stage id="word">
          <span
            id="words-into-tokens-word"
            data-component="WordsIntoTokens"
            className="border-border bg-muted text-muted-foreground rounded border px-1.5 py-0.5 font-mono text-sm"
          >
            {WORD}
          </span>
        </Stage>

        <Arrow index={0} />

        {/* Both tokens are drawn and only one is carried on, so the figure follows a token rather
            than a word. The one left behind is dimmed rather than removed: it has to be there for the
            next stage to be about one of two. */}
        <Stage id="tokens">
          {TOKENS.map((token, index) => (
            <span
              key={token}
              id={`words-into-tokens-token-${index}`}
              data-component="WordsIntoTokens"
              data-state={index === FOLLOWED ? 'followed' : 'dropped'}
              className={cn(
                'border-primary/30 bg-primary/10 rounded border px-1.5 py-0.5 font-mono text-sm whitespace-pre',
                index === FOLLOWED ? 'text-foreground' : 'opacity-40',
              )}
            >
              <Piece text={token} />
            </span>
          ))}
        </Stage>

        <Arrow index={1} />

        {/* The claim the figure exists for: past this point there is no text left anywhere. */}
        <Stage id="numbers-in">
          <Vector id="numbers-in" values={VECTOR_IN} />
        </Stage>

        <Arrow index={2} />

        <Stage id="model">
          <div
            id="words-into-tokens-weights"
            data-component="WordsIntoTokens"
            className="border-border bg-background flex flex-col gap-0.5 rounded border px-2 py-1.5"
          >
            {WEIGHTS.map((row, rowIndex) => (
              <div
                key={rowIndex}
                id={`words-into-tokens-weights-row-${rowIndex}`}
                data-component="WordsIntoTokens"
                className="text-muted-foreground/70 flex gap-1.5 font-mono text-[10px] tabular-nums"
              >
                {row.map((weight, index) => (
                  <span
                    key={index}
                    id={`words-into-tokens-weights-row-${rowIndex}-cell-${index}`}
                    data-component="WordsIntoTokens"
                    className="w-6 text-right"
                  >
                    {weight}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </Stage>

        <Arrow index={3} />

        <Stage id="numbers-out">
          <Vector id="numbers-out" values={VECTOR_OUT} />
        </Stage>

        <Arrow index={4} />

        <Stage id="out">
          <span
            id="words-into-tokens-out"
            data-component="WordsIntoTokens"
            className="border-primary/30 bg-primary/10 rounded border px-1.5 py-0.5 font-mono text-sm whitespace-pre"
          >
            <Piece text={NEXT} />
          </span>
        </Stage>
      </div>
    </figure>
  )
}
