import { delay } from '@/shared/api/delay'
import { WEIGHT_CLASSES } from '../model/data'
import { getRecentChampions } from '../model/champions'
import type { WeightClassWithChampions } from '../model/types'
import { RECENT_CHAMPIONS_COUNT } from '../model/constants'

export async function getWeightClasses(): Promise<WeightClassWithChampions[]> {
  await delay()
  return WEIGHT_CLASSES.map((wc) => ({
    ...wc,
    recentChampions: getRecentChampions(wc.id, RECENT_CHAMPIONS_COUNT),
  }))
}

export const weightClassesQueryKey = ['weight-classes'] as const
