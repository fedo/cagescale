import {
  useCallback,
  useState,
  type ImgHTMLAttributes,
  type SyntheticEvent,
} from 'react'
import {
  fighterAvatar,
  fighterLocalPhotoUrl,
  fighterPhotoExtensions,
} from '@/entities/fighter/model/avatar'
import { cn } from '@/shared/lib/cn'

interface FighterPhotoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  fighterId: string
  name: string
  /** Optional override if seed data already carries a fallback URL. */
  fallbackUrl?: string
}

export function FighterPhoto({
  fighterId,
  name,
  fallbackUrl,
  className,
  alt,
  onError,
  ...props
}: FighterPhotoProps) {
  const extensions = fighterPhotoExtensions()
  const [extensionIndex, setExtensionIndex] = useState(0)
  const [useFallback, setUseFallback] = useState(false)

  const placeholder = fallbackUrl ?? fighterAvatar(name)
  const src = useFallback
    ? placeholder
    : fighterLocalPhotoUrl(fighterId, extensions[extensionIndex] ?? 'webp')

  const handleError = useCallback(
    (event: SyntheticEvent<HTMLImageElement, Event>) => {
      onError?.(event)
      if (useFallback) return

      const nextIndex = extensionIndex + 1
      if (nextIndex < extensions.length) {
        setExtensionIndex(nextIndex)
        return
      }

      setUseFallback(true)
    },
    [extensionIndex, extensions.length, onError, useFallback],
  )

  return (
    <img
      {...props}
      src={src}
      alt={alt ?? name}
      className={cn(className)}
      onError={handleError}
      loading="lazy"
    />
  )
}
