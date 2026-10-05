import { WEIGHT_CLASSES } from '@/entities/weight-class/model/data'
import type { RankingPoint } from '@/entities/fighter/model/types'

function formatRank(rank: RankingPoint['rank']): string {
  if (rank === 'C') return 'Champion'
  if (rank === 'NR') return 'Unranked'
  return `#${rank}`
}

export function RankingTimeline({ points }: { points: RankingPoint[] }) {
  if (points.length === 0) {
    return <p className="text-sm text-muted-foreground">No ranking history seeded.</p>
  }

  const sorted = [...points].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <ol className="space-y-3 border-l border-border pl-4">
      {sorted.map((point) => {
        const wc = WEIGHT_CLASSES.find((item) => item.id === point.weightClassId)
        return (
          <li key={`${point.date}-${point.rank}-${point.weightClassId}`} className="relative">
            <span className="absolute -left-[1.3rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
            <p className="text-sm font-semibold text-foreground">
              {formatRank(point.rank)}
              {wc ? ` · ${wc.shortName}` : null}
            </p>
            <p className="text-xs text-muted-foreground">
              {point.date}
              {point.note ? ` — ${point.note}` : null}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
