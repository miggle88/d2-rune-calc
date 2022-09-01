import { ItemType, Runeword } from '@/types'

const ShieldRunewords: Runeword[] = [
  {
    name: "Ancient's Pledge",
    types: [ItemType.Shield],
    minLevel: 21,
    runes: ['ral', 'ort', 'tal'],
    imageUrl: '/images/field_plate.png',
    modifiers: [
      { text: '+50% Enhanced Defense' },
      { text: 'Cold Resist +43%' },
      { text: 'Fire Resist +48%' },
      { text: 'Lightning Resist +48%' },
      { text: 'Poison Resist +48%' },
      { text: '10% Damage Goes To Mana' },
    ],
  },
  {
    name: 'Splendor',
    types: [ItemType.Shield],
    minLevel: 37,
    runes: ['eth', 'lum'],
    imageUrl: '/images/field_plate.png',
    modifiers: [
      { text: '+1 To All Skills' },
      { text: '+10% Faster Cast Rate' },
      { text: '+20% Faster Block Rate' },
      { text: '+60–100% Enhanced Defense' },
      { text: '+10 To Energy' },
      { text: 'Regenerate Mana 15%' },
      { text: '50% Extra Gold From Monsters' },
      { text: '20% Better Chance of Getting Magic Items' },
      { text: '+3 To Light Radius' },
    ],
  },
]

export default ShieldRunewords
