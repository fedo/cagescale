import { Link } from '@tanstack/react-router'
import { WEIGHT_CLASSES } from '@/entities/weight-class/model/data'
import type { WeightClassId } from '@/entities/weight-class/model/types'
import { Badge } from '@/shared/ui/badge'

export function WeightClassChips({
  weightClassIds,
}: {
  weightClassIds: WeightClassId[]
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {weightClassIds.map((id, index) => {
        const wc = WEIGHT_CLASSES.find((item) => item.id === id)
        if (!wc) return null
        return (
          <Link key={id} to="/" hash={id}>
            <Badge variant={index === 0 ? 'default' : 'secondary'}>
              {wc.name}
            </Badge>
          </Link>
        )
      })}
    </div>
  )
}
