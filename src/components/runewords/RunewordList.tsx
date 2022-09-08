import RunewordListItem from '@/components/runewords/RunewordListItem'
import { Runeword } from '@/types'

type RunewordListProps = {
  runewords: Runeword[]
  onClick?: (runeword: Runeword) => void
}

const RunewordList = (props: RunewordListProps) => {
  if (props.runewords.length < 1) {
    return <div className={'text-center text-red-500 p-3'}>No Runewords Found</div>
  }

  return (
    <div className={'bg-red-900 flex flex-col'}>
      {props.runewords.map((runeword) => {
        return <RunewordListItem key={runeword.name} runeword={runeword} onClick={props.onClick} />
      })}
    </div>
  )
}

export default RunewordList
