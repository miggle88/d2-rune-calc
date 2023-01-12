import RuneQuantity from '@/components/calc/RuneQuantity'
import AllRunes from '@/data/runes'
import { RuneInventory } from '@/types'

type RuneInventoryProps = {
  inventory: RuneInventory
  showZeroQuantities: boolean
  onChange?: (key: string, newAmount: number) => void
}

const RuneInventoryDisplay = (props: RuneInventoryProps) => {
  const sortedRunes = [...AllRunes].sort((a, b) => a.index - b.index)
  const runesToDisplay: RuneInventory = sortedRunes.reduce((obj, rune) => {
    if (props.inventory[rune.key] > 0 || props.showZeroQuantities) {
      obj[rune.key] = props.inventory[rune.key] ?? 0
    }
    return obj
  }, {} as RuneInventory)

  return (
    <div className={'flex flex-col'}>
      <div className={'grid grid-cols-7 gap-3 p-3'}>
        {Object.entries(runesToDisplay).map(([key, amount]) => {
          return (
            <RuneQuantity
              key={key}
              name={key}
              amount={amount}
              onChange={(newAmount) => {
                props.onChange && props.onChange(key, newAmount)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default RuneInventoryDisplay
