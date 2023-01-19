import RuneInventoryDisplay from '@/components/calc/RuneInventoryDisplay'
import Button from '@/components/common/Button'
import Checkbox from '@/components/common/Checkbox'
import DropDown from '@/components/common/DropDown'
import Modal from '@/components/common/Modal'
import TextPrompt from '@/components/common/TextPrompt'
import Conditional from '@/components/layout/Conditional'
import MasterDetailLayout from '@/components/layout/MasterDetailLayout'
import CharacterProfileList from '@/components/profiles/CharacterProfileList'
import { CharacterClass, CharacterProfile, RuneInventory } from '@/types'
import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

const UPDATE_TIMER_DELAY = 500

const Profiles: NextPage = () => {
  const [availableProfiles, setAvailableProfiles] = useState<CharacterProfile[]>([])
  const [selectedProfile, setSelectedProfile] = useState<CharacterProfile | null>(null)
  const [selectedInventory, setSelectedInventory] = useState<RuneInventory>({})
  const [pendingUpdates, setPendingUpdates] = useState<RuneInventory>({})
  const [updateTimerId, setUpdateTimerId] = useState<NodeJS.Timeout | null>(null)
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [createProfileName, setCreateProfileName] = useState<string>('')
  const [createProfileClass, setCreateProfileClass] = useState<CharacterClass>(CharacterClass.Amazon)
  const [createProfileLadder, setCreateProfileLadder] = useState<boolean>(false)
  const [createProfileHardcore, setCreateProfileHardcore] = useState<boolean>(false)

  const isNameInvalid = createProfileName.length < 1 || createProfileName.length > 100

  const resetCreateProfile = () => {
    setCreateProfileName('')
    setCreateProfileClass(CharacterClass.Amazon)
    setCreateProfileLadder(false)
    setCreateProfileHardcore(false)
  }

  const fetchProfiles = trpc.listProfiles.useQuery(undefined, {
    onSuccess: (data) => {
      const profiles = data.map(
        (profile) =>
          ({
            ...profile,
            runeInventory: {},
          } as CharacterProfile)
      )

      setAvailableProfiles(profiles)
    },
  })

  const fetchInventory = trpc.getInventory.useQuery(
    { profileId: selectedProfile?.id ?? 0 },
    {
      enabled: !!selectedProfile,
      onSuccess: (data) => {
        setSelectedInventory(data)
      },
    }
  )

  const createProfile = trpc.createProfile.useMutation({
    onSuccess: () => {
      fetchProfiles.refetch()
    },
  })

  const favoriteProfile = trpc.favoriteProfile.useMutation({
    onSuccess: () => {
      fetchProfiles.refetch()
    },
  })

  const deleteProfile = trpc.deleteProfile.useMutation({
    onSuccess: () => {
      fetchProfiles.refetch()
    },
  })

  const updateInventory = trpc.updateInventory.useMutation({
    onSuccess: () => {
      setPendingUpdates({})
    },
  })

  useEffect(() => {
    if (selectedProfile !== null) {
      fetchInventory.refetch()
    } else {
      setSelectedInventory({})
    }
  }, [selectedProfile])

  useEffect(() => {
    if (selectedProfile === null && availableProfiles.length > 0) {
      setSelectedProfile(availableProfiles[0])
    }
  }, [availableProfiles])

  useEffect(() => {
    // Clear the existing timer, if queued
    if (updateTimerId) {
      clearTimeout(updateTimerId)
      setUpdateTimerId(null)
    }

    // If there are pending updates
    if (Object.keys(pendingUpdates).length > 0) {
      const timerId = setTimeout(() => {
        if (selectedProfile) {
          updateInventory.mutate({ profileId: selectedProfile.id, inventory: pendingUpdates })
        }
      }, UPDATE_TIMER_DELAY)

      setUpdateTimerId(timerId)
    }
  }, [pendingUpdates])

  return (
    <MasterDetailLayout>
      <div>
        <CharacterProfileList
          profiles={availableProfiles}
          onClick={(profile) => setSelectedProfile(profile)}
          onFavorite={(profile, favorite) => {
            favoriteProfile.mutate({ id: profile.id, isStarred: favorite })
          }}
          onDelete={(profile) => {
            deleteProfile.mutate(
              { id: profile.id },
              {
                onSuccess: () => {
                  if (selectedProfile?.id === profile.id) {
                    setSelectedProfile(null)
                  }
                },
              }
            )
          }}
        />
      </div>
      <div>
        <div>
          <Conditional condition={selectedProfile != null}>
            <div className={'text-center text-red-500 p-3 text-2xl'}>
              {selectedProfile?.name}&apos;s Runes Collected
            </div>
            <RuneInventoryDisplay
              inventory={selectedInventory}
              showZeroQuantities={true}
              onChange={(key, newAmount) => {
                setSelectedInventory((prev) => ({ ...prev, [key]: newAmount }))
                setPendingUpdates({ ...pendingUpdates, [key]: newAmount })
              }}
            />
          </Conditional>
          <Conditional condition={selectedProfile == null}>
            <div>No Profile Selected</div>
          </Conditional>
          <div className={'p-3'}>
            <Button
              className={''}
              onClick={() => {
                resetCreateProfile()
                setShowCreateModal(true)
              }}
            >
              Create Profile
            </Button>
            <Modal
              title={'Create Profile'}
              buttonText={'Create'}
              show={showCreateModal}
              disabled={isNameInvalid || createProfile.isLoading}
              onClose={() => {
                setShowCreateModal(false)
              }}
              onSubmit={() => {
                setShowCreateModal(false)
                createProfile.mutate({
                  name: createProfileName,
                  class: createProfileClass,
                  ladder: createProfileLadder,
                  hardcore: createProfileHardcore,
                })
              }}
            >
              <div>
                <TextPrompt
                  prompt={'Name'}
                  value={createProfileName}
                  onChange={setCreateProfileName}
                  placeholder={'Enter your name'}
                  errorMessage={isNameInvalid ? 'Name must be between 1 and 100 characters' : undefined}
                />
                <div className={'px-3 py-1 text-2xl'}>Class</div>
                <DropDown
                  value={createProfileClass}
                  onChange={(value) => setCreateProfileClass(value as CharacterClass)}
                >
                  <option value={CharacterClass.Amazon}>Amazon</option>
                  <option value={CharacterClass.Assassin}>Assassin</option>
                  <option value={CharacterClass.Barbarian}>Barbarian</option>
                  <option value={CharacterClass.Druid}>Druid</option>
                  <option value={CharacterClass.Necromancer}>Necromancer</option>
                  <option value={CharacterClass.Paladin}>Paladin</option>
                  <option value={CharacterClass.Sorceress}>Sorceress</option>
                </DropDown>
                <div className={'flex flex-row'}>
                  <Checkbox
                    className={'p-3'}
                    checked={createProfileLadder}
                    label={'Ladder'}
                    onChange={setCreateProfileLadder}
                  />
                  <Checkbox
                    className={'p-3'}
                    checked={createProfileHardcore}
                    label={'Hardcore'}
                    onChange={setCreateProfileHardcore}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <Conditional condition={createProfile.error?.message != null}>
          <div className={'text-center text-red-500 p-3 text-2xl'}>{createProfile.error?.message}</div>
        </Conditional>
      </div>
    </MasterDetailLayout>
  )
}

export default Profiles
