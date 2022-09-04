import { Runeword } from '@/types'

type RunewordListItemProps = {
  runeword: Runeword
  onClick?: (runeword: Runeword) => void
}

const RunewordListItem = (props: RunewordListItemProps) => {
  return (
    <button className={'border-b-2 border-red-700 p-2'} onClick={() => props.onClick && props.onClick(props.runeword)}>
      <div className={'font-bold'}>{props.runeword.name}</div>
    </button>
  )
}

export default RunewordListItem
