export function hasCommonElement<T>(array1: T[], array2: T[]): boolean {
  for (const item1 of array1) {
    for (const item2 of array2) {
      if (item1 === item2) {
        return true
      }
    }
  }

  return false
}
