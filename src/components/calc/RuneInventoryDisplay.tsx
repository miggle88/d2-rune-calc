import RuneQuantity from '@/components/calc/RuneQuantity'
import { RuneInventory } from '@/types'

type RuneInventoryProps = {
  runes: RuneInventory
  onChange?: (key: string, newAmount: number) => void
}

const RuneInventoryDisplay = (props: RuneInventoryProps) => {
  return (
    <div className={'grid grid-cols-7 gap-5 p-3'}>
      {Object.entries(props.runes).map(([key, amount]) => {
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
