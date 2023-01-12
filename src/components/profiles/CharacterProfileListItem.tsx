import { CharacterProfile } from '@/types'

type CharacterProfileListItemProps = {
  profile: CharacterProfile
  onClick?: (profile: CharacterProfile) => void
}

const CharacterProfileListItem = (props: CharacterProfileListItemProps) => {
  return (
    <button className={'border-b-2 border-red-700 p-2'} onClick={() => props.onClick && props.onClick(props.profile)}>
      <div className={'font-bold'}>{props.profile.name}</div>
    </button>
  )
}

export default CharacterProfileListItem
