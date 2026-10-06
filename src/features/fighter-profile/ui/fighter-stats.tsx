import type { FightRecord } from '@/entities/fighter/model/types'
import { cn } from '@/shared/lib/cn'

function formatPct(value: number, total: number): string {
  if (total <= 0) return '—'
  return `${Math.round((value / total) * 100)}%`
}

export function FighterStats({ record }: { record: FightRecord }) {
  const items = [
    { label: 'Wins', value: record.wins },
    { label: 'Losses', value: record.losses },
    { label: 'Draws', value: record.draws },
    ...(record.noContests
      ? [{ label: 'NC', value: record.noContests }]
      : []),
  ]

  const total = items.reduce((sum, item) => sum + item.value, 0)

  return (
    <div
      className={cn(
        'grid min-w-0 gap-1',
        items.length === 4 ? 'grid-cols-4' : 'grid-cols-3',
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="min-w-0 rounded-md bg-muted/70 px-1 py-2 text-center sm:px-1.5"
        >
          <p className="font-display text-lg leading-none text-foreground sm:text-xl">
            {item.value}
          </p>
          <p className="mt-1 text-[0.65rem] font-medium uppercase leading-tight tracking-wide text-muted-foreground">
            {item.label}
          </p>
          <p className="mt-0.5 text-[0.65rem] font-medium leading-tight text-foreground/55">
            {formatPct(item.value, total)}
          </p>
        </div>
      ))}
    </div>
  )
}
