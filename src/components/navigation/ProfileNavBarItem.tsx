import useUserSession from '@/hooks/useUserSession'
import { signIn, signOut } from 'next-auth/react'
import Button from '@/components/common/Button'
import Image from 'next/image'

type ProfileNavBarItemProps = {}

const ProfileNavBarItem = (props: ProfileNavBarItemProps) => {
  const { data: session, status } = useUserSession()
  const user = session?.user

  if (!session || !user || status !== 'authenticated') {
    return (
      <Button className={'text-red-500 text-md p-3 h-[48px] place-self-center'} onClick={() => signIn()}>
        Login/Register
      </Button>
    )
  }

  return (
    <div className={'flex flex-row'}>
      <div className={'text-xl place-self-center px-2'}>{user.name}</div>
      <div className={'px-4 pt-3 pb-2'}>
        <Image className={'rounded-full'} src={user.image!} alt={user.name!} height={40} width={40} />
      </div>
      <Button className={'text-red-500 text-md p-3 h-[48px] place-self-center'} onClick={() => signOut()}>
        Log out
      </Button>
    </div>
  )
}

export default ProfileNavBarItem
