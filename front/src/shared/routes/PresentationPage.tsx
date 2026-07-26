import { XIcon } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { DeckSlides } from '@/shared/deck/slides'
import { firstUnitPath, steps } from '@/steps'
// Imported for its side effect: defines the <deck-stage> element before anything below renders.
// Vendored verbatim; see the provenance note in deck-stage.d.ts.
import '@/shared/deck/deck-stage.js'

/**
 * The deck, full screen, with no app chrome around it. This route sits outside AppShell on purpose:
 * the header, the band and the white card would all render behind a fixed overlay for nothing.
 *
 * The engine handles the slides. It lays them out on a fixed 1920x1080 canvas and scales that to
 * whatever the window is, so a slide is written once at one size. It also owns the keys that move
 * through the deck: right arrow, page down and space go forward, left arrow and page up go back,
 * Home and End jump to the ends, R resets, and the digits jump to a slide. This page adds the one
 * key the engine leaves free that we need, Escape to leave.
 *
 * The deck is drawn in the app's own light palette, like every other page. There is no dark
 * variant and no toggle: the slides are the design system on a projector, not a second theme to
 * keep in step with it.
 */
export function PresentationPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { key } = useLocation()

  // Captured during render, not in an effect: the element's connectedCallback runs during the DOM
  // commit, before any effect, and the first thing it does is rewrite the URL.
  const entry = useRef<{ state: unknown; href: string } | null>(null)
  entry.current ??= { state: window.history.state, href: window.location.href }

  // Back to where you came from. A tutor who opened /present straight from the address bar has no
  // back entry, and going back would drop them out of the app, so that case goes to the start of
  // the kata instead. React Router leaves the key at 'default' on an entry it did not push.
  const leave = useCallback(() => {
    if (key === 'default') navigate(firstUnitPath(steps[0]), { replace: true })
    else navigate(-1)
  }, [key, navigate])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) {
        return
      }
      if (event.key === 'Escape') {
        event.preventDefault()
        leave()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [leave])

  // Two things the engine leaves behind in the document. They cost nothing in the decks it was
  // written for, where the deck is the whole page and the page is thrown away. Here the app carries
  // on afterwards, so both are put back.
  useEffect(() => {
    const opened = entry.current

    // The engine writes the slide number into the URL on every move, and passes null state doing
    // it, which drops the bookkeeping React Router keeps in history. Put the state back and leave
    // the URL it wrote alone. It does this before it announces the move, so listening for the
    // announcement covers every slide; the call up front covers the first one, which is announced
    // before this effect has run.
    const restoreHistoryState = () => {
      try {
        window.history.replaceState(opened?.state, '', window.location.href)
      } catch {
        // Nothing here is load-bearing enough to fail a navigation over.
      }
    }
    restoreHistoryState()
    document.addEventListener('slidechange', restoreHistoryState)

    return () => {
      document.removeEventListener('slidechange', restoreHistoryState)
      // StrictMode runs this cleanup on a remount that leaves the element exactly where it is, and
      // connectedCallback does not run a second time to put any of it back. So wait a microtask,
      // by which point a real unmount has detached the element, and only tidy up if it is gone.
      queueMicrotask(() => {
        if (document.querySelector('deck-stage')) return
        // A print rule pinning every page to 1920x1080 with no margin. The engine adds it on mount
        // and never removes it, so without this every other page of the kata prints as a slide.
        document.getElementById('deck-stage-print-page')?.remove()
        // Drop the slide number off the URL, but only while we are still on that entry: once the
        // browser has gone back, the entry it landed on is somebody else's and rewriting it would
        // send the URL to the deck.
        if (opened && window.location.pathname === new URL(opened.href).pathname) {
          try {
            window.history.replaceState(opened.state, '', opened.href)
          } catch {
            // Nothing here is load-bearing enough to fail a navigation over.
          }
        }
      })
    }
  }, [])

  return (
    <div id="presentation" data-component="PresentationPage">
      {/*
        Every direct element child of <deck-stage> is a slide, so the exit control below is a sibling
        of it rather than a child. The colour and font are set here because the element sets both on
        its own shadow host, and a value set on the host beats one inherited into it.
      */}
      <deck-stage
        id="presentation-stage"
        data-component="PresentationPage"
        no-rail=""
        width="1920"
        height="1080"
        className="text-foreground font-sans"
      >
        <DeckSlides />
      </deck-stage>

      {/*
        Translucent white on a dark pill, the same treatment the cogwheel gets on the header band and
        the same language as the engine's own overlay, because it sits over black letterbox on one
        window and over the slide on the next. Held back until you look for it.
      */}
      <div
        id="presentation-controls"
        data-component="PresentationPage"
        className="fixed top-6 right-6 z-[2147483400] flex items-center rounded-full bg-black/55 p-1 opacity-20 backdrop-blur-sm transition-opacity duration-200 hover:opacity-100 focus-within:opacity-100"
      >
        <Button
          id="presentation-exit"
          data-component="PresentationPage"
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={leave}
          aria-label={t('deck.exit')}
          className="rounded-full text-white/90 hover:bg-white/15 hover:text-white"
        >
          <XIcon id="presentation-exit-glyph" data-component="PresentationPage" />
        </Button>
      </div>
    </div>
  )
}
