import { delay } from '@/shared/api/delay'
import { WEIGHT_CLASSES } from '../model/data'
import type { WeightClass, WeightClassId } from '../model/types'

export async function getWeightClass(
  id: WeightClassId,
): Promise<WeightClass | undefined> {
  await delay(40)
  return WEIGHT_CLASSES.find((wc) => wc.id === id)
}
