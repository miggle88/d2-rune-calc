import { Session } from 'next-auth'

export interface UserSession extends Session {
  userId: number
  isAdmin: boolean
}

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

export enum CharacterClass {
  Amazon = 'Amazon',
  Assassin = 'Assassin',
  Barbarian = 'Barbarian',
  Druid = 'Druid',
  Necromancer = 'Necromancer',
  Paladin = 'Paladin',
  Sorceress = 'Sorceress',
}

export type CharacterProfile = {
  name: string
  level: number
  class: CharacterClass
  ladder: boolean
  hardcore: boolean
  createdDate: Date
  updatedDate: Date
  runeInventory: RuneInventory
}
