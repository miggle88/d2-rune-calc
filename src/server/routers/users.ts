import { t } from '@/server/trpc'
import { z } from 'zod'

export const userRouter = t.router({
  getUser: t.procedure.query(({ input }) => {
    return {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      displayName: 'John Doe',
      emailAddress: 'john.doe@email.com',
    }
  }),
})
