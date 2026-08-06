import { Trans, useTranslation } from 'react-i18next'
import { Slide } from '@/shared/deck/Slide'
import { SlideFigure } from '@/shared/deck/SlideFigure'
import type { SlideSpec } from '@/shared/deck/slide-spec'

/**
 * The one template every slide goes through.
 *
 * `Slide` is the frame: the 1920x1080 ground, the padding, the 88px the footer owns, and the three
 * vertical placements. It is unchanged and stays that way. This is the layer above it, the shape
 * the content keeps, so that a deck of forty slides reads as one deck rather than forty drawings
 * with a page number under each.
 *
 * That shape is always the same three things in the same order: a mono eyebrow saying which unit
 * you are in, one heading saying the one thing the slide says, and then either nothing else or a
 * drawing. `note` exists for the rare slide that genuinely needs a second line and should stay
 * rare. The precedent is the opening question, which had its second line removed on the reasoning
 * that a slide which scripts the tutor is a slide they read from, and the same applies here: the
 * eyebrow and the heading are the board, the rest is said out loud.
 *
 * Heading sizes are the whole of what `kind` decides, and they are the argument rather than
 * decoration. A `statement` is the only thing on its slide and gets the full 84px. A `figure`
 * slide's heading drops to 56px because the drawing is the point and a heading that competes with
 * it wins for the wrong reason. A `divider` is the loudest at 96px, since it is a punctuation mark
 * between units and wants to read as one from the back of the room.
 *
 * Emphasis is marked up inside the message and mapped here rather than spliced from the caller, so
 * Dutch can put it where its word order wants it. Two tags: `<hi>` for the teal the step reserves
 * for what matters, `<mute>` for a term deliberately set back.
 */
export function SlideTemplate({
  spec,
  index,
  total,
}: {
  spec: SlideSpec
  index: number
  total: number
}) {
  const { id, kind, ns = 'ui', eyebrow, title, note, points, figure, scale, figureWidth } = spec
  const { t } = useTranslation(ns)

  // A module's title card sits on the deep-teal header surface, one per step, so its teal and its
  // greys have to lighten to stay readable: the pale teal from the chart ramp where the light
  // slides use `primary`, and the surface's own white ink set back where they use
  // `muted-foreground`. Only `title` is dark: a unit divider is punctuation inside a module, and
  // four dark cards in a hundred slides is what keeps them reading as module boundaries.
  const dark = kind === 'title'
  const emphasis = {
    hi: <span className={dark ? 'text-chart-3' : 'text-primary'} />,
    mute: <span className={dark ? 'text-header-foreground/60' : 'text-muted-foreground'} />,
  }

  return (
    // `label` is what the engine writes into `data-screen-label` for its own slide list. Left
    // untranslated, like the footer wordmark: it is a handle on a slide, not something a room reads.
    //
    // Two placements, and the split is what each kind is competing for. A `divider` and a
    // `statement` are **only** their text, so they take `golden` and sit where the opening question
    // sits: the eyebrow on 180px and the h1's top edge on the golden division at 255px. Dead centre
    // would read as a placeholder and the top would read as a heading waiting for content that
    // never comes.
    //
    // A `figure` slide is competing for room. Its heading goes to `top`, which is 80px higher, and
    // every one of those pixels goes to the drawing. The masthead still does not move *within* a
    // run of figure slides, which is what `top` is for; it only steps once when the deck changes
    // from talking to showing, and that step is legible rather than twitchy.
    <Slide
      index={index}
      total={total}
      label={id}
      align={kind === 'figure' ? 'top' : 'golden'}
      surface={dark ? 'dark' : 'light'}
    >
      {eyebrow && (
        <p
          id={`${id}-eyebrow`}
          data-component="SlideTemplate"
          className={`eyebrow mb-10 text-[26px] ${dark ? 'text-chart-3' : 'text-primary'}`}
        >
          {t(eyebrow)}
        </p>
      )}

      <h1
        id={`${id}-title`}
        data-component="SlideTemplate"
        className={
          kind === 'title' || kind === 'divider'
            ? 'font-heading max-w-[22ch] text-[96px] leading-[1.04] font-semibold tracking-tight'
            : kind === 'statement'
              ? 'font-heading max-w-[26ch] text-[84px] leading-[1.08] font-semibold tracking-tight'
              : 'font-heading max-w-[34ch] text-[56px] leading-[1.12] font-semibold tracking-tight'
        }
      >
        <Trans i18nKey={title} ns={ns} components={emphasis} />
      </h1>

      {note && (
        <p
          id={`${id}-note`}
          data-component="SlideTemplate"
          className={
            kind === 'figure'
              ? 'text-muted-foreground mt-6 max-w-[60ch] text-[28px] leading-[1.4]'
              : `mt-10 max-w-[46ch] text-[34px] leading-[1.4] ${dark ? 'text-header-foreground/70' : 'text-muted-foreground'}`
          }
        >
          <Trans i18nKey={note} ns={ns} components={emphasis} />
        </p>
      )}

      {points && (
        <ul
          id={`${id}-points`}
          data-component="SlideTemplate"
          // px, not ch: the list itself is not sized in the points' 36px, so a ch cap here would
          // measure against the inherited body size and wrap every line at a third of the frame.
          className="mt-14 flex max-w-[1250px] flex-col gap-7"
        >
          {points.map((point, pointIndex) => (
            <li
              key={point}
              id={`${id}-points-${pointIndex}`}
              data-component="SlideTemplate"
              className="flex items-baseline gap-6 text-[36px] leading-[1.35]"
            >
              {/* The marker is drawn, not typed: a short rule in the slide's accent, so the list
                  reads as placed rather than pasted from a document. */}
              <span
                aria-hidden="true"
                className={`h-[5px] w-[36px] shrink-0 self-center rounded-full ${dark ? 'bg-chart-3' : 'bg-primary'}`}
              />
              <span>
                <Trans i18nKey={point} ns={ns} components={emphasis} />
              </span>
            </li>
          ))}
        </ul>
      )}

      {figure && (
        <SlideFigure block={id} scale={scale} width={figureWidth}>
          {figure}
        </SlideFigure>
      )}
    </Slide>
  )
}
