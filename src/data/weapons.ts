import AnyWeaponRunewords from '@/data/weapons/any'
import MultipleWeaponRunewords from '@/data/weapons/multiple'
import PolearmWeaponRunewords from '@/data/weapons/polearms'
import { Runeword } from '@/types'

const WeaponRunewords: Runeword[] = [...AnyWeaponRunewords, ...MultipleWeaponRunewords, ...PolearmWeaponRunewords]

export default WeaponRunewords
