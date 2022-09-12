import RuneQuantity from '@/components/calc/RuneQuantity'
import { RuneInventory } from '@/types'

type RuneInventoryProps = {
  runes: RuneInventory
  showZeroQuantities: boolean
  onChange?: (key: string, newAmount: number) => void
}

const RuneInventoryDisplay = (props: RuneInventoryProps) => {
  const runesToDisplay = Object.entries(props.runes).filter(([_, amount]) => props.showZeroQuantities || amount > 0)

  return (
    <div className={'grid grid-cols-7 gap-3 p-3'}>
      {runesToDisplay.map(([key, amount]) => {
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
  )
}

export default RuneInventoryDisplay
