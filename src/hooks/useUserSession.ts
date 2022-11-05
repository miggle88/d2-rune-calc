import { UserSession } from '@/types'
import { useSession } from 'next-auth/react'

const useUserSession = () => {
  const result = useSession()

  return {
    ...result,
    data: result.data as UserSession,
  }
}

export default useUserSession
