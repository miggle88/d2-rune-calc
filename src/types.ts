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
  Mace = 'Mace',
  Polearm = 'Polearm',
  Scepter = 'Scepter',
  Staff = 'Staff',
  Sword = 'Sword',
  Wand = 'Wand',
}

export const AllSubTypes = Object.values(ItemSubType)

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
  id: number
  name: string
  class: CharacterClass
  ladder: boolean
  hardcore: boolean
  isStarred: boolean
  createdAt: Date
  updatedAt: Date
  runeInventory: RuneInventory
}
