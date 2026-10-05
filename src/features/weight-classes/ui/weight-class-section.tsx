import { formatDualFromLb } from '@/shared/lib/units'
import type { WeightClassWithChampions } from '@/entities/weight-class/model/types'
import { Badge } from '@/shared/ui/badge'
import { ChampionCard } from './champion-card'

interface WeightClassSectionProps {
  weightClass: WeightClassWithChampions
}

export function WeightClassSection({ weightClass }: WeightClassSectionProps) {
  const hasCurrent = weightClass.recentChampions.some((c) => c.isCurrent)

  return (
    <section className="animate-rise border-b border-border/70 py-6 last:border-b-0">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-2xl leading-none text-foreground">
              {weightClass.name}
            </h2>
            {!hasCurrent ? <Badge variant="outline">Vacant</Badge> : null}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Limit {formatDualFromLb(weightClass.limitLb)}
          </p>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {weightClass.gender === 'men' ? 'Men' : 'Women'}
        </span>
      </div>

      {weightClass.recentChampions.length === 0 ? (
        <p className="text-sm text-muted-foreground">No recent champions seeded.</p>
      ) : (
        <div className="stagger -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
          {weightClass.recentChampions.map((champion) => (
            <ChampionCard
              key={`${champion.fighterId}-${champion.latestReignYear}`}
              champion={champion}
            />
          ))}
        </div>
      )}
    </section>
  )
}
