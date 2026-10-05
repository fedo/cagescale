import type { FightRecord } from '@/entities/fighter/model/types'

export function FighterStats({ record }: { record: FightRecord }) {
  const items = [
    { label: 'Wins', value: record.wins },
    { label: 'Losses', value: record.losses },
    { label: 'Draws', value: record.draws },
    ...(record.noContests
      ? [{ label: 'NC', value: record.noContests }]
      : []),
  ]

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-md bg-muted/70 px-3 py-3 text-center">
          <p className="font-display text-2xl leading-none text-foreground">
            {item.value}
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  )
}
