import { ChevronDownIcon, DatabaseIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { SettingsMenu } from '@/shared/components/SettingsMenu'
import { StepNav } from '@/shared/components/StepNav'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import { cn } from '@/shared/lib/utils'

export function AppShell() {
  const { t } = useTranslation()

  // Once the page scrolls far enough that the card has climbed under the pinned bar, the teal band
  // is no longer behind the card's top corners. At rest the corners read as rounded against that
  // band; scrolled, they would butt straight against the header and look square. So past that point
  // we detach the card a sliver below the bar and back its top with the page colour, so the rounded
  // corners read against the page (the way the bottom corners already do) with no teal on the card.
  // 40px is just past where the card pins (its rest top sits ~36px below the bar).
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The window keeps its scroll position across a route change, so following the pager off the
  // bottom of a long unit drops you into the middle of the next one. Every unit starts at its own
  // top instead. A link carrying a hash is left alone (the `context` unit points at #entropy), or
  // the browser's jump would be undone the moment it landed.
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  // Below lg the sidebar is not a sidebar: it stacks above the article, where the whole curriculum
  // would push the unit off the screen. So it collapses to its heading, and following a link closes
  // it again, since the thing you navigated to is underneath it.
  const [navOpen, setNavOpen] = useState(false)
  useEffect(() => setNavOpen(false), [pathname])

  return (
    <div id="app" data-component="AppShell" className="min-h-svh">
      {/*
        A dark teal band across the top. The 60px bar stays pinned as the page scrolls, so the
        wordmark and cogwheel are always reachable; below it a run of the same colour is left in
        normal flow for the white card to climb up into. The wordmark reads in white; the cogwheel
        is a translucent-white control so it stays legible on the dark ground.
      */}
      <header
        id="app-header"
        data-component="AppShell"
        className="bg-header text-header-foreground sticky top-0 z-30"
      >
        <div
          id="app-header-bar"
          data-component="AppShell"
          className="mx-auto flex h-15 max-w-[1180px] items-center justify-between gap-6 px-8"
        >
          <span
            id="app-title"
            data-component="AppShell"
            className="font-heading text-[1.0625rem] font-bold tracking-tight"
          >
            Agentic development
          </span>
          <SettingsMenu triggerClassName="rounded-full border border-white/20 bg-white/5 text-white/90 hover:bg-white/15 hover:text-white" />
        </div>
      </header>
      {/* The band's depth below the pinned bar; the card climbs back up into it and, once scrolled,
          slides on under the bar. Not sticky, or it would follow the bar and swallow the overlay. */}
      <div id="app-header-band" data-component="AppShell" aria-hidden className="bg-header h-32" />

      {/*
        The whole app rides in one white card that pulls up into the band, so the header reads as a
        backdrop the content floats over rather than a bar stacked above it.
      */}
      <div
        id="app-body"
        data-component="AppShell"
        className="relative z-10 mx-auto -mt-23 max-w-[1180px] px-4 pb-18 sm:px-6 lg:px-8"
      >
        {/*
          A pinned strip behind the cap that fills the cap's rounded-corner cut-outs so the rounded top
          reads once the teal band has scrolled away. At rest it is the header teal, seamless with the
          band the card floats on; scrolled, it turns the page colour and the cap drops a sliver lower
          (see below), so the strip shows as a thin page-coloured gap under the bar and the corners read
          against the page instead of butting straight onto the header.
        */}
        <div
          id="app-card-cap-backing"
          data-component="AppShell"
          aria-hidden
          className={cn('sticky top-15 z-10 h-6', scrolled ? 'bg-background' : 'bg-header')}
        />
        {/*
          A rounded lip in the card's colour that sticks under the pinned bar. At rest it sits exactly
          over the card's own rounded top, so the two read as one card. Scrolled, it pins a sliver lower
          than the backing, leaving that page-coloured gap above it so its rounded corners are visible.
        */}
        <div
          id="app-card-cap"
          data-component="AppShell"
          data-state={scrolled ? 'scrolled' : 'rest'}
          aria-hidden
          className={cn(
            'bg-card sticky z-20 -mt-6 h-6 rounded-t-[22px]',
            scrolled ? 'top-[70px]' : 'top-15',
          )}
        />
        <div
          id="app-card"
          data-component="AppShell"
          className="bg-card -mt-6 grid grid-cols-1 items-start gap-8 rounded-[22px] px-5 pt-8 pb-8 shadow-sm sm:px-8 lg:grid-cols-[248px_1fr] lg:gap-14 lg:px-11 lg:pt-10 lg:pb-10"
        >
          {/*
            self-start matters: a grid child stretches to the full height of the row by default, and
            an element as tall as the article has nothing left to stick against. Capping the height
            keeps a long curriculum scrollable inside the sidebar rather than off the screen. Both
            only apply from lg, where this is a column beside the article; stacked above it, sticking
            would pin the nav over what you came to read.
          */}
          <aside
            id="app-sidebar"
            data-component="AppShell"
            data-state={navOpen ? 'open' : 'closed'}
            className="self-start lg:sticky lg:top-20 lg:max-h-[calc(100svh-6rem)] lg:overflow-y-auto"
          >
            <div
              id="app-sidebar-header"
              data-component="AppShell"
              className="mb-5 flex items-center justify-between gap-3 px-0.5"
            >
              <p id="app-sidebar-title" data-component="AppShell" className="eyebrow text-primary">
                {t('nav.steps')}
              </p>
              <Button
                id="app-sidebar-toggle"
                data-component="AppShell"
                type="button"
                variant="outline"
                size="icon-sm"
                aria-expanded={navOpen}
                aria-controls="app-sidebar-nav"
                aria-label={t('nav.toggleSteps')}
                onClick={() => setNavOpen((open) => !open)}
                className="text-muted-foreground lg:hidden"
              >
                <ChevronDownIcon
                  id="app-sidebar-toggle-glyph"
                  data-component="AppShell"
                  aria-hidden
                  className={cn('size-4 transition-transform', navOpen && 'rotate-180')}
                />
              </Button>
            </div>

            <div
              id="app-sidebar-nav"
              data-component="AppShell"
              className={cn(navOpen ? 'block' : 'hidden', 'lg:block')}
            >
              <StepNav />
              <Separator id="app-sidebar-separator" data-component="AppShell" className="my-5" />
              {/* Not a step: a page for poking at the service the later steps work on. It gets its
                  own eyebrow for the same reason the steps have one, since a link with nothing over
                  it reads as a seventh step that lost its number. */}
              <p
                id="app-sidebar-service-title"
                data-component="AppShell"
                className="eyebrow text-primary mb-3 px-0.5"
              >
                {t('nav.service')}
              </p>
              <NavLink
                id="app-sidebar-catalog-link"
                data-component="AppShell"
                to="/catalog"
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      id="app-sidebar-catalog-link-icon"
                      data-component="AppShell"
                      aria-hidden
                      className={cn(
                        'flex size-5.5 shrink-0 items-center justify-center rounded-md',
                        isActive ? 'bg-primary text-primary-foreground' : 'bg-muted',
                      )}
                    >
                      <DatabaseIcon
                        id="app-sidebar-catalog-link-glyph"
                        data-component="AppShell"
                        className="size-3.5"
                      />
                    </span>
                    <span id="app-sidebar-catalog-link-label" data-component="AppShell">
                      {t('catalog.nav')}
                    </span>
                  </>
                )}
              </NavLink>
            </div>
          </aside>

          <main id="app-main" data-component="AppShell" className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
