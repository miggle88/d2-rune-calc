import Button from '@/components/common/Button'
import React from 'react'
import AllRunes from '@/data/runes'
import { Rune } from '@/types'

const DROPDOWN_STYLE =
  'border-red-600 border-2 rounded bg-black text-red-400 focus:appearance-none focus:ring-0 focus:border-red-400 min-h-[48px]'

type RuneRangeSelectorProps = {
  minRune?: Rune
  maxRune?: Rune
  onMinRuneChanged?: (rune: Rune) => void
  onMaxRuneChanged?: (rune: Rune) => void
  onResetClicked?: () => void
}

const RuneRangeSelector = (props: RuneRangeSelectorProps) => {
  const onMinRuneChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rune = AllRunes.find((r) => r.key === e.target.value)
    if (rune && props.onMinRuneChanged) {
      props.onMinRuneChanged(rune)
    }
  }

  const onMaxRuneChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rune = AllRunes.find((r) => r.key === e.target.value)
    if (rune && props.onMaxRuneChanged) {
      props.onMaxRuneChanged(rune)
    }
  }

  return (
    <div>
      <div className={'p-4 text-2xl text-center'}>Rune Range</div>
      <div className={'flex justify-center'}>
        <div>
          <span className={'px-6 py-3'}>Min Rune:</span>
          <select onChange={onMinRuneChanged} value={props.minRune?.key} className={DROPDOWN_STYLE}>
            {AllRunes.map((rune) => {
              return (
                <option key={`min-${rune.key}`} value={rune.key}>
                  {rune.name}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          <span className={'px-6 py-3'}>Max Rune:</span>
          <select onChange={onMaxRuneChanged} value={props.maxRune?.key} className={DROPDOWN_STYLE}>
            {AllRunes.map((rune) => {
              return (
                <option key={`max-${rune.key}`} value={rune.key}>
                  {rune.name}
                </option>
              )
            })}
          </select>
        </div>
        <div className={'px-6 py-3'} />
        <Button className={'min-w-[120px] min-h-[48px]'} onClick={() => props.onResetClicked && props.onResetClicked()}>
          <span className={'text-red-400 text-xl p-2'}>Reset</span>
        </Button>
      </div>
    </div>
  )
}

export default RuneRangeSelector
