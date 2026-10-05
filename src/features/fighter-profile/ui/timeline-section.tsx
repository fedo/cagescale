import { ChevronDown } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

interface TimelineSectionProps {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}

export function TimelineSection({
  title,
  defaultOpen = false,
  children,
}: TimelineSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border/70 py-3">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 py-1 text-left"
      >
        <h3 className="font-display text-lg text-foreground">{title}</h3>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>
      {open ? <div className="pb-2 pt-3">{children}</div> : null}
    </div>
  )
}
