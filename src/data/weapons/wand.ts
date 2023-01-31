import { ItemSubType, ItemType, Runeword } from '@/types'

const WandWeaponsRunewords: Runeword[] = [
  {
    name: 'Pattern',
    types: [ItemType.Weapon],
    subTypes: [ItemSubType.Wand],
    minLevel: 35,
    runes: ['dol', 'lo'],
    imageUrl: '/images/great_sword.png',
    modifiers: [
      { text: 'Hit Causes Monster To Flee 25%' },
      { text: '+10 To Vitality' },
      { text: '+3 To Poison and Bone Spells (Necromancer Only)' },
      { text: '+3 To Bone Armor (Necromancer Only)' },
      { text: '+2 To Bone Spear (Necromancer Only)' },
      { text: '+4 To Skeleton Mastery (Necromancer Only)' },
      { text: 'Magic Damage Reduced By 4' },
      { text: '20% Faster Cast Rate' },
      { text: '+13 To Mana' },
    ],
  },
]

export default WandWeaponsRunewords
