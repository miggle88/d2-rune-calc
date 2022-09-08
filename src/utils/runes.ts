import { Rune } from '@/types'
import AllRunes from '@/data/runes'

export function getHighestRune(runes: string[]): Rune | undefined {
  if (runes.length < 1) {
    return undefined
  }

  const sortedRunes = runes
    .map((name) => {
      return AllRunes.find((r) => r.key === name)
    })
    .filter((r) => r != null)
    .sort((a, b) => {
      return b!.charLevel - a!.charLevel
    })

  return sortedRunes.length ? sortedRunes[0] : undefined
}
