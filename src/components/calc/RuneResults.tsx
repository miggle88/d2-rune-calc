import RuneQuantity from '@/components/calc/RuneQuantity'
import { RuneInventory } from '@/types'

type RuneResultsProps = {
  runes: RuneInventory
}

const RuneResults = (props: RuneResultsProps) => {
  const runesToDisplay = Object.entries(props.runes).filter(([, amount]) => amount > 0)

  return (
    <div className={'grid grid-cols-7 gap-3 p-3'}>
      {runesToDisplay.map(([key, amount]) => {
        return <RuneQuantity key={key} name={key} amount={amount} isReadOnly={true} />
      })}
    </div>
  )
}

export default RuneResults
