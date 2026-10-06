import { Link } from '@tanstack/react-router'
import { fightersById } from '@/entities/fighter/model/data'
import type { ChampionReignSummary } from '@/entities/weight-class/model/types'
import { Badge } from '@/shared/ui/badge'
import { FighterHeight } from '@/shared/ui/fighter-height'
import { FighterPhoto } from '@/shared/ui/fighter-photo'
import { cn } from '@/shared/lib/cn'

interface ChampionCardProps {
  champion: ChampionReignSummary
  className?: string
}

export function ChampionCard({ champion, className }: ChampionCardProps) {
  const fighter = fightersById[champion.fighterId]
  if (!fighter) return null

  return (
    <Link
      to="/fighters/$fighterId"
      params={{ fighterId: fighter.id }}
      aria-label={`Open profile for ${fighter.name}`}
      className={cn(
        'group relative z-0 flex w-[7.25rem] shrink-0 cursor-pointer flex-col gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-md bg-accent">
        <FighterPhoto
          fighterId={fighter.id}
          name={fighter.name}
          fallbackUrl={fighter.imageUrl}
          width={116}
          height={116}
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {champion.isCurrent ? (
          <Badge className="absolute left-1.5 top-1.5 text-[0.65rem]">
            {champion.isInterim ? 'Interim' : 'Champ'}
          </Badge>
        ) : null}
      </div>
      <div>
        <p className="line-clamp-2 text-sm font-semibold leading-tight text-foreground">
          {fighter.name}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          First belt {champion.firstTitleYear}
        </p>
        <FighterHeight
          heightCm={fighter.heightCm}
          className="mt-0.5 block text-[0.65rem] leading-snug"
        />
      </div>
    </Link>
  )
}
