import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * What a domain word buys you at the moment you type it: one sentence on the left, the files it
 * could be about on the right, and a line from the sentence to the one it is about. The word you
 * used is the file's name, so the request arrives already narrowed. That is the whole drawing, and
 * it is what the `Domain-driven design` section of `engineering` claims in words.
 *
 * It sits at the `data-figure="words-to-files"` slot under the paragraph that earns it, and nothing
 * after it reads the drawing back, so the two column labels carry it. **It has no note under the
 * frame**, and that is a cut rather than an omission: the paragraph above already says a sentence
 * about articles has named the files, and a line under the drawing saying it again was the claim
 * twice within an inch of itself.
 *
 * **The three files are the argument, not decoration.** `Headline.java` is what the sentence names,
 * `Article.java` is the same capability and is not what it named, and `Slot.java` sits in a
 * different capability entirely. The folders are the package names of the two modules `DomainTree`
 * and `VerticalSlices` draw (`article-publishing`, `article-scheduling`), shortened to the package
 * because this figure is about the word and not about the layout. Read down, they narrow, which is
 * what makes the drawing say "precise" rather than "found something". Cut either of the muted two
 * and the teal one is a hit with nothing to be a hit against.
 *
 * **No bad repository is drawn**, and that is deliberate rather than a missed contrast. The obvious
 * version of this figure puts generic names down the other side, and an invented bad artifact is a
 * strawman the `lesson-writing` skill rules out in prose for reasons that hold here too. The
 * comparison this figure makes is between three real files in one honest tree.
 *
 * **This is about the vocabulary and never about the layout.** `DomainTree` under
 * `Hexagonal architecture` owns where a thing sits and what that saves an agent in searching, which
 * is the coin in that section. Draw folders here and the two sections argue the same thing twice.
 *
 * The word is a literal in every language, like a path or a model name elsewhere in the course: a
 * figure whose point is that one word is on both sides stops arguing anything the moment a
 * translator changes it on one of them. The sentence around it is split either side of the word,
 * which is why the prompt carries a `before` and an `after` rather than one string.
 */

/** The domain word, untranslated on purpose. Prose casing in the prompt, code casing in the file. */
const WORD = 'headline'

/** The three candidates, narrowing down the column. Paths, so they are literals and they are mono. */
const FILES = [
  { name: 'publishing/Headline.java', hit: true },
  { name: 'publishing/Article.java', hit: false },
  { name: 'scheduling/Slot.java', hit: false },
] as const

const BOX_W = 310
const BOX_Y = 30
const BOX_H = 52
/** Vertical middle of the prompt box, and of the row the line arrives at. */
const MID_Y = BOX_Y + BOX_H / 2

const FILES_X = 378
const ROW_GAP = 30

/** So an arrowhead reads as arriving at a row rather than touching it. */
const STANDOFF = 7

export function WordsToFiles() {
  const { t } = useTranslation('step2')
  const titleId = useId()
  const arrowId = `words-to-files-arrow-${useId().replace(/:/g, '')}`

  return (
    <figure id="words-to-files" data-component="WordsToFiles" className="my-8 flex justify-center">
      <svg
        id="words-to-files-svg"
        data-component="WordsToFiles"
        viewBox="0 0 640 134"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="WordsToFiles">
          {t('words-to-files.description')}
        </title>

        <defs>
          <marker
            id={arrowId}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary" />
          </marker>
        </defs>

        <text
          id="words-to-files-ask-label"
          data-component="WordsToFiles"
          x="0"
          y="18"
          fontSize="12"
          className="fill-muted-foreground"
        >
          {t('words-to-files.ask')}
        </text>
        <rect
          id="words-to-files-prompt"
          data-component="WordsToFiles"
          x="0"
          y={BOX_Y}
          width={BOX_W}
          height={BOX_H}
          rx="8"
          strokeWidth="1.5"
          className="fill-background stroke-muted-foreground/60"
        />
        <text
          id="words-to-files-prompt-line"
          data-component="WordsToFiles"
          x={BOX_W / 2}
          y={MID_Y + 5}
          fontSize="14"
          textAnchor="middle"
          className="fill-foreground"
        >
          {t('words-to-files.before')}{' '}
          <tspan id="words-to-files-prompt-word" className="fill-primary font-medium">
            {WORD}
          </tspan>{' '}
          {t('words-to-files.after')}
        </text>

        {/* The one line in the figure, and it is teal: this is the hop the shared word buys. */}
        <path
          id="words-to-files-line"
          data-component="WordsToFiles"
          d={`M ${BOX_W + STANDOFF} ${MID_Y} H ${FILES_X - STANDOFF - 4}`}
          fill="none"
          strokeWidth="2"
          markerEnd={`url(#${arrowId})`}
          className="stroke-primary"
        />

        <text
          id="words-to-files-repo-label"
          data-component="WordsToFiles"
          x={FILES_X}
          y="18"
          fontSize="12"
          className="fill-muted-foreground"
        >
          {t('words-to-files.repository')}
        </text>
        {FILES.map((file, index) => (
          <text
            key={file.name}
            id={`words-to-files-file-${index}`}
            data-component="WordsToFiles"
            data-state={file.hit ? 'named' : 'untouched'}
            x={FILES_X}
            y={MID_Y + 5 + index * ROW_GAP}
            fontSize="13"
            className={
              file.hit ? 'fill-primary font-mono font-medium' : 'fill-muted-foreground/70 font-mono'
            }
          >
            {file.name}
          </text>
        ))}
      </svg>
    </figure>
  )
}
