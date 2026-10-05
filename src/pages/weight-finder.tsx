import { createFileRoute } from '@tanstack/react-router'
import { WeightFinderPanel } from '@/features/weight-finder/ui/weight-finder-panel'

export const Route = createFileRoute('/weight-finder')({
  component: WeightFinderPage,
})

function WeightFinderPage() {
  return (
    <div>
      <section className="animate-rise mb-6">
        <h1 className="font-display text-3xl text-foreground sm:text-4xl">
          My weight
        </h1>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          Type your walk-around weight to see your UFC class, the divisions above
          and below, and rough bulking / cutting / dehydration ranges.
        </p>
      </section>
      <WeightFinderPanel />
    </div>
  )
}
