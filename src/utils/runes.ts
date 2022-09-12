import { Rune, RuneInventory } from '@/types'
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

export function createInventory(runes: string[], initialValue = 0): RuneInventory {
  const runeInventory = {} as RuneInventory
  for (const key of runes) {
    runeInventory[key] = initialValue
  }
  return runeInventory
}
