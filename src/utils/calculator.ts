import { CalculatorParameters, Rune, RuneCalculation, RuneInventory } from '@/types'
import { getMinRune, getTransmuteQuantity } from '@/utils/runes'

export function calculateRunesNeeded(params: CalculatorParameters): RuneCalculation[] {
  return params.runes.map((rune) => {
    const results: RuneInventory = {}

    const addRuneToResults = (rune: Rune, quantity: number) => {
      const oldCount = results[rune.name] ?? 0
      results[rune.name] = oldCount + quantity
    }

    const usedRune = getMinRune(rune, params.minRune)
    const quantity = getTransmuteQuantity(rune, usedRune)
    addRuneToResults(usedRune, quantity)

    return { rune, requires: results }
  })
}
