import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

const nav = [
  { to: '/', label: 'Divisions' },
  { to: '/weight-finder', label: 'My Weight' },
] as const

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 pb-24 pt-4 sm:max-w-2xl sm:px-6">
      <header className="animate-fade mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-3xl leading-none text-foreground sm:text-4xl">
            CageScale
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            UFC weight classes, champions & cuts
          </p>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-border/80 bg-card/95 backdrop-blur-md"
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-lg justify-around px-2 py-2 sm:max-w-2xl">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex min-w-24 flex-col items-center rounded-md px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors"
              activeProps={{
                className: cn(
                  'flex min-w-24 flex-col items-center rounded-md px-3 py-2 text-xs font-semibold text-primary',
                ),
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
