export function waitDelay(delayMilliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMilliseconds))
}
