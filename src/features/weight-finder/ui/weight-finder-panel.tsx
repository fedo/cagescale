import { useMemo, useState } from 'react'
import {
  classesForGender,
  findWeightClassNeighborhood,
} from '@/entities/weight-class/lib/find-class'
import type { Gender } from '@/entities/weight-class/model/types'
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
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group'
import { Badge } from '@/shared/ui/badge'

type Unit = 'kg' | 'lb'

function ClassRow({
  label,
  name,
  limitLb,
  highlight,
}: {
  label: string
  name: string
  limitLb: number
  highlight?: boolean
}) {
  return (
    <div
      className={
        highlight
          ? 'rounded-md border border-primary/30 bg-primary/5 px-3 py-3'
          : 'rounded-md bg-muted/60 px-3 py-3'
      }
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="font-display mt-1 text-xl text-foreground">{name}</p>
      <p className="mt-0.5 text-sm text-muted-foreground">
        Limit {formatDualFromLb(limitLb)}
      </p>
    </div>
  )
}

export function WeightFinderPanel() {
  const [unit, setUnit] = useState<Unit>('kg')
  const [gender, setGender] = useState<Gender>('men')
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
          <ToggleGroup
            type="single"
            value={unit}
            onValueChange={(value) => {
              if (value === 'kg' || value === 'lb') {
                if (weightKg != null) {
                  setRaw(
                    String(
                      value === 'kg'
                        ? roundWeight(weightKg)
                        : roundWeight(kgToLb(weightKg)),
                    ),
                  )
                }
                setUnit(value)
              }
            }}
          >
            <ToggleGroupItem value="kg">kg</ToggleGroupItem>
            <ToggleGroupItem value="lb">lb</ToggleGroupItem>
          </ToggleGroup>
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

        <div>
          <Label className="mb-2 block">Division ladder</Label>
          <ToggleGroup
            type="single"
            value={gender}
            onValueChange={(value) => {
              if (value === 'men' || value === 'women') setGender(value)
            }}
          >
            <ToggleGroupItem value="men">Men</ToggleGroupItem>
            <ToggleGroupItem value="women">Women</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </section>

      {neighborhood && weightKg != null ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-foreground">Your class</h2>
          {neighborhood.overHeavy ? (
            <p className="text-sm text-muted-foreground">
              Above heavyweight limit ({formatDualFromLb(ladder[ladder.length - 1]!.limitLb)}).
              Still eligible for heavyweight if under the commission rules for the bout.
            </p>
          ) : null}

          {neighborhood.above ? (
            <ClassRow
              label="One above"
              name={neighborhood.above.name}
              limitLb={neighborhood.above.limitLb}
            />
          ) : null}

          {neighborhood.match ? (
            <ClassRow
              label="Your weight class"
              name={neighborhood.match.name}
              limitLb={neighborhood.match.limitLb}
              highlight
            />
          ) : null}

          {neighborhood.below ? (
            <ClassRow
              label="One below"
              name={neighborhood.below.name}
              limitLb={neighborhood.below.limitLb}
            />
          ) : null}
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
