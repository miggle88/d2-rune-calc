import RuneQuantity from '@/components/calc/RuneQuantity'
import { RuneCalculation } from '@/types'
import Image from 'next/image'

type CalculatorResultsDisplayProps = {
  results: RuneCalculation[]
}

const CalculatorResultsDisplay = (props: CalculatorResultsDisplayProps) => {
  return (
    <div className={'flex flex-col p-3'}>
      {props.results.map((result, index) => {
        return (
          <div key={`result-${index}`} className={'flex flex-row border-gray-500 border-2 rounded-2xl p-3 m-2'}>
            <div>
              <Image src={`/images/runes/${result.rune.key}.png`} alt={result.rune.key} width={120} height={120} />
              <div className={'text-2xl font-bold text-red-500 p-2'}>{result.rune.name.toUpperCase()}</div>
            </div>
            <div className={'flex flex-row'}>
              <div className={'p-2'} />
              <div className={'grid grid-cols-7 gap-3'}>
                {Object.entries(result.requires).map(([key, amount]) => {
                  return <RuneQuantity key={key} name={key} amount={amount} isReadOnly={true} />
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CalculatorResultsDisplay
