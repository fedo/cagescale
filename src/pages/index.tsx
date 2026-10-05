import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import type { WeightClassId } from '@/entities/weight-class/model/types'
import { useGender } from '@/app/providers/gender-provider'
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
  const { gender } = useGender()
  const { data, isLoading, isError } = useQuery({
    queryKey: weightClassesQueryKey,
    queryFn: getWeightClasses,
  })

  const divisions = useMemo(
    () => data?.filter((wc) => wc.gender === gender) ?? [],
    [data, gender],
  )

  const [expandedId, setExpandedId] = useState<WeightClassId | null>(null)

  useEffect(() => {
    setExpandedId(null)
  }, [gender])

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
        {divisions.map((weightClass) => (
          <div key={weightClass.id} id={weightClass.id}>
            <WeightClassSection
              weightClass={weightClass}
              expanded={expandedId === weightClass.id}
              onToggle={() =>
                setExpandedId((current) =>
                  current === weightClass.id ? null : weightClass.id,
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}
