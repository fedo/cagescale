import { formatHeightDual } from '@/shared/lib/height'
import { cn } from '@/shared/lib/cn'

export function FighterHeight({
  heightCm,
  className,
}: {
  heightCm: number
  className?: string
}) {
  return (
    <span className={cn('tabular-nums text-muted-foreground', className)}>
      {formatHeightDual(heightCm)}
    </span>
  )
}
