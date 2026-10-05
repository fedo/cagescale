import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import {
  getWeightClasses,
  weightClassesQueryKey,
} from '@/entities/weight-class/api/get-weight-classes'
import { RECENT_CHAMPIONS_COUNT } from '@/entities/weight-class/model/constants'
import { WeightClassSection } from '@/features/weight-classes/ui/weight-class-section'

export const Route = createFileRoute('/')({
  component: WeightClassesPage,
})

function WeightClassesPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: weightClassesQueryKey,
    queryFn: getWeightClasses,
  })

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return
    const el = document.getElementById(hash)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [data])

  return (
    <div>
      <section className="animate-rise mb-2">
        <h1 className="font-display text-3xl text-foreground sm:text-4xl">
          Weight classes
        </h1>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          All 12 UFC divisions with the last {RECENT_CHAMPIONS_COUNT} champions and
          the year they first took the belt. Tap a photo for the fighter profile.
        </p>
      </section>

      {isLoading ? (
        <p className="py-10 text-sm text-muted-foreground">Loading divisions…</p>
      ) : null}
      {isError ? (
        <p className="py-10 text-sm text-primary">Could not load weight classes.</p>
      ) : null}

      <div>
        {data?.map((weightClass) => (
          <div key={weightClass.id} id={weightClass.id}>
            <WeightClassSection weightClass={weightClass} />
          </div>
        ))}
      </div>
    </div>
  )
}
