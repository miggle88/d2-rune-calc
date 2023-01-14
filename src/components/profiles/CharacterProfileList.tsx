import { CharacterProfile } from '@/types'
import CharacterProfileListItem from './CharacterProfileListItem'

type CharacterProfileListProps = {
  profiles: CharacterProfile[]
  onClick?: (profile: CharacterProfile) => void
  onFavorite?: (profile: CharacterProfile, favorite: boolean) => void
  onDelete?: (profile: CharacterProfile) => void
}

const CharacterProfileList = (props: CharacterProfileListProps) => {
  if (props.profiles.length < 1) {
    return <div className={'text-center text-red-500 p-3'}>No Profiles Found</div>
  }

  return (
    <div className={'bg-red-900 flex flex-col'}>
      {props.profiles.map((profile) => {
        return (
          <CharacterProfileListItem
            key={profile.name}
            profile={profile}
            onClick={props.onClick}
            onFavorite={props.onFavorite}
            onDelete={props.onDelete}
          />
        )
      })}
    </div>
  )
}

export default CharacterProfileList
