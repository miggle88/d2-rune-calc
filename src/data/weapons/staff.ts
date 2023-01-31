import { ItemSubType, ItemType, Runeword } from '@/types'

const StaffWeaponRunewords: Runeword[] = [
  {
    name: 'Obsession',
    types: [ItemType.Weapon],
    subTypes: [ItemSubType.Staff],
    minLevel: 69,
    runes: ['zod', 'ist', 'lem', 'lum', 'lo', 'nef'],
    imageUrl: '/images/great_sword.png',
    modifiers: [
      { text: 'Indestructible' },
      { text: '24% Chance to cast level 10 Weaken when struck' },
      { text: '+4 To All Skills' },
      { text: '+65% Faster Cast Rate' },
      { text: '+60% Faster Hit Recovery' },
      { text: 'Knockback' },
      { text: '+10 To Vitality' },
      { text: '+10 To Energy' },
      { text: 'Increase Maximum Life 15-25% (varies)' },
      { text: 'Regenerate Mana 15-30% (varies)' },
      { text: 'All Resistances +60-70 (varies)' },
      { text: '75% Extra Gold from Monsters' },
      { text: '30% Better Chance of Getting Magic Items' },
    ],
  },
  {
    name: 'Leaf',
    types: [ItemType.Weapon],
    subTypes: [ItemSubType.Staff],
    minLevel: 19,
    runes: ['tir', 'ral'],
    imageUrl: '/images/great_sword.png',
    modifiers: [
      { text: 'Adds 5-30 (varies) Fire Damage' },
      { text: '+3 To Fire Skills' },
      { text: '+3 To Fire Bolt (Sorceress Only)' },
      { text: '+3 To Inferno (Sorceress Only)' },
      { text: '+3 To Warmth (Sorceress Only)' },
      { text: '+2 To Mana After Each Kill' },
      { text: '+ (2 Per Character Level) +2-198 (varies) To Defense (Based On Character Level)' },
      { text: 'Cold Resist +33%' },
    ],
  },
  {
    name: 'Insight',
    types: [ItemType.Weapon],
    subTypes: [ItemSubType.Staff],
    minLevel: 27,
    runes: ['ral', 'tir', 'tal', 'sol'],
    imageUrl: '/images/great_sword.png',
    modifiers: [
      { text: 'Level 12-17 (varies) Meditation Aura When Equipped' },
      { text: '+35% Faster Cast Rate' },
      { text: '+200-260 (varies)% Enhanced Damage' },
      { text: '+9 To Minimum Damage' },
      { text: '180-250 (varies)% Bonus to Attack Rating' },
      { text: 'Adds 5-30 (varies) Fire Damage' },
      { text: '+75 Poison Damage Over 5 Seconds' },
      { text: '+1-6 (varies) To Critical Strike' },
      { text: '+5 To All Attributes' },
      { text: '+2 To Mana After Each Kill' },
      { text: '23% Better Chance of Getting Magic Items' },
    ],
  },
  {
    name: 'Heart of the Oak',
    types: [ItemType.Weapon],
    subTypes: [ItemSubType.Staff],
    minLevel: 55,
    runes: ['ko', 'vex', 'pul', 'thul'],
    imageUrl: '/images/great_sword.png',
    modifiers: [
      { text: '+3 To All Skills' },
      { text: '+40% Faster Cast Rate' },
      { text: '+75% Damage To Demons' },
      { text: '+100 To Attack Rating Against Demons' },
      { text: 'Adds 3-14 (varies) Cold Damage, 3 sec.Duration' },
      { text: '7% Mana Stolen Per Hit' },
      { text: '+10 To Dexterity' },
      { text: 'Replenish Life +20' },
      { text: 'Increase Maximum Mana 15%' },
      { text: 'All Resistances +30-40 (varies)' },
      { text: 'Level 4 Oak Sage (25 Charges)' },
      { text: 'Level 14 Raven (60 Charges)' },
    ],
  },
  {
    name: 'Memory',
    types: [ItemType.Weapon],
    subTypes: [ItemSubType.Staff],
    minLevel: 37,
    runes: ['lum', 'lo', 'sol', 'eth'],
    imageUrl: '/images/great_sword.png',
    modifiers: [
      { text: '+3 to Sorceress Skill Levels' },
      { text: '33% Faster Cast Rate' },
      { text: 'Increase Maximum Mana 20%' },
      { text: '+3 Energy Shield (Sorceress Only)' },
      { text: '+2 Static Field (Sorceress Only)' },
      { text: '+10 To Energy' },
      { text: '+10 To Vitality' },
      { text: '+9 To Minimum Damage' },
      { text: '-25% Target Defense' },
      { text: 'Magic Damage Reduced By 7' },
      { text: '+50% Enhanced Defense' },
    ],
  },
]

export default StaffWeaponRunewords