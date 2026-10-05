import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type WeightUnit = 'kg' | 'lb'

interface WeightUnitContextValue {
  unit: WeightUnit
  setUnit: (unit: WeightUnit) => void
}

const WeightUnitContext = createContext<WeightUnitContextValue | null>(null)

export function WeightUnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<WeightUnit>('kg')
  const value = useMemo(() => ({ unit, setUnit }), [unit])
  return (
    <WeightUnitContext.Provider value={value}>
      {children}
    </WeightUnitContext.Provider>
  )
}

export function useWeightUnit() {
  const ctx = useContext(WeightUnitContext)
  if (!ctx) {
    throw new Error('useWeightUnit must be used within WeightUnitProvider')
  }
  return ctx
}
