import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import {
  fighterQueryKey,
  getFighter,
} from '@/entities/fighter/api/get-fighter'
import { FighterStats } from '@/features/fighter-profile/ui/fighter-stats'
import { RankingTimeline } from '@/features/fighter-profile/ui/ranking-timeline'
import { TimelineSection } from '@/features/fighter-profile/ui/timeline-section'
import { WeightClassChips } from '@/features/fighter-profile/ui/weight-class-chips'
import { WeightClassTimeline } from '@/features/fighter-profile/ui/weight-class-timeline'
import { cn } from '@/shared/lib/cn'
import { FighterHeight } from '@/shared/ui/fighter-height'
import { FighterPhoto } from '@/shared/ui/fighter-photo'

export const Route = createFileRoute('/fighters/$fighterId')({
  component: FighterProfilePage,
})

function FighterProfilePage() {
  const { fighterId } = Route.useParams()
  const [photoExpanded, setPhotoExpanded] = useState(false)
  useEffect(() => {
    setPhotoExpanded(false)
  }, [fighterId])
  const { data, isLoading, isError } = useQuery({
    queryKey: fighterQueryKey(fighterId),
    queryFn: () => getFighter(fighterId),
  })

  if (isLoading) {
    return <p className="py-10 text-sm text-muted-foreground">Loading fighter…</p>
  }

  if (isError || !data) {
    return (
      <div className="space-y-3 py-10">
        <p className="text-sm text-primary">Fighter not found.</p>
        <Link to="/" className="text-sm font-semibold text-foreground underline">
          Back to divisions
        </Link>
      </div>
    )
  }

  return (
    <div className="animate-rise space-y-5">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Divisions
      </Link>

      <div
        className={cn(
          'flex gap-4',
          photoExpanded ? 'flex-col' : 'items-start',
        )}
      >
        <button
          type="button"
          onClick={() => setPhotoExpanded((open) => !open)}
          className={cn(
            'overflow-hidden rounded-md border-0 bg-transparent p-0 transition-[width] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            photoExpanded
              ? 'w-full cursor-zoom-out'
              : 'shrink-0 cursor-zoom-in',
          )}
          aria-expanded={photoExpanded}
          aria-label={
            photoExpanded ? 'Show smaller fighter photo' : 'Enlarge fighter photo'
          }
        >
          <FighterPhoto
            fighterId={data.id}
            name={data.name}
            fallbackUrl={data.imageUrl}
            width={photoExpanded ? 800 : 112}
            height={photoExpanded ? 600 : 112}
            className={cn(
              'object-cover transition-[width,height] duration-300 ease-out',
              photoExpanded
                ? 'aspect-square h-auto w-full max-h-[min(70vh,32rem)] max-w-[min(70vh,32rem)] mx-auto'
                : 'h-28 w-28',
            )}
          />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-3xl leading-none text-foreground">
            {data.name}
          </h1>
          {data.nickname ? (
            <p className="mt-1 text-sm text-muted-foreground">“{data.nickname}”</p>
          ) : null}
          <p className="mt-2 text-sm text-muted-foreground">{data.country}</p>
          <FighterHeight heightCm={data.heightCm} className="mt-1 block text-sm" />
        </div>
      </div>

      <WeightClassChips weightClassIds={data.weightClassIds} />
      <FighterStats record={data.record} />

      <div>
        <TimelineSection title="Ranking timeline" defaultOpen={false}>
          <RankingTimeline points={data.rankingTimeline} />
        </TimelineSection>
        <TimelineSection title="Weight class changes" defaultOpen>
          <WeightClassTimeline changes={data.weightClassChanges} />
        </TimelineSection>
      </div>
    </div>
  )
}
