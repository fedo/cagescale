import { useWeightUnit } from '@/app/providers/weight-unit-provider'
import { kgToLb, lbToKg, roundWeight } from '@/shared/lib/units'
import { cn } from '@/shared/lib/cn'

interface DualWeightProps {
  kg: number
  lb: number
  className?: string
  size?: 'sm' | 'base'
}

export function DualWeight({ kg, lb, className, size = 'sm' }: DualWeightProps) {
  const { unit } = useWeightUnit()
  const kgText = `${roundWeight(kg)} kg`
  const lbText = `${roundWeight(lb)} lb`

  const primary = unit === 'kg' ? kgText : lbText
  const secondary = unit === 'kg' ? lbText : kgText

  return (
    <span
      className={cn(
        'whitespace-nowrap tabular-nums',
        size === 'sm' ? 'text-xs' : 'text-sm',
        className,
      )}
    >
      <span className="font-semibold text-foreground">{primary}</span>
      <span className="text-muted-foreground"> / {secondary}</span>
    </span>
  )
}

export function DualWeightFromLb({
  limitLb,
  className,
  size,
}: {
  limitLb: number
  className?: string
  size?: 'sm' | 'base'
}) {
  return (
    <DualWeight kg={lbToKg(limitLb)} lb={limitLb} className={className} size={size} />
  )
}

export function DualWeightFromKg({
  weightKg,
  className,
  size,
}: {
  weightKg: number
  className?: string
  size?: 'sm' | 'base'
}) {
  return (
    <DualWeight
      kg={weightKg}
      lb={kgToLb(weightKg)}
      className={className}
      size={size}
    />
  )
}

interface DualWeightRangeProps {
  kgMin: number
  kgMax: number
  lbMin: number
  lbMax: number
  className?: string
}

export function DualWeightSignedDelta({
  deltaKg,
  deltaLb,
  className,
  size = 'sm',
}: {
  deltaKg: number
  deltaLb: number
  className?: string
  size?: 'sm' | 'base'
}) {
  const { unit } = useWeightUnit()

  if (deltaLb === 0) {
    return (
      <p
        className={cn(
          'text-muted-foreground tabular-nums',
          size === 'sm' ? 'text-[0.65rem]' : 'text-xs',
          className,
        )}
      >
        At limit
      </p>
    )
  }

  const sign = deltaLb > 0 ? '+' : '−'
  const absKg = roundWeight(Math.abs(deltaKg))
  const absLb = roundWeight(Math.abs(deltaLb))
  const primary =
    unit === 'kg' ? `${sign}${absKg} kg` : `${sign}${absLb} lb`
  const secondary =
    unit === 'kg' ? `${sign}${absLb} lb` : `${sign}${absKg} kg`

  return (
    <p
      className={cn(
        'mt-1 tabular-nums leading-tight',
        size === 'sm' ? 'text-[0.65rem]' : 'text-xs',
        className,
      )}
    >
      <span className="font-semibold text-foreground">{primary}</span>
      <span className="text-muted-foreground"> / {secondary}</span>
    </p>
  )
}

export function DualWeightRange({
  kgMin,
  kgMax,
  lbMin,
  lbMax,
  className,
}: DualWeightRangeProps) {
  const { unit } = useWeightUnit()

  if (unit === 'kg') {
    return (
      <span className={className}>
        <span className="font-semibold text-foreground">
          {roundWeight(kgMin)}–{roundWeight(kgMax)} kg
        </span>
        <span className="text-muted-foreground">
          {' '}
          / {roundWeight(lbMin)}–{roundWeight(lbMax)} lb
        </span>
      </span>
    )
  }

  return (
    <span className={className}>
      <span className="font-semibold text-foreground">
        {roundWeight(lbMin)}–{roundWeight(lbMax)} lb
      </span>
      <span className="text-muted-foreground">
        {' '}
        / {roundWeight(kgMin)}–{roundWeight(kgMax)} kg
      </span>
    </span>
  )
}
