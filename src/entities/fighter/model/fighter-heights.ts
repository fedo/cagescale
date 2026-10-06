/**
 * Listed heights (cm) from UFC.com athlete profiles and event listings.
 * Rounded to whole cm as published by UFC.
 */
export const FIGHTER_HEIGHTS_CM: Record<string, number> = {
  'ciryl-gane': 193,
  'tom-aspinall': 196,
  'jon-jones': 193,
  'francis-ngannou': 193,
  'stipe-miocic': 193,
  'carlos-ulberg': 193,
  'alex-pereira': 193,
  'magomed-ankalaev': 191,
  'jamahal-hill': 193,
  'jiri-prochazka': 190,
  'sean-strickland': 185,
  'khamzat-chimaev': 188,
  'dricus-du-plessis': 183,
  'israel-adesanya': 193,
  'islam-makhachev': 178,
  'jack-della-maddalena': 180,
  'belal-muhammad': 178,
  'leon-edwards': 183,
  'kamaru-usman': 183,
  'justin-gaethje': 178,
  'ilia-topuria': 173,
  'charles-oliveira': 178,
  'khabib-nurmagomedov': 178,
  'alexander-volkanovski': 168,
  'max-holloway': 180,
  'conor-mcgregor': 175,
  'jose-aldo': 170,
  'petr-yan': 170,
  'merab-dvalishvili': 168,
  'sean-omalley': 180,
  'aljamain-sterling': 175,
  'henry-cejudo': 163,
  'joshua-van': 168,
  'alexandre-pantoja': 165,
  'brandon-moreno': 170,
  'deiveson-figueiredo': 165,
  'demetrious-johnson': 160,
  'mackenzie-dern': 160,
  'zhang-weili': 163,
  'rose-namajunas': 165,
  'carla-esparza': 155,
  'joanna-jedrzejczyk': 169,
  'valentina-shevchenko': 165,
  'alexa-grasso': 165,
  'nicco-montano': 165,
  'kayla-harrison': 173,
  'julianna-pena': 168,
  'raquel-pennington': 168,
  'amanda-nunes': 173,
  'holly-holm': 173,
  'cris-cyborg': 173,
  'germaine-de-randamie': 173,
}

export function fighterHeightCm(fighterId: string): number {
  const height = FIGHTER_HEIGHTS_CM[fighterId]
  if (height == null) {
    throw new Error(`Missing height for fighter: ${fighterId}`)
  }
  return height
}
