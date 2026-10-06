/** Listed height in centimeters (UFC athlete pages / official listings). */
export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = Math.round(cm / 2.54)
  const feet = Math.floor(totalInches / 12)
  const inches = totalInches % 12
  return { feet, inches }
}

export function formatHeightDual(cm: number): string {
  const { feet, inches } = cmToFeetInches(cm)
  return `${feet}'${inches}" / ${cm} cm`
}
