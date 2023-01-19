import { ItemSubType, ItemType, Runeword } from '@/types'

const MultipleWeaponRunewords: Runeword[] = [
  {
    name: 'Beast',
    types: [ItemType.Weapon],
    subTypes: [ItemSubType.Axe, ItemSubType.Scepter, ItemSubType.Hammer],
    minLevel: 69,
    runes: ['vex', 'hel', 'el', 'eld', 'zod', 'eth'],
    imageUrl: '/images/great_sword.png',
    modifiers: [
      { text: 'Level 9 Fanaticism Aura When Equipped' },
      { text: '+40% Increased Attack Speed' },
      { text: '+240-270% Enhanced Damage' },
      { text: '+20% Chance of Crushing Blow' },
      { text: '+25% Chance of Open Wounds' },
      { text: '+3 To Werebear' },
      { text: '+3 To Lycanthropy' },
      { text: 'Prevent Monster Heal' },
      { text: '+25-40 To Strength' },
      { text: '+10 To Energy' },
      { text: '+2 To Mana After Each Kill' },
      { text: 'Level 13 Summon Grizzly (5 Charges)' },
    ],
  },
]

export default MultipleWeaponRunewords
