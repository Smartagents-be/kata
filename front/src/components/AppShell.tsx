import { Outlet } from 'react-router-dom'
import { BackendStatus } from '@/components/BackendStatus'
import { ModeToggle } from '@/components/ModeToggle'
import { StepNav } from '@/components/StepNav'
import { Separator } from '@/components/ui/separator'

export function AppShell() {
  return (
    <div className="min-h-svh">
      <header className="bg-background/95 sticky top-0 z-10 border-b backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="font-heading text-lg font-semibold">Agentic Java</span>
            <BackendStatus />
          </div>
          <ModeToggle />
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-8">
        <aside className="w-56 shrink-0">
          <p className="text-muted-foreground mb-2 px-3 text-xs font-medium tracking-wide uppercase">
            Steps
          </p>
          <StepNav />
          <Separator className="my-4" />
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
