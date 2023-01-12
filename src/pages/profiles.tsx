import RuneInventoryDisplay from '@/components/calc/RuneInventoryDisplay'
import MasterDetailLayout from '@/components/layout/MasterDetailLayout'
import CharacterProfileList from '@/components/profiles/CharacterProfileList'
import { CharacterClass, CharacterProfile } from '@/types'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

const fakeProfiles: CharacterProfile[] = [
  {
    name: 'Ass',
    class: CharacterClass.Assassin,
    level: 99,
    ladder: true,
    hardcore: false,
    createdDate: new Date(),
    updatedDate: new Date(),
    runeInventory: { el: 3, eld: 3, eth: 3 },
  },
  {
    name: 'Barb',
    class: CharacterClass.Barbarian,
    level: 99,
    ladder: true,
    hardcore: true,
    createdDate: new Date(),
    updatedDate: new Date(),
    runeInventory: { el: 4, eld: 4, eth: 4 },
  },
]

const Profiles: NextPage = () => {
  const [availableProfiles, setAvailableProfiles] = useState<CharacterProfile[]>(fakeProfiles)
  const [selectedProfile, setSelectedProfile] = useState<CharacterProfile | null>(null)

  useEffect(() => {
    if (availableProfiles.length > 0) {
      setSelectedProfile(availableProfiles[0])
    }
  }, [])

  return (
    <MasterDetailLayout>
      <div>
        <CharacterProfileList profiles={availableProfiles} onClick={(profile) => setSelectedProfile(profile)} />
      </div>
      <div>
        <div>
          <div className={'text-center text-red-500 p-3 text-2xl'}>{selectedProfile?.name}&apos;s Runes Collected</div>
          <RuneInventoryDisplay inventory={selectedProfile?.runeInventory ?? {}} showZeroQuantities={true} />
        </div>
      </div>
    </MasterDetailLayout>
  )
}

export default Profiles
