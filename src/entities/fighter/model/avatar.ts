const PHOTO_EXTENSIONS = ['webp', 'jpg', 'jpeg', 'png'] as const

/** Deterministic portrait placeholder when no local photo exists. */
export function fighterAvatar(name: string): string {
  const params = new URLSearchParams({
    name,
    background: '1f2937',
    color: 'f3f4f6',
    size: '256',
    bold: 'true',
    format: 'svg',
  })
  return `https://ui-avatars.com/api/?${params.toString()}`
}

/** First candidate URL under /public/fighters_images/{id}.{ext} */
export function fighterLocalPhotoUrl(
  fighterId: string,
  extension: (typeof PHOTO_EXTENSIONS)[number] = 'webp',
): string {
  return `/fighters_images/${fighterId}.${extension}`
}

export function fighterPhotoExtensions(): readonly (typeof PHOTO_EXTENSIONS)[number][] {
  return PHOTO_EXTENSIONS
}
