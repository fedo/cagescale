const LB_PER_KG = 2.2046226218

export function kgToLb(kg: number): number {
  return kg * LB_PER_KG
}

export function lbToKg(lb: number): number {
  return lb / LB_PER_KG
}

export function roundWeight(value: number, decimals = 1): number {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

export function formatKgLb(kg: number, lb: number): string {
  return `${roundWeight(kg)} kg / ${roundWeight(lb)} lb`
}

export function formatDualFromKg(kg: number): string {
  return formatKgLb(kg, kgToLb(kg))
}

export function formatDualFromLb(lb: number): string {
  return formatKgLb(lbToKg(lb), lb)
}
