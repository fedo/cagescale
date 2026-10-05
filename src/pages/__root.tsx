import { Outlet, createRootRoute } from '@tanstack/react-router'
import { AppShell } from '@/shared/ui/app-shell'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
