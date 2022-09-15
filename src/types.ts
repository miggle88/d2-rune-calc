export type Rune = {
  key: string
  name: string
  charLevel: number
  index: number
}

export type RuneInventory = Record<string, number>

export type Runeword = {
  name: string
  types: ItemType[]
  subTypes?: ItemSubType[]
  minLevel: number
  runes: string[]
  imageUrl?: string
  modifiers: Modifier[]
}

export type Modifier = {
  text: string
  style?: string
}

export enum ItemType {
  Armor = 'Armor',
  Helmet = 'Helmet',
  Shield = 'Shield',
  Weapon = 'Weapon',
}

export enum ItemSubType {
  Axe = 'Axe',
  Bow = 'Bow',
  Claw = 'Claw',
  Hammer = 'Hammer',
  Scepter = 'Scepter',
  Sword = 'Sword',
}

export type CalculatorParameters = {
  minRune: Rune
  runes: Rune[]
  inventory: RuneInventory
}

export type RuneCalculation = {
  rune: Rune
  requires: RuneInventory
}
