import { useEffect, useState, type ImgHTMLAttributes } from 'react'
import {
  fighterLocalPhotoUrl,
  fighterPhotoExtensions,
} from '@/entities/fighter/model/avatar'
import { cn } from '@/shared/lib/cn'

interface FighterPhotoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  fighterId: string
  name: string
  /** Kept for callers that still pass the seed avatar URL. Initials render locally. */
  fallbackUrl?: string
}

function fighterInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return (parts[0] ?? '').slice(0, 2).toUpperCase()
  const first = parts[0]?.[0] ?? ''
  const last = parts[parts.length - 1]?.[0] ?? ''
  return `${first}${last}`.toUpperCase()
}

export function FighterPhoto({
  fighterId,
  name,
  fallbackUrl: _fallbackUrl,
  className,
  alt,
  width,
  height,
  ...props
}: FighterPhotoProps) {
  const [loaded, setLoaded] = useState<{ fighterId: string; url: string } | null>(
    null,
  )
  const visiblePhoto = loaded?.fighterId === fighterId ? loaded.url : null

  useEffect(() => {
    let cancelled = false
    const extensions = fighterPhotoExtensions()

    const tryExtension = (index: number) => {
      if (cancelled || index >= extensions.length) return
      const url = fighterLocalPhotoUrl(fighterId, extensions[index] ?? 'webp')
      const probe = new Image()
      probe.onload = () => {
        if (!cancelled) setLoaded({ fighterId, url })
      }
      probe.onerror = () => tryExtension(index + 1)
      probe.src = url
    }

    tryExtension(0)
    return () => {
      cancelled = true
    }
  }, [fighterId])

  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden bg-accent font-display text-2xl leading-none text-[#f3f4f6]',
        className,
      )}
      {...(visiblePhoto
        ? {}
        : { role: 'img' as const, 'aria-label': alt ?? name })}
    >
      <span aria-hidden="true">{fighterInitials(name)}</span>
      {visiblePhoto ? (
        <img
          {...props}
          src={visiblePhoto}
          alt={alt ?? name}
          width={width}
          height={height}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
    </span>
  )
}
