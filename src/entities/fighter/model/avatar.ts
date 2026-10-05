/** Deterministic portrait placeholder (curated static demo; swap for CDN photos later). */
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
