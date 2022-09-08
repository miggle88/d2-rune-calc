import { Runeword } from '@/types'
import Image from 'next/image'

const MODIFIERS_TEXT_STYLE = 'text-xl text-center text-red-500'
const MODIFIERS_HEADER_STYLE = `${MODIFIERS_TEXT_STYLE} font-bold p-3`

type RunewordDetailProps = {
  runeword?: Runeword
}

const RunewordDetail = (props: RunewordDetailProps) => {
  const { runeword } = props

  if (!runeword) {
    return (
      <div>
        <div className={'text-4xl font-bold text-center p-6 text-gray-600'}>No Runeword Selected</div>
      </div>
    )
  }

  return (
    <div className={'flex flex-col justify-center'}>
      <div className={'text-4xl font-bold text-center p-4'}>{runeword.name}</div>
      <div className={'text-3xl text-center p-2'}>{runeword.types.join(' | ')}</div>
      {runeword.subTypes ? (
        <div className={'text-2xl text-center p-2 text-gray-300'}>{runeword.subTypes.join(' | ')}</div>
      ) : null}
      <div className={'text-2xl text-center p-2 text-red-400'}>
        {runeword.runes.map((rune) => rune.toUpperCase()).join(' ')}
      </div>
      <div className={'text-center p-2 text-2xl text-red-500'}>Modifiers</div>
      {runeword.modifiers.map((m, index) => {
        return (
          <div key={index} className={m.style === 'header' ? MODIFIERS_HEADER_STYLE : MODIFIERS_TEXT_STYLE}>
            {m.text}
          </div>
        )
      })}

      <div className={'flex justify-center p-5'}>
        <Image width={240} height={240} alt={runeword.name} src={runeword.imageUrl ?? '/images/field_plate.png'} />
      </div>
    </div>
  )
}

export default RunewordDetail
