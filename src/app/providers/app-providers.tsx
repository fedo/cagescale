import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { GenderProvider } from '@/app/providers/gender-provider'
import { queryClient } from '@/shared/api/query-client'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GenderProvider>{children}</GenderProvider>
    </QueryClientProvider>
  )
}
