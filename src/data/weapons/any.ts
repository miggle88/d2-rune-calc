import { AllSubTypes, ItemType, Runeword } from '@/types'

const AnyWeaponRunewords: Runeword[] = [
  {
    name: 'Breath of the Dying',
    types: [ItemType.Weapon],
    subTypes: [...AllSubTypes],
    minLevel: 69,
    runes: ['vex', 'hel', 'el', 'eld', 'zod', 'eth'],
    imageUrl: '/images/great_sword.png',
    modifiers: [
      {
        text: '50% Chance to Cast Level 20 Poison Nova When You Kill An Enemy',
      },
      { text: 'Indestructible' },
      { text: '+60% Increased Attack Speed' },
      { text: '+350-400% Enhanced Damage (varies)' },
      { text: '+200% Damage to Undead' },
      { text: '-25% Target Defense' },
      { text: '+50 to Attack Rating' },
      { text: '+50 to Attack Rating Against Undead' },
      { text: '7% Mana Stolen Per Hit' },
      { text: '12-15% Life Stolen Per hit (varies)' },
      { text: 'Prevent Monster Heal' },
      { text: '+30 to All Attributes' },
      { text: '+1 to Light Radius' },
      { text: 'Requirements -20%' },
    ],
  },
]

export default AnyWeaponRunewords
