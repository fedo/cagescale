import { kgToLb, lbToKg, roundWeight } from '@/shared/lib/units'
import type { WeightClass } from '@/entities/weight-class/model/types'

/**
 * Rough natural athlete heuristics (not medical advice):
 * - Lean bulking: ~0.25–0.5% bodyweight / month
 * - Sustainable fat loss: ~0.5–1% bodyweight / week
 * - Acute fight-week dehydration: ~2–5% bodyweight (high variance / risky)
 */
export interface BodyCompEstimates {
  bulkMonthlyKg: { min: number; max: number }
  bulkMonthlyLb: { min: number; max: number }
  cutWeeklyKg: { min: number; max: number }
  cutWeeklyLb: { min: number; max: number }
  dehydrationKg: { min: number; max: number }
  dehydrationLb: { min: number; max: number }
  monthsToAboveClass: number | null
  weeksToBelowClass: number | null
}

export function estimateBodyComp(
  weightKg: number,
  match: WeightClass | null,
  above: WeightClass | null,
  below: WeightClass | null,
): BodyCompEstimates {
  const bulkMinKg = roundWeight(weightKg * 0.0025)
  const bulkMaxKg = roundWeight(weightKg * 0.005)
  const cutMinKg = roundWeight(weightKg * 0.005)
  const cutMaxKg = roundWeight(weightKg * 0.01)
  const dehyMinKg = roundWeight(weightKg * 0.02)
  const dehyMaxKg = roundWeight(weightKg * 0.05)

  let monthsToAboveClass: number | null = null
  if (above && match) {
    const needKg = lbToKg(above.limitLb) - weightKg
    if (needKg > 0) {
      const avgMonthly = (bulkMinKg + bulkMaxKg) / 2 || 0.1
      monthsToAboveClass = Math.max(1, Math.round(needKg / avgMonthly))
    }
  }

  let weeksToBelowClass: number | null = null
  if (below) {
    const needKg = weightKg - lbToKg(below.limitLb)
    if (needKg > 0) {
      const avgWeekly = (cutMinKg + cutMaxKg) / 2 || 0.2
      weeksToBelowClass = Math.max(1, Math.round(needKg / avgWeekly))
    }
  }

  return {
    bulkMonthlyKg: { min: bulkMinKg, max: bulkMaxKg },
    bulkMonthlyLb: {
      min: roundWeight(kgToLb(bulkMinKg)),
      max: roundWeight(kgToLb(bulkMaxKg)),
    },
    cutWeeklyKg: { min: cutMinKg, max: cutMaxKg },
    cutWeeklyLb: {
      min: roundWeight(kgToLb(cutMinKg)),
      max: roundWeight(kgToLb(cutMaxKg)),
    },
    dehydrationKg: { min: dehyMinKg, max: dehyMaxKg },
    dehydrationLb: {
      min: roundWeight(kgToLb(dehyMinKg)),
      max: roundWeight(kgToLb(dehyMaxKg)),
    },
    monthsToAboveClass,
    weeksToBelowClass,
  }
}
