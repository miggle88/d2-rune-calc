import Checkbox from '@/components/common/Checkbox'
import DropDown from '@/components/common/DropDown'
import useUserSession from '@/hooks/useUserSession'
import { trpc } from '@/utils/trpc'
import { GetServerSidePropsContext } from 'next'
import slugify from 'slugify'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { CharacterProfile, Rune, RuneCalculation, RuneInventory, Runeword } from '@/types'
import RuneInventoryDisplay from '@/components/calc/RuneInventoryDisplay'
import CalculatorResultsDisplay from '@/components/calc/CalculatorResultsDisplay'
import Button from '@/components/common/Button'
import RuneRangeSelector from '@/components/calc/RuneRangeSelector'
import RunewordDisplay from '@/components/calc/RunewordDisplay'
import MasterDetailLayout from '@/components/layout/MasterDetailLayout'
import RunewordList from '@/components/runewords/RunewordList'
import Conditional from '@/components/layout/Conditional'
import useSearchQuery from '@/hooks/useSearchQuery'
import AllRunewords from '@/data/runewords'
import AllRunes from '@/data/runes'
import { getLowestRune, getPreviousRune, lookupRunes } from '@/utils/runes'
import { calculateRunesNeeded } from '@/utils/calculator'

const DEFAULT_MIN_RUNE = AllRunes.find((r) => r.key === 'el')!
const UPDATE_TIMER_DELAY = 500

type CalcContext = {
  query: ParsedUrlQuery
}

const Calc: NextPage<CalcContext> = (context) => {
  const { status } = useUserSession()
  const { setQuery } = useSearchQuery()
  const [availableProfiles, setAvailableProfiles] = useState<CharacterProfile[]>([])
  const [selectedProfile, setSelectedProfile] = useState<CharacterProfile | null>(null)
  const [selectedInventory, setSelectedInventory] = useState<RuneInventory>({})
  const [selectedRuneword, setSelectedRuneword] = useState<Runeword | undefined>()
  const [zeroQuantityVisibility, setZeroQuantityVisibility] = useState<boolean>(true)
  const [pendingUpdates, setPendingUpdates] = useState<RuneInventory>({})
  const [updateTimerId, setUpdateTimerId] = useState<NodeJS.Timeout | null>(null)
  const [minRune, setMinRune] = useState<Rune>(DEFAULT_MIN_RUNE)
  const [calculatorResults, setCalculatorResults] = useState<RuneCalculation[]>([])

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
      onSuccess: (data: RuneInventory) => {
        setSelectedInventory(data)
      },
    }
  )

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

  useEffect(() => {
    const { selected } = context.query
    if (typeof selected === 'string' && selected.trim()) {
      const runeword = AllRunewords.find((r) => slugify(r.name).toLowerCase() === selected)
      if (runeword) {
        setSelectedRuneword(runeword)
      }
    }
    if (typeof context.query.minRune === 'string') {
      const rune = AllRunes.find((r) => slugify(r.name).toLowerCase() === context.query.minRune)
      if (rune) {
        setMinRune(rune)
      }
    }
  }, [])

  // Automatically set min/max rune range when selecting a runeword
  useEffect(() => {
    if (!selectedRuneword || context.query.minRune) {
      return
    }

    const lowestRune = getLowestRune(selectedRuneword.runes)
    if (lowestRune) {
      const newMinRune = getPreviousRune(lowestRune, 2) ?? DEFAULT_MIN_RUNE
      setMinRune(newMinRune)
    }
  }, [selectedRuneword])

  // Recalculate results when anything on calculator changes
  useEffect(() => {
    if (!selectedRuneword) {
      return
    }

    const newRunesNeeded = calculateRunesNeeded({
      minRune: minRune,
      runes: lookupRunes(selectedRuneword.runes),
      inventory: {},
    })

    setCalculatorResults(newRunesNeeded)
  }, [selectedRuneword, minRune])

  useEffect(() => {
    setQuery({
      selected: selectedRuneword ? slugify(selectedRuneword.name).toLowerCase() : null,
      minRune: slugify(minRune.name).toLowerCase(),
    })
  }, [selectedRuneword, minRune])

  return (
    <MasterDetailLayout>
      <div>
        <RunewordList runewords={AllRunewords} onClick={setSelectedRuneword} />
      </div>
      <div>
        <div className={'flex flex-col text-center'}>
          <Conditional condition={status !== 'authenticated'}>
            <div className={'text-red-500 py-2'}>You are not logged in, your inventory will not be stored</div>
          </Conditional>
          <div>
            <div className={'p-3 text-2xl text-red-500'}>Select Profile</div>
            <DropDown
              className={'min-w-[200px]'}
              value={selectedProfile?.name ?? 'No Character selected'}
              onChange={(value) => {
                const profile = availableProfiles.find((p) => p.name === value)
                if (profile) {
                  setSelectedProfile(profile)
                }
              }}
            >
              {availableProfiles.map((profile) => (
                <option className={'text-red-500'} key={profile.id} value={profile.name}>
                  {profile.name}
                </option>
              ))}
            </DropDown>
          </div>
          <Conditional condition={selectedProfile !== null}>
            <div className={'p-3 text-2xl'}>Runes Collected</div>
            <div className={'flex flex-row justify-center'}>
              <Checkbox
                checked={zeroQuantityVisibility}
                onChange={(isChecked) => setZeroQuantityVisibility(isChecked)}
                label={'Show Zero Quantities'}
              />
              <div className={'pr-3'} />
              <Button className={''}>
                <span className={'text-red-400 text-xl p-2'}>Reset Rune Inventory</span>
              </Button>
            </div>
            <RuneInventoryDisplay
              inventory={selectedInventory}
              showZeroQuantities={zeroQuantityVisibility}
              onChange={(key, newAmount) => {
                setSelectedInventory((prev) => ({ ...prev, [key]: newAmount }))
                setPendingUpdates({ ...pendingUpdates, [key]: newAmount })
              }}
            />
          </Conditional>
        </div>
        <RunewordDisplay runeword={selectedRuneword} />
        <RuneRangeSelector
          minRune={minRune}
          onMinRuneChanged={setMinRune}
          onResetClicked={() => {
            if (!selectedRuneword) {
              setMinRune(DEFAULT_MIN_RUNE)
              return
            }

            const lowestRune = getLowestRune(selectedRuneword.runes)
            if (lowestRune) {
              const newMinRune = getPreviousRune(lowestRune, 2) ?? DEFAULT_MIN_RUNE
              setMinRune(newMinRune)
            }
          }}
        />
        <div className={'flex flex-col'}>
          <div className={'text-center p-3 text-2xl'}>Runes Needed</div>
          <CalculatorResultsDisplay results={calculatorResults} />
        </div>
      </div>
    </MasterDetailLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query
  return {
    props: {
      query,
    },
  }
}

export default Calc
