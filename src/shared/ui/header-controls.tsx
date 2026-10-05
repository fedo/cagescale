import { useGender } from '@/app/providers/gender-provider'
import {
  useWeightUnit,
  type WeightUnit,
} from '@/app/providers/weight-unit-provider'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/cn'

function SegmentSwitch<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T
  onChange: (value: T) => void
  options: readonly { id: T; label: string }[]
}) {
  return (
    <div className="flex w-full rounded-md border border-border bg-muted p-px">
      {options.map((option) => (
        <Button
          key={option.id}
          type="button"
          variant="ghost"
          className={cn(
            'h-6 flex-1 rounded-[0.3rem] px-1 text-[0.65rem] font-semibold leading-none sm:text-[0.7rem]',
            value === option.id && 'bg-card text-foreground shadow-sm',
          )}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}

export function HeaderControls() {
  const { gender, setGender } = useGender()
  const { unit, setUnit } = useWeightUnit()

  return (
    <div className="flex w-[4.75rem] shrink-0 flex-col gap-1 sm:w-[5.25rem]">
      <SegmentSwitch
        value={gender}
        onChange={setGender}
        options={[
          { id: 'men', label: 'Men' },
          { id: 'women', label: 'Women' },
        ]}
      />
      <SegmentSwitch
        value={unit}
        onChange={(value: WeightUnit) => setUnit(value)}
        options={[
          { id: 'kg', label: 'kg' },
          { id: 'lb', label: 'lb' },
        ]}
      />
    </div>
  )
}
