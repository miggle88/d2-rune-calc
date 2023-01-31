import { ItemSubType, ItemType, Runeword } from '@/types'

const ClawsWeaponRunewords: Runeword[] = [
  {
    name: 'Pattern',
    types: [ItemType.Weapon],
    subTypes: [ItemSubType.Claw],
    minLevel: 23,
    runes: ['tal', 'ort', 'thul'],
    imageUrl: '/images/great_sword.png',
    modifiers: [
      { text: '30% Faster Block' },
      { text: '+40-80% (varies) Enhanced Damage' },
      { text: '10% Bonus to Attack Rating' },
      { text: 'Adds 17-62 (varies) Fire Damage' },
      { text: 'Adds 1-50 (varies) Lightning Damage' },
      { text: 'Adds 3-14 (varies) Cold Damage' },
      { text: '+6 Strength' },
      { text: '+6 Dexterity' },
      { text: 'All Resistances +15' },
    ],
  },

  {
    name: 'Chaos',
    types: [ItemType.Weapon],
    subTypes: [ItemSubType.Claw],
    minLevel: 57,
    runes: ['fal', 'ohm', 'um'],
    imageUrl: '/images/great_sword.png',
    modifiers: [
      { text: '9% Chance to Cast Level 11 Frozen Orb on Striking' },
      { text: '11% Chance to Cast Level 9 Charged Bolt on Striking' },
      { text: '+35% Increased Attack Speed' },
      { text: '+290-340 (varies)% Enhanced Damage' },
      { text: 'Adds 216-471 (varies) Magic Damage' },
      { text: '25% Chance of Open Wounds' },
      { text: '+1 to Whirlwind' },
      { text: '+10 to Strength' },
      { text: '+15 Life After Each Demon Kill' },
    ],
  },
]

export default ClawsWeaponRunewords
