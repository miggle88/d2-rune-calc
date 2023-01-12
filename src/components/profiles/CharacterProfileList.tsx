import { CharacterProfile } from '@/types'
import CharacterProfileListItem from './CharacterProfileListItem'

type CharacterProfileListProps = {
  profiles: CharacterProfile[]
  onClick?: (profile: CharacterProfile) => void
}

const CharacterProfileList = (props: CharacterProfileListProps) => {
  if (props.profiles.length < 1) {
    return <div className={'text-center text-red-500 p-3'}>No Profiles Found</div>
  }

  return (
    <div className={'bg-red-900 flex flex-col'}>
      {props.profiles.map((profile) => {
        return <CharacterProfileListItem key={profile.name} profile={profile} onClick={props.onClick} />
      })}
    </div>
  )
}

export default CharacterProfileList
