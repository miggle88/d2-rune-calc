import Button from '@/components/common/Button'
import Conditional from '@/components/layout/Conditional'
import { CharacterProfile } from '@/types'

type CharacterProfileListItemProps = {
  profile: CharacterProfile
  onClick?: (profile: CharacterProfile) => void

  onFavorite?: (profile: CharacterProfile, favorite: boolean) => void

  onDelete?: (profile: CharacterProfile) => void
}

const CharacterProfileListItem = (props: CharacterProfileListItemProps) => {
  return (
    <div className={'border-b-2 border-red-700 p-2'}>
      <div className={'flex flex-row text-left'}>
        <button onClick={() => props.onClick?.(props.profile)}>
          <div className={'pl-1'} />
          <div className={'flex flex-col'}>
            <div className={'flex flex-row'}>
              <Conditional condition={props.profile.isStarred}>
                <div>⭐</div>
                <div className={'px-1'} />
              </Conditional>
              <div className={'font-bold w-[200px] text-left'}>{props.profile.name}</div>
            </div>
            <div className={'flex flex-row text-left'}>
              <div className={'text-red-300 w-[80px]'}>{props.profile.class}</div>
              <div className={'px-3'} />
              <div className={'mx-1'}>{props.profile.ladder ? '🏆' : ''}</div>
              <div className={'mx-1'}>{props.profile.hardcore ? '💀' : ''}</div>
            </div>
          </div>
        </button>
        <div className={'w-[32px]'} />

        <div className={'w-full'} />
        <div className={'flex flex-row'}>
          <Button
            className={'mx-1 w-[100px]'}
            onClick={() => props.onFavorite?.(props.profile, !props.profile.isStarred)}
          >
            {props.profile.isStarred ? 'Unfavorite' : 'Favorite'}
          </Button>
          <Button className={'mx-1'} onClick={() => props.onDelete?.(props.profile)}>
            🗑
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CharacterProfileListItem
