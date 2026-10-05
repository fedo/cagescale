import { WEIGHT_CLASSES } from '@/entities/weight-class/model/data'
import type { WeightClassChange } from '@/entities/fighter/model/types'

export function WeightClassTimeline({
  changes,
}: {
  changes: WeightClassChange[]
}) {
  if (changes.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No weight-class changes seeded.
      </p>
    )
  }

  const sorted = [...changes].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <ol className="space-y-4 border-l border-border pl-4">
      {sorted.map((change) => {
        const from = change.fromWeightClassId
          ? WEIGHT_CLASSES.find((item) => item.id === change.fromWeightClassId)
          : null
        const to = WEIGHT_CLASSES.find(
          (item) => item.id === change.toWeightClassId,
        )

        return (
          <li
            key={`${change.date}-${change.toWeightClassId}-${change.reason}`}
            className="relative"
          >
            <span className="absolute -left-[1.3rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="text-sm font-semibold text-foreground">
              {from ? `${from.shortName} → ${to?.shortName ?? '—'}` : `Entered ${to?.shortName ?? '—'}`}
            </p>
            <p className="text-xs text-muted-foreground">{change.date}</p>
            <p className="mt-1 text-sm text-muted-foreground">{change.reason}</p>
          </li>
        )
      })}
    </ol>
  )
}
