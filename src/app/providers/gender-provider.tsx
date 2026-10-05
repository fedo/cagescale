import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Gender } from '@/entities/weight-class/model/types'

interface GenderContextValue {
  gender: Gender
  setGender: (gender: Gender) => void
}

const GenderContext = createContext<GenderContextValue | null>(null)

export function GenderProvider({ children }: { children: ReactNode }) {
  const [gender, setGender] = useState<Gender>('men')
  const value = useMemo(() => ({ gender, setGender }), [gender])
  return (
    <GenderContext.Provider value={value}>{children}</GenderContext.Provider>
  )
}

export function useGender() {
  const ctx = useContext(GenderContext)
  if (!ctx) {
    throw new Error('useGender must be used within GenderProvider')
  }
  return ctx
}
