import { useGender } from '@/app/providers/gender-provider'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/cn'

export function GenderNav() {
  const { gender, setGender } = useGender()

  return (
    <nav
      className="inline-flex rounded-md border border-border bg-muted p-0.5"
      aria-label="Men's or women's divisions"
    >
      {(
        [
          { id: 'men', label: 'Men' },
          { id: 'women', label: 'Women' },
        ] as const
      ).map((option) => (
        <Button
          key={option.id}
          type="button"
          size="sm"
          variant="ghost"
          className={cn(
            'h-8 min-w-[3.25rem] px-2.5 text-xs font-semibold sm:min-w-14 sm:text-sm',
            gender === option.id && 'bg-card text-foreground shadow-sm',
          )}
          onClick={() => setGender(option.id)}
        >
          {option.label}
        </Button>
      ))}
    </nav>
  )
}
