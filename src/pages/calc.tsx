import useUserSession from '@/hooks/useUserSession'
import { trpc } from '@/utils/trpc'
import { GetServerSidePropsContext } from 'next'
import slugify from 'slugify'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Rune, RuneCalculation, RuneInventory, Runeword } from '@/types'
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
import { createInventory, getLowestRune, getPreviousRune, lookupRunes } from '@/utils/runes'
import { calculateRunesNeeded } from '@/utils/calculator'

const ALL_RUNE_NAMES = AllRunes.map((r) => slugify(r.name.toLowerCase()))
const DEFAULT_MIN_RUNE = AllRunes.find((r) => r.key === 'el')!
const UPDATE_TIMER_DELAY = 3000

type CalcContext = {
  query: ParsedUrlQuery
}

const Calc: NextPage<CalcContext> = (context) => {
  const { status } = useUserSession()
  const { setQuery } = useSearchQuery()
  const [selectedRuneword, setSelectedRuneword] = useState<Runeword | undefined>()
  const [zeroQuantityVisibility, setZeroQuantityVisibility] = useState<boolean>(true)
  const [pendingUpdates, setPendingUpdates] = useState<RuneInventory>({})
  const [updateTimerId, setUpdateTimerId] = useState<NodeJS.Timeout | null>(null)
  const [runeInventory, setRuneInventory] = useState<RuneInventory>(createInventory(ALL_RUNE_NAMES))
  const [minRune, setMinRune] = useState<Rune>(DEFAULT_MIN_RUNE)
  const [calculatorResults, setCalculatorResults] = useState<RuneCalculation[]>([])

  const fetchRuneInventory = trpc.getInventory.useQuery(undefined, {
    onSuccess: (data) => {
      const newInventory = {
        ...createInventory(ALL_RUNE_NAMES),
        ...data,
      }
      setRuneInventory(newInventory)
      setPendingUpdates({})
    },
  })

  const saveRuneInventory = trpc.updateInventory.useMutation({
    onSuccess: (data) => {
      setPendingUpdates({})
    },
  })

  useEffect(() => {
    // Clear the existing timer, if queued
    if (updateTimerId) {
      clearTimeout(updateTimerId)
      setUpdateTimerId(null)
    }

    // If there are pending updates
    if (Object.keys(pendingUpdates).length > 0) {
      const timerId = setTimeout(() => {
        saveRuneInventory.mutate(pendingUpdates)
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
      inventory: runeInventory,
    })

    setCalculatorResults(newRunesNeeded)
  }, [selectedRuneword, runeInventory, minRune])

  useEffect(() => {
    setQuery({
      selected: selectedRuneword ? slugify(selectedRuneword.name).toLowerCase() : null,
      minRune: slugify(minRune.name).toLowerCase(),
    })
  }, [selectedRuneword, minRune])

  const onRuneInventoryChanged = (key: string, newAmount: number) => {
    const newInventory = { ...runeInventory, [key]: newAmount }
    setRuneInventory(newInventory)

    const newPendingUpdates = {
      ...pendingUpdates,
      [key]: newAmount,
    }
    setPendingUpdates(newPendingUpdates)
  }

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
          <div className={'p-3 text-2xl'}>Runes Collected</div>
          <div className={'flex flex-row justify-center'}>
            <input
              type={'checkbox'}
              checked={zeroQuantityVisibility}
              className={
                'text-red-600 bg-red-800 border-red-500 border-2 rounded p-3 focus:border-red-500 focus:ring-0'
              }
              onChange={(e) => setZeroQuantityVisibility(e.target.checked)}
            />
            <span className={'text-xl px-3 py-1 text-center align-middle'}>Show Zero Quantities</span>
            <div className={'pr-3'} />
            <Button
              className={''}
              onClick={() => {
                const blankInventory = createInventory(ALL_RUNE_NAMES)
                setRuneInventory(blankInventory)
              }}
            >
              <span className={'text-red-400 text-xl p-2'}>Reset Rune Inventory</span>
            </Button>
          </div>
          <RuneInventoryDisplay
            runes={runeInventory}
            showZeroQuantities={zeroQuantityVisibility}
            onChange={onRuneInventoryChanged}
          />
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
