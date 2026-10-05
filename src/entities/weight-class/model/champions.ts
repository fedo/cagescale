import type { WeightClassId } from './types'
import type { ChampionReignSummary } from './types'
import { RECENT_CHAMPIONS_COUNT } from './constants'

/**
 * Recent champions per division (most recent first).
 * `firstTitleYear` = year the fighter first won that division's belt.
 * Lineages researched from Wikipedia "List of UFC champions" + UFC.com (Oct 2026).
 */
const LINEAGES: Record<WeightClassId, ChampionReignSummary[]> = {
  'mens-heavyweight': [
    {
      fighterId: 'ciryl-gane',
      firstTitleYear: 2021,
      latestReignYear: 2026,
      isCurrent: true,
      isInterim: true,
    },
    {
      fighterId: 'tom-aspinall',
      firstTitleYear: 2023,
      latestReignYear: 2025,
      isCurrent: false,
    },
    {
      fighterId: 'jon-jones',
      firstTitleYear: 2023,
      latestReignYear: 2023,
      isCurrent: false,
    },
    {
      fighterId: 'francis-ngannou',
      firstTitleYear: 2021,
      latestReignYear: 2021,
      isCurrent: false,
    },
    {
      fighterId: 'stipe-miocic',
      firstTitleYear: 2016,
      latestReignYear: 2019,
      isCurrent: false,
    },
  ],
  'mens-light-heavyweight': [
    {
      fighterId: 'carlos-ulberg',
      firstTitleYear: 2026,
      latestReignYear: 2026,
      isCurrent: true,
    },
    {
      fighterId: 'alex-pereira',
      firstTitleYear: 2023,
      latestReignYear: 2025,
      isCurrent: false,
    },
    {
      fighterId: 'magomed-ankalaev',
      firstTitleYear: 2025,
      latestReignYear: 2025,
      isCurrent: false,
    },
    {
      fighterId: 'jamahal-hill',
      firstTitleYear: 2023,
      latestReignYear: 2023,
      isCurrent: false,
    },
    {
      fighterId: 'jiri-prochazka',
      firstTitleYear: 2022,
      latestReignYear: 2022,
      isCurrent: false,
    },
  ],
  'mens-middleweight': [
    {
      fighterId: 'sean-strickland',
      firstTitleYear: 2023,
      latestReignYear: 2026,
      isCurrent: true,
    },
    {
      fighterId: 'khamzat-chimaev',
      firstTitleYear: 2025,
      latestReignYear: 2025,
      isCurrent: false,
    },
    {
      fighterId: 'dricus-du-plessis',
      firstTitleYear: 2024,
      latestReignYear: 2024,
      isCurrent: false,
    },
    {
      fighterId: 'israel-adesanya',
      firstTitleYear: 2019,
      latestReignYear: 2023,
      isCurrent: false,
    },
    {
      fighterId: 'alex-pereira',
      firstTitleYear: 2022,
      latestReignYear: 2022,
      isCurrent: false,
    },
  ],
  'mens-welterweight': [
    {
      fighterId: 'islam-makhachev',
      firstTitleYear: 2025,
      latestReignYear: 2025,
      isCurrent: true,
    },
    {
      fighterId: 'jack-della-maddalena',
      firstTitleYear: 2025,
      latestReignYear: 2025,
      isCurrent: false,
    },
    {
      fighterId: 'belal-muhammad',
      firstTitleYear: 2024,
      latestReignYear: 2024,
      isCurrent: false,
    },
    {
      fighterId: 'leon-edwards',
      firstTitleYear: 2022,
      latestReignYear: 2022,
      isCurrent: false,
    },
    {
      fighterId: 'kamaru-usman',
      firstTitleYear: 2019,
      latestReignYear: 2019,
      isCurrent: false,
    },
  ],
  'mens-lightweight': [
    {
      fighterId: 'justin-gaethje',
      firstTitleYear: 2020,
      latestReignYear: 2026,
      isCurrent: true,
    },
    {
      fighterId: 'ilia-topuria',
      firstTitleYear: 2025,
      latestReignYear: 2025,
      isCurrent: false,
    },
    {
      fighterId: 'islam-makhachev',
      firstTitleYear: 2022,
      latestReignYear: 2022,
      isCurrent: false,
    },
    {
      fighterId: 'charles-oliveira',
      firstTitleYear: 2021,
      latestReignYear: 2021,
      isCurrent: false,
    },
    {
      fighterId: 'khabib-nurmagomedov',
      firstTitleYear: 2018,
      latestReignYear: 2018,
      isCurrent: false,
    },
  ],
  'mens-featherweight': [
    {
      fighterId: 'alexander-volkanovski',
      firstTitleYear: 2019,
      latestReignYear: 2025,
      isCurrent: true,
    },
    {
      fighterId: 'ilia-topuria',
      firstTitleYear: 2024,
      latestReignYear: 2024,
      isCurrent: false,
    },
    {
      fighterId: 'max-holloway',
      firstTitleYear: 2017,
      latestReignYear: 2017,
      isCurrent: false,
    },
    {
      fighterId: 'conor-mcgregor',
      firstTitleYear: 2015,
      latestReignYear: 2015,
      isCurrent: false,
    },
    {
      fighterId: 'jose-aldo',
      firstTitleYear: 2010,
      latestReignYear: 2016,
      isCurrent: false,
    },
  ],
  'mens-bantamweight': [
    {
      fighterId: 'petr-yan',
      firstTitleYear: 2020,
      latestReignYear: 2025,
      isCurrent: true,
    },
    {
      fighterId: 'merab-dvalishvili',
      firstTitleYear: 2024,
      latestReignYear: 2024,
      isCurrent: false,
    },
    {
      fighterId: 'sean-omalley',
      firstTitleYear: 2023,
      latestReignYear: 2023,
      isCurrent: false,
    },
    {
      fighterId: 'aljamain-sterling',
      firstTitleYear: 2021,
      latestReignYear: 2021,
      isCurrent: false,
    },
    {
      fighterId: 'henry-cejudo',
      firstTitleYear: 2019,
      latestReignYear: 2019,
      isCurrent: false,
    },
  ],
  'mens-flyweight': [
    {
      fighterId: 'joshua-van',
      firstTitleYear: 2025,
      latestReignYear: 2025,
      isCurrent: true,
    },
    {
      fighterId: 'alexandre-pantoja',
      firstTitleYear: 2023,
      latestReignYear: 2023,
      isCurrent: false,
    },
    {
      fighterId: 'brandon-moreno',
      firstTitleYear: 2021,
      latestReignYear: 2023,
      isCurrent: false,
    },
    {
      fighterId: 'deiveson-figueiredo',
      firstTitleYear: 2020,
      latestReignYear: 2022,
      isCurrent: false,
    },
    {
      fighterId: 'henry-cejudo',
      firstTitleYear: 2018,
      latestReignYear: 2018,
      isCurrent: false,
    },
  ],
  'womens-strawweight': [
    {
      fighterId: 'mackenzie-dern',
      firstTitleYear: 2025,
      latestReignYear: 2025,
      isCurrent: true,
    },
    {
      fighterId: 'zhang-weili',
      firstTitleYear: 2019,
      latestReignYear: 2022,
      isCurrent: false,
    },
    {
      fighterId: 'carla-esparza',
      firstTitleYear: 2014,
      latestReignYear: 2022,
      isCurrent: false,
    },
    {
      fighterId: 'rose-namajunas',
      firstTitleYear: 2017,
      latestReignYear: 2021,
      isCurrent: false,
    },
    {
      fighterId: 'joanna-jedrzejczyk',
      firstTitleYear: 2015,
      latestReignYear: 2015,
      isCurrent: false,
    },
  ],
  'womens-flyweight': [
    {
      fighterId: 'valentina-shevchenko',
      firstTitleYear: 2018,
      latestReignYear: 2024,
      isCurrent: true,
    },
    {
      fighterId: 'alexa-grasso',
      firstTitleYear: 2023,
      latestReignYear: 2023,
      isCurrent: false,
    },
    {
      fighterId: 'nicco-montano',
      firstTitleYear: 2017,
      latestReignYear: 2017,
      isCurrent: false,
    },
  ],
  'womens-bantamweight': [
    {
      fighterId: 'kayla-harrison',
      firstTitleYear: 2025,
      latestReignYear: 2025,
      isCurrent: true,
    },
    {
      fighterId: 'julianna-pena',
      firstTitleYear: 2021,
      latestReignYear: 2024,
      isCurrent: false,
    },
    {
      fighterId: 'raquel-pennington',
      firstTitleYear: 2024,
      latestReignYear: 2024,
      isCurrent: false,
    },
    {
      fighterId: 'amanda-nunes',
      firstTitleYear: 2016,
      latestReignYear: 2022,
      isCurrent: false,
    },
    {
      fighterId: 'holly-holm',
      firstTitleYear: 2015,
      latestReignYear: 2015,
      isCurrent: false,
    },
  ],
  'womens-featherweight': [
    {
      fighterId: 'amanda-nunes',
      firstTitleYear: 2018,
      latestReignYear: 2022,
      isCurrent: false,
    },
    {
      fighterId: 'cris-cyborg',
      firstTitleYear: 2017,
      latestReignYear: 2017,
      isCurrent: false,
    },
    {
      fighterId: 'germaine-de-randamie',
      firstTitleYear: 2017,
      latestReignYear: 2017,
      isCurrent: false,
    },
  ],
}

export function getRecentChampions(
  weightClassId: WeightClassId,
  count = RECENT_CHAMPIONS_COUNT,
): ChampionReignSummary[] {
  return (LINEAGES[weightClassId] ?? []).slice(0, count)
}
