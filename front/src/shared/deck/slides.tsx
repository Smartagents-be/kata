import { MagicMeme, SteroidsMeme } from '@/shared/deck/OpeningMemes'
import { SlideTemplate } from '@/shared/deck/SlideTemplate'
import type { SlideSpec } from '@/shared/deck/slide-spec'
import { steps } from '@/steps'

/**
 * What the tutor puts on the board.
 *
 * These slides are written for the room, not lifted from the units: a student can read a unit
 * themselves, so a deck that repeated one would be a worse copy of a page they already have. What
 * belongs here is what only works out loud, starting with a question to open on.
 *
 * The drawings are the exception, and a deliberate one. A slide's figure is the *same component*
 * the unit renders, magnified by `SlideFigure`, so the board and the page cannot drift apart. That
 * is reuse of a figure, not of prose, and the rule it sits next to is unchanged.
 *
 * The deck is one list and the numbering falls out of it. There is no `TOTAL` to keep in step and
 * no `index` typed on a slide, which is what makes inserting a slide in the middle a one-line
 * change rather than a renumbering of everything after it.
 */

/**
 * The slides that belong to no step: the tutor introducing themself, the opening question, which is
 * why it carries no eyebrow naming a unit (it is asked before the course starts), and the 2 memes
 * that answer it.
 */
const OPENING: SlideSpec[] = [
  // The tutor first (October 2026, at the owner's asking). Photo and every line are taken from
  // Tom's profile on the smartagents-website (`profile.tom.*`, `media/team/tom-880.jpg`), where they
  // were already written and approved: nothing on this slide is invented about a real person.
  {
    id: 'deck-intro',
    kind: 'statement',
    eyebrow: 'deck.slide.intro.eyebrow',
    title: 'deck.slide.intro.name',
    note: 'deck.slide.intro.role',
    // Oldest first, at the owner's asking, so the career reads down to Isabel. The doctorate opens it
    // in small type: true, and less relevant to this room than the 3 jobs under it. Isabel is not on
    // the website; its line is the owner's own.
    points: ['deck.slide.intro.point.1', 'deck.slide.intro.point.2', 'deck.slide.intro.point.3'],
    fineprint: 'deck.slide.intro.fineprint',
    portrait: { src: '/tom-haeldermans.jpg', alt: 'deck.slide.intro.alt' },
  },
  {
    id: 'deck-opening',
    kind: 'statement',
    eyebrow: 'deck.slide.opening.eyebrow',
    // The two terms are the whole slide, so they carry the colour: the one the room arrived with
    // set back in `<mute>`, the one the day is about in `<hi>` teal. Marked up in the message
    // rather than spliced here, so Dutch can put them wherever its word order wants them. Those
    // two tags are the deck's whole emphasis vocabulary and `SlideTemplate` is where they are
    // mapped; a tag it does not know renders as literal text on the slide.
    title: 'deck.slide.opening.question',
  },
  // The answer, as 2 memes (16 October 2026, at the owner's asking): what the room expects AI to be,
  // then what the day wants instead. Rasters with SVG text over them; `OpeningMemes` says why.
  {
    id: 'deck-opening-magic',
    kind: 'figure',
    eyebrow: 'deck.slide.opening.eyebrow',
    title: 'deck.slide.magic.title',
    // Without it the slide sneers at vibe coding, and the course gives it a place: step 3's
    // `expectations` and step 2's `workflows` keep throwaway prototypes as its home.
    note: 'deck.slide.magic.note',
    figure: <MagicMeme />,
    scale: 1.65,
  },
  {
    id: 'deck-opening-steroids',
    kind: 'figure',
    eyebrow: 'deck.slide.opening.eyebrow',
    title: 'deck.slide.steroids.title',
    note: 'deck.slide.steroids.note',
    figure: <SteroidsMeme />,
    scale: 1.47,
  },
]

/**
 * The last slide asks the opening question again (October 2026, at the owner's asking for a deck
 * that does not stop on an exercise marker). Same eyebrow shape, same two terms in the same two
 * colours, so the room meets the question it answered at 9 with a day behind it.
 */
const CLOSING: SlideSpec[] = [
  {
    id: 'deck-closing',
    kind: 'statement',
    eyebrow: 'deck.slide.closing.eyebrow',
    title: 'deck.slide.closing.question',
  },
]

/** The deck, in order: the opening, each step's own slides as that step registered them, the close. */
const DECK: SlideSpec[] = [...OPENING, ...steps.flatMap((step) => step.deck ?? []), ...CLOSING]

/**
 * A fragment, not a wrapper element. The engine treats every direct element child of `<deck-stage>`
 * as a slide, and a fragment renders no DOM of its own, so the sections land as its own children.
 */
export function DeckSlides() {
  return (
    <>
      {DECK.map((spec, index) => (
        <SlideTemplate key={spec.id} spec={spec} index={index} total={DECK.length} />
      ))}
    </>
  )
}
