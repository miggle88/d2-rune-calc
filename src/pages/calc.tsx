import { getHighestRune } from '@/utils/runes'
import { useState } from 'react'
import type { NextPage } from 'next'
import { Rune, Runeword } from '@/types'
import RuneRangeSelector from '@/components/calc/RuneRangeSelector'
import RunewordDisplay from '@/components/calc/RunewordDisplay'
import MasterDetailLayout from '@/components/layout/MasterDetailLayout'
import RunewordList from '@/components/runewords/RunewordList'
import AllRunewords from '@/data/runewords'
import AllRunes from '@/data/runes'

const DEFAULT_MIN_RUNE = AllRunes.find((r) => r.key === 'el')
const DEFAULT_MAX_RUNE = AllRunes.find((r) => r.key === 'zod')

const Calc: NextPage = () => {
  const [selectedRuneword, setSelectedRuneword] = useState<Runeword | undefined>()
  const [minRune, setMinRune] = useState<Rune | undefined>(DEFAULT_MIN_RUNE)
  const [maxRune, setMaxRune] = useState<Rune | undefined>(DEFAULT_MAX_RUNE)

  const onRunewordClicked = (runeword: Runeword) => {
    setSelectedRuneword(runeword)

    const highestRune = getHighestRune(runeword?.runes ?? [])
    if (highestRune) {
      setMaxRune(highestRune)
    }
  }

  return (
    <MasterDetailLayout>
      <div>
        <RunewordList runewords={AllRunewords} onClick={onRunewordClicked} />
      </div>
      <div>
        <div className={'flex flex-col text-center'}>
          <div className={'p-3'}>Runes Collected</div>
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
