import type { WeightClassId } from '@/entities/weight-class/model/types'

export interface FightRecord {
  wins: number
  losses: number
  draws: number
  noContests?: number
}

export interface RankingPoint {
  date: string
  rank: number | 'C' | 'NR'
  weightClassId: WeightClassId
  note?: string
}

export interface WeightClassChange {
  date: string
  fromWeightClassId: WeightClassId | null
  toWeightClassId: WeightClassId
  reason: string
}

export interface Fighter {
  id: string
  name: string
  nickname?: string
  imageUrl: string
  country: string
  record: FightRecord
  /** Weight classes competed in (primary first). */
  weightClassIds: WeightClassId[]
  rankingTimeline: RankingPoint[]
  weightClassChanges: WeightClassChange[]
}
