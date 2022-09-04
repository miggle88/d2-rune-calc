import { Runeword } from '@/types'

export const runewordSorter = (a: Runeword, b: Runeword) => {
  return a.name.localeCompare(b.name)
}
