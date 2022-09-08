import { Runeword } from '@/types'
import Image from 'next/image'

const DEFAULT_SIZE = 64

type RunewordDisplayProps = {
  runeword?: Runeword
  runeSize?: number
}

const RunewordDisplay = (props: RunewordDisplayProps) => {
  if (!props.runeword) {
    return <div className={'text-2xl text-center text-gray-600 p-3'}>No runeword selected</div>
  }

  return (
    <div className={'flex flex-col justify-center text-center'}>
      <div className={'text-3xl p-3'}>{props.runeword.name}</div>
      <div>
        {props.runeword.runes.map((rune, index) => {
          return (
            <div key={index} className={'inline-block p-3'}>
              <Image
                src={`/images/runes/${rune}.png`}
                width={props.runeSize ?? DEFAULT_SIZE}
                height={props.runeSize ?? DEFAULT_SIZE}
                alt={rune}
              />
              <div className={'text-red-500 text-2xl font-bold p-3'}>{rune.toUpperCase()}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RunewordDisplay
