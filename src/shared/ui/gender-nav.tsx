import { useGender } from '@/app/providers/gender-provider'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/cn'

export function GenderNav() {
  const { gender, setGender } = useGender()

  return (
    <nav
      className="flex rounded-md border border-border bg-muted p-1"
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
            'h-9 flex-1 font-semibold',
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
