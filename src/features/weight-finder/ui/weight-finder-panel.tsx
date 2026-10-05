import { useMemo, useState } from 'react'
import { useGender } from '@/app/providers/gender-provider'
import {
  classesForGender,
  findWeightClassNeighborhood,
} from '@/entities/weight-class/lib/find-class'
import { estimateBodyComp } from '@/features/weight-finder/lib/estimates'
import {
  formatDualFromKg,
  formatDualFromLb,
  kgToLb,
  lbToKg,
  roundWeight,
} from '@/shared/lib/units'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/cn'

type Unit = 'kg' | 'lb'

function ClassColumn({
  label,
  name,
  limitLb,
  highlight,
  empty,
}: {
  label: string
  name?: string
  limitLb?: number
  highlight?: boolean
  empty?: boolean
}) {
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
          <p className="mt-1 text-[0.7rem] leading-snug text-muted-foreground sm:text-xs">
            {formatDualFromLb(limitLb)}
          </p>
        </>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground">—</p>
      )}
    </div>
  )
}

export function WeightFinderPanel() {
  const { gender } = useGender()
  const [unit, setUnit] = useState<Unit>('kg')
  const [raw, setRaw] = useState('77')

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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Label htmlFor="weight">Your weight</Label>
            <p className="mt-1 text-xs text-muted-foreground">
              Always shown in kg and lb
            </p>
          </div>
          <div className="inline-flex items-center rounded-md border border-border bg-muted p-1">
            {(['kg', 'lb'] as const).map((option) => (
              <Button
                key={option}
                type="button"
                size="sm"
                variant="ghost"
                className={cn(
                  'h-8 min-w-12',
                  unit === option && 'bg-card text-foreground shadow-sm',
                )}
                onClick={() => {
                  if (weightKg != null) {
                    setRaw(
                      String(
                        option === 'kg'
                          ? roundWeight(weightKg)
                          : roundWeight(kgToLb(weightKg)),
                      ),
                    )
                  }
                  setUnit(option)
                }}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <Input
          id="weight"
          inputMode="decimal"
          type="number"
          min={1}
          step="0.1"
          value={raw}
          onChange={(event) => setRaw(event.target.value)}
          placeholder={unit === 'kg' ? 'e.g. 77' : 'e.g. 170'}
        />

        {weightKg != null && weightLb != null ? (
          <p className="text-sm font-medium text-foreground">
            {formatDualFromKg(weightKg)}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">Enter a valid weight.</p>
        )}
      </section>

      {neighborhood && weightKg != null ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-foreground">Your class</h2>
          {neighborhood.overHeavy && ladder.length > 0 ? (
            <p className="text-sm text-muted-foreground">
              Above {ladder[ladder.length - 1]!.name} limit (
              {formatDualFromLb(ladder[ladder.length - 1]!.limitLb)}).
            </p>
          ) : null}

          <div className="grid grid-cols-3 gap-2">
            <ClassColumn
              label="Above"
              name={neighborhood.above?.name}
              limitLb={neighborhood.above?.limitLb}
              empty={!neighborhood.above}
            />
            <ClassColumn
              label="You"
              name={neighborhood.match?.name}
              limitLb={neighborhood.match?.limitLb}
              highlight={Boolean(neighborhood.match)}
              empty={!neighborhood.match}
            />
            <ClassColumn
              label="Below"
              name={neighborhood.below?.name}
              limitLb={neighborhood.below?.limitLb}
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
              Approximate natural-athlete ranges — not coaching or medical advice.
            </p>
          </div>

          <div className="space-y-2">
            <div className="rounded-md bg-muted/60 px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">Possible bulking gains</p>
                <Badge variant="secondary">/ month</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {estimates.bulkMonthlyKg.min}–{estimates.bulkMonthlyKg.max} kg /{' '}
                {estimates.bulkMonthlyLb.min}–{estimates.bulkMonthlyLb.max} lb
              </p>
              {estimates.monthsToAboveClass != null ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  ~{estimates.monthsToAboveClass} months of lean gain to approach the
                  class above (very rough).
                </p>
              ) : null}
            </div>

            <div className="rounded-md bg-muted/60 px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">Weight loss pace</p>
                <Badge variant="secondary">/ week</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {estimates.cutWeeklyKg.min}–{estimates.cutWeeklyKg.max} kg /{' '}
                {estimates.cutWeeklyLb.min}–{estimates.cutWeeklyLb.max} lb
              </p>
              {estimates.weeksToBelowClass != null ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  ~{estimates.weeksToBelowClass} weeks of fat loss to reach the limit of
                  the class below (ignoring water cut).
                </p>
              ) : null}
            </div>

            <div className="rounded-md bg-muted/60 px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">Fight-week dehydration</p>
                <Badge variant="outline">acute</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {estimates.dehydrationKg.min}–{estimates.dehydrationKg.max} kg /{' '}
                {estimates.dehydrationLb.min}–{estimates.dehydrationLb.max} lb
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Typical 2–5% bodyweight water cut range seen in combat sports. High risk;
                shown for education only.
              </p>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
