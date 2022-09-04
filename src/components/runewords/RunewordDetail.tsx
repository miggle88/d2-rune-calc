import { Runeword } from '@/types'

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
    <div>
      <div className={'text-4xl font-bold text-center p-4'}>{runeword.name ?? 'No Runeword Selected'}</div>
      <div className={'text-3xl text-center p-2'}>{runeword.types.join(' | ')}</div>
      {runeword.subTypes ? (
        <div className={'text-2xl text-center p-2 text-gray-300'}>{runeword.subTypes.join(' | ')}</div>
      ) : null}
      <div className={'text-2xl text-center p-2 text-red-400'}>
        {runeword.runes.map((rune) => rune.toUpperCase()).join(' ')}
      </div>
    </div>
  )
}

export default RunewordDetail
