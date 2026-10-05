import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { WeightClassWithChampions } from '@/entities/weight-class/model/types'
import { Badge } from '@/shared/ui/badge'
import { DualWeightFromLb } from '@/shared/ui/dual-weight'
import { cn } from '@/shared/lib/cn'
import { ChampionCard } from './champion-card'
import { ChampionOneliner } from './champion-oneliner'

interface WeightClassSectionProps {
  weightClass: WeightClassWithChampions
}

export function WeightClassSection({ weightClass }: WeightClassSectionProps) {
  const [open, setOpen] = useState(false)
  const hasCurrent = weightClass.recentChampions.some((c) => c.isCurrent)

  return (
    <section className="scroll-mt-28 animate-rise border-b border-border/70 py-4 last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
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
          {!open ? (
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
            open && 'rotate-180',
          )}
        />
      </button>

      {open ? (
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
