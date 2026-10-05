import { delay } from '@/shared/api/delay'
import { fightersById } from '../model/data'
import type { Fighter } from '../model/types'

export async function getFighter(id: string): Promise<Fighter> {
  await delay()
  const fighter = fightersById[id]
  if (!fighter) {
    throw new Error(`Fighter not found: ${id}`)
  }
  return fighter
}

export function fighterQueryKey(id: string) {
  return ['fighter', id] as const
}
