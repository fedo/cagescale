import { lbToKg, roundWeight } from '@/shared/lib/units'
import type { Gender, WeightClass } from '../model/types'
import { WEIGHT_CLASSES } from '../model/data'

export interface ClassNeighborhood {
  match: WeightClass | null
  above: WeightClass | null
  below: WeightClass | null
  overHeavy: boolean
  underLightest: boolean
}

export function classesForGender(gender: Gender): WeightClass[] {
  return WEIGHT_CLASSES.filter((wc) => wc.gender === gender).sort(
    (a, b) => a.limitLb - b.limitLb,
  )
}

/** Find the division whose upper limit is the first >= walk weight (lb). */
export function findWeightClassNeighborhood(
  weightLb: number,
  gender: Gender,
): ClassNeighborhood {
  const classes = classesForGender(gender)

  if (classes.length === 0) {
    return {
      match: null,
      above: null,
      below: null,
      overHeavy: false,
      underLightest: false,
    }
  }

  const lightest = classes[0]!
  const heaviest = classes[classes.length - 1]!

  if (weightLb > heaviest.limitLb) {
    return {
      match: null,
      above: null,
      below: heaviest,
      overHeavy: true,
      underLightest: false,
    }
  }

  const matchIndex = classes.findIndex((wc) => weightLb <= wc.limitLb)

  if (matchIndex === -1) {
    return {
      match: null,
      above: null,
      below: heaviest,
      overHeavy: true,
      underLightest: false,
    }
  }

  const match = classes[matchIndex]!
  const below = matchIndex > 0 ? classes[matchIndex - 1]! : null
  const above =
    matchIndex < classes.length - 1 ? classes[matchIndex + 1]! : null

  return {
    match,
    above,
    below,
    overHeavy: false,
    underLightest: weightLb < (lightest.minLb ?? 0) && lightest.minLb !== null,
  }
}

export function distanceToLimitLb(weightLb: number, limitLb: number) {
  const deltaLb = roundWeight(limitLb - weightLb)
  const deltaKg = roundWeight(lbToKg(Math.abs(deltaLb)) * Math.sign(deltaLb))
  return { deltaLb, deltaKg }
}
