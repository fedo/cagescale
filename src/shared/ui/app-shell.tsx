import { Link, useRouterState } from '@tanstack/react-router'
import { Layers, Scale } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { HeaderControls } from '@/shared/ui/header-controls'
import { cn } from '@/shared/lib/cn'

const nav: {
  to: '/' | '/weight-finder'
  label: string
  icon: LucideIcon
  exact?: boolean
}[] = [
  { to: '/', label: 'Divisions', icon: Layers, exact: true },
  { to: '/weight-finder', label: 'My Weight', icon: Scale },
]

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const showHeaderControls = pathname === '/' || pathname === '/weight-finder'

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col sm:max-w-2xl">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-border/80 bg-card/95 backdrop-blur-md">
        <div className="mx-auto max-w-lg px-4 pb-3 pt-3 sm:max-w-2xl sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <img
                src="/logo.png"
                alt="CageScale"
                width={942}
                height={878}
                className="h-[3.375rem] w-auto max-h-[calc(87px-1.5rem-1px)] shrink-0 object-contain sm:h-[3.75rem]"
              />
              <p className="min-w-0 text-sm leading-snug text-muted-foreground">
                UFC weight classes, champions & cuts
              </p>
            </div>
            {showHeaderControls ? <HeaderControls /> : null}
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 pb-28 pt-[5.5rem] sm:px-6 sm:pt-[5.75rem]">
        {children}
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-border/80 bg-card/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-md"
        aria-label="Primary"
      >
        <div className="mx-auto grid max-w-lg grid-cols-2 gap-1 px-2 py-2 sm:max-w-2xl sm:px-3">
          {nav.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={item.exact ? { exact: true } : undefined}
                className={cn(
                  'flex min-h-[3.5rem] flex-col items-center justify-center gap-1 rounded-lg px-4 py-3',
                  'text-xs font-semibold text-muted-foreground transition-colors',
                  'active:bg-muted/80',
                )}
                activeProps={{
                  className: cn(
                    'flex min-h-[3.5rem] flex-col items-center justify-center gap-1 rounded-lg px-4 py-3',
                    'border border-primary/25 bg-primary/10 text-primary shadow-sm',
                    'text-xs font-semibold',
                  ),
                }}
              >
                <Icon className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
