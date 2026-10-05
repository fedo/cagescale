import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { GenderProvider } from '@/app/providers/gender-provider'
import { WeightUnitProvider } from '@/app/providers/weight-unit-provider'
import { queryClient } from '@/shared/api/query-client'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GenderProvider>
        <WeightUnitProvider>{children}</WeightUnitProvider>
      </GenderProvider>
    </QueryClientProvider>
  )
}
