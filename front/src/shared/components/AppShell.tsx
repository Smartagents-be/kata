import { DatabaseIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink, Outlet } from 'react-router-dom'
import { SettingsMenu } from '@/shared/components/SettingsMenu'
import { StepNav } from '@/shared/components/StepNav'
import { Separator } from '@/shared/components/ui/separator'
import { cn } from '@/shared/lib/utils'

export function AppShell() {
  const { t } = useTranslation()

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
            Agentic Java
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
        className="relative z-10 mx-auto -mt-23 max-w-[1180px] px-8 pb-18"
      >
        {/*
          A rounded lip in the card's colour that sticks right under the pinned bar. At rest it sits
          exactly over the card's own rounded top, so the two read as one card; once the page scrolls
          it stays put while the card slides up beneath it (higher z, opaque fill), so the rounded top
          edge is never swallowed by the flat bar.
        */}
        <div
          id="app-card-cap"
          data-component="AppShell"
          aria-hidden
          className="bg-card sticky top-15 z-20 h-6 rounded-t-[22px]"
        />
        <div
          id="app-card"
          data-component="AppShell"
          className="bg-card grid grid-cols-[248px_1fr] items-start gap-14 rounded-[22px] -mt-6 px-11 pt-10 pb-10 shadow-sm"
        >
          {/*
            self-start matters: a grid child stretches to the full height of the row by default, and
            an element as tall as the article has nothing left to stick against. Capping the height
            keeps a long curriculum scrollable inside the sidebar rather than off the screen.
          */}
          <aside
            id="app-sidebar"
            data-component="AppShell"
            className="sticky top-20 max-h-[calc(100svh-6rem)] self-start overflow-y-auto"
          >
            <p
              id="app-sidebar-title"
              data-component="AppShell"
              className="eyebrow text-primary mb-5 px-0.5"
            >
              {t('nav.steps')}
            </p>
            <StepNav />
            <Separator id="app-sidebar-separator" data-component="AppShell" className="my-5" />
            {/* Not a step: a page for poking at the service the later steps work on. */}
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
          </aside>

          <main id="app-main" data-component="AppShell" className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
