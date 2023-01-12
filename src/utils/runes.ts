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
      return b!.index - a!.index
    })

  return sortedRunes.length ? sortedRunes[0] : undefined
}

export function getLowestRune(runes: string[]): Rune | undefined {
  if (runes.length < 1) {
    return undefined
  }

  const sortedRunes = runes
    .map((name) => {
      return AllRunes.find((r) => r.key === name)
    })
    .filter((r) => r != null)
    .sort((a, b) => {
      return a!.index - b!.index
    })

  return sortedRunes.length ? sortedRunes[0] : undefined
}

export function lookupRunes(runes: string[]): Rune[] {
  const results = [] as Rune[]
  for (const key of runes) {
    const result = AllRunes.find((r) => r.key === key)

    if (result) {
      results.push(result)
    }
  }
  return results
}

export function getMinRune(...runes: Rune[]): Rune {
  const sortedRunes = [...runes].sort((a, b) => a.index - b.index)
  return sortedRunes[0]
}

export function getMaxRune(...runes: Rune[]): Rune {
  const sortedRunes = [...runes].sort((a, b) => b.index - a.index)
  return sortedRunes[0]
}

export function getPreviousRune(rune: Rune, delta = 1): Rune | undefined {
  return AllRunes.find((r) => r.index === rune.index - delta)
}

export function getNextRune(rune: Rune, delta = 1): Rune | undefined {
  return AllRunes.find((r) => r.index === rune.index + delta)
}

export function getRuneByIndex(index: number): Rune | undefined {
  return AllRunes.find((r) => r.index === index)
}

export function getTransmuteQuantity(target: Rune, used: Rune): number {
  if (used.index > target.index) {
    throw new Error('Cannot transmute down to a lower rune')
  }
  if (used.index === target.index) return 1

  const difference = target.index - used.index
  return Math.pow(3, difference)
}
