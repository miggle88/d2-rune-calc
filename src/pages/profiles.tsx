import { ChangeEvent, useState } from 'react'
import type { NextPage } from 'next'
import Button from '@/components/common/Button'
import Conditional from '@/components/layout/Conditional'
import { trpc } from '@/utils/trpc'

type Credentials = {
  username: string
  password: string
}

const Profiles: NextPage = () => {
  const getCurrentUserQuery = trpc.getCurrentUser.useQuery()
  const loginMutation = trpc.login.useMutation({
    onSuccess: () => getCurrentUserQuery.refetch(),
  })
  const logoutMutation = trpc.logout.useMutation({
    onSuccess: () => getCurrentUserQuery.refetch(),
  })

  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  })

  const currentUser = getCurrentUserQuery.data
  const isLoggedIn = currentUser != null
  const isLoading = loginMutation.isLoading
  const hasError = loginMutation.isError

  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name
    setCredentials({
      ...credentials,
      [field]: e.target.value,
    })
  }

  const performLogin = () => {
    loginMutation.mutate(credentials)
  }

  const performLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div>
      <Conditional condition={isLoggedIn}>
        <div className={'flex flex-col place-items-center'}>
          <div className={'text-3xl text-center p-3'}>Welcome back, {currentUser?.displayName}</div>
          <div className={'text-2xl text-center p-3'}>Email Address: {currentUser?.emailAddress}</div>
          <div className={'py-8'} />
          <Button className={'p-3 w-[200px]'} onClick={performLogout}>
            Logout
          </Button>
        </div>
      </Conditional>
      <Conditional condition={!isLoggedIn && !isLoading}>
        <div className={'text-3xl text-center p-3'}>You are not logged in.</div>
        <div className={'py-8'} />
        <Conditional condition={hasError}>
          <div className={'text-2xl text-red-500 text-center p-4'}>{loginMutation.error?.message}</div>
        </Conditional>
        <div className={'flex flex-col items-center'}>
          <div className={'flex flex-row'}>
            <span className={'inline-block p-4 text-right text-2xl w-[200px]'}>Username</span>
            <input name={'username'} className={'p-3 w-[400px] text-black'} onChange={handleInputOnChange} />
          </div>
          <div className={'py-2'}></div>
          <div className={'flex flex-row'}>
            <span className={'inline-block p-4 text-right text-2xl w-[200px]'}>Password</span>
            <input name={'password'} className={'p-3 w-[400px] text-black'} onChange={handleInputOnChange} />
          </div>
          <div className={'py-4'}></div>
          <Button className={'p-3 w-[200px]'} onClick={performLogin}>
            Login
          </Button>
        </div>
      </Conditional>
      <Conditional condition={isLoading}>
        <div className={'text-3xl text-center p-3'}>Logging in...</div>
      </Conditional>
    </div>
  )
}

export default Profiles
