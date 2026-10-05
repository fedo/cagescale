import { Link } from '@tanstack/react-router'
import { fightersById } from '@/entities/fighter/model/data'
import type { ChampionReignSummary } from '@/entities/weight-class/model/types'

interface ChampionOnelinerProps {
  champions: ChampionReignSummary[]
}

export function ChampionOneliner({ champions }: ChampionOnelinerProps) {
  if (champions.length === 0) {
    return (
      <p className="truncate text-sm text-muted-foreground">No recent champions</p>
    )
  }

  return (
    <p className="truncate text-sm text-muted-foreground">
      {champions.map((champion, index) => {
        const fighter = fightersById[champion.fighterId]
        if (!fighter) return null
        const suffix = champion.isCurrent
          ? champion.isInterim
            ? ' · interim'
            : ' · champ'
          : ''
        return (
          <span key={`${champion.fighterId}-${champion.latestReignYear}`}>
            {index > 0 ? ', ' : null}
            <Link
              to="/fighters/$fighterId"
              params={{ fighterId: fighter.id }}
              className="font-medium text-foreground underline-offset-2 hover:underline"
              onClick={(event) => event.stopPropagation()}
            >
              {fighter.name}
            </Link>
            <span>
              {' '}
              ({champion.firstTitleYear}
              {suffix})
            </span>
          </span>
        )
      })}
    </p>
  )
}
