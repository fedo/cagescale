import { Minus, Plus } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useGender } from '@/app/providers/gender-provider'
import { useWeightUnit } from '@/app/providers/weight-unit-provider'
import {
  classesForGender,
  distanceToLimitLb,
  findWeightClassNeighborhood,
} from '@/entities/weight-class/lib/find-class'
import { estimateBodyComp } from '@/features/weight-finder/lib/estimates'
import { kgToLb, lbToKg, roundWeight } from '@/shared/lib/units'
import {
  DualWeightFromKg,
  DualWeightFromLb,
  DualWeightRange,
  DualWeightSignedDelta,
} from '@/shared/ui/dual-weight'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { cn } from '@/shared/lib/cn'

const WEIGHT_STEP_DELAY_MS = 250
const MIN_WEIGHT = 1

function ClassColumn({
  label,
  name,
  limitLb,
  weightLb,
  highlight,
  empty,
}: {
  label: string
  name?: string
  limitLb?: number
  weightLb?: number | null
  highlight?: boolean
  empty?: boolean
}) {
  const delta =
    weightLb != null && limitLb != null
      ? distanceToLimitLb(weightLb, limitLb)
      : null
  return (
    <div
      className={cn(
        'flex min-h-full flex-col rounded-md px-2 py-3 sm:px-3',
        highlight
          ? 'border border-primary/30 bg-primary/5'
          : 'bg-muted/60',
        empty && 'opacity-60',
      )}
    >
      <p className="text-[0.65rem] font-semibold uppercase leading-tight tracking-wide text-muted-foreground sm:text-xs">
        {label}
      </p>
      {name && limitLb != null ? (
        <>
          <p className="font-display mt-1.5 text-sm leading-tight text-foreground sm:text-base">
            {name}
          </p>
          <div className="mt-1">
            <DualWeightFromLb limitLb={limitLb} />
          </div>
          {delta ? (
            <DualWeightSignedDelta
              deltaKg={delta.deltaKg}
              deltaLb={delta.deltaLb}
            />
          ) : null}
        </>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground">—</p>
      )}
    </div>
  )
}

function EstimateColumn({
  label,
  period,
  children,
  note,
}: {
  label: string
  period: string
  children: ReactNode
  note?: string
}) {
  return (
    <div className="flex min-h-full flex-col rounded-md bg-muted/60 px-2 py-3 sm:px-3">
      <p className="text-[0.65rem] font-semibold uppercase leading-tight tracking-wide text-muted-foreground sm:text-xs">
        {label}
      </p>
      <p className="mt-1 text-[0.65rem] font-medium text-muted-foreground">{period}</p>
      <div className="mt-2 text-xs leading-snug text-muted-foreground">{children}</div>
      {note ? (
        <p className="mt-2 text-[0.65rem] leading-snug text-muted-foreground">{note}</p>
      ) : null}
    </div>
  )
}

export function WeightFinderPanel() {
  const { gender } = useGender()
  const { unit } = useWeightUnit()
  const [raw, setRaw] = useState('77')
  const stepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const applyWeightStep = useCallback(
    (direction: 1 | -1, magnitude: 1 | 5) => {
      setRaw((prev) => {
        const current = Number.parseFloat(prev)
        const fallback = unit === 'kg' ? 77 : 170
        const base =
          Number.isFinite(current) && current >= MIN_WEIGHT ? current : fallback
        const next = roundWeight(
          Math.max(MIN_WEIGHT, base + direction * magnitude),
        )
        return String(next)
      })
    },
    [unit],
  )

  const scheduleWeightStep = useCallback(
    (direction: 1 | -1) => {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current)
      stepTimerRef.current = setTimeout(() => {
        applyWeightStep(direction, 1)
        stepTimerRef.current = null
      }, WEIGHT_STEP_DELAY_MS)
    },
    [applyWeightStep],
  )

  const weightStepNow = useCallback(
    (direction: 1 | -1, magnitude: 1 | 5) => {
      if (stepTimerRef.current) {
        clearTimeout(stepTimerRef.current)
        stepTimerRef.current = null
      }
      applyWeightStep(direction, magnitude)
    },
    [applyWeightStep],
  )

  useEffect(() => {
    return () => {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current)
    }
  }, [])

  const parsed = Number.parseFloat(raw)
  const valid = Number.isFinite(parsed) && parsed > 0

  const weightKg = useMemo(() => {
    if (!valid) return null
    return unit === 'kg' ? parsed : lbToKg(parsed)
  }, [parsed, unit, valid])

  const weightLb = useMemo(() => {
    if (weightKg == null) return null
    return kgToLb(weightKg)
  }, [weightKg])

  useEffect(() => {
    if (weightKg == null) return
    setRaw(
      String(unit === 'kg' ? roundWeight(weightKg) : roundWeight(kgToLb(weightKg))),
    )
    // Convert displayed input when header unit toggles
    // eslint-disable-next-line react-hooks/exhaustive-deps -- unit only
  }, [unit])

  const neighborhood = useMemo(() => {
    if (weightLb == null) return null
    return findWeightClassNeighborhood(weightLb, gender)
  }, [gender, weightLb])

  const estimates = useMemo(() => {
    if (weightKg == null || !neighborhood) return null
    return estimateBodyComp(
      weightKg,
      neighborhood.match,
      neighborhood.above,
      neighborhood.below,
    )
  }, [neighborhood, weightKg])

  const ladder = classesForGender(gender)

  return (
    <div className="animate-rise space-y-6">
      <section className="space-y-4">
        <div>
          <Label htmlFor="weight">Your weight ({unit})</Label>
          <p className="mt-1 text-xs text-muted-foreground">
            Both units shown below — primary from header toggle
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-11 w-11 shrink-0"
            aria-label="Decrease weight by 1. Double-click to decrease by 5."
            title="−1 (double-click −5)"
            onClick={() => scheduleWeightStep(-1)}
            onDoubleClick={(event) => {
              event.preventDefault()
              weightStepNow(-1, 5)
            }}
          >
            <Minus className="size-5" aria-hidden />
          </Button>
          <Input
            id="weight"
            inputMode="decimal"
            type="number"
            min={MIN_WEIGHT}
            step="0.1"
            value={raw}
            onChange={(event) => setRaw(event.target.value)}
            placeholder={unit === 'kg' ? 'e.g. 77' : 'e.g. 170'}
            className="text-center tabular-nums"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-11 w-11 shrink-0"
            aria-label="Increase weight by 1. Double-click to increase by 5."
            title="+1 (double-click +5)"
            onClick={() => scheduleWeightStep(1)}
            onDoubleClick={(event) => {
              event.preventDefault()
              weightStepNow(1, 5)
            }}
          >
            <Plus className="size-5" aria-hidden />
          </Button>
        </div>

        {weightKg != null && weightLb != null ? (
          <DualWeightFromKg weightKg={weightKg} size="base" />
        ) : (
          <p className="text-sm text-muted-foreground">Enter a valid weight.</p>
        )}
      </section>

      {neighborhood && weightKg != null ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-foreground">Your class</h2>
          {neighborhood.overHeavy && ladder.length > 0 ? (
            <p className="text-sm text-muted-foreground">
              Above {ladder[ladder.length - 1]!.name} limit{' '}
              <DualWeightFromLb limitLb={ladder[ladder.length - 1]!.limitLb} />.
            </p>
          ) : null}

          <div className="grid grid-cols-3 gap-2">
            <ClassColumn
              label="Above"
              name={neighborhood.above?.name}
              limitLb={neighborhood.above?.limitLb}
              weightLb={weightLb}
              empty={!neighborhood.above}
            />
            <ClassColumn
              label="You"
              name={neighborhood.match?.name}
              limitLb={neighborhood.match?.limitLb}
              weightLb={weightLb}
              highlight={Boolean(neighborhood.match)}
              empty={!neighborhood.match}
            />
            <ClassColumn
              label="Below"
              name={neighborhood.below?.name}
              limitLb={neighborhood.below?.limitLb}
              weightLb={weightLb}
              empty={!neighborhood.below}
            />
          </div>
        </section>
      ) : null}

      {estimates ? (
        <section className="space-y-3">
          <div>
            <h2 className="font-display text-2xl text-foreground">Estimates</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Approximate natural-athlete ranges — not medical advice.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <EstimateColumn
              label="Bulk"
              period="/ month"
              note={
                estimates.monthsToAboveClass != null
                  ? `~${estimates.monthsToAboveClass} mo to class above`
                  : undefined
              }
            >
              <DualWeightRange
                kgMin={estimates.bulkMonthlyKg.min}
                kgMax={estimates.bulkMonthlyKg.max}
                lbMin={estimates.bulkMonthlyLb.min}
                lbMax={estimates.bulkMonthlyLb.max}
              />
            </EstimateColumn>

            <EstimateColumn
              label="Cut"
              period="/ week"
              note={
                estimates.weeksToBelowClass != null
                  ? `~${estimates.weeksToBelowClass} wk to class below`
                  : undefined
              }
            >
              <DualWeightRange
                kgMin={estimates.cutWeeklyKg.min}
                kgMax={estimates.cutWeeklyKg.max}
                lbMin={estimates.cutWeeklyLb.min}
                lbMax={estimates.cutWeeklyLb.max}
              />
            </EstimateColumn>

            <EstimateColumn
              label="Dehydrate"
              period="fight week"
              note="2–5% bodyweight; high risk"
            >
              <DualWeightRange
                kgMin={estimates.dehydrationKg.min}
                kgMax={estimates.dehydrationKg.max}
                lbMin={estimates.dehydrationLb.min}
                lbMax={estimates.dehydrationLb.max}
              />
            </EstimateColumn>
          </div>
        </section>
      ) : null}
    </div>
  )
}
