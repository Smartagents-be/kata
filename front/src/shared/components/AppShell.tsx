import { Outlet } from 'react-router-dom'
import { BackendStatus } from '@/shared/components/BackendStatus'
import { SettingsSheet } from '@/shared/components/SettingsSheet'
import { StepNav } from '@/shared/components/StepNav'
import { Separator } from '@/shared/components/ui/separator'
import { useLocale } from '@/shared/i18n/useLocale'

export function AppShell() {
  const { t } = useLocale()

  return (
    <div id="app" data-component="AppShell" className="min-h-svh">
      <header
        id="app-header"
        data-component="AppShell"
        className="bg-background/95 sticky top-0 z-10 border-b backdrop-blur"
      >
        <div
          id="app-header-bar"
          data-component="AppShell"
          className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3"
        >
          {/* The cogwheel sits on the left because its panel slides in from that edge. */}
          <SettingsSheet />
          <span id="app-title" data-component="AppShell" className="font-heading text-lg font-semibold">
            Agentic Java
          </span>
          <BackendStatus />
        </div>
      </header>

      <div
        id="app-body"
        data-component="AppShell"
        className="mx-auto flex max-w-6xl gap-8 px-6 py-8"
      >
        {/*
          self-start matters: a flex child stretches to the full height of the row by default, and
          an element as tall as the article has nothing left to stick against. Capping the height
          keeps a long curriculum scrollable inside the sidebar rather than off the screen.
        */}
        <aside
          id="app-sidebar"
          data-component="AppShell"
          className="sticky top-16 max-h-[calc(100svh-5rem)] w-56 shrink-0 self-start overflow-y-auto"
        >
          <p
            id="app-sidebar-title"
            data-component="AppShell"
            className="text-muted-foreground mb-2 px-3 text-xs font-medium tracking-wide uppercase"
          >
            {t('nav.steps')}
          </p>
          <StepNav />
          <Separator id="app-sidebar-separator" data-component="AppShell" className="my-4" />
        </aside>

        <main id="app-main" data-component="AppShell" className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
