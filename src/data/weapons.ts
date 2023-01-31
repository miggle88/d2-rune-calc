import AnyWeaponRunewords from '@/data/weapons/any'
import MultipleWeaponRunewords from '@/data/weapons/multiple'
import PolearmWeaponRunewords from '@/data/weapons/polearms'
import ClawsWeaponRunewords from '@/data/weapons/claws'
import { Runeword } from '@/types'
import MissileWeaponRuneWords from '@/data/weapons/missile'
import StaffWeaponRunewords from '@/data/weapons/staff'
import WandWeaponsRunewords from '@/data/weapons/wand'

const WeaponRunewords: Runeword[] = [
  ...AnyWeaponRunewords,
  ...MultipleWeaponRunewords,
  ...PolearmWeaponRunewords,
  ...ClawsWeaponRunewords,
  ...MissileWeaponRuneWords,
  ...StaffWeaponRunewords,
  ...WandWeaponsRunewords,
]

export default WeaponRunewords
