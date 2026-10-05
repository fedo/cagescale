import { ChevronDown } from 'lucide-react'
import type { WeightClassWithChampions } from '@/entities/weight-class/model/types'
import { Badge } from '@/shared/ui/badge'
import { DualWeightFromLb } from '@/shared/ui/dual-weight'
import { cn } from '@/shared/lib/cn'
import { ChampionCard } from './champion-card'
import { ChampionOneliner } from './champion-oneliner'

interface WeightClassSectionProps {
  weightClass: WeightClassWithChampions
  expanded: boolean
  onToggle: () => void
}

export function WeightClassSection({
  weightClass,
  expanded,
  onToggle,
}: WeightClassSectionProps) {
  const hasCurrent = weightClass.recentChampions.some((c) => c.isCurrent)

  return (
    <section
      className={cn(
        'scroll-mt-28 animate-rise border-b border-border/70 py-4 transition-colors last:border-b-0',
        expanded && '-mx-2 rounded-lg border-transparent bg-muted px-2 sm:-mx-3 sm:px-3',
      )}
    >
      <button
        type="button"
        aria-expanded={expanded}
        onClick={onToggle}
        className="flex w-full items-start gap-2 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            <h2 className="font-display min-w-0 truncate text-2xl leading-none text-foreground">
              {weightClass.name}
            </h2>
            {!hasCurrent ? (
              <Badge variant="outline" className="shrink-0">
                Vacant
              </Badge>
            ) : null}
          </div>
          {!expanded ? (
            <div className="mt-2">
              <ChampionOneliner champions={weightClass.recentChampions} />
            </div>
          ) : null}
        </div>
        <DualWeightFromLb
          limitLb={weightClass.limitLb}
          className="shrink-0 self-center pt-0.5"
        />
        <ChevronDown
          className={cn(
            'mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200',
            expanded && 'rotate-180',
          )}
        />
      </button>

      {expanded ? (
        <div className="stagger mt-3 -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
          {weightClass.recentChampions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent champions seeded.</p>
          ) : (
            weightClass.recentChampions.map((champion) => (
              <ChampionCard
                key={`${champion.fighterId}-${champion.latestReignYear}`}
                champion={champion}
              />
            ))
          )}
        </div>
      ) : null}
    </section>
  )
}
