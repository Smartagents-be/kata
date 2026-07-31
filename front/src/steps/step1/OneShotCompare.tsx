import { useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * A before/after wipe over two screenshots, both the output of one one-shot prompt for a
 * book-rental page. The left one had the prompt only and lands on the statistical middle;
 * the right one had the same prompt plus a single Dribbble reference and lands somewhere
 * less generic. Dragging the divider is the point, so the geometry lives here in the step
 * rather than in the unit HTML.
 *
 * The two images are different generated designs, not one layout shot twice, so they are
 * laid out with `object-cover` anchored top-left (their logos and navs line up) and the
 * "before" is revealed with `clip-path` so both stay pixel-for-pixel the same size.
 */
const STEP = 2 // percent moved per arrow key

export function OneShotCompare() {
  const { t } = useTranslation('step1')
  const viewport = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const [position, setPosition] = useState(50)

  const setFromClientX = (clientX: number) => {
    const rect = viewport.current?.getBoundingClientRect()
    if (!rect) return
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    setFromClientX(event.clientX)
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // No active pointer to capture (e.g. a synthetic event); dragging still works.
    }
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) setFromClientX(event.clientX)
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    try {
      event.currentTarget.releasePointerCapture(event.pointerId)
    } catch {
      // Capture may never have been taken; nothing to release.
    }
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const next: Record<string, number> = {
      ArrowLeft: position - STEP,
      ArrowRight: position + STEP,
      Home: 0,
      End: 100,
    }
    const value = next[event.key]
    if (value === undefined) return
    event.preventDefault()
    setPosition(Math.min(100, Math.max(0, value)))
  }

  return (
    <figure id="oneshot-compare" data-component="OneShotCompare" className="mt-8 mb-14 flex flex-col gap-3">
      <div
        id="oneshot-compare-viewport"
        data-component="OneShotCompare"
        ref={viewport}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="border-border relative aspect-[2/1] w-full cursor-ew-resize touch-none overflow-hidden rounded-lg border select-none"
      >
        {/* after (base layer): same one-shot prompt plus one reference image */}
        <img
          id="oneshot-compare-after-image"
          data-component="OneShotCompare"
          src="/prompted-with-dribbble.png"
          alt={t('oneshot-compare.after-alt')}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-left-top"
        />

        {/* before (clipped from the left): the prompt on its own */}
        <div
          id="oneshot-compare-before"
          data-component="OneShotCompare"
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            id="oneshot-compare-before-image"
            data-component="OneShotCompare"
            src="/oneshot-prompt.png"
            alt={t('oneshot-compare.before-alt')}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover object-left-top"
          />
        </div>

        <span
          id="oneshot-compare-label-before"
          data-component="OneShotCompare"
          className="eyebrow bg-header/85 text-header-foreground pointer-events-none absolute top-2 left-2 rounded px-2 py-1"
        >
          {t('oneshot-compare.before')}
        </span>
        <span
          id="oneshot-compare-label-after"
          data-component="OneShotCompare"
          className="eyebrow bg-header/85 text-header-foreground pointer-events-none absolute top-2 right-2 rounded px-2 py-1"
        >
          {t('oneshot-compare.after')}
        </span>

        <div
          id="oneshot-compare-divider"
          data-component="OneShotCompare"
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${position}%` }}
        >
          <div className="bg-primary absolute inset-y-0 left-0 w-0.5 -translate-x-1/2" />
          <button
            id="oneshot-compare-handle"
            data-component="OneShotCompare"
            type="button"
            role="slider"
            aria-label={t('oneshot-compare.aria')}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            onKeyDown={onKeyDown}
            className="bg-primary text-primary-foreground focus-visible:ring-ring/40 pointer-events-auto absolute top-1/2 left-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full text-sm shadow-md outline-none focus-visible:ring-3"
          >
            <svg
              data-icon="drag"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path d="m9 7-5 5 5 5" />
              <path d="m15 7 5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>

      <figcaption
        id="oneshot-compare-hint"
        data-component="OneShotCompare"
        className="text-muted-foreground font-mono text-xs"
      >
        {t('oneshot-compare.hint')}
      </figcaption>
    </figure>
  )
}
