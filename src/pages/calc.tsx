import RuneInventoryDisplay from '@/components/calc/RuneInventoryDisplay'
import ToggleButton from '@/components/common/ToggleButton'
import { createInventory, getHighestRune } from '@/utils/runes'
import { useState } from 'react'
import type { NextPage } from 'next'
import { Rune, RuneInventory, Runeword } from '@/types'
import RuneRangeSelector from '@/components/calc/RuneRangeSelector'
import RunewordDisplay from '@/components/calc/RunewordDisplay'
import MasterDetailLayout from '@/components/layout/MasterDetailLayout'
import RunewordList from '@/components/runewords/RunewordList'
import AllRunewords from '@/data/runewords'
import AllRunes from '@/data/runes'

const ALL_RUNE_NAMES = AllRunes.map((r) => r.name)
const DEFAULT_MIN_RUNE = AllRunes.find((r) => r.key === 'el')
const DEFAULT_MAX_RUNE = AllRunes.find((r) => r.key === 'zod')

const Calc: NextPage = () => {
  const [selectedRuneword, setSelectedRuneword] = useState<Runeword | undefined>()
  const [zeroQuantityVisibility, setZeroQuantityVisibility] = useState<boolean>(true)
  const [runeInventory, setRuneInventory] = useState<RuneInventory>(createInventory(ALL_RUNE_NAMES))
  const [minRune, setMinRune] = useState<Rune | undefined>(DEFAULT_MIN_RUNE)
  const [maxRune, setMaxRune] = useState<Rune | undefined>(DEFAULT_MAX_RUNE)

  const onRunewordClicked = (runeword: Runeword) => {
    setSelectedRuneword(runeword)

    const highestRune = getHighestRune(runeword?.runes ?? [])
    if (highestRune) {
      setMaxRune(highestRune)
    }
  }

  const onRuneInventoryChanged = (key: string, newAmount: number) => {
    const newInventory = { ...runeInventory, [key]: newAmount }
    setRuneInventory(newInventory)
  }

  return (
    <MasterDetailLayout>
      <div>
        <RunewordList runewords={AllRunewords} onClick={onRunewordClicked} />
      </div>
      <div>
        <div className={'flex flex-col text-center'}>
          <div className={'p-3 text-2xl'}>Runes Collected</div>
          <div>
            <input
              type={'checkbox'}
              checked={zeroQuantityVisibility}
              className={
                'text-red-600 bg-red-800 border-red-500 border-2 rounded p-3 focus:border-red-500 focus:ring-0'
              }
              onChange={(e) => setZeroQuantityVisibility(e.target.checked)}
            />
            <span className={'text-xl px-3 py-1 text-center align-middle'}>Show Zero Quantities</span>
            <div className={'pb-3'} />
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
          maxRune={maxRune}
          onMinRuneChanged={setMinRune}
          onMaxRuneChanged={setMaxRune}
          onResetClicked={() => {
            const highestRune = getHighestRune(selectedRuneword?.runes ?? [])
            setMinRune(DEFAULT_MIN_RUNE)
            setMaxRune(highestRune ?? DEFAULT_MAX_RUNE)
          }}
        />
      </div>
    </MasterDetailLayout>
  )
}

export default Calc
