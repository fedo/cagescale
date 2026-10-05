export type Gender = 'men' | 'women'

export type WeightClassId =
  | 'mens-flyweight'
  | 'mens-bantamweight'
  | 'mens-featherweight'
  | 'mens-lightweight'
  | 'mens-welterweight'
  | 'mens-middleweight'
  | 'mens-light-heavyweight'
  | 'mens-heavyweight'
  | 'womens-strawweight'
  | 'womens-flyweight'
  | 'womens-bantamweight'
  | 'womens-featherweight'

export interface WeightClass {
  id: WeightClassId
  name: string
  shortName: string
  gender: Gender
  /** Upper limit in pounds (official UFC title limit). */
  limitLb: number
  /** Upper limit in kilograms (rounded UFC convention). */
  limitKg: number
  /** Inclusive lower bound in pounds (null = open floor). */
  minLb: number | null
  order: number
}

export interface ChampionReignSummary {
  fighterId: string
  /** Year the fighter first won this division's belt. */
  firstTitleYear: number
  /** Most recent reign start year (for ordering). */
  latestReignYear: number
  isCurrent: boolean
  isInterim?: boolean
}

export interface WeightClassWithChampions extends WeightClass {
  recentChampions: ChampionReignSummary[]
}
